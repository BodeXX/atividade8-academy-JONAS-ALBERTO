#language: pt
Funcionalidade: Login de usuario


    Contexto:
    Dado que estou autenticado no sistema e acesso a página de login

    
  Cenário: Login com sucesso
      Quando preencho o campo de email com "usuario@example.com"
      E preencho o campo de senha com "senha123"
      E clico no botão de login
      Então devo ser redirecionado para a página principal
    


    Cenário: Tentativa de login com campos vazios
      Quando tento efetuar login com campos de email e senha vazios
      Então devo ver a mensagem de erro para os campos que não foram preenchidos


    
    Esquema do Cenário: Login com email inválido
      Quando preencho o campo de email com um email inválido "<email>"
      Quando preencho o campo de senha com a senha valida
      Quando tento efetuar o login
      Então devo ver a mensagem de erro "Informe um e-mail válido."

      Exemplos:
    | email               |
    | emailinvalido       |
    | email@invalido      |
    | invalido@dominio    |
    | @invalido.com       |
    | email.com           |

    
    Esquema do Cenário: Login com senha inválida
      Quando preencho o campo de email com email cadastrado
      Quando preencho o campo de senha com a "<senha>"
      Quando executo o botão de login
      Então devo ver uma mensagem de erro "Usuário ou senha inválidos."
    
    Exemplos:
      | senha                                                                                                                                                   |
      | 123456                                                                                                                                                  |
      | pass                                                                                                                                                    |
      | se%nh@                                                                                                                                                  |
      | 123                                                                                                                                                     |
      | abcd                                                                                                                                                    |
      | senha muito longa demais demais demais demais demais demais demais demais demais demais demais demais demais demais demais demais demais demais demais demais demais demais demais demais demais demais demais demais demais demais demais demais |