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

		if (this.modalWindow) {
			this.emailInput = this.modalWindow.querySelector('input[type="email"]')
			this.passwordInput = this.modalWindow.querySelector(
				'input[type="password"]'
			)
			this.emailTooltip = this.modalWindow.querySelector('.email-tooltip')
			this.passwordTooltip = this.modalWindow.querySelector('.password-tooltip')
		} else {
			this.emailInput = null
			this.passwordInput = null
			this.emailTooltip = null
			this.passwordTooltip = null
			console.warn('Модальное окно не найдено.')
		}

		this.init()
	}

	init() {
		if (this.modalOpenButton.length > 0) {
			this.modalOpenButton.forEach(openButton => {
				openButton.addEventListener('click', () => this.openModal())
			})
		} else {
			console.warn('Кнопки открытия модального окна не найдены.')
		}

		if (this.modalCloseButton.length > 0) {
			this.modalCloseButton.forEach(closeButton => {
				closeButton.addEventListener('click', () => this.closeModal())
			})
		} else {
			console.warn('Кнопки закрытия модального окна не найдены.')
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
			this.clearTooltips()
		}
	}

	validateForm() {
		if (
			!this.emailInput ||
			!this.passwordInput ||
			!this.emailTooltip ||
			!this.passwordTooltip
		) {
			console.warn('Не все элементы формы доступны для валидации.')
			return false
		}

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

	clearTooltips() {
		if (this.emailTooltip) this.emailTooltip.style.display = 'none'
		if (this.passwordTooltip) this.passwordTooltip.style.display = 'none'
	}
}

export default ModalAuthorization
