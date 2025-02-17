class ModalShare {
	constructor({
		modalWindowSelector,
		modalOpenButtonSelector,
		modalCloseButtonSelector,
		modalWrapperSelector,
	}) {
		this.modalWindow = document.querySelector(modalWindowSelector)
		this.modalOpenButton = document.querySelector(modalOpenButtonSelector)
		this.modalCloseButton = document.querySelector(modalCloseButtonSelector)
		this.modalWrapper = document.querySelector(modalWrapperSelector)

		this.init()
	}

	init() {
		if (!this.modalOpenButton) {
			console.warn('Не удалось найти элемент для открытия модального окна.')
			return
		}

		if (!this.modalCloseButton) {
			console.warn('Не удалось найти элемент для закрытия модального окна.')
			return
		}

		if (!this.modalWindow) {
			console.warn('Не удалось найти модальное окно.')
			return
		}

		if (!this.modalWrapper) {
			console.warn('Не удалось найти обертку модального окна.')
			return
		}

		// Добавление слушателей событий
		this.modalOpenButton.addEventListener('click', () => this.openModal())
		this.modalCloseButton.addEventListener('click', () => this.closeModal())
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

export default ModalShare
