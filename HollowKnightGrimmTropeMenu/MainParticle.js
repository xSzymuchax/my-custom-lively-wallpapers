class MainParticle {
    constructor(ctx, canvasHeight, canvasWidth, color, startAtBottom=true){
        this.ctx = ctx;
        this.size = Math.random() * 2 + 10;
        this.maxX = canvasWidth;
        this.maxY = canvasHeight;
        
        this.x = (this.maxX + 0.25 * this.maxX) * Math.random() - 0.25 * this.maxX;
        this.y = this.maxY;

        // if wallpaper starts, particles shouldn't only be at the bottom
        if (!startAtBottom)
            this.y = canvasHeight * Math.random();

        this.color = color;
        this.speed = Math.random() * 1 + 1;
        
        this.scaleXfactor = Math.random() * 0.1 + 0.2;
        this.scaleYfactor = Math.random() * 0.5 + 0.75;

        // sinus movement
        this.baseX = this.x;
        this.frequency = Math.random() * 0.005;
        this.phase = Math.random() * 1000;
        this.amplitude = Math.random() * 100;

        //to the rigth movement
        this.offsetX = 0;
        this.offsetXSpeed = 0.5;

        this.isDead = false;
    }

    // updates particle's state
    update(){
        this.y -= this.speed;
        this.offsetX += this.offsetXSpeed;
        this.x = 
            this.baseX +
            this.offsetX + 
            Math.sin(this.y * this.frequency + this.phase) * this.amplitude;

        this.isDead = this.checkIfOutside();
    }

    // checks if particle is out of bounds
    checkIfOutside(){
        if (this.x > this.maxX)
            return true;
        if (this.y < 0)
            return true;
        return false;
    }

    // draws particle
    draw(){
        this.ctx.save();
        
        this.ctx.fillStyle = this.color;
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = this.color;

        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(15 * Math.PI / 180);
        this.ctx.scale(this.scaleXfactor, this.scaleYfactor);


        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
    }
}