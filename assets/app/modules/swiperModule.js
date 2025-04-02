import Swiper from '../../../node_modules/swiper/swiper-bundle.mjs'

export default function initializeSwiper(selector, options = {}) {
	const defaultOptions = {
		slidesPerView: 'auto',
		spaceBetween: 20,
		watchOverflow: false,
		loop: false,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		...options,
	}

	const swiperInstance = new Swiper(selector, defaultOptions)

	return swiperInstance
}
