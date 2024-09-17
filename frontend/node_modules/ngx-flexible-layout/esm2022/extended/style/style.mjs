/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { isPlatformServer, NgStyle } from '@angular/common';
import { Directive, Inject, Optional, PLATFORM_ID, SecurityContext, Self } from '@angular/core';
import { BaseDirective2, SERVER_TOKEN } from 'ngx-flexible-layout/core';
import { buildMapFromSet, buildRawList, getType, keyValuesToMap, stringToKeyValue } from './style-transforms';
import * as i0 from "@angular/core";
import * as i1 from "ngx-flexible-layout/core";
import * as i2 from "@angular/platform-browser";
import * as i3 from "@angular/common";
export class StyleDirective extends BaseDirective2 {
    sanitizer;
    ngStyleInstance;
    DIRECTIVE_KEY = 'ngStyle';
    fallbackStyles;
    isServer;
    constructor(elementRef, styler, marshal, sanitizer, differs, renderer2, ngStyleInstance, serverLoaded, platformId) {
        super(elementRef, null, styler, marshal);
        this.sanitizer = sanitizer;
        this.ngStyleInstance = ngStyleInstance;
        if (!this.ngStyleInstance) {
            // Create an instance NgStyle Directive instance only if `ngStyle=""` has NOT been
            // defined on the same host element; since the responsive variations may be defined...
            this.ngStyleInstance = new NgStyle(elementRef, differs, renderer2);
        }
        this.init();
        const styles = this.nativeElement.getAttribute('style') ?? '';
        this.fallbackStyles = this.buildStyleMap(styles);
        this.isServer = serverLoaded && isPlatformServer(platformId);
    }
    /** Add generated styles */
    updateWithValue(value) {
        const styles = this.buildStyleMap(value);
        this.ngStyleInstance.ngStyle = { ...this.fallbackStyles, ...styles };
        if (this.isServer) {
            this.applyStyleToElement(styles);
        }
        this.ngStyleInstance.ngDoCheck();
    }
    /** Remove generated styles */
    clearStyles() {
        this.ngStyleInstance.ngStyle = this.fallbackStyles;
        this.ngStyleInstance.ngDoCheck();
    }
    /**
     * Convert raw strings to ngStyleMap; which is required by ngStyle
     * NOTE: Raw string key-value pairs MUST be delimited by `;`
     *       Comma-delimiters are not supported due to complexities of
     *       possible style values such as `rgba(x,x,x,x)` and others
     */
    buildStyleMap(styles) {
        // Always safe-guard (aka sanitize) style property values
        const sanitizer = (val) => this.sanitizer.sanitize(SecurityContext.STYLE, val) ?? '';
        if (styles) {
            switch (getType(styles)) {
                case 'string': return buildMapFromList(buildRawList(styles), sanitizer);
                case 'array': return buildMapFromList(styles, sanitizer);
                case 'set': return buildMapFromSet(styles, sanitizer);
                default: return buildMapFromSet(styles, sanitizer);
            }
        }
        return {};
    }
    // ******************************************************************
    // Lifecycle Hooks
    // ******************************************************************
    /** For ChangeDetectionStrategy.onPush and ngOnChanges() updates */
    ngDoCheck() {
        this.ngStyleInstance.ngDoCheck();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: StyleDirective, deps: [{ token: i0.ElementRef }, { token: i1.StyleUtils }, { token: i1.MediaMarshaller }, { token: i2.DomSanitizer }, { token: i0.KeyValueDiffers }, { token: i0.Renderer2 }, { token: i3.NgStyle, optional: true, self: true }, { token: SERVER_TOKEN }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0", type: StyleDirective, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: StyleDirective, decorators: [{
            type: Directive
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.StyleUtils }, { type: i1.MediaMarshaller }, { type: i2.DomSanitizer }, { type: i0.KeyValueDiffers }, { type: i0.Renderer2 }, { type: i3.NgStyle, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [SERVER_TOKEN]
                }] }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }] });
const inputs = [
    'ngStyle',
    'ngStyle.xs', 'ngStyle.sm', 'ngStyle.md', 'ngStyle.lg', 'ngStyle.xl',
    'ngStyle.lt-sm', 'ngStyle.lt-md', 'ngStyle.lt-lg', 'ngStyle.lt-xl',
    'ngStyle.gt-xs', 'ngStyle.gt-sm', 'ngStyle.gt-md', 'ngStyle.gt-lg'
];
const selector = `
  [ngStyle],
  [ngStyle.xs], [ngStyle.sm], [ngStyle.md], [ngStyle.lg], [ngStyle.xl],
  [ngStyle.lt-sm], [ngStyle.lt-md], [ngStyle.lt-lg], [ngStyle.lt-xl],
  [ngStyle.gt-xs], [ngStyle.gt-sm], [ngStyle.gt-md], [ngStyle.gt-lg]
`;
/**
 * Directive to add responsive support for ngStyle.
 *
 */
