class BridgeObject extends GameObject {

    public sprite:HTMLImageElement;
    public active:boolean;
    public targetY:number;
    public startY:number;
    private up:boolean;
    
    constructor(position: Vector2, width:number, height:number, targetY:number, speed:number, collider:Boolean = true) {
        super(position, width, height, false, collider, false, true);
        this.sprite = new Image(this.width, this.height);
        this.sprite.src = 'images/wall.png';        
        this.active = false;
        this.targetY = targetY;
        this.speed = speed;
    }
    
    public update() :void 
    {
        if(this.active)
        {
            if(this.position.y < this.targetY)
                this.velocity.y += this.speed;
            else
                this.active = false;
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