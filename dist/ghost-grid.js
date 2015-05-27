var ghost = (function () {


    /*

    Ghost Grid v1.01 beta
    Created by Jacob Davidson (Reklino)
    Visit https://github.com/Reklino/ghost-grid for latest version
    MIT Liscense

    */



    // define ghost Object (will return this)
    var ghost = {};



    // set defaults
    ghost.container         = false;
    ghost.containerPosition = 'center';
    ghost.opacity           = 0.5;
    ghost.breaks            = [
        {
            point : "(min-width: 800px)",
            columns : 12,
            gutters : 0.25,
            baseLineHeight : '24px'
        }
    ];
    ghost.oldBreaks = [];



    // define private vars
    var grid                = document.createElement('div'),
        gridContainer       = document.createElement('div'),
        gridLineContainer   = document.createElement('div'),
        gridSwitch          = document.createElement('div');



    // render grid and container elements (see ghost-grid.css for styles)
    document.body.setAttribute('class', 'grid-hidden');
    grid.id                 = 'grid';
    gridContainer.id        = 'grid-container';
    gridLineContainer.id    = 'grid-line-container';
    grid.appendChild(gridLineContainer);
    grid.appendChild(gridContainer);
    document.body.appendChild(grid);

    gridSwitch.id           = 'grid-switch';
    gridSwitch.innerHTML    = '<i></i><i></i><i></i><i></i>';
    document.body.appendChild(gridSwitch);



    // redefine vars as rendered elements
    grid                = document.getElementById('grid');
    gridContainer       = document.getElementById('grid-container');
    gridLineContainer   = document.getElementById('grid-line-container');
    gridSwitch          = document.getElementById('grid-switch');


    
    // define grid toggle method used for toggling the grid visibility
    ghost.toggle = function() {
        document.body.classList.toggle('grid-hidden');
    };

    gridSwitch.addEventListener('click', function() {
        ghost.toggle();
    });


    // returns the pixel value of a string/unit pair
    // example: getPixelValue('24px') will return 24
    function getPixelValue(value)
    {        
        if (typeof value === 'number')
            console.log('Ghost Grid says: baseLineHeight must be set to a string with the unit type declared (example: "24px")');
        else if (value.indexOf("rem") > -1)
            return parseFloat(value) * parseFloat(window.getComputedStyle(document.documentElement).fontSize);
        else if (value.indexOf("em") > -1)
            return parseFloat(value) * parseFloat(window.getComputedStyle(document.body).fontSize);
        else
            return parseFloat(value);
    }

    // render the grid lines
    ghost.gridRender = function(currentBreak) {
        var bp              = typeof currentBreak === 'undefined' ? ghost.breaks[0] : currentBreak;
            body            = document.body,
            html            = document.documentElement,
            container       = ghost.container > 0 ? ghost.container + 'px' : '100%',
            container       =  bp.container > 0 ? bp.container + 'px' : defaultContainer,
            w               = window.innerWidth,
            h               = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight ),
            baseLineHeight  = getPixelValue(bp.baseLineHeight),
            lines           = Math.round(h/baseLineHeight) + 40,
            colWidth        = 100/bp.columns,
            gutterSize      = bp.gutters/(bp.columns + bp.columns * bp.gutters) * 100;

        // set configurable grid and grid container styles
        gridContainer.innerHTML      = '';
        gridLineContainer.innerHTML  = '';
        grid.style.opacity           = ghost.opacity;
        gridContainer.style.maxWidth = container;

        // position grid container based on container position
        if(container != '100%') {
            switch(ghost.containerPosition) {
                case 'left':
                    gridContainer.style.marginLeft = '0';
                    gridContainer.style.marginRight = '0';
                    break;
                case 'center':
                    gridContainer.style.marginLeft = 'auto';
                    gridContainer.style.marginRight = 'auto';
                    break;
                case 'right':
                    gridContainer.style.marginLeft = '0';
                    gridContainer.style.marginRight = '0';
                    break;
            }
        }
        
        // generate columns
        for( i = 0; i < bp.columns + 1; i++ ) {
            var c = document.createElement('div');
            c.style.paddingLeft     = gutterSize/2 + '%';
            c.style.paddingRight    = gutterSize/2 + '%';
            c.style.left            = i * colWidth - gutterSize/2 + '%';
            gridContainer.appendChild(c);
        }
        
        // generate base lines
        for( i = 0; i < lines; i++ ) {
            var l = document.createElement('div');
            l.setAttribute('class','ghost-line');
            l.style.height             = bp.baseLineHeight;
            gridLineContainer.appendChild(l);
        }
    };

    // loops through breaks to find match and returns break object
    var findBreak = function(media) {
        for( i = 0; i < ghost.breaks.length; i++ ) {

            console.log(media + ',' + ghost.breaks[i].point);

            if(media == ghost.breaks[i].point) {

                // if going down a size, we need to offset the index by -1.
                var index = ghost.activeBreakPointIndex >= i ? i - 1 : i;

                // if it's greater than the length of breaks, set it back one.
                index = index >= ghost.breaks.length ? index - 1 : index;

                // set our new active break
                ghost.activeBreakPointIndex = index;

                return ghost.breaks[index];
            }
        }
    };

    // media query change
    ghost.breakChange = function(mq) {

        ghost.activeBreakPoint = findBreak(mq.media);        
        ghost.gridRender(ghost.activeBreakPoint);

    };

    ghost.summon = function() {

        // clear old listeners
        for ( i = 0; i < ghost.oldBreaks.length; i++ ) {
            ghost.oldBreaks[i].removeListener(ghost.breakChange);
        }
        ghost.oldBreaks = [];
        ghost.activeBreakPoint = false;

        // start watching for breakpoints
        if (window.matchMedia) {

            // loop through break points
            for ( i = 0; i < ghost.breaks.length; i++ ) {

                // create mediaQueryList objects for each breakpoint
                // and add event listeners to them
                var mq = window.matchMedia(ghost.breaks[i].point);
                mq.addListener(ghost.breakChange);

                // create a list of breakpoint objects to remove listener's from later
                ghost.oldBreaks.push(mq);

                // set initial break
                if(mq.matches) {
                    ghost.activeBreakPointIndex = i;
                    ghost.activeBreakPoint = findBreak(mq.media);
                }

            }

            // if media query wasn't found, set to the first breakpoint
            ghost.activeBreakPoint = !ghost.activeBreakPoint ? ghost.breaks[(ghost.breaks[0])] : ghost.activeBreakPoint;
            ghost.gridRender(ghost.activeBreakPoint);

        }
        else {
            alert('Your browser does not support the MediaQueryList object. Ghosts hate old browsers. Get a new one.');
        }
    };

    return ghost;

}());