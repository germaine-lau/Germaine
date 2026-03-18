# 2026 Portfolio

Next.js portfolio page matching the Figma design. Built with the App Router, React, and Tailwind CSS.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Components

| Component | Description |
|-----------|-------------|
| `Header` | Top bar with logo, tagline, and nav links |
| `Logo` | Brand name display |
| `NavLinks` | List of navigation links with bullet styling |
| `NavLink` | Single nav link (bullet + label) |
| `HeroImage` | Main portrait/image block |
| `Content` | Main content wrapper (right column) |
| `RichTextSection` | Section with heading + body text |
| `ExperienceSection` | "Experience" heading + list of items |
| `ExperienceItem` | One experience entry (title, subtitle, location, dates, award) |
| `Footer` | Bottom bar with left/right content |
| `PageLayout` | Full-page layout composing header, hero, content, footer |

All components use semantic HTML (`header`, `nav`, `main`, `section`, `article`, `footer`) and accept `className` for overrides.
