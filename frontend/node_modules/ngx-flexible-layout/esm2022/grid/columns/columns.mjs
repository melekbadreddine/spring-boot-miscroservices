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
export class GridColumnsStyleBuilder extends StyleBuilder {
    buildStyles(input, parent) {
        input = input || DEFAULT_VALUE;
        let auto = false;
        if (input.endsWith(AUTO_SPECIFIER)) {
            input = input.substring(0, input.indexOf(AUTO_SPECIFIER));
            auto = true;
        }
        const css = {
            'display': parent.inline ? 'inline-grid' : 'grid',
            'grid-auto-columns': '',
            'grid-template-columns': '',
        };
        const key = (auto ? 'grid-auto-columns' : 'grid-template-columns');
        css[key] = input;
        return css;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: GridColumnsStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: GridColumnsStyleBuilder, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: GridColumnsStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
export class GridColumnsDirective extends BaseDirective2 {
    DIRECTIVE_KEY = 'grid-columns';
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
        this.styleCache = this.inline ? columnsInlineCache : columnsCache;
        this.addStyles(value, { inline: this.inline });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: GridColumnsDirective, deps: [{ token: i0.ElementRef }, { token: GridColumnsStyleBuilder }, { token: i1.StyleUtils }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0", type: GridColumnsDirective, inputs: { inline: ["gdInline", "inline"] }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: GridColumnsDirective, decorators: [{
            type: Directive
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: GridColumnsStyleBuilder }, { type: i1.StyleUtils }, { type: i1.MediaMarshaller }], propDecorators: { inline: [{
                type: Input,
                args: ['gdInline']
            }] } });
const columnsCache = new Map();
const columnsInlineCache = new Map();
const inputs = [
    'gdColumns',
    'gdColumns.xs', 'gdColumns.sm', 'gdColumns.md', 'gdColumns.lg', 'gdColumns.xl',
    'gdColumns.lt-sm', 'gdColumns.lt-md', 'gdColumns.lt-lg', 'gdColumns.lt-xl',
    'gdColumns.gt-xs', 'gdColumns.gt-sm', 'gdColumns.gt-md', 'gdColumns.gt-lg'
];
const selector = `
  [gdColumns],
  [gdColumns.xs], [gdColumns.sm], [gdColumns.md], [gdColumns.lg], [gdColumns.xl],
  [gdColumns.lt-sm], [gdColumns.lt-md], [gdColumns.lt-lg], [gdColumns.lt-xl],
  [gdColumns.gt-xs], [gdColumns.gt-sm], [gdColumns.gt-md], [gdColumns.gt-lg]
`;
/**
 * 'grid-template-columns' CSS Grid styling directive
 * Configures the sizing for the columns in the grid
 * Syntax: <column value> [auto]
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-13
 */
