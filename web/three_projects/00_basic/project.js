window.onload = function() {
	// Set the scene size.
	var WIDTH = 400;
	var HEIGHT = 300;

	// Set some camera attributes.
	var VIEW_ANGLE = 60;
	var ASPECT = WIDTH / HEIGHT;
	var NEAR = 0.1;
	var FAR = 1000;

	// Create the scene object
	var scene = new THREE.Scene();
	
	// Create the camera object and set its position and where it points to
	var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	camera.position.set(0,3,5);
	camera.lookAt(new THREE.Vector3(0,0,0));
	
	// Create the renderer and set its size and default color
	var renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(WIDTH, HEIGHT);
	renderer.setClearColor(0xeeeeee);
	
	// Add the renderer to the html
	document.body.appendChild(renderer.domElement);

	// A mesh is created from geometry and material, then added to the scene
	// The mesh in this case is a wireframe box with a gray color
	var box = new THREE.Mesh(
		new THREE.BoxGeometry( 1, 1, 1),
		new THREE.MeshBasicMaterial( { color: 0x222222, wireframe: true } )
	);
	scene.add( box );

	// Add the box to the renderer (so it's actually visible)
	renderer.render(scene,camera);
	
	// Create controls to move the camera with the mouse
	var controls = new THREE.OrbitControls(camera,renderer.domElement);
	controls.addEventListener('change',function() {renderer.render(scene,camera);});
}


