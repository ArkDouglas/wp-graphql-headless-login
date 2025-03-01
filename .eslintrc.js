module.exports = {
	extends: [
		'plugin:@wordpress/eslint-plugin/recommended',
		'plugin:you-dont-need-lodash-underscore/compatible',
	],
	globals: {
		fetchMock: true,
		IntersectionObserver: 'readonly',
		// @todo Move E2E related ESLint configuration into custom config.
		//
		// We should have linting properties only included for files that they
		// are specific to as opposed to globally.
		page: 'readonly',
		browser: 'readonly',
		context: 'readonly',
	},
	settings: {
		jsdoc: { mode: 'typescript' },
		// List of modules that are externals in our webpack config.
		// This helps the `import/no-extraneous-dependencies` and
		//`import/no-unresolved` rules account for them.
		'import/core-modules': [
			'@wordpress/block-editor',
			'@wordpress/a11y',
			'@wordpress/api-fetch',
			'@wordpress/compose',
			'@wordpress/data',
			'@wordpress/escape-html',
			'@wordpress/hooks',
			'@wordpress/keycodes',
			'@wordpress/url',
			'babel-jest',
			'dotenv',
			'jest-environment-puppeteer',
			'lodash/kebabCase',
			'lodash',
			'prop-types',
			'react',
			'requireindex',
		],
		'import/resolver': {
			node: {},
			webpack: {
				config: 'webpack.config.js',
			},
		},
		'import/ignore': ['node_modules'],
	},
	rules: {
		'react-hooks/exhaustive-deps': 'error',
		'react/jsx-fragments': ['error', 'syntax'],
		'@wordpress/no-global-active-element': 'warn',
		'@wordpress/i18n-text-domain': [
			'error',
			{
				allowedTextDomain: ['wp-graphql-headless-login'],
			},
		],
		camelcase: [
			'error',
			{
				properties: 'never',
				ignoreGlobals: true,
			},
		],
	},
	overrides: [
		{
			files: ['**/bin/**.js'],
			rules: {
				'you-dont-need-lodash-underscore/omit': 'off',
			},
		},
		{
			files: ['*.ts', '*.tsx'],
			parser: '@typescript-eslint/parser',
			extends: [
				'plugin:you-dont-need-lodash-underscore/compatible',
				'plugin:@typescript-eslint/recommended',
			],
			rules: {
				'prefer-rest-params': 'off',
				'@typescript-eslint/no-explicit-any': 'error',
				'no-use-before-define': 'off',
				'@typescript-eslint/no-use-before-define': ['error'],
				'jsdoc/require-param': 'off',
				'no-shadow': 'off',
				'@typescript-eslint/no-shadow': ['error'],
				'@typescript-eslint/no-unused-vars': [
					'error',
					{ ignoreRestSiblings: true },
				],
				camelcase: 'off',
				'@typescript-eslint/naming-convention': [
					'error',
					{
						selector: ['method', 'variableLike'],
						format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
						leadingUnderscore: 'allowSingleOrDouble',
						filter: {
							regex: 'webpack_public_path__',
							match: false,
						},
					},
					{
						selector: 'typeProperty',
						format: ['camelCase', 'snake_case'],
						filter: {
							regex: 'API_FETCH_WITH_HEADERS|Block',
							match: false,
						},
					},
				],
			},
		},
		{
			files: ['./assets/js/mapped-types.ts'],
			rules: {
				'@typescript-eslint/no-explicit-any': 'off',
				'@typescript-eslint/no-shadow': 'off',
				'no-shadow': 'off',
			},
		},
	],
};
