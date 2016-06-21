class GameOverScene extends Scene
{
    public init() : void
    {
        super.init();
        
        this.gameObjects.push(new FadeText(new Vector2(Game.width / 2 - 75, Game.height / 2 - 100), 150 , 50, "Goed gedaan!", 24, new Color(255, 255, 255), 0.25, 1.0, 0.5));
        this.gameObjects.push(new TextObject(new Vector2(Game.width / 2 - 250, Game.height / 2), 500 , 50, "Je hebt goed samengewerkt en de game uitgespeeld.", 24, new Color(0, 0, 0)));
    }

    public onKeyDown(event:KeyboardEvent):void 
    {
        if(event.keyCode == 27)
            this.game.activateScene(E_SCENES.MENU_SCENE);
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