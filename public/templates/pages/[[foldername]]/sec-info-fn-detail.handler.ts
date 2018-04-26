import { ILabelTextBoxWidgetOptions } from '../../widgets/inputs/label-textbox.widget';
import { DataField } from '../../common/DataModel';
import { PageInfo } from '../../ui-engine/page-info.model';
import { ITabstripWidgetOptions } from '../../widgets/tabstrip.widget';
import { IButtonWidgetOptions } from '../../widgets/button.widget';
import { ITitleWidgetOptions } from '../../widgets/title.widget';
import { ILayout } from '../../ui-engine/layout.interface';
import { UserSearches } from '../../models/user-searches.model';
import { DataSource } from '../../common/DataSource';
import { [[entity name]] } from '../../models/[[import path]].model';
import { TileParameters } from '../../models/tile-parameters.model';
import { RunMode, ConfigurationService } from '../../services/configuration.service';
import { ApxApp } from '../../apx.app';
import { DialogType, FrameworkDialogService } from '../../services/framework.dialog.service';
import { FrameworkDirtyCheckService, FrameworkDataChange } from '../../services/framework.dirty-check.service';
import { PagingInfo, ResultSet, PageMode, PageType } from '../../models/metadata.model';
import { PageLayout } from '../../ui-engine/page.layout';
import { FrameworkMeatballDataItem, FrameworkMeatballService } from '../../services/framework.meatball.service';
import { PageParameters } from '../../models/page-parameters.model';
import { PageHandlerBase } from '../../ui-engine/page-handler-base';
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { SecInfo[[entity name]]Names } from './sec-info-[[file name]].constants';
import { SecInfo[[entity name]]Layout } from "./sec-info-[[file name]].layout";
import { SecInfo[[entity name]]PageService } from "./sec-info-[[file name]].page.service";
import { SecInfo[[entity name]]DetailLayout } from "./sec-info-[[file name]]-detail.layout";
import { FormGroup } from "@angular/forms/src/model";
import { State } from "./sec-info-[[file name]].reducers";
import { AsyncPipe } from "@angular/common/src/pipes";
@Injectable()
export class SecInfo[[entity name]]DetailHandler extends PageHandlerBase implements FrameworkDataChange {
	constructor(
		private _service: SecInfo[[entity name]]PageService,
		meatballService: FrameworkMeatballService,
		private _dirtyCheckSvc: FrameworkDirtyCheckService,
		private _dialogService: FrameworkDialogService,
		private _apxApp: ApxApp,
		private _config: ConfigurationService
	) {
		super(meatballService);
	}


