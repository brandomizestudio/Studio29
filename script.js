// Studio 29 - Professional Website Scripts

document.addEventListener('DOMContentLoaded', () => {

    // ===== Scroll Header Effect =====
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ===== Scroll Reveal Animation =====
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100); // Stagger effect
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ===== Horizontal Scroll Gallery =====
    const horizontalGallery = document.getElementById('horizontal-gallery');

    if (horizontalGallery) {
        // Using images from public/images/
        const imageFiles = [
            '003 (55).jpg', '004 (23).jpg', '005 (33).jpg',
            '006 (22).jpg', '007 (15).jpg', '008 (17).jpg',
            '009 (22).jpg', '010 (16).jpg', 'DSC07155-.jpg',
            'S29_0363-.jpg', '0L8A2222-.jpg', 'AMN09385--.jpg'
        ];

        // Function to create gallery items
        const createGalleryItem = (filename, index) => {
            const div = document.createElement('div');
            div.className = 'horizontal-gallery-item';
            // div.classList.add('reveal'); // Removed reveal to prevent interference with infinite scroll
            div.innerHTML = `
                <img src="public/images/${encodeURIComponent(filename)}" loading="lazy" alt="Featured Story">
            `;
            div.addEventListener('click', () => openLightbox(`public/images/${encodeURIComponent(filename)}`));
            return div;
        };

        // Populate initial items
        imageFiles.forEach((filename, index) => {
            horizontalGallery.appendChild(createGalleryItem(filename, index));
        });

        // Infinite Scroll Logic
        const scrollSpeed = 1; // Speed in pixels per frame
        let scrollPosition = 0;
        let isHovered = false;

        // Clone items for infinite loop illusion
        // We need enough clones to fill the screen + buffer
        const originalItems = Array.from(horizontalGallery.children);
        
        // Clone initial set to ensure smooth looping
        originalItems.forEach(item => {
            const clone = item.cloneNode(true);
            // Re-attach event listener to clone (since cloneNode doesn't copy events)
            const img = clone.querySelector('img');
            if(img) {
                const src = img.getAttribute('src');
                clone.addEventListener('click', () => openLightbox(src));
            }
            horizontalGallery.appendChild(clone);
        });

        // Pause on hover
        horizontalGallery.parentElement.addEventListener('mouseenter', () => {
            isHovered = true;
        });

        horizontalGallery.parentElement.addEventListener('mouseleave', () => {
            isHovered = false;
        });

        function animateScroll() {
            if (!isHovered) {
                scrollPosition += scrollSpeed;
                
                // Reset position when first set of items is fully scrolled out
                // Assuming all items have same width + gap. 
                // Better approach: Check scrollWidth/2
                if (scrollPosition >= horizontalGallery.scrollWidth / 2) {
                    scrollPosition = 0;
                }
                
                horizontalGallery.style.transform = `translateX(-${scrollPosition}px)`;
            }
            requestAnimationFrame(animateScroll);
        }

        // Start animation
        requestAnimationFrame(animateScroll);
    }

    // ===== Portfolio Grid (Legacy - kept if needed for reference, but safely checks existence) =====
    const portfolioGrid = document.getElementById('portfolio-grid');

    if (portfolioGrid) {
        const portfolioItems = [
            { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop', category: 'wedding', title: 'Sarah & Michael', subtitle: 'Garden Wedding' },
            { src: 'https://images.unsplash.com/photo-1511285560982-1351cdeb9821?w=600&h=600&fit=crop', category: 'details', title: 'Floral Elegance', subtitle: 'Wedding Details' },
            { src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&h=800&fit=crop', category: 'pre-wedding', title: 'Emma & Jake', subtitle: 'Engagement Session' },
            { src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&h=600&fit=crop', category: 'details', title: 'Golden Hour', subtitle: 'Reception Details' },
            { src: 'https://images.unsplash.com/photo-1520854221256-17451cc330e7?w=600&h=800&fit=crop', category: 'wedding', title: 'Priya & Rahul', subtitle: 'Destination Wedding' },
            { src: 'https://images.unsplash.com/photo-1522673607200-1645062cd958?w=600&h=800&fit=crop', category: 'pre-wedding', title: 'Beach Romance', subtitle: 'Pre-Wedding Shoot' },
            { src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=600&fit=crop', category: 'wedding', title: 'First Dance', subtitle: 'Reception Moments' },
            { src: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&h=800&fit=crop', category: 'pre-wedding', title: 'Sunset Love', subtitle: 'Engagement Photos' },
            { src: 'https://images.unsplash.com/photo-1507915977619-6ccfe8003ae6?w=600&h=600&fit=crop', category: 'details', title: 'Ring Details', subtitle: 'Macro Photography' },
        ];

        const renderPortfolio = (category = 'all') => {
            portfolioGrid.innerHTML = '';

            portfolioItems.forEach((item, index) => {
                if (category === 'all' || item.category === category) {
                    const div = document.createElement('div');
                    div.className = 'portfolio-item';
                    div.style.animationDelay = `${index * 0.1}s`;
                    div.innerHTML = `
                        <img src="${item.src}" loading="lazy" alt="${item.title}">
                        <div class="portfolio-overlay">
                            <h3>${item.title}</h3>
                            <p class="category">${item.subtitle}</p>
                        </div>
                    `;
                    portfolioGrid.appendChild(div);

                    // Trigger animation
                    setTimeout(() => {
                        div.style.opacity = '1';
                        div.style.transform = 'scale(1)';
                    }, index * 50);
                }
            });
        };

        // Initial render
        renderPortfolio();

        // Filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter portfolio
                const category = btn.getAttribute('data-category');
                renderPortfolio(category);
            });
        });
    }

    // ===== Testimonials Carousel =====
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.carousel-dot');
    let currentTestimonial = 0;

    const showTestimonial = (index) => {
        testimonials.forEach(t => t.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
    };

    const nextTestimonial = () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    };

    // Auto-play carousel
    if (testimonials.length > 0) {
        setInterval(nextTestimonial, 5000);

        // Dot click handlers
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentTestimonial = index;
                showTestimonial(currentTestimonial);
            });
        });
    }

    // ===== Gallery Page Logic =====
    const galleryGrid = document.getElementById('gallery-grid');

    if (galleryGrid) {
        // Actual images from public/gallerypage/
        const imageFiles = [
            '003 (8).jpg', '003 (80).jpg', '004 (25).jpg', '004 (38).jpg', '004 (50).jpg',
            '004 (68).jpg', '004 (7).jpg', '004 (8).jpg', '004 (81).jpg', '004 (88).jpg',
            '005 (17).jpg', '005 (34).jpg', '005 (37).jpg', '005 (40).jpg', '005 (46).jpg',
            '005 (48).jpg', '005 (62).jpg', '005 (79).jpg', '005 (84).jpg', '006 (15).jpg',
            '006 (57).jpg', '007 (16).jpg', '007 (52).jpg', '007 (58).jpg', '007 (73).jpg',
            '007 (78).jpg', '008 (10).jpg', '008 (6).jpg', '008 (63).jpg', '009 (39).jpg',
            '009 (47).jpg', '009 (62).jpg', '009 (74).jpg', '010 (12).jpg', '010 (13).jpg',
            '010 (2).jpg', '010 (31).jpg', '010 (62).jpg', '010 (74).jpg', '010.jpg',
            'DSC07171-.jpg', 'DSC07225-.jpg', 'DSC07260-.jpg', 'S29_0314-.jpg'
        ];

        // Assign categories randomly for demonstration (or based on patterns if known)
        const galleryItems = imageFiles.map((filename, index) => {
            let category = 'wedding';
            if (index % 3 === 0) category = 'pre-wedding';
            else if (index % 3 === 1) category = 'haldi';
            
            return {
                src: `public/gallerypage/${encodeURIComponent(filename)}`,
                category: category
            };
        });

        const renderGallery = (filter = 'all') => {
            galleryGrid.innerHTML = '';
            
            // Add fade-in effect class
            galleryGrid.style.opacity = '0';
            galleryGrid.style.transition = 'opacity 0.5s ease';

            let visibleCount = 0;

            galleryItems.forEach((item, index) => {
                if (filter === 'all' || item.category === filter) {
                    const div = document.createElement('div');
                    div.className = 'gallery-card';
                    // Lazy loading for performance
                    div.innerHTML = `<img src="${item.src}" loading="lazy" alt="Gallery Image">`;
                    div.addEventListener('click', () => openLightbox(item.src));
                    galleryGrid.appendChild(div);
                    visibleCount++;
                }
            });

            // Fade in after small delay
            requestAnimationFrame(() => {
                galleryGrid.style.opacity = '1';
            });
        };

        renderGallery();

        // Filter buttons for gallery page
        const filterContainer = document.getElementById('filter-buttons');
        if (filterContainer) {
            const buttons = filterContainer.querySelectorAll('button');
            buttons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const filterValue = e.target.getAttribute('data-filter');
                    renderGallery(filterValue);

                    buttons.forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                });
            });
        }
    }

    // ===== Lightbox =====
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
    const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

    function openLightbox(src) {
        if (lightbox && lightboxImg) {
            lightboxImg.src = src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== Mobile Hamburger Menu (Portal Implementation) =====
    const hamburger = document.querySelector('.hamburger');
    const originalNavLinks = document.querySelector('.nav-links'); // The UL in header

    if (hamburger && originalNavLinks) {
        // Create Portal Container
        const mobileMenuOverlay = document.createElement('div');
        mobileMenuOverlay.className = 'mobile-menu-overlay';
        
        // Create Close Button
        const closeBtn = document.createElement('div');
        closeBtn.className = 'mobile-menu-close';
        closeBtn.innerHTML = '&times;';
        mobileMenuOverlay.appendChild(closeBtn);

        // Clone Links
        const linksList = document.createElement('ul');
        // Get all LI elements from original nav
        const originalLis = originalNavLinks.querySelectorAll('li');
        
        originalLis.forEach(li => {
            // Clone the LI
            const clonedLi = li.cloneNode(true);
            linksList.appendChild(clonedLi);
            
            // Add click listener to close menu when link clicked
            const link = clonedLi.querySelector('a');
            if (link) {
                link.addEventListener('click', () => {
                    toggleMenu();
                });
            }
        });
        
        mobileMenuOverlay.appendChild(linksList);
        document.body.appendChild(mobileMenuOverlay);

        const toggleMenu = () => {
             // Toggle Active Class on Overlay
             const isActive = mobileMenuOverlay.classList.contains('active');
             
             if (isActive) {
                 mobileMenuOverlay.classList.remove('active');
                 hamburger.classList.remove('toggle');
                 document.body.style.overflow = '';
             } else {
                 mobileMenuOverlay.classList.add('active');
                 hamburger.classList.add('toggle');
                 document.body.style.overflow = 'hidden';
             }
        };

        hamburger.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent immediate close
            toggleMenu();
        });

        closeBtn.addEventListener('click', toggleMenu);

        // Close when clicking outside the menu card (on backdrop)
        document.addEventListener('click', (e) => {
            if (mobileMenuOverlay.classList.contains('active') && 
                !mobileMenuOverlay.contains(e.target) && 
                !hamburger.contains(e.target)) {
                // Check if click is on the overlay itself (backdrop) or outside
                // Since overlay covers screen, clicking "outside" the card means clicking the overlay padding area?
                // Actually, the overlay IS the card in CSS?
                // Wait, in CSS: .mobile-menu-overlay is the CARD.
                // The backdrop is the box-shadow.
                // Clicking the box-shadow (backdrop) technically registers as clicking the element if it covers the screen?
                // No, box-shadow doesn't capture clicks.
                // But .mobile-menu-overlay is fixed and centered.
                // If I click outside the card, I am clicking on whatever is behind it (header, body).
                // So document click listener is correct.
                toggleMenu();
            }
        });
        
        // Prevent clicks inside the menu from closing it
        mobileMenuOverlay.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
});
