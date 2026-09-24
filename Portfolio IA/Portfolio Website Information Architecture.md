# Portfolio Website Information Architecture

## Purpose

This document defines the complete information architecture, page structure, navigation model, routing behavior, content hierarchy, and interaction relationships for my personal portfolio website.

This document is the structural source of truth for the portfolio.

IMPORTANT:
- Do not redesign or reinterpret the information architecture based on assumptions.
- Do not convert the website into one single long-scrolling page.
- Do not turn the dedicated pages into homepage anchor sections.
- Do not add pages or sections that are not specified here.
- Visual styling, typography, colors, spacing, animation language, and the detailed design system will be provided separately in another document.
- Follow this IA exactly while implementing the website.

---

# 1. Overall Website Structure

The portfolio is a multi-page website.

The website consists of:

1. Homepage
2. About
3. Projects
4. Individual Project Case Studies
5. Experience
6. Education
7. Contact
8. Resume PDF

The homepage is the primary entry point and acts as a visual overview of the portfolio.

The other sections are dedicated pages.

The website must NOT behave as one giant single-page portfolio.

---

# 2. Primary Navigation

A persistent top navigation bar should be available throughout the main portfolio experience.

The navigation contains:

- Home
- About
- Projects
- Experience
- Education
- Contact
- Resume

### Navigation behavior

Each navigation item except Resume routes to a dedicated page.

Routes:

Home → `/`

About → `/about`

Projects → `/projects`

Experience → `/experience`

Education → `/education`

Contact → `/contact`

Resume → integrated Resume PDF

IMPORTANT:

About, Projects, Experience, Education, and Contact must NOT simply scroll to corresponding sections on the homepage when selected from the navigation.

They must open their respective dedicated pages.

---

# 3. Resume Behavior

Resume is intentionally different from the other navigation items.

There should NOT be a separate "Resume" section at the bottom of the homepage.

Resume exists only in the top navigation.

When the user clicks Resume:

- Open the actual resume PDF integrated into the portfolio website.
- Do not create a fake HTML resume page.
- Do not create a separate Resume section on the homepage.
- The PDF should remain accessible without requiring the user to manually search for a file.

The Resume navigation item should behave as a direct access point to the actual resume.

---

# 4. Homepage

Route:

`/`

The homepage is the main introduction and discovery experience.

The recruiter should be able to scroll through the homepage and understand:

- Who I am
- What I do
- What I have worked on
- My professional experience
- My education
- How to contact me

However, the homepage should only provide previews of these areas.

Detailed information belongs on the dedicated pages.

---

# 5. Homepage Content Order

The homepage follows this structure:

1. Hero
2. About Preview
3. Projects Preview
4. Experience Preview
5. Education Preview
6. Contact Preview

There should NOT be a Resume section after Contact.

Resume remains exclusively in the top navigation.

---

# 6. Hero

The Hero is the first section of the homepage.

Its purpose is to immediately communicate:

- My identity
- My role as a designer
- My design focus
- The type of work presented throughout the portfolio

The Hero should act as the visual entry point into the portfolio.

The exact copy and visual treatment will be defined separately.

---

# 7. About Preview

The homepage should contain a concise About preview.

This is NOT the complete About page.

Its purpose is to provide enough context about me as a designer to encourage the recruiter to explore further.

At the end of this section, include an animated section navigation element.

Example:

`ABOUT ───────────────────────── →`

The entire element should be interactive.

Clicking it should navigate to:

`/about`

This interaction is an additional navigation mechanism and does not replace the global navbar.

---

# 8. Projects Preview

The homepage should contain a Projects section showcasing my selected projects.

Current projects:

1. Plex
2. Cubicon
3. YouTube Watchlater

Each project should have a visual preview/card that allows the recruiter to understand the project at a glance.

Clicking a project should open its individual case study.

Structure:

Projects
│
├── Plex
│   └── Plex Case Study
│
├── Cubicon
│   └── Cubicon Case Study
│
└── YouTube Watchlater
    └── YouTube Watchlater Case Study

At the end of the homepage Projects section, include:

`PROJECTS ─────────────────────── →`

Clicking this should navigate to:

`/projects`

---

# 9. Projects Page

Route:

`/projects`

This is the dedicated Projects overview page.

It should provide a broader overview of my projects than the homepage.

Current projects:

### Plex

AI-powered productivity and planning product.

The complete Plex case study is available through the Plex project.

### Cubicon

A separate product/design project.

The complete Cubicon case study is available through the Cubicon project.

### YouTube Watchlater

A separate product/design project.

The complete YouTube Watchlater case study is available through the YouTube Watchlater project.

---

# 10. Individual Project Case Studies

Each project should have its own dedicated route.

Routes:

`/projects/plex`

`/projects/cubicon`

`/projects/youtube-watchlater`

Each case study is treated as an independent long-form project experience.

The existing case studies should be integrated into this architecture rather than recreated as generic project pages.

---

# 11. Case Study Related Projects Navigation

At the end of every case study, provide a "See More" or equivalent related-project section.

