/**
 * Class instances emitted [to observers] for each mql notification
 */
export class MediaChange {
    matches;
    mediaQuery;
    mqAlias;
    suffix;
    priority;
    property = '';
    value;
    /**
     * @param matches whether the mediaQuery is currently activated
     * @param mediaQuery e.g. (min-width: 600px) and (max-width: 959px)
     * @param mqAlias e.g. gt-sm, md, gt-lg
     * @param suffix e.g. GtSM, Md, GtLg
     * @param priority the priority of activation for the given breakpoint
     */
    constructor(matches = false, mediaQuery = 'all', mqAlias = '', suffix = '', priority = 0) {
        this.matches = matches;
        this.mediaQuery = mediaQuery;
        this.mqAlias = mqAlias;
        this.suffix = suffix;
        this.priority = priority;
    }
    /** Create an exact copy of the MediaChange */
    clone() {
        return new MediaChange(this.matches, this.mediaQuery, this.mqAlias, this.suffix);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEtY2hhbmdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlicy9mbGV4LWxheW91dC9jb3JlL21lZGlhLWNoYW5nZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFTQTs7R0FFRztBQUNILE1BQU0sT0FBTyxXQUFXO0lBV0g7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQWRuQixRQUFRLEdBQVcsRUFBRSxDQUFDO0lBQ3RCLEtBQUssQ0FBTTtJQUVYOzs7Ozs7T0FNRztJQUNILFlBQW1CLFVBQVUsS0FBSyxFQUNmLGFBQWEsS0FBSyxFQUNsQixVQUFVLEVBQUUsRUFDWixTQUFTLEVBQUUsRUFDWCxXQUFXLENBQUM7UUFKWixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUNsQixZQUFPLEdBQVAsT0FBTyxDQUFLO1FBQ1osV0FBTSxHQUFOLE1BQU0sQ0FBSztRQUNYLGFBQVEsR0FBUixRQUFRLENBQUk7SUFDL0IsQ0FBQztJQUVELDhDQUE4QztJQUM5QyxLQUFLO1FBQ0gsT0FBTyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkYsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5leHBvcnQgdHlwZSBNZWRpYVF1ZXJ5U3Vic2NyaWJlciA9IChjaGFuZ2VzOiBNZWRpYUNoYW5nZSkgPT4gdm9pZDtcblxuLyoqXG4gKiBDbGFzcyBpbnN0YW5jZXMgZW1pdHRlZCBbdG8gb2JzZXJ2ZXJzXSBmb3IgZWFjaCBtcWwgbm90aWZpY2F0aW9uXG4gKi9cbmV4cG9ydCBjbGFzcyBNZWRpYUNoYW5nZSB7XG4gIHByb3BlcnR5OiBzdHJpbmcgPSAnJztcbiAgdmFsdWU6IGFueTtcblxuICAvKipcbiAgICogQHBhcmFtIG1hdGNoZXMgd2hldGhlciB0aGUgbWVkaWFRdWVyeSBpcyBjdXJyZW50bHkgYWN0aXZhdGVkXG4gICAqIEBwYXJhbSBtZWRpYVF1ZXJ5IGUuZy4gKG1pbi13aWR0aDogNjAwcHgpIGFuZCAobWF4LXdpZHRoOiA5NTlweClcbiAgICogQHBhcmFtIG1xQWxpYXMgZS5nLiBndC1zbSwgbWQsIGd0LWxnXG4gICAqIEBwYXJhbSBzdWZmaXggZS5nLiBHdFNNLCBNZCwgR3RMZ1xuICAgKiBAcGFyYW0gcHJpb3JpdHkgdGhlIHByaW9yaXR5IG9mIGFjdGl2YXRpb24gZm9yIHRoZSBnaXZlbiBicmVha3BvaW50XG4gICAqL1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbWF0Y2hlcyA9IGZhbHNlLFxuICAgICAgICAgICAgICBwdWJsaWMgbWVkaWFRdWVyeSA9ICdhbGwnLFxuICAgICAgICAgICAgICBwdWJsaWMgbXFBbGlhcyA9ICcnLFxuICAgICAgICAgICAgICBwdWJsaWMgc3VmZml4ID0gJycsXG4gICAgICAgICAgICAgIHB1YmxpYyBwcmlvcml0eSA9IDApIHtcbiAgfVxuXG4gIC8qKiBDcmVhdGUgYW4gZXhhY3QgY29weSBvZiB0aGUgTWVkaWFDaGFuZ2UgKi9cbiAgY2xvbmUoKTogTWVkaWFDaGFuZ2Uge1xuICAgIHJldHVybiBuZXcgTWVkaWFDaGFuZ2UodGhpcy5tYXRjaGVzLCB0aGlzLm1lZGlhUXVlcnksIHRoaXMubXFBbGlhcywgdGhpcy5zdWZmaXgpO1xuICB9XG59XG5cblxuIl19