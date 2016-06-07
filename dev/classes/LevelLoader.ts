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

    public load(name:string, cb : (arr:Array<GameObject>) => any)
    {
        console.log("Loading: " + name);
        let goList = [];
        
        $.getJSON(this.path + name + ".json", (data: any, textStatus: string, jqXHR: JQueryXHR) => 
        {
            let layer = TILED_LAYERS.TILE_LAYER;

            this.level = data.layers[layer].data;
            this.rowLength = data.layers[layer].width;
            this.tileWidth = data.tilesets[layer].tilewidth;
            this.tileHeight = data.tilesets[layer].tileheight;
            this.tilesetColomns = data.tilesets[layer].columns + 1;
            this.tilesetWidth = data.tilesets[layer].imagewidth;
            
            this.tileSet = new Image(data.tilesets[layer].imageWidth, data.tilesets[layer].imageHeight);
            this.tileSet.src = 'images/tileset.png';
            
            this.levelToDraw = true;
            
            for(let i = 0; i < this.level.length; i++)
            {                   
                if(this.level[i] != 0)
                {                   
                    let indice = this.level[i] - 1;

                    goList.push(new Tile(new Vector2((i % this.tilesetColomns) * this.tileWidth, 
                    Math.floor(i / this.tilesetColomns) * this.tileHeight), 
                    this.tileWidth, 
                    this.tileHeight, 
                    this.tileSet,
                    (indice % (this.tilesetWidth / this.tileWidth)) * this.tileWidth, Math.floor(indice / (this.tilesetWidth / this.tileHeight)) * this.tileHeight));
                } 
            }
            
            layer = TILED_LAYERS.COLLISION_LAYER;
            
            let collisionData = data.layers[layer].objects;

            for(let i = 0; i < collisionData.length; i++)
            {
                goList.push(new GameObject(new Vector2(collisionData[i].x, collisionData[i].y), collisionData[i].width, collisionData[i].height, false, true, false, Game.colliderStringToType(collisionData[i].type)));
            }
                   
            console.log(name + " loaded");
            cb(goList);
        });
        
    }
}