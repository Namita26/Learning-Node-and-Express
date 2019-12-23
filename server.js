const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();


// parse requests of content-type - application/json
app.use(bodyParser.json())

var raw_data = fs.readFileSync('/Users/namitamaharanwar/Downloads/mock_data.json');
var mock_data = JSON.parse(raw_data);


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

	// request payload parsed variables.
	let search_term = req.body.search_term;
	let per_page = req.body.per_page
	let page_no = req.body.page_no

	// Validations
	if (req.body.search_term == null){
		res.status(400);
		res.json({"data": [], "error": "Mandatory field 'search_term' not present in the payload."});
	}

	// if (req.body.sort_by != null && (req.body.sort_by != "name" || req.body.sort_by != "timestamp")){
	// 	res.status(400);
	// 	res.json({"data": [], "error": "Not a valid sorting parameter provided."});
	// }

	if (search_term.indexOf("'") != -1){
		while (search_term.indexOf("'") != -1){
			search_term = search_term.replace("'", "")
		}
	}

	// search for exact match
	let exact_match_results = search_using_regex(get_regex_for_exact_matching(search_term))

	let non_exact_match_results = [];
	if (req.body.search_term.indexOf("'") == -1){
		non_exact_match_results = search_using_regex(get_regex_for_non_exact_matching(search_term))
	}

	let match_results = exact_match_results.concat(non_exact_match_results)

	if (req.body.sort_by != null && req.body.sort_by == "name") {
		match_results.sort((a, b) => (a.name > b.name) ? 1 : -1)
	} 
	else if (req.body.sort_by != null && req.body.sort_by == "timestamp") {
		match_results.sort((a, b) => (a.dateLastEdited > b.dateLastEdited) ? -1 : 1)
	}

	let response_data = {};
	response_data["message"] = "success"
	response_data["total_count"] = match_results.length
	response_data["data"] = get_paginated_data(match_results, page_no, per_page)
	res.status(200);
	res.json(response_data);

});

// listen for requests
app.listen(3000, () => {
	console.log("Server is listening on port 3000");
})


function get_regex_for_non_exact_matching(search_term){
	/*
	* Returns regex for in-word chars matching.
	* @param search_term {String}  The key to look up.
	* @return regex {RegExp}       RegExp object of partial string match.
	*/
	let regex = "";
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
	}
	return regex
}

function get_regex_for_exact_matching(search_term){
	/*
	* Returns regex for exact word matching.
	* @param search_term {String}  The key to look up.
	* @return regex {RegExp}       RegExp object of partial string match.
	*/
	let regex = "";
	regex = new RegExp("(^|\\W)" + search_term + "($|\\W)", 'i');
	return regex
}

function search_using_regex(regex){
	/*
	Matches the rows for given regex from the search_term matches.
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