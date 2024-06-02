import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import loginUsuarioPage from "../Pages/loginUsuarioPage";
import { fakerPT_BR } from "@faker-js/faker";


const loginPage = new loginUsuarioPage;


Given('que estou autenticado no sistema e acesso a página de login', () => {
    const nome = fakerPT_BR.name.firstName();
    const email = fakerPT_BR.internet.email();
    const password = 'senha123';
    
    loginPage.preencherFormularioAPI(nome, email).then(() => {
        cy.wrap(email).as('userEmail');
        cy.wrap(password).as('userPassword');
        loginPage.visit();
    });
});

When('preencho o campo de email com {string}', (email) => {
    cy.get('@userEmail').then((userEmail) => {
        loginPage.inputEmail(userEmail);
    });
});

When('preencho o campo de senha com {string}', (password) => {
    cy.get('@userPassword').then((userPassword) => {
        loginPage.inputPassword(userPassword);
    });
});

When('clico no botão de login', () => {
    loginPage.clickLoginButton();
});

Then('devo ser redirecionado para a página principal', () => {
    cy.url().should('eq', 'https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/login');
});


When('tento efetuar login com campos de email e senha vazios', () => {
    loginPage.visit();
    loginPage.clickLoginButton();
});

Then('devo ver a mensagem de erro para os campos que não foram preenchidos', () => {
    loginPage.mensagemDeErroEmail();
    loginPage.mensagemDeErroPassword();
});

When('preencho o campo de email com um email inválido {string}', (email) => {
    
        loginPage.inputEmail(email);
      
    });

When('preencho o campo de senha com a senha valida', () => {
    cy.get('@userPassword').then((userPassword) => {
    loginPage.inputPassword(userPassword);
});
});

When('tento efetuar o login', () => {
    loginPage.clickLoginButton();
});

Then('devo ver a mensagem de erro {string}', () => {
    loginPage.mensagemEmailInvalido();
});





When('preencho o campo de email com email cadastrado', () => {
    loginPage.visit();
    cy.get('@userEmail').then((userEmail) => {
        loginPage.inputEmail(userEmail);
    });
});

When('preencho o campo de senha com a {string}', (senha) => {
    loginPage.inputPassword(senha);
});

When('executo o botão de login', () => {
    loginPage.clickLoginButton();
});

Then('devo ver uma mensagem de erro {string}', (mensagemErro) => {
    loginPage.mensagemSenhaInvalida(mensagemErro);
});