class ContactUpdater {
	constructor({
		cityElementsSelector,
		addressElementsSelector,
		phoneLinksSelector,
		mapAddressSelector,
		mapPhoneSelector,
		mapIframeSelectors,
	}) {
		this.citySelectionElements = document.querySelectorAll(cityElementsSelector)
		this.addressElements = document.querySelectorAll(addressElementsSelector)
		this.phoneLinks = document.querySelectorAll(phoneLinksSelector)
		this.mapAddressElements = document.querySelectorAll(mapAddressSelector)
		this.mapPhoneElements = document.querySelectorAll(mapPhoneSelector)
		this.mapIframes = document.querySelectorAll(mapIframeSelectors) // Массив всех iframe для карты

		this.init()
		this.showDefaultContactInfo()
	}

	init() {
		this.citySelectionElements.forEach(cityElement => {
			cityElement.addEventListener('click', () => {
				this.updateContactInfo(cityElement)
			})
		})
	}

	updateContactInfo(cityElement) {
		const cityId = cityElement.id
		this.hideAllContactInfo()
		this.showContactInfoForCity(cityId)
		this.updateCityTextColor(cityElement)
		this.updateMapContactInfo(cityId)
		this.updateMapIframes(cityId)
	}

	hideAllContactInfo() {
		this.addressElements.forEach(address => {
			address.classList.add('details-hidden')
		})
		this.phoneLinks.forEach(link => {
			link.classList.add('details-hidden')
		})
		this.mapAddressElements.forEach(address => {
			address.classList.add('details-hidden')
		})
		this.mapPhoneElements.forEach(link => {
			link.classList.add('details-hidden')
		})
		this.mapIframes.forEach(iframe => {
			iframe.classList.add('details-hidden') // Скрываем все iframe
		})
	}

	showContactInfoForCity(cityId) {
		const selectedAddress = document.querySelector(`#${cityId}-address`)
		const selectedPhone = document.querySelector(`#${cityId}-phone`)

		if (selectedAddress) {
			selectedAddress.classList.remove('details-hidden')
		}
		if (selectedPhone) {
			selectedPhone.classList.remove('details-hidden')
		}
	}

	updateMapContactInfo(cityId) {
		const selectedMapAddress = document.querySelector(`.${cityId}-map-address`)
		const selectedMapPhone = document.querySelector(`.${cityId}-map-phone`)

		if (selectedMapAddress) {
			selectedMapAddress.classList.remove('details-hidden')
		}
		if (selectedMapPhone) {
			selectedMapPhone.classList.remove('details-hidden')
		}
	}

	updateMapIframes(cityId) {
		this.mapIframes.forEach(iframe => {
			iframe.classList.add('details-hidden') // Скрываем все iframe
		})

		const selectedIframe = document.getElementById(`${cityId}-map`)
		if (selectedIframe) {
			selectedIframe.classList.remove('details-hidden') // Показываем iframe для выбранного города
		}
	}

	updateCityTextColor(selectedCity) {
		this.citySelectionElements.forEach(cityElement => {
			cityElement.style.color = ''
		})
		selectedCity.style.color = 'white'
	}

	showDefaultContactInfo() {
		const defaultCityId = this.citySelectionElements[0].id
		this.showContactInfoForCity(defaultCityId)
		this.updateCityTextColor(document.getElementById(defaultCityId))
		this.updateMapContactInfo(defaultCityId)
		this.updateMapIframes(defaultCityId)
	}
}

export default ContactUpdater


const contactUpdater = new ContactUpdater({
	cityElementsSelector: '.places-item',
	addressElementsSelector: '.footer-address__link',
	phoneLinksSelector: '.footer-phone__link',
	mapAddressSelector: '.map-contacts__address-item',
	mapPhoneSelector: '.map-contacts__phone-item',
	mapIframeSelectors: '.map iframe', 
})
