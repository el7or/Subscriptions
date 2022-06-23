<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ClientSummary.aspx.cs" Inherits="SubscriptionsApi.ClientSummary" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title data-langg="titleSite">My Subscriptions</title>

    <!-- CSS FILES -->
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <link href="css/style.css" rel="stylesheet" />
    <link href="css/sweetalert.css" rel="stylesheet" />
    <link href="css/sliderSetting.css" media="screen" rel="stylesheet" type="text/css" />
    <link href="css/switcherLang.css" rel="stylesheet" />
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <link href="css-dataTable/jquery.dataTables.min.css" rel="stylesheet" />
    <link href="css-dataTable/buttons.dataTables.min.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="userUID" runat="server" />
        <header id="header">
            <div id="logo-bar" class="clearfix">
                <div class="container">
                    <div class="row">
                        <a href="ClientSummary.aspx">
                            <img src="Images/logo.png" alt="Subs" /></a>
                    </div>
                </div>
            </div>
            <div id="top-bar" class="row">
                <div id="topbar1" class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <span id="company" data-langg="company">Company Name..</span>
                </div>
                <div id="topbar2" class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <span id="owner" data-langg="owner">User Name..</span>
                    <br />
                    <label id="ownerEmail">email..</label>
                </div>
                <div id="topbar3" class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <asp:LinkButton ID="btnLogOut" runat="server" CssClass="btn btn-sm" OnClick="btnLogOut_Click1">
                        <span class="glyphicon glyphicon-log-out"></span>&nbsp;&nbsp;Log out
                    </asp:LinkButton>
                </div>
            </div>
        </header>
        <section class="wrapper">
            <div class="container">
                <div class=" row">
                    <div  id="allContent" class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="blog_large">
                            <article>
                                <div class="dividerHeading">
                                    <h4>
                                        <span data-langg="notifHead">My Subscriptions</span>
                                    </h4>
                                    <br />
                                </div>
                                <table id="endSubs" class="table table-striped table-hover ui-widget-content">
                                    <thead>
                                        <tr>
                                            <th hidden="hidden">partyID</th>
                                            <th hidden="hidden">memShipID</th>
                                            <th hidden="hidden">invoiceID</th>
                                            <td></td>
                                        </tr>
                                    </thead>
                                </table>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <footer>
            <section class="footer_bottom">
                <div class="container">
                    <div class="row">
                        <div id="copydiv" class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                            <p class="copyright">&copy; Copyright 2016 | Powered by &ensp;<a href="http://www.egyis.com/" target="_blank">EgyIs</a></p>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                            <div class="footer_social">
                                <ul class="footbot_social">
                                    <li><a class="fb" href="#." data-placement="top" title="Facbook"><i class="fa fa-facebook"></i></a></li>
                                    <li><a class="twtr" href="#." data-placement="top" title="Twitter"><i class="fa fa-twitter"></i></a></li>
                                    <li><a class="rss" href="#." data-placement="top" title="Youtube"><i class="fa fa-youtube"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    </form>

   <!-- Start Style Left Sliders -->
    <div class="switcherLang"></div>
    <div class="sliderSetting"></div>

    <script src="js/jquery-1.10.2.min.js"></script>
    <script src="js/spin.js"></script>

    <%--<script src="https://www.promisejs.org/polyfills/promise-7.0.4.min.js"></script>--%>
    <script src="js/jquery-ui.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/styleSetting.js"></script>
    <script src="js/styleSwitchLangClient.js"></script>
    <script src="js/bootstrapValidator.js"></script>
    <script src="js/language/ar_MA.js"></script>
    <script src="js/language/en_US.js"></script>
    <script src="js/initialValidator.js"></script>
    <script src="js/sweetalert-dev.js"></script>
    <script src="js-dataTable/jquery.dataTables.min.js"></script>
    <script src="js-dataTable/dataTables.buttons.min.js"></script>
    <script src="js-dataTable/buttons.flash.min.js"></script>
    <script src="js-dataTable/jszip.min.js"></script>
    <script src="js-dataTable/pdfmake.min.js"></script>
    <script src="js-dataTable/vfs_fonts.js"></script>
    <script src="js-dataTable/buttons.html5.min.js"></script>
    <script src="js-dataTable/buttons.print.min.js"></script>
    <script src="js/initialDataTables.js"></script>
    <script src="js/bootstrap-toggle.min.js"></script>
    <script src="js/callMemberAPIs.js"></script>
    <script>
        var langgSite = 'en';
        var dateFormatSite = 'mm-dd-yy';
    </script>
</body>
</html>
