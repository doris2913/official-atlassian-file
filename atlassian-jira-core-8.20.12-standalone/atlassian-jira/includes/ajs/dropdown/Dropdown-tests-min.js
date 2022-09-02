AJS.test.require(["jira.webresources:key-commands","jira.webresources:dropdown"],function(){"use strict";function e(e){return e.click?e.click():r(e).click()}function t(e){return e.focus?e.focus():r(e).focus()}function i(e,t){t=t||document,r(t).trigger({type:"keydown",keyCode:e,which:e})}var o,s,n,r=require("jquery");module("Dropdown Menus",{setup:function(){this.clock=sinon.useFakeTimers(),s=r("<a id='trigger' href='#whoops'>Trigger</a>").appendTo("#qunit-fixture"),o=r("<div id='dropDown' class='aui-list'><ul id='list_id'><li><a id='test-link-1' href='/test/path/1'>Test 1</a></li><li><a id='test-link-2' href='/test/path/2'>Test 2</a></li><li><a id='test-link-3' href='/test/path/3'>Test 3</a></li></ul></div>")},teardown:function(){this.clock.restore(),r(".ajs-layer").remove(),o.remove(),s.remove()}}),test("Pressing enter on the trigger should open the dropdown and not follow the trigger's link",function(){s.appendTo(document.body),AJS.Dropdown.create({content:o,trigger:s}),equal(o.is(":visible"),!1,"should not be visible upon creation"),t(s),i(13,s),equal(o.is(":visible"),!0,"should be visible when the enter key is pressed on the trigger"),equal(window.location.hash,"","the URL hash should not have changed to '#whoops' as a result of activating the trigger"),equal(s.get(0)===document.activeElement,!0,"focus should stay on the trigger because this dropdown is not an auto-focus dropdown")}),test("Activating trigger multiple times should toggle the dropdown in a human-friendly way",function(){s.appendTo(document.body),AJS.Dropdown.create({content:o,trigger:s,stopClickEventPropagation:!1}),equal(o.is(":visible"),!1,"should not be visible upon creation"),i(13,s),i(13,s),equal(o.is(":visible"),!0,"should be visible despite interacting with the toggle twice"),this.clock.tick(4),i(13,s),equal(o.is(":visible"),!1,"should disappear after the second interaction"),this.clock.tick(4),e(s),i(13,s),e(s)}),test("Pressing enter on a trigger for an autofocus dropdown should focus the first dropdown item when opened",function(){s.appendTo(document.body),AJS.Dropdown.create({content:o,trigger:s,focusFirstItem:!0}),t(s),i(13,s),equal(s.get(0)===document.activeElement,!1,"focus should not be on the trigger because this dropdown is an auto-focus dropdown"),equal(r("#test-link-1").get(0)===document.activeElement,!0,"focus should be on the first menu item")}),test("Pressing escape while keyboard focus is inside the dropdown should return focus to the trigger",function(){s.appendTo(document.body),AJS.Dropdown.create({content:o,trigger:s}),t(s),i(13,s),i(40),equal(document.activeElement===document.getElementById("test-link-1"),!0,"the first dropdown item should be focussed"),this.clock.tick(4),i(27),equal(document.activeElement===s.get(0),!0,"the dropdown's trigger should be focussed")}),test("Clicking outside the dropdown should NOT return focus to the trigger",function(){var n=r("<textarea>Click me!</textarea>").appendTo("#qunit-fixture");s.appendTo(document.body),AJS.Dropdown.create({content:o,trigger:s}),t(s),i(13,s),i(40),equal(document.activeElement===document.getElementById("test-link-1"),!0,"the first dropdown item should be focussed"),this.clock.tick(4),e(n.get(0)),equal(document.activeElement===s.get(0),!1,"the dropdown's trigger should NOT be focussed")}),module("Dropdown Menu Items",{setup:function(){s=r("<button type='button' id='trigger'>Trigger</button>").appendTo("#qunit-fixture")},teardown:function(){r(".ajs-layer").remove(),o.remove(),s.remove()}}),test("An arrow keypress does not select hidden list entries",function(){o=r("<div id='dropDown' class='aui-list'><ul id='list_id'><li id='visible-list-entry'><a id='test-link-1' href='/test/path/1'>Test 1</a></li><li id='hidden-list-entry' class='hidden'><a id='test-link-2' href='/test/path/2'>Test 2</a></li></ul></div>"),AJS.Dropdown.create({content:o,trigger:s}),e(s),i(40),equal(r("#visible-list-entry").hasClass("active"),!0,"First LI has active class when down pressed once."),equal(r("#visible-list-entry").find("a").get(0)===document.activeElement,!0,"Menu item link should have document focus"),i(40),equal(r("#hidden-list-entry").hasClass("active"),!1,"Hidden LI doesn't have active class when down pressed twice."),equal(r("#hidden-list-entry").find("a").get(0)===document.activeElement,!1,"Hidden LI should not have document focus.")}),test("An arrow keypress does not select nested list entries",function(){o=r("<div id='dropDown'><ul id='nested_list_id'><li id='first-level-list-entry-1'><ul><li id='nested-list-entry'><a id='test-link-1' href='/test/path/1'>Test 1</a></li></ul></li><li id='first-level-list-entry-2'><a id='test-link-2' href='/test/path/2'>Test 2</a></li></ul></div>"),AJS.Dropdown.create({content:o,trigger:s}),e(s),i(40),equal(r("#nested-list-entry").hasClass("active"),!1,"Nested LI does not have active class when down pressed once."),equal(r("#first-level-list-entry-1").hasClass("active"),!0,"Top level LI has active class when down pressed once."),i(40),ok(r("#first-level-list-entry-2").hasClass("active"),"Second top level LI has active class when down pressed twice."),ok(r("#first-level-list-entry-2").find("a").get(0)===document.activeElement,!0,"Second menu item should have document focus when down pressed twice.")}),test("An arrow keypress does not select an list entry with no anchor",function(){o=r("<div id='dropDown'><ul id='nested_list_id'><li id='empty-first-level-list-entry'><ul></ul></li><li id='first-level-list-entry-1'><a id='test-link-1' href='/test/path/1'>Test 1</a></li></ul></div>"),AJS.Dropdown.create({content:o,trigger:s}),e(s),i(40),equal(r("#empty-first-level-list-entry").hasClass("active"),!1,"Empty LI does not have active class when down pressed."),equal(r("#first-level-list-entry-1").hasClass("active"),!0,"First level LI has active class when down pressed once."),equal(r("#first-level-list-entry-1").find("a").get(0)===document.activeElement,!0,"First level menu item should have document focus when down pressed once.")}),module("Dropdown trigger click event propagation",{setup:function(){n=!1,this.clock=sinon.useFakeTimers(),s=r("<a id='trigger' href='#whoops'>Trigger</a>").appendTo(document.body),o=r("<div id='dropDown' class='aui-list'><ul id='list_id'><li><a id='test-link-1' href='/test/path/1'>Test 1</a></li><li><a id='test-link-2' href='/test/path/2'>Test 2</a></li><li><a id='test-link-3' href='/test/path/3'>Test 3</a></li></ul></div>"),r("body").on("click",function(){n=!0})},teardown:function(){this.clock.restore(),r(".ajs-layer").remove(),o.remove(),s.remove(),r("body").off()}}),test("Click event on trigger is not propagated if stopTriggerClickPropagation is set to true",function(){AJS.Dropdown.create({content:o,trigger:s,stopTriggerClickPropagation:!0}),e(s),this.clock.tick(4),equal(n,!1,"Click event is not propagated")}),test("Click event on trigger is propagated if stopTriggerClickPropagation is set to false",function(){AJS.Dropdown.create({content:o,trigger:s,stopTriggerClickPropagation:!1}),e(s),this.clock.tick(4),equal(n,!0,"Click event is not propagated")}),test("Click event on trigger is propagated if stopTriggerClickPropagation is not set",function(){AJS.Dropdown.create({content:o,trigger:s}),e(s),this.clock.tick(4),equal(n,!0,"Click event is not propagated")})});