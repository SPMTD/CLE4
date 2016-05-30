class Vector2
{
    public x:number;
    public y:number;
    
    static zero = new Vector2(0, 0);
    
    constructor(x:number, y:number)
    {
        this.x = x;
        this.y = y;
    }
    
    public static multiply(v1:Vector2, scalar:number)
    {
        return new Vector2(v1.x * scalar, v1.y * scalar);
    }
    
    public static add(v1:Vector2, v2:Vector2)
    {
        return new Vector2(v1.x + v2.x, v1.y + v2.y);
    }
    
    public static substract(v1:Vector2, v2:Vector2)
    {
        return new Vector2(v1.x + v2.x, v1.y + v2.y);
    }
    public static length(v1: Vector2) {
        return Math.sqrt((v1.x * v1.x) + (v1.y * v1.y))
    }
    
    public static isZero(v1:Vector2)
    {
        return ((v1.x == Vector2.zero.x && v1.y == Vector2.zero.y) ? true : false);
    }
}