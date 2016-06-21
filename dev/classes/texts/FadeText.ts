class FadeText extends TextObject
{
    private lowAlpha:number;
    private highAlpha:number;
    private duration:number;
    private revert:Boolean;
        
    constructor(position:Vector2, width:number, height:number, text:string, size:number, color:Color, low:number, high:number, duration:number)
    {
        super(position, width, height, text, size, color);
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
            if(this.color.a > this.lowAlpha)
                this.color.a -= this.duration / Game.MS_UPDATE_LAG;
            else
                this.revert = true;
        }
        else
        {
            if(this.color.a <= this.highAlpha)
                this.color.a += this.duration / Game.MS_UPDATE_LAG;
            else
                this.revert = false;
        }
        this.color.cacheColorString();
        super.draw(ctx);
    }
}

