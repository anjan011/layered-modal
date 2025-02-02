<?php


    namespace Utility\MarkupGenerators\Html\StarterTemplates;

    use Anjan\BaseClass\Data;

    class BootStrap3StarterTemplate extends Data {

        const KEY_CONTENT = 'content';

        private static ?self $_instance = null;

        private function __construct(array $data = []) {

            parent::__construct($data);

        }

        /**
         * Get instance
         *
         * @return self
         */

        public static function getInstance(array $params = []) {

            $class_name = get_called_class();

            if (!self::$_instance) {
                self::$_instance = new $class_name($params);
            }

            return self::$_instance;

        }

        /**
         * New instance
         *
         * @param array $params
         *
         * @return static
         */

        public static function newInstance(array $params = []) : self {

            $class_name = get_called_class();

            return new $class_name($params);

        }

        /**
         * Render html head section ...
         */

        public function renderHtmlHead() {
            ?>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
                <title>Bootstrap 3.x</title>

                <!-- Font Awesome 6.2.0 -->
                <link rel="stylesheet" id="font-awesome-6.2.0"
                      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">

                <!-- BootStrap 3.3.1 -->
                <link rel="stylesheet" id="css-bootstrap-3.3.1"
                      href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css"/>
                <!-- jQuery 2.1.2 -->
                <script id="script-jq-2.1.2-min" src="https://code.jquery.com/jquery-2.1.2.min.js"></script>
                <!-- BootStrap 3.3.1 -->
                <script id="script-bootstrap-3.3.1-min"
                        src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js" defer></script>

                <style>
                    em.required {
                        color: red;
                        font-weight: bold;
                    }
                </style>

            </head>
            <?php
        }

        /**
         * Renders markup ...
         *
         * @return string
         */

        public function render() {

            ?>
            <!doctype html>
            <html lang="en">

                <?php $this->renderHtmlHead();?>

                <body>

                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <?php $this->renderContent();?>
                            </div>
                        </div>
                    </div>

                </body>
            </html>
<?php

        }

        public function renderContent() {
            echo $this->getDataAsString(self::KEY_CONTENT);
        }

    }