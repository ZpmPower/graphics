function drawGrid (width,height) {
    ctx.beginPath();
    for (var x = 0.5; x < width; x += 10) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, width);
    }
    for (var y = 0.5; y < height; y += 10) {
        ctx.moveTo(0, y);
        ctx.lineTo(height, y);
    }
    ctx.closePath();
    ctx.strokeStyle = "#A9A";
    ctx.stroke();
}

function drawCoordinates(){
    var xMiddle = project.width/2;
    var yMiddle = project.height/2;
    drawLine(new Point(xMiddle,0),new Point(xMiddle,project.height));
    drawLine(new Point(0,yMiddle),new Point(project.width,yMiddle));
}

function Point(x,y)
{
    this.x = x;
    this.y = y; 

    this.toContex = function(){
        var pOut = new Point(0, 0);
        if (this.x < 0) pOut.x = project.width/2 - Math.abs(this.x);
        else pOut.x = project.width/2 + this.x;

        if (this.y < 0) pOut.y = project.height/2 + Math.abs(this.y);
        else pOut.y = project.height/2 - this.y; 
        return pOut;
    };

    this.draw = function(){
        ctx.fillRect(this.x,this.y,2,2);
    };

    this.length = function(p){
        return Math.sqrt(((p.x - this.x) * (p.x - this.x)) + ((p.y - this.y) * (p.y - this.y)));
    };

    this.fromScreenCoord = function(x, y) {
    if (x > project.width/2) {
        this.x = Math.abs(x - project.width/2);
    } 
    else {
        this.x = x - project.width/2;
    }
    if (y > project.width/2) {
        this.y = -(y - project.height/2);
    } else {
        this.y = Math.abs(y - project.height/2);
        }
    };
}
var pointA = new Point(100, 100); 
var pointB = new Point(-100, 100);
var currPoint;

function rotatePoint(point, pivotPoint, dec) {
            var x = point.x;
            point.x = pivotPoint.x +
                (point.x - pivotPoint.x) * Math.cos(dec) -
                (point.y - pivotPoint.y) * Math.sin(dec);
            point.y = pivotPoint.y +
                (point.y - pivotPoint.y) * Math.cos(dec) +
                (x - pivotPoint.x) * Math.sin(dec);
        }
function drawVector(pVec){
    var p = new Point(0,0);
    p= p.toContex();
    drawLine(p,pVec);
    pVec.draw();
    //arrows
    var xVect = new Point(20,0);
    xVect = xVect.toContex();
    //var angle = calcAngle(pVec,xVect);
    var modA = Math.sqrt((pVec.x-project.width/2)*(pVec.x-project.width/2) + (pVec.y-project.height/2)*(pVec.y-project.height/2));
    var modB = Math.sqrt((xVect.x-project.width/2)*(xVect.x-project.width/2) + (xVect.y-project.width/2)*(xVect.y-project.width/2));
    var scalar = (pVec.x-project.width/2)*(xVect.x-project.width/2) + (pVec.y-project.height/2)*(xVect.y-project.height/2);
    var res = Math.acos(scalar/(modA*modB))*180/Math.PI;
    //ctx.moveTo(xVect.x,xVect.y);
    var rl= new Point(p.x-5,p.y+5);
    var rr= new Point(p.x+5,p.y+5);
    var rup = new Point(p.x,p.y);

    rotatePoint(rl,rup,45*(180/Math.PI));
    rotatePoint(rr,rup,45*(180/Math.PI));
    rotatePoint(rup,rup,45*(180/Math.PI));

    // // console.log("rup = " + rup.x + " " + rup.y);
    // // console.log("rr = " + rr.x + " " + rr.y);
    // // console.log("rl = " + rl.x + " " + rl.y);

    // console.log("res = " + res); //radian
    // rup.x=pVec.x; rup.y=pVec.y; //oki
    // rl.x =rup.x - (rup.x-rl.x) + (pVec.x-p.x); rl.y=rup.y - (rup.y-rl.y) + (pVec.y-p.y);
    // rr.x =rup.x - (rup.x-rr.x) + (pVec.x-p.x); rr.y=rup.y - (rup.y-rr.y) + (pVec.y-p.y);

     // drawLine(rup,rl);
     // drawLine(rl,rr);
     // drawLine(rr,rup);

    // console.log("rup = " + rup.x + " " + rup.y);
    // console.log("rr = " + rr.x + " " + rr.y);
    // console.log("rl = " + rl.x + " " + rl.y);
    // ctx.closePath();
    // ctx.strokeStyle = "#000";
    // ctx.stroke();
}


