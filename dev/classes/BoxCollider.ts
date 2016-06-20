/**
 * BoxCollider
 */

interface ColliderReturnObject
{
    collided:Boolean;
    direction:ColliderDirection;
}

interface CollidedReturnObject
{
    object:GameObject;
    direction:ColliderDirection;
}

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

    public hitsOtherCollider(rec: BoxCollider): ColliderReturnObject 
    {
        let rtn = {collided:false, direction:ColliderDirection.NONE};

        let w = 0.5 * (this.width + rec.width);
        let h = 0.5 * (this.height + rec.height);

        let dx = ((this.x + (this.width / 2)) - (rec.x + (rec.width / 2)));
        let dy = ((this.y + (this.height / 2)) - (rec.y + (rec.height / 2)));

        if(Math.abs(dx) <= w && Math.abs(dy) <= h)
        {
            //console.log("x: " + this.x + " y: " + this.y + " w: " + this.width + " h: " + this.height);
            let wy = w * dy;
            let hx = h * dx;

            if(wy > hx)
            {
                if(wy > -hx)
                    rtn = {collided:true, direction:ColliderDirection.TOP};
                else
                    rtn = {collided:true, direction:ColliderDirection.RIGHT}; 
            }
            else
            {
                if(wy > -hx)
                    rtn = {collided:true, direction:ColliderDirection.LEFT};
                else
                    rtn = {collided:true, direction:ColliderDirection.BOTTOM};
            }
        }

        return rtn;
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