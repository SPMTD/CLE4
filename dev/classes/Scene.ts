class Scene
{
    public gameObjects: GameObject[] = [];
    
    constructor()
    {
        this.init();
    }
    
    public init() : void
    {
    }
    
    public destroy() : void
    {
        
    }
    
    public update() : void 
    {
        this.checkCollisions();
        for(let i:number = 0; i < this.gameObjects.length; i++)
        {
            this.gameObjects[i].update();
        }
    }
    
    public draw(ctx:CanvasRenderingContext2D): void 
    {
        for(let i:number = 0; i < this.gameObjects.length; i++)
        {
            this.gameObjects[i].draw(ctx);
        }
    }
    
    public checkCollisions(): void
    {
        for(let i = 0; i < this.gameObjects.length; i++)
        {
            for(let j = 0; j < this.gameObjects.length; j++)
            {
                if(i == j)
                    continue;
                    
                if(!this.gameObjects[i].hasCollider || !this.gameObjects[j].hasCollider)
                    continue;
                
                if(this.gameObjects[i].isColliding(this.gameObjects[j]))
                {
                    console.log("Hitting nigga");
                }    
            }
        }
    }
    
    public onKeyDown(event:KeyboardEvent):void 
    {
        for(let i:number = 0; i < this.gameObjects.length; i++)
        {
            this.gameObjects[i].onKeyDown(event);
        }
    }
    
    public onKeyUp(event:KeyboardEvent):void 
    {
        for(let i:number = 0; i < this.gameObjects.length; i++)
        {
            this.gameObjects[i].onKeyUp(event);
        }
    }
}