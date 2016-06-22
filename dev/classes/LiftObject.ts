class LiftObject extends GameObject {

    public sprite:HTMLImageElement;
    public active:boolean;
    public targetY:number;
    public startY:number;
    private up:boolean;
    public name:string = "Lift";
    
    constructor(position: Vector2, width:number, height:number, collider:Boolean = true) {
        super(position, width, height, false, collider, false, true);
        this.sprite = new Image(this.width, this.height);
        this.sprite.src = 'images/wall.png';        
        this.active = false;
        this.targetY = 75;
        this.startY = 390;
        this.speed = 5;
        this.up = true;
    }
    
    public update() :void 
    {
        if(this.active)
        {
            if(!this.up)
            {
                this.velocity.y += this.speed;
                if(this.position.y >= this.startY)
                {
                    this.velocity.y = 0;
                    this.active = false;
                }
            }

            if(this.position.y > this.targetY && this.up)
                this.velocity.y -= this.speed;
            else
                this.up = false;
        }
        
        super.update();
    }

    public activate():void
    {
        this.up = true;
        this.active = true;
    }
    
    public draw(ctx: CanvasRenderingContext2D) :void {
        ctx.drawImage(
            this.sprite,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }
}