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
	camera.lookAt(new THREE.Vector3(5,0,0));
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

	function addSphere(xPosition, yPosition, zPosition, size, faces) {
		// A mesh is created from geometry and material, then added to the scene
		// The mesh in this case is an octahedron (sphere approximation) 
		var geometry = new THREE.OctahedronGeometry(size,faces);
		var material = new THREE.MeshStandardMaterial({
			color: 0xff0051,
			flatShading: true,
			metalness: 0,
			roughness: 0.8
		});
		var roughSphere = new THREE.Mesh(geometry, material);
		
		//set the sphere position based on where we are in the loop (use the loop variable)
		roughSphere.position.x = xPosition;
		roughSphere.position.y = yPosition;
		roughSphere.position.z = zPosition;
		
		scene.add(roughSphere);
	}

	// A loop that creates 5 spheres of the same type
	// note how each sphere is shifted over 2 units from the last
	for (var i = 0; i < 5; i++) {
		addSphere(-4 + 2*i, 0, 0, 1, 2);
	}

	// Add the box to the renderer (so it's actually visible)
	renderer.render(scene,camera);

	// A 3D vector that represents the mouse position shooting out into the scene
	var raycaster = new THREE.Raycaster();
	
	// The 2D vector representing the mouse's position on the screen
	var mouse = new THREE.Vector2(1,1);

	// Function that triggers when the mouse is clicked
	function onMouseMove( event ) {
		
		// calculate mouse position in normalized device coordinates
		// (-1 to +1) for both components
		mouse.x = ( event.clientX / WIDTH ) * 2 - 1;
		mouse.y = ( event.clientY / HEIGHT ) * 2 - 1;
		
	}

	// Function that triggers when the browser window is able to re-draw the screen
	function render() {
		
		// update the picking ray with the camera and mouse position
		raycaster.setFromCamera( mouse, camera );

		// calculate objects intersecting the picking ray
		var intersects = raycaster.intersectObjects( scene.children );

		// Loop over all objects the mouse vector intersected with and change their color to blue
		for ( var i = 0; i < intersects.length; i++ ) {
			console.log("test");
			intersects[ i ].object.material.color.set( 0x0000ff );

		}

		// Call the renderer to update the scene with the new changes
		renderer.render( scene, camera );

		// Call the render function again when the window is ready
		window.requestAnimationFrame(render);
	}

	// Add the onMouseMove function to the canvas HTML element
	document.querySelector("canvas").addEventListener( 'mousemove', onMouseMove, false );

	// Trigger the first instance of the render function
	window.requestAnimationFrame(render);
}


