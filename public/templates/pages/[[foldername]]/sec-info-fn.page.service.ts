import { FormGroup } from '@angular/forms/forms';

import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable, Subscription } from 'rxjs/Rx';
import { FrameworkMeatballService } from '../../services/framework.meatball.service';
import { ProfileService } from '../../services/profile.service';
import { SearchService } from '../../services/search.service';
import * as fromRoot from '../../reducers';
import { EnumGridMode, IGridFilter, IGridSelection, IGridSort } from '../../widgets/grid/grid.types';
import * as actions from './sec-info-[[file name]].actions';
import { [[entity name]]Service } from "../../services/[[file name]].service";
import { NotificationHandler } from "../../common/notification-handler";
import { FrameworkDialogService, DialogType } from "../../services/framework.dialog.service";
import { FrameworkDirtyCheckService } from "../../services/framework.dirty-check.service";
import { LoadingBarHandler } from "../../common/loading-bar-handler";
import { PageRouteService } from "../page-route.service";
import { [[entity name]] } from "../../models/[[import path]].model";
import { ComparisonOperators, Filter, Search } from '../../models/search.model';
import { ApxSearchHelper } from "../../common/apx-search-helper";
import { SortArgs } from "../../models/sort-args.model";
import { PageMode, PagingInfo, ResultSet, ResultSetOption, RowDef, RowDefField } from '../../models/metadata.model';
import { DataSource } from "../../common/DataSource";
import { UserSearches } from "../../models/user-searches.model";
import { PageInfo } from "../../ui-engine/page-info.model";
import { ConfigurationService } from "../../services/configuration.service";
import { ApxApp } from "../../apx.app";
import { DBActions } from "../../models/dbaction.model";
import { ApxUtility } from "../../common/apx-utility";
import { PermissionTypes } from "../../models/profile-user-permissions.model";
import { EnumGridSortDirection } from '../../widgets/grid/grid.types';
import { EmptyPageService } from "../../ui-engine/empty-page.service";
import { SecInfo[[entity name]]StaticStates, SecInfo[[entity name]]Literals } from "./sec-info-[[file name]].constants";
import { PageContextService } from '../../services/page-context.service';

const SAVEBOUNDREVENUESOURCE: string = "save bound revenue source";
const DELETEBOUNDREVENUESOURCE: string = "delete bound revenue source";

@Injectable()
export class SecInfo[[entity name]]PageService {

	constructor(
		private _store: Store < fromRoot.State >,
		private _router: Router,
		private _svc: [[entity name]]Service,
		private _profileSvc: ProfileService,
		private _notify: NotificationHandler,
		private _meatballService: FrameworkMeatballService,
		private _dialogService: FrameworkDialogService,
		private _dirtyCheckSvc: FrameworkDirtyCheckService,
		private _loadingBarHandler: LoadingBarHandler,
		private _emptyPageService: EmptyPageService,
		private _pageContext: PageContextService
	) {



	}
	public refresh[[entity name]]s(): void {
		SecInfo[[entity name]]StaticStates.GETDATA_REQUETS$.next();
	}

	/*
	 * get observable state.
	 */


	public getFormState$(): Observable < FormGroup > {
		return this._store.select("ui", "secInfo[[entity name]]", "form");
	}

	public getSummaryPageInfoState$(): Observable < PageInfo > {
		return this._store.select("ui", "secInfo[[entity name]]", "summary_pageInfo");
	}

	public getDetailPageInfoState$(): Observable < PageInfo > {
		return this._store.select("ui", "secInfo[[entity name]]", "detail_pageInfo");
	}



	public getCreate[[entity name]]ButtonDisableState$(): Observable < boolean > {
		return this._store.select("ui", "secInfo[[entity name]]", "createButtonDisabledState");
	}

	public getDelete[[entity name]]ButtonDisableState$(): Observable < boolean > {
		return this._store.select("ui", "secInfo[[entity name]]", "deleteButtonDisabledState");
	}

	public getEditButtonDisabledState$(): Observable < boolean > {
		return this._store.select("ui", "secInfo[[entity name]]", "editButtonDisabledState");
	}

	public getEditButtonHiddenState$(): Observable < boolean > {
		return this._store.select("ui", "secInfo[[entity name]]", "editButtonHiddenState");
	}

