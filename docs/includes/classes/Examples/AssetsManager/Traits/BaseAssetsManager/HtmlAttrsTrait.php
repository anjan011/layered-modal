<?php


    namespace Examples\AssetsManager\Traits\BaseAssetsManager;




    use Examples\Utility\MarkupGenerators\Attributes;

    trait HtmlAttrsTrait {

        #region [Getter & Setters: Html Attrs]

        # by anjan @ 9/2/23 3:28 AM

        /**
         * Gets html tag attributes
         *
         * @return array
         *
         * @author anjan
         * @date   9/2/23 3:28 AM
         */

        public function getHtmlAttrs(): array {
            return $this->getParamValueAsArray(self::KEY_HTML_ATTRS);
        }

        /**
         * Sets html tag attributes
         *
         * @param array $value
         *
         * @return self
         *
         * @author anjan
         * @date   9/2/23 3:28 AM
         */

        public function setHtmlAttrs(array $value): self {

            $this->_params[self::KEY_HTML_ATTRS] = $value;

            return $this;
        }

        #endregion

        /**
         * Adds html attribute
         *
         * @param string $key
         * @param string $value
         *
         * @return $this
         */

        public function addHtmlAttr(string $key, string $value = ""): self {

            $this->_params[self::KEY_HTML_ATTRS][$key] = $value;

            return $this;
        }

        /**
         * Sets html language attr value
         *
         * @param string $value
         *
         * @return $this
         */

        public function setHtmlLanguageAttr(string $value = 'en') : self {

            $this->addHtmlAttr('lang',$value);

            return $this;
        }

        /**
         * Generates html attr markups ...
         *
         * @return string
         */

        public function generateHtmlAttrsMarkup() : string {

            return Attributes::generateMarkup($this->getHtmlAttrs());

        }

    }