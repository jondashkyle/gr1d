# Gr1d

`npm install gr1d`

A little in-browser utility to quickly scaffold out Gr8.css grids.

## Setup

```
var Gr1d = require('gr1d')

var grid = Gr1d({
  container: document.body,
  pad: 1,
  gutter: true,
  responsive: true,
})
```

## Options

### Container
The element rows and columns will be appended to. Defaults to `document.body`.

### Pad
Padding amount of the columns and row. Defaults to `1`

### Gutter
Offsets the container to align the contents of the left and right columns regardless of padding amount. Defaults to `true`.

### Responsive
Collapse all columns to full width of the container when hitting `sm`. Defaults to `true`.

## Methods

### Add
Takes either a series of arguments, or an object of options. The arguments for the shorthand are:

```grid.add(columns, padding, gutter, responsive)```

For example, add 3 evenly sized columns, padding of 1, enable the gutter offset and do not respond for mobile:
```grid.add(3, 1, true, false)```

Alternatively, you can pass an array of column sizes to the first argument.
```grid.add([2, 6, 4], 2)```

Example of an options object:
```
grid.add({
  col: 4,
  pad: 2,
  gutter: false,
  responsive: true
})
```