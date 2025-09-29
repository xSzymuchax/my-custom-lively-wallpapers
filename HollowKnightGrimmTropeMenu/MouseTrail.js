class MouseTrail{
    constructor(ctx, x1,y1,x2,y2){
        this.ctx=ctx;
        this.startX=x1;
        this.startY=y1;
        this.stopX=x2;
        this.stopY=y2;
        this.color="#ff3333";

        this.isDead=false;
        this.lifetime=100;
        this.age=0;
    }

    checkDead(){
        if (this.age >= this.lifetime)
            return true;
        return false;
    }

    update(deltaTime){
        this.age += deltaTime;
        this.isDead = this.checkDead();
    }

    draw() {
        this.ctx.save();
        const {r,g,b} = stringRGBToRGB(this.color);

        this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.75})`;
        this.ctx.lineWidth = 6;         
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = "#ff3333";
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(this.stopX, this.stopY);
        this.ctx.stroke();

        
        this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${1})`;
        this.ctx.lineWidth = 4;         
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = "#ff3333";
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(this.stopX, this.stopY);
        this.ctx.stroke();

        this.ctx.strokeStyle = "#dddddd";
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(this.stopX, this.stopY);
        this.ctx.stroke();

        this.ctx.restore();
    }

}