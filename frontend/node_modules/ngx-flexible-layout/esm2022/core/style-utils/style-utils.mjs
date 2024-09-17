/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { applyCssPrefixes } from 'ngx-flexible-layout/_private-utils';
import { LAYOUT_CONFIG } from '../tokens/library-config';
import { SERVER_TOKEN } from '../tokens/server-token';
import * as i0 from "@angular/core";
import * as i1 from "../stylesheet-map/stylesheet-map";
export class StyleUtils {
    _serverStylesheet;
    _serverModuleLoaded;
    _platformId;
    layoutConfig;
    constructor(_serverStylesheet, _serverModuleLoaded, _platformId, layoutConfig) {
        this._serverStylesheet = _serverStylesheet;
        this._serverModuleLoaded = _serverModuleLoaded;
        this._platformId = _platformId;
        this.layoutConfig = layoutConfig;
    }
    /**
     * Applies styles given via string pair or object map to the directive element
     */
    applyStyleToElement(element, style, value = null) {
        let styles = {};
        if (typeof style === 'string') {
            styles[style] = value;
            style = styles;
        }
        styles = this.layoutConfig.disableVendorPrefixes ? style : applyCssPrefixes(style);
        this._applyMultiValueStyleToElement(styles, element);
    }
    /**
     * Applies styles given via string pair or object map to the directive's element
     */
    applyStyleToElements(style, elements = []) {
        const styles = this.layoutConfig.disableVendorPrefixes ? style : applyCssPrefixes(style);
        elements.forEach(el => {
            this._applyMultiValueStyleToElement(styles, el);
        });
    }
    /**
     * Determine the DOM element's Flexbox flow (flex-direction)
     *
     * Check inline style first then check computed (stylesheet) style
     */
    getFlowDirection(target) {
        const query = 'flex-direction';
        let value = this.lookupStyle(target, query);
        const hasInlineValue = this.lookupInlineStyle(target, query) ||
            (isPlatformServer(this._platformId) && this._serverModuleLoaded) ? value : '';
        return [value || 'row', hasInlineValue];
    }
    hasWrap(target) {
        const query = 'flex-wrap';
        return this.lookupStyle(target, query) === 'wrap';
    }
    /**
     * Find the DOM element's raw attribute value (if any)
     */
    lookupAttributeValue(element, attribute) {
        return element.getAttribute(attribute) ?? '';
    }
    /**
     * Find the DOM element's inline style value (if any)
     */
    lookupInlineStyle(element, styleName) {
        return isPlatformBrowser(this._platformId) ?
            element.style.getPropertyValue(styleName) : getServerStyle(element, styleName);
    }
    /**
     * Determine the inline or inherited CSS style
     * NOTE: platform-server has no implementation for getComputedStyle
     */
    lookupStyle(element, styleName, inlineOnly = false) {
        let value = '';
        if (element) {
            let immediateValue = value = this.lookupInlineStyle(element, styleName);
            if (!immediateValue) {
                if (isPlatformBrowser(this._platformId)) {
                    if (!inlineOnly) {
                        value = getComputedStyle(element).getPropertyValue(styleName);
                    }
                }
                else {
                    if (this._serverModuleLoaded) {
                        value = this._serverStylesheet.getStyleForElement(element, styleName);
                    }
                }
            }
        }
        // Note: 'inline' is the default of all elements, unless UA stylesheet overrides;
        //       in which case getComputedStyle() should determine a valid value.
        return value ? value.trim() : '';
    }
    /**
     * Applies the styles to the element. The styles object map may contain an array of values
     * Each value will be added as element style
     * Keys are sorted to add prefixed styles (like -webkit-x) first, before the standard ones
     */
    _applyMultiValueStyleToElement(styles, element) {
        Object.keys(styles).sort().forEach(key => {
            const el = styles[key];
            const values = Array.isArray(el) ? el : [el];
            values.sort();
            for (let value of values) {
                value = value ? value + '' : '';
                if (isPlatformBrowser(this._platformId) || !this._serverModuleLoaded) {
                    isPlatformBrowser(this._platformId) ?
                        element.style.setProperty(key, value) : setServerStyle(element, key, value);
                }
                else {
                    this._serverStylesheet.addStyleToElement(element, key, value);
                }
            }
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: StyleUtils, deps: [{ token: i1.StylesheetMap }, { token: SERVER_TOKEN }, { token: PLATFORM_ID }, { token: LAYOUT_CONFIG }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: StyleUtils, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: i0, type: StyleUtils, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i1.StylesheetMap }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [SERVER_TOKEN]
                }] }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [LAYOUT_CONFIG]
                }] }] });
