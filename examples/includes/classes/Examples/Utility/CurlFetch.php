<?php

    namespace Examples\Utility;

    use Exception;

    /**
     *
     * A simple class to fetch content from a given URL via GET or POST
     */
    class CurlFetch {

        /**
         * Code and message for
         */

        const CODE_SUCCESS = 1;
        const MSG_SUCCESS = 'Content fetched';

        /**
         * Common error codes
         */

        const ERR_CODE_EMPTY_URL = -1;
        const ERR_CODE_CURL_INIT_FAILED = -2;
        const ERR_CODE_CURL_EXEC_FAILED = -3;

        /**
         * Descriptive error messages for related codes
         */

        const ERR_MSG_EMPTY_URL = 'URL to fetch is not provided or empty';
        const ERR_MSG_CURL_INIT_FAILED = 'CURL initialization failed';
        const ERR_MSG_CURL_EXEC_FAILED = 'CURL execution failed';


        /**
         * CurlFetch constructor.
         *
         * @throws Exception
         */

        function __construct() {

            /**
             * Check if curl module is installed and enabled!
             */

            if (!function_exists('curl_init')) {
                throw new Exception('CURL module needs to be installed');
            }

        }

        /**
         * Return an array with 3 elements. 'code','message' and 'data'.
         *
         * array['code']    int     'code' is to denote the status of operation, usualy
         *                          an integer value where 0 means nothing changed,
         *                          negative value means errors and positive value means
         *                          success.
         * array['message'] string  Short text to provide a hint about the status of
         *                          operation.
         * array['data']    mixed   contains any possible data that function wish to return
         *
         * @param int    $code    The code
         * @param string $message Message string
         * @param mixed  $data    Data to transmit
         *
         * @return array
         */

        private function __returnArray(int $code = 0, string $message = '', $data = null): array {

            return array(
                'code' => (int)$code,
                'message' => $message,
                'data' => $data,
            );

        }

        /**
         * A sample user agent string for a mobile device (Chrome on Android)
         *
         * @return string
         */

        public function getUserAgentStringForMobile(): string {

            return "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.76 Mobile Safari/537.36";

        }

        /**
         * A sample user agent string for desktop browser (Chrome on Ubuntu)
         *
         * @return string
         */

        public function getUserAgentStringForDesktop(): string {

            return "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.100 Safari/537.36";

        }

        /**
         * Fetch url content via GET method
         *
         * @param string $url         The url
         * @param array  $curlOptions Additional CURL options
         *
         * @return array
         */

        function viaGet(string $url = '', array $curlOptions = []): array {

            $url = trim($url);

            // check for nonempty url!

            if (!$url) {
                return $this->__returnArray(
                    self::ERR_CODE_EMPTY_URL,
                    self::ERR_MSG_EMPTY_URL
                );
            }

            $ch = curl_init();

            if ($ch) {

                // init success! Now, set options

                $curlGetOptions = [];

                if (is_array($curlOptions) && !empty($curlOptions)) {

                    foreach ($curlOptions as $k => $v) {

                        $curlGetOptions[$k] = $v;

                    }

                }

                // these options enforced by the function

                $curlGetOptions[CURLOPT_URL] = $url;
                $curlGetOptions[CURLOPT_RETURNTRANSFER] = TRUE;
                $curlGetOptions[CURLOPT_POST] = FALSE;
                $curlGetOptions[CURLOPT_SSL_VERIFYHOST] = false;
                $curlGetOptions[CURLOPT_SSL_VERIFYPEER] = false;

                curl_setopt_array($ch, $curlGetOptions);

                $res = curl_exec($ch);

                if ($res === FALSE) {

                    # request failed!

                    $returnData = array(
                        'targetUrl' => $url,
                        'curlError' => array(
                            'code' => curl_errno($ch),
                            'message' => curl_error($ch),
                        ),

                    );

                    curl_close($ch);

                    return $this->__returnArray(
                        self::ERR_CODE_CURL_EXEC_FAILED,
                        self::ERR_MSG_CURL_EXEC_FAILED,
                        $returnData
                    );

                } else {

                    # request successful! Response is in $res

                    curl_close($ch);

                    return $this->__returnArray(
                        self::CODE_SUCCESS,
                        self::MSG_SUCCESS,
                        array(
                            'targetUrl' => $url,
                            'curlResponse' => array(
                                'length' => strlen($res),
                                'content' => $res,
                            ),
                        )
                    );
                }


            } else {

                // curl init failed

                return $this->__returnArray(
                    self::ERR_CODE_CURL_INIT_FAILED,
                    self::ERR_MSG_CURL_INIT_FAILED
                );
            }

        }

        /**
         * Fetch url content via POST method
         *
         * @param string $url         The url
         * @param array  $postData    Post data to send
         * @param array  $curlOptions Additional CURL options
         *
         * @return array
         */

        function viaPost(string $url = '', array $postData = [], array $curlOptions = []): array {

            $url = trim($url);

            // check for nonempty url!

            if (!$url) {
                return $this->__returnArray(
                    self::ERR_CODE_EMPTY_URL,
                    self::ERR_MSG_EMPTY_URL
                );
            }

            $ch = curl_init();

            if ($ch) {

                // init success! Now, set options

                $curlPostOptions = [];

                if (is_array($curlOptions) && !empty($curlOptions)) {

                    foreach ($curlOptions as $k => $v) {

                        $curlPostOptions[$k] = $v;

                    }

                }

                // these options enforced by the function

                $curlPostOptions[CURLOPT_URL] = $url;
                $curlPostOptions[CURLOPT_RETURNTRANSFER] = TRUE;
                $curlPostOptions[CURLOPT_POST] = TRUE;
                $curlPostOptions[CURLOPT_POSTFIELDS] = $postData;
                $curlPostOptions[CURLOPT_SSL_VERIFYHOST] = false;
                $curlPostOptions[CURLOPT_SSL_VERIFYPEER] = false;

                curl_setopt_array($ch, $curlPostOptions);

                $res = curl_exec($ch);

                if ($res === FALSE) {

                    # request failed!

                    $returnData = array(
                        'targetUrl' => $url,
                        'postData' => $postData,
                        'curlError' => array(
                            'code' => curl_errno($ch),
                            'message' => curl_error($ch),
                        ),

                    );

                    curl_close($ch);

                    return $this->__returnArray(
                        self::ERR_CODE_CURL_EXEC_FAILED,
                        self::ERR_MSG_CURL_EXEC_FAILED,
                        $returnData
                    );

                } else {

                    # request successful! Response is in $res

                    curl_close($ch);

                    return $this->__returnArray(
                        self::CODE_SUCCESS,
                        self::MSG_SUCCESS,
                        array(
                            'targetUrl' => $url,
                            'postData' => $postData,
                            'curlResponse' => array(
                                'length' => strlen($res),
                                'content' => $res,
                            ),
                            'curl_options' => $curlPostOptions,
                        )
                    );
                }


            } else {

                // curl init failed

                return $this->__returnArray(
                    self::ERR_CODE_CURL_INIT_FAILED,
                    self::ERR_MSG_CURL_INIT_FAILED
                );
            }

        }

        /**
         * Performs a DELETE http request
         *
         * @param string $url
         * @param array  $curlOptions
         *
         * @return array
         *
         * @author Anjan Bhowmik
         */

        function viaDelete(string $url = '', array $curlOptions = []): array {

            $url = trim($url);

            // check for nonempty url!

            if (!$url) {
                return $this->__returnArray(
                    self::ERR_CODE_EMPTY_URL,
                    self::ERR_MSG_EMPTY_URL
                );
            }

            $ch = curl_init();

            if ($ch) {

                // init success! Now, set options

                $curlDeleteOptions = [];

                if (is_array($curlOptions) && !empty($curlOptions)) {

                    foreach ($curlOptions as $k => $v) {

                        $curlDeleteOptions[$k] = $v;

                    }

                }

                // these options enforced by the function

                $curlDeleteOptions[CURLOPT_URL] = $url;
                $curlDeleteOptions[CURLOPT_RETURNTRANSFER] = true;
                $curlDeleteOptions[CURLOPT_SSL_VERIFYHOST] = false;
                $curlDeleteOptions[CURLOPT_SSL_VERIFYPEER] = false;
                $curlDeleteOptions[CURLOPT_CUSTOMREQUEST] = 'DELETE';

                curl_setopt_array($ch, $curlDeleteOptions);

                $res = curl_exec($ch);

                if ($res === false) {

                    # request failed!

                    $returnData = array(
                        'targetUrl' => $url,
                        'curlError' => array(
                            'code' => curl_errno($ch),
                            'message' => curl_error($ch),
                        ),

                    );

                    curl_close($ch);

                    return $this->__returnArray(
                        self::ERR_CODE_CURL_EXEC_FAILED,
                        self::ERR_MSG_CURL_EXEC_FAILED,
                        $returnData
                    );

                } else {

                    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

                    # request successful! Response is in $res

                    curl_close($ch);

                    return $this->__returnArray(
                        self::CODE_SUCCESS,
                        self::MSG_SUCCESS,
                        array(
                            'targetUrl' => $url,
                            'curlResponse' => array(
                                'http_code' => $http_code,
                                'length' => strlen($res),
                                'content' => $res,
                            ),
                            'curl_options' => $curlDeleteOptions,
                        )
                    );
                }


            } else {

                // curl init failed

                return $this->__returnArray(
                    self::ERR_CODE_CURL_INIT_FAILED,
                    self::ERR_MSG_CURL_INIT_FAILED
                );
            }

        }
    }