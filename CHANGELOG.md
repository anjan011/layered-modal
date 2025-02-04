# Changelog

## [1.0.7] - 2025-02-04

### Fixed

- Added support for modal closing on mouse click outside the modal dialog
- Backdrop and modal body overflow set to auto. It was adding some extra spacing with overflow
  scroll.
- Modal Parameter default value changes: autoWidth and autoHeight is set to true and maxWidth and maxHeight is set to 90vw and 90vh respectively.

## [1.0.6] - 2025-02-03

### Fixed

- Some minor bug fixes

## [1.0.5] - 2025-01-30

### Fixed

- Package export settings updated

## [1.0.4] - 2025-01-30

### Fixed

- Existing modal ID check in `ModalManager` stack
- Added data-* attribute generator class from `ModalParams`
- Some code refactoring
- Added instance static property and addModal() and removeModal() static methods to `ModalManager`
- Updated README.md accordingly

## [1.0.3] - 2025-01-30

### Fixed

- Updated setup section in `README.md`
- Removed some debugging code from source files.

## [1.0.2] - 2025-01-30

### Fixed

- Updated documentation in `README.md`
- Removed html tag encoding in README.md

## [1.0.1] - 2025-01-30

### Fixed

- Updated documentation in `README.md`
- Removed unused dependencies in `package.json`

## [1.0.0] - 2025-01-30

### Added

- Initial release with Layered Modal system
