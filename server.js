const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();


// parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.get('/search', (req, res) => {
	/*
	* GET request controller for searching a key in given dataset.
	* Payload is is dict with following parameters.
	* @param {String} search_term  The key to look up.
	* @param {Int} per_page        The number of records to be returned per request.
	* @param {Int} page_no         If all records get divided by per_page, then slice
	                               to be returned.

	* @return response_data {list} Matched results dict with keys data, message and total_count,
	                               which is number of results matched.
	*/

	let raw_data = fs.readFileSync('/Users/namitamaharanwar/Downloads/mock_data.json');
	let mock_data = JSON.parse(raw_data);
	let response_data = {"data": [], "message": "success", "total_count": 0};

	// request payload parsed variables.
	let search_term = req.body.search_term;
	let per_page = req.body.per_page
	let page_no = req.body.page_no

	// program specific variables.
	var regex = "";
	let result_exact_match = [];
	let result_partial_match = [];
	let result = []

	// Validation for mandatory params.
	if (req.body.search_term == null){
		res.json({"data": [], "error": "Mandatory field 'search_term' not present in the payload."});
	}

	if (search_term.indexOf("'") != -1){
		while (search_term.indexOf("'") != -1){
			search_term = search_term.replace("'", "")
		}
    }

    regex = new RegExp("(^|\\W)" + search_term + "($|\\W)", 'i');
    result_exact_match = search_using_regex(regex, mock_data)

    if (req.body.search_term.indexOf("'") == -1){
		result_partial_match = get_matches_non_exact(mock_data, search_term, regex, result_partial_match)
	}

    result = result_exact_match.concat(result_partial_match)
    
    if (req.body.sort_by != null && req.body.sort_by == "name") {
    	result.sort((a, b) => (a.name > b.name) ? 1 : -1)
    } else if (req.body.sort_by != null && req.body.sort_by == "timestamp") {
    	result.sort((a, b) => (a.dateLastEdited > b.dateLastEdited) ? -1 : 1)
    }
    response_data["total_count"] = result.length
	response_data["data"] = get_paginated_data(result, page_no, per_page)
	res.json(response_data);

});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})


function get_matches_non_exact(mock_data, search_term, regex, result_partial_match){
	/*
	Returns results matching in word chars from the search_term matches.
	@param mock_data {dict}            Given data set.
	@param search_term {String}        The key to look up.
	@param regex {RegExp}              RegExp object of partial string match.
	@param result_partial_match {list} list to store matched results.

	 @return {list}              
	*/
	regex = "";
	search_terms = search_term.split(" ")
	if (search_terms.length > 1){

        for (i=0; i<search_terms.length; i++) {

    		if (i == search_terms.length-1){
    			regex = regex + (search_terms[i])
    		}
    		else {
    			regex = regex + search_terms[i] + "|"
    		}
    	}
    	regex = new RegExp(regex, 'i')
    	result_partial_match = search_using_regex(regex, mock_data)
	}
	return result_partial_match
}

function search_using_regex(regex, mock_data){
	/*
	Matches the results even if partial string from the search_term matches.
	@param mock_data {dict} Given data set.
	@param regex {RegExp}   RegExp object of partial string match.
	
	@return {list}          list of dicts with matched results.
	*/
	let data = [];
	for (i = 0; i < mock_data.length; i++) {
		if (mock_data[i].name.search(regex) != -1){
			//console.log(mock_data[i]);
			data.push(mock_data[i])
		}
	}

	return data
};

function get_paginated_data(data, page_no, per_page){

	/*
	Paginates the results based on given parameters.
	* @param {list} data      List of matched data.
	* @param {Int}  per_page  The number of records to be returned per request.
	* @param {Int}  page_no   If all records get divided by per_page, then slice
	                          to be returned.
	
	@return data {list}       Paginated list of dicts with matched results.
	*/

	if (page_no != null && per_page != null){
		let end_index = page_no * per_page
		let start_index = end_index - per_page
		data = data.slice(start_index, end_index);
	}
	return data
}