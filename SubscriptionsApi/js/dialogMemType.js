function dialogMemType() {
    var dialogMemTypeSpinner = LoadSpinner.start();
    $("#dialogMemType").dialog({
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
            resetProgramTab();
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
    convertLangAll(langgSite, 'dialogMemType');
    var defgetDivisons= getDivisons();
    defgetDivisons.then(GetAllProgrammes).then(function () { LoadSpinner.stop(dialogMemTypeSpinner); })
    $("#tabsMem").tabs("option", "active", 1);
    $("#dialogMemType").dialog("open");
}

// reset program form:
function resetProgramTab() {
    $('#dialogMemType #frmProgram').data('bootstrapValidator').resetForm(true);
    $("#dialogDivs #doneDiv").css("visibility", "hidden");
    $('#divs2').val($("#divs2 option:eq(0)").val());
    $('#dialogMemType #progFee').val('0.00');
    $('#dialogMemType #nBasis, #dialogMemType #packageCount').val('1');
    $('#dialogMemType #totalVisit').val('2');
    $('#dialogMemType #noteProg').val('');
    $('#dialogMemType #basis').val($('#dialogMemType #basis option:eq(0)').val()).change();;
    $('#dialogMemType #packages').val($("#dialogMemType #packages option:first").val());
    if (allProgramsObject != undefined) { $('#clearPackage').click(); }
    $('#tabsMem ul:first li:eq(0) a').text(tabAddProgram);
    checkNewProgram = true;
    $("#dialogMemType .startfixed").datepicker("option", "maxDate", null);
    $("#dialogMemType .endFixed").datepicker("option", "minDate", null);
    $("#progDays input[type=checkbox]").prop('checked', false);
}

// change validation field depends on program basis:
$('#dialogMemType #basis').change(function () {
    var bootstrapValidator = $('#frmProgram').data('bootstrapValidator');
    var progType = $(this).val();
    switch (progType) {
        case 'oneVisit':
        case 'Package':
            bootstrapValidator.enableFieldValidators('totalVisit', false);
            bootstrapValidator.enableFieldValidators('lenProg', false);
            bootstrapValidator.enableFieldValidators('startfixed', false);
            bootstrapValidator.enableFieldValidators('endFixed', false);
            break;
        case "multiVisits":
            bootstrapValidator.enableFieldValidators('totalVisit', true);
            bootstrapValidator.enableFieldValidators('lenProg', false);
            bootstrapValidator.enableFieldValidators('startfixed', false);
            bootstrapValidator.enableFieldValidators('endFixed', false);
            break;
        case "openProgram":
            bootstrapValidator.enableFieldValidators('lenProg', true);
            bootstrapValidator.enableFieldValidators('totalVisit', false);
            bootstrapValidator.enableFieldValidators('startfixed', false);
            bootstrapValidator.enableFieldValidators('endFixed', false);
            break;
        case "fixedProgram":
            bootstrapValidator.enableFieldValidators('startfixed', true);
            bootstrapValidator.enableFieldValidators('endFixed', true);
            bootstrapValidator.enableFieldValidators('totalVisit', false);
            bootstrapValidator.enableFieldValidators('lenProg', false);
            break;
    }
});
$('#dialogMemType #startfixed').change(function () {
    if ($(this).val() != "") {
        $('#frmProgram').bootstrapValidator('updateStatus', 'startfixed', 'VALID', 'notEmpty');
        $('#frmProgram').bootstrapValidator('updateOption', 'startfixed', 'date', 'format', dateFormatValidation);
        $('#frmProgram').bootstrapValidator('updateOption', 'endFixed', 'date', 'format', dateFormatValidation);
    }
    else {
        $('#frmProgram').bootstrapValidator('updateStatus', 'startfixed', 'INVALID ', 'notEmpty');
    }
});
$('#dialogMemType #endFixed').change(function () {
    if ($(this).val() != "") {
        $('#frmProgram').bootstrapValidator('updateStatus', 'endFixed', 'VALID', 'notEmpty');
        $('#frmProgram').bootstrapValidator('updateOption', 'endFixed', 'date', 'format', dateFormatValidation);
        $('#frmProgram').bootstrapValidator('updateOption', 'startfixed', 'date', 'format', dateFormatValidation);
    }
    else {
        $('#frmProgram').bootstrapValidator('updateStatus', 'endFixed', 'INVALID ', 'notEmpty');
    }
});

//Datepickers in dialog:
$(function () {
    $("#dialogMemType .startfixed").on("change", function () {
        $("#dialogMemType .endFixed").datepicker("option", "minDate", $(this).val());
    });
    $("#dialogMemType .endFixed").on("change", function () {
        $("#dialogMemType .startfixed").datepicker("option", "maxDate", $(this).val());
    });
});

// Show spacifc div when select basis:
$(function () {
    $('.progs').hide();
    $('.openProgram').show();    
});
$(document).on('change', '#basis', function () {
    $('.progs').hide();
    $('.' + $(this).val()).show();
    $("#dialogMemType .startfixed").datepicker("option", "maxDate", null);
    $("#dialogMemType .endFixed").datepicker("option", "minDate", null);
    if ($(this).val() == 'Package') {
        $('#dialogMemType #progDays, #dialogMemType #progTimes').hide();        
    }
    else $('#dialogMemType #progDays, #dialogMemType #progTimes').show(); 
});

// open small dialog to update division list:
$(function () {
    $("#btnDivs").click(function () {
        $("#dialogDivs").dialog({
            width: 320,
            modal: true,
            resizable: false,
            close: function (event, ui) {
                $('#frmAddDiv').data('bootstrapValidator').resetForm(true);
                $("#dialogDivs #doneDiv").css("visibility", "hidden");
            }
        });
        convertLangAll(langgSite, 'dialogDivsList');
    })
    $("#newDiv").focus(function () {
        $("#dialogDivs #doneDiv").css("visibility", "hidden");
    });
});

//Open the tabs including dialog:
$(function () {
    $("#tabsMem").tabs();
});

//change things when shift tabs:
$('#tabsMem').on('tabsbeforeactivate', function (event, ui) {
    if (ui.oldTab.index() == 0) {
        resetProgramTab();
    };
});

