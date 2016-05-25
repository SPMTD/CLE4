class FadeText extends TextObject
{
    private lowAlpha:number;
    private highAlpha:number;
    private duration:number;
    private alpha:number;
    private revert:Boolean;
    
    constructor(position:Vector2, width:number, height:number, text:string, size:number, low:number, high:number, duration:number)
    {
        super(position, width, height, text, size);
        this.lowAlpha = low;
        this.highAlpha = high;
        this.duration = duration;
        this.alpha = 1.0;
        this.revert = false;
    }
    
    public update() : void
    {
        
    }
    
    public draw(ctx:CanvasRenderingContext2D) : void
    {   
        if(!this.revert)
        {
            if(this.alpha > this.lowAlpha)
                this.alpha -= .005;
            else
                this.revert = true;
        }
        else
        {
            if(this.alpha <= this.highAlpha)
                this.alpha += .01;
            else
                this.revert = false;
        }
        
        ctx.fillStyle = "rgba(0, 0, 0, " + this.alpha + ")";
        ctx.font = this.size + "px Arial";
        ctx.fillText(this.text, this.position.x, this.position.y, this.width);
    }
}