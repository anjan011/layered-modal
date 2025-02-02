<?php


    namespace Utility\MarkupGenerators\Html\Elements\BootStrap;


    class Button extends \Utility\MarkupGenerators\Html\GenericElement {

        #region [Data Keys ...]

        # by anjan @ 28/10/22 9:42 PM

        const KEY_TYPE = 'type';

        const KEY_SIZE = 'size';

        const KEY_IS_SUBMIT = 'is_submit';

        #endregion

        #region [Button Types ...]

        # by anjan @ 28/10/22 9:42 PM

        const BT_DEFAULT = 'default';
        const BT_SUCCESS = 'success';
        const BT_ERROR = 'error';
        const BT_DANGER = 'danger';
        const BT_WARNING = 'warning';

        #endregion

        #region [Button Size ...]

        # by anjan @ 28/10/22 9:44 PM

        const BS_NORMAL = 'normal';
        const BS_LARGE = 'large';
        const BS_SMALL = 'small';
        const BS_EXTRA_SMALL = 'x-small';


        #endregion

        private array $cssClassListForSize = [];
        private array $cssClassListForType = [];


        public function configureDataOnConstruct() {

            parent::configureDataOnConstruct();

            #region [Force tag name ...]

            $this->setTagName('button');

            #endregion

            #region [Force .btn css class]

            $this->addCssClassIfNotExists('btn');

            #endregion

            #region [is Submit Button or normal button?]

            $this->prepareIsSubmitButton();

            #endregion


            #region [Type ...]

            # By anjan @ 28/10/22 9:46 PM

            $this->prepareButtonType();

            #endregion

            #region [Size ...]

            # By anjan @ 28/10/22 9:48 PM

            $this->prepareButtonSize();

            #endregion


        }

        #region [Getter & Setters: is submit button?]

        # by anjan @ 28/10/22 10:03 PM

        /**
         * Gets is submit button?
         *
         * @return bool
         *
         * @author anjan
         * @date   28/10/22 10:03 PM
         */

        public function isSubmitButton(): bool {
            return $this->getDataAsBool(self::KEY_IS_SUBMIT);
        }

        /**
         * Sets is submit button?
         *
         * @param bool $value
         *
         * @return self
         *
         * @author anjan
         * @date   28/10/22 10:03 PM
         */

        public function setSubmitButton(bool $value): self {

            $this->_data[self::KEY_IS_SUBMIT] = $value;

            $this->prepareIsSubmitButton();

            return $this;
        }

        #endregion

        #region [Getter & Setters: Button Type]

        # by anjan @ 28/10/22 10:04 PM

        /**
         * Gets Button Type
         *
         * @return string
         *
         * @author anjan
         * @date   28/10/22 10:04 PM
         */

        public function getButtonType(): string {
            return $this->getDataAsString(self::KEY_TYPE);
        }

        /**
         * Sets Button Type
         *
         * @param string $value
         *
         * @return self
         *
         * @author anjan
         * @date   28/10/22 10:04 PM
         */

        public function setButtonType(string $value): self {

            $this->_data[self::KEY_TYPE] = $value;

            $this->prepareButtonType();

            return $this;
        }

        #endregion

        #region [Getter & Setters: Button Size]

        # by anjan @ 28/10/22 10:05 PM

        /**
         * Gets Button Size
         *
         * @return string
         *
         * @author anjan
         * @date   28/10/22 10:05 PM
         */

        public function getButtonSize(): string {
            return $this->getDataAsString(self::KEY_SIZE);
        }

        /**
         * Sets Button Size
         *
         * @param string $value
         *
         * @return self
         *
         * @author anjan
         * @date   28/10/22 10:05 PM
         */

        public function setButtonSize(string $value): self {

            $this->_data[self::KEY_SIZE] = $value;

            $this->prepareButtonType();

            return $this;
        }

        #endregion


        protected function prepareButtonType(): void {

            $this->removeCssClasses($this->cssClassListForType);

            $type = $this->getDataAsString(self::KEY_TYPE);

            if ($type == '') {
                $type = self::BT_DEFAULT;
            } else if ($type == self::BT_ERROR) {
                $type = self::BT_DANGER;
            }

            $this->prepareDataAsString(self::KEY_TYPE, $type);

            $this->addCssClassIfNotExists("btn-{$type}");

            $this->cssClassListForType[] = "btn-{$type}";
        }

        protected function prepareButtonSize(): void {

            $this->removeCssClasses($this->cssClassListForSize);

            $size = $this->getDataAsString(self::KEY_SIZE);

            if ($size == '') {
                $size = self::BS_NORMAL;
            }

            $this->prepareDataAsString(self::KEY_SIZE, $size);

            $className = '';

            switch ($this->getDataAsString(self::KEY_SIZE)) {

                case self::BS_LARGE :
                    $className = 'btn-lg';

                    break;
                case self::BS_SMALL :
                    $className = 'btn-sm';
                    break;
                case self::BS_EXTRA_SMALL :
                    $className = 'btn-xs';
                    break;

            }

            if($className != '') {
                $this->addCssClassIfNotExists($className);

                $this->cssClassListForSize[] = $className;
            }
        }

        protected function prepareIsSubmitButton(): void {

            $this->prepareDataAsInt(self::KEY_IS_SUBMIT, 0);

            if ($this->getDataAsInt(self::KEY_IS_SUBMIT)) {
                $this->setAttributeValue('type', 'submit');
            } else {
                $this->setAttributeValue('type', 'button');
            }
        }


    }