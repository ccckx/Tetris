(function(){
    window.Block = function(){
        //随机一个形状S 、Z 、J 、O 、T
        this.allType = ["I","L","J","S","Z","O","T","A","B"][~~(Math.random() * 9)];
        //先得到所有形状的长度，再随机一个形状中的方向
        this.allDirectionNumber = block_json[this.allType].length;
        //随机一个方向
        // console.log(this.allDirectionNumber)
        this.direction = ~~(Math.random() * this.allDirectionNumber);
        //得到自己的马上渲染图形的二进制code码
        this.code = block_json[this.allType][this.direction];

        //4*4小方块的初始位置
        this.row = 0; //行
        //为了保证方块在水平居中
        this.col = 4; //列
        console.log(this.code)
    }
    //砖块渲染
    Block.prototype.render = function(){
        for(var i = 0;i < 4; i++){
            for(var j = 0; j < 4;j++){
                //显示4*4的矩阵颜色，写class类
                // game.setClass(this.row + i,this.col + j,"gray");
                if(this.code[i][j] == 1){
                    //如果 4 * 4二维数组图形编码中有1就渲染颜色，0就没色
                    game.setClass(this.row + i,this.col + j,this.allType);
                }
            }
        }
    }
    //砖块下落
    Block.prototype.down = function(){
        //判断数组的第0行，有没有不等于0的项，如果有，游戏结束
        game.map.code[0].forEach(function(item){
            if(item != 0){
                clearInterval(game.timer);
                alert`游戏结束`;
            }
        });

        //调用check方法，如果为真就继续row++往下落
        if(this.check(this.row+1,this.col)){
            this.row++;
        }else{
            //如果为假，表示碰到非0的砖块了，将自己添加到map地图类中
            this.addDie();
            //同时new一个新的砖块出来
            game.block = new Block();
            //没碰到一次检测是否需要消行
            this.remove();
        }
    }
    //向左
    Block.prototype.left = function(){
        if(this.check(this.row,this.col-1)){
            this.col--;
            document.getElementById("move").play();
        }
    }
    // 向右
    Block.prototype.right = function(){
        if(this.check(this.row,this.col+1)){
            this.col++;
            document.getElementById("move").play();
        }
    }

    //一键到底
    Block.prototype.goDown = function(){
        while(this.check(this.row+1,this.col)){
            this.row++;
        }
        document.getElementById("goDown").play();
    }
    //旋转
    Block.prototype.rotate = function(){
        //备份旧方向
        var oldDirection = this.direction;
        //如果旋转的值已经等于自己方向的个数，就回到0，重新翻转
        if(this.direction == this.allDirectionNumber - 1){
            this.direction = 0;
        }else{
            // 否则继续加，可以旋转
            this.direction++;
            document.getElementById("rotate").play();
        }
        //得到自己的方向下标后，马上渲染图形的二维数组的code码
        this.code = block_json[this.allType][this.direction];

        if(!this.check(this.row,this.col)){
            //已经碰到了
            //如果不可以旋转，就撤回来
            this.direction = oldDirection
            //改为刚刚随机出来的旧方向。
            this.code = block_json[this.allType][this.direction];
        }
    }

    //消行判断
    Block.prototype.remove = function(){
        //判断map地图类中的code中某一行是不是没有0，如果没有0，就消行
        for(var i = 0;i < 20;i++){
            if(!game.map.code[i].includes(0)){
                //如果没有0，就删除行
                game.map.code.splice(i,1);
                //删除行之后，再重新在头部填充一行全0的
                game.map.code.unshift(new Array(12).fill(0));
                game.score++;
                document.getElementById("goDie").play();
            }
        }
    }

    //检测碰撞，提供check方法，返回值true或false
    Block.prototype.check = function(row,col){
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 4; j++){
                if(this.code[i][j] != 0 && game.map.code[row + i][col + j] != 0){
                    return false; //如果不能进，返回false
                }
            }
        }
        return true; //能进返回true
    }

    //添加死亡方块
    Block.prototype.addDie = function(){
        for(var i = 0; i < 4;i++){
            for(var j = 0; j < 4;j++){
                // console.log(this.row+i,this.col+j)
                if(this.code[i][j] != 0){
                    //如果不是0表示有颜色（有砖块）
                    //将随机出来的字母类名，写在地图类的code中
                    game.map.code[this.row + i][this.col + j] = this.allType;
                }
            }
        }
    }

})();