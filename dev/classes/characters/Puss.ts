class Puss extends SpriteObject
{    
    public jumping:Boolean = false;
    private jumpCount:number = 0;
    private jumpSpeed:number = 0;
    private maxJumpHeight:number = 125;
    private jumpHeight:number = 0;

    constructor(position:Vector2, width:number, height:number, speed:number)
    {
        super(position, width, height, 57, 57, 'spriteTest', true, true, true, true, E_COLLIDER_TYPES.CHARACTER);
        this.speed = 0.75;
        this.maxHorSpeed = 5;
        this.drag = 0.15;
        this.animationSpeed = 10;
        this.collider.width = 30;
        this.collider.height = 43;
        this.collider.offset = new Vector2(10, 0);

        this.jumpSpeed = 0.75;
    }
    
    public update() : void
    {           
        if(this.direction.y == -1 && this.grounded)
        { 
            this.jumping = true;
            this.jumpCount = 0;
            this.jumpHeight = 0;
            this.direction.y = 0;
            this.jumpSpeed = 10;
            this.grounded = false;
        }

        if(this.jumping)
        {
            if(this.jumpHeight <= this.maxJumpHeight)
            {
                let vel = (Game.gravity + this.jumpSpeed);
                this.velocity.y = -vel;
                this.jumpHeight += vel;
                this.jumpSpeed -= 0.01;
            }
            else
            {
                this.velocity.y = 0;
                this.jumping = false;
            }
        }

        if(this.position.x > Game.width - this.width)
            this.position.x = Game.width - this.width;

        if(this.position.x < 0)
            this.position.x = 0;

        super.update();
    }

    public collided(co:CollidedReturnObject)
    {
        if(co.object.colliderType() == E_COLLIDER_TYPES.GROUND)
        {
            console.log(co.direction);
            if(co.direction == ColliderDirection.BOTTOM)
            {
                this.grounded = true;   
                this.position.y = co.object.position.y - this.collider.height;
            }
        }

        super.collided(co);
    }
    
    public onKeyDown(event:KeyboardEvent):void 
    {
        switch(event.keyCode)
        {
            case 38: //UP
                if(this.grounded)
                {
                    this.direction.y = -1;
                }
                break;
            case 39: //RIGHT
                this.direction.x = 1;
                this.animationY = 2;
                break;
            case 37: //LEFT
                this.direction.x = -1;
                this.animationY = 1;
                break;               
        }
    }
    
    public onKeyUp(event:KeyboardEvent):void 
    {
        switch(event.keyCode)
        {
            case 38: //UP
                this.direction.y = 0;
                break;
            case 39: //RIGHT
                if(this.direction.x == 1)
                {
                    this.direction.x = 0;
                    this.animationY = 0;
                }
                break;
            case 37: //LEFT
                if(this.direction.x == -1)
                {
                    this.direction.x = 0;
                    this.animationY = 0;
                }
                break;
        }
    }
}