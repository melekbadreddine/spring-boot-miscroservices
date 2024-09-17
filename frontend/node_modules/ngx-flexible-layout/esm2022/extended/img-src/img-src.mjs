/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { isPlatformServer } from '@angular/common';
import { Directive, Inject, Injectable, Input, PLATFORM_ID } from '@angular/core';
import { BaseDirective2, SERVER_TOKEN, StyleBuilder } from 'ngx-flexible-layout/core';
import * as i0 from "@angular/core";
import * as i1 from "ngx-flexible-layout/core";
export class ImgSrcStyleBuilder extends StyleBuilder {
    buildStyles(url) {
        return { 'content': url ? `url(${url})` : '' };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: ImgSrcStyleBuilder, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: ImgSrcStyleBuilder, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: ImgSrcStyleBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
export class ImgSrcDirective extends BaseDirective2 {
    platformId;
    serverModuleLoaded;
    DIRECTIVE_KEY = 'img-src';
    defaultSrc = '';
    set src(val) {
        this.defaultSrc = val;
        this.setValue(this.defaultSrc, '');
    }
    constructor(elementRef, styleBuilder, styler, marshal, platformId, serverModuleLoaded) {
        super(elementRef, styleBuilder, styler, marshal);
        this.platformId = platformId;
        this.serverModuleLoaded = serverModuleLoaded;
        this.init();
        this.setValue(this.nativeElement.getAttribute('src') || '', '');
        if (isPlatformServer(this.platformId) && this.serverModuleLoaded) {
            this.nativeElement.setAttribute('src', '');
        }
    }
    /**
     * Use the [responsively] activated input value to update
     * the host img src attribute or assign a default `img.src=''`
     * if the src has not been defined.
     *
     * Do nothing to standard `<img src="">` usages, only when responsive
     * keys are present do we actually call `setAttribute()`
     */
    updateWithValue(value) {
        const url = value || this.defaultSrc;
        if (isPlatformServer(this.platformId) && this.serverModuleLoaded) {
            this.addStyles(url);
        }
        else {
            this.nativeElement.setAttribute('src', url);
        }
    }
    styleCache = imgSrcCache;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: ImgSrcDirective, deps: [{ token: i0.ElementRef }, { token: ImgSrcStyleBuilder }, { token: i1.StyleUtils }, { token: i1.MediaMarshaller }, { token: PLATFORM_ID }, { token: SERVER_TOKEN }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0", type: ImgSrcDirective, inputs: { src: "src" }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: ImgSrcDirective, decorators: [{
            type: Directive
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: ImgSrcStyleBuilder }, { type: i1.StyleUtils }, { type: i1.MediaMarshaller }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [SERVER_TOKEN]
                }] }], propDecorators: { src: [{
                type: Input,
                args: ['src']
            }] } });
const imgSrcCache = new Map();
const inputs = [
    'src.xs', 'src.sm', 'src.md', 'src.lg', 'src.xl',
    'src.lt-sm', 'src.lt-md', 'src.lt-lg', 'src.lt-xl',
    'src.gt-xs', 'src.gt-sm', 'src.gt-md', 'src.gt-lg'
];
const selector = `
  img[src.xs],    img[src.sm],    img[src.md],    img[src.lg],   img[src.xl],
  img[src.lt-sm], img[src.lt-md], img[src.lt-lg], img[src.lt-xl],
  img[src.gt-xs], img[src.gt-sm], img[src.gt-md], img[src.gt-lg]
`;
/**
 * This directive provides a responsive API for the HTML <img> 'src' attribute
 * and will update the img.src property upon each responsive activation.
 *
 * e.g.
 *      <img src="defaultScene.jpg" src.xs="mobileScene.jpg"></img>
 *
 * @see https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-src/
 */
