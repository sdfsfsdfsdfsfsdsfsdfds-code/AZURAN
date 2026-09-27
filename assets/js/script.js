document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;
    const loader = document.getElementById("loader");
    const header = document.getElementById("siteHeader");
    const menuToggle = document.getElementById("menuToggle");
    const languageSwitcher = document.getElementById("languageSwitcher");

    /* LOADER */

    window.addEventListener("load", () => {
        setTimeout(() => {
            loader?.classList.add("hide");
            body.classList.remove("loading");
        }, 500);
    });


    /* HEADER */

    const headerScroll = () => {
        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", headerScroll);
    headerScroll();


    /* MOBILE MENU */

    menuToggle?.addEventListener("click", () => {

        const open = body.classList.toggle("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(open)
        );
    });


    document.querySelectorAll(".main-nav a").forEach(link => {

        link.addEventListener("click", () => {

            body.classList.remove("menu-open");

            menuToggle?.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    /* LANGUAGE */

    let currentLanguage =
        localStorage.getItem("azuran-language") || "fa";

    function applyLanguage(language) {

        currentLanguage = language;

        localStorage.setItem(
            "azuran-language",
            language
        );

        document.documentElement.lang = language;

        document.documentElement.dir =
            language === "fa" ? "rtl" : "ltr";

        document.querySelectorAll("[data-fa]").forEach(el => {

            const text =
                language === "fa"
                    ? el.dataset.fa
                    : el.dataset.en;

            if (text !== undefined) {
                el.innerHTML = text;
            }

        });

        document.querySelectorAll(".language-option").forEach(el => {

            el.classList.toggle(
                "active",
                el.dataset.lang === language
            );

        });

        document.body.classList.toggle(
            "english",
            language === "en"
        );
    }


    languageSwitcher?.addEventListener("click", () => {

        applyLanguage(
            currentLanguage === "fa"
                ? "en"
                : "fa"
        );

    });


    applyLanguage(currentLanguage);


    /* REVEAL */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("visible");

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: .12
                }
            );

        revealElements.forEach(el => {
            observer.observe(el);
        });

    } else {

        revealElements.forEach(el => {
            el.classList.add("visible");
        });

    }


    /* PRODUCT FILTER */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const productItems =
        document.querySelectorAll("[data-category]");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            const filter =
                button.dataset.filter;

            productItems.forEach(item => {

                const category =
                    item.dataset.category;

                const show =
                    filter === "all" ||
                    category === filter;

                item.style.display =
                    show ? "" : "none";

            });

        });

    });


    /* CONTACT FORM */

    const contactForm =
        document.querySelector(".contact-form");

    contactForm?.addEventListener("submit", event => {

        event.preventDefault();

        const message =
            document.querySelector(".form-message");

        if (message) {

            const fa =
                message.dataset.fa ||
                "پیام شما آماده ارسال است.";

            const en =
                message.dataset.en ||
                "Your message is ready to be sent.";

            message.textContent =
                currentLanguage === "fa"
                    ? fa
                    : en;

            message.classList.add("show");

        }

    });


    /* GALLERY LIGHTBOX */

    const galleryItems =
        document.querySelectorAll(".gallery-item");

    if (galleryItems.length) {

        const lightbox =
            document.createElement("div");

        lightbox.className = "lightbox";

        lightbox.innerHTML = `
            <button class="lightbox-close" aria-label="Close">×</button>
            <img src="" alt="">
        `;

        document.body.appendChild(lightbox);

        const lightboxImage =
            lightbox.querySelector("img");

        galleryItems.forEach(item => {

            item.addEventListener("click", () => {

                const img =
                    item.querySelector("img");

                if (!img) return;

                lightboxImage.src = img.src;
                lightboxImage.alt = img.alt;

                lightbox.classList.add("open");

            });

        });

        lightbox.addEventListener("click", event => {

            if (
                event.target === lightbox ||
                event.target.classList.contains("lightbox-close")
            ) {
                lightbox.classList.remove("open");
            }

        });

    }


    /* ESC */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            body.classList.remove("menu-open");

            document
                .querySelector(".lightbox.open")
                ?.classList.remove("open");

        }

    });

});
