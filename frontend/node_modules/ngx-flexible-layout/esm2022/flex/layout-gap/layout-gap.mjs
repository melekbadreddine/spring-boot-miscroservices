import { Directive, Inject, Injectable } from '@angular/core';
import { BaseDirective2, LAYOUT_CONFIG, StyleBuilder, ɵmultiply as multiply } from 'ngx-flexible-layout/core';
import { LAYOUT_VALUES } from 'ngx-flexible-layout/_private-utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "ngx-flexible-layout/core";
import * as i2 from "@angular/cdk/bidi";
const CLEAR_MARGIN_CSS = {
    'margin-left': null,
    'margin-right': null,
    'margin-top': null,
    'margin-bottom': null
};
export class LayoutGapStyleBuilder extends StyleBuilder {
    _styler;
    _config;
    constructor(_styler, _config) {
        super();
        this._styler = _styler;
        this._config = _config;
    }
    buildStyles(gapValue, parent) {
        if (gapValue.endsWith(GRID_SPECIFIER)) {
            gapValue = gapValue.slice(0, gapValue.indexOf(GRID_SPECIFIER));
            gapValue = multiply(gapValue, this._config.multiplier);
            // Add the margin to the host element
            return buildGridMargin(gapValue, parent.directionality);
        }
        else {
            return {};
        }
    }
    sideEffect(gapValue, _styles, parent) {
        const items = parent.items;
        if (gapValue.endsWith(GRID_SPECIFIER)) {
            gapValue = gapValue.slice(0, gapValue.indexOf(GRID_SPECIFIER));
            gapValue = multiply(gapValue, this._config.multiplier);
            // For each `element` children, set the padding
            const paddingStyles = buildGridPadding(gapValue, parent.directionality);
            this._styler.applyStyleToElements(paddingStyles, parent.items);
        }
        else {
            gapValue = multiply(gapValue, this._config.multiplier);
            gapValue = this.addFallbackUnit(gapValue);
            const lastItem = items.pop();
            // For each `element` children EXCEPT the last,
            // set the margin right/bottom styles...
            const gapCss = buildGapCSS(gapValue, parent);
            this._styler.applyStyleToElements(gapCss, items);
            // Clear all gaps for all visible elements
            this._styler.applyStyleToElements(CLEAR_MARGIN_CSS, [lastItem]);
        }
    }
    addFallbackUnit(value) {
        return !isNaN(+value) ? `${value}${this._config.defaultUnit}` : value;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: LayoutGapStyleBuilder, deps: [{ token: i1.StyleUtils }, { token: LAYOUT_CONFIG }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: LayoutGapStyleBuilder, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: LayoutGapStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i1.StyleUtils }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [LAYOUT_CONFIG]
                }] }] });
const inputs = [
    'fxLayoutGap', 'fxLayoutGap.xs', 'fxLayoutGap.sm', 'fxLayoutGap.md',
    'fxLayoutGap.lg', 'fxLayoutGap.xl', 'fxLayoutGap.lt-sm', 'fxLayoutGap.lt-md',
    'fxLayoutGap.lt-lg', 'fxLayoutGap.lt-xl', 'fxLayoutGap.gt-xs', 'fxLayoutGap.gt-sm',
    'fxLayoutGap.gt-md', 'fxLayoutGap.gt-lg'
];
const selector = `
  [fxLayoutGap], [fxLayoutGap.xs], [fxLayoutGap.sm], [fxLayoutGap.md],
  [fxLayoutGap.lg], [fxLayoutGap.xl], [fxLayoutGap.lt-sm], [fxLayoutGap.lt-md],
  [fxLayoutGap.lt-lg], [fxLayoutGap.lt-xl], [fxLayoutGap.gt-xs], [fxLayoutGap.gt-sm],
  [fxLayoutGap.gt-md], [fxLayoutGap.gt-lg]
`;
/**
 * 'layout-padding' styling directive
 *  Defines padding of child elements in a layout container
 */
