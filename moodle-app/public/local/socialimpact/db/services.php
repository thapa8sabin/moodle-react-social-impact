<?php


defined('MOODLE_INTERNAL') || die();

$functions = [
    'local_socialimpact_get_user_progress' => [
        'classname'   => 'local_socialimpact\\external',
        'methodname'  => 'get_user_progress',
        'description' => 'Retrieve the completed and total lessons for a specific user.',
        'type'        => 'read',
        'capabilities' => 'moodle/user:viewdetails',
        'ajax'        => true,
    ],
    'local_socialimpact_set_user_progress' => [
        'classname'   => 'local_socialimpact\\external',
        'methodname'  => 'set_user_progress',
        'description' => 'Set or update the completed and total lessons for a specific user.',
        'type'        => 'write',
        'capabilities' => 'moodle/user:update',
        'ajax'        => true,
    ],
];

$services = [
    'Social Impact Progress Service' => [
        'functions' => [
            'local_socialimpact_get_user_progress',
            'local_socialimpact_set_user_progress',
        ],
        'restrictedusers' => 0,
        'enabled' => 1,
    ],
];
