class ModalWarning {
	constructor({
		modalWarningSelector,
		modalCloseButtonSelector,
		modalWrapperSelector,
	}) {
		this.modalWarning = document.querySelector(modalWarningSelector)
		this.modalCloseButton = document.querySelector(modalCloseButtonSelector)
		this.modalWrapper = document.querySelector(modalWrapperSelector)

		if (!this.modalWarning) {
			console.warn('Модальное окно предупреждения не найдено.')
		}
		if (!this.modalCloseButton) {
			console.warn('Кнопка закрытия модального окна не найдена.')
		}
		if (!this.modalWrapper) {
			console.warn('Обертка модального окна не найдена.')
		}

		this.init()
	}

	init() {
		if (this.modalCloseButton) {
			this.modalCloseButton.addEventListener('click', () => this.closeModal())
		}

		if (!sessionStorage.getItem('modalClosed')) {
			this.openModal()
		}
	}

	openModal() {
		if (this.modalWarning && this.modalWrapper) {
			this.modalWarning.classList.add('open-modal')
			this.modalWrapper.classList.add('open-modal')
			document.body.classList.add('hidden')
		}
	}

	closeModal() {
		if (this.modalWarning && this.modalWrapper) {
			this.modalWarning.classList.remove('open-modal')
			this.modalWrapper.classList.remove('open-modal')
			document.body.classList.remove('hidden')
			sessionStorage.setItem('modalClosed', 'true')
		}
	}
}

export default ModalWarning
