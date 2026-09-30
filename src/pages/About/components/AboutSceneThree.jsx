import React from 'react';
import './AboutSceneThree.css';

export default function AboutSceneThree() {
  return (
    <section className="as3-wrapper">
      <div className="as3-content">
        
        <div className="as3-header">
          <div className="as3-marker">ABOUT / 03</div>
          <h2 className="as3-heading">Across the layers.</h2>
          <p className="as3-supporting-statement">
            I like working across the decisions that shape an experience, from understanding the problem to bringing the interaction into something tangible.
          </p>
        </div>

        <div className="as3-layers-field">
          
          {/* Desktop/Tablet Weaving Line */}
          <div className="as3-connection-desktop" aria-hidden="true">
            <svg className="as3-line-svg" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M 8 0 L 38 25 L 18 50 L 53 75 L 28 100" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>

          {/* Phone Vertical Line */}
          <div className="as3-connection-phone" aria-hidden="true">
            <div className="as3-vertical-line"></div>
          </div>

          {/* Layer 1 */}
          <div className="as3-layer l-understand">
            <h3 className="as3-layer-title">UNDERSTAND</h3>
            <p className="as3-layer-desc">Research &middot; Context &middot; Problem framing</p>
          </div>

          {/* Layer 2 */}
          <div className="as3-layer l-structure">
            <h3 className="as3-layer-title">STRUCTURE</h3>
            <p className="as3-layer-desc">Information architecture &middot; Flows &middot; Systems</p>
          </div>

          {/* Layer 3 - Primary Emphasis */}
          <div className="as3-layer l-interact primary">
            <h3 className="as3-layer-title">INTERACT</h3>
            <p className="as3-layer-desc">Behaviour &middot; Interaction design &middot; Prototyping</p>
          </div>

          {/* Layer 4 */}
          <div className="as3-layer l-visualize">
            <h3 className="as3-layer-title">VISUALIZE</h3>
            <p className="as3-layer-desc">Hierarchy &middot; Interface &middot; Visual communication</p>
          </div>

          {/* Layer 5 */}
          <div className="as3-layer l-build">
            <h3 className="as3-layer-title">BUILD</h3>
            <p className="as3-layer-desc">Frontend &middot; Design to code &middot; Implementation</p>
          </div>

        </div>

      </div>
    </section>
  );
}
