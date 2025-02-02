<?php

    namespace Examples\Base;

    use Examples\Utility\ArrayValue;

    class ParameterClass {

        /**
         * Class data stored in this parameter
         *
         * @var array $_params
         */

        protected array $_params = array();

        public function __construct(array $params = array()) {

            $this->_params = $params;

        }

        /**
         * Gets param value
         *
         * @param string $key_path
         * @param null   $default
         *
         * @return array|mixed
         *
         * @author Anjan Bhowmik
         * @date   9/24/2021 3:50 PM
         */

        public function __pv(string $key_path, $default = null) {
            return ArrayValue::getValue($this->_params, $key_path, $default);
        }

        /**
         * Gets param value as string
         *
         * @param string $key_path
         * @param string $default
         *
         * @return string
         *
         * @author Anjan Bhowmik
         * @date   9/24/2021 3:51 PM
         */

        public function __pv_string(string $key_path, string $default = ''): string {
            return ArrayValue::asString($this->_params, $key_path, $default);
        }

        /**
         * Gets param value as int
         *
         * @param string $key_path
         * @param int    $default
         *
         * @return int
         *
         * @author Anjan Bhowmik
         * @date   9/24/2021 3:51 PM
         */

        public function __pv_int(string $key_path, int $default = 0): int {
            return ArrayValue::asInt($this->_params, $key_path, $default);
        }

        /**
         * Gets param value as float
         *
         * @param string $key_path
         * @param float  $default
         *
         * @return float
         *
         * @author Anjan Bhowmik
         * @date   9/24/2021 3:51 PM
         */

        public function __pv_float(string $key_path, float $default = 0): float {
            return ArrayValue::asFloat($this->_params, $key_path, $default);
        }

        public function __pv_array(string $key_path, array $default = []): array {
            return ArrayValue::asArray($this->_params, $key_path, $default);
        }

        /**
         * gets params
         *
         * @return array
         */
        public function getParams(): array {
            return $this->_params;
        }

        /**
         * Sets params
         *
         * @param array $params
         */
        public function setParams(array $params): void {
            $this->_params = $params;
        }

        public function getParamValueAsInt(string $key_path, int $default = 0): int {
            return ArrayValue::asInt($this->_params, $key_path, $default);
        }

        public function getParamValueAsFloat(string $key_path, float $default = 0): float {
            return ArrayValue::asFloat($this->_params, $key_path, $default);
        }

        public function getParamValueAsString(string $key_path, string $default = ''): string {
            return ArrayValue::asString($this->_params, $key_path, $default);
        }

        public function getParamValueAsArray(string $key_path, array $default = []): array {
            return ArrayValue::asArray($this->_params, $key_path, $default);
        }

        public function getParamValueAsBool(string $key_path, bool $default = false): bool {
            return ArrayValue::asBoolean($this->_params, $key_path, $default);
        }

        const KEY_SITE_ID = 'site_id';
        const KEY_CUSTOMER_ID = 'customer_id';

        #region [Getter & Setters: Site ID]

        # by Anjan Bhowmik @ 3/21/2022 10:20 PM

        /**
         * Gets Site ID
         *
         * @return int
         *
         * @author Anjan Bhowmik
         * @date   3/21/2022 10:20 PM
         */

        public function getSiteId(): int {
            return $this->getParamValueAsInt(self::KEY_SITE_ID);
        }

        /**
         * Sets Site ID
         *
         * @param int $value
         *
         * @return self
         *
         * @author Anjan Bhowmik
         * @date   3/21/2022 10:20 PM
         */

        public function setSiteId(int $value): self {

            $this->_params[self::KEY_SITE_ID] = $value;

            return $this;
        }

        #endregion

        #region [Getter & Setters: Customer ID]

        # by Anjan Bhowmik @ 3/21/2022 10:20 PM

        /**
         * Gets Customer ID
         *
         * @return int
         *
         * @author Anjan Bhowmik
         * @date   3/21/2022 10:20 PM
         */

        public function getCustomerId(): int {
            return $this->getParamValueAsInt(self::KEY_CUSTOMER_ID);
        }

        /**
         * Sets Customer ID
         *
         * @param int $value
         *
         * @return self
         *
         * @author Anjan Bhowmik
         * @date   3/21/2022 10:20 PM
         */

        public function setCustomerId(int $value): self {

            $this->_params[self::KEY_CUSTOMER_ID] = $value;

            return $this;
        }

        #endregion

        /**
         * New Instance
         *
         * @param array $params
         *
         * @return static
         *
         * @author Anjan Bhowmik
         * @date   4/6/2022 2:50 AM
         */

        public static function newInstance(array $params = []): self {

            $class_name = get_called_class();

            return new $class_name($params);

        }

        /**
         * Gets param value
         *
         * @param string $key_path
         * @param null   $default
         *
         * @return mixed
         */

        public function getParamValue(string $key_path, $default = null) {
            return ArrayValue::getValue($this->_params, $key_path, $default);
        }

        /**
         * Checks if a value exists using the given key path
         *
         * @param string $key_path
         *
         * @return bool
         */

        public function ifParamExists(string $key_path): bool {

            return ArrayValue::isValidKeyPath($this->_params, $key_path);

        }
    }