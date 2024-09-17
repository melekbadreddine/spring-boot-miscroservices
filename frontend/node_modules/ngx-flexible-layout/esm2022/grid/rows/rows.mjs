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
const AUTO_SPECIFIER = '!';
export class GridRowsStyleBuilder extends StyleBuilder {
    buildStyles(input, parent) {
        input = input || DEFAULT_VALUE;
        let auto = false;
        if (input.endsWith(AUTO_SPECIFIER)) {
            input = input.substring(0, input.indexOf(AUTO_SPECIFIER));
            auto = true;
        }
        const css = {
            'display': parent.inline ? 'inline-grid' : 'grid',
            'grid-auto-rows': '',
            'grid-template-rows': '',
        };
        const key = (auto ? 'grid-auto-rows' : 'grid-template-rows');
        css[key] = input;
        return css;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: GridRowsStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: GridRowsStyleBuilder, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: GridRowsStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
export class GridRowsDirective extends BaseDirective2 {
    DIRECTIVE_KEY = 'grid-rows';
    get inline() { return this._inline; }
    set inline(val) { this._inline = coerceBooleanProperty(val); }
    _inline = false;
    constructor(elementRef, styleBuilder, styler, marshal) {
        super(elementRef, styleBuilder, styler, marshal);
        this.init();
    }
    // *********************************************
    // Protected methods
    // *********************************************
    updateWithValue(value) {
        this.styleCache = this.inline ? rowsInlineCache : rowsCache;
        this.addStyles(value, { inline: this.inline });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: GridRowsDirective, deps: [{ token: i0.ElementRef }, { token: GridRowsStyleBuilder }, { token: i1.StyleUtils }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0", type: GridRowsDirective, inputs: { inline: ["gdInline", "inline"] }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: GridRowsDirective, decorators: [{
            type: Directive
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: GridRowsStyleBuilder }, { type: i1.StyleUtils }, { type: i1.MediaMarshaller }], propDecorators: { inline: [{
                type: Input,
                args: ['gdInline']
            }] } });
const rowsCache = new Map();
const rowsInlineCache = new Map();
const inputs = [
    'gdRows',
    'gdRows.xs', 'gdRows.sm', 'gdRows.md', 'gdRows.lg', 'gdRows.xl',
    'gdRows.lt-sm', 'gdRows.lt-md', 'gdRows.lt-lg', 'gdRows.lt-xl',
    'gdRows.gt-xs', 'gdRows.gt-sm', 'gdRows.gt-md', 'gdRows.gt-lg'
];
const selector = `
  [gdRows],
  [gdRows.xs], [gdRows.sm], [gdRows.md], [gdRows.lg], [gdRows.xl],
  [gdRows.lt-sm], [gdRows.lt-md], [gdRows.lt-lg], [gdRows.lt-xl],
  [gdRows.gt-xs], [gdRows.gt-sm], [gdRows.gt-md], [gdRows.gt-lg]
`;
/**
 * 'grid-template-rows' CSS Grid styling directive
 * Configures the sizing for the rows in the grid
 * Syntax: <column value> [auto]
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-13
 */
export class DefaultGridRowsDirective extends GridRowsDirective {
    inputs = inputs;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: DefaultGridRowsDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0", type: DefaultGridRowsDirective, selector: "\n  [gdRows],\n  [gdRows.xs], [gdRows.sm], [gdRows.md], [gdRows.lg], [gdRows.xl],\n  [gdRows.lt-sm], [gdRows.lt-md], [gdRows.lt-lg], [gdRows.lt-xl],\n  [gdRows.gt-xs], [gdRows.gt-sm], [gdRows.gt-md], [gdRows.gt-lg]\n", inputs: { gdRows: "gdRows", "gdRows.xs": "gdRows.xs", "gdRows.sm": "gdRows.sm", "gdRows.md": "gdRows.md", "gdRows.lg": "gdRows.lg", "gdRows.xl": "gdRows.xl", "gdRows.lt-sm": "gdRows.lt-sm", "gdRows.lt-md": "gdRows.lt-md", "gdRows.lt-lg": "gdRows.lt-lg", "gdRows.lt-xl": "gdRows.lt-xl", "gdRows.gt-xs": "gdRows.gt-xs", "gdRows.gt-sm": "gdRows.gt-sm", "gdRows.gt-md": "gdRows.gt-md", "gdRows.gt-lg": "gdRows.gt-lg" }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: DefaultGridRowsDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpYnMvZmxleC1sYXlvdXQvZ3JpZC9yb3dzL3Jvd3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFNBQVMsRUFBYyxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFDSCxjQUFjLEVBQW1CLFlBQVksRUFHaEQsTUFBTSwwQkFBMEIsQ0FBQzs7O0FBRWxDLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQztBQUM3QixNQUFNLGNBQWMsR0FBRyxHQUFHLENBQUM7QUFPM0IsTUFBTSxPQUFPLG9CQUFxQixTQUFRLFlBQVk7SUFDcEQsV0FBVyxDQUFDLEtBQWEsRUFBRSxNQUFzQjtRQUMvQyxLQUFLLEdBQUcsS0FBSyxJQUFJLGFBQWEsQ0FBQztRQUMvQixJQUFJLElBQUksR0FBRyxLQUFLLENBQUM7UUFDakIsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUM7WUFDbkMsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUMxRCxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUVELE1BQU0sR0FBRyxHQUFHO1lBQ1YsU0FBUyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsTUFBTTtZQUNqRCxnQkFBZ0IsRUFBRSxFQUFFO1lBQ3BCLG9CQUFvQixFQUFFLEVBQUU7U0FDekIsQ0FBQztRQUNGLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUM3RCxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBRWpCLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQzt1R0FsQlUsb0JBQW9COzJHQUFwQixvQkFBb0IsY0FEUixNQUFNOzsyRkFDbEIsb0JBQW9CO2tCQURoQyxVQUFVO21CQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7QUF1QmhDLE1BQU0sT0FBTyxpQkFBa0IsU0FBUSxjQUFjO0lBQ2hDLGFBQWEsR0FBRyxXQUFXLENBQUM7SUFFL0MsSUFDSSxNQUFNLEtBQWMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUM5QyxJQUFJLE1BQU0sQ0FBQyxHQUFZLElBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0QsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUUxQixZQUFZLFVBQXNCLEVBQ3RCLFlBQWtDLEVBQ2xDLE1BQWtCLEVBQ2xCLE9BQXdCO1FBQ2xDLEtBQUssQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUQsZ0RBQWdEO0lBQ2hELG9CQUFvQjtJQUNwQixnREFBZ0Q7SUFFN0IsZUFBZSxDQUFDLEtBQWE7UUFDOUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUM1RCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDO3VHQXZCVSxpQkFBaUI7MkZBQWpCLGlCQUFpQjs7MkZBQWpCLGlCQUFpQjtrQkFEN0IsU0FBUztzS0FLSixNQUFNO3NCQURULEtBQUs7dUJBQUMsVUFBVTs7QUF1Qm5CLE1BQU0sU0FBUyxHQUFpQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQzFELE1BQU0sZUFBZSxHQUFpQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBRWhFLE1BQU0sTUFBTSxHQUFHO0lBQ2IsUUFBUTtJQUNSLFdBQVcsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxXQUFXO0lBQy9ELGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWM7SUFDOUQsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztDQUMvRCxDQUFDO0FBRUYsTUFBTSxRQUFRLEdBQUc7Ozs7O0NBS2hCLENBQUM7QUFFRjs7Ozs7R0FLRztBQUVILE1BQU0sT0FBTyx3QkFBeUIsU0FBUSxpQkFBaUI7SUFDMUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzt1R0FEeEIsd0JBQXdCOzJGQUF4Qix3QkFBd0I7OzJGQUF4Qix3QkFBd0I7a0JBRHBDLFNBQVM7bUJBQUMsRUFBQyxRQUFRLEVBQUUsTUFBTSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3RhYmxlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBCYXNlRGlyZWN0aXZlMiwgTWVkaWFNYXJzaGFsbGVyLCBTdHlsZUJ1aWxkZXIsXG4gICAgU3R5bGVEZWZpbml0aW9uLFxuICAgIFN0eWxlVXRpbHNcbn0gZnJvbSAnbmd4LWZsZXhpYmxlLWxheW91dC9jb3JlJztcblxuY29uc3QgREVGQVVMVF9WQUxVRSA9ICdub25lJztcbmNvbnN0IEFVVE9fU1BFQ0lGSUVSID0gJyEnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdyaWRSb3dzUGFyZW50IHtcbiAgaW5saW5lOiBib29sZWFuO1xufVxuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBHcmlkUm93c1N0eWxlQnVpbGRlciBleHRlbmRzIFN0eWxlQnVpbGRlciB7XG4gIGJ1aWxkU3R5bGVzKGlucHV0OiBzdHJpbmcsIHBhcmVudDogR3JpZFJvd3NQYXJlbnQpIHtcbiAgICBpbnB1dCA9IGlucHV0IHx8IERFRkFVTFRfVkFMVUU7XG4gICAgbGV0IGF1dG8gPSBmYWxzZTtcbiAgICBpZiAoaW5wdXQuZW5kc1dpdGgoQVVUT19TUEVDSUZJRVIpKSB7XG4gICAgICBpbnB1dCA9IGlucHV0LnN1YnN0cmluZygwLCBpbnB1dC5pbmRleE9mKEFVVE9fU1BFQ0lGSUVSKSk7XG4gICAgICBhdXRvID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBjc3MgPSB7XG4gICAgICAnZGlzcGxheSc6IHBhcmVudC5pbmxpbmUgPyAnaW5saW5lLWdyaWQnIDogJ2dyaWQnLFxuICAgICAgJ2dyaWQtYXV0by1yb3dzJzogJycsXG4gICAgICAnZ3JpZC10ZW1wbGF0ZS1yb3dzJzogJycsXG4gICAgfTtcbiAgICBjb25zdCBrZXkgPSAoYXV0byA/ICdncmlkLWF1dG8tcm93cycgOiAnZ3JpZC10ZW1wbGF0ZS1yb3dzJyk7XG4gICAgY3NzW2tleV0gPSBpbnB1dDtcblxuICAgIHJldHVybiBjc3M7XG4gIH1cbn1cblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgR3JpZFJvd3NEaXJlY3RpdmUgZXh0ZW5kcyBCYXNlRGlyZWN0aXZlMiB7XG4gIHByb3RlY3RlZCBvdmVycmlkZSBESVJFQ1RJVkVfS0VZID0gJ2dyaWQtcm93cyc7XG5cbiAgQElucHV0KCdnZElubGluZScpXG4gIGdldCBpbmxpbmUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9pbmxpbmU7IH1cbiAgc2V0IGlubGluZSh2YWw6IGJvb2xlYW4pIHsgdGhpcy5faW5saW5lID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbCk7IH1cbiAgcHJvdGVjdGVkIF9pbmxpbmUgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBzdHlsZUJ1aWxkZXI6IEdyaWRSb3dzU3R5bGVCdWlsZGVyLFxuICAgICAgICAgICAgICBzdHlsZXI6IFN0eWxlVXRpbHMsXG4gICAgICAgICAgICAgIG1hcnNoYWw6IE1lZGlhTWFyc2hhbGxlcikge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYsIHN0eWxlQnVpbGRlciwgc3R5bGVyLCBtYXJzaGFsKTtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAvLyBQcm90ZWN0ZWQgbWV0aG9kc1xuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdXBkYXRlV2l0aFZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnN0eWxlQ2FjaGUgPSB0aGlzLmlubGluZSA/IHJvd3NJbmxpbmVDYWNoZSA6IHJvd3NDYWNoZTtcbiAgICB0aGlzLmFkZFN0eWxlcyh2YWx1ZSwge2lubGluZTogdGhpcy5pbmxpbmV9KTtcbiAgfVxufVxuXG5jb25zdCByb3dzQ2FjaGU6IE1hcDxzdHJpbmcsIFN0eWxlRGVmaW5pdGlvbj4gPSBuZXcgTWFwKCk7XG5jb25zdCByb3dzSW5saW5lQ2FjaGU6IE1hcDxzdHJpbmcsIFN0eWxlRGVmaW5pdGlvbj4gPSBuZXcgTWFwKCk7XG5cbmNvbnN0IGlucHV0cyA9IFtcbiAgJ2dkUm93cycsXG4gICdnZFJvd3MueHMnLCAnZ2RSb3dzLnNtJywgJ2dkUm93cy5tZCcsICdnZFJvd3MubGcnLCAnZ2RSb3dzLnhsJyxcbiAgJ2dkUm93cy5sdC1zbScsICdnZFJvd3MubHQtbWQnLCAnZ2RSb3dzLmx0LWxnJywgJ2dkUm93cy5sdC14bCcsXG4gICdnZFJvd3MuZ3QteHMnLCAnZ2RSb3dzLmd0LXNtJywgJ2dkUm93cy5ndC1tZCcsICdnZFJvd3MuZ3QtbGcnXG5dO1xuXG5jb25zdCBzZWxlY3RvciA9IGBcbiAgW2dkUm93c10sXG4gIFtnZFJvd3MueHNdLCBbZ2RSb3dzLnNtXSwgW2dkUm93cy5tZF0sIFtnZFJvd3MubGddLCBbZ2RSb3dzLnhsXSxcbiAgW2dkUm93cy5sdC1zbV0sIFtnZFJvd3MubHQtbWRdLCBbZ2RSb3dzLmx0LWxnXSwgW2dkUm93cy5sdC14bF0sXG4gIFtnZFJvd3MuZ3QteHNdLCBbZ2RSb3dzLmd0LXNtXSwgW2dkUm93cy5ndC1tZF0sIFtnZFJvd3MuZ3QtbGddXG5gO1xuXG4vKipcbiAqICdncmlkLXRlbXBsYXRlLXJvd3MnIENTUyBHcmlkIHN0eWxpbmcgZGlyZWN0aXZlXG4gKiBDb25maWd1cmVzIHRoZSBzaXppbmcgZm9yIHRoZSByb3dzIGluIHRoZSBncmlkXG4gKiBTeW50YXg6IDxjb2x1bW4gdmFsdWU+IFthdXRvXVxuICogQHNlZSBodHRwczovL2Nzcy10cmlja3MuY29tL3NuaXBwZXRzL2Nzcy9jb21wbGV0ZS1ndWlkZS1ncmlkLyNhcnRpY2xlLWhlYWRlci1pZC0xM1xuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvciwgaW5wdXRzfSlcbmV4cG9ydCBjbGFzcyBEZWZhdWx0R3JpZFJvd3NEaXJlY3RpdmUgZXh0ZW5kcyBHcmlkUm93c0RpcmVjdGl2ZSB7XG4gIHByb3RlY3RlZCBvdmVycmlkZSBpbnB1dHMgPSBpbnB1dHM7XG59XG4iXX0=