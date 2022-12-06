function exitOnError {
    if ($LASTEXITCODE -ne 0) {
        exit $LASTEXITCODE
    }
}

function help {
    Write-Host "Utilize: $0 [opções]"
    Write-Host "Opções:"
    Write-Host "  -h, --help          Mostra esta ajuda"
    Write-Host "  -p, --production    Instalação para ambiente de produção"
    Write-Host ""
    Write-Host "  --setup-env         Configurar manualmente cada variável de ambiente"
    Write-Host "  --skip-env          Não alterar arquivos de variáveis de ambiente"
    Write-Host "  --skip-salt         Não gerar novo salt para criptografia de senhas"
    Write-Host "  --skip-db           Não criar bancos de dados e usuários"
    Write-Host "  --skip-populate     Não popular banco de dados"

    exit 0
}

function setupEnvFile {
    param(
        [string]$sourceFile,
        [string]$targetFile
    )

    Write-Host "Configurando arquivo $targetFile"

    if ($mode -ne "production" -and $setupenv -eq $false) {
        Copy-Item $sourceFile $targetFile
        exitOnError
        Write-Host "Arquivo $targetFile configurado"
        return
    }

    Write-Host "Por favor, insira os valores para as variáveis de ambiente"
    Write-Host "Deixe em branco para utilizar o valor padrão"
    $fileContent=""

    $file = Get-Content $sourceFile
    foreach ($line in $file) {
        if ($line -match "^[[:space:]]*((\#|PASSWD_SALT).*)?$") {
            $fileContent += $line + "`n"
            continue
        }

        $var = $line -replace "^(.*)=(.*)$", '$1'
        if($var -match "NODE_ENV"){
            $fileContent += $var + "=" + $mode + "`n"
            continue
        }

        if ($line -match "(PASSWORD|PASSWD|SECRET)") {
            $value = Read-Host -Prompt "> $($var) (input oculto): " -AsSecureString
            $value = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($value))
        } else {
            $value = Read-Host -Prompt "> $($var): "
        }

        if($value -eq ""){
            $fileContent += $line + "`n"
        } else {
            $fileContent += $var + "=" + $value + "`n"
        }
    }

    if (-not (Test-Path $targetFile)) {
        New-Item -ItemType File -Path $targetFile
    }
    $fileContent | Out-File $targetFile -Encoding utf8

    Write-Host "Arquivo $targetFile configurado"
}

function setupDB {
    Write-Host "Configurando banco de dados"

    $dbRootPassword = Read-Host -Prompt "Senha do usuário root do MariaDB: " -AsSecureString
    $dbRootPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($dbRootPassword))

    if($mode -ne "production"){
        Write-Host "Criando banco de dados e usuários de desenvolvimento e teste"
        $startdb = Get-Content .\startdb.sql
        $startdb | mariadb -u root --password="$dbRootPassword"
        exitOnError
        Write-Host "Banco de dados e usuários criados com sucesso"
    } else {
        $envFile = Get-Content .\.env
        foreach ($line in $envFile) {
            if ($line -match "DB_NAME") {
                $dbName = $line -replace "^(.*)=(.*)$", '$2'
            }
            if ($line -match "DB_USER") {
                $dbUser = $line -replace "^(.*)=(.*)$", '$2'
            }
            if ($line -match "DB_PASSWORD") {
                $dbPassword = $line -replace "^(.*)=(.*)$", '$2'
            }
        }

        Write-Host "Criando banco de dados e usuário de produção"
        Write-Host "CREATE DATABASE IF NOT EXISTS $($dbName);"
        mariadb -u root --password="$dbRootPassword" -e "CREATE DATABASE IF NOT EXISTS $($dbName);"
        exitOnError
        Write-Host "Banco de dados criado com sucesso"

        Write-Host ""

        Write-Host "Criando usuário ($dbUser)"
        $script = "
            CREATE USER IF NOT EXISTS '$dbuser'@'localhost' IDENTIFIED BY '$dbpassword';
            GRANT ALL PRIVILEGES ON $dbname.* TO '$dbuser'@'localhost';
            FLUSH PRIVILEGES;
        "
        mariadb -u root --password="$dbRootPassword" -e $script
        exitOnError
        Write-Host "Usuário criado com sucesso"

    }
    Write-Host ""

    Write-Host "Criando tabelas"
    npm run migrate:run 2>&1 | Write-Host
    exitOnError
    Write-Host "Tabelas criadas com sucesso"
    Write-Host ""
    Write-Host "Setup do banco de dados concluído"
}