function drawLine(p1,p2){
    ctx.beginPath();
    ctx.moveTo(p1.x,p1.y);
    ctx.lineTo(p2.x,p2.y);
    ctx.closePath();
    ctx.strokeStyle = "#000";
    ctx.stroke();
}

function drawVectorsArc(v1,v2)
{
    drawVector(v1.toContex());
    drawVector(v2.toContex());

    ctx.beginPath();
    var p1 = v1.toContex();
    var p2 = v2.toContex();
    ctx.moveTo((project.width/2 + p1.x)/2,(project.height/2 + p1.y)/2);  
    ctx.quadraticCurveTo((p1.x+p2.x)/2,(p1.y+p2.y)/2,(project.width/2 + p2.x)/2,(project.height/2 + p2.y)/2);
    ctx.strokeStyle = "black";                    
    ctx.stroke();
}

function calcAngle(v1,v2)
{
    var modA = Math.sqrt(v1.x*v1.x + v1.y*v1.y);
    var modB = Math.sqrt(v2.x*v2.x + v2.y*v2.y);
    var scalar = v1.x*v2.x + v1.y*v2.y;
    return (Math.acos(scalar/(modA*modB))*180/Math.PI);
}
function setAngle(angle){   
    var idangle = document.getElementById("angle");
    idangle.value = angle;
}
function mouseDownEvent(event) {
    console.log("pagex = " + event.pageX);
    console.log("pagey = " + event.pageY);
    console.log("elemLeft = " + elemLeft);
    console.log("elemTop = " + elemTop);
    var x = event.pageX - elemLeft - 3,
        y = event.pageY - elemTop - 3;

    var downPoint = new Point(0, 0);
    downPoint.fromScreenCoord(x, y);
    console.log("downPointXY = " + downPoint.x + " " + downPoint.y);
    if (downPoint.length(pointA) < 7) {
        currPoint = pointA;
    } 
    else if (downPoint.length(pointB) < 7) {
        currPoint = pointB;
    }
    else {
        currPoint = undefined;
    }
    console.log("curPointXY = " + currPoint.x + " " + currPoint.y);
}

function mouseMoveEvent(event) {
    var x = event.pageX - elemLeft - 3,
        y = event.pageY - elemTop - 3;

    if (currPoint != undefined) {
        var point = new Point(0, 0);
        point.fromScreenCoord(x, y);
        currPoint.x = point.x;
        currPoint.y = point.y;
    }

    var firstX = document.getElementById("firstX");
    var firstY = document.getElementById("firstY");

    firstX.value = pointA.x;
    firstY.value = pointA.y;

    var secondX = document.getElementById("secondX");
    var secondY = document.getElementById("secondY");

    secondX.value = pointB.x;
    secondY.value = pointB.y;
}

function mouseUpEvent(event) {
    currPoint = undefined;
}

function refresh() {
    ctx.clearRect(0, 0, project.width, project.height);
    drawGrid(project.width,project.height);
    drawCoordinates();
    drawVectorsArc(pointA,pointB);
    setAngle(calcAngle(pointA,pointB));
}

function inputValue(id) {

    var field = document.getElementById(id);

    switch (id) {
        case "firstX":
            {
                pointA.x = parseFloat(field.value);
                break;
            }
        case "firstY":
            {
                pointA.y = parseFloat(field.value);
                break;
            }
        case "secondX":
            {
                pointB.x = parseFloat(field.value);
                break;
            }
        case "secondY":
            {
                pointB.y = parseFloat(field.value);
                break;
            }
        case "angle":
            {
                alpha.x = parseFloat(field.value);
                break;
            }

    }
}

