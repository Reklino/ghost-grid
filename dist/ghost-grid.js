function Ghost() {

    /*

    Ghost Grid v1.01 beta
    Created by Jacob Davidson (Reklino)
    Visit https://github.com/Reklino/ghost-grid for latest version
    MIT Liscense

    */

    // define ghost Object (will return this)
    var ghost = {};



    // set defaults
    ghost.align             = 'center';
    ghost.opacity           = 0.75;
    ghost.breaks            = [
        {
            containerWidth : false,
            point : "(min-width: 800px)",
            columns : 12,
            gutters : 1/4,
            baseLineHeight : '1.5em'
        }
    ];
    ghost.oldBreaks = [];
    ghost.grid                = document.createElement('div');
    ghost.gridContainer       = document.createElement('div');
    ghost.gridLineContainer   = document.createElement('div');
    ghost.gridSwitch          = document.createElement('div');



    // render grid and container elements (see ghost-grid.css for styles)
    ghost.grid.setAttribute('class', 'gg-grid');
    ghost.gridContainer.setAttribute('class', 'gg-grid-container');
    ghost.gridLineContainer.setAttribute('class', 'gg-grid-line-container');
    ghost.grid.appendChild(ghost.gridLineContainer);
    ghost.grid.appendChild(ghost.gridContainer);

    ghost.gridSwitch.setAttribute('class', 'gg-grid-switch');
    ghost.gridSwitch.innerHTML    = '<i></i><i></i><i></i><i></i>';



    // returns the pixel value of a string/unit pair
    // example: getPixelValue('24px') will return 24
    function getPixelValue(value)
    {   
        if (value == undefined)
            return false;
        else if (typeof value === 'number')
            console.log('Ghost Grid says: baseLineHeight must be set to a string with the unit type declared (example: "24px")');
        else if (value.indexOf("rem") > -1)
            return parseFloat(value) * parseFloat(window.getComputedStyle(document.documentElement).fontSize);
        else if (value.indexOf("em") > -1)
            return parseFloat(value) * parseFloat(window.getComputedStyle(ghost.containingElement).fontSize);
        else
            return parseFloat(value);
    }

    // render the grid lines
    ghost.gridRender = function(currentBreak) {
        var bp              = typeof currentBreak === 'undefined' ? ghost.breaks[0] : currentBreak;
            body            = ghost.containingElement,
            html            = document.documentElement,
            containerWidth  = '100%',
            containerWidth  =  bp.containerWidth > 0 ? bp.containerWidth + 'px' : containerWidth,
            w               = window.innerWidth,
            h               = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight ),
            baseLineHeight  = getPixelValue(bp.baseLineHeight),
            lines           = Math.round(h/baseLineHeight) + 40,
            colWidth        = 100/bp.columns,
            gutterSize      = bp.gutters/(bp.columns + bp.columns * bp.gutters) * 100;

        // set configurable grid and grid container styles
        ghost.gridContainer.innerHTML      = '';
        ghost.gridLineContainer.innerHTML  = '';
        ghost.grid.style.opacity           = ghost.opacity;
        ghost.gridContainer.style.maxWidth = containerWidth;

        // position grid container based on container position
        if(containerWidth != '100%') {
            switch(ghost.align) {
                case 'left':
                    ghost.gridContainer.style.marginLeft = '0';
                    ghost.gridContainer.style.marginRight = '0';
                    break;
                case 'center':
                    ghost.gridContainer.style.marginLeft = 'auto';
                    ghost.gridContainer.style.marginRight = 'auto';
                    break;
                case 'right':
                    ghost.gridContainer.style.marginLeft = 'auto';
                    ghost.gridContainer.style.marginRight = '0';
                    break;
            }
        }
        
        // generate columns
        for( i = 0; i < bp.columns + 1; i++ ) {
            var c = document.createElement('div');
            c.style.paddingLeft     = gutterSize/2 + '%';
            c.style.paddingRight    = gutterSize/2 + '%';
            c.style.left            = i * colWidth - gutterSize/2 + '%';
            ghost.gridContainer.appendChild(c);
        }
        
        // generate base lines
        if (baseLineHeight) {
            for( i = 0; i < lines; i++ ) {
                var l = document.createElement('div');
                l.setAttribute('class','ghost-line');
                l.style.height = bp.baseLineHeight;
                ghost.gridLineContainer.appendChild(l);
            }
        };
    };

    // loops through breaks to find match and returns break object
    var findBreak = function(media) {
        for( i = 0; i < ghost.breaks.length; i++ ) {

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

        ghost.containingElement = ghost.containingElement ? ghost.containingElement : document.body;
        ghost.containingElement.style.position = 'relative';
        ghost.containingElement.classList.toggle('gg-grid-hidden');
        if (ghost.color) {
            ghost.grid.style.borderColor = ghost.color;
        }
        ghost.containingElement.appendChild(ghost.grid);
        ghost.containingElement.appendChild(ghost.gridSwitch);



        // define grid toggle method used for toggling the grid visibility
        ghost.toggle = function() {
            ghost.containingElement.classList.toggle('gg-grid-hidden');
        };

        ghost.gridSwitch.addEventListener('click', function() {
            ghost.toggle();
        });

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
                    ghost.activeBreakPointIndex = i - 1;
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

};