class SplashScene extends Scene
{
    public init() : void
    {
        super.init();
        this.gameObjects.push(new TextObject(new Vector2(window.innerWidth / 2, 100), 400, 50, "Welcome to zha jungle, ya!", 36, 100, 0, 0));
        this.gameObjects.push(new FadeText(new Vector2(window.innerWidth / 2, window.innerHeight - 200), 600, 50, "Druk op een toets om door te gaan!", 36, 0, 100, 0, 0.25, 1.0, 5));
        this.gameObjects.push(new Puss(new Vector2(window.innerWidth / 2, window.innerHeight / 2 + 100), 100, 250, 3));
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