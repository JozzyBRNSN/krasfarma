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

		this.startX = 0
		this.endX = 0

		this.handleTouchStart = this.handleTouchStart.bind(this)
		this.handleTouchMove = this.handleTouchMove.bind(this)
		this.handleTouchEnd = this.handleTouchEnd.bind(this)

		this.setupResizeObserver()
		this.updateSwipeListeners()
	}

	updateCardsToShow() {
		const windowWidth = window.innerWidth

		if (windowWidth < 450) {
			this.cardsToShow = 4
		} else if (windowWidth >= 723 && windowWidth < 900) {
			this.cardsToShow = 1
		} else if (windowWidth >= 1248 && windowWidth < 1410) {
			this.cardsToShow = 2
		} else if (windowWidth >= 1410 && windowWidth < 1440) {
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
		this.container.addEventListener('touchstart', this.handleTouchStart)
		this.container.addEventListener('touchmove', this.handleTouchMove)
		this.container.addEventListener('touchend', this.handleTouchEnd)
	}

	removeSwipeListeners() {
		this.container.removeEventListener(
			'touchstart',
			this.handleTouchStart
		)
		this.container.removeEventListener('touchmove', this.handleTouchMove)
		this.container.removeEventListener('touchend', this.handleTouchEnd)
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

export default PreparationSlider
