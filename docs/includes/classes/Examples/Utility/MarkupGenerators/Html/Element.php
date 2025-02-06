<?php

    namespace Utility\MarkupGenerators\Html;

    use Examples\Utility\ArrayValue;

    /**
     * Base class for generating a single html tag markup
     */
    class Element {

        /**
         * Default values ...
         */

        const DEF_TAG_NAME = 'div';

        /**
         * Parameter keys ...
         */

        const PK_TAG_NAME = 'tagName';

        /**
         * Element Unique ID
         *
         * @var string $_id
         */

        private string $_id = '';

        /**
         * Parameters
         *
         * @var array $_params
         */

        protected array $_params = array();

        /**
         * Child elements
         *
         * @var array $_children
         */

        private array $_children = array();

        /**
         * Prettify output content?
         *
         * @var bool $_prettify
         */

        private bool $_prettify = false;

        private int $_indentLevel = 0;

        /**
         * Parent element
         *
         * @var Element|null
         */

        private ?Element $_parent = null;

        /**
         * Constructor
         *
         * @param array $params
         */

        public function __construct(array $params = array()) {

            $this->_params = is_array($params) ? $params : array();

            $this->parseAndLoadFromParams();

        }

        /**
         * Parse and load data from params
         */

        public function parseAndLoadFromParams() {

            #region [ID]

            $id = ArrayValue::asString($this->_params, 'id');

            if ('' != $id) {
                $this->setId($id);
            } else {
                $this->setId(uniqid());
            }

            #endregion

            #region [Tag Name]

            $this->_params['tagName'] = ArrayValue::asString($this->_params, 'tagName', self::DEF_TAG_NAME);

            #endregion

            #region [Attributes]

            $this->_params['attributes'] = ArrayValue::asArray($this->_params, 'attributes');

            $attr_id = ArrayValue::asString($this->_params['attributes'], 'id');

            if ($attr_id == '') {
                unset($this->_params['attributes']['id']);
            }


            #endregion

            #region [Content]

            $this->_params['content'] = ArrayValue::getValue($this->_params, 'content');

            #endregion

            #region [Prettify]

            $this->_prettify = (bool)ArrayValue::getValue($this->_params, 'prettify');

            #endregion

            #region [Parent]

            $this->_parent = isset($this->_params['parent']) && ($this->_params['parent'] instanceof Element) ? $this->_params['parent'] : null;

            if ($this->_parent instanceof Element) {
                $this->_parent->appendChildElement($this);
            }

            #endregion

        }

        /**
         * Is self enclosing tag?
         *
         * @param string $tagName
         *
         * @return bool
         */

        public function isSelfEnclosing(string $tagName) {

            return in_array($tagName, array(
                'br',
                'hr',
                'img',
                'input',
            ));

        }

        /**
         * Is a value less attribute? like: disabled, checked, selected, etc.
         *
         * @param string $attr
         *
         * @return bool
         */

        public function isValueLessAttribute(string $attr) {
            return in_array($attr, array(
                'disabled',
                'checked',
                'selected',
                'required',
                'multiple',
            ));
        }

        /**
         * Generates markup content
         *
         * @return string
         */

        public function generate() {

            $prettify = $this->isPrettify();

            $output = [];

            if ($prettify && $this->_parent) {
                $output[] = PHP_EOL;
            }

            #region [Tag Name]

            $tagName = ArrayValue::asString($this->_params, 'tagName');

            if ($tagName == '') {
                $tagName = 'div';
            }

            #endregion

            #region [Attributes]

            $attributes = ArrayValue::asArray($this->_params, 'attributes');

            $this->handleAttributeDefaults($attributes);

            $attr_str = '';

            if (!empty($attributes)) {

                foreach ($attributes as $attrName => $attrValue) {

                    $attrName = trim($attrName);

                    if ($attrName == '') {
                        continue;
                    }

                    if ($this->isValueLessAttribute($attrName)) {

                        if ($attrValue) {
                            $attr_str .= " {$attrName}";
                        }

                    } else {

                        if ($attrName == 'class') {

                            $attr_str .= $this->generateClassAttrString($attrValue);

                        } else {
                            if (is_array($attrValue)) {
                                $attr_str .= " {$attrName}=\"" . join(' ', array_map('htmlentities', $attrValue)) . "\"";
                            } else {
                                $attr_str .= " {$attrName}=\"" . htmlentities($attrValue) . "\"";
                            }
                        }


                    }


                }

            }

            #endregion

            #region [Content]

            $contentVar = ArrayValue::getValue($this->_params, 'content');

            $content = '';

            if(is_string($contentVar) || is_numeric($contentVar)) {
                $content = trim($contentVar);
            }  else if(is_callable($contentVar)) {
                $content = call_user_func($contentVar);
            }

            if ($content == '') {

                $children = $this->_children;

                if (!empty($children)) {

                    foreach ($children as $child) {

                        if ($child instanceof Element) {

                            $child->setPrettify($prettify);
                            $child->setIndentLevel($this->_indentLevel + 1);

                            $content .= $child->generate();
                        }

                    }

                }

            }

            #endregion

            $ind = $this->_indentLevel;


            if ($this->isSelfEnclosing($tagName)) {

                if ($prettify) {
                    $output[] = $this->_line(0, "<{$tagName}{$attr_str}/>");
                } else {
                    $output[] = "<{$tagName}{$attr_str}/>";
                }

            } else {

                if ($prettify) {

                    $output[] = $this->_line(0, "<{$tagName}{$attr_str}>");
                    $output[] = $this->_line(1, $content);
                    $output[] = $this->_line(0, "</{$tagName}> " . $this->getEndingComment());

                } else {
                    $output[] = "<{$tagName}{$attr_str}>{$content}</{$tagName}>";
                }


            }

            if (ArrayValue::asInt($this->_params, 'encoded') > 0) {
                return htmlentities(join('', $output));
            } else {
                return join('', $output);
            }


        }

        /**
         * Appends a child element
         *
         * @param Element $elm
         *
         * @return Element
         */

        public function appendChildElement(Element $elm) {

            if ($elm->getParent() !== $this) {
                $elm->setParent($this);
            }


            $this->_children[$elm->getId()] = $elm;

            return $this;

        }

        /**
         * Prepends a child element
         *
         * @param Element $elm
         */

        public function prependChildElement(Element $elm) {

            $elm->setParent($this);

            $this->_children = array($elm->getId() => $elm) + $this->_children;

        }

        /**
         * Append element to a parent
         *
         * @param Element $parent
         */

        public function appendToParent(Element $parent) {

            $parent->appendChildElement($this);

        }

        /**
         * Prepend element to a parent
         *
         * @param Element $parent
         */

        public function prependToParent(Element $parent) {

            $parent->prependChildElement($this);

        }

        /**
         * Creates an element
         *
         * @param array $params
         *
         * @return Element
         */

        public static function create(array $params = array()) {

            return new self($params);

        }

        /**
         * Append multiple child elements
         *
         * @param array $children
         */

        public function appendChildElementList(array $children = array()) {

            if (!empty($children)) {

                foreach ($children as $child) {

                    if ($child instanceof self) {
                        $this->appendChildElement($child);
                    }

                }

            }

        }

        /**
         * prepend multiple child elements
         *
         * @param array $children
         */

        public function prependChildElementList(array $children = array()) {

            if (!empty($children)) {

                $children = array_reverse($children);

                foreach ($children as $child) {

                    if ($child instanceof self) {
                        $this->prependChildElement($child);
                    }

                }

            }

        }

        /**
         * Should prettify output?
         *
         * @return bool
         */
        public function isPrettify(): bool {
            return $this->_prettify;
        }

        /**
         * Is prettify flag enabled?
         *
         * @param bool $prettify
         */
        public function setPrettify(bool $prettify): void {
            $this->_prettify = $prettify;
        }

        /**
         * Get current indent level, only in use for prettify mode set
         *
         * @return int
         */
        public function getIndentLevel(): int {
            return $this->_indentLevel;
        }

        /**
         * Set indent level for pretty mode set
         *
         * @param int $indentLevel
         */
        public function setIndentLevel(int $indentLevel): void {
            $this->_indentLevel = $indentLevel;
        }

        /**
         * get parent element
         *
         * @return Element|null
         */
        public function getParent(): ?Element {
            return $this->_parent;
        }

        /**
         * @param Element $parent
         */
        public function setParent(Element $parent): void {

            $this->_parent = $parent;

            if (!$this->_parent->hasOwnChildren($this->getId())) {
                $this->_parent->appendChildElement($this);
            }
        }

        /**
         * Generates a new line with indent at the start and blank lines at the end
         *
         * @param int    $relIndent
         * @param string $text
         * @param int    $newLines
         *
         * @return string
         */

        protected function _line(int $relIndent = 0, string $text = '', int $newLines = 1): string {

            return str_repeat("\t", $this->_indentLevel + $relIndent) . $text . str_repeat(PHP_EOL, $newLines);

        }

        /**
         * gets element ID
         *
         * @return string
         */
        public function getId(): string {
            return $this->_id;
        }

        /**
         * Sets element id
         *
         * @param string $id
         */
        public function setId(string $id): void {
            $this->_id = trim($id) == '' ? uniqid() : trim($id);
        }

        /**
         * get children list
         *
         * @return array
         */
        public function getChildren(): array {
            return $this->_children;
        }

        /**
         * Should include a comment after closing tag?
         *
         * @return string
         */

        public function getEndingComment(): string {
            return '';
        }

        /**
         * Find an element by ID, in the element tree, starting from this element
         *
         * @param string $id
         *
         * @return $this|null
         */

        public function findElementById(string $id): ?Element {

            if (empty($this->_children)) {
                if ($id === $this->getId()) {
                    return $this;
                } else {
                    return null;
                }
            } else {

                foreach ($this->_children as $child) {

                    $res = $child->findElementById($id);

                    if ($res !== null) {
                        return $res;
                    }

                }

            }

            return null;

        }

        /**
         * gets attribute value by name
         *
         * @param string $attrName
         *
         * @return array|mixed
         */

        public function getAttributeValue(string $attrName) {
            return ArrayValue::getValue($this->_params, 'attributes/' . $attrName);
        }

        /**
         * Sets an attribute value. It can add a new attribute or update existing
         *
         * @param string $attrName
         * @param null   $attrValue
         */

        public function setAttributeValue(string $attrName, $attrValue = null) {
            $this->_params['attributes'][$attrName] = $attrValue;
        }

        /**
         * Removes an attribute entirely
         *
         * @param string $attrName
         * @param null   $attrValue
         */

        public function removeAttribute(string $attrName, $attrValue = null) {
            unset($this->_params['attributes'][$attrName]);
        }

        /**
         * Alias of set attribute
         *
         * @param string $attrName
         * @param null   $attrValue
         *
         * @see Element::setAttributeValue()
         */

        public function addAttribute(string $attrName, $attrValue = null) {
            $this->setAttributeValue($attrName, $attrValue);
        }

        /**
         * Adds a css class, if not already exists in attributes class list
         *
         * @param string $className
         */

        public function addCssClassIfNotExists(string $className) {

            if (!isset($this->_params['attributes']['class'])) {
                $this->_params['attributes']['class'] = array(
                    $className,
                );
            } else {

                if (is_array($this->_params['attributes']['class'])) {

                    $class = ArrayValue::asArray($this->_params, 'attributes/class');

                    if (!in_array($className, $class)) {
                        $class[] = $className;

                        $this->_params['attributes']['class'] = $class;
                    }

                } else {
                    $class = ArrayValue::asString($this->_params, 'attributes/class');

                    if (stripos($class, $className) === false) {
                        $class .= ' ' . $className;

                        $this->_params['attributes']['class'] = $class;
                    }
                }

            }

        }

        /**
         * Append to content
         *
         * @param string $extraContent
         *
         * @return bool
         */

        public function appendToContent(string $extraContent = '') {

            $extraContent = trim($extraContent);

            if ($extraContent == '') {
                return false;
            }

            if (!isset($this->_params['content'])) {
                $this->_params['content'] = $extraContent;
            } else {

                $this->_params['content'] .= $extraContent;

            }

            return true;

        }

        /**
         * Is control enabled?
         *
         * @return bool
         */

        public function isEnabled(): bool {

            return ArrayValue::asInt($this->_params, 'enabled', 1) > 0;

        }

        /**
         * Gets param value
         *
         * @param string $key
         * @param null   $default
         *
         * @return array|mixed
         */

        public function getParamValue(string $key, $default = null) {
            return ArrayValue::getValue($this->_params, $key, $default);
        }

        /**
         * Prints the generated markup
         */

        public function print() : void {
            echo $this->generate();
        }

        /**
         * Check if an immediate child element exists by id
         *
         * @param string $id
         *
         * @return bool
         */

        public function hasOwnChildren(string $id): bool {
            return isset($this->_children[$id]);
        }

        /**
         * Sets a tag name if not exists. This is almost same as setTagName(),
         * just that it only sets tag name if not already exists.
         *
         * @param string $tagName
         *
         * @return self
         */

        public function addTagNameIfNotExists(string $tagName) : self {

            if (ArrayValue::asString($this->_params, 'tagName') == '') {
                $this->_params['tagName'] = $tagName;
            }

            return $this;
        }

        /**
         * Clears child element list
         *
         * @return self
         */

        public function clearChildren() : self {

            $this->_children = [];

            return $this;
        }

        /**
         * Sets a tag name if not exists
         *
         * @param array  $params
         * @param string $tagName
         *
         * @deprecated use setTagName() instead for simpler usage.
         * @see setTagName
         */

        public function addTagNameIfNotExistsInParams(array &$params, string $tagName) {

            if (ArrayValue::asString($params, self::PK_TAG_NAME) == '') {
                $params[self::PK_TAG_NAME] = $tagName;
            }
        }

        /**
         * Generates css class list
         *
         * @param $attrValue
         *
         * @return string
         *
         * @author Anjan Bhowmik
         * @date   9/14/2021 12:47 PM
         */


        public function generateClassAttrString($attrValue) : string {

            if (!is_array($attrValue)) {

                $attrValue = trim($attrValue);

                if ($attrValue == '') {
                    return '';
                }

                $attrValue = preg_split('/\s+/im', $attrValue);

                $attrValue = array_map('trim', $attrValue);

            }

            if (empty($attrValue)) {
                return '';
            }

            $attrValue = array_map('trim', $attrValue);
            $attrValue = array_filter($attrValue, 'trim');
            $attrValue = array_map('htmlentities', $attrValue);

            $attrValue = array_unique($attrValue);

            return ' class="' . join(' ', $attrValue) . '"';

        }

        /**
         * Gets the tag name
         *
         * @return string
         *
         * @author Anjan Bhowmik
         * @date   9/14/2021 12:55 PM
         */

        public function getTagName(): string {
            return ArrayValue::asString($this->_params, 'tagName',self::DEF_TAG_NAME);
        }

        /**
         * Preloads some default attributes (if not provided) for specific tags
         *
         * @param array $attributes
         *
         * @return self
         * @author Anjan Bhowmik
         * @date   9/14/2021 12:55 PM
         * @noinspection All
         */

        private function handleAttributeDefaults(array &$attributes) : self {


            $tagName = strtolower($this->getTagName());

            if ($tagName == 'button') {

                if (!isset($attributes['type'])) {
                    $attributes['type'] = 'button';
                }

            } else if ($tagName == 'input') {

                if (!isset($attributes['type'])) {
                    $attributes['type'] = 'text';
                }

            } else if ($tagName == 'select') {

                if (!isset($attributes['size'])) {
                    $attributes['size'] = 1;
                }

            }

            return $this;

        }

        /**
         * Sets tag name
         *
         * @param string $tagName
         *
         * @return $this
         */

        public function setTagName(string $tagName): self {

            $tagName = trim($tagName);

            if($tagName == '') {
                $tagName = self::DEF_TAG_NAME;
            }

            $this->_params[self::PK_TAG_NAME] = $tagName;


            return $this;
        }

        public function getParamValueAsString(string $key, string $default = ''): string {
            return ArrayValue::asString($this->_params, $key, $default);
        }

        public function getParamValueAsInt(string $key, int $default = 0): int {
            return ArrayValue::asInt($this->_params, $key, $default);
        }

        public function getParamValueAsFloat(string $key, float $default = 0.0): float {
            return ArrayValue::asFloat($this->_params, $key, $default);
        }

        public function getParamValueAsArray(string $key, array $default = []): array {
            return ArrayValue::asArray($this->_params, $key, $default);
        }

    }