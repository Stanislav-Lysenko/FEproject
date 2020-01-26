/*
 * Custom
 */
function addTextNode(text) {
  let newtext = document.createTextNode(text);
  return newtext;
}

function setAttr(item, htmlElement){
	for (key in item){
		if (key != "text" && key != "tag" && key != "html" && key != "text" && key != "children") {
			htmlElement.setAttribute(key, item[key]);
		}
	}
}

function renderHTML(element, parent){
	//if it is the deepest tag element
	if (!Array.isArray(element) && !element.children) {
		if (element.text) {
			return parent.append(addTextNode(element.text));
		} else {
			let htmlElem = document.createElement(element.tag);
			//add attributes
			setAttr(element,htmlElem);

			htmlElem.append(addTextNode(element.html));
			return parent.appendChild(htmlElem);
		}
	} else {
		element.forEach((item)=> {
			if (item.children) {
				let htmlElem = document.createElement(item.tag);
				//add attributes
				setAttr(item, htmlElem);

				parent.appendChild(htmlElem);
				renderHTML(item.children, htmlElem);
			} else {
				renderHTML(item, parent);
			}
		})
	}
}
//return json parsed json file
const  getJSON = async (path)=> {
	let response = await fetch(path);
	let data = await response.json();
	return data;
}
'use strict';

class Storage {
	constructor(){
		this.tempItems = [];
		this.tempUsers = [];
		this.tempBoughtItems = [];
		this.filterParams = {};
		this.path = {
			items: 'json/listitems.json',
			users: 'json/users.json'
		}
		return this;
	}

	async init() {
		await this.loadLocalStorage();
	}

	async loadLocalStorage() {
		let items = localStorage.getItem('items');
		let users = localStorage.getItem('users');
		await this.updateTempStorage(items, 'items');
		await this.updateTempStorage(users, 'users');
	}

	async updateTempStorage(data, key) {
		switch (key) {
			case 'items':
				if (data) {
					this.tempItems = JSON.parse(data);
				} else {
					this.tempItems = await getJSON(this.path.items);
					this.saveToLocalStorage(key, this.tempItems);
				}
			break;
			case 'users':
				if (data) {
					this.tempUsers = JSON.parse(data);
				} else {
					this.tempUsers = await getJSON(this.path.users);
					this.saveToLocalStorage(key, this.tempUsers);
				}
			break;
			default: throw Error ('serever not respond');
		}
	}

	updateAllLocalStorage(){
		this.saveToLocalStorage('users', this.tempUsers);
		this.saveToLocalStorage('items', this.tempItems);
	}


	saveToLocalStorage(key, data) {
		localStorage.setItem(key, JSON.stringify(data));
	}

	comparePriceToHigh(itemA, itemB){
		return itemB.price - itemA.price;
	}

	comparePriceToLow(itemA, itemB){
		return itemA.price - itemB.price;
	}

	 getTempStorage(name) {
		switch (name) {
			case 'items':
				return this.tempItems.sort(this.comparePriceToHigh);
			case 'users':
				return this.tempUsers;
			default: throw Error ('serever not respond');
		}
	}

	getItemById(id) {
		return this.tempItems.find(item => item.id_item == id);
	}

	getFilteredItems(params){
		this.filterParams = params;
		console.dir(this.filterParams);
		let filterArrItems = this.getItemsByAvailable();
		filterArrItems = this.getItemsByCondition(filterArrItems);
		filterArrItems = this.getItemsByShipping(filterArrItems);
		filterArrItems = this.getItemsByFormat(filterArrItems);
		filterArrItems = this.getItemsByPrice(filterArrItems);
		filterArrItems = this.getItemsByUserRequest(filterArrItems);
		filterArrItems - this.sortByDirection(filterArrItems)
		return filterArrItems;
	}

	makeArray(str) {
		return str.split(',');
	}

	getItemsByAvailable() {
		return this.tempItems.filter(item => item.reserved == false);
	}

	sortByDirection(arr) {
		if (this.filterParams['sort']){
			switch (this.filterParams['sort']){
				case 'lowprice':
					return arr.sort(this.comparePriceToHigh);
				break;
				case 'highprice':
					return arr.sort(this.comparePriceToLow);
				break;
				default: arr.sort(this.comparePriceToHigh);
			}
		}
		return arr.sort(this.comparePriceToHigh);
	}

	getItemsByUserRequest(arr){
		if (this.filterParams['userrequest']){
			let strParams = this.makeArray(this.filterParams['userrequest']).join(' ');
			return arr.filter(item => new RegExp(strParams, 'i').test(item.title));
		}
		return arr;
	}

	getItemsByPrice(arr){
		if(this.filterParams['from']) {
			if (this.filterParams['to']) {
				return arr.filter(item => {
					return parseInt(item.price) >= +this.filterParams['from'] && parseInt(item.price) <= +this.filterParams['to'];
				})
			} else {
				return arr.filter(item => {
					return parseInt(item.price) >= +this.filterParams['from'];
				})
			}
		}
		return arr;
	}

	getItemsByCondition(arr){
		if (this.filterParams['condition']){
			let arrParams = this.makeArray(this.filterParams['condition']);
			if (arrParams.length == 2) {
				return arr.filter(item => {return item.condition == arrParams[0] || item.condition == arrParams[1]})
			}
			if (arrParams.length == 1) {
				return arr.filter(item => item.condition == arrParams[0]);
			}
		}
		return arr;
	}

	replaceShippingParams(arr){
		return arr.map(name =>{
			if (name == 'free') {
				return 'Free Shipping';
			}
			if (name == 'instore') {
				return 'Free In-store Pickup';
			}
			if (name == 'local') {
				return 'Free Local Pickup';
			}
		})
	}

	getItemsByShipping(arr){
		if (this.filterParams['shipping']){
			let arrParams = this.makeArray(this.filterParams['shipping']);
			arrParams = this.replaceShippingParams(arrParams);
			console.log(arrParams);
				if (arrParams.length == 3) {
					return arr.filter(item => {return item.shipping == arrParams[0] || item.shipping == arrParams[1] || item.shipping == arrParams[2]});
				}
				if (arrParams.length == 2) {
					return arr.filter(item => {return item.shipping == arrParams[0] || item.shipping == arrParams[1]});
				}
				if (arrParams.length == 1) {
					return arr.filter(item => item.shipping == arrParams[0]);
				}
		}
		return arr;
	}

	getItemsByFormat(arr){
		switch (this.filterParams['format']){
			case 'buyitnow':
				return arr.filter(item => item.buy == true);
			break;
			case 'auction':
				return arr.filter(item => item.auction == true)
			break;
			default: console.log('default'); return arr;
		}
	}


	//add user who is logined to LocalStorage
	addLoginedUsertoLocalStorage(user){
		localStorage.setItem('activeUser', JSON.stringify(user));
	}

	removeLoginedUserFromLocalStorage(){
		localStorage.removeItem('activeUser');
	}

	getLoginedUserFromTempStorage(){
		let loginedUser = JSON.parse(localStorage.getItem('activeUser'));
		if (loginedUser){
			return this.tempUsers.find(user => user.login === loginedUser.login);
		} else {
			return null;
		}
	}

	addNewItemToTempStorage(data){
		this.tempItems.push(data);
		console.dir(this.tempItems);
		this.saveToLocalStorage('items', this.tempItems);
	}
	addNewUsertoTempStorage(data){
		this.tempUsers.push(data);
		console.dir(this.tempUsers);
		this.saveToLocalStorage('users', this.tempUsers);
	}

	getBoughtItemsByUser(){
		let loginedUser = this.getLoginedUserFromTempStorage();
		for (let i = 0; i< loginedUser.buyitems.length; i++){
			console.log(loginedUser.buyitems[i]);
			this.tempBoughtItems.push(this.getItemById(loginedUser.buyitems[i].item))
		}
		console.dir(this.tempBoughtItems);
		return this.tempBoughtItems;
	}
	generateNewId(){
		console.dir(this.tempItems[9]);
		return +this.tempItems[this.tempItems.length-1]['id_item'] + 1 + '';
	}
}
// option all or empty
class Filter {
	constructor({option = 'search', params = {}} ={}){
		this.regExp = /^\/search.+/i;
		this.userrequestRegExp = /[a-z0-9a-zа-яё]+/gi;
		this.option = option;
		this.params = params;
		this.init();
		return this;
	}

	init() {
		this.findNodes();
		this.bindAll();
		this.addEvents();
		this.autoCheck();
	}

	findNodes() {
		if (this.option == 'all') {
			this.nodes = {
				condition: document.getElementsByName('condition'),
				shipping: document.getElementsByName('shipping'),
				from: document.getElementById('from'),
				to: document.getElementById('to'),
				btnfromto: document.getElementById('btnfromto'),
				search: document.getElementById('search'),
				searchBtn: document.getElementById('search-input'),
				buyitnow: document.getElementById('buyitnow'),
				auction: document.getElementById('auction'),
				format: document.getElementsByName('format'),
				sort: document.getElementById('sort'),
			}
		} else {
			this.nodes = {
				search: document.getElementById('search'),
				searchBtn: document.getElementById('search-input'),
			}
		}

	}

	bindAll() {
		this.checkCondition = this.checkCondition.bind(this);
		this.checkShipping = this.checkShipping.bind(this);
		this.rangePrice = this.rangePrice.bind(this);
		this.checkFormat = this.checkFormat.bind(this);
		this.search = this.search.bind(this);
		this.sort = this.sort.bind(this);
		this.handler = this.handler.bind(this);
		this.handlerAll = this.handlerAll.bind(this);
	}

	addEvents() {
		if (this.option == 'all'){
			this.nodes.condition[0].addEventListener('click', this.handlerAll);
			this.nodes.condition[1].addEventListener('click', this.handlerAll);
			this.nodes.shipping[0].addEventListener('click', this.handlerAll);
			this.nodes.shipping[1].addEventListener('click', this.handlerAll);
			this.nodes.shipping[2].addEventListener('click', this.handlerAll);
			this.nodes.btnfromto.addEventListener('click', this.handlerAll);
			this.nodes.format[0].addEventListener('click', this.handlerAll);
			this.nodes.format[1].addEventListener('click', this.handlerAll);
			this.nodes.searchBtn.addEventListener('click', this.handlerAll);
			this.nodes.sort.addEventListener('change', this.handlerAll);
		} else {
			this.nodes.searchBtn.addEventListener('click', this.handler);
		}
	}

	makeArray(str) {
		return str.split(',');
	}

	// check filter and sort options after location.assign
	autoCheck() {
		if (this.params['condition']){
			let arrParams = this.makeArray(this.params['condition']);
			this.autoCheckCondition(arrParams);
		}
		if (this.params['shipping']){
			let arrParams = this.makeArray(this.params['shipping']);
			this.autoCheckShipping(arrParams);
		}

		if (this.params['to']){
			let arrParams = this.makeArray(this.params['to']);
			this.autoCheckRangePrice(arrParams, 'to');
		}
		if (this.params['from']){
			let arrParams = this.makeArray(this.params['from']);
			this.autoCheckRangePrice(arrParams, 'from');
		}
		if (this.params['format']){
			this.autoCheckFormat(this.params['format']);
		}
		if (this.params['userrequest']){
			let arrParams = this.makeArray(this.params['userrequest']);
			this.autoFillSearch(arrParams);
		}
		if (this.params['sort']){
			this.autoCheckSort(this.params['sort']);
		}
	}

	autoCheckSort(value){
		switch (value) {
			case 'lowprice':
				this.nodes.sort.getElementsByTagName('option')[0].selected = true;
			break;
			case 'highprice':
				this.nodes.sort.getElementsByTagName('option')[1].selected = true;
			break;
			default: console.log('invalid');
		}
	}

	autoFillSearch(arr) {
		this.nodes.search.value = arr.join(' ');
	}

	autoCheckFormat(value){
		switch (value) {
			case 'buyitnow':
				this.nodes.format[0].checked = true;
			break;
			case 'auction':
				this.nodes.format[1].checked = true;
			break;
			default: console.log('invalid query string');
		}

	}

	autoCheckRangePrice(arr, input){
		switch (input) {
			case 'to':
				this.nodes.to.value = arr.toString();
			break;
			case 'from':
				this.nodes.from.value = arr.toString();
			break;
			default: console.log('invalid query string');
		}

	}
	autoCheckShipping(arr) {
		arr.forEach(element => {
			switch (element) {
				case 'free':
					this.nodes.shipping[0].checked = true;
				break;
				case 'instore':
					this.nodes.shipping[1].checked = true;
				break;
				case 'local':
					this.nodes.shipping[2].checked = true;
				break;
				default: console.log('invalid query string');
			}
		});
	}

	autoCheckCondition(arr) {
		arr.forEach(element => {
			switch (element) {
				case 'new':
					this.nodes.condition[0].checked = true;
				break;
				case 'used':
					this.nodes.condition[1].checked = true;
				break;
				default: console.log('invalid query string');
			}
		});
	}

	getPath() {
		this.currentPathName = window.location.pathname;
	}

	search(e) {
		if (this.nodes.search.value) {
			this.params['userrequest'] = this.nodes.search.value.match(this.userrequestRegExp);
		} else {
			delete this.params['userrequest'];
		}
	}

	sort(e) {
		let indexSelected = this.nodes.sort.selectedIndex;
		console.log(indexSelected);
		this.params[this.nodes.sort.getAttribute('name')] = this.nodes.sort.getElementsByTagName('option')[indexSelected].value;
		console.dir(this.params);
	}

	checkFormat(e) {
		for (let i = 0; i < this.nodes.format.length; i++) {
			if (this.nodes.format[i].checked) {
				this.params[this.nodes.format[i].getAttribute('name')] = this.nodes.format[i].value;
			}
		}
	}

	rangePrice(e) {
		let from = this.nodes.from.value || 0;
		let to = this.nodes.to.value || Infinity;
		this.params['from'] = from;
		if (isFinite(to)) {
			this.params['to'] = to;
		}
	}

	checkCondition(e) {
		let queryString = '';
		for (let i = 0; i < this.nodes.condition.length; i++) {
			if (this.nodes.condition[i].checked) {
				queryString += this.nodes.condition[i].value + ',';
			}
		}
		queryString = queryString.slice(0, -1);
		if (queryString) {
			this.params[this.nodes.condition[0].getAttribute('name')] = queryString;
		} else {
			delete this.params[this.nodes.condition[0].getAttribute('name')];
		}
	}

	checkShipping(e) {
		let queryString = '';
		for (let i = 0; i < this.nodes.shipping.length; i++) {
			if (this.nodes.shipping[i].checked) {
				queryString += this.nodes.shipping[i].value + ',';
			}
		}
		queryString = queryString.slice(0, -1);
		if (queryString) {
			this.params[this.nodes.shipping[0].getAttribute('name')] = queryString;
		} else {
			delete this.params[this.nodes.shipping[0].getAttribute('name')];
		}
	}

	handlerAll(e) {
		this.checkFormat();
		this.checkCondition();
		this.checkShipping();
		this.rangePrice();
		this.search();
		this.sort();
		this.createURL();
	}

	handler(e) {
		this.search();
		this.createURL();
	}

	createURL(){
		let url = '/search?';
		for (key in this.params) {
			if (key == 'userrequest') {
				let requesturl = this.params[key].reduce((sum, current) => {
					return sum + current + ',';
				}, 'userrequest=');
				url += requesturl.slice(0, -1) + '&';
			} else {
				url += key + '=' + this.params[key] + '&';
			}
		}
		// url = encodeURI(url.slice(0, -1));
		url = url.slice(0, -1);
		console.log(url);
		location.assign(url);
	}
}
class Manager {
	constructor(){
		this.storage = new Storage();
		this.regExpId = /^\/item\d+$/i;
		this.regSearch = /^\/search$/i;
		this.params = {};
		this.init();
		console.log('manager init');
	}
	async init() {
		await this.storage.init();
		this.getLoginedUser();
		this.getPath();
		this.getSearchParams()
		this.onloadPage();
	}

	getLoginedUser() {
		this.loginedUser = this.storage.getLoginedUserFromTempStorage();
	}

	async renderContactsPage() {
		let response = await fetch('json/page-contacts.json');
		let data = await response.json();
		renderHTML(data, document.getElementsByClassName('main__container')[0]);
	}

	async renderRegistration() {
		let response = await fetch('json/page-registration.json');
		let data = await response.json();
		renderHTML(data, document.getElementsByClassName('main__container')[0]);
	}

	async renderHeader() {
		if (this.loginedUser){
			let response = await fetch('json/page-nav-left-auth.json');
			let data = await response.json();
			renderHTML(data, document.getElementsByClassName('nav__left')[0]);
			document.getElementsByClassName('nav__user-name')[0].append(document.createTextNode(this.loginedUser.name));
		} else {
			let response = await fetch('json/page-nav-left-unauth.json');
			let data = await response.json();
			renderHTML(data, document.getElementsByClassName('nav__left')[0]);
		}
	}

	async renderAdvert() {
		let response = await fetch('json/page-text.json');
		let data = await response.json();
		renderHTML(data, document.getElementsByClassName('main__container')[0]);
	}

	renderResult(arr) {
		let templateContent = document.getElementById("item");
		let template = _.template(templateContent.innerHTML);
		let result = arr.reduce(function(sum, current) {
			return  template(current) + sum;
		}.bind(this),"");
		document.getElementsByClassName("result__container")[0].innerHTML = result;
	}

	renderItemPage(obj) {
		let templatePageItem = document.getElementById("item-page");
		let templateItem = _.template(templatePageItem.innerHTML);
		let result = templateItem(obj);
		document.getElementsByClassName("main__container")[0].innerHTML = result;
		//gallery
		var templatePageGallery = document.getElementById('gallery-item');
		var templateGallary = _.template(templatePageGallery.innerHTML);
		var resultUL = obj.pictures.reduce((sum, current) => {
			return templateGallary(current) + sum;
		},"" )
		document.getElementsByClassName('item-page__list-images')[0].innerHTML = resultUL;
	}

	renderHistory(arr){
		let templateContent = document.getElementById("item");
		let template = _.template(templateContent.innerHTML);
		let result = arr.reduce(function(sum, current) {
			return  template(current) + sum;
		}.bind(this),"");
		document.getElementsByClassName("main__container")[0].innerHTML = result;
	}

	async renderMainPage() {
		let data = await getJSON('json/page-aside-result.json');
		renderHTML(data, document.getElementsByClassName('main__container')[0]);
	}

	async renderSignin() {
		let response = await fetch('json/page-signin.json');
		let data = await response.json();
		renderHTML(data, document.getElementsByClassName('main__container')[0]);
	}

	async renderSell() {
		let response = await fetch('json/page-sell.json');
		let data = await response.json();
		renderHTML(data, document.getElementsByClassName('main__container')[0]);
	}

	getPath() {
		this.currentPathName = window.location.pathname;
	}

	getSearchParams() {
		this.searchParams = window.location.search;
	}

	getItemIdfromPath() {
		let reg = /^\/item(\d+$)/i;
		return this.currentPathName.match(reg)[1];
	}

	parseSearchParams() {
		//let str =	'/search?condition=new,used&shipping=free,instore,local&from=4&format=buyitnow&userrequest=mama+papa';
		let str = this.searchParams;
		if (str){
			let paramsString = str.slice(1);
			let elements = paramsString.split('&');
			if (elements.length){
				elements.forEach(element => {
					var keyValue = element.split('=');
					this.params[keyValue[0]] = keyValue[1];
				})
			}
			//console.dir(this.params);
		}
	}

