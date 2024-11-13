// Отримуємо елементи DOM
const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more');
const clearGalleryBtn = document.getElementById('clear-gallery');
const removeLastBtn = document.getElementById('remove-last');
const reverseGalleryBtn = document.getElementById('reverse-gallery');

// Функція для отримання картинок через API
function fetchImages() {
  fetch('https://picsum.photos/v2/list?page=1&limit=4')
    .then(response => response.json())
    .then(data => {
      // Для кожного елементу з отриманого масиву даних додаємо картинку до галереї
      data.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.download_url;
        imgElement.alt = image.author;
        gallery.appendChild(imgElement);
      });
    })
    .catch(error => console.error('Помилка при завантаженні картинок:', error));
}

// Функція для очищення галереї
function clearGallery() {
  gallery.innerHTML = '';
}

// Функція для видалення останньої картинки
function removeLastImage() {
  const images = gallery.getElementsByTagName('img');
  if (images.length > 0) {
    gallery.removeChild(images[images.length - 1]);
  }
}

// Функція для перевертання галереї
function reverseGallery() {
  const images = Array.from(gallery.getElementsByTagName('img'));
  gallery.innerHTML = ''; // Очищаємо поточні картинки
  images.reverse().forEach(img => gallery.appendChild(img)); // Додаємо в зворотному порядку
}

// Події для кнопок
loadMoreBtn.addEventListener('click', fetchImages);
clearGalleryBtn.addEventListener('click', clearGallery);
removeLastBtn.addEventListener('click', removeLastImage);
reverseGalleryBtn.addEventListener('click', reverseGallery);

// Завантажуємо перші 4 картинки при завантаженні сторінки
window.onload = fetchImages;