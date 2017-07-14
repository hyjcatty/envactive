/**
 * Created by hyj on 2016/9/29.
 */
import React, {
    Component,
    PropTypes
    } from 'react';

import classNames from 'classnames';
import '../../../resource/css/font-awesome.min.css';
import './activateview.css';

import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();

export default class activateview extends Component {
    constructor(props) {
        super(props);
        this.state={
            height:700,
            width:600,
            code:"12345",
            title_height:210,
            button_height:350,
            note_height:140,
            activated:false,
            notes:"Not Activate",
            cycle:30,
            interval:0,
            hide:"block",
        }
    }
    update_size(width,height){
        this.setState({height:height,width:width,title_height:height*0.3,button_height:height*0.5,note_height:height*0.2});

    }
    update_code(statcode){
        this.setState({code:"Code:"+statcode});
    }
    update_notes(notes){
        this.setState({notes:notes});
    }
    update_status(status){
        this.setState({activated:status});
    }
    hide(){
        this.setState({hide:"none"});
    }
    show(){
        this.setState({hide:"block"});
    }
    render() {
        let pad_value = this.state.height/50+"px "+this.state.height*0.1+"px";
        let button = <i className="fa fa-check" style={{padding:pad_value }}></i>;
        if(this.state.activated == false) button = <i className="fa fa-close" style={{padding:pad_value }}></i>;
        return (
            <div style={{position:"relative",background:"#62b900",height:this.state.height,width:'100%',display:this.state.hide}}>
                <div style={{position:"relative",width:'100%',height:this.state.title_height,textAlign : 'center',display:"table"}}>
                    <div className="unlocklabel" style={{position:"relative",width:"100%",height:this.state.title_height ,float:"left",fontSize:this.state.height/16,display:"table-cell",verticalAlign:"middle",margin:"auto"}} >{this.state.code}
                    </div>
                    <div style={{clear:"both"}}></div>
                </div>
                <div style={{position:"relative",width:'100%',height:this.state.button_height,textAlign : 'center',display:"table"}}>
                    <div className="lockbutton" style={{position:"relative",height:this.state.button_height, fontSize:this.state.height/3,float:"left",display:"table-cell",verticalAlign:"middle",margin:"auto"}} >
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