class DraggableScroll {
	constructor(selector) {
		this.scrollContainer = document.querySelector(selector)
		this.isDragging = false
		this.startX = 0
		this.scrollLeft = 0

		this.init()
	}

	init() {
		this.scrollContainer.addEventListener('mousedown', event =>
			this.startDragging(event)
		)
		this.scrollContainer.addEventListener('mousemove', event =>
			this.drag(event)
		)
		this.scrollContainer.addEventListener('mouseup', () => this.stopDragging())
		this.scrollContainer.addEventListener('mouseleave', () =>
			this.stopDragging()
		)
	}

	startDragging(event) {
		if (window.getSelection().toString() !== '') {
			return
		}

		this.isDragging = true
		this.startX = event.pageX - this.scrollContainer.offsetLeft
		this.scrollLeft = this.scrollContainer.scrollLeft
	}

	drag(event) {
		if (!this.isDragging) return
		event.preventDefault()
		const x = event.pageX - this.scrollContainer.offsetLeft
		const walk = (x - this.startX) * 1 
		this.scrollContainer.scrollLeft = this.scrollLeft - walk
	}

	stopDragging() {
		this.isDragging = false
	}
}

export default DraggableScroll
