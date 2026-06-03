(function () {
  window.dataLayer = window.dataLayer || [];

  var nav = document.querySelector("[data-nav]");
  var toggle = document.querySelector("[data-menu-toggle]");

  if (nav && toggle) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      document.body.classList.toggle("menu-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.addEventListener("click", function (event) {
      if (event.target instanceof HTMLAnchorElement) {
        nav.classList.remove("is-open");
        document.body.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  document.querySelectorAll("[data-faq-toggle]").forEach(function (button) {
    button.addEventListener("click", function () {
      var item = button.closest(".faq-item");
      if (!item) return;
      var answer = item.querySelector(".faq-answer");
      var isOpen = item.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(isOpen));
      if (answer) answer.hidden = !isOpen;
    });
  });

  document.querySelectorAll("[data-whatsapp-url]").forEach(function (link) {
    var base = link.getAttribute("data-whatsapp-url");
    if (!base) return;
    try {
      var current = new URL(window.location.href);
      var target = new URL(base);
      ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach(function (key) {
        var value = current.searchParams.get(key);
        if (value) target.searchParams.set(key, value);
      });
      link.setAttribute("href", target.toString());
    } catch (error) {
      link.setAttribute("href", base);
    }
  });

  document.addEventListener("click", function (event) {
    var target = event.target instanceof Element ? event.target.closest("[data-event]") : null;
    if (!target) return;
    var params = new URLSearchParams(window.location.search);

    var payload = {
      event: target.getAttribute("data-event"),
      page_path: target.getAttribute("data-page") || window.location.pathname,
      page_title: document.title,
      cta_label: target.textContent ? target.textContent.trim() : "",
      service: target.getAttribute("data-service") || undefined,
      city: target.getAttribute("data-city") || undefined,
      cta_location: target.getAttribute("data-cta-location") || undefined,
      whatsapp_message: target.getAttribute("data-whatsapp-message") || undefined,
      whatsapp_message_type: target.getAttribute("data-message-type") || undefined,
      timestamp: new Date().toISOString(),
      utm_source: params.get("utm_source") || undefined,
      utm_medium: params.get("utm_medium") || undefined,
      utm_campaign: params.get("utm_campaign") || undefined,
      utm_content: params.get("utm_content") || undefined,
      utm_term: params.get("utm_term") || undefined
    };

    window.dataLayer.push(payload);
  });

  var revealItems = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealItems.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }
})();
