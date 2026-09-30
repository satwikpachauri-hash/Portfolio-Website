import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  Search, Bell, Settings, User, 
  LayoutDashboard, CheckSquare, Calendar, Folder, Target, BarChart2,
  ChevronDown, Clock, Plus, Tag, ToggleRight, Check, Palette
} from 'lucide-react';
import './PlexExistingToolsSection.css';
import CaseStudySectionChip from './CaseStudySectionChip';

const frictionData = [
  { id: 'f0', label: 'Choose Priority', icon: ChevronDown, type: 'dropdown' },
  { id: 'f1', label: 'Add Due Date', icon: Calendar, type: 'icon' },
  { id: 'f2', label: 'Estimate Time', icon: Clock, type: 'icon' },
  { id: 'f3', label: 'Create Project...', icon: Plus, type: 'input' },
  { id: 'f4', label: 'Choose Labels', icon: Tag, type: 'icon' },
  { id: 'f5', label: 'Set Reminder', icon: Bell, type: 'icon' },
  { id: 'f6', label: 'Select Workspace', icon: ChevronDown, type: 'dropdown' },
  { id: 'f7', label: 'Repeat Weekly?', icon: ToggleRight, type: 'toggle' },
  { id: 'f8', label: 'Archive Completed?', icon: Check, type: 'action' },
  { id: 'f9', label: 'Choose Color', icon: Palette, type: 'color' },
];

const FrictionItem = ({ item, index, scrollYProgress }) => {
  let appearStart;
  if (index < 3) {
    appearStart = 0.30 + index * 0.03;
  } else if (index < 7) {
    appearStart = 0.43 + (index - 3) * 0.03;
  } else {
    appearStart = 0.60 + (index - 7) * 0.03;
  }
  const appearEnd = appearStart + 0.04;

  const disappearStart = 0.78 + (9 - index) * 0.008;
  const disappearEnd = disappearStart + 0.03;

  const opacity = useTransform(
    scrollYProgress,
    [0, appearStart, appearEnd, disappearStart, disappearEnd, 1],
    [0, 0, 1, 1, 0, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, appearStart, appearEnd, disappearStart, disappearEnd, 1],
    [0.9, 0.9, 1, 1, 0.95, 0.95]
  );
  const y = useTransform(
    scrollYProgress,
    [0, appearStart, appearEnd, disappearStart, disappearEnd, 1],
    [10, 10, 0, 0, -10, -10]
  );

  const Icon = item.icon;

  return (
    <div className={`plex-friction-wrapper f-${index}`}>
      <motion.div 
        className={`plex-friction-item type-${item.type}`}
        style={{ opacity, scale, y }}
      >
        {item.type !== 'input' && item.type !== 'dropdown' && <Icon size={14} className="friction-icon" />}
        <span className="font-body">{item.label}</span>
        {(item.type === 'dropdown' || item.type === 'input') && <Icon size={14} className="friction-icon trailing" />}
        {item.type === 'color' && <div className="friction-color-indicator" />}
        {item.type === 'toggle' && <Icon size={16} className="friction-icon trailing accent" />}
      </motion.div>
    </div>
  );
};

