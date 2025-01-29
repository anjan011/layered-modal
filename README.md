# layered-modal

Layered modal is yet another popup, with added stacking management, which allows you multiple modals stacked over each
other. If you are looking for a single popup, you are still covered, with plenty of features like -

1. Optional header and footer for the popup
2. Different content types including: html content, content from a &lt;template&gt; element, image, YouTube video, including
   shorts and content via AJAX.
3. Popup positioning to all 9 grids of the screen from top-left to bottom-right!
4. Support for inline css styles and additional css classes for modal header, body and footer.
5. Different footer mode: including alert, confirm and custom. Which lets you easily turn your modal into an alert
   dialog, confirm dialog or place your own custom content in the footer.

# installation

About installation ...

# Usage

### Use as ESM or ES6 module -

```javascript
<script type="module">
    
    import {ModalManager} from "./dist/bundle.min.esm.js";
    
    /**
    * Step 1 : Initilize the modal manager instance
    */
    
    const modalManager = new ModalManager({
        // manager parameters ...
    });
    
    /*
    * Step 2 : Display the modal by calling addModal method
    */
    
    modalManager.addModal({
        // modal params ...
    });
    
</script>
```

### In browser

```javascript
<script src="./dist/bundle.min.umd.js"></script>

<script>
    const managerUmd = new LayeredModalSystem.ModalManager({
        // manager parameters ...
    });

    document.getElementById('some-trigger-element')?.addEventListener('click',() => {
    
        managerUmd.addModal({
            // modal params ...
        });
    
    });
    
</script>

```

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

## ⚙️ Modal Configuration Options

The `Modal` class allows customization through the parameters below. Do note that, modals should only be created through the `ModalManager` class instance!

### **Available Options:**

