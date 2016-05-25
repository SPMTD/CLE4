class TextObject extends GameObject
{
    public text:string;
    public size:number;
    
    public color:number[] = [4];  
    public textColor:string;
    
    constructor(position:Vector2, width:number, height:number, text:string, size:number, r:number, g:number, b:number, a:number = 1)
    {
        super(position, width, height);
        this.text = text;
        this.size = size;
        this.color[0] = r;
        this.color[1] = g;
        this.color[2] = b;
        this.color[3] = a;
        this.cacheColorString();
    }
    
    public update()
    {
        
    }
    
    public draw(ctx:CanvasRenderingContext2D)
    {
        ctx.fillStyle = this.textColor;
        ctx.font = this.size + "px Arial";
        ctx.fillText(this.text, this.position.x, this.position.y, this.width);
    }
    
    protected cacheColorString(){
        this.textColor = "rgba(" + this.color[0] + "," + this.color[1] + "," + this.color[2] + "," + this.color[3] + ")"; 
    }
}