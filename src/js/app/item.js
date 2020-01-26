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