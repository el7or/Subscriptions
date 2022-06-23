var alertSuccessTitle = 'Done!';
var alertSuccessText = 'Saved new Changes!';
var alertSuccessTextSend = 'Send new mail succesfully!';
var alertWarningTitle = 'Warning';
var alertWarningText = 'Nothing Changed! You did not enter any value';
var alertWarningTextFixed = 'This member already in this Programe ! Please choose anothe one !';
var alertWarningTextDuplicate = 'This member already subscribe in this day in this Programe ! Please choose another one !';
var alertWarningTextCapacity = 'Capacity is full for this program, this subscriber will be added over the defined capacity !';
var alertWarningTextItems = 'You did not add item !';
var alertActiveText = 'Please Activate Your Account from link on your mail!';
var alertWarningTextMems = 'Must choose a date or by default we will assign it tomorrow';
var alertWarningTextPaid = 'Can not enter a value greater than the amount due, which = ';
var alertWarningTextPaidType = 'Must enter number only!';
var alertErrorTitle = 'Wrong!'
var alertErrorText = 'Old password is Uncorrect!';
var alertBtnText = 'OK';
var alertDeleteTitle = "Are you sure?";
var alertDeleteText = "You will not be able to recover this programme again!";
var alertDeleteItemText = "You will not be able to recover this item again!";
var alertDeleteUserText = "You will not be able to recover this user again!";
var alertBanText = 'You will not be able to (check in) for this Membership again!';
var alertActivateText = 'You will be able to (check in) for this Membership again!';
var alertBtnActiveText = "Yes, activate it!";
var alertBtnBanText = "Yes, suspend it!";
var alertBtnDeleteText = "Yes, delete it!";
var alertBtnCancelText = 'Cancel';
var alertDeletedTitle = "Deleted!";
var alertDeletedText = "The Programme has been deleted.";
var alertDeletedItemText = "The item has been deleted.";
var alertDeletedUserText = "User has been deleted.";
var alertSendBugTitle = "Something Wrong !";
var alertSendBugText = "Send us about this error to fix it:";
var alertBtnBugText = "Send"
var alertSendBugDone = "Thank you, will fix it soon !";
var noMemberships = 'No current membership!';
var txt_Subscription = 'Subscription in';
var txt_program = 'The programme: ';
var txt_EndAfter = 'ends after';
var txt_EndOn = 'ends in';
var txt_Day = ' Day';
var txt_Month = ' Month';
var txt_Year = ' Year';
var txt_Visit = ' Visit';
var txt_InvoiceNo = 'Invoice No.';
var txt_NeedToPay = 'need to paid balance due:';
var txt_on = 'on';
var txt_Dated = 'dated';
var txt_CopyOf = 'Copy of: ';
var txt_ActiveSubs = 'Number of active subscribers: ';
var noChekinsPeriod = '<tr><td colspan="5"><h1>No checkins in this period!</h1></td></tr>';
var noChekinsMember = '<tr><td colspan="5"><h1>No checkins for this member!</h1></td></tr>';
var noFindMember = '<tr><td colspan="4"><h2>No match found!</h2></td></tr>';
var receiptDate = 'Date of Invoice ';
var receiptTime = 'Time of Invoice ';
var activationAgain = 'Send activation mail again';
var ownerTitle = 'Owner';
var adminTitle = 'Admin';
var basicTitle = 'Basic';
var SpecTitle = 'Specialist';
var ownerSummary = 'Allows full access to every thing.';
var adminSummary = "Allows full access but can't block or delete another admins";
var basicSummary = 'Allows view and add only access to the Subscribers and subscriptions sections.';
var tabEditProgram = 'Edit Programme';
var tabAddProgram = 'Add Programme';
var tabAddStaff = 'Add User';
var tabEditStaff = 'Edit User';
var goInvoice = 'click to goto invoice!';
var tooltipGoDetails = 'click to show details!';
var btnSaveWithPrint = 'Save & Print';
var btnSaveWithoutPrint = 'Print';
var lastSubsTitle = 'Last Subscription: ';
var TotalDueTitle = 'Total Due: ';
var tooltipClone = 'Clone';
var tooltipEdit = 'Edit';
var tooltipDelete = 'Delete';
var tooltipStop = 'Click to stop';
var tooltipRun = 'Click to rerun';
var tooltipBlock = 'Click to block';
var tooltipActivate = 'Click to activate';
var activeMemship = 'Click to re-activate';
var banMemship = 'Click to suspend';
var activeInvoice = 'Re-active subscription';
var banInvoice = 'Suspend subscription';
var tabAddItem = 'Add Item';
var tabEditItem = 'Edit Items';
var itemchoose = 'Choose item ..';
var thPeriod = 'Period Time';
var thBooked = 'Booked Visits';
var btnRenew = 'Renew';
var btnNew = 'Subscribers';
var btnPay = 'Pay';
var createMemberAcc = 'Create Account';
var editMemberAcc = 'Edit Account';
var btnBlock_Block = 'Block';
var btnBlock_Activate = 'Activate';
var titleSubscriptionsChart = 'Subscriptions';
var titleSubspendedChart = 'Suspended Programs!';
var titleSubscriptionsChartPay = 'Actual paying';
var titleSubscriptionsTimeLine = 'Subscriptions';
var titlePaymentsTimeLine = 'Cash flow';
var fileNameSubscriptionsChart = 'Subscriptions_Statistics';
var fileNameTimeLineChart = 'TimeLine_Statistics';
var titleJoiningDate = 'Joining at: ';
var marcheMSG = 'Marché Message!';
var expireMSG1 = "Your free subscription to the system will expire after: ";
var expireMSG2 = "Your free subscription to the system has expired!";
var styleCut = 'left: -2em; right:auto;';
var printBillStyle = "@media print { body * { visibility: hidden;} #billContent * { visibility: visible; } #billContent #billHead{ display:block; } #tabsMember-3 * { -webkit-print-color-adjust: exact; } html { background: none; padding: 0; } body { box-shadow: none; margin: 0; }	#tabsMember-3 span:empty { display: none; }	#tabsMember-3 a.add, #tabsMember-3 a.cut, #tabsMember-3 .refund { display: none; }}";

var UserDTO;

var apiURL = (location.hostname.indexOf('azurewebsites.net') != -1 ? 'https://subs7.azurewebsites.net' : '');


/* ------------------Users Actions------------------*/
// Get Login User details:
$(document).ready(function () {
    function getUserDetails() {
        var userUID = $('#userUID').val();
        $.ajax({
            type: 'GET',
            url: apiURL + '/api/UserAPI/GetUserByID/' + userUID,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                UserDTO = data;


                UserDTO.AlertDays = (UserDTO.AlertDays == null ? 3 : UserDTO.AlertDays);
                UserDTO.AlertVisits = (UserDTO.AlertVisits == null ? 3 : UserDTO.AlertVisits);
                UserDTO.AlertPayments = (UserDTO.AlertPayments == null ? 3 : UserDTO.AlertPayments);

                var UserName = UserDTO.UserName;
                var Email = UserDTO.Email;
                var PartyFirstName = UserDTO.PartyFirstName;
                var PartyLastName = UserDTO.PartyLastName;
                var Telephone = UserDTO.Telephone;
                var CompanyName = UserDTO.CompanyName;
                var Industry = UserDTO.Industry;
                if (UserDTO.RoleTitle == 'Admin' || UserDTO.RoleTitle == 'Owner') {
                    $("#mainMenu ul > li:eq(1),#mainMenu ul > li:eq(2)").show();
                    $("#companyName,#frmChngCompany input[type=submit]").prop('disabled', false);
                }
                else if (UserDTO.RoleTitle == 'Basic') {
                    $("#mainMenu ul > li:eq(1),#mainMenu ul > li:eq(2)").hide();
                    $("#companyName,#frmChngCompany input[type=submit]").prop('disabled', true);
                }
                else if (UserDTO.RoleTitle == 'Specialist') {
                    $("#companyName,#frmChngCompany input[type=submit]").prop('disabled', true);
                    $('.dividerHeading:first, .sidebar, #rSide, .open').hide();
                    $('#lSide').width("60%");
                }

                $('#company, #invCompName').text(CompanyName);
                $('#owner, #invCompUser').text(PartyFirstName + ' ' + PartyLastName);
                $('#ownerEmail,#invCompEmail').text(Email);
                $('#invCompPhone').text(Telephone);
                $('#fnameAcc').val(PartyFirstName);
                $('#lnameAcc').val(PartyLastName);
                $('#emailAcc').val(Email);
                $('#phoneAcc').val(Telephone);
                $('#companyName').val(CompanyName);
                $('#industry').val(Industry);
                GetAllMembers();

                //GetAllInvoices();   <-- call this in switch language file
                //GetCalendarEvents();  <-- call this in switch language file

                if (UserDTO.Language == 1) {
                    $("#en").click();
                }
                else if (UserDTO.Language == 2) {
                    $("#ar-sa").click();
                }
                else if (UserDTO.Language == 3) {
                    $("#en-gb").click();
                }
                else if (UserDTO.Language == 4) {
                    $("#fr").click();
                }
                if (UserDTO.CheckDivisions == false) {
                    dialogMetaData();
                }
                if (data.Logo == null) {
                    $('#logoPage, #logoBill').attr("src", 'Images/logo.png');
                    $('#image-preview3').css('background-image', 'url(/Images/logo.png)');
                }
                else {
                    $('#logoPage, #logoBill').attr("src", data.Logo.substring(3));
                    $('#image-preview3').css('background-image', 'url(' + data.Logo.substring(1) + ')');
                }
                if (UserDTO.isCompanyExpired == true) {
                    if (UserDTO.ExpirationDays > 0) {
                        swal(marcheMSG, expireMSG1 + UserDTO.ExpirationDays + txt_Day, "warning");
                    }
                    else {
                        swal(marcheMSG, expireMSG2, "warning");
                    }
                }
            },
            error: function (xhr) {
                if (xhr.responseText == 'Session Expired') {
                    //window.location = 'Login.aspx';
                }
                else {
                    LoadSpinner.stop(firstSpinner);
                    swal({
                        title: alertSendBugTitle,
                        text: alertSendBugText,
                        type: "input",
                        showCancelButton: true,
                        confirmButtonText: alertBtnBugText,
                        cancelButtonText: alertBtnCancelText,
                        closeOnConfirm: false,
                        showLoaderOnConfirm: true,
                    },
                        function () {
                            setTimeout(function () {
                                swal(alertSendBugDone);
                            }, 2000);
                        });
                    console.log(xhr.responseText);
                }
            }
        });
    }
    getUserDetails();
});

// Update User details on left slider:
function UpdateUserAcc() {
    var usFName = $('#fnameAcc').val();
    var usLName = $('#lnameAcc').val();
    var usPhone = $('#phoneAcc').val();
    if (usFName == UserDTO.PartyFirstName && usLName == UserDTO.PartyLastName && usPhone == UserDTO.Telephone) {
        swal({
            title: alertWarningTitle,
            text: alertWarningText,
            confirmButtonText: alertBtnText,
            type: "warning"
        });
    }
    else {
        var UpdateUserAccSpinner = LoadSpinner.start();
        var userDetails = { PartyID: UserDTO.PartyID, PartyFirstName: usFName, PartyLastName: usLName, Telephone: usPhone, EditedBy: UserDTO.UserID };
        var t = JSON.stringify(userDetails);
        $.ajax({
            url: apiURL + '/api/UserApi/UpdateUser/',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: t,
            success: function () {
                UserDTO.PartyFirstName = usFName;
                UserDTO.PartyLastName = usLName;
                UserDTO.Telephone = usPhone;
                $('#owner').text(usFName + ' ' + usLName);
                LoadSpinner.stop(UpdateUserAccSpinner);
                swal({
                    title: alertSuccessTitle,
                    text: alertSuccessText,
                    type: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
                $('.panel-collapse.in').collapse('hide');
            },
            error: function (xhr) {
                if (xhr.responseText == 'Session Expired') {
                    //window.location = 'Login.aspx';
                }
                else {
                    LoadSpinner.stop(UpdateUserAccSpinner);
                    swal({
                        title: alertSendBugTitle,
                        text: alertSendBugText,
                        type: "input",
                        showCancelButton: true,
                        confirmButtonText: alertBtnBugText,
                        cancelButtonText: alertBtnCancelText,
                        closeOnConfirm: false,
                        showLoaderOnConfirm: true,
                    },
                        function () {
                            setTimeout(function () {
                                swal(alertSendBugDone);
                            }, 2000);
                        });
                    console.log(xhr.responseText);
                }
            }
        });
    }
}

// Update User Password on left slider:
function UpdatePassAcc() {
    var UpdatePassAccSpinner = LoadSpinner.start();
    var oldPassword = $('#oldPass').val();
    var newPassord = $('#newPass').val();
    var passowrdDetails = { OldPassword: oldPassword, NewPassword: newPassord, EditedBy: UserDTO.userID };
    var t = JSON.stringify(passowrdDetails);
    $.ajax({
        url: apiURL + '/api/UserApi/UpdateUserPass/',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: t,
        dataType: "json",
        success: function (data) {
            if (data == true) {
                LoadSpinner.stop(UpdatePassAccSpinner);
                swal({
                    title: alertSuccessTitle,
                    text: alertSuccessText,
                    type: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
                $('.panel-collapse.in').collapse('hide');
            }
            else {
                LoadSpinner.stop(UpdatePassAccSpinner);
                swal({
                    title: alertErrorTitle,
                    text: alertErrorText,
                    type: "error"
                });
            }
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                LoadSpinner.stop(UpdatePassAccSpinner);
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                },
                    function () {
                        setTimeout(function () {
                            swal(alertSendBugDone);
                        }, 2000);
                    });
                console.log(xhr.responseText);
            }
        }
    });
}

// Set logo of company:
function saveLogoCompany(clearBinaryLogo) {
    var saveLogoCompanySpinner = LoadSpinner.start();
    var logoInfo = { CompanyID: UserDTO.CompanyID, CompanyName: "", binaryImage: clearBinaryLogo, EditedBy: UserDTO.UserID };
    var t = JSON.stringify(logoInfo);
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: t,
        url: apiURL + '/api/UserApi/SaveCompanyLogo',
        success: function (data) {
            contentType: "application/json; charset=utf-8";
            if (data == null) {
                $('#logoPage, #logoBill').attr("src", 'Images/logo.png');
            }
            else {
                //$('#logoPage, #logoBill').attr("src", "\\" + data.substring(3));
                //$('#image-preview3').css('background-image', 'url(' + data + ')');
                setTimeout(function () {
                    $("#logoPage, #logoBill").attr("src", data.substring(3) + "?" + new Date().getTime());
                    $('#image-preview3').css('background-image', 'url(' + data.substring(1) + ')' + "?" + new Date().getTime());
                }, 1000);
            }

            LoadSpinner.stop(saveLogoCompanySpinner);
            $("#dialogMetaData #doneLogo").css("visibility", "visible");
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                LoadSpinner.stop(saveLogoCompanySpinner);
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                },
                    function () {
                        setTimeout(function () {
                            swal(alertSendBugDone);
                        }, 2000);
                    });
                console.log(xhr.responseText);
            }
        }
    });
}

// Update company info on left slider:
function UpdateCompAcc() {
    var compName = $('#companyName').val();
    //var compIndustry = $('#industry').val();
    if (compName == UserDTO.CompanyName) {
        swal({
            title: alertWarningTitle,
            text: alertWarningText,
            confirmButtonText: alertBtnText,
            type: "warning"
        });
    }
    else {
        var UpdateCompAccSpinner = LoadSpinner.start();
        var companyDetails = { CompanyID: UserDTO.CompanyID, CompanyName: compName, binaryImage: "", EditedBy: UserDTO.UserID };
        var t = JSON.stringify(companyDetails);
        $.ajax({
            url: apiURL + '/api/UserApi/UpdateCompany/',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: t,
            success: function () {
                UserDTO.CompanyName = compName;
                $('#company').text(compName);
                LoadSpinner.stop(UpdateCompAccSpinner);
                swal({
                    title: alertSuccessTitle,
                    text: alertSuccessText,
                    type: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
                $('.panel-collapse.in').collapse('hide');
            },
            error: function (xhr) {
                if (xhr.responseText == 'Session Expired') {
                    //window.location = 'Login.aspx';
                }
                else {
                    LoadSpinner.stop(UpdateCompAccSpinner);
                    swal({
                        title: alertSendBugTitle,
                        text: alertSendBugText,
                        type: "input",
                        showCancelButton: true,
                        confirmButtonText: alertBtnBugText,
                        cancelButtonText: alertBtnCancelText,
                        closeOnConfirm: false,
                        showLoaderOnConfirm: true,
                    },
                        function () {
                            setTimeout(function () {
                                swal(alertSendBugDone);
                            }, 2000);
                        });
                    console.log(xhr.responseText);
                }
            }
        });
    }
}

//Check Activation in first Add member:
function checkCompanyActivate() {
    var checkCompanyActivateSpinner = LoadSpinner.start();
    $.ajax({
        url: apiURL + '/api/UserApi/CheckActivate/' + UserDTO.CompanyID,
        type: 'GET',
        success: function (data) {
            contentType: "application/json; charset=utf-8";

            if (data == true) {
                dialogMember(null);
                LoadSpinner.stop(checkCompanyActivateSpinner);
            }
            else if (data == false) {
                LoadSpinner.stop(checkCompanyActivateSpinner);
                swal({
                    title: alertWarningTitle,
                    text: alertActiveText + '<br /><a href="#" onclick="sendActivationAgain()"><ins>' + activationAgain + '</ins></a>',
                    confirmButtonText: alertBtnText,
                    type: "warning",
                    html: true
                });
            }
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                LoadSpinner.stop(checkCompanyActivateSpinner);
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                },
                    function () {
                        setTimeout(function () {
                            swal(alertSendBugDone);
                        }, 2000);
                    });
                console.log(xhr.responseText);
            }
        }
    });
}
function sendActivationAgain() {
    var sendActivationAgainSpinner = LoadSpinner.start();
    $.ajax({
        type: "GET",
        url: apiURL + '/api/UserApi/sendActivation' + UserDTO.UserID,
        success: function () {
            LoadSpinner.stop(sendActivationAgainSpinner);
            swal({
                title: alertSuccessTitle,
                text: alertSuccessTextSend,
                type: "success",
                timer: 2000,
                showConfirmButton: false
            });
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                LoadSpinner.stop(sendActivationAgainSpinner);
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                },
                    function () {
                        setTimeout(function () {
                            swal(alertSendBugDone);
                        }, 2000);
                    });
                console.log(xhr.responseText);
            }
        }
    });
}

//Get All Users staff for this company:
var allUsersObject;
var specialistsObject;
function GetAllStaffUsers() {
    var deferred = new $.Deferred();
    $.ajax({
        url: apiURL + '/api/UserApi/GetAllStaffUsers/' + UserDTO.CompanyID,
        type: "GET",
        dataType: "json",
        success: function (data) {
            allUsersObject = data;
            contentType: "application/json";
            $('#staffHistory tbody tr').remove();
            $('#StaffBranch2').val($("#StaffBranch2 option:first").val());
            $('#specalistMem option').not(':eq(0), :selected').remove();
            specialistsObject = '{';
            $.each(allUsersObject, function (i, mobj) {
                $("#staffHistory").append(
                    '<tr><th hidden="hidden">' + mobj.UserID +
                    '</th><th hidden="hidden">' + mobj.BranchID +
                    '</th><th hidden="hidden">' + mobj.RoleID +
                    '</th><td>' + mobj.PartyFirstName +
                    '</td><td>' + mobj.UserName +
                    '</td><td>' + mobj.branchTitle +
                    '</td><td>' + ((mobj.RoleTitle == 'Admin') ? adminTitle : (mobj.RoleTitle == 'Basic') ? basicTitle : (mobj.RoleTitle == 'Owner') ? ownerTitle : SpecTitle) +
                    '</td><td>' + '<input class="toggleRole" ' + ((mobj.RoleTitle == 'Owner') || (mobj.RoleTitle == 'Admin' && UserDTO.RoleTitle == 'Admin') || (UserDTO.RoleTitle == 'Basic') ? ' disabled="disabled" ' : '') + (mobj.IsBlockedByAdmin == false ? ' checked="checked" ' : '') + ' data-toggle="toggle" data-on="<i class=\'fa fa-check-circle-o\' style=\'font-size:25px;color:white\'></i>" data-off="<i class=\'fa fa-ban\' style=\'font-size:25px;color:red\'></i>" data-style="ios" data-onstyle="info" data-offstyle="warning" type="checkbox"/>' +
                    '</td><td>' +
                    '<a href="#"' + ((mobj.RoleTitle == 'Owner' && UserDTO.RoleTitle != 'Owner') || (mobj.RoleTitle == 'Admin' && UserDTO.RoleTitle == 'Admin' && mobj.CurrentUserID != mobj.UserID) || (mobj.RoleTitle != 'Basic' && UserDTO.RoleTitle == 'Basic') ? ' disabled="disabled" ' : '') + ' class="btn btn-primary btn-success" data-toggle="tooltip" data-placement="top" title="' + tooltipEdit + '"><span class="glyphicon glyphicon-pencil"></span></a>' +
                    '<a href="#"' + ((mobj.RoleTitle == 'Owner') || (mobj.RoleTitle == 'Admin' && UserDTO.RoleTitle == 'Admin') || (UserDTO.RoleTitle == 'Basic') ? ' disabled="disabled" ' : '') + ' class="btn btn-primary btn-danger" data-toggle="tooltip" data-placement="top" title="' + tooltipDelete + '"><span class="glyphicon glyphicon-trash"></span></a></td></tr>');
                if (mobj.RoleTitle == 'Specialist') {
                    $('#specalistMem').append($('<option>').text(mobj.PartyFirstName).attr({ 'value': mobj.UserID, 'data-div': mobj.DivisionID }));
                    var specObj = mobj.UserID;
                    var specObject = { [specObj]: mobj.PartyFirstName };
                    specialistsObject += '"' + mobj.UserID + '":"' + mobj.PartyFirstName + '",';
                }
            });
            specialistsObject = specialistsObject.slice(0, -1);
            specialistsObject += '}';
            $('.toggleRole').bootstrapToggle();
            convertLangAll(langgSite, 'dialogStaff');
            deferred.resolve();
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                },
                    function () {
                        setTimeout(function () {
                            swal(alertSendBugDone);
                        }, 2000);
                    });
                console.log(xhr.responseText);
            }
        }
    });
    return deferred;
}

