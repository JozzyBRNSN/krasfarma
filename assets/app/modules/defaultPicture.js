class DefaultPicture {
	constructor({ placeholderImage, mapContainerSelector }) {
		this.mapContainers = document.querySelectorAll(mapContainerSelector)
		this.placeholderImage = placeholderImage
		this.checkAllMaps()
	}

	checkAllMaps() {
		this.mapContainers.forEach(container => {
			this.checkForIframe(container)
		})
	}

	checkForIframe(container) {
		const iframe = container.querySelector('iframe')
		if (!iframe) {
			this.addPlaceholder(container)
			container.classList.add('hidden-after')
		} else {
			container.classList.remove('hidden-after')
		}
	}

	addPlaceholder(container) {
		const img = document.createElement('img')
		img.src = this.placeholderImage
		img.style.position = 'absolute'
		img.style.width = '100%'
		img.style.height = '100%'
		container.appendChild(img)
	}
}

export default DefaultPicture
