/**
 * MODE / ATLAS — Discovery Filter & Exploration Engine
 * Multi-dimensional real-time filtering, sorting, state preservation & DOM updates
 */

(function () {
  'use strict';

  // Active filter state
  const activeFilters = {
    category: 'all',
    style: 'all',
    location: 'all',
    contentType: 'all',
    sort: 'trending',
    searchQuery: ''
  };

  function applyFilters() {
    const grid = document.getElementById('discoveryGrid') || document.querySelector('.discovery-grid');
    if (!grid) return;

    const cards = grid.querySelectorAll('.fashion-card[data-discovery-card]');
    const emptyState = document.getElementById('discoveryEmptyState');
    let visibleCount = 0;

    cards.forEach(card => {
      const cardCategory = (card.getAttribute('data-category') || '').toLowerCase();
      const cardStyle = (card.getAttribute('data-style') || '').toLowerCase();
      const cardLocation = (card.getAttribute('data-location') || '').toLowerCase();
      const cardType = (card.getAttribute('data-type') || '').toLowerCase();
      const cardTitle = (card.querySelector('.card-title')?.textContent || '').toLowerCase();

      // Check Category
      const matchCategory = activeFilters.category === 'all' || cardCategory.includes(activeFilters.category);
      // Check Style
      const matchStyle = activeFilters.style === 'all' || cardStyle.includes(activeFilters.style);
      // Check Location
      const matchLocation = activeFilters.location === 'all' || cardLocation.includes(activeFilters.location);
      // Check Content Type
      const matchType = activeFilters.contentType === 'all' || cardType === activeFilters.contentType;
      // Check Search Query
      const matchSearch = !activeFilters.searchQuery || cardTitle.includes(activeFilters.searchQuery) || cardCategory.includes(activeFilters.searchQuery);

      if (matchCategory && matchStyle && matchLocation && matchType && matchSearch) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Handle Empty State
    if (emptyState) {
      if (visibleCount === 0) {
        emptyState.style.display = 'flex';
      } else {
        emptyState.style.display = 'none';
      }
    }

    // Update Result Count if display exists
    const countDisplay = document.getElementById('discoveryResultCount');
    if (countDisplay) {
      countDisplay.textContent = `${visibleCount} Discoveries`;
    }

    // Update Clear Filters button visibility
    const clearBtn = document.getElementById('clearFiltersBtn');
    if (clearBtn) {
      const isFiltered = activeFilters.category !== 'all' || activeFilters.style !== 'all' || 
                         activeFilters.location !== 'all' || activeFilters.contentType !== 'all' || 
                         Boolean(activeFilters.searchQuery);
      clearBtn.style.display = isFiltered ? 'inline-flex' : 'none';
    }
  }

  function resetFilters() {
    activeFilters.category = 'all';
    activeFilters.style = 'all';
    activeFilters.location = 'all';
    activeFilters.contentType = 'all';
    activeFilters.searchQuery = '';

    // Reset Pill UI
    document.querySelectorAll('.filter-pill').forEach(pill => {
      if (pill.getAttribute('data-filter-value') === 'all') {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    // Reset Select Dropdowns
    document.querySelectorAll('.filter-select').forEach(sel => {
      sel.value = 'all';
    });

    const searchInput = document.getElementById('discoveryInlineSearch');
    if (searchInput) searchInput.value = '';

    applyFilters();
  }

  document.addEventListener('DOMContentLoaded', () => {
    // 1. Filter Pills Click
    const filterPills = document.querySelectorAll('.filter-pill[data-filter-group]');
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const group = pill.getAttribute('data-filter-group');
        const value = (pill.getAttribute('data-filter-value') || 'all').toLowerCase();

        // Remove active class from sibling pills in same group
        document.querySelectorAll(`.filter-pill[data-filter-group="${group}"]`).forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        if (group === 'category') activeFilters.category = value;
        if (group === 'style') activeFilters.style = value;
        if (group === 'location') activeFilters.location = value;
        if (group === 'type') activeFilters.contentType = value;

        applyFilters();
      });
    });

    // 2. Select Dropdown Filters
    const styleSelect = document.getElementById('filterStyleSelect');
    if (styleSelect) {
      styleSelect.addEventListener('change', (e) => {
        activeFilters.style = e.target.value.toLowerCase();
        applyFilters();
      });
    }

    const locationSelect = document.getElementById('filterLocationSelect');
    if (locationSelect) {
      locationSelect.addEventListener('change', (e) => {
        activeFilters.location = e.target.value.toLowerCase();
        applyFilters();
      });
    }

    const sortSelect = document.getElementById('filterSortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        activeFilters.sort = e.target.value.toLowerCase();
        // Trigger sort re-ordering
        const grid = document.getElementById('discoveryGrid');
        if (grid) {
          const cards = Array.from(grid.querySelectorAll('.fashion-card[data-discovery-card]'));
          if (activeFilters.sort === 'saved') {
            cards.sort((a, b) => (b.classList.contains('is-saved') ? 1 : 0) - (a.classList.contains('is-saved') ? 1 : 0));
          } else if (activeFilters.sort === 'latest') {
            cards.reverse();
          }
          cards.forEach(card => grid.appendChild(card));
        }
      });
    }

    // 3. Inline Search in Discover page
    const inlineSearch = document.getElementById('discoveryInlineSearch');
    if (inlineSearch) {
      inlineSearch.addEventListener('input', (e) => {
        activeFilters.searchQuery = e.target.value.toLowerCase();
        applyFilters();
      });
    }

    // 4. Clear Filters Buttons
    const clearBtns = document.querySelectorAll('[data-action="clear-filters"]');
    clearBtns.forEach(btn => btn.addEventListener('click', resetFilters));

    // Initial check from URL search parameters if any (e.g. ?category=vintage or ?loc=tokyo)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('category')) {
      const cat = urlParams.get('category').toLowerCase();
      activeFilters.category = cat;
      const targetPill = document.querySelector(`.filter-pill[data-filter-group="category"][data-filter-value="${cat}"]`);
      if (targetPill) {
        document.querySelectorAll('.filter-pill[data-filter-group="category"]').forEach(p => p.classList.remove('active'));
        targetPill.classList.add('active');
      }
    }
    if (urlParams.has('loc')) {
      const loc = urlParams.get('loc').toLowerCase();
      activeFilters.location = loc;
      if (locationSelect) locationSelect.value = loc;
    }

    applyFilters();
  });

  window.ModeAtlasDiscovery = {
    apply: applyFilters,
    reset: resetFilters,
    state: activeFilters
  };
})();
