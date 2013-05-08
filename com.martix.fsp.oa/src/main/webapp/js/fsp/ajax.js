(function(jQuery) {
    var ajaxWrapper = function() {
        var token = $.cookie("cfsAuthToken"), ajax = $.ajax;
        
        /**
         * @public
         * @memberOf $.FSP
         * @function
         * @requires core.js
         * @description send a xhr request with the authroized token
         * @see jQuery#ajax
         */
        $.FSP.ajax = function(opts){
            opts.headers = opts.headers || {};
            $.extend(opts.headers, {
                "Authorization": "Basic " + token
            });
            if (!opts.headers["Content-Type"]) {
                opts.headers["Content-Type"] = "text/plain; charset=UTF-8";
            } else if (opts.headers["Content-Type"].indexOf("charset=") == -1) {
                opts.headers["Content-Type"] += "; charset=UTF-8";
            }
            ajax(opts);
        }
    };
    
    $().ready(function() {
        if (jQuery.FSP.isAuthorized()) {
            ajaxWrapper();
        } else {
            console.error('unauthorized');
        }
    });
})($);