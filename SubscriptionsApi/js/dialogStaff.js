function dialogStaff() {
    var dialogStaffSpinner = LoadSpinner.start();
    $("#dialogStaff").dialog({
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
        open: function (event, ui) {
            getDivisons();
            var defgetBranchs = getBranchs();
            defgetBranchs.then(getRoles).then(GetAllStaffUsers).then(function () { LoadSpinner.stop(dialogStaffSpinner); });
        },
        close: function (event, ui) {
            $('#dialogStaff input,#dialogStaff textarea').val('');
            $('#roleStaff').val('').change();
            $('#frmStaff').data('bootstrapValidator').resetForm(true);
            $('#StaffBranch2').val($("#StaffBranch2 option:eq(0)").val());
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
    convertLangAll(langgSite, 'dialogStaff');
    $("#tabsStaff").tabs("option", "active", 1);
    $("#dialogStaff").dialog("open");

}

//function saveStaff() {
//    //write code of saving new staff here//
//};

// Show description when select role:
$('#roleStaff').change(function () {
    $('#roleInfo').val($('option:selected', this).attr('data-info'));
    if ($(this).val() == '46fbf01c-c46e-479d-a86c-8113b3d81d8e') {
        $('#RoleDiv').show();
    }
    else $('#RoleDiv').hide();
}).change();

//Open the tabs including dialog:
$(function () {
    $("#tabsStaff").tabs();
});

//change things when shift tabs:
var isFromStaffEdit = false;
$('#tabsStaff').on('tabsbeforeactivate', function (event, ui) {
    if (ui.oldTab.index() == 0) {
        $('#frmStaff').data('bootstrapValidator').resetForm(true);
        $('#StaffBranch').val($("#StaffBranch option:eq(0)").val());
        $('#roleStaff').val($("#roleStaff option:eq(0)").val());
        $('#roleInfo').val('');
        $('#tabsStaff ul:first li:eq(0) a').text(tabAddStaff);
        isFromStaffEdit = false;
        $('#roleStaff').val("").prop('disabled', false);
    };
    if (ui.newTab.index() == 0) {
        if (isFromStaffEdit = false) {
            if (UserDTO.RoleTitle == 'Admin') {
                $('#roleStaff').val("b04e63f3-9715-42a5-80bb-6ac45fdd11e7").prop('disabled', true);
            }
            // if role is owner:
            else { $('#roleStaff').val("").prop('disabled', false); }
        }
    }
});