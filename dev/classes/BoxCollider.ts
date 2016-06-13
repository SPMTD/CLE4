/**
 * BoxCollider
 */
class BoxCollider {
    
    public x : number;
    public y : number;
    public width: number;
    public height: number;
    public type: E_COLLIDER_TYPES;
    public offset: Vector2;
    
    constructor(x:number, y:number, w:number, h:number, type:E_COLLIDER_TYPES, offset:Vector2 = Vector2.zero) 
    {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.type = type;
        this.offset = offset;
    }
    
    public hitsPoint(posx:number, posy:number): boolean 
    {
        var differencex = this.x - posx;
        var differencey = this.y - posy;
        
        return Math.abs(differencex) < this.width/2 && Math.abs(differencey) < this.height/2;
    }

    public hitsOtherCollider(rec: BoxCollider): boolean 
    {
        return !(rec.x > this.x + this.width || 
           rec.x + rec.width < this.x || 
           rec.y > this.y + this.height ||
           rec.y + rec.height < this.y);
    }

    public draw(ctx:CanvasRenderingContext2D): void
    {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    public updatePosition(pos:Vector2): void
    {
        this.x = pos.x + this.offset.x;
        this.y = pos.y + this.offset.y;
    }
}