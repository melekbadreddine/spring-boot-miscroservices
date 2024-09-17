/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Injectable } from '@angular/core';
import { BaseDirective2, StyleBuilder } from 'ngx-flexible-layout/core';
import { takeUntil } from 'rxjs/operators';
import { extendObject, isFlowHorizontal, LAYOUT_VALUES } from 'ngx-flexible-layout/_private-utils';
import * as i0 from "@angular/core";
import * as i1 from "ngx-flexible-layout/core";
export class LayoutAlignStyleBuilder extends StyleBuilder {
    buildStyles(align, parent) {
        const css = {}, [mainAxis, crossAxis] = align.split(' ');
        // Main axis
        switch (mainAxis) {
            case 'center':
                css['justify-content'] = 'center';
                break;
            case 'space-around':
                css['justify-content'] = 'space-around';
                break;
            case 'space-between':
                css['justify-content'] = 'space-between';
                break;
            case 'space-evenly':
                css['justify-content'] = 'space-evenly';
                break;
            case 'end':
            case 'flex-end':
                css['justify-content'] = 'flex-end';
                break;
            case 'start':
            case 'flex-start':
            default:
                css['justify-content'] = 'flex-start'; // default main axis
                break;
        }
        // Cross-axis
        switch (crossAxis) {
            case 'start':
            case 'flex-start':
                css['align-items'] = css['align-content'] = 'flex-start';
                break;
            case 'center':
                css['align-items'] = css['align-content'] = 'center';
                break;
            case 'end':
            case 'flex-end':
                css['align-items'] = css['align-content'] = 'flex-end';
                break;
            case 'space-between':
                css['align-content'] = 'space-between';
                css['align-items'] = 'stretch';
                break;
            case 'space-around':
                css['align-content'] = 'space-around';
                css['align-items'] = 'stretch';
                break;
            case 'baseline':
                css['align-content'] = 'stretch';
                css['align-items'] = 'baseline';
                break;
            case 'stretch':
            default: // 'stretch'
                css['align-items'] = css['align-content'] = 'stretch'; // default cross axis
                break;
        }
        return extendObject(css, {
            'display': parent.inline ? 'inline-flex' : 'flex',
            'flex-direction': parent.layout,
            'box-sizing': 'border-box',
            'max-width': crossAxis === 'stretch' ?
                !isFlowHorizontal(parent.layout) ? '100%' : null : null,
            'max-height': crossAxis === 'stretch' ?
                isFlowHorizontal(parent.layout) ? '100%' : null : null,
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: LayoutAlignStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: LayoutAlignStyleBuilder, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: LayoutAlignStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
const inputs = [
    'fxLayoutAlign', 'fxLayoutAlign.xs', 'fxLayoutAlign.sm', 'fxLayoutAlign.md',
    'fxLayoutAlign.lg', 'fxLayoutAlign.xl', 'fxLayoutAlign.lt-sm', 'fxLayoutAlign.lt-md',
    'fxLayoutAlign.lt-lg', 'fxLayoutAlign.lt-xl', 'fxLayoutAlign.gt-xs', 'fxLayoutAlign.gt-sm',
    'fxLayoutAlign.gt-md', 'fxLayoutAlign.gt-lg'
];
const selector = `
  [fxLayoutAlign], [fxLayoutAlign.xs], [fxLayoutAlign.sm], [fxLayoutAlign.md],
  [fxLayoutAlign.lg], [fxLayoutAlign.xl], [fxLayoutAlign.lt-sm], [fxLayoutAlign.lt-md],
  [fxLayoutAlign.lt-lg], [fxLayoutAlign.lt-xl], [fxLayoutAlign.gt-xs], [fxLayoutAlign.gt-sm],
  [fxLayoutAlign.gt-md], [fxLayoutAlign.gt-lg]
`;
/**
 * 'layout-align' flexbox styling directive
 *  Defines positioning of child elements along main and cross axis in a layout container
 *  Optional values: {main-axis} values or {main-axis cross-axis} value pairs
 *
 *  @see https://css-tricks.com/almanac/properties/j/justify-content/
 *  @see https://css-tricks.com/almanac/properties/a/align-items/
 *  @see https://css-tricks.com/almanac/properties/a/align-content/
 */
export class LayoutAlignDirective extends BaseDirective2 {
    DIRECTIVE_KEY = 'layout-align';
    layout = 'row'; // default flex-direction
    inline = false; // default inline value
    constructor(elRef, styleUtils, styleBuilder, marshal) {
        super(elRef, styleBuilder, styleUtils, marshal);
        this.init();
        this.marshal.trackValue(this.nativeElement, 'layout')
            .pipe(takeUntil(this.destroySubject))
            .subscribe(this.onLayoutChange.bind(this));
    }
    // *********************************************
    // Protected methods
    // *********************************************
    /**
     *
     */
    updateWithValue(value) {
        const layout = this.layout || 'row';
        const inline = this.inline;
        if (layout === 'row' && inline) {
            this.styleCache = layoutAlignHorizontalInlineCache;
        }
        else if (layout === 'row' && !inline) {
            this.styleCache = layoutAlignHorizontalCache;
        }
        else if (layout === 'row-reverse' && inline) {
            this.styleCache = layoutAlignHorizontalRevInlineCache;
        }
        else if (layout === 'row-reverse' && !inline) {
            this.styleCache = layoutAlignHorizontalRevCache;
        }
        else if (layout === 'column' && inline) {
            this.styleCache = layoutAlignVerticalInlineCache;
        }
        else if (layout === 'column' && !inline) {
            this.styleCache = layoutAlignVerticalCache;
        }
        else if (layout === 'column-reverse' && inline) {
            this.styleCache = layoutAlignVerticalRevInlineCache;
        }
        else if (layout === 'column-reverse' && !inline) {
            this.styleCache = layoutAlignVerticalRevCache;
        }
        this.addStyles(value, { layout, inline });
    }
    /**
     * Cache the parent container 'flex-direction' and update the 'flex' styles
     */
    onLayoutChange(matcher) {
        const layoutKeys = matcher.value.split(' ');
        this.layout = layoutKeys[0];
        this.inline = matcher.value.includes('inline');
        if (!LAYOUT_VALUES.find(x => x === this.layout)) {
            this.layout = 'row';
        }
        this.triggerUpdate();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: LayoutAlignDirective, deps: [{ token: i0.ElementRef }, { token: i1.StyleUtils }, { token: LayoutAlignStyleBuilder }, { token: i1.MediaMarshaller }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0", type: LayoutAlignDirective, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: LayoutAlignDirective, decorators: [{
            type: Directive
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.StyleUtils }, { type: LayoutAlignStyleBuilder }, { type: i1.MediaMarshaller }] });
export class DefaultLayoutAlignDirective extends LayoutAlignDirective {
    inputs = inputs;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: DefaultLayoutAlignDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0", type: DefaultLayoutAlignDirective, selector: "\n  [fxLayoutAlign], [fxLayoutAlign.xs], [fxLayoutAlign.sm], [fxLayoutAlign.md],\n  [fxLayoutAlign.lg], [fxLayoutAlign.xl], [fxLayoutAlign.lt-sm], [fxLayoutAlign.lt-md],\n  [fxLayoutAlign.lt-lg], [fxLayoutAlign.lt-xl], [fxLayoutAlign.gt-xs], [fxLayoutAlign.gt-sm],\n  [fxLayoutAlign.gt-md], [fxLayoutAlign.gt-lg]\n", inputs: { fxLayoutAlign: "fxLayoutAlign", "fxLayoutAlign.xs": "fxLayoutAlign.xs", "fxLayoutAlign.sm": "fxLayoutAlign.sm", "fxLayoutAlign.md": "fxLayoutAlign.md", "fxLayoutAlign.lg": "fxLayoutAlign.lg", "fxLayoutAlign.xl": "fxLayoutAlign.xl", "fxLayoutAlign.lt-sm": "fxLayoutAlign.lt-sm", "fxLayoutAlign.lt-md": "fxLayoutAlign.lt-md", "fxLayoutAlign.lt-lg": "fxLayoutAlign.lt-lg", "fxLayoutAlign.lt-xl": "fxLayoutAlign.lt-xl", "fxLayoutAlign.gt-xs": "fxLayoutAlign.gt-xs", "fxLayoutAlign.gt-sm": "fxLayoutAlign.gt-sm", "fxLayoutAlign.gt-md": "fxLayoutAlign.gt-md", "fxLayoutAlign.gt-lg": "fxLayoutAlign.gt-lg" }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: DefaultLayoutAlignDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
const layoutAlignHorizontalCache = new Map();
const layoutAlignVerticalCache = new Map();
const layoutAlignHorizontalRevCache = new Map();
const layoutAlignVerticalRevCache = new Map();
const layoutAlignHorizontalInlineCache = new Map();
const layoutAlignVerticalInlineCache = new Map();
const layoutAlignHorizontalRevInlineCache = new Map();
const layoutAlignVerticalRevInlineCache = new Map();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LWFsaWduLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlicy9mbGV4LWxheW91dC9mbGV4L2xheW91dC1hbGlnbi9sYXlvdXQtYWxpZ24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBYyxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUNILGNBQWMsRUFBbUMsWUFBWSxFQUdoRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOzs7QUFRbkcsTUFBTSxPQUFPLHVCQUF3QixTQUFRLFlBQVk7SUFDdkQsV0FBVyxDQUFDLEtBQWEsRUFBRSxNQUF5QjtRQUNsRCxNQUFNLEdBQUcsR0FBb0IsRUFBRSxFQUFFLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFMUUsWUFBWTtRQUNaLFFBQVEsUUFBUSxFQUFFLENBQUM7WUFDakIsS0FBSyxRQUFRO2dCQUNYLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLFFBQVEsQ0FBQztnQkFDbEMsTUFBTTtZQUNSLEtBQUssY0FBYztnQkFDakIsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsY0FBYyxDQUFDO2dCQUN4QyxNQUFNO1lBQ1IsS0FBSyxlQUFlO2dCQUNsQixHQUFHLENBQUMsaUJBQWlCLENBQUMsR0FBRyxlQUFlLENBQUM7Z0JBQ3pDLE1BQU07WUFDUixLQUFLLGNBQWM7Z0JBQ2pCLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLGNBQWMsQ0FBQztnQkFDeEMsTUFBTTtZQUNSLEtBQUssS0FBSyxDQUFDO1lBQ1gsS0FBSyxVQUFVO2dCQUNiLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLFVBQVUsQ0FBQztnQkFDcEMsTUFBTTtZQUNSLEtBQUssT0FBTyxDQUFDO1lBQ2IsS0FBSyxZQUFZLENBQUM7WUFDbEI7Z0JBQ0UsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUUsb0JBQW9CO2dCQUM1RCxNQUFNO1FBQ1YsQ0FBQztRQUVELGFBQWE7UUFDYixRQUFRLFNBQVMsRUFBRSxDQUFDO1lBQ2xCLEtBQUssT0FBTyxDQUFDO1lBQ2IsS0FBSyxZQUFZO2dCQUNmLEdBQUcsQ0FBQyxhQUFhLENBQUMsR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLEdBQUcsWUFBWSxDQUFDO2dCQUN6RCxNQUFNO1lBQ1IsS0FBSyxRQUFRO2dCQUNYLEdBQUcsQ0FBQyxhQUFhLENBQUMsR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLEdBQUcsUUFBUSxDQUFDO2dCQUNyRCxNQUFNO1lBQ1IsS0FBSyxLQUFLLENBQUM7WUFDWCxLQUFLLFVBQVU7Z0JBQ2IsR0FBRyxDQUFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUMsR0FBRyxVQUFVLENBQUM7Z0JBQ3ZELE1BQU07WUFDUixLQUFLLGVBQWU7Z0JBQ2xCLEdBQUcsQ0FBQyxlQUFlLENBQUMsR0FBRyxlQUFlLENBQUM7Z0JBQ3ZDLEdBQUcsQ0FBQyxhQUFhLENBQUMsR0FBRyxTQUFTLENBQUM7Z0JBQy9CLE1BQU07WUFDUixLQUFLLGNBQWM7Z0JBQ2pCLEdBQUcsQ0FBQyxlQUFlLENBQUMsR0FBRyxjQUFjLENBQUM7Z0JBQ3RDLEdBQUcsQ0FBQyxhQUFhLENBQUMsR0FBRyxTQUFTLENBQUM7Z0JBQy9CLE1BQU07WUFDUixLQUFLLFVBQVU7Z0JBQ2IsR0FBRyxDQUFDLGVBQWUsQ0FBQyxHQUFHLFNBQVMsQ0FBQztnQkFDakMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxHQUFHLFVBQVUsQ0FBQztnQkFDaEMsTUFBTTtZQUNSLEtBQUssU0FBUyxDQUFDO1lBQ2YsU0FBVSxZQUFZO2dCQUNwQixHQUFHLENBQUMsYUFBYSxDQUFDLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFHLHFCQUFxQjtnQkFDOUUsTUFBTTtRQUNWLENBQUM7UUFFRCxPQUFPLFlBQVksQ0FBQyxHQUFHLEVBQUU7WUFDdkIsU0FBUyxFQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsTUFBTTtZQUNsRCxnQkFBZ0IsRUFBRyxNQUFNLENBQUMsTUFBTTtZQUNoQyxZQUFZLEVBQUcsWUFBWTtZQUMzQixXQUFXLEVBQUUsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDO2dCQUNwQyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDekQsWUFBWSxFQUFFLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQztnQkFDckMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSTtTQUN6RCxDQUFvQixDQUFDO0lBQ3hCLENBQUM7dUdBckVVLHVCQUF1QjsyR0FBdkIsdUJBQXVCLGNBRFgsTUFBTTs7MkZBQ2xCLHVCQUF1QjtrQkFEbkMsVUFBVTttQkFBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUM7O0FBeUVoQyxNQUFNLE1BQU0sR0FBRztJQUNiLGVBQWUsRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0I7SUFDM0Usa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUUscUJBQXFCLEVBQUUscUJBQXFCO0lBQ3BGLHFCQUFxQixFQUFFLHFCQUFxQixFQUFFLHFCQUFxQixFQUFFLHFCQUFxQjtJQUMxRixxQkFBcUIsRUFBRSxxQkFBcUI7Q0FDN0MsQ0FBQztBQUNGLE1BQU0sUUFBUSxHQUFHOzs7OztDQUtoQixDQUFDO0FBRUY7Ozs7Ozs7O0dBUUc7QUFFSCxNQUFNLE9BQU8sb0JBQXFCLFNBQVEsY0FBYztJQUNuQyxhQUFhLEdBQUcsY0FBYyxDQUFDO0lBQ3hDLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBRSx5QkFBeUI7SUFDMUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFFLHVCQUF1QjtJQUVsRCxZQUFZLEtBQWlCLEVBQ2pCLFVBQXNCLEVBQ3RCLFlBQXFDLEVBQ3JDLE9BQXdCO1FBQ2xDLEtBQUssQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQzthQUNsRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUNwQyxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsZ0RBQWdEO0lBQ2hELG9CQUFvQjtJQUNwQixnREFBZ0Q7SUFFaEQ7O09BRUc7SUFDZ0IsZUFBZSxDQUFDLEtBQWE7UUFDOUMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUM7UUFDcEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMzQixJQUFJLE1BQU0sS0FBSyxLQUFLLElBQUksTUFBTSxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxnQ0FBZ0MsQ0FBQztRQUNyRCxDQUFDO2FBQU0sSUFBSSxNQUFNLEtBQUssS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDdkMsSUFBSSxDQUFDLFVBQVUsR0FBRywwQkFBMEIsQ0FBQztRQUMvQyxDQUFDO2FBQU0sSUFBSSxNQUFNLEtBQUssYUFBYSxJQUFJLE1BQU0sRUFBRSxDQUFDO1lBQzlDLElBQUksQ0FBQyxVQUFVLEdBQUcsbUNBQW1DLENBQUM7UUFDeEQsQ0FBQzthQUFNLElBQUksTUFBTSxLQUFLLGFBQWEsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQy9DLElBQUksQ0FBQyxVQUFVLEdBQUcsNkJBQTZCLENBQUM7UUFDbEQsQ0FBQzthQUFNLElBQUksTUFBTSxLQUFLLFFBQVEsSUFBSSxNQUFNLEVBQUUsQ0FBQztZQUN6QyxJQUFJLENBQUMsVUFBVSxHQUFHLDhCQUE4QixDQUFDO1FBQ25ELENBQUM7YUFBTSxJQUFJLE1BQU0sS0FBSyxRQUFRLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMxQyxJQUFJLENBQUMsVUFBVSxHQUFHLHdCQUF3QixDQUFDO1FBQzdDLENBQUM7YUFBTSxJQUFJLE1BQU0sS0FBSyxnQkFBZ0IsSUFBSSxNQUFNLEVBQUUsQ0FBQztZQUNqRCxJQUFJLENBQUMsVUFBVSxHQUFHLGlDQUFpQyxDQUFDO1FBQ3RELENBQUM7YUFBTSxJQUFJLE1BQU0sS0FBSyxnQkFBZ0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2xELElBQUksQ0FBQyxVQUFVLEdBQUcsMkJBQTJCLENBQUM7UUFDaEQsQ0FBQztRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVEOztPQUVHO0lBQ08sY0FBYyxDQUFDLE9BQXVCO1FBQzlDLE1BQU0sVUFBVSxHQUFhLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDaEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDdEIsQ0FBQztRQUNELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO3VHQXpEVSxvQkFBb0I7MkZBQXBCLG9CQUFvQjs7MkZBQXBCLG9CQUFvQjtrQkFEaEMsU0FBUzs7QUE4RFYsTUFBTSxPQUFPLDJCQUE0QixTQUFRLG9CQUFvQjtJQUNoRCxNQUFNLEdBQUcsTUFBTSxDQUFDO3VHQUR4QiwyQkFBMkI7MkZBQTNCLDJCQUEyQjs7MkZBQTNCLDJCQUEyQjtrQkFEdkMsU0FBUzttQkFBQyxFQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUM7O0FBSzdCLE1BQU0sMEJBQTBCLEdBQWlDLElBQUksR0FBRyxFQUFFLENBQUM7QUFDM0UsTUFBTSx3QkFBd0IsR0FBaUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUN6RSxNQUFNLDZCQUE2QixHQUFpQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQzlFLE1BQU0sMkJBQTJCLEdBQWlDLElBQUksR0FBRyxFQUFFLENBQUM7QUFDNUUsTUFBTSxnQ0FBZ0MsR0FBaUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNqRixNQUFNLDhCQUE4QixHQUFpQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQy9FLE1BQU0sbUNBQW1DLEdBQWlDLElBQUksR0FBRyxFQUFFLENBQUM7QUFDcEYsTUFBTSxpQ0FBaUMsR0FBaUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIEJhc2VEaXJlY3RpdmUyLCBFbGVtZW50TWF0Y2hlciwgTWVkaWFNYXJzaGFsbGVyLCBTdHlsZUJ1aWxkZXIsXG4gICAgU3R5bGVEZWZpbml0aW9uLFxuICAgIFN0eWxlVXRpbHNcbn0gZnJvbSAnbmd4LWZsZXhpYmxlLWxheW91dC9jb3JlJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgZXh0ZW5kT2JqZWN0LCBpc0Zsb3dIb3Jpem9udGFsLCBMQVlPVVRfVkFMVUVTIH0gZnJvbSAnbmd4LWZsZXhpYmxlLWxheW91dC9fcHJpdmF0ZS11dGlscyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGF5b3V0QWxpZ25QYXJlbnQge1xuICBsYXlvdXQ6IHN0cmluZztcbiAgaW5saW5lOiBib29sZWFuO1xufVxuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBMYXlvdXRBbGlnblN0eWxlQnVpbGRlciBleHRlbmRzIFN0eWxlQnVpbGRlciB7XG4gIGJ1aWxkU3R5bGVzKGFsaWduOiBzdHJpbmcsIHBhcmVudDogTGF5b3V0QWxpZ25QYXJlbnQpIHtcbiAgICBjb25zdCBjc3M6IFN0eWxlRGVmaW5pdGlvbiA9IHt9LCBbbWFpbkF4aXMsIGNyb3NzQXhpc10gPSBhbGlnbi5zcGxpdCgnICcpO1xuXG4gICAgLy8gTWFpbiBheGlzXG4gICAgc3dpdGNoIChtYWluQXhpcykge1xuICAgICAgY2FzZSAnY2VudGVyJzpcbiAgICAgICAgY3NzWydqdXN0aWZ5LWNvbnRlbnQnXSA9ICdjZW50ZXInO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3NwYWNlLWFyb3VuZCc6XG4gICAgICAgIGNzc1snanVzdGlmeS1jb250ZW50J10gPSAnc3BhY2UtYXJvdW5kJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzcGFjZS1iZXR3ZWVuJzpcbiAgICAgICAgY3NzWydqdXN0aWZ5LWNvbnRlbnQnXSA9ICdzcGFjZS1iZXR3ZWVuJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzcGFjZS1ldmVubHknOlxuICAgICAgICBjc3NbJ2p1c3RpZnktY29udGVudCddID0gJ3NwYWNlLWV2ZW5seSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZW5kJzpcbiAgICAgIGNhc2UgJ2ZsZXgtZW5kJzpcbiAgICAgICAgY3NzWydqdXN0aWZ5LWNvbnRlbnQnXSA9ICdmbGV4LWVuZCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc3RhcnQnOlxuICAgICAgY2FzZSAnZmxleC1zdGFydCc6XG4gICAgICBkZWZhdWx0IDpcbiAgICAgICAgY3NzWydqdXN0aWZ5LWNvbnRlbnQnXSA9ICdmbGV4LXN0YXJ0JzsgIC8vIGRlZmF1bHQgbWFpbiBheGlzXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIC8vIENyb3NzLWF4aXNcbiAgICBzd2l0Y2ggKGNyb3NzQXhpcykge1xuICAgICAgY2FzZSAnc3RhcnQnOlxuICAgICAgY2FzZSAnZmxleC1zdGFydCc6XG4gICAgICAgIGNzc1snYWxpZ24taXRlbXMnXSA9IGNzc1snYWxpZ24tY29udGVudCddID0gJ2ZsZXgtc3RhcnQnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICAgIGNzc1snYWxpZ24taXRlbXMnXSA9IGNzc1snYWxpZ24tY29udGVudCddID0gJ2NlbnRlcic7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZW5kJzpcbiAgICAgIGNhc2UgJ2ZsZXgtZW5kJzpcbiAgICAgICAgY3NzWydhbGlnbi1pdGVtcyddID0gY3NzWydhbGlnbi1jb250ZW50J10gPSAnZmxleC1lbmQnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3NwYWNlLWJldHdlZW4nOlxuICAgICAgICBjc3NbJ2FsaWduLWNvbnRlbnQnXSA9ICdzcGFjZS1iZXR3ZWVuJztcbiAgICAgICAgY3NzWydhbGlnbi1pdGVtcyddID0gJ3N0cmV0Y2gnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3NwYWNlLWFyb3VuZCc6XG4gICAgICAgIGNzc1snYWxpZ24tY29udGVudCddID0gJ3NwYWNlLWFyb3VuZCc7XG4gICAgICAgIGNzc1snYWxpZ24taXRlbXMnXSA9ICdzdHJldGNoJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdiYXNlbGluZSc6XG4gICAgICAgIGNzc1snYWxpZ24tY29udGVudCddID0gJ3N0cmV0Y2gnO1xuICAgICAgICBjc3NbJ2FsaWduLWl0ZW1zJ10gPSAnYmFzZWxpbmUnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3N0cmV0Y2gnOlxuICAgICAgZGVmYXVsdCA6IC8vICdzdHJldGNoJ1xuICAgICAgICBjc3NbJ2FsaWduLWl0ZW1zJ10gPSBjc3NbJ2FsaWduLWNvbnRlbnQnXSA9ICdzdHJldGNoJzsgICAvLyBkZWZhdWx0IGNyb3NzIGF4aXNcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIGV4dGVuZE9iamVjdChjc3MsIHtcbiAgICAgICdkaXNwbGF5JyA6IHBhcmVudC5pbmxpbmUgPyAnaW5saW5lLWZsZXgnIDogJ2ZsZXgnLFxuICAgICAgJ2ZsZXgtZGlyZWN0aW9uJyA6IHBhcmVudC5sYXlvdXQsXG4gICAgICAnYm94LXNpemluZycgOiAnYm9yZGVyLWJveCcsXG4gICAgICAnbWF4LXdpZHRoJzogY3Jvc3NBeGlzID09PSAnc3RyZXRjaCcgP1xuICAgICAgICAhaXNGbG93SG9yaXpvbnRhbChwYXJlbnQubGF5b3V0KSA/ICcxMDAlJyA6IG51bGwgOiBudWxsLFxuICAgICAgJ21heC1oZWlnaHQnOiBjcm9zc0F4aXMgPT09ICdzdHJldGNoJyA/XG4gICAgICAgIGlzRmxvd0hvcml6b250YWwocGFyZW50LmxheW91dCkgPyAnMTAwJScgOiBudWxsIDogbnVsbCxcbiAgICB9KSBhcyBTdHlsZURlZmluaXRpb247XG4gIH1cbn1cblxuY29uc3QgaW5wdXRzID0gW1xuICAnZnhMYXlvdXRBbGlnbicsICdmeExheW91dEFsaWduLnhzJywgJ2Z4TGF5b3V0QWxpZ24uc20nLCAnZnhMYXlvdXRBbGlnbi5tZCcsXG4gICdmeExheW91dEFsaWduLmxnJywgJ2Z4TGF5b3V0QWxpZ24ueGwnLCAnZnhMYXlvdXRBbGlnbi5sdC1zbScsICdmeExheW91dEFsaWduLmx0LW1kJyxcbiAgJ2Z4TGF5b3V0QWxpZ24ubHQtbGcnLCAnZnhMYXlvdXRBbGlnbi5sdC14bCcsICdmeExheW91dEFsaWduLmd0LXhzJywgJ2Z4TGF5b3V0QWxpZ24uZ3Qtc20nLFxuICAnZnhMYXlvdXRBbGlnbi5ndC1tZCcsICdmeExheW91dEFsaWduLmd0LWxnJ1xuXTtcbmNvbnN0IHNlbGVjdG9yID0gYFxuICBbZnhMYXlvdXRBbGlnbl0sIFtmeExheW91dEFsaWduLnhzXSwgW2Z4TGF5b3V0QWxpZ24uc21dLCBbZnhMYXlvdXRBbGlnbi5tZF0sXG4gIFtmeExheW91dEFsaWduLmxnXSwgW2Z4TGF5b3V0QWxpZ24ueGxdLCBbZnhMYXlvdXRBbGlnbi5sdC1zbV0sIFtmeExheW91dEFsaWduLmx0LW1kXSxcbiAgW2Z4TGF5b3V0QWxpZ24ubHQtbGddLCBbZnhMYXlvdXRBbGlnbi5sdC14bF0sIFtmeExheW91dEFsaWduLmd0LXhzXSwgW2Z4TGF5b3V0QWxpZ24uZ3Qtc21dLFxuICBbZnhMYXlvdXRBbGlnbi5ndC1tZF0sIFtmeExheW91dEFsaWduLmd0LWxnXVxuYDtcblxuLyoqXG4gKiAnbGF5b3V0LWFsaWduJyBmbGV4Ym94IHN0eWxpbmcgZGlyZWN0aXZlXG4gKiAgRGVmaW5lcyBwb3NpdGlvbmluZyBvZiBjaGlsZCBlbGVtZW50cyBhbG9uZyBtYWluIGFuZCBjcm9zcyBheGlzIGluIGEgbGF5b3V0IGNvbnRhaW5lclxuICogIE9wdGlvbmFsIHZhbHVlczoge21haW4tYXhpc30gdmFsdWVzIG9yIHttYWluLWF4aXMgY3Jvc3MtYXhpc30gdmFsdWUgcGFpcnNcbiAqXG4gKiAgQHNlZSBodHRwczovL2Nzcy10cmlja3MuY29tL2FsbWFuYWMvcHJvcGVydGllcy9qL2p1c3RpZnktY29udGVudC9cbiAqICBAc2VlIGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vYWxtYW5hYy9wcm9wZXJ0aWVzL2EvYWxpZ24taXRlbXMvXG4gKiAgQHNlZSBodHRwczovL2Nzcy10cmlja3MuY29tL2FsbWFuYWMvcHJvcGVydGllcy9hL2FsaWduLWNvbnRlbnQvXG4gKi9cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGNsYXNzIExheW91dEFsaWduRGlyZWN0aXZlIGV4dGVuZHMgQmFzZURpcmVjdGl2ZTIge1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgRElSRUNUSVZFX0tFWSA9ICdsYXlvdXQtYWxpZ24nO1xuICBwcm90ZWN0ZWQgbGF5b3V0ID0gJ3Jvdyc7ICAvLyBkZWZhdWx0IGZsZXgtZGlyZWN0aW9uXG4gIHByb3RlY3RlZCBpbmxpbmUgPSBmYWxzZTsgIC8vIGRlZmF1bHQgaW5saW5lIHZhbHVlXG5cbiAgY29uc3RydWN0b3IoZWxSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIHN0eWxlVXRpbHM6IFN0eWxlVXRpbHMsXG4gICAgICAgICAgICAgIHN0eWxlQnVpbGRlcjogTGF5b3V0QWxpZ25TdHlsZUJ1aWxkZXIsXG4gICAgICAgICAgICAgIG1hcnNoYWw6IE1lZGlhTWFyc2hhbGxlcikge1xuICAgIHN1cGVyKGVsUmVmLCBzdHlsZUJ1aWxkZXIsIHN0eWxlVXRpbHMsIG1hcnNoYWwpO1xuICAgIHRoaXMuaW5pdCgpO1xuICAgIHRoaXMubWFyc2hhbC50cmFja1ZhbHVlKHRoaXMubmF0aXZlRWxlbWVudCwgJ2xheW91dCcpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95U3ViamVjdCkpXG4gICAgICAuc3Vic2NyaWJlKHRoaXMub25MYXlvdXRDaGFuZ2UuYmluZCh0aGlzKSk7XG4gIH1cblxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgLy8gUHJvdGVjdGVkIG1ldGhvZHNcbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdXBkYXRlV2l0aFZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBsYXlvdXQgPSB0aGlzLmxheW91dCB8fCAncm93JztcbiAgICBjb25zdCBpbmxpbmUgPSB0aGlzLmlubGluZTtcbiAgICBpZiAobGF5b3V0ID09PSAncm93JyAmJiBpbmxpbmUpIHtcbiAgICAgIHRoaXMuc3R5bGVDYWNoZSA9IGxheW91dEFsaWduSG9yaXpvbnRhbElubGluZUNhY2hlO1xuICAgIH0gZWxzZSBpZiAobGF5b3V0ID09PSAncm93JyAmJiAhaW5saW5lKSB7XG4gICAgICB0aGlzLnN0eWxlQ2FjaGUgPSBsYXlvdXRBbGlnbkhvcml6b250YWxDYWNoZTtcbiAgICB9IGVsc2UgaWYgKGxheW91dCA9PT0gJ3Jvdy1yZXZlcnNlJyAmJiBpbmxpbmUpIHtcbiAgICAgIHRoaXMuc3R5bGVDYWNoZSA9IGxheW91dEFsaWduSG9yaXpvbnRhbFJldklubGluZUNhY2hlO1xuICAgIH0gZWxzZSBpZiAobGF5b3V0ID09PSAncm93LXJldmVyc2UnICYmICFpbmxpbmUpIHtcbiAgICAgIHRoaXMuc3R5bGVDYWNoZSA9IGxheW91dEFsaWduSG9yaXpvbnRhbFJldkNhY2hlO1xuICAgIH0gZWxzZSBpZiAobGF5b3V0ID09PSAnY29sdW1uJyAmJiBpbmxpbmUpIHtcbiAgICAgIHRoaXMuc3R5bGVDYWNoZSA9IGxheW91dEFsaWduVmVydGljYWxJbmxpbmVDYWNoZTtcbiAgICB9IGVsc2UgaWYgKGxheW91dCA9PT0gJ2NvbHVtbicgJiYgIWlubGluZSkge1xuICAgICAgdGhpcy5zdHlsZUNhY2hlID0gbGF5b3V0QWxpZ25WZXJ0aWNhbENhY2hlO1xuICAgIH0gZWxzZSBpZiAobGF5b3V0ID09PSAnY29sdW1uLXJldmVyc2UnICYmIGlubGluZSkge1xuICAgICAgdGhpcy5zdHlsZUNhY2hlID0gbGF5b3V0QWxpZ25WZXJ0aWNhbFJldklubGluZUNhY2hlO1xuICAgIH0gZWxzZSBpZiAobGF5b3V0ID09PSAnY29sdW1uLXJldmVyc2UnICYmICFpbmxpbmUpIHtcbiAgICAgIHRoaXMuc3R5bGVDYWNoZSA9IGxheW91dEFsaWduVmVydGljYWxSZXZDYWNoZTtcbiAgICB9XG4gICAgdGhpcy5hZGRTdHlsZXModmFsdWUsIHtsYXlvdXQsIGlubGluZX0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENhY2hlIHRoZSBwYXJlbnQgY29udGFpbmVyICdmbGV4LWRpcmVjdGlvbicgYW5kIHVwZGF0ZSB0aGUgJ2ZsZXgnIHN0eWxlc1xuICAgKi9cbiAgcHJvdGVjdGVkIG9uTGF5b3V0Q2hhbmdlKG1hdGNoZXI6IEVsZW1lbnRNYXRjaGVyKSB7XG4gICAgY29uc3QgbGF5b3V0S2V5czogc3RyaW5nW10gPSBtYXRjaGVyLnZhbHVlLnNwbGl0KCcgJyk7XG4gICAgdGhpcy5sYXlvdXQgPSBsYXlvdXRLZXlzWzBdO1xuICAgIHRoaXMuaW5saW5lID0gbWF0Y2hlci52YWx1ZS5pbmNsdWRlcygnaW5saW5lJyk7XG4gICAgaWYgKCFMQVlPVVRfVkFMVUVTLmZpbmQoeCA9PiB4ID09PSB0aGlzLmxheW91dCkpIHtcbiAgICAgIHRoaXMubGF5b3V0ID0gJ3Jvdyc7XG4gICAgfVxuICAgIHRoaXMudHJpZ2dlclVwZGF0ZSgpO1xuICB9XG59XG5cbkBEaXJlY3RpdmUoe3NlbGVjdG9yLCBpbnB1dHN9KVxuZXhwb3J0IGNsYXNzIERlZmF1bHRMYXlvdXRBbGlnbkRpcmVjdGl2ZSBleHRlbmRzIExheW91dEFsaWduRGlyZWN0aXZlIHtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIGlucHV0cyA9IGlucHV0cztcbn1cblxuY29uc3QgbGF5b3V0QWxpZ25Ib3Jpem9udGFsQ2FjaGU6IE1hcDxzdHJpbmcsIFN0eWxlRGVmaW5pdGlvbj4gPSBuZXcgTWFwKCk7XG5jb25zdCBsYXlvdXRBbGlnblZlcnRpY2FsQ2FjaGU6IE1hcDxzdHJpbmcsIFN0eWxlRGVmaW5pdGlvbj4gPSBuZXcgTWFwKCk7XG5jb25zdCBsYXlvdXRBbGlnbkhvcml6b250YWxSZXZDYWNoZTogTWFwPHN0cmluZywgU3R5bGVEZWZpbml0aW9uPiA9IG5ldyBNYXAoKTtcbmNvbnN0IGxheW91dEFsaWduVmVydGljYWxSZXZDYWNoZTogTWFwPHN0cmluZywgU3R5bGVEZWZpbml0aW9uPiA9IG5ldyBNYXAoKTtcbmNvbnN0IGxheW91dEFsaWduSG9yaXpvbnRhbElubGluZUNhY2hlOiBNYXA8c3RyaW5nLCBTdHlsZURlZmluaXRpb24+ID0gbmV3IE1hcCgpO1xuY29uc3QgbGF5b3V0QWxpZ25WZXJ0aWNhbElubGluZUNhY2hlOiBNYXA8c3RyaW5nLCBTdHlsZURlZmluaXRpb24+ID0gbmV3IE1hcCgpO1xuY29uc3QgbGF5b3V0QWxpZ25Ib3Jpem9udGFsUmV2SW5saW5lQ2FjaGU6IE1hcDxzdHJpbmcsIFN0eWxlRGVmaW5pdGlvbj4gPSBuZXcgTWFwKCk7XG5jb25zdCBsYXlvdXRBbGlnblZlcnRpY2FsUmV2SW5saW5lQ2FjaGU6IE1hcDxzdHJpbmcsIFN0eWxlRGVmaW5pdGlvbj4gPSBuZXcgTWFwKCk7XG4iXX0=