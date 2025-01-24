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

		this.startX = 0
		this.endX = 0
		this.startY = 0
		this.endY = 0
		this.sliderContainer.addEventListener('touchstart', e =>
			this.handleTouchStart(e)
		)
		this.sliderContainer.addEventListener('touchmove', e =>
			this.handleTouchMove(e)
		)
		this.sliderContainer.addEventListener('touchend', () =>
			this.handleTouchEnd()
		)
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
			this.currentIndex * (this.cardWidth + this.cardMargin)
		}px)`
		this.updateButtonState()
	}

	updateButtonState() {
		if (window.innerWidth > 1440) this.cardsToShow = 4
		if (window.innerWidth < 1440 && window.innerWidth >= 425)
			this.cardsToShow = 3
		if (window.innerWidth < 425) {
			this.prevButton.style.display = 'none'
			this.nextButton.style.display = 'none'
			this.cardsToShow = 1
		}
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

	handleTouchStart(e) {
		this.startX = e.touches[0].clientX
		this.startY = e.touches[0].clientY
	}

	handleTouchMove(e) {
		this.endX = e.touches[0].clientX
		this.endY = e.touches[0].clientY
	}

	handleTouchEnd() {
		const deltaX = this.endX - this.startX
		const deltaY = this.endY - this.startY


		if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
			if (deltaX < 0) {
				this.moveToNext() 
			} else {
				this.moveToPrevious() 
			}
		}
	}
}

export default ProductSlider
