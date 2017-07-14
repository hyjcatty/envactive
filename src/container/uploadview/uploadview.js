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
import '../../../resource/css/font-awesome.min.css';
import './uploadview.css';



export default class unlockview extends Component {
    constructor(props) {
        super(props);
        this.state={
            height:700,
            width:600,
            hide:"block",
            callback:null,
            id:""
        }
    }
    update_size(width,height){
        this.setState({height:height,width:width});

    }
    update_id(id){
        this.setState({id:id});
    }
    hide(){
        this.setState({hide:"none"});
    }
    show(){
        this.setState({hide:"block"});
    }
    render() {
        return (
            <div style={{position:"relative",background:"#ffffff",height:this.state.height,maxHeight:this.state.height,width:'100%',display:this.state.hide,overflow:'scroll',overflowX:'hidden'}}>
                <form encType="multipart/form-data" style={{position:"relative",height:this.state.height,maxHeight:this.state.height,width:'90%',marginLeft:this.state.width*0.05,marginTop:this.state.width*0.05}}>
                    <input id="file-zh" name="file-zh[]" type="file" multiple data-min-file-count="1"/>
                </form>
            </div>
        );
    }
}