import StickyHeader from './modules/headerSticky.js'
import PopupHeader from './modules/popupHeader.js'
import ContactUpdater from './modules/footerAddress.js'
import ModalRegistration from './modules/modalRegistration.js'
import ModalAuthorization from './modules/modalAuthorization.js'
import ModalRecovery from './modules/modalRecovery.js'
import modalMessage from './modules/modalMessage.js'
import ModalWarning from './modules/modalWarning.js'
import PreparationCard from './modules/preparationCard.js'

document.addEventListener('DOMContentLoaded', () => {
	const stickyHeader = new StickyHeader({
		stickyPointSelector: '.sticky',
		headerSelector: '.header',
	})

	const modalRegistration = new ModalRegistration({
		modalWindowSelector: '.modal-registration',
		modalOpenButtonSelector: '.header-registration__btn',
		modalCloseButtonSelector: '.modal-close__btn',
		modalWrapperSelector: '.modal-overlay',
	})

	const modalAuthorization = new ModalAuthorization({
		modalWindowSelector: '.modal-authorization',
		modalOpenButtonSelector: '.header-entrance__btn',
		modalCloseButtonSelector: ['.recovery-password', '.modal-close__btn'],
		modalWrapperSelector: '.modal-overlay',
	})

	const modalRecovery = new ModalRecovery({
		modalWindowSelector: '.modal-recovery',
		modalOpenButtonSelector: '.recovery-password',
		modalCloseButtonSelector: '.modal-close__btn',
		modalWrapperSelector: '.modal-overlay',
		nextModalSelector: '.modal-message',
		prevModalSelector: '.modal-authorization',
		prevModalButtonSelector: '.modal-back__btn',
	})

	const modalMessages = new modalMessage({
		modalWindowSelector: '.modal-message',
		modalCloseButtonSelector: ['.modal-close__btn', '.modal-message__btn'],
		modalWrapperSelector: '.modal-overlay',
		formId: '#recovery-form',
	})

	const modalWarning = new ModalWarning({
		modalWarningSelector: '.modal-warning',
		modalCloseButtonSelector: '.modal-сonfirmation__btn',
		modalWrapperSelector: '.modal-overlay',
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
		popupLinkSelectors: '.popup-link',
	})

	const card = new PreparationCard({
		cardSelector: '.preparation-about__card',
		cardListSelector: '.preparation-about__card-list li',
		cardMainSelector: '.preparation-about__card-main',
	})

	const contactUpdater = new ContactUpdater({
		cityElementsSelector: '.places-item',
		addressElementsSelector: '.footer-address__link',
		phoneLinksSelector: '.footer-phone__link',
	})

	const swiperOther = new Swiper('.swiper', {
		slidesPerView: 'auto',
		spaceBetween: 40,
		watchOverflow: false,
		loop: false,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	})

	const swiperCard = new Swiper('.swiper-card', {
		slidesPerView: 'auto',
		spaceBetween: 40,
		watchOverflow: false,
		loop: false,
		navigation: {
			nextEl: '.swiper-card-button-next',
			prevEl: '.swiper-card-button-prev',
		},
		direction: 'vertical',
		breakpoints: {
			978: {
				direction: 'vertical',
			},
			725: {
				direction: 'horizontal',
			},
			441: {
				direction: 'vertical',
			},
			0: {
				direction: 'horizontal',
			},
		},
	})
})
