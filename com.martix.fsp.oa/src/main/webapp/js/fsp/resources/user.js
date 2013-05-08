(function(jQuery) {
    var ResourceClass, UserClass, URI = $.FSP.getApiPrefix() + '/users';
    
    if (!$.FSP.isImported('Resource')) {
        return;
    }
    
    ResourceClass = $.FSP.Resource;
    
    /**
     * @constructor
     * @name $.FSP.User
     * @param {Object} props the initialize properties
     * @requires core.js <br> auth.js <br> ajax.js <br> resource.js
     * @description the resource class for the user.
     */ 
    UserClass = function(props) {
        $.extend(this, props);
        this.URI = URI;
    };
    
    /**
     * @static
     * @name URI
     * @memberOf $.FSP.User
     * @description the URI of the User resource. eg: /cloud/api/users
     */
    UserClass.URI = URI;
    
    UserClass.prototype = new ResourceClass();
    
    /**
     * @memberOf $.FSP.User
     * @see jQuery.FSP.Resource#create
     * @example
    var User = $.FSP.User, username = "test" + (new Date()).getTime();
    var user = new User({
        "isLocked": false,
        "isAdmin": true,
        "role": {
            "label": "Admin",
            "id": "ADMIN"
        },
        "username": username,
        "password": username,
        "timezone": {
            "label": "\u4e2d\u56fd\u6807\u51c6\u65f6\u95f4",
            "id": "Asia/Shanghai"
        },
        "locale": {
            "label": "\u4e2d\u6587",
            "id": "zh"
        },
        "name": "test name",
        "emailNotifications": true,
        "email": "test@163.com",
        "isApprover": false
    });
    user.create().done(function() {
        console.info('create success!');
    }).fail(function() {
        console.info('create failed!');
    });
     */
    var create = function() {} // just for create doc

    /**
     * @function
     * @name update
     * @memberOf $.FSP.User
     * @description override the update method of the ResourceClass
     * @returns {jQuery.Deferred} http://api.jquery.com/category/deferred-object/
     * @example
    user.name = 'updated name'
    user.update().done(function() {
        console.info('update success!');
    }).fail(function() {
        console.info('update failed!');
    });
     */
    UserClass.prototype.update = function() {
        var deferred = new jQuery.Deferred();
        $.FSP.ajax({
            type: "PUT",
            url : this.URI + '/' + encodeURIComponent(this.username),
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
     * @function
     * @name remove
     * @memberOf $.FSP.User
     * @description override the remove method of the ResourceClass
     * @returns {jQuery.Deferred} http://api.jquery.com/category/deferred-object/
    user.remove().done(function() {
        console.info('remove success!');
    }).fail(function() {
        console.info('remove failed!');
    });
     */
    UserClass.prototype.remove = function() {
        var deferred = new jQuery.Deferred();
        $.FSP.ajax({
            type: "DELETE",
            url : this.URI + '/' + encodeURIComponent(this.username),
            cache: false,
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
     * @function
     * @name updatePassword
     * @memberOf $.FSP.User
     * @description update the user's password, only for the authorized user.
     * @returns {jQuery.Deferred} http://api.jquery.com/category/deferred-object/
     * @param pwd The new user's password
     * @param oldPwd The old user's password
     * @example
    var admin = new User({
        username: $.FSP.config.username,
        password: $.FSP.config.password
    });
    admin.updatePassword('newPassw0rd', $.FSP.config.password)
    .done(function() {
        console.info('update authorized user\'s password success!');
    }).fail(function() {
        console.info('update authorized user\'s password failed!');
    });
     */
    UserClass.prototype.updatePassword = function(/*String*/ pwd, /*String*/ oldPwd) {
        var deferred = new jQuery.Deferred();
        $.FSP.ajax({
            type: "PUT",
            url : this.URI + '/' + encodeURIComponent(this.username),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            cache: false,
            data: JSON.stringify({
                username: this.username,
                password: pwd,
                oldPassword: oldPwd
            }),
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
     * @function
     * @name lock
     * @memberOf $.FSP.User
     * @description lock the user
     * @returns {jQuery.Deferred} http://api.jquery.com/category/deferred-object/
     * @example
    user.lock().done(function() {
        console.info('lock success!');
    }).fail(function() {
        console.info('lock failed!');
    });
     */
    UserClass.prototype.lock = function() {
        return this._lock(true);
    }
    /**
     * @function
     * @name lock
     * @memberOf $.FSP.User
     * @description lock the user
     * @returns {jQuery.Deferred} http://api.jquery.com/category/deferred-object/
     * @example
    user.unlock().done(function() {
        console.info('unlock success!');
    }).fail(function() {
        console.info('unlock failed!');
    });
     */
    UserClass.prototype.unlock = function() {
        return this._lock(false);
    }

    /**
     * @ignore
     */
    UserClass.prototype._lock = function(/*Boolean*/ lock) {
        var deferred = new jQuery.Deferred();
        $.FSP.ajax({
            type: "PUT",
            url : this.URI + '/' + encodeURIComponent(this.username),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            cache: false,
            data: JSON.stringify({
                username: this.username,
                isLocked: lock
            }),
            processData: false,
            success: function() {
                deferred.resolve();
            },
            error: function(e) {
                deferred.reject(e);
            }
        });
        return deferred;
    }
    
    /**
     * @ignore
     * override the toJSON method of the ResourceClass
     */
    UserClass.prototype.toJSON = function() {
        var inst = ResourceClass.prototype.toJSON.call(this);
        delete inst.role;
        delete inst.password;
        return inst;
    };
    
    /**
     * @function
     * @name list
     * @memberOf $.FSP.User
     * @see jQuery.FSP.Resource#list
     */
    UserClass.list = ResourceClass.list;
    
    /**
     * @function
     * @name get
     * @memberOf $.FSP.User
     * @see jQuery.FSP.Resource#get
     */
    UserClass.get = ResourceClass.get;
    
    jQuery.extend(jQuery.FSP, {
        User: UserClass
    });
})($);