let _nbSommets = 0;
export class Sommet{
    static get nombre() {
        return _nbSommets;
    }
    constructor() {
        _nbSommets++;
        this.numero = _nbSommets;
        if (_nbSommets === 1) {
            this.lamda = 0;
        } else {
            this.lamda = 'M';
        }
        this.suivants = [];
        this.predececeurs = [];
    }
};

