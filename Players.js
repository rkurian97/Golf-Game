class Players{
    constructor(x){
        this._name=x;
        this._wins=0;
        this._losses=0;
        this._stroke=0;
    }

    get name(){
        return this._name;
    }
    set name(x){
        this._name=x;
    }

    get wins(){
        return this._wins;
    }
    set wins(x){
        this._wins=x;
    }

    get losses(){
        return this._losses;
    }
    set losses(x){
        this._losses=x;
    }

    get strokes(){
        return this._stroke;
    }
    set strokes(x){
        this._strokes=x;
    }

    win(){
        this._wins++;

    }
    lose(){
        this._losses++;
    }
}

