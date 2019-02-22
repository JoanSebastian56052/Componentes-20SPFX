import * as React from 'react';
import { ISpfxMailsProps } from './ISpfxMailsProps';
import { ISpfxMailsState } from './ISpfxMailsState';
import {SPComponentLoader} from '@microsoft/sp-loader'
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import * as jQuery from 'jquery';
import 'popper.js';
import 'bootstrap';

export default class SpfxMails extends React.Component<ISpfxMailsProps, ISpfxMailsState> {


  public constructor(props: ISpfxMailsProps) {
    super(props);
    SPComponentLoader.loadCss('https://suramericana.sharepoint.com/sites/sura/dwplabo/DTLRecursos/master/css/stylesSuraDwp.css')
    SPComponentLoader.loadCss('https://suramericana.sharepoint.com/sites/sura/dwplabo/DTLRecursos/master/css/bootstrap.min.css')
    SPComponentLoader.loadCss('https://suramericana.sharepoint.com/sites/sura/dwplabo/DTLRecursos/master/css/font-awesome.min.css')
    SPComponentLoader.loadCss('https://suramericana.sharepoint.com/sites/sura/dwplabo/DTLRecursos/master/css/normalice.css')
    SPComponentLoader.loadCss('https://suramericana.sharepoint.com/sites/sura/dwplabo/DTLRecursos/master/css/dataTables.bootstrap4.min.css')
    SPComponentLoader.loadCss('https://suramericana.sharepoint.com/sites/sura/dwplabo/DTLRecursos/master/css/animate.css')
    SPComponentLoader.loadCss('https://suramericana.sharepoint.com/sites/sura/dwplabo/DTLRecursos/master/css/owl.carousel.css')
    SPComponentLoader.loadCss('https://suramericana.sharepoint.com/sites/sura/dwplabo/DTLRecursos/master/css/suraLayout1.css')
    //SPComponentLoader.loadCss('https://suramericana.sharepoint.com/sites/sura/dwplabo/DTLRecursos/master/css/suraLayout2.css')
    //SPComponentLoader.loadCss('https://suramericana.sharepoint.com/sites/sura/dwplabo/DTLRecursos/master/css/suraLayout3.css')
    SPComponentLoader.loadCss('https://suramericana.sharepoint.com/sites/sura/dwplabo/DTLRecursos/master/css/menufullscreen.css')

    SPComponentLoader.loadCss('https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700|Roboto:400,700')

     
    SPComponentLoader.loadScript("https://suramericana.sharepoint.com/sites/sura/dwplabo/DTLRecursos/master/js/jquery-3.3.1.slim.min.js");
    SPComponentLoader.loadScript("https://suramericana.sharepoint.com/sites/sura/dwplabo/DTLRecursos/master/js/popper.min.js");
    SPComponentLoader.loadScript("https://suramericana.sharepoint.com/sites/sura/dwplabo/DTLRecursos/master/js/bootstrap.bundle.min.js"); 
    SPComponentLoader.loadScript("https://suramericana.sharepoint.com/sites/sura/dwplabo/DTLRecursos/master/js/jquery.min.js");
    SPComponentLoader.loadScript("https://suramericana.sharepoint.com/sites/sura/dwplabo/DTLRecursos/master/js/owl.carousel.js");
    SPComponentLoader.loadScript("https://suramericana.sharepoint.com/sites/sura/dwplabo/DTLRecursos/master/js/bootstrap.min.js");
    SPComponentLoader.loadScript("https://suramericana.sharepoint.com/sites/sura/dwplabo/DTLRecursos/master/js/jquery.dataTables.min.js");
     
    SPComponentLoader.loadScript("https://suramericana.sharepoint.com/sites/sura/dwplabo/DTLRecursos/master/js/dataTables.bootstrap4.min.js");
    SPComponentLoader.loadScript("https://suramericana.sharepoint.com/sites/sura/dwplabo/DTLRecursos/master/js/wow.min.js");
    SPComponentLoader.loadScript("https://suramericana.sharepoint.com/sites/sura/dwplabo/DTLRecursos/master/js/smoothscroll.js");  


      SPComponentLoader.loadScript('https://code.jquery.com/jquery-3.3.1.slim.min.js')
      SPComponentLoader.loadScript('https://getbootstrap.com/docs/4.2/dist/js/bootstrap.bundle.min.js')
    this.state = {
      mailsAll: [],
      mailsUnread: [],
    }
  }

