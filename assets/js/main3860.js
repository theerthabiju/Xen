(function($) {
    'use strict';

    $(window).on('load', function() {
        main_js.load_page();
    });

    var main_js = {

        /**
         * Call functions when document ready
         */
        ready_page: function() {
            this.pre_loading();
            this.back_to_top();
            this.header_menu();
            this.header_menu_mobile();
            this.login_popup();
            this.login_error();
            this.slide_slick_col();
            this.search_open();
            this.sticky_sidebar();
            this.countdown();
            this.popup_gallery();
            this.slick_testimonial();
            this.magnific_popup_video();
            this.accordion();
            this.popup_form();
            this.menu_scroll();
            this.thim_tabs();
            this.input_num_product();
            this.scroll_to();
            this.counter();
        },

        /**
         * Call functions when window load.
         */
        load_page: function() {
            this.bp_grid_isotope();
        },


        /**
         * Pre Loading
         */
        pre_loading: function() {
            try {
                $('.animsition').each(function() {
                    var dataLoader = "spinner";

                    $(this).animsition({
                        inClass: 'fade-in',
                        outClass: 'fade-out',
                        inDuration: 1500,
                        outDuration: 800,
                        linkElement: '.animsition-link',
                        loading: true,
                        loadingParentElement: 'html',
                        loadingClass: 'pre-loading',
                        loadingInner: '<div class="circle-border"><div class="circle-core"></div></div>',
                        timeout: false,
                        timeoutCountdown: 5000,
                        onLoadEvent: true,
                        browser: [ 'animation-duration', '-webkit-animation-duration'],
                        overlay : false,
                        overlayClass : 'animsition-overlay-slide',
                        overlayParentElement : 'html',
                        transition: function(url){ window.location.href = url; }
                    });
                })
            } catch(er) {console.log(er);}
        },


        /**
         * counter
         */
        counter: function() {
            try {
                $('.counter').counterUp({
                    delay: 10,
                    time: 1000
                });
            } catch(er) {console.log(er);}
        },


        /**
         * Back to top
         */
        back_to_top: function() {
            var $element = $('#back-to-top');
            $(window).on('scroll', function() {
                if ($(this).scrollTop() > 100) {
                    $element.addClass('scrolldown').removeClass('scrollup');
                } else {
                    $element.addClass('scrollup').removeClass('scrolldown');
                }
            });

            $element.on('click', function() {
                $('html,body').animate({scrollTop: '0px'}, 800);
                return false;
            });
        },

        /**
         * Header menu sticky, scroll, v.v.
         */
        header_menu: function() {
            var off_Top = ($('#wrapper-container').length > 0) ? $('#wrapper-container').offset().top : 0;
            var dentalTop = off_Top;
            if($(window).outerWidth() <= 600) {
                dentalTop = 0;
            }

            $(window).on('resize', function() {
                off_Top = ($('#wrapper-container').length > 0) ? $('#wrapper-container').offset().top : 0;
                dentalTop = off_Top;
                if($(window).outerWidth() <= 600) {
                    dentalTop = 0;
                }
            });

            var $topbar = $('#toolbar');
            var $header = $('.sticky-header');
            var $elementToStick = $header.find('.element-to-stick');
            var latestScroll = 0;

            if ($('#toolbar').length) {
                $('.header-overlay').css({
                    top: $('#toolbar').outerHeight() + 'px',
                });
            }
            else {
                $('.header-overlay').css({
                    top: off_Top + 'px',
                });
            }

            $elementToStick.css('top', dentalTop + 'px');

            if($elementToStick.length > 0) {
                var startFixed = $elementToStick.offset().top - dentalTop;
            }

            $(window).on('scroll', function() {
                var current = $(this).scrollTop();

                // if (current > startFixed) {
                //     $header.css('height', $header.outerHeight() + 'px');

                //     $header.addClass('fixed');
                // } else {
                //     $header.removeClass('fixed');
                //     setTimeout(function(){
                //         $header.css('height', 'auto');
                //     }, 200);
                // }

                // if (current > latestScroll && current > $elementToStick.outerHeight() + startFixed) {
                //     if (!$header.hasClass('menu-hidden')) {
                //         $header.addClass('menu-hidden');
                //         $elementToStick.css({
                //             top: - $elementToStick.outerHeight(),
                //         });
                //     }
                // } else {
                //     if ($header.hasClass('menu-hidden')) {
                //         $header.removeClass('menu-hidden');
                //         $elementToStick.css({
                //             top: dentalTop,
                //         });
                //     }
                // }

                latestScroll = current;
            });
window.addEventListener("scroll", function () {
  const header = document.querySelector(".site-header.layout-2");

  if (window.scrollY > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

            /*---------------------------------------------*/
            var $imgLogo = $('.site-header .header-logo img');
            var srcLogo = $($imgLogo).attr('src');
            var dataRetina = $($imgLogo).data('retina');
            var dataSticky = $($imgLogo).data('sticky');
            var dataMobile = $($imgLogo).data('mobile');

            if($(window).outerWidth() >= 768) {
                $(window).on('scroll load', function() {
                    if($header.length > 0) {
                        var current = $(this).scrollTop();

                        if (current > startFixed && dataSticky != null) {
                            $($imgLogo).attr('src', dataSticky);
                        } else if (window.devicePixelRatio > 1 && dataRetina != null) {
                            $($imgLogo).attr('src', dataRetina);
                        } else {
                            $($imgLogo).attr('src', srcLogo);
                        }

                        latestScroll = current;
                    } else if (window.devicePixelRatio > 1 && dataRetina != null) {
                        $($imgLogo).attr('src', dataRetina);
                    }
                })
            } else {
                if(dataMobile != null) {
                    $($imgLogo).attr('src', dataMobile);
                }
            }

            /*---------------------------------------------*/
            $(window).on('load',function(){
                responSubMenu();
            });

            $(window).on('resize',function(){
                responSubMenu();
            });

            var responSubMenu = function(){
                $('.main-navigation .menu-lists > li').each(function(){
                    var obj = $(this);
                    var posRight = 0;
                    var posRightSub = 0;
                    var deepestSubMenu = obj.children('.sub-menu').children().children('.sub-menu');
                    var numOfSubMenu = 1;

                    while(deepestSubMenu.find('.sub-menu').length > 0) {
                        numOfSubMenu++;
                        deepestSubMenu = deepestSubMenu.find('.sub-menu');
                    }

                    if(obj.children('.sub-menu').length > 0) {
                        posRight = obj.offset().left + obj.children('.sub-menu').outerWidth();

                        if(deepestSubMenu.length > 0) {
                            posRightSub = posRight + deepestSubMenu.outerWidth() * numOfSubMenu;
                        }
                    }

                    if(posRight >= $(window).width()) {
                        var move = posRight - $(window).width();
                        obj.children('.sub-menu').css('left', '-' + move + 'px');
                    }
                    else {
                        obj.children('.sub-menu').css('left', '0');
                    }

                    if(posRightSub >= $(window).width()) {
                        obj.children('.sub-menu').find('.sub-menu').css({'left':'auto','right':'calc(100%)'});
                    }
                    else {
                        obj.children('.sub-menu').find('.sub-menu').css({'right':'auto','left':'calc(100%)'});
                    }
                });
            };

            /*---------------------------------------------*/
            // Magic highlight
            try {
                var $headerMagicHighlight = $('.site-header.style-magic-highlight');
                var $menuList = $headerMagicHighlight.find('.main-navigation .menu-lists');
                var $menuCurrent = $menuList.children('.current_page_parent, .current-menu-item');

                $menuList.prepend('<span class="magic-highlight"></span>');
                var left = $menuCurrent.offset().left - $menuList.offset().left + 3;

                $(window).on('resize', function() {
                    $menuList.children('.magic-highlight').css('transition', 'none');
                    left = $menuCurrent.offset().left - $menuList.offset().left + 3;
                    $menuList.children('.magic-highlight').css('left', left + 'px');
                })

                $menuList.children('.magic-highlight').css('left', left + 'px');

                $menuList.children('li').each(function() {
                    $(this).on('mouseover', function() {
                        $menuList.children('.magic-highlight').css('transition', 'left .5s');
                        var left = $(this).offset().left - $menuList.offset().left + 3;
                        $menuList.children('.magic-highlight').css('left', left + 'px');
                    })

                    $(this).on('mouseout', function() {
                        $menuList.children('.magic-highlight').css('transition', 'left .5s');
                        var left = $menuCurrent.offset().left - $menuList.offset().left + 3;
                        $menuList.children('.magic-highlight').css('left', left + 'px');
                    })
                })
            } catch(er) {console.log(er);}

        },

        /**
         * Mobile menu
         */
        header_menu_mobile: function() {
            let $main_menu = $('#primaryMenu');

            $(document).on('click', '.menu-mobile-effect', function(e) {
                e.stopPropagation();
                $('#wrapper-container').
                toggleClass('mobile-menu-open');
            });

            $(document).on('click', '.mobile-menu-open', function() { console.log('hello');
                $('#wrapper-container.mobile-menu-open').
                removeClass('mobile-menu-open');
            });

            $('.mobile-menu-container .navbar-nav>li.menu-item-has-children >a').after('<span class="icon-toggle"><i class="fa fa-angle-down"></i></span>');
            $('.mobile-menu-container .widget_nav_menu .menu-useful-links-container .menu>li.menu-item-has-children >a').after('<span class="icon-toggle"><i class="fa fa-angle-down"></i></span>');

            $('.mobile-menu-container .navbar-nav>li.menu-item-has-children .icon-toggle, .mobile-menu-container .widget_nav_menu .menu-useful-links-container .menu>li.menu-item-has-children .icon-toggle').
            on('click', function() {
                if ($(this).next('ul.sub-menu').is(':hidden')) {
                    $(this).next('ul.sub-menu').slideDown(200, 'linear');
                    $(this).html('<i class="fa fa-angle-up"></i>');
                } else {
                    $(this).next('ul.sub-menu').slideUp(200, 'linear');
                    $(this).html('<i class="fa fa-angle-down"></i>');
                }
            });

            $('.mobile-menu-container').on('click', function(e) {
                e.stopPropagation();
            })
        },

        /**
         * Slide slick col.
         */
        slide_slick_col: function() {
            $('.js-call-slick-col').each(function(){
                var data =  [
                    ['responsive', 'array'],
                    ['customdot', 'bool'],
                    ['numofshow', 'number'],
                    ['numofscroll', 'number'],
                    ['fade', 'bool'],
                    ['loopslide', 'bool'],
                    ['autoscroll', 'bool'],
                    ['speedauto', 'number'],
                    ['verticalslide', 'bool'],
                    ['verticalswipe', 'bool'],
                    ['rtl', 'bool'],
                    ['navfor', 'string'],
                    ['animate', 'bool'],
                    ['middlearrow', 'string'],
                    ['numofrows', 'number'],
                    ['slidesperrow', 'number'],
                    ['speedslide', 'number'],
                    ['modecenter', 'bool'],
                    ['paddingcenter', 'string']
                ]

                var parameter = {
                    responsive: [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1]],
                    customdot: false,
                    numofshow: 1,
                    numofscroll: 1,
                    fade: false,
                    loopslide: false,
                    autoscroll: false,
                    speedauto: 5000,
                    verticalslide: false,
                    verticalswipe: false,
                    rtl: false,
                    navfor: '',
                    animate: false,
                    middlearrow: null,
                    numofrows: 1,
                    slidesperrow: 1,
                    speedslide: 500,
                    modecenter: false,
                    paddingcenter: '50px'
                }

                var showDot = false;
                var showArrow = false;
                var wrapSlick = $(this);
                var slideSlick = $(this).find('.slide-slick');
                var itemSlick = $(slideSlick).find('.item-slick');
                var layerSlick = $(slideSlick).find('[data-appear]');
                var actionSlick = [];

                // Check show dot, arrows
                if($(wrapSlick).find('.wrap-dot-slick').length > 0) {
                    showDot = true;
                }

                if($(wrapSlick).find('.wrap-arrow-slick').length > 0) {
                    showArrow = true;
                }

                // Get data
                for(var i=0; i<data.length; i++) {
                    var value = $(this).data(data[i][0]);

                    if (value != null) {
                        if(data[i][1] === 'bool') {
                            if(value === '1' || value === 1) {
                                parameter[data[i][0]] = true;
                            } else {
                                parameter[data[i][0]] = false;
                            }
                        }
                        else if(data[i][1] === 'number') {
                            parameter[data[i][0]] = Number(value);
                        }
                        else if(data[i][1] === 'string') {
                            parameter[data[i][0]] = value;
                        }
                        else if(data[i][1] === 'array') {
                            var strArray = value.match(/(\d+)/g);
                            parameter[data[i][0]] = [
                                [Number(strArray[0]), Number(strArray[1])],
                                [Number(strArray[2]), Number(strArray[3])],
                                [Number(strArray[4]), Number(strArray[5])],
                                [Number(strArray[6]), Number(strArray[7])],
                                [Number(strArray[8]), Number(strArray[9])]
                            ]
                        }
                    }
                }

                // Init Animate
                if(parameter.animate) {
                    $(layerSlick).addClass('animated').css('visibility', 'hidden');

                    $(slideSlick).on('init', function(){
                        showLayer(0);
                    });
                }

                //Init Show dot process
                if($(wrapSlick).hasClass('dot-has-process')) {
                    $(slideSlick).on('init', function(){
                        $(wrapSlick).find('.wrap-dot-slick .dots-slick li').removeClass('process-dot');
                        $(wrapSlick).find('.wrap-dot-slick .dots-slick li.slick-active').addClass('process-dot');
                    });
                }

                // Call slick
                $(slideSlick).slick({
                    centerMode: parameter.modecenter,
                    centerPadding: parameter.paddingcenter,
                    speed: parameter.speedslide,
                    asNavFor: parameter.navfor,
                    rtl: parameter.rtl,
                    vertical: parameter.verticalslide,
                    verticalSwiping: parameter.verticalswipe,
                    pauseOnFocus: false,
                    pauseOnHover: true,
                    slidesToShow: parameter.numofshow,
                    slidesToScroll: parameter.numofscroll,
                    fade: parameter.fade,
                    infinite: parameter.loopslide,
                    autoplay: parameter.autoscroll,
                    autoplaySpeed: parameter.speedauto,
                    rows: parameter.numofrows,
                    slidesPerRow: parameter.slidesperrow,
                    arrows: showArrow,
                    appendArrows: $(wrapSlick).find('.wrap-arrow-slick'),
                    prevArrow: $(wrapSlick).find('.prev-slick'),
                    nextArrow: $(wrapSlick).find('.next-slick'),
                    dots: showDot,
                    appendDots: $(wrapSlick).find('.wrap-dot-slick'),
                    dotsClass:'dots-slick',
                    customPaging: function(slick, index) {
                        var portrait = $(slick.$slides[index]).data('thumb');

                        if(parameter.customdot) return  portrait + '';

                        return '<span></span>'
                    },
                    responsive: [
                        {
                            breakpoint: 1368,
                            settings: {
                                slidesToShow: parameter.responsive[0][0],
                                slidesToScroll: parameter.responsive[0][1]
                            }
                        },
                        {
                            breakpoint: 1199,
                            settings: {
                                slidesToShow: parameter.responsive[1][0],
                                slidesToScroll: parameter.responsive[1][1]
                            }
                        },
                        {
                            breakpoint: 991,
                            settings: {
                                slidesToShow: parameter.responsive[2][0],
                                slidesToScroll: parameter.responsive[2][1]
                            }
                        },
                        {
                            breakpoint: 767,
                            settings: {
                                slidesToShow: parameter.responsive[3][0],
                                slidesToScroll: parameter.responsive[3][1]
                            }
                        },
                        {
                            breakpoint: 575,
                            settings: {
                                slidesToShow: parameter.responsive[4][0],
                                slidesToScroll: parameter.responsive[4][1]
                            }
                        }
                    ]
                })
                    .on('setPosition', function(event, slick){
                        // Equal height
                        if($(this).parent().data('equalheight') === '1' || $(this).parent().data('equalheight') === 1) {
                            var maxHeight = 0;
                            var $items = $(this).find('.item-slick');

                            $items.each(function(){
                                if($(this).outerHeight() > maxHeight) {
                                    maxHeight = $(this).outerHeight();
                                }
                            })

                            $items.css('min-height', maxHeight);
                        }

                        // Middle Arrow
                        if(parameter.middlearrow != null) {
                            var $wrapArrows = $(wrapSlick).find('.wrap-arrow-slick');
                            var middleOf = $(wrapSlick).find(parameter.middlearrow).outerHeight();

                            $wrapArrows.css('height', middleOf + 'px');
                        }
                    });

                // Animate
                if(parameter.animate) {
                    $(slideSlick).on('afterChange', function(event, slick, currentSlide){
                        showLayer(currentSlide);
                    });
                }

                function showLayer(currentSlide) {
                    var layerCurrentItem = $(itemSlick[currentSlide]).find('[data-appear]');

                    for(var i=0; i<actionSlick.length; i++) {
                        clearTimeout(actionSlick[i]);
                    }

                    $(layerSlick).each(function(){
                        $(this).removeClass($(this).data('appear')).css('visibility', 'hidden');
                    })


                    for(var i=0; i<layerCurrentItem.length; i++) {
                        actionSlick[i] = setTimeout(function(index) {
                            $(layerCurrentItem[index]).addClass($(layerCurrentItem[index]).data('appear')).css('visibility', 'visible');
                        },$(layerCurrentItem[i]).data('delay'),i);
                    }
                };

                //Show dot number
                if($(wrapSlick).hasClass('show-dot-number')) {
                    var $wrapDotNumber = $(wrapSlick).find('.wrap-dot-slick');
                    var $dotItem = $wrapDotNumber.find('.dots-slick > li');

                    $wrapDotNumber.append('<span class="num-active">0</span><span class="div-num">/</span><span class="num-total">0</span>');

                    var $numActive = $wrapDotNumber.find('.num-active');
                    var $numTotal = $wrapDotNumber.find('.num-total');

                    $(slideSlick).on('setPosition', function(event, slick, currentSlide){
                        $dotItem = $wrapDotNumber.find('.dots-slick > li');
                        $dotItem.length < 10 ? $numTotal.html('0' + $dotItem.length + '') : $numTotal.html($dotItem.length + '');
                    });

                    $(slideSlick).on('afterChange setPosition', function(event, slick, currentSlide){
                        for(var i=0; i<$dotItem.length; i++) {
                            if($($dotItem[i]).hasClass('slick-active')) {
                                (i + 1) < 10 ? $numActive.html('0' + (i + 1) + '') : $numActive.html(i + 1 + '');
                                break;
                            }
                        }
                    });
                }

                //Show dot process
                if($(wrapSlick).hasClass('dot-has-process')) {
                    $(slideSlick).on('afterChange breakpoint', function(){
                        $(wrapSlick).find('.wrap-dot-slick .dots-slick li').removeClass('process-dot');
                        $(wrapSlick).find('.wrap-dot-slick .dots-slick li.slick-active').addClass('process-dot');
                    });
                }
            });
        },

        /**
         * Login popup form
         */
        login_popup: function () {

            $('.login-popup').on('click', '.display-box', function (e) {
                e.preventDefault();

                var classbox = $(this).attr('data-display');

                $('.login-popup' + classbox).addClass('active').siblings().removeClass('active');
            });

            $('.login-links .login').magnificPopup({
                type: 'inline',
                removalDelay: 500, //delay removal by X to allow out-animation
                callbacks: {
                    beforeOpen: function () {
                        this.st.mainClass = this.st.el.attr('data-effect');

                    },
                    open: function () {
                        var classactive = this.st.el.attr('data-active');
                        $('.login-popup' + classactive).addClass('active').siblings().removeClass('active');
                    }
                },
                midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
            });
            $('.login-links .register').magnificPopup({
                type: 'inline',
                removalDelay: 500, //delay removal by X to allow out-animation
                callbacks: {
                    beforeOpen: function () {
                        this.st.mainClass = this.st.el.attr('data-effect');

                    },
                    open: function () {
                        var classactive = this.st.el.attr('data-active');
                        $('.login-popup' + classactive).addClass('active').siblings().removeClass('active');
                    }
                },
                midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
            });


            $('#bp-popup-login #loginform').submit(function (event) {
                var elem = $('#bp-popup-login'),
                    input_username = elem.find('#bp_login_name').val(),
                    input_password = elem.find('#bp_login_pass').val();

                if (input_username === '' || input_password === '') {
                    return;
                }

                elem.addClass('loading');
                elem.find('.message').slideDown().remove();

                var data = {
                    action: 'builderpress_login_ajax',
                    username: input_username,
                    password: input_password,
                    remember: elem.find('#rememberme').val()
                };

                $.post(ajaxurl, data, function (res) {
                    try {
                        var response = JSON.parse(res);
                        elem.find('.login-popup .inner-login').append(response.message);
                        if (response.code === '1') {
                            location.reload();
                        }
                        elem.removeClass('loading');
                    } catch (e) {
                        return false;
                    }
                });

                event.preventDefault();
                return false;
            });

            // $(function ($) {
            //     $('#bp_login_name, #bp_login_name_ac').attr('placeholder', login_popup_js.login);
            //     $('#bp_login_pass, #bp_login_pass_ac').attr('placeholder', login_popup_js.password);
            // });

        },

        /**
         * Notifications error for form
         */
        login_error: function () {

            // Validate login submit
            $('.login-popup form#loginform').submit(function (event) {
                var elem = $(this),
                    input_username = elem.find('#bp_login_name, #bp_login_name_ac'),
                    input_pass = elem.find('#bp_login_pass, #bp_login_pass_ac');

                if (input_username.length > 0 && input_username.val() === '') {
                    input_username.addClass('invalid');
                    event.preventDefault();
                }

                if (input_pass.length > 0 && input_pass.val() === '') {
                    input_pass.addClass('invalid');
                    event.preventDefault();
                }
            });

            //Register form untispam
            $('.login-popup form#registerform').submit(function (event) {
                var elem = $(this),
                    input_username = elem.find('#user_login_register'),
                    input_email = elem.find('#user_email'),
                    input_pass = elem.find('#password'),
                    input_rppass = elem.find('#repeat_password');

                var email_valid = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

                if (input_username.length > 0 && input_username.val() === '') {
                    input_username.addClass('invalid');
                    event.preventDefault();
                }

                if (input_email.length > 0 && (input_email.val() === '' || !email_valid.test(input_email.val()))) {
                    input_email.addClass('invalid');
                    event.preventDefault();
                }

                if (input_pass.val() !== input_rppass.val() || input_pass.val() === '') {
                    input_pass.addClass('invalid');
                    input_rppass.addClass('invalid');
                    event.preventDefault();
                }
            });

            // Validate lostpassword submit
            $('.login-popup form#lostpasswordform').submit(function (event) {
                var elem = $(this),
                    input_username = elem.find('#user_login_lostpass');

                if (input_username.length > 0 && input_username.val() === '') {
                    input_username.addClass('invalid');
                    event.preventDefault();
                }
            });

            // Remove class invalid
            $('.login-popup #bp_login_name, .login-popup #bp_login_pass, .login-popup #user_login_lostpass, .login-popup #user_login_register, .login-popup #bp_login_name_ac, .login-popup #bp_login_pass_ac').on('focus', function () {
                $(this).removeClass('invalid');
            });
        },

        /**
         * Search Open
         */
        search_open:function(){
            var $search = $('.element-search');
            var $open_form = $search.find('.search-button');
            var $close_form = $search.find('.close-form');
            var $search_form = $search.find('.search-form');
            var $searchField = $search.find('.search-field');

            $open_form.on('click', function() {
                $search_form.addClass('open');
                setTimeout(function() { $searchField.focus(); }, 800);
            });

            $close_form.on('click', function() {
                $search_form.removeClass('open');
            });

            $(window).on('keydown', function(event) {
                if ( event.which === 27 ) {
                    $search_form.removeClass('open');
                }
            });
        },

        /**
         * sticky_sidebar
         */
        sticky_sidebar: function() {
            try {
                var offsetTop = 10;
                var spacingTop = 20;

                if($('#wpadminbar').length) {
                    offsetTop += $('#wpadminbar').outerHeight();
                    spacingTop += $('#wpadminbar').outerHeight();
                }

                if($('.sticky-header .element-to-stick').length) {
                    offsetTop += $('.sticky-header .element-to-stick').outerHeight();
                }

                $('.sticky-sidebar').each(function () {
                    if ($(this).length > 0) {
                        if ( $().theiaStickySidebar ) {
                            $(this).theiaStickySidebar({
                                'typeSticky'            : 1,
                                'spacingTopDefault'     : spacingTop,
                                'containerSelector'     : '',
                                'additionalMarginTop'   : offsetTop,
                                'additionalMarginBottom': 10,
                                'updateSidebarHeight'   : false,
                                'minWidth'              : 992,
                                'sidebarBehavior'       : 'modern',
                            });
                        }
                    }
                });

            } catch(er) {console.log(er);}
        },

        /**
         * select2
         */
        select2: function() {
            try {
                $('select').each(function() {
                    if(!$(this).parent().hasClass('wrap-select2')) {
                        $(this).parent().addClass('wrap-select2');
                    }
                });

                $(".wrap-select2").each(function(){
                    $(this).append('<span class="dropDownSelect2"></span>');

                    var select = $(this).children('select');
                    var style = $(this).data('style');
                    var dropdown = $(this).children('.dropDownSelect2');

                    $(select).select2({
                        minimumResultsForSearch: 20,
                        dropdownParent: dropdown,
                        theme: style,
                    });
                });

            } catch(er) {console.log(er);}
        },

        /**
         * countdown
         */
        countdown: function() {
            // countdown each
            var counts = $('.tp_event_counter');
            for (var i = 0; i < counts.length; i++) {
                var time = $(counts[i]).attr('data-time');
                time = new Date(time);

                var current_time = new Date(time);

                $(counts[i]).countdown({
                    labels    : ['Years', 'Months', 'Weeks', 'Days', 'Hours', 'Minutes', 'Seconds'],
                    labels1   : ['Years', 'Months', 'Weeks', 'Days', 'Hours', 'Minutes', 'Seconds'],
                    until     : current_time,
                    serverSync: current_time
                });
            }
        },


        /**
         * popup_gallery
         */
        popup_gallery: function() {
            try {
                $('.gallery-popup').each(function() {
                    $(this).find('.js-show-gallery').magnificPopup({
                        type: 'image',
                        fixedContentPos : false,
                        gallery: {
                            enabled:true
                        },
                        mainClass: 'mfp-fade'
                    });
                });
            } catch(er) {console.log(er);}
        },

        /**
         * Slick slick_testimonial.
         */
        slick_testimonial: function() {
            var fadeSlide = false;
            var autoScroll = false;
            var speedAuto = 5000;
            var showArrow = false;

            $('.js-call-slick-testimonial').each(function(){
                var wrapSlick = $(this);
                var slideContent = $(this).find('.slide-content');
                var slideThumb = $(this).find('.slide-thumb');

                // Check show arrow
                if($(this).find('.wrap-arrow-slick').length > 0) {
                    showArrow = true;
                }

                // Get data
                speedAuto = Number($(this).data('speedauto'));

                if($(this).data('fadeslide') == '1') {
                    fadeSlide = true;
                } else {
                    fadeSlide = false;
                }

                if($(this).data('autoscroll') == '1') {
                    autoScroll = true;
                } else {
                    autoScroll = false;
                }

                // Call slick
                $($(slideContent).find('.slide-slick')).slick({
                    pauseOnFocus: false,
                    pauseOnHover: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    asNavFor: '.slide-thumb .slide-slick',
                    fade: fadeSlide,
                    autoplay: autoScroll,
                    autoplaySpeed: speedAuto,
                    arrows: showArrow,
                    appendArrows: $(wrapSlick).find('.wrap-arrow-slick'),
                    prevArrow: $(wrapSlick).find('.prev-slick'),
                    nextArrow: $(wrapSlick).find('.next-slick'),
                    dots: false

                });

                $($(slideThumb).find('.slide-slick')).slick({
                    pauseOnFocus: false,
                    pauseOnHover: false,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    asNavFor: '.slide-content .slide-slick',
                    fade: false,
                    arrows: false,
                    dots: false,
                    centerMode: true,
                    centerPadding: '5px',
                    focusOnSelect: true
                });

            });
        },

        /**
         * Magnific-Popup-Video
         */
        magnific_popup_video: function() {
            try {
                $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
                    disableOn: 700,
                    type: 'iframe',
                    mainClass: 'mfp-fade',
                    removalDelay: 160,
                    preloader: false,

                    fixedContentPos: false,

                    iframe: {
                        patterns: {
                            youtube: {
                                src: 'https://www.youtube.com/embed/%id%?autoplay=1'
                            },

                            vimeo: {
                                src: 'https://player.vimeo.com/video/%id%?autoplay=1'
                            }
                        }
                    },
                });
            } catch(er) {console.log(er);}
        },

        /**
         * accordion
         */
        accordion: function() {
            try {
                $('.js-call-accordion').each(function(){
                    var wraper = $(this);
                    var items = $(this).find('.js-dropdown');

                    $(items).each(function(){
                        var item = $(this);

                        if($(item).hasClass('active-dropdown')) {
                            $(item).find('.js-dropdown-content').show();
                        }
                        else {
                            $(item).find('.js-dropdown-content').hide();
                        }

                        $(item).find('.js-toggle-dropdown').on('click', function(){
                            if(!$(item).hasClass('active-dropdown')) {
                                $(items).removeClass('active-dropdown');
                                $(items).find('.js-dropdown-content').slideUp();

                                $(item).toggleClass('active-dropdown');
                                $(item).find('.js-dropdown-content').slideDown();
                            }
                            else {
                                $(items).removeClass('active-dropdown');
                                $(items).find('.js-dropdown-content').slideUp();
                            }
                        });
                    })

                });
            } catch(er) {console.log(er);}
        },

        /**
         * Magnic popup
         */
        popup_form: function () {
            $('.js-popup-form').magnificPopup({
                type: 'inline',
                preloader: false,

                callbacks: {
                    beforeOpen: function() {
                        this.st.mainClass = this.st.el.attr('data-effect');
                    }
                }
            });
        },

        /**
         * menu_scroll
         */
        menu_scroll: function() {
            try {
                $('.js-call-menu-scroll').on('click', function(event){
                    event.preventDefault();
                    $('html, body').animate({scrollTop: $($(this).attr('href')).offset().top}, 500);
                });

            } catch(er) {console.log(er);}
        },

        /**
         * thim-tabs
         */
        thim_tabs: function() {
            try {
                $('.js-call-tabs').each(function(){
                    var navTabs = $(this).find('.my-nav-tabs');
                    var contentTabs = $(this).find('.my-content-tabs');
                    var nextArrow = $(this).find('.next-arrow');
                    var prevArrow = $(this).find('.prev-arrow');
                    var itemNav = $(navTabs).find('.item-nav');

                    $(contentTabs).find('.tab-panel').hide();

                    var getPanelActive = $(navTabs).find('.item-nav.active').data('panel');

                    $(contentTabs).find(".tab-panel[data-nav='" + getPanelActive + "']").show();
                    $(contentTabs).find(".tab-panel[data-nav='" + getPanelActive + "']").addClass('active');


                    $(itemNav).each(function(){
                        $(this).on('click', function(){
                            openTab(this);

                            var curentItemNav = Number($(this).data('step'));
                            for(var i=1; i<curentItemNav; i++) {
                                $(navTabs).find(".item-nav[data-step='" + i + "']").addClass('active');
                            }
                        });
                    });

                    $(nextArrow).on('click', function(e) {
                        e.preventDefault();

                        for(var i=0; i<itemNav.length; i++) {
                            if($(itemNav[i]).hasClass('active')) {
                                if (i + 1 >= itemNav.length) {
                                    openTab(itemNav[0]);
                                }
                                else {
                                    openTab(itemNav[i+1]);
                                }
                                break;
                            }
                        }
                    });

                    $(prevArrow).on('click', function(e) {
                        e.preventDefault();

                        for(var i=0; i<itemNav.length; i++) {
                            if($(itemNav[i]).hasClass('active')) {
                                if (i - 1 < 0) {
                                    openTab(itemNav[itemNav.length - 1]);
                                }
                                else {
                                    openTab(itemNav[i-1]);
                                }
                                break;
                            }
                        }
                    });

                    function openTab(thisTab) {
                        var getPanel = $(thisTab).data('panel');

                        $(contentTabs).find('.tab-panel').hide();
                        $(contentTabs).find('.tab-panel').removeClass('active');
                        $(itemNav).removeClass('active');

                        $(contentTabs).find(".tab-panel[data-nav='" + getPanel + "']").show();
                        $(contentTabs).find(".tab-panel[data-nav='" + getPanel + "']").addClass('active');
                        $(thisTab).addClass('active');
                    }
                });
            } catch(er) {console.log(er);}
        },

        /**
         * input_num_product
         */
        input_num_product: function() {
            try {
                $(document).on("click",'.wrap-num-product .btn-num-down', function () {
                    var numProduct = Number($(this).parent().find('.num-product').val());
                    if(numProduct > 1) $(this).parent().find('.num-product').val(numProduct - 1);
                    $('.woocommerce-cart-form button[name="update_cart"]').removeAttr("disabled")
                });


                $(document).on("click",'.wrap-num-product .btn-num-up', function () {
                    var numProduct = Number($(this).parent().find('.num-product').val());
                    $(this).parent().find('.num-product').val(numProduct + 1);
                    $('.woocommerce-cart-form button[name="update_cart"]').removeAttr("disabled")
                });
            } catch(er) {console.log(er);}
        },

        /**
         * grid_isotope
         */
        bp_grid_isotope: function() {
            if ( $().isotope ) {
                $('.grid-isotope').each(function() {
                    var layout = 'masonry';

                    if($(this).data('layout') != null && typeof $(this).data('layout') != 'undefined') {
                        layout = $(this).data('layout');
                    }

                    $(this).isotope({
                        // set itemSelector so .grid-sizer is not used in layout
                        layoutMode: layout,
                        itemSelector: '.grid-item',
                        percentPosition: true,
                        masonry: {
                            // use element for option
                            columnWidth: '.grid-sizer'
                        }
                    })
                })

                $('.filter-gallery').on( 'click', 'a', function() {
                    var filterValue = $(this).attr('data-filter');
                    console.log(filterValue);
                    $('.grid-isotope').isotope({ filter: filterValue });
                });

                $('.grid-portfolio').isotope({
                    // set itemSelector so .grid-sizer is not used in layout
                    itemSelector: '.grid-item',
                    percentPosition: true,
                    masonry: {
                        // use element for option
                        columnWidth: '.grid-sizer'
                    }
                })

                $('.filter-portfolio').on( 'click', 'a', function() {
                    var filterValue = $(this).attr('data-filter');
                    console.log(filterValue);
                    $('.grid-portfolio').isotope({ filter: filterValue });
                });
            }
        },


        /**
         * scroll_to
         */
        scroll_to: function() {
            try {
                $('.btn-scroll-to').on('click', function(event){
                    event.preventDefault();
                    $('html, body').animate({scrollTop: $($(this).attr('href')).offset().top}, 500);
                });
            } catch(er) {console.log(er);}
        },


    };

    main_js.ready_page();

})(jQuery);



