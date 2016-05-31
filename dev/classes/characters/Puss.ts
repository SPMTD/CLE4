class Puss extends SpriteObject
{
    constructor(position:Vector2, width:number, height:number, speed:number)
    {
        super(position, width, height, 'spriteTest', true);
        this.speed = speed;
        this.animationSpeed = 10;
    }
    
    public update() : void
    {
        super.update();
    }
    
    public onKeyDown(event:KeyboardEvent):void 
    {
        switch(event.keyCode)
        {
            case 38: //UP
                this.direction.y = -1;
                this.animationY = 3;
                break;
            case 39: //RIGHT
                this.direction.x = 1;
                this.animationY = 2;
                break;
            case 40: //DOWN
                this.direction.y = 1;
                this.animationY = 0;
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
                this.animationY = 0;
                break;
            case 39: //RIGHT
                if(this.direction.x == 1) // basically, we want to prevent this call if the user is already moving in an opposite direction (going left, right quickly for example).
                {
                    this.direction.x = 0;
                    this.animationY = 0;
                }
                break;
            case 40: //DOWN
                this.direction.y = 0;
                this.animationY = 0;
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