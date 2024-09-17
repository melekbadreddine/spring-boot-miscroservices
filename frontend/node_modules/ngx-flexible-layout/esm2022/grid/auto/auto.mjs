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
const DEFAULT_VALUE = 'initial';
export class GridAutoStyleBuilder extends StyleBuilder {
    buildStyles(input, parent) {
        let [direction, dense] = (input || DEFAULT_VALUE).split(' ');
        if (direction !== 'column' && direction !== 'row' && direction !== 'dense') {
            direction = 'row';
        }
        dense = (dense === 'dense' && direction !== 'dense') ? ' dense' : '';
        return {
            'display': parent.inline ? 'inline-grid' : 'grid',
            'grid-auto-flow': direction + dense
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: GridAutoStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: GridAutoStyleBuilder, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: GridAutoStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
export class GridAutoDirective extends BaseDirective2 {
    get inline() { return this._inline; }
    set inline(val) { this._inline = coerceBooleanProperty(val); }
    _inline = false;
    DIRECTIVE_KEY = 'grid-auto';
    constructor(elementRef, styleBuilder, styler, marshal) {
        super(elementRef, styleBuilder, styler, marshal);
        this.init();
    }
    // *********************************************
    // Protected methods
    // *********************************************
    updateWithValue(value) {
        this.styleCache = this.inline ? autoInlineCache : autoCache;
        this.addStyles(value, { inline: this.inline });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: GridAutoDirective, deps: [{ token: i0.ElementRef }, { token: GridAutoStyleBuilder }, { token: i1.StyleUtils }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0", type: GridAutoDirective, inputs: { inline: ["gdInline", "inline"] }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: GridAutoDirective, decorators: [{
            type: Directive
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: GridAutoStyleBuilder }, { type: i1.StyleUtils }, { type: i1.MediaMarshaller }], propDecorators: { inline: [{
                type: Input,
                args: ['gdInline']
            }] } });
const autoCache = new Map();
const autoInlineCache = new Map();
const inputs = [
    'gdAuto',
    'gdAuto.xs', 'gdAuto.sm', 'gdAuto.md', 'gdAuto.lg', 'gdAuto.xl',
    'gdAuto.lt-sm', 'gdAuto.lt-md', 'gdAuto.lt-lg', 'gdAuto.lt-xl',
    'gdAuto.gt-xs', 'gdAuto.gt-sm', 'gdAuto.gt-md', 'gdAuto.gt-lg'
];
const selector = `
  [gdAuto],
  [gdAuto.xs], [gdAuto.sm], [gdAuto.md], [gdAuto.lg], [gdAuto.xl],
  [gdAuto.lt-sm], [gdAuto.lt-md], [gdAuto.lt-lg], [gdAuto.lt-xl],
  [gdAuto.gt-xs], [gdAuto.gt-sm], [gdAuto.gt-md], [gdAuto.gt-lg]
`;
/**
 * 'grid-auto-flow' CSS Grid styling directive
 * Configures the auto placement algorithm for the grid
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-23
 */
export class DefaultGridAutoDirective extends GridAutoDirective {
    inputs = inputs;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: DefaultGridAutoDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0", type: DefaultGridAutoDirective, selector: "\n  [gdAuto],\n  [gdAuto.xs], [gdAuto.sm], [gdAuto.md], [gdAuto.lg], [gdAuto.xl],\n  [gdAuto.lt-sm], [gdAuto.lt-md], [gdAuto.lt-lg], [gdAuto.lt-xl],\n  [gdAuto.gt-xs], [gdAuto.gt-sm], [gdAuto.gt-md], [gdAuto.gt-lg]\n", inputs: { gdAuto: "gdAuto", "gdAuto.xs": "gdAuto.xs", "gdAuto.sm": "gdAuto.sm", "gdAuto.md": "gdAuto.md", "gdAuto.lg": "gdAuto.lg", "gdAuto.xl": "gdAuto.xl", "gdAuto.lt-sm": "gdAuto.lt-sm", "gdAuto.lt-md": "gdAuto.lt-md", "gdAuto.lt-lg": "gdAuto.lt-lg", "gdAuto.lt-xl": "gdAuto.lt-xl", "gdAuto.gt-xs": "gdAuto.gt-xs", "gdAuto.gt-sm": "gdAuto.gt-sm", "gdAuto.gt-md": "gdAuto.gt-md", "gdAuto.gt-lg": "gdAuto.gt-lg" }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: DefaultGridAutoDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpYnMvZmxleC1sYXlvdXQvZ3JpZC9hdXRvL2F1dG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFNBQVMsRUFBYyxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFDSCxjQUFjLEVBQW1CLFlBQVksRUFDaEQsTUFBTSwwQkFBMEIsQ0FBQzs7O0FBRWxDLE1BQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQztBQU9oQyxNQUFNLE9BQU8sb0JBQXFCLFNBQVEsWUFBWTtJQUNwRCxXQUFXLENBQUMsS0FBYSxFQUFFLE1BQXNCO1FBQy9DLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksYUFBYSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdELElBQUksU0FBUyxLQUFLLFFBQVEsSUFBSSxTQUFTLEtBQUssS0FBSyxJQUFJLFNBQVMsS0FBSyxPQUFPLEVBQUUsQ0FBQztZQUMzRSxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLENBQUM7UUFFRCxLQUFLLEdBQUcsQ0FBQyxLQUFLLEtBQUssT0FBTyxJQUFJLFNBQVMsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFFckUsT0FBTztZQUNMLFNBQVMsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLE1BQU07WUFDakQsZ0JBQWdCLEVBQUUsU0FBUyxHQUFHLEtBQUs7U0FDcEMsQ0FBQztJQUNKLENBQUM7dUdBYlUsb0JBQW9COzJHQUFwQixvQkFBb0IsY0FEUixNQUFNOzsyRkFDbEIsb0JBQW9CO2tCQURoQyxVQUFVO21CQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7QUFrQmhDLE1BQU0sT0FBTyxpQkFBa0IsU0FBUSxjQUFjO0lBQ25ELElBQ0ksTUFBTSxLQUFjLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDOUMsSUFBSSxNQUFNLENBQUMsR0FBWSxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdELE9BQU8sR0FBRyxLQUFLLENBQUM7SUFFUCxhQUFhLEdBQUcsV0FBVyxDQUFDO0lBRS9DLFlBQVksVUFBc0IsRUFDdEIsWUFBa0MsRUFDbEMsTUFBa0IsRUFDbEIsT0FBd0I7UUFDbEMsS0FBSyxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRCxnREFBZ0Q7SUFDaEQsb0JBQW9CO0lBQ3BCLGdEQUFnRDtJQUU3QixlQUFlLENBQUMsS0FBYTtRQUM5QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQzVELElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7dUdBdkJVLGlCQUFpQjsyRkFBakIsaUJBQWlCOzsyRkFBakIsaUJBQWlCO2tCQUQ3QixTQUFTO3NLQUdKLE1BQU07c0JBRFQsS0FBSzt1QkFBQyxVQUFVOztBQXlCbkIsTUFBTSxTQUFTLEdBQWlDLElBQUksR0FBRyxFQUFFLENBQUM7QUFDMUQsTUFBTSxlQUFlLEdBQWlDLElBQUksR0FBRyxFQUFFLENBQUM7QUFFaEUsTUFBTSxNQUFNLEdBQUc7SUFDYixRQUFRO0lBQ1IsV0FBVyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFdBQVc7SUFDL0QsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYztJQUM5RCxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjO0NBQy9ELENBQUM7QUFDRixNQUFNLFFBQVEsR0FBRzs7Ozs7Q0FLaEIsQ0FBQztBQUVGOzs7O0dBSUc7QUFFSCxNQUFNLE9BQU8sd0JBQXlCLFNBQVEsaUJBQWlCO0lBQzFDLE1BQU0sR0FBRyxNQUFNLENBQUM7dUdBRHhCLHdCQUF3QjsyRkFBeEIsd0JBQXdCOzsyRkFBeEIsd0JBQXdCO2tCQURwQyxTQUFTO21CQUFDLEVBQUMsUUFBUSxFQUFFLE1BQU0sRUFBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5qZWN0YWJsZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQmFzZURpcmVjdGl2ZTIsIE1lZGlhTWFyc2hhbGxlciwgU3R5bGVCdWlsZGVyLCBTdHlsZURlZmluaXRpb24sIFN0eWxlVXRpbHNcbn0gZnJvbSAnbmd4LWZsZXhpYmxlLWxheW91dC9jb3JlJztcblxuY29uc3QgREVGQVVMVF9WQUxVRSA9ICdpbml0aWFsJztcblxuZXhwb3J0IGludGVyZmFjZSBHcmlkQXV0b1BhcmVudCB7XG4gIGlubGluZTogYm9vbGVhbjtcbn1cblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgR3JpZEF1dG9TdHlsZUJ1aWxkZXIgZXh0ZW5kcyBTdHlsZUJ1aWxkZXIge1xuICBidWlsZFN0eWxlcyhpbnB1dDogc3RyaW5nLCBwYXJlbnQ6IEdyaWRBdXRvUGFyZW50KSB7XG4gICAgbGV0IFtkaXJlY3Rpb24sIGRlbnNlXSA9IChpbnB1dCB8fCBERUZBVUxUX1ZBTFVFKS5zcGxpdCgnICcpO1xuICAgIGlmIChkaXJlY3Rpb24gIT09ICdjb2x1bW4nICYmIGRpcmVjdGlvbiAhPT0gJ3JvdycgJiYgZGlyZWN0aW9uICE9PSAnZGVuc2UnKSB7XG4gICAgICBkaXJlY3Rpb24gPSAncm93JztcbiAgICB9XG5cbiAgICBkZW5zZSA9IChkZW5zZSA9PT0gJ2RlbnNlJyAmJiBkaXJlY3Rpb24gIT09ICdkZW5zZScpID8gJyBkZW5zZScgOiAnJztcblxuICAgIHJldHVybiB7XG4gICAgICAnZGlzcGxheSc6IHBhcmVudC5pbmxpbmUgPyAnaW5saW5lLWdyaWQnIDogJ2dyaWQnLFxuICAgICAgJ2dyaWQtYXV0by1mbG93JzogZGlyZWN0aW9uICsgZGVuc2VcbiAgICB9O1xuICB9XG59XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGNsYXNzIEdyaWRBdXRvRGlyZWN0aXZlIGV4dGVuZHMgQmFzZURpcmVjdGl2ZTIge1xuICBASW5wdXQoJ2dkSW5saW5lJylcbiAgZ2V0IGlubGluZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2lubGluZTsgfVxuICBzZXQgaW5saW5lKHZhbDogYm9vbGVhbikgeyB0aGlzLl9pbmxpbmUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsKTsgfVxuICBwcm90ZWN0ZWQgX2lubGluZSA9IGZhbHNlO1xuXG4gIHByb3RlY3RlZCBvdmVycmlkZSBESVJFQ1RJVkVfS0VZID0gJ2dyaWQtYXV0byc7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgc3R5bGVCdWlsZGVyOiBHcmlkQXV0b1N0eWxlQnVpbGRlcixcbiAgICAgICAgICAgICAgc3R5bGVyOiBTdHlsZVV0aWxzLFxuICAgICAgICAgICAgICBtYXJzaGFsOiBNZWRpYU1hcnNoYWxsZXIpIHtcbiAgICBzdXBlcihlbGVtZW50UmVmLCBzdHlsZUJ1aWxkZXIsIHN0eWxlciwgbWFyc2hhbCk7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgLy8gUHJvdGVjdGVkIG1ldGhvZHNcbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIHVwZGF0ZVdpdGhWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5zdHlsZUNhY2hlID0gdGhpcy5pbmxpbmUgPyBhdXRvSW5saW5lQ2FjaGUgOiBhdXRvQ2FjaGU7XG4gICAgdGhpcy5hZGRTdHlsZXModmFsdWUsIHtpbmxpbmU6IHRoaXMuaW5saW5lfSk7XG4gIH1cbn1cblxuY29uc3QgYXV0b0NhY2hlOiBNYXA8c3RyaW5nLCBTdHlsZURlZmluaXRpb24+ID0gbmV3IE1hcCgpO1xuY29uc3QgYXV0b0lubGluZUNhY2hlOiBNYXA8c3RyaW5nLCBTdHlsZURlZmluaXRpb24+ID0gbmV3IE1hcCgpO1xuXG5jb25zdCBpbnB1dHMgPSBbXG4gICdnZEF1dG8nLFxuICAnZ2RBdXRvLnhzJywgJ2dkQXV0by5zbScsICdnZEF1dG8ubWQnLCAnZ2RBdXRvLmxnJywgJ2dkQXV0by54bCcsXG4gICdnZEF1dG8ubHQtc20nLCAnZ2RBdXRvLmx0LW1kJywgJ2dkQXV0by5sdC1sZycsICdnZEF1dG8ubHQteGwnLFxuICAnZ2RBdXRvLmd0LXhzJywgJ2dkQXV0by5ndC1zbScsICdnZEF1dG8uZ3QtbWQnLCAnZ2RBdXRvLmd0LWxnJ1xuXTtcbmNvbnN0IHNlbGVjdG9yID0gYFxuICBbZ2RBdXRvXSxcbiAgW2dkQXV0by54c10sIFtnZEF1dG8uc21dLCBbZ2RBdXRvLm1kXSwgW2dkQXV0by5sZ10sIFtnZEF1dG8ueGxdLFxuICBbZ2RBdXRvLmx0LXNtXSwgW2dkQXV0by5sdC1tZF0sIFtnZEF1dG8ubHQtbGddLCBbZ2RBdXRvLmx0LXhsXSxcbiAgW2dkQXV0by5ndC14c10sIFtnZEF1dG8uZ3Qtc21dLCBbZ2RBdXRvLmd0LW1kXSwgW2dkQXV0by5ndC1sZ11cbmA7XG5cbi8qKlxuICogJ2dyaWQtYXV0by1mbG93JyBDU1MgR3JpZCBzdHlsaW5nIGRpcmVjdGl2ZVxuICogQ29uZmlndXJlcyB0aGUgYXV0byBwbGFjZW1lbnQgYWxnb3JpdGhtIGZvciB0aGUgZ3JpZFxuICogQHNlZSBodHRwczovL2Nzcy10cmlja3MuY29tL3NuaXBwZXRzL2Nzcy9jb21wbGV0ZS1ndWlkZS1ncmlkLyNhcnRpY2xlLWhlYWRlci1pZC0yM1xuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvciwgaW5wdXRzfSlcbmV4cG9ydCBjbGFzcyBEZWZhdWx0R3JpZEF1dG9EaXJlY3RpdmUgZXh0ZW5kcyBHcmlkQXV0b0RpcmVjdGl2ZSB7XG4gIHByb3RlY3RlZCBvdmVycmlkZSBpbnB1dHMgPSBpbnB1dHM7XG59XG4iXX0=