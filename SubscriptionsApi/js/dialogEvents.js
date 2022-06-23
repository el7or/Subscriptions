function dialogEvents(id, basis, avail, title) {
    var dialogEventsSpinner = LoadSpinner.start();
    $("#dialogEvents").dialog({
        title: title,
        //maxHeight: 500,
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
        buttons:
            [
                {
                    text: btnClose,
                    click: function () {
                        $("#dialogEvents").dialog("close");
                    }
                }
            ],
        open: function (event, ui) {
            $(".ui-dialog-titlebar-close").focus(); // Hide the [x] button
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
    var defGetMembersByProgram = GetMembersByProgram(id, basis, avail);
    defGetMembersByProgram.then(function () {
    convertLangAll(langgSite, 'dialogEvents');
    $("#dialogEvents").dialog("open");
    LoadSpinner.stop(dialogEventsSpinner);
    })
}

//open subscribers for fixed programs in notification grid:
$(document).on('click', '#endSubs tbody tr .tdNew button', function () {
    var progID = $(this).closest('tr').find('th:eq(1)').text();
    var progAvail = $(this).closest('tr').find('th:eq(2)').text();
    var progTitle = $(this).closest('tr').find('td:eq(0)').text();
    dialogEvents(progID, "fixedProgram", progAvail, progTitle);
});