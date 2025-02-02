<?php


    namespace Utility\MarkupGenerators\Html\Elements\BootStrap;


    use Utility\MarkupGenerators\Html\GenericElement;
    use Examples\Utility\ArrayValue;

    class RadioButtonList extends GenericElement {

        #region [Default Values ...]

        # by anjan @ 28/10/22 3:58 PM

        private static string $default_container_class = 'radio-list';


        #endregion

        #region [Data Keys ...]

        # by anjan @ 28/10/22 3:57 PM

        const KEY_RADIO = 'radio';

        #endregion

        /**
         * Gets default container class
         *
         * @return string
         */

        public static function getDefaultContainerClass(): string {
            return self::$default_container_class;
        }

        /**
         * Sets default container class
         *
         * @param string $default_container_class
         */

        public static function setDefaultContainerClass(string $default_container_class): void {
            self::$default_container_class = $default_container_class;
        }


        /**
         * Configure data on construct ...
         */

        public function configureDataOnConstruct() {

            parent::configureDataOnConstruct();


            $radioAttrs = $this->getDataAsArray(self::KEY_RADIO.'/attributes');

            $name = ArrayValue::asString($radioAttrs,'name');

            if($name == '') {
                throw new \Exception("Radio button name attribute is required.");
            }

        }

        /**
         * Prepares children ...
         *
         * @return $this
         */

        public function prepareChildren(): self {

            $this->clearChildren();

            $this->addCssClassIfNotExists(self::getDefaultContainerClass());

            $dataList = $this->getDataList();

            if(!empty($dataList)) {

                $selectedValues = $this->getSelectedValues();

                $currentValue = !empty($selectedValues) ? array_pop($selectedValues) : null;

                $radioAttrs = $this->getDataAsArray('radio/attributes');

                foreach ($dataList as $_data) {

                    #region [Label text and attributes ...]

                    # By anjan @ 28/10/22 4:53 PM

                    $_label = ArrayValue::getValue($_data, 'label');

                    if(!is_array($_label)) {

                        $_label = [
                            'content' => $_label
                        ];

                    }

                    $_labelAttrs = ArrayValue::asArray($_label, 'attributes');

                    #endregion


                    #region [Radio value and attributes ...]

                    # By anjan @ 28/10/22 4:53 PM

                    $_radioAttrs = ArrayValue::asArray($_data,'radio/attributes');

                    $_radioAttrs = $radioAttrs + $_radioAttrs;

                    $_radioAttrs['value'] = ArrayValue::asString($_data, 'value');

                    $_radioAttrs['checked'] = ($_radioAttrs['value'] == $currentValue);

                    #endregion




                    RadioButton::create([
                        'parent' => $this,
                        'inline' => $this->getInline(),
                        'label' => [
                            'text' => ArrayValue::asString($_label,'content'),
                            'attributes' => $_labelAttrs
                        ],
                        'radio' => [
                            'attributes' => $_radioAttrs,
                        ],
                    ]);

                }

            }

            return $this;
        }

        public function shouldIgnoreChildren(): bool {
            return true;
        }


    }