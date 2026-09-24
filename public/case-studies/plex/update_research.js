const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const targetHtml = `        <!-- PART C: Static Data Panel (Scrolls naturally) -->
        <div class="problem-data-panel container">`;

const replacementHtml = `        <!-- Research Insights Heading -->
        <div class="research-insights-header text-center">
            <span class="section-label">RESEARCH INSIGHTS</span>
            <h2 class="section-title gsap-reveal" style="font-size: clamp(1.8rem, 4vw, 3rem);">The data behind the problem.</h2>
        </div>

        <!-- PART C: Static Data Panel (Scrolls naturally) -->
        <div class="problem-data-panel container">`;

if (html.includes(targetHtml)) {
    fs.writeFileSync('index.html', html.replace(targetHtml, replacementHtml));
    console.log('index.html updated successfully');
} else {
    console.log('index.html target not found');
}

let css = fs.readFileSync('styles.css', 'utf-8');

const targetCss = `.problem-data-panel { padding-top: 6rem; padding-bottom: 6rem; }`;

const replacementCss = `.research-insights-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 6rem 20px 2rem;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
}
.research-insights-header .section-label {
    letter-spacing: 0.15em;
}
.research-insights-header .section-title {
    color: var(--text-primary);
    max-width: 600px;
}

.problem-data-panel { padding-top: 2rem; padding-bottom: 6rem; }`;

if (css.includes(targetCss)) {
    fs.writeFileSync('styles.css', css.replace(targetCss, replacementCss));
    console.log('styles.css updated successfully');
} else {
    console.log('styles.css target not found');
}
