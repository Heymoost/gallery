document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.gallery img');
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const closeButton = document.querySelector('.close');
    const nextButton = document.getElementById('nextPhoto');
    const prevButton = document.getElementById('prevPhoto');
    const zoomInButton = document.getElementById('up');
    const zoomOutButton = document.getElementById('down');
    let currentIndex = 0;
    let zoomLevel = 100;

    // Функция для открытия модального окна с изображением
    const openModal = (img, index) => {
        modal.style.display = 'flex';
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        currentIndex = index;
        resetZoom();
    };

    // Инициализация слушателей событий для каждого изображения в галерее
    images.forEach((img, index) => {
        img.addEventListener('click', () => openModal(img, index));
    });

    // Закрытие модального окна
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Переключение изображений
    nextButton.addEventListener('click', () => navigate(1));
    prevButton.addEventListener('click', () => navigate(-1));

    // Изменение масштаба
    zoomInButton.addEventListener('click', () => zoom(10));
    zoomOutButton.addEventListener('click', () => zoom(-10));

    // Навигация
    function navigate(step) {
        currentIndex = (currentIndex + step + images.length) % images.length;
        modalImage.src = images[currentIndex].src;
        modalImage.alt = images[currentIndex].alt;
    }

    // Зум
    function zoom(delta) {
        zoomLevel = Math.max(100, zoomLevel + delta);
        modalImage.style.transform = `scale(${zoomLevel / 100})`;
    }

    // Сброс зума
    function resetZoom() {
        zoomLevel = 100;
        modalImage.style.transform = 'scale(1)';
    }

    // Обработка нажатий клавиш
    document.addEventListener('keydown', (event) => {
        if (modal.style.display === 'flex') {
            switch (event.key) {
                case 'ArrowRight':
                    navigate(1);
                    break;
                case 'ArrowLeft':
                    navigate(-1);
                    break;
                case 'Escape':
                    modal.style.display = 'none';
                    break;
            }
        }
    });
});
