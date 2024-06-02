let token;

Cypress.Commands.add('loginPromoterADM', (email, password) => {
    cy.request({
      method: 'POST',
      url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/auth/login',
      body: {
        email: email,
        password: password
      }
    }).then((loginResponse) => {
      expect(loginResponse.status).to.eq(200);
      
      token = loginResponse.body.accessToken;
      
      
      cy.request({
        method: 'PATCH',
        url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users/admin',
        headers: {
          Authorization: `Bearer ${token}`
        }
        
      }).then((promoteResponse) => {
        
        expect(promoteResponse.status).to.eq(204);
      });
    });
  });

  Cypress.Commands.add('buscarUser', (userID) => {
    cy.request({
      method: 'GET',
      url: `https://raromdb-3c39614e42d4.herokuapp.com/api/users/${userID}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  });


  Cypress.Commands.add('loginPromoterCritico', (email, password) => {
    cy.request({
      method: 'POST',
      url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/auth/login',
      body: {
        email: email,
        password: password
      }
    }).then((loginResponse) => {
      expect(loginResponse.status).to.eq(200);
      
      token = loginResponse.body.accessToken;
      
      
      cy.request({
        method: 'PATCH',
        url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users/apply',
        headers: {
          Authorization: `Bearer ${token}`
        }
        
      }).then((promoteResponse) => {
        
        expect(promoteResponse.status).to.eq(204);
      });
    });
  });
