import { IContextMenuItemClickEvent } from '../../widgets/context-menu/context-menu.widget';
import { IGridFilter, IGridSelection, IGridSort, IGridWidgetOptions } from '../../widgets/grid/grid.types';
import { ITitleWidgetOptions } from '../../widgets/title.widget';
import { [[entity name]] } from '../../models/[[import path]].model';
import { EnumGridSortDirection } from '../../widgets/grid/grid.types';
import { ILabelDropdownWidgetOptions } from '../../widgets/inputs/label-dropdown.widget';
import { PermissionTypes } from '../../models/profile-user-permissions.model';
import { IButtonWidgetOptions } from '../../widgets/button.widget';
import { ILayout } from '../../ui-engine/layout.interface';
import { UserSearches } from '../../models/user-searches.model';
import { ResultSet, PageType } from '../../models/metadata.model';
import { PageLayout } from '../../ui-engine/page.layout';
import { FrameworkMeatballService } from '../../services/framework.meatball.service';
import { PageParameters } from '../../models/page-parameters.model';
import { PageHandlerBase } from "../../ui-engine/page-handler-base";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { SecInfo[[entity name]]Names, SecInfo[[entity name]]StaticStates, SecInfo[[entity name]]Literals } from "./sec-info-[[file name]].constants";
import { SecInfo[[entity name]]Layout } from "./sec-info-[[file name]].layout";
import { SecInfo[[entity name]]PageService } from "./sec-info-[[file name]].page.service";
import { State } from "./sec-info-[[file name]].reducers";
import { PageOnDestroy, PageOnInit } from '../../ui-engine/page-lifecycle.hooks';
import { Subscription } from 'rxjs';
@Injectable()
export class SecInfo[[entity name]]Handler extends PageHandlerBase implements PageOnDestroy, PageOnInit {
	private tooltipStatusSubscription: Subscription;
	pageOnInit(pageParameters ?: PageParameters): void {
		this.setupGetDataAPISubscription();
		this.initPageInfo(pageParameters);
		this._service.setFilterState([]);
		this._service.setSortState([{ fieldName: [[entity name]].Tags.[[entity name]]ID, direction: EnumGridSortDirection.Asc }]);
		this._service.setDetail[[entity name]]DataSourceState(null);
		this.prepareMeatballData(PageType.Summary);
	}
	pageOnDestroy(): void {
		if(!SecInfo[[entity name]]StaticStates.GETDATA_REQUETS$_SUBSRIPTION.closed) {
			SecInfo[[entity name]]StaticStates.GETDATA_REQUETS$_SUBSRIPTION.unsubscribe();
			SecInfo[[entity name]]StaticStates.GETDATA_REQUETS$_SUBSRIPTION = Subscription.EMPTY;
		}
		if(this.tooltipStatusSubscription && !this.tooltipStatusSubscription.closed) {
		this.tooltipStatusSubscription.unsubscribe();
		this.tooltipStatusSubscription = null;
	}
}
constructor(
	private _service: SecInfo[[entity name]]PageService,
	meatballService: FrameworkMeatballService) {
	super(meatballService);
}
getData(pageParameters: PageParameters): Observable < any > {

	let result: Observable<any> = Observable.zip(SecInfo[[entity name]]StaticStates.GETDATA_RETURNVALUE$,
		this._service.loadPermission(pageParameters.restrictionClassId),
		() => ''
	);
	this._service.refresh[[entity name]]s();
		return result;
}



getChildPageName(): Observable < string > {
	return Observable.of("SecInfo[[entity name]]Detail");
}

getEmptyTitle(): string {
	return this._service.getEmptyTitle();
}

getLayout(pageParameters: any): PageLayout {
	let pageLayout: any = SecInfo[[entity name]]Layout.getLayout();
	return pageLayout;
}


prepareLayout(pageState: State, pageLayout: PageLayout): void {
	this.prepareCreateButton();
	this.prepareDropdown();
	this.prepareGrid();
	this.prepareTitle(SecInfo[[entity name]]Literals.[[const name]]S);
	this._service.setEmptyPageEntityTypeName(pageState.summary_gridDataSource.getDataModel().displayName);

}
	private initPageInfo(pageParameters: PageParameters): void {
	this._service.setPageInfoState({
		pageId: pageParameters.pageId,
		linkField: pageParameters.linkField,
		pageName: pageParameters.pageName,
		caption: pageParameters.caption,
		restrictionClassId: pageParameters.restrictionClassId,
		tileParameters: pageParameters.tileParameters,
		pageMode: pageParameters.pageMode
	});
}

