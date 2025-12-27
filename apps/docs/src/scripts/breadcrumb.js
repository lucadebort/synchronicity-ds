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

  if (pathParts.length >= 2) {
    const sectionKey = pathParts[0];
    section = sectionMap[sectionKey] || sectionKey;

    // Get page title from H1
    page = h1.textContent.trim();

    // Set data attribute for section label
    h1.setAttribute('data-section', section.toUpperCase());

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
initBreadcrumb();

// Re-run on view transitions (for Astro)
document.addEventListener('astro:after-swap', initBreadcrumb);
