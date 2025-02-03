<?php

    /**
     * @var SideBar $sideBar
     */

    use Examples\AssetsManager\ExamplesAssetsManager;
    use Examples\UiComponents\BootStrap53\SideBar;

    $am = ExamplesAssetsManager::getInstance();

    $sideBarSet = isset($sideBar) && ($sideBar instanceof SideBar);

?>
<!doctype html>
<html lang="<?= $am->getHtmlLang() ?>">
    <head>
        <?= $am->generateHeaderContent() ?>
    </head>
    <body>

        <?= $sideBarSet ? $sideBar->generateOffCanvas() :'' ?>

        <div class="d-flex">

            <?= $sideBarSet ? $sideBar->generate() : ''?>

            <div class="container-fluid flex">

                <div class="row">
                    <div class="col">



                <div class="d-flex justify-content-between align-items-center py-3">

                    <h3 class="m-0"><?= $navHeader ?? 'Navigation'?></h3>

                    <?= $sideBarSet ? $sideBar->generateHamBurgerButton() :'' ?>
                </div>
