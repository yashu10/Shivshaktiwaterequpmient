/**
 * Shiv Shakti Javascript
 * Handles UI interactions, slider, and intersection observers for "anti-gravity" effects.
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Header Update
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.add('scrolled'); // Force color if we want always light header or remove if transparent at top
        }
    });

    // Make header scrolled initially if down the page
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }

    // 2. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');
    
    mobileToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        // Simple animation for hamburger
        if (mainNav.classList.contains('active')) {
            mobileToggle.querySelector('.hamburger').style.background = 'transparent';
            mobileToggle.querySelector('.hamburger').style.setProperty('--pseudo-transform-before', 'rotate(45deg) translate(5px, 5px)');
        } else {
            mobileToggle.querySelector('.hamburger').style.background = '';
        }
    });

    // Handle dropdown toggles on mobile
    const dropdowns = document.querySelectorAll('.has-dropdown > a, .has-subdropdown > a');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.parentElement.classList.toggle('open');
            }
        });
    });

    // Close mobile menu on link click (ignoring dropdown toggles)
    document.querySelectorAll('.nav-links a:not(.has-dropdown > a):not(.has-subdropdown > a)').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            mobileToggle.querySelector('.hamburger').style.background = '';
            mobileToggle.querySelector('.hamburger').style.removeProperty('--pseudo-transform-before');
        });
    });

    // 3. Hero Slider Logic
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    let currentSlide = 0;
    let slideInterval;

    function initSlider() {
        if(slides.length === 0) return;
        
        const goToSlide = (n) => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
        };

        const nextSlide = () => goToSlide(currentSlide + 1);
        const prevSlide = () => goToSlide(currentSlide - 1);

        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        const resetInterval = () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 7000); // 7s per slide
        };

        // Start Auto Slider
        slideInterval = setInterval(nextSlide, 7000);
    }
    
    initSlider();

    // 4. "Anti-Gravity" Animate On Scroll (Intersection Observer)
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // 5. Promotional Popup (Re-opens every 5 seconds as requested)
    const popup = document.getElementById('leadPopup');
    let popupTimer;
    
    if (popup) {
        const popupClose = popup.querySelector('.popup-close');
        
        const showPopup = (type = 'brochure') => {
            const subtitle = popup.querySelector('.popup-subtitle');
            const title = popup.querySelector('.popup-title');
            const submitBtn = popup.querySelector('.btn-orange');

            if (type === 'quote') {
                subtitle.innerHTML = 'INTERESTED IN OUR MACHINERY?';
                title.innerHTML = 'Fill Up This Form &<br>Request a Quote :';
                submitBtn.innerHTML = 'REQUEST QUOTE';
            } else {
                subtitle.innerHTML = 'GET MORE DETAILS<br>ABOUT OUR PRODUCT?';
                title.innerHTML = 'Fill Up This Form &<br>Download Brochure :';
                submitBtn.innerHTML = 'DOWNLOAD BROCHURE';
            }
            popup.classList.add('show');
        };

        // Initially open after 1.5 seconds (only once per page load)
        popupTimer = setTimeout(() => showPopup('brochure'), 1500);
        
        const handleClose = () => {
            popup.classList.remove('show');
            // Timer logic for reappearing has been removed so it only pops up once per visit
        };

        // Close when clicking the X
        popupClose.addEventListener('click', handleClose);
        
        // Close when clicking outside the popup content
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                handleClose();
            }
        });
        
        // Open popup when 'Download Brochure' buttons are clicked
        const brochureBtns = document.querySelectorAll('a[href="#brochure"], a[href="index.html#brochure"], .secondary-cta');
        brochureBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                showPopup('brochure');
            });
        });

        // Open popup when 'Request A Quote' buttons are clicked
        const quoteBtns = document.querySelectorAll('a[href="#quote"], a[href="index.html#quote"]');
        quoteBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                showPopup('quote');
            });
        });
    }

    // 6. Blog & Video Filtering Logic
    const filterBtns = document.querySelectorAll('.filter-btn');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active styling from sibling buttons
                const parent = btn.closest('div');
                if (parent) {
                    parent.querySelectorAll('.filter-btn').forEach(fb => {
                        fb.classList.remove('active');
                    });
                } else {
                    filterBtns.forEach(fb => { fb.classList.remove('active'); });
                }
                
                // Add active styling to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                // Filter Blog Cards
                const blogCards = document.querySelectorAll('.blog-card');
                if (blogCards.length > 0) {
                    blogCards.forEach(card => {
                        if (filterValue === 'all') {
                            card.style.display = '';
                        } else {
                            const categoryElement = card.querySelector('.blog-category');
                            if (categoryElement && categoryElement.textContent.trim() === filterValue) {
                                card.style.display = '';
                            } else {
                                card.style.display = 'none';
                            }
                        }
                    });
                }

                // Filter Video Cards
                const videoCards = document.querySelectorAll('.video-card');
                if (videoCards.length > 0) {
                    videoCards.forEach(card => {
                        if (filterValue === 'all') {
                            card.style.display = '';
                        } else {
                            const titleElement = card.querySelector('h3');
                            if (titleElement) {
                                const titleT = titleElement.textContent.toLowerCase();
                                let isMatch = false;
                                
                                if (filterValue === 'Filling Lines' && (titleT.includes('filling') || titleT.includes('filler'))) isMatch = true;
                                if (filterValue === 'Blow Moulding' && (titleT.includes('blow') || titleT.includes('blowing'))) isMatch = true;
                                if (filterValue === 'Labelling' && (titleT.includes('label') || titleT.includes('labelling') || titleT.includes('sticker'))) isMatch = true;
                                if (filterValue === 'Client Installations' && (titleT.includes('africa') || titleT.includes('installed') || titleT.includes('plant'))) isMatch = true;
                                
                                if (isMatch) card.style.display = '';
                                else card.style.display = 'none';
                            }
                        }
                    });
                }
            });
        });
    }

    // 7. Video Carousel Logic
    const videoTrack = document.getElementById('videoTrack');

    if (videoTrack) {
        let videoIndex = 0;
        let slideInterval;

        const updateVideoCarousel = () => {
            const cards = videoTrack.querySelectorAll('.video-card');
            if(cards.length === 0) return;
            const cardWidth = cards[0].offsetWidth;
            const gap = 30; // Matches CSS gap
            const moveAmt = cardWidth + gap;
            
            // Calculate max index
            const visibleCards = window.innerWidth > 991 ? 3 : (window.innerWidth > 576 ? 2 : 1);
            const maxIndex = Math.max(0, cards.length - visibleCards);

            if (videoIndex > maxIndex) videoIndex = 0;

            videoTrack.style.transform = `translateX(-${videoIndex * moveAmt}px)`;
        };

        const nextSlide = () => {
            videoIndex++;
            updateVideoCarousel();
        };

        // Start Auto Slider
        slideInterval = setInterval(nextSlide, 3500); // 3.5s per slide

        // Pause on hover
        videoTrack.addEventListener('mouseenter', () => clearInterval(slideInterval));
        videoTrack.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 3500);
        });

        window.addEventListener('resize', updateVideoCarousel);
        
        // Initial setup
        updateVideoCarousel();
    }

    // 8. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (!question) return;

            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all FAQ items first
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const btn = otherItem.querySelector('.faq-question');
                    if (btn) btn.setAttribute('aria-expanded', 'false');
                });

                // Toggle the clicked item
                if (!isActive) {
                    item.classList.add('active');
                    question.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }

});

// Global Video Modal Logic
function openVideo(url) {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('youtubeFrame');
    if (modal && iframe) {
        iframe.src = url + "?autoplay=1";
        modal.classList.add('active');
    }
}

function closeVideo() {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('youtubeFrame');
    if (modal && iframe) {
        modal.classList.remove('active');
        iframe.src = ""; // Stop the video
    }
}

// Close on background click
document.addEventListener('click', function (e) {
    const modal = document.getElementById('videoModal');
    if (modal && e.target === modal) {
        closeVideo();
    }
});
