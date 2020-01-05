

// function loadJSON(callback) {

// 	var xobj = new XMLHttpRequest();
// 	xobj.overrideMimeType("application/json");
// 	xobj.open('GET', 'json/listitems.json', true); // Replace 'my_data' with the path to your file
// 	xobj.onreadystatechange = function () {
// 		if (xobj.readyState == 4 && xobj.status == "200") {
// 			// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
// 			callback(xobj.responseText);
// 		}
// 	};
// 	xobj.send(null);
// }


// var actual_JSON;
// function init() {
// 	loadJSON(function(response) {
// 		// Parse JSON string into object
// 		actual_JSON = JSON.parse(response);
// 		var templateContent = document.getElementById("item");
// 		var template = _.template(templateContent.innerHTML);
// 		console.dir(template);
// 		console.dir(actual_JSON);
// 		var result = actual_JSON.reduce(function(sum, current) {
// 			return  template(current) + sum;
// 	},"");

// 	document.getElementsByClassName("result-container")[0].innerHTML = result;
// 	});
// }

const init = async ()=> {
	let response = await fetch('json/listitems.json');
	let data = await response.json();
	console.dir(data);
	console.log(1);
}


document.addEventListener("DOMContentLoaded", function(){
	_.templateSettings = {
		evaluate    : /\{\{([\s\S]+?)\}\}/g,
		interpolate : /\{\{=([\s\S]+?)\}\}/g,
		escape      : /\{\{-([\s\S]+?)\}\}/g
	};
	init();
});

