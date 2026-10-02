# MODE / ATLAS — Fashion Apparel Discovery & Exploration Platform

> **"Discover What Fashion Is Becoming."**

**MODE / ATLAS** is a premium, production-quality fashion discovery publication, creator video platform, and visual exploration engine built with modern HTML5, Vanilla CSS, and Vanilla JavaScript.

Designed for exploring fashion apparel, creators, collections, boutiques, trends, styling dispatches, and global fashion destinations.

---

## 🌟 Key Features

### 1. Visual Discovery Feed (`discover.html`)
- Multi-dimensional instant filter engine across **Category** (Apparel, Accessories, Footwear), **Style** (Minimal, Streetwear, Vintage, Avant-Garde, Classic, Experimental), **Location** (Tokyo, Paris, Seoul, Milan, London, New York), and **Content Type** (Video, Story, Collection, Creator, Place).
- Sort by Trending, Latest, Most Saved, and Editor's Picks.
- Live client-side search input, active filter pills, dynamic count updates, and styled empty states.

### 2. Creator Video Experience (`videos.html` & `video-details.html`)
- Dedicated creator video feeds categorized by Street Style, Behind the Scenes, Styling, Designer Stories, Vintage, Runway, and Culture.
- Large featured cinematic video with interactive playback overlay.
- Interactive video player modal with custom playback controls, timeline scrubber, and mute/unmute audio toggling.
- Detailed video view with creator biography, published dates, bookmarks, sharing, and related discoveries.

### 3. Interactive Fashion Map (`explore-map.html`)
- Leaflet-powered responsive geographic discovery engine.
- Custom styled glowing SVG pins for **● Creator**, **● Boutique**, **● Story**, **● Event**, and **● Fashion District**.
- Fast city jumping (Tokyo, Paris, Seoul, Milan, London, New York, and Global View).
- Marker click synchronization with dynamic floating discovery cards and sidebar list items.
- Real-time tile theme switching between dark obsidian and warm bone palettes.

### 4. Personal Bookmarking System (No Dashboard)
- Instant client-side bookmarking on all apparel pieces, creator profiles, videos, stories, and collections.
- Interactive state transition from `♡ Save` to `✓ Saved`.
- Slide-over Saved Discoveries Drawer with category filtering (Videos, Stories, Creators, Collections, Locations) and clear-all capabilities.
- LocalStorage persistence with navbar counter badge synchronization and toast feedback.

### 5. Global Search Overlay (`⌘K` / `Ctrl+K`)
- Fullscreen glassmorphic search modal with keyboard shortcut support.
- Instant fuzzy query matching across apparel pieces, creators, video dispatches, stories, and locations.
- Trending tags and recent inquiries storage.

### 6. Editorial Fashion Stories (`stories.html` & `story-details.html`)
- High-fashion magazine typography using **DM Serif Display**, **Manrope**, and **Space Grotesk**.
- Drop caps, editorial pull quotes, breakout photography with captions, and related fashion recommendations.

### 7. Thematic Curated Collections (`collections.html`)
- Multi-asset collections like *The New Minimal*, *Tokyo After Dark*, and *Modern Tailoring* combining apparel pieces, creator dispatches, videos, essays, and geographic coordinates.

### 8. Light / Dark Theme Architecture (`assets/css/theme.css` & `assets/js/theme.js`)
- Signature dark obsidian palette & refined warm bone light mode.
- System OS preference detection with localStorage synchronization.

---

## 📁 File Structure

```text
/
├── index.html               # Main Editorial Homepage
├── discover.html            # Multi-Filter Discovery Engine
├── videos.html              # Watch Fashion Video Feed
├── video-details.html       # Video Player & Creator Details
├── stories.html             # Fashion Journalism Archive
├── story-details.html       # Magazine Editorial Article
├── explore-map.html         # Interactive Fashion Map & Sidebar
├── creators.html            # Global Creator Directory
├── creator-profile.html     # Creator Profile & Content Tabs
├── collections.html         # Curated Thematic Collections
├── about.html               # Platform Manifesto & Mission
├── contact.html             # Submissions & Inquiries Form
├── login.html               # Split-Screen Explorer Sign In
├── signup.html              # Split-Screen Explorer Registration
├── forgot-password.html     # Password Recovery
├── 404.html                 # Editorial Not Found Page
├── coming-soon.html         # Next Expansion Drop Countdown
│
├── assets/
│   ├── css/
│   │   ├── theme.css        # Typography, Tokens & Themes (Light/Dark)
│   │   ├── style.css        # Core Components, Cards, Modals, Drawer, Footer
│   │   └── responsive.css   # Breakpoint Optimizations (320px to 1920px+)
│   │
│   ├── js/
│   │   ├── theme.js         # Theme Switcher & Storage
│   │   ├── bookmarks.js     # Saved System & Slide-over Drawer
│   │   ├── search.js        # Global Search Modal & Engine
│   │   ├── discovery.js     # Real-Time Filter & Sort Engine
│   │   ├── video.js         # Video Modal & Details Controller
│   │   ├── map.js           # Leaflet Geo-Map & Marker Sync
│   │   └── main.js          # Mobile Menu, Forms & UI Micro-Interactions
│   │
│   ├── images/
│   └── icons/
│
└── README.md                # Project Documentation
```

---

## 💻 Tech Stack & Design Standards

- **Core**: Semantic HTML5 & Modern Vanilla JavaScript (ES6+)
- **Styling**: Vanilla CSS custom properties with fluid `clamp()` sizing
- **Mapping**: Leaflet 1.9.4 with custom vector CartoDB tiles and SVG markers
- **Typography**: `Manrope` (Primary), `DM Serif Display` (Editorial), `Space Grotesk` (Technical / Coordinates)
- **Accessibility**: ARIA dialog roles, semantic landmarks, keyboard navigation (`ESC`, `⌘K`), high-contrast focus rings, and `prefers-reduced-motion` compliance.

---

## 🚀 Running Locally

You can run this project with any local development server:

```bash
# Using Python
python -m http.server 8000

# Using Node / npx
npx serve .
```

Open `http://localhost:8000` in your web browser.

---

## © License
© 2026 MODE / ATLAS. All rights reserved. Built for fashion apparel discovery and exploration.
