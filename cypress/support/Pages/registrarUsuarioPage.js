export default class RegistrarUsuarioPage {
    nomeInput = 'input[placeholder="Nome"]';
    emailInput = 'input[placeholder="E-mail"]';
    senhaInput = 'input[placeholder="Senha"]';
    confirmSenhaInput = 'input[placeholder="Confirmar senha"]';
    nomeLogin = 'input[placeholder="E-mail"]';
    nomeSenha = 'input[placeholder="Password"]';
    loginButton = '.login-button';

    typeNome(nome) {
        cy.get(this.nomeInput).type(nome);
    }

    typeEmail(email) {
        cy.get(this.emailInput).type(email);
    }

    typePassword(password) {
        cy.get(this.senhaInput).type(password);
    }

    typePasswordConfirm(confirmPassword) {
        cy.get(this.confirmSenhaInput).type(confirmPassword);
    }

    preencherFormulario(nome, email, password, confirmPassword) {
        this.typeNome(nome);
        this.typeEmail(email);
        this.typePassword(password);
        this.typePasswordConfirm(confirmPassword);
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

    clickCadastrar() {
        cy.contains("Cadastrar").click();
    }

    visit() {
        cy.visit('/register');
    }

    getToken(email, senha) {
        const credentials = { email, password: senha };
        return cy.request('POST', 'https://raromdb-3c39614e42d4.herokuapp.com/api/auth/login', credentials)
            .its('body.accessToken');
    }

    verificarTipoUser(token, email, tipoEsperado) {
        cy.request({
            method: 'GET',
            url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            const users = response.body;
            const user = users.find(user => user.email === email);
            expect(user).to.not.be.undefined;
            expect(user.type).to.equal(tipoEsperado);
        });
    }

    loginUsuario(email, password) {
        cy.get(this.nomeLogin).type(email);
        cy.get(this.nomeSenha).type(password);
        cy.get(this.loginButton).click();
    }

    promoverUsuario(userId, token) {
        return cy.request({
            method: 'PATCH',
            url: `https://raromdb-3c39614e42d4.herokuapp.com/api/users/${userId}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}