//Get Users staff by Branch:
$('#StaffBranch2').change(function () {
    var getStaffByBranchSpinner = LoadSpinner.start();
    var branchID = $(this).val();
    $.ajax({
        url: apiURL + '/api/UserApi/GetUsersByBranch/' + branchID,
        type: "GET",
        dataType: "json",
        success: function (data) {
            var allUsersObject = data;
            contentType: "application/json";
            $('#staffHistory tbody tr').remove();
            $.each(allUsersObject, function (i, mobj) {
                $("#staffHistory").append(
                    '<tr><th hidden="hidden">' + mobj.UserID +
                    '</th><th hidden="hidden">' + mobj.BranchID +
                    '</th><th hidden="hidden">' + mobj.RoleID +
                    '</th><td>' + mobj.PartyFirstName +
                    '</td><td>' + mobj.UserName +
                    '</td><td>' + mobj.branchTitle +
                    '</td><td>' + ((mobj.RoleTitle == 'Admin') ? adminTitle : (mobj.RoleTitle == 'Basic') ? basicTitle : (mobj.RoleTitle == 'Owner') ? ownerTitle : SpecTitle) +
                    '</td><td>' + '<input class="toggleRole" ' + ((mobj.RoleTitle == 'Owner') || (mobj.RoleTitle == 'Admin' && UserDTO.RoleTitle == 'Admin') ? ' disabled="disabled" ' : '') + (mobj.IsBlockedByAdmin == false ? ' checked="checked" ' : '') + ' data-toggle="toggle" data-on="<i class=\'fa fa-check-circle-o\' style=\'font-size:25px;color:white\'></i>" data-off="<i class=\'fa fa-ban\' style=\'font-size:25px;color:red\'></i>" data-style="ios" data-onstyle="info" data-offstyle="warning" type="checkbox"/>' +
                    '</td><td>' +
                    '<a href="#"' + (mobj.RoleTitle == 'Owner' && UserDTO.RoleTitle != 'Owner' ? ' disabled="disabled" ' : '') + ' class="btn btn-primary btn-success" data-toggle="tooltip" data-placement="top" title="' + tooltipEdit + '"><span class="glyphicon glyphicon-pencil"></span></a>' +
                    '<a href="#"' + ((mobj.RoleTitle == 'Owner') || (mobj.RoleTitle == 'Admin' && UserDTO.RoleTitle == 'Admin') ? ' disabled="disabled" ' : '') + ' class="btn btn-primary btn-danger" data-toggle="tooltip" data-placement="top" title="' + tooltipDelete + '"><span class="glyphicon glyphicon-trash"></span></a></td></tr>');
            });
            $('.toggleRole').bootstrapToggle();
            convertLangAll(langgSite, 'dialogStaff');
            LoadSpinner.stop(getStaffByBranchSpinner);
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                LoadSpinner.stop(getStaffByBranchSpinner);
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                },
                    function () {
                        setTimeout(function () {
                            swal(alertSendBugDone);
                        }, 2000);
                    });
                console.log(xhr.responseText);
            }
        }
    });
});

//Add new user staff:
function addNewUserStaff() {
    var addNewUserStaffSpinner = LoadSpinner.start();
    var staffName = $('#staffName').val();
    var userName = $('#userName').val();
    var userPass = $('#userPass').val();
    var braunchId = $('#StaffBranch').val();
    var roleId = $('#roleStaff').val();
    var SpecDivId = ($('#roleStaff').val() == '46fbf01c-c46e-479d-a86c-8113b3d81d8e' ? $('#DivStaff').val() : null)
    //var UserDetails = { UserID: null, BranchID: braunchId, RoleID: roleId, DivisionID: SpecDivId, PartyFirstName: staffName, UserName: userName, Password: userPass, branchTitle: null, RoleTitle: null, Language: UserDTO.Language, IsBlockedByAdmin: false, CurrentUserID: UserDTO.UserID };
    //var t = JSON.stringify(UserDetails);
    $.ajax({
        url: apiURL + '/api/UserApi/AddStaffUser?staffName=' + staffName + '&userName=' + userName + '&userPass=' + userPass + '&braunchId=' + braunchId + '&roleId=' + roleId + '&SpecDivId=' + SpecDivId + '&Language=' + UserDTO.Language + '&CurrentUserID=' + UserDTO.UserID,
        type: "Get",
        //contentType: "application/json; charset=utf-8",
        //data: t,
        success: function () {
            var defGetAllStaffUsers = GetAllStaffUsers();
            defGetAllStaffUsers.then(function () { LoadSpinner.stop(addNewUserStaffSpinner); });
            swal({
                title: alertSuccessTitle,
                text: alertSuccessText,
                type: "success",
                timer: 2000,
                showConfirmButton: false
            });
            $("#tabsStaff").tabs("option", "active", 1);
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                LoadSpinner.stop(addNewUserStaffSpinner);
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                },
                    function () {
                        setTimeout(function () {
                            swal(alertSendBugDone);
                        }, 2000);
                    });
                console.log(xhr.responseText);
            }
        }
    });
}

// Edit user staff:
var UserStaffUID;
$(document).on('click', '#staffHistory tbody tr td a[class~=btn-success]', function () {
    var fillOldStaffSpinner = LoadSpinner.start();
    UserStaffUID = $(this).closest('tr').find('th:eq(0)').text();
    var countOwner = 0;
    $.each(allUsersObject, function (i, mobj) {
        if (mobj.UserID == UserStaffUID) {
            $('#staffName').val(mobj.PartyFirstName);
            $('#userName').val(mobj.UserName);
            $('#userPass,#userPassCon').val('');
            $('#StaffBranch').val(mobj.BranchID).trigger('change');
            $('#roleStaff').val(mobj.RoleID).trigger('change');
            $('#DivStaff').val(mobj.DivisionID).trigger('change');
        }
        if (mobj.RoleTitle == 'Owner') {
            countOwner++;
        }
    });
    if ((countOwner < 2 && $('#roleStaff').val() == '7901c8ae-a613-4acd-80e2-31e153099ce8') || (UserDTO.RoleTitle != 'Owner')) {
        $('#roleStaff').prop('disabled', true);
    }
    else { $('#roleStaff').prop('disabled', false); }
    $('#tabsStaff ul:first li:eq(0) a').text(tabEditStaff);
    isFromStaffEdit = true;
    $("#tabsStaff").tabs("option", "active", 0);
    checkNewStaff = false;
    LoadSpinner.stop(fillOldStaffSpinner);
});
function updateUserStaff() {
    var updateUserStaffSpinner = LoadSpinner.start();
    var staffName = $('#staffName').val();
    var userName = $('#userName').val();
    var userPass = $('#userPass').val();
    var braunchId = $('#StaffBranch').val();
    var roleId = $('#roleStaff').val();
    var SpecDivId = ($('#roleStaff').val() == '46fbf01c-c46e-479d-a86c-8113b3d81d8e' ? $('#DivStaff').val() : null)
    var UserDetails = { UserID: UserStaffUID, BranchID: braunchId, RoleID: roleId, DivisionID: SpecDivId, PartyFirstName: staffName, UserName: userName, Password: userPass, branchTitle: null, RoleTitle: null, Language: UserDTO.Language, IsBlockedByAdmin: false, CurrentUserID: UserDTO.UserID };
    var t = JSON.stringify(UserDetails);
    $.ajax({
        url: apiURL + '/api/UserApi/UpdateStaffUser/',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: t,
        //dataType: "json",
        success: function () {
            $('#tabsStaff ul:first li:eq(0) a').text(tabAddStaff);
            var defGetAllStaffUsers = GetAllStaffUsers();
            defGetAllStaffUsers.then(function () { LoadSpinner.stop(updateUserStaffSpinner); });
            swal({
                title: alertSuccessTitle,
                text: alertSuccessText,
                type: "success",
                timer: 2000,
                showConfirmButton: false
            });
            $("#tabsStaff").tabs("option", "active", 1);
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                LoadSpinner.stop(updateUserStaffSpinner);
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                },
                    function () {
                        setTimeout(function () {
                            swal(alertSendBugDone);
                        }, 2000);
                    });
                console.log(xhr.responseText);
            }
        }
    });
}

// Block/Activate user staff:
$(document).on('change', '#staffHistory tbody tr td input[class~=toggleRole]', function () {
    var changeStaffStatusSpinner = LoadSpinner.start();
    var userStaffID = $(this).closest('tr').find('th:eq(0)').text();
    var isBloked;
    if ($(this).prop('checked') == true) {
        isBloked = false;
    }
    else {
        isBloked = true;
    }
    $.ajax({
        type: "GET",
        url: apiURL + '/api/UserApi/BlockStaffUser?staffID=' + userStaffID + '&userUID=' + UserDTO.UserID + '&isBlocked=' + isBloked,
        success: function () {
            var defGetAllStaffUsers = GetAllStaffUsers();
            defGetAllStaffUsers.then(function () { LoadSpinner.stop(changeStaffStatusSpinner); });

            swal({
                title: alertSuccessTitle,
                text: alertSuccessText,
                type: "success",
                timer: 2000,
                showConfirmButton: false
            });
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                LoadSpinner.stop(changeStaffStatusSpinner);
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                },
                    function () {
                        setTimeout(function () {
                            swal(alertSendBugDone);
                        }, 2000);
                    });
                console.log(xhr.responseText);
            }
        }
    });
});

// Delete user staff:
$(document).on('click', '#staffHistory tbody tr td a[class~=btn-danger]', function () {
    var userStaffID = $(this).closest('tr').find('th:eq(0)').text();
    swal({
        title: alertDeleteTitle,
        text: alertDeleteUserText,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: alertBtnDeleteText,
        cancelButtonText: alertBtnCancelText,
        closeOnConfirm: false,
        html: true
    },
        function (isConfirm) {
            if (isConfirm) {
                var deleteStaffUserSpinner = LoadSpinner.start();
                $.ajax({
                    type: "GET",
                    url: apiURL + '/api/UserApi/DeleteStaffUser?staffID=' + userStaffID + '&userUID=' + UserDTO.UserID,
                    success: function () {
                        var defGetAllStaffUsers = GetAllStaffUsers();
                        defGetAllStaffUsers.then(function () { LoadSpinner.stop(deleteStaffUserSpinner); });

                        swal({
                            title: alertDeletedTitle,
                            text: alertDeletedUserText,
                            type: "success",
                            timer: 2000,
                            showConfirmButton: false
                        });
                    },
                    error: function (xhr) {
                        if (xhr.responseText == 'Session Expired') {
                            //window.location = 'Login.aspx';
                        }
                        else {
                            LoadSpinner.stop(deleteStaffUserSpinner);
                            swal({
                                title: alertSendBugTitle,
                                text: alertSendBugText,
                                type: "input",
                                showCancelButton: true,
                                confirmButtonText: alertBtnBugText,
                                cancelButtonText: alertBtnCancelText,
                                closeOnConfirm: false,
                                showLoaderOnConfirm: true,
                            },
                                function () {
                                    setTimeout(function () {
                                        swal(alertSendBugDone);
                                    }, 2000);
                                });
                            console.log(xhr.responseText);
                        }
                    }
                });
            } else {
                return;
            }
        });
});

// Add & Update member Account
function saveMemberAccount(partyId) {
    var saveMemberAccountSpinner = LoadSpinner.start();
    var userID = $('#accMemUserID').val();
    var partyID = partyId;
    var userName = $('#accEmailMem').val();
    var userPass = $('#accPassConfMem').val();
    var braunchId = UserDTO.BranchID;

    // add new member account: 
    if (userID == "") {
        var accountDetails = {
            PartyID: partyID,
            BranchID: UserDTO.BranchID,
            UserName: userName,
            Password: userPass,
            Language: UserDTO.Language,
            CompanyName: $('#companyName').val(),
            EditedBy: UserDTO.UserID
        };
        var t = JSON.stringify(accountDetails);
        $.ajax({
            url: apiURL + '/api/UserApi/PostMemberUser/',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: t,
            dataType: 'json',
            success: function (data) {
                $('#accMemUserID').val(data);
                $('#email').val(userName);
                $('#blockAccMem').text(btnBlock_Block).show();
                $('#btnAccount').prop('disabled', false);
                LoadSpinner.stop(saveMemberAccountSpinner);
                swal({ title: titleMemSave, type: "success", text: textMemSaveAccount, timer: 2000, showConfirmButton: false });
            },
            error: function (xhr) {
                if (xhr.responseText == 'Session Expired') {
                    //window.location = 'Login.aspx';
                }
                else {
                    LoadSpinner.stop(saveMemberAccountSpinner);
                    swal({
                        title: alertSendBugTitle,
                        text: alertSendBugText,
                        type: "input",
                        showCancelButton: true,
                        confirmButtonText: alertBtnBugText,
                        cancelButtonText: alertBtnCancelText,
                        closeOnConfirm: false,
                        showLoaderOnConfirm: true,
                    },
                        function () {
                            setTimeout(function () {
                                swal(alertSendBugDone);
                            }, 2000);
                        });
                    console.log(xhr.responseText);
                }
            }
        });
    }

    //update existing member account:
    else {
        var accountDetails = {
            UserID: userID,
            PartyID: partyID,
            BranchID: UserDTO.BranchID,
            UserName: userName,
            Password: userPass,
            Language: UserDTO.Language,
            CompanyName: $('#companyName').val(),
            EditedBy: UserDTO.UserID
        };
        var t = JSON.stringify(accountDetails);
        $.ajax({
            url: apiURL + '/api/UserApi/UpdateMemberUser/',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: t,
            success: function () {
                $('#email').val(userName);
                LoadSpinner.stop(saveMemberAccountSpinner);
                swal({ title: titleMemSave, type: "success", text: textMemSaveAccount, timer: 2000, showConfirmButton: false });
            },
            error: function (xhr) {
                if (xhr.responseText == 'Session Expired') {
                    //window.location = 'Login.aspx';
                }
                else {
                    LoadSpinner.stop(saveMemberAccountSpinner);
                    swal({
                        title: alertSendBugTitle,
                        text: alertSendBugText,
                        type: "input",
                        showCancelButton: true,
                        confirmButtonText: alertBtnBugText,
                        cancelButtonText: alertBtnCancelText,
                        closeOnConfirm: false,
                        showLoaderOnConfirm: true,
                    },
                        function () {
                            setTimeout(function () {
                                swal(alertSendBugDone);
                            }, 2000);
                        });
                    console.log(xhr.responseText);
                }
            }
        });
    }
}

// Block/Activate member Account: 
$(document).on('click', '#dialogAccountMember #blockAccMem', function () {

    var userMemberID = $('#accMemUserID').val();
    var isBloked;
    if ($(this).text() == btnBlock_Activate) {
        isBloked = false;
        $('#accEmailMem, #accPassMem, #accPassConfMem, #saveAccMem').removeAttr('disabled');
        $('#blockAccMem').text(btnBlock_Block);
    }
    else {
        isBloked = true;
        $('#accEmailMem, #accPassMem, #accPassConfMem, #saveAccMem').prop('disabled', true);
        $('#blockAccMem').text(btnBlock_Activate);
    }
    $.ajax({
        type: "GET",
        url: apiURL + '/api/UserApi/BlockStaffUser?staffID=' + userMemberID + '&isBlocked=' + isBloked,
        success: function () {

            swal({
                title: alertSuccessTitle,
                text: alertSuccessText,
                type: "success",
                timer: 2000,
                showConfirmButton: false
            });
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                },
                    function () {
                        setTimeout(function () {
                            swal(alertSendBugDone);
                        }, 2000);
                    });
                console.log(xhr.responseText);
            }
        }
    });
});


/* ------------------User Preferences Actions------------------*/
// Set language:
function setLanguage(langID) {
    $.ajax({
        type: "GET",
        url: apiURL + '/api/UserApi/setLanguage?userUID=' + UserDTO.UserID + '&langID=' + langID,
        success: function () {

        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                },
                    function () {
                        setTimeout(function () {
                            swal(alertSendBugDone);
                        }, 2000);
                    });
                console.log(xhr.responseText);
            }
        }
    });
}

// Set Currency:
function setCurrency(currencyCode) {


    //$.ajax({
    //    type: "GET",
    //    url: apiURL + '/api/UserApi/setLanguage?userID=' + userUID + '&langID=' + langID,
    //    success: function () {
    //        
    //        $("#dialogMetaData #doneLang").css("visibility", "visible");
    //    },
    //    error: function (xhr) {
    //swal({
    //    title: alertSendBugTitle,
    //    text: alertSendBugText,
    //    type: "input",
    //    showCancelButton: true,
    //    confirmButtonText: alertBtnBugText,
    //    cancelButtonText: alertBtnCancelText,
    //    closeOnConfirm: false,
    //    showLoaderOnConfirm: true,
    //},
    //                function () {
    //                    setTimeout(function () {
    //                        swal(alertSendBugDone);
    //                    }, 2000);
    //                });
    //console.log(xhr.responseText);
    //    }
    //});
}

// Set Notifications Alerts:
function setNotification(alertDays, alertVisits, alertPayments) {
    var setNotificationSpinner = LoadSpinner.start();
    $.ajax({
        type: "GET",
        url: apiURL + '/api/UserApi/setNotification?userUID=' + UserDTO.UserID + 'alertDays=' + alertDays + '&alertVisits=' + alertVisits + '&alertPayments=' + alertPayments,
        success: function () {
            UserDTO.AlertDays = alertDays;
            UserDTO.AlertVisits = alertVisits;
            UserDTO.AlertPayments = alertPayments;
            $('#setNotifSubsDays').val(alertDays);
            $('#setNotifSubsVisits').val(alertVisits);
            $('#setNotifPayDays').val(alertPayments);
            LoadSpinner.stop(setNotificationSpinner);
            swal({
                title: alertSuccessTitle,
                text: alertSuccessText,
                type: "success",
                timer: 2000,
                showConfirmButton: false
            });
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                LoadSpinner.stop(setNotificationSpinner);
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                },
                    function () {
                        setTimeout(function () {
                            swal(alertSendBugDone);
                        }, 2000);
                    });
                console.log(xhr.responseText);
            }
        }
    });
}


/* ------------------Roles Actions------------------*/
//Get Roles for this module:
function getRoles() {
    var deferred = new $.Deferred();
    $.ajax({
        url: apiURL + '/api/UserApi/GetRoles/',
        type: 'GET',
        success: function (data) {
            contentType: "application/json; charset=utf-8";
            //fill branches list to comboBoxes .....
            $('#roleStaff option').not(':eq(0), :selected').remove();
            $.each(data, function (i, value) {
                if (value.RoleTitle != 'Client') {
                    $('#roleStaff').append($('<option>')
                        .text(((value.RoleTitle == 'Admin') ? adminTitle : (value.RoleTitle == 'Basic') ? basicTitle : (value.RoleTitle == 'Owner') ? ownerTitle : SpecTitle))
                        .attr('value', value.RoleID)
                        .attr('data-info', ((value.RoleTitle == 'Admin') ? adminSummary : (value.RoleTitle == 'Basic') ? basicSummary : (value.RoleTitle == 'Owner') ? ownerSummary : '')));
                }
            });
            deferred.resolve();
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                },
                    function () {
                        setTimeout(function () {
                            swal(alertSendBugDone);
                        }, 2000);
                    });
                console.log(xhr.responseText);
            }
        }
    });
    return deferred;
}


/* ------------------Divisions Actions------------------*/
//Get Divisions list:
function getDivisons() {
    var deferred = $.Deferred();
    $.ajax({
        url: apiURL + '/api/DivisionAPI/GetDivisons/' + UserDTO.CompanyID,
        type: 'GET',
        success: function (data) {
            contentType: "application/json; charset=utf-8";
            //fill divisons list to comboBox & editable list.....
            $('#dialogDivs #tblDivs tbody,#dialogMemType #divs option,#dialogMetaData #divs option').remove();
            $('#divs2 option,#division option, #DivStaff option').not(':eq(0), :selected').remove();
            $.each(data, function (i, value) {
                $('#dialogMemType #divs,#dialogMetaData #divs').append($('<option>').text(value.DivisionName).attr('value', value.DivisionID));
                $('#divs2, #DivStaff').append($('<option>').text(value.DivisionName).attr('value', value.DivisionID));
                $('#division').append($('<option>').text(value.DivisionName).attr('value', value.DivisionID));
                $('#tblDivs').append('<tr><th hidden="hidden" scope="row">' + value.DivisionID + '</th><td>' + value.DivisionName + '</td></tr>');
            });
            //make table editable:
            $('#tblDivs').Tabledit({
                columns: {
                    identifier: [0, 'id'],
                    editable: [[1, 'divName']]
                }
            });
            $('#headerDiv').attr('colspan', '2')
            convertLangTableButtons(langgSite);
            deferred.resolve();
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                },
                    function () {
                        setTimeout(function () {
                            swal(alertSendBugDone);
                        }, 2000);
                    });
                console.log(xhr.responseText);
            }
        }
    });
    return deferred;
}

// Insert new Division in small divisions dialog or in first popup:
function PostDivision(divisionName) {
    var PostDivisionSpinner = LoadSpinner.start();
    $.ajax({
        type: "GET",
        url: apiURL + '/api/DivisionAPI/PostDivision?divName=' + divisionName + '&compID=' + UserDTO.CompanyID + '&userUID=' + UserDTO.UserID,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            var defgetDivisons = getDivisons();
            defgetDivisons.then(function () {
                LoadSpinner.stop(PostDivisionSpinner);
                $('#dialogDivs #newDiv,#dialogMetaData #newDiv').val('');
                $("#dialogDivs #doneDiv,#dialogMetaData #doneDiv").css("visibility", "visible");
            })
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                LoadSpinner.stop(PostDivisionSpinner);
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                },
                    function () {
                        setTimeout(function () {
                            swal(alertSendBugDone);
                        }, 2000);
                    });
                console.log(xhr.responseText);
            }
        }
    });
}

