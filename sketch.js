
let w = 1500; 
let h = 1500; 
let scale = 0.5; 

let ran = [[0.7,0.7], [-0.7, 0.7]];  
let di = [[1,0], [0, 1]]; 
let sagCur = [950,  554];    // 971 366
let sagRadius = Math.sqrt((Math.abs(sagCur[1] - 366)**2) + Math.abs(sagCur[0] - 971)**2); 
let sagMovement = [getRandomArbitrary(-5,6), getRandomArbitrary(-5,6)];

let phantomCur = [952, 546]; // 918 377
let phantomMovement = [getRandomArbitrary(-5,6), getRandomArbitrary(-5,6)];
let phantomRadius = Math.sqrt((Math.abs(phantomCur[1] - 377)**2) + Math.abs(phantomCur[0] - 918)**2); 
let clack;  

let iniPts = []; 
let phantomPts = []; 

let a = []; 
let convertedA = []; 

let b = []; 
let convertedB = []; 

function preload(){

    soundFormats('wav');
    clack = loadSound('clack'); 
}

function setup(){

    createCanvas(w,h); 

    outputVolume(1); 
    angleMode(DEGREES); 
    getInitialPts(); 
    getPhantomPts(); 
    phantomPts.push([-5,-5]); 

    a = iniPts; 
    b = phantomPts; 

   initialLinearTransformation(di);
    phantomInitialLinearTransformation(di); 
    // phantomLinearTransformation(ran); 
    // phantomLinearTransformation(ran); 

    //  rotateAbout(sagCur[0], sagCur[1], ran); 
       phantomCreateTranslation(-400, -300); 
       phantomCur[1] += 300; 
       phantomCur[0] -= 400; 
       
    //    sagCur[0]+=sagMovement[0]; 
    //    sagCur[1]-=sagMovement[1]; 
       
    //    console.log(sagCur); 
}


function draw(){
    background(255); 
    stroke(0); 
    noFill(); 
    strokeWeight(1); 
    rect(0,0,w, h); 

    textSize(42); 
    fill(0); 
    text('Flame Sagittario vs Phantom Orion - who will win?', w/4 - 50, 50); 
    strokeWeight(2); 
    noFill(); 

    for(let j = 0; j<3; j++){
    rect(0,0,w, h); 
    for(let i = 1; i<convertedA.length; i++){
        if(iniPts[i] && (iniPts[i][0] == -5 || iniPts[i-1][0] == -5)){
            continue; 
        }
        else{
            line(convertedA[i][0], convertedA[i][1], convertedA[i-1][0], convertedA[i-1][1]); 
        }
    }

    for(let i = 1; i<convertedB.length; i++){
        if(phantomPts[i] && (phantomPts[i][0] == -5 || phantomPts[i-1][0] == -5)){
            continue; 
        }
        else{
                // console.log(phantomPts[i], phantomPts[i-1]); 
            line(convertedB[i][0], convertedB[i][1], convertedB[i-1][0], convertedB[i-1][1]); 
        }
    }



    bangTest(); 
     let rot = createRotation(-10); 
     let rot2 = createRotation(10); 
     rotateAbout(sagCur[0], sagCur[1], rot); 

     collisionTest(); 
      createTranslation(sagMovement[0], sagMovement[1]); 
     sagCur[0] += sagMovement[0]; 
     sagCur[1] -= sagMovement[1]; 

     phantomRotateAbout(phantomCur[0], phantomCur[1], rot2); 
     phantomCollisionTest();
     phantomCreateTranslation(phantomMovement[0], phantomMovement[1]); 
     phantomCur[0] += phantomMovement[0]; 
     phantomCur[1] -= phantomMovement[1]; 

     
} 

    

} 


function bangTest(){
    if(distBetween(sagCur[0], sagCur[1], phantomCur[0], phantomCur[1]) <= phantomRadius + sagRadius){
        clack.play(); 
        sagMovement[0] *= -1; 
        sagMovement[1] *= -1; 
        phantomMovement[0] *= -1; 
        phantomMovement[1] *= -1; 
    }
}

