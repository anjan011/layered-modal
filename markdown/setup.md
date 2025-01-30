# Installation

### Include the style sheet

👉 [https://cdn.jsdelivr.net/npm/layered-modal@latest/dist/styles.min.css](https://cdn.jsdelivr.net/npm/layered-modal@latest/dist/styles.min.css)

As link tag - 

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/layered-modal@latest/dist/styles.min.css">
```

### Then import the script - 

#### UMD version

👉 [https://cdn.jsdelivr.net/npm/layered-modal@latest/dist/bundle.min.umd.js](https://cdn.jsdelivr.net/npm/layered-modal@latest/dist/bundle.min.umd.js)

```html
<script src="https://cdn.jsdelivr.net/npm/layered-modal@latest/dist/bundle.min.umd.js"></script>

<script>
    window.ModalManager = LayeredModalSystem.ModalManager;
</script>
```

Yes, in UMD version, the name of the library that provides the classes is `LayeredModalSystem`

#### ESM version

👉 [https://cdn.jsdelivr.net/npm/layered-modal@latest/dist/bundle.min.esm.js](https://cdn.jsdelivr.net/npm/layered-modal@latest/dist/bundle.min.esm.js)

As script tag

```html
<script type="module">
    import {ModalManager} from "https://cdn.jsdelivr.net/npm/layered-modal@latest/dist/bundle.min.esm.js";
    
    window.ModalManager = ModalManager;
</script>
```

Here is a fully working modal example using UMD version -

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Layered Modal Test</title>

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/layered-modal@latest/dist/styles.min.css">

    </head>
    <body>

        <button type="button" id="open-modal">
            Open Modal
        </button>


        <script src="https://cdn.jsdelivr.net/npm/layered-modal@latest/dist/bundle.min.umd.js"></script>

        <script>
            window.ModalManager = LayeredModalSystem.ModalManager;

            document.addEventListener('DOMContentLoaded', function () {

                document.getElementById('open-modal')?.addEventListener('click', function () {

                    let manager = new ModalManager({
                        transitionDuration: 200
                    });

                    manager.addModal({
                        header : {
                            enabled : true,
                            title : 'Greetings!'
                        },
                        body : {
                            content : 'Well, hello there!',
                            cssClass : 'jc-center'
                        },
                        footer : {
                            enabled : true,
                            mode : 'alert'
                        },
                        minWidth : {
                            value : 500,
                            unit : 'px'
                        },
                        minHeight: {
                            value: 250,
                            unit: 'px'
                        }
                    })

                });

            });
        </script>

    </body>
</html>
```

For ESM version, just replace the script tags accordingly.