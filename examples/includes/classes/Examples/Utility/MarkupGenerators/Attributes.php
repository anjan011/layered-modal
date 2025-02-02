<?php


    namespace Examples\Utility\MarkupGenerators;


    class Attributes {

        /**
         * Generates attributes markup from data
         *
         * @param array $attributes
         *
         * @return string
         */

        public static function generateMarkup(array $attributes = array()) : string {

            $attributes = is_array($attributes) ? $attributes : array();

            if (empty($attributes)) {
                return '';
            }

            /**
             * Transform styles data into css rules if they are in array form
             */

            if (isset($attributes['style']) && is_array($attributes['style']) && !empty($attributes['style'])) {

                $styles = '';

                foreach ($attributes['style'] as $k => $v) {

                    $styles .= "$k:$v;";

                }

                $attributes['style'] = $styles;

            }

            #region [Class List ...]

            # By anjan @ 8/10/22 2:51 PM

            if (isset($attributes['class'])) {

                if (is_array($attributes['class'])) {

                    $classList = $attributes['class'];

                    if (!empty($classList)) {
                        $classList = array_unique($classList);

                        $attributes['class'] = join(' ', $classList);
                    }

                }

            }

            #endregion

            #region [Data attributes]

            if (isset($attributes['data'])) {

                if (is_array($attributes['data'])) {

                    $dataList = $attributes['data'];

                    if (!empty($dataList)) {

                        foreach ($dataList as $_k => $_v) {

                            if (is_array($_v)) {
                                $attributes["data-$_k"] = htmlspecialchars(join(',', $_v));
                            } else {
                                $attributes["data-$_k"] = htmlspecialchars($_v);
                            }

                        }

                        unset($attributes['data']);

                    }

                }

            }

            #endregion


            $attrs_str = '';

            foreach ($attributes as $k => $v) {

                if ($v === false || $v === null) {
                    $attrs_str .= "$k ";
                } else {

                    $attrs_str .= $k . '="' . htmlspecialchars($v) . '" ';

                }

            }

            return $attrs_str;

        }

    }