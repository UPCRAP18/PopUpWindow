import * as React from 'react';
import styles from './PopUpWindow.module.scss';
import { IPopUpWindowProps } from './IPopUpWindowProps';
import { escape } from '@microsoft/sp-lodash-subset';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Modal} from 'react-bootstrap';
import {isMobile} from 'react-device-detect';

class PopUpWindow extends React.Component<IPopUpWindowProps, any> {
  constructor(props){
    super(props);
    this.state = {
      showModal:false,
      window_size : Number,
      hideFrame:true
    }
  }

  public componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', ()=>{ this.setState({ window_size: window.innerWidth }) });
  }
  
  public componentWillUnmount() {
    window.removeEventListener('resize', ()=>{ this.setState({ window_size: window.innerWidth }) });
  }
  
  updateWindowDimensions() {
    this.setState({ window_size: window.innerWidth });
  }

  public render(): React.ReactElement<IPopUpWindowProps> {
    var div_style;
    if (this.props.align === "right"){
      div_style = {
        width:'100%',
        textAlign: 'right'
      };
    }else if (this.props.align === "left"){
      div_style = {
        width:'100%',
        textAlign: 'left'
      };
    }else {
      div_style = {
        width:'100%',
        textAlign: 'center'
      };
    }
    return (
      <div style={div_style}>
        <Button variant="info" style={{ minWidth:"86px", minHeight:"32px"}} onClick={()=>{
          if (isMobile || this.state.window_size < 600){
            window.open(`${this.props.url}`, "_blank");
          }else {
            this.setState({ showModal:true });
          }
        }}>{this.props.title}</Button>
        <Modal show={this.state.showModal} onHide={()=>{this.setState({ showModal: false});}}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body style={{height:"78vmin"}}>
            <iframe src={this.props.url} width="100%" height="100%"/>
          </Modal.Body>
        </Modal>
      </div>

    );
  }
}

export default PopUpWindow;
