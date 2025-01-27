import StickyHeader from './modules/headerSticky.js'
import PopupHeader from './modules/popupHeader.js'
import CoverSlider from './modules/coverSlider.js'
import ProductSlider from './modules/productSlider.js'
import CitySelector from './modules/footerAddress.js'
import modalWindow from './modules/modalWindow.js'
import modalMessage from './modules/modalMessage.js'

document.addEventListener('DOMContentLoaded', () => {
	const modalRegistration = new modalWindow({
		modalWindowSelector: '.modal-registration',
		modalOpenButtonSelector: '.header-registration__btn',
		modalCloseButtonSelector: '.modal-close__btn',
		modalWrapperSelector: '.modal-overlay',
		phoneInputSelector: '.modal-input__phone',
	})

	const modalAutorization = new modalWindow({
		modalWindowSelector: '.modal-autorization',
		modalOpenButtonSelector: '.header-entrance__btn',
		modalCloseButtonSelector: ['.recovery-password', '.modal-close__btn'],
		modalWrapperSelector: '.modal-overlay',
	})

	const modalRecovery = new modalWindow({
		modalWindowSelector: '.modal-recovery',
		modalOpenButtonSelector: '.recovery-password',
		modalCloseButtonSelector: ['.modal-close__btn', '.modal-recovery__btn'],
		modalWrapperSelector: '.modal-overlay',
	})

	const modalMessages = new modalMessage({
		modalWindowSelector: '.modal-message',
		modalOpenButtonSelector: '.modal-recovery__btn',
		modalCloseButtonSelector: ['.modal-close__btn', '.modal-message__btn'],
		modalWrapperSelector: '.modal-overlay',
		formId: 'recovery-form',
	})

	const stickyHeader = new StickyHeader({
		stickyPointSelector: '.sticky',
		headerSelector: '.header',
	})

	const popupHeader = new PopupHeader({
		menuButtonId: 'header-nav__menu',
		popupId: 'popup-menu',
		buttonId: 'popup-btn',
		burgerIds: [
			'popup-burger--top',
			'popup-burger--middle',
			'popup-burger--bottom',
		],
		shadowMenu: '.popup-shadow',
	})

	const sliderCover = new CoverSlider({
		slidesSelector: '.slider-img',
		borderSelector: '.cover-slogan__border',
		sloganSelector: '.cover-slogan__title',
		numSelector: '.cover-slogan__num',
		controlsSelector: '.controls',
		controlsArrowSelector: '.cover-arrow',
		throbberSelector: '.cover-progressbar__item',
		hoverSelector: '.main-cover__content',
	})

	const productSlider = new ProductSlider({
		cardsSelector: '.products-services__item',
		nextButtonSelector: '.services-next',
		prevButtonSelector: '.services-prev',
		containerSelector: '.products-services__list',
	})

	function createContactInfo(address, phone) {
		return {
			address: address,
			phone: phone,
			phoneHref: `tel:${phone.replace(/[0-9]/g, '')}`,
		}
	}

	const citySelector = new CitySelector([
		{
			buttonId: 'moscow',
			contactInfo: createContactInfo(
				'Москва, ул. Воронцовская, д.20',
				'+7 (495) 787-95-99'
			),
		},
		{
			buttonId: 'krasnoyarsk',
			contactInfo: createContactInfo(
				'Красноярск, ул. имени Ленина, д.140',
				'+7 (391) 200-04-05'
			),
		},
		{
			buttonId: 'stavropol',
			contactInfo: createContactInfo(
				'Ставрополь, ул. Лермонтова, д.55',
				'+7 (8652) 34-34-34'
			),
		},
		{
			buttonId: 'all-country',
			contactInfo: createContactInfo(
				'Москва, ул. Воронцовская, д.20',
				'+7 (495) 787-95-99 доб.5521'
			),
		},
	])
})