function distBetween(x1,y1,x2,y2){
    return Math.sqrt(Math.abs(x2 - x1)**2 + Math.abs(y2-y1)**2); 
}

function collisionTest(){
    if(sagCur[0]  + sagMovement[0] - 198 <= 0 || sagCur[0] + sagMovement[0] + 198 >= w){
        sagMovement[0] *= -1 
        clack.play(); 
        // console.log("HERE"); 
        
    }
    if(sagCur[1]- sagMovement[1] - 217 <= 0 || sagCur[1]  - sagMovement[1] + 217 >= h){
        sagMovement[1] *= -1; 
        // console.log("HERE"); 
        clack.play(); 
    }
}

function phantomCollisionTest(){
    if(phantomCur[0] + phantomMovement[0] - 175 <= 0 || phantomCur[0] + phantomMovement[0] + 175 >= w){
        phantomMovement[0] *= - 1; 
        clack.play(); 
    }
    if(phantomCur[1] - phantomMovement[1] - 169 <=0 || phantomCur[1] - phantomMovement[1] + 169 >= h){
        phantomMovement[1] *= -1; 
        clack.play(); 
    }
}
function mousePressed(){
    console.log(mouseX, mouseY); 
}


function createRotation(theta){
    return [[cos(theta), sin(theta)], [-sin(theta), cos(theta)]]; 
}

function createTranslation(offsetX, offsetY){
    let changedMatrix = [] ;
    let transMatrix = [[1,0,0], [0,1, 0], [offsetX,offsetY,1]]; 

    for(let i = 0; i<a.length; i++){
        changedMatrix.push([a[i][0], a[i][1], 1]); 
    }

    let tempA = multiplyMatrices(changedMatrix, transMatrix); 

    
    for(let i = 0; i<tempA.length; i++){
        a[i][0] = tempA[i][0]; 
        a[i][1] = tempA[i][1]; 
    }

    for(let i = 0; i<a.length; i++){
        if(a[i][0] != -5 && a[i][1] != -5){
            let blaCoord = convertCoords(a[i][0], a[i][1]); 
            convertedA[i] = blaCoord;   
        }
        else{
            convertedA[i] = [-5, -5]; 
        }
    }

    return; 

}

function phantomCreateTranslation(offsetX, offsetY){
    let changedMatrix = [] ;
    let transMatrix = [[1,0,0], [0,1, 0], [offsetX,offsetY,1]]; 

    for(let i = 0; i<b.length; i++){
        changedMatrix.push([b[i][0], b[i][1], 1]); 
    }

    let tempB = multiplyMatrices(changedMatrix, transMatrix); 

    
    for(let i = 0; i<tempB.length; i++){
        if(phantomPts[i][0] == -5 && phantomPts[i][1] == -5){
            b[i][0] = -5; 
            b[i][1] = -5; 
        }
        else{
        b[i][0] = tempB[i][0]; 
        b[i][1] = tempB[i][1]; 
        } 
    }


    for(let i = 0; i<b.length; i++){
        if(phantomPts[i][0] != -5 && phantomPts[i][1] != -5){
            let blaCoord = convertCoords(b[i][0], b[i][1]); 
            convertedB[i] = blaCoord;   
        }
        else{
            convertedB[i] = [-5, -5]; 
        }
    }

    return; 

}

function initialLinearTransformation(mat1){
    a = multiplyMatrices(iniPts, mat1); 
    for(let i = 0; i<a.length; i++){
        if(a[i][0] != -5 && a[i][1] != -5){
            let blaCoord = convertCoords(a[i][0], a[i][1]); 
            convertedA.push([blaCoord[0], blaCoord[1]]);  
        }
        else{
            convertedA.push([-5,-5]); 
        }
    }
}



