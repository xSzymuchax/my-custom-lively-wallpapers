import { setAttribute, initProgram } from '../Utils.js';
import { PhotoCache } from '../PhotoCache.js';

// cząsteczka obrysu serca
export class PhotoHeartParticle {
    constructor(gl, heigth, width, photoCache) {
        this.gl = gl;
        this.height = heigth;
        this.width = width;
        this.texture = photoCache.getRandom();
        this.size = 0.4 - Math.random() / 5.0; // 0.1-0.2
        this.maxLifetime = 20.0 + Math.random() * 5.0;
        this.age=0.0;
        this.glowPower = 0.5;
        this.xSpeed = 0.001 * Math.random();
        this.ySpeed = 0.0002;
        
        
        this.startingRotation = (Math.random() * 2 - 1) * Math.PI * 2 * 0.05;
        this.rotationSpeed = 0.1;

        if (Math.random() < 0.5)
            this.rotationSpeed *= -1;

        // pozycja cząstki
        this.x = Math.random() * 2 - 1; 
        this.y = Math.random() * 1.5 - 1;

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

        this.init().then(() => {});
    }

    // inicjalizuje shader do rysowania
    async init(){
        this.program = await initProgram(
            this.gl,
            './PhotoHeartParticle/vertexShader.glsl',
            './PhotoHeartParticle/fragmentShader.glsl'
        );
        this.program2 = await initProgram(
            this.gl,
            './PhotoHeartParticle/vertexShader2.glsl',
            './PhotoHeartParticle/fragmentShader2.glsl'
        );
    }

    // załaduj manifest i wybierz losowo
    async pickRandomPhoto() {
        const res = await fetch('../Love/photos.json');
        const photos = await res.json(); // tablica URLi względnych
        const random = photos[Math.floor(Math.random() * photos.length)];
        return random; // pełny URL
    }

    initTexture() {
        const texture = this.gl.createTexture();
        this.texture = texture; // ← zapamiętujemy własną teksturę

        const image = new Image();

        this.pickRandomPhoto().then(photo => {
            image.src = new URL(`./SamplePhotos/${photo}`, import.meta.url);
    });

    image.onload = () => {
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        this.gl.texImage2D(
            this.gl.TEXTURE_2D, 0, this.gl.RGBA,
            this.gl.RGBA, this.gl.UNSIGNED_BYTE, image
        );
        this.gl.generateMipmap(gl.TEXTURE_2D);
        this.gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
        this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    };
}

    isDead(){
        if (this.age >= this.maxLifetime)
            return true;
        if (this.y >= 1.05)
            return true;
        return false;
    }

    // rysujemy!
    draw(deltaTime) {
        if (!this.program) return;
        if (!this.program2) return;

        this.age += deltaTime;
        this.x += 0;
        this.y += this.ySpeed ;
        let percentOfLife = (this.age / this.maxLifetime);

        const gl = this.gl;


        gl.useProgram(this.program2);
        // uniforms
        let uAspect = gl.getUniformLocation(this.program2, "uAspect");
        gl.uniform1f(uAspect, this.height / this.width);
        let u_offsetX = gl.getUniformLocation(this.program2, 'u_offsetX');
        gl.uniform1f(u_offsetX, this.x);
        let u_offsetY = gl.getUniformLocation(this.program2, 'u_offsetY');
        gl.uniform1f(u_offsetY, this.y);
        let u_percentOfLife = gl.getUniformLocation(this.program2, 'u_percentOfLife');
        gl.uniform1f(u_percentOfLife, percentOfLife);
        let uGlowRadius = gl.getUniformLocation(this.program2, 'u_glowRadius');
        gl.uniform1f(uGlowRadius, this.glowPower);
        
        let current_rotation =  this.startingRotation + this.rotationSpeed * (this.age / this.maxLifetime);
        let rotation = gl.getUniformLocation(this.program2, 'u_rotation');
        gl.uniform1f(rotation, current_rotation);

        let current_size;
        if (percentOfLife < 0.5) {
            current_size = this.size * (1.0 + 2.0 * percentOfLife); // 1 → 2
        } else {
            current_size = this.size * (3.0 - 2.0 * percentOfLife); // 2 → 1
        }
        let size = gl.getUniformLocation(this.program2, 'u_size');
        gl.uniform1f(size, current_size + 0.1);

        // atributes
        setAttribute(gl, this.program2, 'aT', this.vertexBuffer);

        // textures
        if (this.texture) {
            let u_textureLocation = gl.getUniformLocation(this.program2, "u_texture");
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.uniform1i(u_textureLocation, 0);
        }

        gl.drawArrays(gl.TRIANGLE_FAN, 0, this.tValues.length);



        gl.useProgram(this.program);

        // uniforms
        uAspect = gl.getUniformLocation(this.program, "uAspect");
        gl.uniform1f(uAspect, this.height / this.width);
        u_offsetX = gl.getUniformLocation(this.program, 'u_offsetX');
        gl.uniform1f(u_offsetX, this.x);
         u_offsetY = gl.getUniformLocation(this.program, 'u_offsetY');
        gl.uniform1f(u_offsetY, this.y);
        u_percentOfLife = gl.getUniformLocation(this.program, 'u_percentOfLife');
        gl.uniform1f(u_percentOfLife, percentOfLife);
        uGlowRadius = gl.getUniformLocation(this.program, 'u_glowRadius');
        gl.uniform1f(uGlowRadius, this.glowPower);
        
        current_rotation =  this.startingRotation + this.rotationSpeed * (this.age / this.maxLifetime);
        rotation = gl.getUniformLocation(this.program, 'u_rotation');
        gl.uniform1f(rotation, current_rotation);

        current_size;
        if (percentOfLife < 0.5) {
            current_size = this.size * (1.0 + 2.0 * percentOfLife); // 1 → 2
        } else {
            current_size = this.size * (3.0 - 2.0 * percentOfLife); // 2 → 1
        }
        size = gl.getUniformLocation(this.program, 'u_size');
        gl.uniform1f(size, current_size);

        // atributes
        setAttribute(gl, this.program, 'aT', this.vertexBuffer);

        // textures
        if (this.texture) {
            let u_textureLocation = gl.getUniformLocation(this.program, "u_texture");
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.uniform1i(u_textureLocation, 0);
        }

        // drawing
        gl.drawArrays(gl.TRIANGLE_FAN, 0, this.tValues.length);
    

        
    }
}
