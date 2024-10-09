import {
  getAnalytics,
  getGoogleAnalyticsClientId,
  initializeAnalytics,
  isSupported,
  logEvent,
  setAnalyticsCollectionEnabled,
  setConsent,
  setCurrentScreen,
  setDefaultEventParameters,
  setUserId,
  setUserProperties,
  settings
} from "./chunk-6C5LZD6Z.js";
import {
  AngularFireAuth
} from "./chunk-MBN46QXS.js";
import {
  FirebaseApp
} from "./chunk-X36KOQDH.js";
import {
  FirebaseApp as FirebaseApp2,
  ɵapplyMixins,
  ɵcacheInstance,
  ɵlazySDKProxy
} from "./chunk-5JECKIIS.js";
import {
  VERSION,
  ɵAngularFireSchedulers,
  ɵgetAllInstancesOf,
  ɵgetDefaultInstanceOf,
  ɵisSupportedError,
  ɵzoneWrap
} from "./chunk-ZRLJRTXD.js";
import {
  ActivationEnd,
  Router,
  ɵEmptyOutletComponent
} from "./chunk-5WT6NG73.js";
import "./chunk-GCVZNSAR.js";
import {
  firebase
} from "./chunk-HLQKSGWX.js";
import {
  Title
} from "./chunk-UULDRFLU.js";
import "./chunk-JQJXKPM6.js";
import {
  applyActionCode,
  beforeAuthStateChanged,
  checkActionCode,
  confirmPasswordReset,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  deleteUser,
  fetchSignInMethodsForEmail,
  getAdditionalUserInfo,
  getAuth,
  getIdToken,
  getIdTokenResult,
  getMultiFactorResolver,
  getRedirectResult,
  initializeAuth,
  initializeRecaptchaConfig,
  isSignInWithEmailLink,
  linkWithCredential,
  linkWithPhoneNumber,
  linkWithPopup,
  linkWithRedirect,
  multiFactor,
  onAuthStateChanged,
  onIdTokenChanged,
  parseActionCodeURL,
  reauthenticateWithCredential,
  reauthenticateWithPhoneNumber,
  reauthenticateWithPopup,
  reauthenticateWithRedirect,
  reload,
  revokeAccessToken,
  sendEmailVerification,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
  setPersistence,
  signInAnonymously,
  signInWithCredential,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  signInWithPhoneNumber,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  unlink,
  updateCurrentUser,
  updateEmail,
  updatePassword,
  updatePhoneNumber,
  updateProfile,
  useDeviceLanguage,
  validatePassword,
  verifyBeforeUpdateEmail,
  verifyPasswordResetCode
} from "./chunk-GDFLO2NA.js";
import {
  registerVersion
} from "./chunk-B3VH3QSN.js";
import "./chunk-H6FISBKU.js";
import {
  isPlatformBrowser,
  isPlatformServer
} from "./chunk-B5XTBFL2.js";
import {
  APP_INITIALIZER,
  ComponentFactoryResolver$1,
  EMPTY,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  NgModule,
  NgZone,
  Observable,
  Optional,
  PLATFORM_ID,
  concatMap,
  distinct,
  distinctUntilChanged,
  filter,
  from,
  groupBy,
  map,
  mergeMap,
  observeOn,
  of,
  pairwise,
  setClassMetadata,
  shareReplay,
  startWith,
  switchMap,
  timer,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵinject
} from "./chunk-4VM36UTH.js";
import "./chunk-D3QWRFYF.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-35ENWJA4.js";

// node_modules/rxfire/auth/index.esm.js
function authState(auth) {
  return new Observable(function(subscriber) {
    var unsubscribe = onAuthStateChanged(auth, subscriber.next.bind(subscriber), subscriber.error.bind(subscriber), subscriber.complete.bind(subscriber));
    return {
      unsubscribe
    };
  });
}
function user(auth) {
  return new Observable(function(subscriber) {
    var unsubscribe = onIdTokenChanged(auth, subscriber.next.bind(subscriber), subscriber.error.bind(subscriber), subscriber.complete.bind(subscriber));
    return {
      unsubscribe
    };
  });
}
function idToken(auth) {
  return user(auth).pipe(switchMap(function(user3) {
    return user3 ? from(getIdToken(user3)) : of(null);
  }));
}

