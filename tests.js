var assert = require('assert')
var dircompare = require('dir-compare')
var folderSemver = require('./index')

// dir-compare mock responses
const mockDiffSetEmptyResponse = {} // null
const mockDiffSetAddedResponse = {right:[]} // minor
const mockDiffSetRemovedResponse = {left:[]} // major
const mockDiffSetChangdResponse = {distinct:[]} // patch
const mockDiffSetChangedAddedResponse = {distinct:[], right:[]} // minor
const mockDiffSetChangedRemovedResponse = {distinct:[], left:[]} // major
const mockDiffSetChangedRemovedAddedResponse = {left:[], right:[]} // major

const oldPath = 'oldPath'
const changedPath = 'changedPath'

function mockDircompare(set){
	dircompare.compareSync = () => set
}

describe('folderSemver', function() {
    it('Should return null with empty folders', function() {
	   	//setup mock here
	   	mockDircompare(mockDiffSetEmptyResponse);
      	assert.equal(null, folderSemver(oldPath, changedPath));
    });
	it('Should return major with removed', function() {
	   	//setup mock here
	   	mockDircompare(mockDiffSetRemovedResponse);
      	assert.equal('major', folderSemver(oldPath, changedPath));
    });
    it('Should return minor with added', function() {
	   	//setup mock here
	   	mockDircompare(mockDiffSetAddedResponse);
      	assert.equal('minor', folderSemver(oldPath, changedPath));
    });
	it('Should return patch with changed', function() {
	   	//setup mock here
	   	mockDircompare(mockDiffSetChangdResponse);
      	assert.equal('patch', folderSemver(oldPath, changedPath));
    });
	it('Should return minor with changed added', function() {
	   	//setup mock here
	   	mockDircompare(mockDiffSetChangedAddedResponse);
      	assert.equal('minor', folderSemver(oldPath, changedPath));
    });
	it('Should return major with changed and removed', function() {
	   	//setup mock here
	   	mockDircompare(mockDiffSetChangedRemovedResponse);
      	assert.equal('major', folderSemver(oldPath, changedPath));
    });    
	it('Should return major with changed and removed and added', function() {
	   	//setup mock here
	   	mockDircompare(mockDiffSetChangedRemovedAddedResponse);
      	assert.equal('major', folderSemver(oldPath, changedPath));
    });    
})
