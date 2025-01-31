class ContactUpdater {
	constructor({ cityElementsSelector, addressElementsSelector, phoneLinksSelector }) {
		this.citySelectionElements = document.querySelectorAll(cityElementsSelector)
		this.addressElements = document.querySelectorAll(addressElementsSelector)
		this.phoneLinks = document.querySelectorAll(phoneLinksSelector)

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
	}

	hideAllContactInfo() {
		this.addressElements.forEach(address => {
			address.classList.add('details-hidden')
		})
		this.phoneLinks.forEach(link => {
			link.classList.add('details-hidden')
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

	updateCityTextColor(selectedCity) {
		this.citySelectionElements.forEach(cityElement => {
			cityElement.style.color = ''
		})
		selectedCity.style.color = 'white'
	}

	showDefaultContactInfo() {
		const defaultCityId = 'moscow'
		this.showContactInfoForCity(defaultCityId)
		this.updateCityTextColor(document.getElementById(defaultCityId)) 
	}
}

export default ContactUpdater
