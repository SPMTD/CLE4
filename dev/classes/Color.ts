class Color
{
    public r:number;
    public g:number;
    public b:number;
    public a:number;
    public colorString:string;

    constructor(r:number, g:number, b:number, a:number = 1)
    {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        this.cacheColorString();
    }

    public cacheColorString(){
        this.colorString = "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")"; 
    }
}