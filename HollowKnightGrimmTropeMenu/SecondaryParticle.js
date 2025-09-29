class SecondaryParticle {
    constructor(ctx, canvasHeight, canvasWidth){
        this.ctx = ctx;
        this.size = Math.random() * 10 + 1 ;
        this.maxX = canvasWidth;
        this.maxY = canvasHeight;
        
        this.x = (this.maxX + 0.25 * this.maxX) * Math.random() - 0.25 * this.maxX;
        this.y = this.maxY * Math.random();

        this.color = "#ff3333";
        this.speed = Math.random() * 0.4 + 0.1;

        // sinus movement
        this.baseX = this.x;
        this.frequency = Math.random() * 0.005;
        this.phase = Math.random() * 1000;
        this.amplitude = Math.random() * 100;

        //to the rigth movement
        this.offsetX = 0;
        this.offsetXSpeed = 0.1;

        this.lifetime = Math.random() * 4000 + 2500;
        this.age = 0;
        this.isDead = false;
    }

    // updates particle's state
    update(deltaTime){
        this.y -= this.speed;
        this.offsetX += this.offsetXSpeed;
        this.x = 
            this.baseX +
            this.offsetX + 
            Math.sin(this.y * this.frequency + this.phase) * this.amplitude;

        this.age += deltaTime;
        this.isDead = this.checkIfOutside();
    }

    // checks if particle is out of bounds
    checkIfOutside(){
        if (this.age >= this.lifetime)
            return true;
        return false;
    }

    // draws particle
    draw(){
        this.ctx.save();
        
        // this.age / 1000 -> 1 second of entering
        // lifetime - age / 1000 -> 1 second of disappearing
        const visibility = Math.min(this.age / 1000, 1, (this.lifetime - this.age) / 1000);
        const {r,g,b} = stringRGBToRGB(this.color);
        const a = visibility;

        //console.log(r,g,b,a);

        this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${a})`;

        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
    }
}