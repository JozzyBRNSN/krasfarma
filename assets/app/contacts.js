import StickyHeader from './modules/headerSticky.js'
import PopupHeader from './modules/popupHeader.js'
import ContactUpdater from './modules/footerAddress.js'
import ModalRegistration from './modules/modalRegistration.js'
import ModalAuthorization from './modules/modalAuthorization.js'
import ModalRecovery from './modules/modalRecovery.js'
import modalMessage from './modules/modalMessage.js'
import DefaultPicture from './modules/defaultPicture.js'

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

	const defaultPicture = new DefaultPicture({
		placeholderImage: 'assets/img/default.png',
		mapContainerSelector: '.contacts-map',
	})

	const contactUpdater = new ContactUpdater({
		cityElementsSelector: '.places-item',
		addressElementsSelector: '.footer-address__link ',
		phoneLinksSelector: '.footer-phone__link',
	})
})
