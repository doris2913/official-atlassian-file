!function(e,t){Calendar.setup=function(a){function n(e,t){void 0===a[e]&&(a[e]=t)}function l(t){var a=t.params,n=t.dateClicked||a.electric;n&&a.inputField&&(a.inputField.value=t.date.print(a.ifFormat),e(a.inputField).change()),n&&a.displayArea&&(a.displayArea.innerHTML=t.date.print(a.daFormat)),n&&"function"==typeof a.onUpdate&&a.onUpdate(t),n&&a.flat&&"function"==typeof a.flatCallback&&a.flatCallback(t),"true"===a.singleClick?a.singleClick=!0:"false"===a.singleClick&&(a.singleClick=!1),n&&a.singleClick&&t.dateClicked&&t.callCloseHandler()}function i(){if(!0===Calendar._UNSUPPORTED)return void alert("The JIRA Calendar does not currently support your language.");var e=a.inputField||a.displayArea,t=a.inputField?a.ifFormat:a.daFormat,n=!1,i=window.calendar;if(i&&i.hide(),e&&(e.value||e.innerHTML)&&(a.date=Date.parseDate(e.value||e.innerHTML,t)),i&&a.cache?(a.date&&i.setDate(a.date),i.hide()):(window.calendar=i=new Calendar(a.firstDay,a.date,a.todayDate,a.onSelect||l,a.onClose||function(e){e.hide()}),i.showsTime=a.showsTime,i.time24="24"==a.timeFormat,i.weekNumbers=a.weekNumbers,Date.useISO8601WeekNumbers=a.useISO8601WeekNumbers,a.useISO8601WeekNumbers&&(i.firstDayOfWeek=1),n=!0),a.multiple){i.multiple={};for(var r=a.multiple.length;--r>=0;){var u=a.multiple[r],o=u.print("%Y%m%d");i.multiple[o]=u}}return i.showsOtherMonths=a.showOthers,i.yearStep=a.step,i.setRange(a.range[0],a.range[1]),i.params=a,i.setDateStatusHandler(a.dateStatusFunc),i.getDateText=a.dateText,i.setDateFormat(t),n&&i.create(),i.refresh(),a.position?i.showAt(a.position[0],a.position[1]):i.showAtElement(a.button||a.displayArea||a.inputField,a.align),!1}a=a||{},n("inputField",null),n("context",null),n("displayArea",null),n("button",null),n("eventName","click"),n("ifFormat","%Y/%m/%d"),n("daFormat","%Y/%m/%d"),n("singleClick",!0),n("disableFunc",null),n("dateStatusFunc",a.disableFunc),n("dateText",null),n("firstDay",null),n("align","Br"),n("range",[1900,2999]),n("weekNumbers",!0),n("useISO8601WeekNumbers",!1),n("flat",null),n("flatCallback",null),n("onSelect",null),n("onClose",null),n("onUpdate",null),n("date",null),n("todayDate",null),n("showsTime",!1),n("timeFormat","24"),n("electric",!0),n("step",1),n("position",null),n("cache",!1),n("showOthers",!1),n("multiple",null);var r,u,o=["context","inputField","button","displayArea"];for(r in o)u=o[r],a[u]instanceof e&&(a[u]=a[u][0]);var s=["inputField","displayArea","button"];for(r in s)if(u=s[r],"string"==typeof a[u]){var d="#"+e.escapeSelector(a[u]),p=e(a.context||document.body).find(d);a[u]=p[0]}if(!(a.flat||a.multiple||a.inputField||a.displayArea||a.button))return t.log("Calendar.setup:\n  Nothing to setup (no fields found).  Please check your code"),!1;if(a.firstDay&&null!==a.firstDay&&(a.firstDay=+a.firstDay),null!=a.flat){if("string"==typeof a.flat&&(a.flat=document.getElementById(a.flat)),!a.flat)return t.log("Calendar.setup:\n  Flat specified but can't find parent."),!1;var c=new Calendar(a.firstDay,a.date,a.todayDate,a.onSelect||l);return c.showsOtherMonths=a.showOthers,c.showsTime=a.showsTime,c.time24="24"==a.timeFormat,c.params=a,c.weekNumbers=a.weekNumbers,c.setRange(a.range[0],a.range[1]),c.setDateStatusHandler(a.dateStatusFunc),c.getDateText=a.dateText,a.ifFormat&&c.setDateFormat(a.ifFormat),a.inputField&&"string"==typeof a.inputField.value&&c.parseDate(a.inputField.value),c.create(a.flat),c.show(),!1}var f=a.button||a.displayArea||a.inputField;return e(f).bind(a.eventName,function(e){e.preventDefault(),i()}),a.inputField&&function(){var t=e(a.inputField);a.button&&e(a.button).mousedown(function(e){e.preventDefault(),!t.is(":focus")&&t.is(":enabled")&&t.focus()}),t.keydown(function(e){var t=window.calendar;40===e.keyCode&&(t&&!t.hidden||setTimeout(function(){i()},1))})}(),c}}(require("jquery"),require("jira/util/logger"));