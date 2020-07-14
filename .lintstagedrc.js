#!/usr/bin/env node

module.exports = {
  '*.{js,jsx,ts,tsx}': ['./node_modules/.bin/prettier --write', './node_modules/.bin/eslint --fix'],
};
