var alertSuccessTitle = 'Done!';
var alertSuccessText = 'Saved new Changes!';
var alertErrorTitle = 'Wrong!'
var alertErrorText = 'Old password is Uncorrect!';
var alertBtnText = 'OK';
var txt_Subscription = 'Subscription in';
var txt_EndAfter = 'ends after';
var txt_Day = ' Day';
var txt_Visit = ' Visit';
var txt_InvoiceNo = 'Invoice No.';
var txt_NeedToPay = 'need to paid balance due:';
var txt_on = 'on';
var txt_Dated = 'dated';

var userUID, subscriptionsObject;
var apiURL = (location.hostname.indexOf('marchesuite.com') != -1 ? 'http://marchesuite.com/sms' : '');

// Once the page is fully loaded, stop spinning
$(window).load(function () { LoadSpinner.stop(firstSpinner); });

// Get Login User details:
$(document).ready(function () {
    function getUserDetails() {
        var spinner = LoadSpinner.start();
        //UID get from sign in..
        userUID = $("#userUID").val();
        $.ajax({
            type: 'GET',
            url: apiURL + '/api/UserAPI/GetClientSummary/' + userUID,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                ClientDTO = data;
                subscriptionsObject = ClientDTO.SubscriptionsObject;

                $("#accordion div.panel-default:eq(0)").hide();
                $("#accordion div.panel-default:eq(2)").hide();

                $('#company').text(ClientDTO.CompanyName);
                $('#owner').text(ClientDTO.PartyName);
                $('#ownerEmail').text(ClientDTO.UserEmail);                
                if (ClientDTO.LanguageID == 1) {
                    $("#en").click();
                }
                else if (ClientDTO.LanguageID == 2) {
                    $("#ar-sa").click();
                }
                else if (ClientDTO.LanguageID == 3) {
                    $("#en-gb").click();
                }
                //GetMembershipsEndingSoon(subscriptionsObject);                
            },
            error: function (xhr) {
                alert(xhr.responseText);
            }
        });
        LoadSpinner.stop(spinner);
    }
    getUserDetails();
});

// Update Client Password on left slider:
function UpdatePassAcc() {
    var spinner = LoadSpinner.start();
    var oldPassword = $('#oldPass').val();
    var newPassord = $('#newPass').val();
    var passowrdDetails = { UserID: userUID, OldPassword: oldPassword, NewPassword: newPassord };
    var t = JSON.stringify(passowrdDetails);
    $.ajax({
        url: apiURL + '/api/UserApi/UpdateUserPass/',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: t,
        dataType: "json",
        success: function (data) {
            LoadSpinner.stop(spinner);
            if (data == true) {
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
                swal({
                    title: alertErrorTitle,
                    text: alertErrorText,
                    type: "error"
                });
            }
        },
        error: function (data) {
            //alert('Problem in Updating User:' + data.responseText);
        }
    });
}

// Set language:
function setLanguage(langID) {
    var spinner = LoadSpinner.start();
    $.ajax({
        type: "GET",
        url: apiURL + '/api/UserApi/setLanguage?userID=' + userUID + '&langID=' + langID,
        success: function () {
            LoadSpinner.stop(spinner);
            $("#dialogMetaData #doneLang").css("visibility", "visible");
        },
        error: function (xhr) {
            alert(xhr.responseText);
        }
    });
}

//Get all Memberships & invoices for notification Grid:
function GetMembershipsEndingSoon(allMembershipsEndingObject) {
    $('#endSubs tbody').remove();
    $("#endSubs").append('<tbody></tbody>');
    $.each(allMembershipsEndingObject, function (i, mobj) {
        if (mobj.RemainingDay != null && mobj.IsRenewal == true) {
            if (mobj.ProgramBasis == 'openProgram') {
                $("#endSubs").append(
                    '<tr><th hidden="hidden">' + mobj.PartyID +
                    '</th><th hidden="hidden">' + mobj.MembershipID +
                    '</th><th hidden="hidden">' + '' +
                    '</td><td><span>' + txt_Subscription + '<b> ' + mobj.ProgramName + ' </b>' + txt_EndAfter + '<b> ' + mobj.RemainingDay + txt_Day + '</b></span>' +
                    '</td></tr>');
            }
            if (mobj.ProgramBasis == 'fixedProgram') {
                $("#endSubs").append(
                    '<tr><th hidden="hidden">' + mobj.PartyID +
                    '</th><th hidden="hidden">' + mobj.MembershipID +
                    '</th><th hidden="hidden">' + '' +
                    '</td><td><span>' + txt_Subscription + '<b> ' + mobj.ProgramName + ' </b>' + txt_EndAfter + '<b> ' + mobj.RemainingDay + txt_Day + '</b></span>' +
                    '</td></tr>');
            }
        }
        var remainingVisits = mobj.BookedVisits - mobj.UsedVisits
        if (mobj.BookedVisits != null && mobj.IsRenewal == true) {
            $("#endSubs").append(
                '<tr><th hidden="hidden">' + mobj.PartyID +
                '</th><th hidden="hidden">' + mobj.MembershipID +
                '</th><th hidden="hidden">' + '' +
                '</td><td><span>' + txt_Subscription + '<b> ' + mobj.ProgramName + ' </b>' + txt_EndAfter + '<b> ' + remainingVisits + txt_Visit + '</b></span>' +
                '</td></tr>');
        }        
    });
}