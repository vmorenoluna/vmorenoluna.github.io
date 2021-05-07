---
layout: null
sitemap:
exclude: 'yes'
---

  $(document).ready(function () {
    {% if site.disable_landing_page != true %}
        $('a.blog-button').click(function (e) {
            if ($('.panel-cover').hasClass('panel-cover--collapsed')) {
                $('#root').load('/index.html #blog')
            }
            currentWidth = $('.panel-cover').width()
            if (currentWidth < 960) {
                $('.panel-cover').addClass('panel-cover--collapsed')
                $('#root').load('/index.html #blog')
            } else {
                $('.panel-cover').css('max-width', currentWidth)
                $('#root').load('/index.html #blog')
                $('.panel-cover').animate({ 'max-width': '530px', 'width': '40%' }, 400, swing = 'swing', function () { })
            }
        })

        if (window.location.hash && window.location.hash == '#blog') {
            $('#root').load('/index.html #blog')
            $('.panel-cover').addClass('panel-cover--collapsed')
        }

      $('a.about-button').click(function (e) {
          if ($('.panel-cover').hasClass('panel-cover--collapsed')) {
              $('#root').load('/index.html #about')
          }
          currentWidth = $('.panel-cover').width()
          if (currentWidth < 960) {
              $('.panel-cover').addClass('panel-cover--collapsed')
              $('#root').load('/index.html #about')
          } else {
              $('.panel-cover').css('max-width', currentWidth)
              $('#root').load('/index.html #about')
              $('.panel-cover').animate({ 'max-width': '530px', 'width': '40%' }, 400, swing = 'swing', function () { })
          }
      })

      if (window.location.hash && window.location.hash == '#about') {
          $('#root').load('/index.html #about')
          $('.panel-cover').addClass('panel-cover--collapsed')
      }

      if (window.location.pathname !== '{{ site.baseurl }}/' && window.location.pathname !== '{{ site.baseurl }}/index.html') {
          $('.panel-cover').addClass('panel-cover--collapsed')
      }
    {% endif %}

    $('.btn-mobile-menu').click(function () {
      $('.navigation-wrapper').toggleClass('visible animated bounceInDown')
      $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn')
    })

    $('.navigation-wrapper .blog-button').click(function () {
      $('.navigation-wrapper').toggleClass('visible')
      $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn')
    })

    $('.navigation-wrapper .about-button').click(function () {
        $('.navigation-wrapper').toggleClass('visible')
        $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn')
    })

  })
