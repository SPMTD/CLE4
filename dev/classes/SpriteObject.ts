class SpriteObject extends GameObject
{
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
        ctx.drawImage(this.sprite, this.position.x, this.position.y, this.width, this.height);
    }
    
    public onKeyDown(event:KeyboardEvent):void 
    {
        
    }
    
    public onKeyUp(event:KeyboardEvent):void 
    {

    }
}