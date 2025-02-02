<?php


    namespace Examples\AssetsManager\Traits\BaseAssetsManager;


    use Examples\Utility\ArrayValue;

    trait RawContentTrait {

        #region [Getter & Setters: Raw Contents]

        # by anjan @ 25/9/23 12:46 PM

        /**
         * Gets Raw Contents
         *
         * @return array
         *
         * @author anjan
         * @date   25/9/23 12:46 PM
         */

        public function getRawContents(): array {
            return $this->getParamValueAsArray(self::KEY_RAW_CONTENTS);
        }

        /**
         * Sets Raw Contents
         *
         * @param array $value
         *
         * @return self
         *
         * @author anjan
         * @date   25/9/23 12:46 PM
         */

        public function setRawContents(array $value): self {

            $this->_params[self::KEY_RAW_CONTENTS] = $value;

            return $this;
        }

        #endregion

        public function addRawContent(string $key, string $content, string $type = self::RCT_HEADER, string $insert_after = self::BLOCK_HEADER_SCRIPTS): self {

            if (!in_array($type, [self::RCT_HEADER, self::RCT_FOOTER])) {
                $type = self::RCT_HEADER;
            }

            if ($type == self::RCT_HEADER) {

                if (!in_array($insert_after, $this->getSupportedHeaderBlocksList())) {
                    $insert_after = self::BLOCK_HEADER_SCRIPTS;
                }

            } else if ($type == self::RCT_FOOTER) {

                if (!in_array($insert_after, $this->getSupportedFooterBlocksList())) {
                    $insert_after = self::BLOCK_FOOTER_SCRIPT_BLOCKS;
                }

            }

            $this->_params[self::KEY_RAW_CONTENTS][$type][$insert_after][$key] = $content;

            return $this;

        }

        /**
         * Gets raw contents by type ...
         *
         * @param string $type
         * @param string $insert_after
         *
         * @return array
         */

        public function getRawContentsByType(string $type = self::RCT_HEADER, string $insert_after = ''): array {

            $insert_after = trim($insert_after);

            if ($insert_after) {

                return ArrayValue::asArray($this->_params, self::KEY_RAW_CONTENTS . '/' . $type . '/' . $insert_after);
            }

            return ArrayValue::asArray($this->_params, self::KEY_RAW_CONTENTS . '/' . $type);

        }

        /**
         * Raw Content by type ...
         *
         * @param string $type
         * @param string $insert_after
         *
         * @return string
         */

        public function generateRawContentByType(string $type = self::RCT_HEADER, string $insert_after = ''): string {

            $contents = $this->getRawContentsByType($type, $insert_after);

            if (!$contents) {
                return "";
            }

            $raw_content = '';

            foreach ($contents as $str) {

                $raw_content .= ($str . PHP_EOL);

            }

            return <<<HTML
<!-- Start: Raw Content -->

{$raw_content}
<!-- End: Raw Content -->

HTML;


        }

    }