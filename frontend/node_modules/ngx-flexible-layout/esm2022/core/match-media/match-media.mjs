/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MediaChange } from '../media-change';
import * as i0 from "@angular/core";
/**
 * MediaMonitor configures listeners to mediaQuery changes and publishes an Observable facade to
 * convert mediaQuery change callbacks to subscriber notifications. These notifications will be
 * performed within the ng Zone to trigger change detections and component updates.
 *
 * NOTE: both mediaQuery activations and de-activations are announced in notifications
 */
export class MatchMedia {
    _zone;
    _platformId;
    _document;
    /** Initialize source with 'all' so all non-responsive APIs trigger style updates */
    source = new BehaviorSubject(new MediaChange(true));
    registry = new Map();
    pendingRemoveListenerFns = [];
    constructor(_zone, _platformId, _document) {
        this._zone = _zone;
        this._platformId = _platformId;
        this._document = _document;
    }
    /**
     * Publish list of all current activations
     */
    get activations() {
        const results = [];
        this.registry.forEach((mql, key) => {
            if (mql.matches) {
                results.push(key);
            }
        });
        return results;
    }
    /**
     * For the specified mediaQuery?
     */
    isActive(mediaQuery) {
        const mql = this.registry.get(mediaQuery);
        return mql?.matches ?? this.registerQuery(mediaQuery).some(m => m.matches);
    }
    /**
     * External observers can watch for all (or a specific) mql changes.
     * Typically used by the MediaQueryAdaptor; optionally available to components
     * who wish to use the MediaMonitor as mediaMonitor$ observable service.
     *
     * Use deferred registration process to register breakpoints only on subscription
     * This logic also enforces logic to register all mediaQueries BEFORE notify
     * subscribers of notifications.
     */
    observe(mqList, filterOthers = false) {
        if (mqList && mqList.length) {
            const matchMedia$ = this._observable$.pipe(filter((change) => !filterOthers ? true : (mqList.indexOf(change.mediaQuery) > -1)));
            const registration$ = new Observable((observer) => {
                const matches = this.registerQuery(mqList);
                if (matches.length) {
                    const lastChange = matches.pop();
                    matches.forEach((e) => {
                        observer.next(e);
                    });
                    this.source.next(lastChange); // last match is cached
                }
                observer.complete();
            });
            return merge(registration$, matchMedia$);
        }
        return this._observable$;
    }
    /**
     * Based on the BreakPointRegistry provider, register internal listeners for each unique
     * mediaQuery. Each listener emits specific MediaChange data to observers
     */
    registerQuery(mediaQuery) {
        const list = Array.isArray(mediaQuery) ? mediaQuery : [mediaQuery];
        const matches = [];
        buildQueryCss(list, this._document);
        list.forEach((query) => {
            const onMQLEvent = (e) => {
                this._zone.run(() => this.source.next(new MediaChange(e.matches, query)));
            };
            let mql = this.registry.get(query);
            if (!mql) {
                mql = this.buildMQL(query);
                mql.addListener(onMQLEvent);
                this.pendingRemoveListenerFns.push(() => mql.removeListener(onMQLEvent));
                this.registry.set(query, mql);
            }
            if (mql.matches) {
                matches.push(new MediaChange(true, query));
            }
        });
        return matches;
    }
    ngOnDestroy() {
        let fn;
        while (fn = this.pendingRemoveListenerFns.pop()) {
            fn();
        }
    }
    /**
     * Call window.matchMedia() to build a MediaQueryList; which
     * supports 0..n listeners for activation/deactivation
     */
    buildMQL(query) {
        return constructMql(query, isPlatformBrowser(this._platformId));
    }
    _observable$ = this.source.asObservable();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: MatchMedia, deps: [{ token: i0.NgZone }, { token: PLATFORM_ID }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: MatchMedia, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: MatchMedia, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i0.NgZone }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }] });
/**
 * Private global registry for all dynamically-created, injected style tags
 * @see prepare(query)
 */
const ALL_STYLES = {};
/**
 * For Webkit engines that only trigger the MediaQueryList Listener
 * when there is at least one CSS selector for the respective media query.
 *
 * @param mediaQueries
 * @param _document
 */
