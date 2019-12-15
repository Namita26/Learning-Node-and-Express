
//require the Elasticsearch librray
const elasticsearch = require('elasticsearch');

// instantiate an Elasticsearch client
const client = new elasticsearch.Client({
   hosts: [ 'http://localhost:9200']
});

client.ping({
    requestTimeout: 30000,
 }, function(error) {
    if (error) {
        console.error('Elasticsearch cluster is down!');
    } else {
        console.log('Everything is ok');
    }
});

client.indices.create({
    index: 'kodo-mock-data'
}, function(error, response, status) {
    if (error) {
        console.log(error);
    } else {
        console.log("Created a new index", response);
    }
});


// Insert the data mock json into elasticsearch index. Please use the appropriate file path.
const mock_data = require('/Users/namitamaharanwar/Downloads/mock_data.json');

var bulk = [];

mock_data.forEach(entry => {
	bulk.push({index:{
		_index: "kodo-mock-data",
		_type: "kodo_data_list",
	}

	})
	bulk.push(entry)
})

client.bulk({body:bulk}, function(err, response){ 
	if( err ){ 
		console.log("Failed Bulk operation".red, err) 
	} else { 
		console.log("Successfully imported %s".green, mock_data.length); 
	} 
});
