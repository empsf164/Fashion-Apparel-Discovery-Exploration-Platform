/**
 * MODE / ATLAS — Bookmarks & Saved Discoveries System
 * Client-Side Persistence with LocalStorage & Interactive Slide-over Drawer
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'mode_atlas_bookmarks_v1';

  // Seed sample bookmarks if empty for immediate demo value
  const DEFAULT_SEED_BOOKMARKS = [
    {
      id: 'video-1',
      type: 'video',
      title: 'Inside a Tokyo Vintage Archive',
      category: 'Street Style',
      location: 'Tokyo, Japan',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      url: 'video-details.html?id=video-1'
    },
    {
      id: 'story-1',
      type: 'story',
      title: 'The Return of Quiet Tailoring',
      category: 'Trend Report',
      location: 'Milan, Italy',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      url: 'story-details.html?id=story-1'
    },
    {
      id: 'creator-1',
      type: 'creator',
      title: 'Mika Tanaka',
      category: 'Archive Curator',
      location: 'Tokyo, Japan',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      url: 'creator-profile.html?id=mika-tanaka'
    },
    {
      id: 'collection-1',
      type: 'collection',
      title: 'The New Minimal',
      category: 'Curated Theme',
      location: 'Global',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
      url: 'collections.html#the-new-minimal'
    }
  ];

  // Retrieve current bookmarks
  function getBookmarks() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SEED_BOOKMARKS));
        return DEFAULT_SEED_BOOKMARKS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Error reading bookmarks', e);
      return [];
    }
  }

  // Save bookmarks
  function saveBookmarks(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      updateBadges();
      renderSavedDrawer();
      updateAllBookmarkButtons();
      window.dispatchEvent(new CustomEvent('bookmarkStateChanged', { detail: { bookmarks: list } }));
    } catch (e) {
      console.error('Error saving bookmarks', e);
    }
  }

  // Check if item is saved
  function isSaved(id) {
    const list = getBookmarks();
    return list.some(item => item.id === id);
  }

  // Toggle saved item
  function toggleBookmark(itemData) {
    let list = getBookmarks();
    const existingIndex = list.findIndex(item => item.id === itemData.id);

    if (existingIndex > -1) {
      list.splice(existingIndex, 1);
      saveBookmarks(list);
      showToast(`Removed from your saved discoveries`);
      return false;
    } else {
      list.unshift(itemData);
      saveBookmarks(list);
      showToast(`Saved "${itemData.title}" to your discoveries`);
      return true;
    }
  }

  // Remove by ID
  function removeBookmark(id) {
    let list = getBookmarks();
    const target = list.find(item => item.id === id);
    list = list.filter(item => item.id !== id);
    saveBookmarks(list);
    if (target) {
      showToast(`Removed "${target.title}"`);
    }
  }

  // Clear all bookmarks
  function clearAllBookmarks() {
    saveBookmarks([]);
    showToast('All saved discoveries cleared');
  }

  // Update navbar counter badge
  function updateBadges() {
    const list = getBookmarks();
    const badges = document.querySelectorAll('.saved-counter-badge');
    badges.forEach(badge => {
      badge.textContent = list.length;
      badge.style.display = list.length > 0 ? 'flex' : 'none';
    });
  }

  // Sync state on all bookmark buttons across the DOM
  function updateAllBookmarkButtons() {
    const list = getBookmarks();
    const buttons = document.querySelectorAll('[data-bookmark-id]');
    buttons.forEach(btn => {
      const id = btn.getAttribute('data-bookmark-id');
      const saved = list.some(item => item.id === id);
      if (saved) {
        btn.classList.add('is-saved');
        btn.setAttribute('aria-label', 'Remove from Saved');
        const labelSpan = btn.querySelector('.bookmark-label');
        if (labelSpan) labelSpan.textContent = '✓ Saved';
      } else {
        btn.classList.remove('is-saved');
        btn.setAttribute('aria-label', 'Save to Discoveries');
        const labelSpan = btn.querySelector('.bookmark-label');
        if (labelSpan) labelSpan.textContent = '♡ Save';
      }
    });
  }

  // Render Saved Drawer List with filter tabs
  let currentTab = 'all';

  function renderSavedDrawer() {
    const drawerContent = document.getElementById('savedDrawerContent');
    const drawerCountEl = document.getElementById('savedDrawerCount');
    if (!drawerContent) return;

    const list = getBookmarks();
    if (drawerCountEl) {
      drawerCountEl.textContent = `(${list.length})`;
    }

    const filtered = currentTab === 'all' 
      ? list 
      : list.filter(item => item.type === currentTab);

    if (filtered.length === 0) {
      drawerContent.innerHTML = `
        <div class="saved-empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
          <p style="font-weight: 500;">No saved ${currentTab === 'all' ? 'discoveries' : currentTab + 's'} yet.</p>
          <p style="font-size: 0.8125rem; color: var(--text-muted);">Explore fashion apparel, stories, creators, and locations, then click the bookmark icon to save them here.</p>
          <a href="discover.html" class="btn btn-primary" style="margin-top: 0.5rem;">Explore Fashion</a>
        </div>
      `;
      return;
    }

    drawerContent.innerHTML = filtered.map(item => `
      <div class="saved-item-card" data-id="${item.id}">
        <img src="${item.image || 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=300&q=80'}" alt="${item.title}" class="saved-item-thumb" loading="lazy">
        <div class="saved-item-details">
          <span class="saved-item-category">${item.category || item.type}</span>
          <h4 class="saved-item-title"><a href="${item.url || 'discover.html'}">${item.title}</a></h4>
          <span class="saved-item-location">${item.location || 'Global'}</span>
        </div>
        <button class="btn-remove-saved" data-action="remove-saved" data-id="${item.id}" title="Remove">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    `).join('');

    // Attach remove handlers
    drawerContent.querySelectorAll('[data-action="remove-saved"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        removeBookmark(id);
      });
    });
  }

  // Toast notification helper
  function showToast(message) {
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="toast-icon">✓</span>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  // Open & Close Saved Drawer
  function openSavedDrawer() {
    const drawer = document.getElementById('savedDrawer');
    const backdrop = document.getElementById('savedBackdrop');
    if (drawer) drawer.classList.add('is-open');
    if (backdrop) backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    renderSavedDrawer();
  }

  function closeSavedDrawer() {
    const drawer = document.getElementById('savedDrawer');
    const backdrop = document.getElementById('savedBackdrop');
    if (drawer) drawer.classList.remove('is-open');
    if (backdrop) backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // Initialize Event Listeners
  document.addEventListener('DOMContentLoaded', () => {
    updateBadges();
    updateAllBookmarkButtons();

    // Delegate bookmark button clicks across entire document
    document.body.addEventListener('click', (e) => {
      const bookmarkBtn = e.target.closest('[data-action="bookmark"]');
      if (bookmarkBtn) {
        e.preventDefault();
        e.stopPropagation();
        const itemData = {
          id: bookmarkBtn.getAttribute('data-bookmark-id') || ('item-' + Date.now()),
          type: bookmarkBtn.getAttribute('data-bookmark-type') || 'apparel',
          title: bookmarkBtn.getAttribute('data-bookmark-title') || 'Fashion Discovery',
          category: bookmarkBtn.getAttribute('data-bookmark-category') || 'Fashion',
          location: bookmarkBtn.getAttribute('data-bookmark-location') || 'Global',
          image: bookmarkBtn.getAttribute('data-bookmark-image') || '',
          url: bookmarkBtn.getAttribute('data-bookmark-url') || 'discover.html'
        };
        toggleBookmark(itemData);
      }
    });

    // Saved Drawer Triggers
    const savedTriggers = document.querySelectorAll('[data-action="open-saved"]');
    savedTriggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openSavedDrawer();
      });
    });

    const closeDrawerBtns = document.querySelectorAll('[data-action="close-saved"]');
    closeDrawerBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeSavedDrawer();
      });
    });

    const backdrop = document.getElementById('savedBackdrop');
    if (backdrop) {
      backdrop.addEventListener('click', closeSavedDrawer);
    }

    // Filter tabs inside saved drawer
    const tabBtns = document.querySelectorAll('.saved-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTab = btn.getAttribute('data-tab') || 'all';
        renderSavedDrawer();
      });
    });

    // Clear all button inside drawer
    const clearBtn = document.getElementById('savedClearAllBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm('Clear all saved fashion discoveries?')) {
          clearAllBookmarks();
        }
      });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeSavedDrawer();
      }
    });
  });

  // Global API
  window.ModeAtlasBookmarks = {
    getAll: getBookmarks,
    isSaved: isSaved,
    toggle: toggleBookmark,
    remove: removeBookmark,
    clearAll: clearAllBookmarks,
    openDrawer: openSavedDrawer,
    closeDrawer: closeSavedDrawer,
    showToast: showToast
  };
})();
