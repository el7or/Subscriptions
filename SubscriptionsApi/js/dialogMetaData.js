function dialogMetaData() {
    $("#programForm").clone().appendTo("#dialogMetaData");
    $("#divsForm").clone().appendTo("#div2metaData");
    $("#dialogMetaData #btnDivs").remove();
    $("#dialogMetaData #tblDivs").remove();
    $("#dialogMetaData button[class~=btn-danger]").hide();
    $("#dialogMetaData #divs").css("width", "100%");
    metaDataValidation(dateFormatValidation);

    $("#dialogMetaData").dialog({
        width: 'auto',
        modal: true,
        resizable: false,
        closeOnEscape: false,
        dialogClass: 'no-close success-dialog',
        position: { my: 'left top', at: 'left+50 top+20' },
        hide: {
            effect: "fade",
            duration: 500
        },
        open: function() {
            //Hide closing "X" for this dialog only.
            $(this).parent().children().children(".ui-dialog-titlebar-close").remove();
            $("#dialogMetaData #doneLang").css("visibility", "hidden");
            $.uploadPreview({
                input_field: "#image-upload2",
                preview_box: "#image-preview2",
                label_field: "#image-label2"
            });
        },
        close: function (event, ui) {
            $("#dialogMetaData #programForm").remove();
            $("#div2metaData #divsForm").remove();
            $('.progs').hide();
            $('.openProgram').show();
            $('#frmProgram').data('bootstrapValidator').resetForm(true);
            $("#dialogDivs #doneDiv").css("visibility", "hidden");
        },
        show: {
            effect: "scale",
            duration: 1200,
        }
    });
        
    var bootstrapValidator = $('#dialogMetaData #frmProgram').data('bootstrapValidator');
    bootstrapValidator.enableFieldValidators('lenProg', true);
    bootstrapValidator.enableFieldValidators('totalVisit', false);
    bootstrapValidator.enableFieldValidators('startfixed', false);
    bootstrapValidator.enableFieldValidators('endFixed', false);

    $("#dialogMetaData.ui-dialog-titlebar-close").css("visibility", "hidden");
  
    //Datepickers in dialog:
    $('#dialogMetaData .startfixed,#dialogMetaData .endFixed').removeClass('hasDatepicker').removeAttr('id');
    var dateFormat = dateFormatSite;
    var from = $("#dialogMetaData .startfixed")
      .datepicker({ dateFormat: dateFormat })
      .on("change", function () {
          to.datepicker("option", "minDate", getDate(this));
      });
    var to = $("#dialogMetaData .endFixed").datepicker({ dateFormat: dateFormat })
    .on("change", function () {
        from.datepicker("option", "maxDate", getDate(this));
    });

    convertLangAll(langgSite, 'dialogMetaData');
    $("#dialogMetaData").dialog("open");
    

    function getDate(element) {
        var date;
        try {
            date = $.datepicker.parseDate(dateFormat, element.value);
        } catch (error) {
            date = null;
        }
        return date;
    }
}

//chang language when choosen:
$(document).on('click', '#dialogMetaData #langgOptions', function () {
    if ($('#btnEnglish').hasClass('active')) {
        langgSite = 'en';
        $("#en").click();
        convertLangAll(langgSite, 'dialogMetaData');
        $('#dialogMetaData #frmHours').data('bootstrapValidator').resetForm(true);
        $('#dialogMetaData #frmAddDiv').data('bootstrapValidator').resetForm(true);
        $('#dialogMetaData #frmProgram').data('bootstrapValidator').resetForm(true);
        $('#dialogMetaData #frmHours').bootstrapValidator('setLocale', 'en_US');
    }
    else if ($('#btnArabic').hasClass('active')) {
        langgSite = 'ar-sa';
        $("#ar-sa").click();
        convertLangAll(langgSite, 'dialogMetaData');
        $('#dialogMetaData #frmHours').data('bootstrapValidator').resetForm(true);
        $('#dialogMetaData #frmAddDiv').data('bootstrapValidator').resetForm(true);
        $('#dialogMetaData #frmProgram').data('bootstrapValidator').resetForm(true);
        $('#dialogMetaData #frmHours').bootstrapValidator('setLocale', 'ar_MA');
    }
    $("#dialogMetaData #doneLang").css("visibility", "visible");
});

//exit btn when add at least one program:
$(document).on('click', '#dialogMetaData button[class~=btn-danger]', function () {
    $("#dialogMetaData").dialog("close");
})

// reset division validation when click on another input:
$(document).on('click', '#dialogMetaData input, #dialogMetaData select,#dialogMetaData textarea', function () {
    $('#dialogMetaData #frmAddDiv').data('bootstrapValidator').resetForm(true);
})


// set logo system if cancel upload:
//$(document).on('change', '#image-preview2 #image-upload2', function () {
//    if ($('#image-preview2').css('background-image') == 'none') {
//        $('#image-preview2,#image-preview3').css('background-image', 'url(../Images/logo.png)');
//    }
//});
// save logo
$(document).on('click', '#saveLogo', function () {
    var clearBinaryLogo;
    if ($('#image-preview2').css('background-image').indexOf('/Images/logo.png')!=-1) {
        clearBinaryLogo = null;
    }
    else {
        var logoURL = $("#image-preview2").css("background-image");
        var startBinaryImg = logoURL.lastIndexOf('base64,') + 7;
        clearBinaryLogo = logoURL.slice(startBinaryImg, -2);
    }
    saveLogoCompany(clearBinaryLogo);
});


// change validation field depends on program basis:
$(document).on('change', '#dialogMetaData #basis', function () {
    var bootstrapValidator = $('#dialogMetaData #frmProgram').data('bootstrapValidator');
    var progType = $(this).val();

    switch (progType) {
        case 'oneVisit':
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
$(document).on('change', '#dialogMetaData .startfixed', function () {
    if ($(this).val() != "") {
        $('#dialogMetaData #frmProgram').bootstrapValidator('updateStatus', 'startfixed', 'VALID', 'notEmpty');
        $('#dialogMetaData #frmProgram').bootstrapValidator('updateOption', 'startfixed', 'date', 'format', dateFormatValidation);
        $('#dialogMetaData #frmProgram').bootstrapValidator('updateOption', 'endFixed', 'date', 'format', dateFormatValidation);
    }
    else {
        $('#dialogMetaData #frmProgram').bootstrapValidator('updateStatus', 'startfixed', 'INVALID ', 'notEmpty');
    }
});
$(document).on('change', '#dialogMetaData .endFixed', function () {
    if ($(this).val() != "") {
        $('#dialogMetaData #frmProgram').bootstrapValidator('updateStatus', 'endFixed', 'VALID', 'notEmpty');
        $('#dialogMetaData #frmProgram').bootstrapValidator('updateOption', 'endFixed', 'date', 'format', dateFormatValidation);
        $('#dialogMetaData #frmProgram').bootstrapValidator('updateOption', 'startfixed', 'date', 'format', dateFormatValidation);
    }
    else {
        $('#dialogMetaData #frmProgram').bootstrapValidator('updateStatus', 'endFixed', 'INVALID ', 'notEmpty');
    }
});
