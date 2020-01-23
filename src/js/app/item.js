class Item {
	constructor(item) {
		this.storage = new Storage();
		this.nodes = {};
		this.item = item;
		this.init();
	}

	async init(){
		await this.storage.init();
		this.getTypeItem();
		this.findNodes();
		this.bindAll();
		this.addEvents();
	}

	findNodes() {
		if (this.type == 'auction'){
			this.nodes = {
				bid: document.getElementsByClassName('item-page__start-bid-input'),
				buyBtn: document.getElementsByClassName('item-page__btn-bid')
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
						this.storage.tempUsers[i].buyitems.push(this.item.id_item);
					}
				}
				// reserve item
				for (let i = 0; i < this.storage.tempItems.length; i++){
					if (this.storage.tempItems[i].id_item == this.item.id_item){
						this.storage.tempItems[i].reserved = true;
					}
				}
				console.dir(	this.storage.tempUsers);
				console.dir(	this.storage.tempItems);
				this.storage.updateAllLocalStorage();
			}
		} else {
			location.assign('/sign');
		}
	}
}