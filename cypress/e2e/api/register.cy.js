
describe("Reqres API Endpoints Validation", ()=>{
    // REGISTER TEST CASES
    it('POST: Register (Successful)', () => {
        cy.request('POST', `/register`, {
          email: 'eve.holt@reqres.in',
          password: 'pistol'
        }).should((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.all.keys('id', 'token');
        });
      });
      
      it('POST: Register (Unsuccessful - Missing Password)', () => {
        cy.request({
          method: 'POST',
          url: `/register`,
          failOnStatusCode: false,
          body: { email: 'sydney@fife' }
        }).should((response) => {
          expect(response.status).to.eq(400);
          expect(response.body.error).to.eq('Missing password');
        });
      });    
});