/**

 */
try {
    (function(window) {

        'use strict';

        function moduloColumnsLayoutModeDefinition(LayoutMode) {
            var ModuloColumns = LayoutMode.create('moduloColumns');

            /**
             * Called every time the layout if reevaluated
             */
            ModuloColumns.prototype._resetLayout = function() {
                // Get column width and gutter size
                this.getColumnWidth();
                this._getMeasurement('gutter', 'outerHeight');
                this.getSize()

                // Add gutter and adjust column width/count accordingly
                var gutter = this.options.gutter || 0;
                var containerWidth = this.size.innerWidth;
                this.columnWidth += gutter;
                var cols = this.cols = Math.floor((containerWidth + gutter) / this.columnWidth) || 1;

                // Initialize column heights to zero
                this.columnHeights = [];
                while (cols--) this.columnHeights.push(0);
                this.currentColumn = 0;
            };

            /**
             * Determines the position for each consecutive element
             * @param item Item to be positioned.
             * @returns {{x: number, y: number}}
             */
            ModuloColumns.prototype._getItemLayoutPosition = function(item) {
                // Determine item size
                item.getSize();
                var itemWidth = item.size.outerWidth, itemHeight = item.size.outerHeight;
                var itemCols = Math.min(this.cols, Math.ceil(itemWidth / this.columnWidth));

                // See if item still fits in current column; otherwise go back to column 0
                if (this.currentColumn + itemCols > this.cols) {
                    this.currentColumn = 0;
                }

                // Find longest column as use length
                var maxHeight = 0;
                for (var offset = 0; offset < itemCols; offset++) {
                    maxHeight = Math.max(maxHeight, this.columnHeights[this.currentColumn + offset]);
                }

                // Update column heights with new height
                var newColumnHeight = maxHeight + itemHeight;
                for (offset = 0; offset < itemCols; offset++) {
                    this.columnHeights[this.currentColumn + offset] = newColumnHeight;
                }

                // Got all we need
                var position = {
                    x: this.currentColumn * this.columnWidth,
                    y: maxHeight
                };

                // Update column pointer
                this.currentColumn += itemCols;
                if (this.currentColumn > this.cols) {
                    this.currentColumn = 0;
                }

                return position;
            };

            /**
             * Calculates the size of the container
             * @returns {{height: number}}
             */
            ModuloColumns.prototype._getContainerSize = function() {
                return {
                    height: Math.max.apply(Math, this.columnHeights)
                }
            };

        }

        // Load definition, either synchronously or asynchronously
        if ('function' === typeof define && define.amd) {
            // Use Asynchronous Module Definition (AMD)
            define(
                [   // Dependencies
                    'isotope/js/layout-mode'
                ],
                moduloColumnsLayoutModeDefinition
            )
        } else {
            // Load synchronously
            moduloColumnsLayoutModeDefinition(
                (window.Isotope.LayoutMode)
            );
        }

    })(window);
} catch(er) {console.log(er);}

document.getElementById('currentYear').textContent = new Date().getFullYear();

  // Hide top bar on scroll
  window.addEventListener('scroll', function() {
    var topBar = document.querySelector('.top-bar');
    var header = document.querySelector('.site-header');
    
    if (window.scrollY > 50) {
      topBar.classList.add('top-bar-hidden');
      header.classList.add('scrolled');
    } else {
      topBar.classList.remove('top-bar-hidden');
      header.classList.remove('scrolled');
    }
  });
  function toggle(item) {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      }

      function filterCat(cat, btn) {
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.faq-group').forEach(g => {
          g.style.display = (cat === 'all' || g.dataset.cat === cat) ? 'block' : 'none';
        });
      }

        document.getElementById('xen-close-btn').addEventListener('click', function () {
        document.querySelector('.navbar-toggle').click();
      });