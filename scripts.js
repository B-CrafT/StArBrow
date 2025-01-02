AOS.init({ duration: 800, easing: 'ease-in-out', once: true });

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

window.addEventListener('scroll', () => {
    const button = document.getElementById('back-to-top');
    button.style.display = window.scrollY > 300 ? 'block' : 'none';
});

document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('menu-icon').addEventListener('click', () => {
    document.getElementById('nav-links').classList.toggle('show'); // Переключаем класс 'show' для навигации
});

document.getElementById('menu-icon').addEventListener('click', () => {
    document.getElementById('mobile-nav').classList.toggle('show'); // Переключаем класс 'show' для мобильной навигации
});

document.getElementById('close-icon').addEventListener('click', () => {
    document.getElementById('mobile-nav').classList.remove('show'); // Закрываем мобильную навигацию при клике на крестик
});

// Закрытие мобильной навигации при клике на ссылку
document.querySelectorAll('#mobile-nav a').forEach(anchor => {
    anchor.addEventListener('click', () => {
        document.getElementById('mobile-nav').classList.remove('show');
    });
});

document.querySelectorAll('.price-item').forEach((item, index) => {
    item.setAttribute('data-aos-delay', index * 100); // Устанавливаем задержку анимации
    item.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});

     //Снежинки падающие
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.textContent = '❄'; // Добавляем символ снежинки
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.animationDuration = Math.random() * 10 + 10 + 's'; // Увеличиваем продолжительность анимации(уменьшается скорость падения снежинок)
    snowflake.style.opacity = Math.random();
    snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
    document.body.appendChild(snowflake);

    setTimeout(() => {
        snowflake.remove();
    }, 10000); // Увеличиваем время удаления снежинки
}

setInterval(createSnowflake, 100);
