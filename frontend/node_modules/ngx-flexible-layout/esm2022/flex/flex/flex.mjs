/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Inject, Injectable, Input } from '@angular/core';
import { BaseDirective2, LAYOUT_CONFIG, StyleBuilder, validateBasis } from 'ngx-flexible-layout/core';
import { takeUntil } from 'rxjs/operators';
import { extendObject, isFlowHorizontal } from 'ngx-flexible-layout/_private-utils';
import * as i0 from "@angular/core";
import * as i1 from "ngx-flexible-layout/core";
export class FlexStyleBuilder extends StyleBuilder {
    layoutConfig;
    constructor(layoutConfig) {
        super();
        this.layoutConfig = layoutConfig;
    }
    buildStyles(input, parent) {
        let [grow, shrink, ...basisParts] = input.split(' ');
        let basis = basisParts.join(' ');
        // The flex-direction of this element's flex container. Defaults to 'row'.
        const direction = (parent.direction.indexOf('column') > -1) ? 'column' : 'row';
        const max = isFlowHorizontal(direction) ? 'max-width' : 'max-height';
        const min = isFlowHorizontal(direction) ? 'min-width' : 'min-height';
        const hasCalc = String(basis).indexOf('calc') > -1;
        const usingCalc = hasCalc || (basis === 'auto');
        const isPercent = String(basis).indexOf('%') > -1 && !hasCalc;
        const hasUnits = String(basis).indexOf('px') > -1 || String(basis).indexOf('rem') > -1 ||
            String(basis).indexOf('em') > -1 || String(basis).indexOf('vw') > -1 ||
            String(basis).indexOf('vh') > -1;
        let isValue = (hasCalc || hasUnits);
        grow = (grow == '0') ? 0 : grow;
        shrink = (shrink == '0') ? 0 : shrink;
        // make box inflexible when shrink and grow are both zero
        // should not set a min when the grow is zero
        // should not set a max when the shrink is zero
        const isFixed = !grow && !shrink;
        let css = {};
        // flex-basis allows you to specify the initial/starting main-axis size of the element,
        // before anything else is computed. It can either be a percentage or an absolute value.
        // It is, however, not the breaking point for flex-grow/shrink properties
        //
        // flex-grow can be seen as this:
        //   0: Do not stretch. Either size to element's content width, or obey 'flex-basis'.
        //   1: (Default value). Stretch; will be the same size to all other flex items on
        //       the same row since they have a default value of 1.
        //   ≥2 (integer n): Stretch. Will be n times the size of other elements
        //      with 'flex-grow: 1' on the same row.
        // Use `null` to clear existing styles.
        const clearStyles = {
            'max-width': null,
            'max-height': null,
            'min-width': null,
            'min-height': null
        };
        switch (basis || '') {
            case '':
                const useColumnBasisZero = this.layoutConfig.useColumnBasisZero !== false;
                basis = direction === 'row' ? '0%' : (useColumnBasisZero ? '0.000000001px' : 'auto');
                break;
            case 'initial': // default
            case 'nogrow':
                grow = 0;
                basis = 'auto';
                break;
            case 'grow':
                basis = '100%';
                break;
            case 'noshrink':
                shrink = 0;
                basis = 'auto';
                break;
            case 'auto':
                break;
            case 'none':
                grow = 0;
                shrink = 0;
                basis = 'auto';
                break;
            default:
                // Defaults to percentage sizing unless `px` is explicitly set
                if (!isValue && !isPercent && !isNaN(basis)) {
                    basis = basis + '%';
                }
                // Fix for issue 280
                if (basis === '0%') {
                    isValue = true;
                }
                if (basis === '0px') {
                    basis = '0%';
                }
                // fix issue #5345
                if (hasCalc) {
                    css = extendObject(clearStyles, {
                        'flex-grow': grow,
                        'flex-shrink': shrink,
                        'flex-basis': isValue ? basis : '100%'
                    });
                }
                else {
                    css = extendObject(clearStyles, {
                        'flex': `${grow} ${shrink} ${isValue ? basis : '100%'}`
                    });
                }
                break;
        }
        if (!(css['flex'] || css['flex-grow'])) {
            if (hasCalc) {
                css = extendObject(clearStyles, {
                    'flex-grow': grow,
                    'flex-shrink': shrink,
                    'flex-basis': basis
                });
            }
            else {
                css = extendObject(clearStyles, {
                    'flex': `${grow} ${shrink} ${basis}`
                });
            }
        }
        // Fix for issues 277, 534, and 728
        if (basis !== '0%' && basis !== '0px' && basis !== '0.000000001px' && basis !== 'auto') {
            css[min] = isFixed || (isValue && grow) ? basis : null;
            css[max] = isFixed || (!usingCalc && shrink) ? basis : null;
        }
        // Fix for issue 528
        if (!css[min] && !css[max]) {
            if (hasCalc) {
                css = extendObject(clearStyles, {
                    'flex-grow': grow,
                    'flex-shrink': shrink,
                    'flex-basis': basis
                });
            }
            else {
                css = extendObject(clearStyles, {
                    'flex': `${grow} ${shrink} ${basis}`
                });
            }
        }
        else {
            // Fix for issue 660
            if (parent.hasWrap) {
                css[hasCalc ? 'flex-basis' : 'flex'] = css[max] ?
                    (hasCalc ? css[max] : `${grow} ${shrink} ${css[max]}`) :
                    (hasCalc ? css[min] : `${grow} ${shrink} ${css[min]}`);
            }
        }
        return extendObject(css, { 'box-sizing': 'border-box' });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: FlexStyleBuilder, deps: [{ token: LAYOUT_CONFIG }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: FlexStyleBuilder, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: FlexStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [LAYOUT_CONFIG]
                }] }] });