The purpose is to allow the recruiter to move directly from one case study to another.

For example:

Plex Case Study
↓
See More
↓
Cubicon
YouTube Watchlater

Similarly:

Cubicon Case Study
↓
See More
↓
Plex
YouTube Watchlater

The related-project system should be reusable.

When a new project is added later, it should be possible to include it without restructuring the website.

---

# 12. Future Project Support

A future project called:

`Ethos Share`

will eventually be added to the portfolio.

Do not create a fake or empty Ethos Share page now unless explicitly instructed.

However, structure the Projects architecture so that another project can be added later without requiring major restructuring.

Future structure:

Projects
│
├── Plex
├── Cubicon
├── YouTube Watchlater
└── Ethos Share
    └── Case Study

---

# 13. Experience Preview

The homepage should contain an Experience preview.

The purpose is to give recruiters a concise understanding of my professional background.

The homepage should NOT reproduce the entire Experience page.

It should function as a summary and provide a path to the detailed page.

At the end of the section:

`EXPERIENCE ───────────────────── →`

Clicking it navigates to:

`/experience`

---

# 14. Experience Page

Route:

`/experience`

This page contains the detailed professional experience information.

The page should be structured independently from the homepage.

The homepage only provides a preview.

The dedicated page provides the complete information.

---

# 15. Education Preview

The homepage should contain a concise Education preview.

Its purpose is to establish my academic background without turning the homepage into a resume dump.

At the end of the section:

`EDUCATION ─────────────────────── →`

Clicking it navigates to:

`/education`

---

# 16. Education Page

Route:

`/education`

This is the dedicated Education page.

It should contain the complete academic information.

The homepage should only contain a concise preview.

---

# 17. Contact Preview

The homepage should end its primary content journey with a Contact section.

The purpose is to provide a clear path for recruiters or potential collaborators to contact me.

At the end of the section:

`CONTACT ──────────────────────── →`

Clicking it navigates to:

`/contact`

---

# 18. Contact Page

Route:

`/contact`

This is the dedicated Contact page.

It should contain the relevant contact methods and information.

The homepage should contain a preview/CTA, while this page provides the complete contact experience.

---

# 19. Animated Homepage Section Navigation

Every major homepage section should have an animated navigation element.

These elements should visually resemble a horizontal navigation strip.

Example:

`ABOUT ───────────────────────────────── →`

The same interaction pattern should be used for:

- About
- Projects
- Experience
- Education
- Contact

### Interaction behavior

On hover:

- The section label should react.
- The horizontal line should animate subtly.
- The arrow should have a subtle movement.
- The interaction should clearly communicate that it is clickable.
- The animation should feel intentional and premium.
- Avoid generic button animations.

On click:

Navigate to the corresponding dedicated page.

Example:

Homepage → About Preview → Animated About Navigation → `/about`

Homepage → Projects Preview → Animated Projects Navigation → `/projects`

Homepage → Experience Preview → Animated Experience Navigation → `/experience`

Homepage → Education Preview → Animated Education Navigation → `/education`

Homepage → Contact Preview → Animated Contact Navigation → `/contact`

---

# 20. Important Difference Between Homepage Sections and Dedicated Pages

The homepage sections are previews.

They are NOT replacements for the dedicated pages.

For example:

Homepage:

About Preview
↓
Animated navigation
↓
`/about`

The user should therefore be able to:

1. Scroll through the homepage.
2. Read the About preview.
3. Decide they want more information.
4. Click the animated About navigation.
5. Enter the dedicated About page.

The same logic applies to Projects, Experience, Education, and Contact.

---

# 21. Page Navigation History

The website should support clear navigation between pages.

Users should have access to Back and Forward controls where appropriate.

These should behave similarly to browser history.

Example:

Homepage
↓
About
↓
Experience

If the user presses Back:

Experience → About

Pressing Back again:

About → Homepage

If the user then presses Forward:

Homepage → About

IMPORTANT:

Back and Forward must follow the user's actual navigation history.

Do not hard-code a fixed page sequence.

For example, if a user navigates:

Homepage → Projects → Plex → Cubicon

then Back should follow:

Cubicon → Plex → Projects → Homepage

not simply move to the previous page in the site's IA.

---

# 22. Case Study Navigation History

Case studies are also part of the navigation history.

Example:

Homepage
↓
Projects
↓
Plex
↓
Cubicon

Back:

Cubicon → Plex

Back:

Plex → Projects

Back:

Projects → Homepage

Forward should restore the corresponding previous history state.

---

# 23. Global Navigation vs Contextual Navigation

The portfolio has two navigation systems.

### Global Navigation

The persistent top navigation provides direct access to:

- Home
- About
- Projects
- Experience
- Education
- Contact
- Resume

### Contextual Navigation

The animated navigation strips inside the homepage provide contextual navigation from each homepage preview to its corresponding dedicated page.

These two systems should coexist.

The animated section navigation should NOT replace the top navbar.

The navbar should remain the primary global navigation.

---

