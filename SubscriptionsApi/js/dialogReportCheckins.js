$("#reportCheck").click(function () {

    $("#dialogReportCheckins").dialog({
        autoOpen: false,
        width: 'auto',
        modal: true,
        resizable: false,
        dialogClass: 'no-close success-dialog',
        buttons:
               [
                   {
                       text: btnClose,
                       click: function () {
                           $("#dialogReportCheckins").dialog("close");
                       }
                   }
               ],
        position: { my: 'left top', at: 'left+50 top+20' },
        show: {
            effect: "fade",
            duration: 500,
        },
        hide: {
            effect: "fade",
            duration: 500
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
    if (divLang.css('left') === '-150px') {

    } else {
        $('.switcherLang').animate({
            left: '-270px'
        });
    }    
    convertLangAll(langgSite, 'dialogReportCheckins');
    $("#divCheckinsByMember,#divCheckinsByPeriod").hide();
    $("#dialogReportCheckins").dialog("open");
    $("#dialogReportCheckins input").val("");
    $("#checkinsAll").click();
});