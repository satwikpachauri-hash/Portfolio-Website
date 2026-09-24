const fs = require('fs');
let js = fs.readFileSync('script.js', 'utf8');
const insertionPoint = '    // --- SECTION 2: PROJECT CONTEXT PINNED ANIMATION ---';
const newJs = \
    // --- SECTION 01: THE PROBLEM PINNED ANIMATION ---
    if (document.querySelector('.the-problem')) {
        const problemTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.the-problem',
                start: 'top top',
                end: '+=3500',
                scrub: 1,
                pin: true,
                anticipatePin: 1
            }
        });

        // 1. Header appears then fades
        problemTl.to('.problem-header', { opacity: 1, duration: 1 })
                 .to({}, { duration: 1 })
                 .to('.problem-header', { opacity: 0, duration: 1 });

        // 2. State 1: 58%
        problemTl.to('.state-1', { opacity: 1, duration: 1 })
                 .to('.circle-fill', { strokeDashoffset: 119, duration: 2 }, '<') // 283 * (1 - 0.58) = 118.86
                 .to('.n-1', { 
                     innerText: 58, 
                     duration: 2, 
                     snap: { innerText: 1 },
                     modifiers: {
                         innerText: function(innerText) { return Math.round(innerText) + '%'; }
                     }
                 }, '<')
                 .to({}, { duration: 1.5 })
                 .to('.state-1', { opacity: 0, duration: 1 });

        // 3. State 2: 4.9 HOURS
        problemTl.to('.state-2', { opacity: 1, duration: 1 })
                 .to('.week-bar-fill', { width: '25%', duration: 1.5 }, '<')
                 .to({}, { duration: 1.5 })
                 .to('.state-2', { opacity: 0, duration: 1 });

        // 4. State 3: 33.9 -> 55.5 DAYS
        problemTl.to('.state-3', { opacity: 1, duration: 1 })
                 .to('.timeline-fill.predicted', { width: '50%', duration: 1.5 })
                 .to({}, { duration: 1 })
                 .to('.timeline-fill.actual', { width: '85%', duration: 1.5 })
                 .to({}, { duration: 1.5 })
                 .to('.state-3', { opacity: 0, duration: 1 });

        // 5. Final Problem Statement
        problemTl.to('.pt-1', { opacity: 1, y: -20, duration: 1 })
                 .to('.pt-2', { opacity: 1, y: -20, duration: 1 }, '+=0.5')
                 .to({}, { duration: 2 });
    }

\;
if (!js.includes('.the-problem')) {
    js = js.replace(insertionPoint, newJs + insertionPoint);
    fs.writeFileSync('script.js', js);
    console.log('JS updated');
} else {
    console.log('Already updated');
}
\
