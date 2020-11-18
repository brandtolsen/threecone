import {Scene, WebGLRenderer} from 'three';
import Cone from './cone';
import Camera from './camera';

var scene = new Scene();
var camera = Camera();


var renderer = new WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

scene.add(Cone(0xff00ff))



const animate = () => {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();