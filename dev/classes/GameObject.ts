class GameObject
{
    public position:Vector2;
    public direction:Vector2;
    public speed:number;
    public width:number;
    public height:number;
    public needsInput:Boolean;
    
    
    constructor(position:Vector2, width:number, height:number, needsInput:Boolean = false)
    {
        this.width = width;
        this.height = height;
        position.x = (position.x - (this.width / 2));
        position.y = (position.y - (this.height / 2));
        this.position = position;
        this.needsInput = needsInput;
        this.direction = Vector2.zero;
        
    }
    
    public update()
    {
        this.position = Vector2.add(this.position, Vector2.multiply(this.direction, this.speed));
    }
    
    // Virtual functions that are overridden in extending classes.
    public draw(ctx:CanvasRenderingContext2D) {}
    
    public onKeyDown(event:KeyboardEvent):void {}
    
    public onKeyUp(event:KeyboardEvent):void {}
}