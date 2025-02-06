<?php

    namespace Utility\MarkupGenerators\Html;

    use Examples\Utility\ArrayValue;

    class Input extends Element {

        public function __construct(array $params = array()) {

            $params['tagName'] = 'input';

            $attributes = ArrayValue::asArray($params,'attributes');

            $attributes['type'] = ArrayValue::asString($attributes,'type','text');

            $params['attributes'] = $attributes;

            parent::__construct($params);
        }

        public static function create(array $params = array()) {
            return new self($params);
        }


    }