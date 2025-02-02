<?php


    namespace Examples\AssetsManager\Traits\BaseAssetsManager;


    use Examples\Utility\MarkupGenerators\Attributes;
    use Examples\Utility\ArrayValue;
    use Examples\Utility\ArrayUtils;

    trait ExternalHeaderScriptsTrait {

        #region [Getter & Setters: External Header Scripts]

        # by anjan @ 9/2/23 3:28 AM

        /**
         * Gets External Header Scripts
         *
         * @return array
         *
         * @author anjan
         * @date   9/2/23 3:28 AM
         */

        public function getExtHeaderScripts(): array {
            return $this->getParamValueAsArray(self::KEY_EXTERNAL_HEADER_SCRIPTS);
        }

        /**
         * Sets External Header Scripts
         *
         * @param array $value
         *
         * @return self
         *
         * @author anjan
         * @date   9/2/23 3:28 AM
         */

        public function setExtHeaderScripts(array $value): self {

            $this->_params[self::KEY_EXTERNAL_HEADER_SCRIPTS] = $value;

            return $this;
        }

        #endregion

        /**
         * Adds external header script ...
         *
         * @param string $key
         * @param array  $params
         *
         * @return $this
         */

        public function addExtHeaderScript(string $key, array $params = []): self {

            $url = ArrayValue::asString($params, 'url');
            $script_tag = ArrayValue::asString($params, 'script_tag');
            $dependencies = ArrayValue::asArray($params, 'dependencies');

            if (!$url && !$script_tag) {
                return $this;
            }

            $this->_params[self::KEY_EXTERNAL_HEADER_SCRIPTS][$key] = [
                'url' => $url,
                'attributes' => ArrayValue::asArray($params, 'attributes'),
                'script_tag' => $script_tag,
                'dependencies' => $dependencies,
            ];

            return $this;

        }

        /**
         * Removes an external JS script
         *
         * @param string $key
         *
         * @return $this
         */

        public function removeExtHeaderScript(string $key): self {

            unset($this->_params[self::KEY_EXTERNAL_HEADER_SCRIPTS][$key]);

            return $this;
        }

        /**
         * Generates external header scripts markup
         *
         * @return string
         */

        public function generateExtHeaderScriptsMarkup(): string {

            $scripts = $this->getExtHeaderScripts();

            if (empty($scripts)) {
                return '';
            }

            $this->resolveExtHeaderScriptDependencies($scripts);

            $temp = [];

            foreach ($scripts as $key => $data) {

                $script_tag = ArrayValue::asString($data, 'script_tag');

                if ($script_tag != '') {
                    $temp[] = $script_tag;
                    continue;

                }

                $url = ArrayValue::asString($data, 'url');

                if ($url == '') {
                    continue;
                }

                $attrs = ArrayValue::asArray($data, 'attributes');

                $attrs['src'] = $url;

                $temp[] = "<script data-key='{$key}' " . Attributes::generateMarkup($attrs) . "></script>";


            }

            return join(PHP_EOL, $temp);

        }

        /**
         * Generates external stylesheets markup and returns encoded version
         *
         * @return string
         */

        public function generateExtHeaderScriptsMarkupEncoded(): string {
            return htmlentities($this->generateExtHeaderScriptsMarkup());
        }

        public function addExtHeaderScript_jQuery2x(string $key = 'jquery-2.1.2') : self {

            return $this->addExtHeaderScript($key,[
                'url' => 'https://code.jquery.com/jquery-2.1.2.min.js'
            ]);

        }

        /**
         * Resolves stylesheet dependencies ...
         *
         * @param array $header_scripts
         */

        public function resolveExtHeaderScriptDependencies(array &$header_scripts) {


            $temp = [];

            if (empty($header_scripts)) {
                return;
            }

            /**
             * First inject all that has no dependencies ...
             */

            foreach ($header_scripts as $key => $ss) {

                $dependencies = ArrayValue::asArray($ss, 'dependencies');

                if (empty($dependencies)) {
                    $temp[$key] = $ss;

                    unset($header_scripts[$key]);
                }

            }

            unset($key, $ss);

            $independent_keys = array_keys($temp);

            /**
             * Now inject based on dependencies ...
             */

            if (!empty($header_scripts)) {

                foreach ($header_scripts as $key => $ss) {

                    $dependencies = ArrayValue::asArray($ss, 'dependencies');

                    $dependencies = array_intersect($independent_keys, $dependencies);

                    if (!empty($dependencies)) {
                        ArrayUtils::insertAfterAssocKey($temp, end($dependencies), [
                            $key => $ss
                        ]);
                    } else {
                        $temp[$key] = $ss;
                    }

                }

            }

            $header_scripts = $temp;

        }

        /**
         * Generates header stylesheets, external scripts, inline
         * script and blocks for the &lt;head&gt; section
         *
         * @param array $params
         *
         * @return string
         */

        public function generateHeaderContent(array $params = []) : string {

            $exclude = ArrayValue::asArray($params,'exclude');

            $temp = [

            ];

            if(!in_array('title',$exclude)) {
                $temp[self::BLOCK_TITLE] = $this->generatePageTitleMarkup();
            }

            if (!in_array('meta', $exclude)) {
                $temp[self::BLOCK_META] = $this->generateMetaTagsMarkup();
            }

            if (!in_array('styles', $exclude)) {
                $temp[self::BLOCK_EXT_STYLES] = $this->generateExtStyleSheetMarkup();
                $temp[self::BLOCK_STYLES] = $this->generateStyleBlocksMarkup();
            }

            if (!in_array('scripts', $exclude)) {
                $temp[self::BLOCK_JS_DATA] = $this->generateJavaScriptDataBlock();
                $temp[self::BLOCK_EXT_HEADER_SCRIPTS] = $this->generateExtHeaderScriptsMarkup();
                $temp[self::BLOCK_HEADER_SCRIPTS] = $this->generateHeaderScriptBlocksMarkup();
            }

            #region [Raw Contents ...]

            # By anjan @ 25/9/23 1:01 PM

            $rawContents = $this->getRawContentsByType(self::RCT_HEADER);

            if(!empty($rawContents)) {

                foreach ($rawContents as $insert_after => $contentList) {

                    ArrayUtils::insertAfterAssocKey($temp,$insert_after,[
                        'raw-content' => join(PHP_EOL, $contentList)
                    ]);

                }

            }

            #endregion

            return join(PHP_EOL,$temp);

        }

        /**
         * Generates and prints header stylesheets, external scripts, inline
         * script and blocks for the &lt;head&gt; section
         */

        public function printHeaderContent(){

            echo $this->generateHeaderContent();

        }

    }