// node_modules/@angular/fire/fesm2022/angular-fire-auth.mjs
var AUTH_PROVIDER_NAME = "auth";
var Auth = class {
  constructor(auth) {
    return auth;
  }
};
var AuthInstances = class {
  constructor() {
    return ɵgetAllInstancesOf(AUTH_PROVIDER_NAME);
  }
};
var authInstance$ = timer(0, 300).pipe(concatMap(() => from(ɵgetAllInstancesOf(AUTH_PROVIDER_NAME))), distinct());
var PROVIDED_AUTH_INSTANCES = new InjectionToken("angularfire2.auth-instances");
function defaultAuthInstanceFactory(provided, defaultApp) {
  const defaultAuth = ɵgetDefaultInstanceOf(AUTH_PROVIDER_NAME, provided, defaultApp);
  return defaultAuth && new Auth(defaultAuth);
}
var AUTH_INSTANCES_PROVIDER = {
  provide: AuthInstances,
  deps: [[new Optional(), PROVIDED_AUTH_INSTANCES]]
};
var DEFAULT_AUTH_INSTANCE_PROVIDER = {
  provide: Auth,
  useFactory: defaultAuthInstanceFactory,
  deps: [[new Optional(), PROVIDED_AUTH_INSTANCES], FirebaseApp]
};
var AuthModule = class _AuthModule {
  constructor() {
    registerVersion("angularfire", VERSION.full, "auth");
  }
  static ɵfac = function AuthModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _AuthModule
  });
  static ɵinj = ɵɵdefineInjector({
    providers: [DEFAULT_AUTH_INSTANCE_PROVIDER, AUTH_INSTANCES_PROVIDER]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthModule, [{
    type: NgModule,
    args: [{
      providers: [DEFAULT_AUTH_INSTANCE_PROVIDER, AUTH_INSTANCES_PROVIDER]
    }]
  }], () => [], null);
})();
var authState2 = ɵzoneWrap(authState, true);
var user2 = ɵzoneWrap(user, true);
var idToken2 = ɵzoneWrap(idToken, true);
var applyActionCode2 = ɵzoneWrap(applyActionCode, true);
var beforeAuthStateChanged2 = ɵzoneWrap(beforeAuthStateChanged, true);
var checkActionCode2 = ɵzoneWrap(checkActionCode, true);
var confirmPasswordReset2 = ɵzoneWrap(confirmPasswordReset, true);
var connectAuthEmulator2 = ɵzoneWrap(connectAuthEmulator, true);
var createUserWithEmailAndPassword2 = ɵzoneWrap(createUserWithEmailAndPassword, true);
var deleteUser2 = ɵzoneWrap(deleteUser, true);
var fetchSignInMethodsForEmail2 = ɵzoneWrap(fetchSignInMethodsForEmail, true);
var getAdditionalUserInfo2 = ɵzoneWrap(getAdditionalUserInfo, true);
var getAuth2 = ɵzoneWrap(getAuth, true);
var getIdToken2 = ɵzoneWrap(getIdToken, true);
var getIdTokenResult2 = ɵzoneWrap(getIdTokenResult, true);
var getMultiFactorResolver2 = ɵzoneWrap(getMultiFactorResolver, true);
var getRedirectResult2 = ɵzoneWrap(getRedirectResult, true);
var initializeAuth2 = ɵzoneWrap(initializeAuth, true);
var initializeRecaptchaConfig2 = ɵzoneWrap(initializeRecaptchaConfig, true);
var isSignInWithEmailLink2 = ɵzoneWrap(isSignInWithEmailLink, true);
var linkWithCredential2 = ɵzoneWrap(linkWithCredential, true);
var linkWithPhoneNumber2 = ɵzoneWrap(linkWithPhoneNumber, true);
var linkWithPopup2 = ɵzoneWrap(linkWithPopup, true);
var linkWithRedirect2 = ɵzoneWrap(linkWithRedirect, true);
var multiFactor2 = ɵzoneWrap(multiFactor, true);
var onAuthStateChanged2 = ɵzoneWrap(onAuthStateChanged, true);
var onIdTokenChanged2 = ɵzoneWrap(onIdTokenChanged, true);
var parseActionCodeURL2 = ɵzoneWrap(parseActionCodeURL, true);
var reauthenticateWithCredential2 = ɵzoneWrap(reauthenticateWithCredential, true);
var reauthenticateWithPhoneNumber2 = ɵzoneWrap(reauthenticateWithPhoneNumber, true);
var reauthenticateWithPopup2 = ɵzoneWrap(reauthenticateWithPopup, true);
var reauthenticateWithRedirect2 = ɵzoneWrap(reauthenticateWithRedirect, true);
var reload2 = ɵzoneWrap(reload, true);
var revokeAccessToken2 = ɵzoneWrap(revokeAccessToken, true);
var sendEmailVerification2 = ɵzoneWrap(sendEmailVerification, true);
var sendPasswordResetEmail2 = ɵzoneWrap(sendPasswordResetEmail, true);
var sendSignInLinkToEmail2 = ɵzoneWrap(sendSignInLinkToEmail, true);
var setPersistence2 = ɵzoneWrap(setPersistence, true);
var signInAnonymously2 = ɵzoneWrap(signInAnonymously, true);
var signInWithCredential2 = ɵzoneWrap(signInWithCredential, true);
var signInWithCustomToken2 = ɵzoneWrap(signInWithCustomToken, true);
var signInWithEmailAndPassword2 = ɵzoneWrap(signInWithEmailAndPassword, true);
var signInWithEmailLink2 = ɵzoneWrap(signInWithEmailLink, true);
var signInWithPhoneNumber2 = ɵzoneWrap(signInWithPhoneNumber, true);
var signInWithPopup2 = ɵzoneWrap(signInWithPopup, true);
var signInWithRedirect2 = ɵzoneWrap(signInWithRedirect, true);
var signOut2 = ɵzoneWrap(signOut, true);
var unlink2 = ɵzoneWrap(unlink, true);
var updateCurrentUser2 = ɵzoneWrap(updateCurrentUser, true);
var updateEmail2 = ɵzoneWrap(updateEmail, true);
var updatePassword2 = ɵzoneWrap(updatePassword, true);
var updatePhoneNumber2 = ɵzoneWrap(updatePhoneNumber, true);
var updateProfile2 = ɵzoneWrap(updateProfile, true);
var useDeviceLanguage2 = ɵzoneWrap(useDeviceLanguage, true);
var validatePassword2 = ɵzoneWrap(validatePassword, true);
var verifyBeforeUpdateEmail2 = ɵzoneWrap(verifyBeforeUpdateEmail, true);
var verifyPasswordResetCode2 = ɵzoneWrap(verifyPasswordResetCode, true);

