/* Style sliderSetting */
window.console = window.console || (function ($) {
    var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function () { };
    return c;
})();

$(document).ready(function ($) {

    var stylesliderSettingstr = ' \
	<h2 id="myAccWind">My Account<a href="#"></a></h2> \
    <div id="accordion" class="panel-group accordion">        \
        <!-- Accordians --> \
        <div class="panel panel-default">            \
            <div class="panel-heading">                \
                <h4 class="panel-title">                    \
                    <span class="accordian-icon">                        \
                        <i class="switch fa fa-plus-circle"></i> \
                    </span> \
                    <a href="#collapseOne" data-parent="#accordion" data-toggle="collapse" data-langg="accBasic">                        \
                        Account basic</a> \
                </h4> \
            </div> \
            <div class="panel-collapse collapse" id="collapseOne">                \
                <div class="panel-body">                    \
                    <form id="frmChngAcc" class="form-horizontal">\
                        <div class="form-group">                        \
                            <input type="text" id="fnameAcc" name="fnameAcc" class="form-control" value="" placeholder="First name" title="First name"> \
                        </div> \
                        <div class="form-group">                        \
                            <input type="text" id="lnameAcc" name="lnameAcc" class="form-control" value="" placeholder="Last name" title="Last name"> \
                        </div> \
                        <div class="form-group">                        \
                            <input disabled="disabled" type="email" id="emailAcc" name="emailAcc" class="form-control" value="" placeholder="E-mail" title="E-mail"> \
                        </div> \
                        <div class="form-group">                        \
                            <input type="tel" id="phoneAcc" name="phoneAcc" class="form-control" value="" placeholder="Phone" title="Phone"> \
                        </div> \
                        <div class="text-center"> \
                        <input id="submitAcc" type="submit" data-loading-text="Loading..." class="btn btn-success" value="Update"> \
                        </div> \
                    </div> \
                </form> \
            </div> \
        </div> \
        <div class="panel panel-default">            \
            <div class="panel-heading">                \
                <h4 class="panel-title">                    \
                    <span class="accordian-icon">                        \
                        <i class="switch fa fa-plus-circle"></i> \
                    </span> \
                    <a href="#collapseTwo" data-parent="#accordion" data-toggle="collapse" data-langg="accPass">                        \
                        Change password</a> \
                </h4> \
            </div> \
            <div class="panel-collapse collapse" id="collapseTwo">                \
                <div class="panel-body">\
                    <form id="frmChngPass" class="form-horizontal">\
                        <div class="form-group">                        \
                            <input type="password" id="oldPass" name="oldPass" class="form-control" maxlength="30" data-msg-required="Please enter your name." value="" placeholder="Old password"> \
                        </div> \
                        <div class="form-group">                        \
                            <input type="password" id="newPass" name="newPass" class="form-control" maxlength="30" data-msg-email="Please enter a valid email address." data-msg-required="Please enter your email address." value="" placeholder="New password"> \
                        </div> \
                        <div class="form-group">                        \
                            <input type="password" id="confirmPass" name="confirmPass" class="form-control" maxlength="30" data-msg-required="Please enter the password." value="" placeholder="Re-enter password"> \
                        </div> \
                        <div class="text-center"> \
                            <input type="submit" data-loading-text="Loading..." class="btn btn-success" value="Update"> \
                        </div> \
                    </div> \
                </form> \
            </div> \
        </div> \
        <div class="panel panel-default">            \
            <div class="panel-heading">                \
                <h4 class="panel-title">                    \
                    <span class="accordian-icon">                        \
                        <i class="switch fa fa-plus-circle"></i> \
                    </span> \
                    <a href="#collapseThree" data-parent="#accordion" data-toggle="collapse" data-langg="accInfo">                        \
                        Company info</a> \
                </h4> \
            </div> \
            <div class="panel-collapse collapse" id="collapseThree">                \
                <div class="panel-body">                    \
                    <form id="frmChngCompany" class="form-horizontal">\
                        <div class="form-group">                        \
                            <input type="text" id="companyName" name="companyName" class="form-control" value="" placeholder="Company name" title="Company name"> \
                        </div> \
                        <div class="form-group">                        \
                            <input type="text" disabled="disabled" id="industry" name="industry" class="form-control"value="" placeholder="Industry" title="Industry"> \
                        </div> \
                        <div class="text-center"> \
                        <input type="submit" data-loading-text="Loading..." class="btn btn-success" value="Update"> \
                        </div> \
                    </div> \
                </form> \
            </div> \
        </div> \
    </div> \
    <div class="clear"></div> \
    <!-- End content --> \
	';
    $(".sliderSetting").prepend(stylesliderSettingstr);
});


/* Reset sliderSetting */
$(document).ready(function () {

    // Style sliderSetting
    $('.sliderSetting').animate({
        left: '-255px'
    });

    $(".sliderSetting").on("click", "h2", function (e) {
        e.preventDefault();
        var divSetting = $('.sliderSetting');
        console.log(divSetting.css('left'));
        if (divSetting.css('left') === '-255px') {
            $('.sliderSetting').animate({
                left: '0px'
            });
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
        if ($("#dialog-form").hasClass('ui-dialog-content')) {
            $("#dialog-form").dialog("close");
        }
        if ($("#dialogMemType").hasClass('ui-dialog-content')) {
            $("#dialogMemType").dialog("close");
        }
        if ($("#dialogStaff").hasClass('ui-dialog-content')) {
            $("#dialogStaff").dialog("close");
        }
        if ($("#dialogDivs").hasClass('ui-dialog-content')) {
            $("#dialogDivs").dialog("close");
        }
        if ($("#dialogReports").hasClass('ui-dialog-content')) {
            $("#dialogReports").dialog("close");
        }
        if ($("#dialogReportMembers").hasClass('ui-dialog-content')) {
            $("#dialogReportMembers").dialog("close");
        }
        if ($("#dialogReportPrograms").hasClass('ui-dialog-content')) {
            $("#dialogReportPrograms").dialog("close");
        }
        if ($("#dialogReportTimeLine").hasClass('ui-dialog-content')) {
            $("#dialogReportTimeLine").dialog("close");
        }
        if ($("#dialogReportPayment").hasClass('ui-dialog-content')) {
            $("#dialogReportPayment").dialog("close");
        }
        if ($("#dialogReportCheckins").hasClass('ui-dialog-content')) {
            $("#dialogReportCheckins").dialog("close");
        }
        if ($("#dialogItems").hasClass('ui-dialog-content')) {
            $("#dialogItems").dialog("close");
        }
        if ($("#dialogEvents").hasClass('ui-dialog-content')) {
            $("#dialogEvents").dialog("close");
        }
        if ($("#dialogSettings").hasClass('ui-dialog-content')) {
            $("#dialogSettings").dialog("close");
        }
        if ($("#dialogAccountMember").hasClass('ui-dialog-content')) {
            $("#dialogAccountMember").dialog("close");
        }
        if ($("#calendar").hasClass('ui-dialog-content')) {
            $("#calendar").dialog("close");
        }
        $('#frmChngPass').data('bootstrapValidator').resetForm(true);
    })
});
