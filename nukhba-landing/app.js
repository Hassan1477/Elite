(() => {
  const plans = {
    weekly: {
      name: "باقة الأسبوع",
      price: "50",
      for: "تجربة جادة خلال 7 أيام",
      badge: "بداية سريعة",
      cta: "اختر باقة الأسبوع",
      features: [
        "30 رسالة / 24 ساعة",
        "5 صور / 24 ساعة · فيديو كل 7 أيام",
        "مقارنات بلا حد · خدمات وأكواد",
        "VIP ستوري يومي + كود كل 3 أيام",
      ],
    },
    monthly: {
      name: "باقة الشهر",
      price: "90",
      for: "استخدام مرن بإيقاع شهري",
      badge: "مرونة شهرية",
      cta: "اختر باقة الشهر",
      features: [
        "نفس حصص الأسبوع بإيقاع شهري",
        "30 رسالة و5 صور يوميًا",
        "مقارنات بلا حد · خدمات وأكواد",
        "VIP ستوري + كود كل 3 أيام",
      ],
    },
    yearly: {
      name: "باقة السنة",
      price: "700",
      for: "للاستخدام المنتظم — توفّر 380 ر.س مقابل 12× الشهر",
      badge: "أفضل قيمة",
      cta: "اختر باقة السنة",
      features: [
        "نفس الحصص طوال السنة",
        "30 رسالة و5 صور يوميًا",
        "مقارنات بلا حد · خدمات وأكواد",
        "VIP ستوري + كود كل 3 أيام",
      ],
    },
  };

  /* Path picker */
  const pathTabs = document.querySelectorAll(".path-tab");
  const pathCards = document.querySelectorAll(".path-card");

  pathTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const key = tab.dataset.path;
      pathTabs.forEach((t) => {
        const on = t === tab;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", on ? "true" : "false");
      });
      pathCards.forEach((card) => {
        const match = card.dataset.for === key;
        card.hidden = !match;
        card.classList.toggle("is-visible", match);
      });
    });
  });

  /* Trial steps */
  let trialStep = 1;
  const steps = document.querySelectorAll(".trial-step");
  const prevBtn = document.getElementById("trial-prev");
  const nextBtn = document.getElementById("trial-next");
  const trialCta = document.getElementById("trial-cta");

  function renderTrial() {
    steps.forEach((el) => {
      el.classList.toggle("is-active", Number(el.dataset.step) === trialStep);
    });
    prevBtn.disabled = trialStep === 1;
    const last = trialStep === steps.length;
    nextBtn.hidden = last;
    trialCta.hidden = !last;
  }

  prevBtn?.addEventListener("click", () => {
    trialStep = Math.max(1, trialStep - 1);
    renderTrial();
  });
  nextBtn?.addEventListener("click", () => {
    trialStep = Math.min(steps.length, trialStep + 1);
    renderTrial();
  });
  renderTrial();

  /* Pricing toggle */
  const billOpts = document.querySelectorAll(".bill-opt");
  const sideRows = document.querySelectorAll("[data-bill-row]");

  function setPlan(key) {
    const plan = plans[key];
    if (!plan) return;
    billOpts.forEach((btn) => {
      const on = btn.dataset.bill === key;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });
    sideRows.forEach((row) => {
      row.classList.toggle("is-spotlight", row.dataset.billRow === key);
    });
    document.getElementById("plan-badge").textContent = plan.badge;
    document.getElementById("plan-name").textContent = plan.name;
    document.getElementById("plan-price").textContent = plan.price;
    document.getElementById("plan-for").textContent = plan.for;
    document.getElementById("plan-cta").textContent = plan.cta;
    const list = document.getElementById("plan-features");
    list.innerHTML = plan.features.map((f) => `<li>${f}</li>`).join("");
    document.getElementById("pricing-spotlight").animate(
      [{ transform: "scale(0.985)", opacity: 0.85 }, { transform: "scale(1)", opacity: 1 }],
      { duration: 280, easing: "ease-out" }
    );
  }

  billOpts.forEach((btn) => {
    btn.addEventListener("click", () => setPlan(btn.dataset.bill));
  });
  setPlan("yearly");

  /* FAQ one-open */
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      faqItems.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });

  /* Scroll reveal */
  document.querySelectorAll(".section").forEach((sec) => {
    sec.setAttribute("data-reveal", "");
  });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

  /* Assistant widget */
  const panel = document.getElementById("assistant-panel");
  const toggle = document.getElementById("assistant-toggle");
  const closeBtn = document.getElementById("assistant-close");
  const form = document.getElementById("assistant-form");
  const input = document.getElementById("assistant-input");
  const msgs = document.getElementById("assistant-msgs");

  function setOpen(open) {
    panel.hidden = !open;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  toggle?.addEventListener("click", () => setOpen(panel.hidden));
  closeBtn?.addEventListener("click", () => setOpen(false));

  function addMsg(text, who) {
    const div = document.createElement("div");
    div.className = `msg ${who}`;
    div.textContent = text;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function replyTo(text) {
    const t = text.trim();
    let reply = "تمام — اختر مهمة من مسارك أو ابدأ التجربة بثلاث محاولات.";
    if (/إعلان|اعلان|أكتب|اكتب/i.test(t)) {
      reply = "خلّنا نصيغ إعلانًا موجّهًا لجمهورك. افتح مسار الإبداع وجرّب محاولتك الأولى.";
    } else if (/وفّر|اوفر|أوفّر|قارن|كود/i.test(t)) {
      reply = "للتوفير: قارن المتاجر وراجع شرط الكود قبل الدفع. مسار التوفير جاهز لك.";
    } else if (/بدا|بداية|مساعدة|مساعد/i.test(t)) {
      reply = "ابدأ بمهمة واحدة فقط — إعلان أو مقارنة — ثم قرّر الباقة إن ناسبتك التجربة.";
    }
    setTimeout(() => addMsg(reply, "bot"), 380);
  }

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    addMsg(text, "user");
    input.value = "";
    replyTo(text);
  });

  document.querySelectorAll(".assistant-quick button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const text = btn.dataset.prompt;
      addMsg(text, "user");
      replyTo(text);
    });
  });
})();
