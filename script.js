document.addEventListener('DOMContentLoaded', () => {
    // Hide Loader
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 800);
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    const themeIcon = themeBtn.querySelector('i');

    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        htmlEl.classList.replace('dark', 'light');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }

    themeBtn.addEventListener('click', () => {
        if (htmlEl.classList.contains('dark')) {
            htmlEl.classList.replace('dark', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            htmlEl.classList.replace('light', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Language Toggle
    const langBtn = document.getElementById('lang-toggle');
    let currentLang = localStorage.getItem('lang') || 'en';

    // Data for dynamic projects (Translating titles and descriptions here)
    const projects = [
        {
            id: 1,
            title_en: "Sales Report Years All",
            title_ar: "تقرير المبيعات السنوي (Sales Report Years)",
            category: "Data Visualization & Dashboard",
            desc_en: "Interactive dashboard providing insights into sales metrics, visualizing trends, and enabling data-driven decision making.",
            desc_ar: "لوحة تحكم تفاعلية توفر رؤى دقيقة حول مقاييس المبيعات، تصوير الاتجاهات، ودعم القرارات المستندة إلى البيانات.",
            thumbnail: "projict3/Screenshot 2026-02-27 172119.png",
            videoSrc: null,
            githubLink: "https://github.com/mohamedsalahabdelhamid/Sales-Report-Years"
        },
        {
            id: 2,
            title_en: "Superstore Performance View",
            title_ar: "عرض أداء المبيعات الشامل (Superstore Performance)",
            category: "Data Analysis",
            desc_en: "Detailed visual representations of financial datasets, highlighting key performance indicators.",
            desc_ar: "عروض مرئية تفصيلية للبيانات المالية تركز على إبراز أهم مؤشرات الأداء.",
            thumbnail: "projict1/Screenshot 2026-02-27 171925.png",
            videoSrc: null,
            githubLink: "https://github.com/mohamedsalahabdelhamid/Superstore-Performance-View"
        },
        {
            id: 3,
            title_en: "Laptop Market Analysis Dashboard",
            title_ar: "لوحة تحليل سوق الحواسيب المحمولة",
            category: "Reporting Automation",
            desc_en: "Comprehensive tracking dashboard for laptop market metrics, improving visibility into performance and completion rates.",
            desc_ar: "لوحة شاملة لمتابعة مقاييس سوق الأجهزة المحمولة، تحسن الرؤية حول الأداء ومعدلات المبيعات.",
            thumbnail: "projict2/Screenshot 2026-02-27 171804.png",
            videoSrc: null,
            githubLink: "https://github.com/mohamedsalahabdelhamid/Laptop-Market-Analysis-Dashboard"
        },
        {
            id: 7,
            title_en: "EDA: Telecom Churn Prediction",
            title_ar: "تحليل استكشافي: تراجع عملاء الاتصالات",
            category: "Exploratory Data Analysis",
            desc_en: "Extensive EDA on telecom customer data to identify patterns and factors contributing to customer churn.",
            desc_ar: "تحليل بيانات استكشافي موسع لبيانات عملاء الاتصالات لتحديد الأنماط والعوامل المؤدية لترك العملاء.",
            thumbnail: "projict5/Screenshot 2026-03-01 101339.png",
            videoSrc: null,
            githubLink: "https://github.com/mohamedsalahabdelhamid/EDA-Telecom-Churn-Prediction"
        }
    ];

    const projectsContainer = document.getElementById('projects-container');

    function renderProjects(lang) {
        projectsContainer.innerHTML = ''; // Clear previous

        projects.forEach(project => {
            const thumbSrc = project.thumbnail ? project.thumbnail : 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80';
            const hasVideo = project.videoSrc !== null;

            const title = lang === 'ar' ? project.title_ar : project.title_en;
            const desc = lang === 'ar' ? project.desc_ar : project.desc_en;

            const cardHTML = `
                <div class="project-card">
                    <div class="project-media">
                        <img src="${thumbSrc}" alt="${title}" onerror="this.src='https://images.unsplash.com/photo-1551288049-bebda4e38f71'">
                        ${hasVideo ? `
                        <div class="play-overlay" data-video="${project.videoSrc}" data-title="${title}">
                            <div class="play-btn"><i class="fas fa-play"></i></div>
                        </div>
                        ` : ''}
                    </div>
                    <div class="project-content">
                        <div class="project-category">${project.category}</div>
                        <h3 class="project-title">${title}</h3>
                        <p class="project-desc">${desc}</p>
                        ${project.githubLink ? `
                        <div style="margin-top: 1rem;">
                            <a href="${project.githubLink}" target="_blank" class="btn btn-secondary" style="padding: 6px 14px; font-size: 0.85rem;">
                                <i class="fab fa-github"></i> <span data-en="View Project" data-ar="عرض المشروع">View Project</span>
                            </a>
                        </div>
                        ` : ''}
                    </div>
                </div>
            `;
            projectsContainer.insertAdjacentHTML('beforeend', cardHTML);
        });

        // Reattach Modal Events after rendering
        attachModalEvents();
    }

    // Modal Logic encapsulated
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalTitle = document.getElementById('modalTitle');
    const closeBtn = document.querySelector('.close-modal');

    function attachModalEvents() {
        document.querySelectorAll('.play-overlay').forEach(btn => {
            btn.addEventListener('click', () => {
                const videoSrc = btn.getAttribute('data-video');
                const title = btn.getAttribute('data-title');

                modalVideo.src = videoSrc;
                modalTitle.textContent = title;
                modal.style.display = 'block';
                // Trigger reflow for transition
                void modal.offsetWidth;
                modal.classList.add('show');
                modalVideo.play();
            });
        });
    }

    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            modalVideo.pause();
            modalVideo.src = '';
        }, 300); // 300ms matches transition duration
    };

    closeBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            closeModal();
        }
    });

    // Translation Logic
    function applyTranslation(lang) {
        document.querySelectorAll('[data-en]').forEach(el => {
            el.innerHTML = el.getAttribute(`data-${lang}`);
        });

        if (lang === 'ar') {
            document.body.classList.replace('dir-ltr', 'dir-rtl');
            langBtn.textContent = 'EN';
            document.title = 'محمد صلاح عبد الحميد | محلل بيانات';
        } else {
            document.body.classList.replace('dir-rtl', 'dir-ltr');
            langBtn.textContent = 'AR';
            document.title = 'Mohamed Salah Abdelhamid | Data Analyst';
        }

        renderProjects(lang);
    }

    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        localStorage.setItem('lang', currentLang);
        applyTranslation(currentLang);
    });

    // Initialize formatting based on saved theme and language
    applyTranslation(currentLang);

    // Set Copyright Year
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Smooth Scrolling for Nav Links (adjusted)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
