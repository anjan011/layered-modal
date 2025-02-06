<?php


    namespace Examples\AssetsManager\Traits\BaseAssetsManager;


    use Examples\Utility\MarkupGenerators\Attributes;
    use Examples\Utility\ArrayValue;

    trait StylesBlockTrait {

        #region [Getter & Setters: Styles Block]

        # by anjan @ 9/2/23 7:42 PM

        /**
         * Gets Styles Block
         *
         * @return array
         *
         * @author anjan
         * @date   9/2/23 7:42 PM
         */

        public function getStylesBlock(): array {
            return $this->getParamValueAsArray(self::KEY_STYLES_BLOCK);
        }

        /**
         * Sets Styles Block
         *
         * @param array $value
         *
         * @return self
         *
         * @author anjan
         * @date   9/2/23 7:42 PM
         */

        public function setStylesBlock(array $value): self {

            $this->_params[self::KEY_STYLES_BLOCK] = $value;

            return $this;
        }

        #endregion

        /**
         * Adds a style block ...
         *
         * @param string $key
         * @param array  $params
         *
         * @return $this
         */

        public function addStyleBlock(string $key, array $params = []): self {

            $style_block = ArrayValue::asString($params, 'style_block');
            $content = ArrayValue::asString($params, 'content');

            if (!$content && !$style_block) {
                return $this;
            }

            if ($style_block != '') {
                $this->_params[self::KEY_STYLES_BLOCK][$key] = [
                    'style_block' => $style_block,
                ];
            } else {

                $this->_params[self::KEY_STYLES_BLOCK][$key] = [
                    'attributes' => ArrayValue::asArray($params, 'attributes'),
                    'content' => $content,
                ];

            }

            return $this;

        }

        /**
         * Adds style block as markup
         *
         * @param string $key
         * @param string $markup
         *
         * @return $this
         */

        public function addStyleBlockAsMarkupWithTag(string $key, string $markup = ''): self {

            $this->addStyleBlock($key,[
                'style_block' => $markup
            ]);

            return $this;

        }

        public function addStyleBlockAsCssMarkupOnly(string $key, string $markup = ''): self {

            $this->addStyleBlock($key, [
                'content' => $markup
            ]);

            return $this;

        }

        /**
         * Generates styles blocks markup
         *
         * @return string
         */

        public function generateStyleBlocksMarkup(): string {

            $style_blocks = $this->getStylesBlock();

            if (empty($style_blocks)) {
                return '';
            }

            $temp = [];

            foreach ($style_blocks as $key => $data) {

                $style_block = ArrayValue::asString($data, 'style_block');

                if ($style_block != '') {
                    $temp[] = $style_block;
                    continue;

                }

                $content = ArrayValue::asString($data, 'content');

                if ($content == '') {
                    continue;
                }

                $attrs = ArrayValue::asArray($data, 'attributes');

                $attrs['data-key'] = $key;

                $temp[] = "<style " . Attributes::generateMarkup($attrs) . ">{$content}</style>";


            }

            return join(PHP_EOL, $temp);

        }

        /**
         * Generates an encoded version of style blocks markup ...
         *
         * @return string
         */

        public function generateStyleBlocksMarkupEncoded(): string {
            return htmlentities($this->generateStyleBlocksMarkup());
        }

    }