const WorkspaceDashboard = ({ dashboardBlur }) => {
  return (
    <motion.div className="plex-workspace-dashboard" style={{ filter: dashboardBlur }}>
      {/* TOP BAR */}
      <div className="plex-workspace-topbar">
        <div className="plex-topbar-left">
          <div className="plex-workspace-logo font-display">Workspace</div>
        </div>
        <div className="plex-topbar-search">
          <Search size={14} />
          <span className="font-body">Search...</span>
        </div>
        <div className="plex-topbar-right">
          <Bell size={16} className="text-muted" />
          <Settings size={16} className="text-muted" />
          <div className="plex-avatar"><User size={16} /></div>
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="plex-workspace-sidebar">
        <div className="plex-sidebar-item active"><LayoutDashboard size={16} /> <span className="sidebar-label font-body">Dashboard</span></div>
        <div className="plex-sidebar-item"><CheckSquare size={16} /> <span className="sidebar-label font-body">Tasks</span></div>
        <div className="plex-sidebar-item"><Calendar size={16} /> <span className="sidebar-label font-body">Calendar</span></div>
        <div className="plex-sidebar-item"><Folder size={16} /> <span className="sidebar-label font-body">Projects</span></div>
        <div className="plex-sidebar-item"><Target size={16} /> <span className="sidebar-label font-body">Goals</span></div>
        <div className="plex-sidebar-item"><BarChart2 size={16} /> <span className="sidebar-label font-body">Analytics</span></div>
        <div className="plex-sidebar-spacer"></div>
        <div className="plex-sidebar-item"><Settings size={16} /> <span className="sidebar-label font-body">Settings</span></div>
      </div>

      {/* MAIN TASK AREA */}
      <div className="plex-workspace-main">
        
        <div className="plex-task-row">
          <div className="plex-task-left">
            <div className="plex-task-checkbox"></div>
            <span className="plex-task-title font-body">Review Q3 Marketing Strategy</span>
          </div>
          <div className="plex-task-right">
            <span className="plex-task-date font-body">Today</span>
            <span className="plex-task-status status-high font-body">High</span>
          </div>
        </div>

        <div className="plex-task-row">
          <div className="plex-task-left">
            <div className="plex-task-checkbox"></div>
            <span className="plex-task-title font-body">Draft Client Proposal</span>
          </div>
          <div className="plex-task-right">
            <span className="plex-task-date font-body">Tomorrow</span>
            <span className="plex-task-status status-draft font-body">Draft</span>
          </div>
        </div>

        <div className="plex-task-row">
          <div className="plex-task-left">
            <div className="plex-task-checkbox"></div>
            <span className="plex-task-title font-body">Update Design System Components</span>
          </div>
          <div className="plex-task-right">
            <span className="plex-task-date font-body">Oct 12</span>
            <span className="plex-task-status status-medium font-body">Medium</span>
          </div>
        </div>

        <div className="plex-task-row">
          <div className="plex-task-left">
            <div className="plex-task-checkbox"></div>
            <span className="plex-task-title font-body">Weekly Team Sync Setup</span>
          </div>
          <div className="plex-task-right">
            <span className="plex-task-date font-body">Oct 14</span>
            <span className="plex-task-status status-routine font-body">Routine</span>
          </div>
        </div>

      </div>

      {/* RIGHT SIDE PANEL */}
      <div className="plex-workspace-rightpanel">
        <div className="plex-panel-widget">
          <h4 className="font-body">CALENDAR</h4>
          <span className="plex-month-label font-body">October</span>
          <div className="plex-calendar-mock">
            {[...Array(28)].map((_, i) => (
              <div key={i} className={`plex-cal-day ${i === 12 ? 'active' : ''}`}></div>
            ))}
          </div>
        </div>
        
        <div className="plex-panel-widget">
          <h4 className="font-body">TODAY'S SCHEDULE</h4>
          <div className="plex-schedule-item font-body">
            10:00 AM - Design Sync
          </div>
        </div>

        <div className="plex-panel-widget">
          <h4 className="font-body">UPCOMING REMINDER</h4>
          <div className="plex-reminder-item font-body">
            <Bell size={14} /> Review budget docs
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function PlexExistingToolsSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // TIMELINE (Optimized for 700vh)
  // 0.00 - 0.08: Intro Hold
  // 0.08 - 0.12: Intro Fade Out
  // 0.12 - 0.20: Dashboard Fade In
  // 0.20 - 0.30: Clean Dashboard Hold
  // 0.30 - 0.70: Camera Zoom + Friction Items Fade In gradually
  // 0.70 - 0.78: Max Friction Hold
  // 0.78 - 0.88: Friction Items Reverse Fade Out + Dashboard returns to focus
  // 0.88 - 0.92: Dashboard Fade Out
  // 0.92 - 1.00: Conclusion Fade In

  // EXCLUSIVITY LOGIC
  const introPhaseVisibility = useTransform(scrollYProgress, v => v >= 0.13 ? "hidden" : "visible");
  const introPhasePointer = useTransform(scrollYProgress, v => v >= 0.13 ? "none" : "auto");
  
  const dashboardPhaseVisibility = useTransform(scrollYProgress, v => (v < 0.11 || v >= 0.93) ? "hidden" : "visible");
  const dashboardPhasePointer = useTransform(scrollYProgress, v => (v < 0.11 || v >= 0.93) ? "none" : "auto");

  const conclusionPhaseVisibility = useTransform(scrollYProgress, v => v < 0.91 ? "hidden" : "visible");
  const conclusionPhasePointer = useTransform(scrollYProgress, v => v < 0.91 ? "none" : "auto");

  // INTRO ANIMATIONS
  const introOpacity = useTransform(scrollYProgress, [0, 0.08, 0.12], [1, 1, 0]);
  const introY = useTransform(scrollYProgress, [0.08, 0.12], [0, -40]);

  // DASHBOARD ANIMATIONS
  const dashboardOpacity = useTransform(scrollYProgress, [0.12, 0.20, 0.88, 0.92], [0, 1, 1, 0]);
  const dashboardScale = useTransform(scrollYProgress, [0.12, 0.20, 0.30, 0.70, 0.78, 0.88], [0.95, 1, 1, 1.05, 1.05, 1]);
  const dashboardBlur = useTransform(scrollYProgress, [0.30, 0.70, 0.78, 0.88], ["blur(0px)", "blur(6px)", "blur(6px)", "blur(0px)"]);

  // CONCLUSION ANIMATIONS
  const conclusionOpacity = useTransform(scrollYProgress, [0.92, 1.0], [0, 1]);
  const conclusionY = useTransform(scrollYProgress, [0.92, 1.0], [40, 0]);

  return (
    <section id="existing-tools" className="plex-existing-tools-wrapper" ref={containerRef}>
      <div className="plex-tools-sticky">
        
        {/* PHASE 1: INTRO */}
        <motion.div 
          className="plex-tools-phase intro-phase"
          style={{ 
            visibility: introPhaseVisibility, 
            pointerEvents: introPhasePointer,
            opacity: introOpacity,
            y: introY 
          }}
        >
          <CaseStudySectionChip number="03" title="EXISTING TOOLS" />
          <h2 className="plex-tools-main font-display">Looking For A Solution</h2>
          <p className="plex-tools-sub font-body">
            I explored existing productivity tools hoping they would reduce planning effort.
          </p>
        </motion.div>

        {/* PHASE 2: DASHBOARD & FRICTION */}
        <motion.div 
          className="plex-tools-phase dashboard-phase"
          style={{ 
            visibility: dashboardPhaseVisibility, 
            pointerEvents: dashboardPhasePointer,
            opacity: dashboardOpacity,
            scale: dashboardScale
          }}
        >
          <div className="plex-workspace-scale-wrapper">
            <WorkspaceDashboard dashboardBlur={dashboardBlur} />
            
            <div className="plex-friction-layer">
              {frictionData.map((item, i) => (
                <FrictionItem key={item.id} item={item} index={i} scrollYProgress={scrollYProgress} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* PHASE 3: CONCLUSION */}
        <motion.div 
          className="plex-tools-phase conclusion-phase"
          style={{ 
            visibility: conclusionPhaseVisibility, 
            pointerEvents: conclusionPhasePointer,
            opacity: conclusionOpacity,
            y: conclusionY 
          }}
        >
          <h2 className="plex-tools-conclusion font-display">Planning became another task.</h2>
          <p className="plex-tools-conclusion-sub font-body">
            The tools organized tasks. They never reduced decisions.
          </p>
        </motion.div>

      </div>
    </section>
  );
}








