class ModalRecovery {
	constructor({
		modalWindowSelector,
		modalOpenButtonSelector,
		modalCloseButtonSelector,
		modalWrapperSelector,
		nextModalSelector,
		prevModalSelector,
		prevModalButtonSelector,
	}) {
		this.modalWindow = document.querySelector(modalWindowSelector)
		this.modalOpenButton = document.querySelectorAll(modalOpenButtonSelector)
		this.modalCloseButton = document.querySelectorAll(modalCloseButtonSelector)
		this.modalWrapper = document.querySelector(modalWrapperSelector)
		this.nextModal = document.querySelector(nextModalSelector)
		this.prevModal = document.querySelector(prevModalSelector)
		this.prevModalButton = document.querySelector(prevModalButtonSelector)

		if (this.modalWindow) {
			this.emailInput = this.modalWindow.querySelector('input[type="email"]')
			this.emailTooltip = this.modalWindow.querySelector('.recovery-tooltip')
		} else {
			this.emailInput = null
			this.emailTooltip = null
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

		if (this.prevModalButton) {
			this.prevModalButton.addEventListener('click', event => {
				event.preventDefault()
				this.openPrevModal()
			})
		} else {
			console.warn('Кнопка перехода к предыдущему модальному окну не найдена.')
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

	openNextModal() {
		if (this.nextModal) {
			this.closeModal()
			this.nextModal.classList.add('send-message')
			this.modalWrapper.classList.add('open-modal')
			document.body.classList.add('hidden')
		}
	}

	openPrevModal() {
		if (this.prevModal) {
			this.closeModal()
			this.prevModal.classList.add('open-modal')
			this.modalWrapper.classList.add('open-modal')
			document.body.classList.add('hidden')
		}
	}

	validateEmail() {
		if (!this.emailInput || !this.emailTooltip) {
			console.warn('Элементы для валидации электронной почты не найдены.')
			return false
		}

		const emailPattern =
			/^[a-zA-Z0-9._-]{1,64}@[a-zA-Z0-9.-]{1,253}\.[a-zA-Z]{2,6}$/

		if (!emailPattern.test(this.emailInput.value)) {
			this.emailTooltip.innerText = 'Введите правильный адрес почты'
			this.emailTooltip.style.display = 'block'
			return false
		} else {
			this.emailTooltip.style.display = 'none'
			return true
		}
	}
}

export default ModalRecovery
