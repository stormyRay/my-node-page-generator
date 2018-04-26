import { PageMode } from '../../models/metadata.model';
import { EnumTitleButtonsAlign } from '../../widgets/title.widget';
import { EnumButtonSize, EnumButtonStyle, EnumButtonContent, EnumButtonBehavior } from '../../widgets/button.widget';
import { Pages } from '../../common/constants-pages';
import { SecInfo[[entity name]]Names } from "./sec-info-[[file name]].constants";
export class SecInfo[[entity name]]DetailLayout {
	public static getLayout(): Object {
		let layout: Object = {
			children: [
				{
					selector: "apxTitleWidget",
					options: {
						id: SecInfo[[entity name]]Names.ID_TITLE,
						buttonsAlign: EnumTitleButtonsAlign.Right,
						children: [
							{
								selector: "apxButtonWidget",
								options: {
									id: SecInfo[[entity name]]Names.ID_EDIT_BTN,
									content: EnumButtonContent.Text,
									style: EnumButtonStyle.Primary,
									text: "Edit"
								}
							},
							{
								selector: "apxButtonWidget",
								options: {
									id: SecInfo[[entity name]]Names.ID_CANCEL_BTN,
									content: EnumButtonContent.Text,
									style: EnumButtonStyle.Tertiary,
									text: "Cancel"
								}
							},
							{
								selector: "apxButtonWidget",
								options: {
									id: SecInfo[[entity name]]Names.ID_SAVE_BTN,
									content: EnumButtonContent.Text,
									style: EnumButtonStyle.Primary,
									text: "Save"
								}
							}
						]
					}
				},
				{
					selector: "apxTabstripWidget",
					options: {
						id: SecInfo[[entity name]]Names.ID_TABS,
						tabs: [
							{
								tileName: SecInfo[[entity name]]Names.NAME_TAB_TILE,
								selected: true
							}
						],
						children: [
							{
								selector: "apxTileWidget",
								options: {
									id: SecInfo[[entity name]]Names.ID_[[const name]]_TILE,
			expanded: true,
			title: SecInfo[[entity name]]Names.NAME_TAB_TILE,
			mode: PageMode.View,
			contentHeight: "100%",
			contentOverflow: "hidden",
			children: [
				{
					selector: "apxLabelTextBoxWidget",
					options: {
						id: SecInfo[[entity name]]Names.ID_[[const name]]NAME,
			width: "50%"
		}
	}]

}

							}
						]
					}
				}
			]
		};
return layout;
	}
}
