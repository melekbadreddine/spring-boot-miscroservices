import { Directive, Inject, Injectable } from '@angular/core';
import { BaseDirective2, LAYOUT_CONFIG, StyleBuilder, ɵmultiply as multiply } from 'ngx-flexible-layout/core';
import { isFlowHorizontal } from 'ngx-flexible-layout/_private-utils';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/bidi";
import * as i2 from "ngx-flexible-layout/core";
export class FlexOffsetStyleBuilder extends StyleBuilder {
    _config;
    constructor(_config) {
        super();
        this._config = _config;
    }
    buildStyles(offset, parent) {
        offset ||= '0';
        offset = multiply(offset, this._config.multiplier);
        const isPercent = String(offset).indexOf('%') > -1;
        const isPx = String(offset).indexOf('px') > -1;
        if (!isPx && !isPercent && !isNaN(+offset)) {
            offset = `${offset}%`;
        }
        const horizontalLayoutKey = parent.isRtl ? 'margin-right' : 'margin-left';
        const styles = isFlowHorizontal(parent.layout) ?
            { [horizontalLayoutKey]: offset } : { 'margin-top': offset };
        return styles;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: FlexOffsetStyleBuilder, deps: [{ token: LAYOUT_CONFIG }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: FlexOffsetStyleBuilder, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: FlexOffsetStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [LAYOUT_CONFIG]
                }] }] });
const inputs = [
    'fxFlexOffset', 'fxFlexOffset.xs', 'fxFlexOffset.sm', 'fxFlexOffset.md',
    'fxFlexOffset.lg', 'fxFlexOffset.xl', 'fxFlexOffset.lt-sm', 'fxFlexOffset.lt-md',
    'fxFlexOffset.lt-lg', 'fxFlexOffset.lt-xl', 'fxFlexOffset.gt-xs', 'fxFlexOffset.gt-sm',
    'fxFlexOffset.gt-md', 'fxFlexOffset.gt-lg'
];
const selector = `
  [fxFlexOffset], [fxFlexOffset.xs], [fxFlexOffset.sm], [fxFlexOffset.md],
  [fxFlexOffset.lg], [fxFlexOffset.xl], [fxFlexOffset.lt-sm], [fxFlexOffset.lt-md],
  [fxFlexOffset.lt-lg], [fxFlexOffset.lt-xl], [fxFlexOffset.gt-xs], [fxFlexOffset.gt-sm],
  [fxFlexOffset.gt-md], [fxFlexOffset.gt-lg]
`;
/**
 * 'flex-offset' flexbox styling directive
 * Configures the 'margin-left' of the element in a layout container
 */
