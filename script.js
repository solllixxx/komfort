document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("orderModal");
    const btns = document.querySelectorAll(".open-modal");
    const closeBtn = document.querySelector(".close-modal");

    // Відкриття модального вікна
    btns.forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault();
            modal.style.display = "block";
        };
    });

    // Закриття модального вікна
    closeBtn.onclick = () => modal.style.display = "none";
    window.onclick = (e) => { 
        if (e.target == modal) modal.style.display = "none"; 
    };

    // Анімація появи елементів при скролі
    const reveal = () => {
        document.querySelectorAll('.reveal').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 50) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', reveal);
    reveal();

    // Логіка збору даних та відкриття пошти
    document.getElementById('orderForm').onsubmit = (e) => {
        e.preventDefault();
        
        // Отримуємо значення з полів
        const phone = document.getElementById('userPhone').value;
        const surname = document.getElementById('userSurname').value; // Нове поле
        const type = document.getElementById('type').value;
        const format = document.getElementById('format').value;
        const quantity = document.getElementById('quantity').value;
        const comment = document.getElementById('comment').value;
        
        // Перевірка наявності вибраних файлів
        const fileInput = document.getElementById('userPhotos');
        const filesCount = fileInput ? fileInput.files.length : 0;
        let fileStatus = filesCount > 0 
            ? `Клієнт вибрав фото (${filesCount} шт.) — перевірте додатки.` 
            : "Фото не було вибрано у формі.";

        // Формуємо тему та тіло листа
        const subject = encodeURIComponent(`Замовлення: ${surname} | ${phone}`);
        const body = encodeURIComponent(
            `НОВЕ ЗАМОВЛЕННЯ З САЙТУ\n` +
            `---------------------------\n` +
            `👤 Прізвище: ${surname}\n` +
            `📞 Телефон: ${phone}\n` +
            `🛠 Послуга: ${type}\n` +
            `📐 Формат: ${format}\n` +
            `🔢 Кількість: ${quantity}\n` +
            `💬 Коментар: ${comment}\n` +
            `---------------------------\n` +
            `📂 Статус файлів: ${fileStatus}\n\n` +
            `⚠️ ПОВІДОМЛЕННЯ ДЛЯ КЛІЄНТА:\n` +
            `Будь ласка, натисніть на значок "Скріпка" у вашій пошті та прикріпіть фото перед відправкою.`
        );
        
        // Відкриваємо поштовий клієнт
        window.location.href = `mailto:order@komfort.ua?subject=${subject}&body=${body}`;
        
        // Закриваємо модалку
        modal.style.display = "none";
        
        // Підказка
        if (filesCount > 0) {
            alert(`Дякуємо, ${surname}! \n\nЗараз відкриється пошта. Будь ласка, прикріпіть ваші фото до листа.`);
        } else {
            alert("Дякуємо! Будь ласка, надішліть сформований лист.");
        }
    };
});