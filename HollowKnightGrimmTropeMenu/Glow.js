class Glow{
    constructor(ctx, x, y, color, power=100, angle=0, scaleX=1, scaleY=1){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.power = power;
        this.angle=angle;
        this.scaleX=scaleX;
        this.scaleY=scaleY;
        this.color = color;

        console.log(this.x, this.y);
    }

    draw(){
        this.ctx.save();

        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.angle * Math.PI / 180);
        this.ctx.scale(this.scaleX, this.scaleY);

        const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, this.power);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, "transparent");

        this.ctx.fillStyle = gradient;

        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.power, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.restore();
    }
}