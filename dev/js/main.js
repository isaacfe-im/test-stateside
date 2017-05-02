$(function() {


});

(function() {

    function addEvent(element, event, fn) {
        if (element.addEventListener) {
            element.addEventListener(event, fn, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + event, fn);
        }
    }
    //this function will work cross-browser for loading scripts asynchronously
    function loadScript(src, type, callback) {
        var s,
            r,
            t;
        r = false;

        if (type === 'js') {
            s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = src;
            s.async = 'async';
            s.onload = s.onreadystatechange = function() {
                //console.log( this.readyState ); //uncomment this line to see which ready states are called.
                if (!r && (!this.readyState || this.readyState == 'complete')) {
                    r = true;
                    if (callback !== undefined) {
                        callback();
                    }
                }
            };
            t = document.getElementsByTagName('script')[0];
        }

        if (type === 'css') {
            s = document.createElement('link');
            s.type = 'text/css';
            s.rel = 'stylesheet';
            s.href = src;
            s.onload = s.onreadystatechange = function() {
                //console.log( this.readyState ); //uncomment this line to see which ready states are called.
                if (!r && (!this.readyState || this.readyState == 'complete')) {
                    r = true;
                    if (callback !== undefined) {
                        callback();
                    }
                }
            };
            t = document.getElementsByTagName('link')[0];
        }

        t.parentNode.insertBefore(s, t);
    }

    addEvent(window, 'load', function() {

        loadScript(
            'https://fonts.googleapis.com/css?family=Roboto:400,300,500,700,100',
            'css'
        );

    });

}());
