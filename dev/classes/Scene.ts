class Scene
{
    public gameObjects: GameObject[] = [];
    public goNeedInput: GameObject[] = []; // Array of GameObjects that require input events (reference stored).
    public goHasCollider: GameObject[] = [] // Array of GameObjects that have a collider (and so should collide - reference stored).
    
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
    
    public handleCollisions():void
    {
        for(let i = 0; i < this.goHasCollider.length; i++)
        {
            for(let j = 0; j < this.goHasCollider.length; j++)
            {
                if(i == j)
                    continue;
                    
                if(this.goHasCollider[i].isColliding(this.goHasCollider[j]))
                {
                    this.goHasCollider[i].collided();
                    this.goHasCollider[j].collided();
                }
            }
        }
    }
    
    public update() : void 
    {
        for(let i:number = 0; i < this.gameObjects.length; i++)
        {
            this.gameObjects[i].update();
        }
        
        this.handleCollisions();
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
        for(let i:number = 0; i < this.goNeedInput.length; i++)
        {
            this.goNeedInput[i].onKeyDown(event);
        }
    }
    
    public onKeyUp(event:KeyboardEvent):void 
    {
        for(let i:number = 0; i < this.goNeedInput.length; i++)
        {
            this.goNeedInput[i].onKeyUp(event);
        }
    }
    
    public processGameObjects():void
    {
        for(let i = 0; i < this.gameObjects.length; i++)
        {
            if(this.gameObjects[i].needsInput)
            {
                this.goNeedInput.push(this.gameObjects[i]);
            }
            
            if(this.gameObjects[i].hasCollider)
            {
                this.goHasCollider.push(this.gameObjects[i]);
            }
        }
    }
}