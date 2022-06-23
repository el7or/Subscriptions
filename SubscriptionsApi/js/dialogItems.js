var isFromInvoice = false;
function dialogItems() {
    var dialogItemsSpinner = LoadSpinner.start();
    $("#dialogItems").dialog({
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
            resetItemTab();
            if (isFromInvoice==true) {
                $('#btnInvoice').click();
                isFromInvoice = false;
            }
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
    convertLangAll(langgSite, 'dialogItems');
    var defGetAllItems = GetAllItems();
    defGetAllItems.then(function () { LoadSpinner.stop(dialogItemsSpinner); });
    $("#dialogItems").dialog("open");
}

// reset program form:
function resetItemTab() {
    $('#frmItem').data('bootstrapValidator').resetForm(true);
    $('#itemPrice').val('0.00');
    $('#itemNote').val('');
    $('#tabsItems ul:first li:eq(0) a').text(tabAddItem);
    checkNewItem = true;
}

//Open the tabs including dialog:
$(function () {
    $("#tabsItems").tabs();
});

//change things when shift tabs:
$('#tabsItems').on('tabsbeforeactivate', function (event, ui) {
    if (ui.oldTab.index() == 0) {
        resetItemTab();
    };
});
