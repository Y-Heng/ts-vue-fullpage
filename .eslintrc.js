module.exports = {
  root: true,

  env: {
    node: true
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow generator-star-spacing
    'generator-star-spacing': 'off',
    // allow space-before-function
    'space-before-function-paren': 'off',
    // allow indent
    indent: 'off',
    // allow no-useless-escape
    'no-useless-escape': 'off',
    // allow camelcase
    camelcase: 'off'
  },

  parserOptions: {
    parser: '@typescript-eslint/parser'
  },

  extends: ['plugin:vue/essential', '@vue/standard', '@vue/typescript']
}