const inputs = [
    'fxFlex', 'fxFlex.xs', 'fxFlex.sm', 'fxFlex.md',
    'fxFlex.lg', 'fxFlex.xl', 'fxFlex.lt-sm', 'fxFlex.lt-md',
    'fxFlex.lt-lg', 'fxFlex.lt-xl', 'fxFlex.gt-xs', 'fxFlex.gt-sm',
    'fxFlex.gt-md', 'fxFlex.gt-lg'
];
const selector = `
  [fxFlex], [fxFlex.xs], [fxFlex.sm], [fxFlex.md],
  [fxFlex.lg], [fxFlex.xl], [fxFlex.lt-sm], [fxFlex.lt-md],
  [fxFlex.lt-lg], [fxFlex.lt-xl], [fxFlex.gt-xs], [fxFlex.gt-sm],
  [fxFlex.gt-md], [fxFlex.gt-lg]
`;
/**
 * Directive to control the size of a flex item using flex-basis, flex-grow, and flex-shrink.
 * Corresponds to the css `flex` shorthand property.
 *
 * @see https://css-tricks.com/snippets/css/a-guide-to-flexbox/
 */
export class FlexDirective extends BaseDirective2 {
    layoutConfig;
    marshal;
    DIRECTIVE_KEY = 'flex';
    direction = undefined;
    wrap = undefined;
    get shrink() { return this.flexShrink; }
    set shrink(value) {
        this.flexShrink = value || '1';
        this.triggerReflow();
    }
    get grow() { return this.flexGrow; }
    set grow(value) {
        this.flexGrow = value || '1';
        this.triggerReflow();
    }
    flexGrow = '1';
    flexShrink = '1';
    constructor(elRef, styleUtils, layoutConfig, styleBuilder, marshal) {
        super(elRef, styleBuilder, styleUtils, marshal);
        this.layoutConfig = layoutConfig;
        this.marshal = marshal;
        this.init();
    }
    ngOnInit() {
        if (this.parentElement) {
            this.marshal.trackValue(this.parentElement, 'layout')
                .pipe(takeUntil(this.destroySubject))
                .subscribe(this.onLayoutChange.bind(this));
            this.marshal.trackValue(this.nativeElement, 'layout-align')
                .pipe(takeUntil(this.destroySubject))
                .subscribe(this.triggerReflow.bind(this));
        }
    }
    /**
     * Caches the parent container's 'flex-direction' and updates the element's style.
     * Used as a handler for layout change events from the parent flex container.
     */
    onLayoutChange(matcher) {
        const layout = matcher.value;
        const layoutParts = layout.split(' ');
        this.direction = layoutParts[0];
        this.wrap = layoutParts[1] !== undefined && layoutParts[1] === 'wrap';
        this.triggerUpdate();
    }
    /** Input to this is exclusively the basis input value */
    updateWithValue(value) {
        const addFlexToParent = this.layoutConfig.addFlexToParent !== false;
        if (this.direction === undefined) {
            this.direction = this.getFlexFlowDirection(this.parentElement, addFlexToParent);
        }
        if (this.wrap === undefined) {
            this.wrap = this.hasWrap(this.parentElement);
        }
        const direction = this.direction;
        const isHorizontal = direction.startsWith('row');
        const hasWrap = this.wrap;
        if (isHorizontal && hasWrap) {
            this.styleCache = flexRowWrapCache;
        }
        else if (isHorizontal && !hasWrap) {
            this.styleCache = flexRowCache;
        }
        else if (!isHorizontal && hasWrap) {
            this.styleCache = flexColumnWrapCache;
        }
        else if (!isHorizontal && !hasWrap) {
            this.styleCache = flexColumnCache;
        }
        const basis = String(value).replace(';', '');
        const parts = validateBasis(basis, this.flexGrow, this.flexShrink);
        this.addStyles(parts.join(' '), { direction, hasWrap });
    }
    /** Trigger a style reflow, usually based on a shrink/grow input event */
    triggerReflow() {
        const activatedValue = this.activatedValue;
        if (activatedValue !== undefined) {
            const parts = validateBasis(activatedValue + '', this.flexGrow, this.flexShrink);
            this.marshal.updateElement(this.nativeElement, this.DIRECTIVE_KEY, parts.join(' '));
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: FlexDirective, deps: [{ token: i0.ElementRef }, { token: i1.StyleUtils }, { token: LAYOUT_CONFIG }, { token: FlexStyleBuilder }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0", type: FlexDirective, inputs: { shrink: ["fxShrink", "shrink"], grow: ["fxGrow", "grow"] }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: FlexDirective, decorators: [{
            type: Directive
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.StyleUtils }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [LAYOUT_CONFIG]
                }] }, { type: FlexStyleBuilder }, { type: i1.MediaMarshaller }], propDecorators: { shrink: [{
                type: Input,
                args: ['fxShrink']
            }], grow: [{
                type: Input,
                args: ['fxGrow']
            }] } });
