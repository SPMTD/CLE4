class SplashScene extends Scene
{
    private level:LevelLoader;
    
    public init() : void
    {
        super.init();
        
        this.gameObjects.push(new FadeText(new Vector2(Game.width / 2 - 50, Game.height / 2), 100 , 50, "Welkom!", 24, 0, 100, 0, 0.25, 1.0, 0.5));
        this.gameObjects.push(new Puss(new Vector2(0,0), 50, 50, 0.75));
        //this.gameObjects.push(new Wall(new Vector2(600, Game.height / 2), 64, 256, false, true));
        this.gameObjects.push(new Knightsalot(new Vector2(0,0), 50, 50, 0.75));
        
        // Load level.
        this.level = new LevelLoader();       
        this.level.load("test3", (arr : Array<GameObject>) => 
        {
            for(let i = 0; i < arr.length; i++)
            {
                this.gameObjects.push(arr[i]);
            }
            
            super.processGameObjects();
        });
    }
    
    public update() : void
    {
        super.update();
    }
    
    public draw(ctx:CanvasRenderingContext2D) : void
    {
        super.draw(ctx);
    }
}