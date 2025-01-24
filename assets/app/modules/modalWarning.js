class ModalWarning {
	constructor({
		modalWarningSelector,
		modalCloseButtonSelector,
		modalWrapperSelector,
	}) {
		this.modalWarning = document.querySelector(modalWarningSelector)
		this.modalCloseButton = document.querySelector(modalCloseButtonSelector)
		this.modalWrapper = document.querySelector(modalWrapperSelector)

		this.init()
	}

	init() {
		this.modalCloseButton.addEventListener('click', () => this.closeModal())

		if (!sessionStorage.getItem('modalClosed')) {
			this.openModal()
		}
	}

	openModal() {
		this.modalWarning.classList.add('open-modal')
		this.modalWrapper.classList.add('open-modal')
		document.body.classList.add('hidden')
	}

	closeModal() {
		this.modalWarning.classList.remove('open-modal')
		this.modalWrapper.classList.remove('open-modal')
		document.body.classList.remove('hidden')
		sessionStorage.setItem('modalClosed', 'true')
	}
}

export default ModalWarning
