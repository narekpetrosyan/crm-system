const aliases = (prefix = `src`) => ({
  '@styles': `${prefix}/assets/styles`,
  '@components': `${prefix}/components`,
  '@utils': `${prefix}/utils`,
  '@http': `${prefix}/http`,
  '@hooks': `${prefix}/hooks`,
  '@pages': `${prefix}/pages`,
  '@layouts': `${prefix}/layouts`,
});

module.exports = aliases;
