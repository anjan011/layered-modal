<?php

    namespace Examples\Utility;

    class Validators {

        /**
         * Is valid email?
         *
         * @param string $email
         *
         * @return bool
         *
         * @author Anjan Bhowmik
         * @date   3/17/2022 5:21 AM
         */

        public static function isValidEmail(string $email) : bool {

            return filter_var($email,FILTER_VALIDATE_EMAIL) !== false;

        }

    }
