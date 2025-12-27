/**
 * Breadcrumb and Section Label Script
 *
 * Adds:
 * 1. Section label above H1 (e.g., "FOUNDATIONS" above "Typography")
 * 2. Sticky breadcrumb on scroll (e.g., "Foundations › Typography")
 */

function initBreadcrumb() {
  const contentPanel = document.querySelector('.content-panel');
  const h1 = document.querySelector('.content-panel h1');

  if (!contentPanel || !h1) return;

  // Get current page path
  const path = window.location.pathname;
  const pathParts = path.split('/').filter(Boolean);

  // Map URL paths to section names
  const sectionMap = {
    'getting-started': 'Getting Started',
    'foundations': 'Foundations',
    'tokens': 'Tokens',
    'components': 'Components',
    'guides': 'Guides'
  };

  // Determine section and page
  let section = '';
  let page = '';
  let breadcrumbText = '';

  if (pathParts.length >= 1) {
    const sectionKey = pathParts[0];
    section = sectionMap[sectionKey] || sectionKey;

    // Get page title from H1
    page = h1.textContent.trim();

    // Only show section label if we have a subsection (2+ path parts)
    if (pathParts.length >= 2) {
      // Check if section label already exists
      let sectionLabel = contentPanel.querySelector('.section-label');

      if (!sectionLabel) {
        // Create section label element ONLY if it doesn't exist
        sectionLabel = document.createElement('div');
        sectionLabel.className = 'section-label';
        h1.parentNode.insertBefore(sectionLabel, h1);
      }

      // Update text content
      sectionLabel.textContent = section.toUpperCase();
    }

    // Create breadcrumb text
    breadcrumbText = `${section} › ${page}`;
  }

  // Create or get sticky breadcrumb element
  let breadcrumb = document.getElementById('sticky-breadcrumb');
  if (!breadcrumb) {
    breadcrumb = document.createElement('div');
    breadcrumb.id = 'sticky-breadcrumb';
    document.body.appendChild(breadcrumb);
  }

  // Set breadcrumb text
  breadcrumb.textContent = breadcrumbText;

  // Apply light theme to breadcrumb
  const applyTheme = () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      breadcrumb.classList.remove('light-theme');
    } else {
      breadcrumb.classList.add('light-theme');
    }
  };
  applyTheme();

  // Watch for theme changes
  const observer = new MutationObserver(applyTheme);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });

  // Match breadcrumb width to content panel
  const updateBreadcrumbWidth = () => {
    const rect = contentPanel.getBoundingClientRect();
    breadcrumb.style.left = `${rect.left}px`;
    breadcrumb.style.width = `${rect.width}px`;
  };
  updateBreadcrumbWidth();
  window.addEventListener('resize', updateBreadcrumbWidth);

  // Scroll detection for sticky breadcrumb
  const h1Bottom = h1.offsetTop + h1.offsetHeight;

  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Show breadcrumb when H1 is scrolled past
    if (scrollTop > h1Bottom) {
      breadcrumb.classList.add('visible');
    } else {
      breadcrumb.classList.remove('visible');
    }
  }

  // Remove old scroll listener if it exists
  if (window.breadcrumbScrollHandler) {
    window.removeEventListener('scroll', window.breadcrumbScrollHandler);
  }

  // Add scroll listener
  window.breadcrumbScrollHandler = handleScroll;
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Initial check
  handleScroll();
}

// Run on initial load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBreadcrumb);
} else {
  initBreadcrumb();
}

// Re-run on view transitions (for Astro)
// Use astro:page-load instead of astro:after-swap to run earlier
document.addEventListener('astro:page-load', initBreadcrumb);