//Update Division in table:
var divNameOld;
$(document).on('click', '#tblDivs tbody tr .tdActions .tabledit-toolbar button[class~=tabledit-edit-button], #tblDivs tbody tr .tdActions .tabledit-toolbar button[class~=tabledit-delete-button]', function () {
    divNameOld = $(this).closest('tr').find('td:eq(0) > span').text();
});
$(document).on('click', '#tblDivs tbody tr .tdActions .tabledit-toolbar button[class~=tabledit-save-button]', function () {
    var divName = $(this).closest('tr').find('td input[name=divName]').val();
    var divID = $(this).closest('tr').find('th[hidden=hidden]').text();
    if (divName == '') {
        swal({
            title: alertWarningTitle,
            text: alertWarningText,
            confirmButtonText: alertBtnText,
            type: "warning"
        });
        $(this).closest('tr').find('td:eq(0) > span').text(divNameOld);
    }
    else {
        var updateDivisionSpinner = LoadSpinner.start();
        $.ajax({
            type: "GET",
            url: apiURL + '/api/DivisionAPI/UpdateDivision?divID=' + divID + '&divName=' + divName + '&userUID=' + UserDTO.UserID,
            success: function () {
                var defgetDivisons = getDivisons();
                defgetDivisons.then(function () { LoadSpinner.stop(updateDivisionSpinner); });
                swal({
                    title: alertSuccessTitle,
                    text: alertSuccessText,
                    type: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
            },
            error: function (xhr) {
                if (xhr.responseText == 'Session Expired') {
                    //window.location = 'Login.aspx';
                }
                else {
                    LoadSpinner.stop(updateDivisionSpinner);
                    swal({
                        title: alertSendBugTitle,
                        text: alertSendBugText,
                        type: "input",
                        showCancelButton: true,
                        confirmButtonText: alertBtnBugText,
                        cancelButtonText: alertBtnCancelText,
                        closeOnConfirm: false,
                        showLoaderOnConfirm: true,
                    },
                        function () {
                            setTimeout(function () {
                                swal(alertSendBugDone);
                            }, 2000);
                        });
                    console.log(xhr.responseText);
                }
            }
        });
    }
});
$(document).on('click', '#tblDivs tbody tr .tdActions .tabledit-toolbar button[class~=tabledit-restore-button]', function () {
    $(this).closest('tr').find('td:eq(0) > span').text(divNameOld);
});

// Delete Division in table:
$(document).on('mouseup', '#tblDivs tbody tr .tdActions .tabledit-toolbar button[class~=tabledit-confirm-button]', function () {
    var deleteDivisionSpinner = LoadSpinner.start();
    var divID = $(this).closest('tr').find('th[hidden=hidden]').text();
    $.ajax({
        type: "GET",
        url: apiURL + '/api/DivisionAPI/DeleteDivision?divID=' + divID + '&userUID=' + UserDTO.UserID,
        success: function () {
            var defgetDivisons = getDivisons();
            defgetDivisons.then(function () { LoadSpinner.stop(deleteDivisionSpinner); });
            swal({
                title: alertSuccessTitle,
                text: alertSuccessText,
                type: "success",
                timer: 2000,
                showConfirmButton: false
            });
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                LoadSpinner.stop(deleteDivisionSpinner);
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                },
                    function () {
                        setTimeout(function () {
                            swal(alertSendBugDone);
                        }, 2000);
                    });
                console.log(xhr.responseText);
            }
        }
    });
});
$(document).on('click', '#tblDivs tbody tr .tdActions .tabledit-toolbar button', function () {
    $('#frmAddDiv').data('bootstrapValidator').resetForm(true);
    $('#newDiv').val('');
});


/* ------------------Programmes Actions------------------*/
//Get All programmes:
var allProgramsObject;
function GetAllProgrammes() {
    var deferred = new $.Deferred();
    $('.progs2').hide();
    $.ajax({
        url: apiURL + '/api/ProgrammeAPI/GetAllProgrammes/' + UserDTO.CompanyID,
        type: "GET",
        dataType: "json",
        success: function (data) {
            allProgramsObject = data;
            contentType: "application/json";
            $('#progsCount').text(allProgramsObject.length);
            var programsWithSubs = 0;
            $('#membershipGrid tbody tr').remove();
            $('#basis2 option, #invByProg option, #packages option').not(':eq(0), :selected').remove();
            $('#divs2').val($("#divs2 option:first").val());
            $.each(allProgramsObject, function (i, mobj) {
                if (mobj.isAvailable == true && mobj.IsActive == true) {
                    $('#basis2').append($('<option>').text(mobj.ProgramName).attr({
                        'value': mobj.ProgramID,
                        'data-div': mobj.DivisionID,
                        'data-basis': mobj.ProgramBasis,
                        'data-fees': mobj.ProgramFees,
                        'data-length': mobj.Length,
                        'data-unit': mobj.LengthUnit,
                        'data-start': fDate(mobj.StartDate),
                        'data-end': fDate(mobj.EndDate),
                        'data-visits': mobj.No_Of_Visists,
                        'data-desc': mobj.Description,
                        'data-days': mobj.ProgramDays,
                        'data-timeFrom': mobj.ProgramTimeFrom,
                        'data-timeTo': mobj.ProgramTimeTo,
                        'data-validDays': mobj.ValidationDuration,
                        'data-capacity': mobj.ProgramCapacity,
                    }));
                    if (mobj.ProgramBasis != 'Package' && mobj.ProgramBasis != 'openProgram' && mobj.ProgramBasis != 'fixedProgram') {
                        $('#packages').append($('<option>').text(mobj.ProgramName).attr({
                            'value': mobj.ProgramID,
                            'data-fees': mobj.ProgramFees,
                        }));
                    }
                }
                $('#invByProg').append($('<option>').text(mobj.ProgramName).attr({ 'value': mobj.ProgramID }));

                $("#membershipGrid").append(
                    '<tr ' + (mobj.IsActive == true ? '' : '  class="warning" ') + ' >' +
                    '<th hidden="hidden">' + mobj.ProgramID +
                    '</th><td>' + mobj.ProgramName +
                    '</td><td>' + mobj.ProgramFees +
                    '</td><td>' + mobj.ProgramMembers +
                    '</td><td>' +
                    '<a href="#" data-clonedfrom="' + mobj.ClonedFrom + '" class="btn outline btn-default" data-toggle="tooltip" data-placement="top" title="' + tooltipClone + '"><span class="glyphicon glyphicon-duplicate"></span></a>' +
                    '<a href="#" class="btn btn-success editMem" data-toggle="tooltip" data-placement="top" title="' + tooltipEdit + '"><span class="glyphicon glyphicon-pencil"></span></a>' +
                    '<a href="#" ' + (mobj.isAvailable == false ? 'disabled' : '') + ' class="btn btn-primary btn-warning" data-toggle="tooltip" data-placement="top" ' + (mobj.IsActive == true ? ' title="' + tooltipStop + '"><span class="glyphicon glyphicon-ban-circle">' : '  title="' + tooltipRun + '"><span class="glyphicon glyphicon-repeat">') + '</span></a>' +
                    '<a href="#" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="' + tooltipDelete + '"><span class="glyphicon glyphicon-trash"></span></a></td></tr>');
                if (mobj.ProgramMembers > 0) {
                    programsWithSubs++;
                }
            });
            $('#progsWithSubs').text(programsWithSubs);
            $('#progsWithoutSubs').text(allProgramsObject.length - programsWithSubs);
            // get total of incomes for all programs
            Array.prototype.sum = function (prop) {
                var total = 0
                for (var i = 0, _len = this.length; i < _len; i++) {
                    total += this[i][prop]
                }
                return total
            }
            $('#totalGross').text(allProgramsObject.sum("GrossIncome") + ' $');
            // get most income and least income
            var max = -Infinity;
            var min = +Infinity;
            var keyMax, keyMin;

            allProgramsObject.forEach(function (v, k) {
                if (max < +v.GrossIncome) {
                    max = +v.GrossIncome;
                    keyMax = k;
                }
                if (min > +v.GrossIncome) {
                    min = +v.GrossIncome;
                    keyMin = k;
                }
            });
            $('#progMostIncome').text(allProgramsObject[keyMax].ProgramName);
            $('#progLeastIncome').text(allProgramsObject[keyMin].ProgramName);
            deferred.resolve();
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                },
                    function () {
                        setTimeout(function () {
                            swal(alertSendBugDone);
                        }, 2000);
                    });
                console.log(xhr.responseText);
            }
        }
    });
    return deferred;
}

//Get programmes by Division:
$('#divs2,#division').change(function () {
    var getProgramsByDivisionSpinner = LoadSpinner.start();
    var divID = $(this).val();
    $("#specalistMem > option").each(function () {
        if (this.getAttribute('data-div') != divID) {
            $(this).hide();
        }
        else $(this).show();
    });
    $.ajax({
        url: apiURL + '/api/ProgrammeAPI/GetProgrammesByDivision/' + divID,
        type: "GET",
        dataType: "json",
        success: function (data) {
            var myJsonObject = data;
            contentType: "application/json";
            $('#membershipGrid tbody tr').remove();
            $('#basis2 ').val('');
            $('#frmMembership').bootstrapValidator('updateStatus', 'basis2', 'INVALID', 'notEmpty');
            $('#basis2 option, #invByProg option').not(':eq(0), :selected').remove();
            $.each(myJsonObject, function (i, mobj) {
                if (mobj.isAvailable == true && mobj.IsActive == true) {
                    $('#basis2').append($('<option>').text(mobj.ProgramName).attr({
                        'value': mobj.ProgramID,
                        'data-div': mobj.DivisionID,
                        'data-basis': mobj.ProgramBasis,
                        'data-fees': mobj.ProgramFees,
                        'data-length': mobj.Length,
                        'data-unit': mobj.LengthUnit,
                        'data-start': fDate(mobj.StartDate),
                        'data-end': fDate(mobj.EndDate),
                        'data-visits': mobj.No_Of_Visists,
                        'data-desc': mobj.Description,
                        'data-days': mobj.ProgramDays,
                        'data-timeFrom': mobj.ProgramTimeFrom,
                        'data-timeTo': mobj.ProgramTimeTo,
                        'data-validDays': mobj.ValidationDuration,
                        'data-capacity': mobj.ProgramCapacity,
                    }));
                }
                $('#invByProg').append($('<option>').text(mobj.ProgramName).attr({ 'value': mobj.ProgramID }));

                $("#membershipGrid").append(
                    '<tr ' + (mobj.IsActive == true ? '' : '  class="warning" ') + ' >' +
                    '<th hidden="hidden">' + mobj.ProgramID +
                    '</th><td>' + mobj.ProgramName +
                    '</td><td>' + mobj.ProgramFees +
                    '</td><td>' + mobj.ProgramMembers +
                    '</td><td>' +
                    '<a href="#" data-clonedfrom="' + mobj.ClonedFrom + '" class="btn outline btn-default" data-toggle="tooltip" data-placement="top" title="' + tooltipClone + '"><span class="glyphicon glyphicon-duplicate"></span></a>' +
                    '<a href="#" class="btn btn-success editMem" data-toggle="tooltip" data-placement="top" title="' + tooltipEdit + '"><span class="glyphicon glyphicon-pencil"></span></a>' +
                    '<a href="#" ' + (mobj.isAvailable == false ? 'disabled' : '') + ' class="btn btn-primary btn-warning" data-toggle="tooltip" data-placement="top" ' + (mobj.IsActive == true ? ' title="' + tooltipStop + '"><span class="glyphicon glyphicon-ban-circle">' : '  title="' + tooltipRun + '"><span class="glyphicon glyphicon-repeat">') + '</span></a>' +
                    '<a href="#" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="' + tooltipDelete + '"><span class="glyphicon glyphicon-trash"></span></a></td></tr>');
            });
            //convertLangAll(langgSite, 'dialogMemType');
            LoadSpinner.stop(getProgramsByDivisionSpinner);
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                LoadSpinner.stop(getProgramsByDivisionSpinner);
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                },
                    function () {
                        setTimeout(function () {
                            swal(alertSendBugDone);
                        }, 2000);
                    });
                console.log(xhr.responseText);
            }
        }
    });
});

//Get all progarmmes for Calendar:
var calendarEvents = [];
function GetCalendarEvents() {
    var deferred = new $.Deferred();
    $('#calendar').fullCalendar('removeEventSource', calendarEvents);
    calendarEvents.length = 0;
    if (UserDTO.RoleTitle != 'Specialist') {
        $.ajax({
            url: apiURL + '/api/ProgrammeAPI/GetAllCalendarProgrammes/' + UserDTO.CompanyID,
            type: "GET",
            dataType: "json",
            success: function (data) {
                contentType: "application/json";
                $('#endSubs tbody').remove();
                $.each(data, function (i, mobj) {
                    var evnt = new Object();
                    if (mobj.ProgramBasis == "fixedProgram") {
                        evnt.id = mobj.ProgramID;
                        evnt.title = mobj.ProgramName;
                        evnt.description = mobj.ProgramMembers;
                        evnt.basis = mobj.ProgramBasis;
                        evnt.backgroundColor = (mobj.IsActive == false ? '#eea236' : '');
                        evnt.avail = mobj.isAvailable;
                        // set start & end event
                        var progTimeFrom = (mobj.ProgramTimeFrom == "" ? "" : mobj.ProgramTimeFrom.split(':'));
                        var progTimeTo = (mobj.ProgramTimeTo == "" ? "" : mobj.ProgramTimeTo.split(':'));
                        evnt.start = (mobj.ProgramTimeFrom == "" ? mobj.StartDate : addZero(progTimeFrom[0]) + ':' + addZero(progTimeFrom[1]));
                        evnt.end = (mobj.ProgramTimeTo == "" ? mobj.EndDate : addZero(progTimeTo[0]) + ':' + addZero(progTimeTo[1]));

                        if (mobj.ProgramTimeFrom == "") {
                            evnt.allDay = true; // will make the time never show
                        }
                        else {
                            evnt.allDay = false; // will make the time show
                        }
                        //set days for event
                        if (mobj.ProgramDays != null) {
                            var allDays = mobj.ProgramDays.split(',');
                            evnt.dow = allDays;
                            evnt.dowstart = new Date(mobj.StartDate);
                            evnt.dowend = new Date(mobj.EndDate);
                            if (mobj.ProgramTimeFrom == "") {
                                evnt.start = '00:00';
                                evnt.end = '23:59';
                                evnt.allDay = true;
                            }
                        }

                        // adding fixed programs ending soon to notifications grid:
                        if (new Date(new Date().setDate(new Date().getDate() + parseFloat(UserDTO.AlertDays))).setHours(0) >= new Date(mobj.EndDate).setHours(0) && new Date().setHours(0) < new Date(mobj.EndDate).setHours(0) && mobj.ProgramMembers > 0) {
                            $("#endSubs").append(
                                '<tr><th hidden="hidden">' + '' +
                                '</th><th hidden="hidden">' + mobj.ProgramID +
                                '</th><th hidden="hidden">' + mobj.isAvailable +
                                '</th><td style="display: none;">' + mobj.ProgramName +
                                '</th><td colspan="2">' + txt_program + '<b> ' + mobj.ProgramName + ' </b>' + txt_EndOn + '<b> ' + aDate(new Date(mobj.EndDate).setDate(new Date(mobj.EndDate).getDate() - 1)) + '</b>' +
                                '</td><td class="tdNew"><button type="button" class="btn btn-info btn-md">' + btnNew + '</button>' +
                                '</td></tr>');
                        }
                    }
                    else {
                        evnt.id = mobj.ProgramID;
                        evnt.title = mobj.ProgramName;
                        evnt.description = mobj.ProgramMembers;
                        evnt.basis = mobj.ProgramBasis;
                        evnt.backgroundColor = (mobj.IsActive == false ? '#eea236' : '');
                        evnt.avail = mobj.isAvailable;
                        // set start & end event
                        var progTimeFrom = (mobj.ProgramTimeFrom == "" ? "" : mobj.ProgramTimeFrom.split(':'));
                        var progTimeTo = (mobj.ProgramTimeTo == "" ? "" : mobj.ProgramTimeTo.split(':'));
                        evnt.start = (mobj.ProgramTimeFrom == "" ? mobj.StartDate : addZero(progTimeFrom[0]) + ':' + addZero(progTimeFrom[1]));
                        evnt.end = (mobj.ProgramTimeTo == "" ? mobj.EndDate : addZero(progTimeTo[0]) + ':' + addZero(progTimeTo[1]));
                        //set days for event 
                        if (mobj.ProgramTimeFrom == "") {
                            evnt.allDay = true; // will make the time never show                        
                        }
                        else {
                            evnt.allDay = false; // will make the time show
                        }
                        if (mobj.ProgramDays != null) {
                            var progDays = mobj.ProgramDays.split(',');
                            evnt.dow = progDays;
                            if (mobj.ProgramTimeFrom == "") {
                                evnt.start = '00:00';
                                evnt.end = '23:59';
                                evnt.allDay = true;
                            }
                        }
                    }
                    calendarEvents.push(evnt);
                });
                $('#calendar').fullCalendar('addEventSource', calendarEvents);
                deferred.resolve();
            },
            error: function (xhr) {
                if (xhr.responseText == 'Session Expired') {
                    //window.location = 'Login.aspx';
                }
                else {
                    LoadSpinner.stop(firstSpinner);
                    swal({
                        title: alertSendBugTitle,
                        text: alertSendBugText,
                        type: "input",
                        showCancelButton: true,
                        confirmButtonText: alertBtnBugText,
                        cancelButtonText: alertBtnCancelText,
                        closeOnConfirm: false,
                        showLoaderOnConfirm: true,
                    }, function () {
                        setTimeout(function () {
                            swal(alertSendBugDone);
                        }, 2000);
                    });
                    console.log(xhr.responseText);
                }
            }
        });
    }
    else {
        $.ajax({
            url: apiURL + '/api/MembershipAPI/GetBookedVisits/' + UserDTO.UserID,
            type: "GET",
            dataType: "json",
            success: function (data) {
                contentType: "application/json";
                $.each(data, function (i, mobj) {
                    var evnt = new Object();
                    evnt.id = mobj.MembershipVisitID;
                    evnt.partyid = mobj.PartyID;
                    evnt.invid = mobj.InvoiceID;
                    evnt.title = "#" + mobj.SequenceNo + " " + mobj.PartyName + ": " + mobj.ProgramName;
                    //evnt.description = mobj.ProgramMembers;
                    //evnt.backgroundColor = (mobj.IsActive == false ? '#eea236' : '');
                    //evnt.avail = mobj.isAvailable;
                    evnt.start = mobj.ReservationDate;
                    evnt.num = mobj.SequenceNo;
                    //evnt.end = ;

                    calendarEvents.push(evnt);
                });
                $('#calendar').fullCalendar('addEventSource', calendarEvents);
                $('#calendar').fullCalendar('changeView', 'basicWeek');
                deferred.resolve();
            },
            error: function (xhr) {
                if (xhr.responseText == 'Session Expired') {
                    //window.location = 'Login.aspx';
                }
                else {
                    LoadSpinner.stop(firstSpinner);
                    swal({
                        title: alertSendBugTitle,
                        text: alertSendBugText,
                        type: "input",
                        showCancelButton: true,
                        confirmButtonText: alertBtnBugText,
                        cancelButtonText: alertBtnCancelText,
                        closeOnConfirm: false,
                        showLoaderOnConfirm: true,
                    }, function () {
                        setTimeout(function () {
                            swal(alertSendBugDone);
                        }, 2000);
                    });
                    console.log(xhr.responseText);
                }
            }
        });
    }
    return deferred;
}
function GetAllProgramsCalendarSearch() {
    var GetAllProgramsCalendarSearchSpinner = LoadSpinner.start();
    $.ajax({
        url: apiURL + '/api/ProgrammeAPI/GetAllProgrammes/' + UserDTO.CompanyID,
        type: "GET",
        dataType: "json",
        success: function (data) {
            var programsCal = [];
            $.each(data, function (i, mobj) {
                var prog = new Object();
                prog.value = mobj.ProgramID;
                prog.label = mobj.ProgramName;
                prog.basis = mobj.ProgramBasis;
                prog.avail = mobj.isAvailable;
                if (mobj.ProgramBasis == 'fixedProgram') {
                    prog.desc = fDate(mobj.StartDate) + ' : ' + fDate(mobj.EndDate);
                }
                else if (mobj.ProgramBasis == 'openProgram') {
                    switch (mobj.LengthUnit) {
                        case 'Day':
                            prog.desc = mobj.Length + txt_Day;
                            break;
                        case 'Month':
                            prog.desc = mobj.Length + txt_Month;
                            break;
                        case 'Year':
                            prog.desc = mobj.Length + txt_Year;
                            break;
                    }
                }
                else if (mobj.ProgramBasis == 'oneVisit' || mobj.ProgramBasis == 'multiVisits') {
                    prog.desc = mobj.No_Of_Visists + txt_Visit;
                }
                programsCal.push(prog);
            });

            $("#calSearch").autocomplete({
                source: programsCal,
                minLength: 1,
                focus: function (event, ui) {
                    $("#calSearch").val(ui.item.label);
                    return false;
                },
                select: function (event, ui) {
                    dialogEvents(ui.item.value, ui.item.basis, ui.item.avail, ui.item.label);
                    $('#calSearch').val('');
                    return false;
                }
            }).on('focus', function (event) {
                $(this).autocomplete("search", "");
            })
                .autocomplete("instance")._renderItem = function (ul, item) {
                    return $("<li style='border-bottom:1px #ccc solid;'>")
                        .append("<div>"
                        + item.label + "<br>"
                        + item.desc + "<br>"
                        + "</div>")
                        .appendTo(ul);
                };
            $("#calSearch").autocomplete("option", "appendTo", "#calendar");
            LoadSpinner.stop(GetAllProgramsCalendarSearchSpinner);
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                LoadSpinner.stop(GetAllProgramsCalendarSearchSpinner);
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                }, function () {
                    setTimeout(function () {
                        swal(alertSendBugDone);
                    }, 2000);
                });
                console.log(xhr.responseText);
            }
        }
    });
}

// add program package to ul list
$('#dialogMemType #addPackage').click(function () {
    var progPackValue = $('#packages').find(":selected").val();
    var progPackText = $('#packages').find(":selected").text();
    var progPackFees = $('#packages').find(":selected").attr('data-fees');
    var ProgPackCount = $('#packageCount').val();
    $("#dialogMemType #previewPackage").append('<li id="' + progPackValue + '" data-count="' + ProgPackCount + '" data-fees="' + progPackFees + '">' + progPackText + ' , ' + ProgPackCount + ' Visits</li>');
    $('#packages').find(":selected").remove();
});

// clear package ul list
$('#dialogMemType #clearPackage').click(function () {
    $('#dialogMemType #previewPackage').empty();
    $('#dialogMemType #packages').val($("#dialogMemType #packages option:first").val());
    $('#dialogMemType #packages option').not(':eq(0), :selected').remove();
    $.each(allProgramsObject, function (i, mobj) {
        if (mobj.isAvailable == true && mobj.IsActive == true) {
            if (mobj.ProgramBasis != 'Package') {
                $('#packages').append($('<option>').text(mobj.ProgramName).attr({
                    'value': mobj.ProgramID,
                    'data-fees': mobj.ProgramFees,
                }));
            }
        }
    });
});

