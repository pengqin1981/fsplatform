<%@ page language="java" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>中原地产 金融服务与产品管理后台</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">

    <!-- Le styles -->
    <style type="text/css">
      body {
        padding-top: 40px;
        padding-bottom: 40px;
        background-color: #f5f5f5;
      }

      .form-signin {
        max-width: 300px;
        padding: 19px 29px 29px;
        margin: 0 auto 20px;
        background-color: #fff;
        border: 1px solid #e5e5e5;
        -webkit-border-radius: 5px;
           -moz-border-radius: 5px;
                border-radius: 5px;
        -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.05);
           -moz-box-shadow: 0 1px 2px rgba(0,0,0,.05);
                box-shadow: 0 1px 2px rgba(0,0,0,.05);
      }
      .form-signin .form-signin-heading {
        margin-bottom: 10px;
      }
      .form-signin input[type="text"],
      .form-signin input[type="password"] {
        font-size: 16px;
        height: auto;
        margin-bottom: 15px;
        padding: 7px 9px;
      }

    </style>
    <link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.2.2/css/bootstrap-combined.min.css" rel="stylesheet">
    <link href="//ajax.googleapis.com/ajax/libs/dojo/1.8.3/dijit/themes/claro/claro.css" rel="stylesheet" >

    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

  </head>

  <body class="claro">

    <div class="container">

      <form class="form-signin">
        <h2 class="form-signin-heading">登录入口</h2>
        <label>用户名:</label>
        <input id="username" name="user.username" type="text" class="input-block-level" placeholder="请输入用户名">
        <label>密码:</label>
        <input id="password" name="user.password" type="password" class="input-block-level" placeholder="请输入密码">
        <button id="loginBtn" class="btn btn-large btn-primary" type="button">登录</button>
      </form>

    </div> <!-- /container -->

    <div id="dialog"></div>
    <!--  dojo library -->
    <script data-dojo-config="async: 1, dojoBlankHtmlUrl: '<%=request.getContextPath()%>/blank.html',
            packages: [ {
                name: 'fsp',
                location: '<%=request.getContextPath()%>/js/fsp'
            }]"
            src="//ajax.googleapis.com/ajax/libs/dojo/1.8.3/dojo/dojo.js"></script>
    <!-- application -->
    <script src="<%=request.getContextPath()%>/js/app/login.js" type="text/javascript"></script>

  </body>
</html>
