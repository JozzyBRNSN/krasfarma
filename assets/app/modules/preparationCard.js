class PreparationCard {
	constructor({ cardSelector, cardListSelector, cardMainSelector }) {
		this.card = document.querySelector(cardSelector)
		this.cardList = document.querySelectorAll(cardListSelector)
		this.cardMain = document.querySelector(cardMainSelector)

		this.updateMainImage(this.cardList[0].querySelector('picture img').src)

		this.highlightActiveThumbnail(this.cardList[0])

		this.cardList.forEach(item => {
			item.addEventListener('click', () => {
				const imgSrc = item.querySelector('picture img').src
				this.updateMainImage(imgSrc)
				this.highlightActiveThumbnail(item)
			})
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
