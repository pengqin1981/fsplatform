(function(jQuery) {
    var ResourceClass, URI = $.FSP.getApiPrefix() + '/resource';
    /**
     * @constructor
     * @name $.FSP.Resource
     * @param {Object} props the initialize properties
     * @requires core.js <br> auth.js <br> ajax.js
     * @description the abstract class of the resource class
     */
    ResourceClass = function(props) {
        $.extend(this, props);
        this.URI = URI;
    };
    /**
     * @static
     * @name URI
     * @memberOf $.FSP.Resource
     * @description the URI of the resource, it must be overwritten by the inherited class
     */
    ResourceClass.URI = URI;
    
    /**
     * @memberOf $.FSP.Resource
     * @description send a post request after it is initialized.
     * @returns {jQuery.Deferred} http://api.jquery.com/category/deferred-object/
     */
    ResourceClass.prototype.create = function() {
        var deferred = new jQuery.Deferred(), that = this;
        $.FSP.ajax({
            type: "POST",
            url : this.URI,
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            cache: false,
            data: JSON.stringify(this.toJSON(this)),
            processData: false,
            success: function(response) {
                if (response && response.id) {
                    that.id = response.id;
                }
                deferred.resolve();
            },
            error: function(e) {
                deferred.reject(e);
            }
        });
        return deferred;
    };
    
    /**
     * @memberOf $.FSP.Resource
     * @description send a PUT request to update a specific resource
     * @returns {jQuery.Deferred} http://api.jquery.com/category/deferred-object/
     */
    ResourceClass.prototype.update = function() {
        var deferred = new jQuery.Deferred();
        $.FSP.ajax({
            type: "PUT",
            url : this.URI + '/' + encodeURIComponent(this.id),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            cache: false,
            data: JSON.stringify(this.toJSON(this)),
            processData: false,
            success: function() {
                deferred.resolve();
            },
            error: function(e) {
                deferred.reject(e);
            }
        });
        return deferred;
    };
    
    /**
     * @memberOf $.FSP.Resource
     * @description send a DELETE request to remove a specific resource
     * @returns {jQuery.Deferred} http://api.jquery.com/category/deferred-object/
     */
    ResourceClass.prototype.remove = function() {
        var deferred = new jQuery.Deferred();
        $.FSP.ajax({
            type: "DELETE",
            url : this.URI + '/' + encodeURIComponent(this.id),
            cache: false,
            data: JSON.stringify(this.toJSON(this)),
            processData: false,
            success: function() {
                deferred.resolve();
            },
            error: function(e) {
                deferred.reject(e);
            }
        });
        return deferred;
    };
    
    /**
     * @ignore
     */
    ResourceClass.prototype.toJSON = function() {
        var inst = $.extend({}, this);
        delete inst.create;
        delete inst.update;
        return inst;
    };
    
    /**
     * @static
     * @memberOf $.FSP.Resource
     * @description send a GET request to retrieve a resource list
     * @returns {jQuery.Deferred} http://api.jquery.com/category/deferred-object/
     */
    ResourceClass.list = function(params) {
        var deferred = new jQuery.Deferred();
        $.FSP.ajax({
            type: "GET",
            url : this.URI,
            cache: false,
            dataType: "json",
            data: params,
            success: function(data) {
                deferred.resolve(data);
            },
            error: function(e) {
                deferred.reject(e);
            }
        });
        return deferred;
    };
    
    /**
     * @static
     * @memberOf $.FSP.Resource
     * @description send a GET request to retrieve a specific resource
     * @returns {jQuery.Deferred} http://api.jquery.com/category/deferred-object/
     */
    ResourceClass.get = function(id) {
        var deferred = new jQuery.Deferred();
        $.FSP.ajax({
            type: "GET",
            url : this.URI + '/' + encodeURIComponent(this.id),
            cache: false,
            dataType: "json",
            success: function(data) {
                deferred.resolve(data);
            },
            error: function(e) {
                deferred.reject(e);
            }
        });
        return deferred;
    };
    
    jQuery.extend(jQuery.FSP, {
        Resource: ResourceClass
    });
})($);