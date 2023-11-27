let canevas;
let contexte;

const dimensiontuile = 32;
const couleur = ["darkgreen", "forestgren"];
window.onload = function(){

    canevas = document.getElementById('canevas');
    contexte = canevas.getContext('2d');

    construireMatrice()
    affichermatrice()
}
    
function construireMatrice(){


    let matrice = new Array(58);
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

    for(let x = 0; x < matrice.length; x++){
    for(let y = 0; y < matrice[x].length; y++ ){
        contexte.fillStyle = couleur[matrice[x][y]]
        contexte.fillRect(x * dimensiontuile, y* dimensiontuile, dimensiontuile, dimensiontuile)
        
    }
    }

}


function nombreEntre(){
    couleur ++
    if (couleur==2){
        couleur=0
    }
    }
 