class MouseClickedParticles{
    constructor(ctx,x,y){
        this.ctx=ctx;
        this.x=x + 10 - Math.random() * -20;
        this.y=y + 10 - Math.random() * -20;

        this.size = 2 + Math.random() * 10;
        this.color="#aa2222"
        this.isDead=false;
        this.speedY = Math.random()+0.7;
        this.speedX = Math.random()*-2 +1;
    }

    update(){
        this.y-=this.speedY;
        this.x+=this.speedX;
        if (this.y <= 0)
            this.isDead=true;

        this.speedY*=1.02;
        this.size*=1.01;
    }


    draw(){
        this.ctx.save();

        this.ctx.translate(this.x, this.y);
        const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(0.9, "transparent");
        gradient.addColorStop(1, this.color);

        this.ctx.fillStyle = gradient;
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = this.color;

        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
    }
}