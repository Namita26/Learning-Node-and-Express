//During the test the env variable is set to test
process.env.NODE_ENV = 'test';


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);


describe('/GET search', () => {
    it('Request with "search_term" key missing.', (done) => {
    let search_query = {
        per_page: 2,
        page_no: 1
    }
    chai.request("http://localhost:3000")
        .get('/search')
        .set('Content-Type', 'application/json')
        .send(search_query)
        .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('error').eql("Mandatory field 'search_term' not present in the payload.");
              res.body.data.length.should.be.eql(0);
          done();
        });
    });
});

describe('/GET search', () => {
    it('Exact match', (done) => {
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


describe('/GET search', () => {
    it('In word match', (done) => {
    let search_query = {
        search_term: "Quality planner",
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
              res.body.data.length.should.be.eql(3);
              res.body.total_count.should.be.eql(8);
        done();
        });
    }); 
});


describe('/GET search', () => {
    it('In word match sorted by timestamp', (done) => {
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
              res.body.total_count.should.be.eq(14);
              res.body.should.have.property('message').eql('success');
              res.body.data[0].should.have.property('name').eql('Global Brand Analyst');
        done();
        });
    });  
});


describe('/GET search', () => {
    it('In word match sorted by name', (done) => {
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
              res.body.should.have.property('message').eql('success');
              res.body.data[0].should.have.property('name').eql('Chief Brand Orchestrator');
        done();
        });
    });
});


describe('/GET search', () => {
    it('Exact match ordered results', (done) => {
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
              res.body.data.length.should.be.eql(2);
              res.body.data[0].should.have.property('name').eql('Investor Brand Executive');
              res.body.data[1].should.have.property('name').eql('Investor Brand Planner');
        done();
        });
    });
});


describe('/GET search', () => {
    it('Exact match result case in-sensetive case 1', (done) => {
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


describe('/GET search', () => {
    it('Exact match result case in-sensetive case 2', (done) => {
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


describe('/GET search', () => {
    it('Exact match result case in-sensetive case 3', (done) => {
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
              res.body.should.have.property('message').eql('success');
              res.body.total_count.should.be.eql(4);
        done();
        });
    });
});


describe('/GET search', () => {
    it('In word match result case in-sensetive case 1', (done) => {
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
              res.body.should.have.property('message').eql('success');
              res.body.total_count.should.be.eql(12);
        done();
        });
    });
});


describe('/GET search', () => {
    it('In word match result case in-sensetive case 2', (done) => {
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
              res.body.should.have.property('message').eql('success');
              res.body.total_count.should.be.eql(12);
        done();
        });
    });
});

describe('/GET search', () => {
    it('In word match result case in-sensetive case 3', (done) => {
  	let search_query = {
        search_term: "Investor Bran",
        per_page: 3,
        page_no: 1
    }
    chai.request("http://localhost:3000")
        .get('/search')
        .set('Content-Type', 'application/json')
        .send(search_query)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('message').eql('success');
              res.body.total_count.should.be.eql(12);
        done();
        });
    });
});
