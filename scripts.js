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

document.querySelectorAll('.price-item').forEach((item, index) => {
    item.setAttribute('data-aos-delay', index * 100); // Устанавливаем задержку анимации
    item.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});
