<?php


    namespace Examples\AssetsManager\Traits\BaseAssetsManager;


    use Examples\Utility\MarkupGenerators\Attributes;
    use Examples\Utility\ArrayValue;
    use Examples\Utility\ArrayUtils;

    trait ExternalFooterScriptsTrait {

        #region [Getter & Setters: External Footer Scripts]

        # by anjan @ 9/2/23 3:28 AM

        /**
         * Gets External Header Scripts
         *
         * @return array
         *
         * @author anjan
         * @date   9/2/23 3:28 AM
         */

        public function getExtFooterScripts(): array {
            return $this->getParamValueAsArray(self::KEY_EXTERNAL_FOOTER_SCRIPTS);
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

        public function setExtFooterScripts(array $value): self {

            $this->_params[self::KEY_EXTERNAL_FOOTER_SCRIPTS] = $value;

            return $this;
        }

        #endregion

        /**
         * Adds external footer script ...
         *
         * @param string $key
         * @param array  $params
         *
         * @return $this
         */

        public function addExtFooterScript(string $key, array $params = []): self {

            $url = ArrayValue::asString($params, 'url');
            $script_tag = ArrayValue::asString($params, 'script_tag');
            $dependencies = ArrayValue::asArray($params, 'dependencies');

            if (!$url && !$script_tag) {
                return $this;
            }

            $this->_params[self::KEY_EXTERNAL_FOOTER_SCRIPTS][$key] = [
                'url' => $url,
                'attributes' => ArrayValue::asArray($params, 'attributes'),
                'script_tag' => $script_tag,
                'dependencies' => $dependencies,
            ];

            return $this;

        }

        /**
         * Generates external header scripts markup
         *
         * @return string
         */

        public function generateExtFooterScriptsMarkup(): string {

            $scripts = $this->getExtFooterScripts();

            if (empty($scripts)) {
                return '';
            }

            $this->resolveExtFooterScriptDependencies($scripts);

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

        public function generateExtFooterScriptsMarkupEncoded(): string {
            return htmlentities($this->generateExtFooterScriptsMarkup());
        }


        /**
         * Resolves external footer script dependencies ...
         *
         * @param array $footer_scripts
         */

        public function resolveExtFooterScriptDependencies(array &$footer_scripts) {


            $temp = [];

            if (empty($footer_scripts)) {
                return;
            }

            /**
             * First inject all that has no dependencies ...
             */

            foreach ($footer_scripts as $key => $ss) {

                $dependencies = ArrayValue::asArray($ss, 'dependencies');

                if (empty($dependencies)) {
                    $temp[$key] = $ss;

                    unset($footer_scripts[$key]);
                }

            }

            unset($key, $ss);

            $independent_keys = array_keys($temp);

            /**
             * Now inject based on dependencies ...
             */

            if (!empty($footer_scripts)) {

                foreach ($footer_scripts as $key => $ss) {

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

            $footer_scripts = $temp;

        }

        /**
         * Generates footer script contents
         *
         *
         * @return string
         */

        public function generateFooterContent() : string {

            $temp = [
                self::BLOCK_EXT_FOOTER_SCRIPTS => $this->generateExtFooterScriptsMarkup(),
                'raw-after-ext-footer-scripts' => $this->generateRawContentByType(self::RCT_FOOTER,self::BLOCK_EXT_FOOTER_SCRIPTS),
                self::BLOCK_FOOTER_SCRIPT_BLOCKS => $this->generateFooterScriptBlocksMarkup(),
                'raw-after-footer-script-blocks' => $this->generateRawContentByType(self::RCT_FOOTER, self::BLOCK_FOOTER_SCRIPT_BLOCKS),
            ];

            return join(PHP_EOL,$temp);

        }

        /**
         * Generates and prints header stylesheets, external scripts, inline
         * script and blocks for the &lt;head&gt; section
         */

        public function printFooterContent(){

            echo $this->generateHeaderContent();

        }

    }