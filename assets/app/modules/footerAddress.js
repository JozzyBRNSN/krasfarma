class ContactInfo {
	constructor(addressId, phoneId) {
		this.addressElement = document.getElementById(addressId)
		this.phoneElement = document.getElementById(phoneId)
	}

	updateContactInfo(address, phoneNumber, phoneHref) {
		this.addressElement.textContent = address
		this.phoneElement.textContent = phoneNumber
		this.phoneElement.setAttribute('href', phoneHref)
	}
}

class CitySelector {
	constructor(cityButtonsConfig) {
		this.lastSelectedButton = null
		this.firstButtonElement = null
		cityButtonsConfig.forEach(({ buttonId, contactInfo }, index) => {
			const buttonElement = document.getElementById(buttonId)

			if (index === 0) {
				this.firstButtonElement = buttonElement
				buttonElement.style.color = '#f5f8fc'
				const contactInfoInstance = new ContactInfo('address', 'phone')
				contactInfoInstance.updateContactInfo(
					contactInfo.address,
					contactInfo.phone,
					contactInfo.phoneHref
				)
			}
			buttonElement.addEventListener('click', () => {
				const contactInfoInstance = new ContactInfo('address', 'phone')
				contactInfoInstance.updateContactInfo(
					contactInfo.address,
					contactInfo.phone,
					contactInfo.phoneHref
				)

				if (
					this.lastSelectedButton &&
					this.lastSelectedButton !== buttonElement
				) {
					this.lastSelectedButton.style.color = ''
				}

				if (
					this.firstButtonElement &&
					this.firstButtonElement !== buttonElement
				) {
					this.firstButtonElement.style.color = ''
				}

				buttonElement.style.color = '#f5f8fc'

				this.lastSelectedButton = buttonElement
			})
		})
	}
}

export default CitySelector
