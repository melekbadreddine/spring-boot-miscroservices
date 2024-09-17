/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgClass } from '@angular/common';
import { Directive, Input, Optional, Self } from '@angular/core';
import { BaseDirective2 } from 'ngx-flexible-layout/core';
import * as i0 from "@angular/core";
import * as i1 from "ngx-flexible-layout/core";
import * as i2 from "@angular/common";
export class ClassDirective extends BaseDirective2 {
    ngClassInstance;
    DIRECTIVE_KEY = 'ngClass';
    /**
     * Capture class assignments so we cache the default classes
     * which are merged with activated styles and used as fallbacks.
     */
    set klass(val) {
        this.ngClassInstance.klass = val;
        this.setValue(val, '');
    }
    constructor(elementRef, styler, marshal, iterableDiffers, keyValueDiffers, renderer2, ngClassInstance) {
        super(elementRef, null, styler, marshal);
        this.ngClassInstance = ngClassInstance;
        if (!this.ngClassInstance) {
            // Create an instance NgClass Directive instance only if `ngClass=""` has NOT been defined on
            // the same host element; since the responsive variations may be defined...
            //////////////////////////////////////////////////////////////////////////////////////////////
            // Upgrade to Angular 18 broke this
            //https://github.com/angular/angular/commit/1be6b0a58a9e96f9f0bda8acb63c701f792e469b
            // this.ngClassInstance = new NgClass(iterableDiffers, keyValueDiffers, elementRef, renderer2);
            //////////////////////////////////////////////////////////////////////////////////////////////
            this.ngClassInstance = new NgClass(elementRef, renderer2);
        }
        this.init();
        this.setValue('', '');
    }
    updateWithValue(value) {
        this.ngClassInstance.ngClass = value;
        this.ngDoCheck();
    }
    // ******************************************************************
    // Lifecycle Hooks
    // ******************************************************************
    /**
     * For ChangeDetectionStrategy.onPush and ngOnChanges() updates
     */
    ngDoCheck() {
        // ngDoCheck only to applicable renderers
        if (this.ngClassInstance["_renderer"] && "addClass" in this.ngClassInstance["_renderer"])
            this.ngClassInstance.ngDoCheck();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: ClassDirective, deps: [{ token: i0.ElementRef }, { token: i1.StyleUtils }, { token: i1.MediaMarshaller }, { token: i0.IterableDiffers }, { token: i0.KeyValueDiffers }, { token: i0.Renderer2 }, { token: i2.NgClass, optional: true, self: true }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0", type: ClassDirective, inputs: { klass: ["class", "klass"] }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: ClassDirective, decorators: [{
            type: Directive
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.StyleUtils }, { type: i1.MediaMarshaller }, { type: i0.IterableDiffers }, { type: i0.KeyValueDiffers }, { type: i0.Renderer2 }, { type: i2.NgClass, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }], propDecorators: { klass: [{
                type: Input,
                args: ['class']
            }] } });
const inputs = [
    'ngClass', 'ngClass.xs', 'ngClass.sm', 'ngClass.md', 'ngClass.lg', 'ngClass.xl',
    'ngClass.lt-sm', 'ngClass.lt-md', 'ngClass.lt-lg', 'ngClass.lt-xl',
    'ngClass.gt-xs', 'ngClass.gt-sm', 'ngClass.gt-md', 'ngClass.gt-lg'
];
const selector = `
  [ngClass], [ngClass.xs], [ngClass.sm], [ngClass.md], [ngClass.lg], [ngClass.xl],
  [ngClass.lt-sm], [ngClass.lt-md], [ngClass.lt-lg], [ngClass.lt-xl],
  [ngClass.gt-xs], [ngClass.gt-sm], [ngClass.gt-md], [ngClass.gt-lg]
`;
/**
 * Directive to add responsive support for ngClass.
 * This maintains the core functionality of 'ngClass' and adds responsive API
 * Note: this class is a no-op when rendered on the server
 */
