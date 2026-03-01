;(function () {
  var carousels = document.querySelectorAll('[data-carousel]')
  carousels.forEach(function (carousel) {
    var viewport = carousel.querySelector('.carousel__viewport')
    var track = carousel.querySelector('.carousel__track')
    var slides = track ? track.querySelectorAll('.carousel__slide') : []
    var prevBtn = carousel.querySelector('[data-carousel-prev]')
    var nextBtn = carousel.querySelector('[data-carousel-next]')
    var dotsEl = carousel.querySelector('[data-carousel-dots]')
    var total = slides.length
    var current = 0

    if (!viewport || !track || total === 0) return

    function getSlideWidth() {
      var slide = track.querySelector('.carousel__slide')
      return slide ? slide.getBoundingClientRect().width : viewport.clientWidth * 0.5
    }

    function scrollToIndex(index) {
      current = Math.max(0, Math.min(index, total - 1))
      var offset = getSlideWidth() * current
      if (viewport.scrollTo) {
        viewport.scrollTo({ left: offset, behavior: 'smooth' })
      } else {
        viewport.scrollLeft = offset
      }
      updateDots()
      updateCurrentSlide()
    }

    function updateDots() {
      if (!dotsEl) return
      var dots = dotsEl.querySelectorAll('.carousel__dot')
      dots.forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === current)
        dot.setAttribute('aria-current', i === current ? 'true' : 'false')
      })
    }

    function updateCurrentSlide() {
      slides.forEach(function (slide, i) {
        slide.classList.toggle('is-current', i === current)
      })
    }

    function buildDots() {
      if (!dotsEl || total <= 1) return
      dotsEl.innerHTML = ''
      for (var i = 0; i < total; i++) {
        var btn = document.createElement('button')
        btn.type = 'button'
        btn.className = 'carousel__dot' + (i === 0 ? ' is-active' : '')
        btn.setAttribute('aria-label', 'Slajd ' + (i + 1) + ' z ' + total)
        btn.setAttribute('aria-current', i === 0 ? 'true' : 'false')
        (function (idx) {
          btn.addEventListener('click', function () {
            scrollToIndex(idx)
          })
        })(i)
        dotsEl.appendChild(btn)
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        scrollToIndex(current - 1)
      })
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        scrollToIndex(current + 1)
      })
    }

    viewport.addEventListener('scroll', function () {
      var w = getSlideWidth()
      if (w <= 0) return
      var index = Math.round(viewport.scrollLeft / w)
      if (index !== current) {
        current = Math.min(index, total - 1)
        updateDots()
        updateCurrentSlide()
      }
    })

    buildDots()
    updateCurrentSlide()
  })
})()
