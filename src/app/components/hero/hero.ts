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
  private clouds!: THREE.Mesh;
  private asteroids: THREE.Mesh[] = [];
  private animationId!: number;
  private isMobile: boolean = false;

  ngAfterViewInit(): void {
    this.isMobile = window.innerWidth < 768;
    this.initThreeJS();
    this.createGlobe();
    this.createClouds();
    this.createConnections();
    this.createAsteroids();
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
    this.scene.background = new THREE.Color(0x000011); // Dark space background

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
    // Create globe geometry - adjust size for mobile
    const radius = this.isMobile ? 1 : 2;
    const geometry = new THREE.SphereGeometry(radius, 64, 32);

    // Load high-quality Earth texture with clouds for realism
    const textureLoader = new THREE.TextureLoader();
    const globeTexture = textureLoader.load('https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/earthmap1k.jpg'); // High-quality Earth texture
    const cloudTexture = textureLoader.load('https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/earthcloudmap.jpg'); // Cloud texture

    // Create material with texture, specular highlights for realistic reflection
    const material = new THREE.MeshPhongMaterial({
      map: globeTexture,
      transparent: true,
      opacity: 0.9, // More opaque for better visibility
      side: THREE.DoubleSide,
      shininess: 100, // Add specular highlights for realistic reflection
      specular: 0x111111 // Dark specular for subtle reflection
    });

    this.globe = new THREE.Mesh(geometry, material);
    this.globe.rotation.z = 0.3; // Slight tilt
    this.scene.add(this.globe);
  }







  private createClouds(): void {
    // Create cloud layer for realism
    const radius = this.isMobile ? 1.52 : 2.02;
    const cloudGeometry = new THREE.SphereGeometry(radius, 64, 32);
    const textureLoader = new THREE.TextureLoader();
    const cloudTexture = textureLoader.load('https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/earthcloudmap.jpg');

    const cloudMaterial = new THREE.MeshPhongMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide
    });

    this.clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    this.scene.add(this.clouds);
  }

  private createConnections(): void {
    // Create dynamic connection lines representing data flow - fewer on mobile
    const connectionCount = this.isMobile ? 5 : 8;
    for (let i = 0; i < connectionCount; i++) {
      this.createConnection();
    }
  }

  private createAsteroids(): void {
    // Create falling asteroids - fewer on mobile
    const asteroidCount = this.isMobile ? 3 : 5;
    for (let i = 0; i < asteroidCount; i++) {
      this.createAsteroid();
    }
  }

  private createAsteroid(): void {
    // Create asteroid geometry - smaller on mobile
    const size = this.isMobile ? 0.05 : 0.08;
    const geometry = new THREE.SphereGeometry(size, 8, 8);
    const material = new THREE.MeshBasicMaterial({
      color: 0x333333, // Dark gray
      transparent: true,
      opacity: 0.8
    });

    const asteroid = new THREE.Mesh(geometry, material);

    // Start position above the globe
    const startY = this.isMobile ? 4 : 6;
    asteroid.position.set(
      (Math.random() - 0.5) * 10, // Random X
      startY, // Above globe
      (Math.random() - 0.5) * 10  // Random Z
    );

    this.asteroids.push(asteroid);
    this.scene.add(asteroid);
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
    // Sun light - positioned to create realistic Earth illumination
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
    sunLight.position.set(10, 5, 5); // Position sun to the side for realistic lighting
    sunLight.castShadow = false; // Disable shadows for performance
    this.scene.add(sunLight);

    // Rim light to simulate sunlight reflection on the dark side
    const rimLight = new THREE.DirectionalLight(0x4488ff, 0.3);
    rimLight.position.set(-10, -5, -5); // Opposite side for rim lighting effect
    this.scene.add(rimLight);

    // Ambient light for subtle fill in space
    const ambientLight = new THREE.AmbientLight(0x111122, 0.1);
    this.scene.add(ambientLight);
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(this.animate.bind(this));

    // Rotate globe slowly
    this.globe.rotation.y += 0.0005;

    // Rotate clouds slightly faster for realism
    this.clouds.rotation.y += 0.007;

    // Animate connections (subtle pulsing)
    this.connections.forEach((connection, index) => {
      const material = connection.material as THREE.LineBasicMaterial;
      material.opacity = 0.3 + Math.sin(Date.now() * 0.001 + index) * 0.3;
    });

    // Animate asteroids falling
    this.asteroids.forEach((asteroid, index) => {
      asteroid.position.y -= 0.02; // Fall speed

      // Reset position when it falls below the globe
      if (asteroid.position.y < -3) {
        asteroid.position.set(
          (Math.random() - 0.5) * 10,
          this.isMobile ? 4 : 6,
          (Math.random() - 0.5) * 10
        );
      }

      // Add slight rotation for realism
      asteroid.rotation.x += 0.01;
      asteroid.rotation.y += 0.01;
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
