let canevas;
let contexte;
let matrice;
let compteurCouleur = 0;

const dimensiontuile = 32;
const couleur = ["darkgreen", "forestgreen"];
window.onload = function(){

    canevas = document.getElementById('canevas');
    contexte = canevas.getContext('2d');

    construireMatrice();
    affichermatrice();
}
    
function construireMatrice(){
    console.log('construire');

    matrice = new Array(58);
    for (let i = 0; i < matrice.length; i++)
    {
        matrice[i] = new Array(29);
    }

    for(let x = 0; x < matrice.length; x++){
    for(let y = 0; y < matrice[x].length; y++ ){

        matrice[x][y] = nombreEntre()
    }

    }

   
} 
function affichermatrice(){
    console.log('afficher');
    for(let x = 0; x < matrice.length; x++){
    for(let y = 0; y < matrice[x].length; y++ ){
        contexte.fillStyle = matrice[x][y];
        contexte.fillRect(x * dimensiontuile, y* dimensiontuile, dimensiontuile, dimensiontuile)
        
    }
    }

}


function nombreEntre(){   
    compteurCouleur++;
    if (compteurCouleur==2){
        compteurCouleur=0;
    }

    return couleur[compteurCouleur];
    }
 