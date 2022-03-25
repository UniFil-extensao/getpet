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


![NP11QlGm38NtFeMNcKKkCFpypD1rOQ3C0JIE8APEP2IvfT3Bb2vwa5oiyOZWINVMznxFUZg90ckPafFNE6TWc3m49NxHZuGUtb5eGdSy3rESZnx4GtsvurNAyiMHxgm8ikjokQKOW2-eXqgxJA87rzsAL6hgyhDyayc2m65S3O5cPKh0QoXmD7cZLq5UFOoPMFzO35g2bAJ0pv31j3ro](https://user-images.githubusercontent.com/66074743/160213148-67148485-b3e6-4049-9b69-a7b31eadacb7.png)
