<?php


    namespace Examples\AssetsManager\Traits\BaseAssetsManager;


    trait RenderAssetsTrait {

        /**
         * Renders all link and styles block on html head section.
         */

        public function renderAllStyles() {

            echo $this->generateExtStyleSheetMarkup();
            echo $this->generateStyleBlocksMarkup();

        }

        public function renderAllHeaderScripts() {

            echo $this->generateExtHeaderScriptsMarkup();
            echo $this->generateHeaderScriptBlocksMarkup();

        }

        public function renderAllFooterScripts() {

            echo $this->generateFooterScriptBlocksMarkup();

        }

    }