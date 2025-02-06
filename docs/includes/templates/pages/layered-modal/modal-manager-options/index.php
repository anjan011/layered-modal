<div class="content">
    <p>The <code>ModalManager</code> class allows customization through various options. Below are the available
        parameters you can set
        when initializing the manager.</p>
    <h3 id="-available-options-"><strong>Available Options:</strong></h3>

    <div class="table-container">

        <table class="table table-bordered table-striped">
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
                    <td><strong><code>zIndex</code></strong></td>
                    <td><code>integer</code></td>
                    <td><code>1</code></td>
                    <td>Base zIndex value for entire layered modal system. the modals will be displayed using this zIndex as base. Each modal in stack will have their zIndex value increased by 1.
                </tr>
                <tr>
                    <td><strong><code>baseShiftDistance</code></strong></td>
                    <td><code>object | null</code></td>
                    <td><code>null</code></td>
                    <td>The layered modal system using base shift distance to move each new modal by the given distance.
                        For
                        example if a shift distance of 50 is added to top and left, then each new modal will be shifted
                        50px
                        to the left and 50px to the down compared to the last modal. This will give the modals a visual
                        cascading effect. You can also use this to shift a new modal to anywhere so that it does not
                        obstruct the last modal. Useful for cases where user would not want to have their view
                        obstructed,
                        while they need to do something else. For example, while filling in a form in a modal, you need
                        to
                        show some quick help regarding the form filling process. All the supported parameters below
                        allows
                        both positive and negative numbers.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>baseShiftDistance.top</code></strong></td>
                    <td><code>integer | null</code></td>
                    <td><code>null</code></td>
                    <td>Shift vertically using top margin</td>
                </tr>
                <tr>
                    <td><strong><code>baseShiftDistance.right</code></strong></td>
                    <td><code>integer | null</code></td>
                    <td><code>null</code></td>
                    <td>Shift horizontally using right margin</td>
                </tr>
                <tr>
                    <td><strong><code>baseShiftDistance.bottom</code></strong></td>
                    <td><code>integer | null</code></td>
                    <td><code>null</code></td>
                    <td>Shift vertically using bottom margin</td>
                </tr>
                <tr>
                    <td><strong><code>baseShiftDistance.left</code></strong></td>
                    <td><code>integer | null</code></td>
                    <td><code>null</code></td>
                    <td>Shift horizontally using left margin</td>
                </tr>
                <tr>
                    <td><strong><code>cssClass</code></strong></td>
                    <td><code>object | null</code></td>
                    <td><code>null</code></td>
                    <td>Common css classes to be passed to all modals manageable via this instance of manager. See
                        supported properties below.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>cssClass.modal</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>Additional css class to be added to modal dialog.</td>
                </tr>
                <tr>
                    <td><strong><code>cssClass.modalOk</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>Additional css class to be added to ok button in footer, if applicable in custom or confirm
                        footer
                        mode.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>cssClass.modalClose</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>Additional css class for close button for close button in footer.</td>
                </tr>
                <tr>
                    <td><strong><code>transitionDuration</code></strong></td>
                    <td><code>number | null</code></td>
                    <td><code>0</code></td>
                    <td>Transition duration for the fade in/out effect. By default this value is set to 0, so that there
                        is no fading animation. This becomes the common transitionDuration value for all modals. Though
                        you can set a different duration value for each modal.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>xButton</code></strong></td>
                    <td><code>object | null</code></td>
                    <td><code>null</code></td>
                    <td>The common modal close button settings. If this parameter is not provided the close button will
                        be shown with default settings. See below for supported options.
                    </td>
                </tr>
                <tr>
                    <td><strong><code>xButton.enabled</code></strong></td>
                    <td><code>boolean | null</code></td>
                    <td><code>true</code></td>
                    <td>Show or hide X button</td>
                </tr>
                <tr>
                    <td><strong><code>xButton.content</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>X</code></td>
                    <td>The X button content.</td>
                </tr>
                <tr>
                    <td><strong><code>xButton.cssClass</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>Additional css class for X button</td>
                </tr>
                <tr>
                    <td><strong><code>xButton.inlineStyles</code></strong></td>
                    <td><code>string | null</code></td>
                    <td><code>null</code></td>
                    <td>Additional inline styles for X button</td>
                </tr>
            </tbody>
        </table>

    </div>

</div>