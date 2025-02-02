<?php


    namespace Examples\AssetsManager\Traits\BaseAssetsManager;


    use Examples\Utility\MarkupGenerators\Attributes;
    use WebPowerup\AssetsManager\BaseAssetsManager;
    use Examples\Utility\ArrayValue;

    trait MetaTagsTrait {

        #region [Meta Tags]

        # by anjan @ 9/2/23 1:59 AM



        #region [Getter & Setters: Meta Tags]

        # by anjan @ 9/2/23 1:59 AM

        /**
         * Gets Meta Tags
         *
         * @return array
         *
         * @author anjan
         * @date   9/2/23 1:59 AM
         */

        public function getAllMetaTags(): array {
            return $this->getParamValueAsArray(self::KEY_META_TAGS);
        }

        /**
         * Sets Meta Tags
         *
         * @param array $value
         *
         * @return self
         *
         * @author anjan
         * @date   9/2/23 1:59 AM
         */

        public function setMetaTags(array $value): self {

            $this->_params[self::KEY_META_TAGS] = $value;

            return $this;
        }

        #endregion

        /**
         * Adds a meta tag
         *
         * @param string $key A unique key, that can identify current meta tag data. This makes
         *                    it easy to retrieve the meta tag entry later.
         * @param array  $attrs
         *
         * @return $this
         */

        public function addMetaTag(string $key, array $attrs = []): self {

            if (!empty($attrs)) {

                $this->_params[self::KEY_META_TAGS][$key] = [
                    'attributes' => $attrs
                ];
            }


            return $this;
        }

        /**
         * Adds charset meta tag ...
         *
         * @param string $charset
         *
         * @return $this
         */

        public function addCharSetMetaTag(string $charset = 'utf-8'): self {

            return $this->addMetaTag('charset', [
                'charset' => $charset
            ]);


        }

        /**
         * Adds viewport meta tag ...
         *
         * @param string $content
         *
         * @return $this
         */

        public function addViewPortMetaTag(string $content = ''): self {

            $content = trim($content);

            if ($content == '') {
                $content = 'user-scalable=no, initial-scale=1.0, maximum-scale=1.0, width=device-width';
            }

            return $this->addMetaTag('viewport', [
                'name' => 'viewport',
                'content' => $content
            ]);

        }

        /**
         * Gets meta tag attributes ...
         *
         * @param string $key
         *
         * @return array
         */

        public function getMetaTagAttrs(string $key): array {

            return ArrayValue::asArray($this->_params, self::KEY_META_TAGS . '/' . $key);

        }

        /**
         * Generates meta tags markup
         *
         * @return string
         */

        public function generateMetaTagsMarkup(): string {

            $tags = $this->getAllMetaTags();

            if (empty($tags)) {
                return "";
            }

            $metaTagsMarkup = [];

            foreach ($tags as $key => $data) {

                $attrs = ArrayValue::asArray($data, 'attributes');

                if (empty($attrs)) {
                    continue;
                }

                $metaTagsMarkup[] = "<meta " . Attributes::generateMarkup($attrs) . "/>";

            }

            return join(PHP_EOL, $metaTagsMarkup);

        }

        /**
         * Generates meta data markup and returns html encoded version
         *
         * @return string
         */

        public function generateMetaTagsMarkupEncoded(): string {
            return htmlentities($this->generateMetaTagsMarkup());
        }

        #endregion

    }