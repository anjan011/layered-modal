<?php /** @noinspection PhpIncludeInspection */

    /**
     * @author anjan
     * @date   2/2/25 @ 6:42 PM
     */

    const EXAMPLE_ERROR_REPORTING = false;

    if(EXAMPLE_ERROR_REPORTING) {
        ini_set('display_errors', true);
        error_reporting(E_ALL);
    }

    /**
     * Examples URL root.
     */

    const EXAMPLE_ROOT_URL = '/docs/';

    /**
     * Examples doc root ...
     */

    define('EXAMPLE_DOC_ROOT',rtrim(__DIR__,'/').'/');

    /**
     * Various assets directories ...
     */

    const EXAMPLE_ASSETS_DIR = EXAMPLE_DOC_ROOT . 'assets/';
    const EXAMPLE_CSS_DIR = EXAMPLE_ASSETS_DIR . 'css/';
    const EXAMPLE_JS_DIR = EXAMPLE_ASSETS_DIR . 'js/';
    const EXAMPLE_IMAGES_DIR = EXAMPLE_ASSETS_DIR . 'images/';

    /**
     * Various includes directories ...
     */

    const EXAMPLE_INCLUDES_DIR = EXAMPLE_DOC_ROOT . 'includes/';

    const EXAMPLE_CLASSES_DIR = EXAMPLE_INCLUDES_DIR.'classes/';
    const EXAMPLE_TEMPLATES_DIR = EXAMPLE_INCLUDES_DIR.'templates/';

    /**
     * Current theme ...
     */

    const EXAMPLE_CURRENT_THEME = 'default';

    /**
     * Class auto loader from a namespace root.
     */

    spl_autoload_register(function ($class) {

        $file = EXAMPLE_CLASSES_DIR  . str_replace('\\', '/', $class) . '.php';

        if (file_exists($file)) {
            require $file;
        }
    });