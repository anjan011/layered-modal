<?php

    namespace Examples\Utility;

    /**
     * Utility class to fetch values from an array. Supports both single and multidimensional
     * array.
     */
    class ArrayValue {

        /**
         * Get array value.
         *
         * It takes the array and a key name or a key path to access element in multidimensional array
         *
         * @param array  $array   The array to conduct the search on
         * @param string $keyPath The Key name or key path (a/b/c/d)
         * @param mixed  $default The default value
         *
         * @return mixed
         */

        public static function getValue(array $array = [], string $keyPath = '', $default = NULL) {

            if (!is_array($array)) {
                return $default;
            }

            $keyPath = trim($keyPath);

            if ('' == $keyPath) {
                return $default;
            }

            if (false === strpos($keyPath, '/')) {
                return $array[$keyPath] ?? $default;
            }

            $keyPath = trim(trim($keyPath), '/');

            $parts = explode('/', $keyPath);

            foreach ($parts as $p) {

                $array = $array[$p] ?? NULL;

                if ($array === NULL) {
                    return $default;
                }
            }

            return $array;
        }


        /**
         * Gets an array value as string
         *
         * @param array  $array
         * @param string $keyPath
         * @param string $default
         * @param bool   $trim
         *
         * @return string
         */

        public static function asString(array $array = [], string $keyPath = '', string $default = '', bool $trim = true): string {

            $val = self::getValue($array, $keyPath, $default);

            if ($trim) {
                $val = @trim($val);
            } else {
                $val = (string)$val;
            }

            if ($val == '') {
                return $default;
            } else {
                return $val;
            }
        }

        /**
         * Gets an array value as int
         *
         * @param array  $array
         * @param string $keyPath
         * @param int    $default
         *
         * @return int
         */

        public static function asInt(array $array = [], string $keyPath = '', int $default = 0): int {

            return (int)self::getValue($array, $keyPath, $default);

        }


        /**
         * Gets an array value as float
         *
         * @param array  $array
         * @param string $keyPath
         * @param float  $default
         *
         * @return float
         */

        public static function asFloat(array $array = [], string $keyPath = '', float $default = 0.0): float {

            return (float)self::getValue($array, $keyPath, $default);

        }


        /**
         * Gets an array value as array
         *
         * @param array  $array
         * @param string $keyPath
         * @param array  $default
         *
         * @return array
         */

        public static function asArray(array $array = [], string $keyPath = '', array $default = []): array {

            $val = self::getValue($array, $keyPath, $default);

            if (is_array($val)) {
                return $val;
            } else {
                return [];
            }

        }

        /**
         * Get array value as formatted date
         *
         * @param array  $array
         * @param string $keyPath
         * @param string $default
         * @param string $format
         *
         * @return false|string
         */


        public static function asDate(array $array = [], string $keyPath = '', string $default = '-', string $format = ''): string {

            $val = self::asString($array, $keyPath, $default, true);

            if (!$val) {
                return $default;
            }

            $ts = strtotime($val);

            if (!$ts || $ts <= 0) {
                return $default;
            }

            $format = trim($format);

            if ($format == '') {

                if (defined('CENTRE_DATE_FORMAT') && defined('CENTRE_TIME_FORMAT')) {
                    $format = CENTRE_DATE_FORMAT . ' ' . CENTRE_TIME_FORMAT;
                } else {
                    $format = DateTime::DEFAULT_FORMAT_FULL;
                }

            }

            return date($format, $ts);
        }

        /**
         * Check and see if the given value exists inside a child array
         *
         * @param array  $array
         * @param string $keyPath
         * @param null   $value
         *
         * @return bool
         */

        public static function inArray(array $array = [], string $keyPath = '', $value = null): bool {

            $temp = self::asArray($array, $keyPath);

            if (empty($temp)) {
                return false;
            }

            return in_array($value, $temp);

        }

        /**
         * Get array value as boolean
         *
         * @param array  $array
         * @param string $keyPath
         * @param bool   $default
         *
         * @return bool
         *
         * @author Anjan Bhowmik
         * @date   2/26/2022 9:18 PM
         */

        public static function asBoolean(array $array = [], string $keyPath = '', bool $default = false): bool {

            return !!self::getValue($array, $keyPath, $default);
        }
    }