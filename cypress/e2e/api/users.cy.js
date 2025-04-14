describe('Reqres API Tests', () => {
    const baseUrl = 'https://reqres.in/api';
  
    it('GET list of users', () => {
      cy.request(`${baseUrl}/users?page=2`)
        .should((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.data).to.have.length(6);
        });
    });
  
    it('GET single user', () => {
      cy.request(`${baseUrl}/users/2`)
        .should((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.data).to.have.property('id', 2);
        });
    });
  
    it('POST create user', () => {
      cy.fixture('userData').then((data) => {
        cy.request('POST', `${baseUrl}/users`, data.createUser)
          .should((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('name', data.createUser.name);
          });
      });
    });
  
    it('PUT update user', () => {
      cy.fixture('userData').then((data) => {
        cy.request('PUT', `${baseUrl}/users/2`, data.updateUser)
          .should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('name', data.updateUser.name);
          });
      });
    });
  
    it('DELETE user', () => {
      cy.request('DELETE', `${baseUrl}/users/2`)
        .should((response) => {
          expect(response.status).to.eq(204);
        });
    });
  });
  