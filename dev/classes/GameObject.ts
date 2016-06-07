
class GameObject
{
    public position:Vector2;
    public direction:Vector2;
    private oldPosition:Vector2;
    public speed:number = 0;
    public width:number;
    public height:number;
    public needsInput:Boolean;
    private collider: BoxCollider;
    public hasCollider:Boolean;
    public hasCollided:Boolean;
    public hasGravity:Boolean;
    private gravity:Boolean = false;
    public grounded:Boolean = false;
    
    constructor(position:Vector2, width:number, height:number, needsInput:Boolean = false, collider:Boolean = false, hasGravity:Boolean = false, type:E_COLLIDER_TYPES = E_COLLIDER_TYPES.PROP)
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
        {
            this.collider = new BoxCollider(position.x, position.y, width - (width / 8), height - (height / 8), type);
        }

        if(this.hasGravity)
            this.gravity = true;
    }
    
    public isColliding(r: GameObject) : boolean
    {
        return this.collider.hitsOtherCollider(r.collider);
    }
    
    public update()
    {        if(this.hasGravity)
        {
            this.grounded = false;
            this.gravity = true;
        }
        if(this.hasCollider)
        {
            let rectPos = Vector2.add(this.position, Vector2.multiply(this.direction, this.speed));
            this.collider.x = rectPos.x;
            this.collider.y = rectPos.y;
        }

        if((this.hasGravity && this.gravity) && !this.grounded)
        {
            this.position.y += Game.gravity;
        }
    }
    
    public collided(type:E_COLLIDER_TYPES) // caused is true if this is the GameObject that caused the collision.
    {
        if(type == E_COLLIDER_TYPES.GROUND)
        {    
            this.grounded = true;
            if(this.hasGravity && this.gravity)
            {
                this.position.y -= Game.gravity;
                this.gravity = false;
            }
        }
    }

    public colliderType() : E_COLLIDER_TYPES
    {
        return this.collider.type;
    }
    
    // Virtual functions that are overridden in extending classes.
    public draw(ctx:CanvasRenderingContext2D) {}
    
    public onKeyDown(event:KeyboardEvent):void {}
    
    public onKeyUp(event:KeyboardEvent):void {}
}