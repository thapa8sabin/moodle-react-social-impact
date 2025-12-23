<?php

use core\lang_string;

defined('MOODLE_INTERNAL') || die();

if ($hassiteconfig) {
    // No specific settings at this time. Add config options here if needed.
    $settings = new admin_settingpage('local_socialimpact_settings', new lang_string('pluginname', 'local_socialimpact'));
    $ADMIN->add('localplugins', $settings);
}
