<?php


    namespace Utility\MarkupGenerators\Html\Traits\GenericElement;


    trait GettersAndSettersTrait {

        #region [Getter & Setters: Tag Name]

        # by anjan @ 10/10/22 4:29 PM

        /**
         * Gets Tag Name
         *
         * @return string
         *
         * @author anjan
         * @date   10/10/22 4:29 PM
         */

        public function getTagName(): string {
            return $this->getDataAsString(self::KEY_TAG_NAME);
        }

        /**
         * Sets Tag Name
         *
         * @param string $value
         *
         * @return self
         *
         * @author anjan
         * @date   10/10/22 4:29 PM
         */

        public function setTagName(string $value): self {

            $this->_data[self::KEY_TAG_NAME] = $value;

            return $this;
        }

        #endregion

        #region [Getter & Setters: Attributes]

        # by anjan @ 10/10/22 4:29 PM

        /**
         * Gets Attributes
         *
         * @return array
         *
         * @author anjan
         * @date   10/10/22 4:29 PM
         */

        public function getAttributes(): array {
            return $this->getDataAsArray(self::KEY_ATTRIBUTES);
        }

        /**
         * Sets Attributes
         *
         * @param array $value
         *
         * @return self
         *
         * @author anjan
         * @date   10/10/22 4:29 PM
         */

        public function setAttributes(array $value): self {

            $this->_data[self::KEY_ATTRIBUTES] = $value;

            return $this;
        }

        #endregion

        #region [Getter & Setters: Wrapper]

        # by anjan @ 10/10/22 4:38 PM

        /**
         * Gets Wrapper
         *
         * @return string
         *
         * @author anjan
         * @date   10/10/22 4:38 PM
         */

        public function getWrapperContent(): string {
            return $this->getDataAsString(self::KEY_WRAPPER);
        }

        /**
         * Sets Wrapper
         *
         * @param string $value
         *
         * @return self
         *
         * @author anjan
         * @date   10/10/22 4:38 PM
         */

        public function setWrapperContent(string $value): self {

            $this->_data[self::KEY_WRAPPER] = $value;

            return $this;
        }

        #endregion

        #region [Getter & Setters: Children]

        # by anjan @ 10/10/22 4:55 PM

        /**
         * Gets Children
         *
         * @return array
         *
         * @author anjan
         * @date   10/10/22 4:55 PM
         */

        public function getChildren(): array {
            return $this->getDataAsArray(self::KEY_CHILDREN);
        }

        /**
         * Sets Children
         *
         * @param array $value
         *
         * @return self
         *
         * @author anjan
         * @date   10/10/22 4:55 PM
         */

        public function setChildren(array $value): self {

            $this->_data[self::KEY_CHILDREN] = $value;

            return $this;
        }

        #endregion

        #region [Getter & Setters: Content Before]

        # by anjan @ 10/10/22 5:10 PM

        /**
         * Gets Content Before
         *
         * @return string
         *
         * @author anjan
         * @date   10/10/22 5:10 PM
         */

        public function getContentBefore(): string {
            return $this->getDataAsString(self::KEY_CONTENT_BEFORE);
        }

        /**
         * Sets Content Before
         *
         * @param string $value
         *
         * @return self
         *
         * @author anjan
         * @date   10/10/22 5:10 PM
         */

        public function setContentBefore(string $value): self {

            $this->_data[self::KEY_CONTENT_BEFORE] = $value;

            return $this;
        }

        #endregion

        #region [Getter & Setters: Content After]

        # by anjan @ 10/10/22 5:10 PM

        /**
         * Gets Content After
         *
         * @return string
         *
         * @author anjan
         * @date   10/10/22 5:10 PM
         */

        public function getContentAfter(): string {
            return $this->getDataAsString(self::KEY_CONTENT_AFTER);
        }

        /**
         * Sets Content After
         *
         * @param string $value
         *
         * @return self
         *
         * @author anjan
         * @date   10/10/22 5:10 PM
         */

        public function setContentAfter(string $value): self {

            $this->_data[self::KEY_CONTENT_AFTER] = $value;

            return $this;
        }

        #endregion

        #region [Getter & Setters: Data List]

        # by anjan @ 10/10/22 5:35 PM

        /**
         * Gets Data List
         *
         * @return array
         *
         * @author anjan
         * @date   10/10/22 5:35 PM
         */

        public function getDataList(): array {
            return $this->getDataAsArray(self::KEY_DATA_LIST);
        }

        /**
         * Sets Data List
         *
         * @param array $value
         *
         * @return self
         *
         * @author anjan
         * @date   10/10/22 5:35 PM
         */

        public function setDataList(array $value): self {

            $this->_data[self::KEY_DATA_LIST] = $value;

            return $this;
        }

        #endregion

        #region [Getter & Setters: Selected Values]

        # by anjan @ 10/10/22 5:36 PM

        /**
         * Gets Selected Values
         *
         * @return array
         *
         * @author anjan
         * @date   10/10/22 5:36 PM
         */

        public function getSelectedValues(): array {
            return $this->getDataAsArray(self::KEY_SELECTED_VALUES);
        }

        /**
         * Sets Selected Values
         *
         * @param array $value
         *
         * @return self
         *
         * @author anjan
         * @date   10/10/22 5:36 PM
         */

        public function setSelectedValues(array $value): self {

            $this->_data[self::KEY_SELECTED_VALUES] = $value;

            return $this;
        }

        #endregion

        #region [Getter & Setters: Is Inline?]

        # by anjan @ 10/10/22 5:39 PM

        /**
         * Gets Is Inline?
         *
         * @return bool
         *
         * @author anjan
         * @date   10/10/22 5:39 PM
         */

        public function getInline(): bool {
            return $this->getDataAsBool(self::KEY_INLINE);
        }

        /**
         * Sets Is Inline?
         *
         * @param bool $value
         *
         * @return self
         *
         * @author anjan
         * @date   10/10/22 5:39 PM
         */

        public function setInline(bool $value): self {

            $this->_data[self::KEY_INLINE] = $value;

            return $this;
        }

        #endregion

    }
