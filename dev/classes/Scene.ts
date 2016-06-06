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