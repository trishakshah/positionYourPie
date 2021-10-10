var noseX=0;
var noseY=0;
var rightWristX=0;
var rightWristY=0;
var leftWristX=0;
var leftWristY=0;
var difference=0;
var radius=0;
var radiusSquare=0;
var area=0;

function setup(){
    canvas=createCanvas(600,400);
    canvas.position(1000,250);
    video=createCapture(VIDEO);
    video.size(600,400);
    video.position(375,250);
    model=ml5.poseNet(video,modelLoaded);
    model.on("pose",getResults);
}

function preload(){
    pieImg=loadImage("pie.png");
}

function modelLoaded(){
    console.log("Model loaded.");
}

function getResults(results){
    if (results.length>0){
        console.log(results);
        noseX=results[0].pose.nose.x;
        noseY=results[0].pose.nose.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        difference=floor(leftWristX-rightWristX);
        console.log("Nose X="+noseX+", Nose Y="+noseY+", Left Wrist X="+leftWristX+", Right Wrist X="+rightWristX);
        radius=difference/2;
        radiusSquare=radius*radius;
        area=floor(radiusSquare*3.142);
        document.getElementById("pieArea").innerHTML="Area of the pie: "+area+" crumbs";
       }
}

function draw(){
    stroke("white");
    fill("white");
    square(0,0,700);
    image(pieImg,noseX,noseY,difference,difference);
}