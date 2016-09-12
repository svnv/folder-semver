'use strict'
// predict version based on changes between 2 folders

// the general idea here is that is that if the file names in the prev version
// are equal to the changed version, but the content is different, then the 
// update type is a 'patch', if there are more files in the changed path the update 
// type is a 'minor' and if there are some files from the old version not
// present in the changed version the update type is a 'major'.

var dircompare = require('dir-compare');
var colors = require("colors/safe");

module.exports = function(oldPath, changedPath, options){
	var res = dircompare.compareSync(oldPath,changedPath, {compareContent: true});
	if(options && options.verbose){
		logChanges(res.diffSet);
	}
	if(res.left){
		return 'major';
	}
	if(res.right){
		return 'minor';
	}
	if(res.distinct){
		return 'patch';
	}
	return null;
}

function logChanges(diffSet){
	diffSet.forEach(function(f){
		if(f.state === 'right'){
			console.log(colors.green('+ ' + f.name2));
		}
		if(f.state === 'left'){
			console.log(colors.red('- ' + f.name1));
		}
		if(f.state === 'distinct'){
			console.log(colors.yellow('~ ' + f.name1));
		}
	});
}
