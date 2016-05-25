class TextObject extends GameObject
{
    public text:string;
    public size:number;
    
    constructor(position:Vector2, width:number, height:number, text:string, size:number)
    {
        super(position, width, height);
        this.text = text;
        this.size = size;
    }
    
    public update()
    {
        
    }
    
    public draw(ctx:CanvasRenderingContext2D)
    {
        ctx.fillStyle = "rgba(0, 0, 0, 100)";
        ctx.font = this.size + "px Arial";
        ctx.fillText(this.text, this.position.x, this.position.y, this.width);
    }
}