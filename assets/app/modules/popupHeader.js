class PopupHeader {
	constructor({
		menuButtonId,
		popupId,
		buttonId,
		burgerIds,
		shadowMenu,
		popupLinkSelectors,
	}) {
		this.menuButton = this.getElementByIdWithCheck(menuButtonId)
		this.popupMenu = this.getElementByIdWithCheck(popupId)
		this.popupButton = this.getElementByIdWithCheck(buttonId)
		this.burgerElements = burgerIds.map(id => this.getElementByIdWithCheck(id))
		this.shadowMenu = document.querySelectorAll(shadowMenu)
		this.popupLinks = document.querySelectorAll(popupLinkSelectors)

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

		this.shadowMenu.forEach(shadow => {
			shadow.addEventListener('click', () => this.closeMenu())
    })
    
    this.popupLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMenu())
    })
	}

	toggleMenu() {
		if (this.popupMenu.classList.contains('popup-show')) {
			this.closeMenu()
		} else {
			this.openMenu()
		}
	}

	openMenu() {
		if (this.popupMenu) {
			this.popupMenu.scrollTop = 0
			this.popupMenu.classList.add('popup-show')
			document.body.classList.add('hidden')
		}

		this.shadowMenu.forEach(shadow => {
			shadow.classList.add('popup-show')
		})

		if (this.popupButton) {
			this.popupButton.classList.add('header-btn--hide')
		}

		this.burgerElements.forEach(burger => {
			if (burger) {
				burger.classList.add('popup-burger')
			}
		})
	}

	closeMenu() {
		if (this.popupMenu) {
			this.popupMenu.classList.remove('popup-show')
		}

		this.shadowMenu.forEach(shadow => {
			shadow.classList.remove('popup-show')
		})
		document.body.classList.remove('hidden')

		if (this.popupButton) {
			this.popupButton.classList.remove('header-btn--hide')
		}

		this.burgerElements.forEach(burger => {
			if (burger) {
				burger.classList.remove('popup-burger')
			}
		})
	}
}

export default PopupHeader