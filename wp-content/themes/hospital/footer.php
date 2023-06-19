<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!--    Icon    -->
    <script src="https://kit.fontawesome.com/a1b17a1515.js" crossorigin="anonymous"></script>

    <link rel="s tylesheet" href="./style.css">
    <title>Hospital</title>
</head>
<body>
<footer class="footer">
        <div class="footer__container">
            <a class="footer__logo" href="#"><u class="footer__logo-mark">Hos</u>pital</a>
            <p class="footer__text">Our hospital tries to answer the challenges in the 
               <br> community's need for quality dental health services <br> but still affordable by a wide audience.</p>
            <div class="footer__icons">
                <img class="footer__icon" src="<?php echo $GLOBALS['assets_path'].'/img/behance.png'?>" alt="">
                <img class="footer__icon" src="<?php echo $GLOBALS['assets_path'].'/img/Linkedin.png'?>" alt="">
                <img class="footer__icon" src="<?php echo $GLOBALS['assets_path'].'/img/Whats.png'?>" alt="">
            </div>
        </div>

        <div class="footer__menu">
            <h4 class="footer__menu-title">Menus</h4>
            <ul class="footer__menu-list">
                <li><a class="footer__menu-link" href="#">About</a></li>
                <li><a class="footer__menu-link" href="#">Home</a></li>
                <li><a class="footer__menu-link" href="#">Service</a></li>
            </ul>
        </div>
        
        <div class="subscribe">
            <h4 class="subscribe__title">Get Medical Checkup Voucher</h4>
            <input class="subscribe__email" type="email" placeholder="Enter your e-mail">
            <button class="subscribe__button">Subscribe</button>
        </div>
    </footer>
</body>
</html>