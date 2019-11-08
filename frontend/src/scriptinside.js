var WIDTH = window.innerWidth;
    var HEIGHT = window.innerHeight;
    var POINT = 16;//生成点的个数
    // default 40
    // numero de nodos
    // nnumero de nodos proporcional al width x height
    var canvas = document.getElementById('canvas');
    canvas.width = WIDTH;//定义画布的宽高
    canvas.height = HEIGHT;
    var context = canvas.getContext('2d');
    context.fillStyle = 'rgba(12,206,36,0.0)'; // circle color
    var circleArr = [];
    //线条：开始xy坐标，结束xy坐标，线条透明度
    function Line(x, y, _x, _y, o) {
        this.beginX = x;
        this.beginY = y;
        this.closeX = _x;
        this.closeY = _y;
        this.o = o;
    }
    function Circle(x, y, r, moveX, moveY) {
        this.x = x;//点的圆心
        this.y = y;
        this.r = r;//点的半径
        this.moveX = moveX;//移动距离
        this.moveY = moveY;
    }
    //生成max和min之间的随机数
    function num(max, _min) {
        var min = arguments[1] || 0;
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    // 绘制原点
    function drawCricle(cxt, x, y, r, moveX, moveY) {
        var circle = new Circle(x, y, r, moveX, moveY);
        cxt.beginPath();
        cxt.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
        cxt.closePath();
        cxt.fill();
        return circle;
    }
    //绘制线条
    function drawLine(cxt, x, y, _x, _y, o) {
        var line = new Line(x, y, _x, _y, o);
        cxt.beginPath();
        cxt.strokeStyle = 'rgba(12,206,36,' + o + ')'; // line and dot color
        cxt.moveTo(line.beginX, line.beginY);
        cxt.lineTo(line.closeX, line.closeY);
        cxt.closePath();
        cxt.stroke();
    }
    //初始化生成原点
    function init() {
        circleArr = [];
        for (var i = 0; i < POINT; i++) {
            circleArr.push(drawCricle(context, num(WIDTH), num(HEIGHT), num(15, 2), num(20, -20) / 20, num(20, -20) / 20));
        }
        draw();
    }
    //每帧绘制
    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (var k = 0; k < POINT; k++) {
            drawCricle(context, circleArr[k].x, circleArr[k].y, circleArr[k].r);
        }
        for (var i = 0; i < POINT; i++) {
            for (var j = 0; j < POINT; j++) {
                if (i + j < POINT) {
                    var A = Math.abs(circleArr[i + j].x - circleArr[i].x);
                    var B = Math.abs(circleArr[i + j].y - circleArr[i].y);
                    var lineLength = Math.sqrt(A * A + B * B);
                    var C = 1 / lineLength * 7 - 0.009;
                    var lineOpacity = C > 0.03 ? 0.03 : C;
                    if (lineOpacity > 0) {
                        drawLine(context, circleArr[i].x, circleArr[i].y, circleArr[i + j].x, circleArr[i + j].y, lineOpacity);
                    }
                }
            }
        }
    }
    //调用执行
    window.onload = function () {
        init();
        setInterval(function () {
            for (var i = 0; i < POINT; i++) {
                var cir = circleArr[i];
                cir.x += cir.moveX;
                cir.y += cir.moveY;
                if (cir.x > WIDTH) cir.x = 0;
                else if (cir.x < 0) cir.x = WIDTH;
                if (cir.y > HEIGHT) cir.y = 0;
                else if (cir.y < 0) cir.y = HEIGHT;
            }
            draw();
        }, 50);
    }







