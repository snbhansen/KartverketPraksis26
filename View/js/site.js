/* ==================================================
   FELLES SKRIPT FOR HELE NETTSTEDET

   Inneholder språkvelgeren og menypanelet. Filen
   lastes på alle sidene, og hver del kjører bare
   dersom elementene den trenger finnes på siden.
================================================== */

// ---------- SPRÅKVELGER ----------
(function () {
    var langSwitch = document.querySelector(".lang-switch");

    if (!langSwitch) {
        return;
    }

    var langButton = langSwitch.querySelector(".lang-button");
    var langMenu = document.getElementById("sprakmeny");
    var langOptions = langMenu.querySelectorAll("button[data-lang]");
    var translatable = document.querySelectorAll("[data-en]");

    // Den engelske tittelen ligger på <html data-title-en="...">,
    // slik at hver side kan ha sin egen tittel.
    var titles = {
        no: document.title,
        en: document.documentElement.getAttribute("data-title-en") || document.title
    };

    // Finner tekstnoden i elementet, slik at ikoner og piler ikke røres.
    function textNode(element) {
        for (var i = 0; i < element.childNodes.length; i++) {
            var node = element.childNodes[i];

            if (node.nodeType === 3 && node.textContent.trim() !== "") {
                return node;
            }
        }

        return null;
    }

    // Tar vare på den norske teksten før noe blir byttet ut.
    Array.prototype.forEach.call(translatable, function (element) {
        var node = textNode(element);

        if (node) {
            element.setAttribute("data-no", node.textContent.trim());
        }
    });

    function setLanguage(language) {
        Array.prototype.forEach.call(translatable, function (element) {
            var node = textNode(element);
            var text = element.getAttribute(language === "en" ? "data-en" : "data-no");

            if (node && text) {
                node.textContent = text;
            }
        });

        document.documentElement.lang = language;
        document.title = titles[language];

        Array.prototype.forEach.call(langOptions, function (option) {
            option.setAttribute("aria-current", option.getAttribute("data-lang") === language ? "true" : "false");
        });

        try {
            window.localStorage.setItem("sprak", language);
        } catch (error) {
            // Lagring kan være blokkert. Språkvalget gjelder da bare denne økten.
        }
    }

    function closeLangMenu() {
        langMenu.hidden = true;
        langButton.setAttribute("aria-expanded", "false");
    }

    langButton.addEventListener("click", function () {
        if (langMenu.hidden) {
            langMenu.hidden = false;
            langButton.setAttribute("aria-expanded", "true");
        } else {
            closeLangMenu();
        }
    });

    Array.prototype.forEach.call(langOptions, function (option) {
        option.addEventListener("click", function () {
            setLanguage(option.getAttribute("data-lang"));
            closeLangMenu();
            langButton.focus();
        });
    });

    document.addEventListener("click", function (event) {
        if (!langSwitch.contains(event.target)) {
            closeLangMenu();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeLangMenu();
        }
    });

    // Henter fram språkvalget fra forrige besøk.
    var stored = null;

    try {
        stored = window.localStorage.getItem("sprak");
    } catch (error) {
        stored = null;
    }

    setLanguage(stored === "en" ? "en" : "no");
})();


// ---------- MENYPANEL ----------
(function () {
    var button = document.querySelector(".menu-button");
    var panel = document.querySelector(".menu-panel");
    var overlay = document.querySelector(".menu-overlay");

    if (!button || !panel || !overlay) {
        return;
    }

    var closeButton = panel.querySelector(".menu-close");

    // Åpner panelet: gjør det synlig først, slik at overgangen kan spilles av.
    function openMenu() {
        panel.hidden = false;
        overlay.hidden = false;

        window.requestAnimationFrame(function () {
            panel.classList.add("is-open");
            overlay.classList.add("is-open");
        });

        document.body.classList.add("has-open-menu");
        button.setAttribute("aria-expanded", "true");
        closeButton.focus();
    }

    // Lukker panelet og skjuler det helt når overgangen er ferdig.
    function closeMenu() {
        panel.classList.remove("is-open");
        overlay.classList.remove("is-open");

        document.body.classList.remove("has-open-menu");
        button.setAttribute("aria-expanded", "false");
        button.focus();

        window.setTimeout(function () {
            if (!panel.classList.contains("is-open")) {
                panel.hidden = true;
                overlay.hidden = true;
            }
        }, 250);
    }

    button.addEventListener("click", openMenu);
    closeButton.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);

    document.addEventListener("keydown", function (event) {
        if (panel.classList.contains("is-open") && event.key === "Escape") {
            closeMenu();
        }
    });

    // Holder tastaturfokus inne i panelet så lenge det er åpent.
    panel.addEventListener("keydown", function (event) {
        if (event.key !== "Tab") {
            return;
        }

        var focusable = panel.querySelectorAll("button, a[href]");
        var first = focusable[0];
        var last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    });

    // ---------- STATUS UNDERMENY ----------
    var statusButton = panel.querySelector(".status-menu-button");
    var statusSubmenu = panel.querySelector(".status-submenu");

    if (!statusButton || !statusSubmenu) {
        return;
    }

    // Undermenyen står åpen fra start dersom en av statussidene er aktiv.
    if (statusSubmenu.querySelector("[aria-current='page']")) {
        statusSubmenu.hidden = false;
        statusButton.setAttribute("aria-expanded", "true");
    }

    statusButton.addEventListener("click", function () {
        var isOpen = statusButton.getAttribute("aria-expanded") === "true";

        statusSubmenu.hidden = isOpen;
        statusButton.setAttribute("aria-expanded", isOpen ? "false" : "true");
    });
})();
