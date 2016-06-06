/// <reference path="Wall.ts" />

class SpriteObject extends GameObject
{
    private currentFrame:   number      = 0;
    public animationY:      number      = 0;
    public animationSpeed:  number      = 0;
    
    private frameWidth:     number      = 57;
    private frameHeight:    number      = 55;
    
    private timer:          number      = 0;
    
    public sprite:HTMLImageElement;
    
    constructor(position:Vector2, width:number, height:number, img:string, needsInput:Boolean = false, collider:Boolean = false)
    {
        super(position, width, height, needsInput, collider);
        this.sprite = new Image(this.width, this.height);
        this.sprite.src = 'images/' + img + '.png'; 
    }
        
    /*public getPositions(sprite) {
        var posx = this.position.x;
        var posy = this.position.y;
        let height = this.height;
        let width = this.width;
        return [ 
                [posx, posx + width],
                [posy, posy + height] 
               ];
    }
    public comparePositions(p1, p2) {
        var x1 = p1[0] < p2[0] ? p1 : p2;
        var x2 = p1[0] < p2[0] ? p2 : p1;
        return x1[1] > x2[0] || x1[0] == x2[0] ? true : false;
        
    }
    
    public checkCollisions() {
        var wall = Wall[0];
        var pos = this.getPositions(Wall);
        var pos2 = this.getPositions(this.sprite);
        
        var horizontalMatch = this.comparePositions(pos[0], pos2[0]);
        var verticalMatch = this.comparePositions(pos[1], pos2[1]);
        var match = horizontalMatch && verticalMatch;
        
        console.log(this.getPositions(this.sprite));
        
        if(match) {
            console.log("COLLISIONNNNNNNN")
        }
    }*/
    
    public update()
    {
        super.update();
        
    }
    
    public draw(ctx:CanvasRenderingContext2D)
    {
        this.timer++;
        if(Vector2.length(this.direction) > 0) 
        {
            if(this.timer % this.animationSpeed == 0)
                this.currentFrame++;
            
            if(this.currentFrame > 3 ) 
            {
                this.currentFrame = 0;
            }
        }
        
        ctx.drawImage(
            this.sprite,
            this.currentFrame * this.frameWidth,
            this.animationY * this.frameHeight,
            this.frameHeight,   //2x gebruiken, 1 voor canvas en 1 voor frame.
            this.frameWidth,
            this.position.x,
            this.position.y,
            this.frameWidth,
            this.frameHeight);
            
    }
    

    
    public onKeyDown(event:KeyboardEvent):void 
    {
        
    }
    
    public onKeyUp(event:KeyboardEvent):void 
    {

    }
    
    
}