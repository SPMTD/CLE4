class SpriteObject extends GameObject
{
    private currentFrame:   number      = 0;
    public animationY:      number      = 0;
    public animationSpeed:  number      = 0;
    
    private frameWidth:     number      = 57;
    private frameHeight:    number      = 55;
    
    private timer:          number      = 0;
    
    private context: CanvasRenderingContext2D;
    public sprite:HTMLImageElement;
    
    constructor(position:Vector2, width:number, height:number, img:string, needsInput:Boolean = false)
    {
        super(position, width, height, needsInput);
        this.sprite = new Image(this.width, this.height);
        this.sprite.src = 'images/' + img + '.png'; 
    }
    
    public update()
    {
        super.update();
        
    }
    
    public draw(ctx:CanvasRenderingContext2D)
    {
        console.log(this.currentFrame, this.frameWidth, this.frameHeight);
        this.timer++;
        if(Vector2.length(this.direction) > 0) {
        
        if(this.timer % this.animationSpeed == 0){this.currentFrame++;}
        
        if(this.currentFrame > 3 ) {
            this.currentFrame = 0;
        }
    }
        
        ctx.drawImage(
            this.sprite,
            this.currentFrame * this.frameWidth,
            this.animationY * this.frameHeight,
            this.frameHeight,   //2x gebruiken, 1 voor canvas en 1 voor frame.
            this.frameWidth,
            this.position.x,
            this.position.y,
            this.frameWidth,
            this.frameHeight);
    }
    

    
    public onKeyDown(event:KeyboardEvent):void 
    {
        
    }
    
    public onKeyUp(event:KeyboardEvent):void 
    {

    }
    
    
}