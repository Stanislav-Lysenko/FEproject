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

	async renderMainPage() {
		let data = await getJSON('json/page-aside-result.json');
		renderHTML(data, document.getElementsByClassName('main__container')[0]);
	}

	async renderSignin() {
		let response = await fetch('json/page-signin.json');
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
				case '/sell':
					console.log('sell')
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