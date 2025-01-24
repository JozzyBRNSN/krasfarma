class PopupArticle {
	constructor(articlesSelector, buttonSelector) {
		this.articles = document.querySelectorAll(articlesSelector)
		this.buttons = document.querySelectorAll(buttonSelector)

		this.init()
	}

	init() {
		this.buttons.forEach((button, index) => {
			if (button) {
				button.addEventListener('click', () => this.toggleArticle(index))
			}
		})
	}

	toggleArticle(index) {
		this.articles[index].classList.toggle('popup-article__show')
		this.buttons[index].classList.toggle('popup-article__show')
	}
}

export default PopupArticle
