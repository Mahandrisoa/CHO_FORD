let _nbSommets = 0;
// pattern or factory method 
class Sommet {
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
}

class Graphe {
    constructor() {
        this.sommets = [];
        this.arcs = [];
    }
}

class Arc {
    constructor(depart, arrive, valeur) {
        this.sommetDepart = depart;
        this.sommetArrive = arrive;
        this.valeur = valeur;
    }
}

function ajouteArc(depart, arrive, valeur) {
    depart.suivants.push(arrive);
    depart.suivants.sort(function (a, b) { // sort suivants
        return a.numero > b.numero;
    });
    arrive.predececeurs.push(depart);
    arcs.push(new Arc(depart, arrive, valeur));
}

function findSommetI(numero) {
    return sommets.find((sommet) => {
        return sommet.numero === numero;
    });
}

function findArc(x1, x2) {
    return arcs.find(function (arc) {
        return arc.sommetDepart.numero === x1 &&
            arc.sommetArrive.numero === x2;
    });
}

function minimalisation() {
    let count = 0;
    let i = 0;
    while (i < sommets.length) {
        for (let j = 0; j < sommets[i].suivants.length; j++) {
            let lamdaRes = undefined;
            let vij = findArc(sommets[i].numero,sommets[i].suivants[j].numero).valeur;
            if (sommets[i].numero < sommets[i].suivants[j].numero) {                     // Vxi,xj
                if (sommets[i].suivants[j].lamda === 'M') {
                    lamdaRes = vij;
                    sommets[i].suivants[j].lamda = sommets[i].lamda + lamdaRes;
                } else {
                    lamdaRes = sommets[i].suivants[j].lamda - sommets[i].lamda; // lamdaj - lamdai
                    if (lamdaRes > vij) {
                        sommets[i].suivants[j].lamda = sommets[i].lamda + vij;
                    }
                }
            } else { // pas de === car cela devra être gérée par l'application elle-même            
                if (sommets[i].suivants[j].lamda === 'M') {
                    lamdaRes = vij;
                    sommets[i].suivants[j].lamda = sommets[i].lamda + lamdaRes;
                } else {
                    lamdaRes = sommets[i].suivants[j].lamda - sommets[i].lamda; // lamdaj - lamdai
                    if (lamdaRes > vij) {
                        sommets[i].suivants[j].lamda = sommets[i].lamda + vij;
                        i = sommets[i].suivants[j].numero -2;
                        j=0;
                    }
                }                
            }             
        }
        i++;
    }
}

function chemin(){
    let chemins = [];
    let s = sommets[sommets.length];
    let done = false;
    chemins.push(s);
    while(s != null){            
        for(let i=0; i< s.predececeurs.length;i++){
            let arc = findArc(s.predececeurs[i].numero, s.numero);
            let lamdap = arc.valeur + s.predececeurs[i].lamda;
            if(s.lamda === lamdap) {
                chemins.push(s.predececeurs[i]);
                break;
            }
        }
        s = s.predececeurs[        
    }
}


// ici i script demarre
let sommets = [];
let arcs = [];

// creation des sommets
for (let i = 0; i < 16; i++) {
    sommets.push(new Sommet());
}

// ajoute les arcs
sommets.map((sommet, index, sommets) => {
    switch (sommet.numero) {
        case 1:
            ajouteArc(sommet, findSommetI(2), 10);
            break;
        case 2:
            ajouteArc(sommet, findSommetI(3), 15);
            ajouteArc(sommet, findSommetI(4), 8);
            break;
        case 3:
            ajouteArc(sommet, findSommetI(6), 1);
            ajouteArc(sommet, findSommetI(11), 16);
            break;
        case 4:
            ajouteArc(sommet, findSommetI(3), 8);
            ajouteArc(sommet, findSommetI(5), 6);
            break;
        case 5:
            ajouteArc(sommet, findSommetI(9), 1);
            break;
        case 6:
            ajouteArc(sommet, findSommetI(5), 5);
            ajouteArc(sommet, findSommetI(7), 4);
            break;
        case 7:
            ajouteArc(sommet, findSommetI(8), 1);
            ajouteArc(sommet, findSommetI(11), 8);
            break;
        case 8:
            ajouteArc(sommet, findSommetI(7), 1);
            ajouteArc(sommet, findSommetI(10), 2);
            break;
        case 9:
            ajouteArc(sommet, findSommetI(8), 3);
            ajouteArc(sommet, findSommetI(10), 4);
            break;
        case 10:
            ajouteArc(sommet, findSommetI(12), 7);
            break;
        case 11:
            ajouteArc(sommet, findSommetI(12), 6);
            ajouteArc(sommet, findSommetI(13), 12);
            break;
        case 12:
            ajouteArc(sommet, findSommetI(15), 9);
            break;
        case 13:
            ajouteArc(sommet, findSommetI(14), 3);
            break;
        case 14:
            ajouteArc(sommet, findSommetI(16), 3);
            break;
        case 15:
            ajouteArc(sommet, findSommetI(16), 6);
            ajouteArc(sommet, findSommetI(14), 5);
            break;
    }
});

minimalisation();
