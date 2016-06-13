
class GameObject
{
    public rnd:number;
    public position:Vector2;
    public direction:Vector2;
    public velocity:Vector2;
    public acceleration:Vector2;
    public maxHorSpeed:number = 5;
    public maxVertSpeed:number = 7.5;
    public drag:number = 0.25;

    protected oldPosition:Vector2;
    public speed:number = 0;
    public width:number;
    public height:number;
    public needsInput:Boolean;
    protected collider: BoxCollider;
    public hasCollider:Boolean;
    public hasCollided:Boolean;
    public hasGravity:Boolean;
    protected gravity:Boolean = false;
    public grounded:Boolean = false;
    public canMove:Boolean = false;
    
    constructor(position:Vector2, width:number, height:number, needsInput:Boolean = false, collider:Boolean = false, hasGravity:Boolean = false, canMove:Boolean = false, type:E_COLLIDER_TYPES = E_COLLIDER_TYPES.PROP)
    {
        this.width = width;
        this.height = height;
        this.position = position;
        this.oldPosition = position;
        this.hasGravity = hasGravity;
        this.canMove = canMove;
        this.rnd = Math.random();

        /*this.position.x = (this.position.x - (this.width / 2));
        this.position.y = (this.position.y - (this.height / 2));
        
        if(this.position.x < 0)
            this.position.x = 0;
            
        if(this.position.y < 0)
            this.position.y = 0;*/
        
        this.needsInput = needsInput;
        this.hasCollider = collider;
        this.direction = new Vector2(0, 0);
        this.velocity = new Vector2(0, 0);
        this.acceleration = new Vector2(0, 0);
        this.hasCollided = false;
        
        if(this.hasCollider)
        {
            this.collider = new BoxCollider(position.x, position.y, width, height, type);
        }

        if(this.hasGravity)
            this.gravity = true;
    }
    
    public isColliding(r: GameObject) : boolean
    {
        return this.collider.hitsOtherCollider(r.collider);
    }

    public update()
    {
        if(this.canMove)
        {
            let vl = this.velocity.sqrMagnitude();
            
            this.velocity = Vector2.add(this.velocity, Vector2.multiply(this.direction, this.speed));

            // drag
            if(vl > 0)
            {
                this.velocity = Vector2.add(this.velocity, Vector2.multiply(Vector2.inverse(this.velocity), this.drag));
            }

            if((this.hasGravity && this.gravity) && !this.grounded)
            {
                this.velocity.y += Game.gravity;
            }

            let nv = Vector2.add(this.position, this.velocity); // new vector
            let angle = Math.atan2(nv.x - this.position.x, nv.y - this.position.y) * cMath.rad2deg; // get the angle of movement.

            if(angle < 0)
                angle *= -1;

            // Only clamp the horizontal movement if the player is moving sideways.
            // This prevents the player from moving sideways too fast, and also does not clamp jumping and gravity.
            if(vl > this.maxHorSpeed && angle > 75)
                this.velocity = Vector2.clamp(this.velocity, this.maxHorSpeed);  
            else if(vl > this.maxVertSpeed)
                this.velocity = Vector2.clamp(this.velocity, this.maxVertSpeed);   

            // Makes slowing down look and feel smoother.
            if(vl > 0 && vl < 0.1)
            {
                this.velocity = Vector2.zero;
            }

            this.position = Vector2.add(this.position, this.velocity);

            // Reset for next run, they are set on collision check (after update).
            if(this.hasGravity)
            {
                this.grounded = false;
                this.gravity = true;
            }

            // Update the collider position in case the GameObject moved.
            if(this.hasCollider)
            {
                this.collider.updatePosition(this.position);
            }
        }
    }
    
    public collided(go:GameObject)
    {
        /*if(go.colliderType() == E_COLLIDER_TYPES.GROUND)
        {
            this.grounded = true;   
            this.position.y = go.position.y - this.collider.height;
        }*/
    }

    public colliderType() : E_COLLIDER_TYPES
    {
        return this.collider.type;
    }
    
    // Virtual functions that are overridden in extending classes.
    public draw(ctx:CanvasRenderingContext2D) 
    { 
        if(Game.DEBUG)
            this.collider.draw(ctx); 
    }
    
    public onKeyDown(event:KeyboardEvent):void {}
    
    public onKeyUp(event:KeyboardEvent):void {}
}