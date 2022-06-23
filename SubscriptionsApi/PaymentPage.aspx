<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PaymentPage.aspx.cs" Inherits="SubscriptionsApi.PaymentPage" %>

<!DOCTYPE html>

<html lang="en" class="no-js">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,700,600' rel='stylesheet' type='text/css'>

    <link rel="stylesheet" href="css/reset.css">
    <!-- CSS reset -->
    <link rel="stylesheet" href="css/style_payment.css">
    <!-- Resource style -->
    <script src="js/modernizr.js"></script>
    <!-- Modernizr -->

    <title>Payment Plans | Marché </title>
</head>
<body>
    <header class="cd-main-header">
        <h1>Payment Plans for <i>Subscription Manager</i></h1>
    </header>

    <ul class="cd-pricing">
        <li>
            <header class="cd-pricing-header">
                <h2>Monthly</h2>
                <div class="cd-price">
                    <span>$4.95</span>
                    <span>month</span>
                </div>
            </header>
            <!-- .cd-pricing-header -->

            <div class="cd-pricing-features">
                <ul>
                    <li class="available"><em>Unlimited customers</em></li>
                    <li class="available"><em>Unlimited programs</em></li>
                    <li><em>Save more money</em></li>
                    <li><em>Unlimited users</em></li>
                </ul>
            </div>
            <!-- .cd-pricing-features -->

            <footer class="cd-pricing-footer">
                <a id="btnmonth" href="#0">Select</a>
            </footer>
            <!-- .cd-pricing-footer -->
        </li>

        <li>
            <header class="cd-pricing-header">
                <h2>Yearly</h2>

                <div class="cd-price">
                    <span>$47.40</span>
                    <span>year</span>
                </div>
            </header>
            <!-- .cd-pricing-header -->

            <div class="cd-pricing-features">
                <ul>
                    <li class="available"><em>Unlimited customers</em></li>
                    <li class="available"><em>Unlimited programs</em></li>
                    <li class="available"><em>Save more money</em></li>
                    <li><em>Unlimited users</em></li>
                </ul>
            </div>
            <!-- .cd-pricing-features -->

            <footer class="cd-pricing-footer">
                <a id="btnyear" href="#0">Select</a>
            </footer>
            <!-- .cd-pricing-footer -->
        </li>

        <li>
            <header class="cd-pricing-header">
                <h2>On-premises</h2>

                <div class="cd-price">
                    <span>$291</span>
                    <span>one time payment</span>
                </div>
            </header>
            <!-- .cd-pricing-header -->

            <div class="cd-pricing-features">
                <ul>
                    <li class="available"><em>Unlimited customers</em></li>
                    <li class="available"><em>Unlimited programs</em></li>
                    <li class="available"><em>Save more money</em></li>
                    <li class="available"><em>Unlimited users</em></li>
                </ul>
            </div>
            <!-- .cd-pricing-features -->

            <footer class="cd-pricing-footer">
                <a id="nopay" href="mailto:zizooo.elhor@gmail.com?subject=More users">Contact us</a>
            </footer>
            <!-- .cd-pricing-footer -->
        </li>
    </ul>
    <!-- .cd-pricing -->

    <div class="cd-form">

        <div class="cd-plan-info">
            <!-- content will be loaded using jQuery - according to the selected plan -->
        </div>

        <div class="cd-more-info">
            <%--<h3>Need help?</h3>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>--%>
        </div>

        <form runat="server">
            <fieldset>
                <legend>Account Info</legend>

                <div class="half-width">
                    <label for="userName">Name</label>
                    <asp:TextBox ID="userName" name="userName" Enabled="false" runat="server">Ahmed Fathy</asp:TextBox>
                </div>

                <div class="half-width">
                    <label for="userEmail">Email</label>
                    <asp:TextBox ID="userEmail" name="userEmail" Enabled="false" runat="server">aaff@yahoo.com</asp:TextBox>
                </div>

                <div class="half-width">
                    <label for="userCompany">Company Name</label>
                    <asp:TextBox ID="userCompany" name="userCompany" Enabled="false" runat="server">Gym For All</asp:TextBox>
                </div>

                <div class="half-width">
                    <label for="userData">Data options</label>                    
                    <asp:RadioButtonList ID="radioDataOption" CssClass="cd-data-options" runat="server" RepeatDirection="Horizontal">
                        <asp:ListItem Selected="True">Keep old Data</asp:ListItem>
                        <asp:ListItem>Reset all Data</asp:ListItem>
                    </asp:RadioButtonList>
                </div>
            </fieldset>

            <fieldset>
                <legend>Payment Method</legend>

                <div>                    
                    <asp:RadioButtonList ID="radioPaymentMethod" runat="server" CssClass="cd-payment-gateways">
                        <asp:ListItem>Paypal</asp:ListItem>
                        <asp:ListItem Selected="True">Card</asp:ListItem>
                    </asp:RadioButtonList>
                    <!-- .cd-payment-gateways -->
                </div>

                <div class="cd-credit-card">
                    <div>
                        <p class="half-width">
                            <label for="cardNumber">Card Number</label>
                            <asp:TextBox ID="cardNumber" runat="server"></asp:TextBox>
                        </p>

                        <p class="half-width">
                            <label>Expiration date</label>
                            <b>
                                <span class="cd-select">
                                    <asp:DropDownList ID="cardExpiryMonth" runat="server">
                                        <asp:ListItem Value="1">1</asp:ListItem>
                                        <asp:ListItem Value="2">2</asp:ListItem>
                                        <asp:ListItem Value="3">3</asp:ListItem>
                                        <asp:ListItem Value="4">4</asp:ListItem>
                                        <asp:ListItem Value="5">5</asp:ListItem>
                                        <asp:ListItem Value="6">6</asp:ListItem>
                                        <asp:ListItem Value="7">7</asp:ListItem>
                                        <asp:ListItem Value="8">8</asp:ListItem>
                                        <asp:ListItem Value="9">9</asp:ListItem>
                                        <asp:ListItem Value="10">10</asp:ListItem>
                                        <asp:ListItem Value="11">11</asp:ListItem>
                                        <asp:ListItem Value="12">12</asp:ListItem>
                                    </asp:DropDownList>
                                </span>

                                <span class="cd-select">
                                    <asp:DropDownList ID="cardExpiryYear" runat="server">
                                        <asp:ListItem Value="2017">2017</asp:ListItem>
                                        <asp:ListItem Value="2018">2018</asp:ListItem>
                                        <asp:ListItem Value="2019">2019</asp:ListItem>
                                        <asp:ListItem Value="2020">2020</asp:ListItem>
                                        <asp:ListItem Value="2021">2021</asp:ListItem>
                                        <asp:ListItem Value="2022">2022</asp:ListItem>
                                    </asp:DropDownList>
                                </span>
                            </b>
                        </p>

                        <p class="half-width">
                            <label for="cardCvc">Card CVC</label>
                            <asp:TextBox ID="cardCvc" runat="server"></asp:TextBox>
                        </p>
                    </div>
                </div>
                <!-- .cd-credit-card -->
            </fieldset>

            <fieldset>
                <div>
                    <asp:Button ID="Button1" runat="server" Text="Get started" OnClick="Button1_Click"/>
                </div>
            </fieldset>
        </form>

        <a href="#0" class="cd-close"></a>
    </div>
    <!-- .cd-form -->

    <div class="cd-overlay"></div>
    <!-- shadow layer -->
    <script src="js/jquery-1.10.2.min.js"></script>
    <script src="js/velocity.min.js"></script>
    <script src="js/main_payment.js"></script>
    <!-- Resource jQuery -->
</body>
</html>
