// Déclaration des variables
let canevas;
let contexte;
let matrice;
let compteurCouleur = 0;

let tableauBerry = [];
// Constantes pour les dimensions des sprites et les distances de déplacement
const dimsprite1 = 48;
const dimsprite2 = 48;
const deplacement = 10;
const deplacement2 = 10;

    // Positions des joueurs
    let posx1;
    let posy1;
    let posx2;
    let posy2;

// Objet pour suivre les touches enfoncées
    let touche = {
         "ArrowUp": false,
         "ArrowDown": false,
         "ArrowLeft": false,
         "ArrowRight": false,
         "w": false,
         "a": false,
         "s": false,
         "d": false
        }

// Constantes pour les dimensions des tuiles et les couleurs
const dimensiontuile = 32;
const couleur = ["pink", "mistyrose"];

    // Chargement de la page
    window.onload = function(){
        // Ajout des écouteurs d'événements pour les touches
        Berry = document.getElementById("BerryImg");
        window.addEventListener("keydown", toucheAppuyee)
        window.addEventListener("keyup", toucheRelachee)

        // Récupération du canevas et de son contexte
        canevas = document.getElementById('canevas');
        contexte = canevas.getContext('2d');
        contexte1 = canevas.getContext('2d');
        contexte2 = canevas.getContext('2d');

        // Construction de la matrice et affichage
        construireMatrice();
        affichermatrice();
        creationBerry();

    //let ImageSprite1 = new Image(images/CuboneSprites/Cubone_Front)
        //contexte1.fillStyle = "blue";

            // Positionnement des joueurs
            posx1 = canevas.width/2 - dimsprite1/2;
            posy1 = canevas.height/2 - dimsprite1/2;

            posx2 = canevas.width/2 - dimsprite2/2;
            posy2 = canevas.height/2 - dimsprite2/2;

            // Démarrage de la boucle de jeu
            window.requestAnimationFrame(boucleJeu);  // le navigateur appellera boucleJeu() au bon moment
    }
    
    // Fonction pour construire la matrice
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

    // Fonction pour afficher la matrice
    function affichermatrice() {
        for (let x = 0; x < matrice.length; x++) {
            for (let y = 0; y < matrice[x].length; y++) {
                contexte.fillStyle = matrice[x][y];
                contexte.fillRect(x * dimensiontuile, y * dimensiontuile, dimensiontuile, dimensiontuile);
            }
        }
    }
    
    // Fonction pour obtenir une couleur entre "darkgreen" et "forestgreen"
    function nombreEntre(){   
        compteurCouleur++;
        if (compteurCouleur==2){
            compteurCouleur=0;
        }

        return couleur[compteurCouleur];
    }

    // Fonction pour la boucle de jeu
    function boucleJeu(timeStamp) {
        calculerPosition1();
        calculerPosition2();
        affichage();  // Appel de la fonction principale d'affichage
        window.requestAnimationFrame(boucleJeu);
    }
    
    // Fonction pour l'affichage
    function affichage() {
        contexte.clearRect(0, 0, canevas.width, canevas.height);  // Effacer tout le canevas
    
        affichermatrice(); // Dessiner l'arrière-plan des tuiles
    
        // Rendre le joueur 1 (bleu)
        contexte.fillStyle = "blue";
        contexte.fillRect(posx1, posy1, dimsprite1, dimsprite1);

        // Rendre le joueur 2 (rouge)
        contexte.fillStyle = "red";
        contexte.fillRect(posx2, posy2, dimsprite2, dimsprite2);
        for(let i =0; i < tableauBerry.length; i++){         
            //contexte.fillStyle = "purple";
            //contexte.fillRect(tableauBerry[i].x, tableauBerry[i].y, 25, 25);
            const Berry = document.getElementById('BerryImg'); 
            contexte.drawImage(Berry, tableauBerry[i].x, tableauBerry[i].y);         
        }
    }
    // Fonction appelée lorsqu'une touche est enfoncée

    function creationBerry(){     
        for (let i =0; i < 15; i++){
            posX = Math.floor(Math.random() * canevas.width) + 1;
            posY = Math.floor(Math.random() * canevas.height) + 1;
            tableauBerry.push({x: posX, y: posY});
        }   
    }

    function toucheAppuyee(evenement){
        console.log("Key pressed:", evenement.key);
        if((evenement.key === "ArrowUp") || (evenement.key === "ArrowDown") || (evenement.key === "ArrowLeft") || (evenement.key === "ArrowRight") || (evenement.key === "w") || (evenement.key === "a") || (evenement.key === "s") || (evenement.key === "d")){
            touche[evenement.key] = true;

            console.log("Key pressed:", evenement.key);
        }
    }
    
    // Fonction appelée lorsqu'une touche est relâchée
    function toucheRelachee(evenement){
        console.log("Key released:", evenement.key);
        if((evenement.key === "ArrowUp") || (evenement.key === "ArrowDown") || (evenement.key === "ArrowLeft") || (evenement.key === "ArrowRight")  || (evenement.key === "w") || (evenement.key === "a") || (evenement.key === "s") || (evenement.key === "d")){
            touche[evenement.key] = false;

            console.log("Key released:", evenement.key);
        }
    }    

    // Fonction pour calculer la position du joueur 1
    function calculerPosition1(){
   
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

       // Limites pour éviter que le joueur 1 sorte du canevas
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

    // Fonction pour calculer la position du joueur 2
    function calculerPosition2() {

        
        if (touche["w"]) {
            posy2 -= deplacement2;
        }
        if (touche["a"]) {
            posx2 -= deplacement2;  
        }
        if (touche["s"]) {
            posy2 += deplacement2;
        }
        if (touche["d"]) {
            posx2 += deplacement2;  
        }
    
        if (posx2 < 0) {
            posx2 = 0;
        }
    
        if (posx2 > canevas.width - dimsprite2) {
            posx2 = canevas.width - dimsprite2;
        }
    
        if (posy2 > canevas.height - dimsprite2) {
            posy2 = canevas.height - dimsprite2;
        }
    
        if (posy2 < 0) {
            posy2 = 0;
        }

    }
    
    


