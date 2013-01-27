<%@ page language="java" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>中原地产 金融服务与产品管理后台</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.2.2/css/bootstrap-combined.min.css" rel="stylesheet">
  <link href="//ajax.googleapis.com/ajax/libs/dojo/1.8.3/dijit/themes/tundra/tundra.css" rel="stylesheet" >
  <link href="<%=request.getContextPath()%>/css/fsp.css" rel="stylesheet" >

  <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
  <!--[if lt IE 9]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->

</head>

<body class="tundra">
    <div id="fsp"></div>
    <!-- load dojo and provide config via data attribute -->
    <script data-dojo-config="async: 1, dojoBlankHtmlUrl: '<%=request.getContextPath()%>/blank.html',
            cacheBust: true,
            locale: 'zh',
            packages: [ {
                name: 'fsp',
                location: '<%=request.getContextPath()%>/js/fsp'
            }]"
            src="//ajax.googleapis.com/ajax/libs/dojo/1.8.3/dojo/dojo.js"></script>
    <!-- application -->
    <script src="<%=request.getContextPath()%>/js/app/index.js" type="text/javascript"></script>
</body>
</html>

