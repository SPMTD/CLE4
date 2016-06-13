class cMath
{
    public static deg2rad:number = Math.PI/180;
    public static rad2deg:number = 180/Math.PI;
    
    public static clamp(n:number, min:number, max:number)
    {
        return Math.min(Math.max(n, min), max);
    };
}