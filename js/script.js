;(function () {
  var toggle = document.querySelector('.toogle_menu') || document.querySelector('.menu-toggle')
  var nav = document.querySelector('.nav_mobile') || document.getElementById('mobile-nav')

  if (toggle && nav) {
    var root = document.documentElement
    var links = nav.querySelectorAll('a')

    var closeMenu = function () {
      toggle.setAttribute('aria-expanded', 'false')
      toggle.classList.remove('active')
      nav.classList.remove('active')
      nav.setAttribute('hidden', 'true')
      root.classList.remove('is-menu-open')
    }

    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true'

      if (isOpen) {
        closeMenu()
      } else {
        toggle.setAttribute('aria-expanded', 'true')
        toggle.classList.add('active')
        nav.classList.add('active')
        nav.removeAttribute('hidden')
        root.classList.add('is-menu-open')
      }
    })

    // Zamykaj menu po kliknięciu w link w nawigacji mobilnej
    links.forEach(function (link) {
      link.addEventListener('click', closeMenu)
    })
  }

  // Prefill selecta z pakietem na stronie kontaktu (jeśli istnieje)
  try {
    var params = new URLSearchParams(window.location.search)
    var pakiet = params.get('pakiet')
    if (pakiet) {
      var sel = document.getElementById('pakiet')
      if (sel) {
        sel.value = pakiet
      }
    }
  } catch (e) {
    // cicho ignorujemy w razie braku wsparcia
  }

  // Portfolio: pokazuj „Zobacz szczegóły” przy najechaniu (klasa, żeby hover działał pewnie)
  var caseItems = document.querySelectorAll('.case-grid__item')
  caseItems.forEach(function (item) {
    item.addEventListener('mouseenter', function () {
      item.classList.add('is-hovered')
    })
    item.addEventListener('mouseleave', function () {
      item.classList.remove('is-hovered')
    })
  })

  // GA4 – helper do zdarzeń (działa tylko po akceptacji cookies)
  function trackGA4Event (name, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, params || {})
    }
  }

  // GA4: główne CTA na stronie głównej
  var homeMainCta = document.querySelector('[data-ga4-cta="home-main"]')
  if (homeMainCta) {
    homeMainCta.addEventListener('click', function () {
      trackGA4Event('cta_main_click', {
        page_location: window.location.pathname,
        link_url: homeMainCta.getAttribute('href') || '',
        link_text: homeMainCta.textContent.trim()
      })
    })
  }

  // GA4: wybór pakietu na stronie oferty
  var packageLinks = document.querySelectorAll('[data-ga4-package]')
  packageLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      var pkg = link.getAttribute('data-ga4-package')
      trackGA4Event('select_pricing_package', {
        package_name: pkg,
        page_location: window.location.pathname,
        link_url: link.getAttribute('href') || ''
      })
    })
  })

  // GA4: kliknięcie w mail na stronie kontaktu
  var contactEmail = document.querySelector('[data-ga4-email="contact-main"]')
  if (contactEmail) {
    contactEmail.addEventListener('click', function () {
      trackGA4Event('contact_email_click', {
        page_location: window.location.pathname,
        link_url: contactEmail.getAttribute('href') || '',
        link_text: contactEmail.textContent.trim()
      })
    })
  }

  // GA4: wysłanie formularza kontaktowego
  var contactForm = document.querySelector('[data-ga4-form="contact-main"]')
  if (contactForm) {
    contactForm.addEventListener('submit', function () {
      trackGA4Event('contact_form_submit', {
        page_location: window.location.pathname,
        form_id: contactForm.getAttribute('id') || 'contact-form'
      })
    })
  }
})()

