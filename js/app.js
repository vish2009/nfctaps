// NFCTaps - client side behaviors (no data stored, opens WhatsApp with prefilled message).
document.addEventListener('DOMContentLoaded', function () {
  // year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile nav toggle
  var navToggle = document.getElementById('nav-toggle');
  var navList = document.getElementById('nav-list');
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      navList.classList.toggle('open');
      document.body.classList.toggle('no-scroll', !expanded);
    });
  }

  // Sticky header on scroll
  var header = document.getElementById('site-header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 24) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      // let external or empty anchors behave normally
      var href = this.getAttribute('href');
      if (!href || href === '#' || href.startsWith('http')) return;
      e.preventDefault();
      var el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // close mobile nav if open
      if (navList.classList.contains('open')) {
        navList.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
      }
    });
  });

  // FAQ accordion
  document.querySelectorAll('.accordion-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      // toggle this
      this.setAttribute('aria-expanded', String(!expanded));
      var panel = this.nextElementSibling;
      if (!expanded) {
        panel.style.display = 'block';
      } else {
        panel.style.display = 'none';
      }
    });
  });

  // Form: build wa.me link and open in new tab (no server submission)
  var form = document.getElementById('order-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var biz = document.getElementById('biz-name').value.trim();
      var city = document.getElementById('biz-city').value.trim();
      var google = document.getElementById('biz-google').value.trim();
      var ig = document.getElementById('biz-instagram').value.trim();
      var qty = document.getElementById('biz-qty').value;
      var contact = document.getElementById('biz-contact').value.trim();

      if (!biz || !google || !contact) {
        showToast('Please enter Business Name, Google URL and WhatsApp Number.');
        return;
      }

      // Replace [PHONE] in the base phone string here (owner's phone).
      var ownerPhone = '[PHONE]'; // REPLACE with your phone without '+' (e.g., 919876543210)
      var message =
`Hi NFCTaps,

Business: ${biz}
City: ${city}
GoogleURL: ${google}
Instagram: ${ig}
Quantity: ${qty}
WhatsApp: ${contact}

Please confirm price and delivery.`;

      var url = `https://wa.me/${ownerPhone}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener');

      showToast('Opening WhatsApp with your order — please confirm the message and send.');
    });
  }

  function showToast(text) {
    var t = document.getElementById('toast');
    if (!t) return;
    t.hidden = false;
    t.textContent = text;
    setTimeout(function () {
      t.hidden = true;
    }, 5000);
  }

  // Ensure contact CTAs use owner phone placeholder
  // (Optional: update any dynamic CTAs here if needed)
});
