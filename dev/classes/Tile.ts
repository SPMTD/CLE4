class Tile extends GameObject
{
    private tileSet:HTMLImageElement;
    
    constructor(position:Vector2, width:number, height:number, tileSet:HTMLImageElement, needsInput:Boolean = false, collider:Boolean = false)
    {
        super(position, width, height, needsInput, collider);
        this.tileSet = tileSet;
    }
    
    public draw(ctx:CanvasRenderingContext2D)
    {
        
    }
}