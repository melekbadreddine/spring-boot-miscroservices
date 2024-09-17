/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '@angular/core';
import { asapScheduler, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { mergeAlias } from '../add-alias';
import { MediaChange } from '../media-change';
import { coerceArray } from '../utils/array';
import { sortDescendingPriority } from '../utils/sort';
import * as i0 from "@angular/core";
import * as i1 from "../breakpoints/break-point-registry";
import * as i2 from "../match-media/match-media";
import * as i3 from "../media-marshaller/print-hook";
/**
 * MediaObserver enables applications to listen for 1..n mediaQuery activations and to determine
 * if a mediaQuery is currently activated.
 *
 * Since a breakpoint change will first deactivate 1...n mediaQueries and then possibly activate
 * 1..n mediaQueries, the MediaObserver will debounce notifications and report ALL *activations*
 * in 1 event notification. The reported activations will be sorted in descending priority order.
 *
 * This class uses the BreakPoint Registry to inject alias information into the raw MediaChange
 * notification. For custom mediaQuery notifications, alias information will not be injected and
 * those fields will be ''.
 *
 * Note: Developers should note that only mediaChange activations (not de-activations)
 *       are announced by the MediaObserver.
 *
 *  @usage
 *
 *  // RxJS
 *  import { filter } from 'rxjs/operators';
 *  import { MediaObserver } from 'ngx-flexible-layout';
 *
 *  @Component({ ... })
 *  export class AppComponent {
 *    status: string = '';
 *
 *    constructor(mediaObserver: MediaObserver) {
 *      const media$ = mediaObserver.asObservable().pipe(
 *        filter((changes: MediaChange[]) => true)   // silly noop filter
 *      );
 *
 *      media$.subscribe((changes: MediaChange[]) => {
 *        let status = '';
 *        changes.forEach( change => {
 *          status += `'${change.mqAlias}' = (${change.mediaQuery}) <br/>` ;
 *        });
 *        this.status = status;
 *     });
 *
 *    }
 *  }
 */
export class MediaObserver {
    breakpoints;
    matchMedia;
    hook;
    /** Filter MediaChange notifications for overlapping breakpoints */
    filterOverlaps = false;
    constructor(breakpoints, matchMedia, hook) {
        this.breakpoints = breakpoints;
        this.matchMedia = matchMedia;
        this.hook = hook;
        this._media$ = this.watchActivations();
    }
    /**
     * Completes the active subject, signalling to all complete for all
     * MediaObserver subscribers
     */
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    // ************************************************
    // Public Methods
    // ************************************************
    /**
     * Observe changes to current activation 'list'
     */
    asObservable() {
        return this._media$;
    }
    /**
     * Allow programmatic query to determine if one or more media query/alias match
     * the current viewport size.
     * @param value One or more media queries (or aliases) to check.
     * @returns Whether any of the media queries match.
     */
    isActive(value) {
        const aliases = splitQueries(coerceArray(value));
        return aliases.some(alias => {
            const query = toMediaQuery(alias, this.breakpoints);
            return query !== null && this.matchMedia.isActive(query);
        });
    }
    // ************************************************
    // Internal Methods
    // ************************************************
    /**
     * Register all the mediaQueries registered in the BreakPointRegistry
     * This is needed so subscribers can be auto-notified of all standard, registered
     * mediaQuery activations
     */
    watchActivations() {
        const queries = this.breakpoints.items.map(bp => bp.mediaQuery);
        return this.buildObservable(queries);
    }
    /**
     * Only pass/announce activations (not de-activations)
     *
     * Since multiple-mediaQueries can be activation in a cycle,
     * gather all current activations into a single list of changes to observers
     *
     * Inject associated (if any) alias information into the MediaChange event
     * - Exclude mediaQuery activations for overlapping mQs. List bounded mQ ranges only
     * - Exclude print activations that do not have an associated mediaQuery
     *
     * NOTE: the raw MediaChange events [from MatchMedia] do not
     *       contain important alias information; as such this info
     *       must be injected into the MediaChange
     */
    buildObservable(mqList) {
        const hasChanges = (changes) => {
            const isValidQuery = (change) => (change.mediaQuery.length > 0);
            return (changes.filter(isValidQuery).length > 0);
        };
        const excludeOverlaps = (changes) => {
            return !this.filterOverlaps ? changes : changes.filter(change => {
                const bp = this.breakpoints.findByQuery(change.mediaQuery);
                return bp?.overlapping ?? true;
            });
        };
        const ignoreDuplicates = (previous, current) => {
            if (previous.length !== current.length) {
                return false;
            }
            const previousMqs = previous.map(mc => mc.mediaQuery);
            const currentMqs = new Set(current.map(mc => mc.mediaQuery));
            const difference = new Set(previousMqs.filter(mq => !currentMqs.has(mq)));
            return difference.size === 0;
        };
        /**
         */
        return this.matchMedia
            .observe(this.hook.withPrintQuery(mqList))
            .pipe(filter((change) => change.matches), debounceTime(0, asapScheduler), switchMap(_ => of(this.findAllActivations())), map(excludeOverlaps), filter(hasChanges), distinctUntilChanged(ignoreDuplicates), takeUntil(this.destroyed$));
    }
    /**
     * Find all current activations and prepare single list of activations
     * sorted by descending priority.
     */
    findAllActivations() {
        const mergeMQAlias = (change) => {
            const bp = this.breakpoints.findByQuery(change.mediaQuery);
            return mergeAlias(change, bp);
        };
        const replaceWithPrintAlias = (change) => this.hook.isPrintEvent(change) ? this.hook.updateEvent(change) : change;
        return this.matchMedia
            .activations
            .map(query => new MediaChange(true, query))
            .map(replaceWithPrintAlias)
            .map(mergeMQAlias)
            .sort(sortDescendingPriority);
    }
    _media$;
    destroyed$ = new Subject();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: MediaObserver, deps: [{ token: i1.BreakPointRegistry }, { token: i2.MatchMedia }, { token: i3.PrintHook }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: MediaObserver, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: MediaObserver, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i1.BreakPointRegistry }, { type: i2.MatchMedia }, { type: i3.PrintHook }] });
