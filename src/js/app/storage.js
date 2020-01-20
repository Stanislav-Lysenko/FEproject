'use strict';

class Storage {
	constructor(){
		this.tempItems = [];
		this.tempUsers = [];
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

	saveToLocalStorage(key, data) {
		localStorage.setItem(key, JSON.stringify(data));
	}

	 getTempStorage(name) {
		switch (name) {
			case 'items':
				return this.tempItems;
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
		let filterArrItems = this.getItemsByCondition();
		filterArrItems = this.getItemsByShipping(filterArrItems);
		filterArrItems = this.getItemsByFormat(filterArrItems);
		filterArrItems = this.getItemsByPrice(filterArrItems);
		console.dir(filterArrItems);

	}

	makeArray(str) {
		return str.split(',');
	}

	getItemsByPrice(arr){
		console.log('here');
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

	getItemsByCondition(){
		if (this.filterParams['condition']){
			let arrParams = this.makeArray(this.filterParams['condition']);
			if (arrParams.length == 2) {
				return this.tempItems.filter(item => {return item.condition == arrParams[0] || item.condition == arrParams[1]})
			}
			if (arrParams.length == 1) {
				return this.tempItems.filter(item => item.condition == arrParams[0]);
			}
		}
		return this.tempItems;
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
}