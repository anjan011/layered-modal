<?php
    $am = \Examples\AssetsManager\ExamplesAssetsManager::getInstance();
?>

</div>
</div>
</div>

</div>

<?= $am->generateFooterContent() ?>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        const ACCORDION_ID = "layered-modal-accordion"; // Change this to match your accordion ID
        const STORAGE_KEY = "accordionOpenState";

        const accordion = document.getElementById(ACCORDION_ID);
        const savedState = localStorage.getItem(STORAGE_KEY);

        // If there's a saved open panel, expand it
        if (savedState) {
            const panelToOpen = document.getElementById(savedState);
            if (panelToOpen) {
                new bootstrap.Collapse(panelToOpen, {toggle: true});
            }
        }

        // Listen for accordion open/close events
        accordion.addEventListener("shown.bs.collapse", function (event) {
            console.log('%c%s', 'color: red;background-color: red;color: #fff;font-size: 1.2em;', 'shown.bs.collapse');
            localStorage.setItem(STORAGE_KEY, event.target.id);
        });

        accordion.addEventListener("hidden.bs.collapse", function (event) {
            // Only clear if the user collapses the currently stored one
            if (localStorage.getItem(STORAGE_KEY) === event.target.id) {
                localStorage.removeItem(STORAGE_KEY);
            }
        });
    });

</script>

</body>
</html>