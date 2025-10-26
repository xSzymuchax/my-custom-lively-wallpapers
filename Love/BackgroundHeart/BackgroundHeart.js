import { setAttribute, initProgram } from '../Utils.js';

function createTextTexture(gl, text, font='72px Georgia', color='red') {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;  // rozmiar tekstury
    canvas.height = 1024;

    const ctx = canvas.getContext('2d');
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width/2, canvas.height/2);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
                  gl.UNSIGNED_BYTE, canvas);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.bindTexture(gl.TEXTURE_2D, null);

    return texture;
}

// cząsteczka obrysu serca
export class BackgroundHeart {
    constructor(gl, heigth, width) {
        this.gl = gl;
        this.height = heigth;
        this.width = width;
        this.size = 1 // 0.1-0.2
        this.maxLifetime = 8.0 + Math.random() * 5.0;
        this.age=0.0;
        this.glowPower = 0.55;
        this.textTexture = createTextTexture(gl, "Kocham Cię", '72px Comic Sans MS', 'pink');

        if (Math.random() < 0.5)
            this.rotationSpeed *= -1;

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
            './BackgroundHeart/vertexShader.glsl',
            './BackgroundHeart/fragmentShader.glsl'
        );
    }

    // rysujemy!
    draw() {
        if (!this.program) return;

        const gl = this.gl;
        gl.useProgram(this.program);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.textTexture);
        const uTextLoc = gl.getUniformLocation(this.program, 'u_textTexture');
        gl.uniform1i(uTextLoc, 0);

        // uniforms
        const uAspect = gl.getUniformLocation(this.program, "uAspect");
        gl.uniform1f(uAspect, this.height / this.width);
        const uGlowRadius = gl.getUniformLocation(this.program, 'u_glowRadius');
        gl.uniform1f(uGlowRadius, this.glowPower);
        const size = gl.getUniformLocation(this.program, 'u_size');
        gl.uniform1f(size, 1.0);

        // atributes
        setAttribute(gl, this.program, 'aT', this.vertexBuffer);

        // drawing
        gl.drawArrays(gl.TRIANGLE_FAN, 0, this.tValues.length);
    }
}
