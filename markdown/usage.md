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