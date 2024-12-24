import PopupArticle from './modules/popupArticle.js'
import PopupHeader from './modules/popupHeader.js'
import CitySelector from './modules/footerAddress.js'
import StickyHeader from './modules/headerSticky.js'

document.addEventListener('DOMContentLoaded', () => {
	const stickyHeader = new StickyHeader({
		stickyPointSelector: '.sticky',
		headerSelector: '.header'
	})

	const popupCertificates = new PopupArticle(
		'.certificates-popup',
		'.main-certificates__item-content'
	)

	const popupNetwork = new PopupArticle(
		'.network-popup',
		'.main-network__item-content'
	)

	const popupHeader = new PopupHeader({
		menuButtonId: 'header-nav__menu',
		popupId: 'popup-menu',
		buttonId: 'popup-btn',
		burgerIds: [
			'popup-burger--top',
			'popup-burger--middle',
			'popup-burger--bottom',
		]
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
