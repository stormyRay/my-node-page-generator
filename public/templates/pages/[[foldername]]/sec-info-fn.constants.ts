import { Subject, Subscription, Observable } from "rxjs/Rx";


// tslint:disable-next-line:typedef
export const SecInfo[[entity name]]Names = {
	ID_TITLE: "title",
	ID_TABS: "tabs",
	ID_SAVE_BTN: "saveBtn",
	ID_CANCEL_BTN: "cancelBtn",
	ID_ROUTER_OUTLET: "routerOutlet",
	ID_NEW_BTN: "newBtn",
	ID_NEW_BTN_TOOLTIP: this.ID_NEW_BTN + "Tooltip",
	ID_EDIT_BTN: "editBtn",
	ID_[[const name]]ID: "[[id value]]",
	ID_[[const name]]NAME: "[[variable name]]Name",
	ID_SUMMARY_TILE: "summaryTile",
	ID_DROPDOWN: "dropdown",
	ID_GRID: "grid",
	ID_[[const name]]_TILE: "detail_Tile",
	NAME_TAB_TILE: "[[name literal]]"
};
// tslint:disable-next-line:typedef
export const SecInfo[[entity name]]StaticStates = {
	EMPTY_TITLE: "",
	GETDATA_REQUETS$: new Subject(),
	GETDATA_REQUETS$_SUBSRIPTION: Subscription.EMPTY,
	GETDATA_RETURNVALUE$: new Subject()
};
// tslint:disable-next-line:typedef
export const SecInfo[[entity name]]Literals = {
	[[const name]]: "[[name literal]]",
	[[const name]]S: "[[name literal]]s",
	TITLE_FOR_CREATE: "Add [[name literal]]",
	SEARCH_NAME: 'All [[name literal]]s',
	CREATE_SUCCESSFULLY: "[[entity name]] created",
	UPDATED_SUCCESSFULLY: "[[entity name]] updated"
};