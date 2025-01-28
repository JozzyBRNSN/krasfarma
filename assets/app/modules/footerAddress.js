class ContactUpdater {
	constructor({ cityElementsSelector, addressElementsSelector, phoneLinksSelector }) {
		this.citySelectionElements = document.querySelectorAll(cityElementsSelector)
		this.addressElements = document.querySelectorAll(addressElementsSelector)
		this.phoneLinks = document.querySelectorAll(phoneLinksSelector)

		this.init()
		this.showDefaultContactInfo() // Показываем информацию для Москвы при загрузке
	}

	// Инициализация событий для элементов выбора городов
	init() {
		this.citySelectionElements.forEach(cityElement => {
			cityElement.addEventListener('click', () => {
				this.updateContactInfo(cityElement)
			})
		})
	}

	// Обновление информации о контактах в зависимости от выбранного города
	updateContactInfo(cityElement) {
		const cityId = cityElement.id // Получаем идентификатор выбранного города

		// Скрываем все адреса и телефоны
		this.hideAllContactInfo()

		// Отображаем адрес и телефон для выбранного города
		this.showContactInfoForCity(cityId)

		// Обновляем цвет текста выбранного города
		this.updateCityTextColor(cityElement)
	}

	// Скрытие всех адресов и телефонов
	hideAllContactInfo() {
		this.addressElements.forEach(address => {
			address.classList.add('details-hidden') // Скрываем адрес
		})
		this.phoneLinks.forEach(link => {
			link.classList.add('details-hidden') // Скрываем телефон
		})
	}

	// Отображение адреса и телефона для конкретного города
	showContactInfoForCity(cityId) {
		const selectedAddress = document.querySelector(`#${cityId}-address`)
		const selectedPhone = document.querySelector(`#${cityId}-phone`)

		if (selectedAddress) {
			selectedAddress.classList.remove('details-hidden') // Показываем адрес
		}
		if (selectedPhone) {
			selectedPhone.classList.remove('details-hidden') // Показываем телефон
		}
	}

	// Обновление цвета текста для выбранного города
	updateCityTextColor(selectedCity) {
		this.citySelectionElements.forEach(cityElement => {
			cityElement.style.color = '' // Сбрасываем цвет для всех городов
		})
		selectedCity.style.color = 'white' // Устанавливаем белый цвет для выбранного города
	}

	// Показываем адрес и телефон для Москвы по умолчанию
	showDefaultContactInfo() {
		const defaultCityId = 'moscow'
		this.showContactInfoForCity(defaultCityId)
		this.updateCityTextColor(document.getElementById(defaultCityId)) // Устанавливаем цвет для Москвы
	}
}

// Экспортируем класс
export default ContactUpdater
