<form id="options-form">

    <h4 class="color-orange mb-3">Modal Options Form</h4>

    <div class="mb-3">
        <label for="options-id" class="form-label">Modal Instance ID</label>
        <input
                name="options[id]"
                value=""
                type="text"
                class="form-control"
                placeholder="Leave empty to auto generate ..."
                id="options-id">
    </div> <!-- options[id] -->

    <div class="mb-3">
        <label for="options-transitionDuration" class="form-label required">Transition Duration</label>
        <input name="options[transitionDuration]" value="0" type="number" class="form-control"
               id="options-transitionDuration" placeholder="Enter duration in milliseconds ...">
    </div> <!-- options[transitionDuration] -->

    <div class="mb-3">
        <label for="options-cssClass" class="form-label">Modal CSS Class</label>
        <input
                name="options[cssClass]"
                value="custom-modal-class"
                type="text"
                class="form-control"
                placeholder="Enter css class names ..."
                id="options-cssClass">
    </div> <!-- options[cssClass] -->


</form>