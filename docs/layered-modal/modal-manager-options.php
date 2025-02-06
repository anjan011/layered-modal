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

    $am->setPageTitle('Modal Manager Options');

    $sideBar = ThemeTemplateLoader::loadSideBar('layered-modal.php',[
        'id' => 'layered-modal'
    ]);

    ThemeTemplateLoader::load('header.php',[
        'sideBar' => $sideBar,
        'navHeader' => '⚙ Modal Manager Options'
    ]);
    ThemeTemplateLoader::loadPage('layered-modal/modal-manager-options/index.php');
    ThemeTemplateLoader::load('footer.php');