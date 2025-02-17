class ModalMessage {
	constructor({
		modalWindowSelector,
		modalCloseButtonSelector,
		modalWrapperSelector,
	}) {
		this.modalWindow = document.querySelector(modalWindowSelector)
		this.modalCloseButton = document.querySelectorAll(modalCloseButtonSelector)
		this.modalWrapper = document.querySelector(modalWrapperSelector)

		this.init()
	}

	init() {
		if (this.modalCloseButton.length > 0) {
			this.modalCloseButton.forEach(closeButton => {
				closeButton.addEventListener('click', () => this.closeModal())
			})
		}
	}

	closeModal() {
		if (this.modalWindow && this.modalWrapper) {
			this.modalWindow.classList.remove('send-message')
			this.modalWrapper.classList.remove('open-modal')
			document.body.classList.remove('hidden')
		}
	}
}

export default ModalMessage
