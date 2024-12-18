var bg,bgimg
var mario,mariorunning
var platform,platformimg,platformgroup
var lazer,lazerimg,lazergroup
var rock,rockimg,rockgroup
var gem,gemimg,gemgroup
var coin,coinimg,coingroup
var score=0
var gamestate="start"
var life=3
var invisiblebottom,invisibletop




function preload(){
bgimg=loadImage("Assets/bg.png")
mariorunning=loadAnimation("Assets/bob1.png","Assets/bob2.png","Assets/bob3.png","Assets/bob4.png","Assets/bob5.png","Assets/bob6.png","Assets/bob7.png")
platformimg=loadImage("Assets/platform.png")
coinimg=loadAnimation("Assets/c1.png","Assets/c2.png","Assets/c3.png","Assets/c4.png","Assets/c5.png","Assets/c6.png","Assets/c7.png","Assets/c8.png","Assets/c9.png")
rockimg=loadImage("Assets/stone.png")
gemimg=loadImage("Assets/gem.png")
lazerimg=loadImage("Assets/laser.png")
}


function setup(){
    createCanvas(1500,700)
    bg=createSprite(750,350,1500,700)
    bg.addImage(bgimg)
    mario=createSprite(80,600,60,60)
    mario.addAnimation("running",mariorunning)
    invisiblebottom=createSprite(20,680,100000,20)
    invisiblebottom.visible=false
    platformgroup=new Group()
    coingroup=new Group()
    lazergroup=new Group()
    rockgroup=new Group()
    gemgroup=new Group()
    mario.debug=false
    }

function draw(){
    background(0)
    if(gamestate==="start"){
        if(keyDown("right")){
            mario.x+=5
        }
        if(keyDown("space")){
            mario.velocityY=-10
        }
        mario.velocityY+=0.8

        bg.velocityX=-2
        if(bg.x<100){
            bg.x=1000
        }
        spawnrock()
        spawnplatform()
        spawngem()
        spawnlazer()


        if(platformgroup.isTouching(mario)){
            mario.velocityY=0
            mario.collide(platformgroup)
        }

        rockgroup.isTouching(invisiblebottom,rockCollide)
        coingroup.isTouching(mario,destroyCoin)
        gemgroup.isTouching(mario,destroygem)
        rockgroup.isTouching(mario,destroyrock)
        if(lazergroup.isTouching(mario)||score<0||life<0){
            gamestate="stop"
            
        }
    }


        
    if(gamestate==="stop"){
        mario.destroy()
        platformgroup.destroyEach()
        coingroup.destroyEach()
        gemgroup.destroyEach()
        lazergroup.destroyEach()
        rockgroup.destroyEach()
        bg.velocityX=0
        life=0
        gameover()
    }


    mario.collide(invisiblebottom)
    drawSprites()
    textSize(25)
    stroke(0)
    strokeWeight(3)
    fill(0)
    text("S C O R E : "+score,mario.x-120,mario.y-120)
    text("L I F E : "+life,mario.x-100,mario.y-70)
    strokeWeight(1)
    textSize(20)
    text("Press the space key for MARIO to jump.\nCollect the coins and gems, avoid touching the lazer and rocks",10,50)
    text("Made by:RIDHIMA",1300,50)
}
function spawnrock(){
if(frameCount%100===0){
    rock=createSprite(random(100,1400),0)
    rock.addImage(rockimg)
    rock.scale=.3
    var v=random(10,30)
    rock.velocityY=v
    rock.lifetime=700/v
    rockgroup.add(rock)
}
}

function spawnplatform(){
if(frameCount%150===0){
   platform=createSprite(1500,500)
   platform.addImage(platformimg)
   platform.scale=.4
   platform.velocityX=-3
   platform.y=random(100,500)  
    platform.lifetime=1500/3
    platform.debug=false
    platform.setCollider("rectangle",0,0,350,180)
    platformgroup.add(platform)
    
    coin=createSprite(platform.x,platform.y-60)
    coin.addAnimation("coin",coinimg)
    coin.velocityX=-3
    coin.lifetime=1500/3
    coin.scale=.4
    coingroup.add(coin)
    
   
}    
    
}
function spawngem(){
  if(frameCount%250===0){
    gem=createSprite(random(10,1400),0)
    gem.addImage(gemimg)
    gem.scale=.25
    gv=random(7,15)
    gem.velocityY=gv
    gem.lifetime=700/gv
    gemgroup.add(gem)

  }  
}

function spawnlazer(){
if(frameCount%100===0){
lazer=createSprite(1500,random(100,400))
lazer.addImage(lazerimg)
lazer.scale=0.1
lv=random(9,15)
lazer.velocityX=-lv
lazer.lifetime=1500/lv
lazergroup.add(lazer)
}
}

function rockCollide(rock){
    rock.collide(invisiblebottom)
    rock.velocityX=-2
    rock.lifetime=-1
    }

function destroyCoin(coin){
    score+=3
    coin.destroy()

} 
function destroygem(gem){
    score+=10
    gem.destroy()

}
function destroyrock(rock){
    rock.destroy()
    score-=5
    life-=1
}
function gameover(){
    swal({
        title:"G A M E  O V E R",
        text:"Thanks for playing.....try again",
        imageUrl:"Assets/c5.png",
        imageSize:"150x150",
        confirmButtonText:"PLAY AGAIN"

    },
    function(isConfirm){
        if(isConfirm){
            location.reload()

        }

    }
)   
}