function getServerStyle(element, styleName) {
    const styleMap = readStyleAttribute(element);
    return styleMap[styleName] ?? '';
}
function setServerStyle(element, styleName, styleValue) {
    styleName = styleName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    const styleMap = readStyleAttribute(element);
    styleMap[styleName] = styleValue ?? '';
    writeStyleAttribute(element, styleMap);
}
function writeStyleAttribute(element, styleMap) {
    let styleAttrValue = '';
    for (const key in styleMap) {
        const newValue = styleMap[key];
        if (newValue) {
            styleAttrValue += `${key}:${styleMap[key]};`;
        }
    }
    element.setAttribute('style', styleAttrValue);
}
function readStyleAttribute(element) {
    const styleMap = {};
    const styleAttribute = element.getAttribute('style');
    if (styleAttribute) {
        const styleList = styleAttribute.split(/;+/g);
        for (let i = 0; i < styleList.length; i++) {
            const style = styleList[i].trim();
            if (style.length > 0) {
                const colonIndex = style.indexOf(':');
                if (colonIndex === -1) {
                    throw new Error(`Invalid CSS style: ${style}`);
                }
                const name = style.substr(0, colonIndex).trim();
                styleMap[name] = style.substr(colonIndex + 1).trim();
            }
        }
    }
    return styleMap;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUtdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWJzL2ZsZXgtbGF5b3V0L2NvcmUvc3R5bGUtdXRpbHMvc3R5bGUtdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWhFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRXRFLE9BQU8sRUFBdUIsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDOUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7QUFHdEQsTUFBTSxPQUFPLFVBQVU7SUFFRDtJQUNzQjtJQUNEO0lBQ0U7SUFIM0MsWUFBb0IsaUJBQWdDLEVBQ1YsbUJBQTRCLEVBQzdCLFdBQW1CLEVBQ2pCLFlBQWlDO1FBSHhELHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBZTtRQUNWLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBUztRQUM3QixnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUNqQixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7SUFBRyxDQUFDO0lBRWhGOztPQUVHO0lBQ0gsbUJBQW1CLENBQUMsT0FBb0IsRUFDcEIsS0FBK0IsRUFDL0IsUUFBZ0MsSUFBSTtRQUN0RCxJQUFJLE1BQU0sR0FBb0IsRUFBRSxDQUFDO1FBQ2pDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDOUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUN0QixLQUFLLEdBQUcsTUFBTSxDQUFDO1FBQ2pCLENBQUM7UUFDRCxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVks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b250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIsIGlzUGxhdGZvcm1TZXJ2ZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBhcHBseUNzc1ByZWZpeGVzIH0gZnJvbSAnbmd4LWZsZXhpYmxlLWxheW91dC9fcHJpdmF0ZS11dGlscyc7XG5pbXBvcnQgeyBTdHlsZXNoZWV0TWFwIH0gZnJvbSAnLi4vc3R5bGVzaGVldC1tYXAvc3R5bGVzaGVldC1tYXAnO1xuaW1wb3J0IHsgTGF5b3V0Q29uZmlnT3B0aW9ucywgTEFZT1VUX0NPTkZJRyB9IGZyb20gJy4uL3Rva2Vucy9saWJyYXJ5LWNvbmZpZyc7XG5pbXBvcnQgeyBTRVJWRVJfVE9LRU4gfSBmcm9tICcuLi90b2tlbnMvc2VydmVyLXRva2VuJztcblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgU3R5bGVVdGlscyB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VydmVyU3R5bGVzaGVldDogU3R5bGVzaGVldE1hcCxcbiAgICAgICAgICAgICAgQEluamVjdChTRVJWRVJfVE9LRU4pIHByaXZhdGUgX3NlcnZlck1vZHVsZUxvYWRlZDogYm9vbGVhbixcbiAgICAgICAgICAgICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBfcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgICAgICAgICAgICBASW5qZWN0KExBWU9VVF9DT05GSUcpIHByaXZhdGUgbGF5b3V0Q29uZmlnOiBMYXlvdXRDb25maWdPcHRpb25zKSB7fVxuXG4gIC8qKlxuICAgKiBBcHBsaWVzIHN0eWxlcyBnaXZlbiB2aWEgc3RyaW5nIHBhaXIgb3Igb2JqZWN0IG1hcCB0byB0aGUgZGlyZWN0aXZlIGVsZW1lbnRcbiAgICovXG4gIGFwcGx5U3R5bGVUb0VsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IFN0eWxlRGVmaW5pdGlvbiB8IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCA9IG51bGwpIHtcbiAgICBsZXQgc3R5bGVzOiBTdHlsZURlZmluaXRpb24gPSB7fTtcbiAgICBpZiAodHlwZW9mIHN0eWxlID09PSAnc3RyaW5nJykge1xuICAgICAgc3R5bGVzW3N0eWxlXSA9IHZhbHVlO1xuICAgICAgc3R5bGUgPSBzdHlsZXM7XG4gICAgfVxuICAgIHN0eWxlcyA9IHRoaXMubGF5b3V0Q29uZmlnLmRpc2FibGVWZW5kb3JQcmVmaXhlcyA/IHN0eWxlIDogYXBwbHlDc3NQcmVmaXhlcyhzdHlsZSk7XG4gICAgdGhpcy5fYXBwbHlNdWx0aVZhbHVlU3R5bGVUb0VsZW1lbnQoc3R5bGVzLCBlbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBsaWVzIHN0eWxlcyBnaXZlbiB2aWEgc3RyaW5nIHBhaXIgb3Igb2JqZWN0IG1hcCB0byB0aGUgZGlyZWN0aXZlJ3MgZWxlbWVudFxuICAgKi9cbiAgYXBwbHlTdHlsZVRvRWxlbWVudHMoc3R5bGU6IFN0eWxlRGVmaW5pdGlvbiwgZWxlbWVudHM6IEhUTUxFbGVtZW50W10gPSBbXSkge1xuICAgIGNvbnN0IHN0eWxlcyA9IHRoaXMubGF5b3V0Q29uZmlnLmRpc2FibGVWZW5kb3JQcmVmaXhlcyA/IHN0eWxlIDogYXBwbHlDc3NQcmVmaXhlcyhzdHlsZSk7XG4gICAgZWxlbWVudHMuZm9yRWFjaChlbCA9PiB7XG4gICAgICB0aGlzLl9hcHBseU11bHRpVmFsdWVTdHlsZVRvRWxlbWVudChzdHlsZXMsIGVsKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgdGhlIERPTSBlbGVtZW50J3MgRmxleGJveCBmbG93IChmbGV4LWRpcmVjdGlvbilcbiAgICpcbiAgICogQ2hlY2sgaW5saW5lIHN0eWxlIGZpcnN0IHRoZW4gY2hlY2sgY29tcHV0ZWQgKHN0eWxlc2hlZXQpIHN0eWxlXG4gICAqL1xuICBnZXRGbG93RGlyZWN0aW9uKHRhcmdldDogSFRNTEVsZW1lbnQpOiBbc3RyaW5nLCBzdHJpbmddIHtcbiAgICBjb25zdCBxdWVyeSA9ICdmbGV4LWRpcmVjdGlvbic7XG4gICAgbGV0IHZhbHVlID0gdGhpcy5sb29rdXBTdHlsZSh0YXJnZXQsIHF1ZXJ5KTtcbiAgICBjb25zdCBoYXNJbmxpbmVWYWx1ZSA9IHRoaXMubG9va3VwSW5saW5lU3R5bGUodGFyZ2V0LCBxdWVyeSkgfHxcbiAgICAoaXNQbGF0Zm9ybVNlcnZlcih0aGlzLl9wbGF0Zm9ybUlkKSAmJiB0aGlzLl9zZXJ2ZXJNb2R1bGVMb2FkZWQpID8gdmFsdWUgOiAnJztcblxuICAgIHJldHVybiBbdmFsdWUgfHwgJ3JvdycsIGhhc0lubGluZVZhbHVlXTtcbiAgfVxuXG4gIGhhc1dyYXAodGFyZ2V0OiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHF1ZXJ5ID0gJ2ZsZXgtd3JhcCc7XG4gICAgcmV0dXJuIHRoaXMubG9va3VwU3R5bGUodGFyZ2V0LCBxdWVyeSkgPT09ICd3cmFwJztcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHRoZSBET00gZWxlbWVudCdzIHJhdyBhdHRyaWJ1dGUgdmFsdWUgKGlmIGFueSlcbiAgICovXG4gIGxvb2t1cEF0dHJpYnV0ZVZhbHVlKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBhdHRyaWJ1dGU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSkgPz8gJyc7XG4gIH1cblxuICAvKipcbiAgICogRmluZCB0aGUgRE9NIGVsZW1lbnQncyBpbmxpbmUgc3R5bGUgdmFsdWUgKGlmIGFueSlcbiAgICovXG4gIGxvb2t1cElubGluZVN0eWxlKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBzdHlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMuX3BsYXRmb3JtSWQpID9cbiAgICAgIGVsZW1lbnQuc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShzdHlsZU5hbWUpIDogZ2V0U2VydmVyU3R5bGUoZWxlbWVudCwgc3R5bGVOYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgdGhlIGlubGluZSBvciBpbmhlcml0ZWQgQ1NTIHN0eWxlXG4gICAqIE5PVEU6IHBsYXRmb3JtLXNlcnZlciBoYXMgbm8gaW1wbGVtZW50YXRpb24gZm9yIGdldENvbXB1dGVkU3R5bGVcbiAgICovXG4gIGxvb2t1cFN0eWxlKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBzdHlsZU5hbWU6IHN0cmluZywgaW5saW5lT25seSA9IGZhbHNlKTogc3RyaW5nIHtcbiAgICBsZXQgdmFsdWUgPSAnJztcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgbGV0IGltbWVkaWF0ZVZhbHVlID0gdmFsdWUgPSB0aGlzLmxvb2t1cElubGluZVN0eWxlKGVsZW1lbnQsIHN0eWxlTmFtZSk7XG4gICAgICBpZiAoIWltbWVkaWF0ZVZhbHVlKSB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLl9wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgIGlmICghaW5saW5lT25seSkge1xuICAgICAgICAgICAgdmFsdWUgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoc3R5bGVOYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHRoaXMuX3NlcnZlck1vZHVsZUxvYWRlZCkge1xuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLl9zZXJ2ZXJTdHlsZXNoZWV0LmdldFN0eWxlRm9yRWxlbWVudChlbGVtZW50LCBzdHlsZU5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIE5vdGU6ICdpbmxpbmUnIGlzIHRoZSBkZWZhdWx0IG9mIGFsbCBlbGVtZW50cywgdW5sZXNzIFVBIHN0eWxlc2hlZXQgb3ZlcnJpZGVzO1xuICAgIC8vICAgICAgIGluIHdoaWNoIGNhc2UgZ2V0Q29tcHV0ZWRTdHlsZSgpIHNob3VsZCBkZXRlcm1pbmUgYSB2YWxpZCB2YWx1ZS5cbiAgICByZXR1cm4gdmFsdWUgPyB2YWx1ZS50cmltKCkgOiAnJztcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBsaWVzIHRoZSBzdHlsZXMgdG8gdGhlIGVsZW1lbnQuIFRoZSBzdHlsZXMgb2JqZWN0IG1hcCBtYXkgY29udGFpbiBhbiBhcnJheSBvZiB2YWx1ZXNcbiAgICogRWFjaCB2YWx1ZSB3aWxsIGJlIGFkZGVkIGFzIGVsZW1lbnQgc3R5bGVcbiAgICogS2V5cyBhcmUgc29ydGVkIHRvIGFkZCBwcmVmaXhlZCBzdHlsZXMgKGxpa2UgLXdlYmtpdC14KSBmaXJzdCwgYmVmb3JlIHRoZSBzdGFuZGFyZCBvbmVzXG4gICAqL1xuICBwcml2YXRlIF9hcHBseU11bHRpVmFsdWVTdHlsZVRvRWxlbWVudChzdHlsZXM6IFN0eWxlRGVmaW5pdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBPYmplY3Qua2V5cyhzdHlsZXMpLnNvcnQoKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBjb25zdCBlbCA9IHN0eWxlc1trZXldO1xuICAgICAgY29uc3QgdmFsdWVzOiAoc3RyaW5nIHwgbnVtYmVyIHwgbnVsbClbXSA9IEFycmF5LmlzQXJyYXkoZWwpID8gZWwgOiBbZWxdO1xuICAgICAgdmFsdWVzLnNvcnQoKTtcbiAgICAgIGZvciAobGV0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlID8gdmFsdWUgKyAnJyA6ICcnO1xuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5fcGxhdGZvcm1JZCkgfHwgIXRoaXMuX3NlcnZlck1vZHVsZUxvYWRlZCkge1xuICAgICAgICAgIGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMuX3BsYXRmb3JtSWQpID9cbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoa2V5LCB2YWx1ZSkgOiBzZXRTZXJ2ZXJTdHlsZShlbGVtZW50LCBrZXksIHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9zZXJ2ZXJTdHlsZXNoZWV0LmFkZFN0eWxlVG9FbGVtZW50KGVsZW1lbnQsIGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0U2VydmVyU3R5bGUoZWxlbWVudDogYW55LCBzdHlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IHN0eWxlTWFwID0gcmVhZFN0eWxlQXR0cmlidXRlKGVsZW1lbnQpO1xuICByZXR1cm4gc3R5bGVNYXBbc3R5bGVOYW1lXSA/PyAnJztcbn1cblxuZnVuY3Rpb24gc2V0U2VydmVyU3R5bGUoZWxlbWVudDogYW55LCBzdHlsZU5hbWU6IHN0cmluZywgc3R5bGVWYWx1ZT86IHN0cmluZ3xudWxsKSB7XG4gIHN0eWxlTmFtZSA9IHN0eWxlTmFtZS5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBzdHlsZU1hcCA9IHJlYWRTdHlsZUF0dHJpYnV0ZShlbGVtZW50KTtcbiAgc3R5bGVNYXBbc3R5bGVOYW1lXSA9IHN0eWxlVmFsdWUgPz8gJyc7XG4gIHdyaXRlU3R5bGVBdHRyaWJ1dGUoZWxlbWVudCwgc3R5bGVNYXApO1xufVxuXG5mdW5jdGlvbiB3cml0ZVN0eWxlQXR0cmlidXRlKGVsZW1lbnQ6IGFueSwgc3R5bGVNYXA6IHtbbmFtZTogc3RyaW5nXTogc3RyaW5nfSkge1xuICBsZXQgc3R5bGVBdHRyVmFsdWUgPSAnJztcbiAgZm9yIChjb25zdCBrZXkgaW4gc3R5bGVNYXApIHtcbiAgICBjb25zdCBuZXdWYWx1ZSA9IHN0eWxlTWFwW2tleV07XG4gICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICBzdHlsZUF0dHJWYWx1ZSArPSBgJHtrZXl9OiR7c3R5bGVNYXBba2V5XX07YDtcbiAgICB9XG4gIH1cbiAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgc3R5bGVBdHRyVmFsdWUpO1xufVxuXG5mdW5jdGlvbiByZWFkU3R5bGVBdHRyaWJ1dGUoZWxlbWVudDogYW55KToge1tuYW1lOiBzdHJpbmddOiBzdHJpbmd9IHtcbiAgY29uc3Qgc3R5bGVNYXA6IHtbbmFtZTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICBjb25zdCBzdHlsZUF0dHJpYnV0ZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdzdHlsZScpO1xuICBpZiAoc3R5bGVBdHRyaWJ1dGUpIHtcbiAgICBjb25zdCBzdHlsZUxpc3QgPSBzdHlsZUF0dHJpYnV0ZS5zcGxpdCgvOysvZyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHlsZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHN0eWxlID0gc3R5bGVMaXN0W2ldLnRyaW0oKTtcbiAgICAgIGlmIChzdHlsZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGNvbG9uSW5kZXggPSBzdHlsZS5pbmRleE9mKCc6Jyk7XG4gICAgICAgIGlmIChjb2xvbkluZGV4ID09PSAtMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBDU1Mgc3R5bGU6ICR7c3R5bGV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmFtZSA9IHN0eWxlLnN1YnN0cigwLCBjb2xvbkluZGV4KS50cmltKCk7XG4gICAgICAgIHN0eWxlTWFwW25hbWVdID0gc3R5bGUuc3Vic3RyKGNvbG9uSW5kZXggKyAxKS50cmltKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHlsZU1hcDtcbn1cblxuLyoqXG4gKiBEZWZpbml0aW9uIG9mIGEgY3NzIHN0eWxlLiBFaXRoZXIgYSBwcm9wZXJ0eSBuYW1lIChlLmcuIFwiZmxleC1iYXNpc1wiKSBvciBhbiBvYmplY3RcbiAqIG1hcCBvZiBwcm9wZXJ0eSBuYW1lIGFuZCB2YWx1ZSAoZS5nLiB7ZGlzcGxheTogJ25vbmUnLCBmbGV4LW9yZGVyOiA1fSlcbiAqL1xuZXhwb3J0IHR5cGUgU3R5bGVEZWZpbml0aW9uID0geyBbcHJvcGVydHk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB8IG51bGwgfTtcbiJdfQ==