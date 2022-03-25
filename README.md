# <i>Grupo</i>: <b>GetPet</b>

# <i>Integrantes</i>:
* Wesley Kasteller Carlesso
* Rafael Trindade
* Gustavo Queiroz
* Gustavo Soares
* Leonardo Mello

# <i>Descrição</i>:
GetPet é um aplicativo para conectar doadores/vendedores de Pets com adotantes/compradores através de uma plataforma on-line com funcionalidades como localização de pet-shops próximos e chats de bate-papo.


# <i>Caso de Uso</i>:
@startuml
skinparam actorStyle awesome
:Admin: as admin
:Usuário: as user
(publicarPet) as (post)
(buscarPublicação) as (search)
(controlarUsuario) as (controlUser)
(reportarUsuario) as (report)
(consultarMapa) as (consultarMapa)
(avaliarPetshop) as (avaliarPetshop)
(chatUsuario) as (userChat)
(avaliarAdocao) as (rateProcess)
user <|-- admin 
user --> post
user --> search
user --> controlUser
user --> report
user --> consultarMapa
user --> avaliarPetshop
user --> userChat
user --> rateProcess

@enduml
