define([
     "dojo/_base/lang",
     "dojo/request",
     "dojo/cookie",
     "fsp/core"
 ], function(lang, request, cookie, core) {
    var auth = {
        authenciate : function(/* String */ username, /* String */ password) {
            return request(core.getUnsecuredPrefix() + "/auth", {
                method: "POST",
                data: {
                    username: encodeURI(username),
                    password: password
                },
                preventCache: true
            }).then(function() {
                cookie("fspUserId", username);
                cookie("fspAuthToken", "token");
                return true;
            }, function(err) {
                return err;
            });
        },

        unauthenciate : function() {
            cookie("fspUserId", null, { expires: -1});
            cookie("fspAuthToken", null, { expires: -1});
        },

        isAuthorized : function() {
            if (cookie("fspUserId") && cookie("fspAuthToken")) {
                return true;
            } else {
                return false;
            }
        }
    };
    return auth;
 });

