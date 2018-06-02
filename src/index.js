import _ from 'lodash';
import { Graphe } from "./components/Graphe";
import { Sommet } from "./components/Sommet";

// ici i script demarre

// ajoute les arcs
function main(){    
    let graphe = new Graphe();    

    for (let i = 0; i < 16; i++) {
        graphe.sommets.push(new Sommet());
    }
    
    // creation des sommets
    graphe.sommets.map((sommet, index, sommets) => {
        switch (sommet.numero) {
            case 1:
                graphe.ajouteArc(sommet, graphe.findSommetI(2), 10);
                break;
            case 2:
            graphe.ajouteArc(sommet, graphe.findSommetI(3), 15);
            graphe.ajouteArc(sommet, graphe.findSommetI(4), 8);
                break;
            case 3:
            graphe.ajouteArc(sommet, graphe.findSommetI(6), 1);
            graphe.ajouteArc(sommet, graphe.findSommetI(11), 16);
                break;
            case 4:
            graphe.ajouteArc(sommet, graphe.findSommetI(3), 8);
            graphe.ajouteArc(sommet, graphe.findSommetI(5), 6);
                break;
            case 5:
            graphe.ajouteArc(sommet, graphe.findSommetI(9), 1);
                break;
            case 6:
            graphe.ajouteArc(sommet, graphe.findSommetI(5), 5);
            graphe.ajouteArc(sommet, graphe.findSommetI(7), 4);
                break;
            case 7:
            graphe.ajouteArc(sommet, graphe.findSommetI(8), 1);
                graphe.ajouteArc(sommet, graphe.findSommetI(11), 8);
                break;
            case 8:
            graphe.ajouteArc(sommet, graphe.findSommetI(7), 1);
            graphe.ajouteArc(sommet, graphe.findSommetI(10), 2);
                break;
            case 9:
            graphe.ajouteArc(sommet, graphe.findSommetI(8), 3);
            graphe.ajouteArc(sommet, graphe.findSommetI(10), 4);
                break;
            case 10:
            graphe.ajouteArc(sommet, graphe.findSommetI(12), 7);
                break;
            case 11:
            graphe.ajouteArc(sommet, graphe.findSommetI(12), 6);
            graphe.ajouteArc(sommet, graphe.findSommetI(13), 12);
                break;
            case 12:
            graphe.ajouteArc(sommet, graphe.findSommetI(15), 9);
                break;
            case 13:
            graphe.ajouteArc(sommet, graphe.findSommetI(14), 3);
                break;
            case 14:
            graphe.ajouteArc(sommet, graphe.findSommetI(16), 3);
                break;
            case 15:
            graphe.ajouteArc(sommet, graphe.findSommetI(16), 6);
            graphe.ajouteArc(sommet, graphe.findSommetI(14), 5);
                break;
        }
    });
    graphe.minimisation();    
    console.log(graphe);

}

main();