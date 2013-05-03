<%@ page language="java" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>OA协同平台</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="<%=request.getContextPath()%>/css/fsp.css" rel="stylesheet" >
  <link href="<%=request.getContextPath()%>/js/gridx/resources/Gridx.css" rel="stylesheet" >

  <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
  <!--[if lt IE 9]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->

</head>

<body class="dbootstrap">
    <div id="fsp"></div>
    <!-- load dojo and provide config via data attribute -->
    <script data-dojo-config="async: 1, dojoBlankHtmlUrl: '<%=request.getContextPath()%>/blank.html',
            cacheBust: true,
            locale: 'zh',
            packages: [ {
                name: 'fsp',
                location: '<%=request.getContextPath()%>/js/fsp'
            }, {
                name: 'gridx',
                location: '<%=request.getContextPath()%>/js/gridx'
            }, {
                location: '<%=request.getContextPath()%>/js/dbootstrap',
                name: 'dbootstrap'
            }]" 
            src="//yandex.st/dojo/1.8.3/dojo/dojo.js"></script>
            <!-- src="//yandex.st/dojo/1.8.3/dojo/dojo.js"></script> -->
    <!-- application -->
    <script src="<%=request.getContextPath()%>/js/app/index.js" type="text/javascript"></script>
</body>
</html>
