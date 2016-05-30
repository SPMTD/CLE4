class FadeText extends TextObject
{
    private lowAlpha:number;
    private highAlpha:number;
    private duration:number;
    private revert:Boolean;
        
    constructor(position:Vector2, width:number, height:number, text:string, size:number, r:number, g:number, b:number, low:number, high:number, duration:number)
    {
        super(position, width, height, text, size, r, g, b);
        this.lowAlpha = low;
        this.highAlpha = high;
        this.duration = duration;
        this.revert = false;
    }
    
    public update() : void
    {
        
    }
    
    public draw(ctx:CanvasRenderingContext2D) : void
    {   
        if(!this.revert)
        {
            if(this.color[3] > this.lowAlpha)
                this.color[3] -= .005;
            else
                this.revert = true;
        }
        else
        {
            if(this.color[3] <= this.highAlpha)
                this.color[3] += .01;
            else
                this.revert = false;
        }
        this.cacheColorString();
        super.draw(ctx);
    }
}

