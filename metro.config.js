

const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push(
  // Adds support for `.db` files for SQLite databases
  'vrx'
);
config.resolver.assetExts.push(
  'obj',
  'mtl',
  'tif',
  'fbx'
)

module.exports = config;
