## Description
In order to have semantic release for Laravel projects.
Change the version in packages.json and composer.json

## Install

```bash
$ npm install --save-dev semantic-release @lime/semantic-release-laravel
```

## Usage

The shareable config can be configured in the [**semantic-release** configuration file](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration):

```json
{
  "extends": "@lime/semantic-release-laravel"
}
```


## Full GH Actions example

```yml
name: Release and Publish
on:
  push:
    branches:
      - main
      - master
      - dev

jobs:
  semantic-release:
    name: Run Semantic Release
    if: "!contains(github.event.head_commit.message, '[skip ci]')"
    strategy:
      fail-fast: false
      matrix:
        os: [ubuntu-20.04]
    runs-on: ${{ matrix.os }}
    steps:
      - uses: actions/checkout@v2
      - name: Create a new release and bump version
        id: semantic
        uses: cycjimmy/semantic-release-action@v2
        with:
          semantic_version: 17.3.9
          extends: '@limetech/semantic-release-laravel'
          branches: |
            [
              "main",
              "master",
              {"name": "dev", "prerelease": true}
            ]
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

```
