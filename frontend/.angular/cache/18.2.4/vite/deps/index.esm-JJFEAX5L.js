import {
  isSupported,
  logEvent,
  setAnalyticsCollectionEnabled,
  setCurrentScreen,
  setUserId,
  setUserProperties,
  settings
} from "./chunk-6C5LZD6Z.js";
import {
  firebase
} from "./chunk-HLQKSGWX.js";
import {
  Component
} from "./chunk-B3VH3QSN.js";
import "./chunk-35ENWJA4.js";

// node_modules/@firebase/analytics-compat/dist/esm/index.esm2017.js
var name = "@firebase/analytics-compat";
var version = "0.2.14";
var AnalyticsService = class {
  constructor(app, _delegate) {
    this.app = app;
    this._delegate = _delegate;
  }
  logEvent(eventName, eventParams, options) {
    logEvent(this._delegate, eventName, eventParams, options);
  }
  /**
   * @deprecated Use {@link logEvent} with `eventName` as 'screen_view' and add relevant `eventParams`.
   * See {@link https://firebase.google.com/docs/analytics/screenviews | Track Screenviews}.
   */
  setCurrentScreen(screenName, options) {
    setCurrentScreen(this._delegate, screenName, options);
  }
  setUserId(id, options) {
    setUserId(this._delegate, id, options);
  }
  setUserProperties(properties, options) {
    setUserProperties(this._delegate, properties, options);
  }
  setAnalyticsCollectionEnabled(enabled) {
    setAnalyticsCollectionEnabled(this._delegate, enabled);
  }
};
var EventName;
(function(EventName2) {
  EventName2["ADD_SHIPPING_INFO"] = "add_shipping_info";
  EventName2["ADD_PAYMENT_INFO"] = "add_payment_info";
  EventName2["ADD_TO_CART"] = "add_to_cart";
  EventName2["ADD_TO_WISHLIST"] = "add_to_wishlist";
  EventName2["BEGIN_CHECKOUT"] = "begin_checkout";
  EventName2["CHECKOUT_PROGRESS"] = "checkout_progress";
  EventName2["EXCEPTION"] = "exception";
  EventName2["GENERATE_LEAD"] = "generate_lead";
  EventName2["LOGIN"] = "login";
  EventName2["PAGE_VIEW"] = "page_view";
  EventName2["PURCHASE"] = "purchase";
  EventName2["REFUND"] = "refund";
  EventName2["REMOVE_FROM_CART"] = "remove_from_cart";
  EventName2["SCREEN_VIEW"] = "screen_view";
  EventName2["SEARCH"] = "search";
  EventName2["SELECT_CONTENT"] = "select_content";
  EventName2["SELECT_ITEM"] = "select_item";
  EventName2["SELECT_PROMOTION"] = "select_promotion";
  EventName2["SET_CHECKOUT_OPTION"] = "set_checkout_option";
  EventName2["SHARE"] = "share";
  EventName2["SIGN_UP"] = "sign_up";
  EventName2["TIMING_COMPLETE"] = "timing_complete";
  EventName2["VIEW_CART"] = "view_cart";
  EventName2["VIEW_ITEM"] = "view_item";
  EventName2["VIEW_ITEM_LIST"] = "view_item_list";
  EventName2["VIEW_PROMOTION"] = "view_promotion";
  EventName2["VIEW_SEARCH_RESULTS"] = "view_search_results";
})(EventName || (EventName = {}));
var factory = (container) => {
  const app = container.getProvider("app-compat").getImmediate();
  const analyticsServiceExp = container.getProvider("analytics").getImmediate();
  return new AnalyticsService(app, analyticsServiceExp);
};
function registerAnalytics() {
  const namespaceExports = {
    Analytics: AnalyticsService,
    settings,
    isSupported,
    // We removed this enum in exp so need to re-create it here for compat.
    EventName
  };
  firebase.INTERNAL.registerComponent(new Component(
    "analytics-compat",
    factory,
    "PUBLIC"
    /* ComponentType.PUBLIC */
  ).setServiceProps(namespaceExports).setMultipleInstances(true));
}
registerAnalytics();
firebase.registerVersion(name, version);
/*! Bundled license information:

@firebase/analytics-compat/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
//# sourceMappingURL=index.esm-JJFEAX5L.js.map
