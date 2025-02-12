# Changelog

## [1.0.14] - 2025-02-12

- Incorrect dependency on `bootstrap` removed.

## [1.0.13] - 2025-02-12

- Fixed close button icon positioning issue.
- AJAX headers can now be a plain object or JSON encoded string.
- Issues fixed with modal's opening via `data-*` attributes

## [1.0.12] - 2025-02-10

- Footer button icon position bug fixed
- Added function name as string, support to AJAX parameter's transformJson callback.
- Readme file updated with links to [https://docs.anjan011.com/layered-modal/](https://docs.anjan011.com/layered-modal/)

## [1.0.11] - 2025-02-08

- Form serializer logic updated. Now form controls has support for data-sdt and data-sdv for serializer data type and default value respectively. the `FormSerializer` class constructor now has a second parameter that enables the parser to skip controls with empty string value (except boolean types, which converts to false)
- A small issue fix.

## [1.0.10] - 2025-02-08

- Structured documentation and demo now available at [https://docs.anjan011.com/layered-modal/](https://docs.anjan011.com/layered-modal/) 

## [1.0.9] - 2025-02-07

- in case of relative url like this `/path/to/resource` for AJAX call, now `window.location.origin` is prepended to it making the url absolute.
- moved `aspectRatio` param from modalBody to modal itself.

## [1.0.8] - 2025-02-06

- Added support for `body.functionThis` so that a custom `this` value can be set when the function is called.

## [1.0.7] - 2025-02-04

### Fixed

- Added support for modal closing on mouse click outside the modal dialog
- Backdrop and modal body overflow set to auto. It was adding some extra spacing with overflow
  scroll.
- Modal Parameter default value changes: autoWidth and autoHeight is set to true and maxWidth and maxHeight is set to 90vw and 90vh respectively.
- For modal parameter width option, if the value <= 0, autoWidth is set to true. Same applied to 
height.

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
