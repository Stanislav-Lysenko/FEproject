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
		this.saveToLocalStorage('items', this.tempItems);
	}
	addNewUsertoTempStorage(data){
		this.tempUsers.push(data);
		this.saveToLocalStorage('users', this.tempUsers);
	}

	getBoughtItemsByUser(){
		let loginedUser = this.getLoginedUserFromTempStorage();
		for (let i = 0; i< loginedUser.buyitems.length; i++){
			this.tempBoughtItems.push(this.getItemById(loginedUser.buyitems[i].item))
		}
		return this.tempBoughtItems;
	}
	generateNewId(){
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
		this.params[this.nodes.sort.getAttribute('name')] = this.nodes.sort.getElementsByTagName('option')[indexSelected].value;
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIEN1c3RvbVxyXG4gKi9cclxuZnVuY3Rpb24gYWRkVGV4dE5vZGUodGV4dCkge1xyXG4gIGxldCBuZXd0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCk7XHJcbiAgcmV0dXJuIG5ld3RleHQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldEF0dHIoaXRlbSwgaHRtbEVsZW1lbnQpe1xyXG5cdGZvciAoa2V5IGluIGl0ZW0pe1xyXG5cdFx0aWYgKGtleSAhPSBcInRleHRcIiAmJiBrZXkgIT0gXCJ0YWdcIiAmJiBrZXkgIT0gXCJodG1sXCIgJiYga2V5ICE9IFwidGV4dFwiICYmIGtleSAhPSBcImNoaWxkcmVuXCIpIHtcclxuXHRcdFx0aHRtbEVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgaXRlbVtrZXldKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlckhUTUwoZWxlbWVudCwgcGFyZW50KXtcclxuXHQvL2lmIGl0IGlzIHRoZSBkZWVwZXN0IHRhZyBlbGVtZW50XHJcblx0aWYgKCFBcnJheS5pc0FycmF5KGVsZW1lbnQpICYmICFlbGVtZW50LmNoaWxkcmVuKSB7XHJcblx0XHRpZiAoZWxlbWVudC50ZXh0KSB7XHJcblx0XHRcdHJldHVybiBwYXJlbnQuYXBwZW5kKGFkZFRleHROb2RlKGVsZW1lbnQudGV4dCkpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bGV0IGh0bWxFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50LnRhZyk7XHJcblx0XHRcdC8vYWRkIGF0dHJpYnV0ZXNcclxuXHRcdFx0c2V0QXR0cihlbGVtZW50LGh0bWxFbGVtKTtcclxuXHJcblx0XHRcdGh0bWxFbGVtLmFwcGVuZChhZGRUZXh0Tm9kZShlbGVtZW50Lmh0bWwpKTtcclxuXHRcdFx0cmV0dXJuIHBhcmVudC5hcHBlbmRDaGlsZChodG1sRWxlbSk7XHJcblx0XHR9XHJcblx0fSBlbHNlIHtcclxuXHRcdGVsZW1lbnQuZm9yRWFjaCgoaXRlbSk9PiB7XHJcblx0XHRcdGlmIChpdGVtLmNoaWxkcmVuKSB7XHJcblx0XHRcdFx0bGV0IGh0bWxFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdGVtLnRhZyk7XHJcblx0XHRcdFx0Ly9hZGQgYXR0cmlidXRlc1xyXG5cdFx0XHRcdHNldEF0dHIoaXRlbSwgaHRtbEVsZW0pO1xyXG5cclxuXHRcdFx0XHRwYXJlbnQuYXBwZW5kQ2hpbGQoaHRtbEVsZW0pO1xyXG5cdFx0XHRcdHJlbmRlckhUTUwoaXRlbS5jaGlsZHJlbiwgaHRtbEVsZW0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlbmRlckhUTUwoaXRlbSwgcGFyZW50KTtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuLy9yZXR1cm4ganNvbiBwYXJzZWQganNvbiBmaWxlXHJcbmNvbnN0ICBnZXRKU09OID0gYXN5bmMgKHBhdGgpPT4ge1xyXG5cdGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHBhdGgpO1xyXG5cdGxldCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cdHJldHVybiBkYXRhO1xyXG59XHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmNsYXNzIFN0b3JhZ2Uge1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHR0aGlzLnRlbXBJdGVtcyA9IFtdO1xyXG5cdFx0dGhpcy50ZW1wVXNlcnMgPSBbXTtcclxuXHRcdHRoaXMudGVtcEJvdWdodEl0ZW1zID0gW107XHJcblx0XHR0aGlzLmZpbHRlclBhcmFtcyA9IHt9O1xyXG5cdFx0dGhpcy5wYXRoID0ge1xyXG5cdFx0XHRpdGVtczogJ2pzb24vbGlzdGl0ZW1zLmpzb24nLFxyXG5cdFx0XHR1c2VyczogJ2pzb24vdXNlcnMuanNvbidcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgaW5pdCgpIHtcclxuXHRcdGF3YWl0IHRoaXMubG9hZExvY2FsU3RvcmFnZSgpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgbG9hZExvY2FsU3RvcmFnZSgpIHtcclxuXHRcdGxldCBpdGVtcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpdGVtcycpO1xyXG5cdFx0bGV0IHVzZXJzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJzJyk7XHJcblx0XHRhd2FpdCB0aGlzLnVwZGF0ZVRlbXBTdG9yYWdlKGl0ZW1zLCAnaXRlbXMnKTtcclxuXHRcdGF3YWl0IHRoaXMudXBkYXRlVGVtcFN0b3JhZ2UodXNlcnMsICd1c2VycycpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdXBkYXRlVGVtcFN0b3JhZ2UoZGF0YSwga2V5KSB7XHJcblx0XHRzd2l0Y2ggKGtleSkge1xyXG5cdFx0XHRjYXNlICdpdGVtcyc6XHJcblx0XHRcdFx0aWYgKGRhdGEpIHtcclxuXHRcdFx0XHRcdHRoaXMudGVtcEl0ZW1zID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy50ZW1wSXRlbXMgPSBhd2FpdCBnZXRKU09OKHRoaXMucGF0aC5pdGVtcyk7XHJcblx0XHRcdFx0XHR0aGlzLnNhdmVUb0xvY2FsU3RvcmFnZShrZXksIHRoaXMudGVtcEl0ZW1zKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICd1c2Vycyc6XHJcblx0XHRcdFx0aWYgKGRhdGEpIHtcclxuXHRcdFx0XHRcdHRoaXMudGVtcFVzZXJzID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy50ZW1wVXNlcnMgPSBhd2FpdCBnZXRKU09OKHRoaXMucGF0aC51c2Vycyk7XHJcblx0XHRcdFx0XHR0aGlzLnNhdmVUb0xvY2FsU3RvcmFnZShrZXksIHRoaXMudGVtcFVzZXJzKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OiB0aHJvdyBFcnJvciAoJ3NlcmV2ZXIgbm90IHJlc3BvbmQnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHVwZGF0ZUFsbExvY2FsU3RvcmFnZSgpe1xyXG5cdFx0dGhpcy5zYXZlVG9Mb2NhbFN0b3JhZ2UoJ3VzZXJzJywgdGhpcy50ZW1wVXNlcnMpO1xyXG5cdFx0dGhpcy5zYXZlVG9Mb2NhbFN0b3JhZ2UoJ2l0ZW1zJywgdGhpcy50ZW1wSXRlbXMpO1xyXG5cdH1cclxuXHJcblxyXG5cdHNhdmVUb0xvY2FsU3RvcmFnZShrZXksIGRhdGEpIHtcclxuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG5cdH1cclxuXHJcblx0Y29tcGFyZVByaWNlVG9IaWdoKGl0ZW1BLCBpdGVtQil7XHJcblx0XHRyZXR1cm4gaXRlbUIucHJpY2UgLSBpdGVtQS5wcmljZTtcclxuXHR9XHJcblxyXG5cdGNvbXBhcmVQcmljZVRvTG93KGl0ZW1BLCBpdGVtQil7XHJcblx0XHRyZXR1cm4gaXRlbUEucHJpY2UgLSBpdGVtQi5wcmljZTtcclxuXHR9XHJcblxyXG5cdCBnZXRUZW1wU3RvcmFnZShuYW1lKSB7XHJcblx0XHRzd2l0Y2ggKG5hbWUpIHtcclxuXHRcdFx0Y2FzZSAnaXRlbXMnOlxyXG5cdFx0XHRcdHJldHVybiB0aGlzLnRlbXBJdGVtcy5zb3J0KHRoaXMuY29tcGFyZVByaWNlVG9IaWdoKTtcclxuXHRcdFx0Y2FzZSAndXNlcnMnOlxyXG5cdFx0XHRcdHJldHVybiB0aGlzLnRlbXBVc2VycztcclxuXHRcdFx0ZGVmYXVsdDogdGhyb3cgRXJyb3IgKCdzZXJldmVyIG5vdCByZXNwb25kJyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXRJdGVtQnlJZChpZCkge1xyXG5cdFx0cmV0dXJuIHRoaXMudGVtcEl0ZW1zLmZpbmQoaXRlbSA9PiBpdGVtLmlkX2l0ZW0gPT0gaWQpO1xyXG5cdH1cclxuXHJcblx0Z2V0RmlsdGVyZWRJdGVtcyhwYXJhbXMpe1xyXG5cdFx0dGhpcy5maWx0ZXJQYXJhbXMgPSBwYXJhbXM7XHJcblx0XHRsZXQgZmlsdGVyQXJySXRlbXMgPSB0aGlzLmdldEl0ZW1zQnlBdmFpbGFibGUoKTtcclxuXHRcdGZpbHRlckFyckl0ZW1zID0gdGhpcy5nZXRJdGVtc0J5Q29uZGl0aW9uKGZpbHRlckFyckl0ZW1zKTtcclxuXHRcdGZpbHRlckFyckl0ZW1zID0gdGhpcy5nZXRJdGVtc0J5U2hpcHBpbmcoZmlsdGVyQXJySXRlbXMpO1xyXG5cdFx0ZmlsdGVyQXJySXRlbXMgPSB0aGlzLmdldEl0ZW1zQnlGb3JtYXQoZmlsdGVyQXJySXRlbXMpO1xyXG5cdFx0ZmlsdGVyQXJySXRlbXMgPSB0aGlzLmdldEl0ZW1zQnlQcmljZShmaWx0ZXJBcnJJdGVtcyk7XHJcblx0XHRmaWx0ZXJBcnJJdGVtcyA9IHRoaXMuZ2V0SXRlbXNCeVVzZXJSZXF1ZXN0KGZpbHRlckFyckl0ZW1zKTtcclxuXHRcdGZpbHRlckFyckl0ZW1zIC0gdGhpcy5zb3J0QnlEaXJlY3Rpb24oZmlsdGVyQXJySXRlbXMpXHJcblx0XHRyZXR1cm4gZmlsdGVyQXJySXRlbXM7XHJcblx0fVxyXG5cclxuXHRtYWtlQXJyYXkoc3RyKSB7XHJcblx0XHRyZXR1cm4gc3RyLnNwbGl0KCcsJyk7XHJcblx0fVxyXG5cclxuXHRnZXRJdGVtc0J5QXZhaWxhYmxlKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMudGVtcEl0ZW1zLmZpbHRlcihpdGVtID0+IGl0ZW0ucmVzZXJ2ZWQgPT0gZmFsc2UpO1xyXG5cdH1cclxuXHJcblx0c29ydEJ5RGlyZWN0aW9uKGFycikge1xyXG5cdFx0aWYgKHRoaXMuZmlsdGVyUGFyYW1zWydzb3J0J10pe1xyXG5cdFx0XHRzd2l0Y2ggKHRoaXMuZmlsdGVyUGFyYW1zWydzb3J0J10pe1xyXG5cdFx0XHRcdGNhc2UgJ2xvd3ByaWNlJzpcclxuXHRcdFx0XHRcdHJldHVybiBhcnIuc29ydCh0aGlzLmNvbXBhcmVQcmljZVRvSGlnaCk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnaGlnaHByaWNlJzpcclxuXHRcdFx0XHRcdHJldHVybiBhcnIuc29ydCh0aGlzLmNvbXBhcmVQcmljZVRvTG93KTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRkZWZhdWx0OiBhcnIuc29ydCh0aGlzLmNvbXBhcmVQcmljZVRvSGlnaCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBhcnIuc29ydCh0aGlzLmNvbXBhcmVQcmljZVRvSGlnaCk7XHJcblx0fVxyXG5cclxuXHRnZXRJdGVtc0J5VXNlclJlcXVlc3QoYXJyKXtcclxuXHRcdGlmICh0aGlzLmZpbHRlclBhcmFtc1sndXNlcnJlcXVlc3QnXSl7XHJcblx0XHRcdGxldCBzdHJQYXJhbXMgPSB0aGlzLm1ha2VBcnJheSh0aGlzLmZpbHRlclBhcmFtc1sndXNlcnJlcXVlc3QnXSkuam9pbignICcpO1xyXG5cdFx0XHRyZXR1cm4gYXJyLmZpbHRlcihpdGVtID0+IG5ldyBSZWdFeHAoc3RyUGFyYW1zLCAnaScpLnRlc3QoaXRlbS50aXRsZSkpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGFycjtcclxuXHR9XHJcblxyXG5cdGdldEl0ZW1zQnlQcmljZShhcnIpe1xyXG5cdFx0aWYodGhpcy5maWx0ZXJQYXJhbXNbJ2Zyb20nXSkge1xyXG5cdFx0XHRpZiAodGhpcy5maWx0ZXJQYXJhbXNbJ3RvJ10pIHtcclxuXHRcdFx0XHRyZXR1cm4gYXJyLmZpbHRlcihpdGVtID0+IHtcclxuXHRcdFx0XHRcdHJldHVybiBwYXJzZUludChpdGVtLnByaWNlKSA+PSArdGhpcy5maWx0ZXJQYXJhbXNbJ2Zyb20nXSAmJiBwYXJzZUludChpdGVtLnByaWNlKSA8PSArdGhpcy5maWx0ZXJQYXJhbXNbJ3RvJ107XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gYXJyLmZpbHRlcihpdGVtID0+IHtcclxuXHRcdFx0XHRcdHJldHVybiBwYXJzZUludChpdGVtLnByaWNlKSA+PSArdGhpcy5maWx0ZXJQYXJhbXNbJ2Zyb20nXTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gYXJyO1xyXG5cdH1cclxuXHJcblx0Z2V0SXRlbXNCeUNvbmRpdGlvbihhcnIpe1xyXG5cdFx0aWYgKHRoaXMuZmlsdGVyUGFyYW1zWydjb25kaXRpb24nXSl7XHJcblx0XHRcdGxldCBhcnJQYXJhbXMgPSB0aGlzLm1ha2VBcnJheSh0aGlzLmZpbHRlclBhcmFtc1snY29uZGl0aW9uJ10pO1xyXG5cdFx0XHRpZiAoYXJyUGFyYW1zLmxlbmd0aCA9PSAyKSB7XHJcblx0XHRcdFx0cmV0dXJuIGFyci5maWx0ZXIoaXRlbSA9PiB7cmV0dXJuIGl0ZW0uY29uZGl0aW9uID09IGFyclBhcmFtc1swXSB8fCBpdGVtLmNvbmRpdGlvbiA9PSBhcnJQYXJhbXNbMV19KVxyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChhcnJQYXJhbXMubGVuZ3RoID09IDEpIHtcclxuXHRcdFx0XHRyZXR1cm4gYXJyLmZpbHRlcihpdGVtID0+IGl0ZW0uY29uZGl0aW9uID09IGFyclBhcmFtc1swXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBhcnI7XHJcblx0fVxyXG5cclxuXHRyZXBsYWNlU2hpcHBpbmdQYXJhbXMoYXJyKXtcclxuXHRcdHJldHVybiBhcnIubWFwKG5hbWUgPT57XHJcblx0XHRcdGlmIChuYW1lID09ICdmcmVlJykge1xyXG5cdFx0XHRcdHJldHVybiAnRnJlZSBTaGlwcGluZyc7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKG5hbWUgPT0gJ2luc3RvcmUnKSB7XHJcblx0XHRcdFx0cmV0dXJuICdGcmVlIEluLXN0b3JlIFBpY2t1cCc7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKG5hbWUgPT0gJ2xvY2FsJykge1xyXG5cdFx0XHRcdHJldHVybiAnRnJlZSBMb2NhbCBQaWNrdXAnO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0Z2V0SXRlbXNCeVNoaXBwaW5nKGFycil7XHJcblx0XHRpZiAodGhpcy5maWx0ZXJQYXJhbXNbJ3NoaXBwaW5nJ10pe1xyXG5cdFx0XHRsZXQgYXJyUGFyYW1zID0gdGhpcy5tYWtlQXJyYXkodGhpcy5maWx0ZXJQYXJhbXNbJ3NoaXBwaW5nJ10pO1xyXG5cdFx0XHRhcnJQYXJhbXMgPSB0aGlzLnJlcGxhY2VTaGlwcGluZ1BhcmFtcyhhcnJQYXJhbXMpO1xyXG5cdFx0XHRcdGlmIChhcnJQYXJhbXMubGVuZ3RoID09IDMpIHtcclxuXHRcdFx0XHRcdHJldHVybiBhcnIuZmlsdGVyKGl0ZW0gPT4ge3JldHVybiBpdGVtLnNoaXBwaW5nID09IGFyclBhcmFtc1swXSB8fCBpdGVtLnNoaXBwaW5nID09IGFyclBhcmFtc1sxXSB8fCBpdGVtLnNoaXBwaW5nID09IGFyclBhcmFtc1syXX0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoYXJyUGFyYW1zLmxlbmd0aCA9PSAyKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gYXJyLmZpbHRlcihpdGVtID0+IHtyZXR1cm4gaXRlbS5zaGlwcGluZyA9PSBhcnJQYXJhbXNbMF0gfHwgaXRlbS5zaGlwcGluZyA9PSBhcnJQYXJhbXNbMV19KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKGFyclBhcmFtcy5sZW5ndGggPT0gMSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGFyci5maWx0ZXIoaXRlbSA9PiBpdGVtLnNoaXBwaW5nID09IGFyclBhcmFtc1swXSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGFycjtcclxuXHR9XHJcblxyXG5cdGdldEl0ZW1zQnlGb3JtYXQoYXJyKXtcclxuXHRcdHN3aXRjaCAodGhpcy5maWx0ZXJQYXJhbXNbJ2Zvcm1hdCddKXtcclxuXHRcdFx0Y2FzZSAnYnV5aXRub3cnOlxyXG5cdFx0XHRcdHJldHVybiBhcnIuZmlsdGVyKGl0ZW0gPT4gaXRlbS5idXkgPT0gdHJ1ZSk7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdhdWN0aW9uJzpcclxuXHRcdFx0XHRyZXR1cm4gYXJyLmZpbHRlcihpdGVtID0+IGl0ZW0uYXVjdGlvbiA9PSB0cnVlKVxyXG5cdFx0XHRicmVhaztcclxuXHRcdFx0ZGVmYXVsdDogY29uc29sZS5sb2coJ2RlZmF1bHQnKTsgcmV0dXJuIGFycjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cclxuXHQvL2FkZCB1c2VyIHdobyBpcyBsb2dpbmVkIHRvIExvY2FsU3RvcmFnZVxyXG5cdGFkZExvZ2luZWRVc2VydG9Mb2NhbFN0b3JhZ2UodXNlcil7XHJcblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWN0aXZlVXNlcicsIEpTT04uc3RyaW5naWZ5KHVzZXIpKTtcclxuXHR9XHJcblxyXG5cdHJlbW92ZUxvZ2luZWRVc2VyRnJvbUxvY2FsU3RvcmFnZSgpe1xyXG5cdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2FjdGl2ZVVzZXInKTtcclxuXHR9XHJcblxyXG5cdGdldExvZ2luZWRVc2VyRnJvbVRlbXBTdG9yYWdlKCl7XHJcblx0XHRsZXQgbG9naW5lZFVzZXIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhY3RpdmVVc2VyJykpO1xyXG5cdFx0aWYgKGxvZ2luZWRVc2VyKXtcclxuXHRcdFx0cmV0dXJuIHRoaXMudGVtcFVzZXJzLmZpbmQodXNlciA9PiB1c2VyLmxvZ2luID09PSBsb2dpbmVkVXNlci5sb2dpbik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFkZE5ld0l0ZW1Ub1RlbXBTdG9yYWdlKGRhdGEpe1xyXG5cdFx0dGhpcy50ZW1wSXRlbXMucHVzaChkYXRhKTtcclxuXHRcdHRoaXMuc2F2ZVRvTG9jYWxTdG9yYWdlKCdpdGVtcycsIHRoaXMudGVtcEl0ZW1zKTtcclxuXHR9XHJcblx0YWRkTmV3VXNlcnRvVGVtcFN0b3JhZ2UoZGF0YSl7XHJcblx0XHR0aGlzLnRlbXBVc2Vycy5wdXNoKGRhdGEpO1xyXG5cdFx0dGhpcy5zYXZlVG9Mb2NhbFN0b3JhZ2UoJ3VzZXJzJywgdGhpcy50ZW1wVXNlcnMpO1xyXG5cdH1cclxuXHJcblx0Z2V0Qm91Z2h0SXRlbXNCeVVzZXIoKXtcclxuXHRcdGxldCBsb2dpbmVkVXNlciA9IHRoaXMuZ2V0TG9naW5lZFVzZXJGcm9tVGVtcFN0b3JhZ2UoKTtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpPCBsb2dpbmVkVXNlci5idXlpdGVtcy5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdHRoaXMudGVtcEJvdWdodEl0ZW1zLnB1c2godGhpcy5nZXRJdGVtQnlJZChsb2dpbmVkVXNlci5idXlpdGVtc1tpXS5pdGVtKSlcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLnRlbXBCb3VnaHRJdGVtcztcclxuXHR9XHJcblx0Z2VuZXJhdGVOZXdJZCgpe1xyXG5cdFx0cmV0dXJuICt0aGlzLnRlbXBJdGVtc1t0aGlzLnRlbXBJdGVtcy5sZW5ndGgtMV1bJ2lkX2l0ZW0nXSArIDEgKyAnJztcclxuXHR9XHJcbn1cclxuLy8gb3B0aW9uIGFsbCBvciBlbXB0eVxyXG5jbGFzcyBGaWx0ZXIge1xyXG5cdGNvbnN0cnVjdG9yKHtvcHRpb24gPSAnc2VhcmNoJywgcGFyYW1zID0ge319ID17fSl7XHJcblx0XHR0aGlzLnJlZ0V4cCA9IC9eXFwvc2VhcmNoLisvaTtcclxuXHRcdHRoaXMudXNlcnJlcXVlc3RSZWdFeHAgPSAvW2EtejAtOWEtetCwLdGP0ZFdKy9naTtcclxuXHRcdHRoaXMub3B0aW9uID0gb3B0aW9uO1xyXG5cdFx0dGhpcy5wYXJhbXMgPSBwYXJhbXM7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxuXHJcblx0aW5pdCgpIHtcclxuXHRcdHRoaXMuZmluZE5vZGVzKCk7XHJcblx0XHR0aGlzLmJpbmRBbGwoKTtcclxuXHRcdHRoaXMuYWRkRXZlbnRzKCk7XHJcblx0XHR0aGlzLmF1dG9DaGVjaygpO1xyXG5cdH1cclxuXHJcblx0ZmluZE5vZGVzKCkge1xyXG5cdFx0aWYgKHRoaXMub3B0aW9uID09ICdhbGwnKSB7XHJcblx0XHRcdHRoaXMubm9kZXMgPSB7XHJcblx0XHRcdFx0Y29uZGl0aW9uOiBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSgnY29uZGl0aW9uJyksXHJcblx0XHRcdFx0c2hpcHBpbmc6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKCdzaGlwcGluZycpLFxyXG5cdFx0XHRcdGZyb206IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmcm9tJyksXHJcblx0XHRcdFx0dG86IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0bycpLFxyXG5cdFx0XHRcdGJ0bmZyb210bzogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bmZyb210bycpLFxyXG5cdFx0XHRcdHNlYXJjaDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaCcpLFxyXG5cdFx0XHRcdHNlYXJjaEJ0bjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaC1pbnB1dCcpLFxyXG5cdFx0XHRcdGJ1eWl0bm93OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnV5aXRub3cnKSxcclxuXHRcdFx0XHRhdWN0aW9uOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXVjdGlvbicpLFxyXG5cdFx0XHRcdGZvcm1hdDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoJ2Zvcm1hdCcpLFxyXG5cdFx0XHRcdHNvcnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb3J0JyksXHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMubm9kZXMgPSB7XHJcblx0XHRcdFx0c2VhcmNoOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoJyksXHJcblx0XHRcdFx0c2VhcmNoQnRuOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoLWlucHV0JyksXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGJpbmRBbGwoKSB7XHJcblx0XHR0aGlzLmNoZWNrQ29uZGl0aW9uID0gdGhpcy5jaGVja0NvbmRpdGlvbi5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5jaGVja1NoaXBwaW5nID0gdGhpcy5jaGVja1NoaXBwaW5nLmJpbmQodGhpcyk7XHJcblx0XHR0aGlzLnJhbmdlUHJpY2UgPSB0aGlzLnJhbmdlUHJpY2UuYmluZCh0aGlzKTtcclxuXHRcdHRoaXMuY2hlY2tGb3JtYXQgPSB0aGlzLmNoZWNrRm9ybWF0LmJpbmQodGhpcyk7XHJcblx0XHR0aGlzLnNlYXJjaCA9IHRoaXMuc2VhcmNoLmJpbmQodGhpcyk7XHJcblx0XHR0aGlzLnNvcnQgPSB0aGlzLnNvcnQuYmluZCh0aGlzKTtcclxuXHRcdHRoaXMuaGFuZGxlciA9IHRoaXMuaGFuZGxlci5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5oYW5kbGVyQWxsID0gdGhpcy5oYW5kbGVyQWxsLmJpbmQodGhpcyk7XHJcblx0fVxyXG5cclxuXHRhZGRFdmVudHMoKSB7XHJcblx0XHRpZiAodGhpcy5vcHRpb24gPT0gJ2FsbCcpe1xyXG5cdFx0XHR0aGlzLm5vZGVzLmNvbmRpdGlvblswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlckFsbCk7XHJcblx0XHRcdHRoaXMubm9kZXMuY29uZGl0aW9uWzFdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVyQWxsKTtcclxuXHRcdFx0dGhpcy5ub2Rlcy5zaGlwcGluZ1swXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlckFsbCk7XHJcblx0XHRcdHRoaXMubm9kZXMuc2hpcHBpbmdbMV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZXJBbGwpO1xyXG5cdFx0XHR0aGlzLm5vZGVzLnNoaXBwaW5nWzJdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVyQWxsKTtcclxuXHRcdFx0dGhpcy5ub2Rlcy5idG5mcm9tdG8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZXJBbGwpO1xyXG5cdFx0XHR0aGlzLm5vZGVzLmZvcm1hdFswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlckFsbCk7XHJcblx0XHRcdHRoaXMubm9kZXMuZm9ybWF0WzFdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVyQWxsKTtcclxuXHRcdFx0dGhpcy5ub2Rlcy5zZWFyY2hCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZXJBbGwpO1xyXG5cdFx0XHR0aGlzLm5vZGVzLnNvcnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5oYW5kbGVyQWxsKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMubm9kZXMuc2VhcmNoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVyKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG1ha2VBcnJheShzdHIpIHtcclxuXHRcdHJldHVybiBzdHIuc3BsaXQoJywnKTtcclxuXHR9XHJcblxyXG5cdC8vIGNoZWNrIGZpbHRlciBhbmQgc29ydCBvcHRpb25zIGFmdGVyIGxvY2F0aW9uLmFzc2lnblxyXG5cdGF1dG9DaGVjaygpIHtcclxuXHRcdGlmICh0aGlzLnBhcmFtc1snY29uZGl0aW9uJ10pe1xyXG5cdFx0XHRsZXQgYXJyUGFyYW1zID0gdGhpcy5tYWtlQXJyYXkodGhpcy5wYXJhbXNbJ2NvbmRpdGlvbiddKTtcclxuXHRcdFx0dGhpcy5hdXRvQ2hlY2tDb25kaXRpb24oYXJyUGFyYW1zKTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLnBhcmFtc1snc2hpcHBpbmcnXSl7XHJcblx0XHRcdGxldCBhcnJQYXJhbXMgPSB0aGlzLm1ha2VBcnJheSh0aGlzLnBhcmFtc1snc2hpcHBpbmcnXSk7XHJcblx0XHRcdHRoaXMuYXV0b0NoZWNrU2hpcHBpbmcoYXJyUGFyYW1zKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5wYXJhbXNbJ3RvJ10pe1xyXG5cdFx0XHRsZXQgYXJyUGFyYW1zID0gdGhpcy5tYWtlQXJyYXkodGhpcy5wYXJhbXNbJ3RvJ10pO1xyXG5cdFx0XHR0aGlzLmF1dG9DaGVja1JhbmdlUHJpY2UoYXJyUGFyYW1zLCAndG8nKTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLnBhcmFtc1snZnJvbSddKXtcclxuXHRcdFx0bGV0IGFyclBhcmFtcyA9IHRoaXMubWFrZUFycmF5KHRoaXMucGFyYW1zWydmcm9tJ10pO1xyXG5cdFx0XHR0aGlzLmF1dG9DaGVja1JhbmdlUHJpY2UoYXJyUGFyYW1zLCAnZnJvbScpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMucGFyYW1zWydmb3JtYXQnXSl7XHJcblx0XHRcdHRoaXMuYXV0b0NoZWNrRm9ybWF0KHRoaXMucGFyYW1zWydmb3JtYXQnXSk7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5wYXJhbXNbJ3VzZXJyZXF1ZXN0J10pe1xyXG5cdFx0XHRsZXQgYXJyUGFyYW1zID0gdGhpcy5tYWtlQXJyYXkodGhpcy5wYXJhbXNbJ3VzZXJyZXF1ZXN0J10pO1xyXG5cdFx0XHR0aGlzLmF1dG9GaWxsU2VhcmNoKGFyclBhcmFtcyk7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5wYXJhbXNbJ3NvcnQnXSl7XHJcblx0XHRcdHRoaXMuYXV0b0NoZWNrU29ydCh0aGlzLnBhcmFtc1snc29ydCddKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGF1dG9DaGVja1NvcnQodmFsdWUpe1xyXG5cdFx0c3dpdGNoICh2YWx1ZSkge1xyXG5cdFx0XHRjYXNlICdsb3dwcmljZSc6XHJcblx0XHRcdFx0dGhpcy5ub2Rlcy5zb3J0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdvcHRpb24nKVswXS5zZWxlY3RlZCA9IHRydWU7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdoaWdocHJpY2UnOlxyXG5cdFx0XHRcdHRoaXMubm9kZXMuc29ydC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnb3B0aW9uJylbMV0uc2VsZWN0ZWQgPSB0cnVlO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdFx0ZGVmYXVsdDogY29uc29sZS5sb2coJ2ludmFsaWQnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGF1dG9GaWxsU2VhcmNoKGFycikge1xyXG5cdFx0dGhpcy5ub2Rlcy5zZWFyY2gudmFsdWUgPSBhcnIuam9pbignICcpO1xyXG5cdH1cclxuXHJcblx0YXV0b0NoZWNrRm9ybWF0KHZhbHVlKXtcclxuXHRcdHN3aXRjaCAodmFsdWUpIHtcclxuXHRcdFx0Y2FzZSAnYnV5aXRub3cnOlxyXG5cdFx0XHRcdHRoaXMubm9kZXMuZm9ybWF0WzBdLmNoZWNrZWQgPSB0cnVlO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnYXVjdGlvbic6XHJcblx0XHRcdFx0dGhpcy5ub2Rlcy5mb3JtYXRbMV0uY2hlY2tlZCA9IHRydWU7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OiBjb25zb2xlLmxvZygnaW52YWxpZCBxdWVyeSBzdHJpbmcnKTtcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRhdXRvQ2hlY2tSYW5nZVByaWNlKGFyciwgaW5wdXQpe1xyXG5cdFx0c3dpdGNoIChpbnB1dCkge1xyXG5cdFx0XHRjYXNlICd0byc6XHJcblx0XHRcdFx0dGhpcy5ub2Rlcy50by52YWx1ZSA9IGFyci50b1N0cmluZygpO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnZnJvbSc6XHJcblx0XHRcdFx0dGhpcy5ub2Rlcy5mcm9tLnZhbHVlID0gYXJyLnRvU3RyaW5nKCk7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OiBjb25zb2xlLmxvZygnaW52YWxpZCBxdWVyeSBzdHJpbmcnKTtcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cdGF1dG9DaGVja1NoaXBwaW5nKGFycikge1xyXG5cdFx0YXJyLmZvckVhY2goZWxlbWVudCA9PiB7XHJcblx0XHRcdHN3aXRjaCAoZWxlbWVudCkge1xyXG5cdFx0XHRcdGNhc2UgJ2ZyZWUnOlxyXG5cdFx0XHRcdFx0dGhpcy5ub2Rlcy5zaGlwcGluZ1swXS5jaGVja2VkID0gdHJ1ZTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICdpbnN0b3JlJzpcclxuXHRcdFx0XHRcdHRoaXMubm9kZXMuc2hpcHBpbmdbMV0uY2hlY2tlZCA9IHRydWU7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnbG9jYWwnOlxyXG5cdFx0XHRcdFx0dGhpcy5ub2Rlcy5zaGlwcGluZ1syXS5jaGVja2VkID0gdHJ1ZTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRkZWZhdWx0OiBjb25zb2xlLmxvZygnaW52YWxpZCBxdWVyeSBzdHJpbmcnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRhdXRvQ2hlY2tDb25kaXRpb24oYXJyKSB7XHJcblx0XHRhcnIuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuXHRcdFx0c3dpdGNoIChlbGVtZW50KSB7XHJcblx0XHRcdFx0Y2FzZSAnbmV3JzpcclxuXHRcdFx0XHRcdHRoaXMubm9kZXMuY29uZGl0aW9uWzBdLmNoZWNrZWQgPSB0cnVlO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJ3VzZWQnOlxyXG5cdFx0XHRcdFx0dGhpcy5ub2Rlcy5jb25kaXRpb25bMV0uY2hlY2tlZCA9IHRydWU7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0ZGVmYXVsdDogY29uc29sZS5sb2coJ2ludmFsaWQgcXVlcnkgc3RyaW5nJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Z2V0UGF0aCgpIHtcclxuXHRcdHRoaXMuY3VycmVudFBhdGhOYW1lID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xyXG5cdH1cclxuXHJcblx0c2VhcmNoKGUpIHtcclxuXHRcdGlmICh0aGlzLm5vZGVzLnNlYXJjaC52YWx1ZSkge1xyXG5cdFx0XHR0aGlzLnBhcmFtc1sndXNlcnJlcXVlc3QnXSA9IHRoaXMubm9kZXMuc2VhcmNoLnZhbHVlLm1hdGNoKHRoaXMudXNlcnJlcXVlc3RSZWdFeHApO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZGVsZXRlIHRoaXMucGFyYW1zWyd1c2VycmVxdWVzdCddO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c29ydChlKSB7XHJcblx0XHRsZXQgaW5kZXhTZWxlY3RlZCA9IHRoaXMubm9kZXMuc29ydC5zZWxlY3RlZEluZGV4O1xyXG5cdFx0dGhpcy5wYXJhbXNbdGhpcy5ub2Rlcy5zb3J0LmdldEF0dHJpYnV0ZSgnbmFtZScpXSA9IHRoaXMubm9kZXMuc29ydC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnb3B0aW9uJylbaW5kZXhTZWxlY3RlZF0udmFsdWU7XHJcblx0fVxyXG5cclxuXHRjaGVja0Zvcm1hdChlKSB7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubm9kZXMuZm9ybWF0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmICh0aGlzLm5vZGVzLmZvcm1hdFtpXS5jaGVja2VkKSB7XHJcblx0XHRcdFx0dGhpcy5wYXJhbXNbdGhpcy5ub2Rlcy5mb3JtYXRbaV0uZ2V0QXR0cmlidXRlKCduYW1lJyldID0gdGhpcy5ub2Rlcy5mb3JtYXRbaV0udmFsdWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJhbmdlUHJpY2UoZSkge1xyXG5cdFx0bGV0IGZyb20gPSB0aGlzLm5vZGVzLmZyb20udmFsdWUgfHwgMDtcclxuXHRcdGxldCB0byA9IHRoaXMubm9kZXMudG8udmFsdWUgfHwgSW5maW5pdHk7XHJcblx0XHR0aGlzLnBhcmFtc1snZnJvbSddID0gZnJvbTtcclxuXHRcdGlmIChpc0Zpbml0ZSh0bykpIHtcclxuXHRcdFx0dGhpcy5wYXJhbXNbJ3RvJ10gPSB0bztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNoZWNrQ29uZGl0aW9uKGUpIHtcclxuXHRcdGxldCBxdWVyeVN0cmluZyA9ICcnO1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5vZGVzLmNvbmRpdGlvbi5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAodGhpcy5ub2Rlcy5jb25kaXRpb25baV0uY2hlY2tlZCkge1xyXG5cdFx0XHRcdHF1ZXJ5U3RyaW5nICs9IHRoaXMubm9kZXMuY29uZGl0aW9uW2ldLnZhbHVlICsgJywnO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRxdWVyeVN0cmluZyA9IHF1ZXJ5U3RyaW5nLnNsaWNlKDAsIC0xKTtcclxuXHRcdGlmIChxdWVyeVN0cmluZykge1xyXG5cdFx0XHR0aGlzLnBhcmFtc1t0aGlzLm5vZGVzLmNvbmRpdGlvblswXS5nZXRBdHRyaWJ1dGUoJ25hbWUnKV0gPSBxdWVyeVN0cmluZztcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGRlbGV0ZSB0aGlzLnBhcmFtc1t0aGlzLm5vZGVzLmNvbmRpdGlvblswXS5nZXRBdHRyaWJ1dGUoJ25hbWUnKV07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjaGVja1NoaXBwaW5nKGUpIHtcclxuXHRcdGxldCBxdWVyeVN0cmluZyA9ICcnO1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5vZGVzLnNoaXBwaW5nLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmICh0aGlzLm5vZGVzLnNoaXBwaW5nW2ldLmNoZWNrZWQpIHtcclxuXHRcdFx0XHRxdWVyeVN0cmluZyArPSB0aGlzLm5vZGVzLnNoaXBwaW5nW2ldLnZhbHVlICsgJywnO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRxdWVyeVN0cmluZyA9IHF1ZXJ5U3RyaW5nLnNsaWNlKDAsIC0xKTtcclxuXHRcdGlmIChxdWVyeVN0cmluZykge1xyXG5cdFx0XHR0aGlzLnBhcmFtc1t0aGlzLm5vZGVzLnNoaXBwaW5nWzBdLmdldEF0dHJpYnV0ZSgnbmFtZScpXSA9IHF1ZXJ5U3RyaW5nO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZGVsZXRlIHRoaXMucGFyYW1zW3RoaXMubm9kZXMuc2hpcHBpbmdbMF0uZ2V0QXR0cmlidXRlKCduYW1lJyldO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0aGFuZGxlckFsbChlKSB7XHJcblx0XHR0aGlzLmNoZWNrRm9ybWF0KCk7XHJcblx0XHR0aGlzLmNoZWNrQ29uZGl0aW9uKCk7XHJcblx0XHR0aGlzLmNoZWNrU2hpcHBpbmcoKTtcclxuXHRcdHRoaXMucmFuZ2VQcmljZSgpO1xyXG5cdFx0dGhpcy5zZWFyY2goKTtcclxuXHRcdHRoaXMuc29ydCgpO1xyXG5cdFx0dGhpcy5jcmVhdGVVUkwoKTtcclxuXHR9XHJcblxyXG5cdGhhbmRsZXIoZSkge1xyXG5cdFx0dGhpcy5zZWFyY2goKTtcclxuXHRcdHRoaXMuY3JlYXRlVVJMKCk7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVVUkwoKXtcclxuXHRcdGxldCB1cmwgPSAnL3NlYXJjaD8nO1xyXG5cdFx0Zm9yIChrZXkgaW4gdGhpcy5wYXJhbXMpIHtcclxuXHRcdFx0aWYgKGtleSA9PSAndXNlcnJlcXVlc3QnKSB7XHJcblx0XHRcdFx0bGV0IHJlcXVlc3R1cmwgPSB0aGlzLnBhcmFtc1trZXldLnJlZHVjZSgoc3VtLCBjdXJyZW50KSA9PiB7XHJcblx0XHRcdFx0XHRyZXR1cm4gc3VtICsgY3VycmVudCArICcsJztcclxuXHRcdFx0XHR9LCAndXNlcnJlcXVlc3Q9Jyk7XHJcblx0XHRcdFx0dXJsICs9IHJlcXVlc3R1cmwuc2xpY2UoMCwgLTEpICsgJyYnO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHVybCArPSBrZXkgKyAnPScgKyB0aGlzLnBhcmFtc1trZXldICsgJyYnO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHQvLyB1cmwgPSBlbmNvZGVVUkkodXJsLnNsaWNlKDAsIC0xKSk7XHJcblx0XHR1cmwgPSB1cmwuc2xpY2UoMCwgLTEpO1xyXG5cdFx0Y29uc29sZS5sb2codXJsKTtcclxuXHRcdGxvY2F0aW9uLmFzc2lnbih1cmwpO1xyXG5cdH1cclxufVxyXG5jbGFzcyBNYW5hZ2VyIHtcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0dGhpcy5zdG9yYWdlID0gbmV3IFN0b3JhZ2UoKTtcclxuXHRcdHRoaXMucmVnRXhwSWQgPSAvXlxcL2l0ZW1cXGQrJC9pO1xyXG5cdFx0dGhpcy5yZWdTZWFyY2ggPSAvXlxcL3NlYXJjaCQvaTtcclxuXHRcdHRoaXMucGFyYW1zID0ge307XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHRcdGNvbnNvbGUubG9nKCdtYW5hZ2VyIGluaXQnKTtcclxuXHR9XHJcblx0YXN5bmMgaW5pdCgpIHtcclxuXHRcdGF3YWl0IHRoaXMuc3RvcmFnZS5pbml0KCk7XHJcblx0XHR0aGlzLmdldExvZ2luZWRVc2VyKCk7XHJcblx0XHR0aGlzLmdldFBhdGgoKTtcclxuXHRcdHRoaXMuZ2V0U2VhcmNoUGFyYW1zKClcclxuXHRcdHRoaXMub25sb2FkUGFnZSgpO1xyXG5cdH1cclxuXHJcblx0Z2V0TG9naW5lZFVzZXIoKSB7XHJcblx0XHR0aGlzLmxvZ2luZWRVc2VyID0gdGhpcy5zdG9yYWdlLmdldExvZ2luZWRVc2VyRnJvbVRlbXBTdG9yYWdlKCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyByZW5kZXJDb250YWN0c1BhZ2UoKSB7XHJcblx0XHRsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnanNvbi9wYWdlLWNvbnRhY3RzLmpzb24nKTtcclxuXHRcdGxldCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cdFx0cmVuZGVySFRNTChkYXRhLCBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtYWluX19jb250YWluZXInKVswXSk7XHJcblx0fVxyXG5cclxuXHRhc3luYyByZW5kZXJSZWdpc3RyYXRpb24oKSB7XHJcblx0XHRsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnanNvbi9wYWdlLXJlZ2lzdHJhdGlvbi5qc29uJyk7XHJcblx0XHRsZXQgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHRcdHJlbmRlckhUTUwoZGF0YSwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWFpbl9fY29udGFpbmVyJylbMF0pO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgcmVuZGVySGVhZGVyKCkge1xyXG5cdFx0aWYgKHRoaXMubG9naW5lZFVzZXIpe1xyXG5cdFx0XHRsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnanNvbi9wYWdlLW5hdi1sZWZ0LWF1dGguanNvbicpO1xyXG5cdFx0XHRsZXQgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHRcdFx0cmVuZGVySFRNTChkYXRhLCBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCduYXZfX2xlZnQnKVswXSk7XHJcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ25hdl9fdXNlci1uYW1lJylbMF0uYXBwZW5kKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRoaXMubG9naW5lZFVzZXIubmFtZSkpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2pzb24vcGFnZS1uYXYtbGVmdC11bmF1dGguanNvbicpO1xyXG5cdFx0XHRsZXQgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHRcdFx0cmVuZGVySFRNTChkYXRhLCBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCduYXZfX2xlZnQnKVswXSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhc3luYyByZW5kZXJBZHZlcnQoKSB7XHJcblx0XHRsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnanNvbi9wYWdlLXRleHQuanNvbicpO1xyXG5cdFx0bGV0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblx0XHRyZW5kZXJIVE1MKGRhdGEsIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21haW5fX2NvbnRhaW5lcicpWzBdKTtcclxuXHR9XHJcblxyXG5cdHJlbmRlclJlc3VsdChhcnIpIHtcclxuXHRcdGxldCB0ZW1wbGF0ZUNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIml0ZW1cIik7XHJcblx0XHRsZXQgdGVtcGxhdGUgPSBfLnRlbXBsYXRlKHRlbXBsYXRlQ29udGVudC5pbm5lckhUTUwpO1xyXG5cdFx0bGV0IHJlc3VsdCA9IGFyci5yZWR1Y2UoZnVuY3Rpb24oc3VtLCBjdXJyZW50KSB7XHJcblx0XHRcdHJldHVybiAgdGVtcGxhdGUoY3VycmVudCkgKyBzdW07XHJcblx0XHR9LmJpbmQodGhpcyksXCJcIik7XHJcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicmVzdWx0X19jb250YWluZXJcIilbMF0uaW5uZXJIVE1MID0gcmVzdWx0O1xyXG5cdH1cclxuXHJcblx0cmVuZGVySXRlbVBhZ2Uob2JqKSB7XHJcblx0XHRsZXQgdGVtcGxhdGVQYWdlSXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaXRlbS1wYWdlXCIpO1xyXG5cdFx0bGV0IHRlbXBsYXRlSXRlbSA9IF8udGVtcGxhdGUodGVtcGxhdGVQYWdlSXRlbS5pbm5lckhUTUwpO1xyXG5cdFx0bGV0IHJlc3VsdCA9IHRlbXBsYXRlSXRlbShvYmopO1xyXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm1haW5fX2NvbnRhaW5lclwiKVswXS5pbm5lckhUTUwgPSByZXN1bHQ7XHJcblx0XHQvL2dhbGxlcnlcclxuXHRcdHZhciB0ZW1wbGF0ZVBhZ2VHYWxsZXJ5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbGxlcnktaXRlbScpO1xyXG5cdFx0dmFyIHRlbXBsYXRlR2FsbGFyeSA9IF8udGVtcGxhdGUodGVtcGxhdGVQYWdlR2FsbGVyeS5pbm5lckhUTUwpO1xyXG5cdFx0dmFyIHJlc3VsdFVMID0gb2JqLnBpY3R1cmVzLnJlZHVjZSgoc3VtLCBjdXJyZW50KSA9PiB7XHJcblx0XHRcdHJldHVybiB0ZW1wbGF0ZUdhbGxhcnkoY3VycmVudCkgKyBzdW07XHJcblx0XHR9LFwiXCIgKVxyXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaXRlbS1wYWdlX19saXN0LWltYWdlcycpWzBdLmlubmVySFRNTCA9IHJlc3VsdFVMO1xyXG5cdH1cclxuXHJcblx0cmVuZGVySGlzdG9yeShhcnIpe1xyXG5cdFx0bGV0IHRlbXBsYXRlQ29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaXRlbVwiKTtcclxuXHRcdGxldCB0ZW1wbGF0ZSA9IF8udGVtcGxhdGUodGVtcGxhdGVDb250ZW50LmlubmVySFRNTCk7XHJcblx0XHRsZXQgcmVzdWx0ID0gYXJyLnJlZHVjZShmdW5jdGlvbihzdW0sIGN1cnJlbnQpIHtcclxuXHRcdFx0cmV0dXJuICB0ZW1wbGF0ZShjdXJyZW50KSArIHN1bTtcclxuXHRcdH0uYmluZCh0aGlzKSxcIlwiKTtcclxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJtYWluX19jb250YWluZXJcIilbMF0uaW5uZXJIVE1MID0gcmVzdWx0O1xyXG5cdH1cclxuXHJcblx0YXN5bmMgcmVuZGVyTWFpblBhZ2UoKSB7XHJcblx0XHRsZXQgZGF0YSA9IGF3YWl0IGdldEpTT04oJ2pzb24vcGFnZS1hc2lkZS1yZXN1bHQuanNvbicpO1xyXG5cdFx0cmVuZGVySFRNTChkYXRhLCBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtYWluX19jb250YWluZXInKVswXSk7XHJcblx0fVxyXG5cclxuXHRhc3luYyByZW5kZXJTaWduaW4oKSB7XHJcblx0XHRsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnanNvbi9wYWdlLXNpZ25pbi5qc29uJyk7XHJcblx0XHRsZXQgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHRcdHJlbmRlckhUTUwoZGF0YSwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWFpbl9fY29udGFpbmVyJylbMF0pO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgcmVuZGVyU2VsbCgpIHtcclxuXHRcdGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdqc29uL3BhZ2Utc2VsbC5qc29uJyk7XHJcblx0XHRsZXQgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHRcdHJlbmRlckhUTUwoZGF0YSwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWFpbl9fY29udGFpbmVyJylbMF0pO1xyXG5cdH1cclxuXHJcblx0Z2V0UGF0aCgpIHtcclxuXHRcdHRoaXMuY3VycmVudFBhdGhOYW1lID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xyXG5cdH1cclxuXHJcblx0Z2V0U2VhcmNoUGFyYW1zKCkge1xyXG5cdFx0dGhpcy5zZWFyY2hQYXJhbXMgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xyXG5cdH1cclxuXHJcblx0Z2V0SXRlbUlkZnJvbVBhdGgoKSB7XHJcblx0XHRsZXQgcmVnID0gL15cXC9pdGVtKFxcZCskKS9pO1xyXG5cdFx0cmV0dXJuIHRoaXMuY3VycmVudFBhdGhOYW1lLm1hdGNoKHJlZylbMV07XHJcblx0fVxyXG5cclxuXHRwYXJzZVNlYXJjaFBhcmFtcygpIHtcclxuXHRcdC8vbGV0IHN0ciA9XHQnL3NlYXJjaD9jb25kaXRpb249bmV3LHVzZWQmc2hpcHBpbmc9ZnJlZSxpbnN0b3JlLGxvY2FsJmZyb209NCZmb3JtYXQ9YnV5aXRub3cmdXNlcnJlcXVlc3Q9bWFtYStwYXBhJztcclxuXHRcdGxldCBzdHIgPSB0aGlzLnNlYXJjaFBhcmFtcztcclxuXHRcdGlmIChzdHIpe1xyXG5cdFx0XHRsZXQgcGFyYW1zU3RyaW5nID0gc3RyLnNsaWNlKDEpO1xyXG5cdFx0XHRsZXQgZWxlbWVudHMgPSBwYXJhbXNTdHJpbmcuc3BsaXQoJyYnKTtcclxuXHRcdFx0aWYgKGVsZW1lbnRzLmxlbmd0aCl7XHJcblx0XHRcdFx0ZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuXHRcdFx0XHRcdHZhciBrZXlWYWx1ZSA9IGVsZW1lbnQuc3BsaXQoJz0nKTtcclxuXHRcdFx0XHRcdHRoaXMucGFyYW1zW2tleVZhbHVlWzBdXSA9IGtleVZhbHVlWzFdO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFzeW5jIG9ubG9hZFBhZ2UoKSB7XHJcblx0XHR0aGlzLnBhcnNlU2VhcmNoUGFyYW1zKCk7XHJcblx0XHRhd2FpdCB0aGlzLnJlbmRlckhlYWRlcigpO1xyXG5cdFx0Ly9yZW5kZXIgaXRlbSBieSBpZFxyXG5cdFx0aWYgKHRoaXMuY3VycmVudFBhdGhOYW1lLm1hdGNoKHRoaXMucmVnRXhwSWQpKXtcclxuXHRcdFx0dGhpcy5yZW5kZXJJdGVtUGFnZSh0aGlzLnN0b3JhZ2UuZ2V0SXRlbUJ5SWQodGhpcy5nZXRJdGVtSWRmcm9tUGF0aCgpKSk7XHJcblx0XHRcdHRoaXMuaXRlbSA9IG5ldyBJdGVtKHRoaXMuc3RvcmFnZS5nZXRJdGVtQnlJZCh0aGlzLmdldEl0ZW1JZGZyb21QYXRoKCkpKTtcclxuXHRcdFx0bmV3IEdhbGxlcnkoKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fSAvL3JlbmRlciBieSB1c2VyIGZpbHRlciBhbmQgcmVxdWVzdFxyXG5cdFx0aWYgKHRoaXMuY3VycmVudFBhdGhOYW1lLm1hdGNoKHRoaXMucmVnU2VhcmNoKSl7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdyZW5kZXIgYnkgcGFyYW1zJyk7XHJcblx0XHRcdGF3YWl0IHRoaXMucmVuZGVyTWFpblBhZ2UoKTtcclxuXHRcdFx0dGhpcy5yZW5kZXJSZXN1bHQodGhpcy5zdG9yYWdlLmdldEZpbHRlcmVkSXRlbXModGhpcy5wYXJhbXMpKTtcclxuXHRcdFx0dGhpcy5maWx0ZXIgPSBuZXcgRmlsdGVyKHtvcHRpb246ICdhbGwnLCBwYXJhbXM6IHRoaXMucGFyYW1zfSlcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHN3aXRjaCAodGhpcy5jdXJyZW50UGF0aE5hbWUpIHtcclxuXHRcdFx0XHRjYXNlICcvcmVnaXN0ZXInOlxyXG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5yZW5kZXJSZWdpc3RyYXRpb24oKTtcclxuXHRcdFx0XHRcdHRoaXMucmVnaXN0cmF0aW9uID0gbmV3IFJlZ2lzdHJhdGlvbih0aGlzLnN0b3JhZ2UuZ2V0VGVtcFN0b3JhZ2UoJ3VzZXJzJykpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJy9zaWduJzpcclxuXHRcdFx0XHRcdGF3YWl0IHRoaXMucmVuZGVyU2lnbmluKCk7XHJcblx0XHRcdFx0XHR0aGlzLnNpZ25pbiA9IG5ldyBTaWduaW4odGhpcy5zdG9yYWdlLmdldFRlbXBTdG9yYWdlKCd1c2VycycpKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICcvY29udGFjdHMnOlxyXG5cdFx0XHRcdHRoaXMucmVuZGVyQ29udGFjdHNQYWdlKCk7XHJcblx0XHRcdFx0dGhpcy5maWx0ZXIgPSBuZXcgRmlsdGVyKCk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnL2FkdmVydCc6XHJcblx0XHRcdFx0dGhpcy5yZW5kZXJBZHZlcnQoKTtcclxuXHRcdFx0XHR0aGlzLmZpbHRlciA9IG5ldyBGaWx0ZXIoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICcvbG9nb3V0JzpcclxuXHRcdFx0XHRcdHRoaXMuc3RvcmFnZS5yZW1vdmVMb2dpbmVkVXNlckZyb21Mb2NhbFN0b3JhZ2UoKTtcclxuXHRcdFx0XHRcdGxvY2F0aW9uLmFzc2lnbignLycpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJy9oaXN0b3J5JzpcclxuXHRcdFx0XHRcdGlmICh0aGlzLnN0b3JhZ2UuZ2V0TG9naW5lZFVzZXJGcm9tVGVtcFN0b3JhZ2UoKSl7XHJcblx0XHRcdFx0XHRcdHRoaXMucmVuZGVySGlzdG9yeSh0aGlzLnN0b3JhZ2UuZ2V0Qm91Z2h0SXRlbXNCeVVzZXIoKSk7XHJcblx0XHRcdFx0XHR9ZWxzZSB7XHJcblx0XHRcdFx0XHRcdGxvY2F0aW9uLmFzc2lnbignL3NpZ24nKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICcvc2VsbCc6XHJcblx0XHRcdFx0XHRpZiAodGhpcy5zdG9yYWdlLmdldExvZ2luZWRVc2VyRnJvbVRlbXBTdG9yYWdlKCkpe1xyXG5cdFx0XHRcdFx0XHRhd2FpdCB0aGlzLnJlbmRlclNlbGwoKTtcclxuXHRcdFx0XHRcdFx0dGhpcy5zZWxsID0gbmV3IFNlbGwodGhpcy5zdG9yYWdlLmdldExvZ2luZWRVc2VyRnJvbVRlbXBTdG9yYWdlKCkpO1xyXG5cdFx0XHRcdFx0fWVsc2Uge1xyXG5cdFx0XHRcdFx0XHRsb2NhdGlvbi5hc3NpZ24oJy9zaWduJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnLyc6XHJcblx0XHRcdFx0YXdhaXQgdGhpcy5yZW5kZXJNYWluUGFnZSgpO1xyXG5cdFx0XHRcdHRoaXMucmVuZGVyUmVzdWx0KHRoaXMuc3RvcmFnZS5nZXRJdGVtc0J5QXZhaWxhYmxlKCkpXHJcblx0XHRcdFx0dGhpcy5maWx0ZXIgPSBuZXcgRmlsdGVyKHtvcHRpb246ICdhbGwnfSlcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRkZWZhdWx0OiBjb25zb2xlLmxvZygncGFnZSBub3QgZm91bmQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpe1xyXG5cdF8udGVtcGxhdGVTZXR0aW5ncyA9IHtcclxuXHRcdGV2YWx1YXRlICAgIDogL1xce1xceyhbXFxzXFxTXSs/KVxcfVxcfS9nLFxyXG5cdFx0aW50ZXJwb2xhdGUgOiAvXFx7XFx7PShbXFxzXFxTXSs/KVxcfVxcfS9nLFxyXG5cdFx0ZXNjYXBlICAgICAgOiAvXFx7XFx7LShbXFxzXFxTXSs/KVxcfVxcfS9nXHJcblx0fTtcclxuXHRsZXQgbWFuYWdlciA9IG5ldyBNYW5hZ2VyKCk7XHJcbn0pO1xyXG5jbGFzcyBTaWduaW57XHJcblx0Y29uc3RydWN0b3IodXNlcnMpe1xyXG5cdFx0dGhpcy5zdG9yYWdlID0gbmV3IFN0b3JhZ2UoKTtcclxuXHRcdHRoaXMudXNlcnMgPSB1c2VycztcclxuXHRcdHRoaXMuZW1haWxSZWdFeHAgPSAvXihbYS16MC05Xy1dK1xcLikqW2EtejAtOV8tXStAW2EtejAtOV8tXSsoXFwuW2EtejAtOV8tXSspKlxcLlthLXpdezIsNn0kL2k7XHJcblx0XHR0aGlzLnBhc3NSZWdFeHAgPSAvXlxcd3s2LH0kLztcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgaW5pdCgpe1xyXG5cdFx0YXdhaXQgdGhpcy5zdG9yYWdlLmluaXQoKTtcclxuXHRcdHRoaXMuZmluZE5vZGVzKCk7XHJcblx0XHR0aGlzLmJpbmRBbGwoKTtcclxuXHRcdHRoaXMuYWRkRXZlbnRzKCk7XHJcblx0fVxyXG5cclxuXHRmaW5kTm9kZXMoKXtcclxuXHRcdHRoaXMubm9kZXMgPSB7XHJcblx0XHRcdGZvcm06IGRvY3VtZW50LmZvcm1zLnNpZ25pbixcclxuXHRcdFx0ZW1haWw6IGRvY3VtZW50LmZvcm1zLnNpZ25pbi5lbGVtZW50cy5lbWFpbCxcclxuXHRcdFx0cGFzczogZG9jdW1lbnQuZm9ybXMuc2lnbmluLmVsZW1lbnRzLnBhc3MsXHJcblx0XHRcdHN1Ym1pdDogZG9jdW1lbnQuZm9ybXMuc2lnbmluLmVsZW1lbnRzLnN1Ym1pdCxcclxuXHRcdFx0d2FybmluZzogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2lnbmluX193YXJuaW5nJylbMF1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFkZEV2ZW50cygpIHtcclxuXHRcdHRoaXMubm9kZXMuc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zdWJtaXRGb3JtKVxyXG5cdH1cclxuXHJcblx0YmluZEFsbCgpIHtcclxuXHRcdHRoaXMuc3VibWl0Rm9ybSA9IHRoaXMuc3VibWl0Rm9ybS5iaW5kKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0c3VibWl0Rm9ybShlKXtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdGxldCBmbGFnID0gdHJ1ZTtcclxuXHRcdHRoaXMubm9kZXMud2FybmluZy5pbm5lckhUTUwgPSAnJztcclxuXHRcdC8vY2hlY2sgdmFsaWQgZW1haWxcclxuXHRcdGlmICghdGhpcy5lbWFpbFJlZ0V4cC50ZXN0KHRoaXMubm9kZXMuZW1haWwudmFsdWUpKSB7XHJcblx0XHRcdHRoaXMuY3JlYXRlV2FybmluZ01lc3NhZ2UoJ2VtYWlsJyk7XHJcblx0XHRcdGZsYWcgPSBmYWxzZTtcclxuXHRcdH0gLy9jaGVjayB2YWxpZCBwYXNzd2FyZFxyXG5cdFx0aWYgKCF0aGlzLnBhc3NSZWdFeHAudGVzdCh0aGlzLm5vZGVzLnBhc3MudmFsdWUpKSB7XHJcblx0XHRcdHRoaXMuY3JlYXRlV2FybmluZ01lc3NhZ2UoJ3Bhc3N3b3JkJyk7XHJcblx0XHRcdGZsYWcgPSBmYWxzZTtcclxuXHRcdH1cclxuXHRcdGlmIChmbGFnKXtcclxuXHRcdFx0dGhpcy5maW5kVXNlcih0aGlzLm5vZGVzLmVtYWlsLnZhbHVlLCB0aGlzLm5vZGVzLnBhc3MudmFsdWUpXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRmaW5kVXNlcihsb2dpbiwgcGFzcyl7XHJcblx0XHRsZXQgdXNlciA9IHRoaXMudXNlcnMuZmluZCh1c2VyID0+IHVzZXIubG9naW4gPT09IGxvZ2luICYmIHVzZXIucGFzc3dvcmQgPT09IHBhc3MgKTtcclxuXHRcdGlmICghdXNlcikge1xyXG5cdFx0XHR0aGlzLmNyZWF0ZVdhcm5pbmdNZXNzYWdlKCd1bmtub3dudXNlcicpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5zdWNjZXNzTG9naW4odXNlcik7XHJcblx0XHRcdGxvY2F0aW9uLmFzc2lnbignLycpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gYWRkIHVzZXIgbG9naW5lZCB1c2VyIHRvIExvY2FsU3RvcmFnZVxyXG5cdHN1Y2Nlc3NMb2dpbih1c2VyKSB7XHJcblx0XHR0aGlzLnN0b3JhZ2UuYWRkTG9naW5lZFVzZXJ0b0xvY2FsU3RvcmFnZSh1c2VyKTtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZVdhcm5pbmdNZXNzYWdlKGVycm9ybmFtZSl7XHJcblx0XHRsZXQgbWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuXHRcdHN3aXRjaCAoZXJyb3JuYW1lKXtcclxuXHRcdFx0Y2FzZSAnZW1haWwnOlxyXG5cdFx0XHRcdG1lc3NhZ2UuYXBwZW5kKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdZb3UgZW50ZXJlZCBpbmNvcnJlY3QgZW1haWwnKSk7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdwYXNzd29yZCc6XHJcblx0XHRcdFx0bWVzc2FnZS5hcHBlbmQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1lvdSBlbnRlcmVkIGluY29ycmVjdCBwYXNzOiA2IGxldHRlcyBvciBudW1lcnMgb3IgXycpKTtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3Vua25vd251c2VyJzpcclxuXHRcdFx0XHRtZXNzYWdlLmFwcGVuZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnVW5rbm93biB1c2VyJykpO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdFx0ZGVmYXVsdDogY29uc29sZS5sb2coJ2luY29ycmVjdCBlcnJvciBuYW1lJyk7XHJcblx0XHR9XHJcblx0XHR0aGlzLm5vZGVzLndhcm5pbmcuYXBwZW5kQ2hpbGQobWVzc2FnZSk7XHJcblx0fVxyXG4gfVxyXG5jbGFzcyBSZWdpc3RyYXRpb257XHJcblx0Y29uc3RydWN0b3IodXNlcnMpe1xyXG5cdFx0dGhpcy5zdG9yYWdlID0gbmV3IFN0b3JhZ2UoKTtcclxuXHRcdHRoaXMudXNlcnMgPSB1c2VycztcclxuXHRcdHRoaXMuZW1haWxSZWdFeHAgPSAvXihbYS16MC05Xy1dK1xcLikqW2EtejAtOV8tXStAW2EtejAtOV8tXSsoXFwuW2EtejAtOV8tXSspKlxcLlthLXpdezIsNn0kL2k7XHJcblx0XHR0aGlzLnBhc3NSZWdFeHAgPSAvXlxcd3s2LH0kLztcclxuXHRcdHRoaXMubmFtZVJlZ0V4cD0gL15bYS160LAt0Y/RkV17Myx9JC9pO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBpbml0KCl7XHJcblx0XHRhd2FpdCB0aGlzLnN0b3JhZ2UuaW5pdCgpO1xyXG5cdFx0dGhpcy5maW5kTm9kZXMoKTtcclxuXHRcdHRoaXMuYmluZEFsbCgpO1xyXG5cdFx0dGhpcy5hZGRFdmVudHMoKTtcclxuXHJcblx0fVxyXG5cclxuXHRmaW5kTm9kZXMoKXtcclxuXHRcdHRoaXMubm9kZXMgPSB7XHJcblx0XHRcdGZvcm06IGRvY3VtZW50LmZvcm1zLnJlZ2lzdHJhdGlvbixcclxuXHRcdFx0ZW1haWw6IGRvY3VtZW50LmZvcm1zLnJlZ2lzdHJhdGlvbi5lbGVtZW50cy5lbWFpbCxcclxuXHRcdFx0bmFtZTogZG9jdW1lbnQuZm9ybXMucmVnaXN0cmF0aW9uLmVsZW1lbnRzLm5hbWUsXHJcblx0XHRcdHBhc3MwOiBkb2N1bWVudC5mb3Jtcy5yZWdpc3RyYXRpb24uZWxlbWVudHMucGFzc1swXSxcclxuXHRcdFx0cGFzczE6IGRvY3VtZW50LmZvcm1zLnJlZ2lzdHJhdGlvbi5lbGVtZW50cy5wYXNzWzFdLFxyXG5cdFx0XHRzdWJtaXQ6IGRvY3VtZW50LmZvcm1zLnJlZ2lzdHJhdGlvbi5lbGVtZW50cy5zdWJtaXQsXHJcblx0XHRcdHdhcm5pbmc6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3JlZ2lzdHJhdGlvbl9fd2FybmluZycpWzBdXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhZGRFdmVudHMoKSB7XHJcblx0XHR0aGlzLm5vZGVzLnN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc3VibWl0Rm9ybSlcclxuXHR9XHJcblxyXG5cdGJpbmRBbGwoKSB7XHJcblx0XHR0aGlzLnN1Ym1pdEZvcm0gPSB0aGlzLnN1Ym1pdEZvcm0uYmluZCh0aGlzKTtcclxuXHR9XHJcblxyXG5cdHN1Ym1pdEZvcm0oZSl7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRsZXQgZmxhZyA9IHRydWU7XHJcblx0XHR0aGlzLm5vZGVzLndhcm5pbmcuaW5uZXJIVE1MID0gJyc7XHJcblx0XHQvL2NoZWNrIHZhbGlkIGVtYWlsXHJcblx0XHRpZiAoIXRoaXMuZW1haWxSZWdFeHAudGVzdCh0aGlzLm5vZGVzLmVtYWlsLnZhbHVlKSkge1xyXG5cdFx0XHR0aGlzLmNyZWF0ZVdhcm5pbmdNZXNzYWdlKCdlbWFpbCcpO1xyXG5cdFx0XHRmbGFnID0gZmFsc2U7XHJcblx0XHR9XHJcblx0XHQvL2NoZWNrIHZhbGlkIHBhc3N3YXJkXHJcblx0XHRpZiAoIXRoaXMucGFzc1JlZ0V4cC50ZXN0KHRoaXMubm9kZXMucGFzczAudmFsdWUpIHx8ICF0aGlzLnBhc3NSZWdFeHAudGVzdCh0aGlzLm5vZGVzLnBhc3MxLnZhbHVlKSkge1xyXG5cdFx0XHR0aGlzLmNyZWF0ZVdhcm5pbmdNZXNzYWdlKCdwYXNzd29yZCcpO1xyXG5cdFx0XHRmbGFnID0gZmFsc2U7XHJcblx0XHR9XHJcblx0XHQvL2NoZWsgdmFsaWQgbmFtZVxyXG5cdFx0aWYgKCF0aGlzLm5hbWVSZWdFeHAudGVzdCh0aGlzLm5vZGVzLm5hbWUudmFsdWUpKSB7XHJcblx0XHRcdHRoaXMuY3JlYXRlV2FybmluZ01lc3NhZ2UoJ25hbWUnKTtcclxuXHRcdFx0ZmxhZyA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCFmbGFnKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fSBlbHNlIGlmICh0aGlzLmZpbmRVc2VyKHRoaXMubm9kZXMuZW1haWwudmFsdWUpKSB7XHJcblx0XHRcdHRoaXMuYWRkTmV3VXNlclRvTG9jYWxTdG9yYWdlKHRoaXMuY3JlYXRlVXNlcigpKTtcclxuXHRcdFx0dGhpcy5jcmVhdGVXYXJuaW5nTWVzc2FnZSgnb2snKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuY3JlYXRlV2FybmluZ01lc3NhZ2UoJ2V4aXN0Jyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjcmVhdGVVc2VyKCl7XHJcblx0XHRsZXRcdG5ld1VzZXIgPSB7XHJcblx0XHRcdGxvZ2luOiB0aGlzLm5vZGVzLmVtYWlsLnZhbHVlLFxyXG5cdFx0XHRuYW1lOiB0aGlzLm5vZGVzLm5hbWUudmFsdWUsXHJcblx0XHRcdHBhc3N3b3JkOiB0aGlzLm5vZGVzLnBhc3MwLnZhbHVlLFxyXG5cdFx0XHRidXlpdGVtczogW10sXHJcblx0XHRcdHNlbGxpdGVtczogW11cclxuXHRcdH1cclxuXHRcdHJldHVybiBuZXdVc2VyO1xyXG5cdH1cclxuXHJcblx0YWRkTmV3VXNlclRvTG9jYWxTdG9yYWdlKHVzZXIpe1xyXG5cdFx0dGhpcy5zdG9yYWdlLmFkZE5ld1VzZXJ0b1RlbXBTdG9yYWdlKHVzZXIpXHJcblx0fVxyXG5cclxuXHRmaW5kVXNlcihsb2dpbil7XHJcblx0XHRsZXQgdXNlciA9IHRoaXMudXNlcnMuZmluZCh1c2VyID0+IHVzZXIubG9naW4gPT09IGxvZ2luKTtcclxuXHRcdGlmICh1c2VyKSB7XHJcblx0XHRcdC8vdGhpcyB1c2VyIGlzIGV4aXN0XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdC8vIHRoaXMgdXNlciBkb2Vzbid0IGV4aXN0IC0gZ28gb24gcmVnaXN0cmF0aW9uXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlV2FybmluZ01lc3NhZ2UoZXJyb3JuYW1lKXtcclxuXHRcdGxldCBtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG5cdFx0c3dpdGNoIChlcnJvcm5hbWUpe1xyXG5cdFx0XHRjYXNlICdlbWFpbCc6XHJcblx0XHRcdFx0bWVzc2FnZS5hcHBlbmQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1lvdSBlbnRlcmVkIGluY29ycmVjdCBlbWFpbCcpKTtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3Bhc3N3b3JkJzpcclxuXHRcdFx0XHRtZXNzYWdlLmFwcGVuZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnWW91IGVudGVyZWQgaW5jb3JyZWN0IHBhc3M6IDYgbGV0dGVzIG9yIG51bWVycyBvciBfIG9yIHRoZXkgYXJlIG5vdCBlcXVhbCBlYWNoIG90aGVyJykpO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnbmFtZSc6XHJcblx0XHRcdFx0bWVzc2FnZS5hcHBlbmQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1lvdSBlbnRlcmQgaW5jb3JyZWN0IG5hbWU6IG9ubHkgbGV0dGVycyBhbmQgbWluIHNpemU9MycpKTtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ2V4aXN0JzpcclxuXHRcdFx0XHRtZXNzYWdlLmFwcGVuZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnVGhpcyB1c2VyIGhhdmUgYmVlbiBleGlzdGVkJykpO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnb2snOlxyXG5cdFx0XHRcdG1lc3NhZ2UuYXBwZW5kKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGBZb3UndmUgYmVlbiBqdXN0IHJlZ2lzdGVyZWQuIFNpZ24gaW4hYCkpO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdFx0ZGVmYXVsdDogY29uc29sZS5sb2coJ2luY29ycmVjdCBlcnJvciBuYW1lJyk7XHJcblx0XHR9XHJcblx0XHR0aGlzLm5vZGVzLndhcm5pbmcuYXBwZW5kQ2hpbGQobWVzc2FnZSk7XHJcblx0fVxyXG4gfVxyXG5jbGFzcyBJdGVtIHtcclxuXHRjb25zdHJ1Y3RvcihpdGVtKSB7XHJcblx0XHR0aGlzLnN0b3JhZ2UgPSBuZXcgU3RvcmFnZSgpO1xyXG5cdFx0dGhpcy5ub2RlcyA9IHt9O1xyXG5cdFx0dGhpcy5iaWRSZWdFeHAgPSAvXFxkKy9pO1xyXG5cdFx0dGhpcy5pdGVtID0gaXRlbTtcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgaW5pdCgpe1xyXG5cdFx0YXdhaXQgdGhpcy5zdG9yYWdlLmluaXQoKTtcclxuXHRcdHRoaXMuZ2V0VHlwZUl0ZW0oKTtcclxuXHRcdHRoaXMuZmluZE5vZGVzKCk7XHJcblx0XHR0aGlzLmJpbmRBbGwoKTtcclxuXHRcdHRoaXMuYWRkRXZlbnRzKCk7XHJcblx0XHR0aGlzLmNoZWNrUmVzZXJ2ZWQoKVxyXG5cdH1cclxuXHJcblx0ZmluZE5vZGVzKCkge1xyXG5cdFx0aWYgKHRoaXMudHlwZSA9PSAnYXVjdGlvbicpe1xyXG5cdFx0XHR0aGlzLm5vZGVzID0ge1xyXG5cdFx0XHRcdGJpZDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaXRlbS1wYWdlX19zdGFydC1iaWQtaW5wdXQnKVswXSxcclxuXHRcdFx0XHRiaWRzOiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpdGVtLXBhZ2VfYmlkcy12YWx1ZScpWzBdLFxyXG5cdFx0XHRcdHByaWNlOiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpdGVtLXBhZ2VfX3N0YXJ0LWJpZC1wcmljZScpWzBdLFxyXG5cdFx0XHRcdGJ1eUJ0bjogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaXRlbS1wYWdlX19idG4tYmlkJylbMF0sXHJcblx0XHRcdFx0c3RhcnRiaWQ6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2l0ZW0tcGFnZV9fc3RhcnQtYmlkLXByaWNlJylbMF0sXHJcblxyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLm5vZGVzID0ge1xyXG5cdFx0XHRcdGJ1eUJ0bjogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaXRlbS1wYWdlLWJ1eScpWzBdXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGJpbmRBbGwoKXtcclxuXHRcdHRoaXMuaGFuZGxlciA9IHRoaXMuaGFuZGxlci5iaW5kKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0YWRkRXZlbnRzKCkge1xyXG5cdFx0dGhpcy5ub2Rlcy5idXlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZXIpO1xyXG5cdH1cclxuXHJcblx0Z2V0VHlwZUl0ZW0oKXtcclxuXHRcdGlmICh0aGlzLml0ZW0uYXVjdGlvbil7XHJcblx0XHRcdHRoaXMudHlwZSA9ICdhdWN0aW9uJztcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMudHlwZSA9ICdidXlpdG5vdyc7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRoYW5kbGVyKGUpe1xyXG5cdGxldCB1c2VyICA9IHRoaXMuc3RvcmFnZS5nZXRMb2dpbmVkVXNlckZyb21UZW1wU3RvcmFnZSgpO1xyXG5cdFx0aWYodXNlcil7XHJcblx0XHRcdGlmICh0aGlzLnR5cGUgPT0gJ2J1eWl0bm93Jyl7XHJcblx0XHRcdFx0Ly9zYXZlIGlkIG9mIGl0ZW0gdG8gdXNlclxyXG5cdFx0XHRcdGZvciAobGV0IGkgPTA7IGkgPCB0aGlzLnN0b3JhZ2UudGVtcFVzZXJzLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0XHRcdGlmICh0aGlzLnN0b3JhZ2UudGVtcFVzZXJzW2ldLmxvZ2luID09IHVzZXIubG9naW4pe1xyXG5cdFx0XHRcdFx0XHR0aGlzLnN0b3JhZ2UudGVtcFVzZXJzW2ldLmJ1eWl0ZW1zLnB1c2goe1wiaXRlbVwiOiB0aGlzLml0ZW0uaWRfaXRlbX0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyByZXNlcnZlIGl0ZW1cclxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3RvcmFnZS50ZW1wSXRlbXMubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuc3RvcmFnZS50ZW1wSXRlbXNbaV0uaWRfaXRlbSA9PSB0aGlzLml0ZW0uaWRfaXRlbSl7XHJcblx0XHRcdFx0XHRcdHRoaXMuc3RvcmFnZS50ZW1wSXRlbXNbaV0ucmVzZXJ2ZWQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLnN0b3JhZ2UudXBkYXRlQWxsTG9jYWxTdG9yYWdlKCk7XHJcblx0XHRcdFx0bG9jYXRpb24uYXNzaWduKGAvaXRlbSR7dGhpcy5pdGVtLmlkX2l0ZW19YCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0aWYgKCB0aGlzLmNoZWNrQmlkKCkpIHtcclxuXHRcdFx0XHRcdGZvciAobGV0IGkgPTA7IGkgPCB0aGlzLnN0b3JhZ2UudGVtcFVzZXJzLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuc3RvcmFnZS50ZW1wVXNlcnNbaV0ubG9naW4gPT0gdXNlci5sb2dpbil7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5zdG9yYWdlLnRlbXBVc2Vyc1tpXS5idXlpdGVtcy5wdXNoKHtcclxuXHRcdFx0XHRcdFx0XHRcdFwiaXRlbVwiOiB0aGlzLml0ZW0uaWRfaXRlbSxcclxuXHRcdFx0XHRcdFx0XHRcdFwibXliaWRcIjogcGFyc2VJbnQodGhpcy5ub2Rlcy5iaWQudmFsdWUpICsgJy4wMCdcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnN0b3JhZ2UudGVtcEl0ZW1zLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuc3RvcmFnZS50ZW1wSXRlbXNbaV0uaWRfaXRlbSA9PSB0aGlzLml0ZW0uaWRfaXRlbSl7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5zdG9yYWdlLnRlbXBJdGVtc1tpXS5wcmljZSA9IHBhcnNlSW50KHRoaXMubm9kZXMuYmlkLnZhbHVlKSArICcuMDAnO1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuc3RvcmFnZS50ZW1wSXRlbXNbaV0uYmlkcyA9ICt0aGlzLnN0b3JhZ2UudGVtcEl0ZW1zW2ldLmJpZHMgKyAxO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR0aGlzLnN0b3JhZ2UudXBkYXRlQWxsTG9jYWxTdG9yYWdlKCk7XHJcblx0XHRcdFx0XHR0aGlzLmNoYW5nZVRleHRCdG4oKTtcclxuXHRcdFx0XHRcdHRoaXMuY2hhbmdlSW5mb0Fib3V0SXRlbSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bG9jYXRpb24uYXNzaWduKCcvc2lnbicpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y2hlY2tCaWQoKXtcclxuXHRcdGlmICh0aGlzLmJpZFJlZ0V4cC50ZXN0KHRoaXMubm9kZXMuYmlkLnZhbHVlKSAmJiB0aGlzLm5vZGVzLmJpZC52YWx1ZSA+IHRoaXMuaXRlbS5wcmljZSkge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGFsZXJ0KCdZb3UgZW50ZXJlZCBpbmNvcnJlY3QgYmlkJyk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cdGNoYW5nZVRleHRCdG4oKXtcclxuXHRcdHRoaXMubm9kZXMuYnV5QnRuLnZhbHVlID0gXCJCb3VnaHQhXCI7XHJcblx0XHR0aGlzLm5vZGVzLmJ1eUJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcblx0fVxyXG5cclxuXHRjaGFuZ2VJbmZvQWJvdXRJdGVtKCkge1xyXG5cdFx0dGhpcy5ub2Rlcy5wcmljZS5pbm5lckhUTUwgPSB0aGlzLm5vZGVzLmJpZC52YWx1ZSArICcuMDAnIDtcclxuXHRcdHRoaXMubm9kZXMuYmlkcy5pbm5lckhUTUwgPSArdGhpcy5pdGVtLmJpZHMgKyAxO1xyXG5cdH1cclxuXHJcblx0Y2hlY2tSZXNlcnZlZCgpIHtcclxuXHRcdGlmICh0aGlzLml0ZW0ucmVzZXJ2ZWQgPT0gdHJ1ZSkge1xyXG5cdFx0XHR0aGlzLmNoYW5nZVRleHRCdG4oKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuY2xhc3MgU2VsbHtcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0dGhpcy50ZXh0UmVnRXhwID0gL15cXHd7Myx9JC9pO1xyXG5cdFx0dGhpcy5wcmljZVJlZ0V4cCA9IC9eWzEtOV1bMC05XSokL2k7XHJcblx0XHR0aGlzLnN0b3JhZ2UgPSBuZXcgU3RvcmFnZSgpO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBpbml0KCl7XHJcblx0XHRhd2FpdCB0aGlzLnN0b3JhZ2UuaW5pdCgpO1xyXG5cdFx0dGhpcy5maW5kTm9kZXMoKTtcclxuXHRcdHRoaXMuYmluZEFsbCgpO1xyXG5cdFx0dGhpcy5hZGRFdmVudHMoKTtcclxuXHR9XHJcblxyXG5cdGZpbmROb2Rlcygpe1xyXG5cdFx0dGhpcy5ub2RlcyA9IHtcclxuXHRcdFx0Zm9ybTogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoJ3NlbGwnKVswXSxcclxuXHRcdFx0dGl0bGU6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKCd0aXRsZScpWzBdLFxyXG5cdFx0XHRzdWJ0aXRsZTogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoJ3N1YnRpdGxlJylbMF0sXHJcblx0XHRcdGNvbmRpdGlvbjogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoJ2NvbmRpdGlvbicpWzBdLFxyXG5cdFx0XHRwcmV2aW1nOiBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSgncHJldmltZycpWzBdLFxyXG5cdFx0XHRwcmljZTogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoJ3ByaWNlJylbMF0sXHJcblx0XHRcdGZvcm1hdDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoJ2Zvcm1hdCcpWzBdLFxyXG5cdFx0XHRkYXRlRXhwOiBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSgnZGF0ZUV4cCcpWzBdLFxyXG5cdFx0XHRjb3VudHJ5OiBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSgnY291bnRyeScpWzBdLFxyXG5cdFx0XHRzaGlwcGluZzogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoJ3NoaXBwaW5nJylbMF0sXHJcblx0XHRcdHBpY3R1cmVzOiBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSgncGljdHVyZXMnKVswXSxcclxuXHRcdFx0c3VibWl0OiBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSgnc3VibWl0JylbMF0sXHJcblx0XHRcdHdhcm5pbmc6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NlbGxfX3dhcm5pbmcnKVswXVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YmluZEFsbCgpe1xyXG5cdFx0dGhpcy5oYW5kbGVyID0gdGhpcy5oYW5kbGVyLmJpbmQodGhpcyk7XHJcblx0fVxyXG5cclxuXHRhZGRFdmVudHMoKXtcclxuXHRcdHRoaXMubm9kZXMuc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVyKTtcclxuXHR9XHJcblxyXG5cdGhhbmRsZXIoZSl7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHR0aGlzLmNsZWFyV2FybmluZygpO1xyXG5cdFx0aWYodGhpcy5jaGVja0Zvcm0oKSl7XHJcblx0XHRcdHRoaXMuY3JlYXRlTmV3SXRlbSgpO1xyXG5cdFx0XHR0aGlzLmFkZE5ld0l0ZW1Ub1NlbGxMaXN0KClcclxuXHRcdFx0dGhpcy5jaGFuZ2VUZXh0QnRuKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjbGVhcldhcm5pbmcoKXtcclxuXHRcdHRoaXMubm9kZXMud2FybmluZy5pbm5lckhUTUwgPSAnJztcclxuXHR9XHJcblxyXG5cdGFkZE5ld0l0ZW1Ub1NlbGxMaXN0KCl7XHJcblx0XHRsZXQgdXNlciAgPSB0aGlzLnN0b3JhZ2UuZ2V0TG9naW5lZFVzZXJGcm9tVGVtcFN0b3JhZ2UoKTtcclxuXHRcdGlmKHVzZXIpe1xyXG5cdFx0XHQvL3NhdmUgaWQgb2YgaXRlbSB0byB1c2VyXHJcblx0XHRcdGZvciAobGV0IGkgPTA7IGkgPCB0aGlzLnN0b3JhZ2UudGVtcFVzZXJzLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0XHRpZiAodGhpcy5zdG9yYWdlLnRlbXBVc2Vyc1tpXS5sb2dpbiA9PSB1c2VyLmxvZ2luKXtcclxuXHRcdFx0XHRcdHRoaXMuc3RvcmFnZS50ZW1wVXNlcnNbaV0uc2VsbGl0ZW1zLnB1c2goe1wiaXRlbVwiOiB0aGlzLm5ld0l0ZW0uaWRfaXRlbX0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHQvLyByZXNlcnZlIGl0ZW1cclxuXHRcdFx0dGhpcy5zdG9yYWdlLnVwZGF0ZUFsbExvY2FsU3RvcmFnZSgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlTmV3SXRlbSgpe1xyXG5cdFx0dGhpcy5uZXdJdGVtID0ge1xyXG5cdFx0XHRpZF9pdGVtOiB0aGlzLnN0b3JhZ2UuZ2VuZXJhdGVOZXdJZCgpLFxyXG5cdFx0XHR0aXRsZTogdGhpcy5ub2Rlcy50aXRsZS52YWx1ZSxcclxuXHRcdFx0c3VidGl0bGU6IHRoaXMubm9kZXMuc3VidGl0bGUudmFsdWUsXHJcblx0XHRcdGNvbmRpdGlvbjogdGhpcy5nZXRDb25kaXRpb24oKSxcclxuXHRcdFx0cHJldmltZ19wYXRoOiAnaW1nLycgKyB0aGlzLm5vZGVzLnByZXZpbWcuZmlsZXNbMF0ubmFtZSxcclxuXHRcdFx0cHJpY2U6IHRoaXMubm9kZXMucHJpY2UudmFsdWUsXHJcblx0XHRcdGJpZHM6IFwiMFwiLFxyXG5cdFx0XHRhdWN0aW9uOiB0aGlzLmlzQXVjdGlvbigpLFxyXG5cdFx0XHRidXk6IHRoaXMuaXNCdXkoKSxcclxuXHRcdFx0cmVzZXJ2ZWQ6IGZhbHNlLFxyXG5cdFx0XHRjb3VudHJ5OiB0aGlzLm5vZGVzLmNvdW50cnkudmFsdWUsXHJcblx0XHRcdGRhdGVfZXhwOiB0aGlzLm5vZGVzLmRhdGVFeHAudmFsdWUsXHJcblx0XHRcdHNoaXBwaW5nOiB0aGlzLmdldFNoaXBwaW5nKCksXHJcblx0XHRcdHBpY3R1cmVzOiBbXHJcblx0XHRcdFx0e2xpbms6ICdpbWcvJyArIHRoaXMubm9kZXMucGljdHVyZXMuZmlsZXNbMF0ubmFtZX0se2xpbms6ICdpbWcvJyArIHRoaXMubm9kZXMucGljdHVyZXMuZmlsZXNbMV0ubmFtZX0se2xpbms6ICdpbWcvJyArIHRoaXMubm9kZXMucGljdHVyZXMuZmlsZXNbMl0ubmFtZX1cclxuXHRcdFx0XVxyXG5cdFx0fVxyXG5cdFx0Y29uc29sZS5kaXIodGhpcy5uZXdJdGVtICk7XHJcblx0XHR0aGlzLnN0b3JhZ2UuYWRkTmV3SXRlbVRvVGVtcFN0b3JhZ2UodGhpcy5uZXdJdGVtKTtcclxuXHR9XHJcblxyXG5cdGdldFNoaXBwaW5nKCl7XHJcblx0XHRsZXQgaW5kZXhTZWxlY3RlZCA9IHRoaXMubm9kZXMuc2hpcHBpbmcuc2VsZWN0ZWRJbmRleDtcclxuXHRcdHJldHVybiB0aGlzLm5vZGVzLnNoaXBwaW5nLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdvcHRpb24nKVtpbmRleFNlbGVjdGVkXS52YWx1ZTtcclxuXHR9XHJcblxyXG5cdGdldENvbmRpdGlvbigpIHtcclxuXHRcdGxldCBpbmRleFNlbGVjdGVkID0gdGhpcy5ub2Rlcy5jb25kaXRpb24uc2VsZWN0ZWRJbmRleDtcclxuXHRcdHJldHVybiB0aGlzLm5vZGVzLmNvbmRpdGlvbi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnb3B0aW9uJylbaW5kZXhTZWxlY3RlZF0udmFsdWU7XHJcblx0fVxyXG5cclxuXHRpc0J1eSgpIHtcclxuXHRcdGxldCBpbmRleFNlbGVjdGVkID0gdGhpcy5ub2Rlcy5mb3JtYXQuc2VsZWN0ZWRJbmRleDtcclxuXHRcdGlmIChpbmRleFNlbGVjdGVkID09IDApIHsgcmV0dXJuIHRydWU7fVxyXG5cdFx0aWYgKGluZGV4U2VsZWN0ZWQgPT0gMSkgeyByZXR1cm4gZmFsc2U7fVxyXG5cdH1cclxuXHJcblx0aXNBdWN0aW9uKCl7XHJcblx0XHRsZXQgaW5kZXhTZWxlY3RlZCA9IHRoaXMubm9kZXMuZm9ybWF0LnNlbGVjdGVkSW5kZXg7XHJcblx0XHRpZiAoaW5kZXhTZWxlY3RlZCA9PSAwKSB7IHJldHVybiBmYWxzZTt9XHJcblx0XHRpZiAoaW5kZXhTZWxlY3RlZCA9PSAxKSB7IHJldHVybiB0cnVlO31cclxuXHR9XHJcblxyXG5cdGNoZWNrRm9ybSgpe1xyXG5cdFx0bGV0IGZsYWcgPSB0cnVlO1xyXG5cdFx0aWYgKCF0aGlzLnRleHRSZWdFeHAudGVzdCh0aGlzLm5vZGVzLnRpdGxlLnZhbHVlKSl7XHJcblx0XHRcdHRoaXMuY3JlYXRlV2FybmluZ01lc3NhZ2UoJ3RpdGxlJyk7XHJcblx0XHRcdGZsYWcgPSBmYWxzZTtcclxuXHRcdH1cclxuXHRcdGlmICghdGhpcy50ZXh0UmVnRXhwLnRlc3QodGhpcy5ub2Rlcy5zdWJ0aXRsZS52YWx1ZSkpe1xyXG5cdFx0XHR0aGlzLmNyZWF0ZVdhcm5pbmdNZXNzYWdlKCdzdWJ0aXRsZScpO1xyXG5cdFx0XHRmbGFnID0gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5ub2Rlcy5wcmV2aW1nLmZpbGVzLmxlbmd0aCA9PSAwKXtcclxuXHRcdFx0dGhpcy5jcmVhdGVXYXJuaW5nTWVzc2FnZSgncHJldmltZycpO1xyXG5cdFx0XHRmbGFnID0gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRpZiAoIXRoaXMucHJpY2VSZWdFeHAudGVzdCh0aGlzLm5vZGVzLnByaWNlLnZhbHVlKSl7XHJcblx0XHRcdHRoaXMuY3JlYXRlV2FybmluZ01lc3NhZ2UoJ3ByaWNlJyk7XHJcblx0XHRcdGZsYWcgPSBmYWxzZTtcclxuXHRcdH1cclxuXHRcdGlmKG5ldyBEYXRlKHRoaXMubm9kZXMuZGF0ZUV4cC52YWx1ZSkgPD0gRGF0ZS5ub3coKSl7XHJcblx0XHRcdHRoaXMuY3JlYXRlV2FybmluZ01lc3NhZ2UoJ2RhdGVFeHAnKTtcclxuXHRcdFx0ZmxhZyA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0aWYoIXRoaXMudGV4dFJlZ0V4cC50ZXN0KHRoaXMubm9kZXMuY291bnRyeS52YWx1ZSkpe1xyXG5cdFx0XHR0aGlzLmNyZWF0ZVdhcm5pbmdNZXNzYWdlKCdjb3VudHJ5Jyk7XHJcblx0XHRcdGZsYWcgPSBmYWxzZTtcclxuXHRcdH1cclxuXHRcdGlmKHRoaXMubm9kZXMucGljdHVyZXMuZmlsZXMubGVuZ3RoICE9Myl7XHJcblx0XHRcdHRoaXMuY3JlYXRlV2FybmluZ01lc3NhZ2UoJ3BpY3R1cmVzJyk7XHJcblx0XHRcdGZsYWcgPSBmYWxzZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBmbGFnO1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlV2FybmluZ01lc3NhZ2UoZXJyb3JuYW1lKXtcclxuXHRcdGxldCBtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG5cdFx0c3dpdGNoIChlcnJvcm5hbWUpe1xyXG5cdFx0XHRjYXNlICd0aXRsZSc6XHJcblx0XHRcdG1lc3NhZ2UuYXBwZW5kKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCd5b3UgZW50ZXJkIGludmFsaWQgdGl0bGUgb3Igc2tpcCcpKTtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3N1YnRpdGxlJzpcclxuXHRcdFx0bWVzc2FnZS5hcHBlbmQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ3lvdSBlbnRlcmQgaW52YWxpZCBzdWJ0aXRsZSBvciBza2lwJykpO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAncHJldmltZyc6XHJcblx0XHRcdG1lc3NhZ2UuYXBwZW5kKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCd5b3Ugc2tpcCBkb3dubG9hZGluZyBtYWluIGltZycpKTtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3ByaWNlJzpcclxuXHRcdFx0bWVzc2FnZS5hcHBlbmQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1lvdSBlbnRlcmVkIGludmFsaWQgcHJpY2Ugb3Igc2tpcCcpKTtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ2RhdGVFeHAnOlxyXG5cdFx0XHRtZXNzYWdlLmFwcGVuZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnWW91IGVudGVyZWQgaW52YWxpZCBkYXRlIG9yIHNraXAnKSk7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdjb3VudHJ5JzpcclxuXHRcdFx0bWVzc2FnZS5hcHBlbmQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1lvdSBza2lwIGNvdW50cnknKSk7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdwaWN0dXJlcyc6XHJcblx0XHRcdG1lc3NhZ2UuYXBwZW5kKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdZb3Ugc2tpcCBkb3dubG9kaW5nIG9mIDMgcGljdHVyZXMnKSk7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OiBjb25zb2xlLmxvZygnaW5jb3JyZWN0IGVycm9yIG5hbWUnKTtcclxuXHRcdH1cclxuXHRcdHRoaXMubm9kZXMud2FybmluZy5hcHBlbmRDaGlsZChtZXNzYWdlKTtcclxuXHR9XHJcblx0Y2hhbmdlVGV4dEJ0bigpe1xyXG5cdFx0dGhpcy5ub2Rlcy5zdWJtaXQudmFsdWUgPSBcIm9rIVwiO1xyXG5cdFx0dGhpcy5ub2Rlcy5zdWJtaXQuZGlzYWJsZWQgPSB0cnVlO1xyXG5cdH1cclxufVxyXG4vLyBDb25zdHJ1Y3RvclxyXG5mdW5jdGlvbiBTbGlkZXIgKGVsZW0sIGNvbmZpZykge1xyXG5cdHRoaXMuZWxlbSA9IGVsZW07XHJcblxyXG5cdC8vUmVhZCBjb25maWd1cmF0aW9uXHJcblx0dGhpcy5kaXJlY3Rpb24gPSBjb25maWcuZGlyZWN0aW9uIHx8ICdmb3J3YXJkJzsgLy8g0LvQtdCy0L4gLSDQvdCw0LfQsNC0LCDQstC/0YDQsNCy0LDQviAtINCy0L/QtdGA0LXQtFxyXG5cdHRoaXMuYXV0b0R1cmF0aW9uID0gY29uZmlnLmF1dG9EdXJhdGlvbiB8fCAzMDAwO1xyXG5cdHRoaXMuaW5pdCgpO1xyXG59XHJcblxyXG5TbGlkZXIucHJvdG90eXBlID0ge1xyXG5jb25zdHJ1Y3RvcjogU2xpZGVyLCAvKtCh0L7RhdGA0LDQvdC40Lwg0LrQvtC90YHRgtGA0YPQutGC0L7RgCAg0YfRgtC+0LHRiyBTbGlkZXIyINC80L7QttC90L4g0LHRi9C70L4g0YHQtNC10LvQsNGC0Ywg0YfQtdGA0LXQtyBTbGlkZXIxOlxyXG52YXIgU2xpZGVyMiA9IG5ldyBTbGlkZXIxLkNvbnN0cnVjdG9yKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NsaWRlcicpWzFdLCBjb25maWcpKi9cclxuXHJcblx0aW5pdDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMuc2NyZWVuID0gdGhpcy5lbGVtLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXJfX3NjcmVlbicpO1xyXG5cdFx0XHR0aGlzLmxlbnMgPSB0aGlzLmVsZW0ucXVlcnlTZWxlY3RvcignLnNsaWRlcl9fbGVucycpO1xyXG5cdFx0XHR0aGlzLnNsaWRlcyA9IHRoaXMuZWxlbS5xdWVyeVNlbGVjdG9yQWxsKCcuc2xpZGVyX19pdGVtJyk7XHJcblxyXG5cdFx0XHR0aGlzLmFkZENsb25lU2xpZGVzKCk7XHJcblx0XHRcdHRoaXMucHJlcGFyZURvbVNsaWRlcigpO1xyXG5cdFx0XHR0aGlzLmJpbmRBbGwoKTtcclxuXHRcdFx0dGhpcy5hZGRFdmVudHMoKTtcclxuXHR9LFxyXG5cclxuXHRhZGRDbG9uZVNsaWRlczogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBmaXJzdFNsaWRlQ2xvbmUgPSB0aGlzLnNsaWRlc1swXS5jbG9uZU5vZGUodHJ1ZSk7XHJcblx0XHRcdHZhciBsYXN0U2xpZGVDbG9uZSA9IHRoaXMuc2xpZGVzW3RoaXMuc2xpZGVzLmxlbmd0aCAtIDFdLmNsb25lTm9kZSh0cnVlKTtcclxuXHRcdFx0dGhpcy5sZW5zLmFwcGVuZENoaWxkKGZpcnN0U2xpZGVDbG9uZSk7XHJcblx0XHRcdHRoaXMubGVucy5pbnNlcnRCZWZvcmUobGFzdFNsaWRlQ2xvbmUsIHRoaXMuc2xpZGVzWzBdKTtcclxuXHJcblx0fSxcclxuXHJcblx0cHJlcGFyZURvbVNsaWRlcjogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMuX3NsaWRlV2lkdGggPSB0aGlzLnNsaWRlc1swXS5vZmZzZXRXaWR0aDtcclxuXHRcdFx0dGhpcy5fbGVuc1dpZHRoID0gKHRoaXMuc2xpZGVzLmxlbmd0aCArIDIpKnRoaXMuc2xpZGVzWzBdLm9mZnNldFdpZHRoICsgXCJweFwiO1xyXG5cdFx0XHR0aGlzLmxlbnMuc3R5bGUud2lkdGggPSB0aGlzLl9sZW5zV2lkdGg7XHJcblxyXG5cdFx0XHR0aGlzLl9sZW5zTWFyZ2luTGVmdCA9IC0xKnRoaXMuc2xpZGVzWzBdLm9mZnNldFdpZHRoICsgXCJweFwiO1xyXG5cdFx0XHR0aGlzLmxlbnMuc3R5bGUubWFyZ2luTGVmdCA9IHRoaXMuX2xlbnNNYXJnaW5MZWZ0O1xyXG5cclxuXHRcdFx0dGhpcy5fY3VycmVudExlbnNNYXJnaW5MZWZ0ID0gdGhpcy5fbGVuc01hcmdpbkxlZnQ7XHJcblxyXG5cdFx0XHR0aGlzLnN0YXJ0Q2Fyb3VzZWwoKTtcclxuXHJcblx0fSxcclxuXHJcblx0YmluZEFsbDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMubW91c2Vtb3ZlSGFuZGxlciA9IHRoaXMubW91c2Vtb3ZlSGFuZGxlci5iaW5kKHRoaXMpO1xyXG5cdFx0XHR0aGlzLm1vdXNldXBIYW5kbGVyID0gdGhpcy5tb3VzZXVwSGFuZGxlci5iaW5kKHRoaXMpO1xyXG5cdFx0XHR0aGlzLm1vdXNlbGVhdmVIYW5kbGVyID0gdGhpcy5tb3VzZWxlYXZlSGFuZGxlci5iaW5kKHRoaXMpO1xyXG5cclxuXHR9LFxyXG5cclxuXHJcblx0c3RhcnRDYXJvdXNlbDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMubGVucy5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX2xlbnNfdHJhbnNpdGlvbicpO1xyXG5cdFx0XHR0aGlzLnRpbWVyQXV0b1N0YXJ0ID0gc2V0SW50ZXJ2YWwodGhpcy5tb3ZlQ2Fyb3VzZWwuYmluZCh0aGlzKSwgdGhpcy5hdXRvRHVyYXRpb24sIG51bGwsIHRoaXMuZGlyZWN0aW9uKTtcclxuXHR9LFxyXG5cclxuXHJcblxyXG5cdG1vdmVDYXJvdXNlbDogZnVuY3Rpb24oZXZlbnQsIHR5cGVNb3ZlKSB7XHJcblx0XHRcdHZhciBkaXJlY3Rpb247XHJcblx0XHRcdHN3aXRjaCAodHlwZU1vdmUpIHtcclxuXHRcdFx0XHRcdGNhc2UgJ2ZvcndhcmQnOlxyXG5cdFx0XHRcdFx0XHRcdHRoaXMuX2N1cnJlbnRMZW5zTWFyZ2luTGVmdCA9IHBhcnNlSW50KHRoaXMuX2xlbnNNYXJnaW5MZWZ0KSAtIHRoaXMuX3NsaWRlV2lkdGggICsgXCJweFwiO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdFx0Y2FzZSAnYmFja3dhcmQnOlxyXG5cdFx0XHRcdFx0XHRcdHRoaXMuX2N1cnJlbnRMZW5zTWFyZ2luTGVmdCA9IHBhcnNlSW50KHRoaXMuX2xlbnNNYXJnaW5MZWZ0KSArIHRoaXMuX3NsaWRlV2lkdGggKyBcInB4XCI7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0XHRjYXNlICd1c2VybW92ZSc6XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnVVNFUk1PVkUnKTtcclxuXHRcdFx0XHRcdFx0XHRkaXJlY3Rpb24gPSBldmVudC5jbGllbnRYIC0gdGhpcy5fc3RhcnREcmFnWDtcclxuXHRcdFx0XHRcdFx0XHRpZiAoZGlyZWN0aW9uID4gMCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLl9jdXJyZW50TGVuc01hcmdpbkxlZnQgPSBwYXJzZUludCh0aGlzLl9sZW5zTWFyZ2luTGVmdCkgKyB0aGlzLl9zbGlkZVdpZHRoICsgXCJweFwiO1xyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoZGlyZWN0aW9uIDwgMCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLl9jdXJyZW50TGVuc01hcmdpbkxlZnQgPSBwYXJzZUludCh0aGlzLl9sZW5zTWFyZ2luTGVmdCkgLSB0aGlzLl9zbGlkZVdpZHRoICsgXCJweFwiO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5sZW5zLnN0eWxlLm1hcmdpbkxlZnQgPSB0aGlzLl9jdXJyZW50TGVuc01hcmdpbkxlZnQ7XHJcblx0XHRcdHRoaXMuX2xlbnNNYXJnaW5MZWZ0ID0gdGhpcy5fY3VycmVudExlbnNNYXJnaW5MZWZ0O1xyXG5cclxuXHR9LFxyXG5cclxuXHRjaGVja1NsaWRlQ2Fyb3VzZWw6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRpZiAocGFyc2VJbnQodGhpcy5fbGVuc01hcmdpbkxlZnQpID09IDApIHtcclxuXHRcdFx0XHRcdHRoaXMuY2FuY2VsVHJhbnNpdGlvbigpO1xyXG5cdFx0XHRcdFx0dGhpcy5fbGVuc01hcmdpbkxlZnQgPSAoMip0aGlzLl9zbGlkZVdpZHRoIC0gcGFyc2VJbnQodGhpcy5fbGVuc1dpZHRoKSkgKyBcInB4XCI7XHJcblx0XHRcdFx0XHR0aGlzLmxlbnMuc3R5bGUubWFyZ2luTGVmdCA9IHRoaXMuX2xlbnNNYXJnaW5MZWZ0O1xyXG5cdFx0XHRcdFx0dGhpcy50dXJuT25UcmFuc2l0aW9uKCk7XHJcblxyXG5cdFx0XHR9ICBlbHNlIGlmIChwYXJzZUludCh0aGlzLl9sZW5zTWFyZ2luTGVmdCkgPT0gKHRoaXMuX3NsaWRlV2lkdGggLSBwYXJzZUludCh0aGlzLl9sZW5zV2lkdGgpKSkge1xyXG5cdFx0XHRcdFx0dGhpcy5jYW5jZWxUcmFuc2l0aW9uKCk7XHJcblx0XHRcdFx0XHR0aGlzLl9sZW5zTWFyZ2luTGVmdCA9IC0xKnRoaXMuX3NsaWRlV2lkdGggKyBcInB4XCI7XHJcblx0XHRcdFx0XHR0aGlzLmxlbnMuc3R5bGUubWFyZ2luTGVmdCA9IHRoaXMuX2xlbnNNYXJnaW5MZWZ0O1xyXG5cdFx0XHRcdFx0dGhpcy50dXJuT25UcmFuc2l0aW9uKCk7XHJcblx0XHRcdH1cclxuXHR9LFxyXG5cclxuXHJcblx0Y2FuY2VsVHJhbnNpdGlvbjogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMubGVucy5jbGFzc0xpc3QucmVtb3ZlKCdzbGlkZXJfX2xlbnNfdHJhbnNpdGlvbicpO1xyXG5cdH0sXHJcblxyXG5cdHR1cm5PblRyYW5zaXRpb246IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgdGltZXJBZGRUcmFuc2l0aW9uID0gc2V0VGltZW91dChmdW5jdGlvbigpe3RoaXMubGVucy5jbGFzc0xpc3QuYWRkKCdzbGlkZXJfX2xlbnNfdHJhbnNpdGlvbicpO30uYmluZCh0aGlzKSwgNTApO1xyXG5cdH0sXHJcblxyXG5cclxuXHRmaXhXaGljaDogZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRpZiAoIWUud2hpY2ggJiYgZS5idXR0b24pIHsgLy8g0LXRgdC70Lggd2hpY2gg0L3QtdGCLCDQvdC+INC10YHRgtGMIGJ1dHRvbi4uLiAoSUU4LSlcclxuXHRcdFx0XHRcdGlmIChlLmJ1dHRvbiAmIDEpIGUud2hpY2ggPSAxOyAvLyDQu9C10LLQsNGPINC60L3QvtC/0LrQsFxyXG5cdFx0XHRcdFx0ZWxzZSBpZiAoZS5idXR0b24gJiA0KSBlLndoaWNoID0gMjsgLy8g0YHRgNC10LTQvdGP0Y8g0LrQvdC+0L/QutCwXHJcblx0XHRcdFx0XHRlbHNlIGlmIChlLmJ1dHRvbiAmIDIpIGUud2hpY2ggPSAzOyAvLyDQv9GA0LDQstCw0Y8g0LrQvdC+0L/QutCwXHJcblx0XHRcdH1cclxuXHR9LFxyXG5cclxuXHRtb3VzZWRvd25IYW5kbGVyOiBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHR2YXIgZXZlbnQgPSBldmVudCB8fCB3aW5kb3cuZXZlbnQ7IC8vY29uc29sZS5sb2coJ29ubW91c2Vkb3duJyk7XHJcblx0XHRcdHRoaXMuZml4V2hpY2goZXZlbnQpO1xyXG5cdFx0XHRcdFx0aWYgKGV2ZW50LndoaWNoICE9IDEpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGNsZWFySW50ZXJ2YWwodGhpcy50aW1lckF1dG9TdGFydCk7XHJcblx0XHRcdHRoaXMuX3N0YXJ0RHJhZ1ggPSBldmVudC5jbGllbnRYOyAvL9C/0L7Qu9C+0LbQtdC90LjQtSDQvNGL0YjQuCDQv9GA0LggbW91c2Vkb3duXHJcblx0XHRcdHRoaXMuX3N0YXJ0WCA9IHRoaXMuX3N0YXJ0RHJhZ1g7ICAvL9C/0L7Qu9C+0LbQtdC90LjQtSDQvNGL0YjQuCDQv9C10YDQtdC0IG9ubW91c2Vtb3ZlINCyINC60L7QvdGG0LUg0LrQsNC20LTQvtCz0L4gb25tb3VzZW1vdmVcclxuXHRcdFx0dGhpcy5fY3VycmVudExlbnNNYXJnaW5MZWZ0ID0gdGhpcy5fbGVuc01hcmdpbkxlZnQ7XHJcblxyXG5cdFx0XHQvL3RoaXMubGVucy5vbm1vdXNlbW92ZSA9IHRoaXMubW91c2Vtb3ZlSGFuZGxlci5iaW5kKHRoaXMpO1xyXG5cdFx0XHQvL3RoaXMubGVucy5vbm1vdXNldXAgPSB0aGlzLm1vdXNldXBIYW5kbGVyLmJpbmQodGhpcyk7XHJcblx0XHRcdC8vdGhpcy5zY3JlZW4ub25tb3VzZWxlYXZlID0gdGhpcy5tb3VzZWxlYXZlSGFuZGxlci5iaW5kKHRoaXMpO1xyXG5cdFx0XHR0aGlzLmxlbnMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZW1vdmVIYW5kbGVyLCBmYWxzZSk7XHJcblx0XHRcdHRoaXMubGVucy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tb3VzZXVwSGFuZGxlciwgZmFsc2UpO1xyXG5cdFx0XHR0aGlzLnNjcmVlbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5tb3VzZWxlYXZlSGFuZGxlciwgZmFsc2UpO1xyXG5cdH0sXHJcblxyXG5cdG1vdXNlbW92ZUhhbmRsZXI6IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdHZhciBldmVudCA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcclxuXHRcdFx0Ly9jb25zb2xlLmxvZygnb25tb3VzZW1vdmUnKTtcclxuXHRcdFx0dGhpcy5fY3VycmVudExlbnNNYXJnaW5MZWZ0ID0gcGFyc2VJbnQodGhpcy5fY3VycmVudExlbnNNYXJnaW5MZWZ0KSArIGV2ZW50LmNsaWVudFggLSB0aGlzLl9zdGFydFggICsgXCJweFwiO1xyXG5cdFx0XHR0aGlzLl9zdGFydFggPSBldmVudC5jbGllbnRYO1xyXG5cdFx0XHR0aGlzLmxlbnMuc3R5bGUubWFyZ2luTGVmdCA9IHRoaXMuX2N1cnJlbnRMZW5zTWFyZ2luTGVmdDtcclxuXHR9LFxyXG5cclxuXHRtb3VzZXVwSGFuZGxlcjogZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0dmFyIGV2ZW50ID0gZXZlbnQgfHwgd2luZG93LmV2ZW50O1xyXG5cdFx0XHQvL2NvbnNvbGUubG9nKCdtb3VzZXVwJyk7XHJcblx0XHRcdHRoaXMubW92ZUNhcm91c2VsKGV2ZW50LCAndXNlcm1vdmUnKTtcclxuXHRcdFx0dGhpcy5kZWxldGVFdmVudHMoKTtcclxuXHRcdFx0Ly90aGlzLmxlbnMub25tb3VzZW1vdmUgPSB0aGlzLmxlbnMub25tb3VzZXVwID0gdGhpcy5zY3JlZW4ub25tb3VzZWxlYXZlID0gbnVsbDtcclxuXHR9LFxyXG5cclxuXHRtb3VzZWxlYXZlSGFuZGxlcjogZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdHZhciBldmVudCA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcclxuXHRcdFx0Ly9jb25zb2xlLmxvZygnbW91c2VsZWF2ZScpO1xyXG5cdFx0XHR0aGlzLm1vdmVDYXJvdXNlbChldmVudCwgJ3VzZXJtb3ZlJyk7XHJcblx0XHRcdHRoaXMuZGVsZXRlRXZlbnRzKCk7XHJcblx0XHRcdC8vdGhpcy5sZW5zLm9ubW91c2Vtb3ZlID0gdGhpcy5sZW5zLm9ubW91c2V1cCA9IHRoaXMuc2NyZWVuLm9ubW91c2VsZWF2ZSA9IG51bGw7XHJcblx0fSxcclxuXHJcblx0b25kcmFnc3RhcnQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fSxcclxuXHJcblx0YWRkRXZlbnRzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHRoaXMuZWxlbS5vbmRyYWdzdGFydCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH07XHJcblx0XHRcdHRoaXMubGVucy5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgdGhpcy5jaGVja1NsaWRlQ2Fyb3VzZWwuYmluZCh0aGlzKSwgZmFsc2UpO1xyXG5cdFx0XHR0aGlzLnNjcmVlbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlZG93bkhhbmRsZXIuYmluZCh0aGlzKSwgZmFsc2UpO1xyXG5cdH0sXHJcblxyXG5cdGRlbGV0ZUV2ZW50czogZnVuY3Rpb24oKSB7XHJcblx0XHRcdHRoaXMubGVucy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlbW92ZUhhbmRsZXIsIGZhbHNlKTtcclxuXHRcdFx0dGhpcy5sZW5zLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm1vdXNldXBIYW5kbGVyLCBmYWxzZSk7XHJcblx0XHRcdHRoaXMuc2NyZWVuLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLm1vdXNlbGVhdmVIYW5kbGVyLCBmYWxzZSk7XHJcblx0fVxyXG5cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGxhdW5jaFNsaWRlcnMgKCkge1xyXG5cclxuXHRjb25maWcgPSB7XHJcblx0XHRcdGF1dG9EdXJhdGlvbjogMjAwMFxyXG5cdH1cclxuXHR2YXIgc2xpZGVyMSA9IG5ldyBTbGlkZXIoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2xpZGVyJylbMF0sIGNvbmZpZyk7XHJcbn1cclxuXHJcbndpbmRvdy5vbmxvYWQgPSBsYXVuY2hTbGlkZXJzO1xyXG5jbGFzcyBHYWxsZXJ5e1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9XHJcblxyXG5cdGluaXQoKXtcclxuXHRcdHRoaXMuZmluZE5vZGVzKCk7XHJcblx0XHR0aGlzLmJpbmRBbGwoKTtcclxuXHRcdHRoaXMuYWRkRXZlbnRzKCk7XHJcblx0fVxyXG5cclxuXHRmaW5kTm9kZXMoKXtcclxuXHRcdHRoaXMubm9kZXMgPXtcclxuXHRcdFx0cHJldkltZ3NDb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2l0ZW0tcGFnZV9fbGlzdC1pbWFnZXMnKVswXSxcclxuXHRcdFx0bWFpbkltZzogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaXRlbS1wYWdlX19tYWluLWltZycpWzBdXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRiaW5kQWxsKCl7XHJcblx0XHR0aGlzLmhhbmRsZXIgPSB0aGlzLmhhbmRsZXIuYmluZCh0aGlzKTtcclxuXHR9XHJcblxyXG5cdGFkZEV2ZW50cygpe1xyXG5cdFx0dGhpcy5ub2Rlcy5wcmV2SW1nc0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlcik7XHJcblx0fVxyXG5cclxuXHRoYW5kbGVyKGUpe1xyXG5cdFx0bGV0IHRodW1ibmFpbCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCdhJyk7XHJcblxyXG5cdFx0aWYgKCF0aHVtYm5haWwpIHJldHVybjtcclxuXHRcdHRoaXMuc2hvd0ltZyh0aHVtYm5haWwuaHJlZiwgdGh1bWJuYWlsLnRpdGxlKTtcclxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0fVxyXG5cclxuXHRzaG93SW1nKGhyZWYsIHRpdGxlKXtcclxuXHRcdHRoaXMubm9kZXMubWFpbkltZy5zcmMgPSBocmVmO1xyXG5cdFx0dGhpcy5ub2Rlcy5tYWluSW1nLmFsdCA9IHRpdGxlO1xyXG5cdH1cclxufSJdLCJmaWxlIjoibWFpbi5qcyJ9

//# sourceMappingURL=main.js.map
