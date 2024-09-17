/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { isPlatformServer } from '@angular/common';
import { Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { BREAKPOINT, DEFAULT_CONFIG, LAYOUT_CONFIG, SERVER_TOKEN } from 'ngx-flexible-layout/core';
import { ExtendedModule } from 'ngx-flexible-layout/extended';
import { FlexModule } from 'ngx-flexible-layout/flex';
import { GridModule } from 'ngx-flexible-layout/grid';
import * as i0 from "@angular/core";
/**
 * FlexLayoutModule -- the main import for all utilities in the Angular Layout library
 * * Will automatically provide Flex, Grid, and Extended modules for use in the application
 * * Can be configured using the static withConfig method, options viewable on the Wiki's
 *   Configuration page
 */
export class FlexLayoutModule {
    /**
     * Initialize the FlexLayoutModule with a set of config options,
     * which sets the corresponding tokens accordingly
     */
    static withConfig(configOptions, 
    // tslint:disable-next-line:max-line-length
    breakpoints = []) {
        return {
            ngModule: FlexLayoutModule,
            providers: configOptions.serverLoaded ?
                [
                    { provide: LAYOUT_CONFIG, useValue: { ...DEFAULT_CONFIG, ...configOptions } },
                    { provide: BREAKPOINT, useValue: breakpoints, multi: true },
                    { provide: SERVER_TOKEN, useValue: true },
                ] : [
                { provide: LAYOUT_CONFIG, useValue: { ...DEFAULT_CONFIG, ...configOptions } },
                { provide: BREAKPOINT, useValue: breakpoints, multi: true },
            ]
        };
    }
    constructor(serverModuleLoaded, platformId) {
        if (isPlatformServer(platformId) && !serverModuleLoaded) {
            console.warn('Warning: Flex Layout loaded on the server without FlexLayoutServerModule');
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: FlexLayoutModule, deps: [{ token: SERVER_TOKEN }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.0", ngImport: i0, type: FlexLayoutModule, imports: [FlexModule, ExtendedModule, GridModule], exports: [FlexModule, ExtendedModule, GridModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: FlexLayoutModule, imports: [FlexModule, ExtendedModule, GridModule, FlexModule, ExtendedModule, GridModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: FlexLayoutModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [FlexModule, ExtendedModule, GridModule],
                    exports: [FlexModule, ExtendedModule, GridModule]
                }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [SERVER_TOKEN]
                }] }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlicy9mbGV4LWxheW91dC9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbkQsT0FBTyxFQUFFLE1BQU0sRUFBdUIsUUFBUSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRixPQUFPLEVBRUgsVUFBVSxFQUFFLGNBQWMsRUFDMUIsYUFBYSxFQUFFLFlBQVksRUFDOUIsTUFBTSwwQkFBMEIsQ0FBQztBQUNsQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7QUFFdEQ7Ozs7O0dBS0c7QUFLSCxNQUFNLE9BQU8sZ0JBQWdCO0lBRTNCOzs7T0FHRztJQUNILE1BQU0sQ0FBQyxVQUFVLENBQUMsYUFBa0M7SUFDbEMsMkNBQTJDO0lBQzNDLGNBQXVDLEVBQUU7UUFDekQsT0FBTztZQUNMLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsU0FBUyxFQUFFLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDckM7b0JBQ0UsRUFBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxFQUFDLEdBQUcsY0FBYyxFQUFFLEdBQUcsYUFBYSxFQUFDLEVBQUM7b0JBQ3pFLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7b0JBQ3pELEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDO2lCQUN4QyxDQUFDLENBQUMsQ0FBQztnQkFDRixFQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLEVBQUMsR0FBRyxjQUFjLEVBQUUsR0FBRyxhQUFhLEVBQUMsRUFBQztnQkFDekUsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQzthQUMxRDtTQUNKLENBQUM7SUFDSixDQUFDO0lBRUQsWUFBa0Msa0JBQTJCLEVBQzVCLFVBQWtCO1FBQ2pELElBQUksZ0JBQWdCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQ3hELE9BQU8sQ0FBQyxJQUFJLENBQUMsMEVBQTBFLENBQUMsQ0FBQztRQUMzRixDQUFDO0lBQ0gsQ0FBQzt1R0E1QlUsZ0JBQWdCLGtCQXVCUCxZQUFZLGFBQ1osV0FBVzt3R0F4QnBCLGdCQUFnQixZQUhqQixVQUFVLEVBQUUsY0FBYyxFQUFFLFVBQVUsYUFDdEMsVUFBVSxFQUFFLGNBQWMsRUFBRSxVQUFVO3dHQUVyQyxnQkFBZ0IsWUFIakIsVUFBVSxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQ3RDLFVBQVUsRUFBRSxjQUFjLEVBQUUsVUFBVTs7MkZBRXJDLGdCQUFnQjtrQkFKNUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsY0FBYyxFQUFFLFVBQVUsQ0FBQztvQkFDakQsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLGNBQWMsRUFBRSxVQUFVLENBQUM7aUJBQ2xEOzswQkF3QmMsTUFBTTsyQkFBQyxZQUFZOzswQkFDbkIsTUFBTTsyQkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBpc1BsYXRmb3JtU2VydmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEluamVjdCwgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gICAgQnJlYWtQb2ludCxcbiAgICBCUkVBS1BPSU5ULCBERUZBVUxUX0NPTkZJRywgTGF5b3V0Q29uZmlnT3B0aW9ucyxcbiAgICBMQVlPVVRfQ09ORklHLCBTRVJWRVJfVE9LRU5cbn0gZnJvbSAnbmd4LWZsZXhpYmxlLWxheW91dC9jb3JlJztcbmltcG9ydCB7IEV4dGVuZGVkTW9kdWxlIH0gZnJvbSAnbmd4LWZsZXhpYmxlLWxheW91dC9leHRlbmRlZCc7XG5pbXBvcnQgeyBGbGV4TW9kdWxlIH0gZnJvbSAnbmd4LWZsZXhpYmxlLWxheW91dC9mbGV4JztcbmltcG9ydCB7IEdyaWRNb2R1bGUgfSBmcm9tICduZ3gtZmxleGlibGUtbGF5b3V0L2dyaWQnO1xuXG4vKipcbiAqIEZsZXhMYXlvdXRNb2R1bGUgLS0gdGhlIG1haW4gaW1wb3J0IGZvciBhbGwgdXRpbGl0aWVzIGluIHRoZSBBbmd1bGFyIExheW91dCBsaWJyYXJ5XG4gKiAqIFdpbGwgYXV0b21hdGljYWxseSBwcm92aWRlIEZsZXgsIEdyaWQsIGFuZCBFeHRlbmRlZCBtb2R1bGVzIGZvciB1c2UgaW4gdGhlIGFwcGxpY2F0aW9uXG4gKiAqIENhbiBiZSBjb25maWd1cmVkIHVzaW5nIHRoZSBzdGF0aWMgd2l0aENvbmZpZyBtZXRob2QsIG9wdGlvbnMgdmlld2FibGUgb24gdGhlIFdpa2knc1xuICogICBDb25maWd1cmF0aW9uIHBhZ2VcbiAqL1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0ZsZXhNb2R1bGUsIEV4dGVuZGVkTW9kdWxlLCBHcmlkTW9kdWxlXSxcbiAgZXhwb3J0czogW0ZsZXhNb2R1bGUsIEV4dGVuZGVkTW9kdWxlLCBHcmlkTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBGbGV4TGF5b3V0TW9kdWxlIHtcblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgRmxleExheW91dE1vZHVsZSB3aXRoIGEgc2V0IG9mIGNvbmZpZyBvcHRpb25zLFxuICAgKiB3aGljaCBzZXRzIHRoZSBjb3JyZXNwb25kaW5nIHRva2VucyBhY2NvcmRpbmdseVxuICAgKi9cbiAgc3RhdGljIHdpdGhDb25maWcoY29uZmlnT3B0aW9uczogTGF5b3V0Q29uZmlnT3B0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50czogQnJlYWtQb2ludHxCcmVha1BvaW50W10gPSBbXSk6IE1vZHVsZVdpdGhQcm92aWRlcnM8RmxleExheW91dE1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogRmxleExheW91dE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogY29uZmlnT3B0aW9ucy5zZXJ2ZXJMb2FkZWQgP1xuICAgICAgICBbXG4gICAgICAgICAge3Byb3ZpZGU6IExBWU9VVF9DT05GSUcsIHVzZVZhbHVlOiB7Li4uREVGQVVMVF9DT05GSUcsIC4uLmNvbmZpZ09wdGlvbnN9fSxcbiAgICAgICAgICB7cHJvdmlkZTogQlJFQUtQT0lOVCwgdXNlVmFsdWU6IGJyZWFrcG9pbnRzLCBtdWx0aTogdHJ1ZX0sXG4gICAgICAgICAge3Byb3ZpZGU6IFNFUlZFUl9UT0tFTiwgdXNlVmFsdWU6IHRydWV9LFxuICAgICAgICBdIDogW1xuICAgICAgICAgIHtwcm92aWRlOiBMQVlPVVRfQ09ORklHLCB1c2VWYWx1ZTogey4uLkRFRkFVTFRfQ09ORklHLCAuLi5jb25maWdPcHRpb25zfX0sXG4gICAgICAgICAge3Byb3ZpZGU6IEJSRUFLUE9JTlQsIHVzZVZhbHVlOiBicmVha3BvaW50cywgbXVsdGk6IHRydWV9LFxuICAgICAgICBdXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoU0VSVkVSX1RPS0VOKSBzZXJ2ZXJNb2R1bGVMb2FkZWQ6IGJvb2xlYW4sXG4gICAgICAgICAgICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHBsYXRmb3JtSWQ6IE9iamVjdCkge1xuICAgIGlmIChpc1BsYXRmb3JtU2VydmVyKHBsYXRmb3JtSWQpICYmICFzZXJ2ZXJNb2R1bGVMb2FkZWQpIHtcbiAgICAgIGNvbnNvbGUud2FybignV2FybmluZzogRmxleCBMYXlvdXQgbG9hZGVkIG9uIHRoZSBzZXJ2ZXIgd2l0aG91dCBGbGV4TGF5b3V0U2VydmVyTW9kdWxlJyk7XG4gICAgfVxuICB9XG59XG4iXX0=