<?php


    namespace Utility\MarkupGenerators\Html\Elements\BootStrap;


    use Utility\MarkupGenerators\Html\GenericElement;
    use Examples\Utility\ArrayValue;

    class RadioButton extends GenericElement {

        const KEY_INLINE = 'inline';

        public function configureDataOnConstruct() {

            parent::configureDataOnConstruct();

            if($this->isInline()) {
                $this->addCssClassIfNotExists('radio-inline');
            } else {
                $this->addCssClassIfNotExists('radio');
            }


            $this->prepareChildren();


        }

        public function prepareChildren(): self {

            $this->clearChildren();

            #region [Label]

            $labelData = $this->getDataAsArray('label');

            $labelData['tag_name'] = 'label';

            $this->addDataByKey('label', $labelData);

            $label = GenericElement::create($labelData);

            $this->appendChildElement($label);

            #endregion


            #region [Radio button ...]

            $radioData = $this->getDataAsArray('radio');

            $radioData['tag_name'] = 'input';
            $radioData['parent'] = $label;

            $radioData['attributes'] = ArrayValue::asArray($radioData, 'attributes');
            $radioData['attributes']['type'] = 'radio';

            $radioData['content_after'] = ArrayValue::asString($labelData, 'text');

            $this->addDataByKey('radio',$radioData);

            GenericElement::create($radioData);

            #endregion

            return $this;
        }


        #region [Getter & Setters: Inline]

        # by anjan @ 10/10/22 5:01 PM

        /**
         * Gets Inline
         *
         * @return bool
         *
         * @author anjan
         * @date   10/10/22 5:01 PM
         */

        public function isInline(): bool {
            return $this->getDataAsBool(self::KEY_INLINE);
        }

        /**
         * Sets Inline
         *
         * @param bool $value
         *
         * @return self
         *
         * @author anjan
         * @date   10/10/22 5:01 PM
         */

        public function setInline(bool $value): self {

            $this->_data[self::KEY_INLINE] = $value;

            return $this;
        }

        #endregion

    }