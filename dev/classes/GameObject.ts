
class GameObject
{
    public position:Vector2;
    public direction:Vector2;
    public speed:number = 0;
    public width:number;
    public height:number;
    public needsInput:Boolean;
    private rect: Rectangle;
    public hasCollider:Boolean;
    
    constructor(position:Vector2, width:number, height:number, needsInput:Boolean = false, collider:Boolean = false)
    {
        this.width = width;
        this.height = height;
        position.x = (position.x - (this.width / 2));
        position.y = (position.y - (this.height / 2));
        this.position = position;
        this.needsInput = needsInput;
        this.hasCollider = collider;
        this.direction = Vector2.zero;
        
        if(this.hasCollider)
            this.rect = new Rectangle(position.x, position.y, width, height);
    }
    
    public isColliding(r: GameObject) : boolean
    {
        return this.rect.hitsOtherRectangle(r.rect);
    }
    
    public update()
    {
        this.rect = new Rectangle(this.position.x, this.position.y, this.width, this.height);
        this.position = Vector2.add(this.position, Vector2.multiply(this.direction, this.speed));   
    }
    
    // Virtual functions that are overridden in extending classes.
    public draw(ctx:CanvasRenderingContext2D) {}
    
    public onKeyDown(event:KeyboardEvent):void {}
    
    public onKeyUp(event:KeyboardEvent):void {}
}