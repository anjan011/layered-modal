<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <title>Data Attribute Generator</title>


        <!-- Font Awesome 6.2.0 -->
        <link rel="stylesheet" id="font-awesome-6.2.0"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">

        <link rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">

        <link rel="stylesheet" href="/examples/assets/css/styles.css">

        <!--<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/layered-modal@latest/dist/styles.min.css">-->
        <link rel="stylesheet" href="/dist/styles.min.css">

        <style>
            a {
                text-decoration: none;
            }

            a:hover {
                color: #f80;
                transition-duration: 300ms;
            }

            td {
                line-height: 2em;
            }

            .thick-border {
                border: solid 10px #333 !important;
            }

            .required:after {
                content: '*';
                color: red;
                font-weight: bold;
                margin-left: 10px;
            }

            .color-orange {
                color: #f80;
            }

            .col-4 {
                border: solid 3px #333;
                border-radius: 12px;
                padding: 25px;
                box-sizing: border-box;
                width: calc(100%/3 - 10px);
                max-height: 500px;
                overflow: scroll;
            }

            .row.blocks {
                gap : 15px;
            }
        </style>

    </head>
    <body>

        <div class="container mt-3 mb-3">
            <div class="row">
                <div class="col">
                    <h2 class="mb-3">Generate Data Attributes from modal parameter object.</h2>

                    <div class="mb-3">
                        In this example we show you how the data attribute is being generated
                        from modal parameter object.
                    </div>

                </div>
            </div>

            <div class="row blocks">
                <div class="col-4">
                    <?php require_once('includes/form.php');?>
                </div>
                <div class="col-4">

                    <h4 class="color-orange mb-3">Form Data > Modal Options</h4>

                    <pre id="options-json"></pre>
                </div>

                <div class="col-4">

                    <h4 class="color-orange mb-3">Modal Options > Data Attributes</h4>

                    <pre id="options-attr"></pre>
                </div>
            </div>

        </div>

        <div class="row">
            <div class="col">
                <button type="button" id="test-btn">Open Modal</button>
            </div>
        </div>

        <script type="module">

            import {ModalManager, ModalParam2DataAttrs, FormSerializer} from "/dist/bundle.dev.min.esm.js";

            window.ModalManager = ModalManager;
            window.ModalParam2DataAttrs = ModalParam2DataAttrs;
            window.FormSerializer = FormSerializer;
        </script>


        <script>



            document.addEventListener('DOMContentLoaded', function () {

                let formId = 'options-form';

                let form = document.getElementById(formId);

                if(form) {

                    let serializer = new FormSerializer(formId);

                    updateOptions(serializer);

                    form.addEventListener('input',() => {
                        updateOptions(serializer);
                    });

                    form.addEventListener('change', () => {
                        updateOptions(serializer);
                    });


                }

                function updateOptions(serializer) {

                    let options = serializer.serialize();

                    document.getElementById('options-json').innerHTML = JSON.stringify(options.options, null, 4);

                    document.getElementById('options-attr').innerHTML = (new ModalParam2DataAttrs({
                        modalParams : options.options
                    })).generateString();

                }


                document.getElementById('test-btn')?.addEventListener('click',() => {


                    /*ModalManager.addModal({
                        body : {
                            content : 'Well, hello there!'
                        },
                        disableEscKey : true,
                        transitionDuration : 200
                    });*/

                    ModalManager.addModal(`THis is modal content!`);


                });

            });

        </script>


    </body>


</html>