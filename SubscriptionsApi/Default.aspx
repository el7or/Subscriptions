<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="MvcSubscripers.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

    <title data-langg="titleSite">Subscriptions Management System</title>

    <!-- CSS FILES -->
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <link href="css/style.css" rel="stylesheet" />
    <%--<link href="css/style.css" media="screen" data-name="skins" rel="stylesheet" type="text/css" />--%>
    <link href="css/sliderSetting.css" media="screen" rel="stylesheet" type="text/css" />
    <link href="css/switcherLang.css" rel="stylesheet" />
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <link href="css/easy-responsive-tabs.css" rel="stylesheet" />
    <link href="css/jqueryCalendar-ui.min.css" rel="stylesheet" />
    <link href="css/fullcalendar.css" rel="stylesheet" />
    <link href='fullcalendar.print.css' rel='stylesheet' media="print" />
    <link href="css/btnMenu.css" rel="stylesheet" />
    <link href="themes/default/easyui.css" rel="stylesheet" />
    <link href="themes/icon.css" rel="stylesheet" />
    <link href="themes/demo.css" rel="stylesheet" />
    <link href="css/uploadImg.css" rel="stylesheet" />
    <link href="css/bootstrapValidator.css" rel="stylesheet" />
    <link href="css/sweetalert.css" rel="stylesheet" />
    <link href="css/facebook.css" rel="stylesheet" />
    <link href="css-dataTable/jquery.dataTables.min.css" rel="stylesheet" />
    <link href="css-dataTable/buttons.dataTables.min.css" rel="stylesheet" />
    <link href="css/bootstrap-toggle.min.css" rel="stylesheet" />
    <link href="css/style_invoice.css" rel="stylesheet" />
    <link href="css/jquery.timepicker.css" rel="stylesheet" />
    <style type="text/css" media="print" id="printBillmedia"></style>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="userUID" runat="server" />
        <!--Start Header-->
        <header id="header">
            <%--<div id="logo-bar" class="clearfix">
                <!-- Container -->
                <div class="container">
                    <div class="row">
                            <img src="Images/logo.png" alt="Subs" />
                    </div>
                </div>
            </div>--%>
            <div id="top-bar" class="row">
                <div id="topbar1" class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <img id="logoPage" src="Images/logo.png" alt="Subs" />
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
                <div class="open menu-tooltip" data-toggle="tooltip" data-placement="left" title="Main menu">
                    <article class="cls"></article>
                    <article id="mainMenu" class="cls">
                        <ul class="sub-menu">
                            <li><a href="#" class="linkMenu" data-langg="menu1" onclick="dialogMemType()">Programmes</a> </li>
                            <li><a href="#" class="linkMenu" data-langg="menu2" onclick="dialogItems()">Extras</a> </li>
                            <li><a href="#" class="linkMenu" data-langg="menu3" onclick="dialogStaff()">Staff</a> </li>
                            <li><a href="#" class="linkMenu" data-langg="menu4" onclick="dialogReports()">Reports</a></li>
                            <li><a href="#" class="linkMenu" data-langg="menu5" onclick="dialogSettings()">Settings</a></li>
                            <li><a href="http://www.marchesuite.com/sms/Utilities/MarcheSubscriptionManager-UserManual.pdf" class="linkMenu" data-langg="menu6" target="_blank">Help</a></li>
                        </ul>
                    </article>
                    <article class="cls"></article>
                </div>
            </div>
            <!-- LOGO bar -->
            <!--LOGO bar / End-->
            <!-- Navigation
        ================================================== -->
        </header>
        <!--End Header-->
        <!--start Content-->
        <section class="wrapper">
            <div class="container">
                <div class=" row">
                    <!--Sidebar Widget-->
                    <div id="lSide" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div id="allContent">
                            <div class="dividerHeading">
                                <h4>
                                    <span data-langg="searchHead">Subscripers</span>
                                </h4>
                            </div>
                            <div class="sidebar">
                                <div class="widget widget_search">
                                    <div class="site-search-area">
                                        <div id="site-searchform">
                                            <input id="addMember" value="Add New Member" type="button" onclick="checkCompanyActivate(); $(this).blur();" data-toggle="tooltip" data-placement="top" title="Add Subscriber" />
                                            <input class="SearchText" name="s" id="s" placeholder="Name or Phone .." type="text" />
                                        </div>
                                    </div>
                                </div>
                                <!-- end site search -->
                            </div>

                            <div class="dividerHeading">
                                <h4>
                                    <span data-langg="calendarHead">Subscriptions</span>
                                </h4>
                                <br />
                            </div>
                            <div id="calAll">
                                <%--<div id='top'>
                                        Language:
                                    <select id='lang-selector'></select>
                                    </div>
                                    <hr />--%>
                                <div id='calendar'>
                                    <input class="ui-corner-all form-control" name="calSearch" id="calSearch" placeholder="Program name .." type="text" tabindex="-1" autofocus="autofocus" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="rSide" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div class="blog_large">
                            <article>
                                <div class="dividerHeading">
                                    <h4>
                                        <span data-langg="notifHead">Notifications</span>
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
                                            <td></td>
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
        <!--end Content-->
        <!--start footer-->
        <footer>
            <section class="footer_bottom">
                <div class="container">
                    <div class="row">
                        <div id="copydiv" class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                            <p class="copyright">&copy; Copyright 2016 | Powered by &ensp;<a href="http://www.marchesuite.com/" target="_blank">MarcheSuite</a></p>
                            <p class="copyright">support@marchesuite.com</p>
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
        <!--end footer-->
    </form>

    <!--Dialog for detalis of members-->
    <div id="dialog-form" title="Member profile">
        <div class="container dialogHead">
            <div id="div1DialogHead" class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                <label id="memberName" data-langg="memberNameTop">New Member</label>
                <br />
                <label id="memberJoining">Joining at: 2017-1-1</label>
            </div>
            <div id="div2DialogHead" class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                <label id="memberDesc"></label>
                <div><a id="memberTotalDues" data-toggle="tooltip" data-placement="top" title="Click to show all invoices for this member!"></a></div>
            </div>
            <div id="div3DialogHead" class="col-lg-3 col-md-3 col-sm-3 col-xs-12 divCheckIn">
                <button type="button" id="btnInvoice" class="btn btn-sm btn-invoice">
                    <i class="fa fa-cart-arrow-down"></i><span data-langg="btninv">&nbsp;&nbsp;Invoice</span>
                </button>
                <button type="button" id="btnAccount" class="btn btn-sm btn-checkin" onclick="dialogAccountMember(memID)">
                </button>
            </div>
        </div>
        <div id="tabsMember">
            <ul>
                <li id="tab1member"><a href="#tabsMember-1">Subscriber</a></li>
                <li id="tab2member"><a href="#tabsMember-2">Subscribe</a></li>
                <li id="tab3member"><a href="#tabsMember-3">Visits</a></li>
                <li id="tab4member"><a href="#tabsMember-4">Invoice</a></li>
                <li id="tab5member"><a href="#tabsMember-5">Subscriptions</a></li>
            </ul>
            <div id="tabsMember-1">
                <div class="row">
                    <form id="frmMember" class="form-horizontal">
                        <fieldset class="dialog-inputs">
                            <div id="image-preview" class="centerAlign col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                <label for="image-upload" id="image-label" data-langg="memImg">Choose Photo</label>
                                <input type="file" name="image" id="image-upload" />
                                <br />
                            </div>
                            <div id="div2Meminf" class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                <div class="form-group ">
                                    <label for="firstName" data-langg="memFName">First Name:</label>
                                    <input type="text" name="firstName" id="firstName" value="" class="ui-widget-content ui-corner-all form-control" />
                                </div>
                                <div class="form-group">
                                    <label for="name" data-langg="memLName">Last Name:</label>
                                    <input type="text" name="name" id="name" value="" class="ui-widget-content ui-corner-all form-control" />
                                </div>
                                <div class="form-group">
                                    <label for="email" data-langg="memEmail">Email:</label>
                                    <input type="text" name="email" id="email" value="" class="ui-widget-content ui-corner-all form-control" />
                                </div>
                                <div class="form-group">
                                    <label for="phone" data-langg="memPhone">Phone:</label>
                                    <input type="tel" name="phone" id="phone" value="" class="ui-widget-content ui-corner-all form-control" />
                                </div>
                            </div>
                            <div id="div3Meminf" class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                <div class="form-group">
                                    <label id="memBirthDate" for="birthDate" data-langg="memBirth">Birthday:<small>(Day/Month/Year)</small></label>
                                    <input type='text' name="birthDate" id="birthDate" class="datePick ui-widget-content ui-corner-all form-control" />
                                </div>
                                <div class="form-group">
                                    <label for="flipswitch" data-langg="memSex">Gender:</label>
                                    <div id="options" class="btn-group" data-toggle="buttons">
                                        <label id="btnMale" class="btn btn-primary btn-sm rdbtn" data-langg="male">
                                            <input type="radio" name="options" id="option1" />Male
                                   
                                        </label>
                                        <label id="btnFemale" class="btn btn-primary btn-sm rdbtn" data-langg="female">
                                            <input type="radio" name="options" id="option2" />Female
                                   
                                        </label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="adress" data-langg="memAdress">Adress:</label>
                                    <input type="text" name="adress" id="adress" value="" class="ui-widget-content ui-corner-all form-control" />
                                </div>
                                <div class="form-group">
                                    <label for="note" data-langg="memNote">Note:</label>
                                    <textarea name="note" id="note" class="ui-widget-content ui-corner-all form-control"></textarea>
                                </div>
                            </div>
                        </fieldset>
                        <div class="text-center well well-sm">
                            <button id="btnNextMemInfo" class="btn btn-success" type="submit" data-langg="nextMem">Next</button>
                            <button class="btn btn-danger" type="button">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
            <div id="tabsMember-2">
                <form id="frmMembership" class="form-horizontal">
                    <fieldset class="dialog-inputs">
                        <div class="row">
                            <div id="div1Mems" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-group">
                                    <label for="division" data-langg="divs">Division:</label>
                                    <select name="division" id="division" class="ui-widget-content ui-corner-all form-control">
                                        <option selected="selected" disabled="disabled" value="" data-langg="divch">--Choose--</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="basis2" data-langg="nprog">Programme:</label>
                                    <select name="basis2" id="basis2" class="ui-widget-content ui-corner-all form-control">
                                        <option selected="selected" disabled="disabled" value="" data-langg="progch">--Choose--</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="specalistMem" data-langg="">Specialist:</label>
                                    <select name="specalistMem" id="specalistMem" class="ui-widget-content ui-corner-all form-control">
                                        <option selected="selected" disabled="disabled" value="" data-langg="">--Choose--</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label id="startDateFix" for="startfixed2" data-langg="stfix">Start date:</label>
                                    <input type="text" name="startfixed2" id="startfixed2" class="datePick ui-widget-content ui-corner-all form-control" />
                                </div>
                                <div id="openProg2" class="progs2 form-group" data-basis="openProgram">
                                    <label for="endOpen" data-langg="endop">End date:</label>
                                    <input type="text" readonly="readonly" name="endOpen" id="endOpen" class="datePick dateOff ui-widget-content ui-corner-all form-control" />
                                </div>
                                <div id="fixedProg2" class="progs2 form-group" data-basis="fixedProgram">
                                    <label for="periodFrom" data-langg="perio">Period:</label>
                                    <input type="text" readonly="readonly" value="1/1/2016" name="periodFrom" id="periodFrom" class="datePick dateOff ui-widget-content ui-corner-all form-control" />
                                    <label style="display: inline-block" data-langg="to">To &nbsp;</label>
                                    <input type="text" readonly="readonly" value="31/1/2016" name="periodTo" id="periodTo" class="datePick dateOff ui-widget-content ui-corner-all form-control" />
                                </div>
                                <div id="oneVisit2" class="progs2 form-group" data-basis="oneVisit">
                                    <div class="form-group">
                                        <label for="totalVisit11" data-langg="totvst1">Booked up Visits:</label>
                                        <input type="text" name="totalVisit11" id="totalVisit11" value="1" class="ui-widget-content ui-corner-all form-control" />
                                    </div>
                                </div>
                                <div id="oneVisitData" class="progs2" data-basis="oneVisit">
                                    <div class="form-group">
                                        <label for="startTimeOneVisit" data-langg="">Start Time:</label>
                                        <input type="text" name="startTimeOneVisit" id="startTimeOneVisit" class="timepicker ui-widget-content ui-corner-all form-control" placeholder="HH:mm" />
                                    </div>
                                    <div class="form-group">
                                        <label for="prevBooked" data-langg="">Selected day reservation number:</label>
                                        <input type="text" name="prevBooked" id="prevBooked" class="ui-widget-content ui-corner-all form-control" disabled="disabled" />
                                    </div>
                                </div>
                                <div id="visitProg2" class="progs2 form-group" data-basis="multiVisits">
                                    <label for="totalVisit2" data-langg="totvst2">Programme Visits:</label>
                                    <input type="text" readonly="readonly" name="totalVisit2" id="totalVisit2" value="" class="ui-widget-content ui-corner-all form-control" />
                                </div>
                                <div id="packageProg" class="progs2 form-group" data-basis="Package">
                                    <label for="previewPackage2" data-langg="">Preview Package:</label>
                                    <ul id="previewPackage2">
                                    </ul>
                                    <hr />
                                </div>
                                <div class="form-group">
                                    <label for="totalPrice" data-langg="totprc">Total price:</label>
                                    <input type="text" readonly="readonly" name="totalPrice" id="totalPrice" value="0.00" class="ui-widget-content ui-corner-all form-control " />
                                </div>
                            </div>
                            <div id="div2Mems" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div id="progDesc" class="form-group">
                                    <label for="noteProg2" data-langg="memNoteProg2">Program Description:</label>
                                    <textarea disabled="disabled" name="noteProg2" id="noteProg2" class="ui-widget-content ui-corner-all form-control"></textarea>
                                </div>
                                <div id="progDaysSubs" class="form-group">
                                    <label data-langg="progDays2">Days:</label>
                                    <div>
                                        <input disabled="disabled" type="checkbox" value="0" class="inlineDivs" title="Sunday" /><label class="inlineDivs" data-langg="progDaySunday2">Sunday </label>
                                        <input disabled="disabled" type="checkbox" value="1" class="inlineDivs" title="Monday" /><label class="inlineDivs" data-langg="progDayMonday2">Monday </label>
                                        <input disabled="disabled" type="checkbox" value="2" class="inlineDivs" title="Tuesday" /><label class="inlineDivs" data-langg="progDayTuesday2">Tuesday </label>
                                    </div>
                                    <div>
                                        <input disabled="disabled" type="checkbox" value="3" class="inlineDivs" title="Wednesday" /><label class="inlineDivs" data-langg="progDayWednesday2">Wednesday </label>
                                        <input disabled="disabled" type="checkbox" value="4" class="inlineDivs" title="Thursday" /><label class="inlineDivs" data-langg="progDayThursday2">Thursday </label>
                                        <input disabled="disabled" type="checkbox" value="5" class="inlineDivs" title="Friday" /><label class="inlineDivs" data-langg="progDayFriday2">Friday </label>
                                        <input disabled="disabled" type="checkbox" value="6" class="inlineDivs" title="Saturday" /><label class="inlineDivs" data-langg="progDaySaturday2">Saturday</label>
                                    </div>
                                </div>
                                <div id="progTimes2" class="form-group">
                                    <div id="progTimeFrom" class="form-group inlineDivs halfWidth">
                                        <label for="startTime2" data-langg="progTimeSt2">Start time:</label>
                                        <input disabled="disabled" type="text" name="startTime2" id="startTime2" class="ui-widget-content ui-corner-all form-control" placeholder="HH:mm" />
                                    </div>
                                    <div id="progTimeTo" class="form-group inlineDivs halfWidth">
                                        <label for="endTime2" data-langg="progTimeEnd2">End time:</label>
                                        <input disabled="disabled" type="text" name="endTime2" id="endTime2" class="ui-widget-content ui-corner-all form-control" placeholder="HH:mm" />
                                    </div>
                                </div>
                                <div id="progValidPeriod">
                                    <div class="form-group">
                                        <label for="progValidDays2" data-langg="progValidDur2">Validation Duration:</label>
                                    </div>
                                    <div class="form-group inlineDivs halfWidth">
                                        <input disabled="disabled" type="text" value="" name="progValidDays2" id="progValidDays2" class="ui-widget-content ui-corner-all form-control" />
                                    </div>
                                    <div class="form-group inlineDivs halfWidth">
                                        <label data-langg="progValidDays2">&ensp;&ensp;Days</label>
                                    </div>
                                </div>
                                <div id="progCapacityy">
                                    <div class="form-group">
                                        <label for="progCapacity2" data-langg="progCapacity2">Capacity:</label>
                                    </div>
                                    <div class="form-group inlineDivs halfWidth">
                                        <input disabled="disabled" type="text" value="" name="progCapacity2" id="progCapacity2" class="ui-widget-content ui-corner-all form-control" />
                                    </div>
                                    <div class="form-group inlineDivs halfWidth">
                                        <label data-langg="progCapacityMems2">&ensp;&ensp;Subscribers</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <div class="text-center well well-sm">
                        <button id="btnAnotherMembership" class="btn btn-info" type="submit" data-langg="">Add Another</button>
                        <button id="btnSubmitMembership" class="btn btn-success" type="submit" data-langg="nextMemship">Next</button>
                        <button class="btn btn-danger" type="button">Cancel</button>
                    </div>
                </form>
            </div>
            <div id="tabsMember-3">
                <table class="table table-striped table-hover tblMerg" id="visitsHistory">
                    <thead>
                        <tr>
                            <th hidden="hidden">visitID</th>
                            <th data-langg="">Programme</th>
                            <th data-langg="">Specialist</th>
                            <th data-langg="">Booked Date</th>
                            <th data-langg="">Booked Time</th>
                            <th data-langg="">Sequence</th>
                            <th data-langg="">Check-in Date</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div id="tabsMember-4">
                <div id="billContent">
                    <header id="billHead">
                        <address class="client">
                            <div id="invCompName" class="to">Company Name</div>
                            <div class="Address">
                                <p id="invCompUser">User 1</p>
                            </div>
                            <div class="phone" style="display: none;">
                                <p id="invCompPhone">(800) 555-1234</p>
                            </div>
                            <div class="email" style="display: none;">
                                <p id="invCompEmail">company@example.com</p>
                            </div>
                        </address>
                        <span>
                            <img id="logoBill" alt="" src="images/logo.png" /></span>
                    </header>
                    <div id="article">
                        <div class="client">
                            <div class="to" data-langg="billTo">INVOICE TO:</div>
                            <h2 id="invToName" class="name">John Doe</h2>
                            <div id="invToPhone" class="phone">0258445631</div>
                            <div class="email">
                                <p id="invToEmail">Person@example.com</p>
                            </div>
                        </div>
                        <table class="meta">
                            <tr>
                                <th hidden="hidden" scope="row"><span id="invID">25425435</span></th>
                                <th><span data-langg="billNumber">Invoice #</span></th>
                                <td><span id="invSerial">101138</span></td>
                            </tr>
                            <tr>
                                <th><span data-langg="billDateTime">Date / Time</span></th>
                                <td><span id="invDateTime">January 1, 2012</span></td>
                            </tr>
                            <tr>
                                <th><span data-langg="billAmount">Amount Due</span></th>
                                <td><span>$</span><span>600.00</span></td>
                            </tr>
                        </table>
                        <table class="inventory">
                            <thead>
                                <tr>
                                    <th hidden="hidden" scope="row">ID</th>
                                    <th><span data-langg="billItem">Item</span></th>
                                    <th><span data-langg="billPrice">Price</span></th>
                                    <th><span data-langg="billQTY">Quantity</span></th>
                                    <th><span data-langg="billSubTotal">SubTotal</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th hidden="hidden" scope="row">ID</th>
                                    <td>
                                        <input type="text" placeholder="Choose item .." class="itemList" /><span></span></td>
                                    <td><span data-prefix="">$</span><span>150.00</span></td>
                                    <td><span data-qty=""></span><span>1</span></td>
                                    <td><span data-prefix="">$</span><span>600.00</span></td>
                                </tr>
                            </tbody>
                        </table>
                        <a class="add">&#x271A;</a>

                        <table class="balance">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th colspan="2"><span data-langg="billTotal">Total</span></th>
                                    <td colspan="2"><span data-prefix="">$</span><span>600.00</span></td>
                                </tr>
                                <tr>
                                    <th colspan="2"><span data-langg="billDiscount">Discount</span></th>
                                    <td><span data-percent="">%</span><span id="invcDiscountPer" class="tabable" contenteditable="true" onclick="selectAllText('invcDiscountPer')" onfocus="selectAllText('invcDiscountPer')" tabindex="-1">0.00</span></td>
                                    <td><span data-prefix="">$</span><span id="invcDiscountVal" class="tabable" contenteditable="true" onclick="selectAllText('invcDiscountVal')" onfocus="selectAllText('invcDiscountVal')" tabindex="1">0.00</span></td>
                                </tr>
                                <tr>
                                    <th colspan="2"><span data-langg="billTax">Taxes</span></th>
                                    <td><span data-percent="">%</span><span id="invcTaxPer" class="tabable" contenteditable="true" onclick="selectAllText('invcTaxPer')" onfocus="selectAllText('invcTaxPer')" tabindex="-1">0.00</span></td>
                                    <td><span data-prefix="">$</span><span id="invcTaxVal" class="tabable" contenteditable="true" onclick="selectAllText('invcTaxVal')" onfocus="selectAllText('invcTaxVal')" tabindex="2">0.00</span></td>
                                </tr>
                                <tr>
                                    <th colspan="2"><span data-langg="billGrand">Grand Total</span></th>
                                    <td colspan="2"><span data-prefix="">$</span><span>0.00</span></td>
                                </tr>
                                <tr>
                                    <th><span data-langg="billPrev">Prev Payments</span></th>
                                    <td><span data-prefix="">$</span><span id="invcPrevPaid">0.00</span></td>
                                    <th><span data-langg="billPaid">Current Paid</span></th>
                                    <td>
                                        <p id="containerPaid" class="btn-warning badge"><span data-prefix="">$</span><span id="InvcPaid" contenteditable="true" onclick="selectAllText('InvcPaid')" onfocus="selectAllText('InvcPaid')" class="tabable" tabindex="3">0.00</span></p>
                                    </td>
                                </tr>
                                <tr>
                                    <th><span data-langg="billDue">Balance Due</span></th>
                                    <td><span data-prefix="">$</span><span id="invDue">600.00</span></td>
                                    <th><span data-langg="billNext">Next Payment</span></th>
                                    <td>
                                        <input type="text" name="invNextPaid" id="invNextPaid" class="datePick" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="text-center well well-sm">
                    <a class="refund" data-langg="invRefund">refund</a>
                    <button id="SubmitMembership" class="btn btn-success tabable" type="submit" tabindex="4">Save</button>
                    <button id="printMembership" class="btn btn-info tabable" type="submit" data-langg="billPrint" tabindex="5">Save & Print</button>
                    <button class="btn btn-danger tabable" type="button" tabindex="6">Close</button>
                </div>
            </div>
            <div id="tabsMember-5">
                <table class="table table-striped table-hover tblMerg" id="memHistory">
                    <thead>
                        <tr>
                            <th hidden="hidden">ID</th>
                            <th hidden="hidden">progID</th>
                            <th hidden="hidden">invoiceID</th>
                            <th data-langg="gdHisType">Membership Type</th>
                            <th data-langg="gdHisStDate">Start Date</th>
                            <th data-langg="gdHisEndDate">End Date</th>
                            <th data-langg="gdHisBookviss">Booked Visits</th>
                            <th data-langg="gdHisviss">Used Visits</th>
                            <th data-langg="">Visits</th>
                            <th data-langg="gdHisDue">Check-in</th>
                            <th data-langg="gdHisRenew">Renewal</th>
                            <th></th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>

    <!--small dialog for access account for member-->
    <div id="dialogAccountMember" title="Access account">
        <form id="frmAccountMem" class="form-horizontal">
            <fieldset class="dialog-inputs">
                <input id="accMemUserID" type="hidden" />
                <div class="form-group ">
                    <label for="accEmailMem" data-langg="accEmailMem">Email:</label>
                    <input type="text" name="accEmailMem" id="accEmailMem" value="" placeholder="example@ex.com" class="ui-widget-content ui-corner-all form-control" />
                </div>
                <div class="form-group">
                    <label for="accPassMem" data-langg="accPassMem">Password:</label>
                    <input type="password" value="" id="accPassMem" name="accPassMem" class="ui-widget-content ui-corner-all form-control" />
                </div>
                <div class="form-group">
                    <label for="accPassConfMem" data-langg="accPassConfMem">Confirm Password:</label>
                    <input type="password" value="" id="accPassConfMem" name="accPassConfMem" class="ui-widget-content ui-corner-all form-control" />
                </div>
            </fieldset>
            <div class="well well-sm">
                <button id="saveAccMem" class="btn btn-success" type="submit" data-langg="saveAccMem">Save</button>
                <button class="btn btn-danger" type="button" onclick="$('#dialogAccountMember').dialog('close')" data-langg="closeAccMem">Close</button>
                <button id="blockAccMem" class="btn btn-warning" type="button" tabindex="-1">Block</button>
            </div>
        </form>
    </div>

    <!--Dialog for Programmes types-->
    <div id="dialogMemType" title="Programmes Management">
        <div id="tabsMem">
            <ul>
                <li><a href="#tabsMem-1">Add Programme</a></li>
                <li><a href="#tabsMem-2">Existing Programmes</a></li>
            </ul>
            <div id="tabsMem-1">
                <div id="programForm" class="row">
                    <form id="frmProgram" class="form-horizontal">
                        <fieldset class="dialog-inputs">
                            <div id="div1memType" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <h3 data-langg="typeProgInfo">Programme Info</h3>
                                <div class="form-group ">
                                    <label for="membershipName" data-langg="typeProgName">Name:</label>
                                    <input type="text" name="membershipName" id="membershipName" value="" class="ui-widget-content ui-corner-all form-control" tabindex="0" maxlength="50" />
                                </div>
                                <div class="form-group">
                                    <label for="division" data-langg="typeProgdiv">Division:</label>
                                    <select name="division" id="divs" class="ui-widget-content ui-corner-all form-control">
                                    </select>
                                    <a href="#" id="btnDivs" class="btn btn-primary btn-success editMem" data-toggle="tooltip" data-placement="top" title=""><span class="glyphicon glyphicon-pencil"></span></a>
                                </div>
                                <div class="form-group">
                                    <label for="cost" data-langg="typeProgfee">Programme Fees:</label>
                                    <input type="text" value="0.00" id="progFee" name="cost" class="ui-widget-content ui-corner-all form-control" />
                                </div>
                                <div class="form-group">
                                    <label for="noteProg" data-langg="memNoteProg">Program Description:</label>
                                    <textarea rows="7" name="noteProg" id="noteProg" class="ui-widget-content ui-corner-all form-control"></textarea>
                                </div>
                            </div>
                            <div id="div2memType" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <h3 data-langg="typeProgLen">Programme Length</h3>
                                <div class="form-group">
                                    <label for="basis" data-langg="typeProgbais">Programme Basis:</label>
                                    <select name="types" id="basis" class="ui-widget-content ui-corner-all form-control basis">
                                        <option value="openProgram" data-langg="typeOpenProg">Open programme</option>
                                        <option value="fixedProgram" data-langg="typeFixProg">Fixed Period</option>
                                        <option value="oneVisit" data-langg="type1visProg">Per Single Visit</option>
                                        <option value="multiVisits" data-langg="typevissProg">Multi Visits</option>
                                        <option value="Package" data-langg="">Package</option>
                                    </select>
                                </div>
                                <div id="openProgram" class="progs openProgram ">
                                    <div class="form-group">
                                        <label for="lenProg" data-langg="openProglen">Duration:</label>
                                    </div>
                                    <div id="lenBasis" class="form-group inlineDivs halfWidth">
                                        <input type="text" value="1" name="lenProg" id="nBasis" class="ui-widget-content ui-corner-all form-control" />
                                    </div>
                                    <div class="form-group inlineDivs halfWidth">
                                        <select class="ui-widget-content ui-corner-all  form-control" name="lenUnit" id="sBasis">
                                            <option value="Day" data-langg="openProg-day">Day</option>
                                            <option value="Month" data-langg="openProg-month">Month</option>
                                            <option value="Year" data-langg="openProg-year">Year</option>
                                        </select>
                                    </div>
                                </div>
                                <div id="fixedProgram" class="progs fixedProgram">
                                    <div class="form-group inlineDivs halfWidth">
                                        <label id="startProgFix" for="startfixed" data-langg="progFixSt">Start date:</label>
                                        <input type="text" name="startfixed" id="startfixed" class="datePick ui-widget-content ui-corner-all form-control startfixed" />
                                    </div>
                                    <div class="form-group inlineDivs halfWidth">
                                        <label id="endProgFix" for="endFixed" data-langg="progFixEnd">End date:</label>
                                        <input type="text" name="endFixed" id="endFixed" class="datePick ui-widget-content ui-corner-all form-control endFixed" />
                                    </div>
                                </div>
                                <div id="oneVisit" class="progs oneVisit form-group">
                                    <label for="totalVisit1" data-langg="progFix1vis">Number of Visits:</label>
                                    <input type="text" readonly="readonly" name="totalVisit1" id="totalVisit1" value="1" class="ui-widget-content ui-corner-all form-control" />
                                </div>
                                <div id="multiVisits" class="progs multiVisits form-group">
                                    <label for="totalVisit" data-langg="progFixviss">Number of Visits:</label>
                                    <input type="text" name="totalVisit" id="totalVisit" value="2" class="ui-widget-content ui-corner-all form-control" />
                                </div>
                                <div id="Package" class="progs Package form-group">
                                    <div class="form-group inlineDivs halfWidth">
                                        <label for="packages" data-langg="">Package Programme:</label>
                                        <select name="packages" id="packages" class="ui-widget-content ui-corner-all form-control">
                                            <option selected="selected" disabled="disabled" value="" data-langg="">--Choose--</option>
                                        </select>
                                    </div>
                                    <div class="form-group inlineDivs halfWidth">
                                        <label for="packageCount" data-langg="">Visits Count:</label>
                                        <input type="text" name="packageCount" id="packageCount" value="1" class="ui-widget-content ui-corner-all form-control" />
                                        <button id="addPackage" class="btn btn-info" type="button">Add</button>
                                    </div>
                                    <div class="form-group">
                                        <label for="previewPackage" data-langg="">Preview:</label>
                                        <button id="clearPackage" class="btn btn-warning" type="button">Clear</button>
                                        <ul id="previewPackage">
                                        </ul>
                                    </div>
                                </div>
                                <hr />
                                <div id="progDays" class="form-group">
                                    <label data-langg="progDays">Days (Optional):</label>
                                    <input type="checkbox" value="0" class="inlineDivs" data-toggle="tooltip" data-placement="top" title="Sunday" /><label class="inlineDivs" data-langg="progDaySunday">S</label>
                                    <input type="checkbox" value="1" class="inlineDivs" data-toggle="tooltip" data-placement="top" title="Monday" /><label class="inlineDivs" data-langg="progDayMonday">M</label>
                                    <input type="checkbox" value="2" class="inlineDivs" data-toggle="tooltip" data-placement="top" title="Tuesday" /><label class="inlineDivs" data-langg="progDayTuesday">T</label>
                                    <input type="checkbox" value="3" class="inlineDivs" data-toggle="tooltip" data-placement="top" title="Wednesday" /><label class="inlineDivs" data-langg="progDayWednesday">W</label>
                                    <input type="checkbox" value="4" class="inlineDivs" data-toggle="tooltip" data-placement="top" title="Thursday" /><label class="inlineDivs" data-langg="progDayThursday">T</label>
                                    <input type="checkbox" value="5" class="inlineDivs" data-toggle="tooltip" data-placement="top" title="Friday" /><label class="inlineDivs" data-langg="progDayFriday">F</label>
                                    <input type="checkbox" value="6" class="inlineDivs" data-toggle="tooltip" data-placement="top" title="Saturday" /><label class="inlineDivs" data-langg="progDaySaturday">S</label>
                                </div>
                                <div id="progTimes" class="form-group">
                                    <div class="form-group inlineDivs halfWidth">
                                        <label for="startTime" data-langg="progTimeSt">Start time:</label>
                                        <input type="text" name="startTime" id="startTime" class="ui-widget-content ui-corner-all form-control" placeholder="HH:mm" />
                                    </div>
                                    <div class="form-group inlineDivs halfWidth">
                                        <label for="endTime" data-langg="progTimeEnd">End time:</label>
                                        <input type="text" name="endTime" id="endTime" class="ui-widget-content ui-corner-all form-control" placeholder="HH:mm" />
                                    </div>
                                </div>
                                <div>
                                    <div class="form-group">
                                        <label for="progValidDays" data-langg="progValidDur">Validation Duration (Optional):</label>
                                    </div>
                                    <div class="form-group inlineDivs halfWidth">
                                        <input type="text" value="" name="progValidDays" id="progValidDays" class="ui-widget-content ui-corner-all form-control" />
                                    </div>
                                    <div class="form-group inlineDivs halfWidth">
                                        <label data-langg="progValidDays">&ensp;&ensp;Days</label>
                                    </div>
                                </div>
                                <div>
                                    <div class="form-group">
                                        <label for="progCapacity" data-langg="progCapacity">Capacity (Optional):</label>
                                    </div>
                                    <div class="form-group inlineDivs halfWidth">
                                        <input type="text" value="" name="progCapacity" id="progCapacity" class="ui-widget-content ui-corner-all form-control" />
                                    </div>
                                    <div class="form-group inlineDivs halfWidth">
                                        <label data-langg="progCapacityMems">&ensp;&ensp;Members</label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <div class="text-center well well-sm">
                            <button id="addProgram" class="btn btn-success" type="submit" tabindex="-1">Save</button>
                            <button class="btn btn-danger" type="button">Close</button>
                        </div>
                    </form>
                </div>
            </div>
            <div id="tabsMem-2">
                <button type="button" name="btnAllProgs" class="btn-info ui-corner-all btn btn-xs" data-langg="allProgs" onclick="GetAllProgrammes()">
                    All Programmes               
                </button>
                <select name="division" id="divs2" class="ui-corner-all btn-info">
                    <option selected="selected" disabled="disabled" value="" data-langg="byDivs">By Division</option>
                </select>
                <table id="membershipGrid" class="table table-striped tblMerg">
                    <thead>
                        <tr>
                            <th hidden="hidden">ID</th>
                            <th data-langg="memTypeGridProg">Type</th>
                            <th data-langg="memTypeGridPrice">Price</th>
                            <th data-langg="memTypeGridCount">Members</th>
                            <th></th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>

    <!--Dialog for Extra items-->
    <div id="dialogItems" title="Extra items">
        <div id="tabsItems">
            <ul>
                <li><a href="#tabsItems-1">Add item</a></li>
                <li><a href="#tabsItems-2">Existing items</a></li>
            </ul>
            <div id="tabsItems-1">
                <div id="itemForm" class="row">
                    <form id="frmItem" class="form-horizontal">
                        <fieldset class="dialog-inputs">
                            <div class="form-group ">
                                <label for="itemName" data-langg="extraItemName">Name:</label>
                                <input type="text" name="itemName" id="itemName" value="" class="ui-widget-content ui-corner-all form-control" tabindex="0" maxlength="50" />
                            </div>
                            <div class="form-group">
                                <label for="itemPrice" data-langg="extraItemPrice">Item Fees:</label>
                                <input type="text" value="0.00" id="itemPrice" name="itemPrice" class="ui-widget-content ui-corner-all form-control" />
                            </div>
                            <div class="form-group">
                                <label for="itemNote" data-langg="extraItemNote">Item Description:</label>
                                <textarea name="itemNote" id="itemNote" class="ui-widget-content ui-corner-all form-control"></textarea>
                            </div>
                        </fieldset>
                        <div class="text-center well well-sm">
                            <button id="addItem" class="btn btn-success" type="submit" tabindex="-1">Save</button>
                            <button class="btn btn-danger" type="button">Close</button>
                        </div>
                    </form>
                </div>
            </div>
            <div id="tabsItems-2">
                <table id="itemsGrid" class="table table-striped tblMerg">
                    <thead>
                        <tr>
                            <th hidden="hidden">ID</th>
                            <th data-langg="itemsGridName">Item</th>
                            <th data-langg="itemsGridPrice">Price</th>
                            <th></th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>

    <!-- Small dialog for Division list -->
    <div id="dialogDivs" title="Divisons List">
        <div id="divsForm">
            <form id="frmAddDiv" class="form-horizontal">
                <div id="divContent" class="inlineDivs">
                    <div class="form-group">
                        <input id="newDiv" name="newDiv" type="text" placeholder="New Division" maxlength="20" class="form-control" />
                    </div>
                </div>
                <button id="addNewDiv" class="inlineDivs" type="submit" data-langg="btnNewDiv">Add</button>
                &ensp;<span id="doneDiv" class="glyphicon glyphicon-ok-circle doneMeta"></span>&ensp;
       
            </form>
            <table class="table table-striped table-bordered" id="tblDivs">
                <thead>
                    <tr hidden="hidden"></tr>
                </thead>
            </table>
        </div>
    </div>

    <!--Dialog for Staff-->
    <div id="dialogStaff" title="Staff Management">
        <div id="tabsStaff">
            <ul>
                <li><a href="#tabsStaff-1">Add New User</a></li>
                <li><a href="#tabsStaff-2">My Staff</a></li>
            </ul>
            <div id="tabsStaff-1">
                <form id="frmStaff" class="form-horizontal">
                    <fieldset class="dialog-inputs">
                        <div class="row">
                            <div id="div1staff" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <h3 data-langg="staffDetail">User Details</h3>
                                <div class="form-group">
                                    <label for="staffName" data-langg="staffN">Name:</label>
                                    <input type="text" name="staffName" id="staffName" value="" class="text ui-widget-content ui-corner-all form-control " />
                                </div>
                                <div class="form-group">
                                    <label for="userName" data-langg="staffUN">User Name:</label>
                                    <input type="text" name="userName" id="userName" value="" class="text ui-widget-content ui-corner-all form-control " />
                                </div>
                                <div class="form-group">
                                    <label for="userPass" data-langg="staffPass">Password:</label>
                                    <input type="password" name="userPass" id="userPass" value="" class="text ui-widget-content ui-corner-all form-control" />
                                </div>
                                <div class="form-group">
                                    <label for="userPassCon" data-langg="staffRePass">Re-enter Password:</label>
                                    <input type="password" name="userPassCon" id="userPassCon" value="" class="text ui-widget-content ui-corner-all form-control" />
                                </div>
                            </div>
                            <div id="div2staff" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <h3 data-langg="staffAccess">Staff Access Rights</h3>
                                <div class="form-group">
                                    <label for="StaffBranch" data-langg="staffbr">Branch:</label>
                                    <select name="StaffBranch" id="StaffBranch" class="text ui-widget-content ui-corner-all form-control">
                                        <%--<option selected="selected" disabled="disabled" value="" data-langg="staffchb">--Choose--</option>--%>
                                        <option value="mainBranch" data-langg="mainBr">Main Branch</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="roleStaff" data-langg="staffRol">Role:</label>
                                    <select name="roleStaff" id="roleStaff" class="text ui-widget-content ui-corner-all form-control">
                                        <option selected="selected" disabled="disabled" value="" data-langg="staffch">--Choose--</option>
                                    </select>
                                </div>

                                <div id="RoleDiv" class="form-group" style="display: none;">
                                    <label for="DivStaff" data-langg="">Devision:</label>
                                    <select name="DivStaff" id="DivStaff" class="text ui-widget-content ui-corner-all form-control">
                                        <option selected="selected" disabled="disabled" value="" data-langg="staffch">--Choose--</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="roleInfo" data-langg="staffDesc">Description:</label>
                                    <textarea readonly="readonly" rows="5" name="roleInfo" id="roleInfo" class="text ui-widget-content ui-corner-all form-control"></textarea>
                                    <!-- Allow form submission with keyboard without duplicating the dialog button -->
                                </div>
                            </div>
                            <input type="submit" tabindex="-1" style="position: absolute; top: -1000px" />
                        </div>
                    </fieldset>
                    <div class="text-center well well-sm">
                        <button class="btn btn-success" type="submit">Save</button>
                        <button class="btn btn-danger" type="button">Cancel</button>
                    </div>
                </form>
            </div>
            <div id="tabsStaff-2">
                <button type="button" name="btnAllBranch" class="btn-info ui-corner-all btn btn-xs" data-langg="allBrun" onclick="GetAllUsers()">
                    All Branches               
                </button>
                <select name="StaffBranch2" id="StaffBranch2" class="ui-corner-all btn-info">
                    <option selected="selected" disabled="disabled" value="" data-langg="byBran">By Branch</option>
                    <option value="mainBranch" data-langg="mainBr2">Main Branch</option>
                </select>
                <br />
                <br />
                <table id="staffHistory" class="table table-striped tblMerg">
                    <thead>
                        <tr>
                            <th hidden="hidden">UserID</th>
                            <th hidden="hidden">RoleID</th>
                            <th hidden="hidden">BranshID</th>
                            <th data-langg="staffGridName">Name</th>
                            <th data-langg="staffGridUN">User Name</th>
                            <th data-langg="staffGridBran">Branch</th>
                            <th data-langg="staffGridRole">Role</th>
                            <th data-langg="staffGridStat">Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th hidden="hidden" scope="row">1</th>
                            <td>أحمد شادي</td>
                            <td>zizo.man</td>
                            <td>الفرع الرئيسي</td>
                            <td>مدير</td>
                            <td>
                                <input checked="checked" disabled="disabled" data-toggle="toggle" data-on="<i class='fa fa-check-circle-o' style='font-size:25px;color:white'></i>" data-off="<i class='fa fa-ban' style='font-size:25px;color:red'></i>" data-style="ios" data-onstyle="info" data-offstyle="warning" type="checkbox" />
                            </td>
                            <td>
                                <a href="#" class="btn btn-primary btn-success"><span class="glyphicon glyphicon-pencil"></span></a>
                                <a href="#" class="btn btn-primary btn-danger"><span class="glyphicon glyphicon-trash"></span></a>
                            </td>
                        </tr>
                        <tr>
                            <th hidden="hidden" scope="row">2</th>
                            <td>محمد السيد </td>
                            <td>moh2000</td>
                            <td>الفرع الرئيسي</td>
                            <td>موظف</td>
                            <td>
                                <input checked="checked" data-toggle="toggle" data-on="<i class='fa fa-check-circle-o' style='font-size:25px;color:white'></i>" data-off="<i class='fa fa-ban' style='font-size:25px;color:red'></i>" data-style="ios" data-onstyle="info" data-offstyle="warning" type="checkbox" />
                            </td>
                            <td>
                                <a href="#" class="btn btn-primary btn-success"><span class="glyphicon glyphicon-pencil"></span></a>
                                <a href="#" class="btn btn-primary btn-danger"><span class="glyphicon glyphicon-trash"></span></a>
                            </td>
                        </tr>
                        <tr>
                            <th hidden="hidden" scope="row">3</th>
                            <td>اسامة محسن</td>
                            <td>zaki96</td>
                            <td>الفرع الرئيسي</td>
                            <td>بدون صلاحية</td>
                            <td>
                                <input data-toggle="toggle" data-on="<i class='fa fa-check-circle-o' style='font-size:25px;color:white'></i>" data-off="<i class='fa fa-ban' style='font-size:25px;color:red'></i>" data-style="ios" data-onstyle="info" data-offstyle="warning" type="checkbox" />
                            </td>
                            <td>
                                <a href="#" class="btn btn-primary btn-success"><span class="glyphicon glyphicon-pencil"></span></a>
                                <a href="#" class="btn btn-primary btn-danger"><span class="glyphicon glyphicon-trash"></span></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!--Small dialog for Calendar Members-->
    <div id="dialogEvents" title="Programme List">
        <h3 id="calMembers">Active Subscribers: 0</h3>
        <table id="eventMembers" class="table table-striped ui-widget-content dataTable">
            <thead>
                <tr>
                    <th hidden="hidden">partyID</th>
                    <th hidden="hidden">membershipID</th>
                    <th data-langg="evntMemsName">Name</th>
                    <th>Period Time/Booked Visits</th>
                    <th data-langg="evntMemsUsed">Used Visits</th>
                    <th data-langg="evntMemsAdd"></th>
                    <th data-langg="evntMemsCheck">Check-in</th>
                </tr>
            </thead>
        </table>
    </div>

    <!--Dialog for first Meta data-->
    <div id="dialogMetaData" title="First of all ..">
        <div class="row">
            <div id="div11metaData" class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                <mark>
                    <label data-langg="metaLangg"><b><ins>1. Select language for the entire system:</ins></b></label></mark>
                <br />
                <div id="langgOptions" class="btn-group" data-toggle="buttons">
                    <label id="btnEnglish" class="btn btn-primary rdbtn" data-langg="metaEnglish">
                        <input type="radio" name="langgOptions" id="langgoption1" />English
                   
                    </label>
                    <label id="btnArabic" class="btn btn-primary rdbtn" data-langg="metaArabic">
                        <input type="radio" name="langgOptions" id="langgoption2" />العربية
                   
                    </label>
                </div>
                &ensp;<span id="doneLang" class="glyphicon glyphicon-ok-circle doneMeta"></span>
                <br />
                <br />
            </div>
            <div id="div22metaData" class="col-lg-7 col-md-7 col-sm-7 col-xs-12">
                <mark>
                    <label data-langg="metaLogo"><b><ins>2. Click on the photo to set company logo (100 pixel x 50 pixel):</ins></b></label></mark>
                <br />
                <div id="image-preview2" class="centerAlign col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <label for="image-upload2" id="image-label2" data-langg="memImg">Choose Photo</label>
                    <input type="file" name="image" id="image-upload2" />
                    <br />
                </div>
                &ensp;&ensp;
                <button id="saveLogo" class="btn btn-success" type="button" data-langg="metaSaveLogo">Save</button>
                &ensp;<span id="doneLogo" class="glyphicon glyphicon-ok-circle doneMeta"></span>
                <br />
                <br />
            </div>
        </div>
        <div class="row">
            <div id="div1metaData" class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                <label data-langg="metaHours"><mark><b><ins>3. Define business hours in your company:</ins></b></mark></label>
                <br />
                <form id="frmHours" class="form-horizontal">
                    <div id="workHours" class="form-group">
                        <div class="form-group inlineDivs halfWidth">
                            <label for="startWork" data-langg="startWork">Start time:</label>
                            <input type="text" name="startWork" id="startWork" class="ui-widget-content ui-corner-all form-control" placeholder="HH:mm" />
                        </div>
                        <div class="form-group inlineDivs halfWidth">
                            <label for="endWork" data-langg="endWork">End time:</label>
                            <input type="text" name="endWork" id="endWork" class="ui-widget-content ui-corner-all form-control" placeholder="HH:mm" />
                        </div>
                    </div>
                </form>
            </div>
            <div id="div2metaData" class="col-lg-7 col-md-7 col-sm-7 col-xs-12">
                <label data-langg="metaDivs"><mark><b><ins>4. Add Your Company divisions (at least one):</ins></b></mark></label>
            </div>
        </div>
        <label data-langg="metaProgram"><mark><b><ins>5. Add your first program for your company by select division and other info:</ins></b></mark></label>
    </div>

    <!--Dialog for Reports Menu-->
    <div id="dialogReports" title="Reports">
        <div class="row sub_content fullwidth">
            <div id="div1Reports" class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                <div id="reportMembers" class="serviceBox_2" onclick="dialogMembers()">
                    <i class="fa fa-male"></i>
                    <h3 data-langg="allmemtitle">All Members</h3>
                    <h2 id="currentMembers">15</h2>
                    <span data-langg="withmems">With membership: </span><b><span id="memWithMemship">10</span></b>
                    <br />
                    <span data-langg="withoutmems">Without membership: </span><b><span id="memWithoutMemship">5</span></b>
                </div>
            </div>
            <div id="div2Reports" class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                <div id="reportPaid" class="serviceBox_2" onclick="dialogPayments()">
                    <i class="fa fa-money"></i>
                    <h3 data-langg="paymentstat">Invoices</h3>
                    <h2 id="currentMemberships">15</h2>
                    <span data-langg="paidstat">Fully paid up: </span><b><span id="paidMemship">10</span></b>
                    <br />
                    <span data-langg="unpaidstat">Incomplete pay: </span><b><span id="unpaidMemship">5</span></b>
                </div>
            </div>
            <div id="div3Reports" class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                <div id="reportCheck" class="serviceBox_2">
                    <i class="fa fa-tags"></i>
                    <h3 data-langg="visitshisrep">Visits History</h3>
                    <h2 id="allCheckins">2</h2>
                    <span data-langg="listcheckin">List of Checkins for all members by date time ..</span>
                </div>
            </div>
        </div>
        <div class="row sub_content fullwidth">
            <div id="div4Reports" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <div id="reportPrograms" class="serviceBox_2" onclick="dialogReportProgramsSubs()">
                    <i class="fa fa-bar-chart"></i>
                    <h3 data-langg="rptProgs">Programs subscriptions</h3>
                    <h2 id="progsCount">15</h2>
                    <span data-langg="rptProgsWith">Programs With Subscriptions: </span><b><span id="progsWithSubs">10</span></b>
                    <br />
                    <span data-langg="rptProgsWithout">Programs Without Subscriptions: </span><b><span id="progsWithoutSubs">5</span></b>
                </div>
            </div>
            <div id="div5Reports" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <div id="" class="serviceBox_2" onclick="dialogReportProgramsPays()">
                    <i class="fa fa-bar-chart"></i>
                    <h3 data-langg="rptProgs2">Programs profitability</h3>
                    <h2 id="totalGross">15 $</h2>
                    <span data-langg="rptProgsMost">Most profitable program: </span><b><span id="progMostIncome">Prog 1</span></b>
                    <br />
                    <span data-langg="rptProgsLeast">Least profitable program: </span><b><span id="progLeastIncome">Prog 10</span></b>
                </div>
            </div>
        </div>
        <div class="row sub_content fullwidth">
            <div id="div6Reports" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <div id="reportTimeLine" class="serviceBox_2" onclick="dialogReportTimeLineBusiness()">
                    <i class="fa fa-line-chart"></i>
                    <h3 data-langg="rptBusiness">Business Performance</h3>
                    <span data-langg="rptOverview">Overview of the growth rate of subscriptions and cash flows over the months of the year ..</span>
                </div>
            </div>
            <div id="div7Reports" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <div id="" class="serviceBox_2" onclick="dialogReportTimeLineCashFlow()">
                    <i class="fa fa-line-chart"></i>
                    <h3 data-langg="rptCash">Cash Flow</h3>
                    <span data-langg="rptOverviewCash">Overview of the growth rate of subscriptions and cash flows over the months of the year ..</span>
                </div>
            </div>
        </div>
    </div>

    <!--Dialog for Report Members-->
    <div id="dialogReportMembers" title="Members Report">
        <div class="sub_content fullwidth">
            <div class="row">
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12"></div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <label for="sss" data-langg="fmember">Find Member:</label>
                    <input class="ui-corner-all form-control" name="sss" id="sss" placeholder="Name .." type="text" tabindex="-1" autofocus="autofocus" />
                </div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12"></div>
            </div>

            <table id="tblReportmem" class="table table-hover ui-widget-content">
                <thead>
                    <tr>
                        <th hidden="hidden">ID</th>
                        <th hidden="hidden">memShipID</th>
                        <th data-langg="repMemName">Name</th>
                        <th data-langg="repMemSubs">Subscription</th>
                        <th data-langg="repMemPhone">Phone</th>
                        <th data-langg="repMemJoin">Joining</th>
                        <%--<th data-langg="repMemRemove">Remove</th>--%>
                    </tr>
                </thead>
            </table>
        </div>
    </div>

    <!--Dialog for Report Programs-->
    <div id="dialogReportPrograms" title="Programs Report">
        <a id="saveChartProgs" class="dt-button buttons-print btn-info btn-sm" href="#" target="_blank" data-langg="saveChartProgs">print  <span class="glyphicon glyphicon-save"></span></a>
        <div id='png'></div>
        <div id="chartPrograms" class="sub_content fullwidth">
        </div>
    </div>

    <!--Dialog for Report Time line-->
    <div id="dialogReportTimeLine" title="Business Performance">
        <a id="saveChartTimeLine" class="dt-button buttons-print btn-info btn-sm" href="#" target="_blank" data-langg="saveChartTimeLine">print  <span class="glyphicon glyphicon-save"></span></a>
        <div id='png2'></div>
        <div id="chartTimeLine" class="sub_content fullwidth">
        </div>
    </div>

    <!--Dialog for Report Invoices-->
    <div id="dialogReportPayment" title="Invoices Report">
        <div class="sub_content fullwidth">
            <div class="row">
                <div id="div1ReportInvoice" class="col-lg-9 col-md-9 col-sm-9 col-xs-9">
                    <div class="row">
                        <div id="div1RprtInv" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input class="ui-corner-all form-control" name="invByName" id="invByName" placeholder="Name or Serial .." type="text" tabindex="1" />
                        </div>
                        <div id="div2RprtInv" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <select class="ui-corner-all form-control" name="invByProg" id="invByProg" tabindex="2">
                                <option selected="selected" value="">All programs</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div id="div1RprtInvDate" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="text" name="invFrom" id="invFrom" placeholder="From Date .." class="datePick ui-corner-all form-control" tabindex="3" />
                        </div>
                        <div id="div2RprtInvDate" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <input type="text" name="invTo" id="invTo" placeholder="To Date .." class="datePick ui-corner-all form-control" tabindex="4" />
                        </div>
                    </div>
                </div>
                <div id="div2ReportInvoice" class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                    <button id="btnAllInvoices" type="button" class="btn-lg" onclick="GetAllInvoices()" data-langg="btnAllinv">All invoices</button>
                </div>
            </div>
        </div>
        <table id="tblPayment" class="table table-striped table-hover ui-widget-content">
            <thead>
                <tr>
                    <th hidden="hidden">invoiceID</th>
                    <th hidden="hidden">memberID</th>
                    <th data-langg="payserial">#</th>
                    <th data-langg="payname">Member</th>
                    <th data-langg="paydate">Date</th>
                    <th data-langg="payprice">Total</th>
                    <th data-langg="paypaid">Paid</th>
                    <th data-langg="payremain">Due</th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <th hidden="hidden"></th>
                    <th hidden="hidden"></th>
                    <th></th>
                    <th></th>
                    <td data-langg="totalDue">Totals:</td>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </tfoot>
        </table>
    </div>

    <!--Dialog for Report Checkins-->
    <div id="dialogReportCheckins" title="Checkins Report">
        <div class="sub_content fullwidth">
            <div class="btn-group btn-group-justified">
                <div class="btn-group">
                    <button id="checkinsAll" type="button" class="btn btn-primary" data-langg="chkall">All</button>
                </div>
                <div class="btn-group">
                    <button id="checkinsByPeriod" type="button" class="btn btn-primary" data-langg="chkperiod">By Period</button>
                </div>
                <div class="btn-group">
                    <button id="checkinsByMember" type="button" class="btn btn-primary" data-langg="chkmember">By Member</button>
                </div>
            </div>
            <br />
            <div id="divCheckinsByPeriod" class="row">
                <div class="col-lg-3 col-md-3 col-sm-2 col-xs-12"></div>
                <div id="div1ReportCheck" class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                    <label for="fromCheck" data-langg="chkfrom">From:</label>
                    <input type="text" name="fromCheck" id="fromCheck" class="datePick ui-corner-all form-control" tabindex="-1" />
                </div>
                <div id="div2ReportCheck" class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                    <label for="toCheck" data-langg="chkto">To:</label>
                    <input type="text" name="toCheck" id="toCheck" class="datePick ui-corner-all form-control" tabindex="-1" />
                </div>
                <div class="col-lg-3 col-md-3 col-sm-2 col-xs-12"></div>
            </div>
            <div id="divCheckinsByMember" class="row">
                <div class="col-lg-4 col-md-4 col-sm-3 col-xs-12"></div>
                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <label for="ss" data-langg="chkmemberfind">Checkins for:</label>
                    <input class="ui-corner-all form-control" name="ss" id="ss" placeholder="Name or Phone .." type="text" tabindex="-1" />
                </div>
                <div class="col-lg-4 col-md-4 col-sm-3 col-xs-12"></div>
            </div>
            <%--<button id="btnExport4" onclick="fnExcelReport('tblCheckins');" class="btn btn-success btnExport"><span class="exportNotif">EXPORT </span><i class="fa fa-file-excel-o" aria-hidden="true"></i></button>
            <br />
            <br />--%>
            <table id="tblCheckins" class="table table-striped table-hover ui-widget-content">
                <thead>
                    <tr>
                        <th hidden="hidden">memShipID</th>
                        <th data-langg="chkdate">Date</th>
                        <th data-langg="chktime">Time</th>
                        <th data-langg="chkname">Name</th>
                        <th data-langg="chkprog">Program</th>
                        <th data-langg="chkby">By</th>
                    </tr>
                </thead>
            </table>
        </div>
        <input type="hidden" autofocus="autofocus" />
    </div>

    <!--Dialog for Settings-->
    <div id="dialogSettings" title="Settings">
        <div id="ChildVerticalTab_1">
            <ul class="resp-tabs-list ver_1">
                <li data-langg="setNotif">Notifications</li>
                <li data-langg="setDefaults">Business Defaults</li>
                <%--<li>Vertical Tab 3</li>
                    <li>Vertical Tab 4</li>--%>
            </ul>
            <div class="resp-tabs-container ver_1">
                <div>
                    <form id="frmSettingNotif" class="form-horizontal">
                        <fieldset class="dialog-inputs">
                            <h3 data-langg="setNotifSubs">Subscriptions Alert</h3>
                            <div class="form-group ">
                                <label data-langg="setNotifSubsDay">Subscriptions expires within the days number:</label>
                                <input type="text" name="setNotifSubsDays" id="setNotifSubsDays" value="3" class="ui-widget-content ui-corner-all form-control" />
                            </div>
                            <div class="form-group">
                                <label data-langg="setNotifSubsVisit">Subscriptions expires within the visits number:</label>
                                <input type="text" name="setNotifSubsVisits" id="setNotifSubsVisits" value="3" class="ui-widget-content ui-corner-all form-control" />
                            </div>
                            <h3 data-langg="setNotifInv">Invoices Alert</h3>
                            <div class="form-group ">
                                <label data-langg="setNotifInvPay">Invoices that have a payment date within the days:</label>
                                <input type="text" name="setNotifSubsDays" id="setNotifPayDays" value="3" class="ui-widget-content ui-corner-all form-control" />
                            </div>
                        </fieldset>
                        <div class="text-center well well-sm">
                            <button id="saveSettingNotif" class="btn btn-success" type="submit" tabindex="-1">Save</button>
                            <button class="btn btn-danger" type="button">Close</button>
                        </div>
                    </form>
                </div>
                <div>
                    <form id="frmSettingDefults" class="form-horizontal">
                        <fieldset class="dialog-inputs">
                            <h3 data-langg="setLogo">Company logo</h3>
                            <div class="form-group ">
                                <label data-langg="setLogoInfo">Click on the photo to set company logo:</label>
                                <small data-langg="setLogoRec">Recommend 50 pixel x 50 pixel</small>
                                <div id="image-preview3" class="centerAlign">
                                    <label for="image-upload3" id="image-label3" data-langg="">Choose Photo</label>
                                    <input type="file" name="image" id="image-upload3" />
                                    <br />
                                </div>
                            </div>
                            <br />
                            <h3 data-langg="setHours">Working hours</h3>
                            <div id="workHours2" class="form-group">
                                <div class="form-group inlineDivs halfWidth">
                                    <label for="startWork2" data-langg="startWork2">Start time:</label>
                                    <input type="text" name="startWork2" id="startWork2" class="ui-widget-content ui-corner-all form-control" placeholder="HH:mm" />
                                </div>
                                <div class="form-group inlineDivs halfWidth">
                                    <label for="endWork2" data-langg="endWork2">End time:</label>
                                    <input type="text" name="endWork2" id="endWork2" class="ui-widget-content ui-corner-all form-control" placeholder="HH:mm" />
                                </div>
                            </div>
                        </fieldset>
                        <div class="text-center well well-sm">
                            <button id="saveSettingDefaults" class="btn btn-success" type="submit" tabindex="-1">Save</button>
                            <button class="btn btn-danger" type="button">Close</button>
                        </div>
                    </form>
                </div>
                <%--<div>
                        <p>Suspendisse blandit velit Integer laoreet placerat suscipit. Sed sodales scelerisque commodo. Nam porta cursus lectus. Proin nunc erat, gravida a facilisis quis, ornare id lectus. Proin consectetur nibh quis Integer laoreet placerat suscipit. Sed sodales scelerisque commodo. Nam porta cursus lectus. Proin nunc erat, gravida a facilisis quis, ornare id lectus. Proin consectetur nibh quis urna gravid urna gravid eget erat suscipit in malesuada odio venenatis.</p>
                    </div>
                    <div>
                        <p>d ut ornare non, volutpat vel tortor. InLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nibh urna, euismod ut ornare non, volutpat vel tortor. Integer laoreet placerat suscipit. Sed sodales scelerisque commodo. Nam porta cursus lectus. Proin nunc erat, gravida a facilisis quis, ornare id lectus. Proin consectetur nibh quis urna gravida mollis.t in malesuada odio venenatis.</p>
                    </div>--%>
            </div>
        </div>
    </div>

    <!-- Start Style Left Sliders -->
    <div class="switcherLang"></div>
    <div class="sliderSetting"></div>

    <script src="js/jquery-1.10.2.min.js"></script>
    <script src="js/spin.js"></script>

    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

    <script src="js/jquery-ui.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jquery.easing.1.3.js"></script>
    <script src="js/retina-1.1.0.min.js"></script>
    <script src="js/jquery.cookie.js"></script>
    <script src="js/jquery.tabledit.js"></script>
    <script src="js/styleSetting.js"></script>
    <script src="js/styleSwitchLang.js"></script>
    <script src="js/jquery.smartmenus.min.js"></script>
    <script src="js/jquery.smartmenus.bootstrap.min.js"></script>
    <script src="js/jquery.jcarousel.js"></script>
    <script src="js/jflickrfeed.js"></script>
    <script src="js/jquery.magnific-popup.min.js"></script>
    <script src="js/jquery.isotope.min.js"></script>
    <script src="js/swipe.js"></script>
    <script src="js/jquery.blurr.js"></script>
    <script src="js/main.js"></script>
    <script src="js/jquery.easyResponsiveTabs.js"></script>
    <script src="js/moment.min.js"></script>
    <script src="js/fullcalendar.js"></script>
    <script src="js/lang-all.js"></script>
    <script src="js/initialCalendar.js"></script>
    <script src="js/dialogForm.js"></script>
    <script src="js/dialogAccountMember.js"></script>
    <script src="js/dialogMetaData.js"></script>
    <script src="js/dialogMemType.js"></script>
    <script src="js/dialogReports.js"></script>
    <script src="js/dialogReportMembers.js"></script>
    <script src="js/dialogReportPrograms.js"></script>
    <script src="js/dialogReportTimeLine.js"></script>
    <script src="js/dialogReportPayment.js"></script>
    <script src="js/dialogReportCheckins.js"></script>
    <script src="js/dialogStaff.js"></script>
    <script src="js/dialogItems.js"></script>
    <script src="js/dialogSettings.js"></script>
    <script src="js/dialogEvents.js"></script>
    <script src="js/btnMenu.js"></script>
    <script src="js/uploadPreview.js"></script>
    <script src="js/datepicker-ar.js"></script>
    <script src="js/bootstrapValidator.js"></script>
    <script src="js/language/ar_MA.js"></script>
    <script src="js/language/en_US.js"></script>
    <script src="js/language/fr_FR.js"></script>
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
    <script src="js/jquery.timepicker.js"></script>
    <script src="js/script_invoice.js"></script>
    <script src="js/callAPIs.js"></script>
    <script>
        var langgSite = 'en';
        var dateFormatSite = 'mm-dd-yy';
    </script>
</body>
</html>
