class SplashScene extends Scene
{
    private level:LevelLoader;
    
    public init() : void
    {
        super.init();
        
        this.gameObjects.push(new TextObject(new Vector2(Game.width / 2, 100), 400, 50, "Welcome to zha jungle, ya!", 36, 100, 0, 0));
        this.gameObjects.push(new FadeText(new Vector2(Game.width / 2, Game.height - 200), 600, 50, "Druk op een toets om door te gaan!", 36, 0, 100, 0, 0.25, 1.0, 5));
        this.gameObjects.push(new Puss(new Vector2(0,0), 50, 50, 3));
        //this.gameObjects.push(new Wall(new Vector2(600, Game.height / 2), 64, 256, false, true));
        
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