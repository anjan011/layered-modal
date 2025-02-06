<?php

    namespace Utility\MarkupGenerators\Html\Location;

    use ReflectionException;
    use Utility\MarkupGenerators\Html\Select;
    use Examples\Utility\ArrayValue;

    class CountryList extends Select {

        public function __construct(array $params = array()) {

            $this->prepareParams($params);

            parent::__construct($params);


        }

        /**
         * Prepare params for country list
         *
         * @param array $params
         *
         * @throws ReflectionException
         *
         * @author Anjan Bhowmik
         * @date   12/16/2021 8:37 PM
         */

        protected function prepareParams(array &$params) {

            if (!isset($params['options'])) {

                $modelCountries = new \WebPowerup\Models\Location\Countries();

                $primary_codes = ArrayValue::asArray($params,'primary_codes');
                $value_field = ArrayValue::asString($params,'value_field','code2');

                $params['has_primary_codes'] = !empty($primary_codes);

                $resCountries = $modelCountries->getCountriesForDropDown([
                    'primary_codes' => $primary_codes,
                    'value_field' => $value_field
                ]);

                $has_primary = ArrayValue::asInt($resCountries,'data/has_primary',0) > 0;

                $_options = [];

                $countries = ArrayValue::asArray($resCountries, 'data/countries');

                if(!$has_primary) {

                    if(!empty($countries)) {

                        foreach ($countries as $c) {

                            $_options[$c['value']] = $c['label'];

                        }
                    }

                } else {

                    #region [Primary countries]

                    # By Anjan Bhowmik @ 12/16/2021 8:32 PM

                    $_options[] = [
                        'label' => 'Primary',
                        'data' => ArrayValue::asArray($countries, 'primary')
                    ];

                    #endregion

                    #region [Other countries]

                    # By Anjan Bhowmik @ 12/16/2021 8:32 PM

                    $_options[] = [
                        'label' => 'Other',
                        'data' => ArrayValue::asArray($countries, 'other')
                    ];

                    #endregion

                }

                $params['options'] = $_options;

                $params['has_option_group'] = 1;

            }



        }

        /**
         * Creates a dropdown object
         *
         * @param array $params
         *
         * @return Select
         */

        public static function create(array $params = array()) {
            return new self($params);
        }

    }