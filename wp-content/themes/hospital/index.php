    <?php $GLOBALS['assets_path'] = get_stylesheet_directory_uri() . "/assets/"?>
    <?php get_header(); ?>
        <section class="home">
            <div class="home__container">
                <h1 class="home__title">We Care About Your Health</h1>
                <p class="home__text">Check now your healty with our profesional doctor, completed and modern facilities services</p>
                <button class="home__button">Check now</button>    
            </div>
            <img class="home__image" src="<?php $GLOBALS['assets_path']?>/img/doctorHome.png" alt="">
            teste
            <h1><?php $GLOBALS['assets_path']?></h1>
        </section>
 
        <section class="services">            
            <h4 class="services__subtitle">Our Services</h4>
            <h2 class="services__title">4 step easy we care your health</h2>

            <div class="services__card-container">
                <div class="services__card">
                    <img class="services__card-image" src="<?php $GLOBALS['assets_path']?>/img/date.png" alt="">
                    <h4 class="services__card-title">Date</h4>
                    <p class="services__card-text">choose what date to check</p>
                </div>
                <div class="services__card">
                    <img class="services__card-image" src="<?php $GLOBALS['assets_path']?>/img/poly.png" alt="">
                    <h4 class="services__card-title">Poly</h4>
                    <p class="services__card-text">choose what Poly to check</p>
                </div>
                <div class="services__card">
                    <img class="services__card-image" src="<?php $GLOBALS['assets_path']?>/img/doctor.png" alt="">
                    <h4 class="services__card-title">Doctor</h4>
                    <p class="services__card-text">And choose doctor to check</p>
                </div>   
            </div>
        </section>

        <section class="about">
            <img class="about__image" src="<?php $GLOBALS['assets_path']?>/img/DoctorAbout.png" alt="">
            <div class="about__container">
                <h4 class="about__subtitle">About us</h4>
                <h2 class="about__title">We help your health</h2>
                <p class="about__text">This profile describes the activities of health services and medical support as well as the facilities and conditions of the General Hospital which is reflected in the general public served from all groups, religions and beliefs, ethnicity and the level and frequency of bed occupancy which continues to increase significantly.</p>
                <button class="about__button">More About us</button>
            </div>
        </section>

        <section class="doctor">
            <h4 class="doctor__subtitle">Our Doctors</h4>
            <h2 class="doctor__title">Visit our professional specialists</h2>

            <div class="doctor__cards-container">
                <div class="doctor__card">
                    <img class="doctor__card-image" src="<?php $GLOBALS['assets_path']?>/img/Doctor1.png" alt="">
                    <div class="doctor__card-text">
                        <h4 class="doctor__card-title">dr. Moeharman, Sp. THT.KL</h4>
                        <h5 class="doctor__card-subtitle">Orthodontist</h5>
                    </div>
                </div>

                <div class="doctor__card">
                    <img class="doctor__card-image" src="<?php $GLOBALS['assets_path']?>/img/Doctor2.png" alt="">
                    <div class="doctor__card-text">
                        <h4 class="doctor__card-title">ANTONIUS JANSEN</h4>
                        <h5 class="doctor__card-subtitle">Pediatric</h5>
                    </div>
                </div>

                <div class="doctor__card">
                    <img class="doctor__card-image" src="<?php $GLOBALS['assets_path']?>/img/Doctor3.png" alt="">
                    <div class="doctor__card-text">
                        <h4 class="doctor__card-title">dr. NADYA NAVIRA</h4>
                        <h5 class="doctor__card-subtitle">Dentist</h5>
                    </div>
                </div>

                <div class="doctor__card">
                    <img class="doctor__card-image" src="<?php $GLOBALS['assets_path']?>/img/Doctor4.png" alt="">
                    <div class="doctor__card-text">
                        <h4 class="doctor__card-title">MUHAMMAD ALI SYAHPUTRA</h4>
                        <h5 class="doctor__card-subtitle">Dentist</h5>
                    </div>
                </div> 
            </div>
        </section>

        <section class="testimonials">
            <h4 class="testimonials__subtitle">Testimonials</h4>
            <h2 class="testimonials__title">What they say after visiting our hospital</h2>
            <div class="testimonials__container">
                <div class="testimonials__card">
                    <img class="testimonials__card-image" src="<?php $GLOBALS['assets_path']?>/img/Family1.png" alt="">
                    <h4 class="testimonials__card-title">John doe</h4>
                    <p class="testimonials__card-text">The service I felt was very good, the staff and <br> doctors were friendly and provided very clear <br> information.</p>
                </div>
                <div class="testimonials__card">
                    <img class="testimonials__card-image" src="<?php $GLOBALS['assets_path']?>/img/Family2.png" alt="">
                    <h4 class="testimonials__card-title">John doe</h4>
                    <p class="testimonials__card-text">The service I felt was very good, the staff and <br> doctors were friendly and provided very clear <br> information.</p>
                </div>
            </div>
        </section>


    <aside class="contact">
        <h2 class="contact__title">Let's consult your health with our doctor</h2>
        <div class="contact__container">
            <h4 class="contact__subtitle">We will provide the best service</h4>
            <button class="contact__button">Contact us</button>
        </div>
    </aside>

    <?php get_footer(); ?>
</body>
</html>