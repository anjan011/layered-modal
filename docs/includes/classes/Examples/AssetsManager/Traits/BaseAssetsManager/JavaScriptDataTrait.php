<?php


    namespace Examples\AssetsManager\Traits\BaseAssetsManager;


    use Examples\Utility\MarkupGenerators\Attributes;

    trait JavaScriptDataTrait {

        #region [Getter & Setters: Javascript Data]

        # by anjan @ 9/2/23 3:28 AM

        /**
         * Gets javascript data
         *
         * @return array
         *
         * @author anjan
         * @date   9/2/23 3:28 AM
         */

        public function getJavaScriptData(): array {
            return $this->getParamValueAsArray(self::KEY_JAVA_SCRIPT_DATA);
        }

        public function getJavaScriptDataJsonEncoded(): string {

            $data = $this->getParamValueAsArray(self::KEY_JAVA_SCRIPT_DATA);

            if(empty($data)) {
                $data = new \stdClass();
            }

            return json_encode($data);
        }

        /**
         * Sets javascript data
         *
         * @param array $data
         *
         * @return self
         *
         * @author anjan
         * @date   9/2/23 3:28 AM
         */

        public function setJavaScriptData(array $data = []): self {

            $this->_params[self::KEY_JAVA_SCRIPT_DATA] = $data;

            return $this;
        }

        #endregion

        /**
         * Adds javascript data
         *
         * @param string $key
         * @param mixed $data
         *
         * @return $this
         */

        public function addJavaScriptData(string $key, $data = null): self {

            $this->_params[self::KEY_JAVA_SCRIPT_DATA][$key] = $data;

            return $this;
        }

        /**
         * Adds JS data as array
         *
         * @param array $data
         *
         * @return $this
         */

        public function addJavaScriptDataAsArray(array $data = []): self {

            if(!empty($data)) {

                foreach ($data as $key => $value) {

                    $this->addJavaScriptData($key,$value);

                }

            }

            return $this;
        }

        public function addJavaScriptDataAsInt(string $key, int $data = 0): self {

            $this->_params[self::KEY_JAVA_SCRIPT_DATA][$key] = $data;

            return $this;
        }

        public function addJavaScriptDataAsFloat(string $key, float $data = 0): self {

            $this->_params[self::KEY_JAVA_SCRIPT_DATA][$key] = $data;

            return $this;
        }

        public function addJavaScriptDataAsString(string $key, string $data = ''): self {

            $this->_params[self::KEY_JAVA_SCRIPT_DATA][$key] = trim($data);

            return $this;
        }

        /**
         * Generates javascript data block ...
         *
         * @return string
         */

        public function generateJavaScriptDataBlock(): string {

            return <<<JS
<script>var {$this->getGlobalJsVariableName()} = {$this->getJavaScriptDataJsonEncoded()};</script>
JS;

        }

        /**
         * Gets global JS data variable name
         *
         * @return string
         */

        public function getGlobalJsVariableName() : string {

            $name = $this->getParamValueAsString(self::KEY_GLOBAL_JS_VAR_NAME);

            if($name == '') {
                $name = 'globalData';
            }

            return $name;

        }

        /**
         * Gets global JS data variable name
         *
         * @param string $name
         *
         * @return self
         */

        public function setGlobalJsVariableName(string $name): self {

            $name = trim($name);

            if ($name == '') {
                $name = 'globalData';
            }

            $this->_params[self::KEY_GLOBAL_JS_VAR_NAME] = $name;

            return $this;

        }

    }