//Add fisrt programme:
function addFirstProgram() {
    var addFirstProgramSpinner = LoadSpinner.start();
    var progDivision = $('#dialogMetaData #divs').val();
    var progName = $('#dialogMetaData #membershipName').val();
    var progFee = $('#dialogMetaData #progFee').val();
    var progBasis = $('#dialogMetaData select[name=types]').val();
    var Proglength = $('#dialogMetaData #nBasis').val();
    var lengthUnit = $('#dialogMetaData #sBasis').val();
    var progStartDate = sDate($('#dialogMetaData .startfixed').val());
    var progEndDate = sDate($('#dialogMetaData .endFixed').val());
    var progNote = $('#dialogMetaData #noteProg').val();
    var numberVisits;
    switch (progBasis) {
        case 'oneVisit':
            numberVisits = $('#dialogMetaData #totalVisit1').val();
            Proglength = null; lengthUnit = null; progStartDate = null; progEndDate = null;
            break;
        case "multiVisits":
            numberVisits = $('#dialogMetaData #totalVisit').val();
            Proglength = null; lengthUnit = null; progStartDate = null; progEndDate = null;
            break;
        case "openProgram":
            progStartDate = null; progEndDate = null; numberVisits = null;
            break;
        case "fixedProgram":
            Proglength = null; lengthUnit = null; numberVisits = null;
            break;
    }

    var progDays = "";
    $.each($("#dialogMetaData #progDays input[type=checkbox]:checked"), function () {
        progDays = progDays + $(this).val() + ",";
    });
    var progTimeStart = $('#dialogMetaData #startTime').val();
    var progTimeEnd = $('#dialogMetaData #endTime').val();
    var progValidDays = $('#dialogMetaData #progValidDays').val();
    var progCapacity = $('#dialogMetaData #progCapacity').val();

    var ProgramDetails = {
        DivisionID: progDivision,
        ProgramName: progName,
        ProgramFees: progFee,
        ProgramBasis: progBasis,
        Length: Proglength,
        LengthUnit: lengthUnit,
        StartDate: progStartDate,
        EndDate: progEndDate,
        No_Of_Visists: numberVisits,
        MaxNo_Of_Members: null,
        Description: (progNote == '' ? null : progNote),
        IsActive: true,
        IsDeleted: false,
        ClonedFrom: (isClonedProgram == true ? programClonedUID : null),
        CreationDate: null,
        CreationBy: UserDTO.UserID,
        EditDate: null,
        EditedBy: UserDTO.UserID,
        ProgramConfigurations: [
            {
                ProgramID: "00000000-0000-0000-0000-000000000000",
                BrunchID: UserDTO.BranchID,
                ProgramDays: (progDays.replace(/,\s*$/, "") == '' ? null : progDays.replace(/,\s*$/, "")),
                ProgramTimeFrom: progTimeStart,
                ProgramTimeTo: progTimeEnd,
                ProgramCapacity: progCapacity,
                ValidationDuration: progValidDays
            }
        ]
    };
    var t = JSON.stringify(ProgramDetails);
    $.ajax({
        url: apiURL + '/api/ProgrammeAPI/PostProgram/',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: t,
        success: function () {
            GetAllProgrammes();
            var defGetCalendarEvents = GetCalendarEvents();
            defGetCalendarEvents.then(GetAllInvoices());
            LoadSpinner.stop(addFirstProgramSpinner);
            swal({
                title: alertSuccessTitle,
                text: alertSuccessText,
                type: "success",
                timer: 2000,
                showConfirmButton: false
            });
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                LoadSpinner.stop(addFirstProgramSpinner);
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                }, function () {
                    setTimeout(function () {
                        swal(alertSendBugDone);
                    }, 2000);
                });
                console.log(xhr.responseText);
            }
        }
    });
}

//Add new programme:
function addNewProgram() {
    var addNewProgramSpinner = LoadSpinner.start();
    var progName = $('#dialogMemType #membershipName').val();
    var progDivision = $('#dialogMemType #divs').val();
    var progFee = $('#dialogMemType #progFee').val();
    var progBasis = $('#dialogMemType select[name=types]').val();
    var Proglength = $('#dialogMemType #nBasis').val();
    var lengthUnit = $('#dialogMemType #sBasis').val();
    var progStartDate = sDate($('#dialogMemType #startfixed').val());
    var progEndDate = sDate($('#dialogMemType #endFixed').val());
    var progNote = $('#dialogMemType #noteProg').val();
    var numberVisits;
    var progPackages = [];
    switch (progBasis) {
        case 'oneVisit':
            numberVisits = $('#dialogMemType #totalVisit1').val();
            Proglength = null; lengthUnit = null; progStartDate = null; progEndDate = null;
            break;
        case "multiVisits":
            numberVisits = $('#dialogMemType #totalVisit').val();
            Proglength = null; lengthUnit = null; progStartDate = null; progEndDate = null;
            break;
        case "openProgram":
            progStartDate = null; progEndDate = null; numberVisits = null;
            break;
        case "fixedProgram":
            Proglength = null; lengthUnit = null; numberVisits = null;
            break;
        case "Package":
            Proglength = null; lengthUnit = null; progStartDate = null; progEndDate = null; numberVisits;
            $("#dialogMemType #previewPackage li").each(function () {
                var progPack = new Object();
                progPack.PackageID = "00000000-0000-0000-0000-000000000000";
                progPack.ParentProgramId = "00000000-0000-0000-0000-000000000000";
                progPack.ChildProgramId = $(this).attr('id');
                progPack.ChildProgramFees = $(this).attr('data-fees');
                progPack.ChildVisitsCount = $(this).attr('data-count');

                progPackages.push(progPack);
            });
            break;
    }

    var progDays = "";
    $.each($("#dialogMemType #progDays input[type=checkbox]:checked"), function () {
        progDays = progDays + $(this).val() + ",";
    });
    var progTimeStart = $('#dialogMemType #startTime').val();
    var progTimeEnd = $('#dialogMemType #endTime').val();
    var progValidDays = $('#dialogMemType #progValidDays').val();
    var progCapacity = $('#dialogMemType #progCapacity').val();

    var ProgramDetails = {
        DivisionID: progDivision,
        ProgramName: progName,
        ProgramFees: progFee,
        ProgramBasis: progBasis,
        Length: Proglength,
        LengthUnit: lengthUnit,
        StartDate: progStartDate,
        EndDate: progEndDate,
        No_Of_Visists: numberVisits,
        MaxNo_Of_Members: null,
        Description: (progNote == '' ? null : progNote),
        IsActive: true,
        IsDeleted: false,
        ClonedFrom: (isClonedProgram == true ? programClonedUID : null),
        CreationDate: null,
        CreationBy: UserDTO.UserID,
        EditDate: null,
        EditedBy: UserDTO.UserID,
        ProgramConfigurations: [
            {
                ProgramID: "00000000-0000-0000-0000-000000000000",
                BrunchID: UserDTO.BranchID,
                ProgramDays: (progDays.replace(/,\s*$/, "") == '' ? null : progDays.replace(/,\s*$/, "")),
                ProgramTimeFrom: progTimeStart,
                ProgramTimeTo: progTimeEnd,
                ProgramCapacity: progCapacity,
                ValidationDuration: progValidDays
            }
        ],
        ProgramPackages: progPackages
    };
    var t = JSON.stringify(ProgramDetails);
    $.ajax({
        url: apiURL + '/api/ProgrammeAPI/PostProgram/',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: t,
        success: function () {
            isCloned = false;
            GetAllProgrammes();
            var defGetCalendarEvents = GetCalendarEvents();
            defGetCalendarEvents.then(GetAllInvoices());
            LoadSpinner.stop(addNewProgramSpinner);
            swal({
                title: alertSuccessTitle,
                text: alertSuccessText,
                type: "success",
                timer: 2000,
                showConfirmButton: false
            });
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                LoadSpinner.stop(addNewProgramSpinner);
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                }, function () {
                    setTimeout(function () {
                        swal(alertSendBugDone);
                    }, 2000);
                });
                console.log(xhr.responseText);
            }
        }
    });
}

// Update programme:
var programUID;
$(document).on('click', '#membershipGrid tbody tr td a[class~=btn-success]', function () {
    var fillOldProgramSpinner = LoadSpinner.start();
    programUID = $(this).closest('tr').find('th[hidden=hidden]').text();
    $.each(allProgramsObject, function (i, mobj) {
        if (mobj.ProgramID == programUID) {
            $('#membershipName').val(mobj.ProgramName);
            $('#divs').val(mobj.DivisionID);
            $('#progFee').val(mobj.ProgramFees);
            $('#basis').val(mobj.ProgramBasis).trigger('change');
            switch (mobj.ProgramBasis) {
                case "openProgram":
                    $('#nBasis').val(mobj.Length);
                    $('#sBasis').val(mobj.LengthUnit);
                    break;
                case "fixedProgram":
                    $('#startfixed').val(fDate(mobj.StartDate));
                    $('#endFixed').val(fDate(mobj.EndDate));
                    break;
                case "multiVisits":
                    $('#totalVisit').val(mobj.No_Of_Visists);
                    break;
                case "Package":
                    $.each(mobj.ProgramPackages, function (i, itemPack) {
                        var progPackName;
                        $.each(allProgramsObject, function (i, mobj) {
                            if (mobj.ProgramID == itemPack.ChildProgramId)
                            { progPackName = mobj.ProgramName }
                        })
                        $("#previewPackage").append('<li id="' + itemPack.ChildProgramId + '" data-count="' + itemPack.ChildVisitsCount + '" data-fees="' + itemPack.ChildProgramFees + '">' + progPackName + ' , ' + itemPack.ChildVisitsCount + ' Visits</li>');
                        $('#packages option[value="' + itemPack.ChildProgramId + '"]').remove();
                    });
                    break;
            }
            $('#noteProg').val(mobj.Description);
            if (mobj.ProgramDays != null) {
                var allDays = mobj.ProgramDays.split(',');
                for (var i in allDays) {
                    var dayValue = allDays[i]
                    $('#progDays input[value="' + dayValue + '"]').prop('checked', true);
                }
            }
            if (mobj.ProgramTimeFrom != "") {
                var progTimeFrom = mobj.ProgramTimeFrom.split(':');
                $('#startTime').val(addZero(progTimeFrom[0]) + ':' + addZero(progTimeFrom[1]));
            }
            if (mobj.ProgramTimeTo != "") {
                var progTimeTo = mobj.ProgramTimeTo.split(':');
                $('#endTime').val(addZero(progTimeTo[0]) + ':' + addZero(progTimeTo[1]));
            }
            $('#progValidDays').val(mobj.ValidationDuration);
            $('#progCapacity').val(mobj.ProgramCapacity);
        }
    });
    $('#tabsMem ul:first li:eq(0) a').text(tabEditProgram);
    $("#tabsMem").tabs("option", "active", 0);
    checkNewProgram = false;
    LoadSpinner.stop(fillOldProgramSpinner);
});
function updateProgram() {
    var updateProgramSpinner = LoadSpinner.start();
    var progName = $('#membershipName').val();
    var progDivision = $('#divs').val();
    var progFee = $('#progFee').val();
    var progBasis = $('select[name=types]').val();
    var Proglength = $('#nBasis').val();
    var lengthUnit = $('#sBasis').val();
    var progStartDate = sDate($('#startfixed').val());
    var progEndDate = sDate($('#endFixed').val());
    var progDesc = $('#noteProg').val();
    var numberVisits;
    var progPackages = [];
    switch (progBasis) {
        case 'oneVisit':
            numberVisits = $('#totalVisit1').val();
            Proglength = null; lengthUnit = null; progStartDate = null; progEndDate = null;
            break;
        case "multiVisits":
            numberVisits = $('#totalVisit').val();
            Proglength = null; lengthUnit = null; progStartDate = null; progEndDate = null;
            break;
        case "openProgram":
            progStartDate = null; progEndDate = null; numberVisits = null;
            break;
        case "fixedProgram":
            Proglength = null; lengthUnit = null; numberVisits = null;
            break;
        case "Package":
            Proglength = null; lengthUnit = null; progStartDate = null; progEndDate = null; numberVisits;
            $("#dialogMemType #previewPackage li").each(function () {
                var progPack = new Object();
                progPack.PackageID = "00000000-0000-0000-0000-000000000000";
                progPack.ParentProgramId = programUID;
                progPack.ChildProgramId = $(this).attr('id');
                progPack.ChildProgramFees = $(this).attr('data-fees');
                progPack.ChildVisitsCount = $(this).attr('data-count');

                progPackages.push(progPack);
            });
            break;
    }
    var progDays = "";
    $.each($("#progDays input[type=checkbox]:checked"), function () {
        progDays = progDays + $(this).val() + ",";
    });
    var progTimeStart = $('#startTime').val();
    var progTimeEnd = $('#endTime').val();
    var progValidDays = $('#progValidDays').val();
    var progCapacity = $('#progCapacity').val();

    var ProgramDetails = {
        ProgramID: programUID,
        BrunchID: UserDTO.BranchID,
        DivisionID: progDivision,
        ProgramName: progName,
        ProgramFees: progFee,
        ProgramBasis: progBasis,
        Length: Proglength,
        LengthUnit: lengthUnit,
        StartDate: progStartDate,
        EndDate: progEndDate,
        No_Of_Visists: numberVisits,
        Description: (progDesc == '' ? null : progDesc),
        IsActive: true,
        ProgramMembers: null,
        isAvailable: true,
        ClonedFrom: null,
        ProgramDays: (progDays.replace(/,\s*$/, "") == '' ? null : progDays.replace(/,\s*$/, "")),
        ProgramTimeFrom: progTimeStart,
        ProgramTimeTo: progTimeEnd,
        ProgramCapacity: progCapacity,
        ValidationDuration: progValidDays,
        GrossIncome: 0,
        PaidIncome: 0,
        ProgramPackages: progPackages,
        EditedBy: UserDTO.UserID
    };
    var t = JSON.stringify(ProgramDetails);
    $.ajax({
        url: apiURL + '/api/ProgrammeAPI/UpdateProgram/',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: t,
        //dataType: "json",
        success: function () {
            $('#tabsMem ul:first li:eq(0) a').text(tabAddProgram);
            GetAllProgrammes();
            GetAllMembers();
            var defGetCalendarEvents = GetCalendarEvents();
            defGetCalendarEvents.then(GetAllInvoices());
            GetAllCheckins();
            LoadSpinner.stop(updateProgramSpinner);
            swal({
                title: alertSuccessTitle,
                text: alertSuccessText,
                type: "success",
                timer: 2000,
                showConfirmButton: false
            });
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                LoadSpinner.stop(updateProgramSpinner);
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                }, function () {
                    setTimeout(function () {
                        swal(alertSendBugDone);
                    }, 2000);
                });
                console.log(xhr.responseText);
            }
        }
    });
}

// Stop/Rerun programme:
$(document).on('click', '#membershipGrid tbody tr td a.btn-warning', function () {
    var programStatusSpinner = LoadSpinner.start();
    var progID = $(this).closest('tr').find('th[hidden=hidden]').text();
    var progObj = allProgramsObject.filter(function (prog) {
        return prog.ProgramID == progID;
    })
    var isActive = true;
    if (progObj[0].IsActive == true) {
        isActive = false;
    }
    $.ajax({
        type: "GET",
        url: apiURL + '/api/ProgrammeAPI/ChangeProgramStatus?progID=' + progID + '&userUID=' + UserDTO.UserID + '&isActive=' + isActive,
        success: function () {
            if ($("#divs2").prop('selectedIndex') == 0) {
                GetAllProgrammes();
            }
            else {
                $("#divs2").change();
            }
            var defGetCalendarEvents = GetCalendarEvents();
            defGetCalendarEvents.then(GetAllInvoices());
            LoadSpinner.stop(programStatusSpinner);
            swal({
                title: alertSuccessTitle,
                text: alertSuccessText,
                type: "success",
                timer: 2000,
                showConfirmButton: false
            });
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                LoadSpinner.stop(programStatusSpinner);
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                }, function () {
                    setTimeout(function () {
                        swal(alertSendBugDone);
                    }, 2000);
                });
                console.log(xhr.responseText);
            }
        }
    });
});

// Delete programme:
$(document).on('click', '#membershipGrid tbody tr td a.btn-danger', function () {
    progID = $(this).closest('tr').find('th[hidden=hidden]').text();
    swal({
        title: alertDeleteTitle,
        text: alertDeleteText,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: alertBtnDeleteText,
        cancelButtonText: alertBtnCancelText,
        closeOnConfirm: false
    },
        function (isConfirm) {
            if (isConfirm) {
                var deleteProgramSpinner = LoadSpinner.start();
                $.ajax({
                    type: "GET",
                    url: apiURL + '/api/ProgrammeAPI/DeleteProgram?progID=' + progID + '&userUID=' + UserDTO.UserID,
                    success: function () {
                        GetAllProgrammes();
                        var defGetCalendarEvents = GetCalendarEvents();
                        defGetCalendarEvents.then(GetAllInvoices());
                        LoadSpinner.stop(deleteProgramSpinner);
                        swal({
                            title: alertDeletedTitle,
                            text: alertDeletedText,
                            type: "success",
                            timer: 2000,
                            showConfirmButton: false
                        });
                    },
                    error: function (xhr) {
                        if (xhr.responseText == 'Session Expired') {
                            //window.location = 'Login.aspx';
                        }
                        else {
                            LoadSpinner.stop(deleteProgramSpinner);
                            swal({
                                title: alertSendBugTitle,
                                text: alertSendBugText,
                                type: "input",
                                showCancelButton: true,
                                confirmButtonText: alertBtnBugText,
                                cancelButtonText: alertBtnCancelText,
                                closeOnConfirm: false,
                                showLoaderOnConfirm: true,
                            }, function () {
                                setTimeout(function () {
                                    swal(alertSendBugDone);
                                }, 2000);
                            });
                            console.log(xhr.responseText);
                        }
                    }
                });
            } else {
                return;
            }
        });
});

// Clone Programme:
var programClonedUID, isClonedProgram = false;
$(document).on('click', '#membershipGrid tbody tr td a[class~=btn-default]', function () {
    var cloneProgramSpinner = LoadSpinner.start();
    var clonedFrom = $(this).data("clonedfrom");
    programClonedUID = (clonedFrom == null ? $(this).closest('tr').find('th[hidden=hidden]').text() : clonedFrom);
    $.each(allProgramsObject, function (i, mobj) {
        if (mobj.ProgramID == programClonedUID) {
            $('#membershipName').val(txt_CopyOf + mobj.ProgramName);
            $('#divs').val(mobj.DivisionID);
            $('#progFee').val(mobj.ProgramFees);
            $('#basis').val(mobj.ProgramBasis).trigger('change');
            switch (mobj.ProgramBasis) {
                case "openProgram":
                    $('#nBasis').val(mobj.Length);
                    $('#sBasis').val(mobj.LengthUnit);
                    break;
                case "fixedProgram":
                    $('#startfixed').val(fDate(mobj.StartDate));
                    $('#endFixed').val(fDate(mobj.EndDate));
                    break;
                case "multiVisits":
                    $('#totalVisit').val(mobj.No_Of_Visists);
                    break;
            }
            $('#noteProg').val(mobj.Description);
            if (mobj.ProgramDays != null) {
                var allDays = mobj.ProgramDays.split(',');
                for (var i in allDays) {
                    var dayValue = allDays[i]
                    console.log(dayValue);
                    $('#progDays input[value="' + dayValue + '"]').prop('checked', true);
                }
            }
            if (mobj.ProgramTimeFrom != "") {
                var progTimeFrom = mobj.ProgramTimeFrom.split(':');
                $('#startTime').val(addZero(progTimeFrom[0]) + ':' + addZero(progTimeFrom[1]));
            }
            if (mobj.ProgramTimeTo != "") {
                var progTimeTo = mobj.ProgramTimeTo.split(':');
                $('#endTime').val(addZero(progTimeTo[0]) + ':' + addZero(progTimeTo[1]));
            }
            $('#progValidDays').val(mobj.ValidationDuration);
            $('#progCapacity').val(mobj.ProgramCapacity);
        }
    });
    $('#tabsMem ul:first li:eq(0) a').text(tabEditProgram);
    $("#tabsMem").tabs("option", "active", 0);
    isClonedProgram = true;
    LoadSpinner.stop(cloneProgramSpinner);
});

// Get count subscriptions of programs for Chart report:
function drawChartProgramsSubs() {
    $.ajax({
        url: apiURL + '/api/ProgrammeAPI/GetProgrammesChart/' + UserDTO.CompanyID,
        type: "GET",
        dataType: "json",
        success: function (data) {
            contentType: "application/json";

            var dataChart = new google.visualization.DataTable();
            dataChart.addColumn('string', 'Programs');
            dataChart.addColumn('number', titleSubscriptionsChart);
            dataChart.addColumn({ type: 'string', role: 'style' });
            dataChart.addColumn('number', titleSubspendedChart);
            $.each(data, function (i, mobj) {
                if (mobj.SubsCount > 0) {
                    dataChart.addRow([mobj.ProgramName, mobj.SubsCount, (mobj.IsActive == false ? '#EEA236' : ''), 0]);
                }
            });

            // Set chart options
            var options = {
                'title': titleChartPrograms,
                titleTextStyle: { fontSize: 18 },
                vAxis: {
                    gridlines: { count: -1 },
                    title: titleVerticalChartPrograms,
                    titleTextStyle: { fontSize: 16 }
                },
                hAxis: {
                    slantedText: true
                },
                colors: ['blue', '#EEA236']
                //,legend: { position: 'none' }
            };

            // Instantiate and draw our chart, passing in some options.
            var chart_div = document.getElementById('chartPrograms');
            var chart = new google.visualization.ColumnChart(chart_div);

            chart.draw(dataChart, options);

            // save image by download btn:
            var btnDownload = document.getElementById('saveChartProgs');
            btnDownload.href = chart.getImageURI();
            btnDownload.download = fileNameSubscriptionsChart + '.png';
            LoadSpinner.stop(drawChartProgramsSpinner);
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                LoadSpinner.stop(drawChartProgramsSpinner);
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                }, function () {
                    setTimeout(function () {
                        swal(alertSendBugDone);
                    }, 2000);
                });
                console.log(xhr.responseText);
            }
        }
    });
}

