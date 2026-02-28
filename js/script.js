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
})()

