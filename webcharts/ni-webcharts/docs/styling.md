# Styling the Webcharts

Webcharts styling through CSS is still WIP and the ability to style them through
CSS is limited.

The anatomy of a webchart is a bit complex though, it is made of multiple drawing
layers, some that can be styled with CSS, some can be partially styled with CSS
and some can't be styled at all yet.

The drawing layers of a webchart are all situated in a div (with the css class
webchart-drawing-layer) that is built at element creation time. The nested
elements of a webchart (ni-cartesian-axis, ni-cartesian-plot ...) don't have
any visible parts, they only hold configuration and their styles are often
read and applied to the drawing layer.

The drawing layer is composed of:

* two overlapping canvas layers, one used for the the plots, axes and grid,
the other one used for drawing UI stuff, like cursors, navigation hints,
tooltips ...
* a text layer (html) for each axis, where the tick labels and the
axis labels are drawn
* an svg layer for each axis
* a fake grid layer (an ni-grid-div element, with visibility none). Some of the
styles of this are applyed to the grid draw on the canvas layer.

The examples below show how to change the styles of all the webcharts on the
page, if you want to change the look on a webchart by webchart basis you'll use
CSS selectors or inline styles to target a specific one.



## The top level elements

These are custom elements and they are styled entirely using CSS. They respect
the CSS box model. The most useful properties to tweak here are the *color*,
*background-color*, *padding* and *margin*


```css
ni-cartesian-graph,
ni-chart,
ni-intensity-graph {
    border: 1px solid #C7CCD0;
    padding: 20px;
    color: #2B3033;
}
```


## The grid

The grid is drawn on the canvas element. At every redraw styles from
the *ni-grid-div* are used to configure how the grid is drawn

Example of a grid with darkred, 2 pixels wide borders on top and bottom,
with a white background and red reticles:

```css
ni-cartesian-graph ni-grid-div,
ni-chart ni-grid-div,
ni-intensity-graph ni-grid-div {
    border-style: solid;
    border-width: 2px 0px 2px 0px;
    border-color: darkred;
    background-color: white;
    color: red;
}
```

CSS properties applied when drawing the grid.


* **border-style** - use solid or none. dashed borders not supported

* **border-width** - top left botton right

* **border-color** - the color of the border

* **background-color** - the background color of the grid

* **color** - the color of the grid reticles

## The axes

The axes are drawn on the canvas element and the axis ticks are drawn on their
own html layers . At every redraw, the styles from the corresponding
*ni-cartesian-axis* are used to configure how the axes are drawn.

```css
ni-cartesian-axis {
    font-family: "Open Sans", verdana, arial, sans-serif;
    font-size: 12px;
    font-style: normal;
    color: #C7CCD0;
}
```

The fonts styles are used for the axis ticks and the color is used for drawing the
axes and major and minor ticks.

The tick labels color is inherited from the main element style


## The axis labels

The axis labels are drawn as text on a HTML layer with a CSS class
*"axisLabels"*

Example of 16px, purple axis labels

```css
ni-cartesian-graph .axisLabels,
ni-chart .axisLabels,
ni-intensity-graph .axisLabels {
    font-family: "Open Sans", verdana, arial, sans-serif;
    font-size: 16px;
    color: purple;
}
```
