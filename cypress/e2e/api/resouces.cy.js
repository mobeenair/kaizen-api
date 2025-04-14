import { singleResourceSchema, listResourceSchema } from '../../fixtures/schemas/resourceSchemas';

describe('Reqres API - Resource Endpoint Tests', () => {
      
    it('GET: List <resource>', () => {
      cy.request(`/unknown`).should((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.data).to.be.an('array');
        expect(res.body.data.length).to.eq(6);
        expect(res.body).to.be.jsonSchema(listResourceSchema);

      });
    });
  
    it('GET: Single <resource>', () => {
      cy.request(`/unknown/2`).should((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.data).to.have.property('id', 2);
        expect(res.body).to.be.jsonSchema(singleResourceSchema);
      });
    });
  
    it('GET: Single <resource> not found', () => {
      cy.request({
        method: 'GET',
        url: `/unknown/23`,
        failOnStatusCode: false
      }).should((res) => {
        expect(res.status).to.eq(404);
        expect(res.body).to.be.empty;
      });
    });
  });