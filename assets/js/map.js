/**
 * MODE / ATLAS — Interactive Fashion Map Experience
 * Leaflet Geo-Discovery with Custom Pin Markers, Sidebar Sync, City Jumpers, and Theme Tiles
 */

(function () {
  'use strict';

  // Global Fashion Locations Database
  const FASHION_LOCATIONS = [
    // Tokyo
    {
      id: 'map-tokyo-1',
      title: 'Shibuya Style District & Archival Boutiques',
      category: 'district',
      categoryLabel: 'Fashion District',
      city: 'Tokyo',
      country: 'Japan',
      coords: [35.6595, 139.7004],
      stats: '14 Discoveries · 5 Creators · 8 Stories',
      description: 'The global epicenter of youth subcultures, underground archival denim, and multi-concept fashion houses.',
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
      url: 'discover.html?loc=tokyo'
    },
    {
      id: 'map-tokyo-2',
      title: 'Mika Tanaka Studio',
      category: 'creator',
      categoryLabel: 'Creator Studio',
      city: 'Tokyo',
      country: 'Japan',
      coords: [35.6702, 139.7028],
      stats: 'Archive Curator · Harajuku',
      description: 'Private collection archive featuring rare 90s Undercover, Comme des Garçons, and Issey Miyake silhouettes.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      url: 'creator-profile.html?id=mika-tanaka'
    },
    {
      id: 'map-tokyo-3',
      title: 'Aoyama Concept Store 01',
      category: 'boutique',
      categoryLabel: 'Boutique',
      city: 'Tokyo',
      country: 'Japan',
      coords: [35.6645, 139.7150],
      stats: 'Minimalist Architecture · Curated Footwear',
      description: 'Monolithic concrete space housing exclusive Japanese artisan footwear and bespoke tailored garments.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80',
      url: 'discover.html?category=footwear'
    },
    // Paris
    {
      id: 'map-paris-1',
      title: 'Le Marais Independent Ateliers',
      category: 'district',
      categoryLabel: 'Fashion District',
      city: 'Paris',
      country: 'France',
      coords: [48.8575, 2.3590],
      stats: '18 Discoveries · 6 Boutiques · 7 Stories',
      description: 'Historic cobblestone alleys lined with progressive couture workshops, perfume laboratories, and independent runway labels.',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
      url: 'discover.html?loc=paris'
    },
    {
      id: 'map-paris-2',
      title: 'Camille Laurent Couture Pattern Lab',
      category: 'creator',
      categoryLabel: 'Creator Atelier',
      city: 'Paris',
      country: 'France',
      coords: [48.8640, 2.3680],
      stats: 'Drape & Zero Waste Pattern Making',
      description: 'Atelier focused on architectural drape theory and modern structured wool silhouettes.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
      url: 'creator-profile.html?id=camille-laurent'
    },
    // Seoul
    {
      id: 'map-seoul-1',
      title: 'Seongsu-dong Industrial Fashion Hub',
      category: 'district',
      categoryLabel: 'Fashion District',
      city: 'Seoul',
      country: 'South Korea',
      coords: [37.5446, 127.0560],
      stats: '12 Discoveries · 8 Flagships · 4 Creators',
      description: 'Former red-brick shoe factories transformed into the world’s most energetic pop-up design district.',
      image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=600&q=80',
      url: 'discover.html?loc=seoul'
    },
    {
      id: 'map-seoul-2',
      title: 'Dongdaemun Midnight Textile Guild',
      category: 'event',
      categoryLabel: 'Fashion Event / Market',
      city: 'Seoul',
      country: 'South Korea',
      coords: [37.5665, 127.0090],
      stats: '3 AM Fast Prototyping Hub',
      description: 'The legendary nocturnal market where emerging designers source next-day materials and sample drops.',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
      url: 'video-details.html?id=video-2'
    },
    // Milan
    {
      id: 'map-milan-1',
      title: 'Via Montenapoleone & Brera Design District',
      category: 'district',
      categoryLabel: 'Fashion District',
      city: 'Milan',
      country: 'Italy',
      coords: [45.4700, 9.1890],
      stats: '16 Discoveries · Quiet Tailoring Focus',
      description: 'Where traditional Italian sartorial precision meets contemporary architectural draping.',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
      url: 'discover.html?loc=milan'
    },
    // London
    {
      id: 'map-london-1',
      title: 'Shoreditch & East London Upcycling Collective',
      category: 'boutique',
      categoryLabel: 'Boutique Collective',
      city: 'London',
      country: 'UK',
      coords: [51.5235, -0.0770],
      stats: 'Vintage & Archival Resale',
      description: 'Curated deadstock outerwear, experimental British knitwear, and vintage military tailoring.',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80',
      url: 'stories.html'
    },
    // New York
    {
      id: 'map-ny-1',
      title: 'Lower East Side & SoHo Subculture Showrooms',
      category: 'district',
      categoryLabel: 'Fashion District',
      city: 'New York',
      country: 'USA',
      coords: [40.7209, -73.9896],
      stats: '11 Discoveries · Raw Streetwear',
      description: 'The intersection of underground downtown streetwear, archival graphic tees, and luxury denim.',
      image: 'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=600&q=80',
      url: 'discover.html?loc=new york'
    }
  ];

  const CITY_COORDS = {
    'all': [35.0, 30.0],
    'tokyo': [35.6650, 139.7080],
    'paris': [48.8600, 2.3600],
    'seoul': [37.5500, 127.0300],
    'milan': [45.4700, 9.1890],
    'london': [51.5200, -0.0800],
    'new york': [40.7200, -73.9900]
  };

  let mapInstance = null;
  let currentTileLayer = null;
  let markersLayerGroup = null;
  let activeCategory = 'all';

  function getTileUrl(theme) {
    // High-contrast clean CartoDB tiles
    return theme === 'light'
      ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
  }

  function initFashionMap() {
    const mapContainer = document.getElementById('fashionMap');
    if (!mapContainer || typeof L === 'undefined') return;

    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';

    // Initialize Leaflet Map
    mapInstance = L.map('fashionMap', {
      center: [35.6650, 139.7080],
      zoom: 13,
      zoomControl: false,
      attributionControl: false
    });

    // Custom Zoom Control top-right
    L.control.zoom({ position: 'topright' }).addTo(mapInstance);

    // Tile Layer
    currentTileLayer = L.tileLayer(getTileUrl(currentTheme), {
      maxZoom: 19,
      subdomains: 'abcd'
    }).addTo(mapInstance);

    markersLayerGroup = L.layerGroup().addTo(mapInstance);

    renderMapMarkers();
    renderSidebarList();

    // Listen for global theme changes to switch map tiles smoothly
    window.addEventListener('themeChanged', (e) => {
      const theme = e.detail.theme;
      if (currentTileLayer && mapInstance) {
        mapInstance.removeLayer(currentTileLayer);
        currentTileLayer = L.tileLayer(getTileUrl(theme), {
          maxZoom: 19,
          subdomains: 'abcd'
        }).addTo(mapInstance);
      }
    });

    // City Quick Jump Buttons
    const cityButtons = document.querySelectorAll('[data-map-city]');
    cityButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        cityButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cityKey = btn.getAttribute('data-map-city').toLowerCase();
        jumpToCity(cityKey);
      });
    });

    // Category Filter Pills for Map
    const mapFilterPills = document.querySelectorAll('.map-filter-pill');
    mapFilterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        mapFilterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeCategory = pill.getAttribute('data-map-category') || 'all';
        renderMapMarkers();
        renderSidebarList();
      });
    });
  }

  function jumpToCity(cityKey) {
    if (!mapInstance) return;
    if (cityKey === 'all') {
      mapInstance.setView([35.0, 30.0], 2);
    } else if (CITY_COORDS[cityKey]) {
      mapInstance.flyTo(CITY_COORDS[cityKey], 13, { duration: 1.2 });
    }
  }

  function getPinColorClass(category) {
    switch (category) {
      case 'creator': return 'pin-creator';
      case 'boutique': return 'pin-boutique';
      case 'story': return 'pin-story';
      case 'event': return 'pin-event';
      default: return 'pin-district';
    }
  }

  function getPinIcon(category) {
    switch (category) {
      case 'creator':
        return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
      case 'boutique':
        return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>';
      case 'story':
        return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>';
      default:
        return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/></svg>';
    }
  }

  function renderMapMarkers() {
    if (!markersLayerGroup || !mapInstance) return;
    markersLayerGroup.clearLayers();

    const filtered = activeCategory === 'all'
      ? FASHION_LOCATIONS
      : FASHION_LOCATIONS.filter(item => item.category === activeCategory);

    filtered.forEach(item => {
      const pinClass = getPinColorClass(item.category);
      const iconHtml = `
        <div class="custom-map-pin ${pinClass}" data-pin-id="${item.id}" title="${item.title}">
          ${getPinIcon(item.category)}
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: iconHtml,
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      });

      const marker = L.marker(item.coords, { icon: customIcon });

      marker.on('click', () => {
        selectLocation(item);
        mapInstance.flyTo(item.coords, Math.max(mapInstance.getZoom(), 14), { duration: 0.8 });
      });

      markersLayerGroup.addLayer(marker);
    });
  }

  function selectLocation(item) {
    // Display Floating Discovery Card on Map
    let card = document.getElementById('mapFloatingDiscoveryCard');
    if (!card) {
      card = document.createElement('div');
      card.id = 'mapFloatingDiscoveryCard';
      card.className = 'map-floating-card';
      const mapContainer = document.querySelector('.map-viewport-container');
      if (mapContainer) mapContainer.appendChild(card);
    }

    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
        <span class="badge badge-location">${item.categoryLabel} · ${item.city}</span>
        <button id="closeFloatingCard" style="color: var(--text-muted); cursor: pointer; padding: 2px;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <h3 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 0.35rem;">${item.title}</h3>
      <p style="font-size: 0.8125rem; color: var(--text-secondary); margin-bottom: 0.75rem;">${item.description}</p>
      <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 0.65rem; border-top: 1px solid var(--border-subtle);">
        <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted);">${item.stats}</span>
        <a href="${item.url}" class="btn btn-primary" style="padding: 0.4rem 0.85rem; font-size: 0.75rem;">Explore Location</a>
      </div>
    `;

    card.style.display = 'block';

    const closeBtn = document.getElementById('closeFloatingCard');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        card.style.display = 'none';
      });
    }

    // Highlight sidebar item
    document.querySelectorAll('.map-sidebar-item').forEach(el => {
      if (el.getAttribute('data-id') === item.id) {
        el.classList.add('is-active');
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        el.classList.remove('is-active');
      }
    });
  }

  function renderSidebarList() {
    const listContainer = document.getElementById('mapSidebarItems');
    if (!listContainer) return;

    const filtered = activeCategory === 'all'
      ? FASHION_LOCATIONS
      : FASHION_LOCATIONS.filter(item => item.category === activeCategory);

    listContainer.innerHTML = filtered.map(item => `
      <div class="fashion-card map-sidebar-item" data-id="${item.id}" style="padding: 1rem; cursor: pointer;">
        <div style="display: flex; gap: 0.85rem;">
          <img src="${item.image}" alt="${item.title}" style="width: 72px; height: 72px; object-fit: cover; border-radius: var(--radius-xs); flex-shrink: 0;" loading="lazy">
          <div style="flex: 1;">
            <span class="badge badge-location" style="font-size: 0.65rem; padding: 0.2rem 0.5rem; margin-bottom: 0.25rem;">${item.categoryLabel}</span>
            <h4 style="font-size: 0.925rem; font-weight: 600; line-height: 1.25;">${item.title}</h4>
            <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem; display: block;">${item.city}, ${item.country}</span>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.75rem; padding-top: 0.65rem; border-top: 1px solid var(--border-subtle); font-size: 0.75rem;">
          <span style="font-family: var(--font-mono); color: var(--text-muted);">${item.stats}</span>
          <span style="color: var(--accent-rust); font-weight: 600;">View On Map →</span>
        </div>
      </div>
    `).join('');

    listContainer.querySelectorAll('.map-sidebar-item').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-id');
        const target = FASHION_LOCATIONS.find(item => item.id === id);
        if (target) {
          selectLocation(target);
          if (mapInstance) {
            mapInstance.flyTo(target.coords, 14, { duration: 1.0 });
          }
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initFashionMap();
  });

  window.ModeAtlasMap = {
    init: initFashionMap,
    locations: FASHION_LOCATIONS,
    jump: jumpToCity
  };
})();
