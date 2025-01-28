## ⚙️ ModalManager Configuration Options

The `ModalManager` class allows customization through various options. Below are the available parameters you can set
when initializing the manager.

### **Available Options:**

| Option Name | Type | Description |
|------------|------|-------------|
| **`zIndex`** | `integer` | Base zIndex value for entire layered modal system. the modals will be displayed using this zIndex as base. Each modal in stack will have their zIndex value increased by 1. Default: `"1"` |
| **`baseShiftDistance`** | `object` | The layered modal system using base shift distance to move each new modal by the given distance. For example if a shift distance of 50 is added to top and left, then each new modal will be shifted 50px to the left and 50px to the down compared to the last modal. This will give the modals a visual cascading effect. You can also use this to shift a new modal to anywhere so that it does not obstruct the last modal. Useful for cases where user would not want to have their view obstructed, while they need to do something else. For example, while filling in a form in a modal, you need to show some quick help regarding the form filling process. All the supported parameters below allows both positive and negative numbers.  |
| **`baseShiftDistance.top`** | `integer \| null` | Shift vertically using top margin  |
| **`baseShiftDistance.right`** | `integer \| null` | Shift horizontally using right margin  |
| **`baseShiftDistance.bottom`** | `integer \| null` | Shift vertically using bottom margin  |
| **`baseShiftDistance.left`** | `integer \| null` | Shift horizontally using left margin  |
| **`cssClass`** | `object` | Common css classes to be passed to all modals manageable via this instance of manager. See supported properties below.  |
| **`cssClass.modal`** | `string` | Additional css class to be added to modal dialog.  |
| **`cssClass.modalOk`** | `string` | Additional css class to be added to ok button in footer, if applicable in custom or confirm footer mode.  |
| **`cssClass.modalClose`** | `string` | Additional css class for close button for close button in footer.  |
| **`transitionDuration`** | `number` | Transition duration for the fade in/out effect. By default this value is set to 0, so that there is no fading animation. This becomes the common transitionDuration value for all modals. Though you can set a different duration value for each modal.  |
| **`xButton`** | `object \| null` | The common modal close button settings. If this parameter is not provided the close button will be shown with default settings. See below for supported options.  |
| **`xButton.enabled`** | `boolean` | Show or hide X button Default: `true` |
| **`xButton.content`** | `string` | The X button content. Default: `"X"` |
| **`xButton.cssClass`** | `string` | Additional css class for X button  |
| **`xButton.inlineStyles`** | `string` | Additional inline styles for X button  |