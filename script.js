console.log('Hello from script.js');

document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('hero-video');

    if (video) {
        // Wait 2 seconds before playing
        setTimeout(() => {
            video.play().catch(error => {
                console.log("Autoplay was prevented:", error);
            });
        }, 1500);

        // Pause on the final frame when video ends
        video.addEventListener('ended', () => {
            video.pause();
        });
    }

    // Initialize Organic Tree Timeline
    initOrganicTimeline();

    // Initialize Equipped Skills Section
    initSkillsSection();
});

function initSkillsSection() {
    // Scroll Reveal with Staggered Typewriter Effect
    const section = document.getElementById('equipped-skills');
    const titles = document.querySelectorAll('.skill-title');

    if (section && titles.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Initial Delay of 0.5s (500ms)
                    setTimeout(() => {
                        // Staggered Animation
                        titles.forEach((title, index) => {
                            setTimeout(() => {
                                title.classList.add('typing');

                                // Remove cursor blink after animation completes (1.5s duration)
                                setTimeout(() => {
                                    title.classList.add('typed');
                                    title.classList.remove('typing');
                                }, 2500);

                            }, index * 1000); // 1s stagger between each title
                        });
                    }, 1000); // Wait 0.5s before starting the sequence

                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, { threshold: 0.3 }); // Trigger when 30% visible
        observer.observe(section);
    }
}

function initOrganicTimeline() {
    const fillLayer = document.getElementById('tree-fill-layer');
    if (!fillLayer) return;

    const navLinks = document.querySelectorAll('.ink-link');

    function updateTimeline() {
        const viewportHeight = window.innerHeight;
        const viewportCenter = viewportHeight / 40;

        // --- 1. CONTINUOUS PROGRESS BAR (Scroll Based) ---
        const scrollTop = window.scrollY;
        // The document height minus viewport is the total scrollable distance
        const docHeight = document.body.scrollHeight - viewportHeight;

        let scrollPercent = 0;
        if (docHeight > 0) {
            scrollPercent = (scrollTop / docHeight) * 100;
        }

        // Clamp between 0 and 100
        scrollPercent = Math.min(Math.max(scrollPercent, 0), 100);

        // Clip-path inset from right: 100% (hidden) -> 0% (full)
        const insetRight = 100 - scrollPercent;
        fillLayer.style.clipPath = `inset(0 ${insetRight}% 0 0)`;


        // --- 2. ACTIVE NAV LINKS (Section Based) ---
        // We still want the text to highlight based on which section is "active"
        const projects = document.getElementById('projects');
        const about = document.getElementById('about');
        const contact = document.getElementById('contact');

        let activeIndex = -1;

        if (projects && about && contact) {
            const projectsRect = projects.getBoundingClientRect();
            const aboutRect = about.getBoundingClientRect();
            const contactRect = contact.getBoundingClientRect();

            // Determine Active Section based on center overlap
            if (contactRect.top <= viewportCenter) activeIndex = 2;
            else if (aboutRect.top <= viewportCenter) activeIndex = 1;
            else if (projectsRect.top <= viewportCenter) activeIndex = 0;
            else activeIndex = -1; // Hero

            // Update Active Link Style
            navLinks.forEach((link, index) => {
                if (index === activeIndex) link.classList.add('active');
                else link.classList.remove('active');
            });
        }

        requestAnimationFrame(updateTimeline);
    }

    requestAnimationFrame(updateTimeline);
}

