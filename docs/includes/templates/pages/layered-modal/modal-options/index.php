<div class="content">
    <p>The <code>Modal</code> class allows customization through the parameters below. Do note that, modals should only
        be created through the <code>ModalManager</code> class instance!</p>
    <h3 id="-available-options-"><strong>Available Options:</strong></h3>

    <div class="table-container">

        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Option Name</th>
                    <th style="width: 160px;">Type</th>
                    <th>Default</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong><code>id</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>An unique ID used assigned to the modal. This id is used to generate various UI component ids,
                        like the modal overlay, modal dialog itself, etc. If empty or not provided, an unique identifier
                        in uuid v4 format (xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx) is generated.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>header</code></strong></td>
                    <td><code>object | null</code></td>
                    <td><code>null</code></td>
                    <td>The header section configuration. See below for all available parameters.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>header.enabled</code></strong></td>
                    <td><code>boolean | null</code></td>
                    <td><code>false</code></td>
                    <td>If set to true, the header section will be generated.</td>
                </tr>
                <tr>
                    <td><strong><code>header.title</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>Modal Title</code></td>
                    <td>The title text for the header section. Have no effect if <code>header.enabled</code> is null or
                        false, as in this case the header wont be visible.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>header.titleTag</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>h2</code></td>
                    <td>The html tag name for title.</td>
                </tr>
                <tr>
                    <td><strong><code>header.content</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>

                    <td>If provided the header will use this content instead of generating a simple title.</td>
                </tr>
                <tr>
                    <td><strong><code>header.cssClass</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>Additional css class to be added to header</td>
                </tr>
                <tr>
                    <td><strong><code>header.inlineStyles</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>Additional inline css styles for header</td>
                </tr>
                <tr>
                    <td><strong><code>footer</code></strong></td>
                    <td><code>object | null</code></td>
                    <td><code>null</code></td>
                    <td>The footer section configuration. See below for all available parameters. All parameter below
                        starting with footer. belongs to footer configuration object. These footer.<em> parameter names
                            follow javascript object key access format. Please DO NOT use the footer.</em> parameters as
                        they are! It wont work.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>footer.enabled</code></strong></td>
                    <td><code>boolean | null</code></td>
                    <td><code>false</code></td>
                    <td>If true footer will be generated.</td>
                </tr>
                <tr>
                    <td><strong><code>footer.mode</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>alert</code></td>
                    <td>Footer has 3 different modes: <code>alert</code>, <code>confirm</code> and <code>custom</code>.
                        The default is the <code>alert</code>. In alert mode footer only generates a close button
                        centered inside the footer area. You can configure this close button using
                        footer.closeButton.<em> parameters. In confirm mode a close button and an ok button is generated
                            which are spaced around the footer area, making it a confirm dialog. Like the close button
                            you can configure ok button using footer.okButton.</em> parameters. In custom mode you are
                        responsible to provide the content for the footer section.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>footer.content</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>When <code>footer.mode</code> is set to <code>custom</code>, this parameter is where you set
                        your custom footer content.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>footer.onOk</code></strong></td>
                    <td><code>Function | null</code></td>
                    <td><code>null</code></td>
                    <td>Footer ok button click event callback. This only applies if footer mode is set to
                        <code>confirm</code> or in your custom content there is an element with
                        <code>cssClass.modalOk</code> css class. In here you can handle any processing that should
                        happen when the ok button is clicked. Note that inside onOk callback this refers to the Modal
                        object. So, you can make use of it to access modal DOM elements, and hiding the modal when done.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>footer.cssClass</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>Additional css classes to be passed to footer element.</td>
                </tr>
                <tr>
                    <td><strong><code>footer.inlineStyles</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>Additional inline css styles to be passed to footer element.</td>
                </tr>
                <tr>
                    <td><strong><code>footer.okButton</code></strong></td>
                    <td><code>object | null</code></td>
                    <td><code>null</code></td>
                    <td>The Ok button configuration. All <code>footer.okButton.*</code> params belongs to this object.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>footer.okButton.text</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>Ok</code></td>
                    <td>Ok button text.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>footer.okButton.cssClass</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>Additional css class for OK button. If you want to use your own button style matching your theme this is the right place for you.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>footer.okButton.inlineStyles</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>Pass on inline css styles to the Ok button</td>
                </tr>
                <tr>
                    <td><strong><code>footer.okButton.iconClass</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>Use a font icon class. For example any font-awesome icon class.</td>
                </tr>
                <tr>
                    <td><strong><code>footer.okButton.iconPosition</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>left</code></td>
                    <td>Place the icon on left or right.</td>
                </tr>
                <tr>
                    <td><strong><code>footer.closeButton</code></strong></td>
                    <td><code>object | null</code></td>
                    <td><code>null</code></td>
                    <td>The Close button configuration. All <code>footer.closeButton.*</code> params belongs to this object.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>footer.closeButton.text</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>Close</code></td>
                    <td>Close button text.</td>
                </tr>
                <tr>
                    <td><strong><code>footer.closeButton.cssClass</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>Additional css class for close button. If you want to use your own button style matching your theme this is the right place for you.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>footer.closeButton.inlineStyles</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>Pass on inline css styles to the Close button</td>
                </tr>
                <tr>
                    <td><strong><code>footer.closeButton.iconClass</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>Use a font icon class. For example any font-awesome icon class.</td>
                </tr>
                <tr>
                    <td><strong><code>footer.closeButton.iconPosition</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>Place the icon on left or right. Default is left.</td>
                </tr>
                <tr>
                    <td><strong><code>autoWidth</code></strong></td>
                    <td><code>boolean | null</code></td>
                    <td><code>true</code></td>
                    <td>Should the modal be as wide as the content?</td>
                </tr>
                <tr>
                    <td><strong><code>width</code></strong></td>
                    <td><code>object | null</code></td>
                    <td><code>null</code></td>
                    <td>The width object, If a <code>width.value</code> > 0 is provied, the <code>autoWidth</code> is set to false.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>width.value</code></strong></td>
                    <td><code>number | null</code></td>
                    <td><code>null</code></td>
                    <td>The width value. If not provided or value is <= 0, then autoWidth is set to true.</td>
                </tr>
                <tr>
                    <td><strong><code>width.unit</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>px</code></td>
                    <td>The width unit. Any valid css unit is allowed.</td>
                </tr>
                <tr>
                    <td><strong><code>maxWidth</code></strong></td>
                    <td><code>object | null</code></td>
                    <td><code>null</code></td>
                    <td>The maximum width object. Defaults to <code>{value : 90, unit : 'vw'}</code></td>
                </tr>
                <tr>
                    <td><strong><code>maxWidth.value</code></strong></td>
                    <td><code>number | null</code></td>
                    <td><code>90</code></td>
                    <td>The maximum width value</td>
                </tr>
                <tr>
                    <td><strong><code>maxWidth.unit</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>vw</code></td>
                    <td>The maximum width unit. Can be any valid css unit.</td>
                </tr>
                <tr>
                    <td><strong><code>minWidth</code></strong></td>
                    <td><code>object | null</code></td>
                    <td><code>null</code></td>
                    <td>The minimum width object. If not provided defaults to 0</td>
                </tr>
                <tr>
                    <td><strong><code>minWidth.value</code></strong></td>
                    <td><code>number | null</code></td>
                    <td><code>0</code></td>
                    <td>The minimum width value</td>
                </tr>
                <tr>
                    <td><strong><code>minWidth.unit</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>The minimum width unit.</td>
                </tr>
                <tr>
                    <td><strong><code>autoHeight</code></strong></td>
                    <td><code>boolean | null</code></td>
                    <td><code>true</code></td>
                    <td>Should the modal be as high as the content?</td>
                </tr>
                <tr>
                    <td><strong><code>height</code></strong></td>
                    <td><code>object | null</code></td>
                    <td><code>null</code></td>
                    <td>The height object, A valid unit value of >= 0 will set autoHeight to false.</td>
                </tr>
                <tr>
                    <td><strong><code>height.value</code></strong></td>
                    <td><code>number | null</code></td>
                    <td><code>null</code></td>
                    <td>The height value</td>
                </tr>
                <tr>
                    <td><strong><code>height.unit</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>px</code></td>
                    <td>The height unit. Any valid css unit supported.</td>
                </tr>
                <tr>
                    <td><strong><code>maxHeight</code></strong></td>
                    <td><code>object | null</code></td>
                    <td><code>null</code></td>
                    <td>The maximum height object. Defaults to <code>{value : 90, unit : 'vh'}</code></td>
                </tr>
                <tr>
                    <td><strong><code>maxHeight.value</code></strong></td>
                    <td><code>number | null</code></td>
                    <td><code>90</code></td>
                    <td>The maximum height value</td>
                </tr>
                <tr>
                    <td><strong><code>maxHeight.unit</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>vh</code></td>
                    <td>The maximum height unit.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>minHeight</code></strong></td>
                    <td><code>object | null</code></td>
                    <td><code>null</code></td>
                    <td>The minimum height object.</td>
                </tr>
                <tr>
                    <td><strong><code>minHeight.value</code></strong></td>
                    <td><code>number | null</code></td>
                    <td><code>0</code></td>
                    <td>The minimum height value</td>
                </tr>
                <tr>
                    <td><strong><code>minHeight.unit</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>The minimum height unit.</td>
                </tr>
                <tr>
                    <td><strong><code>position</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>middle-center</code></td>
                    <td>Determines the modal dialog's position in the screen. Can be one of these values -
                        <?php
                            echo join(', ', array_map(function ($pos) {
                                return "<code>$pos</code>";
                            }, ["top-left", "top-center", "top-right", "middle-left", "middle-center", "middle-right", "bottom-left", "bottom-center", "bottom-right"]));
                        ?>

                    </td>
                </tr>
                <tr>
                    <td><strong><code>transitionDuration</code></strong></td>
                    <td><code>number | null</code></td>
                    <td><code>null</code></td>
                    <td>The duration in milliseconds for the fade in/out animation to complete. You can pass in 0 to disable the fading animation. This can also be configured for each individual modal instance.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>cssClass</code></strong></td>
                    <td><code>object | null</code></td>
                    <td><code>null</code></td>
                    <td>An object that accepts additional css classes for modal dialog, ok and close buttons. This object combines the class names from modal manager&#39;s cssClass parameter objects. So in modal manager's cssClass object you can specify all css classes common for all modals, then in each modal you can assign unique classes to alter look and feel for each modal.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>cssClass.modal</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>Additional css class names for modal dialog element</td>
                </tr>
                <tr>
                    <td><strong><code>cssClass.modalOk</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>Additional css class names for modal ok button in footer. Applicable only when <code>footer.mode</code> is <code>confirm</code> or <code>custom</code>, where an ok button can be present.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>cssClass.modalClose</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>Additional css class names for modal close button in footer. Applicable in any footer mode.</td>
                </tr>
                <tr>
                    <td><strong><code>onShow</code></strong></td>
                    <td><code>Function | string | null</code></td>
                    <td><code>null</code></td>
                    <td>A callback function or valid global function name called when modal is added to be DOM. This is perfect place if you need to bind events to modal content elements or transform them.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>onHide</code></strong></td>
                    <td><code>Function | string | null</code></td>
                    <td><code>null</code></td>
                    <td>A callback function or global function name which is called after modal removed from DOM. Its is where you can cleanup any resources that pertains to this modal instance.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>draggable</code></strong></td>
                    <td><code>boolean | null</code></td>
                    <td><code>false</code></td>
                    <td>Determines whether or not modal is draggable. <strong>Note:</strong> currently drag feature is in beta, you can always just turn this off and use other library for dragging support.</td>
                </tr>
                <tr>
                    <td><strong><code>dragHandle</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>The element to be used as drag handle. If not provided or empty, the modal header will become the drag handle. If header is not available, then entire modal becomes drag handle. If a value is provided, it will be treated as an element id. If the element is found it will be used as drag handle. Else, the modal itself becomes drag handle, that is you can click and drag anywhere on the modal dialog. Dragging is an experimental feature!
                    </td>
                </tr>
                <tr>
                    <td><strong><code>userSelect</code></strong></td>
                    <td><code>boolean | null</code></td>
                    <td><code>false</code></td>
                    <td>Enables user to select text content on the modal. By default it is disabled, so user's cannot select select text on the modal. Make sure to set this to true if you need to allow user's copy content from inside the modal.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>xButton</code></strong></td>
                    <td><code>object | null</code></td>
                    <td><code>null</code></td>
                    <td>The close or X button settings for this modal instance. the modal manager's xButton parameter object defines common X button content and styling. And, this xButton object affects this modal's X button only.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>xButton.enabled</code></strong></td>
                    <td><code>boolean | null</code></td>
                    <td><code>true</code></td>
                    <td>Enable the close button or X button</td>
                </tr>
                <tr>
                    <td><strong><code>xButton.content</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>The button content. Defaults to X character. But you can provide any content you like, including text, image and font icons.</td>
                </tr>
                <tr>
                    <td><strong><code>xButton.cssClass</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>Additional css classes for the button</td>
                </tr>
                <tr>
                    <td><strong><code>xButton.cssClass</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>Additional css classes for the button</td>
                </tr>
                <tr>
                    <td><strong><code>xButton.inlineStyles</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>Additional css inline styles for the button</td>
                </tr>
                <tr>
                    <td><strong><code>delayInMilliSeconds</code></strong></td>
                    <td><code>integer | null</code></td>
                    <td><code>0</code></td>
                    <td>By specifying a delay in milliseconds you can make the modal delay it's display and after display actions, like event bindings. You can use this in scenarios, where you need to display a popup N seconds after page loads.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>backDrop</code></strong></td>
                    <td><code>object | null</code></td>
                    <td><code>null</code></td>
                    <td>Modal back drop. This element is a fixed positioned div element, that covers entire visible viewport. And, this also acts as the parent container of the modal dialog.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>bgColor</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>rgba(0,0,0,0.5)</code></td>
                    <td>A color that can have alpha transparency. like the rgba format. This acts as back drop's background color.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>opacity</code></strong></td>
                    <td><code>number | null</code></td>
                    <td><code>1</code></td>
                    <td>The backdrop opacity. Do note that, having opacity less than 1, will turn entire backdrop including the modal dialog with transparent! So use this carefully. </td>
                </tr>
                <tr>
                    <td><strong><code>body</code></strong></td>
                    <td><code>object | null</code></td>
                    <td><code>null</code></td>
                    <td>The mandatory modal content configuration object. Modal header and footer can be omitted, but body object must be present. See all the body.* parameters below to learn about what it supports.</td>
                </tr>
                <tr>
                    <td><strong><code>body.contentType</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>html</code></td>
                    <td>The modal content type. Any one of these values are supported:

                        <?php
                            echo join(', ', array_map(function ($pos) {
                                return "<code>$pos</code>";
                            }, ["function", "html", "iframe", "image", "ajax", "youtube-video", "template"]));
                        ?>

                    </td>
                </tr>
                <tr>
                    <td><strong><code>body.content</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>

                    <td>Only when content type is <code>html</code> pass the html markup here.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>body.iframeCode</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>
                        When content type is <code>iframe</code> pass the iframe code here. The iframe code is checked using regex for validity.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>body.functionName</code></strong></td>
                    <td><code>Function | string | null</code></td>
                    <td><code>null</code></td>
                    <td>If content type is <code>function</code>, use this property to supply the modal with a JS function or a valid function name that is available on global content. This is required!
                    </td>
                </tr>
                <tr>
                    <td><strong><code>body.functionArguments</code></strong></td>
                    <td><code>any | null</code></td>
                    <td><code>null</code></td>
                    <td>If <code>body.functionName</code> is the name of the function, then any arguments to be passed to body.functionName. Can be any thing.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>body.ajaxParams</code></strong></td>
                    <td><code>object | null</code></td>
                    <td><code>null</code></td>
                    <td>If content type is <code>ajax</code>, this is where you pass the ajax related options. The ajax uses browser fetch() .See detailed parameters below.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>body.ajaxParams.contentDataType</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>html</code></td>
                    <td>The response format from the AJAX call. Can only be <code>json</code> or <code>html</code>.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>body.ajaxParams.url</code></strong></td>
                    <td><code>string</code></td>
                    <td></td>
                    <td><kbd>Required!</kbd> AJAX url to load. Must be a valid http URL</td>
                </tr>
                <tr>
                    <td><strong><code>body.ajaxParams.method</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>get</code></td>
                    <td>The http method for this ajax call. can be any http method.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>body.ajaxParams.header</code></strong></td>
                    <td><code>object | null</code></td>
                    <td><code>null</code></td>
                    <td>An plain object containing http headers. For example: <code>{"Content-Type" : "application/json", "X-Requester" : "LayeredModal" }</code>
                    </td>
                </tr>
                <tr>
                    <td><strong><code>body.ajaxParams.transformHtml</code></strong></td>
                    <td><code>Function | string | null</code></td>
                    <td><code>null</code></td>
                    <td>A transformer method that can further process or transform loaded html content via ajax. This can be a function or global function name. The function must return content as string which is used as modal content.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>body.ajaxParams.transformJson</code></strong></td>
                    <td><code>Function | string | null</code></td>
                    <td><code>null</code></td>
                    <td>Similar to body.ajaxParams.transformHtml, but for JSON data. Same rules apply. <kbd>Required!</kbd> if content data type is json.</td>
                </tr>
                <tr>
                    <td><strong><code>body.ajaxParams.timeoutMs</code></strong></td>
                    <td><code>integer | null</code></td>
                    <td><code>30000</code></td>
                    <td>Timeout in milliseconds till the ajax operation aborts. Defaults to 30 seconds or 30000 milliseconds. Adjust this timeout based on your requirements or expectations.</td>
                </tr>
                <tr>
                    <td><strong><code>body.ajaxParams.decodeParams</code></strong></td>
                    <td><code>boolean | null</code></td>
                    <td><code>null</code></td>
                    <td>if the http method is GET, then removes the encoding from ajax url. While this may be desired from some cases, but for most cases you should keep the url with query params encoded so that the url can remain safe. Just added this for edge cases, where it may be required.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>body.ajaxParams.data</code></strong></td>
                    <td><code>object | FormData | null</code></td>
                    <td><code>null</code></td>
                    <td>AJAX request data. Data can be a plain object or FormData. Note that as of now, file upload using FormData is not supported. This data can be used for any HTTP methods. if used for GET, it will turn into query params.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>body.imageParams</code></strong></td>
                    <td><code>object | null</code></td>
                    <td><code>null</code></td>
                    <td>Required only content type is <code>image</code>. See options below.</td>
                </tr>
                <tr>
                    <td><strong><code>body.imageParams.url</code></strong></td>
                    <td><code>string</code></td>
                    <td><code></code></td>
                    <td><kbd>Required!</kbd> Image url.</td>
                </tr>
                <tr>
                    <td><strong><code>body.imageParams.alt</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>Image alt text.</td>
                </tr>
                <tr>
                    <td><strong><code>body.imageParams.title</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>Image title.</td>
                </tr>
                <tr>
                    <td><strong><code>body.imageParams.cssClass</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>Additional image css class</td>
                </tr>
                <tr>
                    <td><strong><code>body.imageParams.inlineStyles</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>Additional css inline styles for the image</td>
                </tr>
                <tr>
                    <td><strong><code>body.imageParams.caption</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>Caption content to be displayed at the bottom of the image.</td>
                </tr>
                <tr>
                    <td><strong><code>body.imageParams.captionTemplate</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>If a valid <?= htmlentities('<template>')?> element ID is provided, that template's content is used as caption content. In this case the usual <code>caption</code> parameter above is ignored.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>body.imageParams.captionCssClass</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>Additional css classes to be added to caption element.</td>
                </tr>
                <tr>
                    <td><strong><code>body.cssClass</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>Additional css classes to be added to modal body. For example <code>no-padding</code> to remove padding from body. Useful for content types: <code>image</code>, <code>iframe</code>, <code>youtube-video</code>, etc.</td>
                </tr>
                <tr>
                    <td><strong><code>body.inlineStyles</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>Additional css inline styles to be added to modal body.</td>
                </tr>
                <tr>
                    <td><strong><code>body.videoUrl</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>If content type is <code>youtube-video</code>, pass the video url here. As of now only YouTube video urls are supported, including shorts.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>body.templateId</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>ID of a <?= htmlentities('<template>')?> element. Usable when only when body content type is <code>template</code>. In this case the template element content becomes the modal body content.
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</div>