// Get income of subscriptions for Chart report:
function drawChartProgramsPays() {

    var dataChart = new google.visualization.DataTable();
    dataChart.addColumn('string', 'Programs');
    dataChart.addColumn('number', titleSubscriptionsChart);
    dataChart.addColumn('number', titleSubscriptionsChartPay);
    $.each(allProgramsObject, function (i, mobj) {
        if (mobj.GrossIncome > 0) {
            dataChart.addRow([mobj.ProgramName, mobj.GrossIncome, mobj.PaidIncome]);
        }
    });

    // Set chart options
    var options = {
        'title': titleChartPrograms,
        titleTextStyle: { fontSize: 18 },
        vAxis: {
            gridlines: { count: -1 },
            title: titleVerticalChartPrograms,
            titleTextStyle: { fontSize: 16 }
        },
        hAxis: {
            slantedText: true
        }
        //,legend: { position: 'none' }
    };

    // Instantiate and draw our chart, passing in some options.
    var chart_div = document.getElementById('chartPrograms');
    var chart = new google.visualization.ColumnChart(chart_div);

    chart.draw(dataChart, options);

    // save image by download btn:
    var btnDownload = document.getElementById('saveChartProgs');
    btnDownload.href = chart.getImageURI();
    btnDownload.download = fileNameSubscriptionsChart + '.png';
    LoadSpinner.stop(drawChartProgramsSpinner);
}


/* ------------------Members Actions------------------*/
//Get All Members in auto complete Search:
var members = [];
var allMembersObject;
function GetAllMembers() {
    var deferred = new $.Deferred();

    members.length = 0;
    var memberWithoutMemship = 0;
    $.ajax({
        url: apiURL + '/api/MemberAPI/GetAllMembers/' + UserDTO.BranchID,
        type: "GET",
        dataType: "json",
        success: function (data) {
            contentType: "application/json";
            allMembersObject = data;

            $.each(data, function (i, mobj) {
                var mem = new Object();
                mem.value = mobj.PartyID;
                mem.label = mobj.PartyFirstName + ' ' + mobj.PartyLastName + ' ' + mobj.Telephone + ' ' + mobj.PartyCode;
                mem.icon = '<span class="glyphicon glyphicon-user"></span>&nbsp;#' + mobj.PartyCode + ' ' + mobj.PartyFirstName + ' ' + mobj.PartyLastName + '&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-earphone"></span>&nbsp;' + mobj.Telephone;
                mem.name = mobj.PartyFirstName + ' ' + mobj.PartyLastName;
                mem.phone = mobj.Telephone;
                mem.desc = mobj.ProgramName;
                mem.memship = mobj.MembershipID;
                members.push(mem);

                if (mobj.ProgramName == null) {
                    memberWithoutMemship++;
                }
            });
            $("#currentMembers").text(members.length);
            $("#memWithMemship").text(members.length - memberWithoutMemship);
            $("#memWithoutMemship").text(memberWithoutMemship);

            deferred.resolve();
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                LoadSpinner.stop(firstSpinner);
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                }, function () {
                    setTimeout(function () {
                        swal(alertSendBugDone);
                    }, 2000);
                });
                console.log(xhr.responseText);
            }
        }
    });
    return deferred;
}
$(function () {
    $("#s").autocomplete({
        source: members,
        minLength: 1,
        focus: function (event, ui) {
            $("#s").val(ui.item.name);
            return false;
        },
        select: function (event, ui) {
            dialogMember(ui.item.value);
            $('#s').val('');
            return false;
        }
    }).on('focus', function (event) {
        $(this).autocomplete("search", "");
    })
        .autocomplete("instance")._renderItem = function (ul, item) {
            return $("<li style='border-bottom:1px #ccc solid;'>")
                .append("<div>"
                + item.icon + "<br>"
                + ((item.desc == null) ? noMemberships : item.desc) + "<br>"
                + "</div>")
                .appendTo(ul);
        };
});
function GetMembersForReport() {
    var GetMembersForReportSpinner = LoadSpinner.start();
    $('#tblReportmem tbody tr').remove();
    $.each(allMembersObject, function (i, mobj) {
        $("#tblReportmem").append(
            '<tr><th hidden="hidden">' + mobj.PartyID +
            '</th><th hidden="hidden">' + mobj.MembershipID +
            '</th><td>' + mobj.PartyFirstName + ' ' + mobj.PartyLastName +
            '</td><td>' + ((mobj.ProgramName == null) ? noMemberships : mobj.ProgramName) +
            '</td><td>' + mobj.Telephone +
            '</td><td>' + fDate(mobj.JoiningDate) +
            //'</td><td><a href="#" class="btnDelete btn btn-primary btn-danger"><span class="glyphicon glyphicon-trash"></span></a>'+
            '</td></tr>');
    });
    LoadSpinner.stop(GetMembersForReportSpinner);
}

//get members in reports:
$("#sss").keyup(function () {
    var memsss = $(this).val();
    findMember(memsss);
})
function findMember(nameKey) {
    var findMemberSpinner = LoadSpinner.start();
    $('#tblReportmem tbody tr').remove();
    for (var i = 0; i < members.length; i++) {
        if (members[i].name.toLowerCase().includes(nameKey.toLowerCase())) {
            $("#tblReportmem").append(
                '<tr><th hidden="hidden">' + members[i].value +
                '</th><th hidden="hidden">' + members[i].memship +
                '</th><td>' + members[i].name +
                '</td><td>' + ((members[i].desc == null) ? noMemberships : members[i].desc) +
                '</td><td>' + members[i].phone +
                '</td><td>' + "" +
                '</td><td>' +
                '<a href="#" class="btnDelete btn btn-primary btn-danger"><span class="glyphicon glyphicon-trash"></span></a></td></tr>');
        }
    }
    if ($('#tblReportmem tbody tr').length == 0) {
        $("#tblReportmem").append(noFindMember);
    }
    $('#dialogReportMembers table').width(memReportWidth);
    LoadSpinner.stop(findMemberSpinner);
};

//Get Member details for dialog:
function GetMemberByID(id, getMemshipCount) {
    var membershipsCount;
    $.ajax({
        url: apiURL + '/api/MemberAPI/GetMemberByID/' + id,
        type: 'GET',
        dataType: "json",
        success: function (data) {
            var MemberDetails = data;

            var PartyFirstName = MemberDetails.PartyFirstName;
            var PartyLastName = MemberDetails.PartyLastName;
            var Email = MemberDetails.Email;
            var Telephone = MemberDetails.Telephone;
            var Address = MemberDetails.Address;
            var birthday = MemberDetails.Birthday;
            var Gender = MemberDetails.GenderID;
            var Picture = MemberDetails.Picture;
            getMemshipCount(MemberDetails.MembershipsCount);
            $('#accMemUserID').val(MemberDetails.AccountUserID);
            switch (MemberDetails.IsBlocked) {
                case null:
                    $('#btnAccount').text(createMemberAcc);
                    $('#accEmailMem, #accPassMem, #accPassConfMem, #saveAccMem').removeAttr('disabled');
                    $('#blockAccMem').hide();
                    break;
                case false:
                    $('#btnAccount').text(editMemberAcc);
                    $('#accEmailMem, #accPassMem, #accPassConfMem, #saveAccMem').removeAttr('disabled');
                    $('#blockAccMem').text(btnBlock_Block).show();
                    break;
                case true:
                    $('#btnAccount').text(editMemberAcc);
                    $('#accEmailMem, #accPassMem, #accPassConfMem, #saveAccMem').prop('disabled', true);
                    $('#blockAccMem').text(btnBlock_Activate).show();
            }
            $('#memberTotalDues').html((MemberDetails.TotalDue == null ? '' : TotalDueTitle + '$ <span id="memDue">' + MemberDetails.TotalDue + '</span>'));

            $('#firstName').val(PartyFirstName);
            $('#name').val(PartyLastName);
            $('#email').val(Email);
            $('#invToEmail').text(Email);
            $('#phone').val(Telephone);
            $('#invToPhone').text(Telephone);
            $('#adress').val(Address);
            $('#birthDate').val(fDate(birthday));
            if (Gender == 1) {
                $('#btnMale').addClass('active');
            }
            else if (Gender == 2) {
                $('#btnFemale').addClass('active');
            }
            if (Picture == null) {
                $("#image-preview").css({ "background-image": "url(../Images/uploadPhoto.png)" });
            }
            else {
                $("#image-preview").css("background-image", "url(" + Picture + ")");
            }
            $('#memberName, #invToName').text(PartyFirstName + ' ' + PartyLastName);
            $('#dialog-form').dialog('option', 'title', 'Member Code # ' + MemberDetails.PartyCode);
            if (MemberDetails.JoiningDate != null) {
                $('#memberJoining').text(titleJoiningDate + aDate(MemberDetails.JoiningDate));
            }
            else { $('#memberJoining').text(''); }
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                }, function () {
                    setTimeout(function () {
                        swal(alertSendBugDone);
                    }, 2000);
                });
                console.log(xhr.responseText);
            }
        }
    });
    //return membershipsCount;
}

//Add & update Member
function saveMember(id) {
    var saveMemberSpinner = LoadSpinner.start();
    var partyFirstName = $('#firstName').val();
    var partyLastName = $('#name').val();
    var partyEmail = $('#email').val();
    var partyPhone = $('#phone').val();
    var partyBirthday = sDate($('#birthDate').val());
    var partyAdress = $('#adress').val();
    var Gender = null;
    if ($('#btnMale').hasClass('active')) {
        Gender = 1;
    }
    else if ($('#btnFemale').hasClass('active')) {
        Gender = 2;
    }
    var imgURL = $("#image-preview").css("background-image");
    var clearBinaryImg;
    if (imgURL.indexOf('uploadPhoto') != -1 || imgURL.indexOf('Images_Company') != -1) {
        clearBinaryImg = null
    }
    else {
        var startBinaryImg = imgURL.lastIndexOf('base64,') + 7;
        clearBinaryImg = imgURL.slice(startBinaryImg, -2);
        //clearBinaryImg = imgURL.replace('url(', '').replace(')', '').replace(/\"/gi, "");
    }

    // add new member: 
    if (id == null) {
        var memberDetails = {
            PartyFirstName: partyFirstName,
            PartyLastName: partyLastName,
            CompanyBranchId: UserDTO.BranchID,
            Email: partyEmail,
            Telephone: partyPhone,
            Address: partyAdress,
            GenderID: Gender,
            Birthday: partyBirthday,
            Picture: clearBinaryImg,
            MembershipsCount: 0,
            TotalDue: 0,
            AccountUserID: null,
            IsBlocked: null,
            JoiningDate: null,
            EditedBy: UserDTO.UserID
        };
        var t = JSON.stringify(memberDetails);
        $.ajax({
            url: apiURL + '/api/MemberAPI/PostMember/',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: t,
            dataType: 'json',
            success: function (data) {
                GetAllMembers();
                memID = data;
                $('#memberName').text(partyFirstName + ' ' + partyLastName);
                $('#btnInvoice').prop('disabled', false);
                LoadSpinner.stop(saveMemberSpinner);
            },
            error: function (xhr) {
                if (xhr.responseText == 'Session Expired') {
                    //window.location = 'Login.aspx';
                }
                else {
                    LoadSpinner.stop(saveMemberSpinner);
                    swal({
                        title: alertSendBugTitle,
                        text: alertSendBugText,
                        type: "input",
                        showCancelButton: true,
                        confirmButtonText: alertBtnBugText,
                        cancelButtonText: alertBtnCancelText,
                        closeOnConfirm: false,
                        showLoaderOnConfirm: true,
                    }, function () {
                        setTimeout(function () {
                            swal(alertSendBugDone);
                        }, 2000);
                    });
                    console.log(xhr.responseText);
                }
            }
        });
    }

    //update existing member:
    else {
        var memberDetails = {
            PartyID: id,
            PartyFirstName: partyFirstName,
            PartyLastName: partyLastName,
            CompanyBranchId: UserDTO.BranchID,
            Email: partyEmail,
            Telephone: partyPhone,
            Address: partyAdress,
            GenderID: Gender,
            Birthday: partyBirthday,
            Picture: clearBinaryImg,
            MembershipsCount: 0,
            TotalDue: 0,
            AccountUserID: null,
            IsBlocked: null,
            JoiningDate: null,
            EditedBy: UserDTO.UserID
        };
        var t = JSON.stringify(memberDetails);
        $.ajax({
            url: apiURL + '/api/MemberAPI/UpdateMember/',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: t,
            success: function () {
                GetAllMembers();
                $('#memberName').text(partyFirstName + ' ' + partyLastName);
                LoadSpinner.stop(saveMemberSpinner);
            },
            error: function (xhr) {
                if (xhr.responseText == 'Session Expired') {
                    //window.location = 'Login.aspx';
                }
                else {
                    LoadSpinner.stop(saveMemberSpinner);
                    swal({
                        title: alertSendBugTitle,
                        text: alertSendBugText,
                        type: "input",
                        showCancelButton: true,
                        confirmButtonText: alertBtnBugText,
                        cancelButtonText: alertBtnCancelText,
                        closeOnConfirm: false,
                        showLoaderOnConfirm: true,
                    }, function () {
                        setTimeout(function () {
                            swal(alertSendBugDone);
                        }, 2000);
                    });
                    console.log(xhr.responseText);
                }
            }
        });
    }
    $("#tabsMember").tabs("enable", 1).tabs("option", "active", 1);
    swal({ title: titleMemSave, type: "success", text: textMemSave, timer: 2000, showConfirmButton: false });
}

//Get members list by program for calendar small dialog:
function GetMembersByProgram(id, programBasis, isAvailable) {
    var deferred = new $.Deferred();
    if (programBasis == 'fixedProgram' || programBasis == 'openProgram') {
        $('#eventMembers thead th:nth-of-type(4)').text(thPeriod);
    }
    else if (programBasis == 'oneVisit' || programBasis == 'multiVisits') {
        $('#eventMembers thead th:nth-of-type(4)').text(thBooked);
    }
    $("#eventMembers thead th:eq(0)").text('PartyID');
    $("#eventMembers thead th:eq(1)").text('MembershipID');
    $('#eventMembers tbody').remove();
    $.ajax({
        url: apiURL + '/api/MemberAPI/GetAllMembersByProgID/' + id,
        type: "GET",
        dataType: "json",
        success: function (data) {
            contentType: "application/json";
            $("#eventMembers thead th:eq(0)").text(id);
            $("#eventMembers thead th:eq(1)").text(programBasis);
            $.each(data, function (i, mobj) {
                $("#eventMembers").append(
                    '<tr>' +
                    '<th hidden="hidden" scope="row">' + mobj.PartyID +
                    '</th><th hidden="hidden" scope="row">' + mobj.MembershipID +
                    '</th><td><a href="#" class="btn-link">' + mobj.PartyName + '</a>' + '<br/>' + mobj.Telephone +
                    '</td><td>' + (programBasis == 'fixedProgram' || programBasis == 'openProgram' ? fDate(mobj.StartDate) + ' &#x2236; ' + fDate(mobj.EndDate) : mobj.BookedVisits) +
                    '</td><td>' + mobj.UsedVisits +
                    '</td><td>' + '<a href="#" class="btn btn-default"><span class="glyphicon glyphicon-plus"></span> </a>' +
                    '</td><td>' + (mobj.IsRunning == true ? '<button class="btn btn-info"><span class="glyphicon glyphicon-check"></span></button>' : '') +
                    '</td></tr>');
            });
            if (isAvailable == false || $("#eventMembers tbody tr td:empty").length == $("#eventMembers tbody tr").length) {
                $("#eventMembers thead tr th:last-child").hide();
                $("#eventMembers tbody tr td:last-child").hide();
            }
            else {
                $("#eventMembers thead tr th:last-child").show();
                $("#eventMembers tbody tr td:last-child").show();
            }
            reloadDataTableMemCalendar();
            $('#calMembers').text(txt_ActiveSubs + $('#eventMembers tbody .btn-info').length);
            deferred.resolve();
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                }, function () {
                    setTimeout(function () {
                        swal(alertSendBugDone);
                    }, 2000);
                });
                console.log(xhr.responseText);
            }
        }
    });
    return deferred;
};


/* ------------------Memberships Actions------------------*/
//Get all memberships by memberID:
var allMembershipsObject, lastMemberShipID;
function GetMembershipsByMemberID(id, clickRenew) {
    var deferred = new $.Deferred();
    $.ajax({
        url: apiURL + '/api/MembershipAPI/GetAllMembershipsByMember/' + id,
        type: "GET",
        dataType: "json",
        success: function (data) {
            allMembershipsObject = data;
            contentType: "application/json";
            $('#memberDesc').text(lastSubsTitle + allMembershipsObject[0].ProgramName);
            lastMemberShipID = allMembershipsObject[0].MembershipID;
            $('#memHistory tbody').remove();
            $.each(allMembershipsObject, function (i, mobj) {
                $("#memHistory").append(
                    '<tr ' + (mobj.IsActive == true ? '' : '  class="warning" ') + ' >' +
                    '<th hidden="hidden" scope="row">' + mobj.MembershipID +
                    '</th><th hidden="hidden" scope="row">' + mobj.ProgramID +
                    '</th><th hidden="hidden" scope="row">' + mobj.InvoiceID +
                    '</th><td>' + mobj.ProgramName +
                    '</td><td>' + fDate(mobj.StartDate) +
                    '</td><td>' + fDate(mobj.EndDate) +
                    '</td><td class="text-center">' + (mobj.BookedVisits == null ? '' : mobj.BookedVisits) +
                    '</td><td class="text-center">' + mobj.UsedVisits +
                    '</td><td class="text-center">' + (mobj.IsActive == true && (mobj.BookedVisits > 0 || mobj.UsedVisits > 0) ? '<button class="btn btn-default"><span class="glyphicon glyphicon-th-list"></span></button>' : '') +
                    '</td><td class="text-center">' + (mobj.IsRunning == true && mobj.IsActive == true ? '<button class="btn btn-info"><span class="glyphicon glyphicon-check"></span></button>' : '') +
                    '</td><td class="tdRenew">' + (mobj.IsRenewal == true ? '<button type="button" class="tabledit-renew-button btn btn-primary btn-sm"></button>' : '') +
                    '</td><td>' +
                    (mobj.IsRunning == false ? '' : '<a href="#" class="btn btn-primary btn-warning" data-toggle="tooltip" data-placement="top"  title="' + (mobj.IsActive == true ? banMemship + '"><span class="glyphicon glyphicon-ban-circle">' : activeMemship + '"><span class="glyphicon glyphicon-repeat">') + '</span></a>') +
                    '</td></tr>');
            });
            convertLangTableDialogMem(langgSite);
            if (typeof clickRenew === "function")
            { clickRenew(); }
            reloadDataTableMemHistory();
            deferred.resolve();
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                }, function () {
                    setTimeout(function () {
                        swal(alertSendBugDone);
                    }, 2000);
                });
                console.log(xhr.responseText);
            }
        }
    });
    return deferred;
}

//save object of new membership:
var MembershipsCollection = [];
function postMembership(id) {
    var postMembershipSpinner = LoadSpinner.start();
    var progID = $('#basis2').val();
    //let dateStr = sDate($('#startfixed2').val()),
    //    timeStr = $('#startTimeOneVisit').val(),
    //    date = moment(dateStr),
    //    time = moment(timeStr, 'HH:mm');

    //date.set({
    //    hour: time.get('hour'),
    //    minute: time.get('minute'),
    //    second: time.get('second')
    //});
    //var startDate = date;
    var startDate = sDate($('#startfixed2').val());
    startDate = moment(startDate + ' ' + $('#startTimeOneVisit').val());
    var endDate = sDate($('#endOpen').val());
    var bookedVisits = $('#totalVisit11').val();
    var totalPrice = $('#totalPrice').val();
    var paid = $('#paid').val();
    var specialistId = $('#specalistMem').val();

    var progName = $('#basis2 option:selected').text();

    var progType = $('#basis2').find(':selected').data("basis");
    switch (progType) {
        case 'oneVisit':
            if (bookedVisits == null) {
                bookedVisits = 1;
            }
            endDate = null;
            break;
        case "multiVisits":
            bookedVisits = $('#totalVisit2').val();
            endDate = null;
            break;
        case "openProgram":
            bookedVisits = null;
            break;
        case "fixedProgram":
            endDate = sDate($('#periodTo').val());
            bookedVisits = null;
            break;
        case "Package":
            bookedVisits = 0;
            $("#previewPackage2 li").each(function () {
                bookedVisits += parseInt($(this).attr('data-count'));
            });
            break;
    }
    var MembershipDetails = { ProgramID: progID, PartyID: id, SpecialistId: specialistId, StartDate: startDate, EndDate: endDate, BookedVisits: bookedVisits, ProgramFees: totalPrice, Paid: paid, IsActive: true, EditDate: null, EditedBy: "00000000-0000-0000-0000-000000000000" };
    MembershipsCollection.push(MembershipDetails);
    if (isAnotherMembership == true) {
        resetMembershipTab();
        isAnotherMembership = false;
        IsNewInvoice = true;
        LoadSpinner.stop(postMembershipSpinner);
    }
    else {
        $("#tabsMember").tabs("enable", 3).tabs("option", "active", 3);
        var deffillNewInvoice = fillNewInvoice(null, progID, 'typeMembership');
        deffillNewInvoice.then(function () { LoadSpinner.stop(postMembershipSpinner); })
    }
}
// set start date in datepicker if program basis is open:
function setStartDateMembership(programId) {
    var foundedMemberships = [];
    if (allMembershipsObject != null) {
        foundedMemberships = allMembershipsObject.filter(function (membershipObj) {
            return membershipObj.ProgramID == programId && membershipObj.IsActive == true
        });
    } else { foundedMemberships.length = 0 }
    if (foundedMemberships.length > 0) {
        var endDateRenew = new Date(foundedMemberships[0].EndDate);
        var today = new Date();
        var startDateRenew;
        if (endDateRenew < today) {
            startDateRenew = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate());
        }
        else {
            var stDateToRenew = new Date(endDateRenew.getFullYear() + '-' + (endDateRenew.getMonth() + 1) + '-' + (endDateRenew.getDate()));
            startDateRenew = stDateToRenew.setDate(stDateToRenew.getDate() + 1);
        }
        $('#startfixed2').val(fDate(startDateRenew)).change();
        var stDateToRenew2 = new Date(endDateRenew.getFullYear() + '-' + (endDateRenew.getMonth() + 1) + '-' + (endDateRenew.getDate()));
        var startDateRenew2 = stDateToRenew2.setDate(stDateToRenew2.getDate() + 1);
        $('#startfixed2').datepicker("option", "minDate", new Date(startDateRenew2));
    }
}
// check if same member in the same programe if program basis is fixed:
function checkMemberInProgram(programId) {
    var foundedMemberships = [];
    if (allMembershipsObject != null) {
        foundedMemberships = allMembershipsObject.filter(function (membershipObj) {
            return membershipObj.ProgramID == programId
        });
    } else { foundedMemberships.length = 0 }
    if (foundedMemberships.length > 0) {
        swal({
            title: alertWarningTitle,
            text: alertWarningTextFixed,
            confirmButtonText: alertBtnText,
            type: "warning"
        });
        $('#basis2').val('');
        $('#frmMembership').bootstrapValidator('updateStatus', 'basis2', 'INVALID', 'notEmpty');
        return false;
    }
}
// check program capacity if has:
function checkProgramCapacity(programId) {
    var foundedMemberships = [];
    if (allMembershipsObject != null) {
        foundedMemberships = allMembershipsObject.filter(function (membershipObj) {
            return membershipObj.ProgramID == programId
        });
    } else { foundedMemberships.length = 0 }

    if (foundedMemberships.length == 0) {
        $.each(allProgramsObject, function (i, mobj) {
            if (mobj.ProgramID == programId && mobj.ProgramMembers >= mobj.ProgramCapacity) {
                swal({
                    title: alertWarningTitle,
                    text: alertWarningTextCapacity,
                    confirmButtonText: alertBtnText,
                    type: "warning"
                });
            }
        });
    }
}
// check if same subscription in same day:
function checkDuplicateMembership(programId, startDate) {
    var foundedMemberships = [];
    if (allMembershipsObject != null) {
        foundedMemberships = allMembershipsObject.filter(function (membershipObj) {
            return membershipObj.ProgramID == programId && new Date(membershipObj.StartDate).setHours(0) == new Date(startDate).setHours(0)

        });
    } else { foundedMemberships.length = 0 }
    if (foundedMemberships.length > 0) {
        swal({
            title: alertWarningTitle,
            text: alertWarningTextDuplicate,
            confirmButtonText: alertBtnText,
            type: "warning"
        });
        $('#basis2, #startfixed2').val('');
        $('#basis2').focus();
        $('#frmMembership').bootstrapValidator('updateStatus', 'basis2', 'INVALID', 'notEmpty');
    }
}

