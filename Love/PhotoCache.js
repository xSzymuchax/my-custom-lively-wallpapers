export class PhotoCache {
    constructor(gl) {
        this.gl = gl;
        this.textures = [];
        this.loaded = false;
    }

    async load() {
        if (this.loaded) return;
        const res = await fetch('./photos.json');
        const photos = await res.json();

        for (const photo of photos) {
            const tex = await this.loadTexture(`./PhotoHeartParticle/SamplePhotos/${photo}`);
            this.textures.push(tex);
        }

        this.loaded = true;
        console.log(`Załadowano ${this.textures.length} tekstur`);
    }

async loadTexture(url) {
    const gl = this.gl;
    const image = new Image();
    image.src = url;

    return new Promise((resolve, reject) => {
        image.onload = () => {
            const tex = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            resolve(tex); 
        };

        image.onerror = (err) => reject(err);
    });
}

    getRandom() {
        return this.textures[Math.floor(Math.random() * this.textures.length)];
    }
}
