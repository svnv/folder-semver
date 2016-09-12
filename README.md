# folder-semver

Compare two folders of assets and get a semver update type based on the differences in the files.

Use this module to keep track of changes in assets that are refered to  by file name. 

We treat the file names as the "method signatures", so for an asset that is changed but has the same name the change is a _patch_, whenver we add a file it is a _minor_ and when a file is deleted or moved the change is a _major_.


## How to use


`folderSemver(oldFolderPath, newFolderPath, options)`

Arguments:

- `oldFolderPath` string 
- `newFolderPath` string 
- `options` object, can be used to activate verbose mode


The exported function returns:

- `null` when there is no change in the files
- `"major"` when the old build contains files not present in the new build. _The api has changed and things depending of the old file structure might break._
- `"minor"` when files are added to the new build. _A new feature has been added to the api._  
- `"patch"` when the filenames are equal but there are other changes to the files. _A bug has been fixed but the api is unchanged._


### Example

	var folderSemver = require('folder-semver')
	folderSemver('oldBuild/assets', 'newBuild/assets');
	// returns "major", "minor", "patch" or null

### Example with verbose mode

Verbose mode will log a diff of the changes in the build to the console. 

	var folderSemver = require('folder-semver')
	folderSemver('oldBuild/assets', 'newBuild/assets');
	// + added_file.svg
	// - removed_file.svg
	// ~ changed_file.svg
	// returns "major", "minor", "patch" or null
	

## Tests

See [tests.js](https://github.com/svnv/folder-semver/blob/master/tests.js) for the test suite.

To run the test suite use this command.

	npm test