	public getSaveButtonDisabledState$(formData: FormGroup): Observable < boolean > {
		return Observable.of(true).merge(Observable.combineLatest(
			this.getDetail[[entity name]]GridState$().filter((r: any) => r !== null),
			formData.valueChanges.debounceTime(500),
			([[variable name]]: DataSource<[[entity name]]>) => {

				return [[variable name]];

			})
			.map((data: DataSource<[[entity name]]>) => {
				return !(formData.valid && data.isDirty());
			}));
	}
	public getSaveButtonSpinnerState$(): Observable < boolean > {
		return this._store.select("ui", "secInfo[[entity name]]", "saveButtonSpinnerState");
	}

	public getSaveButtonHiddenState$(): Observable < boolean > {
		return this._store.select("ui", "secInfo[[entity name]]", "saveButtonHiddenState");
	}

	public getCancelButtonDisabledState$(): Observable < boolean > {
		return this._store.select("ui", "secInfo[[entity name]]", "cancelButtonDisabledState");
	}

	public getCancelButtonHiddenState$(): Observable < boolean > {
		return this._store.select("ui", "secInfo[[entity name]]", "cancelButtonHiddenState");
	}


	public getSortsState$(): Observable < IGridSort[] > {
		return this._store.select("ui", "secInfo[[entity name]]", "summary_sorts");

	}

	public getFiltersState$(): Observable < IGridFilter[] > {
		return this._store.select("ui", "secInfo[[entity name]]", "summary_filters");
	}


	public getSummaryGridState$(): Observable < DataSource < [[entity name]] >> {
		return this._store.select("ui", "secInfo[[entity name]]", "summary_gridDataSource");
	}


	public getEmptyTitle(): string {
		if (SecInfo[[entity name]]StaticStates.EMPTY_TITLE.length < 1) {
			this.getSummaryGridState$().subscribe(
				(ds: DataSource<[[entity name]]>) => {
					SecInfo[[entity name]]StaticStates.EMPTY_TITLE = ds.getDataModel().displayName;

				}, (error: Error) => {
					this._notify.error(error);
				}).unsubscribe();
		}
		return SecInfo[[entity name]]StaticStates.EMPTY_TITLE;
	}
	public getTitle$(): Observable < string > {

		return this._store.select("ui", "secInfo[[entity name]]", "detail_title");
	}

	public getDetail[[entity name]]GridState$(): Observable < DataSource < [[entity name]] >> {
		return this._store.select("ui", "secInfo[[entity name]]", "detail_[[variable name]]");
	}



	public getPageContentIdState$(): Observable < number > {
		return this._store.select("ui", "secInfo[[entity name]]", "summary_pageContentId");
	}

	public getDetailInputsReadonlyState$(): Observable < boolean > {
		return this._store.select("ui", "secInfo[[entity name]]", "detail_inputs_readonly_state");
	}



	/*
	 * dispatch actions
	 */
	public setPageInfoState(pageInfo: PageInfo): void {
		this._store.dispatch(new actions.SetSummaryPageInfoAction(pageInfo));
	}

	public setDetailPageInfoState(pageInfo: PageInfo): void {
		this._store.dispatch(new actions.SetDetailPageInfoAction(pageInfo));
	}

	public resetPageState(pageMode: PageMode, [[entity name]]ID: string): void {
		switch(pageMode) {
			case PageMode.View:
		this._store.dispatch(new actions.SwitchPageToViewModeEndAction([[entity name]]ID));
		break;
		case PageMode.Edit:
		this._store.dispatch(new actions.SwitchPageToEditModeEndAction([[entity name]]ID));
		break;
		case PageMode.Create:
		this._store.dispatch(new actions.SwitchPageToCreateModeEndAction());
		break;
		case PageMode.None:
		this._store.dispatch(new actions.SwitchPageToNoneModeAction());
		break;
		default:
				break;
	}
}


	public setDetailPageTabSelectedIndex(selectedIndex: number): void {
	this._store.dispatch(new actions.SetDetailTabSelectedIndexAction(selectedIndex));
}



	public setSortState(sorts: IGridSort[]): void {
	this._store.dispatch(new actions.SetSortsAction(sorts));
	this.refresh[[entity name]]s();


}

	public setFilterState(filters: IGridFilter[]): void {
	this._store.dispatch(new actions.SetFiltersAction(filters));
	this.refresh[[entity name]]s();

}

	public set[[entity name]]sState(ds: DataSource<[[entity name]]>): void {
	this._store.dispatch(new actions.Set[[entity name]]sAction(ds));
}

	public setSaveButtonSpinnerState(isSpinner: boolean): void {
		this._store.dispatch(new actions.SetDetailSaveButtonSpinnerState(isSpinner));
	}