//create renewal membership from membership history:
$(document).on('click', '#memHistory tbody tr .tdRenew button[class~=tabledit-renew-button]', function () {
    var renewMembershipSpinner = LoadSpinner.start();
    $('#startfixed2, #endOpen').val('');
    $('#frmMembership').data('bootstrapValidator').resetForm(true);
    var programIDRenew = $(this).closest('tr').find('th:eq(1)').text();
    $('#basis2').val(programIDRenew).change();
    var programBasis;
    $.each(allProgramsObject, function (i, mobj) {
        if (mobj.ProgramID == programIDRenew) {
            programBasis = mobj.ProgramBasis;
        }
    });
    if (programBasis == 'openProgram') {
        var endDateRenew = new Date($(this).closest('tr').find('td:eq(2)').text());
        var today = new Date();
        var startDateRenew;

        if (endDateRenew < today) {
            startDateRenew = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate());
        }
        else {
            var stDateToRenew = new Date(endDateRenew.getFullYear() + '-' + (endDateRenew.getMonth() + 1) + '-' + (endDateRenew.getDate()));
            startDateRenew = stDateToRenew.setDate(stDateToRenew.getDate() + 1)
        }
        $('#startfixed2').val(fDate(startDateRenew)).change();
    }
    else {
        $('#startfixed2').val(fDate(new Date()));
    }
    LoadSpinner.stop(renewMembershipSpinner);
    $("#tabsMember").tabs("option", "active", 1);
});

// Suspend/Reactivate Membership in table:
$(document).on('click', '#memHistory tbody tr td a[class~=btn-warning]', function () {
    var membershipDeleteID = $(this).closest('tr').find('th:eq(0)').text();
    var memsNameTodelete = $(this).closest('tr').find('td:eq(0)').text();
    if ($(this).find('span.glyphicon-ban-circle').length != 0) {
        swal({
            title: alertDeleteTitle,
            text: alertBanText,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d9534f",
            confirmButtonText: alertBtnBanText,
            cancelButtonText: alertBtnCancelText,
            closeOnConfirm: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    var suspendMembershipSpinner = LoadSpinner.start();
                    $.ajax({
                        type: "GET",
                        url: apiURL + '/api/MembershipAPI/ChangeMembershipStatus?memsID=' + membershipDeleteID + '&userUID=' + UserDTO.UserID + '&isActive=' + false,
                        success: function () {
                            GetAllMembers();
                            var defGetCalendarEvents = GetCalendarEvents();
                            defGetCalendarEvents.then(GetAllInvoices());
                            GetAllCheckins();
                            GetMembershipsByMemberID(memID);
                            LoadSpinner.stop(suspendMembershipSpinner);
                            swal({
                                title: alertSuccessTitle,
                                text: alertSuccessText,
                                type: "success",
                                timer: 2000,
                                showConfirmButton: false
                            });
                        },
                        error: function (xhr) {
                            if (xhr.responseText == 'Session Expired') {
                                //window.location = 'Login.aspx';
                            }
                            else {
                                LoadSpinner.stop(suspendMembershipSpinner);
                                swal({
                                    title: alertSendBugTitle,
                                    text: alertSendBugText,
                                    type: "input",
                                    showCancelButton: true,
                                    confirmButtonText: alertBtnBugText,
                                    cancelButtonText: alertBtnCancelText,
                                    closeOnConfirm: false,
                                    showLoaderOnConfirm: true,
                                }, function () {
                                    setTimeout(function () {
                                        swal(alertSendBugDone);
                                    }, 2000);
                                });
                                console.log(xhr.responseText);
                            }
                        }
                    });
                } else {
                    return;
                }
            });
    }
    if ($(this).find('span.glyphicon-repeat').length != 0) {
        swal({
            title: alertDeleteTitle,
            text: alertActivateText,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4cae4c",
            confirmButtonText: alertBtnActiveText,
            cancelButtonText: alertBtnCancelText,
            closeOnConfirm: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    var reActivateMembershipSpinner = LoadSpinner.start();
                    $.ajax({
                        type: "GET",
                        url: apiURL + '/api/MembershipAPI/ChangeMembershipStatus?memsID=' + membershipDeleteID + '&isActive=' + true,
                        success: function () {
                            GetAllMembers();
                            var defGetCalendarEvents = GetCalendarEvents();
                            defGetCalendarEvents.then(GetAllInvoices());
                            GetAllCheckins();
                            GetMembershipsByMemberID(memID);
                            LoadSpinner.stop(reActivateMembershipSpinner);
                            swal({
                                title: alertSuccessTitle,
                                text: alertSuccessText,
                                type: "success",
                                timer: 2000,
                                showConfirmButton: false
                            });
                        },
                        error: function (xhr) {
                            if (xhr.responseText == 'Session Expired') {
                                //window.location = 'Login.aspx';
                            }
                            else {
                                LoadSpinner.stop(reActivateMembershipSpinner);
                                swal({
                                    title: alertSendBugTitle,
                                    text: alertSendBugText,
                                    type: "input",
                                    showCancelButton: true,
                                    confirmButtonText: alertBtnBugText,
                                    cancelButtonText: alertBtnCancelText,
                                    closeOnConfirm: false,
                                    showLoaderOnConfirm: true,
                                }, function () {
                                    setTimeout(function () {
                                        swal(alertSendBugDone);
                                    }, 2000);
                                });
                                console.log(xhr.responseText);
                            }
                        }
                    });
                } else {
                    return;
                }
            });
    }

});

//Get all Memberships & invoices for notification Grid:
function GetMembershipsEndingSoon() {

    $.ajax({
        url: apiURL + '/api/MembershipAPI/GetMembershipsEndingSoon/' + UserDTO.BranchID,
        type: "GET",
        dataType: "json",
        success: function (data) {
            var allMembershipsEndingObject = data;
            contentType: "application/json";
            $("#endSubs").append('<tbody></tbody>');
            $.each(allMembershipsEndingObject, function (i, mobj) {
                if (mobj.RemainingDay != null && mobj.RemainingDay <= UserDTO.AlertDays && mobj.RemainingDay > 0 && mobj.IsRenewal == true) {
                    if (mobj.ProgramBasis == 'openProgram') {
                        $("#endSubs").append(
                            '<tr><th hidden="hidden">' + mobj.PartyID +
                            '</th><th hidden="hidden">' + mobj.MembershipID +
                            '</th><th hidden="hidden">' + '' +
                            '</th><td>' + mobj.PartyName + ' <br />' + mobj.Telephone +
                            '</td><td><span data-toggle="tooltip" data-placement="top" title="' + tooltipGoDetails + '">' + txt_Subscription + '<b> ' + mobj.ProgramName + ' </b>' + txt_EndAfter + '<b> ' + mobj.RemainingDay + txt_Day + '</b></span>' +
                            '</td><td class="tdRenew"><button type="button" class="tabledit-renew-button btn btn-primary btn-md">' + btnRenew + '</button>' +
                            '</td></tr>');
                    }
                }
                var remainingVisits = mobj.BookedVisits - mobj.UsedVisits
                if (mobj.BookedVisits != null && remainingVisits <= UserDTO.AlertVisits && remainingVisits > 0 && mobj.IsRenewal == true) {
                    $("#endSubs").append(
                        '<tr><th hidden="hidden">' + mobj.PartyID +
                        '</th><th hidden="hidden">' + mobj.MembershipID +
                        '</th><th hidden="hidden">' + '' +
                        '</th><td>' + mobj.PartyName + ' <br />' + mobj.Telephone +
                        '</td><td><span data-toggle="tooltip" data-placement="top" title="' + tooltipGoDetails + '">' + txt_Subscription + '<b> ' + mobj.ProgramName + ' </b>' + txt_EndAfter + '<b> ' + remainingVisits + txt_Visit + '</b></span>' +
                        '</td><td class="tdRenew"><button type="button" class="btn btn-primary btn-md">' + btnRenew + '</button>' +
                        '</td></tr>');
                }
            });
            $.each(allInvoicesObject, function (i, mobj) {
                if (mobj.NextPaymentDate != '' && new Date(new Date().setDate(new Date().getDate() + parseFloat(UserDTO.AlertPayments))) >= new Date(mobj.NextPaymentDate) && (mobj.Total - mobj.Paid) > 0) {
                    $("#endSubs").append(
                        '<tr ' + (mobj.IsMembershipActive == false ? 'class="warning"' : '') + '><th hidden="hidden">' + mobj.PartyID +
                        '</th><th hidden="hidden">' + mobj.MembershipID +
                        '</th><th hidden="hidden">' + mobj.InvoiceID +
                        '</th><td>' + mobj.PartyName + ' <br />' + mobj.Telephone +
                        '</td><td><span data-toggle="tooltip" data-placement="top" title="' + tooltipGoDetails + '">' + (mobj.IsHasMembership == true ? txt_Subscription + '<b> ' + mobj.MembershipName + ' </b>' : txt_InvoiceNo + '(' + mobj.InvoiceSerial + ') ' + txt_Dated + ' (' + aDate(mobj.InvoiceDate) + ') ') + txt_NeedToPay + '<b> $' + (mobj.Total - mobj.Paid) + '</b> ' + txt_on + ' <b> ' + aDate(mobj.NextPaymentDate) + '</b></span>' +
                        '</td><td class="tdInvDue">' +
                        '<button type="button" class="btn btn-success btn-md">' + btnPay + '</button>&nbsp;' +
                        //'<button type="button" class="btn btn-danger btn-md"></button>' +
                        (mobj.IsHasMembership == true ? '<a href="#" class="btn btn-md btn-warning" data-toggle="tooltip" data-placement="left" ' + (mobj.IsMembershipActive == true ? ' title="' + banInvoice + '"><span class="glyphicon glyphicon-ban-circle">' : '  title="' + activeInvoice + '"><span class="glyphicon glyphicon-repeat">') + '</span></a>' : '') +
                        '</td></tr>');
                }
            });
            reloadDataTableEnding();
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                }, function () {
                    setTimeout(function () {
                        swal(alertSendBugDone);
                    }, 2000);
                });
                console.log(xhr.responseText);
            }
        }
    })
}

//create renewal membership from notification grid:
var toRenew = false;
$(document).on('click', '#endSubs tbody tr .tdRenew button', function () {

    var memberID = $(this).closest('tr').find('th:eq(0)').text();
    var membershipID = $(this).closest('tr').find('th:eq(1)').text();
    toRenew = true;
    var clickRenew = function () {
        $("#memHistory th").filter(function () {
            return $.text([this]) == membershipID;
        }).closest("tr").find('.tdRenew button[class~=tabledit-renew-button]').click();
    }
    dialogMember(memberID, clickRenew);

});

// Suspend/Reactivate Membership in notification grid:
$(document).on('click', '#endSubs tbody tr td a[class~=btn-warning]', function () {
    var membershipDeleteID = $(this).closest('tr').find('th:eq(1)').text();
    if ($(this).find('span.glyphicon-ban-circle').length != 0) {
        swal({
            title: alertDeleteTitle,
            text: alertBanText,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d9534f",
            confirmButtonText: alertBtnBanText,
            cancelButtonText: alertBtnCancelText,
            closeOnConfirm: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    var suspendMembershipSpinner = LoadSpinner.start();
                    $.ajax({
                        type: "GET",
                        url: apiURL + '/api/MembershipAPI/ChangeMembershipStatus?memsID=' + membershipDeleteID + '&isActive=' + false,
                        success: function () {
                            GetAllMembers();
                            var defGetCalendarEvents = GetCalendarEvents();
                            defGetCalendarEvents.then(GetAllInvoices());
                            GetAllCheckins();
                            LoadSpinner.stop(suspendMembershipSpinner);
                            swal({
                                title: alertSuccessTitle,
                                text: alertSuccessText,
                                type: "success",
                                timer: 2000,
                                showConfirmButton: false
                            });
                        },
                        error: function (xhr) {
                            if (xhr.responseText == 'Session Expired') {
                                //window.location = 'Login.aspx';
                            }
                            else {
                                LoadSpinner.stop(suspendMembershipSpinner);
                                swal({
                                    title: alertSendBugTitle,
                                    text: alertSendBugText,
                                    type: "input",
                                    showCancelButton: true,
                                    confirmButtonText: alertBtnBugText,
                                    cancelButtonText: alertBtnCancelText,
                                    closeOnConfirm: false,
                                    showLoaderOnConfirm: true,
                                }, function () {
                                    setTimeout(function () {
                                        swal(alertSendBugDone);
                                    }, 2000);
                                });
                                console.log(xhr.responseText);
                            }
                        }
                    });
                } else {
                    return;
                }
            });
    }
    if ($(this).find('span.glyphicon-repeat').length != 0) {
        swal({
            title: alertDeleteTitle,
            text: alertActivateText,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4cae4c",
            confirmButtonText: alertBtnActiveText,
            cancelButtonText: alertBtnCancelText,
            closeOnConfirm: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    var reActivateMembershipSpinner = LoadSpinner.start();
                    $.ajax({
                        type: "GET",
                        url: apiURL + '/api/MembershipAPI/ChangeMembershipStatus?memsID=' + membershipDeleteID + '&isActive=' + true,
                        success: function () {
                            GetAllMembers();
                            var defGetCalendarEvents = GetCalendarEvents();
                            defGetCalendarEvents.then(GetAllInvoices());
                            GetAllCheckins();
                            LoadSpinner.stop(reActivateMembershipSpinner);
                            swal({
                                title: alertSuccessTitle,
                                text: alertSuccessText,
                                type: "success",
                                timer: 2000,
                                showConfirmButton: false
                            });
                        },
                        error: function (xhr) {
                            if (xhr.responseText == 'Session Expired') {
                                //window.location = 'Login.aspx';
                            }
                            else {
                                LoadSpinner.stop(reActivateMembershipSpinner);
                                swal({
                                    title: alertSendBugTitle,
                                    text: alertSendBugText,
                                    type: "input",
                                    showCancelButton: true,
                                    confirmButtonText: alertBtnBugText,
                                    cancelButtonText: alertBtnCancelText,
                                    closeOnConfirm: false,
                                    showLoaderOnConfirm: true,
                                }, function () {
                                    setTimeout(function () {
                                        swal(alertSendBugDone);
                                    }, 2000);
                                });
                                console.log(xhr.responseText);
                            }
                        }
                    });
                } else {
                    return;
                }
            });
    }

});

// Get subscriptions for Time line report
function drawChartTimeLineSubs() {
    $.ajax({
        url: apiURL + '/api/MembershipAPI/GetSubscriptionsChart/' + UserDTO.CompanyID,
        type: "GET",
        dataType: "json",
        success: function (data) {
            contentType: "application/json";

            var recentYear = new Date().getFullYear();
            var prevYear = new Date().getFullYear() - 1;

            var dataChart = new google.visualization.DataTable();
            dataChart.addColumn('date', 'Month');
            dataChart.addColumn('number', prevYear);
            dataChart.addColumn({ type: 'string', role: 'tooltip' });
            dataChart.addColumn('number', recentYear);
            dataChart.addColumn({ type: 'string', role: 'tooltip' });

            $.each(data, function (i, mobj) {
                dataChart.addRow([new Date('2017-' + mobj.MonthOfYear), mobj.CountPrevYear, titleSubscriptionsTimeLine + ': ' + mobj.CountPrevYear, mobj.CountCurrentYear, titleSubscriptionsTimeLine + ': ' + mobj.CountCurrentYear]);
            });

            var dateTicks = [];
            for (var m = 1; m <= 12; m++)
                dateTicks.push(new Date('2017-' + m));

            // Set chart options
            var options = {
                'title': titleChartTimeLine,
                titleTextStyle: { fontSize: 18 },
                vAxis: {
                    gridlines: { count: -1 },
                    titleTextStyle: { fontSize: 16 }
                },
                hAxis: {
                    format: 'MMMM',
                    ticks: dateTicks
                },
                pointSize: 10,
            };

            // Instantiate and draw our chart, passing in some options.
            var chart = new google.visualization.LineChart(document.getElementById('chartTimeLine'));

            chart.draw(dataChart, options);

            // save image by download btn:
            var btnDownload = document.getElementById('saveChartTimeLine');
            btnDownload.href = chart.getImageURI();
            btnDownload.download = fileNameTimeLineChart + '.png';
            LoadSpinner.stop(drawChartTimeLineSpinner);
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                LoadSpinner.stop(drawChartTimeLineSpinner);
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                }, function () {
                    setTimeout(function () {
                        swal(alertSendBugDone);
                    }, 2000);
                });
                console.log(xhr.responseText);
            }
        }
    });
}


/* ------------------Memberships Visits Actions------------------*/
///// Checkins Reports /////
//Get all checkins for all members:
var AllCheckinsObj, fromChk = "", toChk = "";
function GetAllCheckins() {
    var deferred = new $.Deferred();
    $.ajax({
        url: apiURL + '/api/MembershipAPI/GetAllCheckins/' + UserDTO.BranchID,
        type: "GET",
        dataType: "json",
        success: function (data) {
            contentType: "application/json";
            $("#allCheckins").text(data.length);
            AllCheckinsObj = data;
            $('#tblCheckins tbody tr').remove();
            $.each(AllCheckinsObj, function (i, mobj) {
                $("#tblCheckins").append(
                    '<tr><th hidden="hidden">' + mobj.MembershipVisitID +
                    '</th><td>' + fDate(mobj.CheckInDate) +
                    '</td><td>' + mobj.CheckInTime +
                    '</td><td>' + mobj.PartyName +
                    '</td><td>' + mobj.ProgramName +
                    '</td><td>' + "" +
                    '</td></tr>');
            });
            deferred.resolve();
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                }, function () {
                    setTimeout(function () {
                        swal(alertSendBugDone);
                    }, 2000);
                });
                console.log(xhr.responseText);
            }
        }
    });
    return deferred;
}
$('#fromCheck').change(function () {

    fromChk = sDate($('#fromCheck').val());
    $('#tblCheckins tbody tr').remove();
    $.each(AllCheckinsObj, function (i, mobj) {
        if (toChk == "" ? (new Date(fromChk).setHours(0) <= new Date(mobj.CheckInDate).setHours(0)) : (new Date(fromChk).setHours(0) <= new Date(mobj.CheckInDate).setHours(0) && new Date(toChk).setHours(0) >= new Date(mobj.CheckInDate).setHours(0))) {
            $("#tblCheckins").append(
                '<tr><th hidden="hidden">' + mobj.MembershipID +
                '</th><td>' + fDate(mobj.CheckInDate) +
                '</td><td>' + mobj.CheckInTime +
                '</td><td>' + mobj.PartyName +
                '</td><td>' + mobj.ProgramName +
                '</td><td>' + "" +
                '</td></tr>');
        }
    });
    if ($('#tblCheckins tbody tr').length == 0) {
        $("#tblCheckins").append(noChekinsPeriod);
    }

});
$('#toCheck').change(function () {

    toChk = sDate($('#toCheck').val());
    $('#tblCheckins tbody tr').remove();
    $.each(AllCheckinsObj, function (i, mobj) {
        if (fromChk == "" ? (new Date(toChk).setHours(0) >= new Date(mobj.CheckInDate).setHours(0)) : (new Date(fromChk).setHours(0) <= new Date(mobj.CheckInDate).setHours(0) && new Date(toChk).setHours(0) >= new Date(mobj.CheckInDate).setHours(0))) {
            $("#tblCheckins").append(
                '<tr><th hidden="hidden">' + mobj.MembershipID +
                '</th><td>' + fDate(mobj.CheckInDate) +
                '</td><td>' + mobj.CheckInTime +
                '</td><td>' + mobj.PartyName +
                '</td><td>' + mobj.ProgramName +
                '</td><td>' + "" +
                '</td></tr>');
        }
    });
    if ($('#tblCheckins tbody tr').length == 0) {
        $("#tblCheckins").append(noChekinsPeriod);
    }

});
// handle from date and to date together:
$(function () {
    $("#fromCheck").on("change", function () {
        $("#toCheck").datepicker("option", "minDate", $(this).val());
    });
    $("#toCheck").on("change", function () {
        $("#fromCheck").datepicker("option", "maxDate", $(this).val());
    });
});
// get checkins for member in autocomplete:
function getChekinsBymember() {
    $("#ss").autocomplete({
        source: members,
        minLength: 0,
        focus: function (event, ui) {
            $("#ss").val(ui.item.name);
            return false;
        },
        select: function (event, ui) {
            $('#tblCheckins tbody').remove();
            $.each(AllCheckinsObj, function (i, mobj) {
                if (ui.item.name == mobj.PartyName) {
                    $("#tblCheckins").append(
                        '<tr><th hidden="hidden">' + mobj.MembershipID +
                        '</th><td>' + fDate(mobj.CheckInDate) +
                        '</td><td>' + mobj.CheckInTime +
                        '</td><td>' + mobj.PartyName +
                        '</td><td>' + mobj.ProgramName +
                        '</td><td>' + "" +
                        '</td></tr>');
                }
            });
            if ($('#tblCheckins tbody tr').length == 0) {
                $("#tblCheckins").append(noChekinsMember);
            }
            return false;
        }
    })
        .autocomplete("instance")._renderItem = function (ul, item) {
            return $("<li style='border-bottom:1px #ccc solid; background-color:#deedf7;'>")
                .append("<div>"
                + item.icon + "<br>"
                + "</div>")
                .appendTo(ul);
        };
}
// btn all checkins
$("#checkinsAll").click(function () {
    var GetAllCheckinsSpinner = LoadSpinner.start();
    $("#divCheckinsByMember,#divCheckinsByPeriod").hide(1000);
    $("#ss").val("");
    $('#fromCheck,#toCheck').val("");
    $('#fromCheck,#toCheck').datepicker("option", "minDate", "");
    $('#tblCheckins tbody tr').remove();
    $(this).css({ 'box-shadow': '0 0 1em 0.5em #00ADEE', 'background-color': '#286090', 'z-index': 2 });
    $("#checkinsByPeriod, #checkinsByMember").css({ 'box-shadow': 'none', 'background-color': '#337ab7', 'z-index': 1 });
    var defGetAllCheckins = GetAllCheckins();
    defGetAllCheckins.then(function () { LoadSpinner.stop(GetAllCheckinsSpinner); })
});
// btn period checkins:
$("#checkinsByPeriod").click(function () {

    $("#divCheckinsByMember").hide(1000);
    $("#divCheckinsByPeriod").show(1000);
    $("#ss").val("");
    $('#fromCheck,#toCheck').val("");
    $('#fromCheck,#toCheck').datepicker("option", "minDate", "");
    $('#tblCheckins tbody tr').remove();
    $.each(AllCheckinsObj, function (i, mobj) {
        $("#tblCheckins").append(
            '<tr><th hidden="hidden">' + mobj.MembershipID +
            '</th><td>' + fDate(mobj.CheckInDate) +
            '</td><td>' + mobj.CheckInTime +
            '</td><td>' + mobj.PartyName +
            '</td><td>' + mobj.ProgramName +
            '</td><td>' + "" +
            '</td></tr>');
    });
    $(this).css({ 'box-shadow': '0 0 1em 0.5em #00ADEE', 'background-color': '#286090', 'z-index': 2 });
    $("#checkinsAll, #checkinsByMember").css({ 'box-shadow': 'none', 'background-color': '#337ab7', 'z-index': 1 });

});
// btn member checkins:
$("#checkinsByMember").click(function () {

    getChekinsBymember();
    $("#divCheckinsByPeriod").hide(1000);
    $("#divCheckinsByMember").show(1000);
    $("#ss").val("");
    $('#fromCheck,#toCheck').val("");
    $('#fromCheck,#toCheck').datepicker("option", "minDate", "");
    $('#tblCheckins tbody tr').remove();
    $.each(AllCheckinsObj, function (i, mobj) {
        $("#tblCheckins").append(
            '<tr><th hidden="hidden">' + mobj.MembershipID +
            '</th><td>' + fDate(mobj.CheckInDate) +
            '</td><td>' + mobj.CheckInTime +
            '</td><td>' + mobj.PartyName +
            '</td><td>' + mobj.ProgramName +
            '</td><td>' + "" +
            '</td></tr>');
    });
    $(this).css({ 'box-shadow': '0 0 1em 0.5em #00ADEE', 'background-color': '#286090', 'z-index': 2 });
    $("#checkinsAll, #checkinsByPeriod").css({ 'box-shadow': 'none', 'background-color': '#337ab7', 'z-index': 1 });

})

