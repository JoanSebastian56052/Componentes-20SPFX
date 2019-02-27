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
import Swal from 'sweetalert2'


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
 

    
    this.state = {
      myApps: [],
      myListApps: [],
      myPortal: [],
      myListPortals: [],
      showAplications: false,
      showPortals: false,
      viewAplications: [],
      viewPortals: [],
      userId: 0,
      listCountries: [],
      selectCountries: [],
      listCompanies: [],
      selectCompanies: [],
      countrie: '0',
      company: '0',
      keyWord: '',
      alert: '',
      listApps: []
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
    let countries = this.getListCountries()
    let companies = this.getListCompanies()
    let myListApps = this.state.myListApps
    let listAplications = this.getListApps()
    let viewAplications = []
    listAplications.forEach((app) => {
      viewAplications.push(
        <tr>
          <th scope="row">{app.Title}</th>
          <td>{countries[app.Pa_x00ed_sId - 1]}</td>
          <td>Vida</td>
          <td className="text-center">
              <label className="switch switch-small">
                  <input type="checkbox" value="0"/>
                  <span></span>
              </label>
          </td>
      </tr>
      )
    })
    return(this.state.viewAplications)
  }

  private getListCountries(): any[] {
    pnp.sp.web.lists.getByTitle("Paises").items.get().then((countries: any[]) => {
      let lcountries = []
      countries.forEach((countrie) => {
        lcountries.push(countrie.Title)
      })
      
      this.setState({
        listCountries: lcountries
      })
    })
    return(this.state.listCountries)
  }

  private getListCompanies(): any[] {
    pnp.sp.web.lists.getByTitle("Compañías").items.get().then((companies: any[]) => {
      let lcompanies = []
      companies.forEach((countrie) => {
        lcompanies.push(countrie.Title)
      })
      this.setState({
        listCountries: lcompanies
      })
    })
    return(this.state.listCompanies)
  }

  private getSelectCountries(): Element[] {
    pnp.sp.web.lists.getByTitle("Paises").items.get().then((countries: any[]) => {
      let arrayCountries = []
      countries.forEach((countrie) => {
        arrayCountries.push(
          <option value={countrie.Id}>
            {countrie.Title}
          </option>
        )
      })
      this.setState({
        selectCountries: arrayCountries
      })
    })
    return(this.state.selectCountries)
  }

  private takeCountrie = (event): void => {
    this.setState({
      countrie: event.target.value
    })
  }

  private takeCompany = (event): void => {
    this.setState({
      company: event.target.value
    })
  }

  private takeKeyWord = (event): void => {
    this.setState({
      keyWord: event.target.value
    })
  }

  private getSelectCompanies(): Element[] {
    let countrie = this.state.countrie
    pnp.sp.web.lists.getByTitle("Compañías").items.filter('Pa_x00ed_sId eq '+countrie)
    .get().then((companies: any[]) => {
      let arrayCompanies = []
      companies.forEach((company) => {
        arrayCompanies.push(
          <option value={company.Id}>
            {company.Title}
          </option>
        )
      })
      this.setState({
        selectCompanies: arrayCompanies
      })     
    })
    return(this.state.selectCompanies)
  }

  private searchApps = (): void => {
    console.log(this.state.countrie, this.state.company, this.state.keyWord)
  }

  private saveAlert = (): void => {
    const swalWithBootstrapButtons = Swal.mixin({
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn btn-secondary',
      buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: "No podrás revertir esto.!",
      type: 'info',
      showCancelButton: true,
      confirmButtonText: 'Si, guardar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.saveChanges()
        swalWithBootstrapButtons.fire(
          'Guardado!',
          'Tu configuracion ha sido guardada con exito.',
          'success'
        )
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado!',
          'Tu configuracion esta segura y sin cambios :)',
          'info'
        )
      }
    })
  }

  private saveChanges = (): void => {
    console.log("entre")
  }
  private getListApps(): any[] {
    pnp.sp.web.lists.getByTitle("Aplicaciones Sura").items.get().then((apps: any[]) => {
      let aplications = []
      aplications.push(apps)
      this.setState({
        listApps: aplications
      })
    })
    return(this.state.listApps)
  }

  private takeSelect = (event): void => {

  }

   public render(): React.ReactElement<ISpfxAppsProps> {
    let myApps = this.getMyApps()
    let myPortals = this.getMyPortal()
    let listCountries = this.getSelectCountries()
    let listCompanies
    if(this.state.countrie != this.props.firstItemSelect) {
      listCompanies = this.getSelectCompanies()
    }
    //let viewAplications = this.getAllAplications()
    
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
                                                      <select className="form-control" onChange={this.takeCountrie}>
                                                        <option value="0">
                                                          --Seleccione--
                                                        </option>
                                                        {}
                                                      </select>
                                                  </div>
                                                  <div className="form-group col-md-3">
                                                      <label>Compañía</label>
                                                      <select className="form-control" onChange={this.takeCompany}>
                                                        <option value="0">
                                                          --Seleccione--
                                                        </option>
                                                        {}
                                                      </select>
                                                  </div>
                                                  <div className="form-group col-md-4">
                                                      <label>Palabras Claves</label>
                                                      <input className="form-control" type="text" placeholder="Palabras clave" onChange={this.takeKeyWord}/>
                                                  </div>
                                                  <div className="col-auto pb-2">
                                                      <button type="button" className="btn btn-primary mb-2" onClick={this.searchApps}>Buscar</button>
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
                                                      {}
                                                  </tbody>
                                              </table>
                                          </div>
                                      </div>                   
                                  </div>
                              </div>
                              <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary" onClick={this.closeOptionAplication}>Cerrar</button>
                                  <button type="button" className="btn btn-primary" onClick={this.saveAlert}>Guardar Cambios</button>
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
