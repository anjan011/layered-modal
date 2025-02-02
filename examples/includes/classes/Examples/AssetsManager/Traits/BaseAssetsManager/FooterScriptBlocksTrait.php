<?php


    namespace Examples\AssetsManager\Traits\BaseAssetsManager;


    use Examples\Utility\MarkupGenerators\Attributes;
    use Examples\Utility\ArrayValue;

    trait FooterScriptBlocksTrait {

        #region [Getter & Setters: Footer Script Blocks]

        # by anjan @ 9/2/23 7:37 PM

        /**
         * Gets Footer Script Blocks
         *
         * @return array
         *
         * @author anjan
         * @date   9/2/23 7:37 PM
         */

        public function getFooterScriptBlocks(): array {
            return $this->getParamValueAsArray(self::KEY_FOOTER_SCRIPT_BLOCKS);
        }

        /**
         * Sets Footer Script Blocks
         *
         * @param array $value
         *
         * @return self
         *
         * @author anjan
         * @date   9/2/23 7:37 PM
         */

        public function setFooterScriptBlocks(array $value): self {

            $this->_params[self::KEY_FOOTER_SCRIPT_BLOCKS] = $value;

            return $this;
        }

        #endregion

        /**
         * Adds a footer script block ...
         *
         * @param string $key
         * @param array  $params
         *
         * @return $this
         */

        public function addFooterScriptBlock(string $key, array $params = []): self {

            $script_block = ArrayValue::asString($params, 'script_block');
            $content = ArrayValue::asString($params, 'content');

            if(!$content && !$script_block) {
                return $this;
            }

            if($script_block != '') {
                $this->_params[self::KEY_FOOTER_SCRIPT_BLOCKS][$key] = [
                    'script_block' => $script_block,
                ];
            } else {

                $this->_params[self::KEY_FOOTER_SCRIPT_BLOCKS][$key] = [
                    'attributes' => ArrayValue::asArray($params,'attributes'),
                    'content' => $content,
                ];

            }

            return $this;

        }

        /**
         * Adds footer script block in batch ...
         *
         * @param array $scripts
         *
         * @return $this
         */

        public function addFooterScriptBlockInBatch(array $scripts = []) : self {

            if(!empty($scripts)) {

                foreach ($scripts as $key => $params) {

                    $this->addFooterScriptBlock($key,$params);

                }

            }

            return $this;

        }

        /**
         * Generates footer script blocks markup
         *
         * @return string
         */

        public function generateFooterScriptBlocksMarkup(): string {

            $script_blocks = $this->getFooterScriptBlocks();

            if (empty($script_blocks)) {
                return '';
            }

            $temp = [];

            foreach ($script_blocks as $data) {

                $script_block = ArrayValue::asString($data, 'script_block');

                if ($script_block != '') {
                    $temp[] = $script_block;
                    continue;

                }

                $content = ArrayValue::asString($data, 'content');

                if ($content == '') {
                    continue;
                }

                $attrs = ArrayValue::asArray($data, 'attributes');

                $temp[] = "<script " . Attributes::generateMarkup($attrs) . ">{$content}</script>";


            }

            return join(PHP_EOL, $temp);

        }

        /**
         * Generates an encoded version of footer script block markup ...
         *
         * @return string
         */

        public function generateFooterScriptBlocksMarkupEncoded(): string {
            return htmlentities($this->generateFooterScriptBlocksMarkup());
        }

    }