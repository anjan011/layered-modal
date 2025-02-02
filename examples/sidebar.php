<?php
    require_once('config.php');
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Bootstrap Sidebar</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
        <link rel="stylesheet" href="/examples/assets/css/sidebar.css">
    </head>
    <body>


        <div class="d-flex">



        <?php
            $sideBar = new \Examples\UiComponents\BootStrap53\SideBar([
                'id' => 'sidebar',
                'links' => [
                    [
                        'text' => 'Dashboard',
                        'iconClass' => 'fas fa-fw fa-home',
                    ],
                    [
                        'text' => 'Search',
                        'iconClass' => 'fas fa-fw fa-search',
                    ],

                    [
                        'text' => 'Search No Icon',
                        'iconClass' => 'fas fa-fw fa-folder',
                    ],

                    [
                        'text' => 'Categories',
                        'iconClass' => 'fas fa-fw fa-list-alt',
                        'children' => [
                            [
                                'text' => 'All Categories',
                                'iconClass' => 'fa fa-fw fa-list-alt',
                            ],
                            [
                                'text' => 'New Categories',
                                'iconClass' => 'fa fa-fw fa-plus',
                            ],
                            [
                                'text' => 'Manage',
                                'iconClass' => 'fa fa-fw fa-cogs',
                                'children' => [
                                    [
                                        'text' => 'Import',
                                    ],
                                    [
                                        'text' => 'Export',
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ]);

            echo $sideBar->generate();
        ?>

            <div class="content">
                <?= $sideBar->generateHamBurgerButton() ?>
            </div>

        </div>


        <?= $sideBar->generateOffCanvas()?>


        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    </body>
</html>
