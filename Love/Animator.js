import { BigHeartParticle } from './BigHeartParticle/BigHeartParticle.js';
import { BackgroundGlow } from './BackgroundGlow/BackgroundGlow.js';
import { PhotoHeartParticle } from './PhotoHeartParticle/PhotoHeartParticle.js';
import { PhotoCache } from './PhotoCache.js';
import { MouseTrailParticle } from './MouseTrailParticle/MouseTrailParticle.js';
import { BackgroundHeart } from './BackgroundHeart/BackgroundHeart.js';

// glowna klasa odpowiedzialna za rysowanie 
export class Animator {
    constructor(canvas) {
        this.canvas = canvas;
        this.gl = canvas.getContext('webgl', {antialias: true});
        this.BigHeartParticles = [];
        this.PhotoHeartParticles = [];
        this.BackgroundGlows = [];
        this.MouseParticles = [];
        this.lastTime = 0;
        this.bigHeartParticles = 0;
        this.photoHeartParticles = 0;
        this.lastMousePos = { x: 0, y: 0 };
        this.firstMove = true;
        this.BackgroundHeart = new BackgroundHeart(this.gl, this.canvas.height, this.canvas.width);
    }

    registerEvents(){
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            if (this.firstMove) {
                this.lastMousePos.x = mouseX;
                this.lastMousePos.y = mouseY;
                this.firstMove = false;
            }

            const dx = mouseX - this.lastMousePos.x;
            const dy = mouseY - this.lastMousePos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance >= 10) { // wymóg ruchu co najmniej 5 pikseli
                // przelicz na współrzędne WebGL
                const x = (mouseX / this.canvas.width) * 2 - 1;
                const y = -((mouseY / this.canvas.height) * 2 - 1);

                const p = new MouseTrailParticle(this.gl, this.canvas.height, this.canvas.width);
                p.x = x;
                p.y = y;
                this.MouseParticles.push(p);

                this.lastMousePos.x = mouseX;
                this.lastMousePos.y = mouseY;
            }
        });
    }

    // inicjalizacja cząsteczek
    async init(bigHeartParticles = 5, photoHeartParticles = 5) {
        this.photoCache = new PhotoCache(this.gl);
        await this.photoCache.load();

        this.registerEvents();
        
        this.bigHeartParticles = bigHeartParticles;
        this.photoHeartParticles = photoHeartParticles;
        
        for(let i=0; i<bigHeartParticles; i++){
            this.BigHeartParticles.push(new BigHeartParticle(this.gl, this.canvas.height, this.canvas.width));
            this.BigHeartParticles[i].age = Math.random() * this.BigHeartParticles[i].maxLifetime;
        }
        for(let i=0; i<photoHeartParticles; i++){
            this.PhotoHeartParticles.push(new PhotoHeartParticle(this.gl, this.canvas.height, this.canvas.width, this.photoCache));
            this.PhotoHeartParticles[i].age = Math.random() * this.PhotoHeartParticles[i].maxLifetime;
        }

        this.BackgroundGlows.push(new BackgroundGlow(
            this.gl, this.canvas.height, this.canvas.width, 
            -0.5, -1.0, 
            this.canvas.width/this.canvas.width*0.8, 
            this.canvas.height/this.canvas.height*1.8,
            Math.PI * -0.2, 0.4
        ));

        this.BackgroundGlows.push(new BackgroundGlow(
            this.gl, this.canvas.height, this.canvas.width, 
            0.0, -1.0, 
            this.canvas.width/this.canvas.width*0.8, 
            this.canvas.height/this.canvas.height*1.8,
            Math.PI * -0.5, 0.4
        ));

        this.BackgroundGlows.push(new BackgroundGlow(
            this.gl, this.canvas.height, this.canvas.width, 
            0.5, 1.0, 
            this.canvas.width/this.canvas.width*1.1, 
            this.canvas.height/this.canvas.height*1.8,
            Math.PI * -0.6, 0.4
        ));

        this.animate(0);
    }

    // rysowanie -> rysuje a nastepnie wywoluje siebie by rysować kolejna klatke
    animate(currentTime) {
        const gl = this.gl;
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        const deltaTime = (currentTime - this.lastTime) * 0.001; // ms -> s
        this.lastTime = currentTime;

        gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        gl.clearColor(0.0,0.0,0.0,0.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        // spawnowanie
        while (this.BigHeartParticles.length < this.bigHeartParticles)
             this.BigHeartParticles.push(new BigHeartParticle(this.gl, this.canvas.height, this.canvas.width));
        while (this.PhotoHeartParticles.length < this.photoHeartParticles)
             this.PhotoHeartParticles.push(new PhotoHeartParticle(this.gl, this.canvas.height, this.canvas.width, this.photoCache));
    

        // rysowanie
        this.BackgroundHeart.draw();
        for(let particle of this.BackgroundGlows){ particle.draw(currentTime); }
        for(let particle of this.PhotoHeartParticles){ particle.draw(deltaTime); }
        for(let particle of this.BigHeartParticles){ particle.draw(deltaTime); }
        for(let particle of this.MouseParticles){ particle.draw(deltaTime); }
        

        // kasowanie
        this.BigHeartParticles = this.BigHeartParticles.filter(p => !p.isDead());
        this.PhotoHeartParticles = this.PhotoHeartParticles.filter(p => !p.isDead());
        this.MouseParticles = this.MouseParticles.filter(p => !p.isDead());


        requestAnimationFrame((t) => this.animate(t));
    }
}
