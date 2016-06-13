class Knightsalot extends SpriteObject
{
    public jumping:Boolean = false;
    private jumpCount:number = 0;
    private jumpSpeed:number = 0;
    
    constructor(position:Vector2, width:number, height:number, speed:number) 
    {
        super(position, width, height, 57, 57, 'spriteTest', true, true, true, true, E_COLLIDER_TYPES.CHARACTER);
        this.speed = 0.75;
        this.maxHorSpeed = 5;
        this.drag = 0.15;
        this.animationSpeed = 10;
        this.collider.width = 30;
        this.collider.height = 43;
        
        this.jumpSpeed = 0.75;  
    }
    
    public update() : void 
    {
        this.position = Vector2.add(this.position, this.velocity);
        
        if(this.direction.y == -1 && this.grounded)
        {
            this.jumping = true;
            this.jumpCount = 0;
            this.direction.y = 0;
            this.jumpSpeed = 0.6;
            this.grounded = false;
        }
        
        if(this.jumping) 
        {
            if(this.jumpSpeed > 0)
            {
                this.velocity.y -= Game.gravity + this.jumpSpeed;
                this.jumpSpeed -= 0.1;
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
    public onKeyDown(event:KeyboardEvent) :void 
    {
        switch(event.keyCode)
        {
            case 87: //UP
                if(this.grounded)
                {
                    this.direction.y = -1;
                }
                break;
            case 68: //RIGHT
                this.direction.x = 1;
                this.animationY = 2;
                console.log("rechtsafslaan lul");
                break;
            case 65: //LEFT
                this.direction.x = -1;
                this.animationY = 1;
                console.log("linksafslaan lul");
                break;               
        }
    }
    
    public onKeyUp(event:KeyboardEvent):void 
    {
        switch(event.keyCode)
        {
            case 87: //UP
                this.direction.y = 0;
                break;
            case 68: //RIGHT
                if(this.direction.x == 1)
                {
                    this.direction.x = 0;
                    this.animationY = 0;
                }
                break;
            case 65: //LEFT
                if(this.direction.x == -1)
                {
                    this.direction.x = 0;
                    this.animationY = 0;
                }
                break;
        }
    }
}