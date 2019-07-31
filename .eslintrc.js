module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ['plugin:vue/essential', '@vue/prettier'],
	rules: {
		// 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		eqeqeq: 0,
		indent: [0, 4], //缩进风格
		'no-tabs': 'off',
		'no-undef': 'off',
		camelcase: 'off',
		'no-unreachable': 0,
		'no-console': 0, //禁止使用console
		'generator-star-spacing': 'off',
		'linebreak-style': [0, 'windows'], //换行风格
		'space-before-function-paren': [0, 'always'], //函数定义时括号前面要不要有空格
		'vue/no-parsing-error': [, { 'x-invalid-end-tag': false }],
		'brace-style': [0, 'stroustrup', { allowSingleLine: true }]
	},
	parserOptions: {
		parser: 'babel-eslint'
	}
}
