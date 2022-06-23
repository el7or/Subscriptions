function dialogSettings() {
    var dialogSettingsSpinner = LoadSpinner.start();
    $("#dialogSettings").dialog({
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
            $('#frmSettingNotif').data('bootstrapValidator').resetForm(true);
            $('#frmSettingDefults').data('bootstrapValidator').resetForm(true);
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

    $.uploadPreview({
        input_field: "#image-upload3",
        preview_box: "#image-preview3",
        label_field: "#image-label3"
    });

    convertLangAll(langgSite, 'dialogSettings');
    $('#setNotifSubsDays').val(UserDTO.AlertDays);
    $('#setNotifSubsVisits').val(UserDTO.AlertVisits);
    $('#setNotifPayDays').val(UserDTO.AlertPayments);
    getDefaultsSettings();
    $("#dialogSettings").dialog("open");
    $('ul.resp-tabs-list li:eq(0)').click();
    LoadSpinner.stop(dialogSettingsSpinner);
}

// set logo system if cancel upload:
//$(document).on('change', '#image-preview3 #image-upload3', function () {
//    if ($('#image-preview3').css('background-image') == 'none') {
//        $('#image-preview3').css('background-image', 'url(../Images/logo.png)');
//    }
//});
