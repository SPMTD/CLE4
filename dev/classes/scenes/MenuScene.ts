class MenuScene extends Scene
{
    public init() : void
    {
        super.init();
        
        this.gameObjects.push(new TextObject(new Vector2(Game.width / 2 - 50, 200), 100 , 50, "Welkom!", 24, new Color(0, 100, 0)));
        this.gameObjects.push(new FadeText(new Vector2(Game.width / 2 - 200, Game.height / 2), 400 , 50, "Druk op een knop om te beginnen!", 24, new Color(255, 255, 255), 0.25, 1.0, 0.5));
    }

    public onKeyDown(event:KeyboardEvent):void 
    {
        this.game.activateScene(E_SCENES.LEVEL1_SCENE);
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