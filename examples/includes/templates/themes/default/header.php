<?php

    /**
     * @var \Examples\UiComponents\BootStrap53\SideBar $sideBar
     */

    $am = \Examples\AssetsManager\ExamplesAssetsManager::getInstance();

?>
<!doctype html>
<html lang="<?= $am->getHtmlLang() ?>">
    <head>
        <?= $am->generateHeaderContent() ?>
    </head>
    <body>

        <?= $sideBar->generateOffCanvas() ?>

        <div class="d-flex">

            <?= $sideBar->generate()?>

            <div class="container-fluid flex">

                <div class="row">
                    <div class="col">



                <div class="d-flex justify-content-between align-items-center py-3">

                    <h3 class="m-0"><?= $navHeader ?? 'Navigation'?></h3>

                    <?= $sideBar->generateHamBurgerButton() ?>
                </div>