| Option Name | Type | Description |
|------------|------|-------------|
| **`id`** | `string` | An unique ID used assigned to the modal. This id is used to generate various UI component ids, like the modal overlay, modal dialog itself, etc. If empty or not provided, an unique identifier in this format xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx is generated.  |
| **`zIndex`** | `number` | this zIndex value is passed by the ModalManager instance, so you cannot directly set a zIndex value for a modal instance. Thus it reduces unwanted zIndex mess up. Each new modal gets it's zIndex calculated based on modal manager's base zIndex and it's current position in stack.  |
| **`header`** | `object` | The header section configuration. See below for all available parameters. All parameter below starting with header. belongs to header configuration object. These header.* parameter names follow javascript object key access format. Please DO NOT use the header.* parameters as they are! It wont work.  |
| **`header.enabled`** | `boolean` | If not set to true, the header section will not be generated. Default: `true` |
| **`header.title`** | `string` | The title text for the header section Default: `"Modal title"` |
| **`header.titleTag`** | `string` | The html tag name for title. Defaults to h2. Default: `"h2"` |
| **`header.content`** | `string` | If you dont want title and replace it with custom content, pass the custom html content for header here.  |
| **`header.cssClass`** | `string` | Additional css class for header  |
| **`header.inlineStyles`** | `string` | Additional inline css styles for header  |
| **`footer`** | `object` | The footer section configuration. See below for all available parameters. All parameter below starting with footer. belongs to footer configuration object. These footer.* parameter names follow javascript object key access format. Please DO NOT use the footer.* parameters as they are! It wont work.  |
| **`footer.enabled`** | `boolean` | If true footer will be generated. Default: `true` |
| **`footer.mode`** | `string` | Footer has 3 different modes: alert, confirm and custom. The default is the alert. In alert mode footer only generates a close button centered inside the footer area. You can configure this close button using footer.closeButton.* parameters. In confirm mode a close button and an ok button is generated which are spaced around the footer area, making it a confirm dialog. Like the close button you can configure ok button using footer.okButton.* parameters. In custom mode you are responsible to provide the content for the footer section. Default: `"alert"` |
| **`footer.content`** | `string` | When footer.mode is set to custom, this parameter is where you set your custom footer content.  |
| **`footer.onOk`** | `function \| null` | Footer ok button click event callback. This only applies if footer mode is set to confirm or in your custom content there is an element with cssClass.modalOk css class. In here you can handle any processing that should happen when the ok button is clicked. Note that inside onOk callback this refers to the Modal object. So, you can make use of it to access modal DOM elements, and hiding the modal when done.  |
| **`footer.cssClass`** | `string` | Additional css classes to be passed to footer element.  |
| **`footer.inlineStyles`** | `string` | Additional inline css styles to be passed to footer element.  |
| **`footer.okButton`** | `object` | The Ok button configuration. All footer.okButton.* params belongs to this object Default: `"-"` |
| **`footer.okButton.text`** | `string` | Ok button text. Defaults to Ok. Change this to your liking. Default: `"Ok"` |
| **`footer.okButton.cssClass`** | `string` | Additional css class for OK button. If you want to use your own button style matching your theme this is the right place for you.  |
| **`footer.okButton.inlineStyles`** | `string` | Pass on inline css styles to the Ok button  |
| **`footer.okButton.iconClass`** | `string` | Use a font icon class. For example any font-awesome icon class.  |
| **`footer.okButton.iconPosition`** | `string` | Place the icon on left or right. Default is left. Default: `"left"` |
| **`footer.closeButton`** | `object` | The Close button configuration. All footer.closeButton.* params belongs to this object Default: `"-"` |
| **`footer.closeButton.text`** | `string` | Close button text. Defaults to Close. Change this to your liking. Default: `"Close"` |
| **`footer.closeButton.cssClass`** | `string` | Additional css class for OK button. If you want to use your own button style matching your theme this is the right place for you.  |
| **`footer.closeButton.inlineStyles`** | `string` | Pass on inline css styles to the Close button  |
| **`footer.closeButton.iconClass`** | `string` | Use a font icon class. For example any font-awesome icon class.  |
| **`footer.closeButton.iconPosition`** | `string` | Place the icon on left or right. Default is left. Default: `"left"` |
| **`autoWidth`** | `boolean \| null` | Should the modal be as wide as the content? If set to true, the width parameter will be ignored! Default: `"false"` |
| **`width`** | `object \| null` | The width object, it will be ignored if autoWidth is set to true. Default: `"-"` |
| **`width.value`** | `number` | The width value  |
| **`width.unit`** | `string` | The width unit. Can be px/vw or any other css unit applicable. Default: `"px"` |
| **`maxWidth`** | `object \| null` | The maximum width object. If set modal width will not surpass given value. Default: `"-"` |
| **`maxWidth.value`** | `number` | The maximum width value  |
| **`maxWidth.unit`** | `string` | The maximum width unit. Can be px/vw or any other css unit applicable. Default: `"px"` |
| **`minWidth`** | `object \| null` | The minimum width object. If set modal width will at least be equal to this value. Default: `"-"` |
| **`minWidth.value`** | `number` | The minimum width value  |
| **`minWidth.unit`** | `string` | The minimum width unit. Can be px/vw or any other css unit applicable. Default: `"px"` |
| **`autoHeight`** | `boolean \| null` | Should the modal be as high as the content? If set to true, the height parameter will be ignored! Default: `"false"` |
| **`height`** | `object \| null` | The height object, it will be ignored if autoHeight is set to true. Default: `"-"` |
| **`height.value`** | `number` | The height value  |
| **`height.unit`** | `string` | The height unit. Can be px/vw or any other css unit applicable. Default: `"px"` |
| **`maxHeight`** | `object \| null` | The maximum height object. If set modal height will not surpass given value. Default: `"-"` |
| **`maxHeight.value`** | `number` | The maximum height value  |
| **`maxHeight.unit`** | `string` | The maximum height unit. Can be px/vw or any other css unit applicable. Default: `"px"` |
| **`minHeight`** | `object \| null` | The minimum height object. If set modal height will at least be equal to this value. Default: `"-"` |
| **`minHeight.value`** | `number` | The minimum height value  |
| **`minHeight.unit`** | `string` | The minimum height unit. Can be px/vw or any other css unit applicable. Default: `"px"` |
| **`position`** | `string` | Determines the modal dialog's position on the screen. It has one of these 9 possible values ['top-left', 'top-center', 'top-right', 'middle-left', 'middle-center', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right']. Using one of these values you can control where the modal will show up. For example using bottom-right option, you can display the modal at the bottom right corner. A good position to display if the visitor want's to subscribe to a newsletter or something. Though most of the time you will want the modal to be centered in screen, but some time you may want to do otherwise. Default: `"middle-center"` |
| **`shiftDistance`** | `object` | This shift distance is internally used by the modal, in conjunction with the modal manager's baseShiftDistance param to calculate if the modal needs to be shifted from it's original position. This cannot be used to configure a specific modal's shifting distance. Default: `"-"` |
| **`transitionDuration`** | `number` | The duration in milliseconds for the fade in/out animation to complete. You can pass in 0 to disable the fading animation. This can also be configured for each individual modal instance.  |
| **`cssClass`** | `object` | An object that accepts additional css classes for modal dialog, ok and close buttons. This object combines the class names from modal manager's cssClass parameter objects. So in modal manager's cssClass object you can specify all css classes common for all modals, then in each modal you can assign unique classes to alter look and feel for each modal. Default: `"-"` |
| **`cssClass.modal`** | `string` | Additional css class names for modal dialog  |
| **`cssClass.modalOk`** | `string` | Additional css class names for modal ok button in footer Default: `"modal-ok"` |
| **`cssClass.modalClose`** | `string` | Additional css class names for modal close button in footer Default: `"modal-close"` |
| **`onShow`** | `function \| null` | A callback which is called after modal is displayed in the page. It is fired after modal is added in DOM and animations ended. This is the perfect place to bind any events or transform any UI elements. For example beautifying select elements with custom components etc.  |
| **`onHide`** | `function \| null` | A callback which is called after modal removed from DOM. Its is where you can cleanup any resources that pertains to this modal instance.  |
| **`draggable`** | `boolean` | Determines whether or not modal is draggable.  |
| **`dragHandle`** | `string` | The element to be used as drag handle. If not provided or empty, the modal header will become the drag handle. If header is not available, then entire modal becomes drag handle. If a value is provided, it will be treated as an element id. If the element is found it will be used as drag handle. Else, the modal itself becomes drag handle, that is you can click and drag anywhere on the modal dialog. Dragging is an experimental feature!  |
| **`userSelect`** | `boolean` | Enables user to select text content on the modal. By default it is disabled, so user's cannot select select text on the modal.  |
| **`xButton`** | `object` | The close or X button settings for this modal instance. the modal manager's xButton parameter object defines common X button content and styling. And, this xButton object affects this modal's X button only.  |
| **`xButton.enabled`** | `boolean` | Enable the close button or X button Default: `true` |
| **`xButton.content`** | `string` | The button content. Defaults to X character. But you can provide any content you like, including text, image and font icons. Default: `"X"` |
| **`xButton.cssClass`** | `string` | Additional css classes for the button  |
| **`xButton.cssClass`** | `string` | Additional css classes for the button  |
| **`xButton.inlineStyles`** | `string` | Additional css inline styles for the button  |
| **`delayInMilliSeconds`** | `integer` | By specifying a delay in milliseconds you can make the modal delay it's display and after display actions, like event bindings. You can use this in scenarios, where you need to display a popup N seconds after page loads.  |
| **`backDrop`** | `object \| null` | Modal back drop. This element is a fixed positioned div element, that covers entire visible viewport. And, this also acts as the parent container of the modal dialog.  |
| **`bgColor`** | `string` | A color that can have alpha transparency. like the rgba format. This acts as back drop's background color.  |
| **`opacity`** | `number` | The backdrop opacity. Do note that, having opacity less than 1, will turn entire backdrop including the modal dialog with transparent! So use this carefully. Default: `1` |
| **`body`** | `object` | The mandatory modal content configuration object. Modal header and footer can be omitted, but body object must be present. See all the body.* parameters below to learn about what it supports. Default: `"-"` |
| **`body.contentType`** | `string` | The modal content type. Any one of these values are supported: ['html', 'iframe', 'function', 'ajax', 'image', 'youtube-video', 'template']. Defaults to 'html'. Default: `"html"` |
| **`body.content`** | `string` | when body.contentType === 'html', use this to provide the modal with html markup as string to display inside modal body.  |
| **`body.iframeCode`** | `string` | The iframe embed code when body.contentType === 'iframe'. The embed code must be valid with &lt;iframe&gt; tag present. A check is made for validity using regex.  |
| **`body.functionName`** | `function \| string` | If body.contentType === 'function', use this property to supply the modal with a JS function or a valid function name that is available on global content. This is required!  |
| **`body.functionArguments`** | `any` | If body.functionName is the name of the function, then any arguments to be passed to body.functionName. Can be any thing.  |
| **`body.ajaxParams`** | `object` | if body.contentType === 'ajax', this is where you pass the ajax related options. See detailed parameters below.  |
| **`body.ajaxParams.contentDataType`** | `string` | The response format from the AJAX call. Can only be json or html. Default is html. Default: `"html"` |
| **`body.ajaxParams.url`** | `string` | AJAX url to load. Must be a valid http URL  |
| **`body.ajaxParams.method`** | `string` | The http method for this ajax call. can be any http method. Default: `"GET"` |
| **`body.ajaxParams.header`** | `object` | An object containing http headers. Header names as this object's key and header value as property value. For example: {'Content-Type' : 'application/json'}  |
| **`body.ajaxParams.transformHtml`** | `function \| null` | A transformer method that can further process or transform loaded html content via ajax. This can be a function or global function name. The function must return content as string, usually the processed modal body content markup.  |
| **`body.ajaxParams.transformJson`** | `function \| null` | Similar to body.ajaxParams.transformHtml, but for JSON data. Same rules apply.  |
| **`body.ajaxParams.timeoutMs`** | `integer` | Timeout in milliseconds till the ajax operation aborts. Defaults to 30 seconds or 30000 milliseconds. Adjust this timeout based on your requirements or expectations. Default: `30000` |
| **`body.ajaxParams.decodeParams`** | `boolean` | if the http method is GET, then removes the encoding from ajax url. While this may be desired from some cases, but for most cases you should keep the url with query params encoded so that the url can remain safe. Just added this for edge cases, where it may be required.  |
| **`body.ajaxParams.data`** | `FormData \| object \| null` | AJAX request data. Data can be a plain object or FormData. Note that as of now, file upload using FormData is not supported. This data can be used for any HTTP methods. if used for GET, it will turn into query params.  |
| **`body.imageParams`** | `object` | Required only if body.contentType === 'image'. See options below.  |
| **`body.imageParams.url`** | `string` | Image url. Required.  |
| **`body.imageParams.alt`** | `string` | Image alt text.  |
| **`body.imageParams.title`** | `string` | Image title.  |
| **`body.imageParams.cssClass`** | `string` | Additional image css class  |
| **`body.imageParams.inlineStyles`** | `string` | Additional css inline styles for the image  |
| **`body.imageParams.caption`** | `string` | Caption content to be displayed at the bottom of the image.  |
| **`body.imageParams.captionTemplate`** | `string` | If a valid &lt;template&gt; element ID is provided, that template's content is used as caption content. In this case the usual caption parameter above is ignored.  |
| **`body.imageParams.captionCssClass`** | `string` | Additional css classes to be added to caption element.  |
| **`body.cssClass`** | `string` | Additional css classes to be added to modal body.  |
| **`body.inlineStyles`** | `string` | Additional css inline styles to be added to modal body.  |
| **`body.videoUrl`** | `string` | If body.contentType === 'youtube-video', pass the video url here. As of now only YouTube video urls are supported, including shorts.  |
| **`body.templateId`** | `string` | ID of a &lt;template&gt; element. Usable when body.contentType === 'template'. In this case the template element content becomes the modal body content.  |

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
| **`data-lm-f-template-id`** | `string \| null` | A &lt;template&gt; element id to use as footer content source.As long as a &lt;template&gt; element with given id exists, its inner html will automatically be pulled as footer content.  |
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