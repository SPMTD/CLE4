class Trigger extends GameObject
{
    public triggerName:string;
    private scene:Scene;

    constructor(position:Vector2, width:number, height:number, name:string, scene:Scene)
    {
        super(position, width, height, false, true, false, false, E_COLLIDER_TYPES.TRIGGER);

        this.triggerName = name;
        this.scene = scene;
    }

    public activate(go:GameObject)
    {
        this.scene.triggerActivated(go, this.triggerName);
    }
}