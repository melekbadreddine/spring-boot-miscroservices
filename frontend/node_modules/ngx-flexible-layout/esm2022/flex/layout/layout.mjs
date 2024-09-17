/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Inject, Injectable } from '@angular/core';
import { BaseDirective2, LAYOUT_CONFIG, StyleBuilder } from 'ngx-flexible-layout/core';
import { buildLayoutCSS } from 'ngx-flexible-layout/_private-utils';
import * as i0 from "@angular/core";
import * as i1 from "ngx-flexible-layout/core";
export class LayoutStyleBuilder extends StyleBuilder {
    buildStyles(input, { display }) {
        const css = buildLayoutCSS(input);
        return {
            ...css,
            display: display === 'none' ? display : css.display,
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: LayoutStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: LayoutStyleBuilder, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: LayoutStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
const inputs = [
    'fxLayout', 'fxLayout.xs', 'fxLayout.sm', 'fxLayout.md',
    'fxLayout.lg', 'fxLayout.xl', 'fxLayout.lt-sm', 'fxLayout.lt-md',
    'fxLayout.lt-lg', 'fxLayout.lt-xl', 'fxLayout.gt-xs', 'fxLayout.gt-sm',
    'fxLayout.gt-md', 'fxLayout.gt-lg'
];
const selector = `
  [fxLayout], [fxLayout.xs], [fxLayout.sm], [fxLayout.md],
  [fxLayout.lg], [fxLayout.xl], [fxLayout.lt-sm], [fxLayout.lt-md],
  [fxLayout.lt-lg], [fxLayout.lt-xl], [fxLayout.gt-xs], [fxLayout.gt-sm],
  [fxLayout.gt-md], [fxLayout.gt-lg]
`;
/**
 * 'layout' flexbox styling directive
 * Defines the positioning flow direction for the child elements: row or column
 * Optional values: column or row (default)
 * @see https://css-tricks.com/almanac/properties/f/flex-direction/
 *
 */
export class LayoutDirective extends BaseDirective2 {
    _config;
    DIRECTIVE_KEY = 'layout';
    constructor(elRef, styleUtils, styleBuilder, marshal, _config) {
        super(elRef, styleBuilder, styleUtils, marshal);
        this._config = _config;
        this.init();
    }
    updateWithValue(input) {
        const detectLayoutDisplay = this._config.detectLayoutDisplay;
        const display = detectLayoutDisplay ? this.styler.lookupStyle(this.nativeElement, 'display') : '';
        this.styleCache = cacheMap.get(display) ?? new Map();
        cacheMap.set(display, this.styleCache);
        if (this.currentValue !== input) {
            this.addStyles(input, { display });
            this.currentValue = input;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: LayoutDirective, deps: [{ token: i0.ElementRef }, { token: i1.StyleUtils }, { token: LayoutStyleBuilder }, { token: i1.MediaMarshaller }, { token: LAYOUT_CONFIG }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0", type: LayoutDirective, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: LayoutDirective, decorators: [{
            type: Directive
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.StyleUtils }, { type: LayoutStyleBuilder }, { type: i1.MediaMarshaller }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [LAYOUT_CONFIG]
                }] }] });