	async onloadPage() {
		this.parseSearchParams();
		await this.renderHeader();
		//render item by id
		if (this.currentPathName.match(this.regExpId)){
			this.renderItemPage(this.storage.getItemById(this.getItemIdfromPath()));
			this.item = new Item(this.storage.getItemById(this.getItemIdfromPath()));
			new Gallery();
			return;
		} //render by user filter and request
		if (this.currentPathName.match(this.regSearch)){
			console.log('render by params');
			await this.renderMainPage();
			this.renderResult(this.storage.getFilteredItems(this.params));
			this.filter = new Filter({option: 'all', params: this.params})
		} else {
			switch (this.currentPathName) {
				case '/register':
					await this.renderRegistration();
					this.registration = new Registration(this.storage.getTempStorage('users'));
				break;
				case '/sign':
					await this.renderSignin();
					this.signin = new Signin(this.storage.getTempStorage('users'));
				break;
				case '/contacts':
				this.renderContactsPage();
				this.filter = new Filter();
				break;
				case '/advert':
				this.renderAdvert();
				this.filter = new Filter();
				break;
				case '/logout':
					this.storage.removeLoginedUserFromLocalStorage();
					location.assign('/');
				break;
				case '/history':
					if (this.storage.getLoginedUserFromTempStorage()){
						this.renderHistory(this.storage.getBoughtItemsByUser());
					}else {
						location.assign('/sign');
					}
				break;
				case '/sell':
					if (this.storage.getLoginedUserFromTempStorage()){
						await this.renderSell();
						this.sell = new Sell(this.storage.getLoginedUserFromTempStorage());
					}else {
						location.assign('/sign');
					}
				break;
				case '/':
				await this.renderMainPage();
				// this.renderResult(this.storage.getTempStorage('items'));
				this.renderResult(this.storage.getItemsByAvailable())
				this.filter = new Filter({option: 'all'})
				break;
				default: console.log('page not found');
			}
		}
	}
}
document.addEventListener("DOMContentLoaded", function(){
	_.templateSettings = {
		evaluate    : /\{\{([\s\S]+?)\}\}/g,
		interpolate : /\{\{=([\s\S]+?)\}\}/g,
		escape      : /\{\{-([\s\S]+?)\}\}/g
	};
	let manager = new Manager();
});
class Signin{
	constructor(users){
		this.storage = new Storage();
		this.users = users;
		this.emailRegExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;
		this.passRegExp = /^\w{6,}$/;
		this.init();
	}

	async init(){
		await this.storage.init();
		this.findNodes();
		this.bindAll();
		this.addEvents();

	}

	findNodes(){
		this.nodes = {
			form: document.forms.signin,
			email: document.forms.signin.elements.email,
			pass: document.forms.signin.elements.pass,
			submit: document.forms.signin.elements.submit,
			warning: document.getElementsByClassName('signin__warning')[0]
		}
	}

	addEvents() {
		this.nodes.submit.addEventListener('click', this.submitForm)
	}

	bindAll() {
		this.submitForm = this.submitForm.bind(this);
	}

	submitForm(e){
		e.preventDefault();
		let flag = true;
		this.nodes.warning.innerHTML = '';
		//check valid email
		if (!this.emailRegExp.test(this.nodes.email.value)) {
			this.createWarningMessage('email');
			flag = false;
		} //check valid passward
		if (!this.passRegExp.test(this.nodes.pass.value)) {
			this.createWarningMessage('password');
			flag = false;
		}
		if (flag){
			this.findUser(this.nodes.email.value, this.nodes.pass.value)
		} else {
			return;
		}
	}

	findUser(login, pass){
		let user = this.users.find(user => user.login === login && user.password === pass );
		if (!user) {
			this.createWarningMessage('unknownuser');
		} else {
			this.successLogin(user);
			//console.dir(this.storage.getLoginedUserFromLocalStorage());
			location.assign('/');
		}
	}

	// add user logined user to LocalStorage
	successLogin(user) {
		this.storage.addLoginedUsertoLocalStorage(user);
	}

	createWarningMessage(errorname){
		let message = document.createElement('p');
		switch (errorname){
			case 'email':
				message.append(document.createTextNode('You entered incorrect email'));
			break;
			case 'password':
				message.append(document.createTextNode('You entered incorrect pass: 6 lettes or numers or _'));
			break;
			case 'unknownuser':
				message.append(document.createTextNode('Unknown user'));
			break;
			default: console.log('incorrect error name');
		}
		this.nodes.warning.appendChild(message);
	}
 }
class Registration{
	constructor(users){
		this.storage = new Storage();
		this.users = users;
		this.emailRegExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;
		this.passRegExp = /^\w{6,}$/;
		this.nameRegExp= /^[a-zа-яё]{3,}$/i;
		this.init();
	}

	async init(){
		await this.storage.init();
		this.findNodes();
		this.bindAll();
		this.addEvents();

	}

	findNodes(){
		this.nodes = {
			form: document.forms.registration,
			email: document.forms.registration.elements.email,
			name: document.forms.registration.elements.name,
			pass0: document.forms.registration.elements.pass[0],
			pass1: document.forms.registration.elements.pass[1],
			submit: document.forms.registration.elements.submit,
			warning: document.getElementsByClassName('registration__warning')[0]
		}
		console.dir(this.nodes);
	}

	addEvents() {
		this.nodes.submit.addEventListener('click', this.submitForm)
	}

	bindAll() {
		this.submitForm = this.submitForm.bind(this);
	}

	submitForm(e){
		e.preventDefault();
		let flag = true;
		this.nodes.warning.innerHTML = '';
		//check valid email
		if (!this.emailRegExp.test(this.nodes.email.value)) {
			this.createWarningMessage('email');
			flag = false;
		}
		//check valid passward
		if (!this.passRegExp.test(this.nodes.pass0.value) || !this.passRegExp.test(this.nodes.pass1.value)) {
			this.createWarningMessage('password');
			flag = false;
		}
		//chek valid name
		if (!this.nameRegExp.test(this.nodes.name.value)) {
			this.createWarningMessage('name');
			flag = false;
		}
		if (!flag){
			return;
		} else if (this.findUser(this.nodes.email.value)) {
			this.addNewUserToLocalStorage(this.createUser());
			this.createWarningMessage('ok');
		} else {
			this.createWarningMessage('exist');
		}
	}

	createUser(){
		let	newUser = {
			login: this.nodes.email.value,
			name: this.nodes.name.value,
			password: this.nodes.pass0.value,
			buyitems: [],
			sellitems: []
		}
		return newUser;
	}

	addNewUserToLocalStorage(user){
		this.storage.addNewUsertoTempStorage(user)
	}

	findUser(login){
		let user = this.users.find(user => user.login === login);
		if (user) {
			//this user is exist
			return false;
		} else {
			// this user doesn't exist - go on registration
			return true;
		}
	}

	createWarningMessage(errorname){
		let message = document.createElement('p');
		switch (errorname){
			case 'email':
				message.append(document.createTextNode('You entered incorrect email'));
			break;
			case 'password':
				message.append(document.createTextNode('You entered incorrect pass: 6 lettes or numers or _ or they are not equal each other'));
			break;
			case 'name':
				message.append(document.createTextNode('You enterd incorrect name: only letters and min size=3'));
			break;
			case 'exist':
				message.append(document.createTextNode('This user have been existed'));
			break;
			case 'ok':
				message.append(document.createTextNode(`You've been just registered. Sign in!`));
			break;
			default: console.log('incorrect error name');
		}
		this.nodes.warning.appendChild(message);
	}
 }
class Item {
	constructor(item) {
		this.storage = new Storage();
		this.nodes = {};
		this.bidRegExp = /\d+/i;
		this.item = item;
		this.init();
	}

	async init(){
		await this.storage.init();
		this.getTypeItem();
		this.findNodes();
		this.bindAll();
		this.addEvents();
		this.checkReserved()
	}

	findNodes() {
		if (this.type == 'auction'){
			this.nodes = {
				bid: document.getElementsByClassName('item-page__start-bid-input')[0],
				bids: document.getElementsByClassName('item-page_bids-value')[0],
				price: document.getElementsByClassName('item-page__start-bid-price')[0],
				buyBtn: document.getElementsByClassName('item-page__btn-bid')[0],
				startbid: document.getElementsByClassName('item-page__start-bid-price')[0],

			}
		} else {
			this.nodes = {
				buyBtn: document.getElementsByClassName('item-page-buy')[0]
			}
		}
	}

	bindAll(){
		this.handler = this.handler.bind(this);
	}

	addEvents() {
		this.nodes.buyBtn.addEventListener('click', this.handler);
	}

	getTypeItem(){
		if (this.item.auction){
			this.type = 'auction';
		} else {
			this.type = 'buyitnow';
		}
	}

	handler(e){
	let user  = this.storage.getLoginedUserFromTempStorage();
		if(user){
			if (this.type == 'buyitnow'){
				//save id of item to user
				for (let i =0; i < this.storage.tempUsers.length; i++){
					if (this.storage.tempUsers[i].login == user.login){
						this.storage.tempUsers[i].buyitems.push({"item": this.item.id_item});
					}
				}
				// reserve item
				for (let i = 0; i < this.storage.tempItems.length; i++){
					if (this.storage.tempItems[i].id_item == this.item.id_item){
						this.storage.tempItems[i].reserved = true;
					}
				}
				this.storage.updateAllLocalStorage();
				location.assign(`/item${this.item.id_item}`);
			} else {
				if ( this.checkBid()) {
					for (let i =0; i < this.storage.tempUsers.length; i++){
						if (this.storage.tempUsers[i].login == user.login){
							this.storage.tempUsers[i].buyitems.push({
								"item": this.item.id_item,
								"mybid": parseInt(this.nodes.bid.value) + '.00'
							});
						}
					}
					for (let i = 0; i < this.storage.tempItems.length; i++){
						if (this.storage.tempItems[i].id_item == this.item.id_item){
							this.storage.tempItems[i].price = parseInt(this.nodes.bid.value) + '.00';
							this.storage.tempItems[i].bids = +this.storage.tempItems[i].bids + 1;
						}
					}
					console.dir(	this.storage.tempUsers);
					console.dir(	this.storage.tempItems);
					this.storage.updateAllLocalStorage();
					this.changeTextBtn();
					this.changeInfoAboutItem();
				}
			}
		} else {
			location.assign('/sign');
		}
	}

	checkBid(){
		if (this.bidRegExp.test(this.nodes.bid.value) && this.nodes.bid.value > this.item.price) {
			return true;
		} else {
			alert('You entered incorrect bid');
			return false;
		}

	}
	changeTextBtn(){
		this.nodes.buyBtn.value = "Bought!";
		this.nodes.buyBtn.disabled = true;
	}

	changeInfoAboutItem() {
		this.nodes.price.innerHTML = this.nodes.bid.value + '.00' ;
		this.nodes.bids.innerHTML = +this.item.bids + 1;
	}

	checkReserved() {
		if (this.item.reserved == true) {
			this.changeTextBtn();
		}
	}

}
class Sell{
	constructor(){
		this.textRegExp = /^\w{3,}$/i;
		this.priceRegExp = /^[1-9][0-9]*$/i;
		this.storage = new Storage();
		this.init();
	}

	async init(){
		await this.storage.init();
		this.findNodes();
		this.bindAll();
		this.addEvents();
	}

	findNodes(){
		this.nodes = {
			form: document.getElementsByName('sell')[0],
			title: document.getElementsByName('title')[0],
			subtitle: document.getElementsByName('subtitle')[0],
			condition: document.getElementsByName('condition')[0],
			previmg: document.getElementsByName('previmg')[0],
			price: document.getElementsByName('price')[0],
			format: document.getElementsByName('format')[0],
			dateExp: document.getElementsByName('dateExp')[0],
			country: document.getElementsByName('country')[0],
			shipping: document.getElementsByName('shipping')[0],
			pictures: document.getElementsByName('pictures')[0],
			submit: document.getElementsByName('submit')[0],
			warning: document.getElementsByClassName('sell__warning')[0]
		}
	}

	bindAll(){
		this.handler = this.handler.bind(this);
	}

	addEvents(){
		this.nodes.submit.addEventListener('click', this.handler);
	}

	handler(e){
		e.preventDefault();
		this.clearWarning();
		if(this.checkForm()){
			this.createNewItem();
			this.addNewItemToSellList()
			this.changeTextBtn();
		}
	}

	clearWarning(){
		this.nodes.warning.innerHTML = '';
	}

	addNewItemToSellList(){
		let user  = this.storage.getLoginedUserFromTempStorage();
		if(user){
			//save id of item to user
			for (let i =0; i < this.storage.tempUsers.length; i++){
				if (this.storage.tempUsers[i].login == user.login){
					this.storage.tempUsers[i].sellitems.push({"item": this.newItem.id_item});
				}
			}
			// reserve item
			this.storage.updateAllLocalStorage();
		}
	}

	createNewItem(){
		this.newItem = {
			id_item: this.storage.generateNewId(),
			title: this.nodes.title.value,
			subtitle: this.nodes.subtitle.value,
			condition: this.getCondition(),
			previmg_path: 'img/' + this.nodes.previmg.files[0].name,
			price: this.nodes.price.value,
			bids: "0",
			auction: this.isAuction(),
			buy: this.isBuy(),
			reserved: false,
			country: this.nodes.country.value,
			date_exp: this.nodes.dateExp.value,
			shipping: this.getShipping(),
			pictures: [
				{link: 'img/' + this.nodes.pictures.files[0].name},{link: 'img/' + this.nodes.pictures.files[1].name},{link: 'img/' + this.nodes.pictures.files[2].name}
			]
		}
		console.dir(this.newItem );
		this.storage.addNewItemToTempStorage(this.newItem);
	}

	getShipping(){
		let indexSelected = this.nodes.shipping.selectedIndex;
		return this.nodes.shipping.getElementsByTagName('option')[indexSelected].value;
	}

	getCondition() {
		let indexSelected = this.nodes.condition.selectedIndex;
		return this.nodes.condition.getElementsByTagName('option')[indexSelected].value;
	}

	isBuy() {
		let indexSelected = this.nodes.format.selectedIndex;
		if (indexSelected == 0) { return true;}
		if (indexSelected == 1) { return false;}
	}

	isAuction(){
		let indexSelected = this.nodes.format.selectedIndex;
		if (indexSelected == 0) { return false;}
		if (indexSelected == 1) { return true;}
	}

	checkForm(){
		let flag = true;
		if (!this.textRegExp.test(this.nodes.title.value)){
			this.createWarningMessage('title');
			flag = false;
		}
		if (!this.textRegExp.test(this.nodes.subtitle.value)){
			this.createWarningMessage('subtitle');
			flag = false;
		}
		if (this.nodes.previmg.files.length == 0){
			this.createWarningMessage('previmg');
			flag = false;
		}
		if (!this.priceRegExp.test(this.nodes.price.value)){
			this.createWarningMessage('price');
			flag = false;
		}
		if(new Date(this.nodes.dateExp.value) <= Date.now()){
			this.createWarningMessage('dateExp');
			flag = false;
		}
		if(!this.textRegExp.test(this.nodes.country.value)){
			this.createWarningMessage('country');
			flag = false;
		}
		if(this.nodes.pictures.files.length !=3){
			this.createWarningMessage('pictures');
			flag = false;
		}
		return flag;
	}

	createWarningMessage(errorname){
		let message = document.createElement('p');
		switch (errorname){
			case 'title':
			message.append(document.createTextNode('you enterd invalid title or skip'));
			break;
			case 'subtitle':
			message.append(document.createTextNode('you enterd invalid subtitle or skip'));
			break;
			case 'previmg':
			message.append(document.createTextNode('you skip downloading main img'));
			break;
			case 'price':
			message.append(document.createTextNode('You entered invalid price or skip'));
			break;
			case 'dateExp':
			message.append(document.createTextNode('You entered invalid date or skip'));
			break;
			case 'country':
			message.append(document.createTextNode('You skip country'));
			break;
			case 'pictures':
			message.append(document.createTextNode('You skip downloding of 3 pictures'));
			break;
			default: console.log('incorrect error name');
		}
		this.nodes.warning.appendChild(message);
	}
	changeTextBtn(){
		this.nodes.submit.value = "ok!";
		this.nodes.submit.disabled = true;
	}
}
// Constructor
function Slider (elem, config) {
	this.elem = elem;

	//Read configuration
	this.direction = config.direction || 'forward'; // лево - назад, вправао - вперед
	this.autoDuration = config.autoDuration || 3000;
	this.init();
}

Slider.prototype = {
constructor: Slider, /*Сохраним конструктор  чтобы Slider2 можно было сделать через Slider1:
var Slider2 = new Slider1.Constructor(document.getElementsByClassName('slider')[1], config)*/

	init: function() {
			this.screen = this.elem.querySelector('.slider__screen');
			this.lens = this.elem.querySelector('.slider__lens');
			this.slides = this.elem.querySelectorAll('.slider__item');

			this.addCloneSlides();
			this.prepareDomSlider();
			this.bindAll();
			this.addEvents();
	},

	addCloneSlides: function() {
			var firstSlideClone = this.slides[0].cloneNode(true);
			var lastSlideClone = this.slides[this.slides.length - 1].cloneNode(true);
			this.lens.appendChild(firstSlideClone);
			this.lens.insertBefore(lastSlideClone, this.slides[0]);

	},

	prepareDomSlider: function() {
			this._slideWidth = this.slides[0].offsetWidth;
			this._lensWidth = (this.slides.length + 2)*this.slides[0].offsetWidth + "px";
			this.lens.style.width = this._lensWidth;

			this._lensMarginLeft = -1*this.slides[0].offsetWidth + "px";
			this.lens.style.marginLeft = this._lensMarginLeft;

			this._currentLensMarginLeft = this._lensMarginLeft;

			this.startCarousel();

	},

	bindAll: function() {
			this.mousemoveHandler = this.mousemoveHandler.bind(this);
			this.mouseupHandler = this.mouseupHandler.bind(this);
			this.mouseleaveHandler = this.mouseleaveHandler.bind(this);

	},


	startCarousel: function() {
			this.lens.classList.add('slider__lens_transition');
			this.timerAutoStart = setInterval(this.moveCarousel.bind(this), this.autoDuration, null, this.direction);
	},



	moveCarousel: function(event, typeMove) {
			var direction;
			switch (typeMove) {
					case 'forward':
							this._currentLensMarginLeft = parseInt(this._lensMarginLeft) - this._slideWidth  + "px";
					break;

					case 'backward':
							this._currentLensMarginLeft = parseInt(this._lensMarginLeft) + this._slideWidth + "px";
					break;

					case 'usermove':
					console.log('USERMOVE');
							direction = event.clientX - this._startDragX;
							if (direction > 0) {
									this._currentLensMarginLeft = parseInt(this._lensMarginLeft) + this._slideWidth + "px";
							} else if (direction < 0) {
									this._currentLensMarginLeft = parseInt(this._lensMarginLeft) - this._slideWidth + "px";
							}
			}

			this.lens.style.marginLeft = this._currentLensMarginLeft;
			this._lensMarginLeft = this._currentLensMarginLeft;

	},

	checkSlideCarousel: function() {
			if (parseInt(this._lensMarginLeft) == 0) {
					this.cancelTransition();
					this._lensMarginLeft = (2*this._slideWidth - parseInt(this._lensWidth)) + "px";
					this.lens.style.marginLeft = this._lensMarginLeft;
					this.turnOnTransition();

			}  else if (parseInt(this._lensMarginLeft) == (this._slideWidth - parseInt(this._lensWidth))) {
					this.cancelTransition();
					this._lensMarginLeft = -1*this._slideWidth + "px";
					this.lens.style.marginLeft = this._lensMarginLeft;
					this.turnOnTransition();
			}
	},


	cancelTransition: function() {
			this.lens.classList.remove('slider__lens_transition');
	},

	turnOnTransition: function() {
			var timerAddTransition = setTimeout(function(){this.lens.classList.add('slider__lens_transition');}.bind(this), 50);
	},


	fixWhich: function(e) {
			if (!e.which && e.button) { // если which нет, но есть button... (IE8-)
					if (e.button & 1) e.which = 1; // левая кнопка
					else if (e.button & 4) e.which = 2; // средняя кнопка
					else if (e.button & 2) e.which = 3; // правая кнопка
			}
	},

	mousedownHandler: function(event) {
			var event = event || window.event; //console.log('onmousedown');
			this.fixWhich(event);
					if (event.which != 1) {
							return false;
			}

			clearInterval(this.timerAutoStart);
			this._startDragX = event.clientX; //положение мыши при mousedown
			this._startX = this._startDragX;  //положение мыши перед onmousemove в конце каждого onmousemove
			this._currentLensMarginLeft = this._lensMarginLeft;

			//this.lens.onmousemove = this.mousemoveHandler.bind(this);
			//this.lens.onmouseup = this.mouseupHandler.bind(this);
			//this.screen.onmouseleave = this.mouseleaveHandler.bind(this);
			this.lens.addEventListener('mousemove', this.mousemoveHandler, false);
			this.lens.addEventListener('mouseup', this.mouseupHandler, false);
			this.screen.addEventListener('mouseleave', this.mouseleaveHandler, false);
	},

	mousemoveHandler: function(event) {
			var event = event || window.event;
			//console.log('onmousemove');
			this._currentLensMarginLeft = parseInt(this._currentLensMarginLeft) + event.clientX - this._startX  + "px";
			this._startX = event.clientX;
			this.lens.style.marginLeft = this._currentLensMarginLeft;
	},

	mouseupHandler: function(event) {
			var event = event || window.event;
			//console.log('mouseup');
			this.moveCarousel(event, 'usermove');
			this.deleteEvents();
			//this.lens.onmousemove = this.lens.onmouseup = this.screen.onmouseleave = null;
	},

	mouseleaveHandler: function (event) {
			var event = event || window.event;
			//console.log('mouseleave');
			this.moveCarousel(event, 'usermove');
			this.deleteEvents();
			//this.lens.onmousemove = this.lens.onmouseup = this.screen.onmouseleave = null;
	},

	ondragstart: function() {
			return false;
	},

	addEvents: function () {
			this.elem.ondragstart = function() {
						return false;
			};
			this.lens.addEventListener('transitionend', this.checkSlideCarousel.bind(this), false);
			this.screen.addEventListener('mousedown', this.mousedownHandler.bind(this), false);
	},

	deleteEvents: function() {
			this.lens.removeEventListener('mousemove', this.mousemoveHandler, false);
			this.lens.removeEventListener('mouseup', this.mouseupHandler, false);
			this.screen.removeEventListener('mouseleave', this.mouseleaveHandler, false);
	}

}


