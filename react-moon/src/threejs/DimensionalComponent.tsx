import React, { useCallback } from 'react';
import {
	Scene,
	PerspectiveCamera,
	WebGLRenderer,
	BoxGeometry,
	MeshBasicMaterial,
	Mesh,
	Vector3,
	PlaneGeometry,
	DoubleSide,
	Renderer,
	Camera,
	MeshPhongMaterial,
	PointLight,
	SphereGeometry,
	ImageUtils,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const DimensionalComponent = () => {
	const handleRefChange = useCallback((node: HTMLDivElement) => {
		if (!node) {
			return;
		}

		const scene = new Scene();

		const floor = makeFloor(20, 20);
		floor.name = 'floor';
		floor.rotation.x = (90 / 360) * 2 * Math.PI;

		scene.add(floor);

		const box = makeBox(1, 1, 1);
		box.name = 'box-1';
		box.position.y = (box.geometry as any).parameters.height / 2;
		// box.translateZ(-5);

		floor.add(box);
		// scene.add(box);

		const moon = makeMoon();
		floor.add(moon);

		const pointLight = makePointLight('white', 1);
		pointLight.position.y = 5;

		scene.add(pointLight);

		const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
		camera.position.x = 1;
		camera.position.y = 5;
		camera.position.z = 5;
		camera.lookAt(new Vector3(0, 0, -5));

		const renderer = new WebGLRenderer();
		renderer.shadowMap.enabled = true;
		renderer.setClearColor('pink');
		renderer.setSize(window.innerWidth, window.innerHeight);

		node.appendChild(renderer.domElement);

		const controls = new OrbitControls(camera, renderer.domElement);

		update(renderer, scene, camera, controls);
	}, []);

	return <div ref={handleRefChange}></div>;
};

const update = (renderer: Renderer, scene: Scene, camera: Camera, controls: OrbitControls) => {
	renderer.render(scene, camera);

	const floor = scene.getObjectByName('floor');
	if (floor) {
		// floor.rotation.y += 0.002;
	}

	controls.update();

	requestAnimationFrame(() => {
		update(renderer, scene, camera, controls);
	});
};

const makeFloor = (width: number, depth: number) => {
	const geo = new PlaneGeometry(width, depth);
	const material = new MeshPhongMaterial({
		color: 'green',
		side: DoubleSide,
	});
	const mesh = new Mesh(geo, material);
	mesh.receiveShadow = true;
	return mesh;
};

const makeMoon = () => {
	const geo = new SphereGeometry(3, 42, 42);
	const tex = ImageUtils.loadTexture('./pic.jpg');
	const material = new MeshBasicMaterial({
		map: tex,
	});
	const mesh = new Mesh(geo, material);
	mesh.position.set(0, 25, 0);
	return mesh;
};

const makeBox = (width: number, height: number, depth: number) => {
	const geo = new BoxGeometry(width, height, depth);
	const material = new MeshPhongMaterial({
		color: 'red',
	});
	const mesh = new Mesh(geo, material);
	mesh.castShadow = true;
	return mesh;
};

const makePointLight = (color: string, intensity: number) => {
	const light = new PointLight(color, intensity);
	light.castShadow = true;
	return light;
};

export default DimensionalComponent;