  public componentDidMount(): void {
    let mensajesAll
    this.props.graphClient
      .api('/me/messages')
      .select('subject,bodyPreview,sender,isRead')
      .get()
      .then((result) => {
        let correos = []
        let sinCorreos = []
        mensajesAll = result.value
        let cantidad = 0
          for(let i = 0; i < mensajesAll.length; i ++) {
            if((!mensajesAll[i].isRead) && (cantidad < 5)) {
              correos.push(
                <li>
                  <span>
                    {mensajesAll[i].subject}
                  </span>
                  <h4>
                    {mensajesAll[i].sender.emailAddress.name}
                  </h4>
                  <p>
                    {mensajesAll[i].bodyPreview}
                  </p>
                </li>
              )
              cantidad = cantidad + 1
            }
          }
        if(cantidad === 0) {
          sinCorreos.push(
            <li>
              <span>
                URRAAA!!. No tienes mensajes sin leer.
              </span>
            </li>
          )
          this.setState({
            mailsUnread: sinCorreos
          })
        } else {
          this.setState({
            mailsUnread: correos
          })
        }
        
      })
    
    let mensajes
    this.props.graphClient
      .api('/me/messages')
      .select('subject,bodyPreview,sender,isRead')
      .get()
      .then((result) => {
        let correos = []
        let sinCorreos = []
        mensajes = result.value
        let cantidad
        if(mensajes.length < 5) {
          cantidad = mensajes.length
        } else {
          cantidad = 5
        }
        for(let i = 0; i < cantidad; i ++) {
            correos.push(
              <li>
                <span>
                  {mensajes[i].subject}
                </span>
                <h4>
                  {mensajes[i].sender.emailAddress.name}
                </h4>
                <p>
                  {mensajes[i].bodyPreview}
                </p>
              </li>
            )
          }
          if(cantidad === 0) {
            sinCorreos.push(
              <li>
                <span>
                  UPSS!!. No tienes mensajes.
                </span>
              </li>
            )
            this.setState({
              mailsAll: sinCorreos
            })
          } else {
            this.setState({
              mailsAll: correos
            })
          }
          
      })
  }

  public render(): React.ReactElement<ISpfxMailsProps> {
    return (
      <div className="row">                  
        <div className="col-md-9 bg-correo-onedrive animated fadeInRight">
          <h2 className="trn" data-trn-key="Correo_Personal">Correo personal</h2>
          <div className="row">
              <div className="col-md-7">
                  <div className="sura-correos">
                      <ul className="nav nav-tabs" id="suraCorreos" role="tablist">
                          <li className="nav-item">
                              <a className="nav-link active" id="home-tab" data-toggle="tab" href="#todos" role="tab" aria-controls="home" aria-selected="true">Todos</a>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link" id="profile-tab" data-toggle="tab" href="#sinleer" role="tab" aria-controls="profile" aria-selected="false">Sin Leer</a>
                          </li>
                      </ul>
                      <div className="tab-content" id="myTabContent">
                          <div className="tab-pane fade show active" id="todos" role="tabpanel" aria-labelledby="todos">
                              <ul className="sura-lista-correos">
                                  {this.state.mailsAll}
                              </ul>
                          </div>
                          <div className="tab-pane fade" id="sinleer" role="tabpanel" aria-labelledby="sinleer">
                              <ul className="sura-lista-correos">
                                  {this.state.mailsUnread}
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
    );
  }
}

