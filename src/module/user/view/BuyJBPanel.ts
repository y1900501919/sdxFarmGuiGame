/**
 * Created by rodey on 14/12/3.
 *
 * 购买金币面板
 */

module game{

    export class BuyJBPanel extends egret.gui.SkinnableComponent implements IPanel
    {

        /**
         * scrollerDisplay
         */
        public scrollerDisplay: egret.gui.Scroller;
        public groupDisplay: egret.gui.Group;

        //追加 按钮
        public closeButton: egret.gui.UIAsset;
        public returnButton: egret.gui.UIAsset;
        /**
         *
         * @type {number}  0: 显示关闭按钮; >=1: 显示返回按钮;
         */
        private type: number;
        //需要返回的面板
        private panelName: number;
        private parmas: any;

        //追加一个 DataGroup
        public dataGroup: egret.gui.DataGroup;

        private _dataArray: egret.gui.ArrayCollection;

        constructor(){
            super();
            this.skinName = skins.uicompenet.BuyGold.BuyJBPanelSkin;

            this.type = 0;
            this.panelName = PanelName.SHOPPING_PANEL;

            this._dataArray = new egret.gui.ArrayCollection(BuyCoinModel.itemList);
        }

        private init(): void{

            if(String(this.type) == '0'){
                if(this.closeButton){
                    this.closeButton.visible = true;
                }
                if(this.returnButton){
                    this.returnButton.visible = false;
                }
            }else{
                if(this.closeButton){
                    this.closeButton.visible = false;
                }
                if(this.returnButton){
                    this.returnButton.visible = true;
                }
            }

            /*this._dataArray = new egret.gui.ArrayCollection(BuyCoinModel.itemList);

            if(this.dataGroup){
                //初始化DataGroup数据组建
                this.dataGroup.dataProvider = this._dataArray;
                this.createListItem();
            }*/

        }

        public onShow( ...args: any[] ):void
        {
            this.setPanelData(args);
        }
        public onClose( ...args: any[] ):void
        {
            /*this.parmas = null;
            this.panelName = null;
            this.type = 0;*/
        }
        public onUpdate( ...args: any[] ):void
        {
            this.setPanelData(args);
        }

        public setPanelData(args: any[]): void{
            if(String(args[0]) !== ''){
                this.type = args[0];
            }
            if(args[1] && args[1] !== null){
                this.panelName = args[1];
            }
            if(args[2]){
                this.parmas = args[2];
            }

            this.init();
        }

        public childrenCreated():void
        {
            super.childrenCreated();

            if(this.closeButton)
            {
                //======关闭窗口
                this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
                if(String(this.type) == '0'){
                    this.closeButton.visible = true;
                }else{
                    this.closeButton.visible = false;
                }

            }

            if(this.returnButton)
            {
                //======返回窗口
                this.returnButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.returnHandler, this);
                if(String(this.type) == '0'){
                    this.returnButton.visible = false;
                }else{
                    this.returnButton.visible = true;
                }

            }

            if(this.scrollerDisplay){
                this.scrollerDisplay.verticalScrollPolicy = egret.gui.ScrollPolicy.OFF;

            }

            if(this.dataGroup){

                //初始化DataGroup数据组建
                this.dataGroup.dataProvider = this._dataArray;
                this.createListItem();

            }

        }
        /**
         * 继承实现
         * @param partName
         * @param instance
         */
        public partAdded(partName:string, instance:any):void{
            super.partAdded(partName, instance);
            var self = this;

            /*if(instance == this.closeButton)
            {
                //======关闭窗口
                this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);

            }else if(instance == this.returnButton)
            {
                //======返回窗口
                this.returnButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.returnHandler, this);

            }else if(instance == this.scrollerDisplay){
                this.scrollerDisplay.verticalScrollPolicy = egret.gui.ScrollPolicy.OFF;

            }else if(instance == this.dataGroup){

                //初始化DataGroup数据组建
                this.dataGroup.dataProvider = this._dataArray;
                this.createListItem();

            }*/

        }

        private closeHandler(evt: egret.TouchEvent): void{
            var target: egret.gui.UIAsset = evt.currentTarget || evt.target;
            TweenIt.tweenBigThenNormal(target, function(){
                UIMgr.instance.closeCurrentPanel();
            });
        }

        private returnHandler(evt: egret.TouchEvent): void{
            var self = this;
            var target:egret.gui.UIAsset = evt.currentTarget || evt.target;
            TweenIt.tweenBigThenNormal(target, function () {
                UIMgr.instance.closeCurrentPanel(function () {

                    if(self.panelName){
                        UIMgr.instance.show(self.panelName, { 'direction': Direction.CENTER });
                    }
                    self.onClose();
                });
            });
        }


        /**
         * 创建多个item
         */
        private createListItem(): void{
            if(this._dataArray.length = 0)
                return;
            //console.log(this._dataArray);
            this.dataGroup.percentWidth = 100;
            this.dataGroup.percentHeight = 100;
            this.dataGroup.itemRenderer = new egret.gui.ClassFactory(game.BuyJBItemRender);
            this.dataGroup.itemRendererSkinName = skins.uicompenet.BuyGold.BuyJBItemRenderSkin;

        }


    }


}