	private setupGetDataAPISubscription(): void {
	if(SecInfo[[entity name]]StaticStates.GETDATA_REQUETS$_SUBSRIPTION.closed) {
		SecInfo[[entity name]]StaticStates.GETDATA_REQUETS$_SUBSRIPTION = SecInfo[[entity name]]StaticStates
			.GETDATA_REQUETS$
			.throttleTime(200)
			.switchMap(() => this._service.get[[entity name]]s())
			.subscribe(() => { SecInfo[[entity name]]StaticStates.GETDATA_RETURNVALUE$.next(); }, (e: Error) => this._service.showErrorMessage(e));
	}
}
	private prepareCreateButton(): void {
	let btnNew: any = this.findLayout(SecInfo[[entity name]]Names.ID_NEW_BTN);
	let btnCreateOptions: IButtonWidgetOptions = btnNew.options as IButtonWidgetOptions;

	let hiddenState: Observable<boolean> =
	this._service.getSummaryPageInfoState$()
		.pluck("restrictionClassId")
		.map((restrictionClassId: number) => {
			return this._service.checkPermission(PermissionTypes.Create, restrictionClassId);
		})
		.map((hasPermission: boolean) => {
			return !hasPermission;
		});

	let btnCreateDisabledState: Observable<boolean>
			= this._service.getCreate[[entity name]]ButtonDisableState$();
		this.tooltipStatusSubscription = btnCreateDisabledState.subscribe((disable: boolean) => {
		btnCreateOptions.tooltipOptions.disabled = !disable;
	}, this._service.showErrorMessage);
	Object.assign(
		btnCreateOptions,
		{
			hidden: hiddenState,
			disabled: btnCreateDisabledState,
			buttonClickCB: (): void => {
				this._service.switchToCreateMode();
			}
		}
	);
}


	private prepareDropdown(): void {
	let userSearches: UserSearches = new UserSearches();
	userSearches.SearchName = SecInfo[[entity name]]Literals.SEARCH_NAME;
	let search: { Data: any, Metadata: any } = {
	Data: [userSearches],
		Metadata: []
};
let dropdown: any = this.findLayout(SecInfo[[entity name]]Names.ID_DROPDOWN);
let dropdownOptions: ILabelDropdownWidgetOptions = dropdown.options as ILabelDropdownWidgetOptions;
let defaultValue: string = "";
if (search && search.Data) {
	search.Data.forEach((item: any) => {
		item.SearchID = item.SearchID + "";
	});

	if (search.Data.length > 0) {
		defaultValue = search.Data[0].SearchID + "";
	}
}
Object.assign(
	dropdownOptions,
	{
		dataItems: search.Data,
		idField: UserSearches.Tags.SearchID,
		displayField: UserSearches.Tags.SearchName,
		defaultId: defaultValue,
		disabled: Observable.of(true)
	} as ILabelDropdownWidgetOptions
);
	}
	private prepareGrid(): void {
	let btnCreateDisabledState: Observable<boolean>
			= this._service.getCreate[[entity name]]ButtonDisableState$();
		let btnDeleteDisabledState: Observable<boolean>
			= this._service.getDelete[[entity name]]ButtonDisableState$();
		let grid: ILayout = this.findLayout(SecInfo[[entity name]]Names.ID_GRID);

	let options: IGridWidgetOptions<[[entity name]]> = grid.options as IGridWidgetOptions<[[entity name]]>;

	if(options) {
		Object.assign(options, {
			dataSource: this._service.getSummaryGridState$(),
			actionsButtonOptions: {
				disabled: Observable.of(true)
			},
			selectionChange: (selections: IGridSelection[]) => {
				if (selections && selections.length > 0) {
					let [[id value]]: string = selections[0].primaryKeyValue;
					this._service.switchToViewMode([[id value]]);
				}
			},
			filterChange: (e: IGridFilter[]) => {
				this._service.setFilterState(e);
			},
			sortChange: (e: IGridSort[]) => {
				this._service.setSortState(e);
			},

			defaultFilters: this._service.getFiltersState$(),
			defaultSorts: this._service.getSortsState$()
		});

		let b: boolean = this._service.checkPermission(PermissionTypes.Write, this.pageMetadata.restrictionClassId);
		if (b) {
			Object.assign(options, {
				rowContextMenuOptions: {
					items: [
						{
							actionId: 'Insert',
							text: `Add a [[name literal]]`,
							disabled: btnCreateDisabledState
						},
						{
							actionId: 'Delete',
							text: `Delete a [[name literal]]`,
							disabled: btnDeleteDisabledState
						}
					],
					itemClickCB: (e: IContextMenuItemClickEvent) => {
						switch (e.actionId) {
							case 'Insert':
								this._service.switchToCreateMode();
								break;
							case 'Delete':
								let eventId: string = e.actionId;
								let contextData: any = e.contextData;
								switch (eventId) {
									case "Delete":
										this._service.tryDelete[[entity name]](contextData._data);
										break;
									default:
										break;
								}
								break;
							default:
						}
					}
				}
			});
		}
	}
}
	private prepareTitle(caption: string): void {

	let title: ILayout = this.findLayout(SecInfo[[entity name]]Names.ID_TITLE);
	let titleOptions: ITitleWidgetOptions = title.options as ITitleWidgetOptions;
	titleOptions.title = caption;
}
}
