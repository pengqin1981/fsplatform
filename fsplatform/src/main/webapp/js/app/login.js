require([
     "fsp/auth",
     "dojo/on",
     "dojo/dom",
     "dojo/string",
     "dijit/Dialog",
     "dojo/ready"
 ], function(auth, on, dom, string, Dialog, ready) {
    ready(function() {
        var dialog = new Dialog({
            title: "提示",
            content: "用户名或密码不能为空！",
            style: "width: 300px"
        }, dom.byId('dialog'));

        on(dom.byId("loginBtn"), "click", function() {
            var username = dom.byId('username').value,
                password = dom.byId('password').value;

            if (string.trim(username) === "" ||
                string.trim(password) === "") {
                dialog.set("content", "用户名或密码不能为空");
                dialog.show();
                return;
            }
            auth.authenciate(
                    username,
                password
            ).then(function(response) {
                if (response === true) {
                    window.location.href = "./index.html"
                } else {
                    dialog.set("content", "抱歉,账号或者密码不匹配,请重新再试！");
                    dialog.show();
                }
            });
        });
    });
 });