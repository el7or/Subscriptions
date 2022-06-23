var stateBtn = true;
$(document).ready(function () {
    $(document).delegate('.open', 'click', function (event) {
        if (stateBtn === true) {
            $(this).addClass('oppenned');
            event.stopPropagation();
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
            stateBtn = false;
                $(this).tooltip('hide');
        }
        else if (stateBtn===false) {
            $('.open').removeClass('oppenned');
            event.stopPropagation();
            stateBtn = true;
        }

    })
    $(document).delegate('body', 'click', function (event) {
        $('.open').removeClass('oppenned');
    })
});
