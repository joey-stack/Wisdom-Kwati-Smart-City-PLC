---
name: Wisdom Kwati Smart City PLC
description: High-end luxury smart city residential estates in Nigeria.
colors:
  primary: "#0f4b94"
  primary-hover: "#0c3e7a"
  primary-light: "#e3eef9"
  secondary: "#1e8fc4"
  secondary-light: "#e8f6fd"
  accent: "#bbe339"
  accent-light: "#f4fbe3"
  neutral-bg: "#fcfff2"
  neutral-surface: "#faffe8"
  neutral-section: "#ededdf"
  text-primary: "#1a1a1a"
  text-secondary: "#4e5a69"
  text-muted: "#6b7585"
  border: "#d8dde6"
typography:
  display:
    fontFamily: "Cormorant Garamond, serif"
    fontSize: "clamp(2.5rem, 7vw, 4.5rem)"
    fontWeight: 500
    lineHeight: 1.15
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    letterSpacing: "0.1em"
rounded:
  sm: "5px"
  md: "8px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
  xl: "160px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "13px 26px"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
    opacity: "0.9"
---

# Design System: Wisdom Kwati Smart City PLC

## 1. Overview

**Creative North Star: "The Modern Monolith"**

Wisdom Kwati Smart City PLC's visual system represents bold, sharp structure like concrete and steel, balanced with the refined restfulness of luxury residential spaces. It is designed to convey absolute architectural confidence, smart-grid technology integration, and premium comfort. It deliberately avoids generic SaaS design patterns (such as overused glassmorphic panels and tiny uppercase kickers above every single section) in favor of spacious layout structures, bold typography pairings, and a highly focused, meaningful color palette.

**Key Characteristics:**
- **Bold Structural Geometry**: Clean, sharp layouts, precise hairline borders, and generous architectural spacing.
- **Sophisticated Restraint**: Avoid decorative visual clutter; depth is generated via clean layout rhythm and high-quality photography rather than shadows.
- **High Information Clarity**: Clear presentation of real estate specs, dimensions, locations, and pricing.

## 2. Colors

The color palette is derived directly from the primary brand logo and smart-city architectural identity.

### Primary
- **WKSC Deep Blue** (#0f4b94): The anchor brand color, used for core branding elements, navigation, and trust-oriented components.

### Secondary
- **Horizon Cyan** (#1e8fc4): Used as a secondary brand tone for accents, highlights, and link elements.

### Accent
- **Smart City Green** (#bbe339): The high-visibility accent green representing technology, green energy (solar grid), and modern innovation.

### Neutral
- **Warm Chalk** (#fcfff2): The soft, off-white background neutral, preventing the harshness of plain white while maintaining high readability.
- **Linen Section** (#ededdf): A darkened warm-neutral tone to provide clear visual boundaries for distinct layout sections.
- **Charcoal Primary** (#1a1a1a): The dark grey used for maximum contrast on body text and displays.

### Named Rules
**The One Accent Rule.** The high-visibility Smart City Green accent (#bbe339) must only be used for interactive elements, primary CTAs, and active hover borders. It should represent ≤10% of any screen layout to preserve its visual impact.

## 3. Typography

**Display Font:** Cormorant Garamond (with serif fallback)
**Body Font:** Inter (with sans-serif fallback)
**Label/Mono Font:** Montserrat / Inter (with sans-serif fallback)

**Character:** A pairing of an elegant, high-contrast serif for display headings with a clean, highly readable geometric sans-serif for body copy, evoking luxury, heritage, and architectural precision.

### Hierarchy
- **Display** (Medium, clamp(2.5rem, 7vw, 4.5rem), 1.15): Used strictly for page-level hero headlines.
- **Headline** (Medium/SemiBold, 1.25): Used for section headers and card titles.
- **Title** (SemiBold, 1.3): Used for smaller subtitles and item groups.
- **Body** (Regular, 16px, 1.6): Used for paragraphs and detail text. Max line length is restricted to 65–75ch for optimal reading comfort.
- **Label** (SemiBold, 13px, 0.1em tracking, uppercase): Used for buttons, tags, and secondary metadata labels.

## 4. Elevation

The system is flat and layered, utilizing clean geometric borders and subtle background variations rather than heavy, floating shadows to define visual hierarchy.

### Shadow Vocabulary
- **Soft Border Shadow** (0 4px 12px rgba(0, 0, 0, 0.07)): An extremely soft, ambient shadow to lift primary interactive components slightly off the cream background.

### Named Rules
**The Flat-By-Default Rule.** Layout panels and card backgrounds rest flat. Soft shadows and highlighted borders are reserved as active responses to state changes (hover, focus).

## 5. Components

### Buttons
- **Shape:** Soft geometric corners (8px radius).
- **Primary (.btn-pill):** Padded at 13px 26px with Smart City Green (#bbe339) background and Charcoal (#1a1a1a) text.
- **Hover / Focus:** Transitions smoothly via custom easing to opacity 0.9 with a soft ambient shadow.

### Cards / Containers
- **Corner Style:** Clean geometric border radius (5px radius).
- **Background:** Transparent or surface tint (#faffe8).
- **Border:** Hairline border (#d8dde6) that transitions to the bright accent green (#bbe339) on hover.
- **Internal Padding:** Spacious spacing (28px to 40px depending on layout density).

### Navigation
- **Style:** Clean fixed top nav with a central container allying to the grid width.
- **Active State:** Uppercase tracked labels with elegant slide transitions.

## 6. Do's and Don'ts

### Do:
- **Do** maintain a strict 65–75ch line length limit for long-form text.
- **Do** restrict the use of the bright accent green (#bbe339) to active links, buttons, and hover boundaries.
- **Do** use large, clean photography as the primary driver of layout storytelling.

### Don't:
- **Don't** use SaaS template clichés like colored side-stripes, heavy card shadows, or glassmorphic blurred panels.
- **Don't** apply tiny uppercase kickers/eyebrows or arbitrary numbered markers above every layout section.
- **Don't** allow headline text to wrap awkwardly or overflow layout boundaries on mobile devices.
