window.onload = () =>{
    "use strict";
    const csInterface = new CSInterface();
    themeManager.init();
    
    const extensionId = csInterface.getExtensionID(); 
    const filePath = csInterface.getSystemPath(SystemPath.EXTENSION) +`/js/`;
    const extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) +`/jsx/`;
    const fs = require("fs");
    const path = require("path"); 
    csInterface.evalScript(`$.evalFile("${extensionRoot}json2.js")`);//json2読み込み
    
    const illustrator = "illustrator";
    const sendMsg = document.getElementById("sendMsg");
    
    class ConnectApp{
        constructor(btn,app){
            this.btn = btn;
            this.app = app;
            this.btn.addEventListener("click",this);
        }
        
        handleEvent(){
            if(!this.isAppRun()) return false;//通信先のアプリが立ち上がっていなかったら中断
            const obj = {
                app:"Photoshop",
                msg:"hello",
                num:document.forms.numbers.number.value
            }
            this.sendMassage(obj);
        }
        
        sendMassage(object){
            const vulcanNamespace = VulcanMessage.TYPE_PREFIX + extensionId;
            const msg = new VulcanMessage(vulcanNamespace);
            msg.setPayload(JSON.stringify(object));//jsonも渡せる
            VulcanInterface.dispatchMessage(msg);
        }
        
        isAppRun(){//通信先のアプリが立ち上がっているか確認するためのメソッド
            if(!VulcanInterface.isAppRunning(this.app)){
                csInterface.evalScript(`alert("${this.app}が立ち上がっていません")`);
                return false;
            }
            return true;
        }
    }
    
    const connect = new ConnectApp(sendMsg,illustrator);
}
