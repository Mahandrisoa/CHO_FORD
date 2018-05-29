class Sommet {        

    static get nombre() {
        return _nbSommets;
    }
    constructor(numero = undefined, lamda){
        this.numero = numero;
        this.lamda  = lamda;
        this.suivants = [];
        _nbSommets++;
    }    
}

export {Sommet as Sommet}