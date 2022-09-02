define("jira/dialog/edit-preferences-dialog",["jira/dialog/user-profile-dialog","jquery"],function(e,t){"use strict";return e.extend({_getDefaultOptions:function(){return t.extend(this._super(),{notifier:"#userprofile-notify"})},_handleSubmitResponse:function(e,t,i){this.serverIsDone&&(this._updatePageSize(),this._updateEmail(),this._updateSharing(),this._updateOwnNotifications(),this._updateLocale(),this._updateTimezone(),this._updateKeyboardShortcutsNotifications(),this._updateAutowatch(),this._updateExternalLinks(),this._super(e,t,i))},_updatePageSize:function(){var e=t("#update-user-preferences-pagesize").val();t("#up-p-pagesize").text(e)},_updateEmail:function(){var e=t("option:selected","#update-user-preferences-mailtype").text();t("#up-p-mimetype").text(e)},_updateSharing:function(){"false"!==t("option:selected","#update-user-preferences-sharing").val()?(t("#up-p-share-private").show(),t("#up-p-share-public").hide()):(t("#up-p-share-private").hide(),t("#up-p-share-public").show())},_updateOwnNotifications:function(){"false"!==t("option:selected","#update-user-preferences-own-notifications").val()?(t("#up-p-notifications_on").show(),t("#up-p-notifications_off").hide()):(t("#up-p-notifications_on").hide(),t("#up-p-notifications_off").show())},_updateLocale:function(){var e=t.trim(t("option:selected","#update-user-preferences-locale").text());t.trim(t("#up-p-locale").text())!==e&&(this._reload=function(){return!0})},_updateTimezone:function(){var e=t("option:selected","#defaultUserTimeZone"),i=t.trim(e.text());"JIRA"!==e.val()?t("#up-p-jira-default").hide():t("#up-p-jira-default").show(),t("#up-p-timezone-label").text(i)},_updateKeyboardShortcutsNotifications:function(){var e=t("option:selected","#update-user-preferences-keyboard-shortcuts").val();(t("#up-p-keyboard-shortcuts-enabled").is(":visible")?"true":"false")!==e&&("false"!==e?(t("#up-p-keyboard-shortcuts-enabled").show(),t("#up-p-keyboard-shortcuts-disabled").hide()):(t("#up-p-keyboard-shortcuts-enabled").hide(),t("#up-p-keyboard-shortcuts-disabled").show()),this._reload=function(){return!0})},_updateAutowatch:function(){"false"!==t("option:selected","#update-user-preferences-autowatch").val()?(t("#up-p-autowatch-enabled").show(),t("#up-p-autowatch-disabled").hide()):(t("#up-p-autowatch-enabled").hide(),t("#up-p-autowatch-disabled").show())},_updateExternalLinks:function(){"true"===t("#update-user-preferences-external-links-new-window").val()?(t("#up-p-external-links-enabled").show(),t("#up-p-external-links-disabled").hide()):(t("#up-p-external-links-enabled").hide(),t("#up-p-external-links-disabled").show())}})}),AJS.namespace("JIRA.EditPreferencesDialog",null,require("jira/dialog/edit-preferences-dialog"));