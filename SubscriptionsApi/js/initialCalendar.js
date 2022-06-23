var btnClose = 'Close';
var btnToday = 'Today';
var noEventMember = 'No Subscripsers !';
var eventMembers = ' Subscripsers';

$(document).ready(function () {

    var initialLangCode = 'en';
    $('#calendar').fullCalendar({
        theme: true,
        customButtons: {
            showMonth: {
                text: ' ',
                click: function () {
                    fullCal();
                    dialogCal();
                }
            }
        },
        header: {
            left: 'prev,next, today',
            center: 'title',
            right: 'showMonth'
        },
        //defaultDate: '2016-06-12', //remove it to make dufault date is today
        aspectRatio: 1.5,
        defaultView: 'agendaWeek',   //'basicWeek'   //agendaDay 
        height: "parent",
        //contentHeight: 'auto',
        lang: initialLangCode,
        weekNumbers: false,
        eventLimit: 4,
        displayEventTime: false,
        displayEventEnd: false,
        timeFormat: 'HH:mm',
        //editable: true,
        //events: [
        //         {
        //             title: 'يوم تدريب خاص',
        //             start: '2010-01-01T14:30:00'
        //         },
        //         {
        //             title: 'شهر كامل جيم',
        //             start: '2016-11-11',
        //             end: '2010-01-01T14:30:00'
        //         },
        //         {
        //             id: 999,
        //             title: 'جروب ساونا وتخسيس',
        //             start: '2010-01-01T14:30:00'
        //         },
        //         {
        //             title: 'لياقة بدنية أربع أيام',
        //             start: '2016-06-11',
        //             end: '2016-06-15',
        //             description: 'كل يوم حصة مع المدرب فلان الفلاني'
        //         },
        //         {
        //             title: 'حصة كمال أجسام',
        //             start: '2016-06-12',
        //             end: '2016-06-12'
        //         },
        //         {
        //             title: 'لياقة بدنية',
        //             start: '2016-06-12',
        //             end: null
        //         },
        //         {
        //             title: 'حصة كمال أجسام',
        //             start: '2016-06-12',
        //             end: null
        //         },
        //         {
        //             title: 'ساونا وتخسيس',
        //             start: '2016-06-12',
        //             end: null
        //         },
        //         {
        //             title: 'تدريب خاص',
        //             start: '2016-06-12',
        //             end: null,
        //             backgroundColor: ''
        //         },
        //         {
        //             title: 'نهائي بطولة كمال الأجسام',
        //             start: '2016-06-13',
        //             end: null,
        //             description: 'متابعة نهائي البطولة في الصالة'
        //         }
        //],
        eventRender: function (event, element, view) {

            var theDate = event.start
            var endDate = event.dowend;
            var starDate = event.dowstart;

            if (theDate >= endDate || theDate <= starDate) {
                return false;
            }
        },
        eventClick: function (calEvent, jsEvent, view) {
            if (UserDTO.RoleTitle != 'Specialist') {
                if (calEvent.description > 0) {
                    dialogEvents(calEvent.id, calEvent.basis, calEvent.avail, calEvent.title);
                }
            }
            else {
                GetAllProgrammes();
                GetAllItems();
                var id = calEvent.partyid;
                var invId = calEvent.invid;
                gotoInvoice = true;
                dialogMember(id);
                IsNewInvoice = false;
                fillOldInvoice(invId);
                $('div.container.dialogHead, #printMembership').hide();
                $('[href="#tabsMember-1"],[href="#tabsMember-2"],[href="#tabsMember-3"],[href="#tabsMember-5"]').closest('li').hide();
            }

            // change the border color just for fun
            //$(this).css('border-color', 'red');

        },
        eventMouseover: function (calEvent, jsEvent) {
            if (UserDTO.RoleTitle != 'Specialist') {
                if (calEvent.description == 0) {
                    var tooltip = '<div class="tooltipevent" style="width:auto;height:auto;background:#d7ebf9;position:absolute;z-index:10001;border-radius:20px;padding:10px;"><b>' + calEvent.title + '</b><br/>' + noEventMember + '</div>';
                }
                else {
                    var tooltip = '<div class="tooltipevent" style="width:auto;height:auto;background:#d7ebf9;position:absolute;z-index:10001;border-radius:20px;padding:10px;"><b>' + calEvent.title + '</b><br/>' + calEvent.description + eventMembers + '</div>';
                }
                $("body").append(tooltip);
                $(this).mouseover(function (e) {
                    $(this).css('z-index', 10000);
                    $('.tooltipevent').fadeIn('500');
                    $('.tooltipevent').fadeTo('10', 1.9);
                }).mousemove(function (e) {
                    $('.tooltipevent').css('top', e.pageY + 10);
                    $('.tooltipevent').css('left', e.pageX + 20);
                });
            }
        },
        eventMouseout: function (calEvent, jsEvent) {
            $(this).css('z-index', 8);
            $('.tooltipevent').remove();
        },
    });
    // add search bar
    $('#calSearch').insertBefore('#calendar .fc-toolbar').hide();

    // build the language selector's options
    $.each($.fullCalendar.langs, function (langCode) {
        $('#lang-selector').append(
            $('<option/>')
                .attr('value', langCode)
                .prop('selected', langCode == initialLangCode)
                .text(langCode)
        );
    });

    // when the selected option changes, dynamically change the calendar option
    $('#lang-selector').on('change', function () {
        if (this.value) {
            $('#calendar').fullCalendar('option', 'lang', this.value);
        }
    });

    //add css to btn show month:
    btnExpand();

    // open full size calendar in dialog:
    function dialogCal() {
        $("#calendar").dialog({
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
                        $("#calendar").dialog("destroy").css('display', 'block');
                        notFullCal();
                        btnExpand();
                    }
                }
            ],
            close: function (event, ui) {
                $("#calendar").dialog("destroy").css('display', 'block');
                notFullCal();
                btnExpand();
            },
            show: {
                effect: "scale",
                duration: 500,
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
        $("#calendar").dialog("open");
    }
});
function btnExpand() {
    $('.fc-showMonth-button').css({ 'width': '50px', 'background-image': 'url(Images/expands.png)', 'background-repeat': 'no-repeat', 'background-position': 'center' });

}

//Full size changes:
function fullCal() {
    $('#calendar').fullCalendar('option', {
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        eventLimit: 4,
        displayEventTime: true,
        displayEventEnd: true
    });
    $('#calendar').fullCalendar('changeView', 'month');
    $('#calendar').fullCalendar('option', 'height', 'auto');
    $('.fc-today-button').text(btnToday);
    GetAllProgramsCalendarSearch();
    $('#calSearch').show();
}

//Back to default size:
function notFullCal() {
    $('#calendar').fullCalendar('option', {
        header: {
            left: 'prev,next, today',
            center: 'title',
            right: 'showMonth'
        },
        eventLimit: 4,
        displayEventTime: false,
        displayEventEnd: false,
    });
    (UserDTO.RoleTitle == 'Specialist' ? $('#calendar').fullCalendar('changeView', 'basicWeek') :$('#calendar').fullCalendar('changeView', 'agendaWeek'));
    $('#calendar').fullCalendar('option', 'height', 'parent');
    convertLangCalendar(langgSite);
    $('#calSearch').hide();
}
