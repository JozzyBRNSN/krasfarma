class CoverSlider {
	constructor({
		slidesSelector,
		sloganSelector,
		numSelector,
		borderSelector,
		controlsSelector,
		throbberSelector,
		intervalTime = 3000,
		hoverSelector,
	}) {
		this.slides = document.querySelectorAll(slidesSelector)
		this.controls = document.querySelectorAll(controlsSelector)
		this.slogans = document.querySelectorAll(sloganSelector)
		this.numbers = document.querySelectorAll(numSelector)
		this.throbbers = document.querySelectorAll(throbberSelector)
		this.borders = document.querySelectorAll(borderSelector)
		this.hoverEl = document.querySelector(hoverSelector)
		this.sliderIndex = 0
		this.intervalTime = intervalTime
		this.slideInterval = null
		this.isAnimating = false

		this.init()
		this.startSlideInterval()
		this.addHoverEffect()
	}

	init() {
		this.showSlide(this.sliderIndex)
		this.controls.forEach(control => {
			control.addEventListener('click', event => this.handleControlClick(event))
		})
	}

	showSlide(index) {
		this.slides.forEach(slide => slide.classList.remove('slider-show'))
		this.borders.forEach(border => border.classList.remove('slider-show'))
		this.slogans.forEach(slogan => slogan.classList.remove('slider-show'))
		this.numbers.forEach(number => number.classList.remove('slider-show'))
		this.throbbers.forEach(throbber => throbber.classList.remove('slider-show'))

		this.slides[index].classList.add('slider-show')
		this.borders[index].classList.add('slider-show')
		this.slogans[index].classList.add('slider-show')
		this.numbers[index].classList.add('slider-show')
		this.throbbers[index].classList.add('slider-show')
		this.sliderIndex = index
	}

	nextSlide() {
		if (this.isAnimating) return
		this.isAnimating = true

		const nextSlide = (this.sliderIndex + 1) % this.slides.length
		this.showSlide(nextSlide)

		setTimeout(() => {
			this.isAnimating = false
		}, 100)
	}

	previousSlide() {
		if (this.isAnimating) return
		this.isAnimating = true

		const prevSlide =
			(this.sliderIndex - 1 + this.slides.length) % this.slides.length
		this.showSlide(prevSlide)

		setTimeout(() => {
			this.isAnimating = false
		}, 100)
	}

	handleControlClick(event) {
		if (event.target.classList.contains('cover-btn--prev')) {
			this.previousSlide()
		} else if (event.target.classList.contains('cover-btn--next')) {
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
}

export default CoverSlider
