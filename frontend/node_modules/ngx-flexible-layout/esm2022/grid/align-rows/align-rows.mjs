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
const DEFAULT_MAIN = 'start';
const DEFAULT_CROSS = 'stretch';
export class GridAlignRowsStyleBuilder extends StyleBuilder {
    buildStyles(input, parent) {
        return buildCss(input || `${DEFAULT_MAIN} ${DEFAULT_CROSS}`, parent.inline);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: GridAlignRowsStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: GridAlignRowsStyleBuilder, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: GridAlignRowsStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
export class GridAlignRowsDirective extends BaseDirective2 {
    DIRECTIVE_KEY = 'grid-align-rows';
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
        this.styleCache = this.inline ? alignRowsInlineCache : alignRowsCache;
        this.addStyles(value, { inline: this.inline });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: GridAlignRowsDirective, deps: [{ token: i0.ElementRef }, { token: GridAlignRowsStyleBuilder }, { token: i1.StyleUtils }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0", type: GridAlignRowsDirective, inputs: { inline: ["gdInline", "inline"] }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: GridAlignRowsDirective, decorators: [{
            type: Directive
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: GridAlignRowsStyleBuilder }, { type: i1.StyleUtils }, { type: i1.MediaMarshaller }], propDecorators: { inline: [{
                type: Input,
                args: ['gdInline']
            }] } });
const alignRowsCache = new Map();
const alignRowsInlineCache = new Map();
const inputs = [
    'gdAlignRows',
    'gdAlignRows.xs', 'gdAlignRows.sm', 'gdAlignRows.md',
    'gdAlignRows.lg', 'gdAlignRows.xl', 'gdAlignRows.lt-sm',
    'gdAlignRows.lt-md', 'gdAlignRows.lt-lg', 'gdAlignRows.lt-xl',
    'gdAlignRows.gt-xs', 'gdAlignRows.gt-sm', 'gdAlignRows.gt-md',
    'gdAlignRows.gt-lg'
];
const selector = `
  [gdAlignRows],
  [gdAlignRows.xs], [gdAlignRows.sm], [gdAlignRows.md],
  [gdAlignRows.lg], [gdAlignRows.xl], [gdAlignRows.lt-sm],
  [gdAlignRows.lt-md], [gdAlignRows.lt-lg], [gdAlignRows.lt-xl],
  [gdAlignRows.gt-xs], [gdAlignRows.gt-sm], [gdAlignRows.gt-md],
  [gdAlignRows.gt-lg]
`;
/**
 * 'row alignment' CSS Grid styling directive
 * Configures the alignment in the row direction
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-18
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-20
 */
