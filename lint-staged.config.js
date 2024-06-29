export default {
  '*.{cjs,js,json,jsx,mjs,ts,tsx,md}':
    'biome format --write --no-errors-on-unmatched',
  '*.{cjs,js,jsx,mjs,ts,tsx}': 'biome lint --apply --no-errors-on-unmatched',
};
