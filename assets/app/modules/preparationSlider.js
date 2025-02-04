class PreparationSlider {
	constructor({
		containerSelector,
		itemsSelector,
		prevButtonSelector,
		nextButtonSelector,
		cardMargin,
	}) {
		this.container = document.querySelector(containerSelector)
		this.items = document.querySelectorAll(itemsSelector)
		this.prevButtons = document.querySelectorAll(prevButtonSelector)
		this.nextButtons = document.querySelectorAll(nextButtonSelector)

		this.cardMargin = cardMargin
		this.currentIndex = 0
		this.totalCards = this.items.length

		this.updateCardsToShow()
		this.updateButtonState()
		this.updateSliderPosition()

		this.prevButtons.forEach(prev =>
			prev.addEventListener('click', () => this.moveToPrevious())
		)
		this.nextButtons.forEach(next =>
			next.addEventListener('click', () => this.moveToNext())
		)

		window.addEventListener('resize', () => {
			this.updateCardsToShow()
			this.updateSliderPosition()
			this.updateButtonState()
		})
	}

	updateCardsToShow() {
		const windowWidth = window.innerWidth

		if (windowWidth < 426) {
			this.cardsToShow = 4
		} else if (windowWidth >= 723 && windowWidth < 900) {
			this.cardsToShow = 1
		} else if (windowWidth >= 1248 && windowWidth < 1440) {
			this.cardsToShow = 2
		} else if (windowWidth >= 1440) {
			this.cardsToShow = 3
		} else {
			const cardWidth = this.items[0].offsetWidth
			this.cardsToShow = Math.floor(
				(this.container.clientWidth + this.cardMargin) /
					(cardWidth + this.cardMargin)
			)
		}
	}

	moveToPrevious() {
		if (this.currentIndex > 0) {
			this.currentIndex--
			this.updateSliderPosition()
			this.updateButtonState()
		}
	}

	moveToNext() {
		if (this.currentIndex < this.totalCards - this.cardsToShow) {
			this.currentIndex++
			this.updateSliderPosition()
			this.updateButtonState()
		} else {
			this.currentIndex = Math.max(0, this.totalCards - this.cardsToShow)
			this.updateSliderPosition()
			this.updateButtonState()
		}
	}

	updateSliderPosition() {
		const cardWidth = this.items[0].offsetWidth
		const offset = this.currentIndex * (cardWidth + this.cardMargin)
		this.container.style.transform = `translateX(-${offset}px)`
	}

	updateButtonState() {
		this.prevButtons.forEach(
			button => (button.disabled = this.currentIndex === 0)
		)
		this.nextButtons.forEach(
			button =>
				(button.disabled =
					this.currentIndex >= this.totalCards - this.cardsToShow)
		)
	}
}

export default PreparationSlider
