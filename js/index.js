// Обработка загрузки изображений
let loadedImages = 0;
const totalImages = document.querySelectorAll('img').length;
const minDisplayTime = 5000; // 5 секунд минимальное время отображения прелоадера
let startTime = Date.now();
let imagesLoaded = false;
let minTimeElapsed = false;

// Обновление прогресс-бара
function updateProgress() {
    const progress = document.getElementById('progress');
    const percentage = Math.min(100, Math.round((loadedImages / totalImages) * 100));
    progress.style.width = `${percentage}%`;
}

function imageLoaded() {
    loadedImages++;
    updateProgress();

    if (loadedImages === totalImages) {
        imagesLoaded = true;
        checkIfReadyToHide();
    }
}

function checkIfReadyToHide() {
    const elapsed = Date.now() - startTime;
    const remaining = minDisplayTime - elapsed;

    if (remaining <= 0) {
        hidePreloader();
    } else {
        setTimeout(hidePreloader, remaining);
    }
}

function hidePreloader() {
    minTimeElapsed = true;
    if (imagesLoaded) {
        const preloader = document.getElementById('preloader');
        preloader.classList.add('hidden');

        // Показываем основное содержимое
        document.body.style.opacity = "1";

        // Запускаем анимацию текста
        startTextAnimation();
    }
}

// Устанавливаем минимальное время отображения прелоадера
setTimeout(checkIfReadyToHide, minDisplayTime);

// На случай, если какое-то изображение не загрузится
setTimeout(function () {
    if (!imagesLoaded) {
        imagesLoaded = true;
        checkIfReadyToHide();
    }
}, 10000);

// Функция для анимации текста
function startTextAnimation() {
    const titleText = "С Днём Рождения !!!";
    const paragraphText = "Пусть каждый момент этого дня будет наполнен счастьем, как наши лучшие воспоминания вместе";

    const titleElement = document.getElementById('animated-title');
    const textElement = document.getElementById('animated-text');

    // Анимируем заголовок
    animateTextByWords(titleText, titleElement, 100, function () {
        // После завершения анимации заголовка, начинаем анимацию абзаца
        animateTextByWords(paragraphText, textElement, 50, function () {
            // После завершения анимации абзаца, показываем коллаж
            showCollage();
        });
    });
}

function animateTextByWords(text, element, delay, callback) {
    // Очищаем элемент
    element.innerHTML = '';

    // Разбиваем текст на слова
    const words = text.split(' ');

    // Создаем контейнеры для каждого слова
    words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'word';

        // Обрабатываем каждый символ в слове
        for (let i = 0; i < word.length; i++) {
            const letter = word[i];
            const span = document.createElement('span');
            span.textContent = letter;
            span.className = 'letter';
            wordSpan.appendChild(span);
        }

        element.appendChild(wordSpan);

        // Добавляем пробел после слова (кроме последнего)
        if (wordIndex < words.length - 1) {
            const spaceSpan = document.createElement('span');
            spaceSpan.className = 'space';
            spaceSpan.innerHTML = '&nbsp;';
            element.appendChild(spaceSpan);
        }
    });

    // Собираем все буквы для анимации
    const allLetters = element.querySelectorAll('.letter');

    // Анимируем каждую букву с задержкой
    allLetters.forEach((letter, index) => {
        setTimeout(() => {
            letter.style.opacity = 1;
            letter.style.transform = 'translateY(0)';

            // Если это последняя буква, вызываем callback
            if (index === allLetters.length - 1 && callback) {
                setTimeout(callback, 300);
            }
        }, index * delay);
    });
}

function showCollage() {
    const collageContainer = document.getElementById('collage-container');
    collageContainer.classList.add('visible');
}

// Динамическое добавление мерцающих частиц
document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.collage-container');
    const sparkleCount = 20;

    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');

        // Случайная позиция
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        sparkle.style.left = `${left}%`;
        sparkle.style.top = `${top}%`;

        // Случайная задержка анимации
        sparkle.style.animationDelay = `${Math.random() * 4}s`;

        container.appendChild(sparkle);
    }

    // Добавляем сердца в прелоадер
    const preloaderHearts = document.getElementById('preloader-hearts');
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.classList.add('preloader-heart');
        heart.innerHTML = '♥';

        // Случайная позиция
        const left = Math.random() * 100;
        const top = 80 + Math.random() * 20;
        heart.style.left = `${left}%`;
        heart.style.top = `${top}%`;

        // Случайная задержка
        heart.style.animationDelay = `${Math.random() * 5}s`;

        preloaderHearts.appendChild(heart);
    }

    // Запускаем отсчет времени
    startTime = Date.now();
});