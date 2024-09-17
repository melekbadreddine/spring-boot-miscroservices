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
export class GridAlignColumnsStyleBuilder extends StyleBuilder {
    buildStyles(input, parent) {
        return buildCss(input || `${DEFAULT_MAIN} ${DEFAULT_CROSS}`, parent.inline);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: GridAlignColumnsStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: GridAlignColumnsStyleBuilder, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: GridAlignColumnsStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
export class GridAlignColumnsDirective extends BaseDirective2 {
    DIRECTIVE_KEY = 'grid-align-columns';
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
        this.styleCache = this.inline ? alignColumnsInlineCache : alignColumnsCache;
        this.addStyles(value, { inline: this.inline });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: GridAlignColumnsDirective, deps: [{ token: i0.ElementRef }, { token: GridAlignColumnsStyleBuilder }, { token: i1.StyleUtils }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0", type: GridAlignColumnsDirective, inputs: { inline: ["gdInline", "inline"] }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: GridAlignColumnsDirective, decorators: [{
            type: Directive
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: GridAlignColumnsStyleBuilder }, { type: i1.StyleUtils }, { type: i1.MediaMarshaller }], propDecorators: { inline: [{
                type: Input,
                args: ['gdInline']
            }] } });
const alignColumnsCache = new Map();
const alignColumnsInlineCache = new Map();
const inputs = [
    'gdAlignColumns',
    'gdAlignColumns.xs', 'gdAlignColumns.sm', 'gdAlignColumns.md',
    'gdAlignColumns.lg', 'gdAlignColumns.xl', 'gdAlignColumns.lt-sm',
    'gdAlignColumns.lt-md', 'gdAlignColumns.lt-lg', 'gdAlignColumns.lt-xl',
    'gdAlignColumns.gt-xs', 'gdAlignColumns.gt-sm', 'gdAlignColumns.gt-md',
    'gdAlignColumns.gt-lg'
];
const selector = `
  [gdAlignColumns],
  [gdAlignColumns.xs], [gdAlignColumns.sm], [gdAlignColumns.md],
  [gdAlignColumns.lg], [gdAlignColumns.xl], [gdAlignColumns.lt-sm],
  [gdAlignColumns.lt-md], [gdAlignColumns.lt-lg], [gdAlignColumns.lt-xl],
  [gdAlignColumns.gt-xs], [gdAlignColumns.gt-sm], [gdAlignColumns.gt-md],
  [gdAlignColumns.gt-lg]
`;
/**
 * 'column alignment' CSS Grid styling directive
 * Configures the alignment in the column direction
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-19
 * @see https://css-tricks.com/snippets/css/complete-guide-grid/#article-header-id-21
 */
