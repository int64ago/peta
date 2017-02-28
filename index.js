#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const semver = require('semver');
const spawn = require('child_process').spawnSync;

const _dirname = process.cwd();
const package = require(path.join(_dirname, './package'));

if (!spawn) {
  return console.error('Node v7.6+ is required!');
}

const createBeta = (package) => {
  const cmd = spawn('npm', ['show', package.name, 'dist-tags', '--json'])
  const ver = JSON.parse(cmd.stdout.toString());

  const onlineVer = ver.beta || ver.latest;
  const distVer = package.version;
  const version = semver.gt(onlineVer, distVer) ? onlineVer : distVer;
  return semver.inc(version, 'prerelease', 'beta');
}

const UpdateVersion = (version) => {
  const _file = path.join(_dirname, 'package.json');
  let content = fs.readFileSync(_file, 'utf-8');
  content = content.replace(/("version": ")([\s\S]+?)(",)/, `$1${version}$3`);
  fs.writeFileSync(_file, content, 'utf-8');
}

const publish = () => {
  const cmd = spawn('npm', ['publish', '--tag', 'beta']);
  const out = cmd.stderr.toString().trim() || cmd.stdout.toString().trim();
  console.log(out);
}

const betaVer = createBeta(package);

UpdateVersion(betaVer);
publish();
UpdateVersion(package.version);
