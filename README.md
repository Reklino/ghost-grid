#Ghost Grid

Summon your fluid grids from the bowels of CSS hell.

##What?

Ghost Grid is a design/development tool for folks like me who love designing with code, but miss having a visual grid.

##Why?

Designing in the browser is becoming more and more common, and so are fluid grid systems. My goal with this project was to create a simple way to visualize any fluid grid.

##Usage

###INSTALL

```
bower install blooby-grid
```
```
npm install blooby-grid --save-dev
```
or download `ghost-grid.min.js` and `ghost-grid.min.css`

###LOAD

Load the css file into the head of your document like so
```
<link rel="stylesheet" type="text/css" href="ghost-grid.min.css">
```

Load the javascript file before your closing `<body>` tag like so
```
<script src="ghost-grid.min.js"></script>
```

###CONFIGURE

```
<script src="ghost-grid.min.js"></script>
<script>
	var ghost = new Ghost();
	ghost.align = 'center',
	ghost.opacity = 0.75,
	ghost.breaks = [
		{
	        point: "(min-width: 300px)",
	        containerWidth: 450,
	        columns: 3,
	        gutters: 1/4,
	        baseLineHeight: '1em'
	    },
	    {
	        point: "(min-width: 700px)",
	        containerWidth: 650,
	        columns: 6,
	        gutters: 1/4,
	        baseLineHeight: '1.25em'
	    },
	    {
	        point: "(min-width: 1100px)",
	        containerWidth: 960,
	        columns: 12,
	        gutters: 1/4,
	        baseLineHeight: '1.5em'
	    }    
	];
	ghost.summon();
</script>
```

#Credits

Inspired by the golden grid system and the configuration built into the sass plugin 'susy'.