export class DefaultGridAlignColumnsDirective extends GridAlignColumnsDirective {
    inputs = inputs;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: DefaultGridAlignColumnsDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0", type: DefaultGridAlignColumnsDirective, selector: "\n  [gdAlignColumns],\n  [gdAlignColumns.xs], [gdAlignColumns.sm], [gdAlignColumns.md],\n  [gdAlignColumns.lg], [gdAlignColumns.xl], [gdAlignColumns.lt-sm],\n  [gdAlignColumns.lt-md], [gdAlignColumns.lt-lg], [gdAlignColumns.lt-xl],\n  [gdAlignColumns.gt-xs], [gdAlignColumns.gt-sm], [gdAlignColumns.gt-md],\n  [gdAlignColumns.gt-lg]\n", inputs: { gdAlignColumns: "gdAlignColumns", "gdAlignColumns.xs": "gdAlignColumns.xs", "gdAlignColumns.sm": "gdAlignColumns.sm", "gdAlignColumns.md": "gdAlignColumns.md", "gdAlignColumns.lg": "gdAlignColumns.lg", "gdAlignColumns.xl": "gdAlignColumns.xl", "gdAlignColumns.lt-sm": "gdAlignColumns.lt-sm", "gdAlignColumns.lt-md": "gdAlignColumns.lt-md", "gdAlignColumns.lt-lg": "gdAlignColumns.lt-lg", "gdAlignColumns.lt-xl": "gdAlignColumns.lt-xl", "gdAlignColumns.gt-xs": "gdAlignColumns.gt-xs", "gdAlignColumns.gt-sm": "gdAlignColumns.gt-sm", "gdAlignColumns.gt-md": "gdAlignColumns.gt-md", "gdAlignColumns.gt-lg": "gdAlignColumns.gt-lg" }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: DefaultGridAlignColumnsDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
function buildCss(align, inline) {
    const css = {}, [mainAxis, crossAxis] = align.split(' ');
    // Main axis
    switch (mainAxis) {
        case 'center':
            css['align-content'] = 'center';
            break;
        case 'space-around':
            css['align-content'] = 'space-around';
            break;
        case 'space-between':
            css['align-content'] = 'space-between';
            break;
        case 'space-evenly':
            css['align-content'] = 'space-evenly';
            break;
        case 'end':
            css['align-content'] = 'end';
            break;
        case 'start':
            css['align-content'] = 'start';
            break;
        case 'stretch':
            css['align-content'] = 'stretch';
            break;
        default:
            css['align-content'] = DEFAULT_MAIN; // default main axis
            break;
    }
    // Cross-axis
    switch (crossAxis) {
        case 'start':
            css['align-items'] = 'start';
            break;
        case 'center':
            css['align-items'] = 'center';
            break;
        case 'end':
            css['align-items'] = 'end';
            break;
        case 'stretch':
            css['align-items'] = 'stretch';
            break;
        default: // 'stretch'
            css['align-items'] = DEFAULT_CROSS; // default cross axis
            break;
    }
    css['display'] = inline ? 'inline-grid' : 'grid';
    return css;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpZ24tY29sdW1ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpYnMvZmxleC1sYXlvdXQvZ3JpZC9hbGlnbi1jb2x1bW5zL2FsaWduLWNvbHVtbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFNBQVMsRUFBYyxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFDSCxjQUFjLEVBQW1CLFlBQVksRUFFaEQsTUFBTSwwQkFBMEIsQ0FBQzs7O0FBRWxDLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQztBQUM3QixNQUFNLGFBQWEsR0FBRyxTQUFTLENBQUM7QUFPaEMsTUFBTSxPQUFPLDRCQUE2QixTQUFRLFlBQVk7SUFDNUQsV0FBVyxDQUFDLEtBQWEsRUFBRSxNQUE4QjtRQUN2RCxPQUFPLFFBQVEsQ0FBQyxLQUFLLElBQUksR0FBRyxZQUFZLElBQUksYUFBYSxFQUFFLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlFLENBQUM7dUdBSFUsNEJBQTRCOzJHQUE1Qiw0QkFBNEIsY0FEaEIsTUFBTTs7MkZBQ2xCLDRCQUE0QjtrQkFEeEMsVUFBVTttQkFBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUM7O0FBUWhDLE1BQU0sT0FBTyx5QkFBMEIsU0FBUSxjQUFjO0lBRXhDLGFBQWEsR0FBRyxvQkFBb0IsQ0FBQztJQUV4RCxJQUNJLE1BQU0sS0FBYyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzlDLElBQUksTUFBTSxDQUFDLEdBQVksSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RCxPQUFPLEdBQUcsS0FBSyxDQUFD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QUssUUFBUTtZQUNYLEdBQUcsQ0FBQyxhQUFhLENBQUMsR0FBRyxRQUFRLENBQUM7WUFDOUIsTUFBTTtRQUNSLEtBQUssS0FBSztZQUNSLEdBQUcsQ0FBQyxhQUFhLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDM0IsTUFBTTtRQUNSLEtBQUssU0FBUztZQUNaLEdBQUcsQ0FBQyxhQUFhLENBQUMsR0FBRyxTQUFTLENBQUM7WUFDL0IsTUFBTTtRQUNSLFNBQVUsWUFBWTtZQUNwQixHQUFHLENBQUMsYUFBYSxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUcscUJBQXFCO1lBQzNELE1BQU07SUFDVixDQUFDO0lBRUQsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFFakQsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3RhYmxlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBCYXNlRGlyZWN0aXZlMiwgTWVkaWFNYXJzaGFsbGVyLCBTdHlsZUJ1aWxkZXIsXG4gICAgU3R5bGVEZWZpbml0aW9uLCBTdHlsZVV0aWxzXG59IGZyb20gJ25neC1mbGV4aWJsZS1sYXlvdXQvY29yZSc7XG5cbmNvbnN0IERFRkFVTFRfTUFJTiA9ICdzdGFydCc7XG5jb25zdCBERUZBVUxUX0NST1NTID0gJ3N0cmV0Y2gnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdyaWRBbGlnbkNvbHVtbnNQYXJlbnQge1xuICBpbmxpbmU6IGJvb2xlYW47XG59XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIEdyaWRBbGlnbkNvbHVtbnNTdHlsZUJ1aWxkZXIgZXh0ZW5kcyBTdHlsZUJ1aWxkZXIge1xuICBidWlsZFN0eWxlcyhpbnB1dDogc3RyaW5nLCBwYXJlbnQ6IEdyaWRBbGlnbkNvbHVtbnNQYXJlbnQpIHtcbiAgICByZXR1cm4gYnVpbGRDc3MoaW5wdXQgfHwgYCR7REVGQVVMVF9NQUlOfSAke0RFRkFVTFRfQ1JPU1N9YCwgcGFyZW50LmlubGluZSk7XG4gIH1cbn1cblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgR3JpZEFsaWduQ29sdW1uc0RpcmVjdGl2ZSBleHRlbmRzIEJhc2VEaXJlY3RpdmUyIHtcblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgRElSRUNUSVZFX0tFWSA9ICdncmlkLWFsaWduLWNvbHVtbnMnO1xuXG4gIEBJbnB1dCgnZ2RJbmxpbmUnKVxuICBnZXQgaW5saW5lKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faW5saW5lOyB9XG4gIHNldCBpbmxpbmUodmFsOiBib29sZWFuKSB7IHRoaXMuX2lubGluZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWwpOyB9XG4gIHByb3RlY3RlZCBfaW5saW5lID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgc3R5bGVCdWlsZGVyOiBHcmlkQWxpZ25Db2x1bW5zU3R5bGVCdWlsZGVyLFxuICAgICAgICAgICAgICBzdHlsZXI6IFN0eWxlVXRpbHMsXG4gICAgICAgICAgICAgIG1hcnNoYWw6IE1lZGlhTWFyc2hhbGxlcikge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYsIHN0eWxlQnVpbGRlciwgc3R5bGVyLCBtYXJzaGFsKTtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAvLyBQcm90ZWN0ZWQgbWV0aG9kc1xuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdXBkYXRlV2l0aFZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnN0eWxlQ2FjaGUgPSB0aGlzLmlubGluZSA/IGFsaWduQ29sdW1uc0lubGluZUNhY2hlIDogYWxpZ25Db2x1bW5zQ2FjaGU7XG4gICAgdGhpcy5hZGRTdHlsZXModmFsdWUsIHtpbmxpbmU6IHRoaXMuaW5saW5lfSk7XG4gIH1cbn1cblxuY29uc3QgYWxpZ25Db2x1bW5zQ2FjaGU6IE1hcDxzdHJpbmcsIFN0eWxlRGVmaW5pdGlvbj4gPSBuZXcgTWFwKCk7XG5jb25zdCBhbGlnbkNvbHVtbnNJbmxpbmVDYWNoZTogTWFwPHN0cmluZywgU3R5bGVEZWZpbml0aW9uPiA9IG5ldyBNYXAoKTtcblxuY29uc3QgaW5wdXRzID0gW1xuICAnZ2RBbGlnbkNvbHVtbnMnLFxuICAnZ2RBbGlnbkNvbHVtbnMueHMnLCAnZ2RBbGlnbkNvbHVtbnMuc20nLCAnZ2RBbGlnbkNvbHVtbnMubWQnLFxuICAnZ2RBbGlnbkNvbHVtbnMubGcnLCAnZ2RBbGlnbkNvbHVtbnMueGwnLCAnZ2RBbGlnbkNvbHVtbnMubHQtc20nLFxuICAnZ2RBbGlnbkNvbHVtbnMubHQtbWQnLCAnZ2RBbGlnbkNvbHVtbnMubHQtbGcnLCAnZ2RBbGlnbkNvbHVtbnMubHQteGwnLFxuICAnZ2RBbGlnbkNvbHVtbnMuZ3QteHMnLCAnZ2RBbGlnbkNvbHVtbnMuZ3Qtc20nLCAnZ2RBbGlnbkNvbHVtbnMuZ3QtbWQnLFxuICAnZ2RBbGlnbkNvbHVtbnMuZ3QtbGcnXG5dO1xuY29uc3Qgc2VsZWN0b3IgPSBgXG4gIFtnZEFsaWduQ29sdW1uc10sXG4gIFtnZEFsaWduQ29sdW1ucy54c10sIFtnZEFsaWduQ29sdW1ucy5zbV0sIFtnZEFsaWduQ29sdW1ucy5tZF0sXG4gIFtnZEFsaWduQ29sdW1ucy5sZ10sIFtnZEFsaWduQ29sdW1ucy54bF0sIFtnZEFsaWduQ29sdW1ucy5sdC1zbV0sXG4gIFtnZEFsaWduQ29sdW1ucy5sdC1tZF0sIFtnZEFsaWduQ29sdW1ucy5sdC1sZ10sIFtnZEFsaWduQ29sdW1ucy5sdC14bF0sXG4gIFtnZEFsaWduQ29sdW1ucy5ndC14c10sIFtnZEFsaWduQ29sdW1ucy5ndC1zbV0sIFtnZEFsaWduQ29sdW1ucy5ndC1tZF0sXG4gIFtnZEFsaWduQ29sdW1ucy5ndC1sZ11cbmA7XG5cbi8qKlxuICogJ2NvbHVtbiBhbGlnbm1lbnQnIENTUyBHcmlkIHN0eWxpbmcgZGlyZWN0aXZlXG4gKiBDb25maWd1cmVzIHRoZSBhbGlnbm1lbnQgaW4gdGhlIGNvbHVtbiBkaXJlY3Rpb25cbiAqIEBzZWUgaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9zbmlwcGV0cy9jc3MvY29tcGxldGUtZ3VpZGUtZ3JpZC8jYXJ0aWNsZS1oZWFkZXItaWQtMTlcbiAqIEBzZWUgaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9zbmlwcGV0cy9jc3MvY29tcGxldGUtZ3VpZGUtZ3JpZC8jYXJ0aWNsZS1oZWFkZXItaWQtMjFcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3IsIGlucHV0c30pXG5leHBvcnQgY2xhc3MgRGVmYXVsdEdyaWRBbGlnbkNvbHVtbnNEaXJlY3RpdmUgZXh0ZW5kcyBHcmlkQWxpZ25Db2x1bW5zRGlyZWN0aXZlIHtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIGlucHV0cyA9IGlucHV0cztcbn1cblxuZnVuY3Rpb24gYnVpbGRDc3MoYWxpZ246IHN0cmluZywgaW5saW5lOiBib29sZWFuKTogU3R5bGVEZWZpbml0aW9uIHtcbiAgY29uc3QgY3NzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHt9LCBbbWFpbkF4aXMsIGNyb3NzQXhpc10gPSBhbGlnbi5zcGxpdCgnICcpO1xuXG4gIC8vIE1haW4gYXhpc1xuICBzd2l0Y2ggKG1haW5BeGlzKSB7XG4gICAgY2FzZSAnY2VudGVyJzpcbiAgICAgIGNzc1snYWxpZ24tY29udGVudCddID0gJ2NlbnRlcic7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdzcGFjZS1hcm91bmQnOlxuICAgICAgY3NzWydhbGlnbi1jb250ZW50J10gPSAnc3BhY2UtYXJvdW5kJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3NwYWNlLWJldHdlZW4nOlxuICAgICAgY3NzWydhbGlnbi1jb250ZW50J10gPSAnc3BhY2UtYmV0d2Vlbic7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdzcGFjZS1ldmVubHknOlxuICAgICAgY3NzWydhbGlnbi1jb250ZW50J10gPSAnc3BhY2UtZXZlbmx5JztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2VuZCc6XG4gICAgICBjc3NbJ2FsaWduLWNvbnRlbnQnXSA9ICdlbmQnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnc3RhcnQnOlxuICAgICAgY3NzWydhbGlnbi1jb250ZW50J10gPSAnc3RhcnQnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnc3RyZXRjaCc6XG4gICAgICBjc3NbJ2FsaWduLWNvbnRlbnQnXSA9ICdzdHJldGNoJztcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBjc3NbJ2FsaWduLWNvbnRlbnQnXSA9IERFRkFVTFRfTUFJTjsgIC8vIGRlZmF1bHQgbWFpbiBheGlzXG4gICAgICBicmVhaztcbiAgfVxuXG4gIC8vIENyb3NzLWF4aXNcbiAgc3dpdGNoIChjcm9zc0F4aXMpIHtcbiAgICBjYXNlICdzdGFydCc6XG4gICAgICBjc3NbJ2FsaWduLWl0ZW1zJ10gPSAnc3RhcnQnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnY2VudGVyJzpcbiAgICAgIGNzc1snYWxpZ24taXRlbXMnXSA9ICdjZW50ZXInO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZW5kJzpcbiAgICAgIGNzc1snYWxpZ24taXRlbXMnXSA9ICdlbmQnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnc3RyZXRjaCc6XG4gICAgICBjc3NbJ2FsaWduLWl0ZW1zJ10gPSAnc3RyZXRjaCc7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0IDogLy8gJ3N0cmV0Y2gnXG4gICAgICBjc3NbJ2FsaWduLWl0ZW1zJ10gPSBERUZBVUxUX0NST1NTOyAgIC8vIGRlZmF1bHQgY3Jvc3MgYXhpc1xuICAgICAgYnJlYWs7XG4gIH1cblxuICBjc3NbJ2Rpc3BsYXknXSA9IGlubGluZSA/ICdpbmxpbmUtZ3JpZCcgOiAnZ3JpZCc7XG5cbiAgcmV0dXJuIGNzcztcbn1cbiJdfQ==