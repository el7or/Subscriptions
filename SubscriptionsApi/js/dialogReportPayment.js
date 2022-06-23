function dialogPayments() {
   var dialogPaymentsSpinner = LoadSpinner.start();
    $("#dialogReportPayment").dialog({
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
                           $("#dialogReportPayment").dialog("close");
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
        },
        close: function (event, ui) {
            $('#invByName, #invFrom,#invTo, #invByProg').val('');
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
    convertLangAll(langgSite, 'dialogReportPayment');
    var defGetAllInvoices = GetAllInvoices();
    defGetAllInvoices.then(GetAllProgrammes).then(function () { LoadSpinner.stop(dialogPaymentsSpinner); });
    $("#dialogReportPayment").dialog("open");
};

// open dialog from member dialog:
$(document).on('click', '#memberTotalDues', function () {
    memberInvoice = true;
    dialogPayments();   
});