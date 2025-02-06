<!-- First load the modal styles -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/layered-modal@latest/dist/styles.min.css">

<!-- Then import the main class -->
<script type="module">
    import {ModalManager} from "https://cdn.jsdelivr.net/npm/layered-modal@latest/dist/bundle.min.esm.js";

    window.ModalManager = ModalManager;
</script>

<script>

    document.addEventListener('DOMContentLoaded', function () {

        const modalManager = ModalManager.instance;

        modalManager.addModal({
            body: {
                content: 'Hello world!'
            }
        });

    });

</script>