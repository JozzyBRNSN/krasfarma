class ModalRecovery {
	constructor({
		modalWindowSelector,
		modalOpenButtonSelector,
		modalCloseButtonSelector,
		modalWrapperSelector,
		nextModalSelector,
	}) {
		this.modalWindow = document.querySelector(modalWindowSelector)
		this.modalOpenButton = document.querySelectorAll(modalOpenButtonSelector)
		this.modalCloseButton = document.querySelectorAll(modalCloseButtonSelector)
		this.modalWrapper = document.querySelector(modalWrapperSelector)
		this.nextModal = document.querySelector(nextModalSelector)

		this.emailInput = this.modalWindow.querySelector('input[type="email"]')
		this.emailTooltip = this.modalWindow.querySelector('.recovery-tooltip')

		this.init()
	}

	init() {
		this.modalOpenButton.forEach(openButton => {
			openButton.addEventListener('click', () => this.openModal())
		})
		this.modalCloseButton.forEach(closeButton => {
			closeButton.addEventListener('click', () => this.closeModal())
		})

		const form = this.modalWindow.querySelector('form')
		if (form) {
			form.addEventListener('submit', event => this.handleFormSubmit(event))
		}
	}

	handleFormSubmit(event) {
		event.preventDefault()

		if (this.validateEmail()) {
			const form = event.target 

			this.closeModal() 
			if (this.nextModal) {
				this.openNextModal()
			}
		}
	}

	validateEmail() {
		const emailPattern =
			/^[a-zA-Z0-9._-]{1,64}@[a-zA-Z0-9.-]{1,253}\.[a-zA-Z]{2,6}$/

		if (!emailPattern.test(this.emailInput.value)) {
			this.emailTooltip.innerText = 'Введите правильную почту'
			this.emailTooltip.style.display = 'block'
			return false
		} else {
			this.emailTooltip.style.display = 'none' 
			return true
		}
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

	openNextModal() {
		if (this.nextModal) {
			this.nextModal.classList.add('send-message')
			this.modalWrapper.classList.add('open-modal')
			document.body.classList.add('hidden')
		}
	}
}

export default ModalRecovery