export class DefaultFlexDirective extends FlexDirective {
    inputs = inputs;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: DefaultFlexDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0", type: DefaultFlexDirective, selector: "\n  [fxFlex], [fxFlex.xs], [fxFlex.sm], [fxFlex.md],\n  [fxFlex.lg], [fxFlex.xl], [fxFlex.lt-sm], [fxFlex.lt-md],\n  [fxFlex.lt-lg], [fxFlex.lt-xl], [fxFlex.gt-xs], [fxFlex.gt-sm],\n  [fxFlex.gt-md], [fxFlex.gt-lg]\n", inputs: { fxFlex: "fxFlex", "fxFlex.xs": "fxFlex.xs", "fxFlex.sm": "fxFlex.sm", "fxFlex.md": "fxFlex.md", "fxFlex.lg": "fxFlex.lg", "fxFlex.xl": "fxFlex.xl", "fxFlex.lt-sm": "fxFlex.lt-sm", "fxFlex.lt-md": "fxFlex.lt-md", "fxFlex.lt-lg": "fxFlex.lt-lg", "fxFlex.lt-xl": "fxFlex.lt-xl", "fxFlex.gt-xs": "fxFlex.gt-xs", "fxFlex.gt-sm": "fxFlex.gt-sm", "fxFlex.gt-md": "fxFlex.gt-md", "fxFlex.gt-lg": "fxFlex.gt-lg" }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: DefaultFlexDirective, decorators: [{
            type: Directive,
            args: [{ inputs, selector }]
        }] });
