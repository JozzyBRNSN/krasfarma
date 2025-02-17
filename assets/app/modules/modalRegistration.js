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

		this.usernameInput = this.modalWindow
			? this.modalWindow.querySelector('#username')
			: null
		this.emailInput = this.modalWindow
			? this.modalWindow.querySelector('input[type="email"]')
			: null
		this.addressInput = this.modalWindow
			? this.modalWindow.querySelector('#youAddress')
			: null
		this.phoneInput = this.modalWindow
			? this.modalWindow.querySelector('#phoneInput')
			: null
		this.checkbox = this.modalWindow
			? this.modalWindow.querySelector('#checkbox')
			: null

		this.usernameTooltip = this.modalWindow
			? this.modalWindow.querySelector('.username-tooltip')
			: null
		this.emailTooltip = this.modalWindow
			? this.modalWindow.querySelector('.email-tooltip')
			: null
		this.addressTooltip = this.modalWindow
			? this.modalWindow.querySelector('.address-tooltip')
			: null
		this.phoneTooltip = this.modalWindow
			? this.modalWindow.querySelector('.phone-tooltip')
			: null
		this.checkboxTooltip = this.modalWindow
			? this.modalWindow.querySelector('.checkbox-tooltip')
			: null

		this.init()
	}

	init() {
		if (this.modalOpenButton.length > 0) {
			this.modalOpenButton.forEach(openButton => {
				openButton.addEventListener('click', () => this.openModal())
			})
		}

		if (this.modalCloseButton.length > 0) {
			this.modalCloseButton.forEach(closeButton => {
				closeButton.addEventListener('click', () => this.closeModal())
			})
		}
	}

	openModal() {
		if (this.modalWindow && this.modalWrapper) {
			this.modalWindow.classList.add('open-modal')
			this.modalWrapper.classList.add('open-modal')
			document.body.classList.add('hidden')
		}
	}

	closeModal() {
		if (this.modalWindow && this.modalWrapper) {
			this.modalWindow.classList.remove('open-modal')
			this.modalWrapper.classList.remove('open-modal')
			document.body.classList.remove('hidden')
		}
	}

	validateForm() {
		if (!this.modalWindow) return false

		const emailPattern =
			/^[a-zA-Z0-9._-]{1,64}@[a-zA-Z0-9.-]{1,253}\.[a-zA-Z]{2,6}$/
		const usernamePattern = /^[A-Za-zА-Яа-яЁё\s\-]{3,50}$/
		const addressPattern = /^[A-Za-z0-9А-Яа-яЁё\s,.-]{5,100}$/

		let isValid = true

		if (this.emailInput && !emailPattern.test(this.emailInput.value)) {
			this.emailTooltip.style.display = 'block'
			isValid = false
		} else {
			this.emailTooltip.style.display = 'none'
		}

		if (this.usernameInput) {
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
		}

		if (this.addressInput && !addressPattern.test(this.addressInput.value)) {
			this.addressTooltip.style.display = 'block'
			isValid = false
		} else {
			this.addressTooltip.style.display = 'none'
		}

		if (this.phoneInput) {
			const phoneInputLength = this.phoneInput.value.replace(/\D/g, '').length
			if (phoneInputLength < 11) {
				this.phoneTooltip.style.display = 'block'
				isValid = false
			} else {
				this.phoneTooltip.style.display = 'none'
			}
		}

		if (this.checkbox) {
			if (!this.checkbox.checked) {
				this.checkboxTooltip.style.display = 'block'
				isValid = false
			} else {
				this.checkboxTooltip.style.display = 'none'
			}
		}

		return isValid
	}

	submitForm() {
		const form = this.modalWindow
			? this.modalWindow.querySelector('.modal-form')
			: null
		if (form) {
			form.submit()
		}
	}

	clearTooltips() {
		if (this.emailTooltip) this.emailTooltip.style.display = 'none'
		if (this.usernameTooltip) this.usernameTooltip.style.display = 'none'
		if (this.addressTooltip) this.addressTooltip.style.display = 'none'
		if (this.phoneTooltip) this.phoneTooltip.style.display = 'none'
		if (this.checkboxTooltip) this.checkboxTooltip.style.display = 'none'
	}
}

export default ModalRegistration
