<?php


    namespace Examples\Template;


    use Examples\UiComponents\BootStrap53\SideBar;

    class ThemeTemplateLoader extends TemplateLoader {

        /**
         * Loads a template file from template directory ...
         *
         * @param string $path
         * @param array  $data
         */

        public static function load(string $path, array $data = []) {

            $path = trim($path);

            if (!$path) {
                return;
            }

            if (!empty($data)) {
                extract($data);
            }

            $filePath = EXAMPLE_TEMPLATES_DIR . 'themes/' . EXAMPLE_CURRENT_THEME . '/' . ltrim($path, '/');

            require_once($filePath);

        }

        /**
         * Load a page template ...
         *
         * @param string $path
         * @param array  $data
         */

        static function loadPage(string $path, array $data = []) {

            $path = trim($path);

            if (!$path) {
                return;
            }

            if (!empty($data)) {
                extract($data);
            }

            $filePath = EXAMPLE_TEMPLATES_DIR . 'pages/' . ltrim($path, '/');

            require_once($filePath);

        }

        public static function loadSideBar(string $paths, array $params = []): SideBar {

            $linksPath = EXAMPLE_INCLUDES_DIR . 'sidebar-links/' . $paths;

            $links = [];

            if (!file_exists($linksPath)) {
                throw new \Exception('Sidebar links file not found');
            }

            $links = require_once($linksPath);

            $params = $params + [
                    'links' => $links,
                ];

            return new SideBar($params);
        }

    }