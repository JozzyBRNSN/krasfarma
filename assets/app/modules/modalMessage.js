class ModalMessage {
	constructor({
		modalWindowSelector,
		modalOpenButtonSelector,
		modalCloseButtonSelector,
		modalWrapperSelector,
		formId,
	}) {
		this.modalWindow = document.querySelector(modalWindowSelector)
		this.modalOpenButton = document.querySelector(modalOpenButtonSelector)
		this.modalCloseButton = document.querySelectorAll(modalCloseButtonSelector) // Изменено на querySelectorAll
		this.modalWrapper = document.querySelector(modalWrapperSelector)
		this.form = document.getElementById(formId)

		this.init()
	}

	init() {
		this.modalOpenButton.addEventListener('click', e => this.handleOpenModal(e))

		this.modalCloseButton.forEach(closeButton => {
			closeButton.addEventListener('click', () => this.closeModal())
		})
	}

	handleOpenModal(event) {
		event.preventDefault()
		if (this.isFormFilled()) {
			this.openModal()
		} else {
			alert(
				'Пожалуйста, заполните все поля формы перед открытием следующего окна.'
			)
		}
	}

	isFormFilled() {
		const inputs = this.form.querySelectorAll('input, textarea')
		let allFieldsFilled = true

		inputs.forEach(input => {
			if (!input.value) {
				allFieldsFilled = false
			}
		})

		return allFieldsFilled
	}

	openModal() {
		this.modalWindow.classList.add('send-message')
		this.modalWrapper.classList.add('open-modal')
		document.body.classList.add('hidden')
	}

	closeModal() {
		this.modalWindow.classList.remove('send-message')
		this.modalWrapper.classList.remove('open-modal')
		document.body.classList.remove('hidden')
		console.log('Modal closed') // Для проверки, что метод вызывается
	}
}

export default ModalMessage
