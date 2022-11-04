{
	"_Name": "PackedBoxTracking",
	"Version": "/PackedBoxTracking/Globals/AppDefinition_Version.global",
	"MainPage": "/PackedBoxTracking/Pages/Main.page",
	"OnLaunch": [
		"/PackedBoxTracking/Actions/Service/InitializeOnline.action"
	],
	"OnWillUpdate": "/PackedBoxTracking/Rules/OnWillUpdate.js",
	"OnDidUpdate": "/PackedBoxTracking/Actions/Service/InitializeOnline.action",
	"Styles": "/PackedBoxTracking/Styles/Styles.less",
	"Localization": "/PackedBoxTracking/i18n/i18n.properties",
	"_SchemaVersion": "6.3"
}