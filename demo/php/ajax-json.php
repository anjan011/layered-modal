<?php

    /**
     * @author anjan
     * @date   30/1/25 @ 2:10 AM
     */

    /**
     * Cors headers ...
     */

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: *");

    $source = $_SERVER['REQUEST_METHOD'] === 'POST' ? $_POST : $_GET;


    echo json_encode([
        'source' => $source,
        'headers' => getallheaders()
    ]);

    exit();
