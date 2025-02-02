<?php


    namespace Examples\Utility;


    use WebPowerup\Helpers\Utils;

    class HumanDateDiff {

        /**
         * Calculates date difference between 2 dates and generates a human readable string. <br><br>
         *
         *
         * Supported $params keys &mdash;
         *
         * <dl>
         *      <dt>$params['date1'] - string</dt>
         *      <dd>First datetime string</dd>
         *
         *      <dt>$params['date2'] - string</dt>
         *      <dd>Second datetime string</dd>
         *
         *      <dt>$params['top_parts'] - int</dt>
         *      <dd>Do we return all parts? like year, month, day, etc. or just first few parts,
         *          like first 2 available parts. Value of -1 returns all parts any value > 1
         *          return first few sections. Default value : -1
         *      </dd>
         *
         *      <dt>$params['no_invert'] - int</dt>
         *      <dd>Do we always force the difference non invert? The inversion flag is set when
         *          the date1 is less than date2. If we set no_invert = 1 than the diff object
         *          is always created by calling diff on lesser datetime object. Default value: 1
         *      </dd>
         * </dl>
         *
         *
         * @param array $params The parameters bundle
         *
         * @return array
         */

        public static function calculate(array $params = []): array {

            $date1 = ArrayValue::asString($params, 'date1');
            $date2 = ArrayValue::asString($params, 'date2');
            $top_parts = ArrayValue::asInt($params, 'top_parts', -1);
            $no_invert = ArrayValue::asInt($params, 'no_invert', 1);

            try {

                $datetime1 = new \DateTime($date1);

            } catch (\Exception $ex) {
                return Utils::returnArray(-1, "Invalid datetime : {$date1}", array());
            }

            try {

                $datetime2 = new \DateTime($date2);

            } catch (\Exception $ex) {
                return Utils::returnArray(-1, "Invalid datetime : {$date2}", array());
            }


            if ($no_invert) {
                if ($datetime1 >= $datetime2) {
                    $interval = $datetime2->diff($datetime1);
                } else {
                    $interval = $datetime1->diff($datetime2);
                }
            } else {
                $interval = $datetime1->diff($datetime2);
            }


            $temp = [];

            if ($interval->y > 0) {
                $temp[] = "{$interval->y} year" . ($interval->y > 1 ? 's' : '');
            }

            if ($interval->m > 0) {
                $temp[] = "{$interval->m} month" . ($interval->m > 1 ? 's' : '');
            }

            if ($interval->d > 0) {
                $temp[] = "{$interval->d} day" . ($interval->d > 1 ? 's' : '');
            }

            if ($interval->h > 0) {
                $temp[] = "{$interval->h} hour" . ($interval->h > 1 ? 's' : '');
            }

            if ($interval->i > 0) {
                $temp[] = "{$interval->i} minute" . ($interval->i > 1 ? 's' : '');
            }

            if ($interval->s > 0) {
                $temp[] = "{$interval->s} second" . ($interval->s > 1 ? 's' : '');
            }

            if ($top_parts >= 1) {
                $temp = array_slice($temp, 0, $top_parts);
            }

            return Utils::returnArray(1, 'Ok', [
                'diff_str' => join(' ', $temp),
                'diff_obj' => $interval,
            ]);

        }

        /**
         * Calculate difference and return result as string ...
         *
         * @param string $date1
         * @param string $date2
         * @param string $default_str
         * @param int    $top_parts
         *
         * @return string
         */

        public static function calculateString(string $date1, string $date2, string $default_str = '-', int $top_parts = 2) : string {

            $res = self::calculate([
                'date1' => $date1,
                'date2' => $date2,
                'top_parts' => $top_parts,
                'no_invert' => 1
            ]);

            if($res['code'] <= 0) {
                return $default_str;
            } else {
                return ArrayValue::asString($res,'data/diff_str');
            }

        }

        /**
         * Calculates difference from current time
         *
         * @param string $date
         * @param string $default_str
         * @param int    $top_parts
         *
         * @return string
         */

        public static function calculateStringFromNow(string $date, string $default_str = '-', int $top_parts = 2): string {

            $res = self::calculate([
                'date1' => $date,
                'date2' => date('Y-m-d H:i:s'),
                'top_parts' => $top_parts,
                'no_invert' => 1
            ]);

            if ($res['code'] <= 0) {
                return $default_str;
            } else {
                return ArrayValue::asString($res, 'data/diff_str');
            }

        }

    }