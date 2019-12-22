//During the test the env variable is set to test
process.env.NODE_ENV = 'test';


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Matched Results', () => {
  /*
  * Test the /GET route
  */
  describe('/GET search', () => {
      it('it should GET all the results', (done) => {
      	let search_query = {
              search_term: "Invester",
              per_page: 2,
              page_no: 1
          }
        chai.request("http://localhost:3000")
            .get('/search')
            .set('Content-Type', 'application/json')
            .send(search_query)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('data');
                  res.body.should.have.property('message');
                  res.body.data.should.be.a('array');
                  res.body.message.should.be.a('string');
                  // res.body.data.length.should.be.noeql(0);
              done();
            });
      });
      
  });

});

describe('Matched Results', () => {
  /*
  * Test the /GET route
  */
  describe('/GET search', () => {
      it('it should make request without mandatory params', (done) => {
      	let search_query = {
              per_page: 2,
              page_no: 1
          }
        chai.request("http://localhost:3000")
            .get('/search')
            .set('Content-Type', 'application/json')
            .send(search_query)
            .end((err, res) => {
                  res.should.have.status(200);
                  //res.body.should.have.property('data');
                  res.body.data.should.be.a('array');
                  res.body.error.should.be.a('string');
                  // res.body.data.length.should.be.noeql(0);
              done();
            });
      });
  });

});


describe('Matched Results', () => {
  /*
  * Test the /GET route
  */
  describe('/GET search', () => {
      it('Exact result match one keyword', (done) => {
      	let search_query = {
              search_term: "'Investor Brand'",
              per_page: 3,
              page_no: 1
          }
        chai.request("http://localhost:3000")
            .get('/search')
            .set('Content-Type', 'application/json')
            .send(search_query)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('data');
                  res.body.should.have.property('message').eql('success');
                  res.body.should.have.property('message');
                  res.body.data.length.should.be.eql(2);
                  res.body.message.should.be.a('string');
                  // res.body.data.length.should.be.noeql(0);
              done();
            });
      });
      
  });

});


describe('Matched Results', () => {
  /*
  * Test the /GET route
  */
  describe('/GET search', () => {
      it('Exact result match two keywords', (done) => {
      	let search_query = {
              search_term: "'Investor' 'Brand'",
              per_page: 3,
              page_no: 1
          }
        chai.request("http://localhost:3000")
            .get('/search')
            .set('Content-Type', 'application/json')
            .send(search_query)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('data');
                  res.body.should.have.property('message').eql('success');
                  res.body.should.have.property('message');
                  res.body.data.length.should.be.eql(2);
                  res.body.message.should.be.a('string');
              done();
            });
      });
      
  });

});


describe('Matched Results', () => {
  /*
  * Test the /GET route
  */
  describe('/GET search', () => {
      it('In word match result', (done) => {
      	let search_query = {
              search_term: "Investor Brand",
              per_page: 3,
              page_no: 1
          }
        chai.request("http://localhost:3000")
            .get('/search')
            .set('Content-Type', 'application/json')
            .send(search_query)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('data');
                  res.body.should.have.property('message');
                  res.body.should.have.property('message').eql('success');
                  res.body.data[0].should.have.property('name').eql('Investor Brand Executive');
              done();
            });
      });
      
  });

});


describe('Matched Results', () => {
  /*
  * Test the /GET route
  */
  describe('/GET search', () => {
      it('In word match result sorted by timestamp', (done) => {
      	let search_query = {
              search_term: "Investor Brand",
              per_page: 3,
              page_no: 1,
              sort_by: "timestamp"
          }
        chai.request("http://localhost:3000")
            .get('/search')
            .set('Content-Type', 'application/json')
            .send(search_query)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('data');
                  res.body.should.have.property('message');
                  res.body.should.have.property('message').eql('success');
                  res.body.data[0].should.have.property('name').eql('Global Brand Analyst');
              done();
            });
      });
      
  });

});


describe('Matched Results', () => {
  /*
  * Test the /GET route
  */
  describe('/GET search', () => {
      it('In word match result sorted by name', (done) => {
      	let search_query = {
              search_term: "Investor Brand",
              per_page: 3,
              page_no: 1,
              sort_by: "name"
          }
        chai.request("http://localhost:3000")
            .get('/search')
            .set('Content-Type', 'application/json')
            .send(search_query)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('data');
                  res.body.should.have.property('message');
                  res.body.should.have.property('message').eql('success');
                  res.body.data[0].should.have.property('name').eql('Chief Brand Orchestrator');
              done();
            });
      });
      
  });

});


