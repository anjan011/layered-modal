<div class="content">

    <h4>Via NPM</h4>

    <?php
        $npmInstall = <<<HTML
<strong>npm -i layered-modal</strong>
HTML;

        $importSample = <<<JS
import { ModalManager } from "layered-modal";

/**
* Now you can use the modal manager - 
*/

const modalManager = ModalManager.instance;
        
modalManager.addModal({
    body : {
        content : 'Hello world!'
    } 
});
JS;


    ?>

    First install the library using npm -

    <pre class="line-numbers"><code class="language-shell"><?=$npmInstall?></code></pre>

    Then inside your JS/TypeScript import the <kbd>ModalManager</kbd> class -

    <pre class="line-numbers"><code class="language-js"><?= $importSample ?></code></pre>

    <h3>Using CDN</h3>

    <?php
        $browserUsage = <<<HTML
<!-- First load the modal styles -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/layered-modal@latest/dist/styles.min.css">

<!-- Then, load the script -->
<script src="https://cdn.jsdelivr.net/npm/layered-modal@latest/dist/bundle.min.umd.js"></script>

<script>

    /**
    * Now lets display a modal on DOM load ...
    */

    document.addEventListener('DOMContentLoaded', function () {
        
        const modalManager = ModalManager.instance;
        
        modalManager.addModal({
            body : {
                content : 'Hello world!'
            } 
        });
        
    });
</script>
HTML;

    ?>

    <pre class="line-numbers"><code class="language-html"><?= htmlentities($browserUsage)?></code></pre>

    <h3>As ESM or ES6 module</h3>

    <?php
        $esmUsage = <<<HTML
<!-- First load the modal styles -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/layered-modal@latest/dist/styles.min.css">

<!-- Then import the main class -->
<script type="module">
    import {ModalManager} from "https://cdn.jsdelivr.net/npm/layered-modal@latest/dist/bundle.min.esm.js";
    
    window.ModalManager = ModalManager;
</script>

<script>

    /**
    * Now lets display a modal on DOM load ...
    */

    document.addEventListener('DOMContentLoaded', function () {
        
        const modalManager = ModalManager.instance;
        
        modalManager.addModal({
            body : {
                content : 'Hello world!'
            } 
        });
        
    });

</script>
HTML;

    ?>

    <pre class="line-numbers"><code class="language-html"><?= htmlentities($esmUsage) ?></code></pre>

</div>