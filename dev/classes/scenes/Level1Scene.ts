class Level1Scene extends Scene
{
    private level:LevelLoader;
    private lift:LiftObject;
    private bridge:BridgeObject;
    private gate:BridgeObject;
    private character1Complete:Boolean;
    private character2Complete:Boolean;
    
    public init() : void
    {
        super.init();
        
        this.gameObjects.push(new Knightsalot(new Vector2(64, Game.height - 150), 50, 50, 0.75));
        this.gameObjects.push(new Puss(new Vector2(96, Game.height - 150), 35, 35, 0.75));

        this.lift = new LiftObject(new Vector2(128, 390), 100, 25);
        this.bridge = new BridgeObject(new Vector2(525, 100), 160, 25, 400, 5);
        this.gate = new BridgeObject(new Vector2(Game.width - 25, 300), 25, 200, 450, 5);

        this.gameObjects.push(this.lift);
        this.gameObjects.push(this.bridge);
        this.gameObjects.push(this.gate); // end wall.
        
        // Load level.
        this.level = new LevelLoader();       
        this.level.load(this, "test4", (arr : Array<GameObject>) => 
        {
            for(let i = 0; i < arr.length; i++)
            {
                this.gameObjects.push(arr[i]);
            }
            
            super.processGameObjects();
        });
    }

    public triggerActivated(go:GameObject, name:string) : void
    {
        switch(name)
        {
            case "liftButton":
                this.lift.activate();
            break;
            case "bridgeButton":
                this.bridge.activate();
            break;
            case "gateButton":
                this.gate.activate();
            break;
            case "fail":
                this.game.activateScene(E_SCENES.LEVEL1_SCENE);
            break;
            case "success":
                if(go.name == "Knightsalot")
                    this.character1Complete = true;
                else if(go.name == "Puss")
                    this.character2Complete = true;

                if(this.character1Complete && this.character2Complete)        
                    this.game.activateScene(E_SCENES.GAME_OVER_SCENE);
            break;
        }
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