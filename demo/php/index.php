<?php

    /**
     * @author anjan
     * @date   27/1/25 @ 1:35 AM
     */

    //sleep(10);

    /**
     * Cors headers ...
     */

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: *");
    ?>

<!-- qUnit 1.16.0 -->
<link id="css-qunit-1.16.0" rel="stylesheet" href="//code.jquery.com/qunit/qunit-1.16.0.css"/>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
      integrity="sha512-c42qTSw/wPZ3/5LBzD+Bw5f7bSF2oxou6wEb+I/lqeaKV5FDIfMvvRp772y4jcJLKuGUOpbJMdg/BTl50fJYAw=="
      crossorigin="anonymous" referrerpolicy="no-referrer"/>

<style>
    #username {
        color: red;

    }

    #username::placeholder,
    #username:placeholder-shown {
        color: green;
    }
</style>

<form class="d-block full-width" style="flex: 1;width: 100%;">
    <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input type="text" class="form-control" id="username" required placeholder="Enter login name ...">
    </div>
    <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" required>
    </div>
    <button type="submit" class="btn btn-primary">Login</button>
</form>

<script src="/ajax/test.js"></script>

<script>

    ;(function () {

        console.log('%c%s', 'color: red;background-color: yellow;font-size: 1.2em;', 'Is user name gonna be focused?');

        let username = document.getElementById('username');

        if (username) {
            username.focus();
        }

    })();



</script>
