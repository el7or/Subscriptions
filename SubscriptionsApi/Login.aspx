<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="SubscriptionsApi.LoginDefault" %>

<!DOCTYPE html>

<html class="no-js">
<head runat="server">
    <meta charset="UTF-8" />
    <!-- <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">  -->
    <title>Login Subscriptions</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Login and Registration Form with HTML5 and CSS3" />
    <meta name="keywords" content="html5, css3, form, switch, animation, :target, pseudo-class" />
    <meta name="author" content="Codrops" />


    <link href="css/animate-custom-login.css" rel="stylesheet" />
    <link href="css/style-login.css" rel="stylesheet" />
    <link href="css/demo-login.css" rel="stylesheet" />
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <link href="css/sweetalert.css" rel="stylesheet" />

    <script src="js/jquery-1.10.2.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/styleSwitchLangLogin.js"></script>
    <script src="js/sweetalert-dev.js"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div class="container">
            <header>
                <h1 id="loginHeader"><span>Marché </span>Subscription Manager </h1>
                <div style="float: right">
                    <span class="glyphicon glyphicon-globe"></span>&nbsp;
                    <label for="ddlLanguages" class="uname" data-langg="lblLang">Language:</label>
                    <asp:DropDownList ID="ddlLanguages" runat="server">
                        <asp:ListItem Text="English" Value="en" />
                        <asp:ListItem Text="العربية" Value="ar-sa" />
                    </asp:DropDownList>
                    <asp:HiddenField ID="langgVal" runat="server" Value="" />
                </div>
            </header>
            <section>
                <div id="container_demo">
                    <!-- hidden anchor to stop jump http://www.css3create.com/Astuce-Empecher-le-scroll-avec-l-utilisation-de-target#wrap4  -->
                    <a class="hiddenanchor" id="toregister"></a>
                    <a class="hiddenanchor" id="tologin"></a>
                    <div id="wrapper">

                        <div id="login" class="animate form">
                            <h1 data-langg="loginTitle">Log in</h1>
                            <p>
                                <label for="txtUserName" class="uname" data-icon="u" data-langg="loginMail">Your email</label>
                                <asp:TextBox runat="server" ID="txtUserName" placeholder="mymail@mail.com" CssClass="singleinput" required="required" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$" title="Please enter valid email!"
                                    oninvalid="setCustomValidity('Must enter email!')" onkeyup="try{setCustomValidity('')}catch(e){}" onchange="try{setCustomValidity('')}catch(e){}" TextMode="Email"></asp:TextBox>
                            </p>
                            <p>
                                <label for="txtPassword" class="youpasswd" data-icon="p" data-langg="loginPass">Your password </label>
                                <asp:TextBox runat="server" ID="txtPassword" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" CssClass="singleinput" TextMode="Password" required="required"
                                    oninvalid="setCustomValidity('Must enter Password!')" onkeyup="try{setCustomValidity('')}catch(e){}" onchange="try{setCustomValidity('')}catch(e){}"></asp:TextBox>
                            </p>
                            <p class="keeplogin">
                                <asp:CheckBox ID="chkLoginkeeping" runat="server" value="loginkeeping" CssClass="singleinput" />
                                <label id="keepLogin" for="chkLoginkeeping" data-langg="loginKeep">Keep me logged in</label>
                            </p>
                            <p>
                                <asp:LinkButton ID="lnkForget" runat="server" OnClick="lnkForget_Click">Forget Passowrd</asp:LinkButton>
                            </p>
                            <p>
                                <asp:Label ID="lblErrorLogin" runat="server" ForeColor="Red" Font-Bold="True" Visible="False" data-langg="loginErr">Your email or passowrd is incorrect!</asp:Label>
                                <asp:Label ID="lblErrorLogin2" runat="server" ForeColor="Red" Font-Bold="True" Visible="False" data-langg="loginErr2">Your account is locked, Please contact your admin!</asp:Label>
                                <asp:Label ID="lblErrorForget" runat="server" ForeColor="Red" Font-Bold="True" Visible="False" data-langg="forgetErr">Your email is incorrect!</asp:Label>
                            </p>
                            <p class="login button">
                                <asp:Button ID="btnLogin" runat="server" Text="" OnClick="btnLogin_Click" />
                            </p>
                            <p class="change_link">
                                <span data-langg="loginNotYet">Not a member yet ?</span>
                                <a href="#toregister" id="lnkbtnToRegister" class="to_register" onclick="resetSignupForm();" data-langg="loginJoin">Join us</a>
                            </p>
                        </div>
                        <div id="register" class="animate form">
                            <h1 data-langg="signTitle">Sign up </h1>
                            <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
                            <asp:Table runat="server">
                                <asp:TableRow>
                                    <asp:TableCell ColumnSpan="2" Width="100%">
                                        <p>
                                            <label for="txtEmailSignup" data-icon="e" data-langg="signMail">Your email</label>
                                            <asp:TextBox runat="server" ID="txtEmailSignup" placeholder="mysupermail@mail.com" CssClass="singleinput" required="required" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$" title="Please enter valid email!"
                                                oninvalid="setCustomValidity('Must enter!')" onkeyup="try{setCustomValidity('')}catch(e){}" onchange="try{setCustomValidity('')}catch(e){}" TextMode="Email"></asp:TextBox>
                                            <asp:Label ID="mailNotice" runat="server" Font-Size="Smaller" ForeColor="Gray">&#10077; Must enter valid email address to receive activation mail &#x275E;</asp:Label>
                                        </p>
                                    </asp:TableCell>
                                </asp:TableRow>
                                <asp:TableRow>
                                    <asp:TableCell ColumnSpan="2" Width="100%">
                                        <p>
                                            <label for="txtPasswordSignup" data-icon="p" data-langg="signPass">Your password </label>
                                            <asp:TextBox runat="server" ID="txtPasswordSignup" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" CssClass="singleinput" TextMode="Password" pattern=".{6,}" title="Must be at least 6 characters" required="required"
                                                oninvalid="setCustomValidity('Must enter!')" onkeyup="try{setCustomValidity('')}catch(e){}" onchange="try{setCustomValidity('')}catch(e){}"></asp:TextBox>
                                        </p>
                                    </asp:TableCell>
                                </asp:TableRow>
                                <asp:TableRow>
                                    <asp:TableCell ColumnSpan="2" Width="100%">
                                        <p>
                                            <label for="txtPasswordSignup_confirm" data-icon="p" data-langg="signconf">Please confirm your password </label>
                                            <asp:TextBox runat="server" ID="txtPasswordSignup_confirm" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" CssClass="singleinput" required="required" TextMode="Password"
                                                oninvalid="setCustomValidity('Must enter!')" onkeyup="try{setCustomValidity('')}catch(e){}" onchange="try{setCustomValidity('')}catch(e){}"></asp:TextBox>
                                        </p>
                                    </asp:TableCell>
                                </asp:TableRow>
                                <asp:TableRow>
                                    <asp:TableCell Width="50%">
                                        <p>
                                            <label for="txtFirstName" data-icon="u" data-langg="signfName">First name</label>
                                            <asp:TextBox runat="server" ID="txtFirstName" placeholder="Mohammed" CssClass="twiceinput" required="required"
                                                oninvalid="setCustomValidity('Must enter!')" onkeyup="try{setCustomValidity('')}catch(e){}" onchange="try{setCustomValidity('')}catch(e){}"></asp:TextBox>
                                        </p>
                                    </asp:TableCell>
                                    <asp:TableCell Width="50%">
                                        <p>
                                            <label for="txtLastName" data-icon="u" data-langg="signlName">Last name</label>
                                            <asp:TextBox runat="server" ID="txtLastName" placeholder="Ahmed" CssClass="twiceinput" required="required"
                                                oninvalid="setCustomValidity('Must enter!')" onkeyup="try{setCustomValidity('')}catch(e){}" onchange="try{setCustomValidity('')}catch(e){}"></asp:TextBox>
                                        </p>
                                    </asp:TableCell>
                                </asp:TableRow>
                                <asp:TableRow>
                                    <asp:TableCell Width="50%">
                                        <p>
                                            <label for="txtCompany" data-icon="u" data-langg="signcomp">Company name</label>
                                            <asp:TextBox runat="server" ID="txtCompany" placeholder="Sera Gem" CssClass="twiceinput" required="required"
                                                oninvalid="setCustomValidity('Must enter!')" onkeyup="try{setCustomValidity('')}catch(e){}" onchange="try{setCustomValidity('')}catch(e){}"></asp:TextBox>
                                        </p>
                                    </asp:TableCell>
                                    <asp:TableCell Width="50%">
                                        <p>
                                            <label for="ddlIndustry" data-icon="u" data-langg="signIndust">Industry</label>
                                            <asp:DropDownList ID="ddlIndustry" runat="server" CssClass="DropDownList" AppendDataBoundItems="True" required="required"
                                                oninvalid="setCustomValidity('Must enter!')" onkeyup="try{setCustomValidity('')}catch(e){}" onchange="try{setCustomValidity('')}catch(e){}">
                                                <asp:ListItem Value="" Selected="True">--Choose--</asp:ListItem>
                                            </asp:DropDownList>
                                        </p>
                                    </asp:TableCell>
                                </asp:TableRow>
                                <asp:TableRow>
                                    <asp:TableCell Width="50%">
                                        <p>
                                            <label for="ddlCountry" data-icon="u" data-langg="signcontry">Country</label>
                                            <asp:DropDownList ID="ddlCountry" runat="server" CssClass="DropDownList" AppendDataBoundItems="True" AutoPostBack="true" OnSelectedIndexChanged="ddlCountry_SelectedIndexChanged" required="required"
                                                oninvalid="setCustomValidity('Must enter!')" onkeyup="try{setCustomValidity('')}catch(e){}" onchange="try{setCustomValidity('')}catch(e){}">
                                                <asp:ListItem Value="" Selected="True">--Choose--</asp:ListItem>
                                            </asp:DropDownList>
                                        </p>
                                    </asp:TableCell>
                                    <asp:TableCell Width="50%">
                                        <asp:UpdatePanel ID="UpdatePanel1" runat="server">
                                            <ContentTemplate>
                                                <p>
                                                    <label for="ddlCity" data-icon="u" data-langg="signCity">City</label>
                                                    <asp:DropDownList ID="ddlCity" runat="server" CssClass="DropDownList" AppendDataBoundItems="True">
                                                        <asp:ListItem Value="" Selected="True">--Choose--</asp:ListItem>
                                                    </asp:DropDownList>
                                                </p>
                                            </ContentTemplate>
                                            <Triggers>
                                                <asp:AsyncPostBackTrigger ControlID="ddlCountry" EventName="SelectedIndexChanged" />
                                            </Triggers>
                                        </asp:UpdatePanel>
                                    </asp:TableCell>
                                </asp:TableRow>
                                <asp:TableRow>
                                    <asp:TableCell Width="50%">
                                        <p>
                                            <label for="txtAddress" data-icon="u" data-langg="signAdres">Address</label>
                                            <asp:TextBox runat="server" ID="txtAddress" placeholder="24 fox st." CssClass="twiceinput"></asp:TextBox>
                                        </p>
                                    </asp:TableCell>
                                    <asp:TableCell Width="50%">
                                        <p>
                                            <label for="txtPhone" data-icon="u" data-langg="signPhon">Phone</label>
                                            <asp:TextBox runat="server" ID="txtPhone" placeholder="0112236547" CssClass="twiceinput" TextMode="Number" required="required" CausesValidation="False"
                                                oninvalid="setCustomValidity('Must enter!')" onkeyup="try{setCustomValidity('')}catch(e){}" onchange="try{setCustomValidity('')}catch(e){}"></asp:TextBox>
                                        </p>
                                    </asp:TableCell>
                                </asp:TableRow>
                                <asp:TableRow>
                                    <asp:TableCell Width="50%">
                                        <p>
                                            <label for="ddlPlans" data-icon="u" data-langg="signPlan">Plan</label>
                                            <asp:DropDownList ID="ddlPlans" runat="server" CssClass="DropDownList" AppendDataBoundItems="True">
                                                <asp:ListItem Value="" Selected="True">--Choose--</asp:ListItem>
                                                <asp:ListItem Value="free">Free</asp:ListItem>
                                                <asp:ListItem Value="monthly">Monthly</asp:ListItem>
                                                <asp:ListItem Value="yearly">Yearly</asp:ListItem>
                                                <%--<asp:ListItem Value="on_premises">On-Premises</asp:ListItem>--%>
                                            </asp:DropDownList>
                                        </p>
                                    </asp:TableCell>
                                    <asp:TableCell Width="50%">
                                        <p>
                                            <label for="planDesc" data-langg="signPlanDesc">Plan Cost</label>
                                            <asp:TextBox runat="server" ID="planDesc" Enabled="false" CssClass="twiceinput"></asp:TextBox>
                                        </p>
                                    </asp:TableCell>
                                </asp:TableRow>
                            </asp:Table>
                            <asp:UpdatePanel ID="UpdatePanel2" runat="server">
                                <ContentTemplate>
                                    <p>
                                        <asp:Label ID="lblErrorMatch" runat="server" ForeColor="Red" Font-Bold="True" data-langg="signErr" Visible="False">This email have already registered! Please choose another email or goto login form!</asp:Label>
                                    </p>
                                </ContentTemplate>
                                <Triggers>
                                    <asp:AsyncPostBackTrigger ControlID="btnSignUp" EventName="Click" />
                                </Triggers>
                            </asp:UpdatePanel>
                            <p class="signin button">
                                <asp:Button runat="server" ID="btnSignUp" Text="" OnClick="btnSignUp_Click" />
                            </p>
                            <p class="change_link">
                                <span data-langg="signAlredy">Already a member ? </span>
                                <a id="lnkbtnToLogin" class="to_register" href="#tologin" onclick="resetLoginForm()" data-langg="signGoLogin">Go and log in</a>
                            </p>
                        </div>
                        <asp:UpdateProgress ID="updateProgress" runat="server">
                            <ProgressTemplate>
                                <div style="position: fixed; text-align: center; height: 100%; width: 100%; top: 0; right: 0; left: 0; z-index: 9999999; background-color: #000000; opacity: 0.7;">
                                    <asp:Image ID="imgUpdateProgress" runat="server" ImageUrl="~/images/ajax-loader.gif" AlternateText="Loading ..." ToolTip="Loading ..." Style="margin-top: 20%;" />
                                </div>
                            </ProgressTemplate>
                        </asp:UpdateProgress>
                    </div>
                </div>
            </section>
        </div>
    </form>
</body>
</html>
