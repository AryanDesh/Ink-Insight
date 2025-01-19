"use client"

import { useRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { PerspectiveCamera } from "@react-three/drei"
import * as THREE from "three"
import { gsap } from "gsap"

interface ShaderUniforms {
  time: { value: number }
  lightPosition: { value: THREE.Vector3 }
}

interface MousePosition {
  x: number
  y: number
}

const grainVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const grainFragmentShader = `
  uniform float time;
  uniform vec3 lightPosition;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    
    float a = fract(sin(dot(i, vec2(12.9898,78.233))) * 43758.5453123);
    float b = fract(sin(dot(i + vec2(1.0, 0.0), vec2(12.9898,78.233))) * 43758.5453123);
    float c = fract(sin(dot(i + vec2(0.0, 1.0), vec2(12.9898,78.233))) * 43758.5453123);
    float d = fract(sin(dot(i + vec2(1.0, 1.0), vec2(12.9898,78.233))) * 43758.5453123);

    f = f * f * (3.0 - 2.0 * f);
    return mix(a, b, f.x) + (c - a) * f.y * (1.0 - f.x) + (d - b) * f.x * f.y;
  }
  
  void main() {
    vec3 lightDir = normalize(lightPosition - vPosition);
    float diffuse = max(dot(vNormal, lightDir), 0.0);
    
    vec2 st = vUv * 150.0;
    float n1 = noise(st + time * 0.1);
    float n2 = noise(st * 2.0 - time * 0.05);
    float n3 = noise(st * 4.0 + time * 0.025);
    
    float finalNoise = (n1 * 0.5 + n2 * 0.3 + n3 * 0.2);
    
    float gradient = mix(0.9, 0.2, vUv.y);
    
    float pattern = mix(gradient, finalNoise, 0.3);
    
    float highlight = pow(diffuse, 4.0) * 0.4;
    float shadow = (1.0 - diffuse) * 0.7;
    
    vec3 baseColor = vec3(pattern);
    vec3 finalColor = baseColor + vec3(highlight) - vec3(shadow);
    finalColor = clamp(finalColor, 0.0, 1.0);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

interface FountainPenProps {
  mousePosition: React.RefObject<MousePosition>
}

function FountainPen({ mousePosition }: FountainPenProps): JSX.Element {
  const groupRef = useRef<THREE.Group>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const { camera } = useThree()

  useEffect(() => {
    if (groupRef.current) {
      gsap.fromTo(
        camera.position,
        { z: 1 },
        { z: 12, duration: 2.5, ease: "power2.inOut" }
      )
      
      gsap.to(groupRef.current.rotation, {
        y: Math.PI * 4,
        duration: 2.5,
        ease: "power2.inOut"
      })
      
      gsap.to(groupRef.current.position, {
        x: 5,
        duration: 2,
        delay: 2.5,
        ease: "power2.inOut"
      })
    }
  }, [camera])

  useFrame((state, delta) => {
    if (groupRef.current && materialRef.current) {
      groupRef.current.rotation.y += delta * 0.8
      
      if (mousePosition.current) {
        const targetRotationX = mousePosition.current.y * 0.5
        const targetRotationZ = mousePosition.current.x * 0.5
        
        groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.05
        groupRef.current.rotation.z += (targetRotationZ - groupRef.current.rotation.z) * 0.05
      }

      groupRef.current.rotation.x += Math.sin(state.clock.elapsedTime * 2) * 0.005
      groupRef.current.rotation.z += Math.cos(state.clock.elapsedTime * 2) * 0.005

      materialRef.current.uniforms.time.value += delta * 0.5
    }
  })

  const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: grainVertexShader,
    fragmentShader: grainFragmentShader,
    uniforms: {
      time: { value: 0 },
      lightPosition: { value: new THREE.Vector3(5, 5, 5) }
    } as ShaderUniforms
  })

  return (
    <group ref={groupRef} rotation={[0, 0, -Math.PI * 0.35]}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.25, 4, 64]} />
        <shaderMaterial ref={materialRef} args={[shaderMaterial]} />
      </mesh>
      
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 1, 64]} />
        <shaderMaterial args={[shaderMaterial]} />
      </mesh>
      
      <mesh position={[0, -2.2, 0]}>
        <cylinderGeometry args={[0.1, 0.15, 0.4, 64]} />
        <shaderMaterial args={[shaderMaterial]} />
      </mesh>
      
      <mesh position={[0, -2.4, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.1, 0.4, 64]} />
        <shaderMaterial args={[shaderMaterial]} />
      </mesh>
      
      <mesh position={[0, 1.3, 0]}>
        <torusGeometry args={[0.26, 0.03, 32, 64]} />
        <shaderMaterial args={[shaderMaterial]} />
      </mesh>
    </group>
  )
}

export default function Scene(): JSX.Element {
  const mousePosition = useRef<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="md:w-1/2 h-screen" >
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 1]} fov={45} />
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1.0} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />
        <FountainPen mousePosition={mousePosition} />
      </Canvas>
    </div>
  )
}

