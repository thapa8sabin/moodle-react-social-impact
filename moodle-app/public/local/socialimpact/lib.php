<?php



defined('MOODLE_INTERNAL') || die();

/**
 * Get user progress (internal function, for use within Moodle).
 *
 * @param int $userid The user ID.
 * @return array Progress data with completed and total.
 */
function local_socialimpact_get_progress(int $userid): array
{
    global $DB;
    $record = $DB->get_record('local_socialimpact', ['userid' => $userid]);
    if ($record) {
        return [
            'completed' => (int) $record->completed,
            'total' => (int) $record->total,
        ];
    }
    return ['completed' => 0, 'total' => 0];
}
