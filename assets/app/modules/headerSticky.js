class StickyHeader {
	constructor({ stickyPointSelector, headerSelector }) {
		this.stickyPoint = document.querySelector(stickyPointSelector)
		this.header = document.querySelector(headerSelector)
		this.isSticky = false

		this.init()
	}

	init() {
		if (!this.stickyPoint || !this.header) {
			console.warn('Элементы не найдены.')
			return
		}

		this.observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					this.updateStickyClasses(!entry.isIntersecting)
				})
			},
			{
				threshold: 0,
			}
		)

		this.observeStickyPoint()
		window.addEventListener('resize', this.handleResize.bind(this))
	}

	observeStickyPoint() {
		if (this.isStickyEnabled()) {
			this.observer.observe(this.stickyPoint)
		} else {
			this.stopObserving()
		}
	}

	handleResize() {
		if (this.isStickyEnabled()) {
			this.observeStickyPoint()
		} else {
			this.stopObserving()
			this.updateStickyClasses(false)
		}
	}

	isStickyEnabled() {
		return window.innerWidth >= 1024
	}

	stopObserving() {
		this.observer.disconnect()
	}

	updateStickyClasses(isSticky) {
		if (isSticky !== this.isSticky) {
			this.isSticky = isSticky
			if (isSticky) {
				this.header.classList.add('header--sticky')
			} else {
				this.header.classList.remove('header--sticky')
			}
		}
	}
}

export default StickyHeader
