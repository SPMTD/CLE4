/**
 * Rectangle
 */
class Rectangle {
    
    public x : number;
    public y : number;
    public width: number;
    public height: number;
    
    constructor(x:number, y:number, w:number, h:number) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    
    public hitsPoint(posx:number, posy:number): boolean {
        var differencex = this.x - posx;
        var differencey = this.y - posy;
        
        return Math.abs(differencex) < this.width/2 && Math.abs(differencey) < this.height/2;
    }

    public hitsOtherRectangle(rec: Rectangle): boolean 
    {
        return !(rec.x > this.x + this.width || 
           rec.x + rec.width < this.x || 
           rec.y > this.y + this.height ||
           rec.y + rec.height < this.y);
    }
}