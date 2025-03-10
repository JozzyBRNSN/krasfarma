import PopupArticle from './modules/popupArticle.js'
import PopupHeader from './modules/popupHeader.js'
import ContactUpdater from './modules/footerAddress.js'
import StickyHeader from './modules/headerSticky.js'
import ModalRegistration from './modules/modalRegistration.js'
import ModalAuthorization from './modules/modalAuthorization.js'
import ModalRecovery from './modules/modalRecovery.js'
import modalMessage from './modules/modalMessage.js'
import NumberCounter from './modules/numberCounter.js'
import DraggableScroll from './modules/draggableScroll.js'

document.addEventListener('DOMContentLoaded', () => {
	const counters = document.querySelectorAll('.main-cover__num')
	const numberCounter = new NumberCounter(counters)
	numberCounter.startCounting()

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

	const popupMission = new PopupArticle({
		articlesSelector: '.about - mission__popup',
		buttonSelector: '.mission - btn',
	})

	const popupValues = new PopupArticle({
		articlesSelector: '.about-values__popup',
		buttonSelector: '.values-btn',
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

	const draggableScroll = new DraggableScroll('.about-history__timeline')

	const contactUpdater = new ContactUpdater({
		cityElementsSelector: '.places-item',
		addressElementsSelector: '.footer-address__link ',
		phoneLinksSelector: '.footer-phone__link',
	})

	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault()
			const targetId = this.getAttribute('href').substring(1)
			const targetElement = document.getElementById(targetId)

			if (targetElement) {
				targetElement.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
				})
			}
		})
	})
})
