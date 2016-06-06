class Tile extends GameObject
{
    private tileSet:HTMLImageElement;
    private offsetX:number;
    private offsetY:number;
    
    constructor(position:Vector2, width:number, height:number, tileSet:HTMLImageElement, offsetX:number, offsetY:number, needsInput:Boolean = false, collider:Boolean = false)
    {
        super(position, width, height, needsInput, collider);
        this.tileSet = tileSet;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }
    
    public update()
    {
        super.update();
    }
    
    public draw(ctx:CanvasRenderingContext2D)
    {
        ctx.drawImage(this.tileSet, 
            this.offsetX, 
            this.offsetY, 
            this.width, 
            this.height, 
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height);
    }
}