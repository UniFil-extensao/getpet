#!/bin/bash

function help(){
    echo "Utilize: $0 [opções]"
    echo "Opções:"
    echo "  -h, --help          Mostra esta ajuda"
    echo "  -p, --production    Instalação para ambiente de produção"
    echo "  -d, --development   Instalação para ambiente de desenvolvimento"
    echo
    echo "  --setup-env         Configurar manualmente cada variável de ambiente"
    echo "  --skip-env          Não alterar arquivos de variáveis de ambiente"
    echo "  --skip-salt         Não gerar novo salt para criptografia de senhas"
    echo "  --skip-db           Não criar bancos de dados e usuários"
    echo "  --skip-populate     Não popular banco de dados"
    exit;
}

function setupEnvFile() {
    echo "Criando arquivo $2";
    if [ "$mode" != "production" ] && [ "$setupenv" = false ]; then
        cp $1 $2;
        echo "Arquivo $2 criado";
        return;
    fi

    echo "Por favor, insira os valores para as variáveis de ambiente";
    echo "Deixe em branco para utilizar o valor padrão";
    envcontent="";

    while read -u3 line; do
        if [[ -z "$line" ]] || [[ "$line" =~ ^[[:space:]]*(\#|PASSWD_SALT) ]]; then
            envcontent="$envcontent$line"$'\n';
            continue;
        fi

        var=$(echo $line | cut -d '=' -f 1);
        if [ "$var" == "NODE_ENV" ]; then
            envcontent="$envcontent$var=$mode"$'\n';
            continue;
        fi

        value="";
        if [[ "$var" =~ (PASSWORD|PASSWD|SECRET) ]]; then
            read -sp "> $var (input oculto): " value;
            echo
        else
            read -p "> $var: " value;
        fi
        if [ ! -z "$value" ]; then
            envcontent="$envcontent$var=$value"$'\n';
        else
            envcontent="$envcontent$line"$'\n';
        fi
    done 3< $1;

    touch $2;
    echo "$envcontent" > $2;

    echo "Arquivo $2 criado";
}

function setupDB(){
    echo "Iniciando setup do banco de dados";

    read -sp "> Senha de root do mariadb:" dbrootpasswd;
    echo;

    if [ "$mode" != "production" ]; then
        echo "Criando bancos de dados e usuários de desenvolvimento e teste";
        echo "Para acessar o mariadb como root, é necessário utilizar o usuário root do sistema";
        {
            sudo -V > /dev/null 2>&1 &&
            sudo mariadb -u root -p"\"$dbrootpasswd\"" < ./startdb.sql
        } || {
            su -c "mariadb -u root -p$dbrootpasswd < ./startdb.sql"
        }
        # su -c "mariadb -u root -p$dbrootpasswd < ./startdb.sql" root;
        echo "Bancos de dados e usuários criados";
    else
        dbname=$(cat .env | grep DB_NAME | cut -d '=' -f 2);
        dbuser=$(cat .env | grep DB_USER | cut -d '=' -f 2);
        dbpassword=$(cat .env | grep DB_PASSWORD | cut -d '=' -f 2);

        echo "Criando banco de dados";
        {
            sudo -V > /dev/null 2>&1 &&
            (sudo mariadb -u root -p"\"$dbrootpasswd\"" -e "CREATE DATABASE IF NOT EXISTS $dbname;" || exit 1)
        } || {
            su -c "mariadb -u root -p\"\\\"$dbrootpasswd\\\"\" -e \"CREATE DATABASE IF NOT EXISTS $dbname;\"" root || exit 1
        } && echo "Banco de dados criado";

        echo "Criando usuário";
        createuser="
            CREATE USER IF NOT EXISTS '$dbuser'@'localhost' IDENTIFIED BY '$dbpassword';
            GRANT ALL PRIVILEGES ON $dbname.* TO '$dbuser'@'localhost';
            FLUSH PRIVILEGES;
        "
        {
            sudo -V > /dev/null 2>&1 &&
            (sudo mariadb -u root -p"\"$dbrootpasswd\"" -e "$createuser" || exit 1)
        } || {
            su -c "mariadb -u root -p\"\\\"$dbrootpasswd\\\"\" -e \"$createuser\"" root || exit 1
        } && echo "Usuário criado";
    fi

    echo "Criando tabelas";
    npm run migrate:run && echo "Tabelas criadas" || exit 1;
    echo "Setup do banco de dados concluído";
}

function putUsers(){
    if [ "$mode" != "production" ]; then
        echo "Inserindo usuários de desenvolvimento e teste";
        npm run seed:run && echo "Usuários inseridos" || exit 1;
        return;
    fi

    echo "Inserindo usuário administrador";
    echo "  Com exceção do nome de usuário e senha, os demais campos podem ser deixados em branco";
    while read -p "> Nome de usuário: " username; do
        if [[ ! -z "$username" ]]; then
            break;
        fi
        echo "Nome de usuário não pode ser vazio";
        continue;
    done

    while read -sp "> Senha: " password; do
        echo
        if [[ ! -z "$password" ]]; then
            break;
        fi
        echo "Senha não pode ser vazia";
        continue;
    done

    read -p "> Cidade: " city;
    read -p "> UF: " uf;
    read -p "> CPF: " cpf;
    read -p "> Telefone: " phone;
    read -p "> Email: " email;

    npx env-cmd node ./newAdmin.js "$username" "$password" "$city" "$uf" "$cpf" "$phone" "$email" &&
    echo "Usuário de administrador ($username) inserido" || exit 1;
}

mode="";
setupenv=false;
skipenv=false;
skipsalt=false;
skipdb=false;
skippop=false;
while [[ $# -gt 0 ]]; do
    key="$1";
    case $key in
        -h|--help)
            help;
            ;;
        -p|--production)
            mode="production";
            ;;
        -d|--development)
            mode="development";
            ;;
        --setup-env)
            setupenv=true;
            ;;
        --skip-env)
            skipenv=true;
            ;;
        --skip-salt)
            skipsalt=true;
            ;;
        --skip-db)
            skipdb=true;
            ;;
        --skip-populate)
            skippop=true;
            ;;
        *)
            echo "Opção inválida: $key";
            exit 1;
            ;;
    esac
    shift;
