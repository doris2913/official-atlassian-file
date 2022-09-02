define("jira/wikipreview/wiki-preview",["jira/util/formatter","wrm/context-path","jquery"],function(e,i,n){"use strict";return function(r,t){var s,a,o,d,c=!1,l=function(){s=n("#"+r.fieldId,t),a=n("#"+r.fieldId+"-wiki-edit",t),o=n("#"+r.trigger,t)},u=function(){var e;return{show:function(){e||(e=n("<div>").html("&nbsp;").css({height:"300px"}).insertBefore(a)),e.css({display:"block"})},hide:function(){e.css({display:"none"})}}}(),p=function(){c?(a.find(".content-inner").css({maxHeight:""}),this.showInput()):(a.find(".content-inner").css({maxHeight:s.css("maxHeight")}),this.showPreview())},w=function(e){o.find(".wiki-renderer-icon").text(e)},f=function(i){a.originalHeight=a.height(),u.show(),a.addClass("previewClass"),d=s.val(),s.hide(),o.removeClass("loading").addClass("selected"),w(e.I18n.getText("renderer.preview.close",r.fieldId)),a.find(".content-inner").html(i),u.hide(),c=!0,n(document).trigger("showWikiPreview",[a]),setTimeout(function(){o.focus()},0)},h=function(e){return function(i,n,r){o.removeClass("loading"),d=s.val(),n&&alert(n),r&&alert(r),e.showInput()}};return{showPreview:function(){var e=this,a=n("#pid",t).val(),o=n("#issuetype",t).val();n.isArray(a)&&(a=a[0]),n.isArray(o)&&(o=o[0]),n("#"+r.trigger,t).addClass("loading"),n.ajax({url:i()+"/rest/api/1.0/render",contentType:"application/json",type:"POST",data:JSON.stringify({rendererType:r.rendererType,unrenderedMarkup:s.val(),issueKey:r.issueKey,projectId:a,issueType:o}),dataType:"html",success:f,error:h(e)})},showInput:function(){a&&(u.show(),a.css({height:""}),a.removeClass("previewClass").find(".content-inner").empty(),s=n("#"+r.fieldId,t),s.val(d),s.show(),s.focus(),o.removeClass("selected"),w(e.I18n.getText("renderer.preview",r.fieldId)),u.hide(),c=!1,n(document).trigger("showWikiInput",[a]))},init:function(){var e,i=this;r instanceof n&&(r=n.readData(r)),e=n("#"+r.trigger,t),e.click(function(n){e.hasClass("loading")||(l(),p.call(i)),n.preventDefault()})}}}}),AJS.namespace("jira.app.wikiPreview",null,require("jira/wikipreview/wiki-preview")),AJS.namespace("JIRA.wikiPreview",null,require("jira/wikipreview/wiki-preview"));