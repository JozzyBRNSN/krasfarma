class NumberCounter {
	constructor(elements) {
		this.elements = elements
		this.animationDuration = 3000
		this.animationFrame = 60
	}

	startCounting() {
		this.elements.forEach((element, index) => {
			const targetValue = this.getTargetValue(element)
			this.animateValue(element, targetValue, index)
		})
	}

	getTargetValue(element) {
		// Извлекаем значение из атрибута data-target
		return parseInt(element.getAttribute('data-target'), 10) || 0
	}

	animateValue(element, targetValue, index) {
		const startValue = 0
		const totalFrames = (this.animationDuration / 1000) * this.animationFrame
		let currentFrame = 0

		const easeInOutCubic = t => {
			return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
		}

		const counterAnimation = () => {
			currentFrame++
			const progress = Math.min(currentFrame / totalFrames, 1)
			const easeProgress = easeInOutCubic(progress)
			const currentValue = Math.floor(
				startValue + (targetValue - startValue) * easeProgress
			)

			element.textContent = index === 1 ? `${currentValue}+` : currentValue

			if (currentFrame < totalFrames) {
				requestAnimationFrame(counterAnimation)
			}
		}

		requestAnimationFrame(counterAnimation)
	}
}

export default NumberCounter
