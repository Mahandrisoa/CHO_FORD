import { Arc } from "./Arc";

export class Graphe {
    constructor() {
        this.sommets = [];
        this.arcs = [];
        this.chemins = [];
    }

// pattern or factory method
    changeType(type) {
        switch (type) {
            case 'min':
                this.sommets.map(function (sommet, index, sommets) {
                    sommet.lamda = 'M';
                });
                break;
            case 'max':
                this.sommets.map(function (sommet, index, sommets) {
                    sommet.lamda = 0;
                });
                break;
        }
    }

    viderChemins(){
        this.chemins = [];        
    }

    findSommetI(numero) {
        return this.sommets.find((sommet) => {
            return sommet.numero === numero;
        });
    }
    
    dernierSommet() {
        let i = this.sommets.length - 1;
        return this.sommets[i];
    }
    
    premierSommet() {
        return this.sommets[0];
    }

    minimisation() {
        let count = 0;
        let i = 0;
        let length = this.sommets.length;
        while (i < length) {
            for (let j = 0; j < this.sommets[i].suivants.length; j++) {
                let lamdaRes = undefined;
                let vij = this.findArc(this.sommets[i].numero, this.sommets[i].suivants[j].numero).valeur;
                if (this.sommets[i].numero < this.sommets[i].suivants[j].numero) {                     // Vxi,xj
                    if (this.sommets[i].suivants[j].lamda === 'M') {
                        this.sommets[i].suivants[j].lamda = this.sommets[i].lamda + vij;
                    } else {
                        lamdaRes = this.sommets[i].suivants[j].lamda - this.sommets[i].lamda; // lamdaj - lamdai
                        if (lamdaRes > vij) {
                            this.sommets[i].suivants[j].lamda = this.sommets[i].lamda + vij;
                        }
                    }
                } else { // pas de === car cela devra être gérée par l'application elle-même            
                    if (this.sommets[i].suivants[j].lamda === 'M') {
                        this.sommets[i].suivants[j].lamda = this.sommets[i].lamda + vij;
                    } else {
                        lamdaRes = this.sommets[i].suivants[j].lamda - this.sommets[i].lamda; // lamdaj - lamdai
                        if (lamdaRes > vij) {
                            this.sommets[i].suivants[j].lamda = this.sommets[i].lamda + vij;
                            i = this.sommets[i].suivants[j].numero - 2;
                            j = 0;
                        }
                    }
                }
            }
            i++;
        }
        this.chemins = this.cheminOptimale();
    }
    
    maximisation() {
        changeType('max');
        let i = 0;
        while (i < sommets.length) {
            for (let j = 0; j < sommets[i].suivants.length; j++) {
                let lamdaRes = undefined;
                let vij = this.findArc(sommets[i].numero, sommets[i].suivants[j].numero).valeur;
                if (sommets[i].numero < sommets[i].suivants[j].numero) {
                    lamdaRes = sommets[i].suivants[j].lamda - sommets[i].lamda;
                    if (lamdaRes < vij) {
                        sommets[i].suivants[j].lamda = vij + sommets[i].lamda;
                    }
                } else {
                    lamdaRes = sommets[i].suivants[j].lamda - sommets[i].lamda;
                    if (lamdaRes < vij) {
                        sommets[i].suivants[j].lamda = sommets[i].lamda + vij;
                        i = sommets[i].suivants[j].numero - 1;                    
                    }
                }
            }
            i++;
        }
        this.chemins = cheminOptimale();
    }
    
    cheminOptimale() {
        this.viderChemins();
        let chemins = [];
        let s = this.dernierSommet();
        chemins.push(s);        
        while ((s != null) && (s.lamda != 0)) {
            let nb = s.predececeurs.length;
            for (let i = 0; i < nb; i++) {
                let arc = this.findArc(s.predececeurs[i].numero, s.numero);
                let lamdap = arc.valeur + s.predececeurs[i].lamda;
                if (s.lamda === lamdap) {
                    chemins.push(s.predececeurs[i]);
                    break;
                }
            }
            s = chemins[chemins.length - 1];
        }
        return chemins;
    }    
    
    ajouteArc(depart, arrive, valeur) {
        depart.suivants.push(arrive);
        depart.suivants.sort(function (a, b) { // sort suivants
            return a.numero > b.numero;
        });
        arrive.predececeurs.push(depart);
        this.arcs.push(new Arc(depart, arrive, valeur));
    }
    
    findArc(x1, x2) {
        return this.arcs.find(function (arc) {
            return arc.sommetDepart.numero === x1 &&
                arc.sommetArrive.numero === x2;
        });
    }
}