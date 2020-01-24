// Constructor
function Slider (elem, config) {
	this.elem = elem;

	//Read configuration
	this.direction = config.direction || 'forward'; // лево - назад, вправао - вперед
	this.autoDuration = config.autoDuration || 3000;
console.dir(this);
	this.init();
}

Slider.prototype = {
constructor: Slider, /*Сохраним конструктор  чтобы Slider2 можно было сделать через Slider1:
var Slider2 = new Slider1.Constructor(document.getElementsByClassName('slider')[1], config)*/

	init: function() {
			this.screen = this.elem.querySelector('.slider__screen');
			this.lens = this.elem.querySelector('.slider__lens');
			this.slides = this.elem.querySelectorAll('.slider__item');

			this.addCloneSlides();
			this.prepareDomSlider();
			this.bindAll();
			this.addEvents();
	},

	addCloneSlides: function() {
			var firstSlideClone = this.slides[0].cloneNode(true);
			var lastSlideClone = this.slides[this.slides.length - 1].cloneNode(true);
			this.lens.appendChild(firstSlideClone);
			this.lens.insertBefore(lastSlideClone, this.slides[0]);

	},

	prepareDomSlider: function() {
			this._slideWidth = this.slides[0].offsetWidth;
			console.log(this.slides[0].offsetWidth);
			this._lensWidth = (this.slides.length + 2)*this.slides[0].offsetWidth + "px";
			this.lens.style.width = this._lensWidth;

			this._lensMarginLeft = -1*this.slides[0].offsetWidth + "px";
			this.lens.style.marginLeft = this._lensMarginLeft;

			this._currentLensMarginLeft = this._lensMarginLeft;

			this.startCarousel();

	},

	bindAll: function() {
			this.mousemoveHandler = this.mousemoveHandler.bind(this);
			this.mouseupHandler = this.mouseupHandler.bind(this);
			this.mouseleaveHandler = this.mouseleaveHandler.bind(this);

	},


	startCarousel: function() {
			this.lens.classList.add('slider__lens_transition');
			this.timerAutoStart = setInterval(this.moveCarousel.bind(this), this.autoDuration, null, this.direction);
	},



	moveCarousel: function(event, typeMove) {
			var direction;
			switch (typeMove) {
					case 'forward':
							this._currentLensMarginLeft = parseInt(this._lensMarginLeft) - this._slideWidth  + "px";
					break;

					case 'backward':
							this._currentLensMarginLeft = parseInt(this._lensMarginLeft) + this._slideWidth + "px";
					break;

					case 'usermove':
					console.log('USERMOVE');
							direction = event.clientX - this._startDragX;
							if (direction > 0) {
									this._currentLensMarginLeft = parseInt(this._lensMarginLeft) + this._slideWidth + "px";
							} else if (direction < 0) {
									this._currentLensMarginLeft = parseInt(this._lensMarginLeft) - this._slideWidth + "px";
							}
			}

			this.lens.style.marginLeft = this._currentLensMarginLeft;
			this._lensMarginLeft = this._currentLensMarginLeft;

	},

	checkSlideCarousel: function() {
			if (parseInt(this._lensMarginLeft) == 0) {
					this.cancelTransition();
					this._lensMarginLeft = (2*this._slideWidth - parseInt(this._lensWidth)) + "px";
					this.lens.style.marginLeft = this._lensMarginLeft;
					this.turnOnTransition();

			}  else if (parseInt(this._lensMarginLeft) == (this._slideWidth - parseInt(this._lensWidth))) {
					this.cancelTransition();
					this._lensMarginLeft = -1*this._slideWidth + "px";
					this.lens.style.marginLeft = this._lensMarginLeft;
					this.turnOnTransition();
			}
	},


	cancelTransition: function() {
			this.lens.classList.remove('slider__lens_transition');
	},

	turnOnTransition: function() {
			var timerAddTransition = setTimeout(function(){this.lens.classList.add('slider__lens_transition');}.bind(this), 50);
	},


	fixWhich: function(e) {
			if (!e.which && e.button) { // если which нет, но есть button... (IE8-)
					if (e.button & 1) e.which = 1; // левая кнопка
					else if (e.button & 4) e.which = 2; // средняя кнопка
					else if (e.button & 2) e.which = 3; // правая кнопка
			}
	},

	mousedownHandler: function(event) {
			var event = event || window.event; //console.log('onmousedown');
			this.fixWhich(event);
					if (event.which != 1) {
							return false;
			}

			clearInterval(this.timerAutoStart);
			this._startDragX = event.clientX; //положение мыши при mousedown
			this._startX = this._startDragX;  //положение мыши перед onmousemove в конце каждого onmousemove
			this._currentLensMarginLeft = this._lensMarginLeft;

			//this.lens.onmousemove = this.mousemoveHandler.bind(this);
			//this.lens.onmouseup = this.mouseupHandler.bind(this);
			//this.screen.onmouseleave = this.mouseleaveHandler.bind(this);
			this.lens.addEventListener('mousemove', this.mousemoveHandler, false);
			this.lens.addEventListener('mouseup', this.mouseupHandler, false);
			this.screen.addEventListener('mouseleave', this.mouseleaveHandler, false);
	},

	mousemoveHandler: function(event) {
			var event = event || window.event;
			//console.log('onmousemove');
			this._currentLensMarginLeft = parseInt(this._currentLensMarginLeft) + event.clientX - this._startX  + "px";
			this._startX = event.clientX;
			this.lens.style.marginLeft = this._currentLensMarginLeft;
	},

	mouseupHandler: function(event) {
			var event = event || window.event;
			//console.log('mouseup');
			this.moveCarousel(event, 'usermove');
			this.deleteEvents();
			//this.lens.onmousemove = this.lens.onmouseup = this.screen.onmouseleave = null;
	},

	mouseleaveHandler: function (event) {
			var event = event || window.event;
			//console.log('mouseleave');
			this.moveCarousel(event, 'usermove');
			this.deleteEvents();
			//this.lens.onmousemove = this.lens.onmouseup = this.screen.onmouseleave = null;
	},

	ondragstart: function() {
			return false;
	},

	addEvents: function () {
			this.elem.ondragstart = function() {
						return false;
			};
			this.lens.addEventListener('transitionend', this.checkSlideCarousel.bind(this), false);
			this.screen.addEventListener('mousedown', this.mousedownHandler.bind(this), false);
	},

	deleteEvents: function() {
			this.lens.removeEventListener('mousemove', this.mousemoveHandler, false);
			this.lens.removeEventListener('mouseup', this.mouseupHandler, false);
			this.screen.removeEventListener('mouseleave', this.mouseleaveHandler, false);
	}

}


function launchSliders () {

	config = {
			autoDuration: 2000
	}
	var slider1 = new Slider(document.getElementsByClassName('slider')[0], config);
}

window.onload = launchSliders;