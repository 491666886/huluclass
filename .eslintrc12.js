module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  plugins:[
  'vue',
  'html'
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'no-console': 'off',
    "parser": "vue-eslint-parser"
  }
}