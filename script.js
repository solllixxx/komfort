document.addEventListener('DOMContentLoaded', () => {
    // === НАЛАШТУВАННЯ ===
    const myViberNumber = "380951234567"; // Вкажіть ваш номер у форматі 380XXXXXXXXX
    // ===================

    const modal = document.getElementById("orderModal");
    const thanksModal = document.getElementById("thanksModal");
    const btns = document.querySelectorAll(".open-modal");
    const closeBtns = document.querySelectorAll(".close-modal, .close-thanks");

    // --- 1. КЕРУВАННЯ МОДАЛКАМИ (Відкриття та закриття) ---
    btns.forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault();
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
        };
    });

    closeBtns.forEach(btn => {
        btn.onclick = () => {
            modal.style.display = "none";
            thanksModal.style.display = "none";
            document.body.style.overflow = "auto";
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

    // --- 3. ВІДПРАВКА ФОРМИ ЗАМОВЛЕННЯ (VIBER) ---
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.onsubmit = (e) => {
            e.preventDefault();
            
            const phone = document.getElementById('userPhone').value;
            const surname = document.getElementById('userSurname').value;
            const type = document.getElementById('type').value;
            const format = document.getElementById('format').value;
            const quantity = document.getElementById('quantity').value;
            const comment = document.getElementById('comment').value;

            const typeText = (type === 'digital') ? "Цифрове фото" : "Друк (Самовивіз)";

            // Формування тексту для Viber
            const message = `🚀 НОВЕ ЗАМОВЛЕННЯ\n` +
                `---------------------------\n` +
                `👤 Прізвище: ${surname}\n` +
                `📞 Телефон: ${phone}\n` +
                `🛠 Послуга: ${typeText}\n` +
                `📐 Формат: ${format}\n` +
                `🔢 Кількість: ${quantity}\n` +
                `💬 Коментар: ${comment}\n` +
                `---------------------------\n` +
                `📸 Будь ласка, прикріпіть фото до цього чату!`;

            const messageEncoded = encodeURIComponent(message);
            
            // Створюємо посилання для Viber
            // draft — вставляє текст у поле введення
            const viberUrl = `viber://chat?number=%2B${myViberNumber}&draft=${messageEncoded}`;

            // Відкриваємо Viber
            window.location.href = viberUrl;
            
            // Вікно подяки після спроби відправки
            modal.style.display = "none";
            const thanksTitle = document.getElementById('thanksTitle');
            const thanksMessage = document.getElementById('thanksMessage');

            if (thanksTitle && thanksMessage) {
                thanksTitle.innerText = `Дякуємо, ${surname}!`;
                thanksMessage.innerHTML = "Ми відкриваємо <b>Viber</b>. <br><br>1. Натисніть кнопку 'Надіслати' у чаті. <br>2. <b>Обов'язково</b> додайте ваші фото через скріпку.";
            }

            thanksModal.style.display = "block";
            document.body.style.overflow = "hidden";
        };
    }
});

// --- 4. КОПІЮВАННЯ КАРТКИ ---
function copyCard(number, bankName) {
    navigator.clipboard.writeText(number).then(() => {
        const thanksModal = document.getElementById("thanksModal");
        const thanksTitle = document.getElementById("thanksTitle");
        const thanksMessage = document.getElementById("thanksMessage");

        if (thanksModal) {
            thanksTitle.innerText = "Скопійовано!";
            thanksMessage.innerHTML = `Номер картки <b>${bankName}</b> скопійовано. Тепер ви можете вставити його в додатку вашого банку для оплати.`;
            thanksModal.style.display = "block";
            document.body.style.overflow = "hidden";
        }
    }).catch(err => {
        console.error('Не вдалося скопіювати:', err);
    });
}