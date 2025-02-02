<?php

    namespace Utility\MarkupGenerators\Html\Location;

    use ReflectionException;
    use Utility\MarkupGenerators\Html\Select;
    use Examples\Utility\ArrayValue;

    class StateList extends Select {

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

                $modelStates = new \WebPowerup\Models\Location\States();

                $params['options'] = $modelStates->getStatesForDropDown($params);

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