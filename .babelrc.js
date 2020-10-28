module.exports = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      process.env.NODE_ENV === 'development'
        ? { targets: { chrome: '76' } }
        : {
            targets: '> 0.25% in JP',
            useBuiltIns: 'usage',
            corejs: 3,
          },
    ],
    '@babel/preset-typescript',
  ],
  plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-syntax-dynamic-import'],
}
