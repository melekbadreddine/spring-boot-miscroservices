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
const DEFAULT_VALUE = 'none';
const DELIMETER = '|';
export class GridAreasStyleBuiler extends StyleBuilder {
    buildStyles(input, parent) {
        const areas = (input || DEFAULT_VALUE).split(DELIMETER).map(v => `"${v.trim()}"`);
        return {
            'display': parent.inline ? 'inline-grid' : 'grid',
            'grid-template-areas': areas.join(' ')
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: GridAreasStyleBuiler, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: GridAreasStyleBuiler, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: GridAreasStyleBuiler, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
export class GridAreasDirective extends BaseDirective2 {
    DIRECTIVE_KEY = 'grid-areas';
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
        this.styleCache = this.inline ? areasInlineCache : areasCache;
        this.addStyles(value, { inline: this.inline });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: GridAreasDirective, deps: [{ token: i0.ElementRef }, { token: i1.StyleUtils }, { token: GridAreasStyleBuiler }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0", type: GridAreasDirective, inputs: { inline: ["gdInline", "inline"] }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: GridAreasDirective, decorators: [{
            type: Directive
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.StyleUtils }, { type: GridAreasStyleBuiler }, { type: i1.MediaMarshaller }], propDecorators: { inline: [{
                type: Input,
                args: ['gdInline']
            }] } });
const areasCache = new Map();
const areasInlineCache = new Map();
const inputs = [
    'gdAreas',
    'gdAreas.xs', 'gdAreas.sm', 'gdAreas.md', 'gdAreas.lg', 'gdAreas.xl',
    'gdAreas.lt-sm', 'gdAreas.lt-md', 'gdAreas.lt-lg', 'gdAreas.lt-xl',
    'gdAreas.gt-xs', 'gdAreas.gt-sm', 'gdAreas.gt-md', 'gdAreas.gt-lg'
];
const selector = `
  [gdAreas],
  [gdAreas.xs], [gdAreas.sm], [gdAreas.md], [gdAreas.lg], [gdAreas.xl],
  [gdAreas.lt-sm], [gdAreas.lt-md], [gdAreas.lt-lg], [gdAreas.lt-xl],
  [gdAreas.gt-xs], [gdAreas.gt-sm], [gdAreas.gt-md], [gdAreas.gt-lg]
`;
/**
 * 'grid-template-areas' CSS Grid styling directive
 * Configures the names of elements within the grid
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-14
 */
export class DefaultGridAreasDirective extends GridAreasDirective {
    inputs = inputs;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: DefaultGridAreasDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0", type: DefaultGridAreasDirective, selector: "\n  [gdAreas],\n  [gdAreas.xs], [gdAreas.sm], [gdAreas.md], [gdAreas.lg], [gdAreas.xl],\n  [gdAreas.lt-sm], [gdAreas.lt-md], [gdAreas.lt-lg], [gdAreas.lt-xl],\n  [gdAreas.gt-xs], [gdAreas.gt-sm], [gdAreas.gt-md], [gdAreas.gt-lg]\n", inputs: { gdAreas: "gdAreas", "gdAreas.xs": "gdAreas.xs", "gdAreas.sm": "gdAreas.sm", "gdAreas.md": "gdAreas.md", "gdAreas.lg": "gdAreas.lg", "gdAreas.xl": "gdAreas.xl", "gdAreas.lt-sm": "gdAreas.lt-sm", "gdAreas.lt-md": "gdAreas.lt-md", "gdAreas.lt-lg": "gdAreas.lt-lg", "gdAreas.lt-xl": "gdAreas.lt-xl", "gdAreas.gt-xs": "gdAreas.gt-xs", "gdAreas.gt-sm": "gdAreas.gt-sm", "gdAreas.gt-md": "gdAreas.gt-md", "gdAreas.gt-lg": "gdAreas.gt-lg" }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: DefaultGridAreasDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJlYXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWJzL2ZsZXgtbGF5b3V0L2dyaWQvYXJlYXMvYXJlYXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFNBQVMsRUFBYyxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFDSCxjQUFjLEVBQW1CLFlBQVksRUFDaEQsTUFBTSwwQkFBMEIsQ0FBQzs7O0FBRWxDLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQztBQUM3QixNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUM7QUFPdEIsTUFBTSxPQUFPLG9CQUFxQixTQUFRLFlBQVk7SUFDcEQsV0FBVyxDQUFDLEtBQWEsRUFBRSxNQUF1QjtRQUNoRCxNQUFNLEtBQUssR0FBRyxDQUFDLEtBQUssSUFBSSxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRWxGLE9BQU87WUFDTCxTQUFTLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxNQUFNO1lBQ2pELHFCQUFxQixFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1NBQ3ZDLENBQUM7SUFDSixDQUFDO3VHQVJVLG9CQUFvQjsyR0FBcEIsb0JBQW9CLGNBRFIsTUFBTTs7MkZBQ2xCLG9CQUFvQjtrQkFEaEMsVUFBVTttQkFBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUM7O0FBYWhDLE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxjQUFjO0lBRWpDLGFBQWEsR0FBRyxZQUFZLENBQUM7SUFFaEQsSUFDSSxNQUFNLEtBQWMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUM5QyxJQUFJLE1BQU0sQ0FBQyxHQUFZLElBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0QsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUUxQixZQUFZLEtBQWlCLEVBQ2pCLFVBQXNCLEVBQ3RCLFlBQWtDLEVBQ2xDLE9BQXdCO1FBQ2xDLEtBQUssQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUQsZ0RBQWdEO0lBQ2hELG9CQUFvQjtJQUNwQixnREFBZ0Q7SUFFN0IsZUFBZSxDQUFDLEtBQWE7UUFDOUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO1FBQzlELElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7dUdBeEJVLGtCQUFrQjsyRkFBbEIsa0JBQWtCOzsyRkFBbEIsa0JBQWtCO2tCQUQ5QixTQUFTO3NLQU1KLE1BQU07c0JBRFQsS0FBSzt1QkFBQyxVQUFVOztBQXVCbkIsTUFBTSxVQUFVLEdBQWlDLElBQUksR0FBRyxFQUFFLENBQUM7QUFDM0QsTUFBTSxnQkFBZ0IsR0FBaUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUVqRSxNQUFNLE1BQU0sR0FBRztJQUNiLFNBQVM7SUFDVCxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWTtJQUNwRSxlQUFlLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxlQUFlO0lBQ2xFLGVBQWUsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLGVBQWU7Q0FDbkUsQ0FBQztBQUVGLE1BQU0sUUFBUSxHQUFHOzs7OztDQUtoQixDQUFDO0FBRUY7Ozs7R0FJRztBQUVILE1BQU0sT0FBTyx5QkFBMEIsU0FBUSxrQkFBa0I7SUFDNUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzt1R0FEeEIseUJBQXlCOzJGQUF6Qix5QkFBeUI7OzJGQUF6Qix5QkFBeUI7a0JBRHJDLFNBQVM7bUJBQUMsRUFBQyxRQUFRLEVBQUUsTUFBTSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3RhYmxlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBCYXNlRGlyZWN0aXZlMiwgTWVkaWFNYXJzaGFsbGVyLCBTdHlsZUJ1aWxkZXIsIFN0eWxlRGVmaW5pdGlvbiwgU3R5bGVVdGlsc1xufSBmcm9tICduZ3gtZmxleGlibGUtbGF5b3V0L2NvcmUnO1xuXG5jb25zdCBERUZBVUxUX1ZBTFVFID0gJ25vbmUnO1xuY29uc3QgREVMSU1FVEVSID0gJ3wnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdyaWRBcmVhc1BhcmVudCB7XG4gIGlubGluZTogYm9vbGVhbjtcbn1cblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgR3JpZEFyZWFzU3R5bGVCdWlsZXIgZXh0ZW5kcyBTdHlsZUJ1aWxkZXIge1xuICBidWlsZFN0eWxlcyhpbnB1dDogc3RyaW5nLCBwYXJlbnQ6IEdyaWRBcmVhc1BhcmVudCkge1xuICAgIGNvbnN0IGFyZWFzID0gKGlucHV0IHx8IERFRkFVTFRfVkFMVUUpLnNwbGl0KERFTElNRVRFUikubWFwKHYgPT4gYFwiJHt2LnRyaW0oKX1cImApO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICdkaXNwbGF5JzogcGFyZW50LmlubGluZSA/ICdpbmxpbmUtZ3JpZCcgOiAnZ3JpZCcsXG4gICAgICAnZ3JpZC10ZW1wbGF0ZS1hcmVhcyc6IGFyZWFzLmpvaW4oJyAnKVxuICAgIH07XG4gIH1cbn1cblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgR3JpZEFyZWFzRGlyZWN0aXZlIGV4dGVuZHMgQmFzZURpcmVjdGl2ZTIge1xuXG4gIHByb3RlY3RlZCBvdmVycmlkZSBESVJFQ1RJVkVfS0VZID0gJ2dyaWQtYXJlYXMnO1xuXG4gIEBJbnB1dCgnZ2RJbmxpbmUnKVxuICBnZXQgaW5saW5lKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faW5saW5lOyB9XG4gIHNldCBpbmxpbmUodmFsOiBib29sZWFuKSB7IHRoaXMuX2lubGluZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWwpOyB9XG4gIHByb3RlY3RlZCBfaW5saW5lID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoZWxSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIHN0eWxlVXRpbHM6IFN0eWxlVXRpbHMsXG4gICAgICAgICAgICAgIHN0eWxlQnVpbGRlcjogR3JpZEFyZWFzU3R5bGVCdWlsZXIsXG4gICAgICAgICAgICAgIG1hcnNoYWw6IE1lZGlhTWFyc2hhbGxlcikge1xuICAgIHN1cGVyKGVsUmVmLCBzdHlsZUJ1aWxkZXIsIHN0eWxlVXRpbHMsIG1hcnNoYWwpO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIC8vIFByb3RlY3RlZCBtZXRob2RzXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG4gIHByb3RlY3RlZCBvdmVycmlkZSB1cGRhdGVXaXRoVmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuc3R5bGVDYWNoZSA9IHRoaXMuaW5saW5lID8gYXJlYXNJbmxpbmVDYWNoZSA6IGFyZWFzQ2FjaGU7XG4gICAgdGhpcy5hZGRTdHlsZXModmFsdWUsIHtpbmxpbmU6IHRoaXMuaW5saW5lfSk7XG4gIH1cbn1cblxuY29uc3QgYXJlYXNDYWNoZTogTWFwPHN0cmluZywgU3R5bGVEZWZpbml0aW9uPiA9IG5ldyBNYXAoKTtcbmNvbnN0IGFyZWFzSW5saW5lQ2FjaGU6IE1hcDxzdHJpbmcsIFN0eWxlRGVmaW5pdGlvbj4gPSBuZXcgTWFwKCk7XG5cbmNvbnN0IGlucHV0cyA9IFtcbiAgJ2dkQXJlYXMnLFxuICAnZ2RBcmVhcy54cycsICdnZEFyZWFzLnNtJywgJ2dkQXJlYXMubWQnLCAnZ2RBcmVhcy5sZycsICdnZEFyZWFzLnhsJyxcbiAgJ2dkQXJlYXMubHQtc20nLCAnZ2RBcmVhcy5sdC1tZCcsICdnZEFyZWFzLmx0LWxnJywgJ2dkQXJlYXMubHQteGwnLFxuICAnZ2RBcmVhcy5ndC14cycsICdnZEFyZWFzLmd0LXNtJywgJ2dkQXJlYXMuZ3QtbWQnLCAnZ2RBcmVhcy5ndC1sZydcbl07XG5cbmNvbnN0IHNlbGVjdG9yID0gYFxuICBbZ2RBcmVhc10sXG4gIFtnZEFyZWFzLnhzXSwgW2dkQXJlYXMuc21dLCBbZ2RBcmVhcy5tZF0sIFtnZEFyZWFzLmxnXSwgW2dkQXJlYXMueGxdLFxuICBbZ2RBcmVhcy5sdC1zbV0sIFtnZEFyZWFzLmx0LW1kXSwgW2dkQXJlYXMubHQtbGddLCBbZ2RBcmVhcy5sdC14bF0sXG4gIFtnZEFyZWFzLmd0LXhzXSwgW2dkQXJlYXMuZ3Qtc21dLCBbZ2RBcmVhcy5ndC1tZF0sIFtnZEFyZWFzLmd0LWxnXVxuYDtcblxuLyoqXG4gKiAnZ3JpZC10ZW1wbGF0ZS1hcmVhcycgQ1NTIEdyaWQgc3R5bGluZyBkaXJlY3RpdmVcbiAqIENvbmZpZ3VyZXMgdGhlIG5hbWVzIG9mIGVsZW1lbnRzIHdpdGhpbiB0aGUgZ3JpZFxuICogQHNlZSBodHRwczovL2Nzcy10cmlja3MuY29tL3NuaXBwZXRzL2Nzcy9jb21wbGV0ZS1ndWlkZS1ncmlkLyNhcnRpY2xlLWhlYWRlci1pZC0xNFxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvciwgaW5wdXRzfSlcbmV4cG9ydCBjbGFzcyBEZWZhdWx0R3JpZEFyZWFzRGlyZWN0aXZlIGV4dGVuZHMgR3JpZEFyZWFzRGlyZWN0aXZlIHtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIGlucHV0cyA9IGlucHV0cztcbn1cbiJdfQ==