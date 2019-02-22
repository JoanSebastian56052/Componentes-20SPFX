import * as React from 'react';
import { ISpfxAppsProps } from './ISpfxAppsProps';
import pnp, { Items, Item } from "sp-pnp-js";
import {
  ISpfxAppsState
} from './ISpfxAppsState'
import {SPComponentLoader} from '@microsoft/sp-loader'
import * as jQuery from 'jquery';
import 'popper.js';
import 'bootstrap';
import Modal from 'react-responsive-modal';

export default class SpfxApps extends React.Component<ISpfxAppsProps, ISpfxAppsState> {
  constructor(props: ISpfxAppsProps) {
    super(props)
    SPComponentLoader.loadCss('https://suramericana.sharepoint.com/sites/sura/dwplabo/DTLRecursos/master/css/stylesSuraDwp.css')
    SPComponentLoader.loadCss('https://suramericana.sharepoint.com/sites/sura/dwplabo/DTLRecursos/master/css/bootstrap.min.css')
    SPComponentLoader.loadCss('https://suramericana.sharepoint.com/sites/sura/dwplabo/DTLRecursos/master/css/font-awesome.min.css')
    SPComponentLoader.loadCss('https://suramericana.sharepoint.com/sites/sura/dwplabo/DTLRecursos/master/css/normalice.css')
    SPComponentLoader.loadCss('https://suramericana.sharepoint.com/sites/sura/dwplabo/DTLRecursos/master/css/dataTables.bootstrap4.min.css')
    SPComponentLoader.loadCss('https://suramericana.sharepoint.com/sites/sura/dwplabo/DTLRecursos/master/css/animate.css')
    SPComponentLoader.loadCss('https://suramericana.sharepoint.com/sites/sura/dwplabo/DTLRecursos/master/css/owl.carousel.css')
    SPComponentLoader.loadCss('https://suramericana.sharepoint.com/sites/sura/dwplabo/DTLRecursos/master/css/suraLayout1.css')
    SPComponentLoader.loadCss('https://suramericana.sharepoint.com/sites/sura/dwplabo/DTLRecursos/master/css/suraLayout2.css')
    SPComponentLoader.loadCss('https://suramericana.sharepoint.com/sites/sura/dwplabo/DTLRecursos/master/css/suraLayout3.css')
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
 

    
    this.state = {
      myApps: [],
      myListApps: [],
      myPortal: [],
      myListPortals: [],
      showAplications: false,
      showPortals: false,
      viewAplications: [],
      viewPortals: [],
      userId: 0
    }
  }

  public componentDidMount(): void {
    let email = this.props.context.pageContext.user.email
    this.getUserId(email)
  }

  private showOptionsPortal= (): void => {
    this.setState({
      showPortals: true
    })

  }

  private showOptionsAplications = (): void => {

    this.setState({
      showAplications: true
    })
  }

  private closeOptionAplication = (): void => {
    this.setState({
      showAplications: false
    })
  }

  private closeOptionPortal = (): void => {
    this.setState({
      showPortals: false
    })
  }

  private getUserId(email): void {
    pnp.sp.site.rootWeb.ensureUser(email).then(result => {
      this.setState({
        userId: result.data.Id
      })
    })
  }

  private getListSites(userId): void {
    pnp.sp.web.lists.getByTitle("Configuración Perfil").items
    .filter('UsuarioId eq '+userId)
    .get().then((item) => {
      let splitApp = item[0].Aplicaciones.split(',')
      let splitPor = item[0].Portales.split(',')
      this.setState({
        myListApps: splitApp,
        myListPortals: splitPor
      })
    })
  }

  private getMyPortal(): Element[] {
    this.getListSites(this.state.userId)
    pnp.sp.web.lists.getByTitle("Portales Sura").items.get().then((portals: any[]) => {
      let myList = this.state.myListPortals
      let port =[]
          portals.forEach((portal) => {
            port.push(
              <div className="col-4 col-sm-3 mr-md-3 mt-md-3">
                <a href={portal.URL}>
                  <img src={portal.Imagen.Url} alt={portal.Imagen.Description} className="img-fluid"/>
                  <p>
                    {portal.Title}
                  </p>
                </a>
              </div>
            )
          })
          
        let myportal = []
        let cantPortal = myList.length
        for(let i = 0; i < cantPortal; i++) {
          let aux = myList[i]
          myportal.push(port[aux - 1])
        }
        this.setState({
          myPortal: myportal
        })
      }) 
    return(this.state.myPortal)
  }

