// Initialize Lenis Smooth Scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Update GSAP with Lenis scroll
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// --- DYNAMIC READING ISLAND ---
const island = document.querySelector('.reading-progress-island');
const ringFill = document.getElementById('readingRing');
const percentText = document.getElementById('readingPercentage');
let islandHideTimeout;

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = winScroll / height;
    const percent = Math.round(scrolled * 100);
    
    if (ringFill) {
        // SVG circle length is roughly 62.83 for r=10
        const offset = 62.83 - (scrolled * 62.83);
        ringFill.style.strokeDashoffset = offset;
    }
    if (percentText) {
        percentText.innerText = percent + "%";
    }
    
    if (island) {
        if (percent < 2) {
            island.classList.add('hidden');
            clearTimeout(islandHideTimeout);
        } else if (percent >= 100) {
            island.classList.remove('hidden');
            clearTimeout(islandHideTimeout);
            islandHideTimeout = setTimeout(() => {
                island.classList.add('hidden');
            }, 400);
        } else {
            island.classList.remove('hidden');
            clearTimeout(islandHideTimeout);
        }
    }
});

document.addEventListener("DOMContentLoaded", (event) => {
    
    // --- PREMIUM HERO ANIMATION SEQUENCE ---
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // 1. Hero background fade
    heroTl.to(".hero-anim-bg", { opacity: 1, duration: 1.5 })
    
    // 2. Card container fade in (without content)
    .to(".hero-anim-card", { opacity: 1, duration: 1 }, "-=1")
    
    // 3. "Plex" title reveals
    .fromTo(".hero-anim-title", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.5")
    
    // 4. Tagline fades in
    .fromTo(".hero-anim-tagline", { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "+=0.2")
    
    // 6. Project specifications fade in last
    .fromTo(".hero-anim-specs", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=1");

    // --- SCROLL DRIVEN ANIMATIONS ---

    // --- SECTION 01: THE PROBLEM (V4: CINEMATIC USE-CASE) ---
    if (document.querySelector('.problem-use-case-container')) {
        const problemTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.problem-use-case-container',
                start: 'top top',
                end: () => "+=" + (5500 * window.canvasScale),
                scrub: 1,
                pin: true,
                anticipatePin: 1
            }
        });

        // Helper functions for dynamic DOM-based focus ring alignment
        const getRect = (id) => {
            const el = document.getElementById(id);
            const container = document.querySelector('.use-case-cinematic');
            if (!el || !container) return { top: 0, left: 0, width: 0, height: 0 };
            const cRect = container.getBoundingClientRect();
            const tRect = el.getBoundingClientRect();
            // adding a slight 8px padding to the focus ring
            return {
                top: (tRect.top - cRect.top) - 8,
                left: (tRect.left - cRect.left) - 8,
                width: tRect.width + 16,
                height: tRect.height + 16
            };
        };
        const lerpRect = (r1, r2, t) => ({
            top: r1.top + (r2.top - r1.top) * t,
            left: r1.left + (r2.left - r1.left) * t,
            width: r1.width + (r2.width - r1.width) * t,
            height: r1.height + (r2.height - r1.height) * t
        });
        const applyRect = (ring, r) => {
            if (!ring) return;
            ring.style.top = r.top + 'px';
            ring.style.left = r.left + 'px';
            ring.style.width = r.width + 'px';
            ring.style.height = r.height + 'px';
        };

        const ringProxy = { opacity: 0, transition1: 0, transition2: 0 };
        const timeProxy = { index: 0 };
        const timeStrings = ['09:00', '12:30', '16:45', '19:10'];

        // 1. Intro fades in
        problemTl.to('.problem-statement-intro', { opacity: 1, duration: 1 })
                 .to({}, { duration: 1.5 })
                 .to('.problem-statement-intro', { opacity: 0, duration: 1 });
                 
        // 2. Cinematic Start: Show Time
        problemTl.to('.uc-time-header', { opacity: 1, duration: 1 })
                 .to({}, { duration: 0.5 });
                 
        // 3. Responsibilities Arrive (settle into place cleanly)
        problemTl.fromTo('#task-important', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 1 }, "arrive")
                 .fromTo('#task-easy1', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 1 }, "arrive+=0.4")
                 .fromTo('#task-easy2', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 1 }, "arrive+=0.8")
                 .to('.uc-progress-reward', { opacity: 1, duration: 1 }, "arrive+=1.2")
                 .to({}, { duration: 2.0 }); // PAUSE: AFTER TASKS APPEAR

        // 4. Important Task Identified
        problemTl.to('#task-important', { scale: 1.05, boxShadow: '0 8px 25px rgba(255, 68, 68, 0.2)', duration: 0.5 })
                 .to('#task-important', { scale: 1, duration: 0.5 })
                 .to({}, { duration: 0.5 });
                 
        // 5. Focus appears on Important Task
        problemTl.to(ringProxy, { 
            opacity: 1, duration: 0.5,
            onUpdate: () => {
                const ring = document.querySelector('.uc-focus-ring');
                if(ring) ring.style.opacity = ringProxy.opacity;
                applyRect(ring, getRect('task-important'));
            }
        });
        problemTl.to({}, { duration: 1.0 }); // pause
        
        // 6. Focus shifts to Easy Task 1 (Dynamic DOM lerp)
        problemTl.to(ringProxy, {
            transition1: 1, duration: 1, ease: 'power2.inOut',
            onUpdate: () => {
                const ring = document.querySelector('.uc-focus-ring');
                const rImp = getRect('task-important');
                const rE1 = getRect('task-easy1');
                applyRect(ring, lerpRect(rImp, rE1, ringProxy.transition1));
            }
        });
        problemTl.to({}, { duration: 1.5 }); // PAUSE: AFTER ATTENTION SHIFTS TO EASY TASK
                 
        // 7. Easy Task 1 Completes
        problemTl.to('#task-easy1 .uc-check', { opacity: 1, duration: 0.5 }, "t1_done")
                 .to('.uc-reward-fill', { width: '50%', duration: 1 }, "t1_done")
                 .to('.uc-reward-text', { 
                     duration: 0.01, 
                     onComplete: () => document.querySelector('.uc-reward-text').innerText = '1 TASK COMPLETE',
                     onReverseComplete: () => document.querySelector('.uc-reward-text').innerText = '0 TASKS COMPLETE'
                 }, "t1_done+=0.5")
                 .to('#task-easy1', { opacity: 0.3, scale: 0.98, duration: 1 }, "t1_done")
                 .to({}, { duration: 2.0 }); // PAUSE: AFTER EASY TASK COMPLETES

        // 8. Important Task Waits (subtle pulse)
        problemTl.to('#task-important', { scale: 1.02, duration: 0.5 })
                 .to('#task-important', { scale: 1, duration: 0.5 })
                 .to({}, { duration: 0.5 });
                 
        // 9. Repeat Bias: Focus shifts to Easy Task 2
        problemTl.to(ringProxy, {
            transition2: 1, duration: 1, ease: 'power2.inOut',
            onUpdate: () => {
                const ring = document.querySelector('.uc-focus-ring');
                const rE1 = getRect('task-easy1');
                const rE2 = getRect('task-easy2');
                applyRect(ring, lerpRect(rE1, rE2, ringProxy.transition2));
            }
        });
        problemTl.to({}, { duration: 0.5 })
                 .to('#task-easy2 .uc-check', { opacity: 1, duration: 0.5 }, "t2_done")
                 .to('.uc-reward-fill', { width: '100%', duration: 1 }, "t2_done")
                 .to('.uc-reward-text', { 
                     duration: 0.01, 
                     onComplete: () => document.querySelector('.uc-reward-text').innerText = '2 TASKS COMPLETE',
                     onReverseComplete: () => document.querySelector('.uc-reward-text').innerText = '1 TASK COMPLETE'
                 }, "t2_done+=0.5")
                 .to('#task-easy2', { opacity: 0.3, scale: 0.98, duration: 1 }, "t2_done")
                 .to({}, { duration: 2.0 }); // PAUSE: AFTER SECOND EASY TASK COMPLETES

        // 10. Time Passes & Focus Fades
        problemTl.to(ringProxy, { opacity: 0, duration: 1.0, onUpdate: () => {
            const ring = document.querySelector('.uc-focus-ring');
            if(ring) ring.style.opacity = ringProxy.opacity;
        }}, "timePasses");
        
        // Expand the time-passing sequence so it occupies substantial scroll distance
        problemTl.to(timeProxy, {
            index: 3, duration: 6.0, ease: 'none', snap: 'index',
            onUpdate: () => {
                const clock = document.querySelector('.uc-time-clock');
                if (clock && timeStrings[timeProxy.index]) {
                    clock.innerText = timeStrings[timeProxy.index];
                }
            }
        }, "timePasses");

        // 11. Deadline Approaches
        problemTl.to('#uc-important-meta', { 
            duration: 0.01,
            onComplete: () => {
                const meta = document.getElementById('uc-important-meta');
                meta.innerText = '3 HOURS LEFT';
                meta.style.color = '#ff4444';
            },
            onReverseComplete: () => {
                const meta = document.getElementById('uc-important-meta');
                meta.innerText = 'DUE TODAY';
                meta.style.color = 'var(--text-muted)';
            }
        }, "timePasses+=3.0")
        .to('#uc-important-meta', { 
            duration: 0.01,
            onComplete: () => {
                const meta = document.getElementById('uc-important-meta');
                meta.innerText = '1 HOUR LEFT';
            },
            onReverseComplete: () => {
                const meta = document.getElementById('uc-important-meta');
                meta.innerText = '3 HOURS LEFT';
            }
        }, "timePasses+=5.0")
        .to({}, { duration: 3.0 }); // PAUSE: BEFORE DEADLINE CONSEQUENCE

        // 12. Consequence: Deadline Missed
        problemTl.to('#task-easy1, #task-easy2, .uc-progress-reward', { opacity: 0.1, duration: 1.5 }, "consequence")
                 .to('#task-important', { scale: 1.05, borderColor: '#ff4444', backgroundColor: 'rgba(255, 68, 68, 0.05)', duration: 1.5 }, "consequence")
                 .to('#uc-important-title', { 
                     duration: 0.01,
                     onComplete: () => document.getElementById('uc-important-title').innerText = 'DEADLINE MISSED',
                     onReverseComplete: () => document.getElementById('uc-important-title').innerText = 'Portfolio Deadline'
                 }, "consequence+=0.5")
                 .to('#uc-important-meta', { 
                     duration: 0.01,
                     onComplete: () => document.getElementById('uc-important-meta').innerText = 'STILL INCOMPLETE',
                     onReverseComplete: () => document.getElementById('uc-important-meta').innerText = '1 HOUR LEFT'
                 }, "consequence+=0.5")
                 .to({}, { duration: 5.0 }); // PAUSE: AFTER DEADLINE MISSED
                 
        // Final Resolution
        problemTl.to('.use-case-cinematic', { opacity: 0, scale: 0.95, duration: 1.5 })
                 .fromTo('.problem-statement-mid', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 1.5 })
                 .to({}, { duration: 3.0 })
                 .to('.problem-statement-mid', { opacity: 0, duration: 1 });

        // Ensure focus ring stays aligned on resize
        window.addEventListener('resize', () => {
            if (ringProxy.opacity > 0) {
                const ring = document.querySelector('.uc-focus-ring');
                let targetRect;
                if (ringProxy.transition1 === 0) targetRect = getRect('task-important');
                else if (ringProxy.transition2 === 0) targetRect = lerpRect(getRect('task-important'), getRect('task-easy1'), ringProxy.transition1);
                else targetRect = lerpRect(getRect('task-easy1'), getRect('task-easy2'), ringProxy.transition2);
                applyRect(ring, targetRect);
            }
        });
    }

    // --- SECTION 01: STATIC DATA PANEL (V4) ---
    if (document.querySelector('.problem-data-panel')) {
        
        // 1. Entrance Animation (One-time fade in, no continuous loops)
        gsap.fromTo('.data-card', 
            { opacity: 0, y: 20 },
            {
                scrollTrigger: {
                    trigger: '.problem-data-panel',
                    start: 'top 75%'
                },
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out'
            }
        );
        // All interactive hover effects are handled purely by CSS.
    }

    // --- SECTION 2: PROJECT CONTEXT PINNED ANIMATION ---
    if (document.querySelector('.project-context')) {
        const contextTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".project-context",
                start: "top top",
                end: () => "+=" + (3000 * window.canvasScale), // Long scroll to scrub through the 5 stages
                scrub: 1.5, // Smooth scrubbing
                pin: true,
                anticipatePin: 1
            }
        });

        // Stage 2 & 3: Floating tags pop in one by one (staggered)
        contextTl.to(".floating-tag", {
            opacity: 1,
            scale: 1,
            stagger: 0.3,
            ease: "back.out(1.4)",
            duration: 1
        })
        
        // Stage 4: Pause, then tags disappear one by one
        .to({}, { duration: 1.5 }) // Deliberate pause at max clutter
        .to(".floating-tag", {
            opacity: 0,
            scale: 0.9,
            stagger: 0.15,
            ease: "power2.inOut",
            duration: 0.8
        })
        
        // Fade out the Stage 1 headline simultaneously with the tags clearing out
        .to(".context-headline-area", {
            opacity: 0,
            y: -50,
            duration: 1
        }, "<+=0.5")
        
        // Stage 5: The final question fades in
        .to(".context-final-question", {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power3.out"
        })
        .to(".supporting-sentence", {
            opacity: 1,
            duration: 1.5
        }, "+=0.5"); // Pause before supporting sentence
    }

    // --- SECTION 3: EXISTING TOOLS FRICTION PINNED ANIMATION ---
    if (document.querySelector('.looking-solution')) {
        const frictionTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".looking-solution",
                start: "top top",
                end: () => "+=" + (4500 * window.canvasScale), // Increased scroll length for the two-stage sequence
                scrub: 1.5,
                pin: true,
                anticipatePin: 1
            }
        });

        // Stage 1: Reveal Clean Scene (Header + Dashboard)
        frictionTl.to([".friction-header-area", ".fictional-dashboard"], {
            opacity: 1,
            scale: 1, // Dashboard returns to native size
            duration: 1,
            ease: "power2.out",
            stagger: 0.2
        })
        
        // Pause to appreciate the clean, spacious interface
        .to({}, { duration: 1.5 })
        
        // Stage 2: Cinematic Push-In Transition (Header fades out, Dashboard centers & scales)
        .to(".friction-header-area", {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut"
        })
        .to(".friction-content-wrapper", {
            y: () => -(document.querySelector('.friction-header-area').offsetHeight / 2),
            duration: 1.2,
            ease: "power2.inOut"
        }, "<")
        .to(".fictional-dashboard", {
            scale: 1.12, // Scale up ~12% for the camera focus
            duration: 1.2,
            ease: "power2.inOut"
        }, "<") // Start at exact same time as header fade
        
        // Pause slightly before the demands begin
        .to({}, { duration: 0.5 })
        // Stage 3: Friction modals pop in one by one overlapping
        .to([".dash-topnav", ".dash-body"], {
            filter: "blur(5px)",
            duration: 0.8,
            ease: "power2.out"
        }, "<")
        .to(".friction-modal", {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.4, // Deliberately slow to feel demanding
            ease: "back.out(1.2)"
        }, "<")
        
        // Stage 4: The Climax Pause
        .to({}, { duration: 2 })
        
        // Stage 5: The Void - Modals disappear in reverse order
        .to(".friction-modal", {
            opacity: 0,
            scale: 0.9,
            duration: 0.5,
            stagger: { each: 0.1, from: "end" }, // Disappear in reverse order
            ease: "power2.in"
        })
        // Dashboard fades out completely
        .to(".fictional-dashboard", {
            opacity: 0,
            scale: 1.05, // Slight shrink while fading
            duration: 1,
            ease: "power2.inOut"
        }, "+=0.2")
        
        // Stage 6: Final Conclusion
        .to(".friction-final-conclusion", {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power3.out"
        });
    }
    // --- SECTION 4: PRODUCT PHILOSOPHY TYPOGRAPHY ANIMATION ---
    if (document.querySelector('.problem-statement')) {
        const philosophyTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".problem-statement",
                start: "top top",
                end: () => "+=" + (3000 * window.canvasScale), // Paced out for reading
                scrub: 1.5,
                pin: true,
                anticipatePin: 1
            }
        });

        // 1. The Silence (Empty tween gives pure black before typography starts)
        philosophyTl.to({}, { duration: 0.1 })
        
        // 2. Line 1 Progressive Reveal
        .to(".part-1", { yPercent: -110, duration: 1.2, ease: "power3.out" })
        .to({}, { duration: 0.3 }) // Pause
        .to(".part-2", { yPercent: -110, duration: 1.2, ease: "power3.out" })
        .to({}, { duration: 0.3 }) // Pause
        .to(".part-3", { yPercent: -110, duration: 1.2, ease: "power3.out" })
        
        // 3. The Breath (Longer pause between sentences)
        .to({}, { duration: 0.8 })
        
        // 4. Line 2 Progressive Reveal & Simultaneous Emphasis Shift
        .to(".part-4", { yPercent: -110, duration: 1.2, ease: "power3.out" }, "line2-start")
        .to(".dim-target", {
            opacity: 0.7,
            color: "#9CA3AF",
            duration: 1.2,
            ease: "power2.inOut"
        }, "line2-start") // Dims exactly as "More time" pops up
        
        .to({}, { duration: 0.3 }) // Pause
        
        .to(".part-5", { yPercent: -110, duration: 1.2, ease: "power3.out" }, "part5")
        .to(".highlight-target", {
            color: "#FFFFFF",
            textShadow: "0 0 20px rgba(255, 255, 255, 0.15)",
            duration: 1.2,
            ease: "power2.inOut"
        }, "part5") // Highlights exactly as "getting work done." pops up
        
        // 5. Final Hold before unpinning and scrolling to Section 5
        .to({}, { duration: 2.5 });
    }

    // --- SECTION 5: PRODUCT REVEAL ---
    if (document.querySelector('.introduce-plex')) {
        // 1. Entrance Sequence
        const revealTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".introduce-plex",
                start: "top 60%", // Trigger when section is in good view
                toggleActions: "play none none reverse"
            }
        });

        revealTl.to(".reveal-label", {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
        })
        .to(".reveal-title", {
            yPercent: -110, // Slides up out of the mask
            duration: 1.2,
            ease: "power3.out"
        }, "-=0.4")
        .to(".reveal-video-wrapper", {
            opacity: 1,
            duration: 1.5,
            ease: "power2.inOut",
            onStart: () => {
                // Ensure video plays as it fades in
                const vid = document.querySelector(".reveal-video");
                if (vid) vid.play().catch(e => console.log("Autoplay prevented:", e));
            }
        }, "<0.2"); // Starts immediately as the title is revealing

        // 2. Scroll Parallax for the Title
        gsap.to(".title-mask", {
            scrollTrigger: {
                trigger: ".reveal-video-wrapper",
                start: "top center",
                end: "bottom top",
                scrub: 1
            },
            y: -80, // Gently drift upward
            opacity: 0.2, // Fade out to keep focus on video
            ease: "none"
        });
    }

    // --- SECTION 6: PRODUCT VISION PRESENTATION ---
    if (document.querySelector('#principles')) {
        const principlesTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#principles",
                start: "top top",
                end: () => "+=" + (6000 * window.canvasScale), // Long scroll for 6 sections
                scrub: 1,
                pin: true,
                anticipatePin: 1
            }
        });

        // 1. Intro hold (breathing room)
        principlesTl.to({}, { duration: 1 })
        
        // 2. Fade out intro, fade in phone and content wrapper
        .to(".vision-intro", { opacity: 0, duration: 1 })
        .to(".vision-content-wrapper", { opacity: 1, duration: 1 }, "<")
        
        // Setup initial state: show Principle 1 and Screen 1
        .set(".p-1", { autoAlpha: 1, y: 0 })
        .set(".s-1", { opacity: 1 })
        
        // P1 Hold
        .to({}, { duration: 1 })
        
        // --- TRANSITION P1 -> P2 ---
        .to(".p-1", { autoAlpha: 0, y: -20, duration: 1 })
        .to(".p-2", { autoAlpha: 1, y: 0, duration: 1 }, "<")
        .to(".s-1", { opacity: 0, duration: 1 }, "<")
        .to(".s-2", { opacity: 1, duration: 1 }, "<")
        .to(".vision-phone-container", { scale: 1.05, yPercent: 3, duration: 1 }, "<") // subtle camera move
        
        // P2 Hold
        .to({}, { duration: 1 })
        
        // --- TRANSITION P2 -> P3 ---
        .to(".p-2", { autoAlpha: 0, y: -20, duration: 1 })
        .to(".p-3", { autoAlpha: 1, y: 0, duration: 1 }, "<")
        .to(".s-2", { opacity: 0, duration: 1 }, "<")
        .to(".s-3", { opacity: 1, duration: 1 }, "<")
        .to(".vision-phone-container", { scale: 1.0, yPercent: 0, duration: 1 }, "<") // subtle camera move
        
        // P3 Hold
        .to({}, { duration: 1 })
        
        // --- TRANSITION P3 -> P4 ---
        .to(".p-3", { autoAlpha: 0, y: -20, duration: 1 })
        .to(".p-4", { autoAlpha: 1, y: 0, duration: 1 }, "<")
        .to(".s-3", { opacity: 0, duration: 1 }, "<")
        .to(".s-4", { opacity: 1, duration: 1 }, "<")
        .to(".vision-phone-container", { scale: 1.03, yPercent: -2, duration: 1 }, "<") // subtle camera move
        
        // P4 Hold
        .to({}, { duration: 1 })
        
        // --- TRANSITION P4 -> P5 ---
        .to(".p-4", { autoAlpha: 0, y: -20, duration: 1 })
        .to(".p-5", { autoAlpha: 1, y: 0, duration: 1 }, "<")
        .to(".s-4", { opacity: 0, duration: 1 }, "<")
        .to(".s-5", { opacity: 1, duration: 1 }, "<")
        .to(".vision-phone-container", { scale: 1.08, yPercent: 4, duration: 1 }, "<") // subtle camera move
        
        // P5 Hold
        .to({}, { duration: 1 })
        
        // --- TRANSITION P5 -> P6 ---
        .to(".p-5", { autoAlpha: 0, y: -20, duration: 1 })
        .to(".p-6", { autoAlpha: 1, y: 0, duration: 1 }, "<")
        .to(".s-5", { opacity: 0, duration: 1 }, "<")
        .to(".s-6", { opacity: 1, duration: 1 }, "<")
        .to(".vision-phone-container", { scale: 1.0, yPercent: -3, duration: 1 }, "<") // subtle camera move
        
        // Final Hold (Let them read the last principle before unpinning)
        .to({}, { duration: 2 });
    }

    // --- SECTION 8: PRODUCT EVOLUTION ---
    if (document.querySelector('.evolution-timeline')) {
        const evoTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".evolution-timeline",
                start: "top 60%", 
                end: "bottom 60%", 
                scrub: 1 
            }
        });

        const milestones = gsap.utils.toArray('.evolution-milestone');
        
        // Fill the progress track over the course of the entire scroll
        evoTl.to('.timeline-progress-fill', { 
            height: "100%", 
            ease: "none",
            duration: milestones.length
        }, 0);

        // Trigger milestone fades based on scroll position
        milestones.forEach((milestone, index) => {
            evoTl.to(milestone, {
                opacity: 1,
                duration: 0.5,
                ease: "power2.out"
            }, index);

            if (index > 0) {
                evoTl.to(milestones[index - 1], {
                    opacity: 0.3,
                    duration: 0.5
                }, index);
            }
        });
    }

    // --- SECTION 9: PRODUCT WALKTHROUGH FEATURE MOMENTS ---

    // 1. Brain Dump Cinematic
    if (document.querySelector('.fm-braindump')) {
        const bdTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".fm-braindump",
                start: "top 10%",
                end: () => "+=" + (6000 * window.canvasScale), // Massively increased scroll duration to slow down the animation pace
                scrub: 1,
                pin: true
            }
        });

        // Stage 7: Subtle camera push to the main container (Separate tween to prevent timeline delay)
        gsap.to(".bd-cinematic-container", {
            scale: 1.05,
            ease: "none",
            scrollTrigger: {
                trigger: ".fm-braindump",
                start: "top 10%",
                end: () => "+=" + (6000 * window.canvasScale),
                scrub: 1
            }
        });

        // Text content
        const lines = [
            "Need to finish portfolio by Friday",
            "Practice JLPT for 45 minutes",
            "Gym tomorrow evening",
            "Apply to Oracle internship"
        ];
        
        const typeTargets = [
            document.querySelector(".bd-t1"),
            document.querySelector(".bd-t2"),
            document.querySelector(".bd-t3"),
            document.querySelector(".bd-t4")
        ];

        // Stage 1 & 2: Natural Typing Sequence
        lines.forEach((text, i) => {
            const cursor = document.querySelector(`.cursor-${i+1}`);
            if(cursor) bdTl.to(cursor, { opacity: 1, duration: 0.1 });
            
            bdTl.to({ val: 0 }, {
                val: text.length,
                duration: 2.5,
                ease: "none",
                onUpdate: function() {
                    if(typeTargets[i]) typeTargets[i].innerText = text.substring(0, Math.floor(this.targets()[0].val));
                }
            });
            
            // Brief pause and next cursor appears
            bdTl.to({}, { duration: 0.5 });
            if(cursor && i < 3) bdTl.to(cursor, { opacity: 0, duration: 0.1 });
        });

        // Stage 3: Intelligent Understanding (Fading in Tags)
        bdTl.to(".bd-tag", { opacity: 1, stagger: 0.5, duration: 1.5, ease: "power1.inOut" }, "+=0.5");
        
        // Stage 4: Structuring (Lifting cards)
        bdTl.to(".bd-typing-layer", { opacity: 0, y: -20, duration: 1.5 }, "+=1");
        
        bdTl.to(".bd-card", {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.4,
            duration: 1.5,
            ease: "power2.out"
        }, "-=0.5");

        // Stage 5 & 6: The Dashboard Assembly
        bdTl.to(".bd-card", { opacity: 0, y: 50, stagger: 0.2, duration: 1.5 }, "+=1");
        
        bdTl.to(".bd-dashboard-layer", { opacity: 1, duration: 1.5 }, "-=1");

        // Fading out masks sequentially to build the UI
        bdTl.to(".mask-greeting", { opacity: 0, duration: 1 })
            .to(".mask-overview", { opacity: 0, duration: 1 }, "-=0.2")
            .to(".mask-focus", { opacity: 0, duration: 1 }, "-=0.2")
            .to(".mask-tasks", { opacity: 0, duration: 1 }, "-=0.2")
            .to(".mask-goals", { opacity: 0, duration: 1 }, "-=0.2");

        // Stage 8: Final Pause
        bdTl.to({}, { duration: 3 });
    }

    // 2. Smart Scheduling
    if (document.querySelector('.fm-scheduling')) {
        const schedTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".fm-scheduling",
                start: "top 60%",
                end: "bottom 60%",
                scrub: 1
            }
        });
        schedTl.to(".fm-schedule-wrapper", { opacity: 1, y: 0, duration: 1 })
               .to(".schedule-mask", { scaleY: 0, duration: 3, ease: "none" });
    }

    // 3. Future Goals
    if (document.querySelector('.fm-goals')) {
        gsap.to(".fm-goal-cards", {
            scrollTrigger: {
                trigger: ".fm-goals",
                start: "top 70%",
                toggleActions: "play none none reverse"
            },
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power2.out"
        });
    }

    // 4. Analytics
    if (document.querySelector('.fm-analytics')) {
        gsap.to(".analytics-img", {
            scrollTrigger: {
                trigger: ".fm-analytics",
                start: "top 70%",
                toggleActions: "play none none reverse"
            },
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 1.5,
            ease: "power2.out"
        });
    }

    // 5. Healthy Productivity
    if (document.querySelector('.fm-healthy')) {
        gsap.to(".healthy-mockup", {
            scrollTrigger: {
                trigger: ".fm-healthy",
                start: "top 70%",
                toggleActions: "play none none reverse"
            },
            opacity: 1,
            y: 0,
            duration: 2,
            ease: "power1.inOut"
        });
    }

    // 6. Privacy
    if (document.querySelector('.fm-privacy')) {
        const privTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".fm-privacy",
                start: "top 10%",
                end: () => "+=" + (1500 * window.canvasScale),
                scrub: 1,
                pin: true
            }
        });

        privTl.to(".pw-1", { opacity: 0, duration: 1 })
              .to(".pw-2", { opacity: 0, duration: 1 }, "+=0.5")
              .to(".pw-3", { opacity: 0, duration: 1 }, "+=0.5")
              .to(".privacy-mockup", { opacity: 1, duration: 2 }, "+=0.5");
    }

    // 1. Fade & Slide Up Reveals
    const revealElements = document.querySelectorAll('.gsap-reveal');
    revealElements.forEach(el => {
        gsap.fromTo(el, 
            { y: 50, opacity: 0 }, 
            {
                y: 0, 
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // 2. Text Reveal (Lines/Paragraphs)
    const revealTexts = document.querySelectorAll('.gsap-reveal-text');
    revealTexts.forEach(el => {
        gsap.fromTo(el, 
            { y: 30, opacity: 0 }, 
            {
                y: 0, 
                opacity: 1,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // 3. Stagger Reveals
    const staggerContainers = document.querySelectorAll('.problem-list, .vision-grid, .chapter-images-group, .architecture-diagram');
    staggerContainers.forEach(container => {
        const children = container.querySelectorAll('li, .vision-card, img, .arch-node');
        if(children.length > 0) {
            gsap.fromTo(children, 
                { y: 40, opacity: 0 }, 
                {
                    y: 0, 
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: container,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    });

    // 4. Image Scale/Mask Reveal
    const imageReveals = document.querySelectorAll('.gsap-image-reveal');
    imageReveals.forEach(el => {
        gsap.fromTo(el, 
            { scale: 0.95, opacity: 0, y: 50 }, 
            {
                scale: 1, 
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // 5. Scroll-Driven Zoom (Quote)
    const scrollZooms = document.querySelectorAll('.scroll-zoom');
    scrollZooms.forEach(el => {
        gsap.fromTo(el, 
            { scale: 0.9, opacity: 0.5 }, 
            {
                scale: 1,
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: el,
                    start: "top bottom",
                    end: "center center",
                    scrub: true
                }
            }
        );
    });

    // 6. Parallax Effect for Images (Scrubbed strictly on scroll)
    const parallaxElements = document.querySelectorAll('.parallax-img');
    parallaxElements.forEach(el => {
        gsap.fromTo(el, 
            { y: -40 }, 
            {
                y: 40,
                ease: "none",
                scrollTrigger: {
                    trigger: el.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1 // smooth scrubbing
                }
            }
        );
    });
    // --- 7. ARCHITECTURE CINEMATIC ---
    const archTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".intelligence",
            start: "top top",
            end: () => "+=" + (12000 * window.canvasScale), /* Massively increased for ultra-smooth scrolling */
            scrub: 1,
            pin: true,
            anticipatePin: 1
        }
    });

    // Reset initial states just in case
    gsap.set(".arch-req-line", { y: 20, opacity: 0 });
    gsap.set(".arch-card", { scale: 0.9, opacity: 0 });
    gsap.set(".arch-context", { scale: 0.8, opacity: 0 });
    gsap.set(".decision-chip", { scale: 0.5, opacity: 0 });
    gsap.set(".sched-block", { x: -50, opacity: 0 });
    gsap.set(".safety-badge", { y: 20, opacity: 0 });

    archTl
        // Stage 1: The Request
        .to(".arch-request-layer", { opacity: 1, duration: 0.5 })
        .to(".arch-req-line", { y: 0, opacity: 1, stagger: 0.3, duration: 1, ease: "power2.out" })
        .to({}, { duration: 1 }) // pause
        
        // Stage 2: Understanding Pulse
        .to(".arch-understanding-pulse", { opacity: 1, duration: 0.5 })
        .to(".pulse-dot", { scale: 1.5, repeat: 3, yoyo: true, duration: 0.5, ease: "sine.inOut" })
        .to({}, { duration: 1 }) // pause
        
        // Stage 3 & 4: Separation into Structured Data + Context
        // Wait for request to completely fade out before showing structures
        .to([".arch-request-layer", ".arch-understanding-pulse"], { opacity: 0, scale: 1.1, duration: 1, ease: "power2.inOut" })
        .to(".arch-structured-layer", { opacity: 1, duration: 0.5 })
        
        // Scatter the cards (Lowered to avoid top text overlap)
        .to(".ac-1", { x: -300, y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.2)" }, "structure")
        .to(".ac-2", { x: 0, y: -40, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.2)" }, "structure+=0.2")
        .to(".ac-3", { x: 300, y: 20, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.2)" }, "structure+=0.4")
        
        // Float in contexts (Pushed lower to separate from Gym card)
        .to(".ctx-1", { x: -400, y: 180, opacity: 1, scale: 1, duration: 1 }, "structure+=0.5")
        .to(".ctx-2", { x: -200, y: 160, opacity: 1, scale: 1, duration: 1 }, "structure+=0.6")
        .to(".ctx-3", { x: 200, y: 180, opacity: 1, scale: 1, duration: 1 }, "structure+=0.7")
        .to(".ctx-4", { x: 400, y: 160, opacity: 1, scale: 1, duration: 1 }, "structure+=0.8")
        .to(".cap-context", { opacity: 1, duration: 1 }, "structure+=1")
        .to({}, { duration: 1.5 })
        
        // Stage 5: Reasoning Chips
        // Fade out previous entirely
        .to(".arch-structured-layer", { opacity: 0, scale: 0.9, duration: 1 })
        .to(".arch-decision-layer", { opacity: 1, duration: 0.5 })
        
        .to(".dc-1", { x: -150, y: 0, opacity: 1, scale: 1, duration: 1, ease: "elastic.out(1, 0.7)" }, "decisions")
        .to(".dc-2", { x: 150, y: -20, opacity: 1, scale: 1, duration: 1, ease: "elastic.out(1, 0.7)" }, "decisions+=0.5")
        .to(".dc-3", { x: -200, y: 80, opacity: 1, scale: 1, duration: 1, ease: "elastic.out(1, 0.7)" }, "decisions+=1.0")
        .to(".dc-4", { x: 200, y: 100, opacity: 1, scale: 1, duration: 1, ease: "elastic.out(1, 0.7)" }, "decisions+=1.5")
        .to(".dc-5", { x: 0, y: 160, opacity: 1, scale: 1, duration: 1, ease: "elastic.out(1, 0.7)" }, "decisions+=2.0")
        
        // Simulate thinking (some chips fade or move)
        .to(".dc-2", { scale: 1.1, backgroundColor: "rgba(255, 123, 123, 0.2)", borderColor: "rgba(255, 123, 123, 0.5)", duration: 1 })
        .to([".dc-3", ".dc-5"], { opacity: 0.3, duration: 1 }, "<")
        .to(".cap-decisions", { opacity: 1, duration: 1 })
        .to({}, { duration: 2 })
        
        // Stage 6: Planning (Schedule Assembly)
        // Fade out previous entirely
        .to(".arch-decision-layer", { opacity: 0, y: 0, duration: 1 })
        .to(".arch-schedule-layer", { opacity: 1, duration: 0.5 })
        
        .to(".sb-focus", { x: 0, y: -30, opacity: 1, duration: 0.8, ease: "power2.out" }, "planning")
        .to(".sb-lunch", { x: 0, y: 40, opacity: 1, duration: 0.8, ease: "power2.out" }, "planning+=0.3")
        .to(".sb-task", { x: 0, y: 110, opacity: 1, duration: 0.8, ease: "power2.out" }, "planning+=0.6")
        .to(".sb-travel", { x: 0, y: 180, opacity: 1, duration: 0.8, ease: "power2.out" }, "planning+=0.9")
        .to(".sb-gym", { x: 0, y: 250, opacity: 1, duration: 0.8, ease: "power2.out" }, "planning+=1.2")
        
        // Simulate reorganization
        .to([".sb-focus", ".sb-lunch", ".sb-task", ".sb-travel", ".sb-gym"], { y: "-=30", duration: 1, ease: "power2.inOut" })
        .to(".cap-planning", { opacity: 1, duration: 1 })
        .to({}, { duration: 1.5 })
        
        // Stage 7: Protection (Safety)
        // Explicitly hide the planning caption before safety starts, but keep the schedule blocks visible
        .to(".cap-planning", { opacity: 0, duration: 0.5 })
        .to(".arch-schedule-layer", { scale: 0.95, opacity: 0.5, duration: 1 })
        .to(".arch-safety-layer", { opacity: 1, duration: 0.5 })
        
        .to(".saf-1", { x: 250, y: -40, opacity: 1, duration: 0.8, ease: "back.out(1.5)" }, "safety")
        .to(".saf-2", { x: -320, y: 50, opacity: 1, duration: 0.8, ease: "back.out(1.5)" }, "safety+=0.4")
        .to(".saf-3", { x: 250, y: 150, opacity: 1, duration: 0.8, ease: "back.out(1.5)" }, "safety+=0.8")
        .to(".cap-safety", { opacity: 1, duration: 1 })
        .to({}, { duration: 1.5 })
        
        // Stage 8: Final Schedule Result
        // Fade out everything else
        .to([".arch-schedule-layer", ".arch-safety-layer"], { opacity: 0, duration: 1 })
        .to(".arch-final-layer", { opacity: 1, duration: 1 })
        
        .to(".final-schedule-frame", { opacity: 1, y: -50, duration: 1, ease: "power2.out" })
        .to(".cap-final", { opacity: 1, duration: 1 })
        .to({}, { duration: 2 });

    // --- 8. TEAM SECTION REVEAL ---
    if (document.querySelector('.team-editorial-grid')) {
        // Reveal left column
        gsap.fromTo(".team-col-left", { opacity: 0, y: 30 }, {
            scrollTrigger: { trigger: ".team-editorial-grid", start: "top 80%" },
            opacity: 1, y: 0, duration: 1, ease: "power2.out"
        });
        
        // Reveal right column shortly after
        gsap.fromTo(".team-col-right", { opacity: 0, y: 30 }, {
            scrollTrigger: { trigger: ".team-editorial-grid", start: "top 80%" },
            opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power2.out"
        });

        // Stagger list items in left column
        gsap.fromTo(".team-col-left .team-item", { opacity: 0, x: -15 }, {
            scrollTrigger: { trigger: ".team-editorial-grid", start: "top 70%" },
            opacity: 1, x: 0, duration: 0.8, stagger: 0.1, delay: 0.5, ease: "power2.out"
        });

        // Stagger list items in right column
        gsap.fromTo(".team-col-right .team-item", { opacity: 0, x: -15 }, {
            scrollTrigger: { trigger: ".team-editorial-grid", start: "top 70%" },
            opacity: 1, x: 0, duration: 0.8, stagger: 0.1, delay: 0.8, ease: "power2.out"
        });
    }

    // --- 9. FINALE CINEMATIC ---
    if (document.querySelector('.finale')) {
        const finaleTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".finale",
                start: "top top",
                end: () => "+=" + (6000 * window.canvasScale),
                scrub: 1,
                pin: true
            }
        });

        // Initial setup for blur transitions
        gsap.set([".kw-1", ".kw-2", ".kw-3", ".kw-4", ".st-1", ".st-2", ".st-3", ".st-4", ".finale-main-title"], { filter: "blur(4px)" });

        // Stage 1: Planning
        finaleTl.to([".kw-1", ".st-1"], { opacity: 1, filter: "blur(0px)", duration: 1 })
                .to({}, { duration: 1 })
                
                // Transition to Mental Effort
                .to([".kw-1", ".st-1"], { opacity: 0, filter: "blur(4px)", duration: 1 })
                .to([".kw-2", ".st-2"], { opacity: 1, filter: "blur(0px)", duration: 1 }, "-=0.5")
                .to({}, { duration: 1 })
                
                // Transition to Attention
                .to([".kw-2", ".st-2"], { opacity: 0, filter: "blur(4px)", duration: 1 })
                .to([".kw-3", ".st-3"], { opacity: 1, filter: "blur(0px)", duration: 1 }, "-=0.5")
                .to({}, { duration: 1 })
                
                // Transition to Time
                .to([".kw-3", ".st-3"], { opacity: 0, filter: "blur(4px)", duration: 1 })
                .to([".kw-4", ".st-4"], { opacity: 1, filter: "blur(0px)", duration: 1 }, "-=0.5")
                .to({}, { duration: 1.5 })
                
                // Final Transition to The Output Is Time
                .to([".kw-4", ".st-4"], { opacity: 0, filter: "blur(4px)", duration: 1 })
                .to(".finale-main-title", { opacity: 1, filter: "blur(0px)", duration: 1 }, "-=0.5")
                .to({}, { duration: 2 })
                
                // Fade to blank dark screen
                .to(".finale-main-title", { opacity: 0, filter: "blur(4px)", duration: 1.5 });
    }

    // --- INTERACTIVE MOUSE TILT ---
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            // Calculate rotation degrees based on mouse position relative to center
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });
});

// Refresh ScrollTrigger on resize to handle responsive adjustments
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});


// ==========================================
// CANONICAL CANVAS SCALING SYSTEM (ZOOM)
// ==========================================
const CANONICAL_WIDTH = 1440;
const plexCanvas = document.getElementById('plexCanvas');
window.canvasScale = 1;

function updateCanvasScale() {
    const viewportWidth = window.innerWidth;
    
    // Calculate uniform scale based on width
    window.canvasScale = 1;
    if (viewportWidth < CANONICAL_WIDTH) {
        window.canvasScale = viewportWidth / CANONICAL_WIDTH;
    }
    
    // Apply zoom
    plexCanvas.style.zoom = window.canvasScale;
}

window.addEventListener('resize', () => {
    updateCanvasScale();
    ScrollTrigger.refresh();
});

// Initial scale
updateCanvasScale();
