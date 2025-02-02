<?php


    namespace Examples\AssetsManager\Traits\BaseAssetsManager;


    use Examples\Utility\MarkupGenerators\Attributes;
    use Examples\Utility\ArrayValue;

    trait HeaderScriptBlocksTrait {

        #region [Getter & Setters: Header Script Blocks]

        # by anjan @ 9/2/23 7:27 PM

        /**
         * Gets Header Script Blocks
         *
         * @return array
         *
         * @author anjan
         * @date   9/2/23 7:27 PM
         */

        public function getHeaderScriptBlocks(): array {
            return $this->getParamValueAsArray(self::KEY_HEADER_SCRIPT_BLOCKS);
        }

        /**
         * Sets Header Script Blocks
         *
         * @param array $value
         *
         * @return self
         *
         * @author anjan
         * @date   9/2/23 7:27 PM
         */

        public function setHeaderScriptBlocks(array $value): self {

            $this->_params[self::KEY_HEADER_SCRIPT_BLOCKS] = $value;

            return $this;
        }

        #endregion

        /**
         * Adds a header script block ...
         *
         * @param string $key
         * @param array  $params
         *
         * @return $this
         */

        public function addHeaderScriptBlock(string $key, array $params = []): self {

            $script_block = ArrayValue::asString($params, 'script_block');
            $content = ArrayValue::asString($params, 'content');

            if(!$content && !$script_block) {
                return $this;
            }

            if($script_block != '') {
                $this->_params[self::KEY_HEADER_SCRIPT_BLOCKS][$key] = [
                    'script_block' => $script_block,
                ];
            } else {

                $this->_params[self::KEY_HEADER_SCRIPT_BLOCKS][$key] = [
                    'attributes' => ArrayValue::asArray($params,'attributes'),
                    'content' => $content,
                ];

            }

            return $this;

        }

        /**
         * Generates header script blocks markup
         *
         * @return string
         */

        public function generateHeaderScriptBlocksMarkup(): string {

            $script_blocks = $this->getHeaderScriptBlocks();

            if (empty($script_blocks)) {
                return '';
            }

            $temp = [];

            foreach ($script_blocks as $key => $data) {

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

                $attrs['data-key'] = $key;

                $temp[] = "<script " . Attributes::generateMarkup($attrs) . ">{$content}</script>";


            }

            return join(PHP_EOL, $temp);

        }

        /**
         * Generates an encoded version of header script block markup ...
         *
         * @return string
         */

        public function generateHeaderScriptBlocksMarkupEncoded(): string {
            return htmlentities($this->generateHeaderScriptBlocksMarkup());
        }

    }