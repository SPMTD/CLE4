enum E_SCENES 
{
    MENU_SCENE,
    LEVEL1_SCENE,
    GAME_OVER_SCENE
}

enum TILED_LAYERS
{
    TILE_LAYER,
    COLLISION_LAYER
}

enum E_COLLIDER_TYPES
{
    GROUND,
    PLAYER,
    PROP,
    TRIGGER
}

enum ColliderDirection
{
    NONE,
    TOP,
    BOTTOM,
    LEFT,
    RIGHT
}

class Game 
{
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private activeScene:Scene;
    public date:Date;
    
    public static width:number = 960;
    public static height:number = 540;
    public static gravity:number = 3;
    public static MS_UPDATE_LAG:number = 33; // 30 fps.
    public static DEBUG:Boolean = false;

    private elapsedTime:number = 0;
    private updateLag:number = 0;
    private currentTime:number;
    private previousTime:number;
    private fpsTimer:number = 0;

    public renderFPS:number = 0;
    private persistentGOs: GameObject[] = [];
    private audio:HTMLAudioElement;

    constructor() 
    {
        this.canvas = document.getElementsByTagName("canvas")[0];
        this.canvas.width = Game.width;
        this.canvas.height = Game.height;
        this.date = new Date();
        this.audio = document.getElementsByTagName("audio")[0];

        this.context = this.canvas.getContext('2d');
        
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup"  , (e) => this.onKeyUp(e));

        this.currentTime = this.date.getTime();
        this.previousTime = this.currentTime;
        console.log(this.currentTime);

        this.persistentGOs.push(new TextObject(new Vector2(10, 20), 50, 50, "FPS: ", 14, new Color(100, 0, 0)));

        this.activateScene(E_SCENES.MENU_SCENE);
        
        requestAnimationFrame(() => this.update());    
    }
    
    public activateScene(scene:E_SCENES)
    {
        this.activeScene = null;
        switch(scene)
        {
            case E_SCENES.MENU_SCENE:
                this.activeScene = new MenuScene(this);
            break;
            case E_SCENES.LEVEL1_SCENE:
                this.activeScene = new Level1Scene(this);
            break;
            case E_SCENES.GAME_OVER_SCENE:
                this.activeScene = new GameOverScene(this);
            break;
        }
    }
    
    private update() : void 
    {
        this.renderFPS++;

        this.currentTime = (new Date).getTime();
        this.elapsedTime = this.currentTime - this.previousTime;

        this.updateLag += this.elapsedTime;

        // Update FPS display each second.
        if((this.currentTime - this.fpsTimer) >= 1000)
        {
            this.fpsTimer = this.currentTime;
            (<TextObject>(this.persistentGOs[0])).text = "FPS: " + this.renderFPS;
            this.renderFPS = 0;
        }

        while(this.updateLag >= Game.MS_UPDATE_LAG)
        {
            this.activeScene.update();

            for(let g of this.persistentGOs)
                g.update();

            this.updateLag -= Game.MS_UPDATE_LAG;
        }

        this.draw();

        this.previousTime = this.currentTime;

        requestAnimationFrame(() => this.update());  
    }
    
    private draw(): void 
    {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.activeScene.draw(this.context);

        for(let g of this.persistentGOs)
            g.draw(this.context);
    }
    
    private onKeyDown(event:KeyboardEvent):void 
    {
        this.activeScene.onKeyDown(event);
    }
    
    private onKeyUp(event:KeyboardEvent):void 
    {
        this.activeScene.onKeyUp(event);
    }

    public static colliderStringToType(str:string) : E_COLLIDER_TYPES
    {
        let type = E_COLLIDER_TYPES.PROP;

        switch(str)
        {
            case "character":
                type = E_COLLIDER_TYPES.PLAYER;
            break;
            case "ground":
                type = E_COLLIDER_TYPES.GROUND;
            break;
            case "prop":
                type = E_COLLIDER_TYPES.PROP;
            break;
            case "trigger":
                type = E_COLLIDER_TYPES.TRIGGER;
            break;
        }

        return type;
    }
} 