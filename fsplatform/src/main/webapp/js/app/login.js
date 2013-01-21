require([
     "fsp/auth",
     "dojo/domReady!"
 ], function(auth) {
    auth.authenciate("admin", "passw0rd").then(function(response) {
        if (response) {
            
        } else {
            
        }
    });
 });