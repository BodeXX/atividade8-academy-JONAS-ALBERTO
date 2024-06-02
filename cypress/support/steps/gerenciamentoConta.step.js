import { Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";
import GerenciamentoContaPage from "../Pages/gerenciamentoContaPage";
import { fakerPT_BR } from "@faker-js/faker";

const gerenciamentoContaPage = new GerenciamentoContaPage();

Given('que estou autenticado no sistema', () => {
    const nome = fakerPT_BR.name.firstName();
    const email = fakerPT_BR.internet.email();
    const password = 'senha123';

    gerenciamentoContaPage.preencherFormularioAPI(nome, email).then(() => {
        cy.wrap(nome).as('userName');
        cy.wrap(email).as('userEmail');
        cy.wrap(password).as('userPassword');
    });
});

When('o usuario efetua o login', function() {
    cy.get('@userEmail').then((email) => {
        cy.get('@userPassword').then((password) => {
            gerenciamentoContaPage.visitLogin();
            gerenciamentoContaPage.inputLogin(email, password);

            cy.intercept('POST', '**/api/auth/login').as('loginRequest');
            cy.wait('@loginRequest').then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
                
                cy.wait(2000);
            });
        });
    });
});

When('o usuario acessa a página de gerenciamento de conta', () => {
    gerenciamentoContaPage.visitGerenciamento();
});

Then('devera ver todos os seus dados relevantes', function() {
    cy.get('@userName').then((nome) => {
        cy.get('@userEmail').then((email) => {
            gerenciamentoContaPage.verificarDadosRelevantes(nome, email);
        });
    });
});


When('o usuario efetua o login e acessa o gerenciamento de conta', () => {
    cy.get('@userEmail').then((email) => {
        cy.get('@userPassword').then((password) => {
            gerenciamentoContaPage.visitLogin();
            gerenciamentoContaPage.inputLogin(email, password);

            cy.intercept('POST', '**/api/auth/login').as('loginRequest');
            cy.wait('@loginRequest').then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
                cy.wait(4000);
            });
        });
    });
});

When('altero meu nome para {string}', (novoNome) => {
    gerenciamentoContaPage.visitGerenciamento();
    gerenciamentoContaPage.alterarNome(novoNome);
    cy.wrap(novoNome).as('novoNome');
});

When('preencho o campo de senha com {string}', (novaSenha) => {
    gerenciamentoContaPage.alterarSenha(novaSenha);
    cy.wrap(novaSenha).as('novaSenha');
});

When('preencho o campo de confirmação de senha com {string}', (confirmacaoSenha) => {
    gerenciamentoContaPage.confirmarSenha(confirmacaoSenha);
});

When('clico em salvar', () => {
    gerenciamentoContaPage.clicarSalvar();
});

Then('minhas informações devem ser atualizadas com sucesso', () => {
    gerenciamentoContaPage.verificarAtualizacaoSucesso();
});



When('estou autenticado e acesso o gerenciamento de conta', () => {
    cy.get('@userEmail').then((email) => {
        cy.get('@userPassword').then((password) => {
            gerenciamentoContaPage.visitLogin();
            gerenciamentoContaPage.inputLogin(email, password);

            cy.intercept('POST', '**/api/auth/login').as('loginRequest');
            cy.wait('@loginRequest').then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
                cy.wait(2000);

            });
        });
    });
});

When('preencho o campo de senha com a {string}', (novaSenha) => {
    gerenciamentoContaPage.visitGerenciamento();
    gerenciamentoContaPage.clickAlterarSenha();
    gerenciamentoContaPage.alterarSenha(novaSenha);
});

When('preencho o campo de confirmação de senha {string}', (confirmacaoSenha) => {
    gerenciamentoContaPage.confirmarSenha(confirmacaoSenha);
});

When('seleciono o botão salvar', () => {
    gerenciamentoContaPage.clicarSalvar();
});

Then('devo ver uma mensagem de erro indicando que as senhas não coincidem', () => {
    gerenciamentoContaPage.verificarErroSenhasNaoCoincidem();
});


Given('que não estou autenticado no sistema', () => {
    cy.clearCookies();
    cy.clearLocalStorage();
});

When('tento acessar a página de gerenciamento de conta', () => {
    gerenciamentoContaPage.visitGerenciamento();
});

Then('devo ser redirecionado para a página de login', () => {
    cy.url().should('include', '/login');
    cy.get('h3').should('contain', 'Login');
});

Given('que acessei a página de gerenciamento de conta', () => {
    cy.get('@userEmail').then((email) => {
        cy.get('@userPassword').then((password) => {
            gerenciamentoContaPage.visitLogin();
            gerenciamentoContaPage.inputLogin(email, password);

            cy.intercept('POST', '**/api/auth/login').as('loginRequest');
            cy.wait('@loginRequest').then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
                cy.wait(2000);

            });
        });
    });
});

When('deixo o campo de nome vazio', () => {
    gerenciamentoContaPage.visitGerenciamento();
    gerenciamentoContaPage.clearNome();
});

When('executo o botao de salvar', () => {
    gerenciamentoContaPage.clicarSalvar();
});

Then('devo ver uma mensagem de erro indicando que o nome é obrigatório', () => {
    gerenciamentoContaPage.verificarErroNomeObrigatorio();
});


When('preencho o campo de senha com formato invalido {string}', (senha) => {
    gerenciamentoContaPage.visitGerenciamento();
    gerenciamentoContaPage.clickAlterarSenha();
    gerenciamentoContaPage.alterarSenha(senha);
});

When('preencho o campo de confirmação de senha com formato invalido {string}', (confirmacaoSenha) => {
    gerenciamentoContaPage.confirmarSenha(confirmacaoSenha);
});

When('executo o botao salvar', () => {
    gerenciamentoContaPage.clicarSalvar();
});

Then('devo ver uma mensagem de erro indicando que a senha deve ter no mínimo 6 caracteres', () => {
    gerenciamentoContaPage.verificarErroSenhaMinimoCaracteres();
});