export class FlexOffsetDirective extends BaseDirective2 {
    directionality;
    DIRECTIVE_KEY = 'flex-offset';
    constructor(elRef, directionality, styleBuilder, marshal, styler) {
        super(elRef, styleBuilder, styler, marshal);
        this.directionality = directionality;
        this.init([this.directionality.change]);
        // Parent DOM `layout-gap` with affect the nested child with `flex-offset`
        if (this.parentElement) {
            this.marshal
                .trackValue(this.parentElement, 'layout-gap')
                .pipe(takeUntil(this.destroySubject))
                .subscribe(this.triggerUpdate.bind(this));
        }
    }
    // *********************************************
    // Protected methods
    // *********************************************
    /**
     * Using the current fxFlexOffset value, update the inline CSS
     * NOTE: this will assign `margin-left` if the parent flex-direction == 'row',
     *       otherwise `margin-top` is used for the offset.
     */
    updateWithValue(value = '') {
        // The flex-direction of this element's flex container. Defaults to 'row'.
        const layout = this.getFlexFlowDirection(this.parentElement, true);
        const isRtl = this.directionality.value === 'rtl';
        if (layout === 'row' && isRtl) {
            this.styleCache = flexOffsetCacheRowRtl;
        }
        else if (layout === 'row' && !isRtl) {
            this.styleCache = flexOffsetCacheRowLtr;
        }
        else if (layout === 'column' && isRtl) {
            this.styleCache = flexOffsetCacheColumnRtl;
        }
        else if (layout === 'column' && !isRtl) {
            this.styleCache = flexOffsetCacheColumnLtr;
        }
        this.addStyles(value + '', { layout, isRtl });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: FlexOffsetDirective, deps: [{ token: i0.ElementRef }, { token: i1.Directionality }, { token: FlexOffsetStyleBuilder }, { token: i2.MediaMarshaller }, { token: i2.StyleUtils }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0", type: FlexOffsetDirective, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: FlexOffsetDirective, decorators: [{
            type: Directive
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.Directionality }, { type: FlexOffsetStyleBuilder }, { type: i2.MediaMarshaller }, { type: i2.StyleUtils }] });
export class DefaultFlexOffsetDirective extends FlexOffsetDirective {
    inputs = inputs;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: DefaultFlexOffsetDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0", type: DefaultFlexOffsetDirective, selector: "\n  [fxFlexOffset], [fxFlexOffset.xs], [fxFlexOffset.sm], [fxFlexOffset.md],\n  [fxFlexOffset.lg], [fxFlexOffset.xl], [fxFlexOffset.lt-sm], [fxFlexOffset.lt-md],\n  [fxFlexOffset.lt-lg], [fxFlexOffset.lt-xl], [fxFlexOffset.gt-xs], [fxFlexOffset.gt-sm],\n  [fxFlexOffset.gt-md], [fxFlexOffset.gt-lg]\n", inputs: { fxFlexOffset: "fxFlexOffset", "fxFlexOffset.xs": "fxFlexOffset.xs", "fxFlexOffset.sm": "fxFlexOffset.sm", "fxFlexOffset.md": "fxFlexOffset.md", "fxFlexOffset.lg": "fxFlexOffset.lg", "fxFlexOffset.xl": "fxFlexOffset.xl", "fxFlexOffset.lt-sm": "fxFlexOffset.lt-sm", "fxFlexOffset.lt-md": "fxFlexOffset.lt-md", "fxFlexOffset.lt-lg": "fxFlexOffset.lt-lg", "fxFlexOffset.lt-xl": "fxFlexOffset.lt-xl", "fxFlexOffset.gt-xs": "fxFlexOffset.gt-xs", "fxFlexOffset.gt-sm": "fxFlexOffset.gt-sm", "fxFlexOffset.gt-md": "fxFlexOffset.gt-md", "fxFlexOffset.gt-lg": "fxFlexOffset.gt-lg" }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: DefaultFlexOffsetDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
const flexOffsetCacheRowRtl = new Map();
const flexOffsetCacheColumnRtl = new Map();
const flexOffsetCacheRowLtr = new Map();
const flexOffsetCacheColumnLtr = new Map();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleC1vZmZzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWJzL2ZsZXgtbGF5b3V0L2ZsZXgvZmxleC1vZmZzZXQvZmxleC1vZmZzZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUUEsT0FBTyxFQUFFLFNBQVMsRUFBYyxNQUFNLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFDSCxjQUFjLEVBQXVCLGFBQWEsRUFBbUIsWUFBWSxFQUdqRixTQUFTLElBQUksUUFBUSxFQUN4QixNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQVMzQyxNQUFNLE9BQU8sc0JBQXVCLFNBQVEsWUFBWTtJQUNYO0lBQTNDLFlBQTJDLE9BQTRCO1FBQ3JFLEtBQUssRUFBRSxDQUFDO1FBRGlDLFlBQU8sR0FBUCxPQUFPLENBQXFCO0lBRXZFLENBQUM7SUFFRCxXQUFXLENBQUMsTUFBYyxFQUFFLE1BQXdCO1FBQ2xELE1BQU0sS0FBSyxHQUFHLENBQUM7UUFDZixNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ25ELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbkQsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZ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Q0FBQztZQUN6QyxJQUFJLENBQUMsVUFBVSxHQUFHLHdCQUF3QixDQUFDO1FBQzdDLENBQUM7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxFQUFFLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztJQUM5QyxDQUFDO3VHQTFDVSxtQkFBbUI7MkZBQW5CLG1CQUFtQjs7MkZBQW5CLG1CQUFtQjtrQkFEL0IsU0FBUzs7QUErQ1YsTUFBTSxPQUFPLDBCQUEyQixTQUFRLG1CQUFtQjtJQUM5QyxNQUFNLEdBQUcsTUFBTSxDQUFDO3VHQUR4QiwwQkFBMEI7MkZBQTFCLDBCQUEwQjs7MkZBQTFCLDBCQUEwQjtrQkFEdEMsU0FBUzttQkFBQyxFQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUM7O0FBSzdCLE1BQU0scUJBQXFCLEdBQWlDLElBQUksR0FBRyxFQUFFLENBQUM7QUFDdEUsTUFBTSx3QkFBd0IsR0FBaUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUN6RSxNQUFNLHFCQUFxQixHQUFpQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ3RFLE1BQU0sd0JBQXdCLEdBQWlDLElBQUksR0FBRyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3QsIEluamVjdGFibGUsIE9uQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBCYXNlRGlyZWN0aXZlMiwgTGF5b3V0Q29uZmlnT3B0aW9ucywgTEFZT1VUX0NPTkZJRywgTWVkaWFNYXJzaGFsbGVyLCBTdHlsZUJ1aWxkZXIsXG4gICAgU3R5bGVEZWZpbml0aW9uLFxuICAgIFN0eWxlVXRpbHMsXG4gICAgybVtdWx0aXBseSBhcyBtdWx0aXBseVxufSBmcm9tICduZ3gtZmxleGlibGUtbGF5b3V0L2NvcmUnO1xuaW1wb3J0IHsgaXNGbG93SG9yaXpvbnRhbCB9IGZyb20gJ25neC1mbGV4aWJsZS1sYXlvdXQvX3ByaXZhdGUtdXRpbHMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgRmxleE9mZnNldFBhcmVudCB7XG4gIGxheW91dDogc3RyaW5nO1xuICBpc1J0bDogYm9vbGVhbjtcbn1cblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgRmxleE9mZnNldFN0eWxlQnVpbGRlciBleHRlbmRzIFN0eWxlQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoTEFZT1VUX0NPTkZJRykgcHJpdmF0ZSBfY29uZmlnOiBMYXlvdXRDb25maWdPcHRpb25zKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIGJ1aWxkU3R5bGVzKG9mZnNldDogc3RyaW5nLCBwYXJlbnQ6IEZsZXhPZmZzZXRQYXJlbnQpIHtcbiAgICBvZmZzZXQgfHw9ICcwJztcbiAgICBvZmZzZXQgPSBtdWx0aXBseShvZmZzZXQsIHRoaXMuX2NvbmZpZy5tdWx0aXBsaWVyKTtcbiAgICBjb25zdCBpc1BlcmNlbnQgPSBTdHJpbmcob2Zmc2V0KS5pbmRleE9mKCclJykgPiAtMTtcbiAgICBjb25zdCBpc1B4ID0gU3RyaW5nKG9mZnNldCkuaW5kZXhPZigncHgnKSA+IC0xO1xuICAgIGlmICghaXNQeCAmJiAhaXNQZXJjZW50ICYmICFpc05hTigrb2Zmc2V0KSkge1xuICAgICAgb2Zmc2V0ID0gYCR7b2Zmc2V0fSVgO1xuICAgIH1cbiAgICBjb25zdCBob3Jpem9udGFsTGF5b3V0S2V5ID0gcGFyZW50LmlzUnRsID8gJ21hcmdpbi1yaWdodCcgOiAnbWFyZ2luLWxlZnQnO1xuICAgIGNvbnN0IHN0eWxlczogU3R5bGVEZWZpbml0aW9uID0gaXNGbG93SG9yaXpvbnRhbChwYXJlbnQubGF5b3V0KSA/XG4gICAgICB7W2hvcml6b250YWxMYXlvdXRLZXldOiBvZmZzZXR9IDogeydtYXJnaW4tdG9wJzogb2Zmc2V0fTtcblxuICAgIHJldHVybiBzdHlsZXM7XG4gIH1cbn1cblxuY29uc3QgaW5wdXRzID0gW1xuICAnZnhGbGV4T2Zmc2V0JywgJ2Z4RmxleE9mZnNldC54cycsICdmeEZsZXhPZmZzZXQuc20nLCAnZnhGbGV4T2Zmc2V0Lm1kJyxcbiAgJ2Z4RmxleE9mZnNldC5sZycsICdmeEZsZXhPZmZzZXQueGwnLCAnZnhGbGV4T2Zmc2V0Lmx0LXNtJywgJ2Z4RmxleE9mZnNldC5sdC1tZCcsXG4gICdmeEZsZXhPZmZzZXQubHQtbGcnLCAnZnhGbGV4T2Zmc2V0Lmx0LXhsJywgJ2Z4RmxleE9mZnNldC5ndC14cycsICdmeEZsZXhPZmZzZXQuZ3Qtc20nLFxuICAnZnhGbGV4T2Zmc2V0Lmd0LW1kJywgJ2Z4RmxleE9mZnNldC5ndC1sZydcbl07XG5jb25zdCBzZWxlY3RvciA9IGBcbiAgW2Z4RmxleE9mZnNldF0sIFtmeEZsZXhPZmZzZXQueHNdLCBbZnhGbGV4T2Zmc2V0LnNtXSwgW2Z4RmxleE9mZnNldC5tZF0sXG4gIFtmeEZsZXhPZmZzZXQubGddLCBbZnhGbGV4T2Zmc2V0LnhsXSwgW2Z4RmxleE9mZnNldC5sdC1zbV0sIFtmeEZsZXhPZmZzZXQubHQtbWRdLFxuICBbZnhGbGV4T2Zmc2V0Lmx0LWxnXSwgW2Z4RmxleE9mZnNldC5sdC14bF0sIFtmeEZsZXhPZmZzZXQuZ3QteHNdLCBbZnhGbGV4T2Zmc2V0Lmd0LXNtXSxcbiAgW2Z4RmxleE9mZnNldC5ndC1tZF0sIFtmeEZsZXhPZmZzZXQuZ3QtbGddXG5gO1xuXG4vKipcbiAqICdmbGV4LW9mZnNldCcgZmxleGJveCBzdHlsaW5nIGRpcmVjdGl2ZVxuICogQ29uZmlndXJlcyB0aGUgJ21hcmdpbi1sZWZ0JyBvZiB0aGUgZWxlbWVudCBpbiBhIGxheW91dCBjb250YWluZXJcbiAqL1xuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgRmxleE9mZnNldERpcmVjdGl2ZSBleHRlbmRzIEJhc2VEaXJlY3RpdmUyIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIERJUkVDVElWRV9LRVkgPSAnZmxleC1vZmZzZXQnO1xuXG4gIGNvbnN0cnVjdG9yKGVsUmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgZGlyZWN0aW9uYWxpdHk6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICAgICAgICBzdHlsZUJ1aWxkZXI6IEZsZXhPZmZzZXRTdHlsZUJ1aWxkZXIsXG4gICAgICAgICAgICAgIG1hcnNoYWw6IE1lZGlhTWFyc2hhbGxlcixcbiAgICAgICAgICAgICAgc3R5bGVyOiBTdHlsZVV0aWxzKSB7XG4gICAgc3VwZXIoZWxSZWYsIHN0eWxlQnVpbGRlciwgc3R5bGVyLCBtYXJzaGFsKTtcbiAgICB0aGlzLmluaXQoW3RoaXMuZGlyZWN0aW9uYWxpdHkuY2hhbmdlXSk7XG4gICAgLy8gUGFyZW50IERPTSBgbGF5b3V0LWdhcGAgd2l0aCBhZmZlY3QgdGhlIG5lc3RlZCBjaGlsZCB3aXRoIGBmbGV4LW9mZnNldGBcbiAgICBpZiAodGhpcy5wYXJlbnRFbGVtZW50KSB7XG4gICAgICB0aGlzLm1hcnNoYWxcbiAgICAgICAgLnRyYWNrVmFsdWUodGhpcy5wYXJlbnRFbGVtZW50LCAnbGF5b3V0LWdhcCcpXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3lTdWJqZWN0KSlcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLnRyaWdnZXJVcGRhdGUuYmluZCh0aGlzKSk7XG4gICAgfVxuICB9XG5cbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIC8vIFByb3RlY3RlZCBtZXRob2RzXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG4gIC8qKlxuICAgKiBVc2luZyB0aGUgY3VycmVudCBmeEZsZXhPZmZzZXQgdmFsdWUsIHVwZGF0ZSB0aGUgaW5saW5lIENTU1xuICAgKiBOT1RFOiB0aGlzIHdpbGwgYXNzaWduIGBtYXJnaW4tbGVmdGAgaWYgdGhlIHBhcmVudCBmbGV4LWRpcmVjdGlvbiA9PSAncm93JyxcbiAgICogICAgICAgb3RoZXJ3aXNlIGBtYXJnaW4tdG9wYCBpcyB1c2VkIGZvciB0aGUgb2Zmc2V0LlxuICAgKi9cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIHVwZGF0ZVdpdGhWYWx1ZSh2YWx1ZTogc3RyaW5nfG51bWJlciA9ICcnKTogdm9pZCB7XG4gICAgLy8gVGhlIGZsZXgtZGlyZWN0aW9uIG9mIHRoaXMgZWxlbWVudCdzIGZsZXggY29udGFpbmVyLiBEZWZhdWx0cyB0byAncm93Jy5cbiAgICBjb25zdCBsYXlvdXQgPSB0aGlzLmdldEZsZXhGbG93RGlyZWN0aW9uKHRoaXMucGFyZW50RWxlbWVudCEsIHRydWUpO1xuICAgIGNvbnN0IGlzUnRsID0gdGhpcy5kaXJlY3Rpb25hbGl0eS52YWx1ZSA9PT0gJ3J0bCc7XG4gICAgaWYgKGxheW91dCA9PT0gJ3JvdycgJiYgaXNSdGwpIHtcbiAgICAgIHRoaXMuc3R5bGVDYWNoZSA9IGZsZXhPZmZzZXRDYWNoZVJvd1J0bDtcbiAgICB9IGVsc2UgaWYgKGxheW91dCA9PT0gJ3JvdycgJiYgIWlzUnRsKSB7XG4gICAgICB0aGlzLnN0eWxlQ2FjaGUgPSBmbGV4T2Zmc2V0Q2FjaGVSb3dMdHI7XG4gICAgfSBlbHNlIGlmIChsYXlvdXQgPT09ICdjb2x1bW4nICYmIGlzUnRsKSB7XG4gICAgICB0aGlzLnN0eWxlQ2FjaGUgPSBmbGV4T2Zmc2V0Q2FjaGVDb2x1bW5SdGw7XG4gICAgfSBlbHNlIGlmIChsYXlvdXQgPT09ICdjb2x1bW4nICYmICFpc1J0bCkge1xuICAgICAgdGhpcy5zdHlsZUNhY2hlID0gZmxleE9mZnNldENhY2hlQ29sdW1uTHRyO1xuICAgIH1cbiAgICB0aGlzLmFkZFN0eWxlcyh2YWx1ZSArICcnLCB7bGF5b3V0LCBpc1J0bH0pO1xuICB9XG59XG5cbkBEaXJlY3RpdmUoe3NlbGVjdG9yLCBpbnB1dHN9KVxuZXhwb3J0IGNsYXNzIERlZmF1bHRGbGV4T2Zmc2V0RGlyZWN0aXZlIGV4dGVuZHMgRmxleE9mZnNldERpcmVjdGl2ZSB7XG4gIHByb3RlY3RlZCBvdmVycmlkZSBpbnB1dHMgPSBpbnB1dHM7XG59XG5cbmNvbnN0IGZsZXhPZmZzZXRDYWNoZVJvd1J0bDogTWFwPHN0cmluZywgU3R5bGVEZWZpbml0aW9uPiA9IG5ldyBNYXAoKTtcbmNvbnN0IGZsZXhPZmZzZXRDYWNoZUNvbHVtblJ0bDogTWFwPHN0cmluZywgU3R5bGVEZWZpbml0aW9uPiA9IG5ldyBNYXAoKTtcbmNvbnN0IGZsZXhPZmZzZXRDYWNoZVJvd0x0cjogTWFwPHN0cmluZywgU3R5bGVEZWZpbml0aW9uPiA9IG5ldyBNYXAoKTtcbmNvbnN0IGZsZXhPZmZzZXRDYWNoZUNvbHVtbkx0cjogTWFwPHN0cmluZywgU3R5bGVEZWZpbml0aW9uPiA9IG5ldyBNYXAoKTtcbiJdfQ==