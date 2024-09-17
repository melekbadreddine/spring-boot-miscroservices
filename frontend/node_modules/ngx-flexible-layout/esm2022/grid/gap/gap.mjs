/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, Injectable, Input } from '@angular/core';
import { BaseDirective2, StyleBuilder } from 'ngx-flexible-layout/core';
import * as i0 from "@angular/core";
import * as i1 from "ngx-flexible-layout/core";
const DEFAULT_VALUE = '0';
export class GridGapStyleBuilder extends StyleBuilder {
    buildStyles(input, parent) {
        return {
            'display': parent.inline ? 'inline-grid' : 'grid',
            'grid-gap': input || DEFAULT_VALUE
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: GridGapStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: GridGapStyleBuilder, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: GridGapStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
export class GridGapDirective extends BaseDirective2 {
    DIRECTIVE_KEY = 'grid-gap';
    get inline() { return this._inline; }
    set inline(val) { this._inline = coerceBooleanProperty(val); }
    _inline = false;
    constructor(elRef, styleUtils, styleBuilder, marshal) {
        super(elRef, styleBuilder, styleUtils, marshal);
        this.init();
    }
    // *********************************************
    // Protected methods
    // *********************************************
    updateWithValue(value) {
        this.styleCache = this.inline ? gapInlineCache : gapCache;
        this.addStyles(value, { inline: this.inline });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: GridGapDirective, deps: [{ token: i0.ElementRef }, { token: i1.StyleUtils }, { token: GridGapStyleBuilder }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0", type: GridGapDirective, inputs: { inline: ["gdInline", "inline"] }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: GridGapDirective, decorators: [{
            type: Directive
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.StyleUtils }, { type: GridGapStyleBuilder }, { type: i1.MediaMarshaller }], propDecorators: { inline: [{
                type: Input,
                args: ['gdInline']
            }] } });
const gapCache = new Map();
const gapInlineCache = new Map();
const inputs = [
    'gdGap',
    'gdGap.xs', 'gdGap.sm', 'gdGap.md', 'gdGap.lg', 'gdGap.xl',
    'gdGap.lt-sm', 'gdGap.lt-md', 'gdGap.lt-lg', 'gdGap.lt-xl',
    'gdGap.gt-xs', 'gdGap.gt-sm', 'gdGap.gt-md', 'gdGap.gt-lg'
];
const selector = `
  [gdGap],
  [gdGap.xs], [gdGap.sm], [gdGap.md], [gdGap.lg], [gdGap.xl],
  [gdGap.lt-sm], [gdGap.lt-md], [gdGap.lt-lg], [gdGap.lt-xl],
  [gdGap.gt-xs], [gdGap.gt-sm], [gdGap.gt-md], [gdGap.gt-lg]
`;
/**
 * 'grid-gap' CSS Grid styling directive
 * Configures the gap between items in the grid
 * Syntax: <row gap> [<column-gap>]
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-17
 */
export class DefaultGridGapDirective extends GridGapDirective {
    inputs = inputs;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: DefaultGridGapDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0", type: DefaultGridGapDirective, selector: "\n  [gdGap],\n  [gdGap.xs], [gdGap.sm], [gdGap.md], [gdGap.lg], [gdGap.xl],\n  [gdGap.lt-sm], [gdGap.lt-md], [gdGap.lt-lg], [gdGap.lt-xl],\n  [gdGap.gt-xs], [gdGap.gt-sm], [gdGap.gt-md], [gdGap.gt-lg]\n", inputs: { gdGap: "gdGap", "gdGap.xs": "gdGap.xs", "gdGap.sm": "gdGap.sm", "gdGap.md": "gdGap.md", "gdGap.lg": "gdGap.lg", "gdGap.xl": "gdGap.xl", "gdGap.lt-sm": "gdGap.lt-sm", "gdGap.lt-md": "gdGap.lt-md", "gdGap.lt-lg": "gdGap.lt-lg", "gdGap.lt-xl": "gdGap.lt-xl", "gdGap.gt-xs": "gdGap.gt-xs", "gdGap.gt-sm": "gdGap.gt-sm", "gdGap.gt-md": "gdGap.gt-md", "gdGap.gt-lg": "gdGap.gt-lg" }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: DefaultGridGapDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlicy9mbGV4LWxheW91dC9ncmlkL2dhcC9nYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFNBQVMsRUFBYyxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFDSCxjQUFjLEVBQ2QsWUFBWSxFQUVmLE1BQU0sMEJBQTBCLENBQUM7OztBQUVsQyxNQUFNLGFBQWEsR0FBRyxHQUFHLENBQUM7QUFPMUIsTUFBTSxPQUFPLG1CQUFvQixTQUFRLFlBQVk7SUFDbkQsV0FBVyxDQUFDLEtBQWEsRUFBRSxNQUFxQjtRQUM5QyxPQUFPO1lBQ0wsU0FBUyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsTUFBTTtZQUNqRCxVQUFVLEVBQUUsS0FBSyxJQUFJLGFBQWE7U0FDbkMsQ0FBQztJQUNKLENBQUM7dUdBTlUsbUJBQW1COzJHQUFuQixtQkFBbUIsY0FEUCxNQUFNOzsyRkFDbEIsbUJBQW1CO2tCQUQvQixVQUFVO21CQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7QUFXaEMsTUFBTSxPQUFPLGdCQUFpQixTQUFRLGNBQWM7SUFDL0IsYUFBYSxHQUFHLFVBQVUsQ0FBQztJQUU5QyxJQUNJLE1BQU0sS0FBYyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzlDLElBQUksTUFBTSxDQUFDLEdBQVksSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RCxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBRTFCLFlBQVksS0FBaUIsRUFDakIsVUFBc0IsRUFDdEIsWUFBaUMsRUFDakMsT0FBd0I7UUFDbEMsS0FBSyxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRCxnREFBZ0Q7SUFDaEQsb0JBQW9CO0lBQ3BCLGdEQUFnRDtJQUU3QixlQUFlLENBQUMsS0FBYTtRQUM5QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQzFELElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7dUdBdkJVLGdCQUFnQjsyRkFBaEIsZ0JBQWdCOzsyRkFBaEIsZ0JBQWdCO2tCQUQ1QixTQUFTO3FLQUtKLE1BQU07c0JBRFQsS0FBSzt1QkFBQyxVQUFVOztBQXVCbkIsTUFBTSxRQUFRLEdBQWlDLElBQUksR0FBRyxFQUFFLENBQUM7QUFDekQsTUFBTSxjQUFjLEdBQWlDLElBQUksR0FBRyxFQUFFLENBQUM7QUFFL0QsTUFBTSxNQUFNLEdBQUc7SUFDYixPQUFPO0lBQ1AsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVU7SUFDMUQsYUFBYSxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsYUFBYTtJQUMxRCxhQUFhLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxhQUFhO0NBQzNELENBQUM7QUFFRixNQUFNLFFBQVEsR0FBRzs7Ozs7Q0FLaEIsQ0FBQztBQUVGOzs7OztHQUtHO0FBRUgsTUFBTSxPQUFPLHVCQUF3QixTQUFRLGdCQUFnQjtJQUN4QyxNQUFNLEdBQUcsTUFBTSxDQUFDO3VHQUR4Qix1QkFBdUI7MkZBQXZCLHVCQUF1Qjs7MkZBQXZCLHVCQUF1QjtrQkFEbkMsU0FBUzttQkFBQyxFQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEluamVjdGFibGUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIEJhc2VEaXJlY3RpdmUyLCBNZWRpYU1hcnNoYWxsZXIsXG4gICAgU3R5bGVCdWlsZGVyLFxuICAgIFN0eWxlRGVmaW5pdGlvbiwgU3R5bGVVdGlsc1xufSBmcm9tICduZ3gtZmxleGlibGUtbGF5b3V0L2NvcmUnO1xuXG5jb25zdCBERUZBVUxUX1ZBTFVFID0gJzAnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdyaWRHYXBQYXJlbnQge1xuICBpbmxpbmU6IGJvb2xlYW47XG59XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIEdyaWRHYXBTdHlsZUJ1aWxkZXIgZXh0ZW5kcyBTdHlsZUJ1aWxkZXIge1xuICBidWlsZFN0eWxlcyhpbnB1dDogc3RyaW5nLCBwYXJlbnQ6IEdyaWRHYXBQYXJlbnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2Rpc3BsYXknOiBwYXJlbnQuaW5saW5lID8gJ2lubGluZS1ncmlkJyA6ICdncmlkJyxcbiAgICAgICdncmlkLWdhcCc6IGlucHV0IHx8IERFRkFVTFRfVkFMVUVcbiAgICB9O1xuICB9XG59XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGNsYXNzIEdyaWRHYXBEaXJlY3RpdmUgZXh0ZW5kcyBCYXNlRGlyZWN0aXZlMiB7XG4gIHByb3RlY3RlZCBvdmVycmlkZSBESVJFQ1RJVkVfS0VZID0gJ2dyaWQtZ2FwJztcblxuICBASW5wdXQoJ2dkSW5saW5lJylcbiAgZ2V0IGlubGluZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2lubGluZTsgfVxuICBzZXQgaW5saW5lKHZhbDogYm9vbGVhbikgeyB0aGlzLl9pbmxpbmUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsKTsgfVxuICBwcm90ZWN0ZWQgX2lubGluZSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKGVsUmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBzdHlsZVV0aWxzOiBTdHlsZVV0aWxzLFxuICAgICAgICAgICAgICBzdHlsZUJ1aWxkZXI6IEdyaWRHYXBTdHlsZUJ1aWxkZXIsXG4gICAgICAgICAgICAgIG1hcnNoYWw6IE1lZGlhTWFyc2hhbGxlcikge1xuICAgIHN1cGVyKGVsUmVmLCBzdHlsZUJ1aWxkZXIsIHN0eWxlVXRpbHMsIG1hcnNoYWwpO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIC8vIFByb3RlY3RlZCBtZXRob2RzXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG4gIHByb3RlY3RlZCBvdmVycmlkZSB1cGRhdGVXaXRoVmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuc3R5bGVDYWNoZSA9IHRoaXMuaW5saW5lID8gZ2FwSW5saW5lQ2FjaGUgOiBnYXBDYWNoZTtcbiAgICB0aGlzLmFkZFN0eWxlcyh2YWx1ZSwge2lubGluZTogdGhpcy5pbmxpbmV9KTtcbiAgfVxufVxuXG5jb25zdCBnYXBDYWNoZTogTWFwPHN0cmluZywgU3R5bGVEZWZpbml0aW9uPiA9IG5ldyBNYXAoKTtcbmNvbnN0IGdhcElubGluZUNhY2hlOiBNYXA8c3RyaW5nLCBTdHlsZURlZmluaXRpb24+ID0gbmV3IE1hcCgpO1xuXG5jb25zdCBpbnB1dHMgPSBbXG4gICdnZEdhcCcsXG4gICdnZEdhcC54cycsICdnZEdhcC5zbScsICdnZEdhcC5tZCcsICdnZEdhcC5sZycsICdnZEdhcC54bCcsXG4gICdnZEdhcC5sdC1zbScsICdnZEdhcC5sdC1tZCcsICdnZEdhcC5sdC1sZycsICdnZEdhcC5sdC14bCcsXG4gICdnZEdhcC5ndC14cycsICdnZEdhcC5ndC1zbScsICdnZEdhcC5ndC1tZCcsICdnZEdhcC5ndC1sZydcbl07XG5cbmNvbnN0IHNlbGVjdG9yID0gYFxuICBbZ2RHYXBdLFxuICBbZ2RHYXAueHNdLCBbZ2RHYXAuc21dLCBbZ2RHYXAubWRdLCBbZ2RHYXAubGddLCBbZ2RHYXAueGxdLFxuICBbZ2RHYXAubHQtc21dLCBbZ2RHYXAubHQtbWRdLCBbZ2RHYXAubHQtbGddLCBbZ2RHYXAubHQteGxdLFxuICBbZ2RHYXAuZ3QteHNdLCBbZ2RHYXAuZ3Qtc21dLCBbZ2RHYXAuZ3QtbWRdLCBbZ2RHYXAuZ3QtbGddXG5gO1xuXG4vKipcbiAqICdncmlkLWdhcCcgQ1NTIEdyaWQgc3R5bGluZyBkaXJlY3RpdmVcbiAqIENvbmZpZ3VyZXMgdGhlIGdhcCBiZXR3ZWVuIGl0ZW1zIGluIHRoZSBncmlkXG4gKiBTeW50YXg6IDxyb3cgZ2FwPiBbPGNvbHVtbi1nYXA+XVxuICogQHNlZSBodHRwczovL2Nzcy10cmlja3MuY29tL3NuaXBwZXRzL2Nzcy9jb21wbGV0ZS1ndWlkZS1ncmlkLyNhcnRpY2xlLWhlYWRlci1pZC0xN1xuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvciwgaW5wdXRzfSlcbmV4cG9ydCBjbGFzcyBEZWZhdWx0R3JpZEdhcERpcmVjdGl2ZSBleHRlbmRzIEdyaWRHYXBEaXJlY3RpdmUge1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgaW5wdXRzID0gaW5wdXRzO1xufVxuIl19