export class DefaultImgSrcDirective extends ImgSrcDirective {
    inputs = inputs;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: DefaultImgSrcDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0", type: DefaultImgSrcDirective, selector: "\n  img[src.xs],    img[src.sm],    img[src.md],    img[src.lg],   img[src.xl],\n  img[src.lt-sm], img[src.lt-md], img[src.lt-lg], img[src.lt-xl],\n  img[src.gt-xs], img[src.gt-sm], img[src.gt-md], img[src.gt-lg]\n", inputs: { "src.xs": "src.xs", "src.sm": "src.sm", "src.md": "src.md", "src.lg": "src.lg", "src.xl": "src.xl", "src.lt-sm": "src.lt-sm", "src.lt-md": "src.lt-md", "src.lt-lg": "src.lt-lg", "src.lt-xl": "src.lt-xl", "src.gt-xs": "src.gt-xs", "src.gt-sm": "src.gt-sm", "src.gt-md": "src.gt-md", "src.gt-lg": "src.gt-lg" }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: DefaultImgSrcDirective, decorators: [{
            type: Directive,
            args: [{ selector, inputs }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1nLXNyYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpYnMvZmxleC1sYXlvdXQvZXh0ZW5kZWQvaW1nLXNyYy9pbWctc3JjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxTQUFTLEVBQWMsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlGLE9BQU8sRUFDSCxjQUFjLEVBQW1CLFlBQVksRUFDN0MsWUFBWSxFQUdmLE1BQU0sMEJBQTBCLENBQUM7OztBQUdsQyxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsWUFBWTtJQUNsRCxXQUFXLENBQUMsR0FBVztRQUNyQixPQUFPLEVBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFDLENBQUM7SUFDL0MsQ0FBQzt1R0FIVSxrQkFBa0I7MkdBQWxCLGtCQUFrQixjQUROLE1BQU07OzJGQUNsQixrQkFBa0I7a0JBRDlCLFVBQVU7bUJBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDOztBQVFoQyxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxjQUFjO0lBY047SUFDQztJQWR6QixhQUFhLEdBQUcsU0FBUyxDQUFDO0lBQ25DLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFFMUIsSUFDSSxHQUFHLENBQUMsR0FBVztRQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELFlBQVksVUFBc0IsRUFDdEIsWUFBZ0MsRUFDaEMsTUFBa0IsRUFDbEIsT0FBd0IsRUFDTyxVQUFrQixFQUNqQixrQkFBMkI7UUFDckUsS0FBSyxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRlIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUNqQix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQVM7UUFFckUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDaEUsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDakUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLENBQUM7SUFDSCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNnQixlQUFlLENBQUMsS0FBYztRQUMvQyxNQUFNLEdBQUcsR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNyQyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUNqRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLENBQUM7YUFBTSxDQUFDO1lBQ04sSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzlDLENBQUM7SUFDSCxDQUFDO0lBRWtCLFVBQVUsR0FBRyxXQUFXLENBQUM7dUdBekNqQyxlQUFlLG9JQWNOLFdBQVcsYUFDWCxZQUFZOzJGQWZyQixlQUFlOzsyRkFBZixlQUFlO2tCQUQzQixTQUFTOzswQkFlSyxNQUFNOzJCQUFDLFdBQVc7OzBCQUNsQixNQUFNOzJCQUFDLFlBQVk7eUNBVjVCLEdBQUc7c0JBRE4sS0FBSzt1QkFBQyxLQUFLOztBQXdDZCxNQUFNLFdBQVcsR0FBaUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUU1RCxNQUFNLE1BQU0sR0FBRztJQUNiLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRO0lBQ2hELFdBQVcsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFdBQVc7SUFDbEQsV0FBVyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsV0FBVztDQUNuRCxDQUFDO0FBRUYsTUFBTSxRQUFRLEdBQUc7Ozs7Q0FJaEIsQ0FBQztBQUVGOzs7Ozs7OztHQVFHO0FBRUgsTUFBTSxPQUFPLHNCQUF1QixTQUFRLGVBQWU7SUFDdEMsTUFBTSxHQUFHLE1BQU0sQ0FBQzt1R0FEeEIsc0JBQXNCOzJGQUF0QixzQkFBc0I7OzJGQUF0QixzQkFBc0I7a0JBRGxDLFNBQVM7bUJBQUMsRUFBQyxRQUFRLEVBQUUsTUFBTSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBpc1BsYXRmb3JtU2VydmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5qZWN0LCBJbmplY3RhYmxlLCBJbnB1dCwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQmFzZURpcmVjdGl2ZTIsIE1lZGlhTWFyc2hhbGxlciwgU0VSVkVSX1RPS0VOLFxuICAgIFN0eWxlQnVpbGRlcixcbiAgICBTdHlsZURlZmluaXRpb24sXG4gICAgU3R5bGVVdGlsc1xufSBmcm9tICduZ3gtZmxleGlibGUtbGF5b3V0L2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBJbWdTcmNTdHlsZUJ1aWxkZXIgZXh0ZW5kcyBTdHlsZUJ1aWxkZXIge1xuICBidWlsZFN0eWxlcyh1cmw6IHN0cmluZykge1xuICAgIHJldHVybiB7J2NvbnRlbnQnOiB1cmwgPyBgdXJsKCR7dXJsfSlgIDogJyd9O1xuICB9XG59XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGNsYXNzIEltZ1NyY0RpcmVjdGl2ZSBleHRlbmRzIEJhc2VEaXJlY3RpdmUyIHtcbiAgcHJvdGVjdGVkIG92ZXJyaWRlIERJUkVDVElWRV9LRVkgPSAnaW1nLXNyYyc7XG4gIHByb3RlY3RlZCBkZWZhdWx0U3JjID0gJyc7XG5cbiAgQElucHV0KCdzcmMnKVxuICBzZXQgc3JjKHZhbDogc3RyaW5nKSB7XG4gICAgdGhpcy5kZWZhdWx0U3JjID0gdmFsO1xuICAgIHRoaXMuc2V0VmFsdWUodGhpcy5kZWZhdWx0U3JjLCAnJyk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBzdHlsZUJ1aWxkZXI6IEltZ1NyY1N0eWxlQnVpbGRlcixcbiAgICAgICAgICAgICAgc3R5bGVyOiBTdHlsZVV0aWxzLFxuICAgICAgICAgICAgICBtYXJzaGFsOiBNZWRpYU1hcnNoYWxsZXIsXG4gICAgICAgICAgICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByb3RlY3RlZCBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgICAgICAgICAgIEBJbmplY3QoU0VSVkVSX1RPS0VOKSBwcm90ZWN0ZWQgc2VydmVyTW9kdWxlTG9hZGVkOiBib29sZWFuKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZiwgc3R5bGVCdWlsZGVyLCBzdHlsZXIsIG1hcnNoYWwpO1xuICAgIHRoaXMuaW5pdCgpO1xuICAgIHRoaXMuc2V0VmFsdWUodGhpcy5uYXRpdmVFbGVtZW50LmdldEF0dHJpYnV0ZSgnc3JjJykgfHwgJycsICcnKTtcbiAgICBpZiAoaXNQbGF0Zm9ybVNlcnZlcih0aGlzLnBsYXRmb3JtSWQpICYmIHRoaXMuc2VydmVyTW9kdWxlTG9hZGVkKSB7XG4gICAgICB0aGlzLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdzcmMnLCAnJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGUgW3Jlc3BvbnNpdmVseV0gYWN0aXZhdGVkIGlucHV0IHZhbHVlIHRvIHVwZGF0ZVxuICAgKiB0aGUgaG9zdCBpbWcgc3JjIGF0dHJpYnV0ZSBvciBhc3NpZ24gYSBkZWZhdWx0IGBpbWcuc3JjPScnYFxuICAgKiBpZiB0aGUgc3JjIGhhcyBub3QgYmVlbiBkZWZpbmVkLlxuICAgKlxuICAgKiBEbyBub3RoaW5nIHRvIHN0YW5kYXJkIGA8aW1nIHNyYz1cIlwiPmAgdXNhZ2VzLCBvbmx5IHdoZW4gcmVzcG9uc2l2ZVxuICAgKiBrZXlzIGFyZSBwcmVzZW50IGRvIHdlIGFjdHVhbGx5IGNhbGwgYHNldEF0dHJpYnV0ZSgpYFxuICAgKi9cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIHVwZGF0ZVdpdGhWYWx1ZSh2YWx1ZT86IHN0cmluZykge1xuICAgIGNvbnN0IHVybCA9IHZhbHVlIHx8IHRoaXMuZGVmYXVsdFNyYztcbiAgICBpZiAoaXNQbGF0Zm9ybVNlcnZlcih0aGlzLnBsYXRmb3JtSWQpICYmIHRoaXMuc2VydmVyTW9kdWxlTG9hZGVkKSB7XG4gICAgICB0aGlzLmFkZFN0eWxlcyh1cmwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdzcmMnLCB1cmwpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBvdmVycmlkZSBzdHlsZUNhY2hlID0gaW1nU3JjQ2FjaGU7XG59XG5cbmNvbnN0IGltZ1NyY0NhY2hlOiBNYXA8c3RyaW5nLCBTdHlsZURlZmluaXRpb24+ID0gbmV3IE1hcCgpO1xuXG5jb25zdCBpbnB1dHMgPSBbXG4gICdzcmMueHMnLCAnc3JjLnNtJywgJ3NyYy5tZCcsICdzcmMubGcnLCAnc3JjLnhsJyxcbiAgJ3NyYy5sdC1zbScsICdzcmMubHQtbWQnLCAnc3JjLmx0LWxnJywgJ3NyYy5sdC14bCcsXG4gICdzcmMuZ3QteHMnLCAnc3JjLmd0LXNtJywgJ3NyYy5ndC1tZCcsICdzcmMuZ3QtbGcnXG5dO1xuXG5jb25zdCBzZWxlY3RvciA9IGBcbiAgaW1nW3NyYy54c10sICAgIGltZ1tzcmMuc21dLCAgICBpbWdbc3JjLm1kXSwgICAgaW1nW3NyYy5sZ10sICAgaW1nW3NyYy54bF0sXG4gIGltZ1tzcmMubHQtc21dLCBpbWdbc3JjLmx0LW1kXSwgaW1nW3NyYy5sdC1sZ10sIGltZ1tzcmMubHQteGxdLFxuICBpbWdbc3JjLmd0LXhzXSwgaW1nW3NyYy5ndC1zbV0sIGltZ1tzcmMuZ3QtbWRdLCBpbWdbc3JjLmd0LWxnXVxuYDtcblxuLyoqXG4gKiBUaGlzIGRpcmVjdGl2ZSBwcm92aWRlcyBhIHJlc3BvbnNpdmUgQVBJIGZvciB0aGUgSFRNTCA8aW1nPiAnc3JjJyBhdHRyaWJ1dGVcbiAqIGFuZCB3aWxsIHVwZGF0ZSB0aGUgaW1nLnNyYyBwcm9wZXJ0eSB1cG9uIGVhY2ggcmVzcG9uc2l2ZSBhY3RpdmF0aW9uLlxuICpcbiAqIGUuZy5cbiAqICAgICAgPGltZyBzcmM9XCJkZWZhdWx0U2NlbmUuanBnXCIgc3JjLnhzPVwibW9iaWxlU2NlbmUuanBnXCI+PC9pbWc+XG4gKlxuICogQHNlZSBodHRwczovL2Nzcy10cmlja3MuY29tL3Jlc3BvbnNpdmUtaW1hZ2VzLXlvdXJlLWp1c3QtY2hhbmdpbmctcmVzb2x1dGlvbnMtdXNlLXNyYy9cbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3IsIGlucHV0c30pXG5leHBvcnQgY2xhc3MgRGVmYXVsdEltZ1NyY0RpcmVjdGl2ZSBleHRlbmRzIEltZ1NyY0RpcmVjdGl2ZSB7XG4gIHByb3RlY3RlZCBvdmVycmlkZSBpbnB1dHMgPSBpbnB1dHM7XG59XG4iXX0=