let canevas;
let contexte;
let matrice;
let compteurCouleur = 0;

const dimsprite1 = 48;
const dimsprite2 = 48;
const deplacement = 10;
    let posx1;
    let posy1;
    let posx2;
    let posy2;
    let touche = {
         "ArrowUp": false,
         "ArrowDown": false,
         "ArrowLeft": false,
         "ArrowRight": false,
         "W": false,
         "A": false,
         "S": false,
         "D": false
        }

const dimensiontuile = 32;
const couleur = ["darkgreen", "forestgreen"];







    window.onload = function(){
        window.addEventListener("keydown", toucheAppuyee)
        window.addEventListener("keyup", toucheRelachee)

        canevas = document.getElementById('canevas');
        contexte = canevas.getContext('2d');

        construireMatrice();
        affichermatrice();

    //let ImageSprite1 = new Image(images/CuboneSprites/Cubone_Front)
        contexte.fillStyle = "blue";
            posx1 = canevas.width/2 - dimsprite1/2;
            posy1 = canevas.height/2 - dimsprite1/2;

            window.requestAnimationFrame(boucleJeu);  // le navigateur appellera boucleJeu() au bon moment
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

    /*
    function affichermatrice(){
        console.log('afficher');
        for(let x = 0; x < matrice.length; x++){
        for(let y = 0; y < matrice[x].length; y++ ){
            contexte.fillStyle = matrice[x][y];
            contexte.fillRect(x * dimensiontuile, y* dimensiontuile, dimensiontuile, dimensiontuile)
            
        }
        }

    }*/

    function affichermatrice() {
        for (let x = 0; x < matrice.length; x++) {
            for (let y = 0; y < matrice[x].length; y++) {
                contexte.fillStyle = matrice[x][y];
                contexte.fillRect(x * dimensiontuile, y * dimensiontuile, dimensiontuile, dimensiontuile);
            }
        }
    }
    

    function affichage() {
        contexte.clearRect(0, 0, canevas.width, canevas.height);  // Clear the entire canvas
        affichermatrice();  // Draw the tile background
        contexte.fillRect(posx1, posy1, dimsprite1, dimsprite1);
        contexte.fillRect(posx2, posy2, dimsprite2, dimsprite2);
    }



    function nombreEntre(){   
        compteurCouleur++;
        if (compteurCouleur==2){
            compteurCouleur=0;
        }

        return couleur[compteurCouleur];
        }
 
    


   

   
    /*
    function boucleJeu(timeStamp){
        calculerPosition();
        
       affichage();

        window.requestAnimationFrame(boucleJeu);  // le navigateur appellera boucleJeu() au bon moment
        
        
    }

    function affichage(){

     contexte.clearRect(0, 0 ,1000, 500);
     
     contexte.fillRect(posx1, posy1, dimsprite1, dimsprite1) 



    } */

    function boucleJeu(timeStamp) {
        calculerPosition();
        affichage();  // Call the main affichage function first
        window.requestAnimationFrame(boucleJeu);
    }
    
    function affichage() {
        contexte.clearRect(0, 0, canevas.width, canevas.height);  // Clear the entire canvas
        affichermatrice();  // Draw the tile background
        contexte.fillRect(posx1, posy1, dimsprite1, dimsprite1);
        contexte.fillRect(posx2, posy2, dimsprite2, dimsprite2);
    }

    function toucheAppuyee(evenement){
        if((evenement.key === "ArrowUp") || (evenement.key === "ArrowDown") || (evenement.key === "ArrowLeft") || (evenement.key === "ArrowRight")){
touche[evenement.key] = true;
        }
    }

    function toucheRelachee(evenement){
        if((evenement.key === "ArrowUp") || (evenement.key === "ArrowDown") || (evenement.key === "ArrowLeft") || (evenement.key === "ArrowRight")){
touche[evenement.key] = false;
        }
    }

    function calculerPosition(){
   
       if(touche["ArrowUp"]){
        posy1 -= deplacement;
       }
       if(touche["ArrowDown"]){
        posy1 += deplacement;
       }
       if(touche["ArrowRight"]){
        posx1 += deplacement;
       }
       if(touche["ArrowLeft"]){
        posx1 -= deplacement;
       }

       if(posx1 < 0)
       {
        posx1 = 0

       }

       if(posx1 > canevas.width - dimsprite1)
       {
        posx1 = canevas.width - dimsprite1
       }

       if(posy1 > (canevas.height - dimsprite1) )
       {
        posy1 = canevas.height - dimsprite1
       }

       if(posy1 < 0 )
       {
        posy1 = 0
       }

    }
    


