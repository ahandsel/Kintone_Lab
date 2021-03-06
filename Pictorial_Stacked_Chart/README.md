# Notes on Pictorial Stacked Chart x Kintone
* Using amCharts JS library
* amCharts_Demo is a recreation of amCharts demo sites

## Notes from amCharts
* [Pictorial Stacked Chart Demo](https://www.amcharts.com/demos/pictorial-stacked-chart/)
* [Anatomy of a Sliced Chart](https://www.amcharts.com/docs/v4/chart-types/sliced-chart/)
  * https://www.amcharts.com/docs/v4/chart-types/sliced-chart/#Pictorial_series
  * In a nutshell Pictorial series is just a straight Pyramid series with some cool mask applied on it.
  * An SVG path is series of codes, describing geometrical shapes. For more information about it visit this [Mozilla article](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths).

### Partially filled shapes
* Do the following when you want to fill only part of the SVG path. e.g. bottle below the cap
* Set the starting & ending point of the path:
  * startLocation & endLocation properties
  * numeric values in the range from 0 (zero) to 1 (one)
* 0 = the very top (or left for horizontal series)
* 1 = bottom/right
* Use series' slicesContainer.background to set how the rest of the shape gets filled

## CDN Link:
https://cdn.amcharts.com/lib/4/core.js

https://cdn.amcharts.com/lib/4/charts.js

https://cdn.amcharts.com/lib/4/themes/animated.js

# Working
https://drive.google.com/uc?export=view&id=1a7bsyhTCicSIm-UWEXPzw8djbCVaQs_1

# Button
https://drive.google.com/uc?export=view&id=1KbXbFtfnMGvxab75788yMphZeRw9Pqbr

## SVG
Water free icon by Freepik
https://www.flaticon.com/free-icon/water_824188

SVG Paths by MDN
https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths



# Notes on Pictorial Stacked Chart x Kintone
- Using amCharts JS library
- amCharts_Demo is a recreation of amCharts demo sites

## Resource & amCharts Documentations
#### amCharts Demos:
  - [Human - Pictorial Stacked Chart Demo](https://www.amcharts.com/demos/pictorial-stacked-chart/)
  - [Wine - Sliding Pictorial Chart](https://www.amcharts.com/demos/pictorial-chart/)
  - [Sausage - Horizontal Pictorial Chart](https://www.amcharts.com/demos/horizontal-pictorial-chart/)
  - [Water - Custom Pictorial Slice Shape](https://www.amcharts.com/demos/custom-pictorial-slice-shape/)

#### amCharts Documentations on Pictorial Charts
- [Anatomy of a Sliced Chart](https://www.amcharts.com/docs/v4/chart-types/sliced-chart/)
- [*Pictorial Series*](https://www.amcharts.com/docs/v4/chart-types/sliced-chart/#Pictorial_series)
- [PictorialStackedSeries](https://www.amcharts.com/docs/v4/reference/pictorialstackedseries/)
- [SVG Path & Pictorial Charts](https://www.amcharts.com/docs/v4/reference/pictorialstackedseries/#maskSprite_property)

#### Other Notes
- [Error - “Chart was not disposed” warning](https://www.amcharts.com/docs/v4/tutorials/chart-was-not-disposed/)
- [SVG Paths by Mozilla](https://developer.mozilla.org/ja/docs/Web/SVG/Tutorial/Paths)

---

## Specific Notes:
#### What is Pictorial Series
- In a nutshell Pictorial series is just a straight Pyramid series with some cool mask applied on it.
- An SVG path is series of codes, describing geometrical shapes. For more information about it visit this [Mozilla article](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths).

#### Partially filled shapes
- Do the following when you want to fill only part of the SVG path. e.g. bottle below the cap
- Set the starting & ending point of the path:
  - startLocation & endLocation properties
  - numeric values in the range from 0 (zero) to 1 (one)
- 0 = the very top (or left for horizontal series)
- 1 = bottom/right
- Use series' slicesContainer.background to set how the rest of the shape gets filled

#### SVG data into amCharts
**maskSprite**
* https://www.amcharts.com/docs/v4/reference/pictorialstackedseries/#maskSprite_property
* A Sprite element that is used as a series mask.
* If set, this element's shape will be used to apply shape to the whole stacked pictorial series.
* You can use this element's path property to set an SVG path for the shape:
```
et iconPath = "M511.82,...";
series.maskSprite.path = iconPath;
```

#### Simply an SVG file into a single path
- Excellent tool: https://jakearchibald.github.io/svgomg/

---

## Building you Kintone x Pictorial Charts:
### Create a Kintone App from the CSV file
- [Article_Data.csv](Article_Data.csv)
### CDN Link:
- https://cdn.amcharts.com/lib/4/core.js
- https://cdn.amcharts.com/lib/4/charts.js
- https://cdn.amcharts.com/lib/4/themes/animated.js
- [K_PicStackChart_Button.js](K_PicStackChart_Button.js)
  - CDN Link Option: https://drive.google.com/uc?export=view&id=1KbXbFtfnMGvxab75788yMphZeRw9Pqbr

---

## Sample Data:
### Pepsi Breakdown:
- https://www.eatthis.com/what-is-in-soda/
- https://www.pepsi.ca/products/pepsi-591ml#:~:text=CARBONATED%20WATER%2C%20GLUCOSE%2DFRUCTOSE%20AND,%2C%20CITRIC%20ACID%2C%20NATURAL%20FLAVOUR.
- https://www.pepsicobeveragefacts.com/Home/Product?formula=35005*26*01-01&form=RTD&size=20
- 89% Carbonated Water
- 8.9% High-fructose Corn Syrup
- 1% Phosphoric and Citric Acids
- 0.4% Caramel Color
- 0.7% Natural Flavoring & Caffeine
- Total: 591 ML = 591000 milligram
- Sodium 20 milligram
- Sugar 69000 milligram

1 Bottle:
* [12 fl oz](https://www.pepsicobeveragefacts.com/Home/Product?formula=35005*26*01-01&form=RTD&size=20)
* 250 calories
* Sodium 50 mg
* Sugar 69 g
* Caffeine 63 mg
* Phosphorus 80 mg

- 89% Carbonated Water
- 8.9% High-fructose Corn Syrup
- 1% Phosphoric and Citric Acids
- 0.4% Caramel Color
- 0.7% Natural Flavoring & Caffeine

### Beverage Choice
Percentage of adults who consumed beverages on any
given day, WWEIA, NHANES 2015-2016
https://www.ars.usda.gov/ARSUserFiles/80400530/pdf/DBrief/21_Beverage_choices_adults_1516.pdf

| Beverage            | Male | Female |
| ------------------- | ---- | ------ |
| Water               | 83   | 89     |
| Coffee & Tea        | 68   | 69     |
| Sweetened beverages | 46   | 38     |
| Alcoholic beverages | 29   | 18     |
| Milk                | 19   | 18     |
| 100% juice          | 17   | 15     |
| Diet beverages      | 16   | 14     |


### Nutella Unmasked
* https://lemonandjinja.com/blog/chocolate-y-hazelnutty-goodness
| Ingredient | Percentage |
| Soy Lecithin & Vanillin | 0.5% |
| Cocoa Powder & Skim milk powder | 8.5% |
| Hazelnuts | 13% |
|Palm Oil | 23% |
| Sugar | 55% |
