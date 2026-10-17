const fs = require('fs');
const path = require('path');

const cssPath = path.join('src', 'pages', 'case-studies', 'cubicon', 'Cubicon.css');

const currentCss = fs.readFileSync(cssPath, 'utf8');
const splitIndex = currentCss.indexOf('/* ============================================================');
const heroCss = currentCss.substring(0, splitIndex);

const newCss = `
/* ============================================================
   SECTION 01 - UNDERSTANDING THE SYSTEM
   ============================================================ */
.cubicon-case-study {
  --c1-bg: var(--bg);
  --c1-module-line: rgba(0, 0, 0, 0.4);
  --c1-module-bg: rgba(0, 0, 0, 0.1);
  --c1-module-context: rgba(0, 0, 0, 0.4);
  --c1-module-active: rgba(0, 0, 0, 0.85);
  --c1-text-main: var(--text-primary);
  --c1-text-sec: var(--text-secondary);
}

html:not([data-theme="dark"]) .cubicon-case-study {
  --c1-module-line: rgba(15, 15, 15, 0.2);
  --c1-module-bg: rgba(15, 15, 15, 0.05);
  --c1-module-context: rgba(15, 15, 15, 0.25);
  --c1-module-active: rgba(15, 15, 15, 0.85);
}

[data-theme="dark"] .cubicon-case-study {
  --c1-module-line: rgba(255, 255, 255, 0.3);
  --c1-module-bg: rgba(255, 255, 255, 0.1);
  --c1-module-context: rgba(255, 255, 255, 0.35);
  --c1-module-active: rgba(255, 255, 255, 0.95);
}

.cb-s1-desktop, .cb-s1-mobile {
  background: var(--c1-bg);
  width: 100%;
}

/* OPENING */
.cb-s1-opening {
  max-width: 1050px;
  margin: 0 auto;
  padding: 120px 5% 80px 5%;
  text-align: center;
}
.cb-s1-label {
  font-family: var(--font-body);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--c1-text-sec);
  font-weight: 600;
  display: block;
  margin-bottom: 24px;
}
.cb-s1-headline {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 500;
  line-height: 1.1;
  color: var(--c1-text-main);
  margin: 0 auto 32px auto;
  max-width: 1050px;
}
.cb-s1-body {
  font-family: var(--font-body);
  font-size: clamp(1.1rem, 2vw, 1.25rem);
  line-height: 1.6;
  color: var(--c1-text-sec);
  max-width: 760px;
  margin: 0 auto;
}

/* DESKTOP LAYOUT */
@media (min-width: 1024px) {
  .cb-s1-mobile { display: none !important; }
  .cb-s1-pin {
    height: 100vh;
    width: 100%;
    max-width: 1800px;
    margin: 0 auto;
    display: flex;
    padding: 0 5%;
    position: relative;
    overflow: hidden;
  }
  .cb-s1-left {
    width: 45%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
  }
  .cb-s1-statement {
    position: absolute;
    width: 100%;
    max-width: 500px;
  }
  .cb-s1-statement h3 {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 4vw, 4.5rem);
    font-weight: 500;
    line-height: 1.1;
    color: var(--c1-text-main);
    margin-bottom: 24px;
  }
  .cb-s1-statement p {
    font-family: var(--font-body);
    font-size: 1.125rem;
    color: var(--c1-text-sec);
    line-height: 1.6;
  }
  .cb-s1-right {
    width: 55%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 1500px;
  }
}

/* MOBILE LAYOUT */
@media (max-width: 1023px) {
  .cb-s1-desktop { display: none !important; }
  .cb-m-block {
    padding: 60px 5%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .cb-m-block h3 {
    font-family: var(--font-display);
    font-size: clamp(2rem, 6vw, 2.75rem);
    font-weight: 500;
    line-height: 1.1;
    color: var(--c1-text-main);
    margin-bottom: 16px;
  }
  .cb-m-block p {
    font-family: var(--font-body);
    font-size: 1.1rem;
    color: var(--c1-text-sec);
    margin-bottom: 40px;
  }
  .cb-m-visual {
    width: 100%;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 1000px;
  }
}

/* MODULES & SCENE */
.cb-scene-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cb-scene {
  position: relative;
  width: 0;
  height: 0;
  transform-style: preserve-3d;
}
.cb-mod {
  position: absolute;
  width: 50px;
  height: 50px;
  transform-style: preserve-3d;
  /* Centered around 0,0 */
  margin-top: -25px;
  margin-left: -25px;
}
.cb-mod-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}
.cb-face {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px solid var(--c1-module-line);
  background: currentColor;
  backface-visibility: visible; /* To see through transparent boxes if needed */
}
.cb-top { transform: rotateX(90deg) translateZ(25px); }
.cb-front { transform: translateZ(25px); }
.cb-right { transform: rotateY(90deg) translateZ(25px); }

.cb-anno {
  position: absolute;
  font-family: var(--font-body);
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  font-weight: 600;
  color: var(--c1-text-sec);
  pointer-events: none;
  white-space: nowrap;
}
.cb-anno-purpose { top: -120px; left: -100px; }
.cb-anno-structure { top: 0px; right: -150px; }
.cb-anno-consistency { bottom: -120px; left: -50px; }

.cb-anno-polaris { top: -150px; left: -150px; }
.cb-anno-md { top: 0px; right: -150px; }
.cb-anno-apple { bottom: -150px; left: -50px; }

/* Mobile specific static states */
.cb-scene-m-u { transform: rotateX(60deg) rotateZ(-45deg); }
.cb-scene-m-u .cb-mod { color: var(--c1-module-active); }
.cb-scene-m-u .cb-mod:nth-child(1) { transform: translate3d(-60px, -60px, 0); }
.cb-scene-m-u .cb-mod:nth-child(2) { transform: translate3d(0, -60px, 0); }
.cb-scene-m-u .cb-mod:nth-child(3) { transform: translate3d(60px, -60px, 0); }
.cb-scene-m-u .cb-mod:nth-child(4) { transform: translate3d(-60px, 0, 0); }
.cb-scene-m-u .cb-mod:nth-child(5) { transform: translate3d(0, 0, 0); }
.cb-scene-m-u .cb-mod:nth-child(6) { transform: translate3d(60px, 0, 0); }
.cb-scene-m-u .cb-mod:nth-child(7) { transform: translate3d(-60px, 60px, 0); }
.cb-scene-m-u .cb-mod:nth-child(8) { transform: translate3d(0, 60px, 0); }
.cb-scene-m-u .cb-mod:nth-child(9) { transform: translate3d(60px, 60px, 0); }

.cb-scene-m-e { transform: rotateX(60deg) rotateZ(-45deg); }
.cb-scene-m-e .cb-mod { color: var(--c1-module-context); }
.cb-scene-m-e .cb-mod:nth-child(1) { transform: translate3d(-130px, -130px, 0); }
.cb-scene-m-e .cb-mod:nth-child(2) { transform: translate3d(-80px, -130px, 0); }
.cb-scene-m-e .cb-mod:nth-child(3) { transform: translate3d(-30px, -130px, 0); }
.cb-scene-m-e .cb-mod:nth-child(4) { transform: translate3d(-50px, 0, 0); }
.cb-scene-m-e .cb-mod:nth-child(5) { transform: translate3d(0, 0, 0); }
.cb-scene-m-e .cb-mod:nth-child(6) { transform: translate3d(50px, 0, 0); }
.cb-scene-m-e .cb-mod:nth-child(7) { transform: translate3d(30px, 130px, 0); }
.cb-scene-m-e .cb-mod:nth-child(8) { transform: translate3d(80px, 130px, 0); }
.cb-scene-m-e .cb-mod:nth-child(9) { transform: translate3d(130px, 130px, 0); }

.cb-scene-m-c { transform: rotateX(65deg) rotateZ(-35deg); }
.cb-scene-m-c .cb-mod { color: var(--c1-module-context); }
.cb-scene-m-c .cb-mod-row-1 { color: var(--c1-module-active); }
.cb-scene-m-c .cb-mod:nth-child(1) { transform: translate3d(-80px, -80px, 0); }
.cb-scene-m-c .cb-mod:nth-child(2) { transform: translate3d(-30px, -80px, 0); }
.cb-scene-m-c .cb-mod:nth-child(3) { transform: translate3d(20px, -80px, 0); }
.cb-scene-m-c .cb-mod:nth-child(4) { transform: translate3d(-50px, 0, 0); }
.cb-scene-m-c .cb-mod:nth-child(5) { transform: translate3d(0, 0, 0); }
.cb-scene-m-c .cb-mod:nth-child(6) { transform: translate3d(50px, 0, 0); }
.cb-scene-m-c .cb-mod:nth-child(7) { transform: translate3d(-20px, 80px, 0); }
.cb-scene-m-c .cb-mod:nth-child(8) { transform: translate3d(30px, 80px, 0); }
.cb-scene-m-c .cb-mod:nth-child(9) { transform: translate3d(80px, 80px, 0); }

.cb-scene-m-s { transform: rotateX(55deg) rotateZ(-50deg); }
.cb-scene-m-s .cb-mod { color: var(--c1-module-active); }
.cb-scene-m-s .cb-mod:nth-child(1) { transform: translate3d(-52px, -52px, 0); }
.cb-scene-m-s .cb-mod:nth-child(2) { transform: translate3d(0, -52px, 0); }
.cb-scene-m-s .cb-mod:nth-child(3) { transform: translate3d(52px, -52px, 0); }
.cb-scene-m-s .cb-mod:nth-child(4) { transform: translate3d(-52px, 0, 20px); }
.cb-scene-m-s .cb-mod:nth-child(5) { transform: translate3d(0, 0, 20px); }
.cb-scene-m-s .cb-mod:nth-child(6) { transform: translate3d(52px, 0, 20px); }
.cb-scene-m-s .cb-mod:nth-child(7) { transform: translate3d(-52px, 52px, 0); }
.cb-scene-m-s .cb-mod:nth-child(8) { transform: translate3d(0, 52px, 0); }
.cb-scene-m-s .cb-mod:nth-child(9) { transform: translate3d(52px, 52px, 0); }

/* Reduced Motion Override */
@media (prefers-reduced-motion: reduce) {
  .cb-s1-desktop { display: none !important; }
  .cb-s1-mobile { display: block !important; }
}
`

fs.writeFileSync(cssPath, heroCss + newCss);
