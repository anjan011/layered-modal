<?php

    /**
     * @author anjan
     * @date   2/2/25 @ 6:43 PM
     */


    use Examples\AssetsManager\ExamplesAssetsManager;
    use Examples\Template\ThemeTemplateLoader;

    require_once('../config.php');

    $am = ExamplesAssetsManager::getInstance();

    /**
     * Page title ...
     */

    $am->setPageTitle('Installation');

    $sideBar = ThemeTemplateLoader::loadSideBar('layered-modal.php');

    ThemeTemplateLoader::load('header.php',[
        'sideBar' => $sideBar,
        'navHeader' => 'Installation'
    ]);
    ThemeTemplateLoader::loadPage('layered-modal/installation/index.php');
    ThemeTemplateLoader::load('footer.php');