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
		this.nextModal = document.querySelector(nextModalSelector) // Следующее модальное окно

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

		const isSuccessful = true

		if (isSuccessful) {
			this.closeModal()
			if (this.nextModal) {
				this.openNextModal()
			}
		} else {
			alert('Ошибка при отправке формы. Пожалуйста, попробуйте еще раз.')
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
