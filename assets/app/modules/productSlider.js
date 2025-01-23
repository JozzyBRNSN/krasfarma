class ProductSlider {
	constructor({
		containerSelector,
		cardsSelector,
		prevButtonSelector,
		nextButtonSelector,
	}) {
		this.sliderContainer = document.querySelector(containerSelector)
		this.cards = document.querySelectorAll(cardsSelector)
		this.totalCards = this.cards.length
		this.cardWidth = 275
		this.cardMargin = 20
		this.currentIndex = 0

		this.prevButton = document.querySelector(prevButtonSelector)
		this.nextButton = document.querySelector(nextButtonSelector)

		this.prevButton.addEventListener('click', () => this.moveToPrevious())
		this.nextButton.addEventListener('click', () => this.moveToNext())

		this.updateButtonState()
		window.addEventListener('resize', () => this.updateButtonState())
	}

	moveToPrevious() {
		if (this.currentIndex > 0) {
			this.currentIndex--
			this.updateSliderPosition()
		}
	}

	moveToNext() {
		if (
			this.currentIndex <
			Math.ceil((this.totalCards - this.cardsToShow) / (this.cardsToShow - 1))
		) {
			this.currentIndex++
			this.updateSliderPosition()
		}
	}

	updateSliderPosition() {
		this.sliderContainer.style.transform = `translateX(-${
			this.currentIndex * ((this.cardWidth + this.cardMargin))
		}px)`
		this.updateButtonState()
	}

	updateButtonState() {
		if (window.innerWidth > 1440) this.cardsToShow = 4
		if (window.innerWidth < 1440) this.cardsToShow = 3
		if (window.innerWidth < 945) this.cardsToShow = 2
		if (window.innerWidth < 610) this.cardsToShow = 1

		this.prevButton.disabled = this.currentIndex === 0

		const maxIndex = Math.ceil(
			(this.totalCards - this.cardsToShow) / (this.cardsToShow - 1)
		)
		const minIndex = Math.ceil(
			(this.totalCards - this.cardsToShow) / this.cardsToShow
		)
		this.nextButton.disabled = this.currentIndex >= maxIndex
		if (this.cardsToShow === 1)
			this.nextButton.disabled = this.currentIndex >= minIndex
	}
}

export default ProductSlider
