/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Injectable } from '@angular/core';
import { BaseDirective2, StyleBuilder } from 'ngx-flexible-layout/core';
import * as i0 from "@angular/core";
import * as i1 from "ngx-flexible-layout/core";
const FLEX_FILL_CSS = {
    'margin': 0,
    'width': '100%',
    'height': '100%',
    'min-width': '100%',
    'min-height': '100%'
};
export class FlexFillStyleBuilder extends StyleBuilder {
    buildStyles(_input) {
        return FLEX_FILL_CSS;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: FlexFillStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: FlexFillStyleBuilder, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: FlexFillStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
/**
 * 'fxFill' flexbox styling directive
 *  Maximizes width and height of element in a layout container
 *
 *  NOTE: fxFill is NOT responsive API!!
 */
export class FlexFillDirective extends BaseDirective2 {
    constructor(elRef, styleUtils, styleBuilder, marshal) {
        super(elRef, styleBuilder, styleUtils, marshal);
        this.addStyles('');
    }
    styleCache = flexFillCache;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: FlexFillDirective, deps: [{ token: i0.ElementRef }, { token: i1.StyleUtils }, { token: FlexFillStyleBuilder }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0", type: FlexFillDirective, selector: "[fxFill], [fxFlexFill]", usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: FlexFillDirective, decorators: [{
            type: Directive,
            args: [{ selector: `[fxFill], [fxFlexFill]` }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.StyleUtils }, { type: FlexFillStyleBuilder }, { type: i1.MediaMarshaller }] });
const flexFillCache = new Map();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleC1maWxsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlicy9mbGV4LWxheW91dC9mbGV4L2ZsZXgtZmlsbC9mbGV4LWZpbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBYyxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUNILGNBQWMsRUFBbUIsWUFBWSxFQUdoRCxNQUFNLDBCQUEwQixDQUFDOzs7QUFFbEMsTUFBTSxhQUFhLEdBQUc7SUFDcEIsUUFBUSxFQUFFLENBQUM7SUFDWCxPQUFPLEVBQUUsTUFBTTtJQUNmLFFBQVEsRUFBRSxNQUFNO0lBQ2hCLFdBQVcsRUFBRSxNQUFNO0lBQ25CLFlBQVksRUFBRSxNQUFNO0NBQ3JCLENBQUM7QUFHRixNQUFNLE9BQU8sb0JBQXFCLFNBQVEsWUFBWTtJQUNwRCxXQUFXLENBQUMsTUFBYztRQUN4QixPQUFPLGFBQWEsQ0FBQztJQUN2QixDQUFDO3VHQUhVLG9CQUFvQjsyR0FBcEIsb0JBQW9CLGNBRFIsTUFBTTs7MkZBQ2xCLG9CQUFvQjtrQkFEaEMsVUFBVTttQkFBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUM7O0FBT2hDOzs7OztHQUtHO0FBRUgsTUFBTSxPQUFPLGlCQUFrQixTQUFRLGNBQWM7SUFDbkQsWUFBWSxLQUFpQixFQUNqQixVQUFzQixFQUN0QixZQUFrQyxFQUNsQyxPQUF3QjtRQUNsQyxLQUFLLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRWtCLFVBQVUsR0FBRyxhQUFhLENBQUM7dUdBVG5DLGlCQUFpQjsyRkFBakIsaUJBQWlCOzsyRkFBakIsaUJBQWlCO2tCQUQ3QixTQUFTO21CQUFDLEVBQUMsUUFBUSxFQUFFLHdCQUF3QixFQUFDOztBQWEvQyxNQUFNLGFBQWEsR0FBaUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIEJhc2VEaXJlY3RpdmUyLCBNZWRpYU1hcnNoYWxsZXIsIFN0eWxlQnVpbGRlcixcbiAgICBTdHlsZURlZmluaXRpb24sXG4gICAgU3R5bGVVdGlsc1xufSBmcm9tICduZ3gtZmxleGlibGUtbGF5b3V0L2NvcmUnO1xuXG5jb25zdCBGTEVYX0ZJTExfQ1NTID0ge1xuICAnbWFyZ2luJzogMCxcbiAgJ3dpZHRoJzogJzEwMCUnLFxuICAnaGVpZ2h0JzogJzEwMCUnLFxuICAnbWluLXdpZHRoJzogJzEwMCUnLFxuICAnbWluLWhlaWdodCc6ICcxMDAlJ1xufTtcblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgRmxleEZpbGxTdHlsZUJ1aWxkZXIgZXh0ZW5kcyBTdHlsZUJ1aWxkZXIge1xuICBidWlsZFN0eWxlcyhfaW5wdXQ6IHN0cmluZykge1xuICAgIHJldHVybiBGTEVYX0ZJTExfQ1NTO1xuICB9XG59XG5cbi8qKlxuICogJ2Z4RmlsbCcgZmxleGJveCBzdHlsaW5nIGRpcmVjdGl2ZVxuICogIE1heGltaXplcyB3aWR0aCBhbmQgaGVpZ2h0IG9mIGVsZW1lbnQgaW4gYSBsYXlvdXQgY29udGFpbmVyXG4gKlxuICogIE5PVEU6IGZ4RmlsbCBpcyBOT1QgcmVzcG9uc2l2ZSBBUEkhIVxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogYFtmeEZpbGxdLCBbZnhGbGV4RmlsbF1gfSlcbmV4cG9ydCBjbGFzcyBGbGV4RmlsbERpcmVjdGl2ZSBleHRlbmRzIEJhc2VEaXJlY3RpdmUyIHtcbiAgY29uc3RydWN0b3IoZWxSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIHN0eWxlVXRpbHM6IFN0eWxlVXRpbHMsXG4gICAgICAgICAgICAgIHN0eWxlQnVpbGRlcjogRmxleEZpbGxTdHlsZUJ1aWxkZXIsXG4gICAgICAgICAgICAgIG1hcnNoYWw6IE1lZGlhTWFyc2hhbGxlcikge1xuICAgIHN1cGVyKGVsUmVmLCBzdHlsZUJ1aWxkZXIsIHN0eWxlVXRpbHMsIG1hcnNoYWwpO1xuICAgIHRoaXMuYWRkU3R5bGVzKCcnKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvdmVycmlkZSBzdHlsZUNhY2hlID0gZmxleEZpbGxDYWNoZTtcbn1cblxuY29uc3QgZmxleEZpbGxDYWNoZTogTWFwPHN0cmluZywgU3R5bGVEZWZpbml0aW9uPiA9IG5ldyBNYXAoKTtcbiJdfQ==