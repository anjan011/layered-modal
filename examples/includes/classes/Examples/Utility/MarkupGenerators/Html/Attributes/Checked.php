<?php

    namespace Utility\MarkupGenerators\Html\Attributes;

    use Examples\Utility\ArrayValue;
    use WebPowerup\Helpers\PostValue;

    class Checked {

        /**
         * Checked if equal ...
         *
         * @param      $value1
         * @param      $value2
         * @param bool $strict
         *
         * @return string
         */

        public static function ifEqual($value1,$value2,bool $strict = false) : string {

            if($strict) {
                return $value1 === $value2 ? 'checked' : '';
            } else {
                return $value1 == $value2 ? 'checked' : '';
            }

        }

        public static function ifEqualsArrayValue($value, array $array , string $key_path, bool $strict = false): string {
            return self::ifEqual($value, ArrayValue::getValue($array, $key_path), $strict);
        }

        public static function ifEqualsPostValue($value,string $key_path, bool $strict = false) : string {
            return self::ifEqual($value,ArrayValue::getValue($_POST,$key_path),$strict);
        }

        /**
         * Checked if the value exists in given array
         *
         * @param array $array
         * @param       $value
         *
         * @return string
         */

        public static function ifInArray(array $array,$value) : string {

            return in_array($value,$array) ? 'checked' : '';

        }

        /**
         * Checked if value is in a array inside $_POST
         *
         * @param string $key_path
         * @param        $value
         *
         * @return string
         */

        public static function ifInPostArray(string $key_path, $value): string {

            return in_array($value, PostValue::asArray($key_path)) ? 'checked' : '';

        }

    }