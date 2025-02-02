<?php


    namespace Examples\UiComponents\BootStrap53;


    use Examples\Base\ParameterClass;
    use Examples\Utility\ArrayValue;

    class SideBar extends ParameterClass {

        public function __construct(array $params = array()) {
            parent::__construct($params);

            $this->prepareParams();
        }

        public function prepareParams() {

            #region [ID]

            $this->_params['id'] = $this->getParamValueAsString('id');

            if (!$this->_params['id']) {
                $this->_params['id'] = uniqid('sidebar-');
            }

            #endregion

            #region [Links]

            $this->_params['links'] = $this->getParamValueAsArray('links');

            #endregion

            #region [Accordion ID]

            $this->_params['accordionId'] = uniqid('accordion-');

            #endregion

            #region [Offcanvas ID]

            $this->_params['offCanvasId'] = uniqid('offcanvas-');

            #endregion

        }

        private function getId(): string {
            return $this->_params['id'];
        }

        private function getOffCanvasId(): string {
            return $this->_params['offCanvasId'];
        }

        /**
         * @param string $iconClass
         *
         * @return string
         */

        private function generateIconMarkup(string $iconClass = ''): string {

            $iconClass = trim($iconClass);

            if(!$iconClass) {
                return '';
            }

            if (!$iconClass) {
                return <<<HTML
<i class="fa fa-square fa-fw" style="visibility: hidden;"></i>
HTML;

            } else {
                return <<<HTML
<i class="$iconClass"></i>
HTML;

            }

        }

        /**
         *  Generates link markup ...
         *
         * @param array $link
         *
         * @return string
         */

        private function generateLinkMarkup(array $link = []): string {

            if (empty($link)) {
                return '';
            }

            $children = ArrayValue::asArray($link, 'children');

            $has_child = count($children) > 0;

            $iconClass = ArrayValue::asString($link, 'iconClass');

            if(!$iconClass) {
                if($has_child) {
                    $iconClass = 'fas fa-fw fa-folder';
                } else {
                    $iconClass = 'fas fa-fw fa-link';
                }
            }

            $linkText = ArrayValue::asString($link, 'text', 'Link Text');

            if (!$linkText) {
                $linkText = 'Link Text';
            }

            $linkUrl = ArrayValue::asString($link, 'url');

            if (!$linkUrl) {
                $linkUrl = '#';
            }

            $defaultClass = 'nav-link';

            $linkCssClass = ArrayValue::asString($link, 'cssClass');

            if ($linkCssClass) {
                $defaultClass .= (' ' . $linkCssClass);
            }


            if (!$has_child) {
                return <<<HTML
<a href="$linkUrl" class="$defaultClass">
    {$this->generateIconMarkup($iconClass)} 
    <span class="text-truncate">$linkText</span>
</a>
HTML;

            } else {

                $accordionId = $this->_params['accordionId'];
                $menuId = uniqid('menu-');

                ob_start();
                ?>

                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#<?= $menuId ?>">
                            <?= $this->generateIconMarkup($iconClass) ?> <span
                                    class="text-truncate"><?= $linkText ?></span>
                        </button>
                    </h2>
                    <div id="<?= $menuId ?>" class="accordion-collapse collapse" data-bs-parent="#<?= $accordionId ?>">
                        <div class="accordion-body">

                            <?php foreach ($children as $childLink): ?>

                                <?php

                                $childLink['cssClass'] = ArrayValue::asString($childLink, 'cssClass');

                                $childLink['cssClass'] .= (' child-link');

                                if ($this->linkHasChildren($childLink)) {

                                    echo $this->generateNestedSubMenu($childLink);

                                } else {
                                    echo $this->generateLinkMarkup($childLink);
                                }


                                ?>

                            <?php endforeach; ?>

                        </div>
                    </div>
                </div>


                <?php
                $output_content = ob_get_contents();
                ob_end_clean();

                return $output_content;
            }


        }


        public function generate(): string {

            $id = $this->getId();

            ob_start();
            ?>

            <!-- Sidebar -->
            <div id="<?= $id ?>" class="sidebar d-none d-lg-block">
                <div class="nav flex-column p-3">

                    <div class="accordion" id="<?= $this->_params['accordionId'] ?>">
                        <?php foreach ($this->_params['links'] as $link): ?>

                            <?= $this->generateLinkMarkup($link) ?>

                        <?php endforeach; ?>
                    </div>
                </div>
            </div>


            <?php //$this->generateOffCanvas() ?>

            <?php
            $output_content = ob_get_contents();
            ob_end_clean();

            return $output_content;
        }

        private function linkHasChildren(array $link = []): bool {
            if (empty($link)) {
                return false;
            }

            if (!isset($link['children'])) {
                return false;
            }

            return !empty(ArrayValue::asArray($link, 'children'));
        }

        private function generateNestedSubMenu(array $link = []): string {

            $subAccordionId = uniqid('accordion-');
            $subMenuId = uniqid('sub-menu-');

            if (empty($link)) {
                return '';
            }

            $children = ArrayValue::asArray($link, 'children');

            $has_child = count($children) > 0;

            $iconClass = ArrayValue::asString($link, 'iconClass');

            $linkText = ArrayValue::asString($link, 'text', 'Link Text');

            if (!$linkText) {
                $linkText = 'Link Text';
            }

            $linkUrl = ArrayValue::asString($link, 'url');

            if (!$linkUrl) {
                $linkUrl = '#';
            }

            $defaultClass = 'nav-link';

            $linkCssClass = ArrayValue::asString($link, 'cssClass');

            if ($linkCssClass) {
                $defaultClass .= (' ' . $linkCssClass);
            }


            ob_start();
            ?>

            <!-- Nested Submenu -->
            <div class="accordion" id="<?= $subAccordionId ?>">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button"
                                data-bs-toggle="collapse" data-bs-target="#<?= $subMenuId?>">
                            <?= $this->generateIconMarkup($iconClass)?> <span class="text-truncate"><?= $linkText?></span>
                        </button>
                    </h2>
                    <div id="<?= $subMenuId?>" class="accordion-collapse collapse"
                         data-bs-parent="#<?= $subAccordionId?>">
                        <div class="accordion-body">

                            <?php foreach ($children as $childLink): ?>

                                <?php

                                $childLink['cssClass'] = ArrayValue::asString($childLink, 'cssClass');

                                $childLink['cssClass'] .= (' grandchild-link');

                                echo $this->generateLinkMarkup($childLink);


                                ?>

                            <?php endforeach; ?>

                        </div>
                    </div>
                </div>
            </div>


            <?php
            $output_content = ob_get_contents();
            ob_end_clean();

            return $output_content;
        }

        /**
         * Generates hamburger button ...
         *
         * @return string
         */

        public function generateHamBurgerButton() : string {

            ob_start();
            ?>

            <button class="btn btn-secondary m-3 d-lg-none" data-bs-toggle="offcanvas" data-bs-target="#<?= $this->getOffCanvasId() ?>">
                <i class="fas fa-bars"></i>
            </button>

            <?php
            $output_content = ob_get_contents();
            ob_end_clean();

            return $output_content;

        }

        /**
         * Generates offcanvas slider menu
         *
         * @return string
         */

        public function generateOffCanvas(): string {

            $offCanvasId = $this->getOffCanvasId();

            ob_start();
            ?>

            <!-- Offcanvas Sidebar for Mobile -->
            <div class="d-lg-none">

                <div class="offcanvas offcanvas-end bg-dark text-white sidebar-offcanvas" id="<?= $offCanvasId?>">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title">Navigation Menu</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
                    </div>
                    <div class="offcanvas-body">

                        <nav class="nav flex-column">
                            <div class="accordion" id="<?= $this->_params['accordionId'] ?>">
                                <?php foreach ($this->_params['links'] as $link): ?>

                                    <?= $this->generateLinkMarkup($link) ?>

                                <?php endforeach; ?>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>

            <?php
            $output_content = ob_get_contents();
            ob_end_clean();

            return $output_content;

        }

        public function setLinks(array $links) : self {

            $this->_params['links'] = $links;

            return $this;

        }

    }