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
		this.cardMargin = 13
		this.currentIndex = 0

		this.prevButton = document.querySelector(prevButtonSelector)
		this.nextButton = document.querySelector(nextButtonSelector)

		this.prevButton.addEventListener('click', () => this.moveToPrevious())
		this.nextButton.addEventListener('click', () => this.moveToNext())

		this.updateButtonState()
		window.addEventListener('resize', () => this.updateButtonState())

		this.startX = 0
		this.endX = 0

		this.handleTouchStart = this.handleTouchStart.bind(this)
		this.handleTouchMove = this.handleTouchMove.bind(this)
		this.handleTouchEnd = this.handleTouchEnd.bind(this)

		this.setupResizeObserver()
		this.updateSwipeListeners()
	}

	moveToPrevious() {
		if (this.currentIndex > 0) {
			this.currentIndex--
			this.updateSliderPosition()
		}
	}

	moveToNext() {
		if (this.currentIndex < this.totalCards - 1) {
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
		if (window.innerWidth < 1440)
			this.cardsToShow = 3
		if (window.innerWidth < 425) {
			this.cardsToShow = 1
		}
		if (window.innerWidth < 945) this.cardsToShow = 2
		if (window.innerWidth < 610) this.cardsToShow = 1

		const maxIndex = Math.ceil(
			(this.totalCards - this.cardsToShow) / (this.cardsToShow - 1)
		)
		const minIndex = Math.ceil(
			(this.totalCards - this.cardsToShow) / this.cardsToShow
		)

		this.prevButton.disabled = this.currentIndex === 0
		this.nextButton.disabled = this.currentIndex >= maxIndex
		if (this.cardsToShow === 1)
			this.nextButton.disabled = this.currentIndex >= minIndex  
	}

	handleTouchStart(e) {
		this.startX = e.touches[0].clientX
	}

	handleTouchMove(e) {
		this.endX = e.touches[0].clientX
	}

	handleTouchEnd() {
		const deltaX = this.endX - this.startX

		if (Math.abs(deltaX) > 50) {
			if (deltaX < 0) {
				this.moveToNext()
			} else {
				this.moveToPrevious()
			}
		}
	}

	setupSwipeListeners() {
		this.sliderContainer.addEventListener('touchstart', this.handleTouchStart)
		this.sliderContainer.addEventListener('touchmove', this.handleTouchMove)
		this.sliderContainer.addEventListener('touchend', this.handleTouchEnd)
	}

	removeSwipeListeners() {
		this.sliderContainer.removeEventListener(
			'touchstart',
			this.handleTouchStart
		)
		this.sliderContainer.removeEventListener('touchmove', this.handleTouchMove)
		this.sliderContainer.removeEventListener('touchend', this.handleTouchEnd)
	}

	setupResizeObserver() {
		const resizeObserver = new ResizeObserver(() => {
			this.updateSwipeListeners()
		})
		resizeObserver.observe(document.body)
	}

	updateSwipeListeners() {
		if (window.innerWidth <= 1024) {
			this.setupSwipeListeners()
		} else {
			this.removeSwipeListeners()
		}
	}
}

export default ProductSlider
