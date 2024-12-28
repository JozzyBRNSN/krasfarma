class PopupHeader {
	constructor({ menuButtonId, popupId, buttonId, burgerIds, shadowMenu }) {
		this.menuButton = this.getElementByIdWithCheck(menuButtonId)
		this.popupMenu = this.getElementByIdWithCheck(popupId)
		this.popupButton = this.getElementByIdWithCheck(buttonId)
		this.burgerElements = burgerIds.map(id => this.getElementByIdWithCheck(id))
		this.shadowMenu = document.querySelectorAll(shadowMenu)

		this.init()
	}

	getElementByIdWithCheck(id) {
		const element = document.getElementById(id)
		if (!element) {
			console.warn(`Элемент "${id}" не найден.`)
		}
		return element
	}

	init() {
		if (this.menuButton) {
			this.menuButton.addEventListener('click', () => this.toggleMenu())
		} else {
			console.warn('Элемент не существует.')
		}
	}

	toggleMenu() {
		if (this.popupMenu) {
			if (this.popupMenu.classList.contains('popup-show')) {
				this.popupMenu.classList.remove('popup-show')
			} else {
				this.popupMenu.scrollTop = 0
				this.popupMenu.classList.add('popup-show')
			}
		}

		this.shadowMenu.forEach(shadow => shadow.classList.toggle('popup-show'))
		document.body.classList.toggle('hidden')

		if (this.popupButton) {
			this.popupButton.classList.toggle('header-btn--hide')
		}

		this.burgerElements.forEach(burger => {
			if (burger) {
				burger.classList.toggle('popup-burger')
			}
		})
	}
}

export default PopupHeader
