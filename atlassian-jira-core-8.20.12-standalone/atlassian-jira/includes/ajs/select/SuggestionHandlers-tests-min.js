AJS.test.require(["jira.webresources:select-pickers"],function(){"use strict";var e=require("underscore"),t=require("jquery"),s=require("jira/ajs/select/select-model"),r=require("jira/ajs/select/suggestions/assignee-suggest-handler"),n=require("jira/ajs/select/suggestions/checkbox-multi-select-suggest-handler"),o=require("jira/ajs/select/suggestions/only-new-items-suggest-handler");module("CheckboxMultiSelectSuggestHandler",{setup:function(){this.sandbox=sinon.sandbox.create(),this.clock=this.sandbox.useFakeTimers(),this.server=this.sandbox.useFakeServer()},teardown:function(){this.clock.restore(),this.server.restore()}}),test("Does not show duplicate selected values for empty query",function(){var e=t("<select multiple='true'><optgroup label='stuff'><option value='xxx' selected='true'></option></optgroup><optgroup label='more'><option value='xxx' selected='true'></option></optgroup></select>"),r=new s({element:e}),o=new n({},r),a=o.formatSuggestions([],"");equal(a.length,1);var i=a[0];equal(i.items().length,1)}),test("Footer text only shows for empty query",function(){expect(2);var e=t("<select multiple='true'><optgroup label='stuff'><option value='xxx' selected='true'></option></optgroup></select>"),n=new s({element:e}),o=new r({ajaxOptions:{url:"",query:!0}},n);o.execute("").done(function(e){equal("user.picker.ajax.short.desc",e[0].footerText())}),o.execute("a").done(function(e){ok(!e[0].footerText())})}),test("Clear link shows when there are 2 or more suggestions",function(){expect(2);var e=t("<select multiple='true'><optgroup label='stuff'><option value='zzz' selected='true'></option><option value='xxx' selected='true'></option></optgroup></select>"),r=new s({element:e}),o=new n({},r);o.execute("").done(function(e){equal(t(e[0].actionBarHtml()).find(".clear-all").length,1,"expected clear all to be added because there are 2 selected")}),e=t("<select multiple='true'><optgroup label='stuff'><option value='xxx' selected='true'></option><option value='xxx2'></optgroup></select>"),r=new s({element:e}),o=new n({},r),o.execute("").done(function(e){equal(t(e[0].actionBarHtml()).find(".clear-all").length,0,"expected clear all not to be added because there is only 1 selected")})}),test("Cancels unnecessary requests",function(){var e=new AJS.AjaxDescriptorFetcher({query:!0,formatResponse:function(e){return new AJS.ItemDescriptor({value:e.correctData,label:e.correctData})}}),t=sinon.spy(),s=sinon.spy();e.execute("a").done(t),e.execute("ab").done(s),ok(this.server.requests[0].aborted,"first request should be aborted"),equal(t.callCount,0,"first request should never return."),this.server.requests[1].respond(200,{"Content-Type":"application/json"},JSON.stringify({correctData:"correctData"})),equal(s.args[0][0].value(),"correctData","correct data is returned")}),test("Will not search when query is shorter than minQueryLength parameter",function(){var e=new AJS.AjaxDescriptorFetcher({query:!0,minQueryLength:2,formatResponse:function(e){return new AJS.ItemDescriptor({value:e.correctData,label:e.correctData})}}),t=sinon.spy(),s=sinon.spy();e.execute("a").done(t),equal(t.args[0][0],void 0,"first request is not returning data"),equal(this.server.requests.length,0,"server is not called"),e.execute("ab").done(s),this.server.requests[0].respond(200,{"Content-Type":"application/json"},JSON.stringify({correctData:"correctData"})),equal(this.server.requests.length,1,"server was called once on another keystroke"),equal(s.args[0][0].value(),"correctData","correct data is returned")}),test("Uses configurable debouncing for searching",function(){var e=new AJS.AjaxDescriptorFetcher({minQueryLength:0,keyInputPeriod:200,formatResponse:function(e){return new AJS.ItemDescriptor({value:e.correctData,label:e.correctData})}}),t=sinon.spy();e.execute("a").done(),e.execute("ab").done(),e.execute("abc").done(),e.execute("abcd").done(t),equal(this.server.requests.length,0,"request is not sent immediately"),this.clock.tick(170),equal(this.server.requests.length,0,"request is not sent after default delay, but respects configuration"),this.clock.tick(100),equal(this.server.requests.length,1,"only one request was sent"),this.server.requests[0].respond(200,{"Content-Type":"application/json"},JSON.stringify({correctData:"correctData"})),equal(t.args[0][0].value(),"correctData","correct data is returned"),this.clock.restore(),this.server.restore()}),test("Keeps last response with debounced queries",function(){var e=new AJS.AjaxDescriptorFetcher({keyInputPeriod:10,minQueryLength:2,formatResponse:function(e){return new AJS.ItemDescriptor({value:e.correctData,label:e.correctData})}}),t=sinon.spy(),s=sinon.spy();e.execute("ab").done(t),this.clock.tick(20),this.server.requests[0].respond(200,{"Content-Type":"application/json"},JSON.stringify({correctData:"correctData"})),e.execute("a").done(s),this.clock.tick(20),equal(t.args[0][0].value(),"correctData","correct data is returned"),equal(s.args[0][0].value(),"correctData","second request is returning last response")}),test("Preserves search results items even if they already are in the suggestions",function(){var e=t("<select multiple='true'></select>"),r=new s({element:e}),o=sinon.fakeServer.create(),a=new n({content:"mixed",ajaxOptions:{url:"fake",query:!0,formatResponse:function(e){return new AJS.ItemDescriptor({value:e.value,label:e.label})}}},r);r.getAllDescriptors=function(){return[new AJS.ItemDescriptor({value:"val1",label:"Value 1"}),new AJS.ItemDescriptor({value:"val2",label:"Value 2"})]},a.execute("query").done(function(e){equal(e[0].items()[0].value(),"val1"),equal(e[0].items()[0].label(),"*Value 1*"),equal(e[0].items()[1].value(),"val2"),equal(e[0].items()[1].label(),"Value 2"),equal(e[0].items().length,2)}),o.requests[0].respond(200,{"Content-Type":"application/json"},JSON.stringify({value:"val1",label:"*Value 1*"}))}),test("MixedDescriptorFetcher with suggestion at top",function(){var s=t("<select multiple='true'><optgroup label='stuff'><option value='xxx' selected='true'></option></optgroup></select>"),r=new AJS.SelectModel({element:s}),n=sinon.fakeServer.create();new AJS.MixedDescriptorFetcher({ajaxOptions:{url:"fake",minQueryLength:0,query:!0,formatResponse:function(e){return e}},suggestionAtTop:!0},r).execute("").done(function(t){ok(e.isEqual(t[0],r.getAllDescriptors()[0]))}),n.requests[0].respond(200,{"Content-Type":"application/json"},JSON.stringify({value:"val1",label:"*Value 1*"}))}),test("MixedDescriptorFetcher with suggestion at bottom",function(){var s=t("<select multiple='true'><optgroup label='stuff'><option value='xxx' selected='true'></option></optgroup></select>"),r=new AJS.SelectModel({element:s}),n=sinon.fakeServer.create();new AJS.MixedDescriptorFetcher({ajaxOptions:{url:"fake",minQueryLength:0,query:!0,formatResponse:function(e){return e}},suggestionAtTop:!1},r).execute("").done(function(t){ok(e.isEqual(t[1],r.getAllDescriptors()[0]))}),n.requests[0].respond(200,{"Content-Type":"application/json"},JSON.stringify({value:"val1",label:"*Value 1*"}))}),module("OnlyNewItemsSuggestHandler",{setup:function(){var e=t("<select multiple='true'><option value='stuff'>Stuff</option><option value='more'>A ? for you</option></select>"),r=new s({element:e});this.suggestHandler=new o({userEnteredOptionsMsg:"Create new"},r)}}),test("Query that doesn't match any existing items gets mirrored",function(){strictEqual(this.suggestHandler.validateMirroring("Other"),!0)}),test("Query that matches an existing item doesn't get mirrored",function(){strictEqual(this.suggestHandler.validateMirroring("Stuff"),!1)}),test("Query that only partially matches an existing item gets mirrored",function(){strictEqual(this.suggestHandler.validateMirroring("Stuf"),!0)}),test("Query with a matching item that differs only by case does not get mirrored",function(){strictEqual(this.suggestHandler.validateMirroring("sTuFf"),!1)}),test("Query with special symbols that differs only by case does not get mirrored",function(){strictEqual(this.suggestHandler.validateMirroring("a ? for YOU"),!1)}),module("SelectSuggestHandler",{setup:function(){this.sandbox=sinon.sandbox.create(),this.context=AJS.test.mockableModuleContext(),this.SuggestHelper={removeSelected:this.sandbox.stub(),createDescriptorFetcher:this.sandbox.stub()},this.context.mock("jira/ajs/select/suggestions/suggest-helper",this.SuggestHelper),this.SelectSuggestHandler=this.context.require("jira/ajs/select/suggestions/select-suggest-handler")},teardown:function(){this.sandbox.restore()}}),test("Suggest handler optionally removes selected values",function(){var e={getDisplayableSelectedDescriptors:this.sandbox.stub()};new this.SelectSuggestHandler({disableRemoveSelected:!0},e).formatSuggestions([],"test"),sinon.assert.notCalled(this.SuggestHelper.removeSelected,"Does not remove selected values with disableRemoveSelected"),new this.SelectSuggestHandler({},e).formatSuggestions([],"test"),sinon.assert.calledOnce(this.SuggestHelper.removeSelected,"Removes selected values by default")})});