const flexRowCache = new Map();
const flexColumnCache = new Map();
const flexRowWrapCache = new Map();
const flexColumnWrapCache = new Map();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpYnMvZmxleC1sYXlvdXQvZmxleC9mbGV4L2ZsZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBYyxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUN6RixPQUFPLEVBQ0gsY0FBYyxFQUNkLGFBQWEsRUFBbUIsWUFBWSxFQUU1QyxhQUFhLEVBQ2hCLE1BQU0sMEJBQTBCLENBQUM7QUFDbEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQzs7O0FBUXBGLE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxZQUFZO0lBQ0g7SUFBN0MsWUFBNkMsWUFBaUM7UUFDNUUsS0FBSyxFQUFFLENBQUM7UUFEbUMsaUJBQVksR0FBWixZQUFZLENBQXFCO0lBRTlFLENBQUM7SUFDRCxXQUFXLENBQUMsS0FBYSxFQUFFLE1BQXlCO1FBQ2xELElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsVUFBVSxDQUFDLEdBQXNCLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEUsSUFBSSxLQUFLLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVqQywwRUFBMEU7UUFDMUUsTUFBTSxTQUFTLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUUvRSxNQUFNLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENB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QUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQseUVBQXlFO0lBQy9ELGFBQWE7UUFDckIsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUMzQyxJQUFJLGNBQWMsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUNqQyxNQUFNLEtBQUssR0FBRyxhQUFhLENBQUMsY0FBYyxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNqRixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3RGLENBQUM7SUFDSCxDQUFDO3VHQXpGVSxhQUFhLHNFQTBCSixhQUFhOzJGQTFCdEIsYUFBYTs7MkZBQWIsYUFBYTtrQkFEekIsU0FBUzs7MEJBMkJLLE1BQU07MkJBQUMsYUFBYTttR0FsQjdCLE1BQU07c0JBRFQsS0FBSzt1QkFBQyxVQUFVO2dCQVFiLElBQUk7c0JBRFAsS0FBSzt1QkFBQyxRQUFROztBQStFakIsTUFBTSxPQUFPLG9CQUFxQixTQUFRLGFBQWE7SUFDbEMsTUFBTSxHQUFHLE1BQU0sQ0FBQzt1R0FEeEIsb0JBQW9COzJGQUFwQixvQkFBb0I7OzJGQUFwQixvQkFBb0I7a0JBRGhDLFNBQVM7bUJBQUMsRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFDOztBQUs3QixNQUFNLFlBQVksR0FBaUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUM3RCxNQUFNLGVBQWUsR0FBaUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNoRSxNQUFNLGdCQUFnQixHQUFpQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2pFLE1BQU0sbUJBQW1CLEdBQWlDLElBQUksR0FBRyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5qZWN0LCBJbmplY3RhYmxlLCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIEJhc2VEaXJlY3RpdmUyLCBFbGVtZW50TWF0Y2hlciwgTGF5b3V0Q29uZmlnT3B0aW9ucyxcbiAgICBMQVlPVVRfQ09ORklHLCBNZWRpYU1hcnNoYWxsZXIsIFN0eWxlQnVpbGRlcixcbiAgICBTdHlsZURlZmluaXRpb24sIFN0eWxlVXRpbHMsXG4gICAgdmFsaWRhdGVCYXNpc1xufSBmcm9tICduZ3gtZmxleGlibGUtbGF5b3V0L2NvcmUnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBleHRlbmRPYmplY3QsIGlzRmxvd0hvcml6b250YWwgfSBmcm9tICduZ3gtZmxleGlibGUtbGF5b3V0L19wcml2YXRlLXV0aWxzJztcblxuaW50ZXJmYWNlIEZsZXhCdWlsZGVyUGFyZW50IHtcbiAgZGlyZWN0aW9uOiBzdHJpbmc7XG4gIGhhc1dyYXA6IGJvb2xlYW47XG59XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIEZsZXhTdHlsZUJ1aWxkZXIgZXh0ZW5kcyBTdHlsZUJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KExBWU9VVF9DT05GSUcpIHByb3RlY3RlZCBsYXlvdXRDb25maWc6IExheW91dENvbmZpZ09wdGlvbnMpIHtcbiAgICBzdXBlcigpO1xuICB9XG4gIGJ1aWxkU3R5bGVzKGlucHV0OiBzdHJpbmcsIHBhcmVudDogRmxleEJ1aWxkZXJQYXJlbnQpIHtcbiAgICBsZXQgW2dyb3csIHNocmluaywgLi4uYmFzaXNQYXJ0c106IChzdHJpbmd8bnVtYmVyKVtdID0gaW5wdXQuc3BsaXQoJyAnKTtcbiAgICBsZXQgYmFzaXMgPSBiYXNpc1BhcnRzLmpvaW4oJyAnKTtcblxuICAgIC8vIFRoZSBmbGV4LWRpcmVjdGlvbiBvZiB0aGlzIGVsZW1lbnQncyBmbGV4IGNvbnRhaW5lci4gRGVmYXVsdHMgdG8gJ3JvdycuXG4gICAgY29uc3QgZGlyZWN0aW9uID0gKHBhcmVudC5kaXJlY3Rpb24uaW5kZXhPZignY29sdW1uJykgPiAtMSkgPyAnY29sdW1uJyA6ICdyb3cnO1xuXG4gICAgY29uc3QgbWF4ID0gaXNGbG93SG9yaXpvbnRhbChkaXJlY3Rpb24pID8gJ21heC13aWR0aCcgOiAnbWF4LWhlaWdodCc7XG4gICAgY29uc3QgbWluID0gaXNGbG93SG9yaXpvbnRhbChkaXJlY3Rpb24pID8gJ21pbi13aWR0aCcgOiAnbWluLWhlaWdodCc7XG5cbiAgICBjb25zdCBoYXNDYWxjID0gU3RyaW5nKGJhc2lzKS5pbmRleE9mKCdjYWxjJykgPiAtMTtcbiAgICBjb25zdCB1c2luZ0NhbGMgPSBoYXNDYWxjIHx8IChiYXNpcyA9PT0gJ2F1dG8nKTtcbiAgICBjb25zdCBpc1BlcmNlbnQgPSBTdHJpbmcoYmFzaXMpLmluZGV4T2YoJyUnKSA+IC0xICYmICFoYXNDYWxjO1xuICAgIGNvbnN0IGhhc1VuaXRzID0gU3RyaW5nKGJhc2lzKS5pbmRleE9mKCdweCcpID4gLTEgfHwgU3RyaW5nKGJhc2lzKS5pbmRleE9mKCdyZW0nKSA+IC0xIHx8XG4gICAgICBTdHJpbmcoYmFzaXMpLmluZGV4T2YoJ2VtJykgPiAtMSB8fCBTdHJpbmcoYmFzaXMpLmluZGV4T2YoJ3Z3JykgPiAtMSB8fFxuICAgICAgU3RyaW5nKGJhc2lzKS5pbmRleE9mKCd2aCcpID4gLTE7XG5cbiAgICBsZXQgaXNWYWx1ZSA9IChoYXNDYWxjIHx8IGhhc1VuaXRzKTtcblxuICAgIGdyb3cgPSAoZ3JvdyA9PSAnMCcpID8gMCA6IGdyb3c7XG4gICAgc2hyaW5rID0gKHNocmluayA9PSAnMCcpID8gMCA6IHNocmluaztcblxuICAgIC8vIG1ha2UgYm94IGluZmxleGlibGUgd2hlbiBzaHJpbmsgYW5kIGdyb3cgYXJlIGJvdGggemVyb1xuICAgIC8vIHNob3VsZCBub3Qgc2V0IGEgbWluIHdoZW4gdGhlIGdyb3cgaXMgemVyb1xuICAgIC8vIHNob3VsZCBub3Qgc2V0IGEgbWF4IHdoZW4gdGhlIHNocmluayBpcyB6ZXJvXG4gICAgY29uc3QgaXNGaXhlZCA9ICFncm93ICYmICFzaHJpbms7XG5cbiAgICBsZXQgY3NzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbH0gPSB7fTtcblxuICAgIC8vIGZsZXgtYmFzaXMgYWxsb3dzIHlvdSB0byBzcGVjaWZ5IHRoZSBpbml0aWFsL3N0YXJ0aW5nIG1haW4tYXhpcyBzaXplIG9mIHRoZSBlbGVtZW50LFxuICAgIC8vIGJlZm9yZSBhbnl0aGluZyBlbHNlIGlzIGNvbXB1dGVkLiBJdCBjYW4gZWl0aGVyIGJlIGEgcGVyY2VudGFnZSBvciBhbiBhYnNvbHV0ZSB2YWx1ZS5cbiAgICAvLyBJdCBpcywgaG93ZXZlciwgbm90IHRoZSBicmVha2luZyBwb2ludCBmb3IgZmxleC1ncm93L3NocmluayBwcm9wZXJ0aWVzXG4gICAgLy9cbiAgICAvLyBmbGV4LWdyb3cgY2FuIGJlIHNlZW4gYXMgdGhpczpcbiAgICAvLyAgIDA6IERvIG5vdCBzdHJldGNoLiBFaXRoZXIgc2l6ZSB0byBlbGVtZW50J3MgY29udGVudCB3aWR0aCwgb3Igb2JleSAnZmxleC1iYXNpcycuXG4gICAgLy8gICAxOiAoRGVmYXVsdCB2YWx1ZSkuIFN0cmV0Y2g7IHdpbGwgYmUgdGhlIHNhbWUgc2l6ZSB0byBhbGwgb3RoZXIgZmxleCBpdGVtcyBvblxuICAgIC8vICAgICAgIHRoZSBzYW1lIHJvdyBzaW5jZSB0aGV5IGhhdmUgYSBkZWZhdWx0IHZhbHVlIG9mIDEuXG4gICAgLy8gICDiiaUyIChpbnRlZ2VyIG4pOiBTdHJldGNoLiBXaWxsIGJlIG4gdGltZXMgdGhlIHNpemUgb2Ygb3RoZXIgZWxlbWVudHNcbiAgICAvLyAgICAgIHdpdGggJ2ZsZXgtZ3JvdzogMScgb24gdGhlIHNhbWUgcm93LlxuXG4gICAgLy8gVXNlIGBudWxsYCB0byBjbGVhciBleGlzdGluZyBzdHlsZXMuXG4gICAgY29uc3QgY2xlYXJTdHlsZXMgPSB7XG4gICAgICAnbWF4LXdpZHRoJzogbnVsbCxcbiAgICAgICdtYXgtaGVpZ2h0JzogbnVsbCxcbiAgICAgICdtaW4td2lkdGgnOiBudWxsLFxuICAgICAgJ21pbi1oZWlnaHQnOiBudWxsXG4gICAgfTtcbiAgICBzd2l0Y2ggKGJhc2lzIHx8ICcnKSB7XG4gICAgICBjYXNlICcnOlxuICAgICAgICBjb25zdCB1c2VDb2x1bW5CYXNpc1plcm8gPSB0aGlzLmxheW91dENvbmZpZy51c2VDb2x1bW5CYXNpc1plcm8gIT09IGZhbHNlO1xuICAgICAgICBiYXNpcyA9IGRpcmVjdGlvbiA9PT0gJ3JvdycgPyAnMCUnIDogKHVzZUNvbHVtbkJhc2lzWmVybyA/ICcwLjAwMDAwMDAwMXB4JyA6ICdhdXRvJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaW5pdGlhbCc6ICAgLy8gZGVmYXVsdFxuICAgICAgY2FzZSAnbm9ncm93JzpcbiAgICAgICAgZ3JvdyA9IDA7XG4gICAgICAgIGJhc2lzID0gJ2F1dG8nO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2dyb3cnOlxuICAgICAgICBiYXNpcyA9ICcxMDAlJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdub3Nocmluayc6XG4gICAgICAgIHNocmluayA9IDA7XG4gICAgICAgIGJhc2lzID0gJ2F1dG8nO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2F1dG8nOlxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ25vbmUnOlxuICAgICAgICBncm93ID0gMDtcbiAgICAgICAgc2hyaW5rID0gMDtcbiAgICAgICAgYmFzaXMgPSAnYXV0byc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gRGVmYXVsdHMgdG8gcGVyY2VudGFnZSBzaXppbmcgdW5sZXNzIGBweGAgaXMgZXhwbGljaXRseSBzZXRcbiAgICAgICAgaWYgKCFpc1ZhbHVlICYmICFpc1BlcmNlbnQgJiYgIWlzTmFOKGJhc2lzIGFzIGFueSkpIHtcbiAgICAgICAgICBiYXNpcyA9IGJhc2lzICsgJyUnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRml4IGZvciBpc3N1ZSAyODBcbiAgICAgICAgaWYgKGJhc2lzID09PSAnMCUnKSB7XG4gICAgICAgICAgaXNWYWx1ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYmFzaXMgPT09ICcwcHgnKSB7XG4gICAgICAgICAgYmFzaXMgPSAnMCUnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZml4IGlzc3VlICM1MzQ1XG4gICAgICAgIGlmIChoYXNDYWxjKSB7XG4gICAgICAgICAgY3NzID0gZXh0ZW5kT2JqZWN0KGNsZWFyU3R5bGVzLCB7XG4gICAgICAgICAgICAnZmxleC1ncm93JzogZ3JvdyxcbiAgICAgICAgICAgICdmbGV4LXNocmluayc6IHNocmluayxcbiAgICAgICAgICAgICdmbGV4LWJhc2lzJzogaXNWYWx1ZSA/IGJhc2lzIDogJzEwMCUnXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3NzID0gZXh0ZW5kT2JqZWN0KGNsZWFyU3R5bGVzLCB7XG4gICAgICAgICAgICAnZmxleCc6IGAke2dyb3d9ICR7c2hyaW5rfSAke2lzVmFsdWUgPyBiYXNpcyA6ICcxMDAlJ31gXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoIShjc3NbJ2ZsZXgnXSB8fCBjc3NbJ2ZsZXgtZ3JvdyddKSkge1xuICAgICAgaWYgKGhhc0NhbGMpIHtcbiAgICAgICAgY3NzID0gZXh0ZW5kT2JqZWN0KGNsZWFyU3R5bGVzLCB7XG4gICAgICAgICAgJ2ZsZXgtZ3Jvdyc6IGdyb3csXG4gICAgICAgICAgJ2ZsZXgtc2hyaW5rJzogc2hyaW5rLFxuICAgICAgICAgICdmbGV4LWJhc2lzJzogYmFzaXNcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjc3MgPSBleHRlbmRPYmplY3QoY2xlYXJTdHlsZXMsIHtcbiAgICAgICAgICAnZmxleCc6IGAke2dyb3d9ICR7c2hyaW5rfSAke2Jhc2lzfWBcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRml4IGZvciBpc3N1ZXMgMjc3LCA1MzQsIGFuZCA3MjhcbiAgICBpZiAoYmFzaXMgIT09ICcwJScgJiYgYmFzaXMgIT09ICcwcHgnICYmIGJhc2lzICE9PSAnMC4wMDAwMDAwMDFweCcgJiYgYmFzaXMgIT09ICdhdXRvJykge1xuICAgICAgY3NzW21pbl0gPSBpc0ZpeGVkIHx8IChpc1ZhbHVlICYmIGdyb3cpID8gYmFzaXMgOiBudWxsO1xuICAgICAgY3NzW21heF0gPSBpc0ZpeGVkIHx8ICghdXNpbmdDYWxjICYmIHNocmluaykgPyBiYXNpcyA6IG51bGw7XG4gICAgfVxuXG4gICAgLy8gRml4IGZvciBpc3N1ZSA1MjhcbiAgICBpZiAoIWNzc1ttaW5dICYmICFjc3NbbWF4XSkge1xuICAgICAgaWYgKGhhc0NhbGMpIHtcbiAgICAgICAgY3NzID0gZXh0ZW5kT2JqZWN0KGNsZWFyU3R5bGVzLCB7XG4gICAgICAgICAgJ2ZsZXgtZ3Jvdyc6IGdyb3csXG4gICAgICAgICAgJ2ZsZXgtc2hyaW5rJzogc2hyaW5rLFxuICAgICAgICAgICdmbGV4LWJhc2lzJzogYmFzaXNcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjc3MgPSBleHRlbmRPYmplY3QoY2xlYXJTdHlsZXMsIHtcbiAgICAgICAgICAnZmxleCc6IGAke2dyb3d9ICR7c2hyaW5rfSAke2Jhc2lzfWBcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEZpeCBmb3IgaXNzdWUgNjYwXG4gICAgICBpZiAocGFyZW50Lmhhc1dyYXApIHtcbiAgICAgICAgY3NzW2hhc0NhbGMgPyAnZmxleC1iYXNpcycgOiAnZmxleCddID0gY3NzW21heF0gP1xuICAgICAgICAgIChoYXNDYWxjID8gY3NzW21heF0gOiBgJHtncm93fSAke3Nocmlua30gJHtjc3NbbWF4XX1gKSA6XG4gICAgICAgICAgKGhhc0NhbGMgPyBjc3NbbWluXSA6IGAke2dyb3d9ICR7c2hyaW5rfSAke2Nzc1ttaW5dfWApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBleHRlbmRPYmplY3QoY3NzLCB7J2JveC1zaXppbmcnOiAnYm9yZGVyLWJveCd9KSBhcyBTdHlsZURlZmluaXRpb247XG4gIH1cbn1cblxuY29uc3QgaW5wdXRzID0gW1xuICAnZnhGbGV4JywgJ2Z4RmxleC54cycsICdmeEZsZXguc20nLCAnZnhGbGV4Lm1kJyxcbiAgJ2Z4RmxleC5sZycsICdmeEZsZXgueGwnLCAnZnhGbGV4Lmx0LXNtJywgJ2Z4RmxleC5sdC1tZCcsXG4gICdmeEZsZXgubHQtbGcnLCAnZnhGbGV4Lmx0LXhsJywgJ2Z4RmxleC5ndC14cycsICdmeEZsZXguZ3Qtc20nLFxuICAnZnhGbGV4Lmd0LW1kJywgJ2Z4RmxleC5ndC1sZydcbl07XG5jb25zdCBzZWxlY3RvciA9IGBcbiAgW2Z4RmxleF0sIFtmeEZsZXgueHNdLCBbZnhGbGV4LnNtXSwgW2Z4RmxleC5tZF0sXG4gIFtmeEZsZXgubGddLCBbZnhGbGV4LnhsXSwgW2Z4RmxleC5sdC1zbV0sIFtmeEZsZXgubHQtbWRdLFxuICBbZnhGbGV4Lmx0LWxnXSwgW2Z4RmxleC5sdC14bF0sIFtmeEZsZXguZ3QteHNdLCBbZnhGbGV4Lmd0LXNtXSxcbiAgW2Z4RmxleC5ndC1tZF0sIFtmeEZsZXguZ3QtbGddXG5gO1xuXG4vKipcbiAqIERpcmVjdGl2ZSB0byBjb250cm9sIHRoZSBzaXplIG9mIGEgZmxleCBpdGVtIHVzaW5nIGZsZXgtYmFzaXMsIGZsZXgtZ3JvdywgYW5kIGZsZXgtc2hyaW5rLlxuICogQ29ycmVzcG9uZHMgdG8gdGhlIGNzcyBgZmxleGAgc2hvcnRoYW5kIHByb3BlcnR5LlxuICpcbiAqIEBzZWUgaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9zbmlwcGV0cy9jc3MvYS1ndWlkZS10by1mbGV4Ym94L1xuICovXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBGbGV4RGlyZWN0aXZlIGV4dGVuZHMgQmFzZURpcmVjdGl2ZTIgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHByb3RlY3RlZCBvdmVycmlkZSBESVJFQ1RJVkVfS0VZID0gJ2ZsZXgnO1xuICBwcm90ZWN0ZWQgZGlyZWN0aW9uPzogc3RyaW5nID0gdW5kZWZpbmVkO1xuICBwcm90ZWN0ZWQgd3JhcD86IGJvb2xlYW4gPSB1bmRlZmluZWQ7XG5cblxuICBASW5wdXQoJ2Z4U2hyaW5rJylcbiAgZ2V0IHNocmluaygpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5mbGV4U2hyaW5rOyB9XG4gIHNldCBzaHJpbmsodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuZmxleFNocmluayA9IHZhbHVlIHx8ICcxJztcbiAgICB0aGlzLnRyaWdnZXJSZWZsb3coKTtcbiAgfVxuXG4gIEBJbnB1dCgnZnhHcm93JylcbiAgZ2V0IGdyb3coKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuZmxleEdyb3c7IH1cbiAgc2V0IGdyb3codmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuZmxleEdyb3cgPSB2YWx1ZSB8fCAnMSc7XG4gICAgdGhpcy50cmlnZ2VyUmVmbG93KCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZmxleEdyb3cgPSAnMSc7XG4gIHByb3RlY3RlZCBmbGV4U2hyaW5rID0gJzEnO1xuXG4gIGNvbnN0cnVjdG9yKGVsUmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBzdHlsZVV0aWxzOiBTdHlsZVV0aWxzLFxuICAgICAgICAgICAgICBASW5qZWN0KExBWU9VVF9DT05GSUcpIHByb3RlY3RlZCBsYXlvdXRDb25maWc6IExheW91dENvbmZpZ09wdGlvbnMsXG4gICAgICAgICAgICAgIHN0eWxlQnVpbGRlcjogRmxleFN0eWxlQnVpbGRlcixcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIG1hcnNoYWw6IE1lZGlhTWFyc2hhbGxlcikge1xuICAgIHN1cGVyKGVsUmVmLCBzdHlsZUJ1aWxkZXIsIHN0eWxlVXRpbHMsIG1hcnNoYWwpO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMucGFyZW50RWxlbWVudCkge1xuICAgICAgdGhpcy5tYXJzaGFsLnRyYWNrVmFsdWUodGhpcy5wYXJlbnRFbGVtZW50LCAnbGF5b3V0JylcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveVN1YmplY3QpKVxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMub25MYXlvdXRDaGFuZ2UuYmluZCh0aGlzKSk7XG4gICAgICB0aGlzLm1hcnNoYWwudHJhY2tWYWx1ZSh0aGlzLm5hdGl2ZUVsZW1lbnQsICdsYXlvdXQtYWxpZ24nKVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95U3ViamVjdCkpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy50cmlnZ2VyUmVmbG93LmJpbmQodGhpcykpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWNoZXMgdGhlIHBhcmVudCBjb250YWluZXIncyAnZmxleC1kaXJlY3Rpb24nIGFuZCB1cGRhdGVzIHRoZSBlbGVtZW50J3Mgc3R5bGUuXG4gICAqIFVzZWQgYXMgYSBoYW5kbGVyIGZvciBsYXlvdXQgY2hhbmdlIGV2ZW50cyBmcm9tIHRoZSBwYXJlbnQgZmxleCBjb250YWluZXIuXG4gICAqL1xuICBwcm90ZWN0ZWQgb25MYXlvdXRDaGFuZ2UobWF0Y2hlcjogRWxlbWVudE1hdGNoZXIpIHtcbiAgICBjb25zdCBsYXlvdXQ6IHN0cmluZyA9IG1hdGNoZXIudmFsdWU7XG4gICAgY29uc3QgbGF5b3V0UGFydHMgPSBsYXlvdXQuc3BsaXQoJyAnKTtcbiAgICB0aGlzLmRpcmVjdGlvbiA9IGxheW91dFBhcnRzWzBdO1xuICAgIHRoaXMud3JhcCA9IGxheW91dFBhcnRzWzFdICE9PSB1bmRlZmluZWQgJiYgbGF5b3V0UGFydHNbMV0gPT09ICd3cmFwJztcbiAgICB0aGlzLnRyaWdnZXJVcGRhdGUoKTtcbiAgfVxuXG4gIC8qKiBJbnB1dCB0byB0aGlzIGlzIGV4Y2x1c2l2ZWx5IHRoZSBiYXNpcyBpbnB1dCB2YWx1ZSAqL1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdXBkYXRlV2l0aFZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBhZGRGbGV4VG9QYXJlbnQgPSB0aGlzLmxheW91dENvbmZpZy5hZGRGbGV4VG9QYXJlbnQgIT09IGZhbHNlO1xuICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmRpcmVjdGlvbiA9IHRoaXMuZ2V0RmxleEZsb3dEaXJlY3Rpb24odGhpcy5wYXJlbnRFbGVtZW50ISwgYWRkRmxleFRvUGFyZW50KTtcbiAgICB9XG4gICAgaWYgKHRoaXMud3JhcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLndyYXAgPSB0aGlzLmhhc1dyYXAodGhpcy5wYXJlbnRFbGVtZW50ISk7XG4gICAgfVxuICAgIGNvbnN0IGRpcmVjdGlvbiA9IHRoaXMuZGlyZWN0aW9uO1xuICAgIGNvbnN0IGlzSG9yaXpvbnRhbCA9IGRpcmVjdGlvbi5zdGFydHNXaXRoKCdyb3cnKTtcbiAgICBjb25zdCBoYXNXcmFwID0gdGhpcy53cmFwO1xuICAgIGlmIChpc0hvcml6b250YWwgJiYgaGFzV3JhcCkge1xuICAgICAgdGhpcy5zdHlsZUNhY2hlID0gZmxleFJvd1dyYXBDYWNoZTtcbiAgICB9IGVsc2UgaWYgKGlzSG9yaXpvbnRhbCAmJiAhaGFzV3JhcCkge1xuICAgICAgdGhpcy5zdHlsZUNhY2hlID0gZmxleFJvd0NhY2hlO1xuICAgIH0gZWxzZSBpZiAoIWlzSG9yaXpvbnRhbCAmJiBoYXNXcmFwKSB7XG4gICAgICB0aGlzLnN0eWxlQ2FjaGUgPSBmbGV4Q29sdW1uV3JhcENhY2hlO1xuICAgIH0gZWxzZSBpZiAoIWlzSG9yaXpvbnRhbCAmJiAhaGFzV3JhcCkge1xuICAgICAgdGhpcy5zdHlsZUNhY2hlID0gZmxleENvbHVtbkNhY2hlO1xuICAgIH1cbiAgICBjb25zdCBiYXNpcyA9IFN0cmluZyh2YWx1ZSkucmVwbGFjZSgnOycsICcnKTtcbiAgICBjb25zdCBwYXJ0cyA9IHZhbGlkYXRlQmFzaXMoYmFzaXMsIHRoaXMuZmxleEdyb3csIHRoaXMuZmxleFNocmluayk7XG4gICAgdGhpcy5hZGRTdHlsZXMocGFydHMuam9pbignICcpLCB7ZGlyZWN0aW9uLCBoYXNXcmFwfSk7XG4gIH1cblxuICAvKiogVHJpZ2dlciBhIHN0eWxlIHJlZmxvdywgdXN1YWxseSBiYXNlZCBvbiBhIHNocmluay9ncm93IGlucHV0IGV2ZW50ICovXG4gIHByb3RlY3RlZCB0cmlnZ2VyUmVmbG93KCkge1xuICAgIGNvbnN0IGFjdGl2YXRlZFZhbHVlID0gdGhpcy5hY3RpdmF0ZWRWYWx1ZTtcbiAgICBpZiAoYWN0aXZhdGVkVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgcGFydHMgPSB2YWxpZGF0ZUJhc2lzKGFjdGl2YXRlZFZhbHVlICsgJycsIHRoaXMuZmxleEdyb3csIHRoaXMuZmxleFNocmluayk7XG4gICAgICB0aGlzLm1hcnNoYWwudXBkYXRlRWxlbWVudCh0aGlzLm5hdGl2ZUVsZW1lbnQsIHRoaXMuRElSRUNUSVZFX0tFWSwgcGFydHMuam9pbignICcpKTtcbiAgICB9XG4gIH1cbn1cblxuQERpcmVjdGl2ZSh7aW5wdXRzLCBzZWxlY3Rvcn0pXG5leHBvcnQgY2xhc3MgRGVmYXVsdEZsZXhEaXJlY3RpdmUgZXh0ZW5kcyBGbGV4RGlyZWN0aXZlIHtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIGlucHV0cyA9IGlucHV0cztcbn1cblxuY29uc3QgZmxleFJvd0NhY2hlOiBNYXA8c3RyaW5nLCBTdHlsZURlZmluaXRpb24+ID0gbmV3IE1hcCgpO1xuY29uc3QgZmxleENvbHVtbkNhY2hlOiBNYXA8c3RyaW5nLCBTdHlsZURlZmluaXRpb24+ID0gbmV3IE1hcCgpO1xuY29uc3QgZmxleFJvd1dyYXBDYWNoZTogTWFwPHN0cmluZywgU3R5bGVEZWZpbml0aW9uPiA9IG5ldyBNYXAoKTtcbmNvbnN0IGZsZXhDb2x1bW5XcmFwQ2FjaGU6IE1hcDxzdHJpbmcsIFN0eWxlRGVmaW5pdGlvbj4gPSBuZXcgTWFwKCk7XG4iXX0=