/**
 * MODE / ATLAS — Global Search Overlay & Engine
 * Full-platform instant fuzzy search across Apparel, Creators, Stories, Videos, Collections, and Locations
 */

(function () {
  'use strict';

  // Comprehensive Search Database Index
  const SEARCH_INDEX = [
    // Videos
    {
      id: 'video-1',
      type: 'video',
      title: 'Inside a Tokyo Vintage Archive',
      category: 'Street Style',
      creator: 'Mika Tanaka',
      location: 'Tokyo, Japan',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=400&q=80',
      url: 'video-details.html?id=video-1',
      tags: ['vintage', 'tokyo', 'archive', 'streetwear', 'japan', 'mika tanaka']
    },
    {
      id: 'video-2',
      type: 'video',
      title: '24 Hours Inside Seoul Fashion District (Dongdaemun)',
      category: 'Culture',
      creator: 'Jun-ho Park',
      location: 'Seoul, South Korea',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      url: 'video-details.html?id=video-2',
      tags: ['seoul', 'korea', 'night market', 'streetwear', 'dongdaemun', 'jun-ho park']
    },
    {
      id: 'video-3',
      type: 'video',
      title: 'Paris Atelier: Sculptural Tailoring & Drape',
      category: 'Designer Stories',
      creator: 'Camille Laurent',
      location: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=400&q=80',
      url: 'video-details.html?id=video-3',
      tags: ['paris', 'haute couture', 'tailoring', 'atelier', 'minimal', 'camille laurent']
    },
    {
      id: 'video-4',
      type: 'video',
      title: 'Milan Backstage: Modern Silk & Structured Wool',
      category: 'Runway',
      creator: 'Matteo Rossi',
      location: 'Milan, Italy',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=400&q=80',
      url: 'video-details.html?id=video-4',
      tags: ['milan', 'runway', 'silk', 'wool', 'tailoring', 'matteo rossi']
    },
    // Stories
    {
      id: 'story-1',
      type: 'story',
      title: 'The Return of Quiet Tailoring',
      category: 'Trend Report',
      creator: 'Elena Vance',
      location: 'Milan, Italy',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80',
      url: 'story-details.html?id=story-1',
      tags: ['tailoring', 'minimal', 'milan', 'blazers', 'quiet luxury', 'trend']
    },
    {
      id: 'story-2',
      type: 'story',
      title: "Inside Seoul's Independent Fashion Scene",
      category: 'Culture',
      creator: 'Hana Song',
      location: 'Seoul, South Korea',
      image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=400&q=80',
      url: 'story-details.html?id=story-2',
      tags: ['seoul', 'indie', 'designers', 'apgujeong', 'hongdae', 'korea']
    },
    {
      id: 'story-3',
      type: 'story',
      title: 'Why Vintage Is Becoming a Primary Design Language',
      category: 'Vintage',
      creator: 'Marcus Chen',
      location: 'London, UK',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80',
      url: 'story-details.html?id=story-3',
      tags: ['vintage', 'london', 'archival', 'upcycling', 'history']
    },
    {
      id: 'story-4',
      type: 'story',
      title: 'The New Generation of Streetwear: Raw Textures & Deconstruction',
      category: 'Street Style',
      creator: 'Kofi Mensah',
      location: 'New York, USA',
      image: 'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=400&q=80',
      url: 'story-details.html?id=story-4',
      tags: ['streetwear', 'new york', 'brooklyn', 'deconstruction', 'denim']
    },
    // Creators
    {
      id: 'creator-1',
      type: 'creator',
      title: 'Mika Tanaka',
      category: 'Creator',
      creator: 'Mika Tanaka',
      location: 'Tokyo, Japan',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      url: 'creator-profile.html?id=mika-tanaka',
      tags: ['mika', 'tokyo', 'archive', 'vintage', 'harajuku', 'creator']
    },
    {
      id: 'creator-2',
      type: 'creator',
      title: 'Camille Laurent',
      category: 'Creator',
      creator: 'Camille Laurent',
      location: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      url: 'creator-profile.html?id=camille-laurent',
      tags: ['camille', 'paris', 'couture', 'draping', 'atelier', 'creator']
    },
    {
      id: 'creator-3',
      type: 'creator',
      title: 'Jun-ho Park',
      category: 'Creator',
      creator: 'Jun-ho Park',
      location: 'Seoul, South Korea',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      url: 'creator-profile.html?id=jun-ho-park',
      tags: ['jun-ho', 'seoul', 'streetwear', 'cinematography', 'creator']
    },
    {
      id: 'creator-4',
      type: 'creator',
      title: 'Elena Vance',
      category: 'Creator',
      creator: 'Elena Vance',
      location: 'Milan, Italy',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      url: 'creator-profile.html?id=elena-vance',
      tags: ['elena', 'milan', 'tailoring', 'luxury', 'editorial', 'creator']
    },
    // Locations / Districts
    {
      id: 'loc-1',
      type: 'location',
      title: 'Shibuya Style District & Harajuku Backstreets',
      category: 'Location',
      location: 'Tokyo, Japan',
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80',
      url: 'explore-map.html?loc=tokyo',
      tags: ['shibuya', 'harajuku', 'tokyo', 'japan', 'vintage boutiques', 'district']
    },
    {
      id: 'loc-2',
      type: 'location',
      title: 'Le Marais Independent Boutiques',
      category: 'Location',
      location: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80',
      url: 'explore-map.html?loc=paris',
      tags: ['le marais', 'paris', 'france', 'boutiques', 'galleries', 'district']
    },
    {
      id: 'loc-3',
      type: 'location',
      title: 'Seongsu-dong Industrial Fashion Hub',
      category: 'Location',
      location: 'Seoul, South Korea',
      image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=400&q=80',
      url: 'explore-map.html?loc=seoul',
      tags: ['seongsu', 'seoul', 'korea', 'concept stores', 'brooklyn of seoul', 'district']
    },
    // Collections
    {
      id: 'col-1',
      type: 'collection',
      title: 'The New Minimal',
      category: 'Curated Collection',
      location: 'Global Curated',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=400&q=80',
      url: 'collections.html#the-new-minimal',
      tags: ['minimal', 'quiet luxury', 'clean lines', 'monochrome', 'collection']
    },
    {
      id: 'col-2',
      type: 'collection',
      title: 'Tokyo After Dark: Cyber & Archival Streetwear',
      category: 'Curated Collection',
      location: 'Tokyo, Japan',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=400&q=80',
      url: 'collections.html#tokyo-after-dark',
      tags: ['tokyo', 'streetwear', 'night', 'archive', 'techwear', 'collection']
    },
    {
      id: 'col-3',
      type: 'collection',
      title: 'Modern Tailoring: Structure & Flow',
      category: 'Curated Collection',
      location: 'Milan & London',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80',
      url: 'collections.html#modern-tailoring',
      tags: ['tailoring', 'blazer', 'wool', 'structure', 'collection']
    }
  ];

  const RECENT_SEARCH_KEY = 'mode_atlas_recent_searches';

  function getRecentSearches() {
    try {
      const data = localStorage.getItem(RECENT_SEARCH_KEY);
      return data ? JSON.parse(data) : ['Tokyo Street Style', 'Quiet Tailoring', 'Vintage Archival', 'Seoul Fashion'];
    } catch (e) {
      return ['Tokyo Street Style', 'Quiet Tailoring'];
    }
  }

  function addRecentSearch(query) {
    if (!query || query.trim().length === 0) return;
    let list = getRecentSearches();
    list = list.filter(q => q.toLowerCase() !== query.toLowerCase());
    list.unshift(query.trim());
    if (list.length > 6) list.pop();
    try {
      localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(list));
    } catch (e) {}
  }

  function openSearchModal() {
    const modal = document.getElementById('searchModal');
    const input = document.getElementById('globalSearchInput');
    if (!modal) return;

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    renderRecentSearches();
    if (input) {
      setTimeout(() => input.focus(), 80);
    }
  }

  function closeSearchModal() {
    const modal = document.getElementById('searchModal');
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function renderRecentSearches() {
    const container = document.getElementById('recentSearchesList');
    if (!container) return;
    const list = getRecentSearches();
    container.innerHTML = list.map(q => `
      <button class="search-tag-pill" data-action="search-tag" data-query="${q}">${q}</button>
    `).join('');

    container.querySelectorAll('[data-action="search-tag"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const query = btn.getAttribute('data-query');
        const input = document.getElementById('globalSearchInput');
        if (input) {
          input.value = query;
          performSearch(query);
        }
      });
    });
  }

  function performSearch(query) {
    const resultsContainer = document.getElementById('searchResultsContainer');
    const defaultSections = document.getElementById('searchDefaultSections');
    if (!resultsContainer) return;

    const trimmed = query.trim().toLowerCase();

    if (trimmed.length === 0) {
      resultsContainer.style.display = 'none';
      if (defaultSections) defaultSections.style.display = 'block';
      return;
    }

    if (defaultSections) defaultSections.style.display = 'none';
    resultsContainer.style.display = 'block';

    // Fuzzy matching against titles, categories, locations, creators, and tags
    const matched = SEARCH_INDEX.filter(item => {
      return (
        item.title.toLowerCase().includes(trimmed) ||
        item.category.toLowerCase().includes(trimmed) ||
        item.location.toLowerCase().includes(trimmed) ||
        (item.creator && item.creator.toLowerCase().includes(trimmed)) ||
        item.tags.some(tag => tag.toLowerCase().includes(trimmed))
      );
    });

    if (matched.length === 0) {
      resultsContainer.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
          <p style="font-size: 1.1rem; color: var(--text-primary); font-weight: 500;">No discoveries found for "${query}"</p>
          <p style="font-size: 0.85rem; margin-top: 0.35rem;">Try searching for "Tokyo", "Tailoring", "Vintage", "Seoul", or "Minimal".</p>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = `
      <div class="search-section-title">Discoveries Found (${matched.length})</div>
      <div class="search-results-list">
        ${matched.map(item => `
          <a href="${item.url}" class="search-result-item" data-search-hit>
            <img src="${item.image}" alt="${item.title}" class="search-result-thumb" loading="lazy">
            <div class="search-result-info">
              <span class="search-result-type">${item.type} · ${item.category}</span>
              <h4 class="search-result-title">${item.title}</h4>
              <span class="search-result-meta">${item.location} ${item.creator ? '· ' + item.creator : ''}</span>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--text-muted);">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        `).join('')}
      </div>
    `;

    resultsContainer.querySelectorAll('[data-search-hit]').forEach(item => {
      item.addEventListener('click', () => {
        addRecentSearch(query);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Search trigger buttons (desktop and mobile)
    const triggers = document.querySelectorAll('[data-action="open-search"]');
    triggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openSearchModal();
      });
    });

    const closeBtn = document.getElementById('searchModalClose');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeSearchModal);
    }

    const modal = document.getElementById('searchModal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeSearchModal();
        }
      });
    }

    const searchInput = document.getElementById('globalSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        performSearch(e.target.value);
      });

      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          addRecentSearch(searchInput.value);
        }
      });
    }

    // Trending search tags in modal
    const trendingTags = document.querySelectorAll('[data-trending-tag]');
    trendingTags.forEach(tag => {
      tag.addEventListener('click', () => {
        const query = tag.getAttribute('data-trending-tag') || tag.textContent.trim();
        if (searchInput) {
          searchInput.value = query;
          performSearch(query);
        }
      });
    });

    // Keyboard shortcut: Cmd+K / Ctrl+K to open search, Esc to close
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const isOpen = modal && modal.classList.contains('is-open');
        if (isOpen) closeSearchModal();
        else openSearchModal();
      } else if (e.key === 'Escape') {
        closeSearchModal();
      }
    });
  });

  window.ModeAtlasSearch = {
    open: openSearchModal,
    close: closeSearchModal,
    search: performSearch,
    index: SEARCH_INDEX
  };
})();
