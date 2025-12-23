<?php

namespace local_socialimpact;

use core_external\external_api;
use core_external\external_function_parameters;
use core_external\external_value;
use core_external\external_single_structure;
use core\exception\invalid_parameter_exception;

defined('MOODLE_INTERNAL') || die();

require_once($CFG->dirroot . '/lib/external/externallib.php');

class external extends external_api
{

    /**
     * Parameters for get_user_progress.
     *
     * @return external_function_parameters
     */
    public static function get_user_progress_parameters()
    {
        return new external_function_parameters([
            'userid' => new external_value(PARAM_INT, 'User ID'),
            'courseid' => new external_value(PARAM_INT, 'Course ID', VALUE_OPTIONAL),
        ]);
    }

    /**
     * Get user progress.
     *
     * @param int $userid The user ID
     * @param int $courseid The course ID
     * @return array Progress data
     */
    public static function get_user_progress($userid, $courseid)
    {
        global $DB;

        $params = self::validate_parameters(self::get_user_progress_parameters(), ['userid' => $userid, 'courseid' => $courseid]);
        $userid = $params['userid'];
        $courseid = $params['courseid'];

        // Basic context validation (system context for simplicity).
        $context = \context_system::instance();
        self::validate_context($context);

        if (!$DB->record_exists('user', ['id' => $userid, 'deleted' => 0])) {
            throw new invalid_parameter_exception('Invalid user ID');
        }

        $record = $DB->get_record('local_socialimpact', ['userid' => $userid, 'courseid' => $courseid]);
        if ($record) {
            $data = [
                'completed' => (int) $record->completed,
                'total' => (int) $record->total,
            ];
        } else {
            $data = [
                'completed' => 0,
                'total' => 0,
            ];
        }

        return $data;
    }

    /**
     * Returns for get_user_progress.
     *
     * @return external_single_structure
     */
    public static function get_user_progress_returns()
    {
        return new external_single_structure([
            'completed' => new external_value(PARAM_INT, 'Completed lessons'),
            'total' => new external_value(PARAM_INT, 'Total lessons'),
        ]);
    }

    /**
     * Parameters for set_user_progress.
     *
     * @return external_function_parameters
     */
    public static function set_user_progress_parameters()
    {
        return new external_function_parameters([
            'userid' => new external_value(PARAM_INT, 'User ID'),
            'courseid' => new external_value(PARAM_INT, 'Course ID'),
            'completed' => new external_value(PARAM_INT, 'Completed lessons', VALUE_REQUIRED, 0, VALUE_OPTIONAL),
            'total' => new external_value(PARAM_INT, 'Total lessons', VALUE_REQUIRED, 0, VALUE_OPTIONAL),
        ]);
    }

    /**
     * Set user progress.
     *
     * @param int $userid The user ID
     * @param int $courseid The user ID
     * @param int $completed Completed lessons
     * @param int $total Total lessons
     * @return array Success status
     */
    public static function set_user_progress($userid, $courseid, $completed, $total)
    {
        global $DB;

        $params = self::validate_parameters(self::set_user_progress_parameters(), [
            'userid' => $userid,
            'courseid' => $courseid,
            'completed' => $completed,
            'total' => $total,
        ]);
        $userid = $params['userid'];
        $courseid = $params['courseid'];
        $completed = max(0, (int) $params['completed']);
        $total = max(1, (int) $params['total']); // Ensure total >=1 to avoid division by zero if calculating percentage later

        // Basic context validation.
        $context = \context_system::instance();
        self::validate_context($context);

        if (!$DB->record_exists('user', ['id' => $userid, 'deleted' => 0])) {
            throw new invalid_parameter_exception('Invalid user ID');
        }

        $record = $DB->get_record('local_socialimpact', ['userid' => $userid, 'courseid' => $courseid]);
        $now = time();

        if ($record) {
            $record->completed = $completed;
            $record->total = $total;
            $record->timemodified = $now;
            $DB->update_record('local_socialimpact', $record);
        } else {
            $record = (object) [
                'userid' => $userid,
                'courseid' => $courseid,
                'completed' => $completed,
                'total' => $total,
                'timecreated' => $now,
                'timemodified' => $now,
            ];
            $DB->insert_record('local_socialimpact', $record);
        }

        return [
            'success' => true,
            'completed' => $completed,
            'total' => $total,
        ];
    }

    /**
     * Returns for set_user_progress.
     *
     * @return external_single_structure
     */
    public static function set_user_progress_returns()
    {
        return new external_single_structure([
            'success' => new external_value(PARAM_BOOL, 'Whether the update was successful'),
            'completed' => new external_value(PARAM_INT, 'The set completed value'),
            'total' => new external_value(PARAM_INT, 'The set total value'),
        ]);
    }
}
