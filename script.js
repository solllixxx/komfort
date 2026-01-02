document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("orderModal");
    const thanksModal = document.getElementById("thanksModal");
    const btns = document.querySelectorAll(".open-modal");
    const closeBtns = document.querySelectorAll(".close-modal, .close-thanks");

    // --- 1. КЕРУВАННЯ МОДАЛКАМИ ---
    btns.forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault();
            modal.style.display = "block";
            document.body.style.overflow = "hidden"; // Вимикаємо скрол фону
        };
    });

    closeBtns.forEach(btn => {
        btn.onclick = () => {
            modal.style.display = "none";
            thanksModal.style.display = "none";
            document.body.style.overflow = "auto"; // Повертаємо скрол
        };
    });

    window.onclick = (e) => { 
        if (e.target == modal || e.target == thanksModal) {
            modal.style.display = "none";
            thanksModal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    };

    // --- 2. АНІМАЦІЯ ПРИ СКРОЛІ ---
    const reveal = () => {
        document.querySelectorAll('.reveal').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 50) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', reveal);
    reveal();

    // --- 3. ВІДПРАВКА ФОРМИ ---
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.onsubmit = (e) => {
            e.preventDefault();
            
            // Збираємо дані з полів
            const phone = document.getElementById('userPhone').value;
            const surname = document.getElementById('userSurname').value;
            const type = document.getElementById('type').value;
            const format = document.getElementById('format').value;
            const quantity = document.getElementById('quantity').value;
            const comment = document.getElementById('comment').value;
            const fileInput = document.getElementById('photo'); // ID має бути як у вашому HTML
            const filesCount = fileInput ? fileInput.files.length : 0;

            // Формуємо текст листа
            const subjectText = `Замовлення: ${surname} | ${phone}`;
            const bodyText = `НОВЕ ЗАМОВЛЕННЯ\n` +
                `---------------------------\n` +
                `👤 Прізвище: ${surname}\n` +
                `📞 Телефон: ${phone}\n` +
                `🛠 Послуга: ${type}\n` +
                `📐 Формат: ${format}\n` +
                `🔢 Кількість: ${quantity}\n` +
                `💬 Коментар: ${comment}\n` +
                `---------------------------\n` +
                `📂 Фото у формі: ${filesCount} шт.\n\n` +
                `⚠️ ВАЖЛИВО: Будь ласка, натисніть на значок "СКРІПКА" та додайте ваші фото до листа!`;

            const subjectEncoded = encodeURIComponent(subjectText);
            const bodyEncoded = encodeURIComponent(bodyText);

            // Визначаємо пристрій користувача
            const platform = navigator.platform.toLowerCase();
            const isWindows = platform.indexOf('win') !== -1;
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

            // Посилання для відправки
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=order@komfort.ua&su=${subjectEncoded}&body=${bodyEncoded}`;
            const mailtoUrl = `mailto:order@komfort.ua?subject=${subjectEncoded}&body=${bodyEncoded}`;

            // Логіка відкриття
            if (isWindows) {
                // На Windows відкриваємо Gmail у новій вкладці
                window.open(gmailUrl, '_blank');
            } else {
                // На Mac/iOS/Android викликаємо встановлений поштовик
                window.location.href = mailtoUrl;
            }
            
            // Закриваємо форму та оновлюємо модалку подяки
            modal.style.display = "none";
            
            const thanksTitle = document.getElementById('thanksTitle');
            const thanksMessage = document.getElementById('thanksMessage');

            if (thanksTitle && thanksMessage) {
                thanksTitle.innerText = `Дякуємо, ${surname}!`;
                if (isWindows) {
                    thanksMessage.innerHTML = "Ми відкрили <b>Gmail</b> у новій вкладці браузера.<br>Будь ласка, прикріпіть фото та натисніть 'Надіслати'.";
                } else {
                    thanksMessage.innerHTML = "Зараз відкриється ваша <b>поштова програма</b>. Не забудьте натиснути на скріпку, щоб додати фото!";
                }
            }

            // Показуємо вікно подяки
            thanksModal.style.display = "block";
            document.body.style.overflow = "hidden";
        };
    }
});