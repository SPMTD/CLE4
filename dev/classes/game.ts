enum E_SCENES 
{
    SPLASH_SCREEN,
    MENU_SCREEN
}

class Game 
{
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private activeScene:Scene;
 
    constructor() 
    {
        this.canvas = document.getElementsByTagName("canvas")[0];
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.context = this.canvas.getContext('2d');
        
        this.activateScene(E_SCENES.SPLASH_SCREEN);
        
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup"  , (e) => this.onKeyUp(e));
        
        requestAnimationFrame(() => this.update());    
    }
    
    private activateScene(scene:E_SCENES)
    {
        switch(scene)
        {
            case E_SCENES.SPLASH_SCREEN:
                this.activeScene = new SplashScene();
            break;
            case E_SCENES.MENU_SCREEN:
                this.activeScene = new SplashScene();
            break;
        }
    }
    
    private update() : void 
    {
        this.activeScene.update();
        this.draw();
        
        requestAnimationFrame(() => this.update());  
    }
    
    private draw(): void 
    {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.activeScene.draw(this.context);
    }
    
    private onKeyDown(event:KeyboardEvent):void 
    {
        this.activeScene.onKeyDown(event);
    }
    
    private onKeyUp(event:KeyboardEvent):void 
    {
        this.activeScene.onKeyUp(event);
    }
} 