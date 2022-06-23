var memID;
var titleMemSave = 'Member Details Saved!';
var textMemSave = 'Will go to Membership details ..';
var titleMemshipSave = 'Done!';
var textMemshipSave = 'Added new Membership!';

function dialogMember(id, clickRenew) {
    memID = id;
    if (id == null) {
        //if new member
        $("#tabsMember").tabs("option", "active", 0).tabs("option", "disabled", [1, 2, 3, 4]);
        $('#btnAccount, #btnInvoice').prop('disabled', true);
        $('#memberJoining').text('');
    }
    else {
        var dialogMemberSpinner = LoadSpinner.start();
        $('#btnAccount').prop('disabled', false);
        GetMemberByID(id, function (membershipsCount) {
            //if member without membership
            if (membershipsCount == 0) {
                $("#tabsMember").tabs("enable", 1).tabs("option", "active", 1).tabs("option", "disabled", [2, 3, 4]);
                $('#memberDesc').text(noMemberships);
                $('#memberJoining').text('');
                LoadSpinner.stop(dialogMemberSpinner);
            }
            //member with membership
            else {
                var defGetMembershipsByMemberID = GetMembershipsByMemberID(id, clickRenew);
                defGetMembershipsByMemberID.then(function () {
                    if (gotoInvoice == true) {
                        $("#tabsMember").tabs("enable", 3).tabs("option", "active", 3).tabs("option", "disabled", [2]);
                        gotoInvoice = false;
                    }
                    else if (toRenew == true) {
                        $("#tabsMember").tabs("option", "active", 1);
                        toRenew = false;
                    }
                    else {
                        $("#tabsMember").tabs("enable", 1).tabs("enable", 4).tabs("option", "active", 4).tabs("option", "disabled", [2, 3]);
                    }
                    LoadSpinner.stop(dialogMemberSpinner);
                });
            }
        });
    }

    $("#dialog-form").dialog({
        autoOpen: false,
        width: 'auto',
        modal: true,
        resizable: false,
        dialogClass: 'no-close success-dialog',
        position: { my: 'left top', at: 'left+50 top+20' },
        show: {
            effect: "fade",
            duration: 500,
        },
        hide: {
            effect: "fade",
            duration: 500
        },
        close: function (event, ui) {
            //reset all dialog .. 
            memberShipID = null;
            $('#memberName').text('New Member');
            $('#memberDesc, #memberTotalDues').text('');
            resetMemberTab();
            resetMembershipTab();
            allMembershipsObject = null;
        }
    });

    var divSetting = $('.sliderSetting');
    console.log(divSetting.css('left'));
    if (divSetting.css('left') === '-255px') {

    } else {
        $('.panel-collapse.in')
            .collapse('hide');
        $('.sliderSetting').animate({
            left: '-255px'
        });
    }

    var divLang = $('.switcherLang');
    console.log(divLang.css('left'));
    if (divLang.css('left') === '-270px') {

    } else {
        $('.switcherLang').animate({
            left: '-270px'
        });
    }
    //Select img for member in dialog:
    $.uploadPreview({
        input_field: "#image-upload",
        preview_box: "#image-preview",
        label_field: "#image-label"
    });

    GetAllCheckins();
    getDivisons();
    GetAllProgrammes();
    GetAllItems();
    GetAllStaffUsers();
    convertLangAll(langgSite, 'dialogMem');
    $("#dialog-form").dialog("open");
}
function resetMemberTab() {
    $('#frmMember').data('bootstrapValidator').resetForm(true);
    $('#frmMember input').val('');
    $('#image-preview').css('background-image', 'url(../Images/uploadPhoto.png)');
    $('#btnMale,#btnFemale').removeClass('active');
}
function resetMembershipTab() {
    var bootstrapValidator = $('#frmMembership').data('bootstrapValidator');
    bootstrapValidator.enableFieldValidators('startfixed2', true);
    $('#frmMembership').data('bootstrapValidator').resetForm(true);
    $('#frmMembership input').not(':input[type=checkbox]').val('');
    $('#noteProg2').text('');
    $("#division").val($("#division option:eq(0)").val());
    $("#specalistMem").val($("#specalistMem option:eq(0)").val());
    $('.progs2').hide();
    $('#progDesc, #progDaysSubs, #progTimes2, #progTimeFrom, #progTimeTo, #progValidPeriod, #progCapacityy').show();
    $("#progDaysSubs input[type=checkbox]").prop('checked', false);
    $('#startfixed2, #endOpen').val('');
    $("#startfixed2").datepicker("option", "minDate", null).datepicker("option", "maxDate", null);
    $("#div1Mems").removeClass('fullwidth');
}

