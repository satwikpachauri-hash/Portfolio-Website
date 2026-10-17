import React, { useState } from 'react';
import { Tag, Focus, Info } from 'lucide-react';
import googleLogo from '../../../../assets/brand-logos/google-logo.svg';
import appleLogo from '../../../../assets/brand-logos/apple-logo.svg';
import shopifyLogo from '../../../../assets/brand-logos/shopify-logo.svg';
import CaseStudySectionChip from './CaseStudySectionChip';
import './CubiconExploring.css';

const ANATOMY_CONFIG = {
  material: [
    {
      icon: Tag,
      label: 'LABEL',
      desc: 'Identifies the field.'
    },
    {
      icon: Focus,
      label: 'FOCUS',
      desc: 'Shows which field is active.'
    },
    {
      icon: Info,
      label: 'HELP TEXT',
      desc: 'Provides extra guidance.'
    }
  ],
  apple: [
    {
      icon: Tag,
      label: 'LABEL',
      desc: 'Identifies the field.'
    },
    {
      icon: Focus,
      label: 'FOCUS',
      desc: 'Relies on native cursor.'
    },
    {
      icon: Info,
      label: 'FEEDBACK',
      desc: 'Displays inline guidance.'
    }
  ],
  polaris: [
    {
      icon: Tag,
      label: 'LABEL',
      desc: 'Identifies the field.'
    },
    {
      icon: Focus,
      label: 'FOCUS',
      desc: 'Shows which field is active.'
    },
    {
      icon: Info,
      label: 'HELP TEXT',
      desc: 'Provides merchant guidance.'
    }
  ]
};

const SYSTEM_METADATA = {
  material: {
    systemName: 'Material Design 3',
    componentType: 'Outlined Text Field'
  },
  apple: {
    systemName: 'Apple HIG (iOS)',
    componentType: 'Standard Text Field'
  },
  polaris: {
    systemName: 'Shopify Polaris',
    componentType: 'Form Text Field'
  }
};

