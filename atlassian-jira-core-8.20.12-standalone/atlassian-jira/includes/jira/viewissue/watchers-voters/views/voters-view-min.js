define("jira/viewissue/watchers-voters/views/voters-view",["require"],function(e){"use strict";var t=e("aui/message"),i=e("backbone"),s=e("underscore"),r=e("jira/jquery/deferred"),n=e("jira/util/formatter"),o=JIRA.Templates.Issue;return i.View.extend({$empty:void 0,initialize:function(e){this.collection=e.collection},renderNoWatchers:function(){0===this.$(".recipients li").length?(this.$empty=t.info({closeable:!1,body:n.I18n.getText("voters.novoters")}),this.$("fieldset").append(this.$empty)):this.$empty&&this.$empty.remove()},render:function(){var e=r();return this.collection.fetch().done(s.bind(function(){this.$el.html(o.usersListReadOnly({users:this.collection.toJSON()})),this.renderNoWatchers(),e.resolve(this.$el)},this)),e.promise()}})});