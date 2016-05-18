/// <reference path="battleship.ts" />


class Game {
    
    // private battleship: Battleship;
    private context: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    
    constructor() {
        // dddd
        this.canvas = document.getElementsByTagName("canvas")[0];
        this.context = this.canvas.getContext('2d');
        
        // this.battleship = new Battleship();
        
        requestAnimationFrame(() => this.update());    
    }
    
    private update() : void {
        // this.battleship.move();
        
        this.draw();
    }
    
    private draw(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // this.battleship.draw();
        
        requestAnimationFrame(() => this.update());
    }
} 