export class DefaultLayoutDirective extends LayoutDirective {
    inputs = inputs;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: DefaultLayoutDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0", type: DefaultLayoutDirective, selector: "\n  [fxLayout], [fxLayout.xs], [fxLayout.sm], [fxLayout.md],\n  [fxLayout.lg], [fxLayout.xl], [fxLayout.lt-sm], [fxLayout.lt-md],\n  [fxLayout.lt-lg], [fxLayout.lt-xl], [fxLayout.gt-xs], [fxLayout.gt-sm],\n  [fxLayout.gt-md], [fxLayout.gt-lg]\n", inputs: { fxLayout: "fxLayout", "fxLayout.xs": "fxLayout.xs", "fxLayout.sm": "fxLayout.sm", "fxLayout.md": "fxLayout.md", "fxLayout.lg": "fxLayout.lg", "fxLayout.xl": "fxLayout.xl", "fxLayout.lt-sm": "fxLayout.lt-sm", "fxLayout.lt-md": "fxLayout.lt-md", "fxLayout.lt-lg": "fxLayout.lt-lg", "fxLayout.lt-xl": "fxLayout.lt-xl", "fxLayout.gt-xs": "fxLayout.gt-xs", "fxLayout.gt-sm": "fxLayout.gt-sm", "fxLayout.gt-md": "fxLayout.gt-md", "fxLayout.gt-lg": "fxLayout.gt-lg" }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: DefaultLayoutDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
const cacheMap = new Map();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlicy9mbGV4LWxheW91dC9mbGV4L2xheW91dC9sYXlvdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBYyxNQUFNLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFDSCxjQUFjLEVBQXVCLGFBQWEsRUFBbUIsWUFBWSxFQUdwRixNQUFNLDBCQUEwQixDQUFDO0FBRWxDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQzs7O0FBT3BFLE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxZQUFZO0lBQ2xELFdBQVcsQ0FBQyxLQUFhLEVBQUUsRUFBQyxPQUFPLEVBQXFCO1FBQ3RELE1BQU0sR0FBRyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxPQUFPO1lBQ0wsR0FBRyxHQUFHO1lBQ04sT0FBTyxFQUFFLE9BQU8sS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU87U0FDcEQsQ0FBQztJQUNKLENBQUM7dUdBUFUsa0JBQWtCOzJHQUFsQixrQkFBa0IsY0FETixNQUFNOzsyRkFDbEIsa0JBQWtCO2tCQUQ5QixVQUFVO21CQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7QUFXaEMsTUFBTSxNQUFNLEdBQUc7SUFDYixVQUFVLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxhQUFhO0lBQ3ZELGFBQWEsRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCO0lBQ2hFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLGdCQUFnQjtJQUN0RSxnQkFBZ0IsRUFBRSxnQkFBZ0I7Q0FDbkMsQ0FBQztBQUNGLE1BQU0sUUFBUSxHQUFHOzs7OztDQUtoQixDQUFDO0FBRUY7Ozs7OztHQU1HO0FBRUgsTUFBTSxPQUFPLGVBQWdCLFNBQVEsY0FBYztJQVFOO0lBTnhCLGFBQWEsR0FBRyxRQUFRLENBQUM7SUFFNUMsWUFBWSxLQUFpQixFQUNqQixVQUFzQixFQUN0QixZQUFnQyxFQUNoQyxPQUF3QixFQUNPLE9BQTRCO1FBQ3JFLEtBQUssQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQURQLFlBQU8sR0FBUCxPQUFPLENBQXFCO1FBRXJFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFa0IsZUFBZSxDQUFDLEtBQWE7UUFDOUMsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDO1FBQzdELE1BQU0sT0FBTyxHQUFHLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDbEcsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7UUFDckQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXZDLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxLQUFLLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFDLE9BQU8sRUFBQyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDNUIsQ0FBQztJQUNILENBQUM7dUdBdkJVLGVBQWUsb0lBUU4sYUFBYTsyRkFSdEIsZUFBZTs7MkZBQWYsZUFBZTtrQkFEM0IsU0FBUzs7MEJBU0ssTUFBTTsyQkFBQyxhQUFhOztBQW1CbkMsTUFBTSxPQUFPLHNCQUF1QixTQUFRLGVBQWU7SUFDdEMsTUFBTSxHQUFHLE1BQU0sQ0FBQzt1R0FEeEIsc0JBQXNCOzJGQUF0QixzQkFBc0I7OzJGQUF0QixzQkFBc0I7a0JBRGxDLFNBQVM7bUJBQUMsRUFBQyxRQUFRLEVBQUUsTUFBTSxFQUFDOztBQU03QixNQUFNLFFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBb0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3QsIEluamVjdGFibGUsIE9uQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBCYXNlRGlyZWN0aXZlMiwgTGF5b3V0Q29uZmlnT3B0aW9ucywgTEFZT1VUX0NPTkZJRywgTWVkaWFNYXJzaGFsbGVyLCBTdHlsZUJ1aWxkZXIsXG4gICAgU3R5bGVEZWZpbml0aW9uLFxuICAgIFN0eWxlVXRpbHNcbn0gZnJvbSAnbmd4LWZsZXhpYmxlLWxheW91dC9jb3JlJztcblxuaW1wb3J0IHsgYnVpbGRMYXlvdXRDU1MgfSBmcm9tICduZ3gtZmxleGlibGUtbGF5b3V0L19wcml2YXRlLXV0aWxzJztcblxuZXhwb3J0IGludGVyZmFjZSBMYXlvdXRTdHlsZURpc3BsYXkge1xuICByZWFkb25seSBkaXNwbGF5OiBzdHJpbmc7XG59XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIExheW91dFN0eWxlQnVpbGRlciBleHRlbmRzIFN0eWxlQnVpbGRlciB7XG4gIGJ1aWxkU3R5bGVzKGlucHV0OiBzdHJpbmcsIHtkaXNwbGF5fTogTGF5b3V0U3R5bGVEaXNwbGF5KSB7XG4gICAgY29uc3QgY3NzID0gYnVpbGRMYXlvdXRDU1MoaW5wdXQpO1xuICAgIHJldHVybiB7XG4gICAgICAuLi5jc3MsXG4gICAgICBkaXNwbGF5OiBkaXNwbGF5ID09PSAnbm9uZScgPyBkaXNwbGF5IDogY3NzLmRpc3BsYXksXG4gICAgfTtcbiAgfVxufVxuXG5jb25zdCBpbnB1dHMgPSBbXG4gICdmeExheW91dCcsICdmeExheW91dC54cycsICdmeExheW91dC5zbScsICdmeExheW91dC5tZCcsXG4gICdmeExheW91dC5sZycsICdmeExheW91dC54bCcsICdmeExheW91dC5sdC1zbScsICdmeExheW91dC5sdC1tZCcsXG4gICdmeExheW91dC5sdC1sZycsICdmeExheW91dC5sdC14bCcsICdmeExheW91dC5ndC14cycsICdmeExheW91dC5ndC1zbScsXG4gICdmeExheW91dC5ndC1tZCcsICdmeExheW91dC5ndC1sZydcbl07XG5jb25zdCBzZWxlY3RvciA9IGBcbiAgW2Z4TGF5b3V0XSwgW2Z4TGF5b3V0LnhzXSwgW2Z4TGF5b3V0LnNtXSwgW2Z4TGF5b3V0Lm1kXSxcbiAgW2Z4TGF5b3V0LmxnXSwgW2Z4TGF5b3V0LnhsXSwgW2Z4TGF5b3V0Lmx0LXNtXSwgW2Z4TGF5b3V0Lmx0LW1kXSxcbiAgW2Z4TGF5b3V0Lmx0LWxnXSwgW2Z4TGF5b3V0Lmx0LXhsXSwgW2Z4TGF5b3V0Lmd0LXhzXSwgW2Z4TGF5b3V0Lmd0LXNtXSxcbiAgW2Z4TGF5b3V0Lmd0LW1kXSwgW2Z4TGF5b3V0Lmd0LWxnXVxuYDtcblxuLyoqXG4gKiAnbGF5b3V0JyBmbGV4Ym94IHN0eWxpbmcgZGlyZWN0aXZlXG4gKiBEZWZpbmVzIHRoZSBwb3NpdGlvbmluZyBmbG93IGRpcmVjdGlvbiBmb3IgdGhlIGNoaWxkIGVsZW1lbnRzOiByb3cgb3IgY29sdW1uXG4gKiBPcHRpb25hbCB2YWx1ZXM6IGNvbHVtbiBvciByb3cgKGRlZmF1bHQpXG4gKiBAc2VlIGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vYWxtYW5hYy9wcm9wZXJ0aWVzL2YvZmxleC1kaXJlY3Rpb24vXG4gKlxuICovXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBMYXlvdXREaXJlY3RpdmUgZXh0ZW5kcyBCYXNlRGlyZWN0aXZlMiBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIERJUkVDVElWRV9LRVkgPSAnbGF5b3V0JztcblxuICBjb25zdHJ1Y3RvcihlbFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgc3R5bGVVdGlsczogU3R5bGVVdGlscyxcbiAgICAgICAgICAgICAgc3R5bGVCdWlsZGVyOiBMYXlvdXRTdHlsZUJ1aWxkZXIsXG4gICAgICAgICAgICAgIG1hcnNoYWw6IE1lZGlhTWFyc2hhbGxlcixcbiAgICAgICAgICAgICAgQEluamVjdChMQVlPVVRfQ09ORklHKSBwcml2YXRlIF9jb25maWc6IExheW91dENvbmZpZ09wdGlvbnMpIHtcbiAgICBzdXBlcihlbFJlZiwgc3R5bGVCdWlsZGVyLCBzdHlsZVV0aWxzLCBtYXJzaGFsKTtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvdmVycmlkZSB1cGRhdGVXaXRoVmFsdWUoaW5wdXQ6IHN0cmluZykge1xuICAgIGNvbnN0IGRldGVjdExheW91dERpc3BsYXkgPSB0aGlzLl9jb25maWcuZGV0ZWN0TGF5b3V0RGlzcGxheTtcbiAgICBjb25zdCBkaXNwbGF5ID0gZGV0ZWN0TGF5b3V0RGlzcGxheSA/IHRoaXMuc3R5bGVyLmxvb2t1cFN0eWxlKHRoaXMubmF0aXZlRWxlbWVudCwgJ2Rpc3BsYXknKSA6ICcnO1xuICAgIHRoaXMuc3R5bGVDYWNoZSA9IGNhY2hlTWFwLmdldChkaXNwbGF5KSA/PyBuZXcgTWFwKCk7XG4gICAgY2FjaGVNYXAuc2V0KGRpc3BsYXksIHRoaXMuc3R5bGVDYWNoZSk7XG5cbiAgICBpZiAodGhpcy5jdXJyZW50VmFsdWUgIT09IGlucHV0KSB7XG4gICAgICB0aGlzLmFkZFN0eWxlcyhpbnB1dCwge2Rpc3BsYXl9KTtcbiAgICAgIHRoaXMuY3VycmVudFZhbHVlID0gaW5wdXQ7XG4gICAgfVxuICB9XG59XG5cbkBEaXJlY3RpdmUoe3NlbGVjdG9yLCBpbnB1dHN9KVxuZXhwb3J0IGNsYXNzIERlZmF1bHRMYXlvdXREaXJlY3RpdmUgZXh0ZW5kcyBMYXlvdXREaXJlY3RpdmUge1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgaW5wdXRzID0gaW5wdXRzO1xufVxuXG50eXBlIENhY2hlTWFwID0gTWFwPHN0cmluZywgU3R5bGVEZWZpbml0aW9uPjtcbmNvbnN0IGNhY2hlTWFwID0gbmV3IE1hcDxzdHJpbmcsIENhY2hlTWFwPigpO1xuIl19