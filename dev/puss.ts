/**
 * Puss
 */

class puss {
    
    private directionX: number = 0;
    private directionY: number = 0;

    private x: number = 0;
    private y: number = 0;
    
    private speed: number = 0;
    
    private context: CanvasRenderingContext2D;
    private image: HTMLImageElement;


    constructor() {
        this.createCanvasElement();
        
        this.directionX     = 0;
        this.directionY     = 0;
        this.speed          = 3;
        this.animationSpeed = 10;
        
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup"  , (e) => this.onKeyUp(e));
    }
}