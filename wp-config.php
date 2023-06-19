<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'wordpress-db' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */

if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

define( 'WP_ENVIRONMENT_TYPE', 'local' );
define('WP_HOME','http://localhost');
define('WP_SITEURL','http://localhost');

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

define('AUTH_KEY',         '5LQWjZplHiLVhCoNzo3hMo9i2wOLFJhMr9G6hXj50vNnlgD2Hr3SxKXatmRZ4gclmkI2T+KGwizDUVjVMSTk/Q==');
define('SECURE_AUTH_KEY',  'qpF+E+x3b8nva3N62MWhKgnmyK5E4ps9h1D5KvoFcjGvByToQEzMydn6AnNFH49m2ec2OrRoJTBUfILSurY/1A==');
define('LOGGED_IN_KEY',    'YBuxqpk6aDSXboCH18LP1JcQjLBI1nKbYNjzsaOdYWzPld6ga/ISueWWGzevAIiDstpN+LTr/OI2XOT0Uu5xlQ==');
define('NONCE_KEY',        '9s2WdCI5DMTTYI7s0VTmwyjBnF4r+uBfjLdNMWT7EVnth9+9LZBrG80L0HN3MWeXbL7BW3dwCF4vnWecwEuBIA==');
define('AUTH_SALT',        'Qt5owtPVu5XkWzNvA9TfQONkf55KYtH1I6Oa5/dyuFI7w29G21r/dWt2l4JY+2LWVsg77hozHi4dImVKeKtMsQ==');
define('SECURE_AUTH_SALT', 'v8XUpzLuz69QZy0AmUY0WOOogya/OBEA64ehBYcCgqaqsr4/0f/2dAj0VNSwgT5tgRWP5JdhHd52JY4L9gWT/Q==');
define('LOGGED_IN_SALT',   'bomW3cmoJydA3mHGR0xzqbGCFZTBSkgeqGdGeBhGfQ3qQUTQQFIM1nRSr/wFIwoHUfk6k9cC9r4DYxSSwUFlzQ==');
define('NONCE_SALT',       'YzqrTsO0KFcEcQGvfIj9CvmYRwJxtsCrVDg8iX+K+PCZTr0ueImUoZ9gQ9U6j5va/T1HbN+OACvKrCzfXfYtvg==');