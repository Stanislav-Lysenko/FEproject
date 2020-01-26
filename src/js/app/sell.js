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