///// member Checkins /////
//Check in visit from calendar dialog:
$(document).on('click', '#eventMembers tbody tr button.btn-info', function () {
    var checkInSpinner = LoadSpinner.start();
    var membershipID = $(this).closest('tr').find('th:eq(1)').text();
    var usedVisits = parseFloat($(this).closest('tr').find('td:eq(2)').text());
    $(this).closest('tr').find('td:eq(2)').text(usedVisits + 1);
    $(this).prop('disabled', true);
    $.ajax({
        type: "GET",
        url: apiURL + '/api/MembershipAPI/PostMembershipVisit/' + membershipID,
        contentType: "application/json",
        success: function () {
            //GetMembershipsByMemberID(memID);
            var defGetCalendarEvents = GetCalendarEvents();
            defGetCalendarEvents.then(GetAllInvoices());
            GetAllCheckins();
            LoadSpinner.stop(checkInSpinner);
            swal({
                title: alertSuccessTitle,
                text: alertSuccessText,
                type: "success",
                timer: 2000,
                showConfirmButton: false
            });
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                LoadSpinner.stop(checkInSpinner);
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                }, function () {
                    setTimeout(function () {
                        swal(alertSendBugDone);
                    }, 2000);
                });
                console.log(xhr.responseText);
            }
        }
    });
});

//Check in visit from history in member dialog:
$(document).on('click', '#memHistory tbody tr button.btn-info', function () {
    var checkInSpinner = LoadSpinner.start();
    var membershipID = $(this).closest('tr').find('th:eq(0)').text();
    var usedVisits = parseFloat($(this).closest('tr').find('td:eq(4)').text());
    $(this).closest('tr').find('td:eq(4)').text(usedVisits + 1);
    $(this).prop('disabled', true);
    $.ajax({
        type: "GET",
        url: apiURL + '/api/MembershipAPI/PostMembershipVisit/' + membershipID,
        contentType: "application/json",
        success: function () {
            //GetMembershipsByMemberID(memID);
            var defGetCalendarEvents = GetCalendarEvents();
            defGetCalendarEvents.then(GetAllInvoices());
            GetAllCheckins();
            LoadSpinner.stop(checkInSpinner);
            swal({
                title: alertSuccessTitle,
                text: alertSuccessText,
                type: "success",
                timer: 2000,
                showConfirmButton: false
            });
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                LoadSpinner.stop(checkInSpinner);
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                }, function () {
                    setTimeout(function () {
                        swal(alertSendBugDone);
                    }, 2000);
                });
                console.log(xhr.responseText);
            }
        }
    });
});

//Check in visit from visits tab in member dialog:
$(document).on('click', '#visitsHistory tbody tr button.btn-info', function () {
    var checkInSpinner = LoadSpinner.start();
    var VisitID = $(this).closest('tr').find('th:eq(0)').text();
    var chktd = $(this).closest('tr').find('td:eq(5)');
    //var usedVisits = parseFloat($(this).closest('tr').find('td:eq(4)').text());
    $(this).closest('tr').find('.btn-success').prop('disabled', true);
    $(this).prop('disabled', true);
    $.ajax({
        type: "GET",
        url: apiURL + '/api/MembershipAPI/PostVisit/' + VisitID,
        contentType: "application/json",
        success: function () {
            //GetMembershipsByMemberID(memID);
            var defGetCalendarEvents = GetCalendarEvents();
            defGetCalendarEvents.then(GetAllInvoices());
            GetAllCheckins();
            LoadSpinner.stop(checkInSpinner);
            swal({
                title: alertSuccessTitle,
                text: alertSuccessText,
                type: "success",
                timer: 2000,
                showConfirmButton: false
            });
            chktd.text(fDate(new Date()));
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                LoadSpinner.stop(checkInSpinner);
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                }, function () {
                    setTimeout(function () {
                        swal(alertSendBugDone);
                    }, 2000);
                });
                console.log(xhr.responseText);
            }
        }
    });
});

// Go to visits tab from history in member dialog:
$(document).on('click', '#memHistory tbody tr button.btn-default', function () {
    var deferred = new $.Deferred();
    var membershipID = $(this).closest('tr').find('th:eq(0)').text();
    $.ajax({
        url: apiURL + '/api/MembershipAPI/GetCheckinsByMembership/' + membershipID,
        type: "GET",
        dataType: "json",
        success: function (data) {
            contentType: "application/json";
            $('#visitsHistory tbody tr').remove();
            $.each(data, function (i, mobj) {
                var bookedTime = mobj.ReservationTime.split(":");
                var bookedHour = bookedTime[0];
                var bookedMinut = bookedTime[1];
                $("#visitsHistory").append(
                    '<tr><th hidden="hidden">' + mobj.MembershipVisitID +
                    '</th><td>' + mobj.ProgramName +
                    '</th><td>' + mobj.Specialist +
                    '</td><td>' + fDate(mobj.ReservationDate) +
                    '</td><td>' + (mobj.ReservationTime == "" ? "" : addZero(bookedHour) + ":" + addZero(bookedMinut)) +
                    '</td><td>' + (mobj.SequenceNo == null ? "" : mobj.SequenceNo) +
                    '</td><td>' + fDate(mobj.CheckInDate) +
                    '</td><td class="text-center">' + (mobj.CheckInDate == "" ? '<button class="btn btn-info"><span class="glyphicon glyphicon-check"></span></button>' : '') +
                    '</td></tr>');
            });
            if (specialistsObject == "}") {
                $('#visitsHistory').Tabledit({
                    //deleteButton: false,
                    autoFocus: false,
                    columns: {
                        identifier: [0, 'id'],
                        editable: [[3, 'BookedDate'], [4, 'BookedTime']]
                    }
                })
            }
            else {
                $('#visitsHistory').Tabledit({
                    autoFocus: false,
                    columns: {
                        identifier: [0, 'id'],
                        editable: [[2, 'Specialist', specialistsObject], [3, 'BookedDate'], [4, 'BookedTime']]
                    }
                })
            }

            $('#visitsHistory > tbody > tr').each(function (i, row) {
                if ($('td:eq(4)', this).text() != "") {
                    $('.btn-success', this).hide();
                }
            });
            $("#tabsMember").tabs("enable", 2).tabs("option", "active", 2);
            deferred.resolve();
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                }, function () {
                    setTimeout(function () {
                        swal(alertSendBugDone);
                    }, 2000);
                });
                console.log(xhr.responseText);
            }
        }
    });
    return deferred;
});
// save visit details:
$("#visitsHistory").on('click', 'button.tabledit-save-button', function () {
    var updatevisitsHistorySpinner = LoadSpinner.start();
    var visitId = $(this).closest('tr').find('th:eq(0)').text();
    var specId = $(this).closest('tr').find('td:eq(1) select option:selected').val();
    var bookDay = $(this).closest('tr').find('td:eq(2) input').val();
    var bookTime = $(this).closest('tr').find('td:eq(3) input').val();

    var seqtd = $(this).closest('tr').find('td:eq(4)');

    var VisitDetails = {
        MembershipVisitID: visitId,
        ProgramName: "",
        Specialist: specId,
        CheckInDate: "",
        CheckInTime: "",
        PartyName: "",
        CheckInBy: "",
        ReservationDate: sDate(bookDay),
        ReservationTime: bookTime,
        SequenceNo: "",
        MembershipStartDate: "1-1-2018"
    };
    var t = JSON.stringify(VisitDetails);
    $.ajax({
        url: apiURL + '/api/MembershipAPI/UpdateMembershipVisit/',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: t,
        success: function (data) {
            LoadSpinner.stop(updatevisitsHistorySpinner);
            swal({
                title: alertSuccessTitle,
                text: "Sequence Number is: " + data,
                type: "success",
                showConfirmButton: true
            });
            seqtd.text(data);
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                LoadSpinner.stop(updatevisitsHistorySpinner);
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                },
                    function () {
                        setTimeout(function () {
                            swal(alertSendBugDone);
                        }, 2000);
                    });
                console.log(xhr.responseText);
            }
        }
    });
});

/* ------------------Invoices Actions------------------*/
// create new invoice without membership
$('#btnInvoice').click(function () {
    var newInvoiceSpinner = LoadSpinner.start();
    $("#tabsMember").tabs("enable", 3).tabs("option", "active", 3);
    $('a.add, a.cut').show();
    var deffillNewInvoice = fillNewInvoice(null, null, 'typeItems');
    deffillNewInvoice.then(function () { LoadSpinner.stop(newInvoiceSpinner); })
});

// fill invoice fields when its new:
function fillNewInvoice(membershipID, programID, invoiceType) {
    var deferred = new $.Deferred();
    $.ajax({
        url: apiURL + '/api/InvoiceAPI/GetLastInvoiceSerial/' + UserDTO.CompanyID,
        type: 'GET',
        success: function (data) {
            $('#invSerial').text(data + 1);
            var now = new Date();
            $('#invDateTime').text(fDate(now) + ' / ' + addZero(now.getHours()) + ':' + addZero(now.getMinutes()));
            $('#invToName').text($('#memberName').text());
            $('#invToPhone').text($('#phone').val());
            $('#invToEmail').text($('#email').val());
            $('#invcDiscountPer, #invcDiscountVal, #invcTaxPer, #invcTaxVal, #invcPrevPaid, #InvcPaid, #invDue').text(0);
            $('table.inventory tbody tr').remove();
            if (invoiceType == 'typeMembership') {
                $.each(MembershipsCollection, function (i, memshipItem) {
                    var itemName, itemDesc, itemPrice;
                    $.each(allProgramsObject, function (i, mobj) {
                        if (mobj.ProgramID == memshipItem.ProgramID) {
                            itemName = mobj.ProgramName;
                            itemPrice = mobj.ProgramFees;
                        }
                    });
                    $("table.inventory").append(
                        '<tr><th hidden="hidden" scope="row">' + membershipID +
                        '</th><th hidden="hidden" scope="row">memship' +
                        '</th><td><span>' + itemName +
                        '</span></td><td><span data-prefix="">$</span><span>' + itemPrice +
                        '</span></td><td><span data-qty=""></span><span>1' +
                        '</span></td><td><span data-prefix="">$</span><span>' +
                        '</span></td></tr>');
                });
                $("table.inventory").append(
                    '<tr><th hidden="hidden" scope="row">ID</th>' +
                    '<th hidden="hidden" scope="row">item</th>' +
                    '<td style="background-color: white;"><a class="cut" style="' + styleCut + '">&#10060;</a><input type="text" placeholder="' + itemchoose + '" class="itemList" /><span></span></td>' +
                    '<td><span data-prefix="">$</span><span class="itemFees">0.00</span></td>' +
                    '<td><span data-qty=""></span><span contenteditable="true" class="tabable">1</span></td>' +
                    '<td><span data-prefix="">$</span><span>0.00</span></td></tr>');
                $('input.itemList').focus();
            }
            else if (invoiceType == 'typeItems') {
                if (allItemsObject.length == 0) {
                    swal({
                        title: alertWarningTitle,
                        text: alertWarningTextItems,
                        confirmButtonText: alertBtnText,
                        type: "warning"
                    });
                    isFromInvoice = true;
                    dialogItems();
                }
                $("table.inventory").append(
                    '<tr><th hidden="hidden" scope="row">ID</th>' +
                    '<th hidden="hidden" scope="row">item</th>' +
                    '<td style="background-color: white;"><a class="cut" style="' + styleCut + '">&#10060;</a><input type="text" placeholder="' + itemchoose + '" class="itemList" /><span></span></td>' +
                    '<td><span data-prefix="">$</span><span class="itemFees">0.00</span></td>' +
                    '<td><span data-qty=""></span><span contenteditable="true" class="tabable">1</span></td>' +
                    '<td><span data-prefix="">$</span><span>0.00</span></td></tr>');
                $('input.itemList').focus();
            }
            updateInvoice();
            convertLangAll(langgSite, 'tabInvoice');
            $('a.add, a.cut').show();
            $('a.refund').hide();
            $('#invcDiscountPer, #invcDiscountVal, #invcTaxPer, #invcTaxVal').prop('contenteditable', true);
            deferred.resolve();
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                }, function () {
                    setTimeout(function () {
                        swal(alertSendBugDone);
                    }, 2000);
                });
                console.log(xhr.responseText);
            }
        }
    });
    return deferred;
}
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

// fill invoice fields when its old to update payments:
function fillOldInvoice(id) {
    var deferred = new $.Deferred();
    $.ajax({
        url: apiURL + '/api/InvoiceAPI/GetAllInvoiceDetails/' + id,
        type: 'GET',
        dataType: "json",
        success: function (data) {
            contentType: "application/json";
            $('#invID').text(id);
            $('#invSerial').text(data.InvoiceSerial);
            var invDate = new Date(data.InvoiceDate);
            $('#invDateTime').text(fDate(invDate) + ' / ' + data.InvoiceTime);
            //$('#invDateTime').text(data.InvoiceDateTime);
            $('#invToName').text($('#memberName').text());
            $('#invToPhone').text($('#phone').val());
            $('#invToEmail').text($('#email').val());
            $('#invcDiscountPer, #invcDiscountVal, #invcTaxPer, #invcTaxVal, #invcPrevPaid, #InvcPaid, #invDue').text('0.00');
            (data.DiscountPercent == 0 ? $('#invcDiscountVal').text(data.DiscountValue) : $('#invcDiscountPer').text(data.DiscountPercent));
            (data.TaxPercent == 0 ? $('#invcTaxVal').text(data.TaxValue) : $('#invcTaxPer').text(data.TaxPercent));
            $('#invcPrevPaid').text(data.Paid);
            $('table.inventory tbody tr').remove();
            $.each(data.InvoiceItems, function (i, invItem) {
                var itemId, itemName;
                //Get Name of membership program:
                if (invItem.ItemID == null) {
                    itemId = invItem.MembershipID;
                    $.each(allProgramsObject, function (i, program) {
                        if (program.ProgramID == invItem.Membership.ProgramID) {
                            itemName = program.ProgramName;
                        }
                    });
                }
                else if (invItem.MembershipID == null) {
                    itemId = invItem.ItemID;
                    $.each(allItemsObject, function (i, item) {
                        if (item.ItemID == invItem.ItemID) {
                            itemName = item.ItemName;
                        }
                    });
                }

                $("table.inventory").append(
                    '<tr><th hidden="hidden" scope="row">' + itemId +
                    '</th><td><span>' + itemName +
                    '</span></td><td><span data-prefix="">$</span><span>' + invItem.Price +
                    '</span></td><td><span data-qty=""></span><span>' + invItem.Quantity +
                    '</span></td><td><span data-prefix="">$</span><span>' +
                    '</span></td></tr>');
            });
            updateInvoice();
            convertLangAll(langgSite, 'tabInvoice');
            if ($('#invDue').text() == '0.00') {
                $('#InvcPaid').removeAttr('contenteditable');
                $('#containerPaid').removeClass('btn-warning badge');
                $('#SubmitMembership').hide();
                $('#printMembership').text(PrintDataTable);
            }
            else {
                $('#InvcPaid').prop('contenteditable', true);
                $('#containerPaid').addClass('btn-warning badge');
                $('#SubmitMembership').show();
            }
            if (UserDTO.RoleTitle != 'Specialist') {
                $('a.add').hide();
                $('a.refund').show()
            }
            else {
                $('a.add, a.cut').show();
                $('a.refund').hide();
            }
            $('#invcDiscountPer, #invcDiscountVal, #invcTaxPer, #invcTaxVal').removeAttr('contenteditable');
            $("#tabsMember").tabs("enable", 3).tabs("option", "active", 3);
            deferred.resolve();
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                }, function () {
                    setTimeout(function () {
                        swal(alertSendBugDone);
                    }, 2000);
                });
                console.log(xhr.responseText);
            }
        }
    });
    return deferred;
}

// save invoice if its new or update old:
var IsNewInvoice = true;
function saveInvoice() {
    if ($('table.inventory tbody').find('input').length) {
        swal({
            title: alertWarningTitle,
            text: alertWarningTextItems,
            confirmButtonText: alertBtnText,
            type: "warning"
        });
        return false;
    }

    if (IsNewInvoice == true) {
        postNewInvoice();
    }
    else {
        if ($('#invDue').text() == '0.00' && $('#InvcPaid').text() == '0.00') {
            IsNewInvoice = true;
            return false;
        }
        updateOldInvoice();
    }
}

// Add New Invoice:
function postNewInvoice() {
    var postNewInvoiceSpinner = LoadSpinner.start();
    var ItemsCollection = [];

    $("table.inventory tbody tr").each(function () {
        if ($(this).find('th:eq(1)').text() == 'item') {
            var item = new Object();
            item.ItemID = $(this).find('th:eq(0)').text();
            item.MembershipID = null;
            item.InvoiceID = "00000000-0000-0000-0000-000000000000";
            item.Price = $(this).find('td:eq(1) span:last-child').text();
            item.Quantity = $(this).find('td:eq(2) span:last-child').text();
            item.DiscountPercent = null;
            item.DiscountValue = null;
            ItemsCollection.push(item);
        }
    });

    var InvoiceDetails = {
        InvoiceSerial: $('#invSerial').text(),
        InvoiceDate: null,
        InvoiceTime: null,
        InvoiceMemberships: MembershipsCollection,
        InvoiceItems: ItemsCollection,
        PartyID: memID,
        BranchID: UserDTO.BranchID,
        DiscountPercent: $('#invcDiscountPer').text(),
        DiscountValue: $('#invcDiscountVal').text(),
        TaxPercent: $('#invcTaxPer').text(),
        TaxValue: $('#invcTaxVal').text(),
        Paid: $('#InvcPaid').text(),
        NextPaymentDate: sDate($('#invNextPaid').val()),
        EditedBy: UserDTO.UserID
    };
    var t = JSON.stringify(InvoiceDetails);
    $.ajax({
        url: apiURL + '/api/InvoiceAPI/PostInvoice/',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: t,
        success: function (data) {
            memberShipID = data;
            $('#memDue').text(parseFloat($('#memDue').text()) + parseFloat($('#invDue').text()));
            GetMembershipsByMemberID(memID);
            GetAllMembers();
            resetMembershipTab();
            var defGetCalendarEvents = GetCalendarEvents();
            defGetCalendarEvents.then(GetAllInvoices());
            GetAllCheckins();
            LoadSpinner.stop(postNewInvoiceSpinner);
            if (invoiceWithPrint == true) {
                printInvoice();
                invoiceWithPrint = false;
            }
            $("#tabsMember").tabs("option", "disabled", [3]).tabs("option", "active", 4);
            swal({
                title: alertSuccessTitle,
                text: alertSuccessText,
                type: "success",
                timer: 2000,
                showConfirmButton: false
            });
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                LoadSpinner.stop(postNewInvoiceSpinner);
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                }, function () {
                    setTimeout(function () {
                        swal(alertSendBugDone);
                    }, 2000);
                });
                console.log(xhr.responseText);
            }
        }
    });
}

