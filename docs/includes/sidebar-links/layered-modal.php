<?php

    /**
     * @author anjan
     * @date   3/2/25 @ 12:16 AM
     */

    return [
        [
            'text' => 'Home',
            'iconClass' => 'fa fa-fw fa-home',
            'url' => EXAMPLE_ROOT_URL.'layered-modal/',
            'is_home' => 1
        ],
        [
            'text' => 'Installation',
            'iconClass' => 'fa-solid fa-fw fa-cloud-arrow-down',
            'url' => EXAMPLE_ROOT_URL . 'layered-modal/installation.php'
        ],
        [
            'text' => 'Basic Usage',
            'iconClass' => 'fa-solid fa-fw fa-book',
            'url' => EXAMPLE_ROOT_URL . 'layered-modal/basic-usage.php'
        ],
        [
            'text' => 'Options',
            'iconClass' => 'fa-solid fa-fw fa-cogs',
            'children' => [
                [
                    'text' => 'Modal Manager',
                    'iconClass' => 'fa-solid fa-fw fa-cog',
                    'url' => EXAMPLE_ROOT_URL . 'layered-modal/modal-manager-options.php'
                ],
                [
                    'text' => 'Modal',
                    'iconClass' => 'fa-solid fa-fw fa-cog',
                    'url' => EXAMPLE_ROOT_URL . 'layered-modal/modal-options.php'
                ]
            ]
        ]
    ];