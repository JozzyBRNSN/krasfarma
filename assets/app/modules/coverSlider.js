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
		this.slidesSelector = slidesSelector
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
		this.visibleSlides = [] 

		this.startX = 0
		this.endX = 0

		this.handleTouchStart = this.handleTouchStart.bind(this)
		this.handleTouchEnd = this.handleTouchEnd.bind(this)

		this.init()
		this.startSlideInterval()
		this.addHoverEffect()
		this.setupResizeObserver()
		this.updateSwipeListeners()
		this.updateSlidesVisibility() 
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
			this.visibleSlides = Array.from(this.slides).filter(
				slide =>
					(window.innerWidth > 1024 &&
						slide.classList.contains('slider-desktop')) ||
					(window.innerWidth <= 1024 &&
						slide.classList.contains('slider-mobile'))
			)

			this.visibleSlides.forEach((slide, i) => {
				slide.style.transform = `translateX(${(i - index) * 100}%)`
				slide.style.transition = 'transform 0.5s ease'
			})

			this.borders.forEach(border => border.classList.remove('slider-show'))
			this.slogans.forEach(slogan => slogan.classList.remove('slider-show'))
			this.numbers.forEach(number => number.classList.remove('slider-show'))
			this.throbbers.forEach(throbber =>
				throbber.classList.remove('slider-show')
			)

			if (this.visibleSlides[index]) {
				this.borders[index].classList.add('slider-show')
				this.slogans[index].classList.add('slider-show')
				this.numbers[index].classList.add('slider-show')
				this.throbbers[index].classList.add('slider-show')
				this.sliderIndex = index
			}
		})
	}

	updateSlidesVisibility() {
		const desktopSlides = document.querySelectorAll('.slider-desktop')
		const mobileSlides = document.querySelectorAll('.slider-mobile')

		if (window.innerWidth > 1024) {
			desktopSlides.forEach(slide => (slide.style.display = 'block'))
			mobileSlides.forEach(slide => (slide.style.display = 'none'))
		} else {
			desktopSlides.forEach(slide => (slide.style.display = 'none'))
			mobileSlides.forEach(slide => (slide.style.display = 'block'))
		}

		this.slides = document.querySelectorAll(this.slidesSelector) 
		this.showSlide(0) 
	}

	waitForAnimation() {
		const activeSlide = this.visibleSlides[this.sliderIndex]

		const onTransitionEnd = () => {
			this.isAnimating = false
			activeSlide.removeEventListener('transitionend', onTransitionEnd)
		}

		activeSlide.addEventListener('transitionend', onTransitionEnd)
	}

	nextSlide() {
		if (this.isAnimating) return
		this.isAnimating = true

		const nextSlide = (this.sliderIndex + 1) % this.visibleSlides.length 
		this.showSlide(nextSlide)

		this.waitForAnimation()
	}

	previousSlide() {
		if (this.isAnimating) return
		this.isAnimating = true

		const prevSlide =
			(this.sliderIndex - 1 + this.visibleSlides.length) %
			this.visibleSlides.length 
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
			this.slides[this.sliderIndex].style.transform += 'scale(1.1)'
			this.slides[this.sliderIndex].style.transition = 'transform 0.3s ease'
		})

		this.hoverEl.addEventListener('mouseout', () => {
			this.startSlideInterval()
			this.slides[this.sliderIndex].style.transform = this.slides[
				this.sliderIndex
			].style.transform.replace(' scale(1.1)', '')
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
			this.updateSlidesVisibility() 
			this.updateSwipeListeners()
		})
		resizeObserver.observe(document.body)
	}

	updateSwipeListeners() {
		if (window.innerWidth <= 720) {
			this.addSwipeListeners()
		} else {
			this.removeSwipeListeners()
		}
	}
}

export default CoverSlider