/**
 * Find associated breakpoint (if any)
 */
function toMediaQuery(query, locator) {
    const bp = locator.findByAlias(query) ?? locator.findByQuery(query);
    return bp?.mediaQuery ?? null;
}
/**
 * Split each query string into separate query strings if two queries are provided as comma
 * separated.
 */
function splitQueries(queries) {
    return queries.flatMap(query => query.split(','))
        .map(query => query.trim());
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEtb2JzZXJ2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWJzL2ZsZXgtbGF5b3V0L2NvcmUvbWVkaWEtb2JzZXJ2ZXIvbWVkaWEtb2JzZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUUsYUFBYSxFQUFjLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUQsT0FBTyxFQUNILFlBQVksRUFDWixvQkFBb0IsRUFDcEIsTUFBTSxFQUNOLEdBQUcsRUFDSCxTQUFTLEVBQ1QsU0FBUyxFQUNaLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUcxQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHOUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFHdkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Q0c7QUFFSCxNQUFNLE9BQU8sYUFBYTtJQUlGO0lBQ0E7SUFDQTtJQUx0QixtRUFBbUU7SUFDbkUsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUV2QixZQUFzQixXQUErQixFQUMvQixVQUFzQixFQUN0QixJQUFlO1FBRmYsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBQy9CLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsU0FBSSxHQUFKLElBQUksQ0FBVztRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxXQUFXO1FBQ1QsSUFB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LEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDMUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDO2FBQzFCLEdBQUcsQ0FBQyxZQUFZLENBQUM7YUFDakIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVnQixPQUFPLENBQTRCO0lBQ25DLFVBQVUsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO3VHQW5JdkMsYUFBYTsyR0FBYixhQUFhLGNBREQsTUFBTTs7MkZBQ2xCLGFBQWE7a0JBRHpCLFVBQVU7bUJBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDOztBQXVJaEM7O0dBRUc7QUFDSCxTQUFTLFlBQVksQ0FBQyxLQUFhLEVBQUUsT0FBMkI7SUFDOUQsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BFLE9BQU8sRUFBRSxFQUFFLFVBQVUsSUFBSSxJQUFJLENBQUM7QUFDaEMsQ0FBQztBQUVEOzs7R0FHRztBQUNILFNBQVMsWUFBWSxDQUFDLE9BQWlCO0lBQ3JDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDOUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDaEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBhc2FwU2NoZWR1bGVyLCBPYnNlcnZhYmxlLCBvZiwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgICBkZWJvdW5jZVRpbWUsXG4gICAgZGlzdGluY3RVbnRpbENoYW5nZWQsXG4gICAgZmlsdGVyLFxuICAgIG1hcCxcbiAgICBzd2l0Y2hNYXAsXG4gICAgdGFrZVVudGlsXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgbWVyZ2VBbGlhcyB9IGZyb20gJy4uL2FkZC1hbGlhcyc7XG5pbXBvcnQgeyBCcmVha1BvaW50UmVnaXN0cnksIE9wdGlvbmFsQnJlYWtQb2ludCB9IGZyb20gJy4uL2JyZWFrcG9pbnRzL2JyZWFrLXBvaW50LXJlZ2lzdHJ5JztcbmltcG9ydCB7IE1hdGNoTWVkaWEgfSBmcm9tICcuLi9tYXRjaC1tZWRpYS9tYXRjaC1tZWRpYSc7XG5pbXBvcnQgeyBNZWRpYUNoYW5nZSB9IGZyb20gJy4uL21lZGlhLWNoYW5nZSc7XG5pbXBvcnQgeyBQcmludEhvb2sgfSBmcm9tICcuLi9tZWRpYS1tYXJzaGFsbGVyL3ByaW50LWhvb2snO1xuXG5pbXBvcnQgeyBjb2VyY2VBcnJheSB9IGZyb20gJy4uL3V0aWxzL2FycmF5JztcbmltcG9ydCB7IHNvcnREZXNjZW5kaW5nUHJpb3JpdHkgfSBmcm9tICcuLi91dGlscy9zb3J0JztcblxuXG4vKipcbiAqIE1lZGlhT2JzZXJ2ZXIgZW5hYmxlcyBhcHBsaWNhdGlvbnMgdG8gbGlzdGVuIGZvciAxLi5uIG1lZGlhUXVlcnkgYWN0aXZhdGlvbnMgYW5kIHRvIGRldGVybWluZVxuICogaWYgYSBtZWRpYVF1ZXJ5IGlzIGN1cnJlbnRseSBhY3RpdmF0ZWQuXG4gKlxuICogU2luY2UgYSBicmVha3BvaW50IGNoYW5nZSB3aWxsIGZpcnN0IGRlYWN0aXZhdGUgMS4uLm4gbWVkaWFRdWVyaWVzIGFuZCB0aGVuIHBvc3NpYmx5IGFjdGl2YXRlXG4gKiAxLi5uIG1lZGlhUXVlcmllcywgdGhlIE1lZGlhT2JzZXJ2ZXIgd2lsbCBkZWJvdW5jZSBub3RpZmljYXRpb25zIGFuZCByZXBvcnQgQUxMICphY3RpdmF0aW9ucypcbiAqIGluIDEgZXZlbnQgbm90aWZpY2F0aW9uLiBUaGUgcmVwb3J0ZWQgYWN0aXZhdGlvbnMgd2lsbCBiZSBzb3J0ZWQgaW4gZGVzY2VuZGluZyBwcmlvcml0eSBvcmRlci5cbiAqXG4gKiBUaGlzIGNsYXNzIHVzZXMgdGhlIEJyZWFrUG9pbnQgUmVnaXN0cnkgdG8gaW5qZWN0IGFsaWFzIGluZm9ybWF0aW9uIGludG8gdGhlIHJhdyBNZWRpYUNoYW5nZVxuICogbm90aWZpY2F0aW9uLiBGb3IgY3VzdG9tIG1lZGlhUXVlcnkgbm90aWZpY2F0aW9ucywgYWxpYXMgaW5mb3JtYXRpb24gd2lsbCBub3QgYmUgaW5qZWN0ZWQgYW5kXG4gKiB0aG9zZSBmaWVsZHMgd2lsbCBiZSAnJy5cbiAqXG4gKiBOb3RlOiBEZXZlbG9wZXJzIHNob3VsZCBub3RlIHRoYXQgb25seSBtZWRpYUNoYW5nZSBhY3RpdmF0aW9ucyAobm90IGRlLWFjdGl2YXRpb25zKVxuICogICAgICAgYXJlIGFubm91bmNlZCBieSB0aGUgTWVkaWFPYnNlcnZlci5cbiAqXG4gKiAgQHVzYWdlXG4gKlxuICogIC8vIFJ4SlNcbiAqICBpbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG4gKiAgaW1wb3J0IHsgTWVkaWFPYnNlcnZlciB9IGZyb20gJ25neC1mbGV4aWJsZS1sYXlvdXQnO1xuICpcbiAqICBAQ29tcG9uZW50KHsgLi4uIH0pXG4gKiAgZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG4gKiAgICBzdGF0dXM6IHN0cmluZyA9ICcnO1xuICpcbiAqICAgIGNvbnN0cnVjdG9yKG1lZGlhT2JzZXJ2ZXI6IE1lZGlhT2JzZXJ2ZXIpIHtcbiAqICAgICAgY29uc3QgbWVkaWEkID0gbWVkaWFPYnNlcnZlci5hc09ic2VydmFibGUoKS5waXBlKFxuICogICAgICAgIGZpbHRlcigoY2hhbmdlczogTWVkaWFDaGFuZ2VbXSkgPT4gdHJ1ZSkgICAvLyBzaWxseSBub29wIGZpbHRlclxuICogICAgICApO1xuICpcbiAqICAgICAgbWVkaWEkLnN1YnNjcmliZSgoY2hhbmdlczogTWVkaWFDaGFuZ2VbXSkgPT4ge1xuICogICAgICAgIGxldCBzdGF0dXMgPSAnJztcbiAqICAgICAgICBjaGFuZ2VzLmZvckVhY2goIGNoYW5nZSA9PiB7XG4gKiAgICAgICAgICBzdGF0dXMgKz0gYCcke2NoYW5nZS5tcUFsaWFzfScgPSAoJHtjaGFuZ2UubWVkaWFRdWVyeX0pIDxici8+YCA7XG4gKiAgICAgICAgfSk7XG4gKiAgICAgICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gKiAgICAgfSk7XG4gKlxuICogICAgfVxuICogIH1cbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgTWVkaWFPYnNlcnZlciBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKiBGaWx0ZXIgTWVkaWFDaGFuZ2Ugbm90aWZpY2F0aW9ucyBmb3Igb3ZlcmxhcHBpbmcgYnJlYWtwb2ludHMgKi9cbiAgZmlsdGVyT3ZlcmxhcHMgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgYnJlYWtwb2ludHM6IEJyZWFrUG9pbnRSZWdpc3RyeSxcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIG1hdGNoTWVkaWE6IE1hdGNoTWVkaWEsXG4gICAgICAgICAgICAgIHByb3RlY3RlZCBob29rOiBQcmludEhvb2spIHtcbiAgICB0aGlzLl9tZWRpYSQgPSB0aGlzLndhdGNoQWN0aXZhdGlvbnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wbGV0ZXMgdGhlIGFjdGl2ZSBzdWJqZWN0LCBzaWduYWxsaW5nIHRvIGFsbCBjb21wbGV0ZSBmb3IgYWxsXG4gICAqIE1lZGlhT2JzZXJ2ZXIgc3Vic2NyaWJlcnNcbiAgICovXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveWVkJC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95ZWQkLmNvbXBsZXRlKCk7XG4gIH1cblxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgLy8gUHVibGljIE1ldGhvZHNcbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cbiAgLyoqXG4gICAqIE9ic2VydmUgY2hhbmdlcyB0byBjdXJyZW50IGFjdGl2YXRpb24gJ2xpc3QnXG4gICAqL1xuICBhc09ic2VydmFibGUoKTogT2JzZXJ2YWJsZTxNZWRpYUNoYW5nZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX21lZGlhJDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbGxvdyBwcm9ncmFtbWF0aWMgcXVlcnkgdG8gZGV0ZXJtaW5lIGlmIG9uZSBvciBtb3JlIG1lZGlhIHF1ZXJ5L2FsaWFzIG1hdGNoXG4gICAqIHRoZSBjdXJyZW50IHZpZXdwb3J0IHNpemUuXG4gICAqIEBwYXJhbSB2YWx1ZSBPbmUgb3IgbW9yZSBtZWRpYSBxdWVyaWVzIChvciBhbGlhc2VzKSB0byBjaGVjay5cbiAgICogQHJldHVybnMgV2hldGhlciBhbnkgb2YgdGhlIG1lZGlhIHF1ZXJpZXMgbWF0Y2guXG4gICAqL1xuICBpc0FjdGl2ZSh2YWx1ZTogc3RyaW5nIHwgc3RyaW5nW10pOiBib29sZWFuIHtcbiAgICBjb25zdCBhbGlhc2VzID0gc3BsaXRRdWVyaWVzKGNvZXJjZUFycmF5KHZhbHVlKSk7XG4gICAgcmV0dXJuIGFsaWFzZXMuc29tZShhbGlhcyA9PiB7XG4gICAgICBjb25zdCBxdWVyeSA9IHRvTWVkaWFRdWVyeShhbGlhcywgdGhpcy5icmVha3BvaW50cyk7XG4gICAgICByZXR1cm4gcXVlcnkgIT09IG51bGwgJiYgdGhpcy5tYXRjaE1lZGlhLmlzQWN0aXZlKHF1ZXJ5KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAvLyBJbnRlcm5hbCBNZXRob2RzXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhbGwgdGhlIG1lZGlhUXVlcmllcyByZWdpc3RlcmVkIGluIHRoZSBCcmVha1BvaW50UmVnaXN0cnlcbiAgICogVGhpcyBpcyBuZWVkZWQgc28gc3Vic2NyaWJlcnMgY2FuIGJlIGF1dG8tbm90aWZpZWQgb2YgYWxsIHN0YW5kYXJkLCByZWdpc3RlcmVkXG4gICAqIG1lZGlhUXVlcnkgYWN0aXZhdGlvbnNcbiAgICovXG4gIHByaXZhdGUgd2F0Y2hBY3RpdmF0aW9ucygpIHtcbiAgICBjb25zdCBxdWVyaWVzID0gdGhpcy5icmVha3BvaW50cy5pdGVtcy5tYXAoYnAgPT4gYnAubWVkaWFRdWVyeSk7XG4gICAgcmV0dXJuIHRoaXMuYnVpbGRPYnNlcnZhYmxlKHF1ZXJpZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIE9ubHkgcGFzcy9hbm5vdW5jZSBhY3RpdmF0aW9ucyAobm90IGRlLWFjdGl2YXRpb25zKVxuICAgKlxuICAgKiBTaW5jZSBtdWx0aXBsZS1tZWRpYVF1ZXJpZXMgY2FuIGJlIGFjdGl2YXRpb24gaW4gYSBjeWNsZSxcbiAgICogZ2F0aGVyIGFsbCBjdXJyZW50IGFjdGl2YXRpb25zIGludG8gYSBzaW5nbGUgbGlzdCBvZiBjaGFuZ2VzIHRvIG9ic2VydmVyc1xuICAgKlxuICAgKiBJbmplY3QgYXNzb2NpYXRlZCAoaWYgYW55KSBhbGlhcyBpbmZvcm1hdGlvbiBpbnRvIHRoZSBNZWRpYUNoYW5nZSBldmVudFxuICAgKiAtIEV4Y2x1ZGUgbWVkaWFRdWVyeSBhY3RpdmF0aW9ucyBmb3Igb3ZlcmxhcHBpbmcgbVFzLiBMaXN0IGJvdW5kZWQgbVEgcmFuZ2VzIG9ubHlcbiAgICogLSBFeGNsdWRlIHByaW50IGFjdGl2YXRpb25zIHRoYXQgZG8gbm90IGhhdmUgYW4gYXNzb2NpYXRlZCBtZWRpYVF1ZXJ5XG4gICAqXG4gICAqIE5PVEU6IHRoZSByYXcgTWVkaWFDaGFuZ2UgZXZlbnRzIFtmcm9tIE1hdGNoTWVkaWFdIGRvIG5vdFxuICAgKiAgICAgICBjb250YWluIGltcG9ydGFudCBhbGlhcyBpbmZvcm1hdGlvbjsgYXMgc3VjaCB0aGlzIGluZm9cbiAgICogICAgICAgbXVzdCBiZSBpbmplY3RlZCBpbnRvIHRoZSBNZWRpYUNoYW5nZVxuICAgKi9cbiAgcHJpdmF0ZSBidWlsZE9ic2VydmFibGUobXFMaXN0OiBzdHJpbmdbXSk6IE9ic2VydmFibGU8TWVkaWFDaGFuZ2VbXT4ge1xuICAgIGNvbnN0IGhhc0NoYW5nZXMgPSAoY2hhbmdlczogTWVkaWFDaGFuZ2VbXSkgPT4ge1xuICAgICAgY29uc3QgaXNWYWxpZFF1ZXJ5ID0gKGNoYW5nZTogTWVkaWFDaGFuZ2UpID0+IChjaGFuZ2UubWVkaWFRdWVyeS5sZW5ndGggPiAwKTtcbiAgICAgIHJldHVybiAoY2hhbmdlcy5maWx0ZXIoaXNWYWxpZFF1ZXJ5KS5sZW5ndGggPiAwKTtcbiAgICB9O1xuICAgIGNvbnN0IGV4Y2x1ZGVPdmVybGFwcyA9IChjaGFuZ2VzOiBNZWRpYUNoYW5nZVtdKSA9PiB7XG4gICAgICByZXR1cm4gIXRoaXMuZmlsdGVyT3ZlcmxhcHMgPyBjaGFuZ2VzIDogY2hhbmdlcy5maWx0ZXIoY2hhbmdlID0+IHtcbiAgICAgICAgY29uc3QgYnAgPSB0aGlzLmJyZWFrcG9pbnRzLmZpbmRCeVF1ZXJ5KGNoYW5nZS5tZWRpYVF1ZXJ5KTtcbiAgICAgICAgcmV0dXJuIGJwPy5vdmVybGFwcGluZyA/PyB0cnVlO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICBjb25zdCBpZ25vcmVEdXBsaWNhdGVzID0gKHByZXZpb3VzOiBNZWRpYUNoYW5nZVtdLCBjdXJyZW50OiBNZWRpYUNoYW5nZVtdKTogYm9vbGVhbiA9PiB7XG4gICAgICBpZiAocHJldmlvdXMubGVuZ3RoICE9PSBjdXJyZW50Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByZXZpb3VzTXFzID0gcHJldmlvdXMubWFwKG1jID0+IG1jLm1lZGlhUXVlcnkpO1xuICAgICAgY29uc3QgY3VycmVudE1xcyA9IG5ldyBTZXQoY3VycmVudC5tYXAobWMgPT4gbWMubWVkaWFRdWVyeSkpO1xuICAgICAgY29uc3QgZGlmZmVyZW5jZSA9IG5ldyBTZXQocHJldmlvdXNNcXMuZmlsdGVyKG1xID0+ICFjdXJyZW50TXFzLmhhcyhtcSkpKTtcblxuICAgICAgcmV0dXJuIGRpZmZlcmVuY2Uuc2l6ZSA9PT0gMDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICovXG4gICAgcmV0dXJuIHRoaXMubWF0Y2hNZWRpYVxuICAgICAgICAub2JzZXJ2ZSh0aGlzLmhvb2sud2l0aFByaW50UXVlcnkobXFMaXN0KSlcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoKGNoYW5nZTogTWVkaWFDaGFuZ2UpID0+IGNoYW5nZS5tYXRjaGVzKSxcbiAgICAgICAgICAgIGRlYm91bmNlVGltZSgwLCBhc2FwU2NoZWR1bGVyKSxcbiAgICAgICAgICAgIHN3aXRjaE1hcChfID0+IG9mKHRoaXMuZmluZEFsbEFjdGl2YXRpb25zKCkpKSxcbiAgICAgICAgICAgIG1hcChleGNsdWRlT3ZlcmxhcHMpLFxuICAgICAgICAgICAgZmlsdGVyKGhhc0NoYW5nZXMpLFxuICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoaWdub3JlRHVwbGljYXRlcyksXG4gICAgICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQkKVxuICAgICAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYWxsIGN1cnJlbnQgYWN0aXZhdGlvbnMgYW5kIHByZXBhcmUgc2luZ2xlIGxpc3Qgb2YgYWN0aXZhdGlvbnNcbiAgICogc29ydGVkIGJ5IGRlc2NlbmRpbmcgcHJpb3JpdHkuXG4gICAqL1xuICBwcml2YXRlIGZpbmRBbGxBY3RpdmF0aW9ucygpOiBNZWRpYUNoYW5nZVtdIHtcbiAgICBjb25zdCBtZXJnZU1RQWxpYXMgPSAoY2hhbmdlOiBNZWRpYUNoYW5nZSkgPT4ge1xuICAgICAgY29uc3QgYnA6IE9wdGlvbmFsQnJlYWtQb2ludCA9IHRoaXMuYnJlYWtwb2ludHMuZmluZEJ5UXVlcnkoY2hhbmdlLm1lZGlhUXVlcnkpO1xuICAgICAgcmV0dXJuIG1lcmdlQWxpYXMoY2hhbmdlLCBicCk7XG4gICAgfTtcbiAgICBjb25zdCByZXBsYWNlV2l0aFByaW50QWxpYXMgPSAoY2hhbmdlOiBNZWRpYUNoYW5nZSkgPT5cbiAgICAgIHRoaXMuaG9vay5pc1ByaW50RXZlbnQoY2hhbmdlKSA/IHRoaXMuaG9vay51cGRhdGVFdmVudChjaGFuZ2UpIDogY2hhbmdlO1xuXG4gICAgcmV0dXJuIHRoaXMubWF0Y2hNZWRpYVxuICAgICAgICAuYWN0aXZhdGlvbnNcbiAgICAgICAgLm1hcChxdWVyeSA9PiBuZXcgTWVkaWFDaGFuZ2UodHJ1ZSwgcXVlcnkpKVxuICAgICAgICAubWFwKHJlcGxhY2VXaXRoUHJpbnRBbGlhcylcbiAgICAgICAgLm1hcChtZXJnZU1RQWxpYXMpXG4gICAgICAgIC5zb3J0KHNvcnREZXNjZW5kaW5nUHJpb3JpdHkpO1xuICB9XG5cbiAgcHJpdmF0ZSByZWFkb25seSBfbWVkaWEkOiBPYnNlcnZhYmxlPE1lZGlhQ2hhbmdlW10+O1xuICBwcml2YXRlIHJlYWRvbmx5IGRlc3Ryb3llZCQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xufVxuXG4vKipcbiAqIEZpbmQgYXNzb2NpYXRlZCBicmVha3BvaW50IChpZiBhbnkpXG4gKi9cbmZ1bmN0aW9uIHRvTWVkaWFRdWVyeShxdWVyeTogc3RyaW5nLCBsb2NhdG9yOiBCcmVha1BvaW50UmVnaXN0cnkpOiBzdHJpbmcgfCBudWxsIHtcbiAgY29uc3QgYnAgPSBsb2NhdG9yLmZpbmRCeUFsaWFzKHF1ZXJ5KSA/PyBsb2NhdG9yLmZpbmRCeVF1ZXJ5KHF1ZXJ5KTtcbiAgcmV0dXJuIGJwPy5tZWRpYVF1ZXJ5ID8/IG51bGw7XG59XG5cbi8qKlxuICogU3BsaXQgZWFjaCBxdWVyeSBzdHJpbmcgaW50byBzZXBhcmF0ZSBxdWVyeSBzdHJpbmdzIGlmIHR3byBxdWVyaWVzIGFyZSBwcm92aWRlZCBhcyBjb21tYVxuICogc2VwYXJhdGVkLlxuICovXG5mdW5jdGlvbiBzcGxpdFF1ZXJpZXMocXVlcmllczogc3RyaW5nW10pOiBzdHJpbmdbXSB7XG4gIHJldHVybiBxdWVyaWVzLmZsYXRNYXAocXVlcnkgPT4gcXVlcnkuc3BsaXQoJywnKSlcbiAgICAubWFwKHF1ZXJ5ID0+IHF1ZXJ5LnRyaW0oKSk7XG59XG4iXX0=