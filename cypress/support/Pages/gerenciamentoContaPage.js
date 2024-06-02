export default class GerenciamentoContaPage {
    visitLogin() {
        cy.visit('/login');
    }

    visitGerenciamento() {
        cy.visit('/account');
    }

    verificarDadosRelevantes(nome, email) {
        cy.get('input[placeholder="Nome"]').should('be.visible').and('have.value', nome);
        cy.get('input[placeholder="E-mail"]').should('be.visible').and('have.value', email.toLowerCase());
    }

    inputLogin(email, password) {
        cy.get('input[name="email"]').should('be.visible').type(email);
        cy.get('input[name="password"]').should('be.visible').type(password);
        cy.contains('button', 'Login').should('be.visible').click();
    }

    alterarNome(nome) {
        cy.get('input[placeholder="Nome"]').clear().type(nome, { force: true });
    }

    clearNome() {
        cy.get('input[name="name"]').clear();
    }

    clickAlterarSenha() {
        cy.contains('button', 'Alterar senha').should('be.visible').click();
    }

    alterarSenha(novaSenha) {
        cy.get('input[placeholder="Senha"]').should('be.visible').clear({ force: true }).type(novaSenha, { force: true });
    }

    confirmarSenha(confirmacaoSenha) {
        cy.get('input[placeholder="Confirmar senha"]').should('be.visible').clear({ force: true }).type(confirmacaoSenha, { force: true });
    }

    clicarSalvar() {
        cy.contains('button', 'Salvar').should('be.visible').click();
    }

    verificarAtualizacaoSucesso() {
        cy.contains('Informações atualizadas!').should('be.visible');
    }

    verificarErroSenhasNaoCoincidem() {
        cy.contains('As senhas devem ser iguais.').should('be.visible');
    }

    verificarErroCampoObrigatorio(campo) {
        cy.contains(`O campo ${campo} é obrigatório`).should('be.visible');
    }

    verificarErroSenhaInvalida() {
        cy.contains('A senha deve ter no mínimo 6 caracteres').should('be.visible');
    }

    visitarSemAutenticacao() {
        cy.visit('/gerenciamento-de-conta');
    }

    verificarErroNomeObrigatorio() {
        cy.contains(`Informe o nome.`).should('be.visible');
    }

    preencherFormularioAPI(nome, email) {
        return cy.request({
            method: 'POST',
            url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users',
            body: {
                name: nome,
                email: email,
                password: 'senha123',
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.body;
        });
    }

    verificarErroSenhaMinimoCaracteres() {
        cy.contains(`A senha deve ter pelo menos 6 dígitos.`).should('be.visible');
    }
}
