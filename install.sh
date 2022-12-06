#!/bin/bash

function selectColor () {
    if [ "$background" == "" ]; then background="$color_background"; fi

    # Foreground
    case "$1" in
        "black")        result='\033[0;30m';;
        "dark-red")     result='\033[0;31m';;
        "dark-green")   result='\033[0;32m';;
        "dark-yellow")  result='\033[0;33m';;
        "dark-blue")    result='\033[0;34m';;
        "dark-magenta") result='\033[0;35m';;
        "dark-cyan")    result='\033[0;36m';;
        "gray")         result='\033[0;37m';;
        "dark-gray")    result='\033[1;90m';;
        "red")          result='\033[1;91m';;
        "green")        result='\033[1;92m';;
        "yellow")       result='\033[1;93m';;
        "blue")         result='\033[1;94m';;
        "magenta")      result='\033[1;95m';;
        "cyan")         result='\033[1;96m';;
        "white")        result='\033[1;97m';;
        *)              result='\033[0;39m';;
    esac

    # Background
    case "$2" in
        "black")       result="${result}\033[40m";;
        "dark-red")     result="${result}\033[41m";;
        "dark-green")   result="${result}\033[42m";;
        "dark-yellow")  result="${result}\033[43m";;
        "dark-blue")    result="${result}\033[44m";;
        "dark-magenta") result="${result}\033[45m";;
        "dark-cyan")    result="${result}\033[46m";;
        "gray")        result="${result}\033[47m";;
        "dark-gray")    result="${result}\033[100m";;
        "red")         result="${result}\033[101m";;
        "green")       result="${result}\033[102m";;
        "yellow")      result="${result}\033[103m";;
        "blue")        result="${result}\033[104m";;
        "magenta")     result="${result}\033[105m";;
        "cyan")        result="${result}\033[106m";;
        "white")       result="${result}\033[107m";;
        *)              result="${result}\033[49m";;
    esac

    echo "$result"
}

function writeColor () {
    echo -e "$(selectColor "$2" "$3")$1\033[0m"
}

function writeItalic () {
    echo -e "\033[3m$1\033[0m"
}

function writeBold () {
    echo -e "\033[1m$1\033[0m"
}

function help(){
    echo "Utilize: $0 [opções]"
    echo "Opções:"
    echo "  -h, --help          Mostra esta ajuda"
    echo "  -p, --production    Instalação para ambiente de produção"
    echo
    echo "  --setup-env         Configurar manualmente cada variável de ambiente"
    echo "  --skip-env          Não alterar arquivos de variáveis de ambiente"
    echo "  --skip-salt         Não gerar novo salt para criptografia de senhas"
    echo "  --skip-db           Não criar bancos de dados e usuários"
    echo "  --skip-populate     Não popular banco de dados"
    exit;
}

function setupEnvFile() {
    echo "Configurando arquivo $2...";
    if [ "$mode" != "production" ] && [ "$setupenv" = false ]; then
        cp $1 $2 && writeColor "Arquivo $2 configurado com sucesso." "green";
        return;
    fi

    writeColor "Por favor, insira os valores para as variáveis de ambiente." "dark-yellow";
    writeColor "$(writeItalic "Pressione ENTER para utilizar o valor padrão.")" "dark-yellow";
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

    writeColor "Arquivo $2 configurado com sucesso." "green";
}

function setupDB(){
    echo "Iniciando setup do banco de dados...";

    read -sp "> Senha de root do mariadb:" dbrootpasswd;
    echo;

    if [ "$mode" != "production" ]; then
        echo "  Criando bancos de dados e usuários de desenvolvimento e teste...";
        writeColor "  Para acessar o mariadb como root, é necessário utilizar o usuário root do sistema" "dark-yellow";
        {
            sudo -V > /dev/null 2>&1 &&
            sudo mariadb -u root --password="$dbrootpasswd" < ./startdb.sql
        } || {
            su -c "mariadb -u root --password=\"$dbrootpasswd\" < ./startdb.sql"
        }
        writeColor "  Bancos de dados e usuários criados com sucesso." "dark-blue";
    else
        dbname=$(cat .env | grep DB_NAME | cut -d '=' -f 2);
        dbuser=$(cat .env | grep DB_USER | cut -d '=' -f 2);
        dbpassword=$(cat .env | grep DB_PASSWORD | cut -d '=' -f 2);

        echo "  Criando banco de dados...";
        writeColor "  \033[1mPara acessar o mariadb como root, é necessário utilizar o usuário root do sistema" "yellow";
        {
            sudo -V > /dev/null 2>&1 &&
            (sudo mariadb -u root --password="$dbrootpasswd" -e "CREATE DATABASE IF NOT EXISTS $dbname;" || exit 1)
        } || {
            su -c "mariadb -u root --password=\"$dbrootpasswd\" -e \"CREATE DATABASE IF NOT EXISTS $dbname;\"" root || exit 1
        } && writeColor "  Banco de dados criado com sucesso." "dark-blue";

        echo
        echo "  Criando usuário...";
        createuser="
            CREATE USER IF NOT EXISTS '$dbuser'@'localhost' IDENTIFIED BY '$dbpassword';
            GRANT ALL PRIVILEGES ON $dbname.* TO '$dbuser'@'localhost';
            FLUSH PRIVILEGES;
        "
        {
            sudo -V > /dev/null 2>&1 &&
            (sudo mariadb -u root --password="$dbrootpasswd" -e "$createuser" || exit 1)
        } || {
            su -c "mariadb -u root --password=\"$dbrootpasswd\" -e \"$createuser\"" root || exit 1
        } && writeColor "  Usuário criado com sucesso." "dark-blue";
    fi

    echo
    echo "  Criando tabelas...";
    npm run migrate:run >/dev/null && writeColor "  Tabelas criadas com sucesso." "dark-blue" || exit 1;
    writeColor "Setup do banco de dados concluído com sucesso." "green";
}

