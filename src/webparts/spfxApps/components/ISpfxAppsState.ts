import { Item } from "sp-pnp-js";

export interface ISpfxAppsState {
    myApps: Element[],
    myPortal: Element[],
    showAplications: boolean,
    showPortals: boolean,
    viewAplications: Element[],
    viewPortals: Element[],
    userId: number,
    myListApps: any[],
    myListPortals: any[],
    listCountries: any[],
    selectCountries: Element[],
    listCompanies: any[],
    selectCompanies: any[],
    countrie: string,
    company: string,
    keyWord: string,
    alert: any,
    listApps: any[]
}
