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

?>

<form method="post" class="form-horizontal" id="form-horizontal" enctype="multipart/form-data">

    <div class="form-group mb-3">
        <div class="form-text">
            <strong>Method:</strong> <?= $_SERVER['REQUEST_METHOD'] ?>
        </div>
    </div>

    <div class="form-group mb-3">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <input type="submit" name="btnSubmit" class="btn btn-success"
                   value="Submit">
        </div>
    </div> <!-- Submit Button -->

    <div class="form-group">
        <div class="form-text">
            <?php
                echo '<div style="clear: both;"></div>';
                echo '<pre style="white-space: pre-wrap;border: solid 1px #ccc;box-shadow: 2px 2px 2px #999;padding: 10px;border-radius: 10px;box-sizing: border-box;margin: 10px;word-wrap: break-word;background-color: burlywood;text-align: left;color: #000;">';
                echo '<h2 style="font-size: 1.5em;color: red;margin-top: 0;margin-bottom: 10px;">Data dump ...</h2><hr>';
                print_r($source);
                echo '<hr><span style="color: blue;">Line # ' . __LINE__ . ' @ ' . __FILE__ . '</span>';
                echo '</pre>';
                echo '<div style="clear: both;"></div>';
            ?>
        </div>
    </div>

</form> <!-- #form-horizontal -->