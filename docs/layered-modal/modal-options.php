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

    $am->setPageTitle('Modal Options');

    $sideBar = ThemeTemplateLoader::loadSideBar('layered-modal.php',[
        'id' => 'layered-modal'
    ]);

    ThemeTemplateLoader::load('header.php',[
        'sideBar' => $sideBar,
        'navHeader' => '⚙ Modal Options'
    ]);
    ThemeTemplateLoader::loadPage('layered-modal/modal-options/index.php');
    ThemeTemplateLoader::load('footer.php');