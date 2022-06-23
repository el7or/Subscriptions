var drawChartTimeLineSpinner;
function dialogReportTimeLineBusiness() {
    drawChartTimeLineSpinner = LoadSpinner.start();

    var wWidth = $(window).width();
    var dWidth = wWidth * 0.9;
    var wHeight = $(window).height();
    var dHeight = wHeight * 0.9;
    $("#dialogReportTimeLine").dialog({
        autoOpen: false,
        width: dWidth,
        height: dHeight,
        modal: true,
        resizable: false,
        dialogClass: 'no-close success-dialog',
        buttons:
               [
                   {
                       text: btnClose,
                       click: function () {
                           $("#dialogReportTimeLine").dialog("close");
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
            $('#dialogReportTimeLine #saveChartTimeLine').attr('href', '#');
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
    convertLangAll(langgSite, 'dialogReportTimeLineBusiness');
    $("#dialogReportTimeLine").dialog("open");
    google.charts.load("current", { packages: ['corechart'] });
    google.charts.setOnLoadCallback(drawChartTimeLineSubs);
}

function dialogReportTimeLineCashFlow() {
    drawChartTimeLineSpinner = LoadSpinner.start();

    var wWidth = $(window).width();
    var dWidth = wWidth * 0.9;
    var wHeight = $(window).height();
    var dHeight = wHeight * 0.9;
    $("#dialogReportTimeLine").dialog({
        autoOpen: false,
        width: dWidth,
        height: dHeight,
        modal: true,
        resizable: false,
        dialogClass: 'no-close success-dialog',
        buttons:
               [
                   {
                       text: btnClose,
                       click: function () {
                           $("#dialogReportTimeLine").dialog("close");
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
            $('#dialogReportTimeLine #saveChartTimeLine').attr('href', '#');
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
    convertLangAll(langgSite, 'dialogReportTimeLineCashFlow');
    $("#dialogReportTimeLine").dialog("open");
    google.charts.load("current", { packages: ['corechart'] });
    google.charts.setOnLoadCallback(drawChartTimeLinePays);
}