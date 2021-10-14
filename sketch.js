var starImg,bgImg;
var star, starBody;
var fairy,hadaimg,fairyVoice;
var osoimg,oso2;
var tesoro, tesoroimg;
var fondo, fondo1,fondo2,fondo3;
var colmena,c1,colmena2;
var cBody,c2Body;
var texto,t1,t2,t3;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;


function preload()
{
	starImg = loadImage("images/estrella.png");
	bgImg = loadImage("images/starNight.png");
	hadaimg=loadAnimation("images/fairyImage1.png","images/fairyImage2.png");
	fondo1=loadImage("images/fondo1.png");
	osoimg=loadImage("images/oso1.png");
	oso2=loadImage("images/oso2.png");
	tesoroimg=loadImage("images/tesoro.png");
	fondo2=loadImage("images/fondo2.jpg");
	c1=loadImage("images/colmena.png");
	t1=loadImage("images/texto1.png");
    t2=loadImage("images/texto2.png");
    t3=loadImage("images/texto3.png");
	fairyVoice=loadSound("sound/JoyMusic.mp3");

}

function setup() {
	createCanvas(800, 750);

	fairyVoice.play();

	fairy=createSprite(400,517);
	fairy.addAnimation("hada",hadaimg);
    fairy.scale=0.25;

	fondo=createSprite(400,400);
	fondo.addImage(fondo2);
	fondo.scale=0.9;
    fondo.visible=false;

	fondo3=createSprite(400,400);
	fondo3.addImage(fondo1);
	fondo3.scale=1.4;
    fondo3.visible=false;

	texto=createSprite(230,90);
	texto.addImage(t1);
	texto.scale=0.6;

	star = createSprite(650,30);
	star.addImage(starImg);
	star.scale = 0.2;

	tesoro= createSprite(650,600);
	tesoro.addImage(tesoroimg);
	tesoro.scale = 0.4;
	tesoro.visible=false;

	colmena = createSprite(150,250);
	colmena.addImage(c1);
	colmena.scale = 0.3;
	colmena.visible=false;

	colmena2 = createSprite(590,150);
	colmena2.addImage(c1);
	colmena2.scale = 0.3;
    colmena2.visible=false;

	engine = Engine.create();
	world = engine.world;

	starBody = Bodies.circle(650 , 30 , 5 , {restitution:0.5, isStatic:true});
	World.add(world, starBody);

	cBody = Bodies.circle(150 , 250 , 5 , {restitution:0.5, isStatic:true});
	World.add(world, cBody);
	
	c2Body = Bodies.circle(590 , 150 , 5 , {restitution:0.5, isStatic:true});
	World.add(world, c2Body);

	Engine.run(engine);

}


function draw() {
  background(bgImg);

  fairy.depth=star.depth;
  fairy.depth=fairy.depth+1;

  star.x= starBody.position.x;
  star.y= starBody.position.y;

  colmena.x= cBody.position.x ;
  colmena.y= cBody.position.y ;

  colmena2.x= c2Body.position.x ;
  colmena2.y= c2Body.position.y ;

  console.log(star.y);

  if(star.y>470&& starBody.position.y>470){
	  Matter.Body.setStatic(starBody,true);
  }
  
  if(colmena.y>470 && cBody.position.y>470){
	Matter.Body.setStatic(starBody,true);
  }

  if(colmena2.y>470 && c2Body.position.y>470){
	Matter.Body.setStatic(starBody,true);
  }

  if(star.isTouching(fairy)){
	  fondo.visible=true;
	  colmena.visible=true;
	  colmena2.visible=true;
	  star.visible=false;

	  fairy.addImage("oso",osoimg);
	  fairy.changeImage("oso");
	  fairy.y=650;

	  texto.addImage("texto",t2);
	  texto.changeImage("texto");
	  texto.scale=0.5;
	  texto.y=500;
  }

  if(colmena.y>490){
	  colmena.visible=false;
  }
  if(colmena2.y>490){
	colmena.visible=false;
	colmena2.visible=false;
	tesoro.visible=true;
	fondo3.visible=true;

	fairy.addAnimation("hada",hadaimg);
	fairy.changeAnimation("hada");
	fairy.y=517;

	texto.addImage("texto",t3);
	texto.changeImage("texto");
	texto.scale=0.5;
	texto.y=150;
  }
  drawSprites();

}

function keyPressed() {

	if (keyCode === DOWN_ARROW||fairy.position.x==490) {
		Matter.Body.setStatic(starBody,false); 
	}

	if (keyCode === UP_ARROW) {
		Matter.Body.setStatic(c2Body,false); 
		
	}

	if (fairy.position.x==150||keyCode === UP_ARROW) {
		Matter.Body.setStatic(cBody,false); 
	}

	if(keyCode===LEFT_ARROW){
		fairy.x=fairy.x-10;
	}
	
	if(keyCode===RIGHT_ARROW){
		fairy.x=fairy.x+10;
	}
}
