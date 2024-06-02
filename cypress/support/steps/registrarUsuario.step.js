import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";
import RegistrarUsuarioPage from "../Pages/RegistrarUsuarioPage";
import { fakerPT_BR } from "@faker-js/faker";

const registroPage = new RegistrarUsuarioPage();

const nome = fakerPT_BR.name.firstName();
const email = fakerPT_BR.internet.email();
const password = fakerPT_BR.internet.password(8);

Given('que acessei a pagina de cadastro', function () {
    registroPage.visit();
});

When('tento me cadastrar sem preencher os campos obrigatórios', () => {
    registroPage.clickCadastrar();
});

Then('Devo ver mensagens de erro indicando que os campos "nome", "email" e "senha" são obrigatórios', () => {
    cy.contains('Informe o nome');
    cy.contains('Informe o e-mail');
    cy.contains('Informe a senha');
});

Before({ tags: "@emailEmUso" }, function () {
    const email = fakerPT_BR.internet.email();
    const password = fakerPT_BR.internet.password(8);

    cy.wrap(email).as("emailCadastrado");
    cy.wrap(password).as("senhaCadastrada");

    cy.request(
        "POST",
        "https://raromdb-3c39614e42d4.herokuapp.com/api/users",
        {
            name: fakerPT_BR.person.fullName(),
            email,
            password,
        }
    );
});

When('tento me cadastrar com um email ja utilizado', function () {
    cy.get('@emailCadastrado').then((emailCadastrado) => {
        registroPage.preencherFormulario(nome, emailCadastrado, password, password);
        registroPage.clickCadastrar();
    });
});

Then('eu devo ver uma mensagem de alerta indicando que o e-mail já está em uso', () => {
    cy.get('.error-message').should('be.visible');
});

When('preencho o formulário de cadastro com nome, email, senha e confirmo cadastro', () => {
    const nome = fakerPT_BR.name.firstName();
    const email = fakerPT_BR.internet.email();
    const password = 'senha123'; 
  
    registroPage.preencherFormularioAPI(nome, email).then((response) => {
      cy.wrap(response).as('usuarioCriado');
      cy.wrap(email).as("emailCadastrado");
      cy.wrap(password).as("senhaCadastrada");
    });
  });
  
  Then('o novo usuário deve ser criado com o tipo 0 de usuário comum', function () {
    cy.get('@usuarioCriado').then((usuarioCriado) => {
      expect(usuarioCriado.type).to.eq(0);
    });
  });



Given('que acessei a pagina de login', () => {
    cy.visit('/login');
});

When('possuo um usuario comum no sistema', function () {
    const nome = fakerPT_BR.name.firstName();
    const email = fakerPT_BR.internet.email();
    const password = 'senha123';

    registroPage.preencherFormularioAPI(nome, email).then((response) => {
        cy.wrap(response.body).as('usuarioCriado');
        cy.wrap(response.id).as('userID');
        cy.wrap(response.type).as('tipoUsuario');
        cy.wrap(email).as("emailCadastrado");
        cy.wrap(password).as("senhaCadastrada");

        registroPage.getToken(email, password).then((token) => {
            cy.wrap(token).as('accessToken');
        });
    });
});

When('faço uma requisição PATCH pela API para promover o usuario comum', function () {
    
           cy.get('@emailCadastrado').then((email) => {
            cy.get('@senhaCadastrada').then((password) => {
                cy.loginPromoterADM(email, password);
            });
        });
    });

    Then('o novo usuário deve ser promovido a ADMIN com o tipo 1', function () {
        cy.get('@userID').then((userID) => {
            cy.buscarUser(userID).then((response) => {
                expect(response.status).to.eq(200); 
                expect(response.body.type).to.eq(2);
            });
        });
    });



    
    When('possuo um usuario comum no sistema cadastrado', function () {
        const nome = fakerPT_BR.name.firstName();
        const email = fakerPT_BR.internet.email();
        const password = 'senha123';
    
        registroPage.preencherFormularioAPI(nome, email).then((response) => {
            cy.wrap(response.body).as('usuarioCriado');
            cy.wrap(response.id).as('userID');
            cy.wrap(response.type).as('tipoUsuario');
            cy.wrap(email).as("emailCadastrado");
            cy.wrap(password).as("senhaCadastrada");
    
            registroPage.getToken(email, password).then((token) => {
                cy.wrap(token).as('accessToken');
            });
        });
    });
    
    When('executo uma requisição PATCH pela API para promover o usuario comum a critico', function () {
        
               cy.get('@emailCadastrado').then((email) => {
                cy.get('@senhaCadastrada').then((password) => {
                    cy.loginPromoterCritico(email, password);
                });
            });
        });
    
        Then('o novo usuário deve ser promovido a ADMIN com o tipo 2', function () {
            cy.get('@userID').then((userID) => {
                cy.buscarUser(userID).then((response) => {
                    expect(response.status).to.eq(200); 
                    expect(response.body.type).to.eq(1);
                });
            });
        });