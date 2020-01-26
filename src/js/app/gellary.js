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