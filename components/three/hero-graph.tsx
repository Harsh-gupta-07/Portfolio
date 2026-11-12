"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * FIG. 01 — a job graph. Ink nodes on an ellipsoid shell, hairline edges to
 * their nearest neighbours, and signal-orange packets hopping node to node
 * like jobs moving through a queue. Leans toward the cursor; drifts and
 * zooms out as the hero scrolls away.
 */

const INK = new THREE.Color("#16140f");
const SIGNAL = new THREE.Color("#ff4d12");

const nodeVertex = /* glsl */ `
  attribute float aScale;
  uniform float uSize;
  uniform float uPixelRatio;
  varying float vDepth;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * uPixelRatio / -mv.z;
    vDepth = smoothstep(5.5, 2.2, -mv.z);
  }
`;

const nodeFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vDepth;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.42, d);
    gl_FragColor = vec4(uColor, a * uOpacity * mix(0.25, 1.0, vDepth));
  }
`;

type Graph = { nodes: Float32Array; edges: [number, number][]; neighbours: number[][] };

function buildGraph(count: number): Graph {
  const nodes = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const jitter = 0.78 + Math.random() * 0.34;
    nodes[i * 3] = Math.cos(theta) * r * jitter * 1.35;
    nodes[i * 3 + 1] = y * jitter * 0.95;
    nodes[i * 3 + 2] = Math.sin(theta) * r * jitter;
  }

  const neighbours: number[][] = Array.from({ length: count }, () => []);
  const edges: [number, number][] = [];
  const seen = new Set<string>();
  for (let i = 0; i < count; i++) {
    const dists: [number, number][] = [];
    for (let j = 0; j < count; j++) {
      if (i === j) continue;
      const dx = nodes[i * 3] - nodes[j * 3];
      const dy = nodes[i * 3 + 1] - nodes[j * 3 + 1];
      const dz = nodes[i * 3 + 2] - nodes[j * 3 + 2];
      dists.push([dx * dx + dy * dy + dz * dz, j]);
    }
    dists.sort((a, b) => a[0] - b[0]);
    for (let k = 0; k < 3; k++) {
      const j = dists[k][1];
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push([i, j]);
      neighbours[i].push(j);
      neighbours[j].push(i);
    }
  }
  return { nodes, edges, neighbours };
}

export default function HeroGraph() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;
    const NODE_COUNT = small ? 90 : 170;
    const PACKET_COUNT = small ? 18 : 42;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      return; // No WebGL: the graph-paper background stands alone.
    }
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    renderer.domElement.setAttribute("aria-hidden", "true");

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
    camera.position.set(0, 0, 4.2);

    const root = new THREE.Group();
    scene.add(root);

    const { nodes, edges, neighbours } = buildGraph(NODE_COUNT);

    // Nodes
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodes, 3));
    const scales = new Float32Array(NODE_COUNT).map(() => 0.6 + Math.random() * 0.9);
    nodeGeo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    const nodeMat = new THREE.ShaderMaterial({
      vertexShader: nodeVertex,
      fragmentShader: nodeFragment,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uColor: { value: INK },
        uOpacity: { value: 0.85 },
        uSize: { value: small ? 26 : 30 },
        uPixelRatio: { value: pixelRatio },
      },
    });
    root.add(new THREE.Points(nodeGeo, nodeMat));

    // Edges
    const edgePos = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], i) => {
      edgePos.set(nodes.subarray(a * 3, a * 3 + 3), i * 6);
      edgePos.set(nodes.subarray(b * 3, b * 3 + 3), i * 6 + 3);
    });
    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute("position", new THREE.BufferAttribute(edgePos, 3));
    const edgeMat = new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: 0.13, depthWrite: false });
    root.add(new THREE.LineSegments(edgeGeo, edgeMat));

    // Packets: each travels from node `from` to node `to`, then picks a new neighbour.
    const packets = Array.from({ length: PACKET_COUNT }, () => {
      const from = Math.floor(Math.random() * NODE_COUNT);
      const to = neighbours[from][Math.floor(Math.random() * neighbours[from].length)];
      return { from, to, t: Math.random(), speed: 0.5 + Math.random() * 0.9 };
    });
    const packetPos = new Float32Array(PACKET_COUNT * 3);
    const packetGeo = new THREE.BufferGeometry();
    packetGeo.setAttribute("position", new THREE.BufferAttribute(packetPos, 3));
    packetGeo.setAttribute("aScale", new THREE.BufferAttribute(new Float32Array(PACKET_COUNT).fill(1.6), 1));
    const packetMat = new THREE.ShaderMaterial({
      vertexShader: nodeVertex,
      fragmentShader: nodeFragment,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uColor: { value: SIGNAL },
        uOpacity: { value: 1 },
        uSize: { value: small ? 26 : 30 },
        uPixelRatio: { value: pixelRatio },
      },
    });
    root.add(new THREE.Points(packetGeo, packetMat));

    // Trails: a short signal segment behind each packet.
    const trailPos = new Float32Array(PACKET_COUNT * 6);
    const trailGeo = new THREE.BufferGeometry();
    trailGeo.setAttribute("position", new THREE.BufferAttribute(trailPos, 3));
    const trailMat = new THREE.LineBasicMaterial({ color: SIGNAL, transparent: true, opacity: 0.85, depthWrite: false });
    root.add(new THREE.LineSegments(trailGeo, trailMat));

    const lerpNode = (out: Float32Array, o: number, a: number, b: number, t: number) => {
      out[o] = nodes[a * 3] + (nodes[b * 3] - nodes[a * 3]) * t;
      out[o + 1] = nodes[a * 3 + 1] + (nodes[b * 3 + 1] - nodes[a * 3 + 1]) * t;
      out[o + 2] = nodes[a * 3 + 2] + (nodes[b * 3 + 2] - nodes[a * 3 + 2]) * t;
    };

    const stepPackets = (dt: number) => {
      packets.forEach((p, i) => {
        p.t += dt * p.speed;
        if (p.t >= 1) {
          const options = neighbours[p.to].filter((n) => n !== p.from);
          p.from = p.to;
          p.to = options.length
            ? options[Math.floor(Math.random() * options.length)]
            : neighbours[p.to][0];
          p.t = 0;
        }
        lerpNode(packetPos, i * 3, p.from, p.to, p.t);
        lerpNode(trailPos, i * 6, p.from, p.to, Math.max(0, p.t - 0.45));
        lerpNode(trailPos, i * 6 + 3, p.from, p.to, p.t);
      });
      packetGeo.attributes.position.needsUpdate = true;
      trailGeo.attributes.position.needsUpdate = true;
    };

    // Layout: sit to the right on wide screens, centred and further back on narrow ones.
    let wide = true;
    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = width / height;
      wide = camera.aspect > 1.15;
      camera.position.z = wide ? 4.9 : 5.6;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const pointer = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const clock = new THREE.Clock();
    let spin = 0;
    const render = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const progress = Math.min(window.scrollY / Math.max(mount.clientHeight, 1), 1);
      spin += dt * 0.06;
      stepPackets(dt);

      root.rotation.y += (spin + pointer.x * 0.35 + progress * 0.9 - root.rotation.y) * 0.05;
      root.rotation.x += (pointer.y * 0.2 + 0.18 - root.rotation.x) * 0.05;
      root.position.x = wide ? 1.25 * Math.min(camera.aspect / 1.6, 1.3) : 0;
      root.position.y = (wide ? 0 : -0.55) + progress * 0.5;
      root.scale.setScalar(1 + progress * 0.35);
      nodeMat.uniforms.uOpacity.value = 0.85 * (1 - progress * 0.7);
      edgeMat.opacity = 0.13 * (1 - progress * 0.7);

      renderer.render(scene, camera);
    };

    let raf = 0;
    let running = false;
    const loop = () => {
      render();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      clock.getDelta();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    if (reduced) {
      stepPackets(0);
      render();
    } else {
      window.addEventListener("pointermove", onPointer, { passive: true });
    }

    // Only animate while the hero is on screen and the tab is visible.
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    io.observe(mount);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      [nodeGeo, edgeGeo, packetGeo, trailGeo].forEach((g) => g.dispose());
      [nodeMat, edgeMat, packetMat, trailMat].forEach((m) => m.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
}