export class LayoutGapDirective extends BaseDirective2 {
    zone;
    directionality;
    styleUtils;
    layout = 'row'; // default flex-direction
    DIRECTIVE_KEY = 'layout-gap';
    observerSubject = new Subject();
    /** Special accessor to query for all child 'element' nodes regardless of type, class, etc */
    get childrenNodes() {
        const obj = this.nativeElement.children;
        const buffer = [];
        // iterate backwards ensuring that length is an UInt32
        for (let i = obj.length; i--;) {
            buffer[i] = obj[i];
        }
        return buffer;
    }
    constructor(elRef, zone, directionality, styleUtils, styleBuilder, marshal) {
        super(elRef, styleBuilder, styleUtils, marshal);
        this.zone = zone;
        this.directionality = directionality;
        this.styleUtils = styleUtils;
        const extraTriggers = [this.directionality.change, this.observerSubject.asObservable()];
        this.init(extraTriggers);
        this.marshal
            .trackValue(this.nativeElement, 'layout')
            .pipe(takeUntil(this.destroySubject))
            .subscribe(this.onLayoutChange.bind(this));
    }
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    ngAfterContentInit() {
        this.buildChildObservable();
        this.triggerUpdate();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        if (this.observer) {
            this.observer.disconnect();
        }
    }
    // *********************************************
    // Protected methods
    // *********************************************
    /**
     * Cache the parent container 'flex-direction' and update the 'margin' styles
     */
    onLayoutChange(matcher) {
        const layout = matcher.value;
        // Make sure to filter out 'wrap' option
        const direction = layout.split(' ');
        this.layout = direction[0];
        if (!LAYOUT_VALUES.find(x => x === this.layout)) {
            this.layout = 'row';
        }
        this.triggerUpdate();
    }
    /**
     *
     */
    updateWithValue(value) {
        // Gather all non-hidden Element nodes
        const items = this.childrenNodes
            .filter(el => el.nodeType === 1 && this.willDisplay(el))
            .sort((a, b) => {
            const orderA = +this.styler.lookupStyle(a, 'order');
            const orderB = +this.styler.lookupStyle(b, 'order');
            if (isNaN(orderA) || isNaN(orderB) || orderA === orderB) {
                return 0;
            }
            else {
                return orderA > orderB ? 1 : -1;
            }
        });
        if (items.length > 0) {
            const directionality = this.directionality.value;
            const layout = this.layout;
            if (layout === 'row' && directionality === 'rtl') {
                this.styleCache = layoutGapCacheRowRtl;
            }
            else if (layout === 'row' && directionality !== 'rtl') {
                this.styleCache = layoutGapCacheRowLtr;
            }
            else if (layout === 'column' && directionality === 'rtl') {
                this.styleCache = layoutGapCacheColumnRtl;
            }
            else if (layout === 'column' && directionality !== 'rtl') {
                this.styleCache = layoutGapCacheColumnLtr;
            }
            this.addStyles(value, { directionality, items, layout });
        }
    }
    /** We need to override clearStyles because in most cases mru isn't populated */
    clearStyles() {
        const gridMode = Object.keys(this.mru).length > 0;
        const childrenStyle = gridMode ? 'padding' :
            getMarginType(this.directionality.value, this.layout);
        // If there are styles on the parent remove them
        if (gridMode) {
            super.clearStyles();
        }
        // Then remove the children styles too
        this.styleUtils.applyStyleToElements({ [childrenStyle]: '' }, this.childrenNodes);
    }
    /** Determine if an element will show or hide based on current activation */
    willDisplay(source) {
        const value = this.marshal.getValue(source, 'show-hide');
        return value === true ||
            (value === undefined && this.styleUtils.lookupStyle(source, 'display') !== 'none');
    }
    buildChildObservable() {
        this.zone.runOutsideAngular(() => {
            if (typeof MutationObserver !== 'undefined') {
                this.observer = new MutationObserver((mutations) => {
                    const validatedChanges = (it) => {
                        return (it.addedNodes && it.addedNodes.length > 0) ||
                            (it.removedNodes && it.removedNodes.length > 0);
                    };
                    // update gap styles only for child 'added' or 'removed' events
                    if (mutations.some(validatedChanges)) {
                        this.observerSubject.next();
                    }
                });
                this.observer.observe(this.nativeElement, { childList: true });
            }
        });
    }
    observer;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: LayoutGapDirective, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: i2.Directionality }, { token: i1.StyleUtils }, { token: LayoutGapStyleBuilder }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0", type: LayoutGapDirective, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: LayoutGapDirective, decorators: [{
            type: Directive
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: i2.Directionality }, { type: i1.StyleUtils }, { type: LayoutGapStyleBuilder }, { type: i1.MediaMarshaller }] });
export class DefaultLayoutGapDirective extends LayoutGapDirective {
    inputs = inputs;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: DefaultLayoutGapDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0", type: DefaultLayoutGapDirective, selector: "\n  [fxLayoutGap], [fxLayoutGap.xs], [fxLayoutGap.sm], [fxLayoutGap.md],\n  [fxLayoutGap.lg], [fxLayoutGap.xl], [fxLayoutGap.lt-sm], [fxLayoutGap.lt-md],\n  [fxLayoutGap.lt-lg], [fxLayoutGap.lt-xl], [fxLayoutGap.gt-xs], [fxLayoutGap.gt-sm],\n  [fxLayoutGap.gt-md], [fxLayoutGap.gt-lg]\n", inputs: { fxLayoutGap: "fxLayoutGap", "fxLayoutGap.xs": "fxLayoutGap.xs", "fxLayoutGap.sm": "fxLayoutGap.sm", "fxLayoutGap.md": "fxLayoutGap.md", "fxLayoutGap.lg": "fxLayoutGap.lg", "fxLayoutGap.xl": "fxLayoutGap.xl", "fxLayoutGap.lt-sm": "fxLayoutGap.lt-sm", "fxLayoutGap.lt-md": "fxLayoutGap.lt-md", "fxLayoutGap.lt-lg": "fxLayoutGap.lt-lg", "fxLayoutGap.lt-xl": "fxLayoutGap.lt-xl", "fxLayoutGap.gt-xs": "fxLayoutGap.gt-xs", "fxLayoutGap.gt-sm": "fxLayoutGap.gt-sm", "fxLayoutGap.gt-md": "fxLayoutGap.gt-md", "fxLayoutGap.gt-lg": "fxLayoutGap.gt-lg" }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: DefaultLayoutGapDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
const layoutGapCacheRowRtl = new Map();
const layoutGapCacheColumnRtl = new Map();
const layoutGapCacheRowLtr = new Map();
const layoutGapCacheColumnLtr = new Map();
const GRID_SPECIFIER = ' grid';
function buildGridPadding(value, directionality) {
    const [between, below] = value.split(' ');
    const bottom = below ?? between;
    let paddingRight = '0px', paddingBottom = bottom, paddingLeft = '0px';
    if (directionality === 'rtl') {
        paddingLeft = between;
    }
    else {
        paddingRight = between;
    }
    return { 'padding': `0px ${paddingRight} ${paddingBottom} ${paddingLeft}` };
}
function buildGridMargin(value, directionality) {
    const [between, below] = value.split(' ');
    const bottom = below ?? between;
    const minus = (str) => `-${str}`;
    let marginRight = '0px', marginBottom = minus(bottom), marginLeft = '0px';
    if (directionality === 'rtl') {
        marginLeft = minus(between);
    }
    else {
        marginRight = minus(between);
    }
    return { 'margin': `0px ${marginRight} ${marginBottom} ${marginLeft}` };
}
function getMarginType(directionality, layout) {
    switch (layout) {
        case 'column':
            return 'margin-bottom';
        case 'column-reverse':
            return 'margin-top';
        case 'row':
            return directionality === 'rtl' ? 'margin-left' : 'margin-right';
        case 'row-reverse':
            return directionality === 'rtl' ? 'margin-right' : 'margin-left';
        default:
            return directionality === 'rtl' ? 'margin-left' : 'margin-right';
    }
}
function buildGapCSS(gapValue, parent) {
    const key = getMarginType(parent.directionality, parent.layout);
    const margins = { ...CLEAR_MARGIN_CSS };
    margins[key] = gapValue;
    return margins;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LWdhcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpYnMvZmxleC1sYXlvdXQvZmxleC9sYXlvdXQtZ2FwL2xheW91dC1nYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUUEsT0FBTyxFQUNlLFNBQVMsRUFDZixNQUFNLEVBQUUsVUFBVSxFQUNqQyxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0gsY0FBYyxFQUF1QyxhQUFhLEVBQW1CLFlBQVksRUFFckYsU0FBUyxJQUFJLFFBQVEsRUFDcEMsTUFBTSwwQkFBMEIsQ0FBQztBQUNsQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbkUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFTM0MsTUFBTSxnQkFBZ0IsR0FBRztJQUN2QixhQUFhLEVBQUUsSUFBSTtJQUNuQixjQUFjLEVBQUUsSUFBSTtJQUNwQixZQUFZLEVBQUUsSUFBSTtJQUNsQixlQUFlLEVBQUUsSUFBSTtDQUN0QixDQUFDO0FBR0YsTUFBTSxPQUFPLHFCQUFzQixTQUFRLFlBQVk7SUFDakM7SUFDdUI7SUFEM0MsWUFBb0IsT0FBbUIsRUFDSSxPQUE0QjtRQUNyRSxLQUFLLEVBQUUsQ0FBQztRQUZVLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDSSxZQUFPLEdBQVAsT0FBTyxDQUFxQjtJQUV2RSxDQUFDO0lBRUQsV0FBVyxDQUFDLFFBQWdCLEVBQUUsTUFBdUI7UUFDbkQsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUM7WUFDdEMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUMvRCxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXZELHFDQUFxQztZQUNyQyxPQUFPLGVBQWUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzFELENBQUM7YUFBTSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUM7UUFDWixDQUFDO0lBQ0gsQ0FBQztJQUVRLFVBQVUsQ0FBQyxRQUFnQixFQUFFLE9BQXdCLEVBQUUsTUFBdUI7UUFDckYsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUMzQixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQztZQUN0QyxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQy9ELFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdkQsK0NBQStDO1lBQy9DLE1BQU0sYUFBYSxHQUFHLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDeEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pFLENBQUM7YUFBTSxDQUFDO1lBQ04sUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN2RCxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUUxQyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFHLENBQUM7WUFFOUIsK0NBQStDO1lBQy9DLHdDQUF3QztZQUN4QyxNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRWpELDBDQUEwQztZQUMxQyxJQUFJLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLGdCQUFnQixFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNsRSxDQUFDO0lBQ0gsQ0FBQztJQUVPLGVBQWUsQ0FBQyxLQUFhO1FBQ25DLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ3hFLENBQUM7dUdBNUNVLHFCQUFxQiw0Q0FFWixhQUFhOzJHQUZ0QixxQkFBcUIsY0FEVCxNQUFNOzsyRkFDbEIscUJBQXFCO2tCQURqQyxVQUFVO21CQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7MEJBR2pCLE1BQU07MkJBQUMsYUFBYTs7QUE2Q25DLE1BQU0sTUFBTSxHQUFHO0lBQ2IsYUFBYSxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLGdCQUFnQjtJQUNuRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxtQkFBbUIsRUFBRSxtQkFBbUI7SUFDNUUsbUJBQW1CLEVBQUUsbUJBQW1CLEVBQUUsbUJBQW1CLEVBQUUsbUJBQW1CO0lBQ2xGLG1CQUFtQixFQUFFLG1CQUFtQjtDQUN6QyxDQUFDO0FBQ0YsTUFBTSxRQUFRLEdBQUc7Ozs7O0NBS2hCLENBQUM7QUFFRjs7O0dBR0c7QUFFSCxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsY0FBYztJQWtCOUI7SUFDQTtJQUNBO0lBbkJaLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBRSx5QkFBeUI7SUFDakMsYUFBYSxHQUFHLFlBQVksQ0FBQztJQUN0QyxlQUFlLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztJQUVoRCw2RkFBNkY7SUFDN0YsSUFBYyxhQUFhO1FBQ3pCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO1FBQ3hDLE1BQU0sTUFBTSxHQUFVLEVBQUUsQ0FBQztRQUV6QixzREFBc0Q7UUFDdEQsS0FBSyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7WUFDOUIsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixDQUFDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELFlBQVksS0FBaUIsRUFDUCxJQUFZLEVBQ1osY0FBOEIsRUFDOUIsVUFBc0IsRUFDaEMsWUFBbUMsRUFDbkMsT0FBd0I7UUFDbEMsS0FBSyxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBTDVCLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUkxQyxNQUFNLGFBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztRQUN4RixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPO2FBQ1QsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDO2FBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQ3BDLFNBQVMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxnREFBZ0Q7SUFDaEQsb0JBQW9CO0lBQ3BCLGdEQUFnRDtJQUVoRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFUSxXQUFXO1FBQ2xCLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzdCLENBQUM7SUFDSCxDQUFDO0lBRUQsZ0RBQWdEO0lBQ2hELG9CQUFvQjtJQUNwQixnREFBZ0Q7SUFFaEQ7O09BRUc7SUFDTyxjQUFjLENBQUMsT0FBdUI7UUFDOUMsTUFBTSxNQUFNLEdBQVcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUNyQyx3Q0FBd0M7UUFDeEMsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUNoRCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN0QixDQUFDO1FBQ0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNnQixlQUFlLENBQUMsS0FBYTtRQUM5QyxzQ0FBc0M7UUFDdEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWE7YUFDN0IsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN2RCxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDYixNQUFNLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNwRCxNQUFNLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNwRCxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxLQUFLLE1BQU0sRUFBRSxDQUFDO2dCQUN4RCxPQUFPLENBQUMsQ0FBQztZQUNYLENBQUM7aUJBQU0sQ0FBQztnQkFDTixPQUFPLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUwsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ3JCLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDO1lBQ2pELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDM0IsSUFBSSxNQUFNLEtBQUssS0FBSyxJQUFJLGNBQWMsS0FBSyxLQUFLLEVBQUUsQ0FBQztnQkFDakQsSUFBSSxDQUFDLFVBQVUsR0FBRyxvQkFBb0IsQ0FBQztZQUN6QyxDQUFDO2lCQUFNLElBQUksTUFBTSxLQUFLLEtBQUssSUFBSSxjQUFjLEtBQUssS0FBSyxFQUFFLENBQUM7Z0JBQ3hELElBQUksQ0FBQyxVQUFVLEdBQUcsb0JBQW9CLENBQUM7WUFDekMsQ0FBQztpQkFBTSxJQUFJLE1BQU0sS0FBSyxRQUFRLElBQUksY0FBYyxLQUFLLEtBQUssRUFBRSxDQUFDO2dCQUMzRCxJQUFJLENBQUMsVUFBVSxHQUFHLHVCQUF1QixDQUFDO1lBQzVDLENBQUM7aUJBQU0sSUFBSSxNQUFNLEtBQUssUUFBUSxJQUFJLGNBQWMsS0FBSyxLQUFLLEVBQUUsQ0FBQztnQkFDM0QsSUFBSSxDQUFDLFVBQVUsR0FBRyx1QkFBdUIsQ0FBQztZQUM1QyxDQUFDO1lBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBQyxjQUFjLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7UUFDekQsQ0FBQztJQUNILENBQUM7SUFFRCxnRkFBZ0Y7SUFDN0QsV0FBVztRQUM1QixNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDMUMsYUFBYSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV4RCxnREFBZ0Q7UUFDaEQsSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUNiLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN0QixDQUFDO1FBRUQsc0NBQXNDO1FBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsRUFBQyxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsRUFBQyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRUQsNEVBQTRFO0lBQ2xFLFdBQVcsQ0FBQyxNQUFtQjtRQUN2QyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDekQsT0FBTyxLQUFLLEtBQUssSUFBSTtZQUNuQixDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxLQUFLLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFFUyxvQkFBb0I7UUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7WUFDL0IsSUFBSSxPQUFPLGdCQUFnQixLQUFLLFdBQVcsRUFBRSxDQUFDO2dCQUM1QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksZ0JBQWdCLENBQUMsQ0FBQyxTQUEyQixFQUFFLEVBQUU7b0JBQ25FLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxFQUFrQixFQUFXLEVBQUU7d0JBQ3ZELE9BQU8sQ0FBQyxFQUFFLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzs0QkFDaEQsQ0FBQyxFQUFFLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNwRCxDQUFDLENBQUM7b0JBRUYsK0RBQStEO29CQUMvRCxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDO3dCQUNyQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUM5QixDQUFDO2dCQUNILENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztZQUMvRCxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRVMsUUFBUSxDQUFvQjt1R0E1STNCLGtCQUFrQjsyRkFBbEIsa0JBQWtCOzsyRkFBbEIsa0JBQWtCO2tCQUQ5QixTQUFTOztBQWlKVixNQUFNLE9BQU8seUJBQTBCLFNBQVEsa0JBQWtCO0lBQzVDLE1BQU0sR0FBRyxNQUFNLENBQUM7dUdBRHhCLHlCQUF5QjsyRkFBekIseUJBQXlCOzsyRkFBekIseUJBQXlCO2tCQURyQyxTQUFTO21CQUFDLEVBQUMsUUFBUSxFQUFFLE1BQU0sRUFBQzs7QUFLN0IsTUFBTSxvQkFBb0IsR0FBaUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNyRSxNQUFNLHVCQUF1QixHQUFpQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ3hFLE1BQU0sb0JBQW9CLEdBQWlDLElBQUksR0FBRyxFQUFFLENBQUM7QUFDckUsTUFBTSx1QkFBdUIsR0FBaUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUV4RSxNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUM7QUFFL0IsU0FBUyxnQkFBZ0IsQ0FBQyxLQUFhLEVBQUUsY0FBc0I7SUFDN0QsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFDLE1BQU0sTUFBTSxHQUFHLEtBQUssSUFBSSxPQUFPLENBQUM7SUFDaEMsSUFBSSxZQUFZLEdBQUcsS0FBSyxFQUFFLGFBQWEsR0FBRyxNQUFNLEVBQUUsV0FBVyxHQUFHLEtBQUssQ0FBQztJQUV0RSxJQUFJLGNBQWMsS0FBSyxLQUFLLEVBQUUsQ0FBQztRQUM3QixXQUFXLEdBQUcsT0FBTyxDQUFDO0lBQ3hCLENBQUM7U0FBTSxDQUFDO1FBQ04sWUFBWSxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDO0lBRUQsT0FBTyxFQUFDLFNBQVMsRUFBRSxPQUFPLFlBQVksSUFBSSxhQUFhLElBQUksV0FBVyxFQUFFLEVBQUMsQ0FBQztBQUM1RSxDQUFDO0FBRUQsU0FBUyxlQUFlLENBQUMsS0FBYSxFQUFFLGNBQXNCO0lBQzVELE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxQyxNQUFNLE1BQU0sR0FBRyxLQUFLLElBQUksT0FBTyxDQUFDO0lBQ2hDLE1BQU0sS0FBSyxHQUFHLENBQUMsR0FBVyxFQUFFLEVBQUUsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ3pDLElBQUksV0FBVyxHQUFHLEtBQUssRUFBRSxZQUFZLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFFMUUsSUFBSSxjQUFjLEtBQUssS0FBSyxFQUFFLENBQUM7UUFDN0IsVUFBVSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QixDQUFDO1NBQU0sQ0FBQztRQUNOLFdBQVcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELE9BQU8sRUFBQyxRQUFRLEVBQUUsT0FBTyxXQUFXLElBQUksWUFBWSxJQUFJLFVBQVUsRUFBRSxFQUFDLENBQUM7QUFDeEUsQ0FBQztBQUVELFNBQVMsYUFBYSxDQUFDLGNBQXNCLEVBQUUsTUFBYztJQUMzRCxRQUFRLE1BQU0sRUFBRSxDQUFDO1FBQ2YsS0FBSyxRQUFRO1lBQ1gsT0FBTyxlQUFlLENBQUM7UUFDekIsS0FBSyxnQkFBZ0I7WUFDbkIsT0FBTyxZQUFZLENBQUM7UUFDdEIsS0FBSyxLQUFLO1lBQ1IsT0FBTyxjQUFjLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQztRQUNuRSxLQUFLLGFBQWE7WUFDaEIsT0FBTyxjQUFjLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztRQUNuRTtZQUNFLE9BQU8sY0FBYyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUM7SUFDckUsQ0FBQztBQUNILENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxRQUFnQixFQUNoQixNQUFnRDtJQUNuRSxNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEUsTUFBTSxPQUFPLEdBQW1DLEVBQUMsR0FBRyxnQkFBZ0IsRUFBQyxDQUFDO0lBQ3RFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUM7SUFDeEIsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLCBJbmplY3QsIEluamVjdGFibGUsIE5nWm9uZSwgT25EZXN0cm95XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBCYXNlRGlyZWN0aXZlMiwgRWxlbWVudE1hdGNoZXIsIExheW91dENvbmZpZ09wdGlvbnMsIExBWU9VVF9DT05GSUcsIE1lZGlhTWFyc2hhbGxlciwgU3R5bGVCdWlsZGVyLFxuICAgIFN0eWxlRGVmaW5pdGlvbixcbiAgICBTdHlsZVV0aWxzLCDJtW11bHRpcGx5IGFzIG11bHRpcGx5XG59IGZyb20gJ25neC1mbGV4aWJsZS1sYXlvdXQvY29yZSc7XG5pbXBvcnQgeyBMQVlPVVRfVkFMVUVTIH0gZnJvbSAnbmd4LWZsZXhpYmxlLWxheW91dC9fcHJpdmF0ZS11dGlscyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cblxuZXhwb3J0IGludGVyZmFjZSBMYXlvdXRHYXBQYXJlbnQge1xuICBkaXJlY3Rpb25hbGl0eTogc3RyaW5nO1xuICBpdGVtczogSFRNTEVsZW1lbnRbXTtcbiAgbGF5b3V0OiBzdHJpbmc7XG59XG5cbmNvbnN0IENMRUFSX01BUkdJTl9DU1MgPSB7XG4gICdtYXJnaW4tbGVmdCc6IG51bGwsXG4gICdtYXJnaW4tcmlnaHQnOiBudWxsLFxuICAnbWFyZ2luLXRvcCc6IG51bGwsXG4gICdtYXJnaW4tYm90dG9tJzogbnVsbFxufTtcblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgTGF5b3V0R2FwU3R5bGVCdWlsZGVyIGV4dGVuZHMgU3R5bGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc3R5bGVyOiBTdHlsZVV0aWxzLFxuICAgICAgICAgICAgICBASW5qZWN0KExBWU9VVF9DT05GSUcpIHByaXZhdGUgX2NvbmZpZzogTGF5b3V0Q29uZmlnT3B0aW9ucykge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBidWlsZFN0eWxlcyhnYXBWYWx1ZTogc3RyaW5nLCBwYXJlbnQ6IExheW91dEdhcFBhcmVudCkge1xuICAgIGlmIChnYXBWYWx1ZS5lbmRzV2l0aChHUklEX1NQRUNJRklFUikpIHtcbiAgICAgIGdhcFZhbHVlID0gZ2FwVmFsdWUuc2xpY2UoMCwgZ2FwVmFsdWUuaW5kZXhPZihHUklEX1NQRUNJRklFUikpO1xuICAgICAgZ2FwVmFsdWUgPSBtdWx0aXBseShnYXBWYWx1ZSwgdGhpcy5fY29uZmlnLm11bHRpcGxpZXIpO1xuXG4gICAgICAvLyBBZGQgdGhlIG1hcmdpbiB0byB0aGUgaG9zdCBlbGVtZW50XG4gICAgICByZXR1cm4gYnVpbGRHcmlkTWFyZ2luKGdhcFZhbHVlLCBwYXJlbnQuZGlyZWN0aW9uYWxpdHkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuICB9XG5cbiAgb3ZlcnJpZGUgc2lkZUVmZmVjdChnYXBWYWx1ZTogc3RyaW5nLCBfc3R5bGVzOiBTdHlsZURlZmluaXRpb24sIHBhcmVudDogTGF5b3V0R2FwUGFyZW50KSB7XG4gICAgY29uc3QgaXRlbXMgPSBwYXJlbnQuaXRlbXM7XG4gICAgaWYgKGdhcFZhbHVlLmVuZHNXaXRoKEdSSURfU1BFQ0lGSUVSKSkge1xuICAgICAgZ2FwVmFsdWUgPSBnYXBWYWx1ZS5zbGljZSgwLCBnYXBWYWx1ZS5pbmRleE9mKEdSSURfU1BFQ0lGSUVSKSk7XG4gICAgICBnYXBWYWx1ZSA9IG11bHRpcGx5KGdhcFZhbHVlLCB0aGlzLl9jb25maWcubXVsdGlwbGllcik7XG4gICAgICAvLyBGb3IgZWFjaCBgZWxlbWVudGAgY2hpbGRyZW4sIHNldCB0aGUgcGFkZGluZ1xuICAgICAgY29uc3QgcGFkZGluZ1N0eWxlcyA9IGJ1aWxkR3JpZFBhZGRpbmcoZ2FwVmFsdWUsIHBhcmVudC5kaXJlY3Rpb25hbGl0eSk7XG4gICAgICB0aGlzLl9zdHlsZXIuYXBwbHlTdHlsZVRvRWxlbWVudHMocGFkZGluZ1N0eWxlcywgcGFyZW50Lml0ZW1zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2FwVmFsdWUgPSBtdWx0aXBseShnYXBWYWx1ZSwgdGhpcy5fY29uZmlnLm11bHRpcGxpZXIpO1xuICAgICAgZ2FwVmFsdWUgPSB0aGlzLmFkZEZhbGxiYWNrVW5pdChnYXBWYWx1ZSk7XG5cbiAgICAgIGNvbnN0IGxhc3RJdGVtID0gaXRlbXMucG9wKCkhO1xuXG4gICAgICAvLyBGb3IgZWFjaCBgZWxlbWVudGAgY2hpbGRyZW4gRVhDRVBUIHRoZSBsYXN0LFxuICAgICAgLy8gc2V0IHRoZSBtYXJnaW4gcmlnaHQvYm90dG9tIHN0eWxlcy4uLlxuICAgICAgY29uc3QgZ2FwQ3NzID0gYnVpbGRHYXBDU1MoZ2FwVmFsdWUsIHBhcmVudCk7XG4gICAgICB0aGlzLl9zdHlsZXIuYXBwbHlTdHlsZVRvRWxlbWVudHMoZ2FwQ3NzLCBpdGVtcyk7XG5cbiAgICAgIC8vIENsZWFyIGFsbCBnYXBzIGZvciBhbGwgdmlzaWJsZSBlbGVtZW50c1xuICAgICAgdGhpcy5fc3R5bGVyLmFwcGx5U3R5bGVUb0VsZW1lbnRzKENMRUFSX01BUkdJTl9DU1MsIFtsYXN0SXRlbV0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWRkRmFsbGJhY2tVbml0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gIWlzTmFOKCt2YWx1ZSkgPyBgJHt2YWx1ZX0ke3RoaXMuX2NvbmZpZy5kZWZhdWx0VW5pdH1gIDogdmFsdWU7XG4gIH1cbn1cblxuY29uc3QgaW5wdXRzID0gW1xuICAnZnhMYXlvdXRHYXAnLCAnZnhMYXlvdXRHYXAueHMnLCAnZnhMYXlvdXRHYXAuc20nLCAnZnhMYXlvdXRHYXAubWQnLFxuICAnZnhMYXlvdXRHYXAubGcnLCAnZnhMYXlvdXRHYXAueGwnLCAnZnhMYXlvdXRHYXAubHQtc20nLCAnZnhMYXlvdXRHYXAubHQtbWQnLFxuICAnZnhMYXlvdXRHYXAubHQtbGcnLCAnZnhMYXlvdXRHYXAubHQteGwnLCAnZnhMYXlvdXRHYXAuZ3QteHMnLCAnZnhMYXlvdXRHYXAuZ3Qtc20nLFxuICAnZnhMYXlvdXRHYXAuZ3QtbWQnLCAnZnhMYXlvdXRHYXAuZ3QtbGcnXG5dO1xuY29uc3Qgc2VsZWN0b3IgPSBgXG4gIFtmeExheW91dEdhcF0sIFtmeExheW91dEdhcC54c10sIFtmeExheW91dEdhcC5zbV0sIFtmeExheW91dEdhcC5tZF0sXG4gIFtmeExheW91dEdhcC5sZ10sIFtmeExheW91dEdhcC54bF0sIFtmeExheW91dEdhcC5sdC1zbV0sIFtmeExheW91dEdhcC5sdC1tZF0sXG4gIFtmeExheW91dEdhcC5sdC1sZ10sIFtmeExheW91dEdhcC5sdC14bF0sIFtmeExheW91dEdhcC5ndC14c10sIFtmeExheW91dEdhcC5ndC1zbV0sXG4gIFtmeExheW91dEdhcC5ndC1tZF0sIFtmeExheW91dEdhcC5ndC1sZ11cbmA7XG5cbi8qKlxuICogJ2xheW91dC1wYWRkaW5nJyBzdHlsaW5nIGRpcmVjdGl2ZVxuICogIERlZmluZXMgcGFkZGluZyBvZiBjaGlsZCBlbGVtZW50cyBpbiBhIGxheW91dCBjb250YWluZXJcbiAqL1xuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgTGF5b3V0R2FwRGlyZWN0aXZlIGV4dGVuZHMgQmFzZURpcmVjdGl2ZTIgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBwcm90ZWN0ZWQgbGF5b3V0ID0gJ3Jvdyc7ICAvLyBkZWZhdWx0IGZsZXgtZGlyZWN0aW9uXG4gIHByb3RlY3RlZCBvdmVycmlkZSBESVJFQ1RJVkVfS0VZID0gJ2xheW91dC1nYXAnO1xuICBwcm90ZWN0ZWQgb2JzZXJ2ZXJTdWJqZWN0ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAvKiogU3BlY2lhbCBhY2Nlc3NvciB0byBxdWVyeSBmb3IgYWxsIGNoaWxkICdlbGVtZW50JyBub2RlcyByZWdhcmRsZXNzIG9mIHR5cGUsIGNsYXNzLCBldGMgKi9cbiAgcHJvdGVjdGVkIGdldCBjaGlsZHJlbk5vZGVzKCk6IEhUTUxFbGVtZW50W10ge1xuICAgIGNvbnN0IG9iaiA9IHRoaXMubmF0aXZlRWxlbWVudC5jaGlsZHJlbjtcbiAgICBjb25zdCBidWZmZXI6IGFueVtdID0gW107XG5cbiAgICAvLyBpdGVyYXRlIGJhY2t3YXJkcyBlbnN1cmluZyB0aGF0IGxlbmd0aCBpcyBhbiBVSW50MzJcbiAgICBmb3IgKGxldCBpID0gb2JqLmxlbmd0aDsgaS0tOykge1xuICAgICAgYnVmZmVyW2ldID0gb2JqW2ldO1xuICAgIH1cbiAgICByZXR1cm4gYnVmZmVyO1xuICB9XG5cbiAgY29uc3RydWN0b3IoZWxSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIHByb3RlY3RlZCB6b25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgIHByb3RlY3RlZCBkaXJlY3Rpb25hbGl0eTogRGlyZWN0aW9uYWxpdHksXG4gICAgICAgICAgICAgIHByb3RlY3RlZCBzdHlsZVV0aWxzOiBTdHlsZVV0aWxzLFxuICAgICAgICAgICAgICBzdHlsZUJ1aWxkZXI6IExheW91dEdhcFN0eWxlQnVpbGRlcixcbiAgICAgICAgICAgICAgbWFyc2hhbDogTWVkaWFNYXJzaGFsbGVyKSB7XG4gICAgc3VwZXIoZWxSZWYsIHN0eWxlQnVpbGRlciwgc3R5bGVVdGlscywgbWFyc2hhbCk7XG4gICAgY29uc3QgZXh0cmFUcmlnZ2VycyA9IFt0aGlzLmRpcmVjdGlvbmFsaXR5LmNoYW5nZSwgdGhpcy5vYnNlcnZlclN1YmplY3QuYXNPYnNlcnZhYmxlKCldO1xuICAgIHRoaXMuaW5pdChleHRyYVRyaWdnZXJzKTtcbiAgICB0aGlzLm1hcnNoYWxcbiAgICAgIC50cmFja1ZhbHVlKHRoaXMubmF0aXZlRWxlbWVudCwgJ2xheW91dCcpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95U3ViamVjdCkpXG4gICAgICAuc3Vic2NyaWJlKHRoaXMub25MYXlvdXRDaGFuZ2UuYmluZCh0aGlzKSk7XG4gIH1cblxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgLy8gTGlmZWN5Y2xlIE1ldGhvZHNcbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuYnVpbGRDaGlsZE9ic2VydmFibGUoKTtcbiAgICB0aGlzLnRyaWdnZXJVcGRhdGUoKTtcbiAgfVxuXG4gIG92ZXJyaWRlIG5nT25EZXN0cm95KCkge1xuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgaWYgKHRoaXMub2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMub2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cbiAgfVxuXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAvLyBQcm90ZWN0ZWQgbWV0aG9kc1xuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuICAvKipcbiAgICogQ2FjaGUgdGhlIHBhcmVudCBjb250YWluZXIgJ2ZsZXgtZGlyZWN0aW9uJyBhbmQgdXBkYXRlIHRoZSAnbWFyZ2luJyBzdHlsZXNcbiAgICovXG4gIHByb3RlY3RlZCBvbkxheW91dENoYW5nZShtYXRjaGVyOiBFbGVtZW50TWF0Y2hlcikge1xuICAgIGNvbnN0IGxheW91dDogc3RyaW5nID0gbWF0Y2hlci52YWx1ZTtcbiAgICAvLyBNYWtlIHN1cmUgdG8gZmlsdGVyIG91dCAnd3JhcCcgb3B0aW9uXG4gICAgY29uc3QgZGlyZWN0aW9uID0gbGF5b3V0LnNwbGl0KCcgJyk7XG4gICAgdGhpcy5sYXlvdXQgPSBkaXJlY3Rpb25bMF07XG4gICAgaWYgKCFMQVlPVVRfVkFMVUVTLmZpbmQoeCA9PiB4ID09PSB0aGlzLmxheW91dCkpIHtcbiAgICAgIHRoaXMubGF5b3V0ID0gJ3Jvdyc7XG4gICAgfVxuICAgIHRoaXMudHJpZ2dlclVwZGF0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdXBkYXRlV2l0aFZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAvLyBHYXRoZXIgYWxsIG5vbi1oaWRkZW4gRWxlbWVudCBub2Rlc1xuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5jaGlsZHJlbk5vZGVzXG4gICAgICAuZmlsdGVyKGVsID0+IGVsLm5vZGVUeXBlID09PSAxICYmIHRoaXMud2lsbERpc3BsYXkoZWwpKVxuICAgICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgY29uc3Qgb3JkZXJBID0gK3RoaXMuc3R5bGVyLmxvb2t1cFN0eWxlKGEsICdvcmRlcicpO1xuICAgICAgICBjb25zdCBvcmRlckIgPSArdGhpcy5zdHlsZXIubG9va3VwU3R5bGUoYiwgJ29yZGVyJyk7XG4gICAgICAgIGlmIChpc05hTihvcmRlckEpIHx8IGlzTmFOKG9yZGVyQikgfHwgb3JkZXJBID09PSBvcmRlckIpIHtcbiAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gb3JkZXJBID4gb3JkZXJCID8gMSA6IC0xO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIGlmIChpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBkaXJlY3Rpb25hbGl0eSA9IHRoaXMuZGlyZWN0aW9uYWxpdHkudmFsdWU7XG4gICAgICBjb25zdCBsYXlvdXQgPSB0aGlzLmxheW91dDtcbiAgICAgIGlmIChsYXlvdXQgPT09ICdyb3cnICYmIGRpcmVjdGlvbmFsaXR5ID09PSAncnRsJykge1xuICAgICAgICB0aGlzLnN0eWxlQ2FjaGUgPSBsYXlvdXRHYXBDYWNoZVJvd1J0bDtcbiAgICAgIH0gZWxzZSBpZiAobGF5b3V0ID09PSAncm93JyAmJiBkaXJlY3Rpb25hbGl0eSAhPT0gJ3J0bCcpIHtcbiAgICAgICAgdGhpcy5zdHlsZUNhY2hlID0gbGF5b3V0R2FwQ2FjaGVSb3dMdHI7XG4gICAgICB9IGVsc2UgaWYgKGxheW91dCA9PT0gJ2NvbHVtbicgJiYgZGlyZWN0aW9uYWxpdHkgPT09ICdydGwnKSB7XG4gICAgICAgIHRoaXMuc3R5bGVDYWNoZSA9IGxheW91dEdhcENhY2hlQ29sdW1uUnRsO1xuICAgICAgfSBlbHNlIGlmIChsYXlvdXQgPT09ICdjb2x1bW4nICYmIGRpcmVjdGlvbmFsaXR5ICE9PSAncnRsJykge1xuICAgICAgICB0aGlzLnN0eWxlQ2FjaGUgPSBsYXlvdXRHYXBDYWNoZUNvbHVtbkx0cjtcbiAgICAgIH1cbiAgICAgIHRoaXMuYWRkU3R5bGVzKHZhbHVlLCB7ZGlyZWN0aW9uYWxpdHksIGl0ZW1zLCBsYXlvdXR9KTtcbiAgICB9XG4gIH1cblxuICAvKiogV2UgbmVlZCB0byBvdmVycmlkZSBjbGVhclN0eWxlcyBiZWNhdXNlIGluIG1vc3QgY2FzZXMgbXJ1IGlzbid0IHBvcHVsYXRlZCAqL1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgY2xlYXJTdHlsZXMoKSB7XG4gICAgY29uc3QgZ3JpZE1vZGUgPSBPYmplY3Qua2V5cyh0aGlzLm1ydSkubGVuZ3RoID4gMDtcbiAgICBjb25zdCBjaGlsZHJlblN0eWxlID0gZ3JpZE1vZGUgPyAncGFkZGluZycgOlxuICAgICAgZ2V0TWFyZ2luVHlwZSh0aGlzLmRpcmVjdGlvbmFsaXR5LnZhbHVlLCB0aGlzLmxheW91dCk7XG5cbiAgICAvLyBJZiB0aGVyZSBhcmUgc3R5bGVzIG9uIHRoZSBwYXJlbnQgcmVtb3ZlIHRoZW1cbiAgICBpZiAoZ3JpZE1vZGUpIHtcbiAgICAgIHN1cGVyLmNsZWFyU3R5bGVzKCk7XG4gICAgfVxuXG4gICAgLy8gVGhlbiByZW1vdmUgdGhlIGNoaWxkcmVuIHN0eWxlcyB0b29cbiAgICB0aGlzLnN0eWxlVXRpbHMuYXBwbHlTdHlsZVRvRWxlbWVudHMoe1tjaGlsZHJlblN0eWxlXTogJyd9LCB0aGlzLmNoaWxkcmVuTm9kZXMpO1xuICB9XG5cbiAgLyoqIERldGVybWluZSBpZiBhbiBlbGVtZW50IHdpbGwgc2hvdyBvciBoaWRlIGJhc2VkIG9uIGN1cnJlbnQgYWN0aXZhdGlvbiAqL1xuICBwcm90ZWN0ZWQgd2lsbERpc3BsYXkoc291cmNlOiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5tYXJzaGFsLmdldFZhbHVlKHNvdXJjZSwgJ3Nob3ctaGlkZScpO1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdHJ1ZSB8fFxuICAgICAgKHZhbHVlID09PSB1bmRlZmluZWQgJiYgdGhpcy5zdHlsZVV0aWxzLmxvb2t1cFN0eWxlKHNvdXJjZSwgJ2Rpc3BsYXknKSAhPT0gJ25vbmUnKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBidWlsZENoaWxkT2JzZXJ2YWJsZSgpOiB2b2lkIHtcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBNdXRhdGlvbk9ic2VydmVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aGlzLm9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9uczogTXV0YXRpb25SZWNvcmRbXSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHZhbGlkYXRlZENoYW5nZXMgPSAoaXQ6IE11dGF0aW9uUmVjb3JkKTogYm9vbGVhbiA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKGl0LmFkZGVkTm9kZXMgJiYgaXQuYWRkZWROb2Rlcy5sZW5ndGggPiAwKSB8fFxuICAgICAgICAgICAgICAoaXQucmVtb3ZlZE5vZGVzICYmIGl0LnJlbW92ZWROb2Rlcy5sZW5ndGggPiAwKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLy8gdXBkYXRlIGdhcCBzdHlsZXMgb25seSBmb3IgY2hpbGQgJ2FkZGVkJyBvciAncmVtb3ZlZCcgZXZlbnRzXG4gICAgICAgICAgaWYgKG11dGF0aW9ucy5zb21lKHZhbGlkYXRlZENoYW5nZXMpKSB7XG4gICAgICAgICAgICB0aGlzLm9ic2VydmVyU3ViamVjdC5uZXh0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vYnNlcnZlci5vYnNlcnZlKHRoaXMubmF0aXZlRWxlbWVudCwge2NoaWxkTGlzdDogdHJ1ZX0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIG9ic2VydmVyPzogTXV0YXRpb25PYnNlcnZlcjtcbn1cblxuQERpcmVjdGl2ZSh7c2VsZWN0b3IsIGlucHV0c30pXG5leHBvcnQgY2xhc3MgRGVmYXVsdExheW91dEdhcERpcmVjdGl2ZSBleHRlbmRzIExheW91dEdhcERpcmVjdGl2ZSB7XG4gIHByb3RlY3RlZCBvdmVycmlkZSBpbnB1dHMgPSBpbnB1dHM7XG59XG5cbmNvbnN0IGxheW91dEdhcENhY2hlUm93UnRsOiBNYXA8c3RyaW5nLCBTdHlsZURlZmluaXRpb24+ID0gbmV3IE1hcCgpO1xuY29uc3QgbGF5b3V0R2FwQ2FjaGVDb2x1bW5SdGw6IE1hcDxzdHJpbmcsIFN0eWxlRGVmaW5pdGlvbj4gPSBuZXcgTWFwKCk7XG5jb25zdCBsYXlvdXRHYXBDYWNoZVJvd0x0cjogTWFwPHN0cmluZywgU3R5bGVEZWZpbml0aW9uPiA9IG5ldyBNYXAoKTtcbmNvbnN0IGxheW91dEdhcENhY2hlQ29sdW1uTHRyOiBNYXA8c3RyaW5nLCBTdHlsZURlZmluaXRpb24+ID0gbmV3IE1hcCgpO1xuXG5jb25zdCBHUklEX1NQRUNJRklFUiA9ICcgZ3JpZCc7XG5cbmZ1bmN0aW9uIGJ1aWxkR3JpZFBhZGRpbmcodmFsdWU6IHN0cmluZywgZGlyZWN0aW9uYWxpdHk6IHN0cmluZyk6IFN0eWxlRGVmaW5pdGlvbiB7XG4gIGNvbnN0IFtiZXR3ZWVuLCBiZWxvd10gPSB2YWx1ZS5zcGxpdCgnICcpO1xuICBjb25zdCBib3R0b20gPSBiZWxvdyA/PyBiZXR3ZWVuO1xuICBsZXQgcGFkZGluZ1JpZ2h0ID0gJzBweCcsIHBhZGRpbmdCb3R0b20gPSBib3R0b20sIHBhZGRpbmdMZWZ0ID0gJzBweCc7XG5cbiAgaWYgKGRpcmVjdGlvbmFsaXR5ID09PSAncnRsJykge1xuICAgIHBhZGRpbmdMZWZ0ID0gYmV0d2VlbjtcbiAgfSBlbHNlIHtcbiAgICBwYWRkaW5nUmlnaHQgPSBiZXR3ZWVuO1xuICB9XG5cbiAgcmV0dXJuIHsncGFkZGluZyc6IGAwcHggJHtwYWRkaW5nUmlnaHR9ICR7cGFkZGluZ0JvdHRvbX0gJHtwYWRkaW5nTGVmdH1gfTtcbn1cblxuZnVuY3Rpb24gYnVpbGRHcmlkTWFyZ2luKHZhbHVlOiBzdHJpbmcsIGRpcmVjdGlvbmFsaXR5OiBzdHJpbmcpOiBTdHlsZURlZmluaXRpb24ge1xuICBjb25zdCBbYmV0d2VlbiwgYmVsb3ddID0gdmFsdWUuc3BsaXQoJyAnKTtcbiAgY29uc3QgYm90dG9tID0gYmVsb3cgPz8gYmV0d2VlbjtcbiAgY29uc3QgbWludXMgPSAoc3RyOiBzdHJpbmcpID0+IGAtJHtzdHJ9YDtcbiAgbGV0IG1hcmdpblJpZ2h0ID0gJzBweCcsIG1hcmdpbkJvdHRvbSA9IG1pbnVzKGJvdHRvbSksIG1hcmdpbkxlZnQgPSAnMHB4JztcblxuICBpZiAoZGlyZWN0aW9uYWxpdHkgPT09ICdydGwnKSB7XG4gICAgbWFyZ2luTGVmdCA9IG1pbnVzKGJldHdlZW4pO1xuICB9IGVsc2Uge1xuICAgIG1hcmdpblJpZ2h0ID0gbWludXMoYmV0d2Vlbik7XG4gIH1cblxuICByZXR1cm4geydtYXJnaW4nOiBgMHB4ICR7bWFyZ2luUmlnaHR9ICR7bWFyZ2luQm90dG9tfSAke21hcmdpbkxlZnR9YH07XG59XG5cbmZ1bmN0aW9uIGdldE1hcmdpblR5cGUoZGlyZWN0aW9uYWxpdHk6IHN0cmluZywgbGF5b3V0OiBzdHJpbmcpIHtcbiAgc3dpdGNoIChsYXlvdXQpIHtcbiAgICBjYXNlICdjb2x1bW4nOlxuICAgICAgcmV0dXJuICdtYXJnaW4tYm90dG9tJztcbiAgICBjYXNlICdjb2x1bW4tcmV2ZXJzZSc6XG4gICAgICByZXR1cm4gJ21hcmdpbi10b3AnO1xuICAgIGNhc2UgJ3Jvdyc6XG4gICAgICByZXR1cm4gZGlyZWN0aW9uYWxpdHkgPT09ICdydGwnID8gJ21hcmdpbi1sZWZ0JyA6ICdtYXJnaW4tcmlnaHQnO1xuICAgIGNhc2UgJ3Jvdy1yZXZlcnNlJzpcbiAgICAgIHJldHVybiBkaXJlY3Rpb25hbGl0eSA9PT0gJ3J0bCcgPyAnbWFyZ2luLXJpZ2h0JyA6ICdtYXJnaW4tbGVmdCc7XG4gICAgZGVmYXVsdCA6XG4gICAgICByZXR1cm4gZGlyZWN0aW9uYWxpdHkgPT09ICdydGwnID8gJ21hcmdpbi1sZWZ0JyA6ICdtYXJnaW4tcmlnaHQnO1xuICB9XG59XG5cbmZ1bmN0aW9uIGJ1aWxkR2FwQ1NTKGdhcFZhbHVlOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IHtkaXJlY3Rpb25hbGl0eTogc3RyaW5nLCBsYXlvdXQ6IHN0cmluZ30pOiBTdHlsZURlZmluaXRpb24ge1xuICBjb25zdCBrZXkgPSBnZXRNYXJnaW5UeXBlKHBhcmVudC5kaXJlY3Rpb25hbGl0eSwgcGFyZW50LmxheW91dCk7XG4gIGNvbnN0IG1hcmdpbnM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudWxsfSA9IHsuLi5DTEVBUl9NQVJHSU5fQ1NTfTtcbiAgbWFyZ2luc1trZXldID0gZ2FwVmFsdWU7XG4gIHJldHVybiBtYXJnaW5zO1xufVxuIl19