// === PROJECTS SECTION ===
// === PROJECTS SECTION ===
document.addEventListener('DOMContentLoaded', () => {

    // 1. PROJECT HEADLINE REVEAL (Float up on load)
    const projectHeadline = document.querySelector('.projects-headline');
    if (projectHeadline) {
        // Simple delay to ensure it fades in after page load
        setTimeout(() => {
            projectHeadline.classList.add('visible');
        }, 500);
    }

    // 3. LIVING PORTRAIT (Canvas Capture)
    const thumbVid = document.createElement('video');
    thumbVid.src = 'assets/volume-forside.mp4';
    thumbVid.muted = true;
    thumbVid.playsInline = true;
    thumbVid.preload = 'metadata';

    thumbVid.addEventListener('loadeddata', () => {
        thumbVid.currentTime = 0.1;
    });

    thumbVid.addEventListener('seeked', () => {
        const canvas = document.getElementById('frame-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = 300;
        canvas.height = 200;
        ctx.drawImage(thumbVid, 0, 0, 300, 200);
        canvas.style.display = 'block';
        canvas.style.maxWidth = '100%';
        canvas.style.position = 'absolute';
        canvas.style.width = '52%';
        canvas.style.height = 'auto';
        thumbVid.src = '';
    }, { once: true });

    // --- NEW FRAME THUMBNAIL LOGIC (Duplicate) ---
    const thumbVid2 = document.createElement('video');
    thumbVid2.src = 'assets/Volumen-animation.mp4';
    thumbVid2.muted = true;
    thumbVid2.playsInline = true;
    thumbVid2.preload = 'metadata';

    thumbVid2.addEventListener('loadeddata', () => {
        thumbVid2.currentTime = 0.1;
    });

    thumbVid2.addEventListener('seeked', () => {
        const canvas = document.getElementById('frame-canvas-2');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = 300;
        canvas.height = 200;
        ctx.drawImage(thumbVid2, 0, 0, 300, 200);  // ← fixed: thumbVid2 not thumbVid
        canvas.style.display = 'block';
        canvas.style.maxWidth = '100%';
        canvas.style.position = 'absolute';
        canvas.style.width = '52%';
        canvas.style.height = 'auto';
        thumbVid2.src = '';
    }, { once: true });

    // --- STENO MUSEUM THUMBNAIL LOGIC (Duplicate) ---
    const thumbVid3 = document.createElement('video');
    thumbVid3.src = 'assets/stenomuseum.mp4';
    thumbVid3.muted = true;
    thumbVid3.playsInline = true;
    thumbVid3.preload = 'metadata';

    thumbVid3.addEventListener('loadeddata', () => {
        thumbVid3.currentTime = 0.1;
    });

    thumbVid3.addEventListener('seeked', () => {
        const canvas = document.getElementById('frame-canvas-3');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = 300;
        canvas.height = 200;
        ctx.drawImage(thumbVid3, 0, 0, 300, 200);
        canvas.style.display = 'block';
        canvas.style.maxWidth = '100%';
        canvas.style.position = 'absolute';
        canvas.style.width = '52%';
        canvas.style.height = 'auto';
        thumbVid3.src = '';
    }, { once: true });

    // --- KAFFE THUMBNAIL LOGIC (Duplicate) ---
    const thumbVid4 = document.createElement('video');
    thumbVid4.src = 'assets/Kaffe-animation.mp4';
    thumbVid4.muted = true;
    thumbVid4.playsInline = true;
    thumbVid4.preload = 'metadata';

    thumbVid4.addEventListener('loadeddata', () => {
        thumbVid4.currentTime = 0.1;
    });

    thumbVid4.addEventListener('seeked', () => {
        const canvas = document.getElementById('frame-canvas-4');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = 300;
        canvas.height = 200;
        ctx.drawImage(thumbVid4, 0, 0, 300, 200);
        canvas.style.display = 'block';
        canvas.style.maxWidth = '100%';
        canvas.style.position = 'absolute';
        canvas.style.width = '52%';
        canvas.style.height = 'auto';
        thumbVid4.src = '';
    }, { once: true });

    // 2. HANDWRITTEN TITLE REVEAL (On Scroll)
    const handwrittenTitles = document.querySelectorAll('.handwritten-title');

    const handwritingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const titleElement = entry.target;
                if (!titleElement.classList.contains('animated')) {
                    titleElement.classList.add('animated');
                    animateHandwriting(titleElement);
                }
                handwritingObserver.unobserve(titleElement);
            }
        });
    }, { threshold: 0.5 });

    handwrittenTitles.forEach(title => handwritingObserver.observe(title));

    function animateHandwriting(titleElement) {
        const text = titleElement.getAttribute('data-text');
        titleElement.innerHTML = ''; // Clear content

        // Wrap letters
        [...text].forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.classList.add('hw-letter');

            // Stagger delay: 0.1s per letter
            span.style.transitionDelay = `${index * 0.1}s`;

            if (char === ' ') span.style.width = '0.5em'; // Preserve space

            titleElement.appendChild(span);

            // Trigger reflow to ensure transition happens
            requestAnimationFrame(() => {
                span.classList.add('revealed');
            });
        });
    }

});

