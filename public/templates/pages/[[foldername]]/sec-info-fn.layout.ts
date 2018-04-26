import { [[entity name]] } from '../../models/[[import path]].model';
import { EnumButtonSize, EnumButtonStyle, EnumButtonContent, EnumButtonBehavior } from '../../widgets/button.widget';
import { Pages } from '../../common/constants-pages';
import { SecInfo[[entity name]]Names } from "./sec-info-[[file name]].constants";
export class SecInfo[[entity name]]Layout {
	public static getLayout(): Object {
		let layout: Object = {
			children: [
				{
					selector: "apxTitleWidget",
					options: {
						id: SecInfo[[entity name]]Names.ID_TITLE,
						showInnerBottomBorder: true,
						children: [
							{
								selector: "apxButtonWidget",
								options: {
									id: SecInfo[[entity name]]Names.ID_NEW_BTN,
									behavior: EnumButtonBehavior.Normal,
									content: EnumButtonContent.Icon,
									style: EnumButtonStyle.Primary,
									kendoIcon: "add",
									size: EnumButtonSize.Large,
									tooltipOptions: {
										id: SecInfo[[entity name]]Names.ID_NEW_BTN_TOOLTIP,
										placement: "bottom",
										animation: true,
										appendToBody: false,
										disabled: true,
										content: "Save or cancel to create a new [[name literal]].",
										showOnClick: false,
										showOnHover: true,
										showOnFocus: false,
										isInfoTip: false
									}
								}
							}
						]
					}
				},
				{
					selector: "apxTileWidget",
					options: {
						id: SecInfo[[entity name]]Names.ID_SUMMARY_TILE,
						noPadding: true,
						flexGrow: true,
						children: [
							{
								selector: "apxLabelDropdownWidget",
								options: {
									id: SecInfo[[entity name]]Names.ID_DROPDOWN,
									hideLabel: true,
									padding: '15px 20px 10px'
								}
							},
							{
								selector: "apxGridWidget",
								options: {
									id: SecInfo[[entity name]]Names.ID_GRID,
									showToolbarPadding: true,
									columns: [{
										fieldName: [[entity name]].Tags.[[entity name]]Name,
										filterable: true,
										sortable: true
									}],
									hideAddRowButton: true,
									rowRightClickable: true,
									hideSelectRowCheckbox: true,
									rowSelectable: true,
									filterOnServer: true,
									sortOnServer: true
								}
							}
						]
					}
				}]
		};
		return layout;
	}
}
