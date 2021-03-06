function dialogAccountMember(memID) {    
    $("#dialogAccountMember").dialog({
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
            $('#frmAccountMem').data('bootstrapValidator').resetForm(true);
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
    $('#dialogAccountMember').dialog('option', 'title', $("#memberName").text());
    $('#accEmailMem').val($('#email').val());
    convertLangAll(langgSite, 'dialogAccountMember');
    $("#dialogAccountMember").dialog("open"); 
}