// 4. LIGHTBOX LOGIC (Global scope for onclick)
function openLightbox(videoSrc) {
    const lightbox = document.getElementById('project-lightbox');
    const video = document.getElementById('lightbox-video');
    const header = document.querySelector('header');
    const projHeads = document.querySelectorAll('.projects-headline');
    const aboutHeads = document.querySelectorAll('.about-headline');

    if (lightbox && video) {
        video.src = videoSrc;
        lightbox.classList.add('active');
        if (header) header.style.display = 'none'; // Hide header completely

        projHeads.forEach(el => el.style.display = 'none');
        aboutHeads.forEach(el => el.style.display = 'none');

        document.body.style.overflow = 'hidden';   // Prevent page scroll
        // Play automatically
        video.play().catch(e => console.log("Autoplay blocked", e));
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('project-lightbox');
    const video = document.getElementById('lightbox-video');
    const header = document.querySelector('header');
    const projHeads = document.querySelectorAll('.projects-headline');
    const aboutHeads = document.querySelectorAll('.about-headline');

    if (lightbox && video) {
        lightbox.classList.remove('active');
        if (header) header.style.display = 'flex'; // Restore header (flex layout)

        projHeads.forEach(el => el.style.display = '');
        aboutHeads.forEach(el => el.style.display = '');

        document.body.style.overflow = '';         // Restore page scroll
        video.pause();
        video.currentTime = 0;
        video.src = ""; // Stop buffering
    }
}

// Close on background click
document.addEventListener('click', (e) => {
    const lightbox = document.getElementById('project-lightbox');
    if (e.target === lightbox) {
        closeLightbox();
    }
});


// === DUST BUTTON EFFECT ===
const dustBtn = document.querySelector('.scroll-cta-btn');

if (dustBtn) {
    dustBtn.addEventListener('mouseenter', () => {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('span');
            particle.className = 'dust-particle';

            // Random position across the button
            const x = Math.random() * 100;
            const y = Math.random() * 100;

            // Random drift direction
            const tx = (Math.random() - 0.5) * 80;
            const ty = -(Math.random() * 40 + 20);

            particle.style.cssText = `
                left: ${x}%;
                top: ${y}%;
                --tx: ${tx}px;
                --ty: ${ty}px;
                animation-delay: ${Math.random() * 0.3}s;
            `;

            dustBtn.appendChild(particle);

            // Remove after animation
            setTimeout(() => particle.remove(), 1000);
        }
    });
}

// === CONTACT EMAIL LOGIC ===
function copyEmail(event, email) {
    // We want to allow the mailto to fire (so default behavior is kept),
    // BUT we also want to copy to clipboard.

    // Copy to clipboard
    navigator.clipboard.writeText(email).then(() => {
        // Show tooltip
        const link = event.currentTarget;
        const tooltip = link.querySelector('.tooltip');

        if (tooltip) {
            tooltip.classList.add('show');
            setTimeout(() => {
                tooltip.classList.remove('show');
            }, 2000);
        }
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// === FOOTER ANIMATION ===
// === FOOTER ANIMATION ===
function initFooterAnimation() {
    const footer = document.getElementById('horizontal-footer');
    const divider = document.querySelector('.divider-img');

    if (footer && divider) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Trigger the "Draw" animation (Left to Right)
                    divider.classList.add('draw-active');

                    // Stop observing
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 }); // Trigger almost immediately

        observer.observe(footer);
    }
}

// === GYRO GEARLOOSE DUST EFFECT ===
function initDustEffect() {
    const container = document.getElementById('approach-role');
    const canvas = document.querySelector('.dust-canvas');

    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');

    // Configuration
    const PARTICLE_COUNT = Math.floor(Math.random() * 200) + 300; // 300-500
    const particles = [];
    let animationId;

    // Resize canvas to match image
    function resizeCanvas() {
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }

    // Create Particle Class or Object
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1, // 1px to 4px
            color: getRandomColor(),
            opacity: Math.random() * 0.5 + 0.4, // 0.4 to 0.9
            speedY: Math.random() * 1.5 + 0.5, // 0.5 to 2.0 upward
            speedX: (Math.random() - 0.5) * 1, // -0.5 to 0.5 sideways drift
            decay: Math.random() * 0.01 + 0.005 // Fade out speed
        };
    }

    function getRandomColor() {
        const colors = ['#c8b89a', '#d4c5a9', '#b8a898', '#e0d5c5'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Helper to convert hex to rgba
    function hexToRgba(hex, alpha) {
        // Remove hash
        hex = hex.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let activeParticles = 0;

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            if (p.opacity > 0) {
                activeParticles++;

                // Move
                p.y -= p.speedY;
                p.x += p.speedX + (Math.random() - 0.5) * 0.5; // Turbulent drift
                p.opacity -= p.decay;

                // Draw
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = hexToRgba(p.color, p.opacity);
                ctx.fill();
            }
        }

        if (activeParticles > 0) {
            animationId = requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            cancelAnimationFrame(animationId);
        }
    }


    // Logic to trigger explosion
    function triggerDust() {
        resizeCanvas();

        // Generate particles
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(createParticle());
        }

        // Start animation
        animate();
    }

    // Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                triggerDust();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    observer.observe(container);

    // Handle resize
    window.addEventListener('resize', resizeCanvas);
}

// Ensure we call this init function
document.addEventListener('DOMContentLoaded', () => {
    initFooterAnimation();
    initDustEffect();
});