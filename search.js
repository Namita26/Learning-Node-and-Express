/*
* This is an old code
*/


const elasticsearch = require('elasticsearch');

// instantiate an Elasticsearch client
const client = new elasticsearch.Client({
   hosts: [ 'http://localhost:9200']
});


function serach_using_regex(){

    var search_term = process.argv
    search_term = (search_term.slice(2, search_term.length)).join(" ")

    if (search_term.indexOf('"') != -1){
        search_term = '('+ search_term + ')'
    } else {
        search_term = "*" + search_term + "*"
    }

    client.search({
        pretty: true,
        index: 'kodo-mock-data',
        type: 'kodo_data_list',
        body: {
            query: {
                    "query_string" : {
                    "query" : search_term,
                    "default_field" : "name"
                }    
            }
        }
    }).then(function(resp) {

        var matched_result = resp.hits.hits
        var parsed_results = [];
        for (i = 0; i < matched_result.length; i++) {
            parsed_results.push(matched_result[i]._source);
        }

        console.log(
            {
                "results": parsed_results,
                "total_count": resp.hits.hits.length
            });
    }, function(err) {
        console.trace(err.message);
    })
};

serach_using_regex();