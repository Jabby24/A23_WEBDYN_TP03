// Déclaration des variables
let canevas;
let contexte;
let matrice;
let compteurCouleur = 0;

let pointageJoueur1 = 0;
let pointageJoueur2 = 0;

let activation = true;

let tableauBerry = [];


// Constantes pour les dimensions des sprites et les distances de déplacement
const dimsprite1 = 48;
const dimsprite2 = 48;
const deplacement = 10;
const deplacement2 = 10;

// Images de direction joueur1
const joueur1ImagesUrl = {
    up: "./images/CuboneSprites/Cubone_Back.png",
    down: "./images/CuboneSprites/Cubone_Front.png",
    left: "./images/CuboneSprites/Cubone_Left.png",
    right: "./images/CuboneSprites/Cubone_Right.png",
};

// Images de direction joueur2
const joueur2ImagesUrl = {
    up: "./images/SlowpokeSprites/Slowpoke_Back.png",
    down: "./images/SlowpokeSprites/Slowpoke_Front.png",
    left: "./images/SlowpokeSprites/Slowpoke_Left.png",
    right: "./images/SlowpokeSprites/Slowpoke_Right.png",
};

//cherche les urls des images du joueur1 dependemment de sa direction
const joueur1Images = {};
for (const direction in joueur1ImagesUrl) {
    joueur1Images[direction] = new Image();
    joueur1Images[direction].src = joueur1ImagesUrl[direction];
}

//cherche les urls des images du joueur2 dependemment de sa direction
const joueur2Images = {};
for (const direction in joueur2ImagesUrl) {
    joueur2Images[direction] = new Image();
    joueur2Images[direction].src = joueur2ImagesUrl[direction];
}

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
         "d": false,
         " ": false,
         "1": false
        }

