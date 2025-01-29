## ⚙️ Trigger modal by data-* attributes

Aside from calling `ModalManager` class instance's `addModal()`, a modal dialog can be displayed using data-* attributes on the element that triggers the modal on click. If the element is `button` or `input` type and has `disabled` attribute set, the modal will not be triggered! Similarly, if the element has a specific css class named `disabled`, it will not trigger either! So please take note of this, and can make use of this to enable or disable modal trigger. Also, there is always `data-lms-trigger` attribute value, which also determines whether the modal triggers or not. 

Also, please keep in mind that the modal trigger element click event has default behaviour disabled using `event.preventDefault()`. We also recommend that this modal trigger element should not have any click event handlers attached to it. 

### **Available Attributes:**

| Option Name | Type | Description |
|------------|------|-------------|
| **`data-lms-trigger`** | `number` | To make use of data-* attributes to load the modal, this attribute value must be set to 1, else the modal will not be triggered!  |
| **`data-lm-transition-duration`** | `integer` | Fade in/out transition or animation duration. If omitted or passing 0 as value will disable the transition.  |
| **`data-lm-css-class`** | `string` | Pass additional css class names to the modal dialog. Multiple class names must be separated by space.  |
| **`data-lm-auto-width`** | `number` | By default the modal has auto width, means that it will fit to content's width. If you specifically pass the value of 0, then you can set a fixed width value. Default: `"1"` |
| **`data-lm-width-value`** | `number` | A fixed width value. Only usable if `data-lm-auto-width` is not set or has a value of 0.  |
| **`data-lm-width-unit`** | `string` | Any valid css unit. This can be px,vw, em, rem, etc. If left empty px will become the unit. Default: `"px"` |
| **`data-lm-max-width-value`** | `number` | A maximum width value. Ignored if empty or less than or equal to 0. The modal dialog's maximum width will not exceed this value and unit below.  |
| **`data-lm-max-width-unit`** | `string` | Same as width unit. Any valid css unit is usable. Default: `"px"` |
| **`data-lm-min-width-value`** | `number` | A minimum width value. Can be greater than or equal to 0. The modal dialog's minimum width will be set to this value and unit below.  |
| **`data-lm-min-width-unit`** | `string` | Same as width unit. Any valid css unit is usable. Default: `"px"` |
| **`data-lm-auto-height`** | `number` | By default the modal has auto height, means that it will fit to content's height. If you specifically pass the value of 0, then you can set a fixed height value. Default: `"1"` |
| **`data-lm-height-value`** | `number` | A fixed height value. Only usable if `data-lm-auto-height` is not set or has a value of 0.  |
| **`data-lm-height-unit`** | `string` | Any valid css unit. This can be px,vh, em, rem, etc. If left empty px will become the unit. Default: `"px"` |
| **`data-lm-max-height-value`** | `number` | A maximum height value. Ignored if empty or less than or equal to 0. The modal dialog's maximum height will not exceed this value and unit below.  |
| **`data-lm-max-height-unit`** | `string` | Same as height unit. Any valid css unit is usable. Default: `"px"` |
| **`data-lm-min-height-value`** | `number` | A minimum height value. Can be greater than or equal to 0. The modal dialog's minimum height will be set to this value and unit below.  |
| **`data-lm-min-height-unit`** | `string` | Same as height unit. Any valid css unit is usable. Default: `"px"` |
| **`data-lm-on-show`** | `string` | A global function name, that is called right after modal is added to DOM. If the function not exist, it will be silently ignored, with a console log `Function named {funcName} could not be found!`  |
| **`data-lm-on-before-show`** | `string` | A global function name, that is called right before modal is added to DOM. If the function not exist, it will be silently ignored, with a console log `Function named {funcName} could not be found!`  |
| **`data-lm-on-hide`** | `string` | A global function name, that is called right after modal is removed from DOM. If the function not exist, it will be silently ignored, with a console log `Function named {funcName} could not be found!`  |
| **`data-lm-on-before-hide`** | `string` | A global function name, that is called right before modal is removed from DOM. If the function not exist, it will be silently ignored, with a console log `Function named {funcName} could not be found!`  |
| **`data-lm-h-enabled`** | `number` | Is header section enabled? Setting 0 will completely remove header section. Default: `"1"` |
| **`data-lm-h-title`** | `string` | Title text for header section. Default: `"Modal Title"` |
| **`data-lm-h-title-tag`** | `string` | The title tag. Normally one of the 6 heading tags are used: `h1`, `h2`, `h3`, `h4`, `h5` and `h6`. But any tag is usable. Default: `"h2"` |
| **`data-lm-h-css-class`** | `string` | Pass one or more css class to header element. Allows you style the header element and it's contents.  |
| **`data-lm-f-enabled`** | `integer` | Enable footer section. Pass 0 to hide footer section. Default: `"1"` |
| **`data-lm-f-mode`** | `string` | Footer display mode. One of these 3 possible values: ['alert','confirm','custom']. In alert mode just displays a close button, in confirm mode displays an ok and close button, and finally in custom mode, display whatever you like. Default: `"alert"` |
| **`data-lm-f-content`** | `string` | If footer mode is 'custom' and you just need to display simple text content then use this attribute to pass the footer content. But, if your custom footer contains html markup, then use the `data-lm-f-template-id` attribute below.  |
| **`data-lm-f-template-id`** | `string \| null` | A <template> element id to use as footer content source.As long as a <template> element with given id exists, its inner html will automatically be pulled as footer content.  |
| **`data-lm-f-on-ok`** | `string \| null` | A callback function name as footer ok button click handler. As long as the function exists globally, then executes the function when footer ok button is clicked.  |
| **`data-lm-b-css-class`** | `string \| null` | Css classes to pass to modal body element.  |
| **`data-lm-b-content-type`** | `string` | On of the values from this list ['function', 'html', 'iframe', 'image', 'ajax', 'youtube-video', 'template']. The parameters below only relates to particular content type. Default: `"html"` |
| **`data-lm-b-content`** | `string` | When content type is `html` and target content is simple text that can be safely inserted as attribute value. Pass the text in here.  |
| **`data-lm-b-template-id`** | `string` | A template element id. Applicable only when content type is `template`  |
| **`data-lm-b-function-name`** | `string` | A global function name, when content type is `function`. If function not found, an error message will be set as modal content.  |
| **`data-lm-b-function-args`** | `string` | Optional arguments passed to the function above. You can pass anything as string as parameter. So, JSON encoded data is also valid. Just make sure to properly encode data so that it does become valid attribute value.  |
| **`data-lm-b-video-url`** | `string` |  Default: `"An youtube video or shorts url. As long as it is embeddable, it will display and be ready to play. For video and image, if you hide header and footer and set body padding to 0, you will have a full video or image in the popup! Also, in video and image mode you can pass the aspect ratio using `data-lm-b-aspect-ratio` attribute, so they can keep their original aspect ratio and scale well based on width or height."` |
| **`data-lm-b-aspect-ratio`** | `string \| null` | Effective for video and image content. Helps with preserving image and video aspect. For video it is usually 16/9, and shorts it's 9/16. For image, it varies, you just need to calculate it based on image width and height.  |
| **`data-lm-b-image-url`** | `string \| null` | For content type `image`. Pass in the image url here.  |
| **`data-lm-b-ajax-url`** | `string` | Ajax URL when content type is `ajax`. This is a required field. Can be any absolute or relative url. If the url is originating from different domain, you many need to configure CORS headers for it.  |
| **`data-lm-b-ajax-method`** | `string` |  Default: `"get"` |
| **`data-lm-b-ajax-content-data-type`** | `string` | Expected content data type. Either html or json. Default: `"html"` |
| **`data-lm-b-ajax-data`** | `string` | AJAX request data as URL encoded data string compatible with `application/x-www-form-urlencoded`. You can set request data for any method here. For GET method it will turn into query params.  |
| **`data-lm-b-ajax-transform-json`** | `string \| null` | A global function name that acts as JSON data transformer. This function is responsible for transforming JSON data to html markup. This is required if content data type is ajax.  |
| **`data-lm-b-ajax-transform-html`** | `string \| null` | An optional global function name that acts as HTML content transformer. This function is responsible for transforming HTML data before it can be used as modal content.  |