	getData(pageParameters: PageParameters): Observable < any > {
		// save page into to store.
		this._service.setDetailPageInfoState({
			pageId: pageParameters.pageId,
			linkField: pageParameters.linkField,
			pageName: pageParameters.pageName,
			caption: pageParameters.caption,
			restrictionClassId: pageParameters.restrictionClassId,
			tileParameters: pageParameters.tileParameters,
			pageMode: pageParameters.pageMode
		});

		// reset control state based on page mode.

		let pageMode: PageMode = pageParameters.pageMode;
		let [[id value]]: string = pageParameters.linkField;
		this._service.resetPageState(pageMode, [[id value]]);

		this.prepareMeatballData(PageType.Summary);



		let [[entity name]]$: Observable < [[entity name]] > = null;

		switch(pageMode) {
			case PageMode.Edit:
		case PageMode.View:
		case PageMode.None:
		[[entity name]]$ = this._service.get[[entity name]]By[[entity name]]ID([[id value]]);
				break;

		case PageMode.Create:
		[[entity name]]$ = this._service.prepareNew[[entity name]]();
		break;

		// case PageMode.None:
		// 	break;

		default:
				throw new Error(`This page does not handle mode ${pageMode}!`);
	}



	return Observable.zip([[entity name]]$, (dataSources: { [[entity name]]: DataSource<[[entity name]]>, paging: PagingInfo }) => {
		return {
			[[entity name]]: dataSources.[[entity name]],
			paging: dataSources.paging
		};
	});

}

// prepare page layout
getLayout(pageParameters: any): PageLayout {
	let pageLayout: any = SecInfo[[entity name]]DetailLayout.getLayout();
	return pageLayout;
}


prepareLayout(pageState: State, pageLayout: PageLayout): void {
	let [[variable name]]DataSource: DataSource < [[entity name]] > = pageState.detail_[[variable name]];


	this.bindTitle();

	this.prepareButtons(pageState.form);
	this.initialGeneralTile([[variable name]]DataSource);


}

bindTitle(): void {
	let title: ILayout = this.findLayout(SecInfo[[entity name]]Names.ID_TITLE);
	let titleOptions: ITitleWidgetOptions = title.options as ITitleWidgetOptions;
	this._service.getTitle$().subscribe((t: string) => { titleOptions.title = t; }, this._service.showErrorMessage).unsubscribe();
}
prepareButtons(form: FormGroup): void {
	this.prepareEditButton();
	this.prepareCancelButton();
	this.prepareSaveButton(form);
}
prepareEditButton(): void {
	let btnEdit: any = this.findLayout(SecInfo[[entity name]]Names.ID_EDIT_BTN);
	let btnEditOptions: IButtonWidgetOptions = btnEdit.options as IButtonWidgetOptions;
	let btnEditDisabledObservable$: Observable<boolean> = this._service.getEditButtonDisabledState$();
	let btnEditHiddenObservable$: Observable<boolean> = this._service.getEditButtonHiddenState$();
	Object.assign(btnEditOptions, {
		disabled: btnEditDisabledObservable$,
		hidden: btnEditHiddenObservable$,
		buttonClickCB: (): void => {
			this._meatballService.hideDetailMeatballData();
			this._service.switchToEditMode();
		}
	});
}

prepareSaveButton(form: FormGroup): void {
	let btnSave: any = this.findLayout(SecInfo[[entity name]]Names.ID_SAVE_BTN);
	let btnSaveOptions: IButtonWidgetOptions = btnSave.options as IButtonWidgetOptions;
	let btnSaveHiddenObservable$: Observable<boolean> = this._service.getSaveButtonHiddenState$();
	let btnSaveSpinnerObservable$: Observable<boolean> = this._service.getSaveButtonSpinnerState$();


	let btnSaveDisabledObservable$: Observable<boolean> = this._service.getSaveButtonDisabledState$(form);
	Object.assign(btnSaveOptions, {
		disabled: btnSaveDisabledObservable$,
		hidden: btnSaveHiddenObservable$,
		showSpinner: btnSaveSpinnerObservable$,
		buttonClickCB: (): void => {
			this._service.save[[entity name]]();
		}
	});

}

prepareCancelButton(): void {
	let btnCancel: any = this.findLayout(SecInfo[[entity name]]Names.ID_CANCEL_BTN);
	let btnCancelOptions: IButtonWidgetOptions = btnCancel.options as IButtonWidgetOptions;
	let btnCancelDisabledObservable$: Observable<boolean> = this._service.getCancelButtonDisabledState$();
	let btnCancelHiddenObservable$: Observable<boolean> = this._service.getCancelButtonHiddenState$();
	Object.assign(btnCancelOptions, {
		disabled: btnCancelDisabledObservable$,
		hidden: btnCancelHiddenObservable$,
		buttonClickCB: (): void => {
			this._service.cancelHandler();
		}
	});
}
prepareTabs(pageInfo: PageParameters): void {
	let tabs: any = this.findLayout(SecInfo[[entity name]]Names.ID_TABS);
	let options: ITabstripWidgetOptions = tabs.options as ITabstripWidgetOptions;


	let selectedTabIndex: any = options.tabs.findIndex((t: any) => t.selected);
	if(selectedTabIndex < 0) { selectedTabIndex = 0; }


		if(tabs && options && options.tabs && options.tabs.length > 0) {

	pageInfo.tileParameters.forEach((tile: TileParameters) => {
		let tab: any = tabs.options.tabs.find((t: any) => t.tileName === tile.name);
		if (tab) {
			tab.title = tile.caption;
		}
	});

	Object.assign(options, {

		tabChange: (index: number): void => {
			// tab selection in create mode do not change default tab
			this._service.setDetailPageTabSelectedIndex(index);

		}
	});

	// initial tab
	options.tabs.forEach((t: any, i: number) => {
		t.selected = false;
	});
	if (pageInfo.pageMode === PageMode.Create) {
		options.tabs[0].selected = true;
	}
	else {
		options.tabs[selectedTabIndex].selected = true;
		this._service.setDetailPageTabSelectedIndex(selectedTabIndex);
	}
}
	}


dataChanged(): Observable < boolean > {
	return Observable.zip(
		this._service.getDetailPageInfoState$().take(1).pluck("pageMode"),
		this._service.isDataChanged$(),
		(pageMode: PageMode, isDataChanged: boolean) => {
			return {
				pageMode: pageMode,
				isDataChanged: isDataChanged
			};
		})
		.switchMap((result: any) => {
			if ((result.pageMode === PageMode.Edit || result.pageMode === PageMode.Create) && result.isDataChanged) {
				let dialogType: DialogType = (result.pageMode === PageMode.Create ? DialogType.AddDiscard : DialogType.EditDiscard);
				return this._dialogService.show(dialogType, [[entity name]].rowDefName(), "")
					.map((canChange: boolean) => {
						if (canChange) {
							this._service.setDetail[[entity name]]DataSourceState(null);
						}
						return canChange;
					});
			}
			else {
				return Observable.of(true);
			}
		});
}

registerDirtyCheck(): void {
	this._dirtyCheckSvc.register(this);
}

unregisterDirtyCheck(): void {
	this._dirtyCheckSvc.unregister(this);
}

getMeatballData(): any {
	let meatballData: Array<FrameworkMeatballDataItem> = [
		{
			type: 'subitem',
			displayName: 'View History',
			isOpened: false
		}
	] as Array<FrameworkMeatballDataItem>;

	return meatballData;
}

canDeactivate(): Observable < boolean > {
	return this.dataChanged().map((canChange: boolean) => {
		if (canChange) {
			this._dirtyCheckSvc.unregister(this);
			this._meatballService.hideDetailMeatballData();
		}
		return canChange;
	});
}

initialGeneralTile([[variable name]]DataSource: DataSource<[[entity name]]>): void {
	let [[variable name]]Name: ILayout = this.findLayout(SecInfo[[entity name]]Names.ID_[[const name]]NAME);
let [[variable name]]NameOptions: ILabelTextBoxWidgetOptions = [[variable name]]Name.options as ILabelTextBoxWidgetOptions;
Object.assign([[variable name]]NameOptions, {
	metadata: [[variable name]]DataSource.getDataField([[entity name]].Tags.[[entity name]]Name),
	dataItem: [[variable name]]DataSource.data()[0],
	disabled: Observable.of(false),
	readonly: this._service.getDetailInputsReadonlyState$(),
	formGroup: this._service.getFormState$()
});


}
}
