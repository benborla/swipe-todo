module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: 'avoid',
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  endOfLine: 'lf',
  overrides: [
    {
      files: ['*.js', '*.jsx', 'src/**/*.ts', '*.tsx'],
      options: {
        semi: false,
      },
    },
  ],
}
