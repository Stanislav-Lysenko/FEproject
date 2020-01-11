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
	let response = await fetch('json/oneitem.json');
	let data = await response.json();
	var templateContent = document.getElementById("item-page");
	var template = _.template(templateContent.innerHTML);
	var result = template(data);
	document.getElementsByClassName("main__container")[0].innerHTML = result;
	//

	var tempGallery = document.getElementById('gallery-item');
	console.dir(tempGallery)
	var template2 = _.template(tempGallery.innerHTML);
	console.dir(data.pictures);
	var resultUL = data.pictures.reduce((sum, current) => {
		return template2(current) + sum;
	},"" )
	console.dir(resultUL);
	document.getElementsByClassName('item-page__list-images')[0].innerHTML = resultUL;
}


document.addEventListener("DOMContentLoaded", function(){
	_.templateSettings = {
		evaluate    : /\{\{([\s\S]+?)\}\}/g,
		interpolate : /\{\{=([\s\S]+?)\}\}/g,
		escape      : /\{\{-([\s\S]+?)\}\}/g
	};
	init();
});