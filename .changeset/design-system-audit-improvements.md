---
"@synchronicity/react-native": minor
"@synchronicity/tokens": patch
---

Major design system improvements from comprehensive audit:

**Breaking Changes:**
- Button: Renamed `kind` prop to `variant` for API consistency
- Button: `accessibilityLabel` is now optional (defaults to children text)

**New Features:**
- Added 16 new alert semantic tokens for proper theme support
- Added ref forwarding to Button and Input components
- Added WCAG-compliant 2px focus indicators to Button, IconButton, Checkbox, Switch, and Tabs
- Focus indicators use `border-focus` token and appear on keyboard navigation

**Bug Fixes:**
- Alert component now properly responds to theme changes (removed hardcoded rgba values)
- Button API standardized with rest of component library
- Tabs component now has accessible focus indicators

**Documentation:**
- Added comprehensive component lifecycle guide
- Added StatusBadge component for displaying maturity levels
- Updated Button documentation with status indicator
- Added governance documentation (CONTRIBUTING.md)
- Created design system audit report

All changes follow semantic token architecture and maintain WCAG 2.1 AA compliance.
