<?php


    namespace Utility\MarkupGenerators\Html\Database;


    use WebPowerup\DataAccess\MySqlDBHelper;
    use WebPowerup\DataAccess\NewMySqlIWrapper;

    class DatabaseListSelect extends \Utility\MarkupGenerators\Html\Select {

        public function __construct(array $params = []) {


            $params['attributes']['class'][] = 'database-list';

            $databases = MySqlDBHelper::GetInstance()->getAllDatabaseInfo();

            $options = [];

            if(!empty($databases)) {

                foreach ($databases as $db) {

                    $options[$db['database_name']] = $db['database_name'];

                }

            }

            $params['options'] = $options;

            $params['emptyOption'] = [
                'label' => '~ Select Database ~',
                'value' => ''
            ];

            parent::__construct($params);

        }

    }