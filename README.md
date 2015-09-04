#Ghost Grid

Summon your fluid grids from the bowels of CSS hell. [Read More here...](http://reklino.github.io/ghost-grid/demo/)

##What?

Ghost Grid is a design/development tool for folks like me who love designing with code, but miss having a visual grid.

##Why?

Designing in the browser is becoming more and more common, and so are fluid grid systems. My goal with this project was to create a simple way to visualize any fluid grid.

##Usage

**Install**

```
bower install blooby-grid
```
```
npm install blooby-grid --save-dev
```
or download `ghost-grid.min.js` and `ghost-grid.min.css`

**Load**

Load the css file into the head of your document like so
```
<link rel="stylesheet" type="text/css" href="ghost-grid.min.css">
```

Load the javascript file before your closing `<body>` tag like so
```
<script src="ghost-grid.min.js"></script>
```

**Configure**

```
<script>
	var ghost = new Ghost();
	ghost.align = 'center',
	ghost.opacity = 0.65,
	ghost.containingElement = document.body,
	ghost.breaks = [
		{
	        point: "(min-width: 300px)",
	        containerWidth: 450,
	        columns: 3,
	        gutters: 1/4,
	        baseLineHeight: (30/18) + 'em'
	    },
	    {
	        point: "(min-width: 700px)",
	        containerWidth: 750,
	        columns: 6,
	        gutters: 1/4,
	        baseLineHeight: (30/18) + 'em'
	    },
	    {
	        point: "(min-width: 1100px)",
	        containerWidth: 960,
	        columns: 9,
	        gutters: 1/4,
	        baseLineHeight: (30/18) + 'em'
	    },
	    {
	        point: "(min-width: 1600px)",
	        containerWidth: 1200,
	        columns: 12,
	        gutters: 1/4,
	        baseLineHeight: (30/18) + 'em'
	    }	    
	];
	ghost.summon();
</script>
```

##Options

Option | Default | Description
--- | --- | ---
containingElement | document.body | Ghost Grid will append all grid elements to the containingElement object. This option makes it easy to deploy Ghosts to individual layouts. It defaults to the body element.
align | 'center' | Ghosts can be aligned `'left'`, `'center'`, or `'right'` in relation to their parent element.
opacity | 0.75 | Determines the opacity of the Ghost.
breaks | see below | Contains an array of break point objects. See next section below for details...

####Break Point Options

Option | Default | Description
--- | --- | ---
point | false | CSS breakpoint at which to configure the grid to these settings (eg. `'(min-width: 300px)'`)
containerWidth | false | The width of the container for your fluid grid (eg. `'600px'`)
columns | 12 | The number of columns for this break point.
gutters | 1/4 | The size of the gutters between each column. Gutters are relative to the size of columns.
baseLineHeight | undefined | Determines the interval of the baseline grid. If undefined, there will be no baseline grid.


##Summon

Once you've configured the grid, summon it from hell `ghost.summon();`

##Credits

Inspired by the golden grid system and the configuration built into the sass plugin 'susy'.