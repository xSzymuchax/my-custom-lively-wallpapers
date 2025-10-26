import { setAttribute, initProgram } from '../Utils.js';

// cząsteczka obrysu serca
export class BigHeartParticle {
    constructor(gl, heigth, width) {
        this.gl = gl;
        this.height = heigth;
        this.width = width;
        this.size = Math.random() / 10.0 + 0.05 // 0.1-0.2
        this.maxLifetime = 8.0 + Math.random() * 5.0;
        this.age=0.0;
        this.glowPower = 0.15;
        this.xSpeed = -0.001 * Math.random() + 0.0005;
        this.ySpeed = -0.001 * Math.random() + 0.0005;
        
        
        this.startingRotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = 1;

        if (Math.random() < 0.5)
            this.rotationSpeed *= -1;

        // pozycja cząstki
        this.x = Math.random() * 2 - 1; 
        this.y = Math.random() * 2 - 1;

        // bufor dla parametru t (na jego podstawie liczymy obrys serca)
        this.tValues = [];
        const steps = 100;
        for(let t=0;t<=Math.PI*2;t+=(Math.PI*2) / steps){
            this.tValues.push(t);
        }

        // bufor t dla wykresu
        this.vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.tValues), gl.STATIC_DRAW);

        this.init();
    }

    // inicjalizuje shader do rysowania
    async init(){
        this.program = await initProgram(
            this.gl,
            './BigHeartParticle/vertexShader.glsl',
            './BigHeartParticle/fragmentShader.glsl'
        );
    }

    isDead(){
        if (this.age >= this.maxLifetime || this.y > 1 || this.y < -1 || this.x > 1 || this.x < -1)
            return true;
        return false;
    }

    // rysujemy!
    draw(deltaTime) {
        if (!this.program) return;

        this.age += deltaTime;
        this.x += this.xSpeed;
        this.y += this.ySpeed ;
        let percentOfLife = this.age / this.maxLifetime;

        const gl = this.gl;
        gl.useProgram(this.program);

        // uniforms
        const uAspect = gl.getUniformLocation(this.program, "uAspect");
        gl.uniform1f(uAspect, this.height / this.width);
        const u_offsetX = gl.getUniformLocation(this.program, 'u_offsetX');
        gl.uniform1f(u_offsetX, this.x);
        const u_offsetY = gl.getUniformLocation(this.program, 'u_offsetY');
        gl.uniform1f(u_offsetY, this.y);
        const u_percentOfLife = gl.getUniformLocation(this.program, 'u_percentOfLife');
        gl.uniform1f(u_percentOfLife, percentOfLife);
        const uGlowRadius = gl.getUniformLocation(this.program, 'u_glowRadius');
        gl.uniform1f(uGlowRadius, this.glowPower);
        
        let current_rotation =  this.startingRotation + this.rotationSpeed * (this.age / this.maxLifetime);
        const rotation = gl.getUniformLocation(this.program, 'u_rotation');
        gl.uniform1f(rotation, current_rotation);

        let current_size;
        if (percentOfLife < 0.5) {
            current_size = this.size * (1.0 + 2.0 * percentOfLife); // 1 → 2
        } else {
            current_size = this.size * (3.0 - 2.0 * percentOfLife); // 2 → 1
        }
        const size = gl.getUniformLocation(this.program, 'u_size');
        gl.uniform1f(size, current_size);

        // atributes
        setAttribute(gl, this.program, 'aT', this.vertexBuffer);

        // drawing
        gl.drawArrays(gl.TRIANGLE_FAN, 0, this.tValues.length);
    }
}
