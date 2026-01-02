document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("orderModal");
    const thanksModal = document.getElementById("thanksModal");
    const btns = document.querySelectorAll(".open-modal");
    const closeBtns = document.querySelectorAll(".close-modal, .close-thanks");

    // Відкриття форми замовлення
    btns.forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault();
            modal.style.display = "block";
        };
    });

    // Закриття всіх модалок
    closeBtns.forEach(btn => {
        btn.onclick = () => {
            modal.style.display = "none";
            thanksModal.style.display = "none";
        };
    });

    window.onclick = (e) => { 
        if (e.target == modal) modal.style.display = "none"; 
        if (e.target == thanksModal) thanksModal.style.display = "none";
    };

    // Анімація появи елементів
    const reveal = () => {
        document.querySelectorAll('.reveal').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 50) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', reveal);
    reveal();

    // Логіка відправки
    document.getElementById('orderForm').onsubmit = (e) => {
        e.preventDefault();
        
        const phone = document.getElementById('userPhone').value;
        const surname = document.getElementById('userSurname').value;
        const type = document.getElementById('type').value;
        const format = document.getElementById('format').value;
        const quantity = document.getElementById('quantity').value;
        const comment = document.getElementById('comment').value;
        
        const fileInput = document.getElementById('photo'); // змінено id на photo як у вашому html
        const filesCount = fileInput ? fileInput.files.length : 0;
        let fileStatus = filesCount > 0 ? `Вибрано фото: ${filesCount} шт.` : "Фото не вибрано.";

        const subject = encodeURIComponent(`Замовлення: ${surname} | ${phone}`);
        const body = encodeURIComponent(
            `Прізвище: ${surname}\nТелефон: ${phone}\nПослуга: ${type}\nФормат: ${format}\nКількість: ${quantity}\nКоментар: ${comment}\n\n${fileStatus}`
        );
        
        window.location.href = `mailto:order@komfort.ua?subject=${subject}&body=${body}`;
        
        // Закриваємо форму
        modal.style.display = "none";

        // Налаштовуємо текст у модалці подяки
        const thanksTitle = document.getElementById('thanksTitle');
        const thanksMessage = document.getElementById('thanksMessage');

        thanksTitle.innerText = `Дякуємо, ${surname}!`;
        if (filesCount > 0) {
            thanksMessage.innerHTML = "Зараз відкриється ваша поштова програма.<br><strong>ВАЖЛИВО:</strong> Прикріпіть ваші фото до листа натиснувши на 'скріпку'.";
        } else {
            thanksMessage.innerText = "Будь ласка, надішліть сформований лист у вашій поштовій програмі.";
        }

        // Показуємо модалку подяки
        thanksModal.style.display = "block";
    };
});