var caminho,imgCaminho;
var jogador1,jogador2,jogador3,jogador4;
var img1CiclistaPrincipal,img2CiclistaPrincipal;

var opRosaimg1,opRosaimg2;
var opAmareloimg1,opAmareloimg2;
var opVermelhoimg1,opVermelhoimg2;
var imgFimJogo,sinoBicicleta;

var CGRosa, CGAmarelo,CGVermelho; 

var ENCERRAMENTO =0;
var JOGAR =1;
var estadoJogo = JOGAR;

var distancia=0;
var fimdeJogo, recomecar;



function preload(){
  imgCaminho = loadImage("images/Road.png");
  
  img1CiclistaPrincipal = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  
  img2CiclistaPrincipal= loadAnimation("images/mainPlayer3.png");
  
  opRosaimg1 = loadAnimation("images/opponent1.png","images/opponent2.png");
  
  opRosaimg2 = loadAnimation("images/opponent3.png");
  
  opAmareloimg1 = loadAnimation("images/opponent4.png","images/opponent5.png");
  
  opAmareloimg2 = loadAnimation("images/opponent6.png");
  
  opVermelhoimg1 = loadAnimation("images/opponent7.png","images/opponent8.png");
  
  opVermelhoimg2 = loadAnimation("images/opponent9.png");
  
  sinoBicicleta = loadSound("sound/bell.mp3");
  
  imgFimJogo = loadImage("images/gameOver.png");
}

function setup(){
createCanvas(1200,300);
  caminho = createSprite(600,150,300,75)
  caminho.addAnimation("chão",imgCaminho)
  if(caminho.x <0){
  caminho.x = caminho.width/2;
} 

 jogador1= createSprite (50,100);
 jogador1.addAnimation("correndo",img1CiclistaPrincipal);
 jogador1.addAnimation("colidiu",img2CiclistaPrincipal); 

 jogador1.scale = 0.07;
  jogador1.debug = false;
  jogador1.setCollider("circle",0,0,300)

  
  CGAmarelo = new Group();
  CGRosa = new Group();
  CGVermelho = new Group();
  
  fimdejogo=createSprite(600,150);
  fimdejogo.addAnimation("fimdejogo",imgFimJogo);
  fimdejogo.scale = 0.5;
  fimdejogo.visible = false;

  /*
  recomecar=createSprite(600,160);
  recomecar.addAnimation("reiniciar",imgreiniciar);
  recomecar.scale = 0.5;
  */
  meninaR(); 
  meninaA();
  meninoV();
  
  jogador2.debug = false;
  jogador2.setCollider("circle",0,0,300)
  
  jogador3.debug = false;
  jogador3.setCollider("circle",0,0,300)
  
  jogador4.debug = false;
  jogador4.setCollider("circle",0,0,300)
  
 
}

function draw() {background(0);

                 

                 
if(CGRosa.isTouching(jogador1)){
  estadoJogo = ENCERRAMENTO
  
  jogador1.changeAnimation("colidiu",img2CiclistaPrincipal);
 jogador2.changeAnimation ("colidiu",opRosaimg2); 
} 
                 
                 
if(CGAmarelo.isTouching(jogador1)){
  estadoJogo = ENCERRAMENTO
  jogador1.changeAnimation("colidiu",img2CiclistaPrincipal);
  jogador3.changeAnimation("colidiu",opAmareloimg2); 
  
} 
                 
                 
if(CGVermelho.isTouching(jogador1)){
  estadoJogo = ENCERRAMENTO
  jogador1.changeAnimation("colidiu",img2CiclistaPrincipal);
  jogador4.changeAnimation("colidiu",opVermelhoimg2); 

  
}   
                 
                 
  if(estadoJogo == JOGAR) {  imgFimJogo.visible = false;

  
    
distancia = distancia + 1                             
jogador1.y = World.mouseY;       
caminho.velocityX = -6 
    
if(caminho.x <0){
  caminho.x = caminho.width/2;
}             
if(jogador2.x <0){
  meninaR(); 
}
if(jogador3.x <0){
  meninaA(); 
}
if(jogador4.x <0){
  meninoV(); 
                 }
 text("distancia: "+distancia,1100,30);    
 caminho.velocityX = -(7 + distancia / 100)
 distancia = distancia + 1
 if(distancia> 0 && distancia % 90 ==0){
      sinoBicicleta.play();
    }
  
  }               
   
  if(estadoJogo == ENCERRAMENTO) {
    caminho.velocityX = 0;
    jogador2.velocityX = 0;
    jogador3.velocityX = 0;
    jogador4.velocityX = 0;
  
    fimdejogo.visible = true;             
    distancia = distancia + 0
    
  if(mousePressedOver(fimdejogo)){
     restart();
    }
  } 
  
                 
                 
  drawSprites();
           
text("distancia: "+distancia,1100,30);

}

function meninaR(){
 jogador2= createSprite (1200,50);
 jogador2.addAnimation("correndo",opRosaimg1);
 jogador2.addAnimation("colidiu",opRosaimg2); 
 jogador2.y = Math.round(random(10,280)); 
  
 jogador2.scale = 0.06;
 jogador2.velocityX = -6
 CGRosa.add(jogador2)
 jogador2.velocityX = -(6 + distancia / 100)


}

function meninaA(){
 jogador3= createSprite (1200,177);
 jogador3.addAnimation("correndo",opAmareloimg1);
 jogador3.addAnimation("colidiu",opAmareloimg2); 
 jogador3.y = Math.round(random(10,260)); 

 jogador3.scale = 0.07;
 jogador3.velocityX = -10 
 CGAmarelo.add(jogador3)
 jogador3.velocityX = -(10 + distancia / 400)
  
}

function meninoV(){
 jogador4= createSprite (1200,177);
 jogador4.addAnimation("correndo",opVermelhoimg1);
 jogador4.addAnimation("colidiu",opVermelhoimg2); 
 jogador4.y = Math.round(random(30,280)); 
  
 jogador4.scale = 0.07;
 jogador4.velocityX = -8 
 CGVermelho.add(jogador4)
 jogador4.velocityX = -(8 + distancia / 500)


}

function restart(){
 

  
  fimdejogo.visible = false;
  estadoJogo = JOGAR;
  

  
  CGVermelho.destroyEach()
  CGAmarelo.destroyEach()
  CGRosa.destroyEach()
  
  meninaR(); 
  meninaA();
  meninoV();
  
  jogador1.changeAnimation("correndo",img1CiclistaPrincipal); 
  distancia = 0;
}