export class DefaultGridColumnsDirective extends GridColumnsDirective {
    inputs = inputs;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: DefaultGridColumnsDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0", type: DefaultGridColumnsDirective, selector: "\n  [gdColumns],\n  [gdColumns.xs], [gdColumns.sm], [gdColumns.md], [gdColumns.lg], [gdColumns.xl],\n  [gdColumns.lt-sm], [gdColumns.lt-md], [gdColumns.lt-lg], [gdColumns.lt-xl],\n  [gdColumns.gt-xs], [gdColumns.gt-sm], [gdColumns.gt-md], [gdColumns.gt-lg]\n", inputs: { gdColumns: "gdColumns", "gdColumns.xs": "gdColumns.xs", "gdColumns.sm": "gdColumns.sm", "gdColumns.md": "gdColumns.md", "gdColumns.lg": "gdColumns.lg", "gdColumns.xl": "gdColumns.xl", "gdColumns.lt-sm": "gdColumns.lt-sm", "gdColumns.lt-md": "gdColumns.lt-md", "gdColumns.lt-lg": "gdColumns.lt-lg", "gdColumns.lt-xl": "gdColumns.lt-xl", "gdColumns.gt-xs": "gdColumns.gt-xs", "gdColumns.gt-sm": "gdColumns.gt-sm", "gdColumns.gt-md": "gdColumns.gt-md", "gdColumns.gt-lg": "gdColumns.gt-lg" }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: DefaultGridColumnsDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpYnMvZmxleC1sYXlvdXQvZ3JpZC9jb2x1bW5zL2NvbHVtbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFNBQVMsRUFBYyxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFDSCxjQUFjLEVBQW1CLFlBQVksRUFHaEQsTUFBTSwwQkFBMEIsQ0FBQzs7O0FBRWxDLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQztBQUM3QixNQUFNLGNBQWMsR0FBRyxHQUFHLENBQUM7QUFPM0IsTUFBTSxPQUFPLHVCQUF3QixTQUFRLFlBQVk7SUFDdkQsV0FBVyxDQUFDLEtBQWEsRUFBRSxNQUF5QjtRQUNsRCxLQUFLLEdBQUcsS0FBSyxJQUFJLGFBQWEsQ0FBQztRQUMvQixJQUFJLElBQUksR0FBRyxLQUFLLENBQUM7UUFDakIsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUM7WUFDbkMsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUMxRCxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUVELE1BQU0sR0FBRyxHQUFHO1lBQ1YsU0FBUyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsTUFBTTtZQUNqRCxtQkFBbUIsRUFBRSxFQUFFO1lBQ3ZCLHVCQUF1QixFQUFFLEVBQUU7U0FDNUIsQ0FBQztRQUNGLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUNuRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBRWpCLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQzt1R0FsQlUsdUJBQXVCOzJHQUF2Qix1QkFBdUIsY0FEWCxNQUFNOzsyRkFDbEIsdUJBQXVCO2tCQURuQyxVQUFVO21CQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7QUF1QmhDLE1BQU0sT0FBTyxvQkFBcUIsU0FBUSxjQUFjO0lBQ25DLGFBQWEsR0FBRyxjQUFjLENBQUM7SUFFbEQsSUFDSSxNQUFNLEtBQWMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUM5QyxJQUFJLE1BQU0sQ0FBQyxHQUFZLElBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0QsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUUxQixZQUFZLFVBQXNCLEVBQ3RCLFlBQXFDLEVBQ3JDLE1BQWtCLEVBQ2xCLE9BQXdCO1FBQ2xDLEtBQUssQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUQsZ0RBQWdEO0lBQ2hELG9CQUFvQjtJQUNwQixnREFBZ0Q7SUFFN0IsZUFBZSxDQUFDLEtBQWE7UUFDOUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO1FBQ2xFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7dUdBdkJVLG9CQUFvQjsyRkFBcEIsb0JBQW9COzsyRkFBcEIsb0JBQW9CO2tCQURoQyxTQUFTO3lLQUtKLE1BQU07c0JBRFQsS0FBSzt1QkFBQyxVQUFVOztBQXVCbkIsTUFBTSxZQUFZLEdBQWlDLElBQUksR0FBRyxFQUFFLENBQUM7QUFDN0QsTUFBTSxrQkFBa0IsR0FBaUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUVuRSxNQUFNLE1BQU0sR0FBRztJQUNiLFdBQVc7SUFDWCxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztJQUM5RSxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUI7SUFDMUUsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCO0NBQzNFLENBQUM7QUFFRixNQUFNLFFBQVEsR0FBRzs7Ozs7Q0FLaEIsQ0FBQztBQUVGOzs7OztHQUtHO0FBRUgsTUFBTSxPQUFPLDJCQUE0QixTQUFRLG9CQUFvQjtJQUNoRCxNQUFNLEdBQUcsTUFBTSxDQUFDO3VHQUR4QiwyQkFBMkI7MkZBQTNCLDJCQUEyQjs7MkZBQTNCLDJCQUEyQjtrQkFEdkMsU0FBUzttQkFBQyxFQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEluamVjdGFibGUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIEJhc2VEaXJlY3RpdmUyLCBNZWRpYU1hcnNoYWxsZXIsIFN0eWxlQnVpbGRlcixcbiAgICBTdHlsZURlZmluaXRpb24sXG4gICAgU3R5bGVVdGlsc1xufSBmcm9tICduZ3gtZmxleGlibGUtbGF5b3V0L2NvcmUnO1xuXG5jb25zdCBERUZBVUxUX1ZBTFVFID0gJ25vbmUnO1xuY29uc3QgQVVUT19TUEVDSUZJRVIgPSAnISc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgR3JpZENvbHVtbnNQYXJlbnQge1xuICBpbmxpbmU6IGJvb2xlYW47XG59XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIEdyaWRDb2x1bW5zU3R5bGVCdWlsZGVyIGV4dGVuZHMgU3R5bGVCdWlsZGVyIHtcbiAgYnVpbGRTdHlsZXMoaW5wdXQ6IHN0cmluZywgcGFyZW50OiBHcmlkQ29sdW1uc1BhcmVudCkge1xuICAgIGlucHV0ID0gaW5wdXQgfHwgREVGQVVMVF9WQUxVRTtcbiAgICBsZXQgYXV0byA9IGZhbHNlO1xuICAgIGlmIChpbnB1dC5lbmRzV2l0aChBVVRPX1NQRUNJRklFUikpIHtcbiAgICAgIGlucHV0ID0gaW5wdXQuc3Vic3RyaW5nKDAsIGlucHV0LmluZGV4T2YoQVVUT19TUEVDSUZJRVIpKTtcbiAgICAgIGF1dG8gPSB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IGNzcyA9IHtcbiAgICAgICdkaXNwbGF5JzogcGFyZW50LmlubGluZSA/ICdpbmxpbmUtZ3JpZCcgOiAnZ3JpZCcsXG4gICAgICAnZ3JpZC1hdXRvLWNvbHVtbnMnOiAnJyxcbiAgICAgICdncmlkLXRlbXBsYXRlLWNvbHVtbnMnOiAnJyxcbiAgICB9O1xuICAgIGNvbnN0IGtleSA9IChhdXRvID8gJ2dyaWQtYXV0by1jb2x1bW5zJyA6ICdncmlkLXRlbXBsYXRlLWNvbHVtbnMnKTtcbiAgICBjc3Nba2V5XSA9IGlucHV0O1xuXG4gICAgcmV0dXJuIGNzcztcbiAgfVxufVxuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBHcmlkQ29sdW1uc0RpcmVjdGl2ZSBleHRlbmRzIEJhc2VEaXJlY3RpdmUyIHtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIERJUkVDVElWRV9LRVkgPSAnZ3JpZC1jb2x1bW5zJztcblxuICBASW5wdXQoJ2dkSW5saW5lJylcbiAgZ2V0IGlubGluZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2lubGluZTsgfVxuICBzZXQgaW5saW5lKHZhbDogYm9vbGVhbikgeyB0aGlzLl9pbmxpbmUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsKTsgfVxuICBwcm90ZWN0ZWQgX2lubGluZSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIHN0eWxlQnVpbGRlcjogR3JpZENvbHVtbnNTdHlsZUJ1aWxkZXIsXG4gICAgICAgICAgICAgIHN0eWxlcjogU3R5bGVVdGlscyxcbiAgICAgICAgICAgICAgbWFyc2hhbDogTWVkaWFNYXJzaGFsbGVyKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZiwgc3R5bGVCdWlsZGVyLCBzdHlsZXIsIG1hcnNoYWwpO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIC8vIFByb3RlY3RlZCBtZXRob2RzXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG4gIHByb3RlY3RlZCBvdmVycmlkZSB1cGRhdGVXaXRoVmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuc3R5bGVDYWNoZSA9IHRoaXMuaW5saW5lID8gY29sdW1uc0lubGluZUNhY2hlIDogY29sdW1uc0NhY2hlO1xuICAgIHRoaXMuYWRkU3R5bGVzKHZhbHVlLCB7aW5saW5lOiB0aGlzLmlubGluZX0pO1xuICB9XG59XG5cbmNvbnN0IGNvbHVtbnNDYWNoZTogTWFwPHN0cmluZywgU3R5bGVEZWZpbml0aW9uPiA9IG5ldyBNYXAoKTtcbmNvbnN0IGNvbHVtbnNJbmxpbmVDYWNoZTogTWFwPHN0cmluZywgU3R5bGVEZWZpbml0aW9uPiA9IG5ldyBNYXAoKTtcblxuY29uc3QgaW5wdXRzID0gW1xuICAnZ2RDb2x1bW5zJyxcbiAgJ2dkQ29sdW1ucy54cycsICdnZENvbHVtbnMuc20nLCAnZ2RDb2x1bW5zLm1kJywgJ2dkQ29sdW1ucy5sZycsICdnZENvbHVtbnMueGwnLFxuICAnZ2RDb2x1bW5zLmx0LXNtJywgJ2dkQ29sdW1ucy5sdC1tZCcsICdnZENvbHVtbnMubHQtbGcnLCAnZ2RDb2x1bW5zLmx0LXhsJyxcbiAgJ2dkQ29sdW1ucy5ndC14cycsICdnZENvbHVtbnMuZ3Qtc20nLCAnZ2RDb2x1bW5zLmd0LW1kJywgJ2dkQ29sdW1ucy5ndC1sZydcbl07XG5cbmNvbnN0IHNlbGVjdG9yID0gYFxuICBbZ2RDb2x1bW5zXSxcbiAgW2dkQ29sdW1ucy54c10sIFtnZENvbHVtbnMuc21dLCBbZ2RDb2x1bW5zLm1kXSwgW2dkQ29sdW1ucy5sZ10sIFtnZENvbHVtbnMueGxdLFxuICBbZ2RDb2x1bW5zLmx0LXNtXSwgW2dkQ29sdW1ucy5sdC1tZF0sIFtnZENvbHVtbnMubHQtbGddLCBbZ2RDb2x1bW5zLmx0LXhsXSxcbiAgW2dkQ29sdW1ucy5ndC14c10sIFtnZENvbHVtbnMuZ3Qtc21dLCBbZ2RDb2x1bW5zLmd0LW1kXSwgW2dkQ29sdW1ucy5ndC1sZ11cbmA7XG5cbi8qKlxuICogJ2dyaWQtdGVtcGxhdGUtY29sdW1ucycgQ1NTIEdyaWQgc3R5bGluZyBkaXJlY3RpdmVcbiAqIENvbmZpZ3VyZXMgdGhlIHNpemluZyBmb3IgdGhlIGNvbHVtbnMgaW4gdGhlIGdyaWRcbiAqIFN5bnRheDogPGNvbHVtbiB2YWx1ZT4gW2F1dG9dXG4gKiBAc2VlIGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vc25pcHBldHMvY3NzL2NvbXBsZXRlLWd1aWRlLWdyaWQvI2FydGljbGUtaGVhZGVyLWlkLTEzXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yLCBpbnB1dHN9KVxuZXhwb3J0IGNsYXNzIERlZmF1bHRHcmlkQ29sdW1uc0RpcmVjdGl2ZSBleHRlbmRzIEdyaWRDb2x1bW5zRGlyZWN0aXZlIHtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIGlucHV0cyA9IGlucHV0cztcbn1cbiJdfQ==