function putUsers(){
    if [ "$mode" != "production" ]; then
        echo "Populando banco de dados de desenvolvimento...";
        npm run seed:run >/dev/null && writeColor "Banco populado com sucesso" "green" || exit 1;
        return;
    fi

    echo "Inserindo usuário administrador...";
    writeColor "  Com exceção do nome de usuário e senha, os demais campos podem ser deixados em branco" "yellow";
    while read -p "> Nome de usuário: " username; do
        if [[ ! -z "$username" ]]; then
            break;
        fi
        writeColor "Nome de usuário não pode ser vazio" "red";
        continue;
    done

    while read -sp "> Senha: " password; do
        echo
        if [[ ! -z "$password" ]]; then
            break;
        fi
        writeColor "Senha não pode ser vazia" "red";
        continue;
    done

    read -p "> Cidade: " city;
    read -p "> UF: " uf;
    read -p "> CPF: " cpf;
    read -p "> Telefone: " phone;
    read -p "> Email: " email;

    npx env-cmd node ./newAdmin.js "$username" "$password" "$city" "$uf" "$cpf" "$phone" "$email" &&
    writeColor "Usuário de administrador ($username) inserido com sucesso" "green" || exit 1;
}

mode="development";
setupenv=false;
skipenv=false;
skipsalt=false;
skipdb=false;
skippop=false;
while [[ $# -gt 0 ]]; do
    key="$1";
    case $key in
        -p|--production)
            mode="production";
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
            help;
            ;;
    esac
    shift;
done

echo
if [[ "$mode" == "development" ]]; then
    echo "Modo de instalação: $(writeColor "DESENVOLVIMENTO" "magenta")";
else
    echo "Modo de instalação: $(writeColor "PRODUÇÃO" "red")";
fi
echo

# Instalação e configuração do backend
writeColor " Iniciando instalação e configuração do backend " "green" "cyan";
echo

cd backpet/config;
if [ "$skipenv" = false ]; then
    setupEnvFile ".env.example" ".env";
    echo
fi

echo "Instalando dependências do backend...";
npm install > /dev/null && writeColor "Dependências do backend instaladas com sucesso" "green" || exit 1;
echo

if [ "$mode" == "development" ]; then
    cd ../..;
    npx --yes husky install backpet/.husky &>/dev/null;
    cd backpet/config;
fi

if [ "$skipsalt" = false ]; then
    read -p "> Gerar novo salt para criptografia de senhas? (S/n): "
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        echo
        echo "Gerando novo salt...";
        npm run salt:new > /dev/null && writeColor "Novo salt gerado com sucesso." "green" || exit 1;
    fi
    echo
fi

if [[ "$skipdb" = false ]]; then
    read -p "> Criar banco de dados e usuário do MariaDB? (S/n): "
    echo
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        setupDB;

        if [[ "$skippop" = false ]]; then
            echo
            if [[ $mode == "production" ]]; then
                read -p "> Inserir usuário administrador? (S/n): "
            else
                read -p "> Popular banco de dados? (S/n): "
            fi
            if [[ $REPLY =~ ^[Ss]$ ]]; then
                echo
                putUsers;
            fi
        fi
    fi
fi

echo
echo "Instalação e configuração do backend concluída.";
echo

cd ../..;

# Instalação e configuração do frontend
writeColor " Iniciando instalação e configuração do frontend " "green" "cyan";
echo

cd frontpet;

if [[ "$skipenv" = false ]]; then
    setupEnvFile ".env" ".env.local";
    echo
fi

echo "Instalando dependências do frontend...";
npm install > /dev/null && writeColor "Dependências do frontend instaladas com sucesso" "green" || exit 1;
echo

# if [[ $mode == "production" ]]; then
#     echo "Gerando build de produção";
#     npm run build;
#     echo "Build de produção gerada";
# fi

echo "Instalação e configuração do frontend concluída.";
echo

cd ..

writeColor " $(writeBold "Instalação concluída.") " "default" "dark-green";
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
echo