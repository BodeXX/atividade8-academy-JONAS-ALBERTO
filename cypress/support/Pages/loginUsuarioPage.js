export default class loginUsuarioPage {

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

    visit() {
        cy.visit('/login');
    }

    inputEmail(email) {
        cy.get('input[placeholder="E-mail"]').type(email);
    }

    inputPassword(senha) {
        cy.get('input[placeholder="Password"]').type(senha);
    }

    clickLoginButton() {
        cy.contains('button', 'Login').should('be.visible').click();
    }

    mensagemDeSucesso(message) {
        cy.get('.success-message').should('contain', message);
    }

    mensagemDeErroEmail() {
        cy.contains('Informe o e-mail.').should('be.visible');
    }

    mensagemDeErroPassword() {
        cy.contains('Informe a senha').should('be.visible');
    }

    mensagemEmailInvalido() {
        cy.contains('Informe um e-mail válido.').should('be.visible');
    }

    mensagemSenhaInvalida() {
        cy.contains('Usuário ou senha inválidos.').should('be.visible');
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
}

