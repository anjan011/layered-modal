<?php

    /**
     * @author anjan
     * @date   27/1/25 @ 1:35 AM
     */

    //sleep(10);

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: *");

    echo json_encode($_POST);