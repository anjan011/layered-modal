# layered-modal
Layered modal is yet another popup, with added stacking management, which allows you multiple modals stacked over each other. If you are looking for a single popup, you are still covered, with plenty of features like - 

1. Optional header and footer for the popup
2. Different content types including: html content, content from a <template> element, image, YouTube video, including shorts and content via AJAX.
3. Popup positioning to all 9 grids of the screen from top-left to bottom-right!
4. Support for inline css styles and additional css classes for modal header, body and footer.
5. Different footer mode: including alert, confirm and custom. Which lets you easily turn your modal into an alert dialog, confirm dialog or place your own custom content in the footer.

## ⚙️ ModalManager Configuration Options

The `ModalManager` class allows customization through various options. Below are the available parameters you can set
when initializing the manager.

### **Available Options:**

| Option Name          | Type     | Default Value | Description |
|----------------------|----------|--------------|-------------|
| **`zIndex`**        | `integer` | `1` | The base `zIndex` for the layered modal system. Each modal in the stack will increment its `zIndex` by 1 to ensure proper layering. |
| **`baseShiftDistance`** | `object` | `{ top: 0, right: 0, bottom: 0, left: 0 }` | Determines the shift distance for each new modal. For example, setting `top: 50` and `left: 50` will make each new modal appear **50px lower and 50px to the right**, creating a cascading effect. This is useful for keeping previous modals partially visible. |
| **`cssClass`** | `object` | `{ modal: "", modalOk: "modal-ok", modalClose: "modal-close" }` | Defines CSS classes used by all modals managed by this instance. Ensure that close buttons in your custom modals use `modalClose` class or the default `modal-close` to work correctly. |
| **`transitionDuration`** | `number` | `0` | The duration (in milliseconds) for the fade-in/out transition effect. By default, it's `0` (no animation). Each modal can have its own custom transition duration if needed. |
| **`xButton`** | `object` | `{ enabled: true, content: "X", cssClass: "", inlineStyles: "" }` | Configures the **close button** displayed at the top-right corner of the modal. You can disable it by setting `enabled: false`, change the button content, apply a custom CSS class, or use inline styles for styling flexibility. |
