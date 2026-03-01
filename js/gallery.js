;(function () {
  var gallery = document.querySelector('[data-gallery]')
  if (!gallery) return

  var mainImg = gallery.querySelector('.gallery__main-img') || document.getElementById('gallery-main-img')
  var thumbs = gallery.querySelectorAll('.gallery__thumb')
  if (!mainImg || !thumbs.length) return

  thumbs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var src = btn.getAttribute('data-src')
      var alt = btn.getAttribute('data-alt')
      if (src) mainImg.src = src
      if (alt != null) mainImg.alt = alt
      thumbs.forEach(function (b) {
        b.classList.remove('is-active')
        b.setAttribute('aria-pressed', 'false')
      })
      btn.classList.add('is-active')
      btn.setAttribute('aria-pressed', 'true')
    })
  })
})()