// Show spacefic div when select Program in membership tab:
var progLen, progUnit;
$(function () {
    $('.progs2').hide();
    $('#basis2').change(function () {
        $('#previewPackage2').empty();
        $('#progDesc, #progDaysSubs, #progTimes2, #progTimeFrom, #progTimeTo, #progValidPeriod, #progCapacityy').show();
        $('#startfixed2, #endOpen').val('');
        $("#startfixed2").datepicker("option", "minDate", null).datepicker("option", "maxDate", null).datepicker("refresh");;
        $("#progDaysSubs input[type=checkbox]").prop('checked', false);
        var progType = $('#basis2').find(':selected').data("basis");
        var progFees = $('#basis2').find(':selected').data("fees");
        var progDesc = $('#basis2').find(':selected').data("desc");
        var progDays = '' + $('#basis2').find(':selected').data("days");
        var progTimeFrom = $('#basis2').find(':selected').data("timefrom");
        var progTimeTo = $('#basis2').find(':selected').data("timeto");
        var progValidPeriod = $('#basis2').find(':selected').data("validDays");
        var progCapacity = $('#basis2').find(':selected').data("capacity");
        $('#totalPrice,#remaining').val(progFees);
        (progDesc == null ? $('#progDesc').hide() : $('#noteProg2').text(progDesc));
        (progValidPeriod == null ? $('#progValidPeriod').hide() : $('#progValidDays2').val(progValidPeriod));
        if (progDays != "undefined") {
            var allDays = progDays.split(',');
            for (var i in allDays) {
                var dayValue = allDays[i]
                $('#progDaysSubs input[value="' + dayValue + '"]').prop('checked', true);
            }
        } else { $('#progDaysSubs').hide() }
        if (progTimeFrom == '' && progTimeTo == '') {
            $('#progTimes2').hide();
        }
        else {
            if (progTimeFrom != '') {
                var progTimeFromm = progTimeFrom.split(':');
                $('#startTime2').val(addZero(progTimeFromm[0]) + ':' + addZero(progTimeFromm[1]));
            } else { $('#progTimeFrom').hide(); }
            if (progTimeTo != '') {
                var progTimeToo = progTimeTo.split(':');
                $('#endTime2').val(addZero(progTimeToo[0]) + ':' + addZero(progTimeToo[1]));
            } else { $('#progTimeTo').hide(); }
        }
        if (progCapacity != null) {
            $('#progCapacity2').val(progCapacity);
            checkProgramCapacity($(this).val());
        } else { $('#progCapacityy').hide() }
        ($("#div2Mems > div:visible").length === 0 ? $("#div1Mems").addClass('fullwidth') : $("#div1Mems").removeClass('fullwidth'))
        $('.progs2').hide();
        $("#div1Mems").find("[data-basis='" + progType + "']").show();
        var bootstrapValidator = $('#frmMembership').data('bootstrapValidator');
        switch (progType) {
            case "fixedProgram":
                var progStart = $('#basis2').find(':selected').data("start");
                var progEnd = $('#basis2').find(':selected').data("end");
                $('#periodFrom').val(progStart);
                $('#periodTo').val(progEnd);
                $("#startfixed2").datepicker("option", "minDate", progStart)
                    .datepicker("option", "maxDate", progEnd);
                checkMemberInProgram($(this).val());
                break;
            case 'oneVisit':
                $('#totalVisit11').val('1');
                $("#startfixed2").datepicker("option", "minDate", null)
                    .datepicker("option", "maxDate", null);
                bootstrapValidator.enableFieldValidators('totalVisit11', true);
                break;
            case "multiVisits":
                var progVisits = $('#basis2').find(':selected').data("visits");
                $('#totalVisit2').val(progVisits);
                $("#startfixed2").datepicker("option", "minDate", null)
                    .datepicker("option", "maxDate", null);
                bootstrapValidator.enableFieldValidators('totalVisit11', false);
                break;
            case "openProgram":
                progLen = $('#basis2').find(':selected').data("length");
                progUnit = $('#basis2').find(':selected').data("unit");
                $("#startfixed2").datepicker("option", "minDate", null)
                    .datepicker("option", "maxDate", null);
                setStartDateMembership($(this).val());
                // continue case "openProgram" in startfixed2.datepicker onSelect event >>
                break;
            case "Package":
                $.each(allProgramsObject, function (i, mobj) {
                    if (mobj.ProgramID == $('#basis2').val()) {
                        $.each(mobj.ProgramPackages, function (i, itemPack) {
                            var progPackName;
                            $.each(allProgramsObject, function (i, mobj) {
                                if (mobj.ProgramID == itemPack.ChildProgramId)
                                { progPackName = mobj.ProgramName }
                            })
                            $("#previewPackage2").append('<li id="' + itemPack.ChildProgramId + '" data-count="' + itemPack.ChildVisitsCount + '" data-fees="' + itemPack.ChildProgramFees + '">' + progPackName + ' , ' + itemPack.ChildVisitsCount + ' Visits</li>');
                        });
                    }
                });
                break;
        }
        var divProg = $('#basis2 option:selected').data('div');
        $("#division").val(divProg);
        $('#division option[value="' + divProg + '"]').attr('selected', 'selected');
        $("#specalistMem > option").each(function () {
            if (this.getAttribute('data-div') != divProg) {
                $(this).hide();
            }
            else $(this).show();
        });
    });
    // show/hide time when visits greater one:
    $('#totalVisit11').keyup(function () {
        if ($(this).val() != 1) {
            $('#oneVisitData').hide();
            bootstrapValidator.enableFieldValidators('startTimeOneVisit', false);
        }
        else {
            $('#oneVisitData').show();
            bootstrapValidator.enableFieldValidators('startTimeOneVisit', true);
        }
    });
});