// update existing Invoice:
function updateOldInvoice() {
    var updateOldInvoiceSpinner = LoadSpinner.start();
    var InvoiceDetails = {
        InvoiceSerial: $('#invSerial').text(),
        InvoiceDate: null,
        InvoiceTime: null,
        InvoiceMemberships: [],
        InvoiceItems: [],
        PartyID: memID,
        BranchID: UserDTO.BranchID,
        DiscountPercent: $('#invcDiscountPer').text(),
        DiscountValue: $('#invcDiscountVal').text(),
        TaxPercent: $('#invcTaxPer').text(),
        TaxValue: $('#invcTaxVal').text(),
        Paid: $('#InvcPaid').text(),
        NextPaymentDate: sDate($('#invNextPaid').val()),
        EditedBy: UserDTO.UserID
    };
    var t = JSON.stringify(InvoiceDetails);
    var id = $('#invID').text();
    $.ajax({
        url: apiURL + '/api/InvoiceAPI/UpdateInvoice/' + id,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: t,
        success: function () {
            $('#memDue').text(parseFloat($('#memDue').text()) - parseFloat($('#InvcPaid').text()));
            GetMembershipsByMemberID(memID);
            GetAllMembers();
            var defGetCalendarEvents = GetCalendarEvents();
            defGetCalendarEvents.then(GetAllInvoices());
            LoadSpinner.stop(updateOldInvoiceSpinner);
            if (invoiceWithPrint == true) {
                printInvoice();
                invoiceWithPrint = false;
            }
            if (UserDTO.RoleTitle != 'Specialist') {
                $("#tabsMember").tabs("option", "active", 4).tabs("option", "disabled", [3]);
            }
            swal({
                title: alertSuccessTitle,
                text: alertSuccessText,
                type: "success",
                timer: 2000,
                showConfirmButton: false
            });
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                LoadSpinner.stop(updateOldInvoiceSpinner);
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                }, function () {
                    setTimeout(function () {
                        swal(alertSendBugDone);
                    }, 2000);
                });
                console.log(xhr.responseText);
            }
        }
    });
}

// print invoice with save it:
function printInvoice() {
    $('a.add').hide();
    if ($('table.inventory tbody').find('input').length) {
        return false;
    }
    var printStyle = $('#printBillmedia');
    printStyle.text(printBillStyle);
    window.print();
    printStyle.text('');
    $("#tabsMember").tabs("option", "active", 4).tabs("option", "disabled", [3]);
}

// refund invoice:
$('a.refund').click(function () {
    swal({
        title: alertDeleteTitle,
        text: alertDeleteItemText,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: alertBtnDeleteText,
        cancelButtonText: alertBtnCancelText,
        closeOnConfirm: false
    },
        function (isConfirm) {
            if (isConfirm) {
                var refundInvoiceSpinner = LoadSpinner.start();
                var invID = $('#invID').text();
                $.ajax({
                    url: apiURL + '/api/InvoiceAPI/RefundInvoice?invoiecId=' + invID + '&userUID=' + UserDTO.UserID,
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    success: function () {
                        GetMembershipsByMemberID(memID);
                        GetAllMembers();
                        var defGetCalendarEvents = GetCalendarEvents();
                        defGetCalendarEvents.then(GetAllInvoices());
                        $("#tabsMember").tabs("option", "active", 4).tabs("option", "disabled", [3]);
                        LoadSpinner.stop(refundInvoiceSpinner);
                        swal({
                            title: alertSuccessTitle,
                            text: alertSuccessText,
                            type: "success",
                            timer: 2000,
                            showConfirmButton: false
                        });
                    },
                    error: function (xhr) {
                        if (xhr.responseText == 'Session Expired') {
                            //window.location = 'Login.aspx';
                        }
                        else {
                            LoadSpinner.stop(refundInvoiceSpinner);
                            swal({
                                title: alertSendBugTitle,
                                text: alertSendBugText,
                                type: "input",
                                showCancelButton: true,
                                confirmButtonText: alertBtnBugText,
                                cancelButtonText: alertBtnCancelText,
                                closeOnConfirm: false,
                                showLoaderOnConfirm: true,
                            }, function () {
                                setTimeout(function () {
                                    swal(alertSendBugDone);
                                }, 2000);
                            });
                            console.log(xhr.responseText);
                        }
                    }
                });
            } else {
                return;
            }
        });
});

// goto invoice details from history table:
$(document).on('click', '#memHistory tbody tr td:not(:nth-last-child(1), :nth-last-child(2), :nth-last-child(3), :nth-last-child(4))', function () {
    var oldInvoiceSpinner = LoadSpinner.start();
    var invoiceid = $(this).closest('tr').find('th:eq(2)').text();
    var deffillOldInvoice = fillOldInvoice(invoiceid);
    deffillOldInvoice.then(function () { LoadSpinner.stop(oldInvoiceSpinner); IsNewInvoice = false; })
});

//Get All Invoices for report & notification grid:
var allInvoicesObject, filteredInvoicesObject;
var memberInvoice = false;
function GetAllInvoices() {
    var deferred = new $.Deferred();
    var unpaidMemships = 0;
    $.ajax({
        url: apiURL + '/api/InvoiceAPI/GetAllInvoices/' + UserDTO.CompanyID,
        type: "GET",
        dataType: "json",
        success: function (data) {
            contentType: "application/json";
            allInvoicesObject = data;
            $('#invByName, #invFrom,#invTo, #invByProg').val('');
            $('#invFrom,#invTo').datepicker("option", "minDate", "");
            $('#invFrom,#invTo').datepicker("option", "maxDate", "");
            $('#tblPayment tbody').remove();
            if (memberInvoice == true) {
                $("#invByName").val($('#memberName').text());
                var memberID = memID; // Global member id
                $.each(allInvoicesObject, function (i, mobj) {
                    if (mobj.PartyID == memberID) {
                        $("#tblPayment").append(
                            '<tr><th hidden="hidden">' + mobj.InvoiceID +
                            '</th><th hidden="hidden">' + mobj.PartyID +
                            '</td><td>' + mobj.InvoiceSerial +
                            '</th><td>' + mobj.PartyName +
                            '</td><td>' + fDate(mobj.InvoiceDate) +
                            '</td><td>$' + mobj.Total +
                            '</td><td>$' + mobj.Paid +
                            '</td><td>$' + (mobj.Total - mobj.Paid) +
                            '</td></tr>');
                    }
                });
                $("#invByName").focus();
                memberInvoice = false;
            }
            else {
                $("#currentMemberships").text(data.length);
                $.each(allInvoicesObject, function (i, mobj) {
                    if ((mobj.Total - mobj.Paid) > 0) {
                        unpaidMemships++;
                    }
                    $("#tblPayment").append(
                        '<tr><th hidden="hidden">' + mobj.InvoiceID +
                        '</th><th hidden="hidden">' + mobj.PartyID +
                        '</td><td>' + mobj.InvoiceSerial +
                        '</th><td>' + mobj.PartyName +
                        '</td><td>' + fDate(mobj.InvoiceDate) +
                        '</td><td>$' + mobj.Total +
                        '</td><td>$' + mobj.Paid +
                        '</td><td>$' + (mobj.Total - mobj.Paid) +
                        '</td></tr>');
                });
                $("#paidMemship").text(data.length - unpaidMemships);
                $("#unpaidMemship").text(unpaidMemships);
                $("#btnAllInvoices").focus();
            }
            reloadDataTablePayment();
            GetMembershipsEndingSoon();
            deferred.resolve();
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                LoadSpinner.stop(firstSpinner);
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                }, function () {
                    setTimeout(function () {
                        swal(alertSendBugDone);
                    }, 2000);
                });
                console.log(xhr.responseText);
            }
        }
    });
    return deferred;
}

// search in Invoices:
var filterInvoices = function () {
    var filterInvoicesSpinner = LoadSpinner.start();
    filteredInvoicesObject = allInvoicesObject.filter(function (invoiceObj) {
        return ($("#invByName").val() == '' ? true : invoiceObj.PartyName.toLowerCase().includes($("#invByName").val().toLowerCase())) &&
            ($('#invByProg').val() == '' ? true : $('#invByProg').val() == invoiceObj.ProgramID) &&
            ($('#invFrom').val() == '' ? true : new Date(sDate($('#invFrom').val())).setHours(0) <= new Date(invoiceObj.InvoiceDate).setHours(0)) &&
            ($('#invTo').val() == '' ? true : new Date(sDate($('#invTo').val())).setHours(0) >= new Date(invoiceObj.InvoiceDate).setHours(0))
    });
    $('#tblPayment tbody').remove();
    $.each(filteredInvoicesObject, function (i, mobj) {
        $("#tblPayment").append(
            '<tr><th hidden="hidden">' + mobj.InvoiceID +
            '</th><th hidden="hidden">' + mobj.PartyID +
            '</td><td>' + mobj.InvoiceSerial +
            '</th><td>' + mobj.PartyName +
            '</td><td>' + fDate(mobj.InvoiceDate) +
            '</td><td>$' + mobj.Total +
            '</td><td>$' + mobj.Paid +
            '</td><td>$' + (mobj.Total - mobj.Paid) +
            '</td></tr>');
    });
    reloadDataTablePayment();
    LoadSpinner.stop(filterInvoicesSpinner);
}
$("#invByName").keyup(filterInvoices);
$('#invByProg').change(filterInvoices);
$('#invFrom').change(filterInvoices);
$('#invTo').change(filterInvoices);
// handle from date and to date together:
$(function () {
    $("#invFrom").on("change", function () {
        $("#invTo").datepicker("option", "minDate", $(this).val());
    });
    $("#invTo").on("change", function () {
        $("#invFrom").datepicker("option", "maxDate", $(this).val());
    });
});

// Get payments for Time line report
function drawChartTimeLinePays() {
    $.ajax({
        url: apiURL + '/api/InvoiceAPI/CashFlowChart/' + UserDTO.CompanyID,
        type: "GET",
        dataType: "json",
        success: function (data) {
            contentType: "application/json";

            var recentYear = new Date().getFullYear();
            var prevYear = new Date().getFullYear() - 1;

            var dataChart = new google.visualization.DataTable();
            dataChart.addColumn('date', 'Month');
            dataChart.addColumn('number', prevYear);
            dataChart.addColumn({ type: 'string', role: 'tooltip' });
            dataChart.addColumn('number', recentYear);
            dataChart.addColumn({ type: 'string', role: 'tooltip' });

            $.each(data, function (i, mobj) {
                dataChart.addRow([new Date('2017-' + mobj.MonthOfYear), mobj.TotalPrevPay, titlePaymentsTimeLine + ': ' + mobj.TotalPrevPay, mobj.TotalCurrentPay, titlePaymentsTimeLine + ': ' + mobj.TotalCurrentPay]);
            });

            var dateTicks = [];
            for (var m = 1; m <= 12; m++)
                dateTicks.push(new Date('2017-' + m));

            // Set chart options
            var options = {
                'title': titleChartTimeLine,
                titleTextStyle: { fontSize: 18 },
                vAxis: {
                    gridlines: { count: -1 },
                    titleTextStyle: { fontSize: 16 }
                },
                hAxis: {
                    format: 'MMMM',
                    ticks: dateTicks
                },
                pointSize: 10
            };

            // Instantiate and draw our chart, passing in some options.
            var chart = new google.visualization.LineChart(document.getElementById('chartTimeLine'));

            chart.draw(dataChart, options);

            // save image by download btn:
            var btnDownload = document.getElementById('saveChartTimeLine');
            btnDownload.href = chart.getImageURI();
            btnDownload.download = fileNameTimeLineChart + '.png';
            LoadSpinner.stop(drawChartTimeLineSpinner);
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                LoadSpinner.stop(drawChartTimeLineSpinner);
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                }, function () {
                    setTimeout(function () {
                        swal(alertSendBugDone);
                    }, 2000);
                });
                console.log(xhr.responseText);
            }
        }
    });
}


/* ------------------Items Actions------------------*/
//Get All Items:
var allItemsObject, extraItems = [];
function GetAllItems() {
    var deferred = new $.Deferred();
    $.ajax({
        url: apiURL + '/api/ItemAPI/GetAllItems/' + UserDTO.BranchID,
        type: "GET",
        dataType: "json",
        success: function (data) {
            allItemsObject = data;
            contentType: "application/json";
            $('#itemsGrid tbody tr').remove();
            extraItems.length = 0;
            $.each(allItemsObject, function (i, mobj) {
                var item = new Object();
                item.value = mobj.ItemID;
                item.label = mobj.ItemName;
                item.price = mobj.Price;
                extraItems.push(item);

                $("#itemsGrid").append(
                    '<tr><th hidden="hidden">' + mobj.ItemID +
                    '</th><td>' + mobj.ItemName +
                    '</td><td>' + mobj.Price +
                    '</td><td>' +
                    '<a href="#" class="btn btn-primary btn-success" data-toggle="tooltip" data-placement="top" title="' + tooltipEdit + '"><span class="glyphicon glyphicon-pencil"></span></a>' +
                    '<a href="#" class="btn btn-primary btn-danger" data-toggle="tooltip" data-placement="top" title="' + tooltipDelete + '"><span class="glyphicon glyphicon-trash"></span></a></td></tr>');
            });
            //if without existing items
            if ($("#itemsGrid > tbody > tr").length == 0) {
                $("#tabsItems").tabs("option", "active", 0).tabs("option", "disabled", [1]);
            }
            else {
                $("#tabsItems").tabs("enable", 1).tabs("option", "active", 1);
            }
            deferred.resolve();
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                }, function () {
                    setTimeout(function () {
                        swal(alertSendBugDone);
                    }, 2000);
                });
                console.log(xhr.responseText);
            }
        }
    });
    return deferred;
}
// autocomplete for items in invoice form:
$(function () {
    $(document).on("keydown.autocomplete", "input.itemList", function (e) {
        $(this).autocomplete({
            minLength: 0,
            source: extraItems,
            focus: function (event, ui) {
                $(this).val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                $(this).closest('tr').remove();
                $("table.inventory").append(
                    '<tr><th hidden="hidden" scope="row">' + ui.item.value +
                    '</th><th hidden="hidden" scope="row">item' +
                    '</th><td><a class="cut" style="' + styleCut + '">&#10060;</a><span>' + ui.item.label +
                    '</span></td><td><span data-prefix="">$</span><span>' + ui.item.price +
                    '<td><span data-qty=""></span><span contenteditable="true" class="tabable">1</span></td>' +
                    '</span></td><td><span data-prefix="">$</span><span>' +
                    '</span></td></tr>');
                updateInvoice();
                return false;
            }
        })
            .data("ui-autocomplete")._renderItem = function (ul, item) {
                return $("<li></li>")
                    .data("item.autocomplete", item)
                    .append("<a><b>" + item.label + "</b><i>  -  $" + item.price + "</i></a>")
                    .appendTo(ul);
            };
    });


    $(document).on("click.autocomplete", "input.itemList", function (e) {
        $(this).trigger('keydown').trigger('keydown');
    });
});

//Add new Item:
function addNewItem() {
    var addNewItemSpinner = LoadSpinner.start();
    var itemName = $('#itemName').val();
    var itemFee = $('#itemPrice').val();
    var itemNote = $('#itemNote').val();
    var itemDetails = { ItemName: itemName, Price: itemFee, BranchID: UserDTO.BranchID, IsDeleted: false, EditDate: null, EditedBy: UserDTO.UserID };
    var t = JSON.stringify(itemDetails);
    $.ajax({
        url: apiURL + '/api/ItemAPI/PostItem/',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: t,
        success: function () {
            var defGetAllItems = GetAllItems();
            defGetAllItems.then(function () { LoadSpinner.stop(addNewItemSpinner); })
            swal({
                title: alertSuccessTitle,
                text: alertSuccessText,
                type: "success",
                timer: 2000,
                showConfirmButton: false
            });
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                LoadSpinner.stop(addNewItemSpinner);
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                }, function () {
                    setTimeout(function () {
                        swal(alertSendBugDone);
                    }, 2000);
                });
                console.log(xhr.responseText);
            }
        }
    });
}

// Update item:
var itemUID;
$(document).on('click', '#itemsGrid tbody tr td a[class~=btn-success]', function () {
    var fillOldItemSpinner = LoadSpinner.start();
    itemUID = $(this).closest('tr').find('th[hidden=hidden]').text();
    $.each(allItemsObject, function (i, mobj) {
        if (mobj.ItemID == itemUID) {
            $('#itemName').val(mobj.ItemName);
            $('#itemPrice').val(mobj.Price);
            $('#itemNote').val('');
        }
    });
    $('#tabsItems ul:first li:eq(0) a').text(tabEditItem);
    $("#tabsItems").tabs("option", "active", 0);
    checkNewItem = false;
    LoadSpinner.stop(fillOldItemSpinner);
});
function updateItem() {
    var updateItemSpinner = LoadSpinner.start();
    var itemName = $('#itemName').val();
    var itemFee = $('#itemPrice').val();
    var itemNote = $('#itemNote').val();
    var itemDetails = { ItemID: itemUID, ItemName: itemName, Price: itemFee, EditedBy: UserDTO.UserID };
    var t = JSON.stringify(itemDetails);
    $.ajax({
        url: apiURL + '/api/ItemAPI/UpdateItem/',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: t,
        success: function () {
            $('#tabsItems ul:first li:eq(0) a').text(tabAddItem);
            var defGetAllItems = GetAllItems();
            defGetAllItems.then(function () { LoadSpinner.stop(updateItemSpinner); })
            swal({
                title: alertSuccessTitle,
                text: alertSuccessText,
                type: "success",
                timer: 2000,
                showConfirmButton: false
            });
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                LoadSpinner.stop(updateItemSpinner);
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                }, function () {
                    setTimeout(function () {
                        swal(alertSendBugDone);
                    }, 2000);
                });
                console.log(xhr.responseText);
            }
        }
    });
}

// Delete item:
$(document).on('click', '#itemsGrid tbody tr td a[class~=btn-danger]', function () {
    var itemID = $(this).closest('tr').find('th[hidden=hidden]').text();
    swal({
        title: alertDeleteTitle,
        text: alertDeleteItemText,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: alertBtnDeleteText,
        cancelButtonText: alertBtnCancelText,
        closeOnConfirm: false
    },
        function (isConfirm) {
            if (isConfirm) {
                var deleteItemSpinner = LoadSpinner.start();
                $.ajax({
                    type: "GET",
                    url: apiURL + '/api/ItemAPI/DeleteItem?itemID=' + itemID + '&userUID=' + UserDTO.UserID,
                    success: function () {
                        var defGetAllItems = GetAllItems();
                        defGetAllItems.then(function () { LoadSpinner.stop(deleteItemSpinner); })
                        swal({
                            title: alertDeletedTitle,
                            text: alertDeletedItemText,
                            type: "success",
                            timer: 2000,
                            showConfirmButton: false
                        });
                    },
                    error: function (xhr) {
                        if (xhr.responseText == 'Session Expired') {
                            //window.location = 'Login.aspx';
                        }
                        else {
                            LoadSpinner.stop(deleteItemSpinner);
                            swal({
                                title: alertSendBugTitle,
                                text: alertSendBugText,
                                type: "input",
                                showCancelButton: true,
                                confirmButtonText: alertBtnBugText,
                                cancelButtonText: alertBtnCancelText,
                                closeOnConfirm: false,
                                showLoaderOnConfirm: true,
                            }, function () {
                                setTimeout(function () {
                                    swal(alertSendBugDone);
                                }, 2000);
                            });
                            console.log(xhr.responseText);
                        }
                    }
                });
            } else {
                return;
            }
        });
});


/* ------------------Branch Actions------------------*/
//Get Branches list:
function getBranchs() {
    var deferred = new $.Deferred();
    $.ajax({
        url: apiURL + '/api/BranchAPI/GetAllBranches/' + UserDTO.CompanyID,
        type: 'GET',
        success: function (data) {
            contentType: "application/json; charset=utf-8";
            //fill branches list to comboBoxes .....
            $('#StaffBranch option').remove();
            $('#StaffBranch2 option').not(':eq(0), :selected').remove();
            $.each(data, function (i, value) {
                $('#StaffBranch').append($('<option>').text(value.branchTitle).attr('value', value.BranchID));
                $('#StaffBranch2').append($('<option>').text(value.branchTitle).attr('value', value.BranchID));
            });
            deferred.resolve();
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                }, function () {
                    setTimeout(function () {
                        swal(alertSendBugDone);
                    }, 2000);
                });
                console.log(xhr.responseText);
            }
        }
    });
    return deferred;
}

// Get Defults settings:
function getDefaultsSettings() {
    $.ajax({
        url: apiURL + '/api/BranchAPI/GetBranchPolicy/' + UserDTO.BranchID,
        type: 'GET',
        success: function (data) {
            contentType: "application/json; charset=utf-8";
            if (data.OpeningHour != "") {
                var workTimeFrom = data.OpeningHour.split(':');
                $('#startWork2').val(addZero(workTimeFrom[0]) + ':' + addZero(workTimeFrom[1]));
            }
            if (data.ClosureHour != "") {
                var workTimeTo = data.ClosureHour.split(':');
                $('#endWork2').val(addZero(workTimeTo[0]) + ':' + addZero(workTimeTo[1]));
            }
            if (data.Logo == null) {
                $('#image-preview3').css('background-image', 'url(/Images/logo.png)');
            }
            else {
                $('#image-preview3').css('background-image', 'url(' + data.Logo.substring(1) + ')');
            }

        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                }, function () {
                    setTimeout(function () {
                        swal(alertSendBugDone);
                    }, 2000);
                });
                console.log(xhr.responseText);
            }
        }
    });
}


// set Openning hours:
function saveWorkingHours(fromTime, toTime) {
    var branchSettings = {
        BranchID: UserDTO.BranchID,
        OpeningHour: (fromTime == '' ? null : fromTime),
        ClosureHour: (toTime == '' ? null : toTime),
        EditedBy: UserDTO.UserID
    };
    var t = JSON.stringify(branchSettings);
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: t,
        url: apiURL + '/api/BranchAPI/PostBranchPolicy',
        success: function () {
            swal({
                title: alertSuccessTitle,
                text: alertSuccessText,
                type: "success",
                timer: 2000,
                showConfirmButton: false
            });
        },
        error: function (xhr) {
            if (xhr.responseText == 'Session Expired') {
                //window.location = 'Login.aspx';
            }
            else {
                swal({
                    title: alertSendBugTitle,
                    text: alertSendBugText,
                    type: "input",
                    showCancelButton: true,
                    confirmButtonText: alertBtnBugText,
                    cancelButtonText: alertBtnCancelText,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                }, function () {
                    setTimeout(function () {
                        swal(alertSendBugDone);
                    }, 2000);
                });
                console.log(xhr.responseText);
            }
        }
    });
}