# 24. Homepage Scrolling Behavior

The homepage should remain a continuous scrolling experience.

The recruiter should be able to scroll naturally through:

Hero
↓
About
↓
Projects
↓
Experience
↓
Education
↓
Contact

This is intentionally different from the navigation behavior.

Scrolling through the homepage does not mean that these sections are separate routes.

The sections become separate pages only when the user explicitly navigates to them through:

- The top navigation
- The animated section navigation
- Relevant contextual links

---

# 25. Recommended URL Structure

Use a clean route hierarchy:

```text
/
├── /about
├── /projects
│   ├── /plex
│   ├── /cubicon
│   └── /youtube-watchlater
├── /experience
├── /education
└── /contact

Resume:

Resume → integrated Resume PDF

Do not create:

/resume

unless explicitly required later.

26. Navigation Model

The complete navigation relationship can be represented as:

                           ┌──────────────┐
                           │     HOME     │
                           │      /       │
                           └──────┬───────┘
                                  │
             ┌────────────────────┼────────────────────┐
             │                    │                    │
             ↓                    ↓                    ↓
          ABOUT               PROJECTS             EXPERIENCE
        /about               /projects            /experience
                                 │
                   ┌─────────────┼─────────────┐
                   ↓             ↓             ↓
                 PLEX         CUBICON      WATCHLATER
             /projects/plex  /projects/...  /projects/...
             
             ┌────────────────────┼────────────────────┐
             │                                         │
             ↓                                         ↓
         EDUCATION                                  CONTACT
        /education                                  /contact

Resume remains accessible globally through the navbar.

27. Recruiter Journey

The IA should support multiple recruiter behaviors.

Journey A: Casual exploration
Homepage
↓
Scroll
↓
About Preview
↓
Projects Preview
↓
Experience Preview
↓
Education Preview
↓
Contact
Journey B: Project-focused recruiter
Homepage
↓
Projects
↓
Plex
↓
Plex Case Study
↓
See More
↓
Cubicon
Journey C: Experience-focused recruiter
Homepage
↓
Experience Preview
↓
Click Animated Navigation
↓
Experience Page
Journey D: Resume-focused recruiter
Any Page
↓
Top Navigation
↓
Resume
↓
Integrated Resume PDF
Journey E: Direct navigation
Any Page
↓
Top Navigation
↓
Desired Page

The website should support all of these without forcing the recruiter into a single predefined journey.

28. IA Principles

The portfolio should follow these principles:

1. Homepage = discovery

The homepage tells the story and creates interest.

2. Dedicated pages = depth

Detailed information belongs on dedicated pages.

3. Projects = case studies

Projects should lead to complete case study experiences rather than simple image galleries.

4. Resume = direct access

Resume should remain accessible through the navbar without becoming another homepage section.

5. Navigation should be predictable

Creative interaction is encouraged, but the underlying navigation should remain obvious.

6. No unnecessary repetition

Do not repeat the same detailed content across the homepage and dedicated pages.

7. Support exploration

Recruiters should be able to move naturally between projects and pages without repeatedly returning to the homepage.

8. Future-proof structure

Adding future projects such as Ethos Share should not require rebuilding the IA.

29. Final Site Map
PORTFOLIO
│
├── HOME /
│   │
│   ├── Hero
│   ├── About Preview
│   │   └── → /about
│   │
│   ├── Projects Preview
│   │   ├── → /projects
│   │   ├── → /projects/plex
│   │   ├── → /projects/cubicon
│   │   └── → /projects/youtube-watchlater
│   │
│   ├── Experience Preview
│   │   └── → /experience
│   │
│   ├── Education Preview
│   │   └── → /education
│   │
│   └── Contact Preview
│       └── → /contact
│
├── ABOUT /about
│
├── PROJECTS /projects
│   │
│   ├── PLEX /projects/plex
│   ├── CUBICON /projects/cubicon
│   └── YOUTUBE WATCHLATER /projects/youtube-watchlater
│
├── EXPERIENCE /experience
│
├── EDUCATION /education
│
├── CONTACT /contact
│
└── RESUME
    └── Integrated Resume PDF
30. Implementation Priority

Build the website architecture in this order:

Establish the global routing structure.
Create the homepage route.
Create the dedicated About, Projects, Experience, Education, and Contact routes.
Create individual project case-study routes.
Implement the global navigation.
Implement homepage section previews.
Implement animated contextual navigation strips.
Implement project-to-case-study navigation.
Implement related-project navigation at the end of case studies.
Implement browser-like Back and Forward behavior using actual navigation history.
Integrate the actual Resume PDF into the Resume navigation.
Ensure future projects can be added without restructuring the application.

Do not begin by treating the homepage as the entire website.

The portfolio is a multi-page system with a scrolling homepage that acts as the entry point and dedicated pages that provide depth.

FINAL IMPLEMENTATION RULE

Treat this document as the Information Architecture source of truth.

Do not modify the page hierarchy, routing model, navigation behavior, or homepage-to-dedicated-page relationship unless explicitly instructed.