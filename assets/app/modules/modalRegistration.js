class ModalRegistration {
	constructor({
		modalWindowSelector,
		modalOpenButtonSelector,
		modalCloseButtonSelector,
		modalWrapperSelector,
	}) {
		this.modalWindow = document.querySelector(modalWindowSelector)
		this.modalOpenButton = document.querySelectorAll(modalOpenButtonSelector)
		this.modalCloseButton = document.querySelectorAll(modalCloseButtonSelector)
		this.modalWrapper = document.querySelector(modalWrapperSelector)

		this.usernameInput = this.modalWindow.querySelector('#username')
		this.emailInput = this.modalWindow.querySelector('input[type="email"]')
		this.addressInput = this.modalWindow.querySelector('#youAddress')
		this.phoneInput = this.modalWindow.querySelector('#phoneInput')
		this.phoneInput = this.modalWindow.querySelector('#phoneInput')
		this.checkbox = this.modalWindow.querySelector('#checkbox')

		this.usernameTooltip = this.modalWindow.querySelector('.username-tooltip')
		this.emailTooltip = this.modalWindow.querySelector('.email-tooltip')
		this.addressTooltip = this.modalWindow.querySelector('.address-tooltip')
		this.phoneTooltip = this.modalWindow.querySelector('.phone-tooltip')
		this.checkboxTooltip = this.modalWindow.querySelector('.checkbox-tooltip')

		this.init()
	}

	init() {
		this.modalOpenButton.forEach(openButton => {
			openButton.addEventListener('click', () => this.openModal())
		})
		this.modalCloseButton.forEach(closeButton => {
			closeButton.addEventListener('click', () => this.closeModal())
		})

		this.modalWindow
			.querySelector('.modal-form')
			.addEventListener('submit', event => {
				event.preventDefault()
				if (this.validateForm()) {
					this.submitForm()
				}
			})
	}

	openModal() {
		this.modalWindow.classList.add('open-modal')
		this.modalWrapper.classList.add('open-modal')
		document.body.classList.add('hidden')
	}

	closeModal() {
		this.modalWindow.classList.remove('open-modal')
		this.modalWrapper.classList.remove('open-modal')
		document.body.classList.remove('hidden')
	}

	validateForm() {
		const emailPattern =
			/^[a-zA-Z0-9._-]{1,64}@[a-zA-Z0-9.-]{1,253}\.[a-zA-Z]{2,6}$/
		const usernamePattern = /^[A-Za-zА-Яа-яЁё\s\-]{3,50}$/
		const addressPattern = /^[A-Za-z0-9А-Яа-яЁё\s,.-]{5,100}$/

		let isValid = true

		if (!emailPattern.test(this.emailInput.value)) {
			this.emailTooltip.style.display = 'block'
			isValid = false
		} else {
			this.emailTooltip.style.display = 'none'
		}

		if (
			this.usernameInput.value.length < 3 ||
			this.usernameInput.value.length > 50
		) {
			this.usernameTooltip.innerText =
				'Имя пользователя должно содержать от 3 до 50 символов'
			this.usernameTooltip.style.display = 'block'
			isValid = false
		} else if (!usernamePattern.test(this.usernameInput.value)) {
			this.usernameTooltip.innerText = 'Введите правильный пароль'
			this.usernameTooltip.style.display = 'block'
			isValid = false
		} else {
			this.usernameTooltip.style.display = 'none'
		}

		if (!addressPattern.test(this.addressInput.value)) {
			this.addressTooltip.style.display = 'block'
			isValid = false
		} else {
			this.addressTooltip.style.display = 'none'
		}

		const phoneInputLength = this.phoneInput.value.replace(/\D/g, '').length
		if (phoneInputLength < 11) {
			this.phoneTooltip.style.display = 'block'
			isValid = false
		} else {
			this.phoneTooltip.style.display = 'none'
		}

		if (!this.checkbox.checked) {
			this.checkboxTooltip.style.display = 'block'
			isValid = false
		} else {
			this.checkboxTooltip.style.display = 'none'
		}

		return isValid
	}

	submitForm() {
		this.modalWindow.querySelector('.modal-form').submit()
	}

	clearTooltips() {
		this.emailTooltip.style.display = 'none'
		this.usernameTooltip.style.display = 'none'
		this.addressTooltip.style.display = 'none'
		this.phoneTooltip.style.display = 'none'
		this.checkboxTooltip.style.display = 'none'
	}
}

export default ModalRegistration
