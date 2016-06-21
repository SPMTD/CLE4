/**
 * wall
 */
class Wall extends GameObject {

    public sprite:HTMLImageElement;
    
    constructor(position: Vector2, width:number, height:number, collider:Boolean = true) {
        super(position, width, height, false, collider);
        this.sprite = new Image(this.width, this.height);
        this.sprite.src = 'images/wall.png';        
    }
    
    public update() :void {
        super.update();
    }
    
    public draw(ctx: CanvasRenderingContext2D) :void {
        ctx.drawImage(
            this.sprite,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }
}