	public setDetail[[entity name]]DataSourceState(ds: DataSource<[[entity name]]>): void {
		this._store.dispatch(new actions.SetDetail[[entity name]]DataSource(ds));
	}


	public switchToCreateMode(): void {
			this._navigate("new", PageMode.Create)
				.then(() => {
					this._meatballService.hideDetailMeatballData();

					this._store.dispatch(new actions.SwitchPageToCreateModeEndAction());
				});
		}

	public tryDelete[[entity name]]([[variable name]]: [[entity name]]): void {
			this._dialogService.whenConfirm(() => {
				this._loadingBarHandler.start();
				this._pageContext.beginToLoad(DELETEBOUNDREVENUESOURCE);
				this._svc.delete[[entity name]]([[variable name]])
					.switchMap(() => {
						return this.getDetailPageInfoState$();
					})
					.do((detailPageInfo: PageInfo) => {
						if (detailPageInfo.linkField === [[variable name]].[[entity name]]ID.toString()) {
					this._navigate(null, PageMode.None);
				}
				this.refresh[[entity name]]s();
			})
				.switchMap(() => {
					return SecInfo[[entity name]]StaticStates.GETDATA_RETURNVALUE$;
				})
				.take(1)
				.finally(() => {
					this._pageContext.endToLoad(DELETEBOUNDREVENUESOURCE);
					this._loadingBarHandler.stop();
				})
				.subscribe(() => {
					this._notify.success("[[entity name]] deleted", true);

				}, (error: Error) => {
					this._notify.error(error);
				});

		}).showSimpleDialog(DialogType.DeleteConfirm, SecInfo[[entity name]]Literals.[[const name]], [[variable name]].[[entity name]]Name);
	}

	public switchToEditMode(): void {
	this.getDetailPageInfoState$()
		.take(1)
		.pluck("linkField")
		.do(([[entity name]]ID: string) => {
			this._store.dispatch(new actions.SwitchPageToEditModeBeginAction([[entity name]]ID));
		})
		.switchMap(([[entity name]]ID: string) => {
			let promise: Promise<string> = this._navigate([[entity name]]ID, PageMode.Edit)
				.then(() => {
					return [[entity name]]ID;
				});

			return Observable.fromPromise(promise);
		})
		.subscribe(([[entity name]]ID: string) => {
			this._meatballService.hideDetailMeatballData();

			this._store.dispatch(new actions.SwitchPageToEditModeEndAction([[entity name]]ID));
		}, (error: Error) => {
			this._notify.error(error);
		});
}

	public switchToViewMode([[entity name]]Id: string): void {
	this._store.dispatch(new actions.SwitchPageToViewModeBeginAction([[entity name]]Id));
	this._dirtyCheckSvc.canChange().subscribe((canChange: boolean) => {
		if (canChange) {
			this._navigate([[entity name]]Id, PageMode.View)
				.then(() => {
					this._store.dispatch(new actions.SwitchPageToViewModeEndAction([[entity name]]Id));
				});
		}
	}, (error: Error) => {
		this._notify.error(error);
	});
}



	/*
	 * public methods
	 */

	public checkPermission(permissionType: PermissionTypes, restrictionClassID: number): boolean {
	return this._profileSvc.checkPermissionImmed(permissionType, restrictionClassID);
}

	public loadPermission(restrictionClassID: number): Observable < boolean > {
	return this._profileSvc.getPermissions(restrictionClassID)
		.map(() => {
			return true;
		}, () => {
			return false;
		});
}


	public get[[entity name]]s(): Observable < any > {
	let filters: Observable<IGridFilter[]> = this.getFiltersState$();
	let sorts: Observable<IGridSort[]> = this.getSortsState$();
	let pageContentId: Observable<number> = this.getPageContentIdState$();
	let gridDataSource: Observable<DataSource< [[entity name]] >> = this.getSummaryGridState$();
return Observable
	.zip(filters, sorts, pageContentId, gridDataSource, (fs: IGridFilter[], ss: IGridSort[], id: number, ds: DataSource<[[entity name]]>) => {
		let apiFilters: Filter[] = [];
		if (fs) {
			apiFilters = fs.map((f: IGridFilter) => {
				return new Filter(f.fieldName, f.operator.apiValue, f.value);
			});
		}

		let apiSorts: SortArgs[] = [];
		if (ss) {
			apiSorts = ss.map((s: IGridSort) => {
				let sortArgs: SortArgs = new SortArgs();
				sortArgs.Key = s.fieldName;
				sortArgs.Descending = s.direction === EnumGridSortDirection.Desc;
				return sortArgs;
			});
		}
		return {
			filters: apiFilters,
			sort: apiSorts,
			pageContentId: id,
			gridDataSource: ds
		};
	})
	.switchMap((result: any) => {
		let search: Search = ApxSearchHelper.CreateSearch([[entity name]], result.filters, result.sort);
		return this._svc.getData(
			[[entity name]],
			{
				pageContentId: result.pageContentId
			},
			search);

	})
	.map((result: any) => {
		let data: Array<[[entity name]]> = result.Data;
		let rowDef: RowDef = result.Metadata.find((r: RowDef) => r.Name === [[entity name]].rowDefName());
		let ds: DataSource<[[entity name]]> = new DataSource<[[entity name]]>(rowDef, data);
		this.set[[entity name]]sState(ds);

		return {
			Metadata: rowDef,
			Data: data
		};
	});
	}


