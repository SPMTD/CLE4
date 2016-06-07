class Puss extends SpriteObject
{    
    public jumping:Boolean = false;
    private jumpCount:number = 0;

    constructor(position:Vector2, width:number, height:number, speed:number)
    {
        super(position, width, height, 'spriteTest', true, true, true, E_COLLIDER_TYPES.CHARACTER);
        this.speed = speed;
        this.animationSpeed = 10;
    }
    
    public update() : void
    {
        super.update();
        
        this.position = Vector2.add(this.position, Vector2.multiply(this.direction, this.speed)); 
        
        if(this.direction.y == -1 && this.grounded)
        { 
            this.jumping = true;
            this.jumpCount = 0;
        }

        if(this.grounded)
            this.jumping = false;

        if(this.jumping && this.jumpCount < 10)
        {
            this.jumpCount++;
            this.position.y -= Game.gravity * 2;
        }
    }
    
    public onKeyDown(event:KeyboardEvent):void 
    {
        switch(event.keyCode)
        {
            case 38: //UP
                this.direction.y = -1;
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