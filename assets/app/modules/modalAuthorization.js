class ModalAuthorization {
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

		this.emailInput = this.modalWindow.querySelector('input[type="email"]')
		this.passwordInput = this.modalWindow.querySelector(
			'input[type="password"]'
		)
		this.emailTooltip = this.modalWindow.querySelector('.email-tooltip')
		this.passwordTooltip = this.modalWindow.querySelector('.password-tooltip')

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
		this.clearTooltips()
	}

	validateForm() {
		const emailPattern =
			/^[a-zA-Z0-9._-]{1,64}@[a-zA-Z0-9.-]{1,253}\.[a-zA-Z]{2,6}$/
		const passwordPattern = /^[A-Za-z\d@$!%*?&]{8,20}$/

		let isValid = true

		if (!emailPattern.test(this.emailInput.value)) {
			this.emailTooltip.innerText = 'Введите правильный адрес почты'
			this.emailTooltip.style.display = 'block'
			isValid = false
		} else {
			this.emailTooltip.style.display = 'none'
		}

		if (
			this.passwordInput.value.length < 8 ||
			this.passwordInput.value.length > 20
		) {
			this.passwordTooltip.innerText =
				'Пароль должен содержать от 8 до 20 символов'
			this.passwordTooltip.style.display = 'block'
			isValid = false
		} else if (!passwordPattern.test(this.passwordInput.value)) {
			this.passwordTooltip.innerText = 'Введите правильный пароль'
			this.passwordTooltip.style.display = 'block'
			isValid = false
		} else {
			this.passwordTooltip.style.display = 'none'
		}

		return isValid
	}

	submitForm() {
		this.modalWindow.querySelector('.modal-form').submit() 
	}

	clearTooltips() {
		this.emailTooltip.style.display = 'none'
		this.passwordTooltip.style.display = 'none'
	}
}

export default ModalAuthorization
