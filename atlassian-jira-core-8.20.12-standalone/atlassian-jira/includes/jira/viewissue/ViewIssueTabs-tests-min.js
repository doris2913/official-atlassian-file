AJS.test.require(["jira.webresources:viewissue-tabs"],function(){"use strict";var e=require("jquery");module("ViewIssueTabs",{setup:function(){this.viewIssueTabs=require("jira/viewissue/tabs"),e.fn.livestamp=sinon.stub()}}),test("Should set performance mark",function(){var s=e('<div><time class="livestamp"></time></div>');this.viewIssueTabs.domReady(s),ok(1===performance.getEntries().filter(function(e){return"activityTabFullyLoaded"===e.name}).length)})});