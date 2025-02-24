class PopupArticle {
	constructor(articlesSelector, buttonSelectors) {
		this.articles = document.querySelectorAll(articlesSelector)
		this.buttons = this.getButtons(buttonSelectors)

		this.init()
	}

	getButtons(buttonSelectors) {
		const buttons = buttonSelectors.map(selector =>
			Array.from(document.querySelectorAll(selector))
		)
		return buttons.flat()
	}

	init() {
		this.buttons.forEach((button, index) => {
			if (button) {
				button.addEventListener('click', () => this.toggleArticle(index))
			}
		})
	}

	toggleArticle(index) {
		const correspondingIndex = this.getCorrespondingIndex(index)

		const isCurrentlyOpen = this.articles[index].classList.toggle(
			'popup-article__show'
		)

		this.articles[correspondingIndex].classList.toggle(
			'popup-article__show',
			isCurrentlyOpen
		)

		this.buttons[index].classList.toggle('popup-article__show', isCurrentlyOpen)
		this.buttons[correspondingIndex].classList.toggle(
			'popup-article__show',
			isCurrentlyOpen
		)
	}

	getCorrespondingIndex(index) {
		if (index < this.buttons.length / 2) {
			return index + this.buttons.length / 2
		} else {
			return index - this.buttons.length / 2
		}
	}
}

export default PopupArticle
