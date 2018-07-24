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
	
	// Enable the shadow map in the renderer
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	// Create the camera object
	var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	
	// Create controls to move the camera with the mouse
	var controls = new THREE.OrbitControls(camera,renderer.domElement);
	controls.addEventListener('change',function() {renderer.render(scene,camera);});
	
	// Set camera position and where it points to
	camera.position.set(0,30,50);
	camera.lookAt(new THREE.Vector3(0,15,0));
	controls.update();
	
	// Add the renderer to the html
	document.body.appendChild(renderer.domElement);

	// Create and add ambient light to the scene
	var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	scene.add(ambientLight);
	
	// Create a point light
	var pointLight = new THREE.PointLight(0xffffff,1);
	pointLight.position.set(25,50,25);
	
	// Have the point light create shadows (why don't we do this for the ambient light?)
	pointLight.castShadow = true;
	pointLight.shadow.mapSize.width = 1024; //size effects quality of shadow, must be a power of 2
	pointLight.shadow.mapSize.height = 1024;
	
	// Add a visual indication of the light's "camera" that figues out the shadow
	//var shadowCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);
	//scene.add(shadowCameraHelper);
	
	// Add the point light to the scene
	scene.add(pointLight);

	// Create a plane for the sphere to cast a shadow
	var planeMaterial = new THREE.MeshStandardMaterial({
		color: 0x999999,
		flatShading: true,
		metalness: 0.0,
		roughness: 0.6
	});
	var planeGeometry = new THREE.BoxGeometry(70, 0.1, 70);
	// Create the mesh that the sphere will cast the shadow onto (it's a large, flat plane the sphere sits on)
	var planeMesh = new THREE.Mesh(
		planeGeometry,
		planeMaterial
	);
	// Don't make the plane cast a shadow
	planeMesh.castShadow = false;
	// Make it able to receive shadows though
	planeMesh.receiveShadow = true;
	
	// Add the plane to the scene
	scene.add(planeMesh);

	// A mesh is created from geometry and material, then added to the scene
	// The mesh in this case is an octahedron (sphere approximation) 
	var geometry = new THREE.OctahedronGeometry(10,3);
	var material = new THREE.MeshStandardMaterial({
		color: 0xff0051,
		flatShading: true,
		metalness: 0,
		roughness: 0.8
	});
	var shapeOne = new THREE.Mesh(geometry, material);
	shapeOne.position.y += 10;
	// Make the sphere cast a shadow
	shapeOne.castShadow = true;
	// Don't make it able to receive shadows though
	shapeOne.receiveShadow = false;
	scene.add(shapeOne);
	
	// Call the renderer to update the scene after our changes
	renderer.render(scene,camera);

}


