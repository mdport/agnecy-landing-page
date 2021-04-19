<?php

   use PHPMailer\PHPMailer\PHPMailer;
   use PHPMailer\PHPMailer\Exception;

   require 'phpmailer/src/Exception';
   require 'phpmailer/src/PHPMailer';

   $mail = new PHPMailer(true);
   $mail->CharSet = 'UTF-8';
   $mail->setLanguage('uk', 'phpmailer/language/');
   $mail->IsHTML(true);

   // Від кого лист
   $mail->setFrom('kharandzyuk@gmail.com', 'Мар`ян Харандзюк');
   // Кому відправити
   $mail->addAddress('kharandzyuk@gmail.com');
   // Тема листа
   $mail->Subject = 'Привіт, тут буде тема';

   // Рука
   $hand = "Right";
   if($_POST['hand'] == "left"){
      $hand = "Left";
   }

   // Тіло листа
   $body = '<h1>Зустрічайте супер лист!</h1>';

   if(trim(!empty($_POST['name']))){
      $body.='<p><strong>Ім`я:</strong> '.$_POST['name'].'</p>';
   }
   if(trim(!empty($_POST['email']))){
      $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
   }
   if(trim(!empty($_POST['hand']))){
      $body.='<p><strong>Вибір:</strong> '.$hand['email'].'</p>';
   }
   if(trim(!empty($_POST['age']))){
      $body.='<p><strong>Вік:</strong> '.$_POST['age'].'</p>';
   }
   if(trim(!empty($_POST['message']))){
      $body.='<p><strong>Повідомлення:</strong> '.$_POST['message'].'</p>';
   }

   // Прикріпити файл
   if (!empty($_FILES['image']['tmp_name'])) {
      // Шлях завантаження файлу
      $filePath = __DIR__ . "/files/" . $_FILES['image']['name'];
      // Завантажуємо файл
      if (copy($_FILES['image']['tmp_name'], $filePath)){
         $fileAttach = $filePath;
         $body.='<p><strong>Фото в додатку:</strong>';
         $mail->addAttachment($fileAttach);
      }
   }

   $mail->Body = $body;

   // Надсилаємо
   if (!$mail->send()) {
      $message = 'Помилка';
   } else {
      $message = 'Дані відправлено!';
   }

   $response = ['message' => $message];

   header('Content-type: application/json');
   echo json_encode($response);
?>