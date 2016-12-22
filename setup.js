module.exports = {
  // clean the following files by either clearing them
  // (by specifying {clear: true}) or by removing lines
  // that match a regex pattern
  clean: [
    {
      file: 'app/app.global.css',
      clear: true
    },
    {
      file: 'test/e2e.js',
      clear: true
    },
    {
      file: 'README.md',
      clear: true
    }
  ],
  // add the following files to the project, mostly
  // related to .gitkeep for version control
  add: [
    { file: 'app/actions/.gitkeep' },
    { file: 'test/actions/.gitkeep' },
    { file: 'test/components/.gitkeep' },
    { file: 'test/containers/.gitkeep' },
    { file: 'test/reducers/.gitkeep' }
  ]
};