function buildQueryCss(mediaQueries, _document) {
    const list = mediaQueries.filter(it => !ALL_STYLES[it]);
    if (list.length > 0) {
        const query = list.join(', ');
        try {
            const styleEl = _document.createElement('style');
            styleEl.setAttribute('type', 'text/css');
            if (!styleEl.styleSheet) {
                const cssText = `
/*
  ngx-flexible-layout - workaround for possible browser quirk with mediaQuery listeners
  see http://bit.ly/2sd4HMP
*/
@media ${query} {.fx-query-test{ }}
`;
                styleEl.appendChild(_document.createTextNode(cssText));
            }
            _document.head.appendChild(styleEl);
            // Store in private global registry
            list.forEach(mq => ALL_STYLES[mq] = styleEl);
        }
        catch (e) {
            console.error(e);
        }
    }
}
function buildMockMql(query) {
    const et = new EventTarget();
    et.matches = query === 'all' || query === '';
    et.media = query;
    et.addListener = () => { };
    et.removeListener = () => { };
    et.addEventListener = () => { };
    et.dispatchEvent = () => false;
    et.onchange = null;
    return et;
}
function constructMql(query, isBrowser) {
    const canListen = isBrowser && !!window.matchMedia('all').addListener;
    return canListen ? window.matchMedia(query) : buildMockMql(query);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2gtbWVkaWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWJzL2ZsZXgtbGF5b3V0L2NvcmUvbWF0Y2gtbWVkaWEvbWF0Y2gtbWVkaWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlELE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFxQixXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFZLE1BQU0sTUFBTSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBRTlDOzs7Ozs7R0FNRztBQUVILE1BQU0sT0FBTyxVQUFVO0lBTUM7SUFDcUI7SUFDSDtJQVB4QyxvRkFBb0Y7SUFDM0UsTUFBTSxHQUFHLElBQUksZUFBZSxDQUFjLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDMUUsUUFBUSxHQUFHLElBQUksR0FBRyxFQUEwQixDQUFDO0lBQzVCLHdCQUF3QixHQUFzQixFQUFFLENBQUM7SUFFbEUsWUFBc0IsS0FBYSxFQUNRLFdBQW1CLEVBQ3RCLFNBQWM7UUFGaEMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUNRLGdCQUFXLEdBQVgsV0FBVyxDQUFRO1FBQ3RCLGNBQVMsR0FBVCxTQUFTLENBQUs7SUFDdEQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSSxXQUFXO1FBQ2IsTUFBTSxPQUFPLEdBQWEsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBbUIsRUFBRSxHQUFXLEVBQUUsRUFBRTtZQUN6RCxJ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S0FBSyxLQUFLLEtBQUssSUFBSSxLQUFLLEtBQUssRUFBRSxDQUFDO0lBQzdDLEVBQUUsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ2pCLEVBQUUsQ0FBQyxXQUFXLEdBQUcsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0lBQzFCLEVBQUUsQ0FBQyxjQUFjLEdBQUcsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0lBQzdCLEVBQUUsQ0FBQyxnQkFBZ0IsR0FBRyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7SUFDL0IsRUFBRSxDQUFDLGFBQWEsR0FBRyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7SUFDL0IsRUFBRSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFFbkIsT0FBTyxFQUFvQixDQUFDO0FBQzlCLENBQUM7QUFFRCxTQUFTLFlBQVksQ0FBQyxLQUFhLEVBQUUsU0FBa0I7SUFDckQsTUFBTSxTQUFTLEdBQUcsU0FBUyxJQUFJLENBQUMsQ0FBVSxNQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQztJQUVoRixPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQVUsTUFBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzlFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IERPQ1VNRU5ULCBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE5nWm9uZSwgT25EZXN0cm95LCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBtZXJnZSwgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTWVkaWFDaGFuZ2UgfSBmcm9tICcuLi9tZWRpYS1jaGFuZ2UnO1xuXG4vKipcbiAqIE1lZGlhTW9uaXRvciBjb25maWd1cmVzIGxpc3RlbmVycyB0byBtZWRpYVF1ZXJ5IGNoYW5nZXMgYW5kIHB1Ymxpc2hlcyBhbiBPYnNlcnZhYmxlIGZhY2FkZSB0b1xuICogY29udmVydCBtZWRpYVF1ZXJ5IGNoYW5nZSBjYWxsYmFja3MgdG8gc3Vic2NyaWJlciBub3RpZmljYXRpb25zLiBUaGVzZSBub3RpZmljYXRpb25zIHdpbGwgYmVcbiAqIHBlcmZvcm1lZCB3aXRoaW4gdGhlIG5nIFpvbmUgdG8gdHJpZ2dlciBjaGFuZ2UgZGV0ZWN0aW9ucyBhbmQgY29tcG9uZW50IHVwZGF0ZXMuXG4gKlxuICogTk9URTogYm90aCBtZWRpYVF1ZXJ5IGFjdGl2YXRpb25zIGFuZCBkZS1hY3RpdmF0aW9ucyBhcmUgYW5ub3VuY2VkIGluIG5vdGlmaWNhdGlvbnNcbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgTWF0Y2hNZWRpYSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKiBJbml0aWFsaXplIHNvdXJjZSB3aXRoICdhbGwnIHNvIGFsbCBub24tcmVzcG9uc2l2ZSBBUElzIHRyaWdnZXIgc3R5bGUgdXBkYXRlcyAqL1xuICByZWFkb25seSBzb3VyY2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1lZGlhQ2hhbmdlPihuZXcgTWVkaWFDaGFuZ2UodHJ1ZSkpO1xuICByZWdpc3RyeSA9IG5ldyBNYXA8c3RyaW5nLCBNZWRpYVF1ZXJ5TGlzdD4oKTtcbiAgcHJpdmF0ZSByZWFkb25seSBwZW5kaW5nUmVtb3ZlTGlzdGVuZXJGbnM6IEFycmF5PCgpID0+IHZvaWQ+ID0gW107XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIF96b25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByb3RlY3RlZCBfcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgICAgICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcm90ZWN0ZWQgX2RvY3VtZW50OiBhbnkpIHtcbiAgfVxuXG4gIC8qKlxuICAgKiBQdWJsaXNoIGxpc3Qgb2YgYWxsIGN1cnJlbnQgYWN0aXZhdGlvbnNcbiAgICovXG4gIGdldCBhY3RpdmF0aW9ucygpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgcmVzdWx0czogc3RyaW5nW10gPSBbXTtcbiAgICB0aGlzLnJlZ2lzdHJ5LmZvckVhY2goKG1xbDogTWVkaWFRdWVyeUxpc3QsIGtleTogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAobXFsLm1hdGNoZXMpIHtcbiAgICAgICAgcmVzdWx0cy5wdXNoKGtleSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cblxuICAvKipcbiAgICogRm9yIHRoZSBzcGVjaWZpZWQgbWVkaWFRdWVyeT9cbiAgICovXG4gIGlzQWN0aXZlKG1lZGlhUXVlcnk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IG1xbCA9IHRoaXMucmVnaXN0cnkuZ2V0KG1lZGlhUXVlcnkpO1xuICAgIHJldHVybiBtcWw/Lm1hdGNoZXMgPz8gdGhpcy5yZWdpc3RlclF1ZXJ5KG1lZGlhUXVlcnkpLnNvbWUobSA9PiBtLm1hdGNoZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4dGVybmFsIG9ic2VydmVycyBjYW4gd2F0Y2ggZm9yIGFsbCAob3IgYSBzcGVjaWZpYykgbXFsIGNoYW5nZXMuXG4gICAqXG4gICAqIElmIGEgbWVkaWFRdWVyeSBpcyBub3Qgc3BlY2lmaWVkLCB0aGVuIEFMTCBtZWRpYVF1ZXJ5IGFjdGl2YXRpb25zIHdpbGxcbiAgICogYmUgYW5ub3VuY2VkLlxuICAgKi9cbiAgb2JzZXJ2ZSgpOiBPYnNlcnZhYmxlPE1lZGlhQ2hhbmdlPjtcbiAgb2JzZXJ2ZShtZWRpYVF1ZXJpZXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxNZWRpYUNoYW5nZT47XG4gIG9ic2VydmUobWVkaWFRdWVyaWVzOiBzdHJpbmdbXSwgZmlsdGVyT3RoZXJzOiBib29sZWFuKTogT2JzZXJ2YWJsZTxNZWRpYUNoYW5nZT47XG5cbiAgLyoqXG4gICAqIEV4dGVybmFsIG9ic2VydmVycyBjYW4gd2F0Y2ggZm9yIGFsbCAob3IgYSBzcGVjaWZpYykgbXFsIGNoYW5nZXMuXG4gICAqIFR5cGljYWxseSB1c2VkIGJ5IHRoZSBNZWRpYVF1ZXJ5QWRhcHRvcjsgb3B0aW9uYWxseSBhdmFpbGFibGUgdG8gY29tcG9uZW50c1xuICAgKiB3aG8gd2lzaCB0byB1c2UgdGhlIE1lZGlhTW9uaXRvciBhcyBtZWRpYU1vbml0b3IkIG9ic2VydmFibGUgc2VydmljZS5cbiAgICpcbiAgICogVXNlIGRlZmVycmVkIHJlZ2lzdHJhdGlvbiBwcm9jZXNzIHRvIHJlZ2lzdGVyIGJyZWFrcG9pbnRzIG9ubHkgb24gc3Vic2NyaXB0aW9uXG4gICAqIFRoaXMgbG9naWMgYWxzbyBlbmZvcmNlcyBsb2dpYyB0byByZWdpc3RlciBhbGwgbWVkaWFRdWVyaWVzIEJFRk9SRSBub3RpZnlcbiAgICogc3Vic2NyaWJlcnMgb2Ygbm90aWZpY2F0aW9ucy5cbiAgICovXG4gIG9ic2VydmUobXFMaXN0Pzogc3RyaW5nW10sIGZpbHRlck90aGVycyA9IGZhbHNlKTogT2JzZXJ2YWJsZTxNZWRpYUNoYW5nZT4ge1xuICAgIGlmIChtcUxpc3QgJiYgbXFMaXN0Lmxlbmd0aCkge1xuICAgICAgY29uc3QgbWF0Y2hNZWRpYSQ6IE9ic2VydmFibGU8TWVkaWFDaGFuZ2U+ID0gdGhpcy5fb2JzZXJ2YWJsZSQucGlwZShcbiAgICAgICAgICBmaWx0ZXIoKGNoYW5nZTogTWVkaWFDaGFuZ2UpID0+XG4gICAgICAgICAgICAhZmlsdGVyT3RoZXJzID8gdHJ1ZSA6IChtcUxpc3QuaW5kZXhPZihjaGFuZ2UubWVkaWFRdWVyeSkgPiAtMSkpXG4gICAgICApO1xuICAgICAgY29uc3QgcmVnaXN0cmF0aW9uJDogT2JzZXJ2YWJsZTxNZWRpYUNoYW5nZT4gPSBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IE9ic2VydmVyPE1lZGlhQ2hhbmdlPikgPT4geyAgLy8gdHNsaW50OmRpc2FibGUtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICAgICAgY29uc3QgbWF0Y2hlczogQXJyYXk8TWVkaWFDaGFuZ2U+ID0gdGhpcy5yZWdpc3RlclF1ZXJ5KG1xTGlzdCk7XG4gICAgICAgIGlmIChtYXRjaGVzLmxlbmd0aCkge1xuICAgICAgICAgIGNvbnN0IGxhc3RDaGFuZ2UgPSBtYXRjaGVzLnBvcCgpITtcbiAgICAgICAgICBtYXRjaGVzLmZvckVhY2goKGU6IE1lZGlhQ2hhbmdlKSA9PiB7XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KGUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuc291cmNlLm5leHQobGFzdENoYW5nZSk7IC8vIGxhc3QgbWF0Y2ggaXMgY2FjaGVkXG4gICAgICAgIH1cbiAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG1lcmdlKHJlZ2lzdHJhdGlvbiQsIG1hdGNoTWVkaWEkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fb2JzZXJ2YWJsZSQ7XG4gIH1cblxuICAvKipcbiAgICogQmFzZWQgb24gdGhlIEJyZWFrUG9pbnRSZWdpc3RyeSBwcm92aWRlciwgcmVnaXN0ZXIgaW50ZXJuYWwgbGlzdGVuZXJzIGZvciBlYWNoIHVuaXF1ZVxuICAgKiBtZWRpYVF1ZXJ5LiBFYWNoIGxpc3RlbmVyIGVtaXRzIHNwZWNpZmljIE1lZGlhQ2hhbmdlIGRhdGEgdG8gb2JzZXJ2ZXJzXG4gICAqL1xuICByZWdpc3RlclF1ZXJ5KG1lZGlhUXVlcnk6IHN0cmluZyB8IHN0cmluZ1tdKSB7XG4gICAgY29uc3QgbGlzdCA9IEFycmF5LmlzQXJyYXkobWVkaWFRdWVyeSkgPyBtZWRpYVF1ZXJ5IDogW21lZGlhUXVlcnldO1xuICAgIGNvbnN0IG1hdGNoZXM6IE1lZGlhQ2hhbmdlW10gPSBbXTtcblxuICAgIGJ1aWxkUXVlcnlDc3MobGlzdCwgdGhpcy5fZG9jdW1lbnQpO1xuXG4gICAgbGlzdC5mb3JFYWNoKChxdWVyeTogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBvbk1RTEV2ZW50ID0gKGU6IE1lZGlhUXVlcnlMaXN0RXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4gdGhpcy5zb3VyY2UubmV4dChuZXcgTWVkaWFDaGFuZ2UoZS5tYXRjaGVzLCBxdWVyeSkpKTtcbiAgICAgIH07XG5cbiAgICAgIGxldCBtcWwgPSB0aGlzLnJlZ2lzdHJ5LmdldChxdWVyeSk7XG4gICAgICBpZiAoIW1xbCkge1xuICAgICAgICBtcWwgPSB0aGlzLmJ1aWxkTVFMKHF1ZXJ5KTtcbiAgICAgICAgbXFsLmFkZExpc3RlbmVyKG9uTVFMRXZlbnQpO1xuICAgICAgICB0aGlzLnBlbmRpbmdSZW1vdmVMaXN0ZW5lckZucy5wdXNoKCgpID0+IG1xbCEucmVtb3ZlTGlzdGVuZXIob25NUUxFdmVudCkpO1xuICAgICAgICB0aGlzLnJlZ2lzdHJ5LnNldChxdWVyeSwgbXFsKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1xbC5tYXRjaGVzKSB7XG4gICAgICAgIG1hdGNoZXMucHVzaChuZXcgTWVkaWFDaGFuZ2UodHJ1ZSwgcXVlcnkpKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBtYXRjaGVzO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgbGV0IGZuO1xuICAgIHdoaWxlIChmbiA9IHRoaXMucGVuZGluZ1JlbW92ZUxpc3RlbmVyRm5zLnBvcCgpKSB7XG4gICAgICBmbigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsIHdpbmRvdy5tYXRjaE1lZGlhKCkgdG8gYnVpbGQgYSBNZWRpYVF1ZXJ5TGlzdDsgd2hpY2hcbiAgICogc3VwcG9ydHMgMC4ubiBsaXN0ZW5lcnMgZm9yIGFjdGl2YXRpb24vZGVhY3RpdmF0aW9uXG4gICAqL1xuICBwcm90ZWN0ZWQgYnVpbGRNUUwocXVlcnk6IHN0cmluZyk6IE1lZGlhUXVlcnlMaXN0IHtcbiAgICByZXR1cm4gY29uc3RydWN0TXFsKHF1ZXJ5LCBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLl9wbGF0Zm9ybUlkKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX29ic2VydmFibGUkID0gdGhpcy5zb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG59XG5cbi8qKlxuICogUHJpdmF0ZSBnbG9iYWwgcmVnaXN0cnkgZm9yIGFsbCBkeW5hbWljYWxseS1jcmVhdGVkLCBpbmplY3RlZCBzdHlsZSB0YWdzXG4gKiBAc2VlIHByZXBhcmUocXVlcnkpXG4gKi9cbmNvbnN0IEFMTF9TVFlMRVM6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7fTtcblxuLyoqXG4gKiBGb3IgV2Via2l0IGVuZ2luZXMgdGhhdCBvbmx5IHRyaWdnZXIgdGhlIE1lZGlhUXVlcnlMaXN0IExpc3RlbmVyXG4gKiB3aGVuIHRoZXJlIGlzIGF0IGxlYXN0IG9uZSBDU1Mgc2VsZWN0b3IgZm9yIHRoZSByZXNwZWN0aXZlIG1lZGlhIHF1ZXJ5LlxuICpcbiAqIEBwYXJhbSBtZWRpYVF1ZXJpZXNcbiAqIEBwYXJhbSBfZG9jdW1lbnRcbiAqL1xuZnVuY3Rpb24gYnVpbGRRdWVyeUNzcyhtZWRpYVF1ZXJpZXM6IHN0cmluZ1tdLCBfZG9jdW1lbnQ6IERvY3VtZW50KSB7XG4gIGNvbnN0IGxpc3QgPSBtZWRpYVF1ZXJpZXMuZmlsdGVyKGl0ID0+ICFBTExfU1RZTEVTW2l0XSk7XG4gIGlmIChsaXN0Lmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBxdWVyeSA9IGxpc3Quam9pbignLCAnKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBzdHlsZUVsID0gX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cbiAgICAgIHN0eWxlRWwuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvY3NzJyk7XG4gICAgICBpZiAoIShzdHlsZUVsIGFzIGFueSkuc3R5bGVTaGVldCkge1xuICAgICAgICBjb25zdCBjc3NUZXh0ID0gYFxuLypcbiAgbmd4LWZsZXhpYmxlLWxheW91dCAtIHdvcmthcm91bmQgZm9yIHBvc3NpYmxlIGJyb3dzZXIgcXVpcmsgd2l0aCBtZWRpYVF1ZXJ5IGxpc3RlbmVyc1xuICBzZWUgaHR0cDovL2JpdC5seS8yc2Q0SE1QXG4qL1xuQG1lZGlhICR7cXVlcnl9IHsuZngtcXVlcnktdGVzdHsgfX1cbmA7XG4gICAgICAgIHN0eWxlRWwuYXBwZW5kQ2hpbGQoX2RvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzc1RleHQpKTtcbiAgICAgIH1cblxuICAgICAgX2RvY3VtZW50LmhlYWQhLmFwcGVuZENoaWxkKHN0eWxlRWwpO1xuXG4gICAgICAvLyBTdG9yZSBpbiBwcml2YXRlIGdsb2JhbCByZWdpc3RyeVxuICAgICAgbGlzdC5mb3JFYWNoKG1xID0+IEFMTF9TVFlMRVNbbXFdID0gc3R5bGVFbCk7XG5cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBidWlsZE1vY2tNcWwocXVlcnk6IHN0cmluZykge1xuICBjb25zdCBldDogYW55ID0gbmV3IEV2ZW50VGFyZ2V0KCk7XG4gIGV0Lm1hdGNoZXMgPSBxdWVyeSA9PT0gJ2FsbCcgfHwgcXVlcnkgPT09ICcnO1xuICBldC5tZWRpYSA9IHF1ZXJ5O1xuICBldC5hZGRMaXN0ZW5lciA9ICgpID0+IHt9O1xuICBldC5yZW1vdmVMaXN0ZW5lciA9ICgpID0+IHt9O1xuICBldC5hZGRFdmVudExpc3RlbmVyID0gKCkgPT4ge307XG4gIGV0LmRpc3BhdGNoRXZlbnQgPSAoKSA9PiBmYWxzZTtcbiAgZXQub25jaGFuZ2UgPSBudWxsO1xuXG4gIHJldHVybiBldCBhcyBNZWRpYVF1ZXJ5TGlzdDtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0TXFsKHF1ZXJ5OiBzdHJpbmcsIGlzQnJvd3NlcjogYm9vbGVhbik6IE1lZGlhUXVlcnlMaXN0IHtcbiAgY29uc3QgY2FuTGlzdGVuID0gaXNCcm93c2VyICYmICEhKDxXaW5kb3c+d2luZG93KS5tYXRjaE1lZGlhKCdhbGwnKS5hZGRMaXN0ZW5lcjtcblxuICByZXR1cm4gY2FuTGlzdGVuID8gKDxXaW5kb3c+d2luZG93KS5tYXRjaE1lZGlhKHF1ZXJ5KSA6IGJ1aWxkTW9ja01xbChxdWVyeSk7XG59XG4iXX0=