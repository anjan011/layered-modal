<?php

    /**
     * @author anjan
     * @date   2/2/25 @ 6:43 PM
     */


    use Examples\AssetsManager\ExamplesAssetsManager;
    use Examples\Template\ThemeTemplateLoader;

    require_once('../config.php');

    $am = ExamplesAssetsManager::getInstance();

    $am->setPageTitle('Layered Modal Examples');

    $sideBar = ThemeTemplateLoader::loadSideBar('layered-modal.php');

    ThemeTemplateLoader::load('header.php',[
        'sideBar' => $sideBar,
        'navHeader' => 'Layered Modal Examples'
    ]);
    ThemeTemplateLoader::loadPage('layered-modal/index/index.php');
    ThemeTemplateLoader::load('footer.php');