function putUsers {
    if ($mode -ne "production"){
        Write-Host "Populando banco de dados com usuários de desenvolvimento e teste"
        npm run seed:run
        exitOnError
        Write-Host "Usuários inseridos"
        return
    }

    Write-Host "Inserindo usuário de administração"
    Write-Host "  Com exceção do nome de usuário e senha, os demais campos podem ser deixados em branco"

    $username = ""
    while($username -eq ""){
        $username = Read-Host -Prompt "> Nome de usuário: "
        if ($username -eq "") {
            Write-Host "Nome de usuário não pode ser vazio"
        }
    }

    $password = ""
    while($password -eq ""){
        $password = Read-Host -Prompt "> Senha: " -AsSecureString
        $password = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($password))
        if ($password -eq "") {
            Write-Host "Senha não pode ser vazia"
        }
    }

    $city = Read-Host -Prompt "> Cidade: "
    $uf = Read-Host -Prompt "> UF: "
    $cpf = Read-Host -Prompt "> CPF: "
    $phone = Read-Host -Prompt "> Telefone: "
    $email = Read-Host -Prompt "> E-mail: "

    npx env-cmd node .\newAdmin.js $username $password $city $uf $cpf $phone $email 2>&1 | Write-Host
    exitOnError
    Write-Host "Usuário de administrador ($username) inserido"
}

$mode = "development"
$setupenv=$false
$skipenv=$false
$skipsalt=$false
$skipdb=$false
$skippop=$false
for ($i = 0; $i -lt $args.length; $i++) {
    switch ($args[$i]) {
        "-p" { $mode = "production" }
        "--production" { $mode = "production" }
        "--setup-env" { $setupenv=$true }
        "--skip-env" { $skipenv=$true }
        "--skip-salt" { $skipsalt=$true }
        "--skip-db" { $skipdb=$true }
        "--skip-populate" { $skippop=$true }
        default { help }
    }
}

if ($mode -eq "production") {
    Write-Host "Modo de instalação: Produção"
} else {
    Write-Host "Modo de instalação: Desenvolvimento"
}

# Instalação e configuração do backend

Write-Host "Iniciando instalação e configuração do backend"

cd backpet/config
if ($skipenv -eq $false) {
    setupEnvFile ".env.example" ".env"
}

Write-Host "Instalando dependências do backend..."
npm install | Out-Null
exitOnError
Write-Host "Dependências do backend instaladas"

if ($mode -eq "development"){
    cd ../..
    npx --yes husky install backpet/.husky 2>&1 | Out-Null
    cd backpet/config
}

if ($skipsalt -eq $false){
    $response = Read-Host -Prompt "Deseja gerar um novo salt para criptografia de senhas? (s/N): "
    if ($response -match "^(s|S)") {
        Write-Host "Gerando novo salt..."
        npm run salt:new | Out-Null
        exitOnError
        Write-Host "Novo salt gerado"
    }
}

if ($skipdb -eq $false) {
    $response = Read-Host -Prompt "Criar banco de dados e usuário? (S/n): "
    if ($response -match "^(s|S)") {
        setupDB

        if($skippop -eq $false){
            if ($mode -eq "production") {
                $response = Read-Host -Prompt "Inserir usuário administrador? (S/n): "
            } else {
                $response = Read-Host -Prompt "Popular banco de dados? (S/n): "
            }
            if ($response -match "^(s|S)") {
                putUsers
            }
        }
    }
}

Write-Host "Backend instalado e configurado"
Write-Host ""

cd ../..

# Instalação e configuração do frontend

Write-Host "Iniciando instalação e configuração do frontend"

cd frontpet

Write-Host "Instalando dependências do frontend..."
npm install | Out-Null
exitOnError
Write-Host "Dependências do frontend instaladas"

if ($skipenv -eq $false) {
    setupEnvFile ".env" ".env.local"
}

# if ($mode -eq "production") {
#     Write-Host "Gerando build de produção..."
#     npm run build 2>&1 | Write-Host
#     Write-Host "Build de produção gerado"
# }

Write-Host "Instalação e configuração do frontend concluída"
Write-Host ""

cd ..

Write-Host "Instalação e configuração concluída"
Write-Host ""
Write-Host "Para iniciar os servidores, abra dois terminais e execute os seguintes comandos em cada um deles:"
Write-Host "  Terminal 1:"
Write-Host '  $ cd backpet'
if ($mode -eq "production"){
Write-Host '  $ npm start'
}else{
Write-Host '  $ npm run dev'
}

Write-Host
Write-Host "  Terminal 2:"
Write-Host '  $ cd frontpet'
if ($mode -eq "production"){
Write-Host '  $ npm start'
}else{
Write-Host '  $ npm run dev'
}