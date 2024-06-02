#language: pt

Funcionalidade: Registro de Usuário

    Contexto: 
    Dado que acessei a pagina de cadastro

    
    Cenario: Campos obrigatórios para o cadastro
        Quando tento me cadastrar sem preencher os campos obrigatórios
        Então Devo ver mensagens de erro indicando que os campos "nome", "email" e "senha" são obrigatórios

    @emailEmUso
    Cenario: Não pode existir mais de um usuário com o mesmo e-mail
        Quando tento me cadastrar com um email ja utilizado 
        Então eu devo ver uma mensagem de alerta indicando que o e-mail já está em uso

    
    Cenario: Novo usuário sempre é criado com o tipo 0 (usuário comum)
        Quando preencho o formulário de cadastro com nome, email, senha e confirmo cadastro
        Então o novo usuário deve ser criado com o tipo 0 de usuário comum

    Cenario: Tipos de usuário ADMIN
        Dado que acessei a pagina de login
        Quando possuo um usuario comum no sistema
        E faço uma requisição PATCH pela API para promover o usuario comum
        Então o novo usuário deve ser promovido a ADMIN com o tipo 1


    Cenario: Tipos de usuário CRITICO
        Quando possuo um usuario comum no sistema cadastrado
        E executo uma requisição PATCH pela API para promover o usuario comum a critico
        Então o novo usuário deve ser promovido a ADMIN com o tipo 2

    
