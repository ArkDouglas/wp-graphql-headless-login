<?php
/**
 * Activation Hook
 *
 * @package WPGraphql\Login
 * @since 0.0.1
 */

if ( ! function_exists( 'graphql_login_activation_callback' ) ) {

	/**
	 * Runs when the plugin is activated.
	 *
	 * @since 0.0.1
	 */
	function graphql_login_activation_callback() : callable {
		return static function () : void {
			// Runs when the plugin is activated.
			do_action( 'graphql_login_activate' );

			// store the current version of the plugin.
			update_option( 'wp_graphql_login_version', WPGRAPHQL_LOGIN_VERSION );
		};
	}
}
