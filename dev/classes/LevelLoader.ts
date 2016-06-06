class LevelLoader
{
    private path:string = 'levels/';
    public level = Array();
        
    private rowLength:number = 0;
    private tileSet:HTMLImageElement;
    private tileWidth:number;
    private tileHeight:number;
    private tilesetColomns:number;
    private tilesetWidth:number;
    private levelToDraw:boolean = false;

    public load(name:string) : void
    {
        console.log("Loading: " + name);
        
        $.getJSON("http://localhost/school/CLE4/Project/dist/" + this.path + name + ".json", (data: any, textStatus: string, jqXHR: JQueryXHR) => 
        {
            console.log(name + " loaded");
            this.level = data.layers[0].data;
            this.rowLength = data.layers[0].width;
            this.tileWidth = data.tilesets[0].tilewidth;
            this.tileHeight = data.tilesets[0].tileheight;
            this.tilesetColomns = data.tilesets[0].columns + 1;
            this.tilesetWidth = data.tilesets[0].imagewidth;
            
            this.tileSet = new Image(data.tilesets[0].imageWidth, data.tilesets[0].imageHeight);
            this.tileSet.src = 'images/tileset.png';
            
            this.levelToDraw = true;
            
            /*for(let i = 0; i < this.level.length; i++)
            {                   
                if(this.level[i] != 0)
                {                    
                    let indice = this.level[i] - 1;
                        
                    ctx.drawImage(this.tileSet, 
                        (indice % (this.tilesetWidth / this.tileWidth)) * this.tileWidth, 
                        Math.floor(indice / (this.tilesetWidth / this.tileHeight)) * this.tileHeight, 
                        this.tileWidth, 
                        this.tileHeight, 
                        (i % this.tilesetColomns) * this.tileWidth, 
                        Math.floor(i / this.tilesetColomns) * this.tileHeight, 
                        this.tileWidth, 
                        this.tileHeight);
                } 
            }*/
        });
    }
    
    public draw(ctx:CanvasRenderingContext2D) : void
    {
        if(this.levelToDraw)
        {
            ctx.fillStyle = "#000000";
            
            for(let i = 0; i < this.level.length; i++)
            {                   
                if(this.level[i] != 0)
                {                    
                    let indice = this.level[i] - 1;
                        
                    ctx.drawImage(this.tileSet, 
                        (indice % (this.tilesetWidth / this.tileWidth)) * this.tileWidth, 
                        Math.floor(indice / (this.tilesetWidth / this.tileHeight)) * this.tileHeight, 
                        this.tileWidth, 
                        this.tileHeight, 
                        (i % this.tilesetColomns) * this.tileWidth, 
                        Math.floor(i / this.tilesetColomns) * this.tileHeight, 
                        this.tileWidth, 
                        this.tileHeight);
                } 
            }
        }
    }
    
    public drawTile(x,y) : void
    {

    }
}