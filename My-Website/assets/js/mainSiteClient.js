$(document).ready(function () {

    // Home typed
    if ($('.typed').length) {
        var typed_strings = $(".typed").data('typed-items');
        typed_strings = typed_strings.split(',')
        new Typed('.typed', {
            strings: typed_strings,
            loop: true,
            typeSpeed: 70,
            backSpeed: 50,
            backDelay: 2000
        });
    }

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        }
        else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    // Add smooth scrolling to all links in navbar + footer link
    $(".navbar a, .back-to-top").on('click', function (e) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            e.preventDefault();
            // Store hash
            var hash = this.hash;
            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (1000) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 1000, function () {
                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = "";
            });
        }
    });
    
    // Animation on scroll
    $(window).on('load', function () {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: false,
            mirror: false
        });
    });

    $(window).scroll(function () {
        $(".slideanim").each(function () {
            var pos = $(this).offset().top;
            var winTop = $(window).scrollTop();
            if (pos < winTop + 600) {
                $(this).addClass("slide");
            }
        });
    });

    // Contact Us Form Submission
    var flag = true;
    $("#contactUsForm").on('submit', function (e) {
        if (flag) {
            $('#contactUsFormModal .modal-title').html(`Hello ${$('#name1').val()}....`);
            $('#contactUsFormModal').modal({
                show: 'true',
                backdrop: 'static',
                keyboard: false
            });
            flag = false;
            e.preventDefault();           // e.preventDefault() or return false(not in this case) 
        }
        $('#contactUsFormModal #closeBtn').on('click', function () {
            $("#contactUsForm #sendBtn").click();
        });
    });
});

