/* =========================================
   panorama360.js
   - Panorama Dial
   - Hamburger Menu
   - FAQ Accordion
   - Stats Counter Animation
   - Scroll Reveal
========================================= */

(function () {
  'use strict';

  /* ===== 1. PANORAMA DIAL & 360 REAL PROJECT TOUR ===== */
  var tourProject = {
    panels: [
      {
        title: 'فناء فيلا فاخرة تحت سماء زرقاء ليلية',
        img: 'background hero img/فناء فلل فاخرة تحت سماء زرقاء ليلية.png',
        hotspots: [
          { top: '55%', left: '38%', icon: 'fa-tree', title: 'الفناء الخارجي واللاندسكيب', desc: 'ممرات حجرية منسقة وإضاءة ليلية دافئة' },
          { top: '45%', left: '72%', icon: 'fa-house-chimney', title: 'الواجهة المعمارية المودرن', desc: 'تصميم هندسي حديث وتشطيبات فندقية' }
        ]
      },
      {
        title: 'صالة معيشة عصرية بإضاءة طبيعية',
        img: 'background hero img/غرفة معيشة عصرية بإضاءة طبيعية.png',
        hotspots: [
          { top: '58%', left: '42%', icon: 'fa-couch', title: 'منطقة المعيشة والضيافة', desc: 'أثاث عصري فاخر وتناسق متكامل للألوان' },
          { top: '38%', left: '78%', icon: 'fa-sun', title: 'واجهات زجاجية واسعة', desc: 'استغلال أمثل للإضاءة الطبيعية والتهوية' }
        ]
      },
      {
        title: 'أبراج زجاجية وتطوير معماري حديث',
        img: 'background hero img/أبراج زجاجية تتوسط المدينة الصحراوية.png',
        hotspots: [
          { top: '48%', left: '50%', icon: 'fa-building', title: 'الأبراج والواجهات الزجاجية', desc: 'تقنية 360° تعكس فخامة المشاريع التجارية' },
          { top: '70%', left: '25%', icon: 'fa-city', title: 'محيط المشروع والبنية التحتية', desc: 'رؤية شاملة للموقع الاستراتيجي والخدمات' }
        ]
      },
      {
        title: 'مخطط سكني وتطوير عقاري متكامل',
        img: 'background hero img/مخطط سكني حديث وسط الصحراء.png',
        hotspots: [
          { top: '52%', left: '45%', icon: 'fa-map-location-dot', title: 'تقسيم البلوكات والقطع', desc: 'تحديد دقيق لأرقام ومساحات ومعالم القطع' },
          { top: '35%', left: '70%', icon: 'fa-road', title: 'شبكة الطرق والشوارع الرئيسية', desc: 'ربط مباشر بالمحاور الحيوية المجاورة' }
        ]
      },
      {
        title: 'مشروع تجاري ومحطة نموذجية حديثة',
        img: 'background hero img/محطة وقود حديثة على أطراف الصحراء.png',
        hotspots: [
          { top: '54%', left: '40%', icon: 'fa-gas-pump', title: 'المشروع التجاري والخدمات', desc: 'عرض واقعي كامل للمرافق والمسارات التشغيلية' },
          { top: '42%', left: '75%', icon: 'fa-eye', title: 'استكشاف شامل 360°', desc: 'جولة افتراضية عالية الدقة تغطي كامل الموقع' }
        ]
      }
    ]
  };

  var strip = document.getElementById('dialStrip');
  var dial = document.getElementById('dial');

  if (strip && dial) {
    var html = '';
    for (var r = 0; r < 3; r++) {
      for (var i = 0; i < tourProject.panels.length; i++) {
        var p = tourProject.panels[i];
        var spotsHtml = '';
        if (p.hotspots && p.hotspots.length) {
          for (var h = 0; h < p.hotspots.length; h++) {
            var spot = p.hotspots[h];
            spotsHtml += '<div class="tour-hotspot" style="top:' + spot.top + ';left:' + spot.left + ';" data-title="' + spot.title + '">' +
              '<div class="hotspot-pulse"></div>' +
              '<button type="button" class="hotspot-btn" aria-label="' + spot.title + '"><i class="fas ' + spot.icon + '"></i></button>' +
              '<div class="hotspot-tooltip">' +
              '<div class="hotspot-tooltip-title">' + spot.title + '</div>' +
              '<div class="hotspot-tooltip-desc">' + spot.desc + '</div>' +
              '</div>' +
              '</div>';
          }
        }
        html += '<div class="panel" data-panel-title="' + p.title + '">' +
          '<img src="' + p.img + '" alt="' + p.title + '" loading="eager" onerror="this.onerror=null; this.src=\'temp/Gemini_Generated_Image_fsreqcfsreqcfsre.jfif\'; this.style.objectPosition=\'25% 15%\';">' +
          spotsHtml +
          '</div>';
      }
    }
    strip.innerHTML = html;

    function getPanelWidth() {
      return dial.clientWidth || (window.innerWidth <= 480 ? 320 : (window.innerWidth <= 960 ? 380 : 560));
    }

    var panelWidth = getPanelWidth();
    var panelCount = tourProject.panels.length;
    var totalSetWidth = panelWidth * panelCount;
    var offset = -totalSetWidth;

    function applyPanelWidths() {
      panelWidth = getPanelWidth();
      var panels = strip.querySelectorAll('.panel');
      for (var i = 0; i < panels.length; i++) {
        panels[i].style.width = panelWidth + 'px';
      }
      totalSetWidth = panelWidth * panelCount;
    }
    applyPanelWidths();
    strip.style.transform = 'translateX(' + offset + 'px)';

    var compassIcon = document.getElementById('compassIcon');
    var angleValue = document.getElementById('angleValue');

    function updateAngleDisplay() {
      var currentMod = Math.abs(offset % totalSetWidth);
      var deg = Math.round((currentMod / totalSetWidth) * 360);
      if (compassIcon) compassIcon.style.transform = 'rotate(' + deg + 'deg)';
      if (angleValue) angleValue.textContent = deg + '° زاوية الرؤية';
    }

    var isDown = false, startX = 0, startOffset = 0;

    function clampLoop() {
      if (offset > -totalSetWidth * 0.5) offset -= totalSetWidth;
      if (offset < -totalSetWidth * 1.5) offset += totalSetWidth;
      updateAngleDisplay();
    }

    function pointerDown(x) {
      isDown = true;
      startX = x;
      startOffset = offset;
      dial.style.cursor = 'grabbing';
      strip.style.transition = '';
    }

    function pointerMove(x) {
      if (!isDown) return;
      offset = startOffset + (x - startX);
      strip.style.transform = 'translateX(' + offset + 'px)';
      updateAngleDisplay();
    }

    function pointerUp() {
      if (!isDown) return;
      isDown = false;
      dial.style.cursor = 'grab';
      clampLoop();
      strip.style.transform = 'translateX(' + offset + 'px)';
    }

    dial.addEventListener('mousedown', function (e) {
      if (e.target.closest('.tour-ctrl-buttons') || e.target.closest('.tour-arrow-btn') || e.target.closest('.tour-hotspot')) return;
      pointerDown(e.clientX);
    });

    window.addEventListener('mousemove', function (e) { pointerMove(e.clientX); });
    window.addEventListener('mouseup', pointerUp);

    dial.addEventListener('touchstart', function (e) {
      if (e.target.closest('.tour-ctrl-buttons') || e.target.closest('.tour-arrow-btn') || e.target.closest('.tour-hotspot')) return;
      pointerDown(e.touches[0].clientX);
    }, { passive: true });

    dial.addEventListener('touchmove', function (e) {
      if (!isDown) return;
      pointerMove(e.touches[0].clientX);
    }, { passive: true });

    dial.addEventListener('touchend', pointerUp);

    // Prev / Next arrow buttons
    var prevBtn = document.getElementById('tourPrev');
    var nextBtn = document.getElementById('tourNext');
    if (prevBtn) {
      prevBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        offset -= 180;
        clampLoop();
        strip.style.transition = 'transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)';
        strip.style.transform = 'translateX(' + offset + 'px)';
        setTimeout(function () { strip.style.transition = ''; }, 360);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        offset += 180;
        clampLoop();
        strip.style.transition = 'transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)';
        strip.style.transform = 'translateX(' + offset + 'px)';
        setTimeout(function () { strip.style.transition = ''; }, 360);
      });
    }

    // Reset Angle button
    var resetBtn = document.getElementById('tourResetBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        offset = -totalSetWidth;
        clampLoop();
        strip.style.transition = 'transform 0.4s ease';
        strip.style.transform = 'translateX(' + offset + 'px)';
        setTimeout(function () { strip.style.transition = ''; }, 420);
      });
    }

    // Auto Play / Pause Toggle
    var autoBtn = document.getElementById('tourAutoBtn');
    var autoIcon = document.getElementById('tourAutoIcon');
    var isAutoPlaying = true;
    var autoInterval = null;

    function startAutoDrift() {
      if (autoInterval) clearInterval(autoInterval);
      autoInterval = setInterval(function () {
        if (isDown || !isAutoPlaying) return;
        offset += 0.45;
        clampLoop();
        strip.style.transform = 'translateX(' + offset + 'px)';
      }, 16);
    }

    if (autoBtn) {
      autoBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        isAutoPlaying = !isAutoPlaying;
        if (autoIcon) {
          autoIcon.className = isAutoPlaying ? 'fas fa-pause' : 'fas fa-play';
        }
      });
    }
    startAutoDrift();

    // Hotspot interaction
    dial.querySelectorAll('.tour-hotspot').forEach(function (spot) {
      spot.addEventListener('mousedown', function (e) { e.stopPropagation(); });
      spot.addEventListener('touchstart', function (e) { e.stopPropagation(); }, { passive: true });
      spot.addEventListener('click', function (e) {
        e.stopPropagation();
        var wasActive = spot.classList.contains('active');
        dial.querySelectorAll('.tour-hotspot').forEach(function (s) { s.classList.remove('active'); });
        if (!wasActive) spot.classList.add('active');
      });
    });

    // Handle window resize with panel width update
    var resizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        applyPanelWidths();
        offset = -totalSetWidth;
        strip.style.transform = 'translateX(' + offset + 'px)';
        updateAngleDisplay();
      }, 50);
    });

    updateAngleDisplay();
  }

  /* ===== 2. HAMBURGER MENU ===== */
  var hamburger = document.getElementById('hamburger');
  var mobMenu = document.getElementById('mobMenu');
  var mobOverlay = document.getElementById('mobOverlay');
  var mobClose = document.getElementById('mobClose');

  function openMenu() {
    if (!mobMenu) return;
    mobMenu.classList.add('open');
    if (mobOverlay) mobOverlay.classList.add('open');
    if (hamburger) {
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.classList.add('active');
    }
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    if (!mobMenu) return;
    mobMenu.classList.remove('open');
    if (mobOverlay) mobOverlay.classList.remove('open');
    if (hamburger) {
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.classList.remove('active');
    }
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openMenu);
  if (mobClose) mobClose.addEventListener('click', closeMenu);
  if (mobOverlay) mobOverlay.addEventListener('click', closeMenu);

  // Close on Escape key
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobMenu && mobMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  /* ===== 2.1 UNIFIED PRECISION SMOOTH SCROLL TO SECTION BEGINNING ===== */
  function smoothScrollToSection(targetEl) {
    if (!targetEl) return;
    var siteHeader = document.getElementById('siteHeader');
    var headerHeight = siteHeader ? (siteHeader.offsetHeight || 65) : 65;

    var targetRect = targetEl.getBoundingClientRect();
    var targetTop = targetRect.top + window.pageYOffset;

    var scrollPos;
    // For #about, scroll so the eyebrow "من نحن" begins with a pleasant 20px breathing room beneath header
    var eyebrow = targetEl.querySelector('.eyebrow');
    if (targetEl.id === 'about' && eyebrow) {
      var eyeRect = eyebrow.getBoundingClientRect();
      var eyeTop = eyeRect.top + window.pageYOffset;
      scrollPos = eyeTop - headerHeight - 20;
    } else {
      // Exactly at the top border of the section (+2px ensures it's firmly inside target for scrollspy)
      scrollPos = targetTop - headerHeight + 2;
    }

    window.scrollTo({
      top: Math.max(0, Math.round(scrollPos)),
      behavior: 'smooth'
    });
  }

  // Intercept all anchor hash clicks for precision scrolling and auto-close mobile drawer
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (!href) return;
      if (href === '#' || href === '#siteHeader') {
        e.preventDefault();
        if (typeof closeMenu === 'function') closeMenu();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      var targetEl = document.querySelector(href);
      if (targetEl) {
        e.preventDefault();
        if (typeof closeMenu === 'function') closeMenu();
        smoothScrollToSection(targetEl);
        if (history.pushState) {
          history.pushState(null, null, href);
        }
      }
    });
  });

  /* ===== 3. FAQ ACCORDION ===== */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      // close all
      faqItems.forEach(function (i) {
        i.classList.remove('open');
        var b = i.querySelector('.faq-q');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
      // open clicked if it was closed
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ===== 4. STATS COUNTER ANIMATION ===== */
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var duration = 1800;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      var val = Math.floor(eased * target);
      el.textContent = val.toLocaleString('en-US');
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        var num = en.target.querySelector('.stat-num');
        if (num && !num.classList.contains('counted')) {
          num.classList.add('counted');
          animateCounter(num);
        }
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.stat-item').forEach(function (el) {
    statsObserver.observe(el);
  });

  /* ===== 5. CLIENTS TILES REVEAL ===== */
  var clientObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add('is-visible');
        clientObs.unobserve(en.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.client-tile').forEach(function (el) {
    clientObs.observe(el);
  });

  /* ===== 5.1 CLIENTS MOBILE TOGGLE ===== */
  var clientsToggleBtn = document.getElementById('clientsToggleBtn');
  var clientsWall = document.querySelector('.clients-wall');

  if (clientsToggleBtn && clientsWall) {
    clientsToggleBtn.addEventListener('click', function () {
      var isExpanded = clientsWall.classList.toggle('is-expanded');
      clientsToggleBtn.classList.toggle('is-expanded', isExpanded);
      clientsToggleBtn.setAttribute('aria-expanded', isExpanded);

      var textSpan = clientsToggleBtn.querySelector('.toggle-text');
      if (textSpan) {
        textSpan.textContent = isExpanded ? 'عرض أقل' : 'عرض الكل';
      }

      if (isExpanded) {
        // Instantly mark all tiles as visible so newly shown tiles animate in nicely
        clientsWall.querySelectorAll('.client-tile').forEach(function (tile) {
          tile.classList.add('is-visible');
        });
      } else {
        // Smoothly scroll back to the clients section header when collapsing
        var clientsSec = document.getElementById('clients');
        if (clientsSec) {
          var headerOffset = 90;
          var pos = clientsSec.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          window.scrollTo({ top: pos, behavior: 'smooth' });
        }
      }
    });
  }

  /* ===== 6. SCROLL REVEAL ===== */
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        revealObs.unobserve(en.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObs.observe(el);
  });

  /* ===== 6. CONTACT FORM (WhatsApp Direct Messaging) ===== */
  var form = document.getElementById('mainContactForm');
  var successMsg = document.getElementById('formSuccess');
  var submitBtn = document.getElementById('formSubmit');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic validation
      var valid = true;
      var nameEl = document.getElementById('fname');
      var typeEl = document.getElementById('ftype');
      var msgEl = document.getElementById('fmsg');

      [nameEl, typeEl].forEach(function (field) {
        if (!field || !field.value.trim()) {
          if (field) field.style.borderColor = '#e05555';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      if (!valid) return;

      var name = nameEl.value.trim();
      var type = (typeEl && typeEl.value) ? typeEl.value : 'غير محدد';
      var msg = (msgEl && msgEl.value.trim()) ? msgEl.value.trim() : 'لا توجد ملاحظات إضافية';

      var dateStr = new Date().toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Format clean, professional WhatsApp message with confirmation footer
      var waText = 'السلام عليكم ورحمة الله وبركاته\n' +
        '*طلب حجز جديد — بروتو 360° (Protou 360)*\n' +
        '────────────────────\n' +
        '-  *الاسم:* ' + name + '\n' +
        '-  *نوع المشروع:* ' + type + '\n' +
        '-  *التاريخ:* ' + dateStr + '\n' +
        '-  *تفاصيل إضافية:* ' + msg + '\n\n' +
        '━━━━━━━━━━━━━━━━\n\n' +
        'تم استلام طلب الحجز بنجاح.\n\n' +
        'شكرًا لاختياركم بروتو 360°، وسيتم التواصل معكم قريبًا لتأكيد الحجز ومناقشة تفاصيل المشروع.';

      var waUrl = 'https://wa.me/966536082830?text=' + encodeURIComponent(waText);

      // Feedback on button
      var originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.innerHTML = 'جاري التحويل للواتساب... <i class="fa-brands fa-whatsapp" style="margin-right:6px;"></i>';
        submitBtn.disabled = true;
      }

      setTimeout(function () {
        // Open WhatsApp chat in a new tab / app
        window.open(waUrl, '_blank');

        if (successMsg) {
          successMsg.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12" /></svg>' +
            ' تم تجهيز طلبك وفتح محادثة واتساب للتأكيد الفوري! سيتواصل معك فريقنا قريباً.';
          successMsg.classList.add('visible');
        }

        if (submitBtn) {
          submitBtn.innerHTML = originalBtnHtml;
          submitBtn.disabled = false;
        }

        form.reset();
      }, 600);
    });
  }

  /* ===== 7. HEADER SCROLL & ACTIVE LINK HIGHLIGHT ===== */
  var siteHeader = document.getElementById('siteHeader');
  var navLinks = document.querySelectorAll('.navlinks a');
  var trackedSections = [];

  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && href.startsWith('#') && href.length > 1) {
      var sec = document.querySelector(href);
      if (sec) {
        trackedSections.push({ el: sec, link: link });
      }
    }
  });

  function onScroll() {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    if (siteHeader) {
      if (scrollY > 20) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // Dynamic scroll progress bar (RTL aware)
    var headerProgress = document.getElementById('headerProgress');
    var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (headerProgress && maxScroll > 0) {
      var pct = Math.min(Math.max((scrollY / maxScroll) * 100, 0), 100);
      headerProgress.style.width = pct + '%';
    }

    // Scrollspy
    var currentLink = null;
    var headerH = siteHeader ? siteHeader.offsetHeight : 65;
    var offsetPosition = scrollY + headerH + 40;

    for (var i = 0; i < trackedSections.length; i++) {
      var item = trackedSections[i];
      var secRect = item.el.getBoundingClientRect();
      var secTop = secRect.top + scrollY;
      var secHeight = item.el.offsetHeight;
      if (offsetPosition >= secTop && offsetPosition < secTop + secHeight) {
        currentLink = item.link;
        break;
      }
    }

    // Always clear active states
    navLinks.forEach(function (l) { l.classList.remove('active'); });

    // Activate current link only if within a tracked section
    if (currentLink) {
      currentLink.classList.add('active');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ===== 8. ABOUT INTERACTIVE CARDS & SLIDING ACCENT BAR ===== */
  var cardsWrap = document.getElementById('aboutCardsWrap');
  var slidingBar = document.getElementById('aboutSlidingBar');
  var cards = document.querySelectorAll('.about-interactive-card');

  if (cardsWrap && slidingBar && cards.length > 0) {
    function updateBarToCard(card) {
      if (!card) return;
      var cardTop = card.offsetTop;
      var cardHeight = card.offsetHeight;
      slidingBar.style.top = cardTop + 'px';
      slidingBar.style.height = cardHeight + 'px';
      slidingBar.style.opacity = '1';
    }

    var initialActive = cardsWrap.querySelector('.about-interactive-card.active') || cards[0];
    setTimeout(function () {
      updateBarToCard(initialActive);
    }, 80);

    window.addEventListener('resize', function () {
      var current = cardsWrap.querySelector('.about-interactive-card.active') || cards[0];
      updateBarToCard(current);
    });

    cards.forEach(function (card) {
      function activate() {
        cards.forEach(function (c) { c.classList.remove('active'); });
        card.classList.add('active');
        updateBarToCard(card);
      }

      card.addEventListener('mouseenter', activate);
      card.addEventListener('focus', activate);
      card.addEventListener('touchstart', activate, { passive: true });
    });

    cardsWrap.addEventListener('mouseleave', function () {
      cards.forEach(function (c) { c.classList.remove('active'); });
      cards[0].classList.add('active');
      updateBarToCard(cards[0]);
    });
  }

  /* 3D tilt interaction for orbital graphic */
  var aboutSection = document.getElementById('about');
  var ringWrap = document.querySelector('.about-ring-wrap');
  if (aboutSection && ringWrap && window.matchMedia('(hover: hover)').matches) {
    aboutSection.addEventListener('mousemove', function (e) {
      var rect = ringWrap.getBoundingClientRect();
      var x = e.clientX - (rect.left + rect.width / 2);
      var y = e.clientY - (rect.top + rect.height / 2);
      var tiltX = (y / (window.innerHeight / 2)) * -8;
      var tiltY = (x / (window.innerWidth / 2)) * 8;
      ringWrap.style.transform = 'perspective(900px) rotateX(' + tiltX.toFixed(2) + 'deg) rotateY(' + tiltY.toFixed(2) + 'deg)';
    });

    aboutSection.addEventListener('mouseleave', function () {
      ringWrap.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    });
  }

  /* ===== 9. TESTIMONIALS ROTATING SLIDER ===== */
  var testiContainer = document.getElementById('testiSliderContainer');
  var testiViewport = document.getElementById('testiViewport');
  var testiTrack = document.getElementById('testiTrack');
  var testiCards = testiTrack ? Array.prototype.slice.call(testiTrack.querySelectorAll('.testi-card')) : [];
  var testiPrevBtn = document.getElementById('testiPrevBtn');
  var testiNextBtn = document.getElementById('testiNextBtn');
  var testiDotsWrap = document.getElementById('testiDots');

  if (testiTrack && testiCards.length > 0 && testiViewport) {
    var currentIndex = 0;
    var autoPlayTimer = null;
    var isHovered = false;

    function getVisibleCount() {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    }

    function getMaxIndex() {
      var visible = getVisibleCount();
      return Math.max(0, testiCards.length - visible);
    }

    function updateSlider() {
      var maxIdx = getMaxIndex();
      if (currentIndex > maxIdx) {
        currentIndex = maxIdx;
      }
      if (currentIndex < 0) {
        currentIndex = 0;
      }

      // Calculate translation step
      var cardWidth = testiCards[0].offsetWidth;
      var style = window.getComputedStyle(testiTrack);
      var gap = parseFloat(style.gap) || 24;
      var step = cardWidth + gap;

      // In RTL (direction: rtl), to slide to subsequent items laid out to the left,
      // moving the track in positive X shifts the left items into view.
      var translateX = currentIndex * step;
      testiTrack.style.transform = 'translate3d(' + translateX + 'px, 0, 0)';

      // Update dots
      renderDots();
    }

    function renderDots() {
      if (!testiDotsWrap) return;
      var maxIdx = getMaxIndex();
      var totalDots = maxIdx + 1;

      var existingDots = testiDotsWrap.querySelectorAll('.testi-slider-dot');
      if (existingDots.length !== totalDots) {
        testiDotsWrap.innerHTML = '';
        for (var i = 0; i < totalDots; i++) {
          (function (idx) {
            var dot = document.createElement('button');
            dot.className = 'testi-slider-dot' + (idx === currentIndex ? ' active' : '');
            dot.setAttribute('type', 'button');
            dot.setAttribute('aria-label', 'الانتقال إلى التقييم ' + (idx + 1));
            dot.addEventListener('click', function () {
              currentIndex = idx;
              updateSlider();
              restartAutoPlay();
            });
            testiDotsWrap.appendChild(dot);
          })(i);
        }
      } else {
        existingDots.forEach(function (dot, idx) {
          dot.classList.toggle('active', idx === currentIndex);
        });
      }
    }

    function nextSlide() {
      var maxIdx = getMaxIndex();
      if (currentIndex >= maxIdx) {
        currentIndex = 0; // Loop back
      } else {
        currentIndex++;
      }
      updateSlider();
    }

    function prevSlide() {
      var maxIdx = getMaxIndex();
      if (currentIndex <= 0) {
        currentIndex = maxIdx; // Loop back
      } else {
        currentIndex--;
      }
      updateSlider();
    }

    // In RTL, the next button (left chevron) advances to next, prev (right chevron) goes back
    if (testiNextBtn) {
      testiNextBtn.addEventListener('click', function () {
        nextSlide();
        restartAutoPlay();
      });
    }

    if (testiPrevBtn) {
      testiPrevBtn.addEventListener('click', function () {
        prevSlide();
        restartAutoPlay();
      });
    }

    // Auto-play timer
    function startAutoPlay() {
      stopAutoPlay();
      autoPlayTimer = setInterval(function () {
        if (!isHovered) {
          nextSlide();
        }
      }, 4500);
    }

    function stopAutoPlay() {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    }

    function restartAutoPlay() {
      stopAutoPlay();
      startAutoPlay();
    }

    if (testiContainer) {
      testiContainer.addEventListener('mouseenter', function () {
        isHovered = true;
      });
      testiContainer.addEventListener('mouseleave', function () {
        isHovered = false;
      });
    }

    // Touch Swipe handling
    var touchStartX = 0;
    var touchStartY = 0;
    var touchEndX = 0;
    var touchEndY = 0;

    testiViewport.addEventListener('touchstart', function (e) {
      if (e.changedTouches && e.changedTouches[0]) {
        touchStartX = e.changedTouches[0].clientX;
        touchStartY = e.changedTouches[0].clientY;
      }
      stopAutoPlay();
    }, { passive: true });

    testiViewport.addEventListener('touchend', function (e) {
      if (e.changedTouches && e.changedTouches[0]) {
        touchEndX = e.changedTouches[0].clientX;
        touchEndY = e.changedTouches[0].clientY;
        var diffX = touchStartX - touchEndX;
        var diffY = touchStartY - touchEndY;
        if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX > 0) {
            // Swiped finger to the left: move content left
            prevSlide();
          } else {
            // Swiped finger to the right: move content right
            nextSlide();
          }
        }
      }
      startAutoPlay();
    }, { passive: true });

    // Handle Resize
    var resizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        updateSlider();
      }, 100);
    });

    // Initial setup
    setTimeout(function () {
      updateSlider();
      startAutoPlay();
    }, 50);
  }

})();