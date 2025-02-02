<?php


    namespace Examples\AssetsManager;


    class ExamplesAssetsManager extends BaseAssetsManager {

        /**
         * Initialize this assets manager ...
         */

        public function init() {

            parent::init();

            $this->setHtmlLang('bn_BD');

            #region [jQuery 3.7.1]

            $this->addExtHeaderScript('jquery-371',[
                'url' => 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js'
            ]);

            #endregion

            #region Enqueue bootstrap 5.3.3 Styles and JS


            $this->addExtStyleSheet('bootstrap-533', [
                'url' => 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
            ]);

            $this->addExtFooterScript('bootstrap-533', [
                'url' => 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js',
                'dependencies' => [
                    'jquery-371'
                ]
            ]);

            #endregion

            #region [Font Awesome]

            $this->addExtStyleSheet('font-awesome-642',[
                'url' => 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css'
            ]);
            #endregion

            #region [Layered Modal Lib]

            $this->addExtFooterScript('layered-modal',[
                'url' => '/dist/bundle.min.umd.js'
            ]);

            $this->addExtStyleSheet('layered-modal', [
                'url' => '/dist/styles.min.css'
            ]);


            #endregion

            $this->addExtStyleSheet('styles', [
                'url' => EXAMPLE_ROOT_URL.'assets/css/styles.css',
            ]);

            $this->addExtStyleSheet('sidebar', [
                'url' => EXAMPLE_ROOT_URL . 'assets/css/sidebar.css',
            ]);
        }


    }