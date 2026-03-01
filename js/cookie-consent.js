;(function () {
  var CONSENT_KEY = 'cookie_consent'
  var GA_ID = 'G-T0EF7TEBT4'

  function getConsent() {
    try {
      return localStorage.getItem(CONSENT_KEY)
    } catch (e) {
      return null
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(CONSENT_KEY, value)
      if (document.documentElement) document.documentElement.dataset.cookieConsent = value
    } catch (e) {}
  }

  function loadGA4() {
    if (window.__ga4Loaded) return
    window.__ga4Loaded = true
    window.dataLayer = window.dataLayer || []
    function gtag() { dataLayer.push(arguments) }
    window.gtag = gtag
    gtag('js', new Date())
    gtag('config', GA_ID)
    var s = document.createElement('script')
    s.async = true
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID
    document.head.appendChild(s)
  }

  function hideBanner() {
    var banner = document.getElementById('cookie-consent')
    if (banner) {
      banner.hidden = true
      banner.setAttribute('aria-hidden', 'true')
    }
  }

  function showBanner() {
    var banner = document.getElementById('cookie-consent')
    if (banner) {
      banner.hidden = false
      banner.removeAttribute('aria-hidden')
    }
  }

  function init() {
    var consent = getConsent()
    var banner = document.getElementById('cookie-consent')

    if (consent === 'accepted') {
      loadGA4()
      hideBanner()
    } else if (consent === 'rejected') {
      hideBanner()
    } else {
      showBanner()
    }

    if (!banner) return

    banner.querySelectorAll('[data-consent="accept"]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setConsent('accepted')
        hideBanner()
        loadGA4()
      })
    })

    banner.querySelectorAll('[data-consent="reject"]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setConsent('rejected')
        hideBanner()
      })
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
