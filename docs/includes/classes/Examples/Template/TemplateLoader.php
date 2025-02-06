<?php


    namespace Examples\Template;


    class TemplateLoader {

        /**
         * Loads a template file from template directory ...
         *
         * @param string $path
         * @param array  $data
         */

        public static function load(string $path, array $data = []) {

            $path = trim($path);

            if(!$path) {
                return;
            }

            if(!empty($data)) {
                extract($data);
            }

            $filePath = EXAMPLE_TEMPLATES_DIR.ltrim($path,'/');

            require_once($filePath);

        }

    }