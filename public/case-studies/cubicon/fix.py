import os

path = r'c:\Users\Asus\OneDrive\Desktop\cubicon-portfolio\Final_Deploy\index.html'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace paths
content = content.replace('cubicon-portfolio/', './')

# Replace sections 04 and 05
import re

start_marker = '<!-- 04 ITERATION 1 -->'
end_marker = '<!-- 06 SEMANTICS -->'

replacement = """<!-- 04 ITERATIONS -->
<section class="section">
  <div class="container">
    <div class="reveal" style="text-align:center;margin-bottom:80px;">
      <span class="section-label">04 — Iterations</span>
      <h2>Evolution of the Interface</h2>
      <p class="lead" style="margin: 0 auto;">Placing the initial Phase One designs alongside the refined Phase Two solutions to highlight the progression of visual hierarchy, semantic clarity, and proper affordances.</p>
    </div>

    <!-- Home Page Iteration -->
    <div class="reveal" style="margin-bottom:80px;">
      <h3 style="text-align:center; margin-bottom: 32px; color: var(--accent);">Home Page</h3>
      <div class="grid-2" style="align-items: start;">
        <!-- Phase 1 -->
        <div>
          <div class="mockup-phone" style="margin: 0 auto 24px auto;"><img src="./assets/mockups/iteration1/iter1_home.png" alt="V1 Home"></div>
          <div class="ps-content" style="text-align: center;">
            <span class="ps-badge problem icon-badge"><i data-lucide="x-circle" style="width:16px;"></i> Phase 1: Problem</span>
            <h3 style="text-align: center;">Poor Visual Hierarchy</h3>
            <p style="margin: 0 auto;">The homepage had severe visual inconsistency — it was hard to differentiate between foreground and background elements. Categories were disorganized, and the overall layout felt chaotic rather than curated.</p>
          </div>
        </div>
        <!-- Phase 2 -->
        <div>
          <div class="mockup-phone" style="margin: 0 auto 24px auto;"><img src="./assets/mockups/iteration2/iter2_home.png" alt="V2 Home"></div>
          <div class="ps-content" style="text-align: center;">
            <span class="ps-badge improvement icon-badge"><i data-lucide="check-circle" style="width:16px;"></i> Phase 2: Solution</span>
            <h3 style="text-align: center;">Restructured Homepage</h3>
            <p style="margin: 0 auto;">Homepage completely restructured with clear visual hierarchy, clearly differentiating foreground elements from background layers.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Page Iteration -->
    <div class="reveal" style="margin-bottom:80px;">
      <h3 style="text-align:center; margin-bottom: 32px; color: var(--accent);">Search Page</h3>
      <div class="grid-2" style="align-items: start;">
        <!-- Phase 1 -->
        <div>
          <div class="mockup-phone" style="margin: 0 auto 24px auto;"><img src="./assets/mockups/iteration1/iter1_search.png" alt="V1 Search"></div>
          <div class="ps-content" style="text-align: center;">
            <span class="ps-badge problem icon-badge"><i data-lucide="x-circle" style="width:16px;"></i> Phase 1: Problem</span>
            <h3 style="text-align: center;">Missing Signifiers</h3>
            <p style="margin: 0 auto;">The search bar lacked essential signifiers — no voice icon, no back navigation icon. Users had no clear visual cues to understand what actions were available, making the experience feel broken.</p>
          </div>
        </div>
        <!-- Phase 2 -->
        <div>
          <div class="mockup-phone" style="margin: 0 auto 24px auto;"><img src="./assets/mockups/iteration2/iter2_search.png" alt="V2 Search"></div>
          <div class="ps-content" style="text-align: center;">
            <span class="ps-badge improvement icon-badge"><i data-lucide="check-circle" style="width:16px;"></i> Phase 2: Solution</span>
            <h3 style=\"text-align: center;\">Proper Signifiers</h3>
            <p style="margin: 0 auto;">The search bar now has proper signifiers — including a back arrow and voice icon to clearly indicate available actions to the user.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Page Iteration -->
    <div class="reveal" style="margin-bottom:80px;">
      <h3 style="text-align:center; margin-bottom: 32px; color: var(--accent);">Product Page</h3>
      <div class="grid-2" style="align-items: start;">
        <!-- Phase 1 -->
        <div>
          <div class="mockup-phone" style="margin: 0 auto 24px auto;"><img src="./assets/mockups/iteration1/iter1_product.png" alt="V1 Product"></div>
          <div class="ps-content" style="text-align: center;">
            <span class="ps-badge problem icon-badge"><i data-lucide="x-circle" style="width:16px;"></i> Phase 1: Problem</span>
            <h3 style="text-align: center;">Weak CTA Weight</h3>
            <p style="margin: 0 auto;">The "Add to Cart" button didn't carry enough visual weight to drive action. In an e-commerce app, the primary call-to-action (CTA) needs to stand out clearly — here it blended into the page.</p>
          </div>
        </div>
        <!-- Phase 2 -->
        <div>
          <div class="mockup-phone" style="margin: 0 auto 24px auto;"><img src="./assets/mockups/iteration2/iter2_product.png" alt="V2 Product"></div>
          <div class="ps-content" style="text-align: center;">
            <span class="ps-badge improvement icon-badge"><i data-lucide="check-circle" style="width:16px;"></i> Phase 2: Solution</span>
            <h3 style="text-align: center;">Stronger CTA</h3>
            <p style="margin: 0 auto;">The Add to Cart button was completely redesigned with proper visual weight, color, and a rounded shape to drive conversion.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Checkout Flow Iteration -->
    <div class="reveal">
      <h3 style="text-align:center; margin-bottom: 32px; color: var(--accent);">Checkout Flow</h3>
      <div class="grid-2" style="align-items: start;">
        <!-- Phase 1 -->
        <div>
          <div class="glass-card" style="margin: 0 auto 24px auto; display: flex; align-items: center; justify-content: center; height: 570px; width: 280px;">
             <p style="text-align: center; color: var(--text-muted);">No Checkout Flow Designed in Phase 1</p>
          </div>
          <div class="ps-content" style="text-align: center;">
            <span class="ps-badge problem icon-badge"><i data-lucide="x-circle" style="width:16px;"></i> Phase 1: Problem</span>
            <h3 style="text-align: center;">Missing Flow</h3>
            <p style="margin: 0 auto;">The first phase did not include the checkout and cart flow.</p>
          </div>
        </div>
        <!-- Phase 2 -->
        <div>
          <div class="mockup-phone" style="margin: 0 auto 24px auto;"><img src="./assets/mockups/iteration2/iter2_cart.png" alt="V2 Cart"></div>
          <div class="ps-content" style="text-align: center;">
            <span class="ps-badge improvement icon-badge"><i data-lucide="check-circle" style="width:16px;"></i> Phase 2: Solution</span>
            <h3 style="text-align: center;">End-to-End Checkout</h3>
            <p style="margin: 0 auto;">Brand new screens were added to complete the user journey, including a Cart, Empty Cart state, and a full Google Pay payment flow.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="section-divider"></div>

<!-- 05 SEMANTICS -->"""

