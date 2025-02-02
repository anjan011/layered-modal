<?php

    namespace Examples\Utility;

    class ArrayUtils {

        /**
         * Insert of or more items after a certain key inside an associative array
         *
         * @param array  $array
         * @param string $key
         * @param array  $data
         *
         * @return bool
         *
         * @author Anjan Bhowmik
         * @date   2/10/2022 11:24 PM
         */

        public static function insertAfterAssocKey(array &$array, string $key, array $data = []): bool {

            if (empty($data)) {
                return false;
            }

            $i = 0;
            $found_key = false;

            foreach ($array as $_key => $_value) {

                if ($_key === $key) {
                    $found_key = true;
                    break;
                }

                $i += 1;
            }

            if (!$found_key) {
                return false;
            }

            $slice_length = $i + 1;

            $array = array_slice($array, 0, $slice_length, true) +
                $data +
                array_slice($array, $slice_length, count($array) - $slice_length, true);

            return true;

        }

    }