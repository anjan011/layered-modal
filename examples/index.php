<?php

    /**
     * @author anjan
     * @date   2/2/25 @ 6:43 PM
     */


    use Examples\AssetsManager\ExamplesAssetsManager;
    use Examples\Template\ThemeTemplateLoader;

    require_once('config.php');

    $am = ExamplesAssetsManager::getInstance();

    $am->setPageTitle('Examples Root');


    ThemeTemplateLoader::load('header.php');
    ThemeTemplateLoader::loadPage('index/index.php');
    ThemeTemplateLoader::load('footer.php');