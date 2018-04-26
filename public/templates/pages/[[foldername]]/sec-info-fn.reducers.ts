import { INIT } from '@ngrx/store';
import { FilterDescriptor } from '@progress/kendo-data-query/dist/npm/main';
import { UserSearches } from '../../models/user-searches.model';
import { EnumGridMode, IGridFilter, IGridSelection, IGridSort } from '../../widgets/grid/grid.types';
import { EnumGridSortDirection } from '../../widgets/grid/grid.types';
import { DataSource } from '../../common/dataSource';
import { PageMode, ResultSet } from '../../models/metadata.model';
import *  as [[variable name]]Actions from './sec-info-[[file name]].actions';
import { SortArgs } from "../../models/sort-args.model";
import { Filter } from "../../models/search.model";
import { SummaryGridData } from "../../widgets/summary-grid.widget";
import {
	Set[[entity name]]sAction,
		Set[[entity name]]IDAction,
			SetDetail[[entity name]]DataSource,
				SetDetailPageInfoAction,
				SetDetailSaveButtonSpinnerState,
				SetDetailTabSelectedIndexAction,

				SetFiltersAction,
				SetSortsAction,
				SetSummaryPageInfoAction,
				SetSummaryUserSearchesAction
} from './sec-info-[[file name]].actions';
import * as root from '../../reducers';
import { [[entity name]] } from "../../models/[[import path]].model";
import { FormGroup } from '@angular/forms';
import { PageInfo } from "../../ui-engine/page-info.model";

import { SortDescriptor } from "@progress/kendo-data-query/dist/es/sort-descriptor";
import { CompositeFilterDescriptor } from "@progress/kendo-data-query/dist/es/filtering/filter-descriptor.interface";
import { SecInfo[[entity name]]Literals } from "./sec-info-[[file name]].constants";

export interface State {
	pageMode: PageMode;
	createButtonDisabledState: boolean;
	deleteButtonDisabledState: boolean;
	form: FormGroup;

	summary_pageInfo: PageInfo;
	summary_userSearches: ResultSet<UserSearches>;
	summary_gridDataSource: DataSource<[[entity name]]>;
	summary_myClassId: number;
	summary_pageContentId: number;
	summary_filters: IGridFilter[];
	summary_sorts: IGridSort[];


	editButtonDisabledState: boolean;
	editButtonHiddenState: boolean;

	saveButtonHiddenState: boolean;
	saveButtonSpinnerState: boolean;
	cancelButtonDisabledState: boolean;
	cancelButtonHiddenState: boolean;

	detail_pageInfo: PageInfo;
	detail_[[id value]]: string;
detail_[[variable name]]: DataSource<[[entity name]]>;
detail_tab_selected_index: number;
detail_inputs_readonly_state: boolean;

detail_title: string;

}

export const initialState: State = {
	pageMode: PageMode.None,
	createButtonDisabledState: false,
	deleteButtonDisabledState: false,
	form: null,

	summary_pageInfo: null,
	summary_userSearches: null,
	summary_gridDataSource: null,
	summary_myClassId: 0,
	summary_pageContentId: 0,
	summary_filters: [],
	summary_sorts: [{ fieldName: [[entity name]].Tags.[[entity name]]ID, direction: EnumGridSortDirection.Asc }],

	editButtonDisabledState: false,
	editButtonHiddenState: false,
	saveButtonHiddenState: true,
	saveButtonSpinnerState: false,
	cancelButtonDisabledState: false,
	cancelButtonHiddenState: true,
	detail_pageInfo: null,
	detail_[[id value]]: "",
	detail_[[variable name]]: null,
	detail_tab_selected_index: 0,
	detail_inputs_readonly_state: true,
	detail_title: SecInfo[[entity name]]Literals.TITLE_FOR_CREATE
};

/*
 * reducer for report.
 */
