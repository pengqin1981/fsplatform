<%@ page language="java" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>中原地产 金融服务与产品管理后台</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.2.2/css/bootstrap-combined.min.css" rel="stylesheet">
  <link href="//ajax.googleapis.com/ajax/libs/dojo/1.8.3/dijit/themes/claro/claro.css" rel="stylesheet" >
  <link href="<%=request.getContextPath()%>/css/fsp.css" rel="stylesheet" >

  <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
  <!--[if lt IE 9]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->

</head>

<body class="claro">
    <div id="appLayout" class="demoLayout" data-dojo-type="dijit/layout/BorderContainer" data-dojo-props="design: 'headline', gutters:false">
        <div data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region: 'top'" style="height: 40px;">
            <div class="navbar navbar-inverse navbar-fixed-top">
              <div class="navbar-inner">
                <div class="container">
                  <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                  </a>
                  <a class="brand" href="#">金融服务管理平台</a>
                  <div class="nav-collapse collapse">
                    <p class="navbar-text pull-right">
                      <a href="#" class="navbar-link">管理员</a>&nbsp;&nbsp;&nbsp;
                      <a href="#" class="navbar-link">关于软件</a>&nbsp;&nbsp;
                      <a href="#" class="navbar-link">退出</a>
                    </p>
                    <ul class="nav">
                      <li class="active"><a href="#">首页</a></li>
                      <li><a href="#about">产品维护</a></li>
                    </ul>
                  </div><!--/.nav-collapse -->
                </div>
              </div>
            </div>
        </div>
        <div data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region: 'center', tabPosition: 'bottom'">
        </div>
    </div>
    <!-- load dojo and provide config via data attribute -->
    <script data-dojo-config="async: 1, dojoBlankHtmlUrl: '<%=request.getContextPath()%>/blank.html',
            packages: [ {
                name: 'fsp',
                location: '<%=request.getContextPath()%>/js/fsp'
            }]"
            src="//ajax.googleapis.com/ajax/libs/dojo/1.8.3/dojo/dojo.js"></script>
    <script>
        require(["dojo/parser", "dojo/ready", "dijit/layout/BorderContainer", "dijit/layout/TabContainer", "dijit/layout/ContentPane"], function(parser, ready){
            ready(function(){
                parser.parse();
            });
        });
    </script>
</body>
</html>

