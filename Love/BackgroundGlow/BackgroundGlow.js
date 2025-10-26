import { setAttribute, initProgram } from '../Utils.js';


export class BackgroundGlow {
    constructor(gl, height, width, x, y, sizeX, sizeY, rotation, glowRadius){
        this.gl = gl;
        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.rotation = rotation;
        this.glowRadius = glowRadius;
        this.periodFactor = 1250.0;
        this.startWavingOffset = Math.random() * 100;

        this.positions = new Float32Array([
            -1.0, -1.0,
            1.0, -1.0,
            1.0,  1.0,
            -1.0,  1.0
            ]);

        this.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.positions, gl.STATIC_DRAW);

        this.init();
    }

    async init(){
        this.program = await initProgram(
            this.gl,
            './BackgroundGlow/vertexShader.glsl',
            './BackgroundGlow/fragmentShader.glsl'
        );

        
    }

    draw(deltaTime) {
        if (!this.program) return;

        const gl = this.gl;
        gl.useProgram(this.program);

        const uAspect = gl.getUniformLocation(this.program, "uAspect");
        gl.uniform1f(uAspect, this.height / this.width);
        const u_offsetX = gl.getUniformLocation(this.program, 'u_offsetX');
        gl.uniform1f(u_offsetX, this.x);
        const u_offsetY = gl.getUniformLocation(this.program, 'u_offsetY');
        gl.uniform1f(u_offsetY, this.y );
        const sizeX = gl.getUniformLocation(this.program, 'u_sizeX');
        gl.uniform1f(sizeX, this.sizeX);
        const sizeY = gl.getUniformLocation(this.program, 'u_sizeY');
        gl.uniform1f(sizeY, this.sizeY);
        const rotation = gl.getUniformLocation(this.program, 'u_rotation');
        gl.uniform1f(rotation, this.rotation + Math.sin((this.startWavingOffset + deltaTime) / this.periodFactor) * 0.2);
        const glowRadius = gl.getUniformLocation(this.program, 'u_glowRadius');
        gl.uniform1f(glowRadius, this.glowRadius + Math.sin((this.startWavingOffset + deltaTime) / (this.periodFactor*10)) * 0.01);


        setAttribute(this.gl, this.program, 'a_position', this.buffer, 2);

        gl.drawArrays(gl.TRIANGLE_FAN, 0, this.positions.length / 2);

    }
}