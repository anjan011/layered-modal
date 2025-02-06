<?php

    namespace Utility\MarkupGenerators\Html\Attributes;

    use Examples\Utility\ArrayValue;
    use WebPowerup\Helpers\PostValue;

    class Selected {

        /**
         * Selected if equal ...
         *
         * @param      $value1
         * @param      $value2
         * @param bool $strict
         *
         * @return string
         */

        public static function ifEqual($value1,$value2,bool $strict = false) : string {

            if($strict) {
                return $value1 === $value2 ? 'selected' : '';
            } else {
                return $value1 == $value2 ? 'selected' : '';
            }

        }

        public static function ifEqualsArrayValue($value, array $array , string $key_path, bool $strict = false): string {
            return self::ifEqual($value, ArrayValue::getValue($array, $key_path), $strict);
        }

        public static function ifEqualsPostValue($value,string $key_path, bool $strict = false) : string {
            return self::ifEqual($value,ArrayValue::getValue($_POST,$key_path),$strict);
        }

        /**
         * Selected if the value exists in given array
         *
         * @param array $array
         * @param       $value
         *
         * @return string
         */

        public static function ifInArray(array $array,$value) : string {

            return in_array($value,$array) ? 'selected' : '';

        }

        /**
         * Selected if value is in a array inside $_POST
         *
         * @param string $key_path
         * @param        $value
         *
         * @return string
         */

        public static function ifInPostArray(string $key_path, $value): string {

            return in_array($value, PostValue::asArray($key_path)) ? 'selected' : '';

        }

    }