/// <reference path="Wall.ts" />

class SpriteObject extends GameObject
{
    private currentFrame:   number      = 0;
    public animationY:      number      = 0;
    public animationSpeed:  number      = 0;
    
    private frameWidth:     number      = 0;
    private frameHeight:    number      = 0;
    
    private timer:          number      = 0;
    
    public sprite:HTMLImageElement;
    
    constructor(position:Vector2, width:number, height:number, frameWidth:number, frameHeight:number, img:string, needsInput:Boolean = false, collider:Boolean = false, hasGravity:Boolean = false, canMove:Boolean = false, type:E_COLLIDER_TYPES = E_COLLIDER_TYPES.PROP)
    {
        super(position, width, height, needsInput, collider, hasGravity, canMove, type);
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.sprite = new Image(this.width, this.height);
        this.sprite.src = 'images/' + img + '.png'; 
    }
    
    public update()
    {
        super.update(); 
    }
    
    public draw(ctx:CanvasRenderingContext2D)
    {
        this.timer++;
        if(this.direction.sqrMagnitude() > 0) 
        {
            if(this.timer % this.animationSpeed == 0)
                this.currentFrame++;
            
            if(this.currentFrame > 3 ) 
            {
                this.currentFrame = 0;
            }
        }
        
        ctx.drawImage(
            this.sprite,
            this.currentFrame * this.frameWidth,
            this.animationY * this.frameHeight,
            this.frameWidth,   //2x gebruiken, 1 voor canvas en 1 voor frame.
            this.frameHeight,
            this.position.x,
            this.position.y,
            this.width,
            this.height);  
                    if(Game.DEBUG)
            this.collider.draw(ctx); 
    }
    
    public onKeyDown(event:KeyboardEvent):void 
    {
        
    }
    
    public onKeyUp(event:KeyboardEvent):void 
    {

    } 
}