export class DefaultStyleDirective extends StyleDirective {
    inputs = inputs;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: DefaultStyleDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0", type: DefaultStyleDirective, selector: "\n  [ngStyle],\n  [ngStyle.xs], [ngStyle.sm], [ngStyle.md], [ngStyle.lg], [ngStyle.xl],\n  [ngStyle.lt-sm], [ngStyle.lt-md], [ngStyle.lt-lg], [ngStyle.lt-xl],\n  [ngStyle.gt-xs], [ngStyle.gt-sm], [ngStyle.gt-md], [ngStyle.gt-lg]\n", inputs: { ngStyle: "ngStyle", "ngStyle.xs": "ngStyle.xs", "ngStyle.sm": "ngStyle.sm", "ngStyle.md": "ngStyle.md", "ngStyle.lg": "ngStyle.lg", "ngStyle.xl": "ngStyle.xl", "ngStyle.lt-sm": "ngStyle.lt-sm", "ngStyle.lt-md": "ngStyle.lt-md", "ngStyle.lt-lg": "ngStyle.lt-lg", "ngStyle.lt-xl": "ngStyle.lt-xl", "ngStyle.gt-xs": "ngStyle.gt-xs", "ngStyle.gt-sm": "ngStyle.gt-sm", "ngStyle.gt-md": "ngStyle.gt-md", "ngStyle.gt-lg": "ngStyle.gt-lg" }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: DefaultStyleDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
/** Build a styles map from a list of styles, while sanitizing bad values first */
function buildMapFromList(styles, sanitize) {
    const sanitizeValue = (it) => {
        if (sanitize) {
            it.value = sanitize(it.value);
        }
        return it;
    };
    return styles
        .map(stringToKeyValue)
        .filter(entry => !!entry)
        .map(sanitizeValue)
        .reduce(keyValuesToMap, {});
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWJzL2ZsZXgtbGF5b3V0L2V4dGVuZGVkL3N0eWxlL3N0eWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RCxPQUFPLEVBQ0gsU0FBUyxFQUdULE1BQU0sRUFFTixRQUFRLEVBQ1IsV0FBVyxFQUVYLGVBQWUsRUFDZixJQUFJLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUNILGNBQWMsRUFDZCxZQUFZLEVBQ2YsTUFBTSwwQkFBMEIsQ0FBQztBQUVsQyxPQUFPLEVBQ0gsZUFBZSxFQUFFLFlBQVksRUFDN0IsT0FBTyxFQUFFLGNBQWMsRUFBOEUsZ0JBQWdCLEVBQ3hILE1BQU0sb0JBQW9CLENBQUM7Ozs7O0FBRzVCLE1BQU0sT0FBTyxjQUFlLFNBQVEsY0FBYztJQVMxQjtJQUcyQjtJQVY5QixhQUFhLEdBQUcsU0FBUyxDQUFDO0lBQ25DLGNBQWMsQ0FBYTtJQUMzQixRQUFRLENBQVU7SUFFNUIsWUFBWSxVQUFzQixFQUN0QixNQUFrQixFQUNsQixPQUF3QixFQUNkLFNBQXVCLEVBQ2pDLE9BQXdCLEVBQ3hCLFNBQW9CLEVBQ2lCLGVBQXdCLEVBQ3ZDLFlBQXFCLEVBQ3RCLFVBQWtCO1FBQ2pELEtBQUssQ0FBQyxVQUFVLEVBQUUsSUFBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQU50QixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBR0ksb0JBQWUsR0FBZixlQUFlLENBQVM7UUFJdkUsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUMxQixrRkFBa0Y7WUFDbEYsc0ZBQXNGO1lBQ3RGLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFF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YztJQUNwQyxNQUFNLEdBQUcsTUFBTSxDQUFDO3VHQUR4QixxQkFBcUI7MkZBQXJCLHFCQUFxQjs7MkZBQXJCLHFCQUFxQjtrQkFEakMsU0FBUzttQkFBQyxFQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUM7O0FBSzdCLGtGQUFrRjtBQUNsRixTQUFTLGdCQUFnQixDQUFDLE1BQXNCLEVBQUUsUUFBMkI7SUFDM0UsTUFBTSxhQUFhLEdBQUcsQ0FBQyxFQUFtQixFQUFFLEVBQUU7UUFDNUMsSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUNiLEVBQUUsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDLENBQUM7SUFFRixPQUFPLE1BQU07U0FDVixHQUFHLENBQUMsZ0JBQWdCLENBQUM7U0FDckIsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztTQUN4QixHQUFHLENBQUMsYUFBYSxDQUFDO1NBQ2xCLE1BQU0sQ0FBQyxjQUFjLEVBQUUsRUFBZ0IsQ0FBQyxDQUFDO0FBQzlDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IGlzUGxhdGZvcm1TZXJ2ZXIsIE5nU3R5bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsXG4gICAgRG9DaGVjayxcbiAgICBFbGVtZW50UmVmLFxuICAgIEluamVjdCxcbiAgICBLZXlWYWx1ZURpZmZlcnMsXG4gICAgT3B0aW9uYWwsXG4gICAgUExBVEZPUk1fSUQsXG4gICAgUmVuZGVyZXIyLFxuICAgIFNlY3VyaXR5Q29udGV4dCxcbiAgICBTZWxmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge1xuICAgIEJhc2VEaXJlY3RpdmUyLCBNZWRpYU1hcnNoYWxsZXIsXG4gICAgU0VSVkVSX1RPS0VOLCBTdHlsZVV0aWxzXG59IGZyb20gJ25neC1mbGV4aWJsZS1sYXlvdXQvY29yZSc7XG5cbmltcG9ydCB7XG4gICAgYnVpbGRNYXBGcm9tU2V0LCBidWlsZFJhd0xpc3QsXG4gICAgZ2V0VHlwZSwga2V5VmFsdWVzVG9NYXAsIE5nU3R5bGVLZXlWYWx1ZSwgTmdTdHlsZU1hcCwgTmdTdHlsZVJhd0xpc3QsIE5nU3R5bGVTYW5pdGl6ZXIsIE5nU3R5bGVUeXBlLCBzdHJpbmdUb0tleVZhbHVlXG59IGZyb20gJy4vc3R5bGUtdHJhbnNmb3Jtcyc7XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGNsYXNzIFN0eWxlRGlyZWN0aXZlIGV4dGVuZHMgQmFzZURpcmVjdGl2ZTIgaW1wbGVtZW50cyBEb0NoZWNrIHtcblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgRElSRUNUSVZFX0tFWSA9ICduZ1N0eWxlJztcbiAgcHJvdGVjdGVkIGZhbGxiYWNrU3R5bGVzOiBOZ1N0eWxlTWFwO1xuICBwcm90ZWN0ZWQgaXNTZXJ2ZXI6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgc3R5bGVyOiBTdHlsZVV0aWxzLFxuICAgICAgICAgICAgICBtYXJzaGFsOiBNZWRpYU1hcnNoYWxsZXIsXG4gICAgICAgICAgICAgIHByb3RlY3RlZCBzYW5pdGl6ZXI6IERvbVNhbml0aXplcixcbiAgICAgICAgICAgICAgZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzLFxuICAgICAgICAgICAgICByZW5kZXJlcjI6IFJlbmRlcmVyMixcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBwcml2YXRlIHJlYWRvbmx5IG5nU3R5bGVJbnN0YW5jZTogTmdTdHlsZSxcbiAgICAgICAgICAgICAgQEluamVjdChTRVJWRVJfVE9LRU4pIHNlcnZlckxvYWRlZDogYm9vbGVhbixcbiAgICAgICAgICAgICAgQEluamVjdChQTEFURk9STV9JRCkgcGxhdGZvcm1JZDogT2JqZWN0KSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZiwgbnVsbCEsIHN0eWxlciwgbWFyc2hhbCk7XG4gICAgaWYgKCF0aGlzLm5nU3R5bGVJbnN0YW5jZSkge1xuICAgICAgLy8gQ3JlYXRlIGFuIGluc3RhbmNlIE5nU3R5bGUgRGlyZWN0aXZlIGluc3RhbmNlIG9ubHkgaWYgYG5nU3R5bGU9XCJcImAgaGFzIE5PVCBiZWVuXG4gICAgICAvLyBkZWZpbmVkIG9uIHRoZSBzYW1lIGhvc3QgZWxlbWVudDsgc2luY2UgdGhlIHJlc3BvbnNpdmUgdmFyaWF0aW9ucyBtYXkgYmUgZGVmaW5lZC4uLlxuICAgICAgdGhpcy5uZ1N0eWxlSW5zdGFuY2UgPSBuZXcgTmdTdHlsZShlbGVtZW50UmVmLCBkaWZmZXJzLCByZW5kZXJlcjIpO1xuICAgIH1cbiAgICB0aGlzLmluaXQoKTtcbiAgICBjb25zdCBzdHlsZXMgPSB0aGlzLm5hdGl2ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdzdHlsZScpID8/ICcnO1xuICAgIHRoaXMuZmFsbGJhY2tTdHlsZXMgPSB0aGlzLmJ1aWxkU3R5bGVNYXAoc3R5bGVzKTtcbiAgICB0aGlzLmlzU2VydmVyID0gc2VydmVyTG9hZGVkICYmIGlzUGxhdGZvcm1TZXJ2ZXIocGxhdGZvcm1JZCk7XG4gIH1cblxuICAvKiogQWRkIGdlbmVyYXRlZCBzdHlsZXMgKi9cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIHVwZGF0ZVdpdGhWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgY29uc3Qgc3R5bGVzID0gdGhpcy5idWlsZFN0eWxlTWFwKHZhbHVlKTtcbiAgICB0aGlzLm5nU3R5bGVJbnN0YW5jZS5uZ1N0eWxlID0gey4uLnRoaXMuZmFsbGJhY2tTdHlsZXMsIC4uLnN0eWxlc307XG4gICAgaWYgKHRoaXMuaXNTZXJ2ZXIpIHtcbiAgICAgIHRoaXMuYXBwbHlTdHlsZVRvRWxlbWVudChzdHlsZXMpO1xuICAgIH1cbiAgICB0aGlzLm5nU3R5bGVJbnN0YW5jZS5uZ0RvQ2hlY2soKTtcbiAgfVxuXG4gIC8qKiBSZW1vdmUgZ2VuZXJhdGVkIHN0eWxlcyAqL1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgY2xlYXJTdHlsZXMoKSB7XG4gICAgdGhpcy5uZ1N0eWxlSW5zdGFuY2UubmdTdHlsZSA9IHRoaXMuZmFsbGJhY2tTdHlsZXM7XG4gICAgdGhpcy5uZ1N0eWxlSW5zdGFuY2UubmdEb0NoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCByYXcgc3RyaW5ncyB0byBuZ1N0eWxlTWFwOyB3aGljaCBpcyByZXF1aXJlZCBieSBuZ1N0eWxlXG4gICAqIE5PVEU6IFJhdyBzdHJpbmcga2V5LXZhbHVlIHBhaXJzIE1VU1QgYmUgZGVsaW1pdGVkIGJ5IGA7YFxuICAgKiAgICAgICBDb21tYS1kZWxpbWl0ZXJzIGFyZSBub3Qgc3VwcG9ydGVkIGR1ZSB0byBjb21wbGV4aXRpZXMgb2ZcbiAgICogICAgICAgcG9zc2libGUgc3R5bGUgdmFsdWVzIHN1Y2ggYXMgYHJnYmEoeCx4LHgseClgIGFuZCBvdGhlcnNcbiAgICovXG4gIHByb3RlY3RlZCBidWlsZFN0eWxlTWFwKHN0eWxlczogTmdTdHlsZVR5cGUpOiBOZ1N0eWxlTWFwIHtcbiAgICAvLyBBbHdheXMgc2FmZS1ndWFyZCAoYWthIHNhbml0aXplKSBzdHlsZSBwcm9wZXJ0eSB2YWx1ZXNcbiAgICBjb25zdCBzYW5pdGl6ZXI6IE5nU3R5bGVTYW5pdGl6ZXIgPSAodmFsOiBhbnkpID0+XG4gICAgICB0aGlzLnNhbml0aXplci5zYW5pdGl6ZShTZWN1cml0eUNvbnRleHQuU1RZTEUsIHZhbCkgPz8gJyc7XG4gICAgaWYgKHN0eWxlcykge1xuICAgICAgc3dpdGNoIChnZXRUeXBlKHN0eWxlcykpIHtcbiAgICAgICAgY2FzZSAnc3RyaW5nJzogIHJldHVybiBidWlsZE1hcEZyb21MaXN0KGJ1aWxkUmF3TGlzdChzdHlsZXMpLFxuICAgICAgICAgIHNhbml0aXplcik7XG4gICAgICAgIGNhc2UgJ2FycmF5JyA6ICByZXR1cm4gYnVpbGRNYXBGcm9tTGlzdChzdHlsZXMgYXMgTmdTdHlsZVJhd0xpc3QsIHNhbml0aXplcik7XG4gICAgICAgIGNhc2UgJ3NldCcgICA6ICByZXR1cm4gYnVpbGRNYXBGcm9tU2V0KHN0eWxlcywgc2FuaXRpemVyKTtcbiAgICAgICAgZGVmYXVsdCAgICAgIDogIHJldHVybiBidWlsZE1hcEZyb21TZXQoc3R5bGVzLCBzYW5pdGl6ZXIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAvLyBMaWZlY3ljbGUgSG9va3NcbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cbiAgLyoqIEZvciBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5vblB1c2ggYW5kIG5nT25DaGFuZ2VzKCkgdXBkYXRlcyAqL1xuICBuZ0RvQ2hlY2soKSB7XG4gICAgdGhpcy5uZ1N0eWxlSW5zdGFuY2UubmdEb0NoZWNrKCk7XG4gIH1cbn1cblxuY29uc3QgaW5wdXRzID0gW1xuICAnbmdTdHlsZScsXG4gICduZ1N0eWxlLnhzJywgJ25nU3R5bGUuc20nLCAnbmdTdHlsZS5tZCcsICduZ1N0eWxlLmxnJywgJ25nU3R5bGUueGwnLFxuICAnbmdTdHlsZS5sdC1zbScsICduZ1N0eWxlLmx0LW1kJywgJ25nU3R5bGUubHQtbGcnLCAnbmdTdHlsZS5sdC14bCcsXG4gICduZ1N0eWxlLmd0LXhzJywgJ25nU3R5bGUuZ3Qtc20nLCAnbmdTdHlsZS5ndC1tZCcsICduZ1N0eWxlLmd0LWxnJ1xuXTtcblxuY29uc3Qgc2VsZWN0b3IgPSBgXG4gIFtuZ1N0eWxlXSxcbiAgW25nU3R5bGUueHNdLCBbbmdTdHlsZS5zbV0sIFtuZ1N0eWxlLm1kXSwgW25nU3R5bGUubGddLCBbbmdTdHlsZS54bF0sXG4gIFtuZ1N0eWxlLmx0LXNtXSwgW25nU3R5bGUubHQtbWRdLCBbbmdTdHlsZS5sdC1sZ10sIFtuZ1N0eWxlLmx0LXhsXSxcbiAgW25nU3R5bGUuZ3QteHNdLCBbbmdTdHlsZS5ndC1zbV0sIFtuZ1N0eWxlLmd0LW1kXSwgW25nU3R5bGUuZ3QtbGddXG5gO1xuXG4vKipcbiAqIERpcmVjdGl2ZSB0byBhZGQgcmVzcG9uc2l2ZSBzdXBwb3J0IGZvciBuZ1N0eWxlLlxuICpcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3IsIGlucHV0c30pXG5leHBvcnQgY2xhc3MgRGVmYXVsdFN0eWxlRGlyZWN0aXZlIGV4dGVuZHMgU3R5bGVEaXJlY3RpdmUgaW1wbGVtZW50cyBEb0NoZWNrIHtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIGlucHV0cyA9IGlucHV0cztcbn1cblxuLyoqIEJ1aWxkIGEgc3R5bGVzIG1hcCBmcm9tIGEgbGlzdCBvZiBzdHlsZXMsIHdoaWxlIHNhbml0aXppbmcgYmFkIHZhbHVlcyBmaXJzdCAqL1xuZnVuY3Rpb24gYnVpbGRNYXBGcm9tTGlzdChzdHlsZXM6IE5nU3R5bGVSYXdMaXN0LCBzYW5pdGl6ZT86IE5nU3R5bGVTYW5pdGl6ZXIpOiBOZ1N0eWxlTWFwIHtcbiAgY29uc3Qgc2FuaXRpemVWYWx1ZSA9IChpdDogTmdTdHlsZUtleVZhbHVlKSA9PiB7XG4gICAgaWYgKHNhbml0aXplKSB7XG4gICAgICBpdC52YWx1ZSA9IHNhbml0aXplKGl0LnZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIGl0O1xuICB9O1xuXG4gIHJldHVybiBzdHlsZXNcbiAgICAubWFwKHN0cmluZ1RvS2V5VmFsdWUpXG4gICAgLmZpbHRlcihlbnRyeSA9PiAhIWVudHJ5KVxuICAgIC5tYXAoc2FuaXRpemVWYWx1ZSlcbiAgICAucmVkdWNlKGtleVZhbHVlc1RvTWFwLCB7fSBhcyBOZ1N0eWxlTWFwKTtcbn1cbiJdfQ==