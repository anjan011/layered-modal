<?php

    namespace Utility\MarkupGenerators\Html;

    use Anjan\BaseClass\Data;
    use Exception;
    use UiElements\Traits\BaseElement\GettersAndSettersTrait;
    use Examples\Utility\ArrayValue;

    /**
     * Base class for generating a single html tag markup
     */
    class GenericElement extends Data {

        #region [Keys ...]

        # by anjan @ 10/10/22 2:10 PM

        const KEY_ELEMENT_ID = 'element_id';

        const KEY_TAG_NAME = 'tag_name';

        const KEY_ATTRIBUTES = 'attributes';

        const KEY_CONTENT = 'content';

        const KEY_PRETTIFY = 'prettify';

        const KEY_PARENT = 'parent';

        const KEY_CHILDREN = 'children';

        const KEY_ENCODED = 'encoded';

        const KEY_WRAPPER = 'wrapper';

        const KEY_CONTENT_BEFORE = 'content_before';

        const KEY_CONTENT_AFTER = 'content_after';

        const KEY_DATA_LIST = 'data_list';

        const KEY_SELECTED_VALUES = 'selected_values';

        const KEY_INLINE = 'inline';

        const KEY_POSITION = 'position';

        #endregion

        #region [Default data constants ...]

        # by anjan @ 10/10/22 2:11 PM

        const DEFAULT_TAG_NAME = 'div';

        #endregion

        const WRAPPER_CONTENT_TAG = '$$CONTENT$$';


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

        private static bool $_prettify = false;

        /**
         * Indent level base, for pretty print option
         *
         * @var int $_indentLevel
         */

        private int $_indentLevel = 0;

        /**
         * Parent element
         *
         * @var self|null
         */

        private ?self $_parent = null;

        /**
         * Constructor
         *
         * @param array $data
         */

        public function __construct(array $data = array()) {

            parent::__construct($data);

        }

        /**
         * Parse and load data from params
         */

        public function configureDataOnConstruct() {

            #region [Element ID]

            $element_id = $this->getDataAsString(self::KEY_ELEMENT_ID);

            if ('' != $element_id) {
                $this->setId($element_id);
            } else {
                $this->setId(uniqid());
            }

            #endregion

            #region [Tag Name]

            $this->prepareDataAsString(self::KEY_TAG_NAME,'div');

            #endregion

            #region [Attributes]

            $this->prepareDataAsArray(self::KEY_ATTRIBUTES,[]);

            $attrs = $this->getDataAsArray(self::KEY_ATTRIBUTES);

            $attr_id = ArrayValue::asString($attrs, 'id');

            if ($attr_id == '') {
                unset($attrs['id']);
            }

            $this->addDataByKey(self::KEY_ATTRIBUTES,$attrs);


            #endregion

            #region [Content]

            $this->prepareData(self::KEY_CONTENT,'mixed');

            #endregion

            #region [Prettify]

            $this->prepareDataAsBool(self::KEY_PRETTIFY,self::$_prettify);

            #endregion

            #region [Parent]

            $parent = $this->getDataAsMixed(self::KEY_PARENT);

            if ($parent instanceof self) {

                $this->_parent = $parent;

                $this->_parent->appendChildElement($this);
            }

            #endregion

            #region [Position]

            # By anjan @ 28/10/22 4:10 PM

            $this->prepareDataAsInt(self::KEY_POSITION);

            #endregion

            #region [Children]

            $children = $this->getDataAsArray(self::KEY_CHILDREN);

            if(!empty($children)) {
                foreach ($children as $c) {

                    $this->appendChildElement($c);

                }
            }

            #endregion

            $this->prepareChildren();

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
                'link'
            ));

        }

        /**
         * Valueless attribute names
         */

        protected static array $valueLessAttributeNames = [
            'disabled',
            'checked',
            'selected',
            'required',
            'multiple',
        ];

        /**
         * Adds additional value less attribute names
         *
         * @param array $names
         *
         * @return array|string[]
         */

        public static function addValueLessAttributeNames(array $names = []) : array {


            if(empty($names)) {
                return self::$valueLessAttributeNames;
            }

            $names = array_map('strtolower',array_unique($names));

            foreach ($names as $name) {

                $name = is_string($name) ?  trim($name) : '';

                if($name != '' && !in_array($name,self::$valueLessAttributeNames)) {
                    self::$valueLessAttributeNames[] = $name;
                }

            }

            return self::$valueLessAttributeNames;

        }

        /**
         * Is a value less attribute? like: disabled, checked, selected, etc.
         *
         * @param string $attr
         *
         * @return bool
         */

        public function isValueLessAttribute(string $attr) {
            return in_array($attr, self::$valueLessAttributeNames);
        }

        /**
         * Generates markup content
         *
         * @return string
         */

        public function generate() {

            $prettify = $this->isContentPrettified();

            $output = [];

            if ($prettify && $this->_parent) {
                $output[] = PHP_EOL;
            }

            #region [Tag Name]

            $tagName = $this->getTagName();

            #endregion

            #region [Attributes]

            $attributes = $this->getDataAsArray(self::KEY_ATTRIBUTES);

            #region [Special processing for data-* attributes]

            if(isset($attributes['data']) && is_array($attributes['data'])) {

                foreach ($attributes['data'] as $key => $val) {

                    $attributes['data-'.$key] = $val;

                }

                unset($attributes['data']);

            }

            # By anjan @ 28/10/22 5:17 AM



            #endregion

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

            $content = '';

            if(!empty($this->_children)) {

                /**
                 * Sort by position
                 */

                usort($this->_children,function($a,$b){

                    /**
                     * @var self $a
                     * @var self $b
                     */

                    return $a->getDataAsInt(self::KEY_POSITION) <=> $b->getDataAsInt(self::KEY_POSITION);

                });

                foreach ($this->_children as $child) {

                    if ($child instanceof self) {

                        $child->setIndentLevel($this->_indentLevel + 1);

                        $content .= $child->generate();
                    }

                }

            } else {
                $contentVar = $this->getDataAsMixed(self::KEY_CONTENT);


                if (is_string($contentVar) || is_numeric($contentVar)) {
                    $content = trim($contentVar);
                } else if (is_callable($contentVar)) {
                    $content = call_user_func($contentVar,$this);
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

            if (ArrayValue::asInt($this->_data, 'encoded') > 0) {
                $output = htmlentities(join('', $output));
            } else {
                $output = join('', $output);
            }

            $wrapper = $this->getWrapperContent();

            if($wrapper != '') {
                $output = str_replace(self::WRAPPER_CONTENT_TAG,$output,$wrapper);
            }

            return $this->getContentBefore().$output.$this->getContentAfter();

        }

        /**
         * Encodes the generated content and returns it.
         *
         * @return string
         */

        public function generateHtmlEncoded() : string {
            return htmlentities($this->generate());
        }

        /**
         * Base64 encodes the generated content and returns it.
         *
         * @return string
         */

        public function generateBase64Encoded(): string {
            return base64_encode($this->generate());
        }

        /**
         * Appends a child element
         *
         * @param self $elm
         *
         * @return self
         * @throws Exception
         */

        public function appendChildElement(self $elm) {

            if ($elm->getParent() !== $this) {
                $elm->setParent($this);
            }


            $this->_children[$elm->getId()] = $elm;

            return $this;

        }

        /**
         * Prepends a child element
         *
         * @param self $elm
         *
         * @throws Exception
         */

        public function prependChildElement(self $elm) {

            $elm->setParent($this);

            $this->_children = array($elm->getId() => $elm) + $this->_children;

        }

        /**
         * Append element to a parent
         *
         * @param self $parent
         *
         * @throws Exception
         */

        public function appendToParent(self $parent) {

            $parent->appendChildElement($this);

        }

        /**
         * Prepend element to a parent
         *
         * @param self $parent
         *
         * @throws Exception
         */

        public function prependToParent(self $parent) {

            $parent->prependChildElement($this);

        }

        /**
         * Creates an element
         *
         * @param array $data
         *
         * @return self
         */

        public static function create(array $data = array()) :  self {

            $className = get_called_class();

            return new $className($data);

        }

        /**
         * Append multiple child elements
         *
         * @param array $children
         *
         * @throws Exception
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
        public function isContentPrettified(): bool {
            return self::$_prettify;
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
         * @return self|null
         */
        public function getParent(): ?self {
            return $this->_parent;
        }

        /**
         * @param self $parent
         */
        public function setParent(self $parent): void {

            $this->_parent = $parent;

            if (!$this->_parent->hasChildren($this->getId())) {
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
            return $this->getDataAsString(self::KEY_ELEMENT_ID);
        }

        /**
         * Sets element id
         *
         * @param string $id
         */
        public function setId(string $id): void {
            $this->_data[self::KEY_ELEMENT_ID] = $id;
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
         * @return self|null
         */

        public function findElementById(string $id): ?self {

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
            return ArrayValue::getValue($this->_data, 'attributes/' . $attrName);
        }

        /**
         * Sets an attribute value. It can add a new attribute or update existing
         *
         * @param string $attrName
         * @param null   $attrValue
         */

        public function setAttributeValue(string $attrName, $attrValue = null) {
            $this->_data['attributes'][$attrName] = $attrValue;
        }

        /**
         * Removes an attribute entirely
         *
         * @param string $attrName
         * @param null   $attrValue
         */

        public function removeAttribute(string $attrName, $attrValue = null) {
            unset($this->_data['attributes'][$attrName]);
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

            if (!isset($this->_data['attributes']['class'])) {
                $this->_data['attributes']['class'] = array(
                    $className,
                );
            } else {

                if (is_array($this->_data['attributes']['class'])) {

                    $class = ArrayValue::asArray($this->_data, 'attributes/class');

                    if (!in_array($className, $class)) {
                        $class[] = $className;

                        $this->_data['attributes']['class'] = $class;
                    }

                } else {
                    $class = ArrayValue::asString($this->_data, 'attributes/class');

                    if (stripos($class, $className) === false) {
                        $class .= ' ' . $className;

                        $this->_data['attributes']['class'] = $class;
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

            if (!isset($this->_data['content'])) {
                $this->_data['content'] = $extraContent;
            } else {

                $this->_data['content'] .= $extraContent;

            }

            return true;

        }

        /**
         * Is control enabled?
         *
         * @return bool
         */

        public function isEnabled(): bool {

            return ArrayValue::asInt($this->_data, 'enabled', 1) > 0;

        }

        /**
         * gets param value
         *
         * @param string $key
         *
         * @return array|mixed
         */

        public function getParamValue(string $key) {
            return ArrayValue::getValue($this->_data, $key);
        }

        /**
         * Prints the generated markup
         */

        public function print(bool $encoded = false) {

            $this->setEncoded($encoded);

            echo $this->generate();
        }

        /**
         * Check if child element exists by id
         *
         * @param string $id
         *
         * @return bool
         */

        public function hasChildren(string $id): bool {
            return isset($this->_children[$id]);
        }

        /**
         * Sets a tag name if not exists
         *
         * @param string $tagName
         *
         * @return self
         */

        public function addTagNameIfNotExists(string $tagName) : self {

            if (ArrayValue::asString($this->_data, 'tagName') == '') {
                $this->_data['tagName'] = $tagName;
            }

            return $this;
        }

        /**
         * Clears child element list
         *
         * @return self
         */

        public function clearChildren() : self {
            $this->_children = array();

            return $this;
        }

        /**
         * Sets a tag name if not exists
         *
         * @param array  $params
         * @param string $tagName
         *
         */

        public function addTagNameIfNotExistsInParams(array &$params, string $tagName) {

            if (ArrayValue::asString($params, 'tagName') == '') {
                $params['tagName'] = $tagName;
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


        public function generateClassAttrString($attrValue) {

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
            return ArrayValue::asString($this->_data, self::KEY_TAG_NAME,self::DEFAULT_TAG_NAME);
        }

        /**
         * Preloads some default attributes (if not provided) for specific tags
         *
         * @param array $attributes
         *
         * @author Anjan Bhowmik
         * @date   9/14/2021 12:55 PM
         */

        private function handleAttributeDefaults(array &$attributes) {


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


        }

        /**
         * Ignore child elements?
         *
         * @return bool
         */

        public function shouldIgnoreChildren(): bool {
            return $this->ignore_children;
        }

        private function generateDataAttrString(array $data) : string {

            $attr = [''];

            foreach ($data as $key => $value) {


                $attr[] = 'data-'.$key.'="'.(is_array($value) ? join(',',$value) : $value).'"';

            }

            return join(' ',$attr);

        }

        public function setEncoded(bool $encoded) {
            $this->addDataByKey(self::KEY_ENCODED,$encoded);
        }

        public function noWrapper() : self {

            $this->setWrapperContent("");

            return $this;
        }

        public function prepareChildren()  : self {
            return $this;
        }

        /**
         * Prettify content or not?
         *
         * @param bool $status
         */

        public static function prettifyContent(bool $status) {

            self::$_prettify = $status;

        }

        /**
         * If an object is cloned, perform these actions on cloned copy
         */

        public function __clone() {

            /**
             * Generate a new ID
             */

            $this->setId(uniqid());

            /**
             * If there is a parent element on source element, append this cloned
             * copy to it's parent as well.
             */

            if($this->getParent()) {
                $this->getParent()->appendChildElement($this);
            }
        }

        /**
         * remove from css class list
         *
         * @param array $classesToRemove
         *
         * @return self
         */

        public function removeCssClasses(array $classesToRemove) : self {

            if(empty($classesToRemove)) {
                return $this;
            }

            if (!isset($this->_data['attributes']['class'])) {
                $this->_data['attributes']['class'] = array();

                return $this;
            }

            $cssClasses = $this->getDataAsMixed('attributes/class');

            if(is_array($cssClasses)) {

                if(empty($cssClasses)) {
                    return $this;
                }

            }

            if(!is_array($cssClasses)) {
                $cssClasses = trim($cssClasses);

                if ($cssClasses == '') {
                    return $this;
                }

                $cssClasses = explode(' ', $cssClasses);
            }


            $cssClasses = array_map('trim',$cssClasses);
            $cssClasses = array_filter($cssClasses, 'trim');
            $cssClasses = array_unique($cssClasses);


            $classesToRemove = array_map('trim', $classesToRemove);
            $classesToRemove = array_filter($classesToRemove, 'trim');
            $classesToRemove = array_unique($classesToRemove);

            $this->_data['attributes']['class'] = array_diff($cssClasses,$classesToRemove);


            return $this;

        }

        use GettersAndSettersTrait;
    }