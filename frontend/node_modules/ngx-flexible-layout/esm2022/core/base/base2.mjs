/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive } from '@angular/core';
import { Subject } from 'rxjs';
import { buildLayoutCSS } from 'ngx-flexible-layout/_private-utils';
import * as i0 from "@angular/core";
import * as i1 from "../style-builder/style-builder";
import * as i2 from "../style-utils/style-utils";
import * as i3 from "../media-marshaller/media-marshaller";
export class BaseDirective2 {
    elementRef;
    styleBuilder;
    styler;
    marshal;
    DIRECTIVE_KEY = '';
    inputs = [];
    /** The most recently used styles for the builder */
    mru = {};
    destroySubject = new Subject();
    currentValue;
    /** Access to host element's parent DOM node */
    get parentElement() {
        return this.elementRef.nativeElement.parentElement;
    }
    /** Access to the HTMLElement for the directive */
    get nativeElement() {
        return this.elementRef.nativeElement;
    }
    /** Access to the activated value for the directive */
    get activatedValue() {
        return this.marshal.getValue(this.nativeElement, this.DIRECTIVE_KEY);
    }
    set activatedValue(value) {
        this.marshal.setValue(this.nativeElement, this.DIRECTIVE_KEY, value, this.marshal.activatedAlias);
    }
    /** Cache map for style computation */
    styleCache = new Map();
    constructor(elementRef, styleBuilder, styler, marshal) {
        this.elementRef = elementRef;
        this.styleBuilder = styleBuilder;
        this.styler = styler;
        this.marshal = marshal;
    }
    /** For @Input changes */
    ngOnChanges(changes) {
        Object.keys(changes).forEach(key => {
            if (this.inputs.indexOf(key) !== -1) {
                const bp = key.split('.').slice(1).join('.');
                const val = changes[key].currentValue;
                this.setValue(val, bp);
            }
        });
    }
    ngOnDestroy() {
        this.destroySubject.next();
        this.destroySubject.complete();
        this.marshal.releaseElement(this.nativeElement);
    }
    /** Register with central marshaller service */
    init(extraTriggers = []) {
        this.marshal.init(this.elementRef.nativeElement, this.DIRECTIVE_KEY, this.updateWithValue.bind(this), this.clearStyles.bind(this), extraTriggers);
    }
    /** Add styles to the element using predefined style builder */
    addStyles(input, parent) {
        const builder = this.styleBuilder;
        const useCache = builder.shouldCache;
        let genStyles = this.styleCache.get(input);
        if (!genStyles || !useCache) {
            genStyles = builder.buildStyles(input, parent);
            if (useCache) {
                this.styleCache.set(input, genStyles);
            }
        }
        this.mru = { ...genStyles };
        this.applyStyleToElement(genStyles);
        builder.sideEffect(input, genStyles, parent);
    }
    /** Remove generated styles from an element using predefined style builder */
    clearStyles() {
        Object.keys(this.mru).forEach(k => {
            this.mru[k] = '';
        });
        this.applyStyleToElement(this.mru);
        this.mru = {};
        this.currentValue = undefined;
    }
    /** Force trigger style updates on DOM element */
    triggerUpdate() {
        this.marshal.triggerUpdate(this.nativeElement, this.DIRECTIVE_KEY);
    }
    /**
     * Determine the DOM element's Flexbox flow (flex-direction).
     *
     * Check inline style first then check computed (stylesheet) style.
     * And optionally add the flow value to element's inline style.
     */
    getFlexFlowDirection(target, addIfMissing = false) {
        if (target) {
            const [value, hasInlineValue] = this.styler.getFlowDirection(target);
            if (!hasInlineValue && addIfMissing) {
                const style = buildLayoutCSS(value);
                const elements = [target];
                this.styler.applyStyleToElements(style, elements);
            }
            return value.trim();
        }
        return 'row';
    }
    hasWrap(target) {
        return this.styler.hasWrap(target);
    }
    /** Applies styles given via string pair or object map to the directive element */
    applyStyleToElement(style, value, element = this.nativeElement) {
        this.styler.applyStyleToElement(element, style, value);
    }
    setValue(val, bp) {
        this.marshal.setValue(this.nativeElement, this.DIRECTIVE_KEY, val, bp);
    }
    updateWithValue(input) {
        if (this.currentValue !== input) {
            this.addStyles(input);
            this.currentValue = input;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: BaseDirective2, deps: [{ token: i0.ElementRef }, { token: i1.StyleBuilder }, { token: i2.StyleUtils }, { token: i3.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0", type: BaseDirective2, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: BaseDirective2, decorators: [{
            type: Directive
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.StyleBuilder }, { type: i2.StyleUtils }, { type: i3.MediaMarshaller }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZTIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWJzL2ZsZXgtbGF5b3V0L2NvcmUvYmFzZS9iYXNlMi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCxPQUFPLEVBQUUsU0FBUyxFQUFtRCxNQUFNLGVBQWUsQ0FBQztBQUMzRixPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQzs7Ozs7QUFNcEUsTUFBTSxPQUFnQixjQUFjO0lBK0JGO0lBQ0E7SUFDQTtJQUNBO0lBaEN0QixhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQ25CLE1BQU0sR0FBYSxFQUFFLENBQUM7SUFDaEMsb0RBQW9EO0lBQzFDLEdBQUcsR0FBb0IsRUFBRSxDQUFDO0lBQzFCLGNBQWMsR0FBa0IsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUM5QyxZQUFZLENBQU07SUFFNUIsK0NBQStDO0lBQy9DLElBQWMsYUFBYTtRQUN6QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztJQUNyRCxDQUFDO0lBRUQsa0RBQWtEO0lBQ2xELElBQWMsYUFBYTtRQUN6QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxzREFBc0Q7SUFDdEQsSUFBSSxjQUFjO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUNELElBQUksY0FBYyxDQUFDLEtBQWE7UUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLEtBQUssRUFDakUsSUFBSSxDQUFDLE9B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O1FBQ3JFLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRVMsUUFBUSxDQUFDLEdBQVEsRUFBRSxFQUFVO1FBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVTLGVBQWUsQ0FBQyxLQUFhO1FBQ3JDLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxLQUFLLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzVCLENBQUM7SUFDSCxDQUFDO3VHQTdJbUIsY0FBYzsyRkFBZCxjQUFjOzsyRkFBZCxjQUFjO2tCQURuQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IGJ1aWxkTGF5b3V0Q1NTIH0gZnJvbSAnbmd4LWZsZXhpYmxlLWxheW91dC9fcHJpdmF0ZS11dGlscyc7XG5pbXBvcnQgeyBNZWRpYU1hcnNoYWxsZXIgfSBmcm9tICcuLi9tZWRpYS1tYXJzaGFsbGVyL21lZGlhLW1hcnNoYWxsZXInO1xuaW1wb3J0IHsgU3R5bGVCdWlsZGVyIH0gZnJvbSAnLi4vc3R5bGUtYnVpbGRlci9zdHlsZS1idWlsZGVyJztcbmltcG9ydCB7IFN0eWxlRGVmaW5pdGlvbiwgU3R5bGVVdGlscyB9IGZyb20gJy4uL3N0eWxlLXV0aWxzL3N0eWxlLXV0aWxzJztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZURpcmVjdGl2ZTIgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG5cbiAgcHJvdGVjdGVkIERJUkVDVElWRV9LRVkgPSAnJztcbiAgcHJvdGVjdGVkIGlucHV0czogc3RyaW5nW10gPSBbXTtcbiAgLyoqIFRoZSBtb3N0IHJlY2VudGx5IHVzZWQgc3R5bGVzIGZvciB0aGUgYnVpbGRlciAqL1xuICBwcm90ZWN0ZWQgbXJ1OiBTdHlsZURlZmluaXRpb24gPSB7fTtcbiAgcHJvdGVjdGVkIGRlc3Ryb3lTdWJqZWN0OiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3QoKTtcbiAgcHJvdGVjdGVkIGN1cnJlbnRWYWx1ZTogYW55O1xuXG4gIC8qKiBBY2Nlc3MgdG8gaG9zdCBlbGVtZW50J3MgcGFyZW50IERPTSBub2RlICovXG4gIHByb3RlY3RlZCBnZXQgcGFyZW50RWxlbWVudCgpOiBIVE1MRWxlbWVudCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICB9XG5cbiAgLyoqIEFjY2VzcyB0byB0aGUgSFRNTEVsZW1lbnQgZm9yIHRoZSBkaXJlY3RpdmUgKi9cbiAgcHJvdGVjdGVkIGdldCBuYXRpdmVFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICAvKiogQWNjZXNzIHRvIHRoZSBhY3RpdmF0ZWQgdmFsdWUgZm9yIHRoZSBkaXJlY3RpdmUgKi9cbiAgZ2V0IGFjdGl2YXRlZFZhbHVlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubWFyc2hhbC5nZXRWYWx1ZSh0aGlzLm5hdGl2ZUVsZW1lbnQsIHRoaXMuRElSRUNUSVZFX0tFWSk7XG4gIH1cbiAgc2V0IGFjdGl2YXRlZFZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLm1hcnNoYWwuc2V0VmFsdWUodGhpcy5uYXRpdmVFbGVtZW50LCB0aGlzLkRJUkVDVElWRV9LRVksIHZhbHVlLFxuICAgICAgdGhpcy5tYXJzaGFsLmFjdGl2YXRlZEFsaWFzKTtcbiAgfVxuXG4gIC8qKiBDYWNoZSBtYXAgZm9yIHN0eWxlIGNvbXB1dGF0aW9uICovXG4gIHByb3RlY3RlZCBzdHlsZUNhY2hlOiBNYXA8c3RyaW5nLCBTdHlsZURlZmluaXRpb24+ID0gbmV3IE1hcCgpO1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3RlY3RlZCBzdHlsZUJ1aWxkZXI6IFN0eWxlQnVpbGRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3RlY3RlZCBzdHlsZXI6IFN0eWxlVXRpbHMsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgbWFyc2hhbDogTWVkaWFNYXJzaGFsbGVyKSB7XG4gIH1cblxuICAvKiogRm9yIEBJbnB1dCBjaGFuZ2VzICovXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBPYmplY3Qua2V5cyhjaGFuZ2VzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAodGhpcy5pbnB1dHMuaW5kZXhPZihrZXkpICE9PSAtMSkge1xuICAgICAgICBjb25zdCBicCA9IGtleS5zcGxpdCgnLicpLnNsaWNlKDEpLmpvaW4oJy4nKTtcbiAgICAgICAgY29uc3QgdmFsID0gY2hhbmdlc1trZXldLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgdGhpcy5zZXRWYWx1ZSh2YWwsIGJwKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveVN1YmplY3QubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveVN1YmplY3QuY29tcGxldGUoKTtcbiAgICB0aGlzLm1hcnNoYWwucmVsZWFzZUVsZW1lbnQodGhpcy5uYXRpdmVFbGVtZW50KTtcbiAgfVxuXG4gIC8qKiBSZWdpc3RlciB3aXRoIGNlbnRyYWwgbWFyc2hhbGxlciBzZXJ2aWNlICovXG4gIHByb3RlY3RlZCBpbml0KGV4dHJhVHJpZ2dlcnM6IE9ic2VydmFibGU8YW55PltdID0gW10pOiB2b2lkIHtcbiAgICB0aGlzLm1hcnNoYWwuaW5pdChcbiAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgdGhpcy5ESVJFQ1RJVkVfS0VZLFxuICAgICAgdGhpcy51cGRhdGVXaXRoVmFsdWUuYmluZCh0aGlzKSxcbiAgICAgIHRoaXMuY2xlYXJTdHlsZXMuYmluZCh0aGlzKSxcbiAgICAgIGV4dHJhVHJpZ2dlcnNcbiAgICApO1xuICB9XG5cbiAgLyoqIEFkZCBzdHlsZXMgdG8gdGhlIGVsZW1lbnQgdXNpbmcgcHJlZGVmaW5lZCBzdHlsZSBidWlsZGVyICovXG4gIHByb3RlY3RlZCBhZGRTdHlsZXMoaW5wdXQ6IHN0cmluZywgcGFyZW50PzogT2JqZWN0KSB7XG4gICAgY29uc3QgYnVpbGRlciA9IHRoaXMuc3R5bGVCdWlsZGVyO1xuICAgIGNvbnN0IHVzZUNhY2hlID0gYnVpbGRlci5zaG91bGRDYWNoZTtcblxuICAgIGxldCBnZW5TdHlsZXM6IFN0eWxlRGVmaW5pdGlvbiB8IHVuZGVmaW5lZCA9IHRoaXMuc3R5bGVDYWNoZS5nZXQoaW5wdXQpO1xuXG4gICAgaWYgKCFnZW5TdHlsZXMgfHwgIXVzZUNhY2hlKSB7XG4gICAgICBnZW5TdHlsZXMgPSBidWlsZGVyLmJ1aWxkU3R5bGVzKGlucHV0LCBwYXJlbnQpO1xuICAgICAgaWYgKHVzZUNhY2hlKSB7XG4gICAgICAgIHRoaXMuc3R5bGVDYWNoZS5zZXQoaW5wdXQsIGdlblN0eWxlcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5tcnUgPSB7Li4uZ2VuU3R5bGVzfTtcbiAgICB0aGlzLmFwcGx5U3R5bGVUb0VsZW1lbnQoZ2VuU3R5bGVzKTtcbiAgICBidWlsZGVyLnNpZGVFZmZlY3QoaW5wdXQsIGdlblN0eWxlcywgcGFyZW50KTtcbiAgfVxuXG4gIC8qKiBSZW1vdmUgZ2VuZXJhdGVkIHN0eWxlcyBmcm9tIGFuIGVsZW1lbnQgdXNpbmcgcHJlZGVmaW5lZCBzdHlsZSBidWlsZGVyICovXG4gIHByb3RlY3RlZCBjbGVhclN0eWxlcygpIHtcbiAgICBPYmplY3Qua2V5cyh0aGlzLm1ydSkuZm9yRWFjaChrID0+IHtcbiAgICAgIHRoaXMubXJ1W2tdID0gJyc7XG4gICAgfSk7XG4gICAgdGhpcy5hcHBseVN0eWxlVG9FbGVtZW50KHRoaXMubXJ1KTtcbiAgICB0aGlzLm1ydSA9IHt9O1xuICAgIHRoaXMuY3VycmVudFZhbHVlID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqIEZvcmNlIHRyaWdnZXIgc3R5bGUgdXBkYXRlcyBvbiBET00gZWxlbWVudCAqL1xuICBwcm90ZWN0ZWQgdHJpZ2dlclVwZGF0ZSgpIHtcbiAgICB0aGlzLm1hcnNoYWwudHJpZ2dlclVwZGF0ZSh0aGlzLm5hdGl2ZUVsZW1lbnQsIHRoaXMuRElSRUNUSVZFX0tFWSk7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lIHRoZSBET00gZWxlbWVudCdzIEZsZXhib3ggZmxvdyAoZmxleC1kaXJlY3Rpb24pLlxuICAgKlxuICAgKiBDaGVjayBpbmxpbmUgc3R5bGUgZmlyc3QgdGhlbiBjaGVjayBjb21wdXRlZCAoc3R5bGVzaGVldCkgc3R5bGUuXG4gICAqIEFuZCBvcHRpb25hbGx5IGFkZCB0aGUgZmxvdyB2YWx1ZSB0byBlbGVtZW50J3MgaW5saW5lIHN0eWxlLlxuICAgKi9cbiAgcHJvdGVjdGVkIGdldEZsZXhGbG93RGlyZWN0aW9uKHRhcmdldDogSFRNTEVsZW1lbnQsIGFkZElmTWlzc2luZyA9IGZhbHNlKTogc3RyaW5nIHtcbiAgICBpZiAodGFyZ2V0KSB7XG4gICAgICBjb25zdCBbdmFsdWUsIGhhc0lubGluZVZhbHVlXSA9IHRoaXMuc3R5bGVyLmdldEZsb3dEaXJlY3Rpb24odGFyZ2V0KTtcblxuICAgICAgaWYgKCFoYXNJbmxpbmVWYWx1ZSAmJiBhZGRJZk1pc3NpbmcpIHtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBidWlsZExheW91dENTUyh2YWx1ZSk7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRzID0gW3RhcmdldF07XG4gICAgICAgIHRoaXMuc3R5bGVyLmFwcGx5U3R5bGVUb0VsZW1lbnRzKHN0eWxlLCBlbGVtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YWx1ZS50cmltKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuICdyb3cnO1xuICB9XG5cbiAgcHJvdGVjdGVkIGhhc1dyYXAodGFyZ2V0OiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnN0eWxlci5oYXNXcmFwKHRhcmdldCk7XG4gIH1cblxuICAvKiogQXBwbGllcyBzdHlsZXMgZ2l2ZW4gdmlhIHN0cmluZyBwYWlyIG9yIG9iamVjdCBtYXAgdG8gdGhlIGRpcmVjdGl2ZSBlbGVtZW50ICovXG4gIHByb3RlY3RlZCBhcHBseVN0eWxlVG9FbGVtZW50KHN0eWxlOiBTdHlsZURlZmluaXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPzogc3RyaW5nIHwgbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiBIVE1MRWxlbWVudCA9IHRoaXMubmF0aXZlRWxlbWVudCkge1xuICAgIHRoaXMuc3R5bGVyLmFwcGx5U3R5bGVUb0VsZW1lbnQoZWxlbWVudCwgc3R5bGUsIHZhbHVlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRWYWx1ZSh2YWw6IGFueSwgYnA6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMubWFyc2hhbC5zZXRWYWx1ZSh0aGlzLm5hdGl2ZUVsZW1lbnQsIHRoaXMuRElSRUNUSVZFX0tFWSwgdmFsLCBicCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgdXBkYXRlV2l0aFZhbHVlKGlucHV0OiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50VmFsdWUgIT09IGlucHV0KSB7XG4gICAgICB0aGlzLmFkZFN0eWxlcyhpbnB1dCk7XG4gICAgICB0aGlzLmN1cnJlbnRWYWx1ZSA9IGlucHV0O1xuICAgIH1cbiAgfVxufVxuIl19