/**
 * Created by hyj on 2016/12/22.
 */

/**
 * Created by hyj on 2016/9/29.
 */
import React, {
    Component,
    PropTypes
    } from 'react';

import classNames from 'classnames';
import Lockunit from './lockunit/lockunit';
import '../../../resource/css/font-awesome.min.css';
import './listview.css';



export default class unlockview extends Component {
    constructor(props) {
        super(props);
        this.state={
            height:700,
            width:600,
            locklist:[],
            key:"lockunit",
            hide:"block"
        }
    }
    update_size(width,height){
        this.setState({height:height,width:width});

    }

    update_locklist(locklist){
        this.setState({locklist:locklist});
        this.updateprop();
    }
    updateprop(){
        for(let i=0;i<this.state.locklist.length;i++) {
            this.refs[this.state.key + i].updateprop(this.state.locklist[i]);
            //console.log(this.state.Framelist[i]);
        }
    }
    hide(){
        this.setState({hide:"none"});
    }
    show(){
        this.setState({hide:"block"});
    }
    render() {
        let items = [];
        for(let i=0;i<this.state.locklist.length;i++){
            let tempkey = "lockunit"+i;
            if(i==0)
                items.push(<div key={this.state.key+i} style={{marginTop:0}}><Lockunit  ref={tempkey}/></div>);
            else
                items.push(<div key={this.state.key+i} style={{marginTop:this.state.margintop}}><Lockunit  ref={tempkey}/></div>);
        }
        return (
            <div style={{position:"relative",background:"#62b900",height:this.state.height,maxHeight:this.state.height,width:'100%',display:this.state.hide,overflow:'scroll',overflowX:'hidden'}}>
                {items}
            </div>
        );
    }
}