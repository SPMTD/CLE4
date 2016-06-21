class ButtonObject extends GameObject
{
    public text:string;
    public size:number;
    
    public color:Color;
    
    constructor(position:Vector2, width:number, height:number, text:string, size:number, color:Color)
    {
        super(position, width, height, false, false);
        this.text = text;
        this.size = size;
        this.color = color;
    }
    
    public update()
    {
        
    }
    
    public draw(ctx:CanvasRenderingContext2D)
    {
        ctx.fillStyle = this.color.colorString;
        ctx.font = this.size + "px Arial";
        ctx.fillText(this.text, this.position.x, this.position.y, this.width);
    }
}