describe('Matched Results', () => {
  /*
  * Test the /GET route
  */
  describe('/GET search', () => {
      it('Exact match result comparison', (done) => {
      	let search_query = {
              search_term: "'Investor Brand'",
              per_page: 3,
              page_no: 1,
              sort_by: "name"
          }
        chai.request("http://localhost:3000")
            .get('/search')
            .set('Content-Type', 'application/json')
            .send(search_query)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('data');
                  res.body.should.have.property('message');
                  res.body.should.have.property('message').eql('success');
                  res.body.data[0].should.have.property('name').eql('Investor Brand Executive');
                  res.body.data[1].should.have.property('name').eql('Investor Brand Planner');
              done();
            });
      });
      
  });

});


describe('Matched Results', () => {
  /*
  * Test the /GET route
  */
  describe('/GET search', () => {
      it('Exact match result comparison all small letters', (done) => {
      	let search_query = {
              search_term: "'investor'",
              per_page: 3,
              page_no: 1,
              sort_by: "name"
          }
        chai.request("http://localhost:3000")
            .get('/search')
            .set('Content-Type', 'application/json')
            .send(search_query)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('data');
                  res.body.should.have.property('message');
                  res.body.should.have.property('message').eql('success');
                  res.body.total_count.should.be.eql(4);
              done();
            });
      });
      
  });

});

describe('Matched Results', () => {
  /*
  * Test the /GET route
  */
  describe('/GET search', () => {
      it('Exact match result comparison with all capital letters', (done) => {
      	let search_query = {
              search_term: "'INVESTOR'",
              per_page: 3,
              page_no: 1,
              sort_by: "name"
          }
        chai.request("http://localhost:3000")
            .get('/search')
            .set('Content-Type', 'application/json')
            .send(search_query)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('data');
                  res.body.should.have.property('message');
                  res.body.should.have.property('message').eql('success');
                  res.body.total_count.should.be.eql(4);
              done();
            });
      });
      
  });

});

describe('Matched Results', () => {
  /*
  * Test the /GET route
  */
  describe('/GET search', () => {
      it('Exact match result comparison with capitalised string', (done) => {
      	let search_query = {
              search_term: "'Investor'",
              per_page: 3,
              page_no: 1,
              sort_by: "name"
          }
        chai.request("http://localhost:3000")
            .get('/search')
            .set('Content-Type', 'application/json')
            .send(search_query)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('data');
                  res.body.should.have.property('message');
                  res.body.should.have.property('message').eql('success');
                  res.body.total_count.should.be.eql(4);
              done();
            });
      });
      
  });

});


describe('Matched Results', () => {
  /*
  * Test the /GET route
  */
  describe('/GET search', () => {
      it('In word match result comparison with all small letters', (done) => {
      	let search_query = {
              search_term: "investor bran",
              per_page: 3,
              page_no: 1
          }
        chai.request("http://localhost:3000")
            .get('/search')
            .set('Content-Type', 'application/json')
            .send(search_query)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('data');
                  res.body.should.have.property('message');
                  res.body.should.have.property('message').eql('success');
                  res.body.total_count.should.be.eql(12);
              done();
            });
      });
      
  });

});

describe('Matched Results', () => {
  /*
  * Test the /GET route
  */
  describe('/GET search', () => {
      it('In word match result comparison with all small letters', (done) => {
      	let search_query = {
              search_term: "INVESTOR BRAN",
              per_page: 3,
              page_no: 1
          }
        chai.request("http://localhost:3000")
            .get('/search')
            .set('Content-Type', 'application/json')
            .send(search_query)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('data');
                  res.body.should.have.property('message');
                  res.body.should.have.property('message').eql('success');
                  res.body.total_count.should.be.eql(12);
              done();
            });
      });
      
  });

});

describe('Matched Results', () => {
  /*
  * Test the /GET route
  */
  describe('/GET search', () => {
      it('Passing wrong request headers', (done) => {
      	let search_query = {
              search_term: "",
              per_page: 3,
              page_no: 1
          }
        chai.request("http://localhost:3000")
            .get('/search')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(search_query)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('data');
                  res.body.should.not.have.property('message');
                  res.body.should.not.have.property('message').eql('success');
              done();
            });
      });
      
  });

});