function phantomInitialLinearTransformation(mat1){
    b = multiplyMatrices(phantomPts, mat1); 
    for(let i = 0; i<b.length; i++){
        if(phantomPts[i][0] != -5 && phantomPts[i][1] != -5){
            let blaCoord = convertCoords(b[i][0], b[i][1]); 
            convertedB.push([blaCoord[0], blaCoord[1]]);  
        }
        else{
            convertedB.push([-5,-5]); 
        }
    }
}

function phantomLinearTransformation(mat1){
    b = multiplyMatrices(b, mat1); 
    for(let i = 0; i<b.length; i++){
        if(phantomPts[i][0] != -5 && phantomPts[i][1] != -5){
            let blaCoord = convertCoords(b[i][0], b[i][1]); 
            convertedB[i] =blaCoord;  
        }
        else{
            convertedB[i] = [-5,-5]; 
        }
    }
}
function linearTransformation(mat1){
    a = multiplyMatrices(a, mat1); 
    for(let i = 0; i<a.length; i++){
        if(a[i][0] != -5 && a[i][1] != -5){
            let blaCoord = convertCoords(a[i][0], a[i][1]); 
            convertedA[i] = blaCoord;   
        }
        else{
            convertedA[i] = [-5, -5]; 
        }
    }
}

function getPhantomPts(){
    for(let i = 0; i<phantomCoords.length - 1; i+=2){
        if(phantomCoords[i] == -5){
            phantomPts.push([-5,-5]); 
            continue; 
        }
        phantomPts.push([phantomCoords[i], phantomCoords[i+1]]); 
    }

    for(let i = 0; i<phantomPts.length; i++){
        if(phantomPts[i][0] != -5 && phantomPts[i][1] != -5){
            phantomPts[i] = [phantomPts[i][0] * scale, phantomPts[i][1] * scale]; 
        }
    }
    return; 
}

function getInitialPts(){

    for(let i = 0; i<pts.length-1; i+=2){
        if(pts[i] == -5){
            iniPts.push([-5,-5]); 
            continue; 
        } 
        iniPts.push([pts[i], pts[i+1]]); 
    }

    for(let i = 0; i<iniPts.length; i++){
        if(iniPts[i][0] == 414.999766){
            iniPts.push([-5,-5]); 
            break; 
        }
    }

    for(let i = 0; i<iniPts.length; i++){
        if(iniPts[i][0] != -5 && iniPts[i][1] != -5){
            iniPts[i] = [iniPts[i][0] * scale, iniPts[i][1] * scale]; 
        }
    }

    return; 
    
}

function rotateAbout(x, y, mat2){

   createTranslation(w/2 - x,  y-h/2); 
   linearTransformation(mat2); 
   createTranslation(x-w/2 , h/2-y); 
}

function phantomRotateAbout(x, y, mat2){

   phantomCreateTranslation(w/2 - x,  y-h/2); 
    phantomLinearTransformation(mat2); 
    phantomCreateTranslation(x-w/2 , h/2-y); 
}

function convertCoords(x, y){
    return [x+w/2, h/2-y]; 
}

const multiplyMatrices = (a, b) => {
   if (!Array.isArray(a) || !Array.isArray(b) || !a.length || !b.length) {
      throw new Error('arguments should be in 2-dimensional array format');
   }
   let x = a.length,
   z = a[0].length,
   y = b[0].length;
   if (b.length !== z) {
      // XxZ & ZxY => XxY
      throw new Error('number of columns in the first matrix should be the same as the number of rows in the second');
   }
   let productRow = Array.apply(null, new Array(y)).map(Number.prototype.valueOf, 0);
   let product = new Array(x);
   for (let p = 0; p < x; p++) {
      product[p] = productRow.slice();
   }
   for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
         for (let k = 0; k < z; k++) {
            product[i][j] += a[i][k] * b[k][j];
         }
      }
   }
   return product;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}