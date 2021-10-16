var express = require("express");
var app = new express();
var request = require("request");
var server_port = 4000;
var api_url = "https://datausa.io/api/data?drilldowns=State&measures=Population&year=latest";

app.listen(server_port, function(){

	console.log("Server started on port : " + server_port);
});

getNumberUnit = function(num) {
    var units = ["Million","Billion","Trillion","Quadrillion","Quintillion","Sextillion"]
    var unit = Math.floor((num / 1.0e+1).toFixed(0).toString().length)
    var r = unit%3
    var x =  Math.abs(Number(num))/Number('1.0e+'+(unit-r)).toFixed(2)
    return x.toFixed(2)+ ' ' + units[Math.floor(unit / 3) - 2]
}

app.get("/", function(expReq, expRes){

	request({
		uri: api_url,
		method: 'GET'
	},
	  function(err,res,body){
	  	// console.log(body);
	  	var data = JSON.parse(body);

	  		var finalResponse = `<style>
	  							 table thead th tr td{
	  							 	background-color: #a7d6fc;
	  							 	color: #020801;
	  							 }
	  							 </style>
	  							 <table style="width:100%;border: 2px solid #000;" border="1">
	  							 <thead>
	  							 <th>
	  							 State
	  							 </th>
	  							 <th>
	  							 Year
	  							 </th>
	  							 <th>
	  							 Population
	  							 </th>
								 </thead><tbody>`;

								 data = data.data;

								 for (var rec in data ) {
								 	// console.log(data[rec]);
								 	finalResponse += `
								 					 <tr>
								 					 <td>
								 					 	${data[rec].State}
								 					 </td>
								 					 <td>
								 					 	${data[rec].Year}
								 					 </td>
								 					 <td>
								 					 	${getNumberUnit(data[rec].Population)}
								 					 </td>
								 					 </tr>`;
								 					 
 								 }

 								 finalResponse += `</tbody></table></body></html>`;
 								 expRes.send(finalResponse);
 								});

});