export default function CubiconExploring() {
  const [activeSystem, setActiveSystem] = useState('material');
  const [showError, setShowError] = useState(false);
  const [showAnatomy, setShowAnatomy] = useState(true);

  const [m3Value, setM3Value] = useState('');
  const [m3Focus, setM3Focus] = useState(false);

  const [appleValue, setAppleValue] = useState('');
  const [appleFocus, setAppleFocus] = useState(false);

  const [polarisValue, setPolarisValue] = useState('');
  const [polarisFocus, setPolarisFocus] = useState(false);

  // =========================================================================
  // MATERIAL DESIGN 3 REPLICA (LOCKED & PRESERVED)
  // =========================================================================
  const renderMaterial = () => {
    const hasValue = m3Value.length > 0;
    const isError = showError;
    const isFocused = m3Focus;

    return (
      <div className={`sys-wrapper sys-material ${showAnatomy ? 'has-anatomy-overlay' : ''}`}>
        {/* Technical Boundary 1: Outlined Container */}
        <div
          className={`sys-material-input-container ${isFocused ? 'focused' : ''} ${hasValue ? 'has-value' : ''} ${isError ? 'error' : ''} ${showAnatomy ? 'anatomy-target-m3-container' : ''}`}
        >
          {showAnatomy && (
            <>
              {/* Measurement 1: Container Height (Top-Right Zone) */}
              <span className="ce-measurement-tag tag-m3-container" aria-hidden="true">
                Container · 56dp
              </span>
              {/* Measurement 2: Floating Label Indicator (Top-Left Zone) */}
              <span className="ce-measurement-tag tag-m3-label" aria-hidden="true">
                Label · Floating
              </span>
            </>
          )}

          {/* Technical Boundary 2: Label Region */}
          <label className={`sys-material-label ${showAnatomy ? 'anatomy-target-m3-label' : ''}`}>
            Email address
          </label>

          <input
            type="email"
            className="sys-material-input"
            value={m3Value}
            onChange={(e) => setM3Value(e.target.value)}
            onFocus={() => setM3Focus(true)}
            onBlur={() => setM3Focus(false)}
            tabIndex={0}
          />
        </div>

        {/* Technical Boundary 3: Supporting Text Region */}
        <div className={`sys-material-support-wrapper ${showAnatomy ? 'anatomy-target-m3-support' : ''}`}>
          <div className={`sys-material-support ${isError ? 'error' : ''}`}>
            {isError ? "Please enter a valid email address." : "e.g. name@example.com"}
          </div>
          {showAnatomy && (
            <span className="ce-measurement-tag tag-m3-support" aria-hidden="true">
              Supporting text · 16dp
            </span>
          )}
        </div>
      </div>
    );
  };

  // =========================================================================
  // APPLE HIG REPLICA (LOCKED & PRESERVED)
  // =========================================================================
  const renderApple = () => {
    const isError = showError;

    return (
      <div className={`sys-wrapper sys-apple ${showAnatomy ? 'has-anatomy-overlay' : ''}`}>
        {/* Technical Boundary 1: External Label Row (Label & Label Measurement on LEFT) */}
        <div className="sys-apple-label-row">
          <div className={`sys-apple-label-box ${showAnatomy ? 'anatomy-target-apple-label' : ''}`}>
            <label className="sys-apple-label">
              Email
            </label>
          </div>
          {showAnatomy && (
            <span className="ce-measurement-tag tag-apple-label" aria-hidden="true">
              Label · 15pt
            </span>
          )}
        </div>

        {/* Technical Boundary 2: Native 44pt Touch Container (Container Measurement on RIGHT) */}
        <div className={`sys-apple-input-container ${appleFocus ? 'focused' : ''} ${showAnatomy ? 'anatomy-target-apple-container' : ''}`}>
          {showAnatomy && (
            <span className="ce-measurement-tag tag-apple-container" aria-hidden="true">
              Container · 44pt
            </span>
          )}

          <input
            type="email"
            className="sys-apple-input"
            placeholder="name@example.com"
            value={appleValue}
            onChange={(e) => setAppleValue(e.target.value)}
            onFocus={() => setAppleFocus(true)}
            onBlur={() => setAppleFocus(false)}
            tabIndex={0}
          />
          {appleValue && (
            <button className="sys-apple-clear" onClick={() => setAppleValue('')} tabIndex={-1} aria-label="Clear text">
              <svg viewBox="0 0 14 14" width="16" height="16"><circle cx="7" cy="7" r="7" fill="currentColor"/><path d="M4.5 4.5l5 5m0-5l-5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
          )}
        </div>

        {/* Technical Boundary 3: Inline Feedback */}
        <div className={`sys-apple-support-wrapper ${showAnatomy ? 'anatomy-target-apple-support' : ''}`}>
          <div className={`sys-apple-support ${isError ? 'error' : ''}`}>
            {isError ? "Invalid email address" : " "}
          </div>
          {showAnatomy && (
            <span className="ce-measurement-tag tag-apple-support" aria-hidden="true">
              Inline feedback · 13pt
            </span>
          )}
        </div>
      </div>
    );
  };

  // =========================================================================
  // SHOPIFY POLARIS REPLICA (Separated Label & Container Annotation Zones)
  // =========================================================================
  const renderPolaris = () => {
    const isError = showError;
    const isFocused = polarisFocus;

    return (
      <div className={`sys-wrapper sys-polaris ${showAnatomy ? 'has-anatomy-overlay' : ''}`}>
        {/* Technical Boundary 1: Form Label Row (Label & Label Measurement on LEFT) */}
        <div className="sys-polaris-label-row">
          <div className={`sys-polaris-label-box ${showAnatomy ? 'anatomy-target-polaris-label' : ''}`}>
            <label className="sys-polaris-label">
              Email address
            </label>
          </div>
          {showAnatomy && (
            <span className="ce-measurement-tag tag-polaris-label" aria-hidden="true">
              Label · 13px
            </span>
          )}
        </div>

        {/* Technical Boundary 2: Compact 36px Merchant Container (Container Measurement on RIGHT) */}
        <div
          className={`sys-polaris-input-container ${isFocused ? 'focused' : ''} ${isError ? 'error' : ''} ${showAnatomy ? 'anatomy-target-polaris-container' : ''}`}
        >
          {showAnatomy && (
            <span className="ce-measurement-tag tag-polaris-container" aria-hidden="true">
              Container · 36px
            </span>
          )}

          <input
            type="email"
            className="sys-polaris-input"
            value={polarisValue}
            onChange={(e) => setPolarisValue(e.target.value)}
            onFocus={() => setPolarisFocus(true)}
            onBlur={() => setPolarisFocus(false)}
            tabIndex={0}
          />
        </div>

        {/* Technical Boundary 3: Help / Error Text */}
        <div className={`sys-polaris-support-wrapper ${showAnatomy ? 'anatomy-target-polaris-support' : ''}`}>
          <div className={`sys-polaris-support ${isError ? 'error' : ''}`}>
            {isError ? (
              <>
                <svg viewBox="0 0 20 20" className="sys-polaris-error-icon">
                  <path fillRule="evenodd" d="M10 20c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm0-18c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm-1 3a1 1 0 012 0v5a1 1 0 11-2 0v-5zm1 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
                </svg>
                Email is required
              </>
            ) : (
              "We'll use this to contact you."
            )}
          </div>
          {showAnatomy && (
            <span className="ce-measurement-tag tag-polaris-support" aria-hidden="true">
              {isError ? "Error text · 13px" : "Help text · 13px"}
            </span>
          )}
        </div>
      </div>
    );
  };

  const currentAnatomy = ANATOMY_CONFIG[activeSystem] || ANATOMY_CONFIG.material;
  const currentMetadata = SYSTEM_METADATA[activeSystem] || SYSTEM_METADATA.material;

  return (
    <section className="cubicon-exploring-section">
      <header className="ce-header-block">
        <CaseStudySectionChip number="02" title="DESIGN SYSTEM EXPLORATION" />
        <h3 className="ce-story-title font-display">Exploring three design systems.</h3>
        <p className="ce-story-body font-body">
          I explored Material Design 3, Apple HIG and Shopify Polaris to understand how each handles components, interactions and feedback.
        </p>
      </header>

      <div className="ce-container">

        {/* Left Column */}
        <div className="ce-text-column">
          <div className="ce-system-toggles font-body">
            <button
              className="ce-toggle-btn"
              data-active={activeSystem === 'material'}
              onClick={() => setActiveSystem('material')}
            >
              <div className="ce-toggle-logo-slot">
                <img src={googleLogo} alt="Google" className="ce-system-logo" />
              </div>
              Google Material Design 3
            </button>
            <button
              className="ce-toggle-btn"
              data-active={activeSystem === 'apple'}
              onClick={() => setActiveSystem('apple')}
            >
              <div className="ce-toggle-logo-slot ce-apple-slot">
                <img src={appleLogo} alt="Apple" className="ce-system-logo ce-apple-logo" />
              </div>
              Apple HIG (iOS)
            </button>
            <button
              className="ce-toggle-btn"
              data-active={activeSystem === 'polaris'}
              onClick={() => setActiveSystem('polaris')}
            >
              <div className="ce-toggle-logo-slot">
                <img src={shopifyLogo} alt="Shopify" className="ce-system-logo" />
              </div>
              Shopify Polaris
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="ce-visual-column">
          <h4 className="ce-comparison-heading font-display">How does each system handle an input field?</h4>

          <div className="ce-canvas">
            {/* Component Canvas Header */}
            <div className="ce-canvas-header font-body">
              <span className="ce-canvas-system-tag">{currentMetadata.systemName}</span>
              <span className="ce-canvas-component-tag">{currentMetadata.componentType}</span>
            </div>

            {/* The active replica with Layer 01 Visual Anatomy */}
            {activeSystem === 'material' && renderMaterial()}
            {activeSystem === 'apple' && renderApple()}
            {activeSystem === 'polaris' && renderPolaris()}

            {/* Layer 02: Approved Icon-Supported Anatomy Explanations Below the Component */}
            {showAnatomy && (
              <div className="ce-anatomy-container font-body">
                {currentAnatomy.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="ce-anatomy-row">
                      <div className="ce-anatomy-icon-wrap">
                        <Icon size={15} className="ce-anatomy-icon" />
                      </div>
                      <div className="ce-anatomy-content">
                        <span className="ce-anatomy-label">{item.label}</span>
                        <span className="ce-anatomy-desc">{item.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="ce-canvas-actions font-body">
            <button
              className="ce-action-btn"
              data-active={showError}
              onClick={() => setShowError(!showError)}
            >
              <div className="ce-toggle-switch">
                <div className="ce-toggle-thumb"></div>
              </div>
              Show error state
            </button>

            <button
              className="ce-action-btn"
              data-active={showAnatomy}
              onClick={() => setShowAnatomy(!showAnatomy)}
            >
              <div className="ce-toggle-switch">
                <div className="ce-toggle-thumb"></div>
              </div>
              Show component structure
            </button>
          </div>
        </div>

      </div>

      <div className="ce-closing-text font-display">
        <h4>Next: Choosing the right design system.</h4>
      </div>
    </section>
  );
}
