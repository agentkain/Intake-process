const fs = require('fs');
const archiver = require('archiver');

const output = fs.createWriteStream('project.zip');
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('Project has been zipped successfully.');
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

// Add the project files to the zip
archive.directory('src/', 'src');
archive.directory('public/', 'public');
archive.file('package.json', { name: 'package.json' });
archive.file('tsconfig.json', { name: 'tsconfig.json' });
archive.file('vite.config.ts', { name: 'vite.config.ts' });
archive.file('index.html', { name: 'index.html' });
archive.file('README.md', { name: 'README.md' });

archive.finalize();