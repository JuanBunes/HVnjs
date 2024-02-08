### Swaggerhub link: https://app.swaggerhub.com/apis-docs/Juanbunes/huella-verde_apirest/1.0.0
### Link al deploy de heroku: https://juanbunesapirest.herokuapp.com/
(Desde los cambios en los usuarios de heroku, esta aplicacion no se encuentra subida al servidor)
##


## Tipos de usuario:
Para esta etapa añadi la funcionalidad de que los productos tengan asociados una lista de comentarios escritos por usuarios registrados a traves de auth0 que luego va a ser implementado en la aplicacion de react.
Para organizar los tipos de usuario cree dos roles en auth0, un usuario regular y un usuario moderador. El usuario regular es aquel que se registrara a la aplicacion de react con auth0 y tendra la habilidad de dejar sus comentarios en cualquiera de los productos existentes. Por el otro lado los moderadores tambien pueden dejar comentarios pero tienen la habilidad de editar y eliminar los comentarios de los demas usuarios ya que disponen de un scope especial definido en auth0 llamado gestionar:comentarios. Esto se va a cheackear a traves del middleware de auth0 al llamar a las operaciones de edit y delete comentarios a traves de auth0. El usuario de moderador va a poder ser creado directamente desde el dashboard de auth0

## Access tokens:

Para probar la API con la autenticacion a traves de auth0 como un usuario regular desde el link de swagger, clickear en el boton Authorize y luego ingresar lo siguiente:

Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im5uSDQ1S1c3RUNNcmpqZzRRLVJyRyJ9.eyJpc3MiOiJodHRwczovL2Rldi05aWM2OXdwOC51cy5hdXRoMC5jb20vIiwic3ViIjoiYzRPbXFSb3VXWWhXWmhxNWFEbFJFWlp2VWMwek5YNVlAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vanVhbmJ1bmVzYXBpcmVzdC5oZXJva3VhcHAuY29tLyIsImlhdCI6MTY1NDIwMjUxNiwiZXhwIjoxNjU2MjAyNTE2LCJhenAiOiJjNE9tcVJvdVdZaFdaaHE1YURsUkVaWnZVYzB6Tlg1WSIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsInBlcm1pc3Npb25zIjpbXX0.QaF_N4Rqij4zCbd2KUMpW1VTSN79zo-HwIEOjNYX1kN3aH4CXOjcFdaUfJtORBTl-mAUXevtYB0qEyJlX9TEuXt7nYDQlFsYt5CjnEO53M94o5LLKXfCFZu_PUT3DY5sTYDOpydNKgf4ll9zKYhjODpmeuHJ_m4rMaugqKOPkaEkFK0zZTJNO9Ps0NvFw_dN0CfPpC2AXPkGuizGrRwhjyOKNTlsKlVn_M7Uc2pBgW6YZDGZs31HdL_SEF47x8VnvRtCcpOk261ZfAbEWrzI-hgwB9Eddc1yv_va4202kyCiZY6_A6QlNmUOi-sy7w00f6cbOROk1nnDbptUfvF-NA
#
Para autenticarse como un moderador ingresar:

Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im5uSDQ1S1c3RUNNcmpqZzRRLVJyRyJ9.eyJpc3MiOiJodHRwczovL2Rldi05aWM2OXdwOC51cy5hdXRoMC5jb20vIiwic3ViIjoibG54d3p2b0lmRzZaZFg4ZzdsYTBwQWtqeDJDNk02bnRAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vanVhbmJ1bmVzYXBpcmVzdC5oZXJva3VhcHAuY29tLyIsImlhdCI6MTY1NDIwMjQ0MSwiZXhwIjoxNjU2MjAyNDQxLCJhenAiOiJsbnh3enZvSWZHNlpkWDhnN2xhMHBBa2p4MkM2TTZudCIsInNjb3BlIjoiZ2VzdGlvbmFyOmNvbWVudGFyaW8iLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJwZXJtaXNzaW9ucyI6WyJnZXN0aW9uYXI6Y29tZW50YXJpbyJdfQ.NqLP7Y21ipJ8EXzcQN1kjzdze4jKi-7Cwao6xbWhL4e7QIWhZxltIstY77LI6Oq0Z0--LrXnZJ2DryJe8-POdf9H5pEs9FoSzfZ9l4Q6rDeM-gy4KWnb3MXA7EnNGe4r8tv7ThX9wqwK7WjcIWDvzv3UgwcHkoNIMQKCzoWg6I862htmClw0xAjJpFsemh1n2nJUf9Sdnq95kcyHLLZxDzOT1f7kBBaaZxi4fzetiuv8H4GwKJ91U81RVfeKZf3KE4YokOSNAv_1O4CW9fL6Thd6PyWGy91fOZ2RnzEre2rmfvzbjHJzDyhKA4ZNS5MBcaDS3npYL5DttB2vmuxX_Q

#
Nota: Incluir el Bearer en ambos casos. Los tokens deberian durar un mes desde la creacion del PR.
## Problemas conocidos
Me falto arreglar el problema de que la api devuelve errores en formato HTML en lugar de JSON con los errores relacionados a auth0, por ejemplo cuando se intenta llamar a crear un comentario sin estar autenticado o a editar comentario sin estar autenticado como moderador.
