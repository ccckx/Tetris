(function(){
    window.Game = function(){
        //初始化DOM，table表格
        this.init();
        //实例化砖块类，当做Game类的子属性
        this.block = new Block();
        //实例化地图类，当做Game类的子属性
        this.map = new Map();
        //开启游戏的主定时器
        this.start()
        //键盘监听
        this.BindEvent();
    }
    //循环初始化DOM表格
    Game.prototype.init = function(){
        this.dom = document.createElement('table');
        document.getElementById("app").appendChild(this.dom);
        var tr,td;
        for(var i = 0; i < 20;i++){
            tr = document.createElement('tr'); //遍历插入行
            this.dom.appendChild(tr); //tr上树
            for(var j = 0; j < 12;j++){
                td = document.createElement('td');//遍历插入列
                tr.appendChild(td); //td上树
            }
        }
    }

    //设置table表格的颜色
    Game.prototype.setClass = function(row,col,classname){
        document.getElementsByTagName('tr')[row].getElementsByTagName('td')[col].className = classname;
    }
    //清屏方法
    Game.prototype.clearClass = function(){
        for(var i = 0;i < 20;i++){
            for(var j = 0;j < 12;j++){
                this.setClass(i,j,"");
            }
        }
    }
    //键盘事件监听
    Game.prototype.BindEvent = function(){
        var self = this;
        document.onkeyup = function(event){
            if(event.keyCode == 37){
                self.block.left();  //左键移动方法
            }else if(event.keyCode == 38){
                self.block.rotate(); //旋转方法
            }else if(event.keyCode == 39){
                self.block.right();  //右键移动方法
            }else if(event.keyCode == 40){
                self.block.goDown(); //一键下落方法
            }
        }
    }

    // 游戏主循环
    Game.prototype.start = function(){
        var self = this;
        this.f = 0;
        this.score = 0;
        this.timer = setInterval(function(){
            self.f++;
            document.getElementById("info").innerHTML = "帧频：" + self.f;
            document.getElementById("score").innerHTML = "分数：" + self.score;
            //清屏
            self.clearClass()
            //渲染砖块
            self.block.render();
            //每隔30帧下落
            self.f % 20 == 0 && self.block.down();
            //地图渲染
            self.map.render();
        },20);
    }
})()