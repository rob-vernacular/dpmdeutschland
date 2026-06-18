/* DPM Digital Partner Mittelstand — main.js */

(function () {
  'use strict';

  /* ============================================================
     1. STICKY NAV SCROLL-KLASSE
     ============================================================ */
  var nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 80);
    }, { passive: true });
  }

  /* ============================================================
     2. STICKY BAR — ab 400px Scroll sichtbar (Desktop)
     ============================================================ */
  var stickyBar = document.querySelector('.sticky-bar');
  if (stickyBar) {
    function updateStickyBar() {
      if (window.innerWidth > 768) {
        var show = window.scrollY > 400;
        stickyBar.style.opacity = show ? '1' : '0';
        stickyBar.style.pointerEvents = show ? 'all' : 'none';
      } else {
        stickyBar.style.opacity = '1';
        stickyBar.style.pointerEvents = 'all';
      }
    }
    window.addEventListener('scroll', updateStickyBar, { passive: true });
    window.addEventListener('resize', updateStickyBar, { passive: true });
    updateStickyBar();
  }

  /* ============================================================
     3. MOBILE NAV HAMBURGER TOGGLE
     ============================================================ */
  var hamburger = document.querySelector('.hamburger');
  var drawer = document.querySelector('.nav-drawer');
  var overlay = document.querySelector('.nav-overlay');

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('open');
    if (hamburger) hamburger.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger && drawer) {
    hamburger.addEventListener('click', function () {
      var isOpen = drawer.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      if (overlay) overlay.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeDrawer);
  }

  document.querySelectorAll('.nav-drawer-link, .nav-drawer-cta').forEach(function (link) {
    link.addEventListener('click', closeDrawer);
  });

  /* ============================================================
     4. MINI-AUDIT FORMULAR — Submit ohne Payment
     ============================================================ */
  var auditForm = document.querySelector('#mini-audit-form');
  if (auditForm) {
    var payBtn = document.querySelector('#audit-pay-btn');

    function validateForm() {
      var required = auditForm.querySelectorAll('input[required], select[required], textarea[required]');
      var valid = true;
      required.forEach(function (field) {
        var value = field.value ? field.value.trim() : '';
        if (!value) {
          field.classList.add('form-error');
          valid = false;
        } else {
          field.classList.remove('form-error');
        }
      });
      return valid;
    }

    if (payBtn) {
      payBtn.addEventListener('click', function () {
        if (validateForm()) {
          var email = auditForm.querySelector('#email');
          var name = auditForm.querySelector('#name');
          var company = auditForm.querySelector('#company');

          var formCard = document.querySelector('.form-card');
          if (formCard) {
            formCard.innerHTML = '<div style="text-align:center; padding:48px 0;">'
              + '<div style="font-size:48px; margin-bottom:24px;">&#10003;</div>'
              + '<h3 style="font-family:var(--font-display); font-size:28px; color:var(--w); margin-bottom:12px;">Anfrage eingegangen.</h3>'
              + '<p style="font-size:16px; color:var(--w60); margin-bottom:8px;">Vielen Dank, ' + (name ? name.value : '') + '.</p>'
              + '<p style="font-size:15px; color:var(--w60); max-width:400px; margin:0 auto 32px;">Wir melden uns innerhalb von 24 Stunden unter Ihrer E-Mail-Adresse mit dem naechsten Schritt.</p>'
              + '<a href="index.html" class="btn btn-teal btn-lg">Zurueck zur Startseite</a>'
              + '</div>';
          }
        } else {
          var firstError = auditForm.querySelector('.form-error');
          if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      });
    }

    var inputs = auditForm.querySelectorAll('input, select, textarea');
    inputs.forEach(function (input) {
      input.addEventListener('blur', function () {
        if (this.hasAttribute('required') && !this.value.trim()) {
          this.classList.add('form-error');
        } else {
          this.classList.remove('form-error');
        }
      });
      input.addEventListener('input', function () {
        if (this.classList.contains('form-error') && this.value.trim()) {
          this.classList.remove('form-error');
        }
      });
    });
  }

  /* ============================================================
     5. SMOOTH SCROLL
     ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ============================================================
     6. ACTIVE NAV LINK
     ============================================================ */
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .nav-drawer-link').forEach(function (link) {
    var href = link.getAttribute('href') || '';
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ============================================================
     7. STICKY BAR BUTTON ACTIONS
     ============================================================ */
  var stickyErstgespraech = document.querySelector('.sticky-bar-btn[data-action="erstgespraech"]');
  var stickyOptimierung = document.querySelector('.sticky-bar-btn[data-action="optimierung"]');
  var stickyAudit = document.querySelector('.sticky-bar-btn[data-action="audit"]');

  if (stickyErstgespraech) {
    stickyErstgespraech.addEventListener('click', function () {
      window.open('https://calendly.com/rob-dpmdeutschland/30min', '_blank', 'noopener,noreferrer');
    });
  }
  if (stickyOptimierung) {
    stickyOptimierung.addEventListener('click', function () {
      window.open('https://calendly.com/rob-dpmdeutschland/30min', '_blank', 'noopener,noreferrer');
    });
  }
  if (stickyAudit) {
    stickyAudit.addEventListener('click', function () {
      window.location.href = 'mini-audit.html';
    });
  }

  /* ============================================================
     8. FALLBEISPIELE ROTATOR
     ============================================================ */

  var CASES = [
    {
      sector: 'Catering & Hospitality',
      title: 'Angebotserstellung: von vier Tagen auf vier Stunden',
      situation: 'Eine Anfrage für ein Firmenevent landet per E-Mail. Word aufmachen, altes Angebot kopieren, Menüs anpassen, Preise nachrechnen. Reaktionszeit: 2–4 Tage. Der Wettbewerb antwortet in 24 Stunden.',
      before: '3–4 Tage Bearbeitungszeit',
      after: '4 Stunden. Conversion +20 %',
      highlight: 'Bearbeitungszeit –80 %',
      weeks: '4–6 Wochen'
    },
    {
      sector: 'Catering & Hospitality',
      title: 'Dienstplanung: Personalkosten in Echtzeit steuern',
      situation: 'Dienstpläne manuell in Excel. Erst am Monatsende zeigt die Abrechnung, ob die Personalkostenquote eingehalten wurde. Zu diesem Zeitpunkt ist nichts mehr zu ändern.',
      before: 'Rückblick nach Monatsende. Quote 39,5 % – Benchmark 30–35 %',
      after: 'Tagesaktuelle Kostenkontrolle. –2–4 Prozentpunkte',
      highlight: '80–200 T€ Einsparung p.a.',
      weeks: '8 Wochen'
    },
    {
      sector: 'Catering & Hospitality',
      title: 'Location-Buchung: Doppelbuchungen abschaffen',
      situation: 'Verfügbarkeit in Excel gepflegt, manchmal per Wandkalender. Doppelbuchungen passieren. Kein System kennt den aktuellen Stand.',
      before: 'Doppelbuchungen, –6 h/Woche Koordinationsaufwand',
      after: 'Echtzeit-Verfügbarkeit, ein System',
      highlight: 'Doppelbuchungen –90 %',
      weeks: '6–8 Wochen'
    },
    {
      sector: 'Finance & Controlling',
      title: 'Wöchentliche BWA: von zwei Tagen auf zwei Stunden',
      situation: 'FIBU-Mitarbeitende exportieren Daten, kopieren in Excel-Vorlagen, ergänzen Kommentare manuell. Fehler entstehen beim Kopieren. Abweichungsanalyse findet nicht statt.',
      before: '2 Tage je Bericht. 400–600 h FIBU-Aufwand p.a.',
      after: '2 Stunden, automatisch, live. Fehlerquote –95 %',
      highlight: '400–600 h/Jahr gespart',
      weeks: '8–10 Wochen'
    },
    {
      sector: 'Finance & Controlling',
      title: 'Monatsabschluss: von zwölf Tagen auf drei',
      situation: 'Der CFO erhält Zahlen für den Vormonat, wenn der laufende Monat zur Hälfte vorbei ist. Steuerung findet im Rückspiegel statt.',
      before: '12 Arbeitstage. Zu spät für Steuerung im laufenden Monat',
      after: '3 Tage. +9 Tage Steuerungsfenster',
      highlight: 'Monatsabschluss –75 %',
      weeks: '10–12 Wochen'
    },
    {
      sector: 'Marketing & Vertrieb',
      title: 'Erstkontakt-Reaktion: Interessenten nicht verlieren',
      situation: 'Anfrage per Kontaktformular, gemeinsames Postfach, drei Personen im Zugriff, niemand fühlt sich zuständig. Reaktionszeit: 2–5 Tage. Nach 24 h sinkt die Abschlusswahrscheinlichkeit um 60 %.',
      before: '2–5 Tage Reaktionszeit. Leads verbrennen still',
      after: 'Automatischer Erstkontakt unter 10 Min., 24/7',
      highlight: 'Lead-Conversion +20–40 %',
      weeks: '2–3 Wochen'
    },
    {
      sector: 'Marketing & Vertrieb',
      title: 'Content-Produktion: von drei Wochen auf drei Tage',
      situation: 'Ein Blogbeitrag, drei Social-Posts, ein Newsletter: drei Wochen, zwei Mitarbeitende, endlose Abstimmungsschleifen. Erscheinungsfrequenz: einmal pro Monat.',
      before: '3 Wochen, 2 Personen, 1 Beitrag/Monat',
      after: '3 Tage, 1 Person, 4–8 Beiträge/Monat',
      highlight: 'Produktionszeit –85 %',
      weeks: '4 Wochen'
    },
    {
      sector: 'Handwerk & Dienstleister',
      title: 'Angebotserstellung: Monteur misst auf, Büro tippt ab',
      situation: 'Aufmaß auf Zettel, Abtippen im Büro, manuelle Kalkulation. 1,5–3 h pro Angebot. Bei 80 Angeboten pro Monat: 120–240 Bürostunden reine Übertragungsarbeit.',
      before: '1,5–3 h je Angebot. 120–240 h/Monat ohne Wertschöpfung',
      after: 'App, PDF in 15 Min. Büroaufwand –80 %',
      highlight: '+100–200 h/Monat Kapazität',
      weeks: '4–6 Wochen'
    },
    {
      sector: 'Handwerk & Dienstleister',
      title: 'Rechnungsstellung: Aufträge, die nie abgerechnet werden',
      situation: 'Abgeschlossene Aufträge liegen als Lieferscheine im Briefkorb. Rechnung entsteht, wenn jemand Zeit hat. 5–10 % aller Aufträge bleiben über 30 Tage unberechnet.',
      before: '5–10 % der Aufträge über 30 Tage ohne Rechnung',
      after: 'Auftrag fertig = Rechnung automatisch',
      highlight: '+15–20 T€/Monat Cashflow',
      weeks: '4 Wochen'
    },
    {
      sector: 'Hausverwaltung & WEG',
      title: '420 Einheiten – Reparaturen verschwinden im E-Mail-Postfach',
      situation: 'Mieter ruft an, Mitarbeitende notiert auf Zettel, schickt E-Mail an Handwerker – kein Tracking, keine Rückmeldung. 18 % der Anfragen finden kein dokumentiertes Ende.',
      before: 'Keine Nachverfolgung. 18 % Anfragen ohne Abschluss',
      after: 'Ticketsystem, 100 % erfasst. Beschwerden –60 %',
      highlight: '18 % Anfrageverlust eliminiert',
      weeks: '4–6 Wochen'
    },
    {
      sector: 'Hausverwaltung & WEG',
      title: 'Nebenkostenabrechnung: von sechs Wochen auf eine',
      situation: 'Zwei Mitarbeitende vier bis sechs Wochen vollständig blockiert. Belege zusammentragen, manuell zuordnen, einzeln eintippen. Fehler führen zu Einspüchen.',
      before: '4–6 Wochen, 2 Vollzeitstellen. Fehlerquote hoch',
      after: '1 Woche, 1 Person zur Prüfung. Fehlerquote –85 %',
      highlight: 'Abrechnungsdauer –80 %',
      weeks: '8–10 Wochen'
    },
    {
      sector: 'Hausverwaltung & WEG',
      title: 'Leerstand per Telefon gemeldet – niemand hat den Überblick',
      situation: 'Leerstandsmeldung per Anruf, keine einheitliche Erfassung. Wiedervermietung dauert im Schnitt 11 Wochen. Leerstandsquote: 4,2 %. Kapital liegt still.',
      before: 'Leerstandsquote 4,2 %. Wiedervermietung 11 Wochen',
      after: 'Digitales Monitoring. Wiedervermietung auf 5 Wochen',
      highlight: 'Wiedervermietungszeit –55 %',
      weeks: '6–8 Wochen'
    },
    {
      sector: 'Hausverwaltung & WEG',
      title: 'Wohnungsübergabe per Papierprotokoll – Mängel tauchen später auf',
      situation: 'Übergabeprotokoll handschriftlich, Fotos auf privatem Handy. Mängel erst Wochen später dokumentiert. 3 aktive Rechtsstreitigkeiten wegen fehlender Nachweise.',
      before: 'Papier, Fotos privat. 3 aktive Rechtsstreitigkeiten',
      after: 'Digitale Übergabe mit Fotodokumentation. Protokoll sofort archiviert',
      highlight: 'Rechtsstreitigkeiten auf null',
      weeks: '4 Wochen'
    },
    {
      sector: 'Industrie & Produktion',
      title: 'Maschinenstillstand: Reparatur vorher planen, nicht danach reagieren',
      situation: 'Maschine fällt aus. 2–4 Stunden bis zur Diagnose. 5.000–20.000 EUR direkte Verluste je Stillstand. Wartungsplan existiert, wird aber nicht proaktiv gesteuert.',
      before: 'Reaktiv nach Ausfall. 5.000–20.000 EUR Verlust je Stillstand',
      after: 'Geplante Wartung. Ungeplante Stillstände –40–60 %',
      highlight: '50–150 T€ Einsparung p.a.',
      weeks: '8–12 Wochen'
    },
    {
      sector: 'Steuerberatung',
      title: '340 Mandate – kein einziger Fristenkalender',
      situation: 'Steuerkanzlei, 18 Mitarbeitende. Mandantenkontakt per E-Mail und Telefon, keine Wiedervorlage, keine Aufgabensteuerung. Frist vergessen – Mandant verärgert – Partner übernimmt manuell.',
      before: 'Fristen im Kopf des Steuerberaters. Keine Vertretbarkeit',
      after: 'CRM mit automatischer Fristenanzeige. Vertretung sofort möglich',
      highlight: '3 h/MA/Woche gespart',
      weeks: '4–6 Wochen'
    },
    {
      sector: 'Steuerberatung',
      title: 'Neuer Mitarbeitender braucht 9 Wochen',
      situation: 'Kanzlei, 12 Mitarbeitende. Kein Onboarding-Dokument, kein Handbuch, alles mündlich weitergegeben. Hohe Abhängigkeit von Schlüsselpersonen.',
      before: '9 Wochen Einarbeitung. Wissen nur bei Schlüsselpersonen',
      after: 'Digitales Onboarding-Handbuch. Einarbeitung in 3 Wochen',
      highlight: 'Einarbeitungszeit –67 %',
      weeks: '3–4 Wochen'
    },
    {
      sector: 'Steuerberatung',
      title: 'Stundenzettel auf Papier – Abrechnung 3 Wochen nach Leistung',
      situation: 'Stunden handschriftlich notiert, einmal monatlich übertragen. Fehlerquote ~15 %. Mandanten warten auf Rechnungen, Liquidität der Kanzlei leidet.',
      before: 'Abrechnung 3 Wochen nach Leistung. Fehlerquote ~15 %',
      after: 'Digitale Zeiterfassung. Rechnung in 48 Stunden',
      highlight: 'Abrechnung von 3 Wo. auf 48 h',
      weeks: '3–4 Wochen'
    },
    {
      sector: 'Rechtsanwälte',
      title: '600 Mandate – bei Urlaub weiß niemand, wo was steht',
      situation: 'Kanzlei, 8 Anwälte. Aktenstand nur beim zuständigen Anwalt bekannt. Urlaub oder Krankheit: Mandant wartet, Kollegen suchen, Fristen rücken näher.',
      before: 'Wissen nur bei einer Person. Vertretung kaum möglich',
      after: 'Mandatsdatenbank + internes Wiki. Sofortige Vertretbarkeit',
      highlight: 'Vollständige Vertretbarkeit in 5 Wochen',
      weeks: '5 Wochen'
    },
    {
      sector: 'Rechtsanwälte',
      title: 'Abrechnungsfehler durch Papier-Stundenzettel eliminieren',
      situation: 'Kanzlei, 5 Anwälte. Stunden handschriftlich notiert, monatlich übertragen. Fehlerquote bei manueller Übertragung: ~15 %. Mandanten warten auf Rechnungen.',
      before: 'Abrechnung 3 Wochen nach Leistung. Fehlerquote ~15 %',
      after: 'Digitale Zeiterfassung. Rechnung in 48 Stunden',
      highlight: 'Abrechnungsfehler –93 %',
      weeks: '3–4 Wochen'
    }
  ];

  function initCasesRotator() {
    var strip = document.getElementById('cases-strip');
    if (!strip) return;

    var currentIndex = 0;
    var total = CASES.length;
    var timer = null;
    var isTransitioning = false;
    var INTERVAL = 6000;

    var cardEl      = document.getElementById('cases-card');
    var dotsEl      = document.getElementById('cases-dots');
    var counterEl   = document.getElementById('cases-counter');
    var prevBtn     = document.getElementById('cases-prev');
    var nextBtn     = document.getElementById('cases-next');
    var progressBar = document.getElementById('cases-progress-bar');

    if (!cardEl) return;

    /* Build dots */
    var visibleDots = Math.min(total, 11);
    for (var i = 0; i < visibleDots; i++) {
      var dot = document.createElement('button');
      dot.className = 'cases-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Beispiel ' + (i + 1));
      dot.setAttribute('data-index', i);
      dot.addEventListener('click', (function(idx) {
        return function() { goTo(idx); };
      })(i));
      dotsEl.appendChild(dot);
    }

    function renderCard(c, direction) {
      var html = '<div class="case-card-inner">'
        + '<div class="case-top-row">'
        + '<span class="case-sector-badge">' + c.sector + '</span>'
        + '</div>'
        + '<h3 class="case-title">' + c.title + '</h3>'
        + '<p class="case-situation">' + c.situation + '</p>'
        + '<div class="case-tags">'
        + '<span class="case-tag case-tag-before">Vorher: ' + c.before + '</span>'
        + '<span class="case-tag-arrow">&#8594;</span>'
        + '<span class="case-tag case-tag-after">Nachher: ' + c.after + '</span>'
        + '</div>'
        + '</div>'
        + '<div class="case-metrics">'
        + '<div class="case-metric">'
        + '<div class="case-metric-label">Kernergebnis</div>'
        + '<div class="case-metric-value">' + c.highlight + '</div>'
        + '</div>'
        + '<div class="case-metric">'
        + '<div class="case-metric-label">Umsetzung</div>'
        + '<div class="case-metric-value case-metric-weeks">' + c.weeks + '</div>'
        + '</div>'
        + '</div>';

      cardEl.innerHTML = html;
    }

    function updateDots(idx) {
      var dots = dotsEl.querySelectorAll('.cases-dot');
      dots.forEach(function(d, i) {
        d.classList.toggle('active', i === Math.min(idx, visibleDots - 1));
      });
    }

    function updateCounter(idx) {
      if (counterEl) counterEl.textContent = (idx + 1);
    }

    function resetProgress() {
      if (!progressBar) return;
      progressBar.style.transition = 'none';
      progressBar.style.width = '0%';
      setTimeout(function() {
        progressBar.style.transition = 'width ' + INTERVAL + 'ms linear';
        progressBar.style.width = '100%';
      }, 20);
    }

    function goTo(idx, dir) {
      if (isTransitioning) return;
      isTransitioning = true;

      cardEl.style.opacity = '0';
      cardEl.style.transform = 'translateY(8px)';

      setTimeout(function() {
        currentIndex = ((idx % total) + total) % total;
        renderCard(CASES[currentIndex]);
        updateDots(currentIndex);
        updateCounter(currentIndex);

        cardEl.style.opacity = '1';
        cardEl.style.transform = 'translateY(0)';

        isTransitioning = false;
      }, 260);

      resetProgress();
      clearTimer();
      startTimer();
    }

    function advance() {
      goTo(currentIndex + 1);
    }

    function startTimer() {
      timer = setTimeout(advance, INTERVAL);
    }

    function clearTimer() {
      if (timer) { clearTimeout(timer); timer = null; }
    }

    /* Init */
    renderCard(CASES[0]);
    updateCounter(0);
    resetProgress();
    startTimer();

    /* Controls */
    if (prevBtn) {
      prevBtn.addEventListener('click', function() { goTo(currentIndex - 1); });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function() { goTo(currentIndex + 1); });
    }

    /* Pause on hover */
    strip.addEventListener('mouseenter', function() { clearTimer(); });
    strip.addEventListener('mouseleave', function() {
      resetProgress();
      startTimer();
    });

    /* Touch swipe */
    var touchStartX = 0;
    cardEl.addEventListener('touchstart', function(e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    cardEl.addEventListener('touchend', function(e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goTo(currentIndex + 1);
        else goTo(currentIndex - 1);
      }
    }, { passive: true });
  }

  /* Run on DOM ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCasesRotator);
  } else {
    initCasesRotator();
  }

})();

/* ── Newsletter Brevo Integration ── */
(function () {
  var btn = document.getElementById('newsletter-btn');
  var input = document.getElementById('newsletter-email');
  var msg = document.getElementById('newsletter-msg');

  if (!btn || !input || !msg) return;

  btn.addEventListener('click', function () {
    var email = input.value.trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msg.style.color = '#e05c5c';
      msg.textContent = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
      return;
    }

    btn.disabled = true;
    btn.textContent = '…';
    msg.style.color = 'var(--w60)';
    msg.textContent = '';

    fetch('https://formspree.io/f/xgobjejp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email: email })
    })
    .then(function (res) {
      return res.json().then(function (data) {
        if (res.ok) {
          msg.style.color = '#5cbd8a';
          msg.textContent = 'Angemeldet. Willkommen an Bord.';
          input.value = '';
          btn.textContent = '✓';
        } else {
          throw new Error(data.error || 'Fehler');
        }
      });
    })
    .catch(function (err) {
      msg.style.color = '#e05c5c';
      msg.textContent = 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.';
      btn.disabled = false;
      btn.textContent = 'Anmelden';
    });
  });
})();
