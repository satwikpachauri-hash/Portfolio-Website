import React from 'react';
import './AboutSceneOne.css';

export default function AboutSceneOne() {
  return (
    <section className="as1-wrapper">
      <div className="as1-content">
        
        <div className="as1-left-col">
          <div className="as1-marker">ABOUT / 01</div>
          
          <h1 className="as1-headline">
            I design how<br />
            people interact<br />
            with things.
          </h1>

          <p className="as1-subheadline">
            Digital, physical,<br className="as1-br-mobile" />
            or somewhere between the two.
          </p>

          <div className="as1-disciplines">
            <div className="as1-disc-primary">
              <h2 className="as1-disc-title interaction">INTERACTION DESIGN</h2>
              <p className="as1-disc-concepts">
                People &nbsp;&middot;&nbsp; Behaviour &nbsp;&middot;&nbsp; Systems &nbsp;&middot;&nbsp; Context
              </p>
            </div>

            <div className="as1-disc-secondary">
              <p className="as1-disc-desc">
                Visual communication is part of how I make those interactions clearer.
              </p>
              <p className="as1-disc-concepts secondary">
                Hierarchy &nbsp;&middot;&nbsp; Typography &nbsp;&middot;&nbsp; Composition
              </p>
            </div>
          </div>
        </div>

        <div className="as1-right-col">
          <div className="as1-portrait-frame">
            <img 
              src="/images/about/satwik-portrait.webp" 
              alt="Portrait of Satwik Pachauri" 
              className="as1-portrait-img"
            />
          </div>
          
          <div className="as1-signature-block">
            <span className="as1-sig-name">Satwik Pachauri</span>
            <span className="as1-sig-role">Interaction Designer</span>
          </div>
        </div>

      </div>
    </section>
  );
}