// Constantes pour les dimensions des tuiles et les couleurs
const dimensiontuile = 40;
const couleur = ["pink", "mistyrose"];

    // Chargement de la page
    window.onload = function(){
        // Ajout des écouteurs d'événements pour les touches
        Berry = document.getElementById("BerryImg");

        AffichageJoueur1 = document.getElementById("Score1");
        AffichageJoueur2 = document.getElementById("Score2");

        AffichageJoueur1.innerHTML = pointageJoueur1;
        AffichageJoueur2.innerHTML = pointageJoueur2;

        window.addEventListener("keydown", toucheAppuyee)
        window.addEventListener("keyup", toucheRelachee)

        // Récupération du canevas et de son contexte
        canevas = document.getElementById('canevas');
        canevas.width = window.innerWidth;
        canevas.height = window.innerHeight;
        contexte = canevas.getContext('2d');
        contexte1 = canevas.getContext('2d');
        contexte2 = canevas.getContext('2d');

        // Construction de la matrice et affichage
        construireMatrice();
        affichermatrice();
        creationBerry();

        pickup = new Audio ("audio/pickup.wav");
        fin = new Audio ("audio/fin.wav");


        

    //let ImageSprite1 = new Image(images/CuboneSprites/Cubone_Front)
        //contexte1.fillStyle = "blue";

            // Positionnement des joueurs
            posx1 = canevas.width/2 - dimsprite1/2 - 50;
            posy1 = canevas.height/2 - dimsprite1/2;

            posx2 = canevas.width/2 - dimsprite2/2 + 50;
            posy2 = canevas.height/2 - dimsprite2/2;

            // Démarrage de la boucle de jeu
            window.requestAnimationFrame(boucleJeu);  // le navigateur appellera boucleJeu() au bon moment
    }
    
    // Fonction pour construire la matrice
    function construireMatrice(){
        console.log('construire');

        matrice = new Array(Math.ceil(canevas.width/dimensiontuile));
        for (let i = 0; i < matrice.length; i++)
        {
            matrice[i] = new Array(Math.ceil(canevas.height/dimensiontuile));
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
        rectanglesCollisionJoueur1();
        rectanglesCollisionJoueur2();
        affichage();  // Appel de la fonction principale d'affichage
        window.requestAnimationFrame(boucleJeu);
        
    }
    
    // Fonction pour l'affichage
    function affichage() {
        contexte.clearRect(0, 0, canevas.width, canevas.height);  // Effacer tout le canevas
    
        affichermatrice(); // Dessiner l'arrière-plan des tuiles
        
        if (touche["ArrowUp"]) {
            contexte.drawImage(joueur2Images.up, posx2, posy2, dimsprite2, dimsprite2);
        } else if (touche["ArrowDown"]) {
            contexte.drawImage(joueur2Images.down, posx2, posy2, dimsprite2, dimsprite2);
        } else if (touche["ArrowLeft"]) {
            contexte.drawImage(joueur2Images.left, posx2, posy2, dimsprite2, dimsprite2);
        } else if (touche["ArrowRight"]) {
            contexte.drawImage(joueur2Images.right, posx2, posy2, dimsprite2, dimsprite2);
        } else {
            // Default image when no arrow key is pressed
            contexte.drawImage(joueur2Images.down, posx2, posy2, dimsprite2, dimsprite2);
        }
    
        // Draw player 2 based on pressed keys
        if (touche["w"]) {
            contexte.drawImage(joueur1Images.up, posx1, posy1, dimsprite1, dimsprite1);
        } else if (touche["s"]) {
            contexte.drawImage(joueur1Images.down, posx1, posy1, dimsprite1, dimsprite1);
        } else if (touche["a"]) {
            contexte.drawImage(joueur1Images.left, posx1, posy1, dimsprite1, dimsprite1);
        } else if (touche["d"]) {
            contexte.drawImage(joueur1Images.right, posx1, posy1, dimsprite1, dimsprite1);
        } else {
            // Default image when no arrow key is pressed
            contexte.drawImage(joueur1Images.down, posx1, posy1, dimsprite1, dimsprite1);
        }

        // Rendre le joueur 1 (bleu)
        /*contexte.fillStyle = "blue";
        contexte.fillRect(posx1, posy1, dimsprite1, dimsprite1);

        // Rendre le joueur 2 (rouge)
        contexte.fillStyle = "red";
        contexte.fillRect(posx2, posy2, dimsprite2, dimsprite2);*/

        for(let i =0; i < tableauBerry.length; i++){         
       
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
        if ((evenement.key === " ")){
            touche[" "] = true;
            console.log(touche[" "]);
            console.log("space!!");
        }
        if ((evenement.key === "1")){
            touche["1"] = true;
            console.log(touche["1"]);
            console.log("1!!");
        }
        if (touche[" "] && touche["1"]){
            
            commencerJeu();
            console.log("appel commencer jeu")
            activation = false;
            

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

    function commencerJeu(){     
            console.log('Start!!');
            const debutText = document.getElementById("messageDebutPartie");
            debutText.style.display = "none";
            if(activation === true){
             bgm = new Audio ("audio/BGM.mp3");
            bgm.play();   
            }
            
    }



    // Fonction pour calculer la position du joueur 1
    function calculerPosition1(){
        if (touche[" "] && touche["1"]){
            if(touche["ArrowUp"]){
                posy2 -= deplacement2;
            }
            if(touche["ArrowDown"]){
                posy2 += deplacement2;
            }
            if(touche["ArrowRight"]){
                posx2 += deplacement2;
            }
            if(touche["ArrowLeft"]){
                posx2 -= deplacement2;
            }

            if(posx2 < 0)
            {
             posx2 = 0
     
            }
            
            // Limites pour éviter que le joueur 1 sorte du canevas
            if(posx2 > canevas.width - dimsprite2)
            {
             posx2 = canevas.width - dimsprite2
            }
     
            if(posy2 > (canevas.height - dimsprite2) )
            {
             posy2 = canevas.height - dimsprite2
            }
     
            if(posy2 < 0 )
            {
             posy2 = 0
            }
        }
    }

    // Fonction pour calculer la position du joueur 2
    function calculerPosition2() {
        if (touche[" "] && touche["1"]){
            if (touche["w"]) {
                posy1 -= deplacement;
            }
            if (touche["a"]) {
                posx1 -= deplacement;  
            }
            if (touche["s"]) {
                posy1 += deplacement;
            }
            if (touche["d"]) {
                posx1 += deplacement;  
            }
        
            if (posx1 < 0) {
                posx1 = 0;
            }
        
            if (posx1 > canevas.width - dimsprite1) {
                posx1 = canevas.width - dimsprite1;
            }
        
            if (posy1 > canevas.height - dimsprite1) {
                posy1 = canevas.height - dimsprite1;
            }
        
            if (posy1 < 0) {
                posy1 = 0;
            }
    
        }       
    }

    function rectanglesCollisionJoueur1() {
        let C = {x: posx1, y:posy1}
        let D = {x: posx1 + dimsprite1, y:posy1 + dimsprite1}

        for(let i =0; i < tableauBerry.length; i++ ){
        let A = {x: tableauBerry[i].x, y:tableauBerry[i].y };
        let B = {x: tableauBerry[i].x + Berry.width, y:tableauBerry[i].y + Berry.height};
        

        if (rectanglesCollision(A, B, C, D)){
            tableauBerry.splice(i, 1);
            pointageJoueur1++
            AffichageJoueur1.innerHTML = pointageJoueur1;
            if(tableauBerry.length <= 1){
                fin.play();
                console.log("fin");
                }
                else{
                  pickup.play()  
                  console.log("pickup");
                }
            
            console.log(pointageJoueur1);
        }
       }
    }

    function rectanglesCollisionJoueur2() {
        let C = {x: posx2, y:posy2}
        let D = {x: posx2 + dimsprite2, y:posy2 + dimsprite2}

        for(let i =0; i < tableauBerry.length; i++ ){
        let A = {x: tableauBerry[i].x, y:tableauBerry[i].y };
        let B = {x: tableauBerry[i].x + Berry.width, y:tableauBerry[i].y + Berry.height};
        

        if (rectanglesCollision(A, B, C, D)){
            tableauBerry.splice(i, 1);
            pointageJoueur2++
            AffichageJoueur2.innerHTML = pointageJoueur2;
            if(tableauBerry.length <= 1){
                fin.play();
                console.log("fin");
                }
                else{
                  pickup.play()  
                  console.log("pickup");
                }
        }
       }
    }
    
    function rectanglesCollision(A, B, C, D) {
        if (A.x >= D.x || C.x >= B.x){
            return false;
        } 
        if (A.y >= D.y || C.y >= B.y) {
            return false;
        }
        return true;
    }