done

if [[ "$mode" == "development" ]] || [[ -z "$mode" ]]; then
    echo "Modo de instalação: Desenvolvimento";
    mode="development";
else
    echo "Modo de instalação: Produção";
fi
echo

# Instalação e configuração do backend

echo "Iniciando instalção e configuração do backend";

cd backpet/config;
if [ "$skipenv" = false ]; then
    setupEnvFile ".env.example" ".env";
    echo
fi

echo "Instalando dependências do backend";
npm install;
echo "Dependências do backend instaladas";
echo

if [ "$skipsalt" = false ]; then
    read -p "Gerar novo salt para criptografia de senhas? (S/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        echo "Gerando novo salt";
        npm run salt:new;
        echo "Novo salt gerado";
    fi
    echo
fi

if [[ "$skipdb" = false ]]; then
    read -p "Criar banco de dados e usuário? (S/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        setupDB;

        if [[ "$skippop" = false ]]; then
            if [[ $mode == "production" ]]; then
                read -p "Inserir usuário administrador? (S/n) " -n 1 -r
            else
                read -p "Popular banco de dados? (S/n) " -n 1 -r
            fi
            echo
            if [[ $REPLY =~ ^[Ss]$ ]]; then
                putUsers;
            fi
        fi
    fi
fi

echo "Instalação e configuração do backend concluída";
echo

cd ../..;

# Instalação e configuração do frontend

echo "Iniciando instalção e configuração do frontend";

cd frontpet;

echo
echo "Instalando dependências do frontend";
npm install > /dev/null 2>&1;
echo "Dependências do frontend instaladas";
echo

if [[ "$skipenv" = false ]]; then
    setupEnvFile ".env" ".env.local";
    echo
fi

# if [[ $mode == "production" ]]; then
#     echo "Gerando build de produção";
#     npm run build;
#     echo "Build de produção gerada";
# fi

echo "Instalação e configuração do frontend concluída";
echo

cd ..

echo "Instalação concluída";
echo
echo "Para iniciar os servidores, abra dois terminais e execute os seguintes comandos em cada um deles:";
echo "  Terminal 1:";
echo '  $ cd backpet';
if [[ $mode == "production" ]]; then
echo '  $ npm start';
else
echo '  $ npm run dev';
fi

echo
echo "  Terminal 2:";
echo '  $ cd frontpet';
if [[ $mode == "production" ]]; then
echo '  $ npm start';
else
echo '  $ npm run dev';
fi