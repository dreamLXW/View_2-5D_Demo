cc.Class({
    extends: cc.Component,

    properties: {
        node3D:cc.Node,
        speed:200,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        window.ModelMgr = this;
        this.node3D.lastAngle = 0;
        this.move = false;
    },

    updateModelEuler(){ //模型旋转
        if (!this.node3D) {
            return;
        }
        let nodeQ = cc.quat();
        this.node3D.getRotation(nodeQ);

        let rotateAngle = this.node3D.lastAngle - this.node.angle;
        let e = cc.v3(0,-rotateAngle,0);
        let additionalQuat = cc.quat();
        additionalQuat.fromEuler(e);
        nodeQ.mul(additionalQuat,nodeQ);
        this.node3D.setRotation(nodeQ);

        this.node3D.lastAngle = this.node.angle;
    },

    _touchStartEvent(){
        this.updateModelEuler();
    },

    _touchMoveEvent(joystickAngle){
        this.move = true;
        this.node.angle = joystickAngle - 90;   //正向修正角度
        this.updateModelEuler();
    },

    _touchEndEvent(){
        this.move = false;
    },

    update (dt) {
        if (this.move) {
            let angle = this.node.angle;
            let moveDist = this.speed * dt;
            let toPos = this.node.position.add(cc.v2(Math.cos((angle+90) * Math.PI / 180), Math.sin((angle+90) * Math.PI / 180)).mulSelf(moveDist));
            this.node.position = toPos;
        }
        this.node3D.position = this.node.position;
    },
});
