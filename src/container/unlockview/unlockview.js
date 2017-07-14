/**
 * Created by hyj on 2016/9/29.
 */
import React, {
    Component,
    PropTypes
    } from 'react';

import classNames from 'classnames';
import '../../../resource/css/font-awesome.min.css';
import './unlockview.css';

import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();

export default class unlockview extends Component {
    constructor(props) {
        super(props);
        this.state={
            height:700,
            width:600,
            lock_name:"test lock",
            statcode:"12345",
            userid:"12345",
            title_height:210,
            button_height:350,
            note_height:140,
            locked:true,
            url:"request.php",
            notes:"Click to open the lock",
            status:"locked",
            cycle:30,
            interval:0,
            hide:"none",
            lockbutton:null
        }
    }
    hide(){
        this.setState({hide:"none"});
    }
    show(){
        this.setState({locked:true,status:"locked",notes:"Click to open the lock."});
        this.setState({hide:"block"});
    }
    update_size(width,height){
        this.setState({height:height,width:width,title_height:height*0.3,button_height:height*0.5,note_height:height*0.2});

    }
    update_username(username){
        this.setState({userid:username});
    }
    update_url(url){
        this.setState({url:url});
    }
    update_statcode(statcode){
        this.setState({statcode:statcode});
    }
    update_lock_name(lock_name){
        this.setState({lock_name:lock_name});
    }
    update_lockbutton(lockfunc){
        this.setState({lockbutton:lockfunc});
    }

    handleerror (){

        this.state.lockbutton(false);
        this.setState({locked:true,status:"locked",notes:"Communication error, try again or ask for support."});
    }
    handlecommunicateStart(){

        this.state.lockbutton(true);
        this.setState({locked:true,status:"communicating",notes:"Communicating with Server"});
    }
    handlecommunicating(){
        let note = this.state.notes;
        if(note.length > 30) note = "Communicating with Server";
        else note = note +".";
        this.setState({locked:true,status:"communicating",notes:note});
        this.setState({cycle:this.state.cycle-1});
    }
    handletimeout (){
        this.state.lockbutton(false);
        this.setState({locked:true,status:"locked",notes:"Server time out, try again or contract the support"});
        this.setState({cycle:30});

    }
    handleunlock(){
        this.state.lockbutton(false);
        this.setState({locked:false,status:"open",notes:"The lock is opened."});
    }
    handlecircle(){
        //console.log("cycleing");
        let jsonParse = function(res) {
            return res.json().then(jsonResult => ({ res, jsonResult }));
        }
        if(this.state.locked == true && this.state.status == "communicating" && this.state.cycle >0){
            let body = {statcode:this.state.statcode};
            let map={
                action:"HCU_Lock_Status",
                type:"query",
                body: body,
                user:this.state.userid
            };
            fetch(this.state.url,
                {
                    method:'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(map)
                }).then(jsonParse)
                .then((res)=>{
                    if(res.jsonResult.status == "true"){
                        if(res.jsonResult.ret == "false" ){
                            this.handleunlock();
                            clearInterval(this.state.interval);
                        }else{
                            this.handlecommunicating();
                        }

                    }else{
                        this.handleerror();
                        clearInterval(this.state.interval);
                    }
                })
                .catch( (error) => {
                    console.log('cycle error', error); // eslint-disable-line  no-console
                    this.handleerror();
                    clearInterval(this.state.interval);
                    return { error };
                });
        }else if(cycle ==0){
            this.handletimeout();
            clearInterval(interval);
        }
    }
    handleresult(res) {
        //console.log(res.jsonResult.status);
        if(res.jsonResult.status == "true"){
            //console.log("try to start the Interval");
            this.handlecommunicateStart();
            let temp = setInterval(this.handlecircle.bind(this),2000);
            //console.log("Interval=" +temp);
            this.setState({interval: temp});
        }else{
            console.log('result error', error);
            this.handleerror();
        }
    }




    handle_click(){
        //console.log("click");
        let jsonParse = function(res) {
            return res.json().then(jsonResult => ({ res, jsonResult }));
        }


        if(this.state.locked == true && this.state.status =="locked"){
            let body = {statcode:this.state.statcode};
            let map={
                action:"HCU_Lock_open",
                type:"mod",
                body: body,
                user:this.state.userid
            };
            fetch(this.state.url,
                {
                    method:'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(map)
                }).then(jsonParse)
                .then(this.handleresult.bind(this))
                .catch( (error) => {
                    console.log('request error', error); // eslint-disable-line  no-console
                    this.handleerror();
                    return { error };
                });
        }


    }




    render() {
        let pad_value = this.state.height/50+"px "+this.state.height*0.1+"px";
        let button = <i className="fa fa-lock" style={{padding:pad_value }}></i>;
        if(this.state.locked == false) button = <i className="fa fa-unlock-alt" style={{padding:pad_value }}></i>;
        return (
            <div style={{position:"relative",background:"#62b900",height:this.state.height,width:'100%',display:this.state.hide}}>
                <div style={{position:"relative",width:'100%',height:this.state.title_height,textAlign : 'center',display:"table"}}>
                    <div className="unlocklabel" style={{position:"relative",width:"100%",height:this.state.title_height ,float:"left",fontSize:this.state.height/8,display:"table-cell",verticalAlign:"middle",margin:"auto"}} >{this.state.lock_name}
                    </div>
                    <div style={{clear:"both"}}></div>
                </div>
                <div style={{position:"relative",width:'100%',height:this.state.button_height,textAlign : 'center',display:"table"}}>
                    <div className="lockbutton" style={{position:"relative",height:this.state.button_height, fontSize:this.state.height/3,float:"left",display:"table-cell",verticalAlign:"middle",margin:"auto"}} onClick={this.handle_click.bind(this)}>
                        {button}
                    </div>
                    <div style={{clear:"both"}}></div>
                </div>
                <div style={{position:"relative",width:'100%',height:this.state.note_height,textAlign : 'center',display:"table"}}>
                    <div className="unlocklabel" style={{position:"relative",width:"100%",height:this.state.title_height,float:"left",fontSize:this.state.height/24,display:"table-cell",verticalAlign:"middle",margin:"auto"}} >{this.state.notes}
                    </div>
                    <div style={{clear:"both"}}></div>
                </div>
            </div>
        );
    }
}