  private  getMyApps(): Element[] {
    this.getListSites(this.state.userId)
    pnp.sp.web.lists.getByTitle("Aplicaciones Sura").items.get().then((apps: any[]) => {
      let myList = this.state.myListApps
      let aplication =[]
          apps.forEach((app) => {
            aplication.push(
              <div className="col-4 col-sm-3 mr-md-3 mt-md-3">
                <a href={app.URL}>
                  <img src={app.Imagen.Url} alt={app.Imagen.Description} className="img-fluid"/>
                  <p>
                    {app.Title}
                  </p>
                </a>
              </div>
            )
          })
          
        let myapp = []
        let cantApp = myList.length
        for(let i = 0; i < cantApp; i++) {
          let aux = myList[i]
          myapp.push(aplication[aux - 1])
        }
        this.setState({
          myApps: myapp
        })
      }) 
    return(this.state.myApps)
  }

  private getAllAplications(): Element[] {
    //Compa_x00f1__x00ed_aId
    //Pa_x00ed_sId
    pnp.sp.web.lists.getByTitle("Aplicaciones Sura").items.get().then((apps: any[]) => {
      let aplications = []
      apps.forEach((app) => {
        aplications.push(
          <tr>
            <th scope="row">{app.Title}</th>
            <td>{app.Pa_x00ed_sId}</td>
            <td>{app.Compa_x00f1__x00ed_aId}</td>
            <td className="text-center">
                <label className="switch switch-small">
                    <input type="checkbox" id={app.Id} checked={false} value={app.Id}/>
                    <span></span>
                </label>
            </td>
          </tr>
        )
      })
      this.setState({
        viewAplications: aplications
      })
    })
    return(this.state.viewAplications)
  }

  public render(): React.ReactElement<ISpfxAppsProps> {
    let myApps = this.getMyApps()
    let myPortals = this.getMyPortal()
    let viewAplications = this.getAllAplications()
    return (
          <article className="clearfix mt-4 mb-4 suraAppsOf365">
            <div className="container">
              <div className="row pt-5 pb-5 border-bottom">
                <div className="col-md-12">
                  <h2 className="trn" data-trn-key="Productividad" >
                    Productividad
                  </h2>
                  <p className="trn" data-trn-key="Parrafo_Productividad">
                    Lo que tenga que ser será, a su tiempo y en su momento, porque el destino es incierto y a veces simplemente los vientos no soplan a nuestro favor ni nuestras velas están por la labor de izarse a pesar de nuestro empeño.
                  </p>
                </div>

                <div className="col-md-6 animated fadeInLeft  mb-4">
                  <div className="row justify-content-start align-content-center text-center">
                    {myApps}
                    <div className="col-12 mt-5 text-left">
                      <button type="button" className="btn btn-outline-primary" onClick={this.showOptionsAplications}>Personalizar Aplicaciones</button>
                      <Modal open={this.state.showAplications} onClose={this.closeOptionAplication} center>
                        <div className="modal-dialog modal-xl">
                          <div className="modal-content">
                              <div className="modal-header">
                                  <h5 className="modal-title" id="exampleModalLongTitle">Aplicaciones</h5>
                              </div>
                              <div className="modal-body">
                                  <div className="row">
                                      <div className="col-12">
                                          <form action="">
                                              <div className="form-row align-items-end">
                                                  <div className="form-group col-md-3">
                                                      <label>País</label>
                                                      <input className="form-control" type="text" placeholder="País"/>
                                                  </div>
                                                  <div className="form-group col-md-3">
                                                      <label>Compañía</label>
                                                      <input className="form-control" type="text" placeholder="Categoría"/>
                                                  </div>
                                                  <div className="form-group col-md-4">
                                                      <label>palabras claves</label>
                                                      <input className="form-control" type="text" placeholder="Palabras clave"/>
                                                  </div>
                                                  <div className="col-auto pb-2">
                                                      <button type="submit" className="btn btn-primary mb-2">Buscar</button>
                                                  </div>
                                              </div>
                                          </form>
                                      </div>
                                      <div className="col-12">
                                          <div className="table-responsive-xl">
                                              <table className="table table-striped table-hover" id="suratbls">
                                                  <thead className="thead-dark">
                                                      <tr>
                                                          <th scope="col">Nombre</th>
                                                          <th scope="col">País</th>
                                                          <th scope="col">Compañía</th>
                                                          <th scope="col"  className="text-center w-25">Acciones</th>                                                          }
                                                      </tr>
                                                  </thead>
                                                  <tbody>
                                                      {viewAplications}
                                                  </tbody>
                                              </table>
                                          </div>
                                      </div>                   
                                  </div>
                              </div>
                              <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary" onClick={this.closeOptionAplication}>Cerrar</button>
                                  <button type="button" className="btn btn-primary">Guardar Cambios</button>
                              </div>
                          </div>
                      </div>
                      </Modal>
                    </div> 
                  </div>
                </div>

                <div className="col-md-6 animated fadeInRight">
                  <div className="row justify-content-start align-content-center text-center">
                    {myPortals}
                    <div className="col-12 mt-5 text-left">
                      <button type="button" className="btn btn-outline-primary" onClick={this.showOptionsPortal}>Personalizar Portales Sura</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        
    );
  }
}
