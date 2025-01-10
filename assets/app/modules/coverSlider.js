class CoverSlider {
	constructor({
		slidesSelector,
		sloganSelector,
		numSelector,
		borderSelector,
		controlsSelector,
		controlsArrowSelector,
		throbberSelector,
		intervalTime = 3000,
		hoverSelector,
	}) {
		this.slides = document.querySelectorAll(slidesSelector)
		this.controls = document.querySelectorAll(controlsSelector)
		this.controlsArrow = document.querySelectorAll(controlsArrowSelector)
		this.slogans = document.querySelectorAll(sloganSelector)
		this.numbers = document.querySelectorAll(numSelector)
		this.throbbers = document.querySelectorAll(throbberSelector)
		this.borders = document.querySelectorAll(borderSelector)
		this.hoverEl = document.querySelector(hoverSelector)
		this.sliderIndex = 0
		this.intervalTime = intervalTime
		this.slideInterval = null
		this.isAnimating = false

		this.startX = 0
		this.endX = 0

		this.handleTouchStart = this.handleTouchStart.bind(this)
		this.handleTouchEnd = this.handleTouchEnd.bind(this)

		this.init()
		this.startSlideInterval()
		this.addHoverEffect()
		this.setupResizeObserver()
		this.updateSwipeListeners()
	}

	init() {
		this.showSlide(this.sliderIndex)
		this.controls.forEach(control => {
			control.addEventListener('click', event => this.handleControlClick(event))
		})

		this.controlsArrow.forEach(arrow => {
			arrow.addEventListener('click', event => this.handleControlClick(event))
		})
	}

	showSlide(index) {
		requestAnimationFrame(() => {
			this.slides.forEach(slide => slide.classList.remove('slider-show'))
			this.borders.forEach(border => border.classList.remove('slider-show'))
			this.slogans.forEach(slogan => slogan.classList.remove('slider-show'))
			this.numbers.forEach(number => number.classList.remove('slider-show'))
			this.throbbers.forEach(throbber =>
				throbber.classList.remove('slider-show')
			)

			this.slides[index].classList.add('slider-show')
			this.borders[index].classList.add('slider-show')
			this.slogans[index].classList.add('slider-show')
			this.numbers[index].classList.add('slider-show')
			this.throbbers[index].classList.add('slider-show')
			this.sliderIndex = index
		})
	}

	waitForAnimation() {
		const activeSlide = this.slides[this.sliderIndex]

		const onTransitionEnd = () => {
			this.isAnimating = false
			activeSlide.removeEventListener('transitionend', onTransitionEnd)
			activeSlide.removeEventListener('animationend', onTransitionEnd)
		}

		activeSlide.addEventListener('transitionend', onTransitionEnd)
		activeSlide.addEventListener('animationend', onTransitionEnd)
	}

	nextSlide() {
		if (this.isAnimating) return
		this.isAnimating = true

		const nextSlide = (this.sliderIndex + 1) % this.slides.length
		this.showSlide(nextSlide)

		this.waitForAnimation()
	}

	previousSlide() {
		if (this.isAnimating) return
		this.isAnimating = true

		const prevSlide =
			(this.sliderIndex - 1 + this.slides.length) % this.slides.length
		this.showSlide(prevSlide)

		this.waitForAnimation()
	}

	handleControlClick(event) {
		if (
			event.target.classList.contains('cover-btn--prev') ||
			event.target.classList.contains('controls-prev')
		) {
			this.previousSlide()
		} else if (
			event.target.classList.contains('cover-btn--next') ||
			event.target.classList.contains('controls-next')
		) {
			this.nextSlide()
		}
		this.resetSlideInterval()
	}

	startSlideInterval() {
		this.slideInterval = setInterval(() => this.nextSlide(), this.intervalTime)
	}

	addHoverEffect() {
		this.hoverEl.addEventListener('mouseover', () => {
			clearInterval(this.slideInterval)
		})

		this.hoverEl.addEventListener('mouseout', () => {
			this.startSlideInterval()
		})
	}

	resetSlideInterval() {
		clearInterval(this.slideInterval)
		this.startSlideInterval()
	}

	addSwipeListeners() {
		this.slides[0].parentElement.addEventListener(
			'touchstart',
			this.handleTouchStart
		)
		this.slides[0].parentElement.addEventListener(
			'touchend',
			this.handleTouchEnd
		)
	}

	removeSwipeListeners() {
		this.slides[0].parentElement.removeEventListener(
			'touchstart',
			this.handleTouchStart
		)
		this.slides[0].parentElement.removeEventListener(
			'touchend',
			this.handleTouchEnd
		)
	}

	handleTouchStart(e) {
		this.startX = e.touches[0].clientX
	}

	handleTouchEnd(e) {
		this.endX = e.changedTouches[0].clientX

		if (this.startX - this.endX > 50) {
			this.nextSlide()
		} else if (this.endX - this.startX > 50) {
			this.previousSlide()
		}
		this.resetSlideInterval()
	}

	setupResizeObserver() {
		const resizeObserver = new ResizeObserver(() => {
			this.updateSwipeListeners()
		})
		resizeObserver.observe(document.body)
	}

	updateSwipeListeners() {
		if (window.innerWidth <= 680) {
			this.addSwipeListeners()
		} else {
			this.removeSwipeListeners()
		}
	}
}

export default CoverSlider
