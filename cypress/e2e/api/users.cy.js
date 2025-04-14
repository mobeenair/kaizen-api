import { listUsersSchema, singleUserSchema, createUserSchema, updateUserSchema} from '../../fixtures/schemas/userSchema';

describe('Reqres API Endpoints Validation', () => {
  // const baseUrl = 'https://reqres.in/api'; // add in config baseurl

  it('GET list of users', () => {
    cy.request(`/users?page=2`)
      .should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.have.length(6);
        expect(response.body).to.be.jsonSchema(listUsersSchema);
      });
  });

  it('GET single user', () => {
    cy.request(`/users/2`)
      .should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.have.property('id', 2);
        expect(response.body).to.be.jsonSchema(singleUserSchema);
      });
  });

  it('POST create user', () => {
    cy.fixture('userData').then((data) => {
      cy.request('POST', `/users`, data.createUser)
        .should((response) => {
          expect(response.status).to.eq(201);
          expect(response.body).to.have.property('name', data.createUser.name);
          expect(response.body).to.have.property('job', data.createUser.job);

          expect(response.body).to.be.jsonSchema(createUserSchema);
        });
    });
  });

  it('PUT update user', () => {
    cy.fixture('userData').then((data) => {
      cy.request('PUT', `/users/2`, data.updateUser)
        .should((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('name', data.updateUser.name);
          expect(response.body).to.have.property('job', data.updateUser.job);

          expect(response.body).to.be.jsonSchema(updateUserSchema);
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
});
