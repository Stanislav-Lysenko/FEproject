// const init = async ()=> {
// 	let response = await fetch('json/listitems.json');
// 	let data = await response.json();
// 	console.dir(data);
// 	console.log(1);
// 	var templateContent = document.getElementById("item");
// 	console.dir(templateContent);
// 	var template = _.template(templateContent.innerHTML);
// 	var result = data.reduce(function(sum, current) {
// 					return  template(current) + sum;
// 			},"");
// 			document.getElementsByClassName("result__container")[0].innerHTML = result;
// }


// document.addEventListener("DOMContentLoaded", function(){
// 	_.templateSettings = {
// 		evaluate    : /\{\{([\s\S]+?)\}\}/g,
// 		interpolate : /\{\{=([\s\S]+?)\}\}/g,
// 		escape      : /\{\{-([\s\S]+?)\}\}/g
// 	};
// 	init();
// });

//render contacts
// document.addEventListener("DOMContentLoaded", function(){
// 	init();
// });

// const init = async ()=> {
// 	let response = await fetch('json/page-contacts.json');
// 	let data = await response.json();
// 	console.dir(data);
// 	console.log(1);
// 	renderHTML(data, document.getElementsByClassName('main__container')[0]);
// }


//render page-item
const init = async ()=> {
	let response = await fetch('json/seconditem.json');
	let data = await response.json();
	console.dir(data);
	var templateContent = document.getElementById("item-page");
	console.dir(templateContent);
	var template = _.template(templateContent.innerHTML);
	var result = template(data);

			document.getElementsByClassName("main__container")[0].innerHTML = result;
}


document.addEventListener("DOMContentLoaded", function(){
	_.templateSettings = {
		evaluate    : /\{\{([\s\S]+?)\}\}/g,
		interpolate : /\{\{=([\s\S]+?)\}\}/g,
		escape      : /\{\{-([\s\S]+?)\}\}/g
	};
	init();
});