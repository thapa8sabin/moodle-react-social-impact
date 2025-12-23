<?php

namespace local_socialimpact\tests;

use advanced_testcase;
use local_socialimpact\external;

defined('MOODLE_INTERNAL') || die();

require_once($CFG->dirroot . '/lib/external/externallib.php');

class external_test extends advanced_testcase
{
    protected function setUp(): void
    {
        $this->resetAfterTest(true);
        $this->setAdminUser();
    }

    public function test_get_user_progress(): void
    {
        global $DB;

        // Create a test user.
        $user = $this->getDataGenerator()->create_user();

        // Create a test course.
        $course = $this->getDataGenerator()->create_course();

        // Insert a record into local_socialimpact table.
        $recordid = $DB->insert_record('local_socialimpact', [
            'userid' => $user->id,
            'courseid' => $course->id,
            'completed' => 5,
            'total' => 10,
        ]);

        // Call the external function.
        $result = external::get_user_progress($user->id, $course->id);

        // Assert the results.
        $this->assertIsArray($result);
        $this->assertArrayHasKey('completed', $result);
        $this->assertArrayHasKey('total', $result);
        $this->assertEquals(5, $result['completed']);
        $this->assertEquals(10, $result['total']);
    }
}
