import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero implements AfterViewInit, OnDestroy {
  @ViewChild('globeCanvas', { static: true }) globeCanvas!: ElementRef<HTMLCanvasElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private globe!: THREE.Mesh;
  private connections: THREE.Line[] = [];
  private atmosphere!: THREE.Mesh;
  private animationId!: number;

  ngAfterViewInit(): void {
    this.initThreeJS();
    this.createGlobe();
    this.createAtmosphere();
    this.createConnections();
    this.setupLighting();
    this.animate();
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  private initThreeJS(): void {
    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff); // Pure white background

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.globeCanvas.nativeElement,
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Handle window resize
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  private createGlobe(): void {
    // Create globe geometry - larger sphere
    const geometry = new THREE.SphereGeometry(2, 64, 32);

    // Load high-quality Earth texture
    const textureLoader = new THREE.TextureLoader();
    const globeTexture = textureLoader.load('https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/earthmap1k.jpg'); // High-quality Earth texture

    // Create material with texture and transparency
    const material = new THREE.MeshPhongMaterial({
      map: globeTexture,
      transparent: true,
      opacity: 0.8, // Slightly more opaque for better visibility
      side: THREE.DoubleSide
    });

    this.globe = new THREE.Mesh(geometry, material);
    this.globe.rotation.z = 0.3; // Slight tilt
    this.scene.add(this.globe);

    // Add major city markers
    this.addCityMarkers();
  }

  private addCityMarkers(): void {
    // Major cities coordinates (latitude, longitude)
    const cities = [
      { name: 'New York', lat: 40.7128, lng: -74.0060, color: 0xff0000 },
      { name: 'London', lat: 51.5074, lng: -0.1278, color: 0x00ff00 },
      { name: 'Tokyo', lat: 35.6762, lng: 139.6503, color: 0x0000ff },
      { name: 'Sydney', lat: -33.8688, lng: 151.2093, color: 0xffff00 },
      { name: 'Dubai', lat: 25.2048, lng: 55.2708, color: 0xff00ff },
      { name: 'Mumbai', lat: 19.0760, lng: 72.8777, color: 0x00ffff },
      { name: 'São Paulo', lat: -23.5505, lng: -46.6333, color: 0xffa500 },
      { name: 'Berlin', lat: 52.5200, lng: 13.4050, color: 0x800080 }
    ];

    cities.forEach(city => {
      this.createCityMarker(city.lat, city.lng, city.color);
    });
  }

  private createCityMarker(lat: number, lng: number, color: number): void {
    // Convert lat/lng to 3D coordinates
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);

    const x = -(2.01 * Math.sin(phi) * Math.cos(theta)); // Slightly above surface
    const z = 2.01 * Math.sin(phi) * Math.sin(theta);
    const y = 2.01 * Math.cos(phi);

    // Create marker geometry
    const markerGeometry = new THREE.SphereGeometry(0.02, 8, 8);
    const markerMaterial = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.9
    });

    const marker = new THREE.Mesh(markerGeometry, markerMaterial);
    marker.position.set(x, y, z);
    this.scene.add(marker);

    // Add pulsing effect
    this.animateCityMarker(marker);
  }

  private animateCityMarker(marker: THREE.Mesh): void {
    const animate = () => {
      const time = Date.now() * 0.005;
      const scale = 1 + Math.sin(time) * 0.3;
      marker.scale.setScalar(scale);

      const material = marker.material as THREE.MeshBasicMaterial;
      material.opacity = 0.7 + Math.sin(time) * 0.3;

      requestAnimationFrame(animate);
    };
    animate();
  }

  private createAtmosphere(): void {
    // Create atmosphere/glow effect - larger to match globe
    const atmosphereGeometry = new THREE.SphereGeometry(2.2, 64, 32);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: this.getComputedStyle('--brand-300'), // Light brand color
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide
    });

    this.atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    this.scene.add(this.atmosphere);
  }

  private createConnections(): void {
    // Create dynamic connection lines representing data flow
    for (let i = 0; i < 8; i++) {
      this.createConnection();
    }
  }

  private createConnection(): void {
    // Generate random points on sphere surface
    const point1 = this.getRandomPointOnSphere();
    const point2 = this.getRandomPointOnSphere();

    const geometry = new THREE.BufferGeometry().setFromPoints([point1, point2]);

    // Random brand color for connections
    const colors = ['--brand-400', '--brand-500', '--brand-600'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const material = new THREE.LineBasicMaterial({
      color: this.getComputedStyle(randomColor),
      transparent: true,
      opacity: 0.6
    });

    const line = new THREE.Line(geometry, material);
    this.connections.push(line);
    this.scene.add(line);
  }

  private getRandomPointOnSphere(): THREE.Vector3 {
    const radius = 2; // Match globe radius
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    return new THREE.Vector3(x, y, z);
  }

  private setupLighting(): void {
    // Directional light to simulate sunlight
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    directionalLight.castShadow = false; // Disable shadows for performance
    this.scene.add(directionalLight);

    // Ambient light for subtle fill
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    this.scene.add(ambientLight);
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(this.animate.bind(this));

    // Rotate globe slowly
    this.globe.rotation.y += 0.005;

    // Animate atmosphere
    this.atmosphere.rotation.y += 0.003;

    // Animate connections (subtle pulsing)
    this.connections.forEach((connection, index) => {
      const material = connection.material as THREE.LineBasicMaterial;
      material.opacity = 0.3 + Math.sin(Date.now() * 0.001 + index) * 0.3;
    });

    this.renderer.render(this.scene, this.camera);
  }

  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private getComputedStyle(variable: string): number {
    // Get CSS custom property value and convert to hex
    const root = document.documentElement;
    const color = getComputedStyle(root).getPropertyValue(variable).trim();
    return parseInt(color.replace('#', ''), 16);
  }
}