idx1 = content.find(start_marker)
idx2 = content.find(end_marker)

if idx1 != -1 and idx2 != -1:
    content = content[:idx1] + replacement + content[idx2 + len(end_marker):]

# Update numbers
content = content.replace('<!-- 06 SEMANTICS -->', '<!-- 05 SEMANTICS -->')
content = content.replace('<span class="section-label">06 — Semantics Analysis</span>', '<span class="section-label">05 — Semantics Analysis</span>')
content = content.replace('<!-- 07 USABILITY ISSUES -->', '<!-- 06 USABILITY ISSUES -->')
content = content.replace('<span class="section-label">07 — Usability Issues</span>', '<span class="section-label">06 — Usability Issues</span>')
content = content.replace('<!-- 08 THE SWIGGY EFFECT -->', '<!-- 07 THE SWIGGY EFFECT -->')
content = content.replace('<span class="section-label">08 — Industry Insight</span>', '<span class="section-label">07 — Industry Insight</span>')
content = content.replace('<!-- 09 USABILITY TESTING -->', '<!-- 08 USABILITY TESTING -->')
content = content.replace('<span class="section-label">09 — Validation</span>', '<span class="section-label">08 — Validation</span>')
content = content.replace('<!-- 10 FINAL ITERATION -->', '<!-- 09 FINAL ITERATION -->')
content = content.replace('<span class="section-label">10 — The Result</span>', '<span class="section-label">09 — The Result</span>')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Done")
