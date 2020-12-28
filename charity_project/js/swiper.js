var mySwiper = null
var partnerSwiper = null
function initSwiperView(endCallBack) {
	var labelSwiper = new Swiper('.label_container', {
		slidesPerView: 10,
	})

	var effect = 0
	partnerSwiper = new Swiper('.offerslidetab1', {
		// loop: true,
		slidesPerView: 'auto',
		// autoplay: {
		// 	disableOnInteraction: false,
		// },
		controller: {
			control: labelSwiper,
		},
		slidesPerView: 1,

		spaceBetween: 0,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		watchSlidesProgress: true,
		on: {
			setTranslate: function (swiper, translate) {
				slides = this.slides
				for (i = 0; i < slides.length; i++) {
					slide = slides.eq(i)
					progress = slides[i].progress
					//slide.html(progress.toFixed(2)); 看清楚progress是怎么变化的
					slide.css({
						opacity: '',
						background: '',
					})
					slide.transform('') //清除样式
					slide.transform('scale(' + (1 - Math.abs(progress) / 8) + ')')
				}
			},
			setTransition: function (transition) {
				for (var i = 0; i < this.slides.length; i++) {
					var slide = this.slides.eq(i)
					slide.transition(transition)
				}
			},
			// 结束
			transitionEnd: function () {
				// alert(this.activeIndex); //切换结束时，告诉我现在是第几个slide
				if (endCallBack) {
					endCallBack(this.activeIndex)
				}
			},
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
	})
}

function reportSwiperView() {
	var reportSwiper = new Swiper('.report-swiper', {

		slidesPerView: 1,
		loop: true,
		speed: 1000,
		autoplay: {
			delay: 3000,
			stopOnLastSlide: false,
			disableOnInteraction: true,
		},
	})
}

function initDescSwiperView() {}

/*
function initVideoSwiperView() {
	var swiper = new Swiper('.offerslidetab0', {
		slidesPerView: 'auto',
		// loop: true,
		spaceBetween: 0,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		slidesPerView: 4,
		watchSlidesProgress: true,
		// preventClicksPropagation: false,
		on: {
			setTranslate: function () {
				slides = this.slides
				for (i = 0; i < slides.length; i++) {
					// slide = slides.eq(i)
					// progress = slides[i].progress
					// //slide.html(progress.toFixed(2)); 看清楚progress是怎么变化的
					// slide.css({ background: '' })
					// slide.transform('') //清除样式
					// slide.transform(
					// 	'translate3d(0,-' + Math.abs(progress) * 10 + 'px, 0)'
					// )
				}
			},
			// click: function (swiper, event) {
			//   var realIdx = this.realIndex
			// 	console.log(realIdx, event)
			// },
		},
	})
}
*/

function initDetailSwiperView(perCount, endCallBack) {
	navigationSwiper = new Swiper('.navigation', {
		slidesPerView: perCount,
	})

	// var descSwiper = new Swiper('.offerslidetab3', {
	// 	direction: 'vertical',
	// 	slidesPerView: 1,
	// })

	mySwiper = new Swiper('.offerslidetab2', {
		direction: 'horizontal',
		speed: 800,
		slidesPerView: 1,
		controller: {
			control: navigationSwiper,
		},
		pagination: {
			el: '.swiper-pagination',
		},
		on: {
			// init: function (swiper) {
			// 	slide = this.slides.eq(0)
			// 	slide.addClass('ani-slide')
			// },
			// transitionStart: function () {
			// 	for (i = 0; i < this.slides.length; i++) {
			// 		slide = this.slides.eq(i)
			// 		slide.removeClass('ani-slide')
			// 	}
			// },
			transitionEnd: function () {
				// slide = this.slides.eq(this.activeIndex)
				// slide.addClass('ani-slide')
				if (endCallBack) {
					endCallBack(this.activeIndex)
				}
			},
		},
		// initDescSwiperView()
	})
	// mySwiper = new Swiper('.offerslidetab2', {
	// 	effect: 'coverflow',
	// 	slidesPerView: 3,
	// 	controller: {
	// 		control: navigationSwiper,
	// 	},
	// 	centeredSlides: true,
	// 	coverflowEffect: {
	// 		rotate: 30,
	// 		stretch: 10,
	// 		depth: 60,
	// 		modifier: 2,
	// 		slideShadows: false,
	// 	},
	// 	preventInteractionOnTransition: false,
	// 	slidesPerView: 1,
	// 	watchSlidesProgress: true,
	// 	pagination: {
	// 		el: '.swiper-pagination',
	// 		clickable: true,
	// 	},
	// 	on: {
	// 		// 结束
	// 		transitionEnd: function () {
	// 			// alert(this.activeIndex); //切换结束时，告诉我现在是第几个slide
	// 			if (endCallBack) {
	// 				endCallBack(this.activeIndex)
	// 			}
	// 		},
	// 	},
	// })
}
