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
	camera.position.set(0,12,20);
	camera.lookAt(new THREE.Vector3(0,0,0));

	// Create the renderer and set its size and default color
	var renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(WIDTH, HEIGHT);
	renderer.setClearColor(0xeeeeee);
	
	// Add the renderer to the html
	document.body.appendChild(renderer.domElement);

	// Create and add ambient light to the scene
	var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	scene.add(ambientLight);
	
	// Create and add a point light to the scene
	var pointLight = new THREE.PointLight(0xffffff,1);
	pointLight.position.set(25,50,25);
	scene.add(pointLight);

	// A mesh is created from geometry and material, then added to the scene
	// The mesh in this case is an octahedron (sphere approximation) 
	var geometry = new THREE.OctahedronGeometry(7,2);
	var material = new THREE.MeshStandardMaterial({
		color: 0xff0051,
		flatShading: true,
		metalness: 0,
		roughness: 0.8
	});
	var roughSphere = new THREE.Mesh(geometry, material);
	scene.add(roughSphere);

	// Add the box to the renderer (so it's actually visible)
	renderer.render(scene,camera);

	// Create controls to move the camera with the mouse
	var controls = new THREE.OrbitControls(camera,renderer.domElement);
	controls.addEventListener('change',function() {renderer.render(scene,camera);});
}