$('#birthDate').change(function () {
    if ($(this).val() != "") {
        $('#frmMember').bootstrapValidator('updateOption', 'birthDate', 'date', 'format', dateFormatValidation);
    }
});

// change end date when text changed
$('#startfixed2').change(function () {
    var fullDate = $('#startfixed2').datepicker('getDate');
    switch (progUnit) {
        case 'Day':
            fullDate.setDate(fullDate.getDate() + progLen - 1);
            $('#endOpen').datepicker('setDate', fullDate);
            break;
        case 'Month':
            fullDate.setMonth(fullDate.getMonth() + progLen);
            fullDate.setDate(fullDate.getDate() - 1);
            $('#endOpen').datepicker('setDate', fullDate);
            break;
        case 'Year':
            fullDate.setFullYear(fullDate.getFullYear() + progLen);
            fullDate.setDate(fullDate.getDate() - 1);
            $('#endOpen').datepicker('setDate', fullDate);
            break;
    }
});

// check duplicate Subscriptions
$(function () {
    $('#startfixed2').datepicker({
        yearRange: '1910:' + (new Date().getFullYear() + 3),
        changeMonth: true,
        changeYear: true,
        dateFormat: dateFormatSite,
        onSelect: function (dateText) {
            checkDuplicateMembership($('#basis2').val(), $(this).datepicker("getDate"));
            // change end date when select from datepicker
            var fullDate = $('#startfixed2').datepicker('getDate');
            switch (progUnit) {
                case 'Day':
                    fullDate.setDate(fullDate.getDate() + progLen - 1);
                    $('#endOpen').datepicker('setDate', fullDate);
                    break;
                case 'Month':
                    fullDate.setMonth(fullDate.getMonth() + progLen);
                    fullDate.setDate(fullDate.getDate() - 1);
                    $('#endOpen').datepicker('setDate', fullDate);
                    break;
                case 'Year':
                    fullDate.setFullYear(fullDate.getFullYear() + progLen);
                    fullDate.setDate(fullDate.getDate() - 1);
                    $('#endOpen').datepicker('setDate', fullDate);
                    break;
            }
            // update date validation:
            if ($(this).val() != "") {
                $('#frmMembership').bootstrapValidator('updateStatus', 'startfixed2', 'VALID', 'notEmpty');
                $('#frmMembership').bootstrapValidator('updateOption', 'startfixed2', 'date', 'format', dateFormatValidation);
            }
            else {
                $('#frmMembership').bootstrapValidator('updateStatus', 'startfixed2', 'INVALID ', 'notEmpty');
            }
            // check count of reservation for same specialist:
            var reservations = AllCheckinsObj.filter(function (checkinObj) {
                return new Date(checkinObj.ReservationDate).setHours(0) == new Date($('#startfixed2').datepicker('getDate')).setHours(0)
                    && checkinObj.Specialist == $('#specalistMem').find(':selected').val()
            });
            $('#prevBooked').val(reservations.length + 1);
        }
    });
});

//open dialog from  notification grid:
var gotoInvoice = false;
$(document).on('click', '#endSubs tbody tr td:not(:last-child), #endSubs tbody tr .tdInvDue button[class~=btn-success]', function () {
    if ($('#endSubs tbody tr').attr('role') == 'row') {
        GetAllProgrammes();
        GetAllItems();
        var id = $(this).closest('tr').find('th:eq(0)').text();
        var invId = $(this).closest('tr').find('th:eq(2)').text();
        if (id != '') {
            if (invId != '') {
                gotoInvoice = true;
            }
            dialogMember(id);
            if (gotoInvoice == true) {
                IsNewInvoice = false;
                fillOldInvoice(invId);
            }
        }
    }
});

