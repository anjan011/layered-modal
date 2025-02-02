<?php


    namespace Examples\AssetsManager\Traits\BaseAssetsManager;


    use AssetsCollection\ExtScriptsCollection;
    use AssetsCollection\ExtStylesCollection;

    trait EnqueueAssetsTrait {

        public function enqueue_Spectrum_180() : self {

            ExtScriptsCollection::getScript_Spectrum_180()->enqueue($this);
            ExtStylesCollection::getStyleSheet_Spectrum_180()->enqueue($this);

            return $this;

        }

    }