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

setInterval(createSnowflake, 350);

// Открытие модального окна при клике на кнопку записи
document.querySelector('.cta-button').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('appointment-modal').style.display = 'block';
});

// Закрытие модального окна при клике на значок закрытия
document.querySelector('.close-modal').addEventListener('click', function () {
    document.getElementById('appointment-modal').style.display = 'none';
});

// Закрытие модального окна при клике вне его
window.addEventListener('click', function (e) {
    if (e.target == document.getElementById('appointment-modal')) {
        document.getElementById('appointment-modal').style.display = 'none';
    }
});

// Обработка формы записи
document.getElementById('appointment-form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    
    // Отправка данных в Google Таблицы
    fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            phone: phone,
            service: service,
            date: date,
            time: time
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Запись добавлена:', data);
        // Закрытие модального окна и очистка формы
        document.getElementById('appointment-modal').style.display = 'none';
        this.reset();
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
});

// Обновление списка времени при выборе даты
document.getElementById('date').addEventListener('change', function () {
    const date = this.value;
    
    // Получение доступного времени из Google Таблиц
    fetch(`https://script.google.com/macros/s/AKfycbyTAqyw4AzN3-f7WLUnc3SqxGtvBXN3ZHtTO8UzWvL6Y0HzmxSJEvKn6cyU7hGjCMRN/exec?date=${date}`)
    .then(response => response.json())
    .then(data => {
        const timeSelect = document.getElementById('time');
        timeSelect.innerHTML = ''; // Очистка списка времени
        
        data.times.forEach(time => {
            const option = document.createElement('option');
            option.value = time;
            option.textContent = time;
            timeSelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
});