//open dialog from  invoices report:
$(document).on('click', '#tblPayment tbody tr', function () {
    if ($('#tblPayment tbody tr').attr('role') == 'row') {
        var invId = $(this).find('th:eq(0)').text();
        var id = $(this).find('th:eq(1)').text();
        gotoInvoice = true;
        dialogMember(id);
        IsNewInvoice = false;
        fillOldInvoice(invId);
    }
});

//open dialog from  members report:
$(document).on('click', '#tblReportmem tbody tr', function () {
    var id = $(this).find('th:eq(0)').text();
    dialogMember(id);
});

//open dialog from  event members dialog (calendar) to list of memberships:
$(document).on('click', '#eventMembers tbody tr a.btn-link', function () {
    var id = $(this).closest('tr').find('th:eq(0)').text();
    dialogMember(id);
});

//open dialog from  event members dialog (calendar) to add new membership:
$(document).on('click', '#eventMembers tbody tr .btn-default', function () {
    var id = $(this).closest('tr').find('th:eq(0)').text();
    toRenew = true
    dialogMember(id);
});

// save invoice without printing:
var invoiceWithPrint = false;
$(document).on('click', '#SubmitMembership', function () {
    saveInvoice();
});

// save invoice with printing:
$(document).on('click', '#printMembership', function () {
    invoiceWithPrint = true;
    saveInvoice();
});

//Open the tabs including dialog:
$(function () {
    $("#tabsMember").tabs();
});

//change things when shift tabs:
$('#tabsMember').on('tabsbeforeactivate', function (event, ui) {
    var oldTab = ui.oldTab.index();
    var newTab = ui.newTab.index();

    // leave membership tab
    if (oldTab == 1) {
        resetMembershipTab();
        IsNewInvoice = true;
        if (newTab != 3) {
            MembershipsCollection = [];
        }
    };

    // leave visits tab
    if (oldTab == 2) {
        if (newTab != 3) {
            $("#tabsMember").tabs("option", "disabled", [2, 3]);
        }
        else $("#tabsMember").tabs("option", "disabled", [2]);
    };

    //leave invoice tab
    if (oldTab == 3) {
        MembershipsCollection = [];
        if (newTab != 2) {
            $("#tabsMember").tabs("option", "disabled", [2, 3]);
        }
        else {
            $("#tabsMember").tabs("option", "disabled", [3]);
            $('#btnInvoice').prop('disabled', false);
            $('a.add').show();
            $('a.refund').hide();
            IsNewInvoice = true;
        }
    };

    // goto invoice tab
    if (newTab == 3) {
        $('#btnInvoice').prop('disabled', true);
    };
});

//Datepickers in dialog:
$(function () {
    $(".datePick").datepicker({
        yearRange: '1910:' + (new Date().getFullYear() + 3),
        changeMonth: true,
        changeYear: true,
        dateFormat: dateFormatSite
    });
    //$(".datePick").datepicker({ dateFormat: dateFormatSite });
    $('.dateOff').datepicker("option", "disabled", true);
});

$(document).on('keypress', '.datePick', function (e) {
    e.preventDefault();
});

// clear inputs to add another membership:
var isAnotherMembership = false;
$('#btnAnotherMembership').click(function () {
    isAnotherMembership = true;
});

//close any dialog when click cancel button:
$(document).ready(function () {
    $('.text-center button[class~=btn-danger]').click(function () {
        if ($("#dialog-form").hasClass('ui-dialog-content')) {
            $("#dialog-form").dialog("close");
        }
        if ($("#dialogReports").hasClass('ui-dialog-content')) {
            $("#dialogReports").dialog("close");
        }
        if ($("#dialogMemType").hasClass('ui-dialog-content')) {
            $("#dialogMemType").dialog("close");
        }
        if ($("#dialogStaff").hasClass('ui-dialog-content')) {
            $("#dialogStaff").dialog("close");
        }
        if ($("#dialogDivs").hasClass('ui-dialog-content')) {
            $("#dialogDivs").dialog("close");
        }
        if ($("#dialogItems").hasClass('ui-dialog-content')) {
            $("#dialogItems").dialog("close");
        }
        if ($("#dialogSettings").hasClass('ui-dialog-content')) {
            $("#dialogSettings").dialog("close");
        }
    })


    //$('input[type=time]').timepicker({
    //    addSliderAccess: true,
    //    sliderAccessArgs: { touchonly: false },
    //    showSecond: false,
    //    timeFormat: 'hh:mm'
    //});
});