	public get[[entity name]]By[[entity name]]ID([[entity name]]ID: string): Observable < any > {
	let search: Search = ApxSearchHelper.CreateSearch(
		[[entity name]],
		[
			{ Field: [[entity name]].Tags.[[entity name]]ID, ComparisonOperator: ComparisonOperators.Equal, Value: [[entity name]]ID }
		],
		null, 0, 0);
	return this._svc.getData(
		[[entity name]],
		{
			resultSetOption: ResultSetOption.Large
		},
		search
	).map((result: any) => {
		let [[variable name]]: Array<[[entity name]]> = result.Data;
		let [[variable name]]RowDef: RowDef = result.Metadata.find((r: RowDef) => r.Name === [[entity name]].rowDefName());

		let paging: PagingInfo = result.Paging;

		let [[entity name]]DataSource: DataSource<[[entity name]]> = new DataSource<[[entity name]]>([[variable name]]RowDef, [[variable name]]);
		this.setDetail[[entity name]]DataSourceState([[entity name]]DataSource);



		return {
			[[variable name]]: [[entity name]]DataSource,
			paging: paging
		};
	});
}

	public prepareNew[[entity name]](): Observable < any > {
	return this._svc.getData(
		[[entity name]],
		{
			withData: false,
			withMetadata: true,
			resultSetOption: ResultSetOption.Large
		}).map((result: any) => {
			let [[entity name]]RowDef: RowDef = result.Metadata.find((r: RowDef) => r.Name === [[entity name]].rowDefName());

			let c: [[entity name]] = new [[entity name]]();

			let p: PagingInfo = new PagingInfo();

			let [[variable name]]DataSource: DataSource<[[entity name]]> = new DataSource<[[entity name]]>([[entity name]]RowDef, []);
			[[variable name]]DataSource.data([c]);
			this.setDetail[[entity name]]DataSourceState([[variable name]]DataSource);


			return {
				[[entity name]]: [[variable name]]DataSource,
				paging: p
			};
		});
}

	public cancelHandler(): void {
	Observable.zip(
		this.isDataChanged$(),
		this.getDetailPageInfoState$().take(1),
		(isChanged: boolean, pageInfo: PageInfo) => {
			return {
				isChanged: isChanged,
				pageInfo: pageInfo
			};
		})
		.subscribe((data: any) => {
			if (data.isChanged) {
				console.log("_isDataChanged().");
				let dialogType: DialogType = (data.pageInfo.pageMode === PageMode.Create ? DialogType.AddDiscard : DialogType.EditDiscard);
				this._dialogService.show(dialogType, [[entity name]].rowDefName(), "")
					.subscribe((canChange: boolean) => {
						if (canChange) {
							this.cancelEdit();
						}
					}, (error: Error) => {
						this._notify.error(error);
					});
			}
			else {
				console.log("_isDataChanged() false.....");
				this.cancelEdit();
			}
		}, this._notify.error);
}

	public cancelEdit(): void {
	this.getDetailPageInfoState$()
		.take(1)
		.switchMap((pageInfo: PageInfo) => {
			let pageMode: PageMode = pageInfo.pageMode;
			let [[entity name]]ID: string = pageInfo.linkField;
			let promise: Promise<boolean> = Promise.resolve(true);
			this.setDetail[[entity name]]DataSourceState(null);
			if (pageMode === PageMode.Create) {
				// navigate to none page.
				this._store.dispatch(new actions.SwitchPageToNoneModeAction());
				promise = this._navigate("", PageMode.None);
			}
			else if (pageMode === PageMode.Edit) {
				// navigate to edit mode
				promise = this._navigate([[entity name]]ID, PageMode.View);
			}

			return Observable.from(promise);
		})
		.subscribe(() => {
			console.log('cancel edit() navigate finished.');
		}, (error: Error) => {
			this._notify.error(error);
		});
}



