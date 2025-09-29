class Animator {
    constructor(canvas){
        this.canvas = canvas;
        this.mp = []
        this.sp = []
        this.glows =[]
        this.trails=[]
        this.mcp=[]
        this.ctx = canvas.getContext("2d");
        this.mainParticlesAmount = 0;
        this.secondaryParticlesAmount = 0;
        this.lastTime = performance.now();
        
        this.lastMouseMove=0;
        this.minDistance = 5;  
        this.throttleTime = 10;

        this.lastX=0;
        this.lastY=0;
    }

    generateMainParticles(amount, startAtBottom=true){
        for (let i=0;i<amount;i++)
            this.mp.push(new MainParticle(this.ctx, this.canvas.height, this.canvas.width, startAtBottom));
    }

    generateSecondaryParticles(amount){
        for (let i=0;i<amount;i++)
            this.sp.push(new SecondaryParticle(this.ctx, this.canvas.height, this.canvas.width));
    }

    init(mainParticlesAmount=50, secondaryParticlesAmount=5){
        this.mainParticlesAmount = mainParticlesAmount;
        this.generateMainParticles(mainParticlesAmount, false);
        
        this.secondaryParticlesAmount = secondaryParticlesAmount;
        this.generateSecondaryParticles(secondaryParticlesAmount);

        this.glows.push(new Glow(this.ctx, this.canvas.width/5, this.canvas.height + this.canvas.height*0.3, 
            this.canvas.width, -50, 1, 0.3));        

        this.glows.push(new Glow(this.ctx, this.canvas.width*0.7, this.canvas.height*1.1, 
            this.canvas.height*0.6, 10, 2, 1))

        this.glows.push(new Glow(this.ctx, this.canvas.width*0.25, this.canvas.height*1.15, 
            this.canvas.height*0.6, -10, 2, 1))

        // mouse spying
        canvas.addEventListener('mousemove', (event) => {
            const now = performance.now();

            if (now - this.lastMouseMove < this.throttleTime) return;
                this.lastMouseMove = now;

            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const dx = x - this.lastX;
            const dy = y - this.lastY;
            const distance = Math.sqrt(dx*dx + dy*dy);

            if(distance >= this.minDistance){
                this.trails.push(new MouseTrail(this.ctx, x, y, this.lastX, this.lastY));
                this.lastX = x;
                this.lastY = y;
            }
        });

        //mouse clicked
        canvas.addEventListener('click', (event) => { 
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            for (let i=0;i<10;i++)
                this.mcp.push(new MouseClickedParticles(this.ctx, x, y));
        });

        this.animate();
    }

    animate(){
        const now = performance.now();
        const deltaTime = now - this.lastTime;
        this.lastTime = now;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // update particles
        this.mp.forEach(element => element.update());
        this.sp.forEach(element => element.update(deltaTime));
        this.trails.forEach(element => element.update(deltaTime));
        this.mcp.forEach(element => element.update());
        

        // remove dead particles and generate new ones
        this.mp = this.mp.filter(p => !p.isDead);
        if (this.mp.length < this.mainParticlesAmount)
            this.generateMainParticles(this.mainParticlesAmount - this.mp.length);

        this.sp = this.sp.filter(p => !p.isDead);
        if (this.sp.length < this.secondaryParticlesAmount)
            this.generateSecondaryParticles(this.secondaryParticlesAmount - this.sp.length);

        this.trails = this.trails.filter(p => !p.isDead);
        this.mcp = this.mcp.filter(p => !p.isDead);

        // draw everything
        this.mp.forEach(element => element.draw());
        this.sp.forEach(element => element.draw());
        this.glows.forEach(element => element.draw());
        this.trails.forEach(elemnt => elemnt.draw());
        this.mcp.forEach(elemnt => elemnt.draw());

        requestAnimationFrame(() => this.animate());
    }
}
