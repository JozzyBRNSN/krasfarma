class PreparationCard {
	constructor({
		cardSelector,
		cardListSelector,
		cardMainSelector,
		modalWrapperSelector,
	}) {
		this.card = document.querySelector(cardSelector)
		this.cardList = document.querySelectorAll(cardListSelector)
		this.cardMain = document.querySelector(cardMainSelector)
		this.modalWrapper = document.querySelector(modalWrapperSelector)

		this.updateMainImage(this.cardList[0].querySelector('picture img').src)

		this.highlightActiveThumbnail(this.cardList[0])

		this.cardList.forEach(item => {
			item.addEventListener('click', () => {
				const imgSrc = item.querySelector('picture img').src
				this.updateMainImage(imgSrc)
				this.highlightActiveThumbnail(item)
			})
		})

		this.cardMain.addEventListener('click', () => {
			this.cardMain.classList.toggle('full-image')
			this.modalWrapper.classList.toggle('open-modal')
			document.body.classList.toggle('hidden')
		})
	}

	updateMainImage(imgSrc) {
		this.cardMain.querySelector('img').src = imgSrc
	}

	highlightActiveThumbnail(activeItem) {
		this.cardList.forEach(item => {
			item.style.backgroundColor = ''
			item.style.borderLeft = ''
		})

		activeItem.style.backgroundColor = '#ffffff'
		activeItem.style.borderLeft = '2px solid #332e59'
	}
}

export default PreparationCard
