// JS-функція визначення підтримки WebP

function testWebP(callback) {

   var webP = new Image();
   webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
   };
   webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

   if (support == true) {
      document.querySelector('body').classList.add('webp');
   } else {
      document.querySelector('body').classList.add('no-webp');
   }
});;
"use strict"

document.addEventListener('DOMContentLoaded', function () {
   const form = document.getElementById('form');
   form.addEventListener('submit', formSend);

   async function formSend(e) {
      e.preventDefault();

      let error = formValidate(form);

      let formData = new FormData(form);
      formData.append('image', formImage.files[0]);

      if (error === 0) {
         form.classList.add('_sending');
         let response = await fetch('sendmail.php', {
            method: 'POST',
            body: formData
         });
         if (response.ok) {
            let result = await response.json();
            alert(result.message);
            formPreview.innerHTML = '';
            form.reset();
            form.classList.remove('_sending');
         } else {
            alert("Помилка");
            form.classList.remove('_sending');
         }
      } else {
         alert('Заповніть обов`язкові поля')
      }

   }

   function formValidate(form) {
      let error = 0;
      let formReq = document.querySelectorAll('._req');

      for (let index = 0; index < formReq.length; index++) {
         const input = formReq[index];
         formRemoveError(input);

         if (input.classList.contains('_email')) {
            if (emailTest(input)) {
               formAddError(input);
               error++;
            }
         } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
            formAddError(input);
            error++;
         } else {
            if (input.value === '') {
               formAddError(input);
               error++;
            }
         }

      }
      return error;
   }

   function formAddError(input) {
      input.parentElement.classList.add('_error');
      input.classList.add('_error');
   }

   function formRemoveError(input) {
      input.parentElement.classList.remove('_error');
      input.classList.remove('_error');
   }
   // Функція тесту E-mail
   function emailTest(input) {
      return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
   }

   // Отримуємо input file в змінну
   const formImage = document.getElementById('formImage');
   // Отримуємо div для прев'ю в змінну
   const formPreview = document.getElementById('formPreview');

   // Слузаємо зміни в input file
   formImage.addEventListener('change', () => {
      uploadFile(formImage.files[0]);
   });

   function uploadFile(file) {
      // Перевіряємо тип файлу
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
         alert('Дозволено тільки зображення');
         formImage.value = '';
         return;
      }
      // Перевіряємо розмір файлу (<2 Mb)
      if (file.size > 2 * 1024 * 1024) {
         alert('Файл має бути менше 2 МБ');
         return;
      }

      var reader = new FileReader();
      reader.onload = function (e) {
         formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
      };
      reader.onerror = function (e) {
         alert('Помилка');
      };
      reader.readAsDataURL(file);
   }
});;

// Адаптивне меню
$(document).ready(function () {
   $('.header__burger').click(function (event) {
      $('.header__burger,.header__menu').toggleClass('active');
      $('body').toggleClass('lock');
   });
});

// Ініціалізуємо Слайдер Swiper
new Swiper('.image-slider', {

   // Стрілки
   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
   },

   // Навігація
   // Буллети,поточна позиція, прогрес-бар
   pagination: {
      el: '.swiper-pagination',
      // Буллети
      clickable: true,
      // Динамічні буллети
      dynamicBullets: true,
   },

   // Свайпи, перетягування
   // Перетягування на ПК
   simulateTouch: true,
   // Чутливість свайпу
   touchRatio: 1,
   // Кут спрацювання свайпу\перетягування
   touchAngle: 45,
   // Курсор перетягування
   grabCursor: true,

   // Управління клавіатурою
   keyboard: {
      // Ввімкнути\вимкнути
      enabled: true,
      // Ввімкнути\вимкнути тільки коли слайдер в межах в'юпорта
      onlyInViewport: true,
      // Ввімкнути\вимкнути управління клавішами pageUp, pageDown
      pageUpDown: true,
   },

   // Автовисота
   autoHeight: true,

   // Безкінечний слайдер
   loop: true,

   // Швидкість перемикання
   speed: 1200,

   // Ефекти перемикання слайдів
   //effect: 'slide',   Гортання
   // Зміна прозорості
   effect: 'fade',
   // Додаток до fade
   fadeEffect: {
      // Паралельна зміна прозорості
      crossFade: true
   }
});