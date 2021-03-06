var container = document.getElementById('container');
var renderer = new THREE.CanvasRenderer();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,1, 10000);
var distance = 1000;
var geometry = new THREE.Geometry();

renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

scene.add(camera);

//creation de la particule
for (var i=0; i<1000; i++) {
	var particule = new THREE.Particle(new THREE.ParticleCanvasMaterial({
		color: Math.random()*0x808080+0x808080,
		opacity: 1,
		program: function(context) {
			context.beginPath();
			context.arc(0,0,1,0,Math.PI*2,true);
			context.closePath();
			context.fill();
		}
	}));
	
	particule.position.x = Math.random()*distance*2-distance;
	particule.position.y = Math.random()*distance*2-distance;
	particule.position.z = Math.random()*distance*2-distance;
	particule.scale.x = particule.scale.y = Math.random()*10+5;
	
	//ceation du sommet d'un segment sur les particules
	geometry.vertices.push(new THREE.Vertex(particule.position));
	
	scene.add(particule);
}

//Creation des lignesd entre chaque sommet
var ligne = new THREE.Line(geometry, new THREE.LineBasicMaterial({
	color: 0xffffff,
	opacity: 0.05
}));
scene.add(ligne);

camera.position.z = 100;
camera.lookAt(scene);

renderer.render(scene, camera);

//pour faire bouger la camera
document.addEventListener( 'mousemove', onMouseMove, false );
function onMouseMove(event) {
	var mouseX = event.clientX - window.innerWidth/2;
	var mouseY = event.clientY - window.innerHeight/2;
	camera.position.x = mouseX;
	camera.position.y = mouseY;
	//camera.position.z = 10;
	camera.lookAt(scene.position);
	renderer.render(scene, camera);
}