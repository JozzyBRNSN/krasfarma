class ModalWindow {
	constructor({
		modalWindowSelector,
		modalOpenButtonSelector,
		modalCloseButtonSelector,
		modalWrapperSelector,
		checkboxSelector,
		submitButtonSelector,
	}) {
		this.modalWindow = document.querySelector(modalWindowSelector)
		this.modalOpenButton = document.querySelectorAll(modalOpenButtonSelector)
		this.modalCloseButton = document.querySelector(modalCloseButtonSelector)
		this.modalWrapper = document.querySelector(modalWrapperSelector)
		this.checkbox = document.querySelector(checkboxSelector)
		this.submitButton = document.querySelector(submitButtonSelector)

		this.init()
	}

	init() {
		this.modalOpenButton.forEach(button => {
			button.addEventListener('click', () => this.openModal())
		})
		this.modalCloseButton.addEventListener('click', () => this.closeModal())
		if (this.checkbox) {
			this.checkbox.addEventListener('change', () => this.toggleSubmitButton())
			this.toggleSubmitButton() // Инициализируем состояние кнопки при загрузке
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

	toggleSubmitButton() {
		if (this.checkbox) {
			this.submitButton.disabled = !this.checkbox.checked // Деактивируем кнопку, если чекбокс не нажат
		}
	}
}

export default ModalWindow
