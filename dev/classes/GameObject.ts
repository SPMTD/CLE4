
class GameObject
{
    public position:Vector2;
    public direction:Vector2;
    private oldPosition:Vector2;
    public speed:number = 0;
    public width:number;
    public height:number;
    public needsInput:Boolean;
    private rect: Rectangle;
    public hasCollider:Boolean;
    public hasCollided:Boolean;
    public hasGravity:Boolean;
    
    constructor(position:Vector2, width:number, height:number, needsInput:Boolean = false, collider:Boolean = false, hasGravity:Boolean = false)
    {
        this.width = width;
        this.height = height;
        this.position = position;
        this.oldPosition = position;
        this.hasGravity = hasGravity;
        
        /*this.position.x = (this.position.x - (this.width / 2));
        this.position.y = (this.position.y - (this.height / 2));
        
        if(this.position.x < 0)
            this.position.x = 0;
            
        if(this.position.y < 0)
            this.position.y = 0;*/
        
        this.needsInput = needsInput;
        this.hasCollider = collider;
        this.direction = Vector2.zero;
        this.hasCollided = false;
        
        if(this.hasCollider)
            this.rect = new Rectangle(position.x, position.y, width - (width / 8), height - (height / 8));
    }
    
    public isColliding(r: GameObject) : boolean
    {
        return this.rect.hitsOtherRectangle(r.rect);
    }
    
    public update()
    {
        if(this.hasCollider)
        {
            let rectPos = Vector2.add(this.position, Vector2.multiply(this.direction, this.speed));
            this.rect.x = rectPos.x;
            this.rect.y = rectPos.y;
        }
        
        if(this.hasGravity)
        {
            this.position.y += Game.gravity;
        }
        
        this.position = Vector2.add(this.position, Vector2.multiply(this.direction, this.speed)); 
    }
    
    public collided()
    {    
        if(this.hasGravity)
        {
            this.position.y -= Game.gravity;
        }
    }
    
    // Virtual functions that are overridden in extending classes.
    public draw(ctx:CanvasRenderingContext2D) {}
    
    public onKeyDown(event:KeyboardEvent):void {}
    
    public onKeyUp(event:KeyboardEvent):void {}
}