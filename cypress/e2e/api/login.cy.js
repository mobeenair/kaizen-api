
describe("Reqres API Endpoints Validation", ()=>{

    // LOGIN TEST CASES
    it('POST: Login (Successful)', () => {
      cy.request('POST', `/login`, {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
      }).should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('token');
        expect(response.body.token).to.be.a('string')
        //.and.have.length.greaterThan(0); // change to required token length
      });
    });
    
    it('POST: Login (Unsuccessful - Missing Password)', () => {
      cy.request({
        method: 'POST',
        url: `/login`,
        failOnStatusCode: false,
        body: { email: 'eve.holt@reqres.in' } // password missing 
      }).should((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.error).to.eq('Missing password');
      });
    });
});   
