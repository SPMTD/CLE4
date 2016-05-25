class Puss extends SpriteObject
{
    constructor(position:Vector2, width:number, height:number, speed:number)
    {
        super(position, width, height, 'cat', true);
        this.speed = speed;
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
                break;
            case 39: //RIGHT
                this.direction.x = 1;
                break;
            case 40: //DOWN
                this.direction.y = 1;
                break;
            case 37: //LEFT
                this.direction.x = -1;
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
                this.direction.x = 0;
                break;
            case 40: //DOWN
                this.direction.y = 0;
                break;
            case 37: //LEFT
                this.direction.x = 0;
                break;
        }
    }
}