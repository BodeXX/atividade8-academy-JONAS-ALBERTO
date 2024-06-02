# language: pt
Funcionalidade: Gerenciamento de Conta

    Contexto:
      Dado que estou autenticado no sistema
   
  Cenário: Usuário comum acessa a edição de informações
    Quando o usuario efetua o login
    Quando o usuario acessa a página de gerenciamento de conta
    Então devera ver todos os seus dados relevantes
   
  Cenário: Usuário comum tenta alterar suas próprias informações
    Quando o usuario efetua o login e acessa o gerenciamento de conta
    Quando altero meu nome para "Novo Nome"
    Quando preencho o campo de senha com "novaSenha123"
    Quando preencho o campo de confirmação de senha com "novaSenha123"
    Quando clico em salvar
    Então minhas informações devem ser atualizadas com sucesso
   
  Cenário: Usuário tenta alterar a senha sem confirmar corretamente
    Quando estou autenticado e acesso o gerenciamento de conta
    Quando preencho o campo de senha com a "novaSenha123"
    E preencho o campo de confirmação de senha "senhaDiferente123"
    E seleciono o botão salvar
    Então devo ver uma mensagem de erro indicando que as senhas não coincidem
   
  Cenário: Usuário não autenticado tenta acessar a página de gerenciamento de conta
    Dado que não estou autenticado no sistema
    Quando tento acessar a página de gerenciamento de conta
    Então devo ser redirecionado para a página de login

  
  Cenário: Usuário tenta alterar informações com campos obrigatórios vazios
    Dado que acessei a página de gerenciamento de conta
    Quando deixo o campo de nome vazio
    E executo o botao de salvar
    Então devo ver uma mensagem de erro indicando que o nome é obrigatório

  
  Cenário: Usuário tenta alterar a senha com um formato inválido
    Dado que acessei a página de gerenciamento de conta
    Quando preencho o campo de senha com formato invalido "123"
    E preencho o campo de confirmação de senha com formato invalido "123"
    E executo o botao salvar
    Então devo ver uma mensagem de erro indicando que a senha deve ter no mínimo 6 caracteres