export function reducer(state: State = initialState, action: [[variable name]]Actions.Actions): State {

	switch (action.type) {
		case INIT:
			return Object.assign({}, state,
				{
					form: new FormGroup({})
				});

		case [[variable name]]Actions.ActionTypes.SET_SUMMARY_PAGE_INFO:
			let setSummaryPageInfoAction: SetSummaryPageInfoAction = action as SetSummaryPageInfoAction;
			return Object.assign({},
				state,
				{
					summary_pageInfo: setSummaryPageInfoAction.info
				});
		case [[variable name]]Actions.ActionTypes.SET_SUMMARY_USER_SEARCHES:
			let setSummaryUserSearches: SetSummaryUserSearchesAction = action as SetSummaryUserSearchesAction;
			return Object.assign({},
				state,
				{
					summary_userSearches: setSummaryUserSearches.userSearches
				});
		case [[variable name]]Actions.ActionTypes.SET_DETAIL_PAGE_INFO:
			let setDetailPageInfoAction: SetDetailPageInfoAction = action as SetDetailPageInfoAction;
			return Object.assign({},
				state,
				{
					detail_pageInfo: setDetailPageInfoAction.info
				});
		case [[variable name]]Actions.ActionTypes.SET_SORTS:
			let setSortAction: SetSortsAction = action as SetSortsAction;
			return Object.assign({},
				state,
				{
					summary_sorts: setSortAction.sorts
				}
			);

		case [[variable name]]Actions.ActionTypes.SET_FILTERS:
			let setFiltersAction: SetFiltersAction = action as SetFiltersAction;
			return Object.assign({},
				state,
				{
					summary_filters: setFiltersAction.filters
				}
			);


		case [[variable name]]Actions.ActionTypes.SET_[[const name]]S:
			let set[[entity name]]sAction: Set[[entity name]]sAction = action as Set[[entity name]]sAction;
			if (state.summary_gridDataSource && set[[entity name]]sAction.[[variable name]]s) {
				state.summary_gridDataSource.data(set[[entity name]]sAction.[[variable name]]s.pristineData());
				return state;
			}


			return Object.assign({},
				state,
				{
					summary_gridDataSource: set[[entity name]]sAction.[[variable name]]s
				}
			);

		case [[variable name]]Actions.ActionTypes.SET_[[const name]]_CODE:
			let set[[entity name]]IDAction: Set[[entity name]]IDAction = action as Set[[entity name]]IDAction;
			return Object.assign({},
				state,
				{
					detail_[[id value]]: set[[entity name]]IDAction.[[id value]]
				}
			);

		case [[variable name]]Actions.ActionTypes.SWITCH_PAGE_TO_VIEW_MODE_BEGIN:
			return state;

		case [[variable name]]Actions.ActionTypes.SWITCH_PAGE_TO_VIEW_MODE_END:
			return Object.assign({},
				state,
				{
					pageMode: PageMode.View,
					createButtonDisabledState: false,
					deleteButtonDisabledState: false,

					editButtonDisabledState: false,
					editButtonHiddenState: false,
					saveButtonHiddenState: true,
					saveButtonSpinnerState: false,
					cancelButtonDisabledState: true,
					cancelButtonHiddenState: true,

					form: new FormGroup({}),
					detail_inputs_readonly_state: true

				});

		case [[variable name]]Actions.ActionTypes.SWITCH_PAGE_TO_EDIT_MODE_BEGIN:
			return state;

		case [[variable name]]Actions.ActionTypes.SWITCH_PAGE_TO_EDIT_MODE_END:
			return Object.assign({},
				state,
				{
					pageMode: PageMode.Edit,
					createButtonDisabledState: true,
					deleteButtonDisabledState: true,

					editButtonDisabledState: true,
					editButtonHiddenState: true,
					saveButtonHiddenState: false,
					saveButtonSpinnerState: false,
					cancelButtonDisabledState: false,
					cancelButtonHiddenState: false,
					form: new FormGroup({}),
					detail_primary_key_input_disabled_state: true,
					detail_inputs_readonly_state: false

				});

		case [[variable name]]Actions.ActionTypes.SWITCH_PAGE_TO_CREATE_MODE_BEGIN:
			return state;

		case [[variable name]]Actions.ActionTypes.SWITCH_PAGE_TO_CREATE_MODE_END:
			return Object.assign({},
				state,
				{
					pageMode: PageMode.Create,
					createButtonDisabledState: true,
					deleteButtonDisabledState: true,

					editButtonDisabledState: true,
					editButtonHiddenState: true,
					saveButtonHiddenState: false,
					saveButtonSpinnerState: false,
					cancelButtonDisabledState: false,
					cancelButtonHiddenState: false,
					form: new FormGroup({}),
					detail_primary_key_input_disabled_state: false,
					detail_inputs_readonly_state: false,
					detail_title: SecInfo[[entity name]]Literals.TITLE_FOR_CREATE
				}
			);

		case [[variable name]]Actions.ActionTypes.SWITCH_PAGE_TO_NONE_MODE:
			return Object.assign({},
				state,
				{
					pageMode: PageMode.None,
					createButtonDisabledState: false,
					deleteButtonDisabledState: false,

					editButtonDisabledState: true,
					editButtonHiddenState: true,
					saveButtonHiddenState: true,
					saveButtonSpinnerState: false,
					cancelButtonDisabledState: true,
					cancelButtonHiddenState: true,
					detail_inputs_readonly_state: true
				}
			);

		case [[variable name]]Actions.ActionTypes.SET_DETAIL_SAVE_BUTTON_SPINNER:
			let setDetailSaveButtonSpinnerState: SetDetailSaveButtonSpinnerState = action as SetDetailSaveButtonSpinnerState;
			return Object.assign({},
				state,
				{
					saveButtonSpinnerState: setDetailSaveButtonSpinnerState.spinner
				});


		case [[variable name]]Actions.ActionTypes.SET_DETAIL_[[const name]]_GRID:
			let setDetail[[entity name]]Action: SetDetail[[entity name]]DataSource = action as SetDetail[[entity name]]DataSource;

			let title: string = state.detail_title;
			if (setDetail[[entity name]]Action.ds) {
				let item: [[entity name]] = setDetail[[entity name]]Action.ds.data()[0];
				if (item && item.[[entity name]]Name && item.[[entity name]]Name.length > 0) {
					title = setDetail[[entity name]]Action.ds.data()[0].[[entity name]]Name;
				}
			}
			return Object.assign({},
				state,
				{
					detail_[[variable name]]: setDetail[[entity name]]Action.ds,
					detail_title: title
				}
			);

		case [[variable name]]Actions.ActionTypes.SET_DETAIL_TAB_SELECTED_INDEX:
			let setDetailTabSelectedIndexAction: SetDetailTabSelectedIndexAction = action as SetDetailTabSelectedIndexAction;

			if (state.pageMode === PageMode.Create || state.pageMode === PageMode.None) {
				return state;
			}

			return Object.assign({},
				state,
				{
					detail_tab_selected_index: setDetailTabSelectedIndexAction.tabSelectedIndex
				});
		default:
			return state;
	}
}