export class DefaultClassDirective extends ClassDirective {
    inputs = inputs;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: DefaultClassDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0", type: DefaultClassDirective, selector: "\n  [ngClass], [ngClass.xs], [ngClass.sm], [ngClass.md], [ngClass.lg], [ngClass.xl],\n  [ngClass.lt-sm], [ngClass.lt-md], [ngClass.lt-lg], [ngClass.lt-xl],\n  [ngClass.gt-xs], [ngClass.gt-sm], [ngClass.gt-md], [ngClass.gt-lg]\n", inputs: { ngClass: "ngClass", "ngClass.xs": "ngClass.xs", "ngClass.sm": "ngClass.sm", "ngClass.md": "ngClass.md", "ngClass.lg": "ngClass.lg", "ngClass.xl": "ngClass.xl", "ngClass.lt-sm": "ngClass.lt-sm", "ngClass.lt-md": "ngClass.lt-md", "ngClass.lt-lg": "ngClass.lt-lg", "ngClass.lt-xl": "ngClass.lt-xl", "ngClass.gt-xs": "ngClass.gt-xs", "ngClass.gt-sm": "ngClass.gt-sm", "ngClass.gt-md": "ngClass.gt-md", "ngClass.gt-lg": "ngClass.gt-lg" }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: DefaultClassDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWJzL2ZsZXgtbGF5b3V0L2V4dGVuZGVkL2NsYXNzL2NsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMxQyxPQUFPLEVBQ0wsU0FBUyxFQUdULEtBQUssRUFHTCxRQUFRLEVBRVIsSUFBSSxFQUNMLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxjQUFjLEVBQStCLE1BQU0sMEJBQTBCLENBQUM7Ozs7QUFHdkYsTUFBTSxPQUFPLGNBQWUsU0FBUSxjQUFjO0lBb0JQO0lBbEJ0QixhQUFhLEdBQUcsU0FBUyxDQUFDO0lBRTdDOzs7T0FHRztJQUNILElBQ0ksS0FBSyxDQUFDLEdBQVc7UUFDbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxZQUFZLFVBQXNCLEVBQ2hDLE1BQWtCLEVBQ2xCLE9BQXdCLEVBQ3hCLGVBQWdDLEVBQ2hDLGVBQWdDLEVBQ2hDLFNBQW9CLEVBQ21CLGVBQXdCO1FBQy9ELEtBQUssQ0FBQyxVQUFVLEVBQUUsSUFBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQURILG9CQUFlLEdBQWYsZUFBZSxDQUFTO1FBRS9ELElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDMUIsNkZBQTZGO1lBQzdGLDJFQUEyRTtZQUMzRSw4RkFBOEY7WUFDOUYsbUNBQW1DO1lBQ25DLG9GQUFvRjtZQUNwRiwrRkFBK0Y7WUFDL0YsOEZBQThGO1lBRTlGLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzVELENBQUM7UUFDRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRWtCLGVBQWUsQ0FBQyxLQUFVO1FBQzNDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELHFFQUFxRTtJQUNyRSxrQkFBa0I7SUFDbEIscUVBQXFFO0lBRXJFOztPQUVHO0lBQ0gsU0FBUztRQUNQLHlDQUF5QztRQUN6QyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLElBQUksVUFBVSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDO1lBQ3RGLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckMsQ0FBQzt1R0FyRFUsY0FBYzsyRkFBZCxjQUFjOzsyRkFBZCxjQUFjO2tCQUQxQixTQUFTOzswQkFxQkwsUUFBUTs7MEJBQUksSUFBSTt5Q0FYZixLQUFLO3NCQURSLEtBQUs7dUJBQUMsT0FBTzs7QUFnRGhCLE1BQU0sTUFBTSxHQUFHO0lBQ2IsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZO0lBQy9FLGVBQWUsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLGVBQWU7SUFDbEUsZUFBZSxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsZUFBZTtDQUNuRSxDQUFDO0FBRUYsTUFBTSxRQUFRLEdBQUc7Ozs7Q0FJaEIsQ0FBQztBQUVGOzs7O0dBSUc7QUFFSCxNQUFNLE9BQU8scUJBQXNCLFNBQVEsY0FBYztJQUNwQyxNQUFNLEdBQUcsTUFBTSxDQUFDO3VHQUR4QixxQkFBcUI7MkZBQXJCLHFCQUFxQjs7MkZBQXJCLHFCQUFxQjtrQkFEakMsU0FBUzttQkFBQyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IE5nQ2xhc3MgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBEb0NoZWNrLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgSXRlcmFibGVEaWZmZXJzLFxuICBLZXlWYWx1ZURpZmZlcnMsXG4gIE9wdGlvbmFsLFxuICBSZW5kZXJlcjIsXG4gIFNlbGZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCYXNlRGlyZWN0aXZlMiwgTWVkaWFNYXJzaGFsbGVyLCBTdHlsZVV0aWxzIH0gZnJvbSAnbmd4LWZsZXhpYmxlLWxheW91dC9jb3JlJztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgQ2xhc3NEaXJlY3RpdmUgZXh0ZW5kcyBCYXNlRGlyZWN0aXZlMiBpbXBsZW1lbnRzIERvQ2hlY2sge1xuXG4gIHByb3RlY3RlZCBvdmVycmlkZSBESVJFQ1RJVkVfS0VZID0gJ25nQ2xhc3MnO1xuXG4gIC8qKlxuICAgKiBDYXB0dXJlIGNsYXNzIGFzc2lnbm1lbnRzIHNvIHdlIGNhY2hlIHRoZSBkZWZhdWx0IGNsYXNzZXNcbiAgICogd2hpY2ggYXJlIG1lcmdlZCB3aXRoIGFjdGl2YXRlZCBzdHlsZXMgYW5kIHVzZWQgYXMgZmFsbGJhY2tzLlxuICAgKi9cbiAgQElucHV0KCdjbGFzcycpXG4gIHNldCBrbGFzcyh2YWw6IHN0cmluZykge1xuICAgIHRoaXMubmdDbGFzc0luc3RhbmNlLmtsYXNzID0gdmFsO1xuICAgIHRoaXMuc2V0VmFsdWUodmFsLCAnJyk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHN0eWxlcjogU3R5bGVVdGlscyxcbiAgICBtYXJzaGFsOiBNZWRpYU1hcnNoYWxsZXIsXG4gICAgaXRlcmFibGVEaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMsXG4gICAga2V5VmFsdWVEaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnMsXG4gICAgcmVuZGVyZXIyOiBSZW5kZXJlcjIsXG4gICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBwcm90ZWN0ZWQgcmVhZG9ubHkgbmdDbGFzc0luc3RhbmNlOiBOZ0NsYXNzKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZiwgbnVsbCEsIHN0eWxlciwgbWFyc2hhbCk7XG4gICAgaWYgKCF0aGlzLm5nQ2xhc3NJbnN0YW5jZSkge1xuICAgICAgLy8gQ3JlYXRlIGFuIGluc3RhbmNlIE5nQ2xhc3MgRGlyZWN0aXZlIGluc3RhbmNlIG9ubHkgaWYgYG5nQ2xhc3M9XCJcImAgaGFzIE5PVCBiZWVuIGRlZmluZWQgb25cbiAgICAgIC8vIHRoZSBzYW1lIGhvc3QgZWxlbWVudDsgc2luY2UgdGhlIHJlc3BvbnNpdmUgdmFyaWF0aW9ucyBtYXkgYmUgZGVmaW5lZC4uLlxuICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgICAgLy8gVXBncmFkZSB0byBBbmd1bGFyIDE4IGJyb2tlIHRoaXNcbiAgICAgIC8vaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9jb21taXQvMWJlNmIwYTU4YTllOTZmOWYwYmRhOGFjYjYzYzcwMWY3OTJlNDY5YlxuICAgICAgLy8gdGhpcy5uZ0NsYXNzSW5zdGFuY2UgPSBuZXcgTmdDbGFzcyhpdGVyYWJsZURpZmZlcnMsIGtleVZhbHVlRGlmZmVycywgZWxlbWVudFJlZiwgcmVuZGVyZXIyKTtcbiAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgICAgdGhpcy5uZ0NsYXNzSW5zdGFuY2UgPSBuZXcgTmdDbGFzcyhlbGVtZW50UmVmLCByZW5kZXJlcjIpO1xuICAgIH1cbiAgICB0aGlzLmluaXQoKTtcbiAgICB0aGlzLnNldFZhbHVlKCcnLCAnJyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdXBkYXRlV2l0aFZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLm5nQ2xhc3NJbnN0YW5jZS5uZ0NsYXNzID0gdmFsdWU7XG4gICAgdGhpcy5uZ0RvQ2hlY2soKTtcbiAgfVxuXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAvLyBMaWZlY3ljbGUgSG9va3NcbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cbiAgLyoqXG4gICAqIEZvciBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5vblB1c2ggYW5kIG5nT25DaGFuZ2VzKCkgdXBkYXRlc1xuICAgKi9cbiAgbmdEb0NoZWNrKCkge1xuICAgIC8vIG5nRG9DaGVjayBvbmx5IHRvIGFwcGxpY2FibGUgcmVuZGVyZXJzXG4gICAgaWYgKHRoaXMubmdDbGFzc0luc3RhbmNlW1wiX3JlbmRlcmVyXCJdICYmIFwiYWRkQ2xhc3NcIiBpbiB0aGlzLm5nQ2xhc3NJbnN0YW5jZVtcIl9yZW5kZXJlclwiXSlcbiAgICAgIHRoaXMubmdDbGFzc0luc3RhbmNlLm5nRG9DaGVjaygpO1xuICB9XG59XG5cbmNvbnN0IGlucHV0cyA9IFtcbiAgJ25nQ2xhc3MnLCAnbmdDbGFzcy54cycsICduZ0NsYXNzLnNtJywgJ25nQ2xhc3MubWQnLCAnbmdDbGFzcy5sZycsICduZ0NsYXNzLnhsJyxcbiAgJ25nQ2xhc3MubHQtc20nLCAnbmdDbGFzcy5sdC1tZCcsICduZ0NsYXNzLmx0LWxnJywgJ25nQ2xhc3MubHQteGwnLFxuICAnbmdDbGFzcy5ndC14cycsICduZ0NsYXNzLmd0LXNtJywgJ25nQ2xhc3MuZ3QtbWQnLCAnbmdDbGFzcy5ndC1sZydcbl07XG5cbmNvbnN0IHNlbGVjdG9yID0gYFxuICBbbmdDbGFzc10sIFtuZ0NsYXNzLnhzXSwgW25nQ2xhc3Muc21dLCBbbmdDbGFzcy5tZF0sIFtuZ0NsYXNzLmxnXSwgW25nQ2xhc3MueGxdLFxuICBbbmdDbGFzcy5sdC1zbV0sIFtuZ0NsYXNzLmx0LW1kXSwgW25nQ2xhc3MubHQtbGddLCBbbmdDbGFzcy5sdC14bF0sXG4gIFtuZ0NsYXNzLmd0LXhzXSwgW25nQ2xhc3MuZ3Qtc21dLCBbbmdDbGFzcy5ndC1tZF0sIFtuZ0NsYXNzLmd0LWxnXVxuYDtcblxuLyoqXG4gKiBEaXJlY3RpdmUgdG8gYWRkIHJlc3BvbnNpdmUgc3VwcG9ydCBmb3IgbmdDbGFzcy5cbiAqIFRoaXMgbWFpbnRhaW5zIHRoZSBjb3JlIGZ1bmN0aW9uYWxpdHkgb2YgJ25nQ2xhc3MnIGFuZCBhZGRzIHJlc3BvbnNpdmUgQVBJXG4gKiBOb3RlOiB0aGlzIGNsYXNzIGlzIGEgbm8tb3Agd2hlbiByZW5kZXJlZCBvbiB0aGUgc2VydmVyXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvciwgaW5wdXRzIH0pXG5leHBvcnQgY2xhc3MgRGVmYXVsdENsYXNzRGlyZWN0aXZlIGV4dGVuZHMgQ2xhc3NEaXJlY3RpdmUge1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgaW5wdXRzID0gaW5wdXRzO1xufVxuIl19