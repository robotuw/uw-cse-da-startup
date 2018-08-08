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

	// Create the renderer and set its size and default color
	var renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(WIDTH, HEIGHT);
	renderer.setClearColor(0xeeeeee);

	// Create the camera object
	var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	
	// Create controls to move the camera with the mouse
	var controls = new THREE.OrbitControls(camera,renderer.domElement);
	controls.addEventListener('change',function() {renderer.render(scene,camera);});
	
	// Set camera position and where it points to
	camera.position.set(0,5,5);
	camera.lookAt(new THREE.Vector3(0,0,0));
	controls.update();
	
	// Add the renderer to the html
	document.body.appendChild(renderer.domElement);

	// Create and add ambient light to the scene
	var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	scene.add(ambientLight);
	
	// Create and add a point light to the scene
	var pointLight = new THREE.PointLight(0xffffff,1);
	pointLight.position.set(25,50,25);
	scene.add(pointLight);

	var geometry = new THREE.OctahedronGeometry(1,2);
	var material = new THREE.MeshStandardMaterial({
		color: 0xff0051,
		flatShading: true,
		metalness: 0,
		roughness: 0.8
	});
	var roughSphere = new THREE.Mesh(geometry, material);
		
	//set the sphere position based on where we are in the loop (use the loop variable)
	roughSphere.position.x = 0;
	roughSphere.position.y = 0;
	roughSphere.position.z = 0;
	
	scene.add(roughSphere);
	
	var rotationSpeed = .005;

	// Function that triggers when the browser window is able to re-draw the screen
	function render() {
		
		console.log("test");
		
		roughSphere.rotation.y += .01;
		
		// Call the renderer to update the scene with the new changes
		renderer.render( scene, camera );

		// Call the render function again when the window is ready
		window.requestAnimationFrame(render);
	}

	// Trigger the first instance of the render function
	window.requestAnimationFrame(render);
}


