import Home from 'Home.js';


const gltfPipeline = require('gltf-pipeline');
const fsExtra = require('fs-extra');
const gltfToGlb = gltfPipeline.gltfToGlb;

const filePath = 'model.gltf';
const gltf = fsExtra.readJsonSync(filePath);

const options = {
    resourceDirectory : '.'
};

gltfToGlb(gltf, options).then(function(results) {
    fsExtra.writeFileSync('model.glb', results.glb);
}).catch(function(error) {
    console.log(error);
});


