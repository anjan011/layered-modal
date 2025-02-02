<?php


    namespace Examples\AssetsManager;


    use Examples\Utility\MarkupGenerators\Attributes;
    use Examples\Utility\MarkupGenerators\Html\Traits\GenericElement\GettersAndSettersTrait;
    use Examples\AssetsManager\Traits\BaseAssetsManager\EnqueueAssetsTrait;
    use Examples\AssetsManager\Traits\BaseAssetsManager\ExternalFooterScriptsTrait;
    use Examples\AssetsManager\Traits\BaseAssetsManager\ExternalHeaderScriptsTrait;
    use Examples\AssetsManager\Traits\BaseAssetsManager\ExternalStyleSheetsTrait;
    use Examples\AssetsManager\Traits\BaseAssetsManager\FooterScriptBlocksTrait;
    use Examples\AssetsManager\Traits\BaseAssetsManager\HeaderScriptBlocksTrait;
    use Examples\AssetsManager\Traits\BaseAssetsManager\HtmlAttrsTrait;
    use Examples\AssetsManager\Traits\BaseAssetsManager\JavaScriptDataTrait;
    use Examples\AssetsManager\Traits\BaseAssetsManager\MetaTagsTrait;
    use Examples\AssetsManager\Traits\BaseAssetsManager\RawContentTrait;
    use Examples\AssetsManager\Traits\BaseAssetsManager\RenderAssetsTrait;
    use Examples\AssetsManager\Traits\BaseAssetsManager\StylesBlockTrait;
    use Examples\Base\ParameterClass;
    use Examples\Utility\ArrayValue;

    class BaseAssetsManager extends ParameterClass {

        private static ?self $_instance = null;

        protected function __construct(array $params = []) {

            parent::__construct($params);

            $this->setHtmlLanguageAttr('en');

            $this
                ->addCharSetMetaTag('utf-8')
                ->addViewPortMetaTag('user-scalable=no, initial-scale=1.0, maximum-scale=1.0, width=device-width');

            $this->init();
        }

        public function init() {

        }

        /**
         * Get instance
         *
         * @param array $params
         *
         * @return self
         */

        public static function getInstance(array $params = []): self {

            $class_name = get_called_class();

            if (!$class_name::$_instance) {

                $class_name::$_instance = new $class_name($params);

                $class_name::$_instance->init();
            }

            return $class_name::$_instance;

        }

        #region [Html Lang]

        # by anjan @ 2/2/25 7:28 PM

        /**
         * Html Lang
         */

        protected string $html_lang = 'en';

        /**
         * Gets Html Lang
         *
         * @return string
         */

        public function getHtmlLang(): string {
            return $this->html_lang;
        }

        /**
         * Sets Html Lang
         *
         * @param string $value
         *
         * @return self
         */

        public function setHtmlLang(string $value = 'en'): self {

            $value = trim($value);

            if(!$value) {
                $value = 'en';
            }

            $this->html_lang = $value;

            return $this;
        }

        #endregion

        #region [Page Title]

        # by anjan @ 9/2/23 1:51 AM

        const KEY_PAGE_TITLE = 'page_title';

        #region [Getter & Setters: Page Title]

        # by anjan @ 9/2/23 1:56 AM

        /**
         * Gets Page Title
         *
         * @return string
         *
         * @author anjan
         * @date   9/2/23 1:56 AM
         */

        public function getPageTitle(): string {
            return $this->getParamValueAsString(self::KEY_PAGE_TITLE);
        }

        public function generatePageTitleMarkup(): string {
            return "<title>" . $this->getPageTitle() . "</title>";
        }

        /**
         * Sets Page Title
         *
         * @param string $value
         *
         * @return self
         *
         * @author anjan
         * @date   9/2/23 1:56 AM
         */

        public function setPageTitle(string $value): self {

            $this->_params[self::KEY_PAGE_TITLE] = $value;

            return $this;
        }

        #endregion

        #endregion

        #region [Meta Tags ...]

        # by anjan @ 9/2/23 2:39 AM

        const KEY_META_TAGS = 'meta_tags';

        use MetaTagsTrait;

        #endregion

        #region [External Style Sheets]

        # by anjan @ 9/2/23 2:41 AM

        const KEY_EXTERNAL_STYLE_SHEETS = 'external_style_sheets';

        use ExternalStyleSheetsTrait;

        #endregion

        #region [External Header Scripts]

        # by anjan @ 9/2/23 2:41 AM

        const KEY_EXTERNAL_HEADER_SCRIPTS = 'external_header_scripts';

        use ExternalHeaderScriptsTrait;

        #endregion

        #region [External Footer Scripts]

        # by anjan @ 9/2/23 2:41 AM

        const KEY_EXTERNAL_FOOTER_SCRIPTS = 'external_footer_scripts';

        use ExternalFooterScriptsTrait;

        #endregion

        #region [Header Script Blocks ...]

        # by anjan @ 9/2/23 7:26 PM

        const KEY_HEADER_SCRIPT_BLOCKS = 'header_script_blocks';

        use HeaderScriptBlocksTrait;

        #endregion

        #region [Footer Script Blocks ...]

        # by anjan @ 9/2/23 7:26 PM

        const KEY_FOOTER_SCRIPT_BLOCKS = 'footer_script_blocks';

        use FooterScriptBlocksTrait;

        #endregion


        #region [Footer Script Blocks ...]

        # by anjan @ 9/2/23 7:26 PM

        const KEY_STYLES_BLOCK = 'styles_block';

        use StylesBlockTrait;

        #endregion

        use RenderAssetsTrait;

        const KEY_HTML_ATTRS = 'html_attrs';

        use HtmlAttrsTrait;

        const KEY_JAVA_SCRIPT_DATA = 'java_script_data';
        const KEY_GLOBAL_JS_VAR_NAME = 'global_js_var_name';

        use JavaScriptDataTrait;

        use EnqueueAssetsTrait;

        const BLOCK_TITLE = 'title';
        const BLOCK_META = 'meta';
        const BLOCK_EXT_STYLES = 'ext-styles';
        const BLOCK_STYLES = 'styles';

        const BLOCK_JS_DATA = 'js-data';
        const BLOCK_EXT_HEADER_SCRIPTS = 'ext-header-scripts';
        const BLOCK_HEADER_SCRIPTS = 'header-scripts-block';

        const BLOCK_EXT_FOOTER_SCRIPTS = 'ext-footer-scripts';
        const BLOCK_FOOTER_SCRIPT_BLOCKS = 'footer-scripts-block';

        /**
         * Gets all supported block styles ...
         *
         * @return string[]
         */

        public function getSupportedBlocksList(): array {
            return [
                self::BLOCK_EXT_FOOTER_SCRIPTS,
                self::BLOCK_EXT_HEADER_SCRIPTS,
                self::BLOCK_EXT_STYLES,
                self::BLOCK_FOOTER_SCRIPT_BLOCKS,
                self::BLOCK_HEADER_SCRIPTS,
                self::BLOCK_JS_DATA,
                self::BLOCK_META,
                self::BLOCK_STYLES,
                self::BLOCK_TITLE,
            ];
        }

        public function getSupportedHeaderBlocksList(): array {
            return [
                self::BLOCK_EXT_HEADER_SCRIPTS,
                self::BLOCK_EXT_STYLES,
                self::BLOCK_HEADER_SCRIPTS,
                self::BLOCK_JS_DATA,
                self::BLOCK_META,
                self::BLOCK_STYLES,
                self::BLOCK_TITLE,
            ];
        }

        public function getSupportedFooterBlocksList(): array {
            return [
                self::BLOCK_EXT_FOOTER_SCRIPTS,
                self::BLOCK_FOOTER_SCRIPT_BLOCKS,
            ];
        }

        #region [Raw Contents ...]

        # by anjan @ 25/9/23 12:44 PM

        const RCT_HEADER = 'header';
        const RCT_FOOTER = 'footer';

        const KEY_RAW_CONTENTS = 'raw_contents';

        use RawContentTrait;

        #endregion


    }