export class DefaultGridAlignRowsDirective extends GridAlignRowsDirective {
    inputs = inputs;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: DefaultGridAlignRowsDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0", type: DefaultGridAlignRowsDirective, selector: "\n  [gdAlignRows],\n  [gdAlignRows.xs], [gdAlignRows.sm], [gdAlignRows.md],\n  [gdAlignRows.lg], [gdAlignRows.xl], [gdAlignRows.lt-sm],\n  [gdAlignRows.lt-md], [gdAlignRows.lt-lg], [gdAlignRows.lt-xl],\n  [gdAlignRows.gt-xs], [gdAlignRows.gt-sm], [gdAlignRows.gt-md],\n  [gdAlignRows.gt-lg]\n", inputs: { gdAlignRows: "gdAlignRows", "gdAlignRows.xs": "gdAlignRows.xs", "gdAlignRows.sm": "gdAlignRows.sm", "gdAlignRows.md": "gdAlignRows.md", "gdAlignRows.lg": "gdAlignRows.lg", "gdAlignRows.xl": "gdAlignRows.xl", "gdAlignRows.lt-sm": "gdAlignRows.lt-sm", "gdAlignRows.lt-md": "gdAlignRows.lt-md", "gdAlignRows.lt-lg": "gdAlignRows.lt-lg", "gdAlignRows.lt-xl": "gdAlignRows.lt-xl", "gdAlignRows.gt-xs": "gdAlignRows.gt-xs", "gdAlignRows.gt-sm": "gdAlignRows.gt-sm", "gdAlignRows.gt-md": "gdAlignRows.gt-md", "gdAlignRows.gt-lg": "gdAlignRows.gt-lg" }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: DefaultGridAlignRowsDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
function buildCss(align, inline) {
    const css = {}, [mainAxis, crossAxis] = align.split(' ');
    // Main axis
    switch (mainAxis) {
        case 'center':
        case 'space-around':
        case 'space-between':
        case 'space-evenly':
        case 'end':
        case 'start':
        case 'stretch':
            css['justify-content'] = mainAxis;
            break;
        default:
            css['justify-content'] = DEFAULT_MAIN; // default main axis
            break;
    }
    // Cross-axis
    switch (crossAxis) {
        case 'start':
        case 'center':
        case 'end':
        case 'stretch':
            css['justify-items'] = crossAxis;
            break;
        default: // 'stretch'
            css['justify-items'] = DEFAULT_CROSS; // default cross axis
            break;
    }
    css['display'] = inline ? 'inline-grid' : 'grid';
    return css;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpZ24tcm93cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpYnMvZmxleC1sYXlvdXQvZ3JpZC9hbGlnbi1yb3dzL2FsaWduLXJvd3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFNBQVMsRUFBYyxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFDSCxjQUFjLEVBQW1CLFlBQVksRUFFaEQsTUFBTSwwQkFBMEIsQ0FBQzs7O0FBRWxDLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQztBQUM3QixNQUFNLGFBQWEsR0FBRyxTQUFTLENBQUM7QUFPaEMsTUFBTSxPQUFPLHlCQUEwQixTQUFRLFlBQVk7SUFDekQsV0FBVyxDQUFDLEtBQWEsRUFBRSxNQUEyQjtRQUNwRCxPQUFPLFFBQVEsQ0FBQyxLQUFLLElBQUksR0FBRyxZQUFZLElBQUksYUFBYSxFQUFFLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlFLENBQUM7dUdBSFUseUJBQXlCOzJHQUF6Qix5QkFBeUIsY0FEYixNQUFNOzsyRkFDbEIseUJBQXlCO2tCQURyQyxVQUFVO21CQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7QUFRaEMsTUFBTSxPQUFPLHNCQUF1QixTQUFRLGNBQWM7SUFFckMsYUFBYSxHQUFHLGlCQUFpQixDQUFDO0lBRXJELElBQ0ksTUFBTSxLQUFjLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDOUMsSUFBSSxNQUFNLENBQUMsR0FBWSxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdELE9BQU8sR0FBRyxLQUFLLENBQUM7SUFFMUIsWUFB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XG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEluamVjdGFibGUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIEJhc2VEaXJlY3RpdmUyLCBNZWRpYU1hcnNoYWxsZXIsIFN0eWxlQnVpbGRlcixcbiAgICBTdHlsZURlZmluaXRpb24sIFN0eWxlVXRpbHNcbn0gZnJvbSAnbmd4LWZsZXhpYmxlLWxheW91dC9jb3JlJztcblxuY29uc3QgREVGQVVMVF9NQUlOID0gJ3N0YXJ0JztcbmNvbnN0IERFRkFVTFRfQ1JPU1MgPSAnc3RyZXRjaCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgR3JpZEFsaWduUm93c1BhcmVudCB7XG4gIGlubGluZTogYm9vbGVhbjtcbn1cblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgR3JpZEFsaWduUm93c1N0eWxlQnVpbGRlciBleHRlbmRzIFN0eWxlQnVpbGRlciB7XG4gIGJ1aWxkU3R5bGVzKGlucHV0OiBzdHJpbmcsIHBhcmVudDogR3JpZEFsaWduUm93c1BhcmVudCkge1xuICAgIHJldHVybiBidWlsZENzcyhpbnB1dCB8fCBgJHtERUZBVUxUX01BSU59ICR7REVGQVVMVF9DUk9TU31gLCBwYXJlbnQuaW5saW5lKTtcbiAgfVxufVxuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBHcmlkQWxpZ25Sb3dzRGlyZWN0aXZlIGV4dGVuZHMgQmFzZURpcmVjdGl2ZTIge1xuXG4gIHByb3RlY3RlZCBvdmVycmlkZSBESVJFQ1RJVkVfS0VZID0gJ2dyaWQtYWxpZ24tcm93cyc7XG5cbiAgQElucHV0KCdnZElubGluZScpXG4gIGdldCBpbmxpbmUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9pbmxpbmU7IH1cbiAgc2V0IGlubGluZSh2YWw6IGJvb2xlYW4pIHsgdGhpcy5faW5saW5lID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbCk7IH1cbiAgcHJvdGVjdGVkIF9pbmxpbmUgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBzdHlsZUJ1aWxkZXI6IEdyaWRBbGlnblJvd3NTdHlsZUJ1aWxkZXIsXG4gICAgICAgICAgICAgIHN0eWxlcjogU3R5bGVVdGlscyxcbiAgICAgICAgICAgICAgbWFyc2hhbDogTWVkaWFNYXJzaGFsbGVyKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZiwgc3R5bGVCdWlsZGVyLCBzdHlsZXIsIG1hcnNoYWwpO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIC8vIFByb3RlY3RlZCBtZXRob2RzXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG4gIHByb3RlY3RlZCBvdmVycmlkZSB1cGRhdGVXaXRoVmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuc3R5bGVDYWNoZSA9IHRoaXMuaW5saW5lID8gYWxpZ25Sb3dzSW5saW5lQ2FjaGUgOiBhbGlnblJvd3NDYWNoZTtcbiAgICB0aGlzLmFkZFN0eWxlcyh2YWx1ZSwge2lubGluZTogdGhpcy5pbmxpbmV9KTtcbiAgfVxufVxuXG5jb25zdCBhbGlnblJvd3NDYWNoZTogTWFwPHN0cmluZywgU3R5bGVEZWZpbml0aW9uPiA9IG5ldyBNYXAoKTtcbmNvbnN0IGFsaWduUm93c0lubGluZUNhY2hlOiBNYXA8c3RyaW5nLCBTdHlsZURlZmluaXRpb24+ID0gbmV3IE1hcCgpO1xuXG5jb25zdCBpbnB1dHMgPSBbXG4gICdnZEFsaWduUm93cycsXG4gICdnZEFsaWduUm93cy54cycsICdnZEFsaWduUm93cy5zbScsICdnZEFsaWduUm93cy5tZCcsXG4gICdnZEFsaWduUm93cy5sZycsICdnZEFsaWduUm93cy54bCcsICdnZEFsaWduUm93cy5sdC1zbScsXG4gICdnZEFsaWduUm93cy5sdC1tZCcsICdnZEFsaWduUm93cy5sdC1sZycsICdnZEFsaWduUm93cy5sdC14bCcsXG4gICdnZEFsaWduUm93cy5ndC14cycsICdnZEFsaWduUm93cy5ndC1zbScsICdnZEFsaWduUm93cy5ndC1tZCcsXG4gICdnZEFsaWduUm93cy5ndC1sZydcbl07XG5jb25zdCBzZWxlY3RvciA9IGBcbiAgW2dkQWxpZ25Sb3dzXSxcbiAgW2dkQWxpZ25Sb3dzLnhzXSwgW2dkQWxpZ25Sb3dzLnNtXSwgW2dkQWxpZ25Sb3dzLm1kXSxcbiAgW2dkQWxpZ25Sb3dzLmxnXSwgW2dkQWxpZ25Sb3dzLnhsXSwgW2dkQWxpZ25Sb3dzLmx0LXNtXSxcbiAgW2dkQWxpZ25Sb3dzLmx0LW1kXSwgW2dkQWxpZ25Sb3dzLmx0LWxnXSwgW2dkQWxpZ25Sb3dzLmx0LXhsXSxcbiAgW2dkQWxpZ25Sb3dzLmd0LXhzXSwgW2dkQWxpZ25Sb3dzLmd0LXNtXSwgW2dkQWxpZ25Sb3dzLmd0LW1kXSxcbiAgW2dkQWxpZ25Sb3dzLmd0LWxnXVxuYDtcblxuLyoqXG4gKiAncm93IGFsaWdubWVudCcgQ1NTIEdyaWQgc3R5bGluZyBkaXJlY3RpdmVcbiAqIENvbmZpZ3VyZXMgdGhlIGFsaWdubWVudCBpbiB0aGUgcm93IGRpcmVjdGlvblxuICogQHNlZSBodHRwczovL2Nzcy10cmlja3MuY29tL3NuaXBwZXRzL2Nzcy9jb21wbGV0ZS1ndWlkZS1ncmlkLyNhcnRpY2xlLWhlYWRlci1pZC0xOFxuICogQHNlZSBodHRwczovL2Nzcy10cmlja3MuY29tL3NuaXBwZXRzL2Nzcy9jb21wbGV0ZS1ndWlkZS1ncmlkLyNhcnRpY2xlLWhlYWRlci1pZC0yMFxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvciwgaW5wdXRzfSlcbmV4cG9ydCBjbGFzcyBEZWZhdWx0R3JpZEFsaWduUm93c0RpcmVjdGl2ZSBleHRlbmRzIEdyaWRBbGlnblJvd3NEaXJlY3RpdmUge1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgaW5wdXRzID0gaW5wdXRzO1xufVxuXG5mdW5jdGlvbiBidWlsZENzcyhhbGlnbjogc3RyaW5nLCBpbmxpbmU6IGJvb2xlYW4pOiBTdHlsZURlZmluaXRpb24ge1xuICBjb25zdCBjc3M6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge30sIFttYWluQXhpcywgY3Jvc3NBeGlzXSA9IGFsaWduLnNwbGl0KCcgJyk7XG5cbiAgLy8gTWFpbiBheGlzXG4gIHN3aXRjaCAobWFpbkF4aXMpIHtcbiAgICBjYXNlICdjZW50ZXInOlxuICAgIGNhc2UgJ3NwYWNlLWFyb3VuZCc6XG4gICAgY2FzZSAnc3BhY2UtYmV0d2Vlbic6XG4gICAgY2FzZSAnc3BhY2UtZXZlbmx5JzpcbiAgICBjYXNlICdlbmQnOlxuICAgIGNhc2UgJ3N0YXJ0JzpcbiAgICBjYXNlICdzdHJldGNoJzpcbiAgICAgIGNzc1snanVzdGlmeS1jb250ZW50J10gPSBtYWluQXhpcztcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBjc3NbJ2p1c3RpZnktY29udGVudCddID0gREVGQVVMVF9NQUlOOyAgLy8gZGVmYXVsdCBtYWluIGF4aXNcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgLy8gQ3Jvc3MtYXhpc1xuICBzd2l0Y2ggKGNyb3NzQXhpcykge1xuICAgIGNhc2UgJ3N0YXJ0JzpcbiAgICBjYXNlICdjZW50ZXInOlxuICAgIGNhc2UgJ2VuZCc6XG4gICAgY2FzZSAnc3RyZXRjaCc6XG4gICAgICBjc3NbJ2p1c3RpZnktaXRlbXMnXSA9IGNyb3NzQXhpcztcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQgOiAvLyAnc3RyZXRjaCdcbiAgICAgIGNzc1snanVzdGlmeS1pdGVtcyddID0gREVGQVVMVF9DUk9TUzsgICAvLyBkZWZhdWx0IGNyb3NzIGF4aXNcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgY3NzWydkaXNwbGF5J10gPSBpbmxpbmUgPyAnaW5saW5lLWdyaWQnIDogJ2dyaWQnO1xuXG4gIHJldHVybiBjc3M7XG59XG4iXX0=