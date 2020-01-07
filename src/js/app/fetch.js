const init = async ()=> {
	let response = await fetch('json/listitems.json');
	let data = await response.json();
	console.dir(data);
	console.log(1);
	var templateContent = document.getElementById("item");
	console.dir(templateContent);
	var template = _.template(templateContent.innerHTML);
	var result = data.reduce(function(sum, current) {
					return  template(current) + sum;
			},"");
			document.getElementsByClassName("result__container")[0].innerHTML = result;
}


document.addEventListener("DOMContentLoaded", function(){
	_.templateSettings = {
		evaluate    : /\{\{([\s\S]+?)\}\}/g,
		interpolate : /\{\{=([\s\S]+?)\}\}/g,
		escape      : /\{\{-([\s\S]+?)\}\}/g
	};
	init();
});

