class ModalRegistration {
	constructor({
		modalWindowSelector,
		modalOpenButtonSelector,
		modalCloseButtonSelector,
		modalWrapperSelector,
		submitButtonSelector,
		checkboxSelector,
	}) {
		this.modalWindow = document.querySelector(modalWindowSelector)
		this.modalOpenButton = document.querySelectorAll(modalOpenButtonSelector)
		this.modalCloseButton = document.querySelectorAll(modalCloseButtonSelector)
		this.modalWrapper = document.querySelector(modalWrapperSelector)
		this.submitButton = document.querySelector(submitButtonSelector)
		this.checkbox = document.querySelector(checkboxSelector)

		this.init()
	}

	init() {
		this.modalOpenButton.forEach(openButton => {
			openButton.addEventListener('click', () => this.openModal())
		})
		this.modalCloseButton.forEach(closeButton => {
			closeButton.addEventListener('click', () => this.closeModal())
		})

		this.updateSubmitButtonState()

		const customCheckbox = document.querySelector('.modal-label__checkbox')
		if (customCheckbox) {
			customCheckbox.addEventListener('click', () => this.toggleCheckbox())
		}
	}

	toggleCheckbox() {
		const isChecked = this.checkbox.checked
		this.checkbox.checked = !isChecked
		this.updateSubmitButtonState()
	}

	updateSubmitButtonState() {
		if (this.submitButton) {
			this.submitButton.disabled = !this.checkbox.checked 
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
}

export default ModalRegistration
