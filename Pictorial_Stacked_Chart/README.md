# Notes on Pictorial Stacked Chart x Kintone
* Using amCharts JS library
* amCharts_Demo is a recreation of amCharts demo sites

## Notes from amCharts
* [Pictorial Stacked Chart Demo](https://www.amcharts.com/demos/pictorial-stacked-chart/)
* 
* 
## CDN Link:
https://cdn.amcharts.com/lib/4/core.js

https://cdn.amcharts.com/lib/4/charts.js

https://cdn.amcharts.com/lib/4/themes/animated.js

## SVG
Water free icon by Freepik
https://www.flaticon.com/free-icon/water_824188

SVG Paths by MDN
https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths

## SVG data into amCharts
**maskSprite**
* https://www.amcharts.com/docs/v4/reference/pictorialstackedseries/#maskSprite_property
* A Sprite element that is used as a series mask.
* If set, this element's shape will be used to apply shape to the whole stacked pictorial series.
* You can use this element's path property to set an SVG path for the shape:
```
et iconPath = "M511.82,...";
series.maskSprite.path = iconPath;
```
* 
* 