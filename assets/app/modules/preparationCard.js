class PreparationCard {
	constructor({ cardSelector, cardListSelector, cardMainSelector }) {
		this.card = document.querySelector(cardSelector)
		this.cardList = document.querySelectorAll(cardListSelector)
		this.cardMain = document.querySelector(cardMainSelector)

		// Устанавливаем начальное изображение для главного блока
		this.updateMainImage(this.cardList[0].querySelector('img').src)

		// Устанавливаем начальные стили для первой миниатюры
		this.highlightActiveThumbnail(this.cardList[0])

		// Добавляем обработчики событий на миниатюры
		this.cardList.forEach(item => {
			item.addEventListener('click', () => {
				const imgSrc = item.querySelector('img').src // Получаем ссылку на изображение миниатюры
				this.updateMainImage(imgSrc) // Обновляем основное изображение
				this.highlightActiveThumbnail(item) // Подсвечиваем активную миниатюру
			})
		})
	}

	updateMainImage(imgSrc) {
		this.cardMain.querySelector('img').src = imgSrc // Обновляем src основного изображения
	}

	highlightActiveThumbnail(activeItem) {
		// Удаляем стили с всех миниатюр
		this.cardList.forEach(item => {
			item.style.backgroundColor = '' // Убираем фон
			item.style.borderLeft = '' // Убираем левый бордер
		})

		// Устанавливаем стили на активную миниатюру
		activeItem.style.backgroundColor = '#ffffff' // Устанавливаем белый фон
		activeItem.style.borderLeft = '2px solid #332e59' // Устанавливаем левый бордер
	}
}

export default PreparationCard