	public isDataChanged$(): Observable < boolean > {
	let [[entity name]]Ds$: Observable < DataSource < [[entity name]] >> = this.getDetail[[entity name]]GridState$();
		return [[entity name]]Ds$
			.take(1)
			.map((result: any) => {
				let [[entity name]]Changed: boolean = result ? result.hasChanges() : false;
				return [[entity name]]Changed;
			});
}
	public getPageMode(): PageMode {
	let pageMode: PageMode = PageMode.None;
	this.getDetailPageInfoState$()
		.take(1)
		.pluck("pageMode")
		.subscribe((mode: PageMode) => {
			pageMode = mode;
		}, (error: Error) => {
			this._notify.error(error);
		});
	return pageMode;
}
	public save[[entity name]](): void {
	this._pageContext.beginToLoad(SAVEBOUNDREVENUESOURCE);
	this._loadingBarHandler.start();
	this.setSaveButtonSpinnerState(true);


	// get page mode;
	let pageMode: PageMode = this.getPageMode();


	this.getDetail[[entity name]]GridState$()
			.take(1)
			.switchMap((data: DataSource<[[entity name]]>) => {

		return this.saveToAPI(pageMode, data);
	})
	.do((result: ResultSet<[[entity name]]>) => {

		this.setSaveButtonSpinnerState(false);
		// // we should reset  detail [[entity name]] .
		this.setDetail[[entity name]]DataSourceState(null);
		let [[variable name]]: [[entity name]] = result.Data[0];
		let [[id value]]: any = [[variable name]].[[entity name]]ID;
		this.switchToViewMode([[id value]]);

	}).switchMap(() => {
		this.refresh[[entity name]]s();
		return SecInfo[[entity name]]StaticStates.GETDATA_RETURNVALUE$;
	})
	.take(1)
	.finally(() => {
		this._pageContext.endToLoad(SAVEBOUNDREVENUESOURCE);
		this._loadingBarHandler.stop();
	})
	.subscribe(() => {
		if (pageMode === PageMode.Create) {
			this._notify.success(SecInfo[[entity name]]Literals.CREATE_SUCCESSFULLY, true);
		}
		else if (pageMode === PageMode.Edit) {
			this._notify.success(SecInfo[[entity name]]Literals.UPDATED_SUCCESSFULLY, true);
		}

	}, (error: Error) => {
		this._notify.error(error);
	});
	}

	public saveToAPI(pageMode: PageMode, dataSource: DataSource<[[entity name]]>): Observable < ResultSet < [[entity name]] >> {
	if(pageMode === PageMode.Create) {
	let created[[entity name]]: Array<[[entity name]]> = dataSource.changedForAPI();

	let target[[entity name]]: [[entity name]] = created[[entity name]][0];
	/* should insert */
	target[[entity name]]._Action = DBActions.Insert;
	return this._svc.create[[entity name]](target[[entity name]]);
}
		else if (pageMode === PageMode.Edit) {
	let updated[[entity name]]s: Array<[[entity name]]> = dataSource.updatedForAPI();
	let updated[[entity name]]: [[entity name]] = updated[[entity name]]s[0];
	if (!updated[[entity name]]) {
		let original: [[entity name]] = dataSource.data()[0];
		updated[[entity name]] = new [[entity name]]();
		updated[[entity name]].[[entity name]]ID = original.[[entity name]]ID;
		updated[[entity name]].[[entity name]]Name = original.[[entity name]]Name;
		updated[[entity name]].AuditEventID = original.AuditEventID;
	}
	return this._svc.update[[entity name]]({ [[entity name]]ID: null, [[entity name]]Name: null, AuditEventID: 0 }, updated[[entity name]]);
}

throw new Error("error page mode!");
	}


	public setEmptyPageEntityTypeName(entityTypeName: string): void {
	this._emptyPageService.setEmptyPageEntityName(entityTypeName);
}


showErrorMessage(error: Error): void {
	this._notify.error(error);
}
	private _navigate(id: string, mode ?: PageMode): Promise < boolean > {
	if(id === undefined || id === null || mode === PageMode.None) {
	return this._router.navigate(["main", "s", "SecInfo[[entity name]]"]);
}
		else if (mode !== undefined) {
	return this._router.navigate(["main", "s", "SecInfo[[entity name]]", id as string, { mode: mode }]);
}

	}


}

