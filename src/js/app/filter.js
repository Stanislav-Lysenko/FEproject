class Filter {
	constructor(domElem){
		this.filter = domElem;
		this.regExp = /^\/search.+/i;
		return this;
	}

	init() {
		this.findNodes();
		this.bindAll();
		this.addEvents();
	}

	findNodes() {
		this.nodes = {
			conditionNew: document.getElementById('condition-new'),
			conditionUsed: document.getElementById('condition-used'),
			shippingFree: document.getElementById('shipping-free'),
			shippingInStore: document.getElementById('shipping-instore'),
			shippingLocal: document.getElementById('shipping-local'),
			from: document.getElementById('from'),
			to: document.getElementById('to'),
			search: document.getElementById('search'),
			searchBtn: document.getElementById('search-input'),
		}
	}

	bindAll() {
		this.handler = this.handler.bind(this);
	}

	addEvents() {
		this.nodes.conditionNew.addEventListener('click', this.handler);
		this.nodes.conditionUsed.addEventListener('click', this.handler);
	}

	getPath() {
		this.currentPathName = window.location.pathname;
	}

	handler(e) {
		let url = new URLSearchParams(location.search);
		console.dir(this);
		this.getPath();
		//фильтрации не было ещё
		if (!this.currentPathName.match(this.regExp)) {
			location.assign(`search?${e.target.getAttribute('name')}=${e.target.getAttribute('value')}`);
		}
	}
}

// 		let count = new URLSearchParams( location.search ).get('count') || 1;
// setTimeout(() => {
//   console.log(`count: ${ count++ }`);
//   location.assign(`/contacts`);
// }, 3000);