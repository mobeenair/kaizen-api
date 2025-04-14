import { listUsersSchema, singleUserSchema, createUserSchema, updateUserSchema} from '../../fixtures/schemas/userSchema';

describe('Reqres API Endpoints Validation', () => {
  // const baseUrl = 'https://reqres.in/api'; // add in config baseurl

  it('GET list of users', () => {
    cy.request(`/users?page=2`)
      .should((response) => {
        expect(response.status).to.eq(200);
        let resBody = response.body
        expect(resBody.data).to.have.length(6);
        expect(resBody).to.have.property("page", 2)
        expect(resBody).to.be.jsonSchema(listUsersSchema);
      });
  });

  it('GET single user', () => {
    cy.request(`/users/2`)
      .should((response) => {
        expect(response.status).to.eq(200);
        let resBody = response.body
        expect(resBody.data).to.have.property('id', 2);
        expect(resBody).to.be.jsonSchema(singleUserSchema);
      });
  });

  it('POST create user', () => {
    cy.fixture('userData').then((data) => {
      cy.request('POST', `/users`, data.createUser)
        .should((response) => {
          expect(response.status).to.eq(201);
          let res = response.body
          // check data
          expect(res).to.have.property('name', data.createUser.name);
          expect(res).to.have.property('job', data.createUser.job);
          // check schema
          expect(res).to.be.jsonSchema(createUserSchema);
        });
    });
  });

  it('PUT update user', () => {
    cy.fixture('userData').then((data) => {
      cy.request('PUT', `/users/2`, data.updateUser)
        .should((response) => {
          expect(response.status).to.eq(200);
          let res = response.body
          expect(res).to.have.property('name', data.updateUser.name);
          expect(res).to.have.property('job', data.updateUser.job);
          expect(res).to.be.jsonSchema(updateUserSchema);
        });
    });
  });

  it('DELETE user', () => {
    cy.request('DELETE', `/users/2`)
      .should((response) => {
        expect(response.status).to.eq(204);
        expect(response.body).to.be.empty;
      });
  });

  // DELAYED RESPONSE
  it('GET Delayed Response', () => {
    const start = Date.now();
  
    cy.request('/users?delay=3').then((response) => {
      
      expect(response.status).to.eq(200);
      const duration = Date.now() - start; // duration to get reponse >= ~3s
      expect(duration).to.be.gte(2900);
      expect(response.body.data).to.be.an('array');
    });
  });
});