// node_modules/@angular/fire/fesm2022/angular-fire-analytics.mjs
var Analytics = class {
  constructor(analytics) {
    return analytics;
  }
};
var ANALYTICS_PROVIDER_NAME = "analytics";
var AnalyticsInstances = class {
  constructor() {
    return ɵgetAllInstancesOf(ANALYTICS_PROVIDER_NAME);
  }
};
var analyticInstance$ = timer(0, 300).pipe(concatMap(() => from(ɵgetAllInstancesOf(ANALYTICS_PROVIDER_NAME))), distinct());
var isAnalyticsSupportedValueSymbol = "__angularfire_symbol__analyticsIsSupportedValue";
var isAnalyticsSupportedPromiseSymbol = "__angularfire_symbol__analyticsIsSupported";
globalThis[isAnalyticsSupportedPromiseSymbol] ||= isSupported().then((it) => globalThis[isAnalyticsSupportedValueSymbol] = it).catch(() => globalThis[isAnalyticsSupportedValueSymbol] = false);
var isAnalyticsSupportedFactory = {
  async: () => globalThis[isAnalyticsSupportedPromiseSymbol],
  sync: () => {
    const ret = globalThis[isAnalyticsSupportedValueSymbol];
    if (ret === void 0) {
      throw new Error(ɵisSupportedError("Analytics"));
    }
    return ret;
  }
};
var isSupported2 = isAnalyticsSupportedFactory.async;
var getAnalytics2 = ɵzoneWrap(getAnalytics, true);
var getGoogleAnalyticsClientId2 = ɵzoneWrap(getGoogleAnalyticsClientId, true);
var initializeAnalytics2 = ɵzoneWrap(initializeAnalytics, true);
var logEvent2 = ɵzoneWrap(logEvent, true);
var setAnalyticsCollectionEnabled2 = ɵzoneWrap(setAnalyticsCollectionEnabled, true);
var setConsent2 = ɵzoneWrap(setConsent, true);
var setCurrentScreen2 = ɵzoneWrap(setCurrentScreen, true);
var setDefaultEventParameters2 = ɵzoneWrap(setDefaultEventParameters, true);
var settings2 = ɵzoneWrap(settings, true);
var setUserId2 = ɵzoneWrap(setUserId, true);
var setUserProperties2 = ɵzoneWrap(setUserProperties, true);
var UserTrackingService = class _UserTrackingService {
  initialized;
  disposables = [];
  constructor(auth, zone, injector) {
    registerVersion("angularfire", VERSION.full, "user-tracking");
    let resolveInitialized;
    this.initialized = zone.runOutsideAngular(() => new Promise((resolve) => {
      resolveInitialized = resolve;
    }));
    isSupported2().then(() => {
      const analytics = injector.get(Analytics);
      if (analytics) {
        this.disposables = [
          // TODO add credential tracking back in
          authState2(auth).subscribe((user3) => {
            setUserId2(analytics, user3?.uid);
            resolveInitialized();
          })
        ];
      } else {
        resolveInitialized();
      }
    });
  }
  ngOnDestroy() {
    this.disposables.forEach((it) => it.unsubscribe());
  }
  static ɵfac = function UserTrackingService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserTrackingService)(ɵɵinject(Auth), ɵɵinject(NgZone), ɵɵinject(Injector));
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _UserTrackingService,
    factory: _UserTrackingService.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserTrackingService, [{
    type: Injectable
  }], () => [{
    type: Auth
  }, {
    type: NgZone
  }, {
    type: Injector
  }], null);
})();
var FIREBASE_EVENT_ORIGIN_KEY = "firebase_event_origin";
var FIREBASE_PREVIOUS_SCREEN_CLASS_KEY = "firebase_previous_class";
var FIREBASE_PREVIOUS_SCREEN_INSTANCE_ID_KEY = "firebase_previous_id";
var FIREBASE_PREVIOUS_SCREEN_NAME_KEY = "firebase_previous_screen";
var FIREBASE_SCREEN_CLASS_KEY = "firebase_screen_class";
var FIREBASE_SCREEN_INSTANCE_ID_KEY = "firebase_screen_id";
var FIREBASE_SCREEN_NAME_KEY = "firebase_screen";
var OUTLET_KEY = "outlet";
var PAGE_PATH_KEY = "page_path";
var PAGE_TITLE_KEY = "page_title";
var SCREEN_CLASS_KEY = "screen_class";
var SCREEN_NAME_KEY = "screen_name";
var SCREEN_VIEW_EVENT = "screen_view";
var EVENT_ORIGIN_AUTO = "auto";
var SCREEN_INSTANCE_DELIMITER = "#";
var nextScreenInstanceID = Math.floor(Math.random() * (2 ** 32 - 1)) - 2 ** 31;
var knownScreenInstanceIDs = {};
var getScreenInstanceID = (params) => {
  const screenInstanceKey = [params[SCREEN_CLASS_KEY], params[OUTLET_KEY]].join(SCREEN_INSTANCE_DELIMITER);
  if (knownScreenInstanceIDs.hasOwnProperty(screenInstanceKey)) {
    return knownScreenInstanceIDs[screenInstanceKey];
  } else {
    const ret = nextScreenInstanceID++;
    knownScreenInstanceIDs[screenInstanceKey] = ret;
    return ret;
  }
};
var ɵscreenViewEvent = (router, title, componentFactoryResolver) => {
  const activationEndEvents = router.events.pipe(filter((e) => e instanceof ActivationEnd));
  return activationEndEvents.pipe(switchMap((activationEnd) => {
    const urlTree = router.parseUrl(router.url.replace(/(?:\().+(?:\))/g, (a) => a.replace("://", ":///")));
    const pagePath = urlTree.root.children[activationEnd.snapshot.outlet]?.toString() || "";
    const actualSnapshot = router.routerState.root.children.map((it) => it).find((it) => it.outlet === activationEnd.snapshot.outlet);
    if (!actualSnapshot) {
      return of(null);
    }
    let actualDeep = actualSnapshot;
    while (actualDeep.firstChild) {
      actualDeep = actualDeep.firstChild;
    }
    const screenName = actualDeep.pathFromRoot.map((s) => s.routeConfig?.path).filter((it) => it).join("/") || "/";
    const params = {
      [SCREEN_NAME_KEY]: screenName,
      [PAGE_PATH_KEY]: `/${pagePath}`,
      [FIREBASE_EVENT_ORIGIN_KEY]: EVENT_ORIGIN_AUTO,
      [FIREBASE_SCREEN_NAME_KEY]: screenName,
      [OUTLET_KEY]: activationEnd.snapshot.outlet
    };
    if (title) {
      params[PAGE_TITLE_KEY] = title.getTitle();
    }
    let component = actualSnapshot.component;
    if (component) {
      if (component === ɵEmptyOutletComponent) {
        let deepSnapshot = activationEnd.snapshot;
        while (deepSnapshot.firstChild) {
          deepSnapshot = deepSnapshot.firstChild;
        }
        component = deepSnapshot.component;
      }
    } else {
      component = activationEnd.snapshot.component;
    }
    if (typeof component === "string") {
      return of(__spreadProps(__spreadValues({}, params), {
        [SCREEN_CLASS_KEY]: component
      }));
    } else if (component) {
      const componentFactory = componentFactoryResolver.resolveComponentFactory(component);
      return of(__spreadProps(__spreadValues({}, params), {
        [SCREEN_CLASS_KEY]: componentFactory.selector
      }));
    }
    return of(null);
  }), filter((it) => !!it), map((params) => __spreadValues({
    [FIREBASE_SCREEN_CLASS_KEY]: params[SCREEN_CLASS_KEY],
    [FIREBASE_SCREEN_INSTANCE_ID_KEY]: getScreenInstanceID(params)
  }, params)), groupBy((it) => it[OUTLET_KEY]), mergeMap((it) => it.pipe(distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)), startWith(void 0), pairwise(), map(([prior, current]) => prior ? __spreadValues({
    [FIREBASE_PREVIOUS_SCREEN_CLASS_KEY]: prior[SCREEN_CLASS_KEY],
    [FIREBASE_PREVIOUS_SCREEN_NAME_KEY]: prior[SCREEN_NAME_KEY],
    [FIREBASE_PREVIOUS_SCREEN_INSTANCE_ID_KEY]: prior[FIREBASE_SCREEN_INSTANCE_ID_KEY]
  }, current) : current))));
};
var ScreenTrackingService = class _ScreenTrackingService {
  disposable;
  constructor(router, title, componentFactoryResolver, zone, userTrackingService, injector) {
    registerVersion("angularfire", VERSION.full, "screen-tracking");
    isSupported2().then(() => {
      const analytics = injector.get(Analytics);
      if (!router || !analytics) {
        return;
      }
      zone.runOutsideAngular(() => {
        this.disposable = ɵscreenViewEvent(router, title, componentFactoryResolver).pipe(switchMap((params) => __async(this, null, function* () {
          if (userTrackingService) {
            yield userTrackingService.initialized;
          }
          return logEvent2(analytics, SCREEN_VIEW_EVENT, params);
        }))).subscribe();
      });
    });
  }
  ngOnDestroy() {
    if (this.disposable) {
      this.disposable.unsubscribe();
    }
  }
  static ɵfac = function ScreenTrackingService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ScreenTrackingService)(ɵɵinject(Router, 8), ɵɵinject(Title, 8), ɵɵinject(ComponentFactoryResolver$1), ɵɵinject(NgZone), ɵɵinject(UserTrackingService, 8), ɵɵinject(Injector));
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _ScreenTrackingService,
    factory: _ScreenTrackingService.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScreenTrackingService, [{
    type: Injectable
  }], () => [{
    type: Router,
    decorators: [{
      type: Optional
    }]
  }, {
    type: Title,
    decorators: [{
      type: Optional
    }]
  }, {
    type: ComponentFactoryResolver$1
  }, {
    type: NgZone
  }, {
    type: UserTrackingService,
    decorators: [{
      type: Optional
    }]
  }, {
    type: Injector
  }], null);
})();
var PROVIDED_ANALYTICS_INSTANCES = new InjectionToken("angularfire2.analytics-instances");
function defaultAnalyticsInstanceFactory(provided, defaultApp) {
  if (!isAnalyticsSupportedFactory.sync()) {
    return null;
  }
  const defaultAnalytics = ɵgetDefaultInstanceOf(ANALYTICS_PROVIDER_NAME, provided, defaultApp);
  return defaultAnalytics && new Analytics(defaultAnalytics);
}
var ANALYTICS_INSTANCES_PROVIDER = {
  provide: AnalyticsInstances,
  deps: [[new Optional(), PROVIDED_ANALYTICS_INSTANCES]]
};
var DEFAULT_ANALYTICS_INSTANCE_PROVIDER = {
  provide: Analytics,
  useFactory: defaultAnalyticsInstanceFactory,
  deps: [[new Optional(), PROVIDED_ANALYTICS_INSTANCES], FirebaseApp]
};
var AnalyticsModule = class _AnalyticsModule {
  constructor(_screenTrackingService, _userTrackingService) {
    registerVersion("angularfire", VERSION.full, "analytics");
  }
  static ɵfac = function AnalyticsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AnalyticsModule)(ɵɵinject(ScreenTrackingService, 8), ɵɵinject(UserTrackingService, 8));
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _AnalyticsModule
  });
  static ɵinj = ɵɵdefineInjector({
    providers: [DEFAULT_ANALYTICS_INSTANCE_PROVIDER, ANALYTICS_INSTANCES_PROVIDER, {
      provide: APP_INITIALIZER,
      useValue: isAnalyticsSupportedFactory.async,
      multi: true
    }]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AnalyticsModule, [{
    type: NgModule,
    args: [{
      providers: [DEFAULT_ANALYTICS_INSTANCE_PROVIDER, ANALYTICS_INSTANCES_PROVIDER, {
        provide: APP_INITIALIZER,
        useValue: isAnalyticsSupportedFactory.async,
        multi: true
      }]
    }]
  }], () => [{
    type: ScreenTrackingService,
    decorators: [{
      type: Optional
    }]
  }, {
    type: UserTrackingService,
    decorators: [{
      type: Optional
    }]
  }], null);
})();

