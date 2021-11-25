module.exports = {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/exec',
      {
        prepareCmd: "[ -f './composer.json' ] && $(cat <<< $(jq  --arg v ${nextRelease.version} '.version=$v' ./composer.json ) > ./composer.json) || echo 'composer.json dont exists skipping' && [ -f './package.json' ] && $(cat <<< $(jq  --arg v ${nextRelease.version} '.version=$v' ./package.json ) > ./package.json) || echo 'package.json dont exists skipping'"
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
