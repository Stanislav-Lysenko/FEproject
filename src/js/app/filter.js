// option all or empty
class Filter {
	constructor({option = 'search'} ={}){
		this.regExp = /^\/search.+/i;
		this.option = option;
		this.userrequestRegExp = /[a-z0-9a-zа-яё]+/gi;
		this.params = {};
		this.init();
		return this;
	}

	init() {
		this.findNodes();
		this.bindAll();
		this.addEvents();
	}

	findNodes() {
		if (this.option == 'all') {
			this.nodes = {
				// conditionNew: document.getElementById('condition-new'),
				// conditionUsed: document.getElementById('condition-used'),
				condition: document.getElementsByName('condition'),
				// shippingFree: document.getElementById('shipping-free'),
				// shippingInStore: document.getElementById('shipping-instore'),
				// shippingLocal: document.getElementById('shipping-local'),
				shipping: document.getElementsByName('shipping'),
				from: document.getElementById('from'),
				to: document.getElementById('to'),
				btnfromto: document.getElementById('btnfromto'),
				search: document.getElementById('search'),
				searchBtn: document.getElementById('search-input'),
				buyitnow: document.getElementById('buyitnow'),
				auction: document.getElementById('auction'),
				radio: document.getElementsByName('format'),
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
		this.checkRadio = this.checkRadio.bind(this);
		this.search = this.search.bind(this);
	}

	addEvents() {
		if (this.option == 'all'){
			// this.nodes.conditionNew.addEventListener('click', this.handler);
			// this.nodes.conditionUsed.addEventListener('click', this.handler);
			this.nodes.condition[0].addEventListener('click', this.checkCondition);
			this.nodes.condition[1].addEventListener('click', this.checkCondition);
			// this.nodes.shippingFree.addEventListener('click', this.handler);
			// this.nodes.shippingInStore.addEventListener('click', this.handler);
			// this.nodes.shippingLocal.addEventListener('click', this.handler);
			this.nodes.shipping[0].addEventListener('click', this.checkShipping);
			this.nodes.shipping[1].addEventListener('click', this.checkShipping);
			this.nodes.shipping[2].addEventListener('click', this.checkShipping);
			this.nodes.btnfromto.addEventListener('click', this.rangePrice);
			this.nodes.buyitnow.addEventListener('click', this.checkRadio);
			this.nodes.auction.addEventListener('click', this.checkRadio);
			this.nodes.searchBtn.addEventListener('click', this.search);
		} else {
			this.nodes.searchBtn.addEventListener('click', this.search);
		}
	}

	getPath() {
		this.currentPathName = window.location.pathname;
	}

	search(e) {
		this.params['userrequest'] = this.nodes.search.value.match(this.userrequestRegExp);
		console.dir(this.params);
		this.createURL();
	}

	checkRadio(e) {
		for (let i = 0; i < this.nodes.radio.length; i++) {
			if (this.nodes.radio[i].checked) {
				this.params[e.target.getAttribute('name')] = this.nodes.radio[i].value;
			}
		}
		console.dir(this.params);
		this.createURL();
	}

	rangePrice(e) {
		let from = this.nodes.from.value || 0;
		let to = this.nodes.to.value || Infinity;
		this.params['from'] = from;
		if (isFinite(to)) {
			this.params['to'] = to;
		}
		console.dir(this.params);
		this.createURL();
	}

	checkCondition(e) {
		console.log(1111111);
		let queryString = '';
		for (let i = 0; i < this.nodes.condition.length; i++) {
			if (this.nodes.condition[i].checked) {
				queryString += this.nodes.condition[i].value + ',';
			}
		}
		queryString = queryString.slice(0, -1);
		this.params[e.target.getAttribute('name')] = queryString;
		this.createURL();
	}

	checkShipping(e) {
		let queryString = '';
		for (let i = 0; i < this.nodes.shipping.length; i++) {
			if (this.nodes.shipping[i].checked) {
				queryString += this.nodes.shipping[i].value + ',';
			}
		}
		queryString = queryString.slice(0, -1);
		this.params[e.target.getAttribute('name')] = queryString;
		this.createURL();
	}

	createURL(){
		console.log(1);
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

// 		let count = new URLSearchParams( location.search ).get('count') || 1;
// setTimeout(() => {
//   console.log(`count: ${ count++ }`);
//   location.assign(`/contacts`);
// }, 3000);