class Manager {
	constructor(){
		this.storage = new Storage();
		this.regExpId = /^\/item\d+$/i;
		this.regSearch = /^\/search$/i;
		this.params = {};
		this.init();
	}
		async init() {
			await this.storage.init();
			this.getPath();
			this.getSearchParams()
			this.onloadPage();
		}

		async renderContactsPage() {
			let response = await fetch('json/page-contacts.json');
			let data = await response.json();
			renderHTML(data, document.getElementsByClassName('main__container')[0]);
		}

		renderRegisterPage() {

		}

		async renderAdvert() {
			let response = await fetch('json/page-text.json');
			let data = await response.json();
			renderHTML(data, document.getElementsByClassName('main__container')[0]);
		}

		renderResult() {
			let templateContent = document.getElementById("item");
			let template = _.template(templateContent.innerHTML);
			let result = this.storage.getTempStorage('items').reduce(function(sum, current) {
							return  template(current) + sum;
					}.bind(this),"");
			document.getElementsByClassName("result__container")[0].innerHTML = result;
		}

		renderItemPage(obj) {
			let templatePageItem = document.getElementById("item-page");
			let templateItem = _.template(templatePageItem.innerHTML);
			let result = templateItem(obj);
			document.getElementsByClassName("main__container")[0].innerHTML = result;
			//gallary
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

		renderByParams() {

		}

		checkUserSearchParams() {

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
		let str =	'/search?condition1=new&condition2=used&shippingfree=free&shippinginstore=instore&shippinglocal=local&from=0&to=10&format=buyitnow&userrequest=mama+papa';
		let paramsString = str.slice(8);
			let elements = paramsString.split('&');
			if (elements.length){
				elements.forEach(element => {
					var keyValue = element.split('=');
					this.params[keyValue[0]] = keyValue[1];
				})
			}
		}

		async onloadPage() {
			this.parseSearchParams();
			if (this.currentPathName.match(this.regExpId)){
				this.renderItemPage(this.storage.getItemById(this.getItemIdfromPath()))
			}
			 if (this.currentPathName.match(this.regSearch)){
				console.log('render by params');
				await this.renderMainPage();
				//this.renderResult();
				this.filter = new Filter({option: 'all'})
			 } else {
				switch (this.currentPathName) {
					case '/register':
						console.log('register');
					break;
					case '/sign':
						console.log('sign');
					break;
					case '/contacts':
						this.renderContactsPage();
						this.filter = new Filter();
					break;
					case '/advert':
						this.renderAdvert();
					case '/':
						await this.renderMainPage();
						this.renderResult();
						this.filter = new Filter({option: 'all'})
					break;
					default: console.log('page not found');
				}
			}
		}


// 		let count = new URLSearchParams( location.search ).get('count') || 1;
// setTimeout(() => {
//   console.log(`count: ${ count++ }`);
//   location.assign(`/contacts`);
// }, 3000);

}