function launchSliders () {

	config = {
			autoDuration: 2000
	}
	var slider1 = new Slider(document.getElementsByClassName('slider')[0], config);
}

window.onload = launchSliders;
class Gallery{
	constructor(){
		this.init();
	}

	init(){
		this.findNodes();
		this.bindAll();
		this.addEvents();
	}

	findNodes(){
		this.nodes ={
			prevImgsContainer: document.getElementsByClassName('item-page__list-images')[0],
			mainImg: document.getElementsByClassName('item-page__main-img')[0]
		}
	}

	bindAll(){
		this.handler = this.handler.bind(this);
	}

	addEvents(){
		this.nodes.prevImgsContainer.addEventListener('click', this.handler);
	}

	handler(e){
		let thumbnail = event.target.closest('a');

		if (!thumbnail) return;
		this.showImg(thumbnail.href, thumbnail.title);
		event.preventDefault();
	}

	showImg(href, title){
		this.nodes.mainImg.src = href;
		this.nodes.mainImg.alt = title;
	}
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIEN1c3RvbVxyXG4gKi9cclxuZnVuY3Rpb24gYWRkVGV4dE5vZGUodGV4dCkge1xyXG4gIGxldCBuZXd0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCk7XHJcbiAgcmV0dXJuIG5ld3RleHQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldEF0dHIoaXRlbSwgaHRtbEVsZW1lbnQpe1xyXG5cdGZvciAoa2V5IGluIGl0ZW0pe1xyXG5cdFx0aWYgKGtleSAhPSBcInRleHRcIiAmJiBrZXkgIT0gXCJ0YWdcIiAmJiBrZXkgIT0gXCJodG1sXCIgJiYga2V5ICE9IFwidGV4dFwiICYmIGtleSAhPSBcImNoaWxkcmVuXCIpIHtcclxuXHRcdFx0aHRtbEVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgaXRlbVtrZXldKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlckhUTUwoZWxlbWVudCwgcGFyZW50KXtcclxuXHQvL2lmIGl0IGlzIHRoZSBkZWVwZXN0IHRhZyBlbGVtZW50XHJcblx0aWYgKCFBcnJheS5pc0FycmF5KGVsZW1lbnQpICYmICFlbGVtZW50LmNoaWxkcmVuKSB7XHJcblx0XHRpZiAoZWxlbWVudC50ZXh0KSB7XHJcblx0XHRcdHJldHVybiBwYXJlbnQuYXBwZW5kKGFkZFRleHROb2RlKGVsZW1lbnQudGV4dCkpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bGV0IGh0bWxFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50LnRhZyk7XHJcblx0XHRcdC8vYWRkIGF0dHJpYnV0ZXNcclxuXHRcdFx0c2V0QXR0cihlbGVtZW50LGh0bWxFbGVtKTtcclxuXHJcblx0XHRcdGh0bWxFbGVtLmFwcGVuZChhZGRUZXh0Tm9kZShlbGVtZW50Lmh0bWwpKTtcclxuXHRcdFx0cmV0dXJuIHBhcmVudC5hcHBlbmRDaGlsZChodG1sRWxlbSk7XHJcblx0XHR9XHJcblx0fSBlbHNlIHtcclxuXHRcdGVsZW1lbnQuZm9yRWFjaCgoaXRlbSk9PiB7XHJcblx0XHRcdGlmIChpdGVtLmNoaWxkcmVuKSB7XHJcblx0XHRcdFx0bGV0IGh0bWxFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdGVtLnRhZyk7XHJcblx0XHRcdFx0Ly9hZGQgYXR0cmlidXRlc1xyXG5cdFx0XHRcdHNldEF0dHIoaXRlbSwgaHRtbEVsZW0pO1xyXG5cclxuXHRcdFx0XHRwYXJlbnQuYXBwZW5kQ2hpbGQoaHRtbEVsZW0pO1xyXG5cdFx0XHRcdHJlbmRlckhUTUwoaXRlbS5jaGlsZHJlbiwgaHRtbEVsZW0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlbmRlckhUTUwoaXRlbSwgcGFyZW50KTtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuLy9yZXR1cm4ganNvbiBwYXJzZWQganNvbiBmaWxlXHJcbmNvbnN0ICBnZXRKU09OID0gYXN5bmMgKHBhdGgpPT4ge1xyXG5cdGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHBhdGgpO1xyXG5cdGxldCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cdHJldHVybiBkYXRhO1xyXG59XHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmNsYXNzIFN0b3JhZ2Uge1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHR0aGlzLnRlbXBJdGVtcyA9IFtdO1xyXG5cdFx0dGhpcy50ZW1wVXNlcnMgPSBbXTtcclxuXHRcdHRoaXMudGVtcEJvdWdodEl0ZW1zID0gW107XHJcblx0XHR0aGlzLmZpbHRlclBhcmFtcyA9IHt9O1xyXG5cdFx0dGhpcy5wYXRoID0ge1xyXG5cdFx0XHRpdGVtczogJ2pzb24vbGlzdGl0ZW1zLmpzb24nLFxyXG5cdFx0XHR1c2VyczogJ2pzb24vdXNlcnMuanNvbidcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgaW5pdCgpIHtcclxuXHRcdGF3YWl0IHRoaXMubG9hZExvY2FsU3RvcmFnZSgpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgbG9hZExvY2FsU3RvcmFnZSgpIHtcclxuXHRcdGxldCBpdGVtcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpdGVtcycpO1xyXG5cdFx0bGV0IHVzZXJzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJzJyk7XHJcblx0XHRhd2FpdCB0aGlzLnVwZGF0ZVRlbXBTdG9yYWdlKGl0ZW1zLCAnaXRlbXMnKTtcclxuXHRcdGF3YWl0IHRoaXMudXBkYXRlVGVtcFN0b3JhZ2UodXNlcnMsICd1c2VycycpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdXBkYXRlVGVtcFN0b3JhZ2UoZGF0YSwga2V5KSB7XHJcblx0XHRzd2l0Y2ggKGtleSkge1xyXG5cdFx0XHRjYXNlICdpdGVtcyc6XHJcblx0XHRcdFx0aWYgKGRhdGEpIHtcclxuXHRcdFx0XHRcdHRoaXMudGVtcEl0ZW1zID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy50ZW1wSXRlbXMgPSBhd2FpdCBnZXRKU09OKHRoaXMucGF0aC5pdGVtcyk7XHJcblx0XHRcdFx0XHR0aGlzLnNhdmVUb0xvY2FsU3RvcmFnZShrZXksIHRoaXMudGVtcEl0ZW1zKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICd1c2Vycyc6XHJcblx0XHRcdFx0aWYgKGRhdGEpIHtcclxuXHRcdFx0XHRcdHRoaXMudGVtcFVzZXJzID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy50ZW1wVXNlcnMgPSBhd2FpdCBnZXRKU09OKHRoaXMucGF0aC51c2Vycyk7XHJcblx0XHRcdFx0XHR0aGlzLnNhdmVUb0xvY2FsU3RvcmFnZShrZXksIHRoaXMudGVtcFVzZXJzKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OiB0aHJvdyBFcnJvciAoJ3NlcmV2ZXIgbm90IHJlc3BvbmQnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHVwZGF0ZUFsbExvY2FsU3RvcmFnZSgpe1xyXG5cdFx0dGhpcy5zYXZlVG9Mb2NhbFN0b3JhZ2UoJ3VzZXJzJywgdGhpcy50ZW1wVXNlcnMpO1xyXG5cdFx0dGhpcy5zYXZlVG9Mb2NhbFN0b3JhZ2UoJ2l0ZW1zJywgdGhpcy50ZW1wSXRlbXMpO1xyXG5cdH1cclxuXHJcblxyXG5cdHNhdmVUb0xvY2FsU3RvcmFnZShrZXksIGRhdGEpIHtcclxuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG5cdH1cclxuXHJcblx0Y29tcGFyZVByaWNlVG9IaWdoKGl0ZW1BLCBpdGVtQil7XHJcblx0XHRyZXR1cm4gaXRlbUIucHJpY2UgLSBpdGVtQS5wcmljZTtcclxuXHR9XHJcblxyXG5cdGNvbXBhcmVQcmljZVRvTG93KGl0ZW1BLCBpdGVtQil7XHJcblx0XHRyZXR1cm4gaXRlbUEucHJpY2UgLSBpdGVtQi5wcmljZTtcclxuXHR9XHJcblxyXG5cdCBnZXRUZW1wU3RvcmFnZShuYW1lKSB7XHJcblx0XHRzd2l0Y2ggKG5hbWUpIHtcclxuXHRcdFx0Y2FzZSAnaXRlbXMnOlxyXG5cdFx0XHRcdHJldHVybiB0aGlzLnRlbXBJdGVtcy5zb3J0KHRoaXMuY29tcGFyZVByaWNlVG9IaWdoKTtcclxuXHRcdFx0Y2FzZSAndXNlcnMnOlxyXG5cdFx0XHRcdHJldHVybiB0aGlzLnRlbXBVc2VycztcclxuXHRcdFx0ZGVmYXVsdDogdGhyb3cgRXJyb3IgKCdzZXJldmVyIG5vdCByZXNwb25kJyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXRJdGVtQnlJZChpZCkge1xyXG5cdFx0cmV0dXJuIHRoaXMudGVtcEl0ZW1zLmZpbmQoaXRlbSA9PiBpdGVtLmlkX2l0ZW0gPT0gaWQpO1xyXG5cdH1cclxuXHJcblx0Z2V0RmlsdGVyZWRJdGVtcyhwYXJhbXMpe1xyXG5cdFx0dGhpcy5maWx0ZXJQYXJhbXMgPSBwYXJhbXM7XHJcblx0XHRjb25zb2xlLmRpcih0aGlzLmZpbHRlclBhcmFtcyk7XHJcblx0XHRsZXQgZmlsdGVyQXJySXRlbXMgPSB0aGlzLmdldEl0ZW1zQnlBdmFpbGFibGUoKTtcclxuXHRcdGZpbHRlckFyckl0ZW1zID0gdGhpcy5nZXRJdGVtc0J5Q29uZGl0aW9uKGZpbHRlckFyckl0ZW1zKTtcclxuXHRcdGZpbHRlckFyckl0ZW1zID0gdGhpcy5nZXRJdGVtc0J5U2hpcHBpbmcoZmlsdGVyQXJySXRlbXMpO1xyXG5cdFx0ZmlsdGVyQXJySXRlbXMgPSB0aGlzLmdldEl0ZW1zQnlGb3JtYXQoZmlsdGVyQXJySXRlbXMpO1xyXG5cdFx0ZmlsdGVyQXJySXRlbXMgPSB0aGlzLmdldEl0ZW1zQnlQcmljZShmaWx0ZXJBcnJJdGVtcyk7XHJcblx0XHRmaWx0ZXJBcnJJdGVtcyA9IHRoaXMuZ2V0SXRlbXNCeVVzZXJSZXF1ZXN0KGZpbHRlckFyckl0ZW1zKTtcclxuXHRcdGZpbHRlckFyckl0ZW1zIC0gdGhpcy5zb3J0QnlEaXJlY3Rpb24oZmlsdGVyQXJySXRlbXMpXHJcblx0XHRyZXR1cm4gZmlsdGVyQXJySXRlbXM7XHJcblx0fVxyXG5cclxuXHRtYWtlQXJyYXkoc3RyKSB7XHJcblx0XHRyZXR1cm4gc3RyLnNwbGl0KCcsJyk7XHJcblx0fVxyXG5cclxuXHRnZXRJdGVtc0J5QXZhaWxhYmxlKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMudGVtcEl0ZW1zLmZpbHRlcihpdGVtID0+IGl0ZW0ucmVzZXJ2ZWQgPT0gZmFsc2UpO1xyXG5cdH1cclxuXHJcblx0c29ydEJ5RGlyZWN0aW9uKGFycikge1xyXG5cdFx0aWYgKHRoaXMuZmlsdGVyUGFyYW1zWydzb3J0J10pe1xyXG5cdFx0XHRzd2l0Y2ggKHRoaXMuZmlsdGVyUGFyYW1zWydzb3J0J10pe1xyXG5cdFx0XHRcdGNhc2UgJ2xvd3ByaWNlJzpcclxuXHRcdFx0XHRcdHJldHVybiBhcnIuc29ydCh0aGlzLmNvbXBhcmVQcmljZVRvSGlnaCk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnaGlnaHByaWNlJzpcclxuXHRcdFx0XHRcdHJldHVybiBhcnIuc29ydCh0aGlzLmNvbXBhcmVQcmljZVRvTG93KTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRkZWZhdWx0OiBhcnIuc29ydCh0aGlzLmNvbXBhcmVQcmljZVRvSGlnaCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBhcnIuc29ydCh0aGlzLmNvbXBhcmVQcmljZVRvSGlnaCk7XHJcblx0fVxyXG5cclxuXHRnZXRJdGVtc0J5VXNlclJlcXVlc3QoYXJyKXtcclxuXHRcdGlmICh0aGlzLmZpbHRlclBhcmFtc1sndXNlcnJlcXVlc3QnXSl7XHJcblx0XHRcdGxldCBzdHJQYXJhbXMgPSB0aGlzLm1ha2VBcnJheSh0aGlzLmZpbHRlclBhcmFtc1sndXNlcnJlcXVlc3QnXSkuam9pbignICcpO1xyXG5cdFx0XHRyZXR1cm4gYXJyLmZpbHRlcihpdGVtID0+IG5ldyBSZWdFeHAoc3RyUGFyYW1zLCAnaScpLnRlc3QoaXRlbS50aXRsZSkpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGFycjtcclxuXHR9XHJcblxyXG5cdGdldEl0ZW1zQnlQcmljZShhcnIpe1xyXG5cdFx0aWYodGhpcy5maWx0ZXJQYXJhbXNbJ2Zyb20nXSkge1xyXG5cdFx0XHRpZiAodGhpcy5maWx0ZXJQYXJhbXNbJ3RvJ10pIHtcclxuXHRcdFx0XHRyZXR1cm4gYXJyLmZpbHRlcihpdGVtID0+IHtcclxuXHRcdFx0XHRcdHJldHVybiBwYXJzZUludChpdGVtLnByaWNlKSA+PSArdGhpcy5maWx0ZXJQYXJhbXNbJ2Zyb20nXSAmJiBwYXJzZUludChpdGVtLnByaWNlKSA8PSArdGhpcy5maWx0ZXJQYXJhbXNbJ3RvJ107XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gYXJyLmZpbHRlcihpdGVtID0+IHtcclxuXHRcdFx0XHRcdHJldHVybiBwYXJzZUludChpdGVtLnByaWNlKSA+PSArdGhpcy5maWx0ZXJQYXJhbXNbJ2Zyb20nXTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gYXJyO1xyXG5cdH1cclxuXHJcblx0Z2V0SXRlbXNCeUNvbmRpdGlvbihhcnIpe1xyXG5cdFx0aWYgKHRoaXMuZmlsdGVyUGFyYW1zWydjb25kaXRpb24nXSl7XHJcblx0XHRcdGxldCBhcnJQYXJhbXMgPSB0aGlzLm1ha2VBcnJheSh0aGlzLmZpbHRlclBhcmFtc1snY29uZGl0aW9uJ10pO1xyXG5cdFx0XHRpZiAoYXJyUGFyYW1zLmxlbmd0aCA9PSAyKSB7XHJcblx0XHRcdFx0cmV0dXJuIGFyci5maWx0ZXIoaXRlbSA9PiB7cmV0dXJuIGl0ZW0uY29uZGl0aW9uID09IGFyclBhcmFtc1swXSB8fCBpdGVtLmNvbmRpdGlvbiA9PSBhcnJQYXJhbXNbMV19KVxyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChhcnJQYXJhbXMubGVuZ3RoID09IDEpIHtcclxuXHRcdFx0XHRyZXR1cm4gYXJyLmZpbHRlcihpdGVtID0+IGl0ZW0uY29uZGl0aW9uID09IGFyclBhcmFtc1swXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBhcnI7XHJcblx0fVxyXG5cclxuXHRyZXBsYWNlU2hpcHBpbmdQYXJhbXMoYXJyKXtcclxuXHRcdHJldHVybiBhcnIubWFwKG5hbWUgPT57XHJcblx0XHRcdGlmIChuYW1lID09ICdmcmVlJykge1xyXG5cdFx0XHRcdHJldHVybiAnRnJlZSBTaGlwcGluZyc7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKG5hbWUgPT0gJ2luc3RvcmUnKSB7XHJcblx0XHRcdFx0cmV0dXJuICdGcmVlIEluLXN0b3JlIFBpY2t1cCc7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKG5hbWUgPT0gJ2xvY2FsJykge1xyXG5cdFx0XHRcdHJldHVybiAnRnJlZSBMb2NhbCBQaWNrdXAnO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0Z2V0SXRlbXNCeVNoaXBwaW5nKGFycil7XHJcblx0XHRpZiAodGhpcy5maWx0ZXJQYXJhbXNbJ3NoaXBwaW5nJ10pe1xyXG5cdFx0XHRsZXQgYXJyUGFyYW1zID0gdGhpcy5tYWtlQXJyYXkodGhpcy5maWx0ZXJQYXJhbXNbJ3NoaXBwaW5nJ10pO1xyXG5cdFx0XHRhcnJQYXJhbXMgPSB0aGlzLnJlcGxhY2VTaGlwcGluZ1BhcmFtcyhhcnJQYXJhbXMpO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhhcnJQYXJhbXMpO1xyXG5cdFx0XHRcdGlmIChhcnJQYXJhbXMubGVuZ3RoID09IDMpIHtcclxuXHRcdFx0XHRcdHJldHVybiBhcnIuZmlsdGVyKGl0ZW0gPT4ge3JldHVybiBpdGVtLnNoaXBwaW5nID09IGFyclBhcmFtc1swXSB8fCBpdGVtLnNoaXBwaW5nID09IGFyclBhcmFtc1sxXSB8fCBpdGVtLnNoaXBwaW5nID09IGFyclBhcmFtc1syXX0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoYXJyUGFyYW1zLmxlbmd0aCA9PSAyKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gYXJyLmZpbHRlcihpdGVtID0+IHtyZXR1cm4gaXRlbS5zaGlwcGluZyA9PSBhcnJQYXJhbXNbMF0gfHwgaXRlbS5zaGlwcGluZyA9PSBhcnJQYXJhbXNbMV19KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKGFyclBhcmFtcy5sZW5ndGggPT0gMSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGFyci5maWx0ZXIoaXRlbSA9PiBpdGVtLnNoaXBwaW5nID09IGFyclBhcmFtc1swXSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGFycjtcclxuXHR9XHJcblxyXG5cdGdldEl0ZW1zQnlGb3JtYXQoYXJyKXtcclxuXHRcdHN3aXRjaCAodGhpcy5maWx0ZXJQYXJhbXNbJ2Zvcm1hdCddKXtcclxuXHRcdFx0Y2FzZSAnYnV5aXRub3cnOlxyXG5cdFx0XHRcdHJldHVybiBhcnIuZmlsdGVyKGl0ZW0gPT4gaXRlbS5idXkgPT0gdHJ1ZSk7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdhdWN0aW9uJzpcclxuXHRcdFx0XHRyZXR1cm4gYXJyLmZpbHRlcihpdGVtID0+IGl0ZW0uYXVjdGlvbiA9PSB0cnVlKVxyXG5cdFx0XHRicmVhaztcclxuXHRcdFx0ZGVmYXVsdDogY29uc29sZS5sb2coJ2RlZmF1bHQnKTsgcmV0dXJuIGFycjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cclxuXHQvL2FkZCB1c2VyIHdobyBpcyBsb2dpbmVkIHRvIExvY2FsU3RvcmFnZVxyXG5cdGFkZExvZ2luZWRVc2VydG9Mb2NhbFN0b3JhZ2UodXNlcil7XHJcblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWN0aXZlVXNlcicsIEpTT04uc3RyaW5naWZ5KHVzZXIpKTtcclxuXHR9XHJcblxyXG5cdHJlbW92ZUxvZ2luZWRVc2VyRnJvbUxvY2FsU3RvcmFnZSgpe1xyXG5cdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2FjdGl2ZVVzZXInKTtcclxuXHR9XHJcblxyXG5cdGdldExvZ2luZWRVc2VyRnJvbVRlbXBTdG9yYWdlKCl7XHJcblx0XHRsZXQgbG9naW5lZFVzZXIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhY3RpdmVVc2VyJykpO1xyXG5cdFx0aWYgKGxvZ2luZWRVc2VyKXtcclxuXHRcdFx0cmV0dXJuIHRoaXMudGVtcFVzZXJzLmZpbmQodXNlciA9PiB1c2VyLmxvZ2luID09PSBsb2dpbmVkVXNlci5sb2dpbik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFkZE5ld0l0ZW1Ub1RlbXBTdG9yYWdlKGRhdGEpe1xyXG5cdFx0dGhpcy50ZW1wSXRlbXMucHVzaChkYXRhKTtcclxuXHRcdGNvbnNvbGUuZGlyKHRoaXMudGVtcEl0ZW1zKTtcclxuXHRcdHRoaXMuc2F2ZVRvTG9jYWxTdG9yYWdlKCdpdGVtcycsIHRoaXMudGVtcEl0ZW1zKTtcclxuXHR9XHJcblx0YWRkTmV3VXNlcnRvVGVtcFN0b3JhZ2UoZGF0YSl7XHJcblx0XHR0aGlzLnRlbXBVc2Vycy5wdXNoKGRhdGEpO1xyXG5cdFx0Y29uc29sZS5kaXIodGhpcy50ZW1wVXNlcnMpO1xyXG5cdFx0dGhpcy5zYXZlVG9Mb2NhbFN0b3JhZ2UoJ3VzZXJzJywgdGhpcy50ZW1wVXNlcnMpO1xyXG5cdH1cclxuXHJcblx0Z2V0Qm91Z2h0SXRlbXNCeVVzZXIoKXtcclxuXHRcdGxldCBsb2dpbmVkVXNlciA9IHRoaXMuZ2V0TG9naW5lZFVzZXJGcm9tVGVtcFN0b3JhZ2UoKTtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpPCBsb2dpbmVkVXNlci5idXlpdGVtcy5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdGNvbnNvbGUubG9nKGxvZ2luZWRVc2VyLmJ1eWl0ZW1zW2ldKTtcclxuXHRcdFx0dGhpcy50ZW1wQm91Z2h0SXRlbXMucHVzaCh0aGlzLmdldEl0ZW1CeUlkKGxvZ2luZWRVc2VyLmJ1eWl0ZW1zW2ldLml0ZW0pKVxyXG5cdFx0fVxyXG5cdFx0Y29uc29sZS5kaXIodGhpcy50ZW1wQm91Z2h0SXRlbXMpO1xyXG5cdFx0cmV0dXJuIHRoaXMudGVtcEJvdWdodEl0ZW1zO1xyXG5cdH1cclxuXHRnZW5lcmF0ZU5ld0lkKCl7XHJcblx0XHRjb25zb2xlLmRpcih0aGlzLnRlbXBJdGVtc1s5XSk7XHJcblx0XHRyZXR1cm4gK3RoaXMudGVtcEl0ZW1zW3RoaXMudGVtcEl0ZW1zLmxlbmd0aC0xXVsnaWRfaXRlbSddICsgMSArICcnO1xyXG5cdH1cclxufVxyXG4vLyBvcHRpb24gYWxsIG9yIGVtcHR5XHJcbmNsYXNzIEZpbHRlciB7XHJcblx0Y29uc3RydWN0b3Ioe29wdGlvbiA9ICdzZWFyY2gnLCBwYXJhbXMgPSB7fX0gPXt9KXtcclxuXHRcdHRoaXMucmVnRXhwID0gL15cXC9zZWFyY2guKy9pO1xyXG5cdFx0dGhpcy51c2VycmVxdWVzdFJlZ0V4cCA9IC9bYS16MC05YS160LAt0Y/RkV0rL2dpO1xyXG5cdFx0dGhpcy5vcHRpb24gPSBvcHRpb247XHJcblx0XHR0aGlzLnBhcmFtcyA9IHBhcmFtcztcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG5cclxuXHRpbml0KCkge1xyXG5cdFx0dGhpcy5maW5kTm9kZXMoKTtcclxuXHRcdHRoaXMuYmluZEFsbCgpO1xyXG5cdFx0dGhpcy5hZGRFdmVudHMoKTtcclxuXHRcdHRoaXMuYXV0b0NoZWNrKCk7XHJcblx0fVxyXG5cclxuXHRmaW5kTm9kZXMoKSB7XHJcblx0XHRpZiAodGhpcy5vcHRpb24gPT0gJ2FsbCcpIHtcclxuXHRcdFx0dGhpcy5ub2RlcyA9IHtcclxuXHRcdFx0XHRjb25kaXRpb246IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKCdjb25kaXRpb24nKSxcclxuXHRcdFx0XHRzaGlwcGluZzogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoJ3NoaXBwaW5nJyksXHJcblx0XHRcdFx0ZnJvbTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zyb20nKSxcclxuXHRcdFx0XHR0bzogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvJyksXHJcblx0XHRcdFx0YnRuZnJvbXRvOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuZnJvbXRvJyksXHJcblx0XHRcdFx0c2VhcmNoOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoJyksXHJcblx0XHRcdFx0c2VhcmNoQnRuOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoLWlucHV0JyksXHJcblx0XHRcdFx0YnV5aXRub3c6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidXlpdG5vdycpLFxyXG5cdFx0XHRcdGF1Y3Rpb246IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhdWN0aW9uJyksXHJcblx0XHRcdFx0Zm9ybWF0OiBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSgnZm9ybWF0JyksXHJcblx0XHRcdFx0c29ydDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvcnQnKSxcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5ub2RlcyA9IHtcclxuXHRcdFx0XHRzZWFyY2g6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2gnKSxcclxuXHRcdFx0XHRzZWFyY2hCdG46IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2gtaW5wdXQnKSxcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdGJpbmRBbGwoKSB7XHJcblx0XHR0aGlzLmNoZWNrQ29uZGl0aW9uID0gdGhpcy5jaGVja0NvbmRpdGlvbi5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5jaGVja1NoaXBwaW5nID0gdGhpcy5jaGVja1NoaXBwaW5nLmJpbmQodGhpcyk7XHJcblx0XHR0aGlzLnJhbmdlUHJpY2UgPSB0aGlzLnJhbmdlUHJpY2UuYmluZCh0aGlzKTtcclxuXHRcdHRoaXMuY2hlY2tGb3JtYXQgPSB0aGlzLmNoZWNrRm9ybWF0LmJpbmQodGhpcyk7XHJcblx0XHR0aGlzLnNlYXJjaCA9IHRoaXMuc2VhcmNoLmJpbmQodGhpcyk7XHJcblx0XHR0aGlzLnNvcnQgPSB0aGlzLnNvcnQuYmluZCh0aGlzKTtcclxuXHRcdHRoaXMuaGFuZGxlciA9IHRoaXMuaGFuZGxlci5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5oYW5kbGVyQWxsID0gdGhpcy5oYW5kbGVyQWxsLmJpbmQodGhpcyk7XHJcblx0fVxyXG5cclxuXHRhZGRFdmVudHMoKSB7XHJcblx0XHRpZiAodGhpcy5vcHRpb24gPT0gJ2FsbCcpe1xyXG5cdFx0XHR0aGlzLm5vZGVzLmNvbmRpdGlvblswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlckFsbCk7XHJcblx0XHRcdHRoaXMubm9kZXMuY29uZGl0aW9uWzFdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVyQWxsKTtcclxuXHRcdFx0dGhpcy5ub2Rlcy5zaGlwcGluZ1swXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlckFsbCk7XHJcblx0XHRcdHRoaXMubm9kZXMuc2hpcHBpbmdbMV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZXJBbGwpO1xyXG5cdFx0XHR0aGlzLm5vZGVzLnNoaXBwaW5nWzJdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVyQWxsKTtcclxuXHRcdFx0dGhpcy5ub2Rlcy5idG5mcm9tdG8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZXJBbGwpO1xyXG5cdFx0XHR0aGlzLm5vZGVzLmZvcm1hdFswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlckFsbCk7XHJcblx0XHRcdHRoaXMubm9kZXMuZm9ybWF0WzFdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVyQWxsKTtcclxuXHRcdFx0dGhpcy5ub2Rlcy5zZWFyY2hCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZXJBbGwpO1xyXG5cdFx0XHR0aGlzLm5vZGVzLnNvcnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5oYW5kbGVyQWxsKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMubm9kZXMuc2VhcmNoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVyKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG1ha2VBcnJheShzdHIpIHtcclxuXHRcdHJldHVybiBzdHIuc3BsaXQoJywnKTtcclxuXHR9XHJcblxyXG5cdC8vIGNoZWNrIGZpbHRlciBhbmQgc29ydCBvcHRpb25zIGFmdGVyIGxvY2F0aW9uLmFzc2lnblxyXG5cdGF1dG9DaGVjaygpIHtcclxuXHRcdGlmICh0aGlzLnBhcmFtc1snY29uZGl0aW9uJ10pe1xyXG5cdFx0XHRsZXQgYXJyUGFyYW1zID0gdGhpcy5tYWtlQXJyYXkodGhpcy5wYXJhbXNbJ2NvbmRpdGlvbiddKTtcclxuXHRcdFx0dGhpcy5hdXRvQ2hlY2tDb25kaXRpb24oYXJyUGFyYW1zKTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLnBhcmFtc1snc2hpcHBpbmcnXSl7XHJcblx0XHRcdGxldCBhcnJQYXJhbXMgPSB0aGlzLm1ha2VBcnJheSh0aGlzLnBhcmFtc1snc2hpcHBpbmcnXSk7XHJcblx0XHRcdHRoaXMuYXV0b0NoZWNrU2hpcHBpbmcoYXJyUGFyYW1zKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5wYXJhbXNbJ3RvJ10pe1xyXG5cdFx0XHRsZXQgYXJyUGFyYW1zID0gdGhpcy5tYWtlQXJyYXkodGhpcy5wYXJhbXNbJ3RvJ10pO1xyXG5cdFx0XHR0aGlzLmF1dG9DaGVja1JhbmdlUHJpY2UoYXJyUGFyYW1zLCAndG8nKTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLnBhcmFtc1snZnJvbSddKXtcclxuXHRcdFx0bGV0IGFyclBhcmFtcyA9IHRoaXMubWFrZUFycmF5KHRoaXMucGFyYW1zWydmcm9tJ10pO1xyXG5cdFx0XHR0aGlzLmF1dG9DaGVja1JhbmdlUHJpY2UoYXJyUGFyYW1zLCAnZnJvbScpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMucGFyYW1zWydmb3JtYXQnXSl7XHJcblx0XHRcdHRoaXMuYXV0b0NoZWNrRm9ybWF0KHRoaXMucGFyYW1zWydmb3JtYXQnXSk7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5wYXJhbXNbJ3VzZXJyZXF1ZXN0J10pe1xyXG5cdFx0XHRsZXQgYXJyUGFyYW1zID0gdGhpcy5tYWtlQXJyYXkodGhpcy5wYXJhbXNbJ3VzZXJyZXF1ZXN0J10pO1xyXG5cdFx0XHR0aGlzLmF1dG9GaWxsU2VhcmNoKGFyclBhcmFtcyk7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5wYXJhbXNbJ3NvcnQnXSl7XHJcblx0XHRcdHRoaXMuYXV0b0NoZWNrU29ydCh0aGlzLnBhcmFtc1snc29ydCddKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGF1dG9DaGVja1NvcnQodmFsdWUpe1xyXG5cdFx0c3dpdGNoICh2YWx1ZSkge1xyXG5cdFx0XHRjYXNlICdsb3dwcmljZSc6XHJcblx0XHRcdFx0dGhpcy5ub2Rlcy5zb3J0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdvcHRpb24nKVswXS5zZWxlY3RlZCA9IHRydWU7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdoaWdocHJpY2UnOlxyXG5cdFx0XHRcdHRoaXMubm9kZXMuc29ydC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnb3B0aW9uJylbMV0uc2VsZWN0ZWQgPSB0cnVlO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdFx0ZGVmYXVsdDogY29uc29sZS5sb2coJ2ludmFsaWQnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGF1dG9GaWxsU2VhcmNoKGFycikge1xyXG5cdFx0dGhpcy5ub2Rlcy5zZWFyY2gudmFsdWUgPSBhcnIuam9pbignICcpO1xyXG5cdH1cclxuXHJcblx0YXV0b0NoZWNrRm9ybWF0KHZhbHVlKXtcclxuXHRcdHN3aXRjaCAodmFsdWUpIHtcclxuXHRcdFx0Y2FzZSAnYnV5aXRub3cnOlxyXG5cdFx0XHRcdHRoaXMubm9kZXMuZm9ybWF0WzBdLmNoZWNrZWQgPSB0cnVlO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnYXVjdGlvbic6XHJcblx0XHRcdFx0dGhpcy5ub2Rlcy5mb3JtYXRbMV0uY2hlY2tlZCA9IHRydWU7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OiBjb25zb2xlLmxvZygnaW52YWxpZCBxdWVyeSBzdHJpbmcnKTtcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRhdXRvQ2hlY2tSYW5nZVByaWNlKGFyciwgaW5wdXQpe1xyXG5cdFx0c3dpdGNoIChpbnB1dCkge1xyXG5cdFx0XHRjYXNlICd0byc6XHJcblx0XHRcdFx0dGhpcy5ub2Rlcy50by52YWx1ZSA9IGFyci50b1N0cmluZygpO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnZnJvbSc6XHJcblx0XHRcdFx0dGhpcy5ub2Rlcy5mcm9tLnZhbHVlID0gYXJyLnRvU3RyaW5nKCk7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OiBjb25zb2xlLmxvZygnaW52YWxpZCBxdWVyeSBzdHJpbmcnKTtcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cdGF1dG9DaGVja1NoaXBwaW5nKGFycikge1xyXG5cdFx0YXJyLmZvckVhY2goZWxlbWVudCA9PiB7XHJcblx0XHRcdHN3aXRjaCAoZWxlbWVudCkge1xyXG5cdFx0XHRcdGNhc2UgJ2ZyZWUnOlxyXG5cdFx0XHRcdFx0dGhpcy5ub2Rlcy5zaGlwcGluZ1swXS5jaGVja2VkID0gdHJ1ZTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICdpbnN0b3JlJzpcclxuXHRcdFx0XHRcdHRoaXMubm9kZXMuc2hpcHBpbmdbMV0uY2hlY2tlZCA9IHRydWU7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnbG9jYWwnOlxyXG5cdFx0XHRcdFx0dGhpcy5ub2Rlcy5zaGlwcGluZ1syXS5jaGVja2VkID0gdHJ1ZTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRkZWZhdWx0OiBjb25zb2xlLmxvZygnaW52YWxpZCBxdWVyeSBzdHJpbmcnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRhdXRvQ2hlY2tDb25kaXRpb24oYXJyKSB7XHJcblx0XHRhcnIuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuXHRcdFx0c3dpdGNoIChlbGVtZW50KSB7XHJcblx0XHRcdFx0Y2FzZSAnbmV3JzpcclxuXHRcdFx0XHRcdHRoaXMubm9kZXMuY29uZGl0aW9uWzBdLmNoZWNrZWQgPSB0cnVlO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJ3VzZWQnOlxyXG5cdFx0XHRcdFx0dGhpcy5ub2Rlcy5jb25kaXRpb25bMV0uY2hlY2tlZCA9IHRydWU7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0ZGVmYXVsdDogY29uc29sZS5sb2coJ2ludmFsaWQgcXVlcnkgc3RyaW5nJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Z2V0UGF0aCgpIHtcclxuXHRcdHRoaXMuY3VycmVudFBhdGhOYW1lID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xyXG5cdH1cclxuXHJcblx0c2VhcmNoKGUpIHtcclxuXHRcdGlmICh0aGlzLm5vZGVzLnNlYXJjaC52YWx1ZSkge1xyXG5cdFx0XHR0aGlzLnBhcmFtc1sndXNlcnJlcXVlc3QnXSA9IHRoaXMubm9kZXMuc2VhcmNoLnZhbHVlLm1hdGNoKHRoaXMudXNlcnJlcXVlc3RSZWdFeHApO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZGVsZXRlIHRoaXMucGFyYW1zWyd1c2VycmVxdWVzdCddO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c29ydChlKSB7XHJcblx0XHRsZXQgaW5kZXhTZWxlY3RlZCA9IHRoaXMubm9kZXMuc29ydC5zZWxlY3RlZEluZGV4O1xyXG5cdFx0Y29uc29sZS5sb2coaW5kZXhTZWxlY3RlZCk7XHJcblx0XHR0aGlzLnBhcmFtc1t0aGlzLm5vZGVzLnNvcnQuZ2V0QXR0cmlidXRlKCduYW1lJyldID0gdGhpcy5ub2Rlcy5zb3J0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdvcHRpb24nKVtpbmRleFNlbGVjdGVkXS52YWx1ZTtcclxuXHRcdGNvbnNvbGUuZGlyKHRoaXMucGFyYW1zKTtcclxuXHR9XHJcblxyXG5cdGNoZWNrRm9ybWF0KGUpIHtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ub2Rlcy5mb3JtYXQubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKHRoaXMubm9kZXMuZm9ybWF0W2ldLmNoZWNrZWQpIHtcclxuXHRcdFx0XHR0aGlzLnBhcmFtc1t0aGlzLm5vZGVzLmZvcm1hdFtpXS5nZXRBdHRyaWJ1dGUoJ25hbWUnKV0gPSB0aGlzLm5vZGVzLmZvcm1hdFtpXS52YWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmFuZ2VQcmljZShlKSB7XHJcblx0XHRsZXQgZnJvbSA9IHRoaXMubm9kZXMuZnJvbS52YWx1ZSB8fCAwO1xyXG5cdFx0bGV0IHRvID0gdGhpcy5ub2Rlcy50by52YWx1ZSB8fCBJbmZpbml0eTtcclxuXHRcdHRoaXMucGFyYW1zWydmcm9tJ10gPSBmcm9tO1xyXG5cdFx0aWYgKGlzRmluaXRlKHRvKSkge1xyXG5cdFx0XHR0aGlzLnBhcmFtc1sndG8nXSA9IHRvO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y2hlY2tDb25kaXRpb24oZSkge1xyXG5cdFx0bGV0IHF1ZXJ5U3RyaW5nID0gJyc7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubm9kZXMuY29uZGl0aW9uLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmICh0aGlzLm5vZGVzLmNvbmRpdGlvbltpXS5jaGVja2VkKSB7XHJcblx0XHRcdFx0cXVlcnlTdHJpbmcgKz0gdGhpcy5ub2Rlcy5jb25kaXRpb25baV0udmFsdWUgKyAnLCc7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHF1ZXJ5U3RyaW5nID0gcXVlcnlTdHJpbmcuc2xpY2UoMCwgLTEpO1xyXG5cdFx0aWYgKHF1ZXJ5U3RyaW5nKSB7XHJcblx0XHRcdHRoaXMucGFyYW1zW3RoaXMubm9kZXMuY29uZGl0aW9uWzBdLmdldEF0dHJpYnV0ZSgnbmFtZScpXSA9IHF1ZXJ5U3RyaW5nO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZGVsZXRlIHRoaXMucGFyYW1zW3RoaXMubm9kZXMuY29uZGl0aW9uWzBdLmdldEF0dHJpYnV0ZSgnbmFtZScpXTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNoZWNrU2hpcHBpbmcoZSkge1xyXG5cdFx0bGV0IHF1ZXJ5U3RyaW5nID0gJyc7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubm9kZXMuc2hpcHBpbmcubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKHRoaXMubm9kZXMuc2hpcHBpbmdbaV0uY2hlY2tlZCkge1xyXG5cdFx0XHRcdHF1ZXJ5U3RyaW5nICs9IHRoaXMubm9kZXMuc2hpcHBpbmdbaV0udmFsdWUgKyAnLCc7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHF1ZXJ5U3RyaW5nID0gcXVlcnlTdHJpbmcuc2xpY2UoMCwgLTEpO1xyXG5cdFx0aWYgKHF1ZXJ5U3RyaW5nKSB7XHJcblx0XHRcdHRoaXMucGFyYW1zW3RoaXMubm9kZXMuc2hpcHBpbmdbMF0uZ2V0QXR0cmlidXRlKCduYW1lJyldID0gcXVlcnlTdHJpbmc7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRkZWxldGUgdGhpcy5wYXJhbXNbdGhpcy5ub2Rlcy5zaGlwcGluZ1swXS5nZXRBdHRyaWJ1dGUoJ25hbWUnKV07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRoYW5kbGVyQWxsKGUpIHtcclxuXHRcdHRoaXMuY2hlY2tGb3JtYXQoKTtcclxuXHRcdHRoaXMuY2hlY2tDb25kaXRpb24oKTtcclxuXHRcdHRoaXMuY2hlY2tTaGlwcGluZygpO1xyXG5cdFx0dGhpcy5yYW5nZVByaWNlKCk7XHJcblx0XHR0aGlzLnNlYXJjaCgpO1xyXG5cdFx0dGhpcy5zb3J0KCk7XHJcblx0XHR0aGlzLmNyZWF0ZVVSTCgpO1xyXG5cdH1cclxuXHJcblx0aGFuZGxlcihlKSB7XHJcblx0XHR0aGlzLnNlYXJjaCgpO1xyXG5cdFx0dGhpcy5jcmVhdGVVUkwoKTtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZVVSTCgpe1xyXG5cdFx0bGV0IHVybCA9ICcvc2VhcmNoPyc7XHJcblx0XHRmb3IgKGtleSBpbiB0aGlzLnBhcmFtcykge1xyXG5cdFx0XHRpZiAoa2V5ID09ICd1c2VycmVxdWVzdCcpIHtcclxuXHRcdFx0XHRsZXQgcmVxdWVzdHVybCA9IHRoaXMucGFyYW1zW2tleV0ucmVkdWNlKChzdW0sIGN1cnJlbnQpID0+IHtcclxuXHRcdFx0XHRcdHJldHVybiBzdW0gKyBjdXJyZW50ICsgJywnO1xyXG5cdFx0XHRcdH0sICd1c2VycmVxdWVzdD0nKTtcclxuXHRcdFx0XHR1cmwgKz0gcmVxdWVzdHVybC5zbGljZSgwLCAtMSkgKyAnJic7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dXJsICs9IGtleSArICc9JyArIHRoaXMucGFyYW1zW2tleV0gKyAnJic7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdC8vIHVybCA9IGVuY29kZVVSSSh1cmwuc2xpY2UoMCwgLTEpKTtcclxuXHRcdHVybCA9IHVybC5zbGljZSgwLCAtMSk7XHJcblx0XHRjb25zb2xlLmxvZyh1cmwpO1xyXG5cdFx0bG9jYXRpb24uYXNzaWduKHVybCk7XHJcblx0fVxyXG59XHJcbmNsYXNzIE1hbmFnZXIge1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHR0aGlzLnN0b3JhZ2UgPSBuZXcgU3RvcmFnZSgpO1xyXG5cdFx0dGhpcy5yZWdFeHBJZCA9IC9eXFwvaXRlbVxcZCskL2k7XHJcblx0XHR0aGlzLnJlZ1NlYXJjaCA9IC9eXFwvc2VhcmNoJC9pO1xyXG5cdFx0dGhpcy5wYXJhbXMgPSB7fTtcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdFx0Y29uc29sZS5sb2coJ21hbmFnZXIgaW5pdCcpO1xyXG5cdH1cclxuXHRhc3luYyBpbml0KCkge1xyXG5cdFx0YXdhaXQgdGhpcy5zdG9yYWdlLmluaXQoKTtcclxuXHRcdHRoaXMuZ2V0TG9naW5lZFVzZXIoKTtcclxuXHRcdHRoaXMuZ2V0UGF0aCgpO1xyXG5cdFx0dGhpcy5nZXRTZWFyY2hQYXJhbXMoKVxyXG5cdFx0dGhpcy5vbmxvYWRQYWdlKCk7XHJcblx0fVxyXG5cclxuXHRnZXRMb2dpbmVkVXNlcigpIHtcclxuXHRcdHRoaXMubG9naW5lZFVzZXIgPSB0aGlzLnN0b3JhZ2UuZ2V0TG9naW5lZFVzZXJGcm9tVGVtcFN0b3JhZ2UoKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHJlbmRlckNvbnRhY3RzUGFnZSgpIHtcclxuXHRcdGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdqc29uL3BhZ2UtY29udGFjdHMuanNvbicpO1xyXG5cdFx0bGV0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblx0XHRyZW5kZXJIVE1MKGRhdGEsIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21haW5fX2NvbnRhaW5lcicpWzBdKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHJlbmRlclJlZ2lzdHJhdGlvbigpIHtcclxuXHRcdGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdqc29uL3BhZ2UtcmVnaXN0cmF0aW9uLmpzb24nKTtcclxuXHRcdGxldCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cdFx0cmVuZGVySFRNTChkYXRhLCBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtYWluX19jb250YWluZXInKVswXSk7XHJcblx0fVxyXG5cclxuXHRhc3luYyByZW5kZXJIZWFkZXIoKSB7XHJcblx0XHRpZiAodGhpcy5sb2dpbmVkVXNlcil7XHJcblx0XHRcdGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdqc29uL3BhZ2UtbmF2LWxlZnQtYXV0aC5qc29uJyk7XHJcblx0XHRcdGxldCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cdFx0XHRyZW5kZXJIVE1MKGRhdGEsIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ25hdl9fbGVmdCcpWzBdKTtcclxuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbmF2X191c2VyLW5hbWUnKVswXS5hcHBlbmQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy5sb2dpbmVkVXNlci5uYW1lKSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnanNvbi9wYWdlLW5hdi1sZWZ0LXVuYXV0aC5qc29uJyk7XHJcblx0XHRcdGxldCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cdFx0XHRyZW5kZXJIVE1MKGRhdGEsIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ25hdl9fbGVmdCcpWzBdKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFzeW5jIHJlbmRlckFkdmVydCgpIHtcclxuXHRcdGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdqc29uL3BhZ2UtdGV4dC5qc29uJyk7XHJcblx0XHRsZXQgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHRcdHJlbmRlckhUTUwoZGF0YSwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWFpbl9fY29udGFpbmVyJylbMF0pO1xyXG5cdH1cclxuXHJcblx0cmVuZGVyUmVzdWx0KGFycikge1xyXG5cdFx0bGV0IHRlbXBsYXRlQ29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaXRlbVwiKTtcclxuXHRcdGxldCB0ZW1wbGF0ZSA9IF8udGVtcGxhdGUodGVtcGxhdGVDb250ZW50LmlubmVySFRNTCk7XHJcblx0XHRsZXQgcmVzdWx0ID0gYXJyLnJlZHVjZShmdW5jdGlvbihzdW0sIGN1cnJlbnQpIHtcclxuXHRcdFx0cmV0dXJuICB0ZW1wbGF0ZShjdXJyZW50KSArIHN1bTtcclxuXHRcdH0uYmluZCh0aGlzKSxcIlwiKTtcclxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJyZXN1bHRfX2NvbnRhaW5lclwiKVswXS5pbm5lckhUTUwgPSByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRyZW5kZXJJdGVtUGFnZShvYmopIHtcclxuXHRcdGxldCB0ZW1wbGF0ZVBhZ2VJdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpdGVtLXBhZ2VcIik7XHJcblx0XHRsZXQgdGVtcGxhdGVJdGVtID0gXy50ZW1wbGF0ZSh0ZW1wbGF0ZVBhZ2VJdGVtLmlubmVySFRNTCk7XHJcblx0XHRsZXQgcmVzdWx0ID0gdGVtcGxhdGVJdGVtKG9iaik7XHJcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibWFpbl9fY29udGFpbmVyXCIpWzBdLmlubmVySFRNTCA9IHJlc3VsdDtcclxuXHRcdC8vZ2FsbGVyeVxyXG5cdFx0dmFyIHRlbXBsYXRlUGFnZUdhbGxlcnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FsbGVyeS1pdGVtJyk7XHJcblx0XHR2YXIgdGVtcGxhdGVHYWxsYXJ5ID0gXy50ZW1wbGF0ZSh0ZW1wbGF0ZVBhZ2VHYWxsZXJ5LmlubmVySFRNTCk7XHJcblx0XHR2YXIgcmVzdWx0VUwgPSBvYmoucGljdHVyZXMucmVkdWNlKChzdW0sIGN1cnJlbnQpID0+IHtcclxuXHRcdFx0cmV0dXJuIHRlbXBsYXRlR2FsbGFyeShjdXJyZW50KSArIHN1bTtcclxuXHRcdH0sXCJcIiApXHJcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpdGVtLXBhZ2VfX2xpc3QtaW1hZ2VzJylbMF0uaW5uZXJIVE1MID0gcmVzdWx0VUw7XHJcblx0fVxyXG5cclxuXHRyZW5kZXJIaXN0b3J5KGFycil7XHJcblx0XHRsZXQgdGVtcGxhdGVDb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpdGVtXCIpO1xyXG5cdFx0bGV0IHRlbXBsYXRlID0gXy50ZW1wbGF0ZSh0ZW1wbGF0ZUNvbnRlbnQuaW5uZXJIVE1MKTtcclxuXHRcdGxldCByZXN1bHQgPSBhcnIucmVkdWNlKGZ1bmN0aW9uKHN1bSwgY3VycmVudCkge1xyXG5cdFx0XHRyZXR1cm4gIHRlbXBsYXRlKGN1cnJlbnQpICsgc3VtO1xyXG5cdFx0fS5iaW5kKHRoaXMpLFwiXCIpO1xyXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm1haW5fX2NvbnRhaW5lclwiKVswXS5pbm5lckhUTUwgPSByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRhc3luYyByZW5kZXJNYWluUGFnZSgpIHtcclxuXHRcdGxldCBkYXRhID0gYXdhaXQgZ2V0SlNPTignanNvbi9wYWdlLWFzaWRlLXJlc3VsdC5qc29uJyk7XHJcblx0XHRyZW5kZXJIVE1MKGRhdGEsIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21haW5fX2NvbnRhaW5lcicpWzBdKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHJlbmRlclNpZ25pbigpIHtcclxuXHRcdGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdqc29uL3BhZ2Utc2lnbmluLmpzb24nKTtcclxuXHRcdGxldCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cdFx0cmVuZGVySFRNTChkYXRhLCBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtYWluX19jb250YWluZXInKVswXSk7XHJcblx0fVxyXG5cclxuXHRhc3luYyByZW5kZXJTZWxsKCkge1xyXG5cdFx0bGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2pzb24vcGFnZS1zZWxsLmpzb24nKTtcclxuXHRcdGxldCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cdFx0cmVuZGVySFRNTChkYXRhLCBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtYWluX19jb250YWluZXInKVswXSk7XHJcblx0fVxyXG5cclxuXHRnZXRQYXRoKCkge1xyXG5cdFx0dGhpcy5jdXJyZW50UGF0aE5hbWUgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XHJcblx0fVxyXG5cclxuXHRnZXRTZWFyY2hQYXJhbXMoKSB7XHJcblx0XHR0aGlzLnNlYXJjaFBhcmFtcyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XHJcblx0fVxyXG5cclxuXHRnZXRJdGVtSWRmcm9tUGF0aCgpIHtcclxuXHRcdGxldCByZWcgPSAvXlxcL2l0ZW0oXFxkKyQpL2k7XHJcblx0XHRyZXR1cm4gdGhpcy5jdXJyZW50UGF0aE5hbWUubWF0Y2gocmVnKVsxXTtcclxuXHR9XHJcblxyXG5cdHBhcnNlU2VhcmNoUGFyYW1zKCkge1xyXG5cdFx0Ly9sZXQgc3RyID1cdCcvc2VhcmNoP2NvbmRpdGlvbj1uZXcsdXNlZCZzaGlwcGluZz1mcmVlLGluc3RvcmUsbG9jYWwmZnJvbT00JmZvcm1hdD1idXlpdG5vdyZ1c2VycmVxdWVzdD1tYW1hK3BhcGEnO1xyXG5cdFx0bGV0IHN0ciA9IHRoaXMuc2VhcmNoUGFyYW1zO1xyXG5cdFx0aWYgKHN0cil7XHJcblx0XHRcdGxldCBwYXJhbXNTdHJpbmcgPSBzdHIuc2xpY2UoMSk7XHJcblx0XHRcdGxldCBlbGVtZW50cyA9IHBhcmFtc1N0cmluZy5zcGxpdCgnJicpO1xyXG5cdFx0XHRpZiAoZWxlbWVudHMubGVuZ3RoKXtcclxuXHRcdFx0XHRlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG5cdFx0XHRcdFx0dmFyIGtleVZhbHVlID0gZWxlbWVudC5zcGxpdCgnPScpO1xyXG5cdFx0XHRcdFx0dGhpcy5wYXJhbXNba2V5VmFsdWVbMF1dID0ga2V5VmFsdWVbMV07XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fVxyXG5cdFx0XHQvL2NvbnNvbGUuZGlyKHRoaXMucGFyYW1zKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFzeW5jIG9ubG9hZFBhZ2UoKSB7XHJcblx0XHR0aGlzLnBhcnNlU2VhcmNoUGFyYW1zKCk7XHJcblx0XHRhd2FpdCB0aGlzLnJlbmRlckhlYWRlcigpO1xyXG5cdFx0Ly9yZW5kZXIgaXRlbSBieSBpZFxyXG5cdFx0aWYgKHRoaXMuY3VycmVudFBhdGhOYW1lLm1hdGNoKHRoaXMucmVnRXhwSWQpKXtcclxuXHRcdFx0dGhpcy5yZW5kZXJJdGVtUGFnZSh0aGlzLnN0b3JhZ2UuZ2V0SXRlbUJ5SWQodGhpcy5nZXRJdGVtSWRmcm9tUGF0aCgpKSk7XHJcblx0XHRcdHRoaXMuaXRlbSA9IG5ldyBJdGVtKHRoaXMuc3RvcmFnZS5nZXRJdGVtQnlJZCh0aGlzLmdldEl0ZW1JZGZyb21QYXRoKCkpKTtcclxuXHRcdFx0bmV3IEdhbGxlcnkoKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fSAvL3JlbmRlciBieSB1c2VyIGZpbHRlciBhbmQgcmVxdWVzdFxyXG5cdFx0aWYgKHRoaXMuY3VycmVudFBhdGhOYW1lLm1hdGNoKHRoaXMucmVnU2VhcmNoKSl7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdyZW5kZXIgYnkgcGFyYW1zJyk7XHJcblx0XHRcdGF3YWl0IHRoaXMucmVuZGVyTWFpblBhZ2UoKTtcclxuXHRcdFx0dGhpcy5yZW5kZXJSZXN1bHQodGhpcy5zdG9yYWdlLmdldEZpbHRlcmVkSXRlbXModGhpcy5wYXJhbXMpKTtcclxuXHRcdFx0dGhpcy5maWx0ZXIgPSBuZXcgRmlsdGVyKHtvcHRpb246ICdhbGwnLCBwYXJhbXM6IHRoaXMucGFyYW1zfSlcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHN3aXRjaCAodGhpcy5jdXJyZW50UGF0aE5hbWUpIHtcclxuXHRcdFx0XHRjYXNlICcvcmVnaXN0ZXInOlxyXG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5yZW5kZXJSZWdpc3RyYXRpb24oKTtcclxuXHRcdFx0XHRcdHRoaXMucmVnaXN0cmF0aW9uID0gbmV3IFJlZ2lzdHJhdGlvbih0aGlzLnN0b3JhZ2UuZ2V0VGVtcFN0b3JhZ2UoJ3VzZXJzJykpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJy9zaWduJzpcclxuXHRcdFx0XHRcdGF3YWl0IHRoaXMucmVuZGVyU2lnbmluKCk7XHJcblx0XHRcdFx0XHR0aGlzLnNpZ25pbiA9IG5ldyBTaWduaW4odGhpcy5zdG9yYWdlLmdldFRlbXBTdG9yYWdlKCd1c2VycycpKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICcvY29udGFjdHMnOlxyXG5cdFx0XHRcdHRoaXMucmVuZGVyQ29udGFjdHNQYWdlKCk7XHJcblx0XHRcdFx0dGhpcy5maWx0ZXIgPSBuZXcgRmlsdGVyKCk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnL2FkdmVydCc6XHJcblx0XHRcdFx0dGhpcy5yZW5kZXJBZHZlcnQoKTtcclxuXHRcdFx0XHR0aGlzLmZpbHRlciA9IG5ldyBGaWx0ZXIoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICcvbG9nb3V0JzpcclxuXHRcdFx0XHRcdHRoaXMuc3RvcmFnZS5yZW1vdmVMb2dpbmVkVXNlckZyb21Mb2NhbFN0b3JhZ2UoKTtcclxuXHRcdFx0XHRcdGxvY2F0aW9uLmFzc2lnbignLycpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJy9oaXN0b3J5JzpcclxuXHRcdFx0XHRcdGlmICh0aGlzLnN0b3JhZ2UuZ2V0TG9naW5lZFVzZXJGcm9tVGVtcFN0b3JhZ2UoKSl7XHJcblx0XHRcdFx0XHRcdHRoaXMucmVuZGVySGlzdG9yeSh0aGlzLnN0b3JhZ2UuZ2V0Qm91Z2h0SXRlbXNCeVVzZXIoKSk7XHJcblx0XHRcdFx0XHR9ZWxzZSB7XHJcblx0XHRcdFx0XHRcdGxvY2F0aW9uLmFzc2lnbignL3NpZ24nKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICcvc2VsbCc6XHJcblx0XHRcdFx0XHRpZiAodGhpcy5zdG9yYWdlLmdldExvZ2luZWRVc2VyRnJvbVRlbXBTdG9yYWdlKCkpe1xyXG5cdFx0XHRcdFx0XHRhd2FpdCB0aGlzLnJlbmRlclNlbGwoKTtcclxuXHRcdFx0XHRcdFx0dGhpcy5zZWxsID0gbmV3IFNlbGwodGhpcy5zdG9yYWdlLmdldExvZ2luZWRVc2VyRnJvbVRlbXBTdG9yYWdlKCkpO1xyXG5cdFx0XHRcdFx0fWVsc2Uge1xyXG5cdFx0XHRcdFx0XHRsb2NhdGlvbi5hc3NpZ24oJy9zaWduJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnLyc6XHJcblx0XHRcdFx0YXdhaXQgdGhpcy5yZW5kZXJNYWluUGFnZSgpO1xyXG5cdFx0XHRcdC8vIHRoaXMucmVuZGVyUmVzdWx0KHRoaXMuc3RvcmFnZS5nZXRUZW1wU3RvcmFnZSgnaXRlbXMnKSk7XHJcblx0XHRcdFx0dGhpcy5yZW5kZXJSZXN1bHQodGhpcy5zdG9yYWdlLmdldEl0ZW1zQnlBdmFpbGFibGUoKSlcclxuXHRcdFx0XHR0aGlzLmZpbHRlciA9IG5ldyBGaWx0ZXIoe29wdGlvbjogJ2FsbCd9KVxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGRlZmF1bHQ6IGNvbnNvbGUubG9nKCdwYWdlIG5vdCBmb3VuZCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCl7XHJcblx0Xy50ZW1wbGF0ZVNldHRpbmdzID0ge1xyXG5cdFx0ZXZhbHVhdGUgICAgOiAvXFx7XFx7KFtcXHNcXFNdKz8pXFx9XFx9L2csXHJcblx0XHRpbnRlcnBvbGF0ZSA6IC9cXHtcXHs9KFtcXHNcXFNdKz8pXFx9XFx9L2csXHJcblx0XHRlc2NhcGUgICAgICA6IC9cXHtcXHstKFtcXHNcXFNdKz8pXFx9XFx9L2dcclxuXHR9O1xyXG5cdGxldCBtYW5hZ2VyID0gbmV3IE1hbmFnZXIoKTtcclxufSk7XHJcbmNsYXNzIFNpZ25pbntcclxuXHRjb25zdHJ1Y3Rvcih1c2Vycyl7XHJcblx0XHR0aGlzLnN0b3JhZ2UgPSBuZXcgU3RvcmFnZSgpO1xyXG5cdFx0dGhpcy51c2VycyA9IHVzZXJzO1xyXG5cdFx0dGhpcy5lbWFpbFJlZ0V4cCA9IC9eKFthLXowLTlfLV0rXFwuKSpbYS16MC05Xy1dK0BbYS16MC05Xy1dKyhcXC5bYS16MC05Xy1dKykqXFwuW2Etel17Miw2fSQvaTtcclxuXHRcdHRoaXMucGFzc1JlZ0V4cCA9IC9eXFx3ezYsfSQvO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBpbml0KCl7XHJcblx0XHRhd2FpdCB0aGlzLnN0b3JhZ2UuaW5pdCgpO1xyXG5cdFx0dGhpcy5maW5kTm9kZXMoKTtcclxuXHRcdHRoaXMuYmluZEFsbCgpO1xyXG5cdFx0dGhpcy5hZGRFdmVudHMoKTtcclxuXHJcblx0fVxyXG5cclxuXHRmaW5kTm9kZXMoKXtcclxuXHRcdHRoaXMubm9kZXMgPSB7XHJcblx0XHRcdGZvcm06IGRvY3VtZW50LmZvcm1zLnNpZ25pbixcclxuXHRcdFx0ZW1haWw6IGRvY3VtZW50LmZvcm1zLnNpZ25pbi5lbGVtZW50cy5lbWFpbCxcclxuXHRcdFx0cGFzczogZG9jdW1lbnQuZm9ybXMuc2lnbmluLmVsZW1lbnRzLnBhc3MsXHJcblx0XHRcdHN1Ym1pdDogZG9jdW1lbnQuZm9ybXMuc2lnbmluLmVsZW1lbnRzLnN1Ym1pdCxcclxuXHRcdFx0d2FybmluZzogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2lnbmluX193YXJuaW5nJylbMF1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFkZEV2ZW50cygpIHtcclxuXHRcdHRoaXMubm9kZXMuc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zdWJtaXRGb3JtKVxyXG5cdH1cclxuXHJcblx0YmluZEFsbCgpIHtcclxuXHRcdHRoaXMuc3VibWl0Rm9ybSA9IHRoaXMuc3VibWl0Rm9ybS5iaW5kKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0c3VibWl0Rm9ybShlKXtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdGxldCBmbGFnID0gdHJ1ZTtcclxuXHRcdHRoaXMubm9kZXMud2FybmluZy5pbm5lckhUTUwgPSAnJztcclxuXHRcdC8vY2hlY2sgdmFsaWQgZW1haWxcclxuXHRcdGlmICghdGhpcy5lbWFpbFJlZ0V4cC50ZXN0KHRoaXMubm9kZXMuZW1haWwudmFsdWUpKSB7XHJcblx0XHRcdHRoaXMuY3JlYXRlV2FybmluZ01lc3NhZ2UoJ2VtYWlsJyk7XHJcblx0XHRcdGZsYWcgPSBmYWxzZTtcclxuXHRcdH0gLy9jaGVjayB2YWxpZCBwYXNzd2FyZFxyXG5cdFx0aWYgKCF0aGlzLnBhc3NSZWdFeHAudGVzdCh0aGlzLm5vZGVzLnBhc3MudmFsdWUpKSB7XHJcblx0XHRcdHRoaXMuY3JlYXRlV2FybmluZ01lc3NhZ2UoJ3Bhc3N3b3JkJyk7XHJcblx0XHRcdGZsYWcgPSBmYWxzZTtcclxuXHRcdH1cclxuXHRcdGlmIChmbGFnKXtcclxuXHRcdFx0dGhpcy5maW5kVXNlcih0aGlzLm5vZGVzLmVtYWlsLnZhbHVlLCB0aGlzLm5vZGVzLnBhc3MudmFsdWUpXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmaW5kVXNlcihsb2dpbiwgcGFzcyl7XHJcblx0XHRsZXQgdXNlciA9IHRoaXMudXNlcnMuZmluZCh1c2VyID0+IHVzZXIubG9naW4gPT09IGxvZ2luICYmIHVzZXIucGFzc3dvcmQgPT09IHBhc3MgKTtcclxuXHRcdGlmICghdXNlcikge1xyXG5cdFx0XHR0aGlzLmNyZWF0ZVdhcm5pbmdNZXNzYWdlKCd1bmtub3dudXNlcicpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5zdWNjZXNzTG9naW4odXNlcik7XHJcblx0XHRcdC8vY29uc29sZS5kaXIodGhpcy5zdG9yYWdlLmdldExvZ2luZWRVc2VyRnJvbUxvY2FsU3RvcmFnZSgpKTtcclxuXHRcdFx0bG9jYXRpb24uYXNzaWduKCcvJyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBhZGQgdXNlciBsb2dpbmVkIHVzZXIgdG8gTG9jYWxTdG9yYWdlXHJcblx0c3VjY2Vzc0xvZ2luKHVzZXIpIHtcclxuXHRcdHRoaXMuc3RvcmFnZS5hZGRMb2dpbmVkVXNlcnRvTG9jYWxTdG9yYWdlKHVzZXIpO1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlV2FybmluZ01lc3NhZ2UoZXJyb3JuYW1lKXtcclxuXHRcdGxldCBtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG5cdFx0c3dpdGNoIChlcnJvcm5hbWUpe1xyXG5cdFx0XHRjYXNlICdlbWFpbCc6XHJcblx0XHRcdFx0bWVzc2FnZS5hcHBlbmQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1lvdSBlbnRlcmVkIGluY29ycmVjdCBlbWFpbCcpKTtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3Bhc3N3b3JkJzpcclxuXHRcdFx0XHRtZXNzYWdlLmFwcGVuZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnWW91IGVudGVyZWQgaW5jb3JyZWN0IHBhc3M6IDYgbGV0dGVzIG9yIG51bWVycyBvciBfJykpO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAndW5rbm93bnVzZXInOlxyXG5cdFx0XHRcdG1lc3NhZ2UuYXBwZW5kKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdVbmtub3duIHVzZXInKSk7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OiBjb25zb2xlLmxvZygnaW5jb3JyZWN0IGVycm9yIG5hbWUnKTtcclxuXHRcdH1cclxuXHRcdHRoaXMubm9kZXMud2FybmluZy5hcHBlbmRDaGlsZChtZXNzYWdlKTtcclxuXHR9XHJcbiB9XHJcbmNsYXNzIFJlZ2lzdHJhdGlvbntcclxuXHRjb25zdHJ1Y3Rvcih1c2Vycyl7XHJcblx0XHR0aGlzLnN0b3JhZ2UgPSBuZXcgU3RvcmFnZSgpO1xyXG5cdFx0dGhpcy51c2VycyA9IHVzZXJzO1xyXG5cdFx0dGhpcy5lbWFpbFJlZ0V4cCA9IC9eKFthLXowLTlfLV0rXFwuKSpbYS16MC05Xy1dK0BbYS16MC05Xy1dKyhcXC5bYS16MC05Xy1dKykqXFwuW2Etel17Miw2fSQvaTtcclxuXHRcdHRoaXMucGFzc1JlZ0V4cCA9IC9eXFx3ezYsfSQvO1xyXG5cdFx0dGhpcy5uYW1lUmVnRXhwPSAvXlthLXrQsC3Rj9GRXXszLH0kL2k7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGluaXQoKXtcclxuXHRcdGF3YWl0IHRoaXMuc3RvcmFnZS5pbml0KCk7XHJcblx0XHR0aGlzLmZpbmROb2RlcygpO1xyXG5cdFx0dGhpcy5iaW5kQWxsKCk7XHJcblx0XHR0aGlzLmFkZEV2ZW50cygpO1xyXG5cclxuXHR9XHJcblxyXG5cdGZpbmROb2Rlcygpe1xyXG5cdFx0dGhpcy5ub2RlcyA9IHtcclxuXHRcdFx0Zm9ybTogZG9jdW1lbnQuZm9ybXMucmVnaXN0cmF0aW9uLFxyXG5cdFx0XHRlbWFpbDogZG9jdW1lbnQuZm9ybXMucmVnaXN0cmF0aW9uLmVsZW1lbnRzLmVtYWlsLFxyXG5cdFx0XHRuYW1lOiBkb2N1bWVudC5mb3Jtcy5yZWdpc3RyYXRpb24uZWxlbWVudHMubmFtZSxcclxuXHRcdFx0cGFzczA6IGRvY3VtZW50LmZvcm1zLnJlZ2lzdHJhdGlvbi5lbGVtZW50cy5wYXNzWzBdLFxyXG5cdFx0XHRwYXNzMTogZG9jdW1lbnQuZm9ybXMucmVnaXN0cmF0aW9uLmVsZW1lbnRzLnBhc3NbMV0sXHJcblx0XHRcdHN1Ym1pdDogZG9jdW1lbnQuZm9ybXMucmVnaXN0cmF0aW9uLmVsZW1lbnRzLnN1Ym1pdCxcclxuXHRcdFx0d2FybmluZzogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncmVnaXN0cmF0aW9uX193YXJuaW5nJylbMF1cclxuXHRcdH1cclxuXHRcdGNvbnNvbGUuZGlyKHRoaXMubm9kZXMpO1xyXG5cdH1cclxuXHJcblx0YWRkRXZlbnRzKCkge1xyXG5cdFx0dGhpcy5ub2Rlcy5zdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnN1Ym1pdEZvcm0pXHJcblx0fVxyXG5cclxuXHRiaW5kQWxsKCkge1xyXG5cdFx0dGhpcy5zdWJtaXRGb3JtID0gdGhpcy5zdWJtaXRGb3JtLmJpbmQodGhpcyk7XHJcblx0fVxyXG5cclxuXHRzdWJtaXRGb3JtKGUpe1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0bGV0IGZsYWcgPSB0cnVlO1xyXG5cdFx0dGhpcy5ub2Rlcy53YXJuaW5nLmlubmVySFRNTCA9ICcnO1xyXG5cdFx0Ly9jaGVjayB2YWxpZCBlbWFpbFxyXG5cdFx0aWYgKCF0aGlzLmVtYWlsUmVnRXhwLnRlc3QodGhpcy5ub2Rlcy5lbWFpbC52YWx1ZSkpIHtcclxuXHRcdFx0dGhpcy5jcmVhdGVXYXJuaW5nTWVzc2FnZSgnZW1haWwnKTtcclxuXHRcdFx0ZmxhZyA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0Ly9jaGVjayB2YWxpZCBwYXNzd2FyZFxyXG5cdFx0aWYgKCF0aGlzLnBhc3NSZWdFeHAudGVzdCh0aGlzLm5vZGVzLnBhc3MwLnZhbHVlKSB8fCAhdGhpcy5wYXNzUmVnRXhwLnRlc3QodGhpcy5ub2Rlcy5wYXNzMS52YWx1ZSkpIHtcclxuXHRcdFx0dGhpcy5jcmVhdGVXYXJuaW5nTWVzc2FnZSgncGFzc3dvcmQnKTtcclxuXHRcdFx0ZmxhZyA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0Ly9jaGVrIHZhbGlkIG5hbWVcclxuXHRcdGlmICghdGhpcy5uYW1lUmVnRXhwLnRlc3QodGhpcy5ub2Rlcy5uYW1lLnZhbHVlKSkge1xyXG5cdFx0XHR0aGlzLmNyZWF0ZVdhcm5pbmdNZXNzYWdlKCduYW1lJyk7XHJcblx0XHRcdGZsYWcgPSBmYWxzZTtcclxuXHRcdH1cclxuXHRcdGlmICghZmxhZyl7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH0gZWxzZSBpZiAodGhpcy5maW5kVXNlcih0aGlzLm5vZGVzLmVtYWlsLnZhbHVlKSkge1xyXG5cdFx0XHR0aGlzLmFkZE5ld1VzZXJUb0xvY2FsU3RvcmFnZSh0aGlzLmNyZWF0ZVVzZXIoKSk7XHJcblx0XHRcdHRoaXMuY3JlYXRlV2FybmluZ01lc3NhZ2UoJ29rJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmNyZWF0ZVdhcm5pbmdNZXNzYWdlKCdleGlzdCcpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlVXNlcigpe1xyXG5cdFx0bGV0XHRuZXdVc2VyID0ge1xyXG5cdFx0XHRsb2dpbjogdGhpcy5ub2Rlcy5lbWFpbC52YWx1ZSxcclxuXHRcdFx0bmFtZTogdGhpcy5ub2Rlcy5uYW1lLnZhbHVlLFxyXG5cdFx0XHRwYXNzd29yZDogdGhpcy5ub2Rlcy5wYXNzMC52YWx1ZSxcclxuXHRcdFx0YnV5aXRlbXM6IFtdLFxyXG5cdFx0XHRzZWxsaXRlbXM6IFtdXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gbmV3VXNlcjtcclxuXHR9XHJcblxyXG5cdGFkZE5ld1VzZXJUb0xvY2FsU3RvcmFnZSh1c2VyKXtcclxuXHRcdHRoaXMuc3RvcmFnZS5hZGROZXdVc2VydG9UZW1wU3RvcmFnZSh1c2VyKVxyXG5cdH1cclxuXHJcblx0ZmluZFVzZXIobG9naW4pe1xyXG5cdFx0bGV0IHVzZXIgPSB0aGlzLnVzZXJzLmZpbmQodXNlciA9PiB1c2VyLmxvZ2luID09PSBsb2dpbik7XHJcblx0XHRpZiAodXNlcikge1xyXG5cdFx0XHQvL3RoaXMgdXNlciBpcyBleGlzdFxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvLyB0aGlzIHVzZXIgZG9lc24ndCBleGlzdCAtIGdvIG9uIHJlZ2lzdHJhdGlvblxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNyZWF0ZVdhcm5pbmdNZXNzYWdlKGVycm9ybmFtZSl7XHJcblx0XHRsZXQgbWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuXHRcdHN3aXRjaCAoZXJyb3JuYW1lKXtcclxuXHRcdFx0Y2FzZSAnZW1haWwnOlxyXG5cdFx0XHRcdG1lc3NhZ2UuYXBwZW5kKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdZb3UgZW50ZXJlZCBpbmNvcnJlY3QgZW1haWwnKSk7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdwYXNzd29yZCc6XHJcblx0XHRcdFx0bWVzc2FnZS5hcHBlbmQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1lvdSBlbnRlcmVkIGluY29ycmVjdCBwYXNzOiA2IGxldHRlcyBvciBudW1lcnMgb3IgXyBvciB0aGV5IGFyZSBub3QgZXF1YWwgZWFjaCBvdGhlcicpKTtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ25hbWUnOlxyXG5cdFx0XHRcdG1lc3NhZ2UuYXBwZW5kKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdZb3UgZW50ZXJkIGluY29ycmVjdCBuYW1lOiBvbmx5IGxldHRlcnMgYW5kIG1pbiBzaXplPTMnKSk7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdleGlzdCc6XHJcblx0XHRcdFx0bWVzc2FnZS5hcHBlbmQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1RoaXMgdXNlciBoYXZlIGJlZW4gZXhpc3RlZCcpKTtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ29rJzpcclxuXHRcdFx0XHRtZXNzYWdlLmFwcGVuZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShgWW91J3ZlIGJlZW4ganVzdCByZWdpc3RlcmVkLiBTaWduIGluIWApKTtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQ6IGNvbnNvbGUubG9nKCdpbmNvcnJlY3QgZXJyb3IgbmFtZScpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5ub2Rlcy53YXJuaW5nLmFwcGVuZENoaWxkKG1lc3NhZ2UpO1xyXG5cdH1cclxuIH1cclxuY2xhc3MgSXRlbSB7XHJcblx0Y29uc3RydWN0b3IoaXRlbSkge1xyXG5cdFx0dGhpcy5zdG9yYWdlID0gbmV3IFN0b3JhZ2UoKTtcclxuXHRcdHRoaXMubm9kZXMgPSB7fTtcclxuXHRcdHRoaXMuYmlkUmVnRXhwID0gL1xcZCsvaTtcclxuXHRcdHRoaXMuaXRlbSA9IGl0ZW07XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGluaXQoKXtcclxuXHRcdGF3YWl0IHRoaXMuc3RvcmFnZS5pbml0KCk7XHJcblx0XHR0aGlzLmdldFR5cGVJdGVtKCk7XHJcblx0XHR0aGlzLmZpbmROb2RlcygpO1xyXG5cdFx0dGhpcy5iaW5kQWxsKCk7XHJcblx0XHR0aGlzLmFkZEV2ZW50cygpO1xyXG5cdFx0dGhpcy5jaGVja1Jlc2VydmVkKClcclxuXHR9XHJcblxyXG5cdGZpbmROb2RlcygpIHtcclxuXHRcdGlmICh0aGlzLnR5cGUgPT0gJ2F1Y3Rpb24nKXtcclxuXHRcdFx0dGhpcy5ub2RlcyA9IHtcclxuXHRcdFx0XHRiaWQ6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2l0ZW0tcGFnZV9fc3RhcnQtYmlkLWlucHV0JylbMF0sXHJcblx0XHRcdFx0YmlkczogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaXRlbS1wYWdlX2JpZHMtdmFsdWUnKVswXSxcclxuXHRcdFx0XHRwcmljZTogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaXRlbS1wYWdlX19zdGFydC1iaWQtcHJpY2UnKVswXSxcclxuXHRcdFx0XHRidXlCdG46IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2l0ZW0tcGFnZV9fYnRuLWJpZCcpWzBdLFxyXG5cdFx0XHRcdHN0YXJ0YmlkOiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpdGVtLXBhZ2VfX3N0YXJ0LWJpZC1wcmljZScpWzBdLFxyXG5cclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5ub2RlcyA9IHtcclxuXHRcdFx0XHRidXlCdG46IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2l0ZW0tcGFnZS1idXknKVswXVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRiaW5kQWxsKCl7XHJcblx0XHR0aGlzLmhhbmRsZXIgPSB0aGlzLmhhbmRsZXIuYmluZCh0aGlzKTtcclxuXHR9XHJcblxyXG5cdGFkZEV2ZW50cygpIHtcclxuXHRcdHRoaXMubm9kZXMuYnV5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVyKTtcclxuXHR9XHJcblxyXG5cdGdldFR5cGVJdGVtKCl7XHJcblx0XHRpZiAodGhpcy5pdGVtLmF1Y3Rpb24pe1xyXG5cdFx0XHR0aGlzLnR5cGUgPSAnYXVjdGlvbic7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnR5cGUgPSAnYnV5aXRub3cnO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0aGFuZGxlcihlKXtcclxuXHRsZXQgdXNlciAgPSB0aGlzLnN0b3JhZ2UuZ2V0TG9naW5lZFVzZXJGcm9tVGVtcFN0b3JhZ2UoKTtcclxuXHRcdGlmKHVzZXIpe1xyXG5cdFx0XHRpZiAodGhpcy50eXBlID09ICdidXlpdG5vdycpe1xyXG5cdFx0XHRcdC8vc2F2ZSBpZCBvZiBpdGVtIHRvIHVzZXJcclxuXHRcdFx0XHRmb3IgKGxldCBpID0wOyBpIDwgdGhpcy5zdG9yYWdlLnRlbXBVc2Vycy5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5zdG9yYWdlLnRlbXBVc2Vyc1tpXS5sb2dpbiA9PSB1c2VyLmxvZ2luKXtcclxuXHRcdFx0XHRcdFx0dGhpcy5zdG9yYWdlLnRlbXBVc2Vyc1tpXS5idXlpdGVtcy5wdXNoKHtcIml0ZW1cIjogdGhpcy5pdGVtLmlkX2l0ZW19KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gcmVzZXJ2ZSBpdGVtXHJcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnN0b3JhZ2UudGVtcEl0ZW1zLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0XHRcdGlmICh0aGlzLnN0b3JhZ2UudGVtcEl0ZW1zW2ldLmlkX2l0ZW0gPT0gdGhpcy5pdGVtLmlkX2l0ZW0pe1xyXG5cdFx0XHRcdFx0XHR0aGlzLnN0b3JhZ2UudGVtcEl0ZW1zW2ldLnJlc2VydmVkID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5zdG9yYWdlLnVwZGF0ZUFsbExvY2FsU3RvcmFnZSgpO1xyXG5cdFx0XHRcdGxvY2F0aW9uLmFzc2lnbihgL2l0ZW0ke3RoaXMuaXRlbS5pZF9pdGVtfWApO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGlmICggdGhpcy5jaGVja0JpZCgpKSB7XHJcblx0XHRcdFx0XHRmb3IgKGxldCBpID0wOyBpIDwgdGhpcy5zdG9yYWdlLnRlbXBVc2Vycy5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdFx0XHRcdGlmICh0aGlzLnN0b3JhZ2UudGVtcFVzZXJzW2ldLmxvZ2luID09IHVzZXIubG9naW4pe1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuc3RvcmFnZS50ZW1wVXNlcnNbaV0uYnV5aXRlbXMucHVzaCh7XHJcblx0XHRcdFx0XHRcdFx0XHRcIml0ZW1cIjogdGhpcy5pdGVtLmlkX2l0ZW0sXHJcblx0XHRcdFx0XHRcdFx0XHRcIm15YmlkXCI6IHBhcnNlSW50KHRoaXMubm9kZXMuYmlkLnZhbHVlKSArICcuMDAnXHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdG9yYWdlLnRlbXBJdGVtcy5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdFx0XHRcdGlmICh0aGlzLnN0b3JhZ2UudGVtcEl0ZW1zW2ldLmlkX2l0ZW0gPT0gdGhpcy5pdGVtLmlkX2l0ZW0pe1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuc3RvcmFnZS50ZW1wSXRlbXNbaV0ucHJpY2UgPSBwYXJzZUludCh0aGlzLm5vZGVzLmJpZC52YWx1ZSkgKyAnLjAwJztcclxuXHRcdFx0XHRcdFx0XHR0aGlzLnN0b3JhZ2UudGVtcEl0ZW1zW2ldLmJpZHMgPSArdGhpcy5zdG9yYWdlLnRlbXBJdGVtc1tpXS5iaWRzICsgMTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Y29uc29sZS5kaXIoXHR0aGlzLnN0b3JhZ2UudGVtcFVzZXJzKTtcclxuXHRcdFx0XHRcdGNvbnNvbGUuZGlyKFx0dGhpcy5zdG9yYWdlLnRlbXBJdGVtcyk7XHJcblx0XHRcdFx0XHR0aGlzLnN0b3JhZ2UudXBkYXRlQWxsTG9jYWxTdG9yYWdlKCk7XHJcblx0XHRcdFx0XHR0aGlzLmNoYW5nZVRleHRCdG4oKTtcclxuXHRcdFx0XHRcdHRoaXMuY2hhbmdlSW5mb0Fib3V0SXRlbSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bG9jYXRpb24uYXNzaWduKCcvc2lnbicpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y2hlY2tCaWQoKXtcclxuXHRcdGlmICh0aGlzLmJpZFJlZ0V4cC50ZXN0KHRoaXMubm9kZXMuYmlkLnZhbHVlKSAmJiB0aGlzLm5vZGVzLmJpZC52YWx1ZSA+IHRoaXMuaXRlbS5wcmljZSkge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGFsZXJ0KCdZb3UgZW50ZXJlZCBpbmNvcnJlY3QgYmlkJyk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cdGNoYW5nZVRleHRCdG4oKXtcclxuXHRcdHRoaXMubm9kZXMuYnV5QnRuLnZhbHVlID0gXCJCb3VnaHQhXCI7XHJcblx0XHR0aGlzLm5vZGVzLmJ1eUJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcblx0fVxyXG5cclxuXHRjaGFuZ2VJbmZvQWJvdXRJdGVtKCkge1xyXG5cdFx0dGhpcy5ub2Rlcy5wcmljZS5pbm5lckhUTUwgPSB0aGlzLm5vZGVzLmJpZC52YWx1ZSArICcuMDAnIDtcclxuXHRcdHRoaXMubm9kZXMuYmlkcy5pbm5lckhUTUwgPSArdGhpcy5pdGVtLmJpZHMgKyAxO1xyXG5cdH1cclxuXHJcblx0Y2hlY2tSZXNlcnZlZCgpIHtcclxuXHRcdGlmICh0aGlzLml0ZW0ucmVzZXJ2ZWQgPT0gdHJ1ZSkge1xyXG5cdFx0XHR0aGlzLmNoYW5nZVRleHRCdG4oKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG59XHJcbmNsYXNzIFNlbGx7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHRoaXMudGV4dFJlZ0V4cCA9IC9eXFx3ezMsfSQvaTtcclxuXHRcdHRoaXMucHJpY2VSZWdFeHAgPSAvXlsxLTldWzAtOV0qJC9pO1xyXG5cdFx0dGhpcy5zdG9yYWdlID0gbmV3IFN0b3JhZ2UoKTtcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgaW5pdCgpe1xyXG5cdFx0YXdhaXQgdGhpcy5zdG9yYWdlLmluaXQoKTtcclxuXHRcdHRoaXMuZmluZE5vZGVzKCk7XHJcblx0XHR0aGlzLmJpbmRBbGwoKTtcclxuXHRcdHRoaXMuYWRkRXZlbnRzKCk7XHJcblx0fVxyXG5cclxuXHRmaW5kTm9kZXMoKXtcclxuXHRcdHRoaXMubm9kZXMgPSB7XHJcblx0XHRcdGZvcm06IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKCdzZWxsJylbMF0sXHJcblx0XHRcdHRpdGxlOiBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSgndGl0bGUnKVswXSxcclxuXHRcdFx0c3VidGl0bGU6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKCdzdWJ0aXRsZScpWzBdLFxyXG5cdFx0XHRjb25kaXRpb246IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKCdjb25kaXRpb24nKVswXSxcclxuXHRcdFx0cHJldmltZzogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoJ3ByZXZpbWcnKVswXSxcclxuXHRcdFx0cHJpY2U6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKCdwcmljZScpWzBdLFxyXG5cdFx0XHRmb3JtYXQ6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKCdmb3JtYXQnKVswXSxcclxuXHRcdFx0ZGF0ZUV4cDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoJ2RhdGVFeHAnKVswXSxcclxuXHRcdFx0Y291bnRyeTogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoJ2NvdW50cnknKVswXSxcclxuXHRcdFx0c2hpcHBpbmc6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKCdzaGlwcGluZycpWzBdLFxyXG5cdFx0XHRwaWN0dXJlczogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoJ3BpY3R1cmVzJylbMF0sXHJcblx0XHRcdHN1Ym1pdDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoJ3N1Ym1pdCcpWzBdLFxyXG5cdFx0XHR3YXJuaW5nOiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzZWxsX193YXJuaW5nJylbMF1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGJpbmRBbGwoKXtcclxuXHRcdHRoaXMuaGFuZGxlciA9IHRoaXMuaGFuZGxlci5iaW5kKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0YWRkRXZlbnRzKCl7XHJcblx0XHR0aGlzLm5vZGVzLnN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlcik7XHJcblx0fVxyXG5cclxuXHRoYW5kbGVyKGUpe1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0dGhpcy5jbGVhcldhcm5pbmcoKTtcclxuXHRcdGlmKHRoaXMuY2hlY2tGb3JtKCkpe1xyXG5cdFx0XHR0aGlzLmNyZWF0ZU5ld0l0ZW0oKTtcclxuXHRcdFx0dGhpcy5hZGROZXdJdGVtVG9TZWxsTGlzdCgpXHJcblx0XHRcdHRoaXMuY2hhbmdlVGV4dEJ0bigpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y2xlYXJXYXJuaW5nKCl7XHJcblx0XHR0aGlzLm5vZGVzLndhcm5pbmcuaW5uZXJIVE1MID0gJyc7XHJcblx0fVxyXG5cclxuXHRhZGROZXdJdGVtVG9TZWxsTGlzdCgpe1xyXG5cdFx0bGV0IHVzZXIgID0gdGhpcy5zdG9yYWdlLmdldExvZ2luZWRVc2VyRnJvbVRlbXBTdG9yYWdlKCk7XHJcblx0XHRpZih1c2VyKXtcclxuXHRcdFx0Ly9zYXZlIGlkIG9mIGl0ZW0gdG8gdXNlclxyXG5cdFx0XHRmb3IgKGxldCBpID0wOyBpIDwgdGhpcy5zdG9yYWdlLnRlbXBVc2Vycy5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdFx0aWYgKHRoaXMuc3RvcmFnZS50ZW1wVXNlcnNbaV0ubG9naW4gPT0gdXNlci5sb2dpbil7XHJcblx0XHRcdFx0XHR0aGlzLnN0b3JhZ2UudGVtcFVzZXJzW2ldLnNlbGxpdGVtcy5wdXNoKHtcIml0ZW1cIjogdGhpcy5uZXdJdGVtLmlkX2l0ZW19KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gcmVzZXJ2ZSBpdGVtXHJcblx0XHRcdHRoaXMuc3RvcmFnZS51cGRhdGVBbGxMb2NhbFN0b3JhZ2UoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNyZWF0ZU5ld0l0ZW0oKXtcclxuXHRcdHRoaXMubmV3SXRlbSA9IHtcclxuXHRcdFx0aWRfaXRlbTogdGhpcy5zdG9yYWdlLmdlbmVyYXRlTmV3SWQoKSxcclxuXHRcdFx0dGl0bGU6IHRoaXMubm9kZXMudGl0bGUudmFsdWUsXHJcblx0XHRcdHN1YnRpdGxlOiB0aGlzLm5vZGVzLnN1YnRpdGxlLnZhbHVlLFxyXG5cdFx0XHRjb25kaXRpb246IHRoaXMuZ2V0Q29uZGl0aW9uKCksXHJcblx0XHRcdHByZXZpbWdfcGF0aDogJ2ltZy8nICsgdGhpcy5ub2Rlcy5wcmV2aW1nLmZpbGVzWzBdLm5hbWUsXHJcblx0XHRcdHByaWNlOiB0aGlzLm5vZGVzLnByaWNlLnZhbHVlLFxyXG5cdFx0XHRiaWRzOiBcIjBcIixcclxuXHRcdFx0YXVjdGlvbjogdGhpcy5pc0F1Y3Rpb24oKSxcclxuXHRcdFx0YnV5OiB0aGlzLmlzQnV5KCksXHJcblx0XHRcdHJlc2VydmVkOiBmYWxzZSxcclxuXHRcdFx0Y291bnRyeTogdGhpcy5ub2Rlcy5jb3VudHJ5LnZhbHVlLFxyXG5cdFx0XHRkYXRlX2V4cDogdGhpcy5ub2Rlcy5kYXRlRXhwLnZhbHVlLFxyXG5cdFx0XHRzaGlwcGluZzogdGhpcy5nZXRTaGlwcGluZygpLFxyXG5cdFx0XHRwaWN0dXJlczogW1xyXG5cdFx0XHRcdHtsaW5rOiAnaW1nLycgKyB0aGlzLm5vZGVzLnBpY3R1cmVzLmZpbGVzWzBdLm5hbWV9LHtsaW5rOiAnaW1nLycgKyB0aGlzLm5vZGVzLnBpY3R1cmVzLmZpbGVzWzFdLm5hbWV9LHtsaW5rOiAnaW1nLycgKyB0aGlzLm5vZGVzLnBpY3R1cmVzLmZpbGVzWzJdLm5hbWV9XHJcblx0XHRcdF1cclxuXHRcdH1cclxuXHRcdGNvbnNvbGUuZGlyKHRoaXMubmV3SXRlbSApO1xyXG5cdFx0dGhpcy5zdG9yYWdlLmFkZE5ld0l0ZW1Ub1RlbXBTdG9yYWdlKHRoaXMubmV3SXRlbSk7XHJcblx0fVxyXG5cclxuXHRnZXRTaGlwcGluZygpe1xyXG5cdFx0bGV0IGluZGV4U2VsZWN0ZWQgPSB0aGlzLm5vZGVzLnNoaXBwaW5nLnNlbGVjdGVkSW5kZXg7XHJcblx0XHRyZXR1cm4gdGhpcy5ub2Rlcy5zaGlwcGluZy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnb3B0aW9uJylbaW5kZXhTZWxlY3RlZF0udmFsdWU7XHJcblx0fVxyXG5cclxuXHRnZXRDb25kaXRpb24oKSB7XHJcblx0XHRsZXQgaW5kZXhTZWxlY3RlZCA9IHRoaXMubm9kZXMuY29uZGl0aW9uLnNlbGVjdGVkSW5kZXg7XHJcblx0XHRyZXR1cm4gdGhpcy5ub2Rlcy5jb25kaXRpb24uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ29wdGlvbicpW2luZGV4U2VsZWN0ZWRdLnZhbHVlO1xyXG5cdH1cclxuXHJcblx0aXNCdXkoKSB7XHJcblx0XHRsZXQgaW5kZXhTZWxlY3RlZCA9IHRoaXMubm9kZXMuZm9ybWF0LnNlbGVjdGVkSW5kZXg7XHJcblx0XHRpZiAoaW5kZXhTZWxlY3RlZCA9PSAwKSB7IHJldHVybiB0cnVlO31cclxuXHRcdGlmIChpbmRleFNlbGVjdGVkID09IDEpIHsgcmV0dXJuIGZhbHNlO31cclxuXHR9XHJcblxyXG5cdGlzQXVjdGlvbigpe1xyXG5cdFx0bGV0IGluZGV4U2VsZWN0ZWQgPSB0aGlzLm5vZGVzLmZvcm1hdC5zZWxlY3RlZEluZGV4O1xyXG5cdFx0aWYgKGluZGV4U2VsZWN0ZWQgPT0gMCkgeyByZXR1cm4gZmFsc2U7fVxyXG5cdFx0aWYgKGluZGV4U2VsZWN0ZWQgPT0gMSkgeyByZXR1cm4gdHJ1ZTt9XHJcblx0fVxyXG5cclxuXHRjaGVja0Zvcm0oKXtcclxuXHRcdGxldCBmbGFnID0gdHJ1ZTtcclxuXHRcdGlmICghdGhpcy50ZXh0UmVnRXhwLnRlc3QodGhpcy5ub2Rlcy50aXRsZS52YWx1ZSkpe1xyXG5cdFx0XHR0aGlzLmNyZWF0ZVdhcm5pbmdNZXNzYWdlKCd0aXRsZScpO1xyXG5cdFx0XHRmbGFnID0gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRpZiAoIXRoaXMudGV4dFJlZ0V4cC50ZXN0KHRoaXMubm9kZXMuc3VidGl0bGUudmFsdWUpKXtcclxuXHRcdFx0dGhpcy5jcmVhdGVXYXJuaW5nTWVzc2FnZSgnc3VidGl0bGUnKTtcclxuXHRcdFx0ZmxhZyA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMubm9kZXMucHJldmltZy5maWxlcy5sZW5ndGggPT0gMCl7XHJcblx0XHRcdHRoaXMuY3JlYXRlV2FybmluZ01lc3NhZ2UoJ3ByZXZpbWcnKTtcclxuXHRcdFx0ZmxhZyA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCF0aGlzLnByaWNlUmVnRXhwLnRlc3QodGhpcy5ub2Rlcy5wcmljZS52YWx1ZSkpe1xyXG5cdFx0XHR0aGlzLmNyZWF0ZVdhcm5pbmdNZXNzYWdlKCdwcmljZScpO1xyXG5cdFx0XHRmbGFnID0gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRpZihuZXcgRGF0ZSh0aGlzLm5vZGVzLmRhdGVFeHAudmFsdWUpIDw9IERhdGUubm93KCkpe1xyXG5cdFx0XHR0aGlzLmNyZWF0ZVdhcm5pbmdNZXNzYWdlKCdkYXRlRXhwJyk7XHJcblx0XHRcdGZsYWcgPSBmYWxzZTtcclxuXHRcdH1cclxuXHRcdGlmKCF0aGlzLnRleHRSZWdFeHAudGVzdCh0aGlzLm5vZGVzLmNvdW50cnkudmFsdWUpKXtcclxuXHRcdFx0dGhpcy5jcmVhdGVXYXJuaW5nTWVzc2FnZSgnY291bnRyeScpO1xyXG5cdFx0XHRmbGFnID0gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRpZih0aGlzLm5vZGVzLnBpY3R1cmVzLmZpbGVzLmxlbmd0aCAhPTMpe1xyXG5cdFx0XHR0aGlzLmNyZWF0ZVdhcm5pbmdNZXNzYWdlKCdwaWN0dXJlcycpO1xyXG5cdFx0XHRmbGFnID0gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmxhZztcclxuXHR9XHJcblxyXG5cdGNyZWF0ZVdhcm5pbmdNZXNzYWdlKGVycm9ybmFtZSl7XHJcblx0XHRsZXQgbWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuXHRcdHN3aXRjaCAoZXJyb3JuYW1lKXtcclxuXHRcdFx0Y2FzZSAndGl0bGUnOlxyXG5cdFx0XHRtZXNzYWdlLmFwcGVuZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgneW91IGVudGVyZCBpbnZhbGlkIHRpdGxlIG9yIHNraXAnKSk7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdzdWJ0aXRsZSc6XHJcblx0XHRcdG1lc3NhZ2UuYXBwZW5kKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCd5b3UgZW50ZXJkIGludmFsaWQgc3VidGl0bGUgb3Igc2tpcCcpKTtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3ByZXZpbWcnOlxyXG5cdFx0XHRtZXNzYWdlLmFwcGVuZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgneW91IHNraXAgZG93bmxvYWRpbmcgbWFpbiBpbWcnKSk7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdwcmljZSc6XHJcblx0XHRcdG1lc3NhZ2UuYXBwZW5kKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdZb3UgZW50ZXJlZCBpbnZhbGlkIHByaWNlIG9yIHNraXAnKSk7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdkYXRlRXhwJzpcclxuXHRcdFx0bWVzc2FnZS5hcHBlbmQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1lvdSBlbnRlcmVkIGludmFsaWQgZGF0ZSBvciBza2lwJykpO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnY291bnRyeSc6XHJcblx0XHRcdG1lc3NhZ2UuYXBwZW5kKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdZb3Ugc2tpcCBjb3VudHJ5JykpO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAncGljdHVyZXMnOlxyXG5cdFx0XHRtZXNzYWdlLmFwcGVuZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnWW91IHNraXAgZG93bmxvZGluZyBvZiAzIHBpY3R1cmVzJykpO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdFx0ZGVmYXVsdDogY29uc29sZS5sb2coJ2luY29ycmVjdCBlcnJvciBuYW1lJyk7XHJcblx0XHR9XHJcblx0XHR0aGlzLm5vZGVzLndhcm5pbmcuYXBwZW5kQ2hpbGQobWVzc2FnZSk7XHJcblx0fVxyXG5cdGNoYW5nZVRleHRCdG4oKXtcclxuXHRcdHRoaXMubm9kZXMuc3VibWl0LnZhbHVlID0gXCJvayFcIjtcclxuXHRcdHRoaXMubm9kZXMuc3VibWl0LmRpc2FibGVkID0gdHJ1ZTtcclxuXHR9XHJcbn1cclxuLy8gQ29uc3RydWN0b3JcclxuZnVuY3Rpb24gU2xpZGVyIChlbGVtLCBjb25maWcpIHtcclxuXHR0aGlzLmVsZW0gPSBlbGVtO1xyXG5cclxuXHQvL1JlYWQgY29uZmlndXJhdGlvblxyXG5cdHRoaXMuZGlyZWN0aW9uID0gY29uZmlnLmRpcmVjdGlvbiB8fCAnZm9yd2FyZCc7IC8vINC70LXQstC+IC0g0L3QsNC30LDQtCwg0LLQv9GA0LDQstCw0L4gLSDQstC/0LXRgNC10LRcclxuXHR0aGlzLmF1dG9EdXJhdGlvbiA9IGNvbmZpZy5hdXRvRHVyYXRpb24gfHwgMzAwMDtcclxuXHR0aGlzLmluaXQoKTtcclxufVxyXG5cclxuU2xpZGVyLnByb3RvdHlwZSA9IHtcclxuY29uc3RydWN0b3I6IFNsaWRlciwgLyrQodC+0YXRgNCw0L3QuNC8INC60L7QvdGB0YLRgNGD0LrRgtC+0YAgINGH0YLQvtCx0YsgU2xpZGVyMiDQvNC+0LbQvdC+INCx0YvQu9C+INGB0LTQtdC70LDRgtGMINGH0LXRgNC10LcgU2xpZGVyMTpcclxudmFyIFNsaWRlcjIgPSBuZXcgU2xpZGVyMS5Db25zdHJ1Y3Rvcihkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzbGlkZXInKVsxXSwgY29uZmlnKSovXHJcblxyXG5cdGluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLnNjcmVlbiA9IHRoaXMuZWxlbS5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyX19zY3JlZW4nKTtcclxuXHRcdFx0dGhpcy5sZW5zID0gdGhpcy5lbGVtLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXJfX2xlbnMnKTtcclxuXHRcdFx0dGhpcy5zbGlkZXMgPSB0aGlzLmVsZW0ucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlcl9faXRlbScpO1xyXG5cclxuXHRcdFx0dGhpcy5hZGRDbG9uZVNsaWRlcygpO1xyXG5cdFx0XHR0aGlzLnByZXBhcmVEb21TbGlkZXIoKTtcclxuXHRcdFx0dGhpcy5iaW5kQWxsKCk7XHJcblx0XHRcdHRoaXMuYWRkRXZlbnRzKCk7XHJcblx0fSxcclxuXHJcblx0YWRkQ2xvbmVTbGlkZXM6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgZmlyc3RTbGlkZUNsb25lID0gdGhpcy5zbGlkZXNbMF0uY2xvbmVOb2RlKHRydWUpO1xyXG5cdFx0XHR2YXIgbGFzdFNsaWRlQ2xvbmUgPSB0aGlzLnNsaWRlc1t0aGlzLnNsaWRlcy5sZW5ndGggLSAxXS5jbG9uZU5vZGUodHJ1ZSk7XHJcblx0XHRcdHRoaXMubGVucy5hcHBlbmRDaGlsZChmaXJzdFNsaWRlQ2xvbmUpO1xyXG5cdFx0XHR0aGlzLmxlbnMuaW5zZXJ0QmVmb3JlKGxhc3RTbGlkZUNsb25lLCB0aGlzLnNsaWRlc1swXSk7XHJcblxyXG5cdH0sXHJcblxyXG5cdHByZXBhcmVEb21TbGlkZXI6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLl9zbGlkZVdpZHRoID0gdGhpcy5zbGlkZXNbMF0ub2Zmc2V0V2lkdGg7XHJcblx0XHRcdHRoaXMuX2xlbnNXaWR0aCA9ICh0aGlzLnNsaWRlcy5sZW5ndGggKyAyKSp0aGlzLnNsaWRlc1swXS5vZmZzZXRXaWR0aCArIFwicHhcIjtcclxuXHRcdFx0dGhpcy5sZW5zLnN0eWxlLndpZHRoID0gdGhpcy5fbGVuc1dpZHRoO1xyXG5cclxuXHRcdFx0dGhpcy5fbGVuc01hcmdpbkxlZnQgPSAtMSp0aGlzLnNsaWRlc1swXS5vZmZzZXRXaWR0aCArIFwicHhcIjtcclxuXHRcdFx0dGhpcy5sZW5zLnN0eWxlLm1hcmdpbkxlZnQgPSB0aGlzLl9sZW5zTWFyZ2luTGVmdDtcclxuXHJcblx0XHRcdHRoaXMuX2N1cnJlbnRMZW5zTWFyZ2luTGVmdCA9IHRoaXMuX2xlbnNNYXJnaW5MZWZ0O1xyXG5cclxuXHRcdFx0dGhpcy5zdGFydENhcm91c2VsKCk7XHJcblxyXG5cdH0sXHJcblxyXG5cdGJpbmRBbGw6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLm1vdXNlbW92ZUhhbmRsZXIgPSB0aGlzLm1vdXNlbW92ZUhhbmRsZXIuYmluZCh0aGlzKTtcclxuXHRcdFx0dGhpcy5tb3VzZXVwSGFuZGxlciA9IHRoaXMubW91c2V1cEhhbmRsZXIuYmluZCh0aGlzKTtcclxuXHRcdFx0dGhpcy5tb3VzZWxlYXZlSGFuZGxlciA9IHRoaXMubW91c2VsZWF2ZUhhbmRsZXIuYmluZCh0aGlzKTtcclxuXHJcblx0fSxcclxuXHJcblxyXG5cdHN0YXJ0Q2Fyb3VzZWw6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLmxlbnMuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19sZW5zX3RyYW5zaXRpb24nKTtcclxuXHRcdFx0dGhpcy50aW1lckF1dG9TdGFydCA9IHNldEludGVydmFsKHRoaXMubW92ZUNhcm91c2VsLmJpbmQodGhpcyksIHRoaXMuYXV0b0R1cmF0aW9uLCBudWxsLCB0aGlzLmRpcmVjdGlvbik7XHJcblx0fSxcclxuXHJcblxyXG5cclxuXHRtb3ZlQ2Fyb3VzZWw6IGZ1bmN0aW9uKGV2ZW50LCB0eXBlTW92ZSkge1xyXG5cdFx0XHR2YXIgZGlyZWN0aW9uO1xyXG5cdFx0XHRzd2l0Y2ggKHR5cGVNb3ZlKSB7XHJcblx0XHRcdFx0XHRjYXNlICdmb3J3YXJkJzpcclxuXHRcdFx0XHRcdFx0XHR0aGlzLl9jdXJyZW50TGVuc01hcmdpbkxlZnQgPSBwYXJzZUludCh0aGlzLl9sZW5zTWFyZ2luTGVmdCkgLSB0aGlzLl9zbGlkZVdpZHRoICArIFwicHhcIjtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRcdGNhc2UgJ2JhY2t3YXJkJzpcclxuXHRcdFx0XHRcdFx0XHR0aGlzLl9jdXJyZW50TGVuc01hcmdpbkxlZnQgPSBwYXJzZUludCh0aGlzLl9sZW5zTWFyZ2luTGVmdCkgKyB0aGlzLl9zbGlkZVdpZHRoICsgXCJweFwiO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdFx0Y2FzZSAndXNlcm1vdmUnOlxyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ1VTRVJNT1ZFJyk7XHJcblx0XHRcdFx0XHRcdFx0ZGlyZWN0aW9uID0gZXZlbnQuY2xpZW50WCAtIHRoaXMuX3N0YXJ0RHJhZ1g7XHJcblx0XHRcdFx0XHRcdFx0aWYgKGRpcmVjdGlvbiA+IDApIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5fY3VycmVudExlbnNNYXJnaW5MZWZ0ID0gcGFyc2VJbnQodGhpcy5fbGVuc01hcmdpbkxlZnQpICsgdGhpcy5fc2xpZGVXaWR0aCArIFwicHhcIjtcclxuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGRpcmVjdGlvbiA8IDApIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5fY3VycmVudExlbnNNYXJnaW5MZWZ0ID0gcGFyc2VJbnQodGhpcy5fbGVuc01hcmdpbkxlZnQpIC0gdGhpcy5fc2xpZGVXaWR0aCArIFwicHhcIjtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMubGVucy5zdHlsZS5tYXJnaW5MZWZ0ID0gdGhpcy5fY3VycmVudExlbnNNYXJnaW5MZWZ0O1xyXG5cdFx0XHR0aGlzLl9sZW5zTWFyZ2luTGVmdCA9IHRoaXMuX2N1cnJlbnRMZW5zTWFyZ2luTGVmdDtcclxuXHJcblx0fSxcclxuXHJcblx0Y2hlY2tTbGlkZUNhcm91c2VsOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYgKHBhcnNlSW50KHRoaXMuX2xlbnNNYXJnaW5MZWZ0KSA9PSAwKSB7XHJcblx0XHRcdFx0XHR0aGlzLmNhbmNlbFRyYW5zaXRpb24oKTtcclxuXHRcdFx0XHRcdHRoaXMuX2xlbnNNYXJnaW5MZWZ0ID0gKDIqdGhpcy5fc2xpZGVXaWR0aCAtIHBhcnNlSW50KHRoaXMuX2xlbnNXaWR0aCkpICsgXCJweFwiO1xyXG5cdFx0XHRcdFx0dGhpcy5sZW5zLnN0eWxlLm1hcmdpbkxlZnQgPSB0aGlzLl9sZW5zTWFyZ2luTGVmdDtcclxuXHRcdFx0XHRcdHRoaXMudHVybk9uVHJhbnNpdGlvbigpO1xyXG5cclxuXHRcdFx0fSAgZWxzZSBpZiAocGFyc2VJbnQodGhpcy5fbGVuc01hcmdpbkxlZnQpID09ICh0aGlzLl9zbGlkZVdpZHRoIC0gcGFyc2VJbnQodGhpcy5fbGVuc1dpZHRoKSkpIHtcclxuXHRcdFx0XHRcdHRoaXMuY2FuY2VsVHJhbnNpdGlvbigpO1xyXG5cdFx0XHRcdFx0dGhpcy5fbGVuc01hcmdpbkxlZnQgPSAtMSp0aGlzLl9zbGlkZVdpZHRoICsgXCJweFwiO1xyXG5cdFx0XHRcdFx0dGhpcy5sZW5zLnN0eWxlLm1hcmdpbkxlZnQgPSB0aGlzLl9sZW5zTWFyZ2luTGVmdDtcclxuXHRcdFx0XHRcdHRoaXMudHVybk9uVHJhbnNpdGlvbigpO1xyXG5cdFx0XHR9XHJcblx0fSxcclxuXHJcblxyXG5cdGNhbmNlbFRyYW5zaXRpb246IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLmxlbnMuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVyX19sZW5zX3RyYW5zaXRpb24nKTtcclxuXHR9LFxyXG5cclxuXHR0dXJuT25UcmFuc2l0aW9uOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIHRpbWVyQWRkVHJhbnNpdGlvbiA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXt0aGlzLmxlbnMuY2xhc3NMaXN0LmFkZCgnc2xpZGVyX19sZW5zX3RyYW5zaXRpb24nKTt9LmJpbmQodGhpcyksIDUwKTtcclxuXHR9LFxyXG5cclxuXHJcblx0Zml4V2hpY2g6IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0aWYgKCFlLndoaWNoICYmIGUuYnV0dG9uKSB7IC8vINC10YHQu9C4IHdoaWNoINC90LXRgiwg0L3QviDQtdGB0YLRjCBidXR0b24uLi4gKElFOC0pXHJcblx0XHRcdFx0XHRpZiAoZS5idXR0b24gJiAxKSBlLndoaWNoID0gMTsgLy8g0LvQtdCy0LDRjyDQutC90L7Qv9C60LBcclxuXHRcdFx0XHRcdGVsc2UgaWYgKGUuYnV0dG9uICYgNCkgZS53aGljaCA9IDI7IC8vINGB0YDQtdC00L3Rj9GPINC60L3QvtC/0LrQsFxyXG5cdFx0XHRcdFx0ZWxzZSBpZiAoZS5idXR0b24gJiAyKSBlLndoaWNoID0gMzsgLy8g0L/RgNCw0LLQsNGPINC60L3QvtC/0LrQsFxyXG5cdFx0XHR9XHJcblx0fSxcclxuXHJcblx0bW91c2Vkb3duSGFuZGxlcjogZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0dmFyIGV2ZW50ID0gZXZlbnQgfHwgd2luZG93LmV2ZW50OyAvL2NvbnNvbGUubG9nKCdvbm1vdXNlZG93bicpO1xyXG5cdFx0XHR0aGlzLmZpeFdoaWNoKGV2ZW50KTtcclxuXHRcdFx0XHRcdGlmIChldmVudC53aGljaCAhPSAxKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjbGVhckludGVydmFsKHRoaXMudGltZXJBdXRvU3RhcnQpO1xyXG5cdFx0XHR0aGlzLl9zdGFydERyYWdYID0gZXZlbnQuY2xpZW50WDsgLy/Qv9C+0LvQvtC20LXQvdC40LUg0LzRi9GI0Lgg0L/RgNC4IG1vdXNlZG93blxyXG5cdFx0XHR0aGlzLl9zdGFydFggPSB0aGlzLl9zdGFydERyYWdYOyAgLy/Qv9C+0LvQvtC20LXQvdC40LUg0LzRi9GI0Lgg0L/QtdGA0LXQtCBvbm1vdXNlbW92ZSDQsiDQutC+0L3RhtC1INC60LDQttC00L7Qs9C+IG9ubW91c2Vtb3ZlXHJcblx0XHRcdHRoaXMuX2N1cnJlbnRMZW5zTWFyZ2luTGVmdCA9IHRoaXMuX2xlbnNNYXJnaW5MZWZ0O1xyXG5cclxuXHRcdFx0Ly90aGlzLmxlbnMub25tb3VzZW1vdmUgPSB0aGlzLm1vdXNlbW92ZUhhbmRsZXIuYmluZCh0aGlzKTtcclxuXHRcdFx0Ly90aGlzLmxlbnMub25tb3VzZXVwID0gdGhpcy5tb3VzZXVwSGFuZGxlci5iaW5kKHRoaXMpO1xyXG5cdFx0XHQvL3RoaXMuc2NyZWVuLm9ubW91c2VsZWF2ZSA9IHRoaXMubW91c2VsZWF2ZUhhbmRsZXIuYmluZCh0aGlzKTtcclxuXHRcdFx0dGhpcy5sZW5zLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW91c2Vtb3ZlSGFuZGxlciwgZmFsc2UpO1xyXG5cdFx0XHR0aGlzLmxlbnMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMubW91c2V1cEhhbmRsZXIsIGZhbHNlKTtcclxuXHRcdFx0dGhpcy5zY3JlZW4uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMubW91c2VsZWF2ZUhhbmRsZXIsIGZhbHNlKTtcclxuXHR9LFxyXG5cclxuXHRtb3VzZW1vdmVIYW5kbGVyOiBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHR2YXIgZXZlbnQgPSBldmVudCB8fCB3aW5kb3cuZXZlbnQ7XHJcblx0XHRcdC8vY29uc29sZS5sb2coJ29ubW91c2Vtb3ZlJyk7XHJcblx0XHRcdHRoaXMuX2N1cnJlbnRMZW5zTWFyZ2luTGVmdCA9IHBhcnNlSW50KHRoaXMuX2N1cnJlbnRMZW5zTWFyZ2luTGVmdCkgKyBldmVudC5jbGllbnRYIC0gdGhpcy5fc3RhcnRYICArIFwicHhcIjtcclxuXHRcdFx0dGhpcy5fc3RhcnRYID0gZXZlbnQuY2xpZW50WDtcclxuXHRcdFx0dGhpcy5sZW5zLnN0eWxlLm1hcmdpbkxlZnQgPSB0aGlzLl9jdXJyZW50TGVuc01hcmdpbkxlZnQ7XHJcblx0fSxcclxuXHJcblx0bW91c2V1cEhhbmRsZXI6IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdHZhciBldmVudCA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcclxuXHRcdFx0Ly9jb25zb2xlLmxvZygnbW91c2V1cCcpO1xyXG5cdFx0XHR0aGlzLm1vdmVDYXJvdXNlbChldmVudCwgJ3VzZXJtb3ZlJyk7XHJcblx0XHRcdHRoaXMuZGVsZXRlRXZlbnRzKCk7XHJcblx0XHRcdC8vdGhpcy5sZW5zLm9ubW91c2Vtb3ZlID0gdGhpcy5sZW5zLm9ubW91c2V1cCA9IHRoaXMuc2NyZWVuLm9ubW91c2VsZWF2ZSA9IG51bGw7XHJcblx0fSxcclxuXHJcblx0bW91c2VsZWF2ZUhhbmRsZXI6IGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHR2YXIgZXZlbnQgPSBldmVudCB8fCB3aW5kb3cuZXZlbnQ7XHJcblx0XHRcdC8vY29uc29sZS5sb2coJ21vdXNlbGVhdmUnKTtcclxuXHRcdFx0dGhpcy5tb3ZlQ2Fyb3VzZWwoZXZlbnQsICd1c2VybW92ZScpO1xyXG5cdFx0XHR0aGlzLmRlbGV0ZUV2ZW50cygpO1xyXG5cdFx0XHQvL3RoaXMubGVucy5vbm1vdXNlbW92ZSA9IHRoaXMubGVucy5vbm1vdXNldXAgPSB0aGlzLnNjcmVlbi5vbm1vdXNlbGVhdmUgPSBudWxsO1xyXG5cdH0sXHJcblxyXG5cdG9uZHJhZ3N0YXJ0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH0sXHJcblxyXG5cdGFkZEV2ZW50czogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR0aGlzLmVsZW0ub25kcmFnc3RhcnQgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9O1xyXG5cdFx0XHR0aGlzLmxlbnMuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHRoaXMuY2hlY2tTbGlkZUNhcm91c2VsLmJpbmQodGhpcyksIGZhbHNlKTtcclxuXHRcdFx0dGhpcy5zY3JlZW4uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5tb3VzZWRvd25IYW5kbGVyLmJpbmQodGhpcyksIGZhbHNlKTtcclxuXHR9LFxyXG5cclxuXHRkZWxldGVFdmVudHM6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR0aGlzLmxlbnMucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZW1vdmVIYW5kbGVyLCBmYWxzZSk7XHJcblx0XHRcdHRoaXMubGVucy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tb3VzZXVwSGFuZGxlciwgZmFsc2UpO1xyXG5cdFx0XHR0aGlzLnNjcmVlbi5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5tb3VzZWxlYXZlSGFuZGxlciwgZmFsc2UpO1xyXG5cdH1cclxuXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBsYXVuY2hTbGlkZXJzICgpIHtcclxuXHJcblx0Y29uZmlnID0ge1xyXG5cdFx0XHRhdXRvRHVyYXRpb246IDIwMDBcclxuXHR9XHJcblx0dmFyIHNsaWRlcjEgPSBuZXcgU2xpZGVyKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NsaWRlcicpWzBdLCBjb25maWcpO1xyXG59XHJcblxyXG53aW5kb3cub25sb2FkID0gbGF1bmNoU2xpZGVycztcclxuY2xhc3MgR2FsbGVyeXtcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fVxyXG5cclxuXHRpbml0KCl7XHJcblx0XHR0aGlzLmZpbmROb2RlcygpO1xyXG5cdFx0dGhpcy5iaW5kQWxsKCk7XHJcblx0XHR0aGlzLmFkZEV2ZW50cygpO1xyXG5cdH1cclxuXHJcblx0ZmluZE5vZGVzKCl7XHJcblx0XHR0aGlzLm5vZGVzID17XHJcblx0XHRcdHByZXZJbWdzQ29udGFpbmVyOiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpdGVtLXBhZ2VfX2xpc3QtaW1hZ2VzJylbMF0sXHJcblx0XHRcdG1haW5JbWc6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2l0ZW0tcGFnZV9fbWFpbi1pbWcnKVswXVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YmluZEFsbCgpe1xyXG5cdFx0dGhpcy5oYW5kbGVyID0gdGhpcy5oYW5kbGVyLmJpbmQodGhpcyk7XHJcblx0fVxyXG5cclxuXHRhZGRFdmVudHMoKXtcclxuXHRcdHRoaXMubm9kZXMucHJldkltZ3NDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZXIpO1xyXG5cdH1cclxuXHJcblx0aGFuZGxlcihlKXtcclxuXHRcdGxldCB0aHVtYm5haWwgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnYScpO1xyXG5cclxuXHRcdGlmICghdGh1bWJuYWlsKSByZXR1cm47XHJcblx0XHR0aGlzLnNob3dJbWcodGh1bWJuYWlsLmhyZWYsIHRodW1ibmFpbC50aXRsZSk7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdH1cclxuXHJcblx0c2hvd0ltZyhocmVmLCB0aXRsZSl7XHJcblx0XHR0aGlzLm5vZGVzLm1haW5JbWcuc3JjID0gaHJlZjtcclxuXHRcdHRoaXMubm9kZXMubWFpbkltZy5hbHQgPSB0aXRsZTtcclxuXHR9XHJcbn0iXSwiZmlsZSI6Im1haW4uanMifQ==

//# sourceMappingURL=main.js.map
