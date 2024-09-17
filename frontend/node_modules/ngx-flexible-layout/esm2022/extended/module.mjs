/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { CoreModule } from 'ngx-flexible-layout/core';
import { DefaultClassDirective } from './class/class';
import { DefaultImgSrcDirective } from './img-src/img-src';
import { DefaultShowHideDirective } from './show-hide/show-hide';
import { DefaultStyleDirective } from './style/style';
import * as i0 from "@angular/core";
const ALL_DIRECTIVES = [
    DefaultShowHideDirective,
    DefaultClassDirective,
    DefaultStyleDirective,
    DefaultImgSrcDirective,
];
/**
 * *****************************************************************
 * Define module for the Extended API
 * *****************************************************************
 */
export class ExtendedModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: ExtendedModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.0", ngImport: i0, type: ExtendedModule, declarations: [DefaultShowHideDirective,
            DefaultClassDirective,
            DefaultStyleDirective,
            DefaultImgSrcDirective], imports: [CoreModule], exports: [DefaultShowHideDirective,
            DefaultClassDirective,
            DefaultStyleDirective,
            DefaultImgSrcDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: ExtendedModule, imports: [CoreModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: ExtendedModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CoreModule],
                    declarations: [...ALL_DIRECTIVES],
                    exports: [...ALL_DIRECTIVES]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlicy9mbGV4LWxheW91dC9leHRlbmRlZC9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFdEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzNELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFHdEQsTUFBTSxjQUFjLEdBQUc7SUFDckIsd0JBQXdCO0lBQ3hCLHFCQUFxQjtJQUNyQixxQkFBcUI7SUFDckIsc0JBQXNCO0NBQ3ZCLENBQUM7QUFFRjs7OztHQUlHO0FBT0gsTUFBTSxPQUFPLGNBQWM7dUdBQWQsY0FBYzt3R0FBZCxjQUFjLGlCQWpCekIsd0JBQXdCO1lBQ3hCLHFCQUFxQjtZQUNyQixxQkFBcUI7WUFDckIsc0JBQXNCLGFBVVosVUFBVSxhQWJwQix3QkFBd0I7WUFDeEIscUJBQXFCO1lBQ3JCLHFCQUFxQjtZQUNyQixzQkFBc0I7d0dBY1gsY0FBYyxZQUpmLFVBQVU7OzJGQUlULGNBQWM7a0JBTDFCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsVUFBVSxDQUFDO29CQUNyQixZQUFZLEVBQUUsQ0FBQyxHQUFHLGNBQWMsQ0FBQztvQkFDakMsT0FBTyxFQUFFLENBQUMsR0FBRyxjQUFjLENBQUM7aUJBQzdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29yZU1vZHVsZSB9IGZyb20gJ25neC1mbGV4aWJsZS1sYXlvdXQvY29yZSc7XG5cbmltcG9ydCB7IERlZmF1bHRDbGFzc0RpcmVjdGl2ZSB9IGZyb20gJy4vY2xhc3MvY2xhc3MnO1xuaW1wb3J0IHsgRGVmYXVsdEltZ1NyY0RpcmVjdGl2ZSB9IGZyb20gJy4vaW1nLXNyYy9pbWctc3JjJztcbmltcG9ydCB7IERlZmF1bHRTaG93SGlkZURpcmVjdGl2ZSB9IGZyb20gJy4vc2hvdy1oaWRlL3Nob3ctaGlkZSc7XG5pbXBvcnQgeyBEZWZhdWx0U3R5bGVEaXJlY3RpdmUgfSBmcm9tICcuL3N0eWxlL3N0eWxlJztcblxuXG5jb25zdCBBTExfRElSRUNUSVZFUyA9IFtcbiAgRGVmYXVsdFNob3dIaWRlRGlyZWN0aXZlLFxuICBEZWZhdWx0Q2xhc3NEaXJlY3RpdmUsXG4gIERlZmF1bHRTdHlsZURpcmVjdGl2ZSxcbiAgRGVmYXVsdEltZ1NyY0RpcmVjdGl2ZSxcbl07XG5cbi8qKlxuICogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIERlZmluZSBtb2R1bGUgZm9yIHRoZSBFeHRlbmRlZCBBUElcbiAqICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKi9cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvcmVNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFsuLi5BTExfRElSRUNUSVZFU10sXG4gIGV4cG9ydHM6IFsuLi5BTExfRElSRUNUSVZFU11cbn0pXG5leHBvcnQgY2xhc3MgRXh0ZW5kZWRNb2R1bGUge1xufVxuIl19