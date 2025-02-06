<?php


    namespace Utility\MarkupGenerators\Html\Elements\Form;


    use Examples\Utility\ArrayValue;

    class Button extends \Utility\MarkupGenerators\Html\GenericElement {

        public function configureDataOnConstruct() {

            parent::configureDataOnConstruct();

            # force tag name to button ...

            $this->setTagName('button');

            # default attrs ...

            $attrs = $this->getAttributes();

            $attrs['type'] = ArrayValue::asString($attrs,'type','button');

            $this->setAttributes($attrs);


        }

        public function getTagName(): string {
            return 'button';
        }


    }