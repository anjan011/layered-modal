<?php


    namespace Examples\AssetsManager\Traits\BaseAssetsManager;


    use Constants\ExtStyleSheetKeys;
    use Examples\Utility\MarkupGenerators\Attributes;
    use Examples\Utility\ArrayValue;
    use Examples\Utility\ArrayUtils;

    trait ExternalStyleSheetsTrait {

        #region [Getter & Setters: External Style Sheets]

        # by anjan @ 9/2/23 2:41 AM

        /**
         * Gets External Style Sheets
         *
         * @return array
         *
         * @author anjan
         * @date   9/2/23 2:41 AM
         */

        public function getExtStyleSheets(): array {
            return $this->getParamValueAsArray(self::KEY_EXTERNAL_STYLE_SHEETS);
        }

        /**
         * Sets External Style Sheets
         *
         * @param array $value
         *
         * @return self
         *
         * @author anjan
         * @date   9/2/23 2:41 AM
         */

        public function setExtStyleSheets(array $value): self {

            $this->_params[self::KEY_EXTERNAL_STYLE_SHEETS] = $value;

            return $this;
        }

        #endregion

        /**
         * Adds external stylesheet ...
         *
         * @param string $key
         * @param array  $params
         *
         * @return $this
         */

        public function addExtStyleSheet(string $key, array $params = []): self {

            $url = ArrayValue::asString($params, 'url');
            $link_tag = ArrayValue::asString($params, 'link_tag');
            $dependencies = ArrayValue::asArray($params, 'dependencies');

            if (!$url && !$link_tag) {
                return $this;
            }

            $rel = ArrayValue::asString($params, 'rel');

            if ($rel == '') {
                $rel = 'stylesheet';
            }

            $this->_params[self::KEY_EXTERNAL_STYLE_SHEETS][$key] = [
                'url' => $url,
                'rel' => $rel,
                'attributes' => ArrayValue::asArray($params, 'attributes'),
                'link_tag' => $link_tag,
                'dependencies' => $dependencies,
            ];

            return $this;

        }

        /**
         * Remove external stylesheet entry
         *
         * @param string $key
         *
         * @return $this
         */

        public function removeExtStyleSheet(string $key): self {

            unset($this->_params[self::KEY_EXTERNAL_STYLE_SHEETS][$key]);

            return $this;

        }

        /**
         * Adds multiple style sheets at once
         *
         * @param array $sheets
         *
         * @return $this
         */

        public function addExtStyleSheetInBatch(array $sheets = []): self {

            if(!empty($sheets)) {

                foreach ($sheets as $key => $params) {

                    $this->addExtStyleSheet($key,$params);

                }

            }

            return $this;

        }

        /**
         * Generates external stylesheets markup
         *
         * @return string
         */

        public function generateExtStyleSheetMarkup(): string {

            $styleSheets = $this->getExtStyleSheets();

            if (empty($styleSheets)) {
                return '';
            }

            $this->resolveExtStylesheetDependencies($styleSheets);

            $temp = [];

            foreach ($styleSheets as $key => $data) {

                $link_tag = ArrayValue::asString($data, 'link_tag');

                if ($link_tag != '') {
                    $temp[] = $link_tag;
                    continue;

                }

                $url = ArrayValue::asString($data,'url');

                if($url == '') {
                    continue;
                }

                $rel = ArrayValue::asString($data,'rel');

                if($rel == '') {
                    $rel = 'stylesheet';
                }

                $attrs = ArrayValue::asArray($data,'attributes');

                unset($attrs['rel']);

                $attrs['href'] = $url;
                $attrs['rel'] = $rel;

                $temp[] = "<link data-key='{$key}' ".Attributes::generateMarkup($attrs)."/>";


            }

            return join(PHP_EOL,$temp);

        }

        /**
         * Generates external stylesheets markup and returns encoded version
         *
         * @return string
         */

        public function generateExtStyleSheetMarkupEncoded(): string {
            return htmlentities($this->generateExtStyleSheetMarkup());
        }

        /**
         * Adds bootstrap 3x (3.3.2) cdn stylesheet
         *
         * @return $this
         */

        public function addExtStyleSheet_BootStrap3x(string $key = ExtStyleSheetKeys::BOOTSTRAP_332) : self {

            return $this->addExtStyleSheet($key,[
                'url' => 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css'
            ]);

        }

        /**
         * Adds bootstrap 4x (4.4.1) cdn stylesheet
         *
         * @return $this
         */

        public function addExtStyleSheet_BootStrap4x(string $key = ExtStyleSheetKeys::BOOTSTRAP_441) : self {

            return $this->addExtStyleSheet($key,[
                'url' => 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css'
            ]);

        }

        /**
         * Adds bootstrap 5x (5.0.2) cdn stylesheet
         *
         * @return $this
         */

        public function addExtStyleSheet_BootStrap5x(string $key = ExtStyleSheetKeys::BOOTSTRAP_502) : self {

            return $this->addExtStyleSheet($key,[
                'url' => 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css'
            ]);

        }

        /**
         * Adds font-awesome 6x (6.0.2) cdn stylesheet
         *
         * @return $this
         */


        public function addExtStyleSheet_FontAwesome6x(string $key = ExtStyleSheetKeys::FONTAWESOME_620): self {

            return $this->addExtStyleSheet($key, [
                'url' => 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css'
            ]);

        }

        /**
         * Module bundles css ...
         *
         * @param string $key
         *
         * @return $this
         */

        public function addExtStyleSheet_ModuleBundles(string $key = ExtStyleSheetKeys::MODULE_BUNDLES): self {

            return $this->addExtStyleSheet($key, [
                'url' => '/assets/css/module-styles/bundle.css'
            ]);

        }

        /**
         * Resolves stylesheet dependencies ...
         *
         * @param array $style_sheets
         */

        public function resolveExtStylesheetDependencies(array &$style_sheets) {



            $temp = [];

            if(empty($style_sheets)) {
                return;
            }

            /**
             * First inject all that has no dependencies ...
             */

            foreach ($style_sheets as $key => $ss) {

                $dependencies = ArrayValue::asArray($ss,'dependencies');

                if(empty($dependencies)) {
                    $temp[$key] = $ss;

                    unset($style_sheets[$key]);
                }

            }

            unset($key,$ss);

            $independent_keys = array_keys($temp);

            /**
             * Now inject based on dependencies ...
             */

            if(!empty($style_sheets)) {

                foreach ($style_sheets as $key => $ss) {

                    $dependencies = ArrayValue::asArray($ss, 'dependencies');

                    $dependencies = array_intersect($independent_keys, $dependencies);

                    if(!empty($dependencies)) {
                        ArrayUtils::insertAfterAssocKey($temp, end($dependencies), [
                            $key => $ss
                        ]);
                    } else {
                        $temp[$key] = $ss;
                    }

                }

            }

            $style_sheets = $temp;

        }

    }