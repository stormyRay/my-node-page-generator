import { UserSearches } from '../../models/user-searches.model';
import { Action } from '@ngrx/store';
import { type } from '../../common/type.util';
import { DataSource } from "../../common/DataSource";
import { [[entity name]] } from "../../models/[[import path]].model";
import { SortArgs } from "../../models/sort-args.model";
import { Filter } from "../../models/search.model";
import { PageInfo } from "../../ui-engine/page-info.model";
import { IGridFilter, IGridSelection, IGridSort } from '../../widgets/grid/grid.types';
import { EnumGridMode } from "../../widgets/grid/grid.types";
import { ResultSet } from "../../models/metadata.model";

export const ActionTypes: any = {
	SWITCH_PAGE_TO_VIEW_MODE_BEGIN: type("[Sec Info [[entity name]]] Switch to view mode begin"),
	SWITCH_PAGE_TO_VIEW_MODE_END: type("[Sec Info [[entity name]]] Switch to view mode end"),
	SWITCH_PAGE_TO_EDIT_MODE_BEGIN: type("[Sec Info [[entity name]]] Switch to edit mode begin"),
	SWITCH_PAGE_TO_EDIT_MODE_END: type("[Sec Info [[entity name]]] Switch to edit mode end"),
	SWITCH_PAGE_TO_CREATE_MODE_BEGIN: type("[Sec Info [[entity name]]] Switch to create mode begin"),
	SWITCH_PAGE_TO_CREATE_MODE_END: type("[Sec Info [[entity name]]] Switch to create mode end"),
	SWITCH_PAGE_TO_NONE_MODE: type("[Sec Info [[entity name]]] Switch to none mode"),
	SET_SUMMARY_PAGE_INFO: type("[Sec Info [[entity name]]] Set summary page info"),
	SET_SUMMARY_USER_SEARCHES: type("[Sec Info [[entity name]]] Set summary user searches"),
	SET_BUTTON_STATE: type("[Sec Info [[entity name]]] Set button state"),
	SET_[[const name]]S: type("[Sec Info [[entity name]]] Set [[entity name]]s"),
	SET_[[const name]]_ID: type("[Sec Info [[entity name]]] Set [[entity name]] id"),
	SET_SORTS: type("[Sec Info [[entity name]]] Set sorts"),
	SET_FILTERS: type("[Sec Info [[entity name]]] Set filters"),

	SET_DETAIL_PAGE_INFO: type("[Sec Info [[entity name]]] Set detail page info"),
	SET_DETAIL_TAB_SELECTED_INDEX: type("[Sec Info [[entity name]]] Set detail tab selected index"),
	SET_DETAIL_[[const name]]_GRID: type("[Sec Info [[entity name]]] Set detail [[entity name]] grid"),
	SET_DETAIL_SAVE_BUTTON_SPINNER: type("[Sec Info [[entity name]]] Set detail save button spinner")

};

export class SetSummaryPageInfoAction implements Action {
	type: string = ActionTypes.SET_SUMMARY_PAGE_INFO;
	constructor(public info: PageInfo) { }
}

export class SetDetailPageInfoAction implements Action {
	type: string = ActionTypes.SET_DETAIL_PAGE_INFO;
	constructor(public info: PageInfo) { }
}

export class SetDetailTabSelectedIndexAction implements Action {
	type: string = ActionTypes.SET_DETAIL_TAB_SELECTED_INDEX;
	constructor(public tabSelectedIndex: number) { }
}



export class SwitchPageToViewModeBeginAction implements Action {
	type: string = ActionTypes.SWITCH_PAGE_TO_VIEW_MODE_BEGIN;
	constructor(public [[id value]]: string) { }
}

export class SwitchPageToViewModeEndAction implements Action {
	type: string = ActionTypes.SWITCH_PAGE_TO_VIEW_MODE_END;
	constructor(public [[id value]]: string) { }
}

export class SwitchPageToEditModeBeginAction implements Action {
	type: string = ActionTypes.SWITCH_PAGE_TO_EDIT_MODE_BEGIN;
	constructor(public [[entity name]]ID: string) { }
}

export class SwitchPageToEditModeEndAction implements Action {
	type: string = ActionTypes.SWITCH_PAGE_TO_EDIT_MODE_END;
	constructor(public [[id value]]: string) { }
}

export class SwitchPageToCreateModeBeginAction implements Action {
	type: string = ActionTypes.SWITCH_PAGE_TO_CREATE_MODE_BEGIN;
}

export class SwitchPageToCreateModeEndAction implements Action {
	type: string = ActionTypes.SWITCH_PAGE_TO_CREATE_MODE_END;
}

export class SwitchPageToNoneModeAction implements Action {
	type: string = ActionTypes.SWITCH_PAGE_TO_NONE_MODE;
}

export class Set[[entity name]]sAction implements Action {
	type: string = ActionTypes.SET_[[const name]]S;
	constructor(public [[variable name]]s: DataSource<[[entity name]]>) {}
}

export class Set[[entity name]]IDAction implements Action {
	type: string = ActionTypes.SET_[[entity name]]_CODE;
	constructor(public [[id value]]: string) { }
}

export class SetSummaryUserSearchesAction implements Action {
	type: string = ActionTypes.SET_SUMMARY_USER_SEARCHES;
	constructor(public userSearches: ResultSet<UserSearches>) { }
}

export class SetSortsAction implements Action {
	type: string = ActionTypes.SET_SORTS;
	constructor(public sorts: IGridSort[]) { }
}

export class SetFiltersAction implements Action {
	type: string = ActionTypes.SET_FILTERS;
	constructor(public filters: IGridFilter[]) { }
}


export class SetDetailSaveButtonSpinnerState implements Action {
	type: string = ActionTypes.SET_DETAIL_SAVE_BUTTON_SPINNER;
	constructor(public spinner: boolean) { }
}

export class SetDetail[[entity name]]DataSource implements Action {
	type: string = ActionTypes.SET_DETAIL_[[const name]]_GRID;
	constructor(public ds: DataSource<[[entity name]]>) {}
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions =
	SwitchPageToViewModeBeginAction |
	SwitchPageToViewModeEndAction |
	SwitchPageToEditModeBeginAction |
	SwitchPageToEditModeEndAction |
	SwitchPageToCreateModeBeginAction |
	SwitchPageToCreateModeEndAction |
	SwitchPageToNoneModeAction |
	SetSummaryPageInfoAction |
	SetSummaryUserSearchesAction |
	Set[[entity name]]sAction |
		Set[[entity name]]IDAction |
			SetSortsAction |
			SetFiltersAction |
			SetDetailTabSelectedIndexAction |
			SetDetail[[entity name]]DataSource |
				SetDetailSaveButtonSpinnerState
	;
