/**
 * MODE / ATLAS — Video Experience & Player Engine
 * Interactive Video Modal, Simulated Playback Scrubber, Timecode, Share & Details Page Sync
 */

(function () {
  'use strict';

  // Video Database for Modal and Details
  const VIDEO_DATA = {
    'video-1': {
      id: 'video-1',
      title: 'Inside a Tokyo Vintage Archive: 90s Deconstructed Denim & Undercover Gems',
      category: 'Street Style',
      creator: 'Mika Tanaka',
      creatorRole: 'Archival Curator & Stylist',
      creatorBio: 'Based in Shibuya, Mika Tanaka documents underground Japanese archival fashion, rare 90s designer silhouettes, and Tokyo vintage culture.',
      creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      location: 'Tokyo, Japan',
      duration: '02:48',
      published: 'October 2026',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-fashion-outfit-39845-large.mp4',
      poster: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
      description: 'Journey deep into the hidden basement archives of Harajuku and Shimokitazawa with curator Mika Tanaka, exploring how 1990s Japanese deconstruction continues to influence contemporary world fashion.'
    },
    'video-2': {
      id: 'video-2',
      title: '24 Hours Inside Seoul Fashion District: Night Wholesalers to Seongsu Boutiques',
      category: 'Culture',
      creator: 'Jun-ho Park',
      creatorRole: 'Fashion Filmmaker',
      creatorBio: 'Capturing the electric intersection of K-fashion, underground music culture, and experimental tailoring in Seoul.',
      creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      location: 'Seoul, South Korea',
      duration: '04:12',
      published: 'September 2026',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-walking-in-a-runway-show-42686-large.mp4',
      poster: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
      description: 'From the 3 AM frenzy of Dongdaemun fashion markets to the minimalist concept spaces of Seongsu-dong, an unfiltered look at how Seoul produces collections overnight.'
    },
    'video-3': {
      id: 'video-3',
      title: 'Paris Atelier: Sculptural Tailoring & Drape with Camille Laurent',
      category: 'Designer Stories',
      creator: 'Camille Laurent',
      creatorRole: 'Couture Pattern Maker',
      creatorBio: 'Former atelier lead in Paris now spotlighting zero-waste geometric pattern cutting and hand-sculpted wool silhouettes.',
      creatorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      location: 'Paris, France',
      duration: '03:35',
      published: 'October 2026',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-stylish-model-posing-in-a-studio-setting-42701-large.mp4',
      poster: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=80',
      description: 'An intimate studio masterclass on architectural drapery and the return of raw, tactile wool silhouettes without artificial stiffeners.'
    },
    'video-4': {
      id: 'video-4',
      title: 'Milan Backstage: Modern Silk, Raw Edge Linen & Structured Outerwear',
      category: 'Runway',
      creator: 'Matteo Rossi',
      creatorRole: 'Runway Director',
      creatorBio: 'Documenting the tactile details, backstage fittings, and material innovations of Milan fashion week.',
      creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      location: 'Milan, Italy',
      duration: '03:10',
      published: 'September 2026',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-model-in-fashion-show-runway-42687-large.mp4',
      poster: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
      description: 'Direct from the Milan ateliers: how luxury houses are blending heavyweight silk with utilitarian linen closures.'
    }
  };

  let isPlaying = false;
  let isMuted = false;
  let progressInterval = null;
  let currentProgress = 0;

  function openVideoModal(videoId) {
    const video = VIDEO_DATA[videoId] || VIDEO_DATA['video-1'];
    const modal = document.getElementById('videoPlayerModal');
    if (!modal) return;

    // Fill modal info
    const titleEl = document.getElementById('videoModalTitle');
    const creatorEl = document.getElementById('videoModalCreator');
    const locationEl = document.getElementById('videoModalLocation');
    const bookmarkBtn = document.getElementById('videoModalBookmarkBtn');
    const videoDetailsLink = document.getElementById('videoModalDetailsLink');
    const videoEl = document.getElementById('modalHtmlVideo');
    const posterImg = document.getElementById('modalVideoPoster');

    if (titleEl) titleEl.textContent = video.title;
    if (creatorEl) creatorEl.textContent = video.creator;
    if (locationEl) locationEl.textContent = `${video.location} · ${video.category}`;
    if (videoDetailsLink) videoDetailsLink.href = `video-details.html?id=${video.id}`;

    if (bookmarkBtn) {
      bookmarkBtn.setAttribute('data-bookmark-id', video.id);
      bookmarkBtn.setAttribute('data-bookmark-title', video.title);
      bookmarkBtn.setAttribute('data-bookmark-type', 'video');
      bookmarkBtn.setAttribute('data-bookmark-category', video.category);
      bookmarkBtn.setAttribute('data-bookmark-location', video.location);
      bookmarkBtn.setAttribute('data-bookmark-image', video.poster);
      bookmarkBtn.setAttribute('data-bookmark-url', `video-details.html?id=${video.id}`);
    }

    if (videoEl) {
      videoEl.src = video.videoUrl;
      videoEl.poster = video.poster;
      videoEl.load();
      videoEl.play().then(() => {
        isPlaying = true;
        updatePlayButtons(true);
      }).catch(() => {
        // Autoplay may be prevented by browser; user can click play
        isPlaying = false;
        updatePlayButtons(false);
      });
    }

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeVideoModal() {
    const modal = document.getElementById('videoPlayerModal');
    const videoEl = document.getElementById('modalHtmlVideo');
    if (modal) modal.classList.remove('is-open');
    if (videoEl) {
      videoEl.pause();
      videoEl.currentTime = 0;
    }
    isPlaying = false;
    document.body.style.overflow = '';
  }

  function updatePlayButtons(playing) {
    const playIcons = document.querySelectorAll('.video-play-state-icon');
    playIcons.forEach(icon => {
      icon.innerHTML = playing 
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
    });
  }

  function togglePlayVideo() {
    const videoEl = document.getElementById('modalHtmlVideo') || document.getElementById('detailsHtmlVideo');
    if (!videoEl) return;

    if (videoEl.paused) {
      videoEl.play();
      isPlaying = true;
      updatePlayButtons(true);
    } else {
      videoEl.pause();
      isPlaying = false;
      updatePlayButtons(false);
    }
  }

  function toggleMuteVideo() {
    const videoEl = document.getElementById('modalHtmlVideo') || document.getElementById('detailsHtmlVideo');
    if (!videoEl) return;
    videoEl.muted = !videoEl.muted;
    isMuted = videoEl.muted;
    const muteIcons = document.querySelectorAll('.video-mute-icon');
    muteIcons.forEach(icon => {
      icon.innerHTML = isMuted
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';
    });
  }

  // Setup Details Page if on video-details.html
  function initVideoDetailsPage() {
    const detailsContainer = document.getElementById('videoDetailsMain');
    if (!detailsContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get('id') || 'video-1';
    const video = VIDEO_DATA[videoId] || VIDEO_DATA['video-1'];

    // Update details page elements
    const titleEl = document.getElementById('videoDetailTitle');
    const categoryEl = document.getElementById('videoDetailCategory');
    const locationEl = document.getElementById('videoDetailLocation');
    const creatorNameEl = document.getElementById('videoDetailCreatorName');
    const creatorRoleEl = document.getElementById('videoDetailCreatorRole');
    const creatorBioEl = document.getElementById('videoDetailCreatorBio');
    const creatorAvatarEl = document.getElementById('videoDetailCreatorAvatar');
    const creatorProfileLink = document.getElementById('videoDetailCreatorLink');
    const publishedEl = document.getElementById('videoDetailPublished');
    const descriptionEl = document.getElementById('videoDetailDescription');
    const bookmarkBtn = document.getElementById('videoDetailBookmarkBtn');
    const htmlVideo = document.getElementById('detailsHtmlVideo');

    if (titleEl) titleEl.textContent = video.title;
    if (categoryEl) categoryEl.textContent = video.category;
    if (locationEl) locationEl.textContent = video.location;
    if (creatorNameEl) creatorNameEl.textContent = video.creator;
    if (creatorRoleEl) creatorRoleEl.textContent = video.creatorRole;
    if (creatorBioEl) creatorBioEl.textContent = video.creatorBio;
    if (creatorAvatarEl) creatorAvatarEl.src = video.creatorAvatar;
    if (publishedEl) publishedEl.textContent = `Published: ${video.published}`;
    if (descriptionEl) descriptionEl.textContent = video.description;
    if (creatorProfileLink) creatorProfileLink.href = `creator-profile.html?id=${encodeURIComponent(video.creator.toLowerCase().replace(/\s+/g, '-'))}`;

    if (bookmarkBtn) {
      bookmarkBtn.setAttribute('data-bookmark-id', video.id);
      bookmarkBtn.setAttribute('data-bookmark-title', video.title);
      bookmarkBtn.setAttribute('data-bookmark-type', 'video');
      bookmarkBtn.setAttribute('data-bookmark-category', video.category);
      bookmarkBtn.setAttribute('data-bookmark-location', video.location);
      bookmarkBtn.setAttribute('data-bookmark-image', video.poster);
      bookmarkBtn.setAttribute('data-bookmark-url', `video-details.html?id=${video.id}`);
    }

    if (htmlVideo) {
      htmlVideo.src = video.videoUrl;
      htmlVideo.poster = video.poster;
    }

    // Share action
    const shareBtn = document.getElementById('videoDetailShareBtn');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href);
          if (window.ModeAtlasBookmarks) {
            window.ModeAtlasBookmarks.showToast('Discovery link copied to clipboard');
          }
        }
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Delegate clicks for opening video modal from cards
    document.body.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-action="play-video"]');
      if (trigger) {
        e.preventDefault();
        const videoId = trigger.getAttribute('data-video-id') || 'video-1';
        openVideoModal(videoId);
      }
    });

    const closeBtn = document.getElementById('videoModalClose');
    if (closeBtn) closeBtn.addEventListener('click', closeVideoModal);

    const modal = document.getElementById('videoPlayerModal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeVideoModal();
      });
    }

    // Modal play/pause and mute triggers
    const playBtns = document.querySelectorAll('[data-action="toggle-video-play"]');
    playBtns.forEach(btn => btn.addEventListener('click', togglePlayVideo));

    const muteBtns = document.querySelectorAll('[data-action="toggle-video-mute"]');
    muteBtns.forEach(btn => btn.addEventListener('click', toggleMuteVideo));

    initVideoDetailsPage();
  });

  window.ModeAtlasVideo = {
    open: openVideoModal,
    close: closeVideoModal,
    togglePlay: togglePlayVideo,
    data: VIDEO_DATA
  };
})();
