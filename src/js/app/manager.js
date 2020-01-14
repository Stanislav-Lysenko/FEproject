class Manager {
	constructor(){
		this.storage = new Storage();
		this.filter = new Filter();

		this.regExpId = /^\/item\d+$/i;
		this.init();
	}
		async init() {
			await this.storage.init();
			this.onloadPage();
		}

	//  render() {
	// 		var templateContent = document.getElementById("item");
	// 			var template = _.template(templateContent.innerHTML);
	// 			var result = this.storage.getTempStorage('items').reduce(function(sum, current) {
	// 							return  template(current) + sum;
	// 					}.bind(this),"");
	// 					document.getElementsByClassName("result__container")[0].innerHTML = result;
	// 					let curentUrl = window.location;
	// 					console.dir(curentUrl.pathname);
	// 	}

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
			console.dir(obj);
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

		getPath() {
			this.currentPathName = window.location.pathname;
			this.getParams = window.location.search;
		}
		getItemIdfromPath() {
			let reg = /^\/item(\d+$)/i;
			console.log(this.currentPathName.match(reg)[1]);
			return this.currentPathName.match(reg)[1];
		}
		async onloadPage() {
			this.getPath();
			//console.log(this.currentPathName);
			if (this.currentPathName.match(this.regExpId)){
				this.renderItemPage(this.storage.getItemById(this.getItemIdfromPath()))
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
					break;
					case '/advert':
						this.renderAdvert();
					case '/':
						await this.renderMainPage();
						this.filter.init();
						this.renderResult();
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