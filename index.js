module.exports = {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/exec',
      {
        prepareCmd: "semantic-release-laravel bump ${nextRelease.version}"
      },
    ],
    [
      '@semantic-release/github',
      {
        assets: [
          {
            path: './dist/**',
          },
        ],
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['composer.json', 'package.json'],
        message:
          'chore(release): ${nextRelease.version}\n\n${nextRelease.notes}',
      },
    ],
  ],
};
