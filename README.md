# peta = publish-beta
Publish npm package in beta tag with version number automatically increased.

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]

## Usage
 - `npm i peta -g`
 - In the root directory of project, run `peta`

## How
The published version is based on three versions:
 - `onlineLatest` - max version in latest tag
 - `onlineBeta` - max version in beta tag
 - `local` - read from `package.json`

Then, we get `version` from `max(onlineBeta || onlineLatest, local)`

At last, we publish `semver.inc(version, 'prerelease', 'beta')` with beta tag
> FYI: [semver](https://github.com/npm/node-semver)

## LICENSE
MIT

[downloads-image]: https://img.shields.io/npm/dm/peta.svg
[npm-url]: https://npmjs.org/package/peta
[npm-image]: https://img.shields.io/npm/v/peta.svg
