<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ActivationPage.aspx.cs" Inherits="SubscriptionsApi.ActivationPage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title data-langg="titleSite">Subscriptions Management - EGYIS</title>
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

    <!-- CSS FILES -->
    <link rel="stylesheet" href="css/bootstrap.min.css" />
    <link rel="stylesheet" href="css/style.css" />
    <link rel="stylesheet" type="text/css" href="css/style.css" media="screen" data-name="skins" />
    <link rel="stylesheet" type="text/css" href="css/sliderSetting.css" media="screen" />
    <link href="css/switcherLang.css" rel="stylesheet" />
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <link href="css/easy-responsive-tabs.css" rel="stylesheet" />
    <link href="css/jqueryCalendar-ui.min.css" rel="stylesheet" />
    <link href="css/fullcalendar.css" rel="stylesheet" />
    <link href='../fullcalendar.print.css' rel='stylesheet' media='print' />
    <link href="css/btnMenu.css" rel="stylesheet" />
    <link href="themes/default/easyui.css" rel="stylesheet" />
    <link href="themes/icon.css" rel="stylesheet" />
    <link href="themes/demo.css" rel="stylesheet" />
    <link href="css/uploadImg.css" rel="stylesheet" />
    <link href="css/bootstrapValidator.css" rel="stylesheet" />
    <link href="css/sweetalert.css" rel="stylesheet" />
    <link href="css/facebook.css" rel="stylesheet" />

    <script src="js/jquery-1.10.2.min.js"></script>
    <script src="js/styleSwitchLangActivation.js"></script>
</head>
<body>
    <form id="form1" runat="server">
        <!--Start Header-->
        <header id="header">
            <div id="logo-bar" class="clearfix">
                <!-- Container -->
                <div class="container">
                    <div class="row">
                        <a href="Default.aspx">
                            <img src="images/logo.png" alt="Velocity" /></a>
                    </div>
                </div>
            </div>
            <div id="top-bar" class="row">
                <br />
                <br />
                <br />
            </div>
            <!-- LOGO bar -->
            <!--LOGO bar / End-->
            <!-- Navigation
        ================================================== -->
        </header>
        <!--End Header-->
        <!--start Content-->
        <section class="wrapper">

            <section class="content left_sidebar">
                <div class="container">
                    <div class=" row">
                        <h1 data-langg="thk">Activation has been successfully</h1>
                        <h3 data-langg="now">Now you can use all system features after login:</h3>
                        <h4><asp:LinkButton runat="server" ID="lnkToLogin" OnClick="lnkToLogin_Click"><ins data-langg="lnk">Subscriptions System</ins></asp:LinkButton></h4>
                    </div>
                </div>
            </section>
        </section>
        <!--end Content-->
        <!--start footer-->
        <footer>
            <section class="footer_bottom">
                <div class="container">
                    <div class="row">
                        <br />
                        <br />
                        <br />
                    </div>
                </div>
            </section>
        </footer>
        <div class="clear"></div>
        <!--end footer-->
    </form>
</body>
</html>