// node_modules/@angular/fire/fesm2022/angular-fire-compat-analytics.mjs
var proxyPolyfillCompat = {
  app: null,
  logEvent: null,
  setCurrentScreen: null,
  setUserId: null,
  setUserProperties: null,
  setAnalyticsCollectionEnabled: null
};
var COLLECTION_ENABLED = new InjectionToken("angularfire2.analytics.analyticsCollectionEnabled");
var APP_VERSION = new InjectionToken("angularfire2.analytics.appVersion");
var APP_NAME = new InjectionToken("angularfire2.analytics.appName");
var DEBUG_MODE = new InjectionToken("angularfire2.analytics.debugMode");
var CONFIG = new InjectionToken("angularfire2.analytics.config");
var APP_NAME_KEY = "app_name";
var APP_VERSION_KEY = "app_version";
var DEBUG_MODE_KEY = "debug_mode";
var GTAG_CONFIG_COMMAND = "config";
var GTAG_FUNCTION_NAME = "gtag";
var DATA_LAYER_NAME = "dataLayer";
var SEND_TO_KEY = "send_to";
var AngularFireAnalytics = class _AngularFireAnalytics {
  measurementId;
  analyticsInitialized = new Promise(() => void 0);
  updateConfig(config) {
    return __async(this, null, function* () {
      yield this.analyticsInitialized;
      window[GTAG_FUNCTION_NAME](GTAG_CONFIG_COMMAND, this.measurementId, __spreadProps(__spreadValues({}, config), {
        update: true
      }));
    });
  }
  constructor(app, analyticsCollectionEnabled, providedAppVersion, providedAppName, debugModeEnabled, providedConfig, platformId, zone, schedulers) {
    if (isPlatformBrowser(platformId)) {
      window[DATA_LAYER_NAME] = window[DATA_LAYER_NAME] || [];
      const parseMeasurementId = (...args) => {
        if (args[0] === "config" && args[2].origin === "firebase") {
          this.measurementId = args[1];
          return true;
        } else {
          return false;
        }
      };
      const patchGtag = (fn) => {
        window[GTAG_FUNCTION_NAME] = (...args) => {
          if (fn) {
            fn(...args);
          }
          if (args[0] === "event" && args[2][SEND_TO_KEY] === this.measurementId) {
            if (providedAppName) {
              args[2][APP_NAME_KEY] = providedAppName;
            }
            if (providedAppVersion) {
              args[2][APP_VERSION_KEY] = providedAppVersion;
            }
          }
          if (debugModeEnabled && typeof console !== "undefined") {
            console.info(...args);
          }
          (function(..._args) {
            window[DATA_LAYER_NAME].push(arguments);
          })(...args);
        };
      };
      const firebaseAnalyticsAlreadyInitialized = window[DATA_LAYER_NAME].some(parseMeasurementId);
      if (firebaseAnalyticsAlreadyInitialized) {
        this.analyticsInitialized = Promise.resolve();
        patchGtag();
      } else {
        this.analyticsInitialized = new Promise((resolve) => {
          patchGtag((...args) => {
            if (parseMeasurementId(...args)) {
              resolve();
            }
          });
        });
      }
      if (providedConfig) {
        this.updateConfig(providedConfig);
      }
      if (debugModeEnabled) {
        this.updateConfig({
          [DEBUG_MODE_KEY]: 1
        });
      }
    } else {
      this.analyticsInitialized = Promise.resolve();
    }
    const analytics = of(void 0).pipe(observeOn(schedulers.outsideAngular), switchMap(isSupported), switchMap((supported) => supported ? zone.runOutsideAngular(() => import("./index.esm-JJFEAX5L.js")) : EMPTY), map(() => {
      return ɵcacheInstance(`analytics`, "AngularFireAnalytics", app.name, () => {
        const analytics2 = app.analytics();
        if (analyticsCollectionEnabled === false) {
          analytics2.setAnalyticsCollectionEnabled(false);
        }
        return analytics2;
      }, [app, analyticsCollectionEnabled, providedConfig, debugModeEnabled]);
    }), shareReplay({
      bufferSize: 1,
      refCount: false
    }));
    return ɵlazySDKProxy(this, analytics, zone);
  }
  static ɵfac = function AngularFireAnalytics_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AngularFireAnalytics)(ɵɵinject(FirebaseApp2), ɵɵinject(COLLECTION_ENABLED, 8), ɵɵinject(APP_VERSION, 8), ɵɵinject(APP_NAME, 8), ɵɵinject(DEBUG_MODE, 8), ɵɵinject(CONFIG, 8), ɵɵinject(PLATFORM_ID), ɵɵinject(NgZone), ɵɵinject(ɵAngularFireSchedulers));
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _AngularFireAnalytics,
    factory: _AngularFireAnalytics.ɵfac,
    providedIn: "any"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngularFireAnalytics, [{
    type: Injectable,
    args: [{
      providedIn: "any"
    }]
  }], () => [{
    type: FirebaseApp2
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [COLLECTION_ENABLED]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [APP_VERSION]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [APP_NAME]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [DEBUG_MODE]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [CONFIG]
    }]
  }, {
    type: Object,
    decorators: [{
      type: Inject,
      args: [PLATFORM_ID]
    }]
  }, {
    type: NgZone
  }, {
    type: ɵAngularFireSchedulers
  }], null);
})();
ɵapplyMixins(AngularFireAnalytics, [proxyPolyfillCompat]);
var UserTrackingService2 = class _UserTrackingService {
  initialized;
  disposables = [];
  // TODO a user properties injector
  constructor(analytics, platformId, auth, zone) {
    firebase.registerVersion("angularfire", VERSION.full, "compat-user-tracking");
    if (!isPlatformServer(platformId)) {
      let resolveInitialized;
      this.initialized = zone.runOutsideAngular(() => new Promise((resolve) => resolveInitialized = resolve));
      this.disposables = [auth.authState.subscribe((user3) => {
        analytics.setUserId(user3?.uid);
        resolveInitialized();
      }), auth.credential.subscribe((credential) => {
        if (credential) {
          const method = credential.user.isAnonymous ? "anonymous" : credential.additionalUserInfo.providerId;
          if (credential.additionalUserInfo.isNewUser) {
            analytics.logEvent("sign_up", {
              method
            });
          }
          analytics.logEvent("login", {
            method
          });
        }
      })];
    } else {
      this.initialized = Promise.resolve();
    }
  }
  ngOnDestroy() {
    this.disposables.forEach((it) => it.unsubscribe());
  }
  static ɵfac = function UserTrackingService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserTrackingService)(ɵɵinject(AngularFireAnalytics), ɵɵinject(PLATFORM_ID), ɵɵinject(AngularFireAuth), ɵɵinject(NgZone));
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _UserTrackingService,
    factory: _UserTrackingService.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserTrackingService2, [{
    type: Injectable
  }], () => [{
    type: AngularFireAnalytics
  }, {
    type: Object,
    decorators: [{
      type: Inject,
      args: [PLATFORM_ID]
    }]
  }, {
    type: AngularFireAuth
  }, {
    type: NgZone
  }], null);
})();
var SCREEN_VIEW_EVENT2 = "screen_view";
var ScreenTrackingService2 = class _ScreenTrackingService {
  disposable;
  constructor(analytics, router, title, componentFactoryResolver, zone, userTrackingService) {
    firebase.registerVersion("angularfire", VERSION.full, "compat-screen-tracking");
    if (!router || !analytics) {
      return this;
    }
    zone.runOutsideAngular(() => {
      this.disposable = ɵscreenViewEvent(router, title, componentFactoryResolver).pipe(switchMap((params) => __async(this, null, function* () {
        if (userTrackingService) {
          yield userTrackingService.initialized;
        }
        return yield analytics.logEvent(SCREEN_VIEW_EVENT2, params);
      }))).subscribe();
    });
  }
  ngOnDestroy() {
    if (this.disposable) {
      this.disposable.unsubscribe();
    }
  }
  static ɵfac = function ScreenTrackingService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ScreenTrackingService)(ɵɵinject(AngularFireAnalytics), ɵɵinject(Router, 8), ɵɵinject(Title, 8), ɵɵinject(ComponentFactoryResolver$1), ɵɵinject(NgZone), ɵɵinject(UserTrackingService2, 8));
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _ScreenTrackingService,
    factory: _ScreenTrackingService.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScreenTrackingService2, [{
    type: Injectable
  }], () => [{
    type: AngularFireAnalytics
  }, {
    type: Router,
    decorators: [{
      type: Optional
    }]
  }, {
    type: Title,
    decorators: [{
      type: Optional
    }]
  }, {
    type: ComponentFactoryResolver$1
  }, {
    type: NgZone
  }, {
    type: UserTrackingService2,
    decorators: [{
      type: Optional
    }]
  }], null);
})();
var AngularFireAnalyticsModule = class _AngularFireAnalyticsModule {
  constructor(analytics, screenTracking, userTracking) {
    firebase.registerVersion("angularfire", VERSION.full, "analytics-compat");
    analytics.app.then(() => void 0);
  }
  static ɵfac = function AngularFireAnalyticsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AngularFireAnalyticsModule)(ɵɵinject(AngularFireAnalytics), ɵɵinject(ScreenTrackingService2, 8), ɵɵinject(UserTrackingService2, 8));
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _AngularFireAnalyticsModule
  });
  static ɵinj = ɵɵdefineInjector({
    providers: [AngularFireAnalytics]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngularFireAnalyticsModule, [{
    type: NgModule,
    args: [{
      providers: [AngularFireAnalytics]
    }]
  }], () => [{
    type: AngularFireAnalytics
  }, {
    type: ScreenTrackingService2,
    decorators: [{
      type: Optional
    }]
  }, {
    type: UserTrackingService2,
    decorators: [{
      type: Optional
    }]
  }], null);
})();
export {
  APP_NAME,
  APP_VERSION,
  AngularFireAnalytics,
  AngularFireAnalyticsModule,
  COLLECTION_ENABLED,
  CONFIG,
  DEBUG_MODE,
  ScreenTrackingService2 as ScreenTrackingService,
  UserTrackingService2 as UserTrackingService
};
/*! Bundled license information:

rxfire/auth/index.esm.js:
  (**
   * @license
   * Copyright 2018 Google LLC
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
//# sourceMappingURL=@angular_fire_compat_analytics.js.map
