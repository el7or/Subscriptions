/* Style switcherLang */

window.console = window.console || (function ($) {
    var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function () { };
    return c;
})();

$(document).ready(function ($) {

    var styleswitcherLangstr = ' \
    <h2 id="titleLang">Languages<a href="#"></a></h2> \
    <div class="content"> \
        <h3 id="chsLang">Language</h3> \
        <div class="layout-switcherLang"> \
		    <table> \
		        <tr><td><a id="en" name="1" data-format="mm-dd-yy" class="layout">English US</a></td><td><i>Date: month-day-year</i><br/><i>eg: 12-31-2020</i></td></tr> \
		        <tr><td><a id="en-gb" name="3" data-format="dd-mm-yy" class="layout">English UK</a></td><td><i>Date: day-month-year</i><br/><i>eg: 31-12-2020</i></td></tr> \
		        <tr><td><a id="ar-sa" name="2" data-format="yy-mm-dd" class="layout">عربي</a></td><td><i>التاريخ: يوم-شهر-سنة</i><br/><i>eg: 2020-12-31</i></td></tr> \
		    </table> \
        </div> \
        <div class="clear"></div> \
    </div> \
	';

    $(".switcherLang").prepend(styleswitcherLangstr);

});

/* language converter */
$(document).ready(function () {
    $('.layout-switcherLang a').click(function () {
        setLanguage($(this).attr('name'));
        langgSite = $(this).attr('id');
        convertLangAll(langgSite, 'home');
        dateFormatSite = $(this).attr('data-format');
        dateFormatValidation = dateFormatSite.replace("yy", "yyyy").toUpperCase();
        $(".hasDatepicker").datepicker("option", "dateFormat", dateFormatSite);
        $(this).closest('table').find('a,i').css('color', '#fff');
        $(this).closest('tr').find('a,i').css('color', '#97d3ff');
        $('.switcherLang').animate({
            left: '-270px'
        });
    });
});

/* date format converter for getting data */
function fDate(dateToFormat) {
    if (dateToFormat == null || dateToFormat == "") {
        return dateToFormat;
    }
    else {
        if (dateFormatSite == 'mm-dd-yy') {
            var formatedDate = (new Date(dateToFormat).getMonth() + 1) + '-' + new Date(dateToFormat).getDate() + '-' + new Date(dateToFormat).getFullYear();
            return formatedDate;
        }
        else if (dateFormatSite == 'dd-mm-yy') {
            var formatedDate = new Date(dateToFormat).getDate() + '-' + (new Date(dateToFormat).getMonth() + 1) + '-' + new Date(dateToFormat).getFullYear();
            return formatedDate;
        }
        else if (dateFormatSite == 'yy-mm-dd') {
            var formatedDate = new Date(dateToFormat).getFullYear() + '-' + (new Date(dateToFormat).getMonth() + 1) + '-' + new Date(dateToFormat).getDate();
            return formatedDate;
        }
    }
}

/* date format converter for posting data */
function sDate(dateToFormat) {
    if (dateToFormat == null || dateToFormat == "") {
        return dateToFormat;
    }
    else {
        if (dateFormatSite == 'dd-mm-yy') {
            var formatedDate = dateToFormat.split("-");
            return formatedDate[2] + '-' + formatedDate[1] + '-' + formatedDate[0];
        }
        else {
            var formatedDate = new Date(dateToFormat).getFullYear() + '-' + (new Date(dateToFormat).getMonth() + 1) + '-' + new Date(dateToFormat).getDate();
            return formatedDate;
        }
    }
}

/* date format converter for getting arabic date to concating */
function aDate(dateToFormat) {
    if (langgSite == 'ar-sa') {
        var formatedDate = new Date(dateToFormat).getDate() + '-' + (new Date(dateToFormat).getMonth() + 1) + '-' + new Date(dateToFormat).getFullYear();
        return formatedDate;
    }
    else {
        return fDate(dateToFormat);
    }
}

// Main function to translate All site:
var LanggKeys = new Array();
function convertLangAll(langg, targ) {
    if (targ == 'home') {
        convertLangHome(langg);
        convertLangValidation(langg);
        GetMembershipsEndingSoon(subscriptionsObject);
    }
    $('*').each(function (i) {
        $(this).text(LanggKeys[langg][$(this).attr('data-langg')]);
    });
}

// translate Home page:
function convertLangHome(langg) {
    if (langg == 'en' || langg == 'en-gb') {
        $('*').css('direction', 'ltr');
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['menu1'] = 'Programmes';
        LanggKeys[langg]['menu2'] = 'Extras';
        LanggKeys[langg]['menu3'] = 'Staff';
        LanggKeys[langg]['menu4'] = 'Reports';
        LanggKeys[langg]['menu5'] = 'Settings';
        LanggKeys[langg]['notifHead'] = 'Notifications';
        LanggKeys[langg]['searchHead'] = 'Subscripers';
        LanggKeys[langg]['calendarHead'] = 'Subscriptions';
        LanggKeys[langg]['accBasic'] = 'Account basic';
        LanggKeys[langg]['accPass'] = 'Account password';
        LanggKeys[langg]['accInfo'] = 'Company info';
        LanggKeys[langg]['evntMemsName'] = 'Name';
        LanggKeys[langg]['evntMemsUsed'] = 'Used Visits';
        LanggKeys[langg]['evntMemsCheck'] = 'Check-in';
        LanggKeys[langg]['ClientSubs'] = 'My Subscriptions';
        thPeriod = 'Period';
        thBooked = 'Booked Visits';
        btnRenew = 'Renew';
        btnNew = 'New';
        btnPay = 'Pay';
        activeInvoice = 'Re-active subscription';
        banInvoice = 'Suspend subscription';
        $('head title').text('My Subscriptions');
        $('.exportNotif').text('EXPORT ');
        $('#btnLogOut').html('<span class="glyphicon glyphicon-log-out"></span>&nbsp;&nbsp;Log out');
        $('.panel-title > a').css('text-align', 'left');
        $('#fnameAcc').attr('placeholder', 'first name');
        $('#lnameAcc').attr('placeholder', 'last name');
        $('#emailAcc').attr('placeholder', 'E-mail');
        $('#phoneAcc').attr('placeholder', 'Phone');
        $('#oldPass').attr('placeholder', 'Old password');
        $('#newPass').attr('placeholder', 'New password');
        $('#confirmPass').attr('placeholder', 'Re-enter password');
        $('#companyName').attr('placeholder', 'Company name');
        $('#industry').attr('placeholder', 'Industry');
        $('.panel-body input[type=submit]').val('Update');
        $.datepicker.setDefaults($.datepicker.regional['']);
        $('#s').attr('placeholder', 'Name Or Phone..');
        $('th').css('text-align', 'left');
        $('.text-center button[class~=btn-success]').text('Save');
        $('.text-center button[class~=btn-danger]').text('Close');
        $('#titleLang').text('Languages').append('<a href="#"></a>');
        $('#chsLang').text('Choose Language:');
        $('#myAccWind').text('My Account').append('<a href="#"></a>');
        $('.tabledit-toolbar button[class~=tabledit-save-button]').text('Save');
        $('.tabledit-toolbar button[class~=tabledit-restore-button]').text('Restore');
        $('.tabledit-toolbar button[class~=tabledit-confirm-button]').text('Confirm');
        $('div.open').attr('title', 'Main menu').tooltip('fixTitle');
        $('#addMember').attr('title', 'Add Subscriper').tooltip('fixTitle');
        $('#btnDivs').attr('title', 'Edit Divisions').tooltip('fixTitle');
        $('#myAccWind a').attr({ 'data-toggle': 'tooltip', 'data-placement': 'right', 'title': 'Account Details' }).tooltip('fixTitle');
        $('#titleLang a').attr({ 'data-toggle': 'tooltip', 'data-placement': 'right', 'title': 'Change language' }).tooltip('fixTitle');
        $('#accordion').find('.panel-default:eq(0) .panel-title').attr({ 'data-toggle': 'tooltip', 'data-placement': 'right', 'title': 'Update Name Or Phone' }).tooltip('fixTitle');
        $('#accordion').find('.panel-default:eq(1) .panel-title').attr({ 'data-toggle': 'tooltip', 'data-placement': 'right', 'title': 'Update Password' }).tooltip('fixTitle');
        $('#accordion').find('.panel-default:eq(2) .panel-title').attr({ 'data-toggle': 'tooltip', 'data-placement': 'right', 'title': 'Update Company Name' }).tooltip('fixTitle');
        tooltipGoDetails = 'click to show details!';
        alertSuccessTitle = 'Done!';
        alertSuccessText = 'Saved New Data!';
        alertSuccessTextSend = 'Send new mail succesfully!';
        alertWarningTitle = 'Warning';
        alertWarningText = 'Nothing Changed! You did not enter any value';
        alertActiveText = 'Please Activate Your Account from link in mail sended to you!';
        alertWarningTextMems = 'Must choose a date or by default we will assign it tomorrow';
        alertWarningTextPaid = 'Can not enter a value greater than the amount due, which = ';
        alertWarningTextPaidType = 'Must enter number only!';
        alertErrorTitle = 'Wrong!'
        alertErrorText = 'Old password is Uncorrect!';
        alertBtnText = 'OK';
        alertDeleteTitle = "Are you sure?";
        alertDeleteText = "You will not be able to recover this programme again!";
        alertDeleteUserText = "You will not be able to recover this user again! You can just block him using Status button.";
        alertDeleteItemText = "You will not be able to recover this item again!";
        alertDeletedItemText = "The item has been deleted.";
        alertBtnDeleteText = "Yes, delete it!";
        alertBanText = 'You will not be able to (check in) or (Renewal) for this Membership!';
        alertActiveText = 'Will be Activate (check in) and (Renewal) this Membership!';
        alertBtnActiveText = "Yes, activate it!";
        alertBtnBanText = "Yes, suspend it!";
        alertBtnCancelText = 'Cancel';
        alertDeletedTitle = "Deleted!";
        alertDeletedText = "The Programme has been deleted.";
        alertDeletedUserText = "User has been deleted.";
        noMemberships = 'No current membership!';
        txt_Subscription = 'Subscription in';
        txt_EndAfter = 'ends after';
        txt_Day = ' Day';
        txt_Visit = ' Visit';
        txt_InvoiceNo = 'Invoice No.';
        txt_NeedToPay = 'need to pay balance due:';
        txt_on = 'on';
        txt_Dated = 'dated';
        activationAgain = 'Send activation mail again';
        langDataTable = "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/English.json";
        exportDataTable = 'Save as ';
        PrintDataTable = 'Print';
        btnNotifSettingDataTable = 'Notifications Settings';
        tooltipEdit = 'Edit';
        tooltipDelete = 'Delete';
        tooltipBlock = 'Click to block';
        tooltipActivate = 'Click to Activate';
        if ($(window).width() >= 750) {
            $('#topbar1').insertBefore($('#topbar2'));
        }
    }
    else if (langg == 'ar-sa') {
        $('*').css('direction', 'rtl');
        $('#calAll').find('*').css('direction', 'ltr');
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['menu1'] = 'التحكم في أنواع الاشتراكات';
        LanggKeys[langg]['menu2'] = 'التحكم في العناصر الإضافية';
        LanggKeys[langg]['menu3'] = 'إدارة المستخدمين';
        LanggKeys[langg]['menu4'] = 'تقارير';
        LanggKeys[langg]['menu5'] = 'إعدادات';
        LanggKeys[langg]['notifHead'] = '   إشعارات   ';
        LanggKeys[langg]['searchHead'] = '   المشتركين   ';
        LanggKeys[langg]['calendarHead'] = '   الإشتراكات   ';
        LanggKeys[langg]['accBasic'] = 'بيانات الحساب';
        LanggKeys[langg]['accPass'] = 'تغيير كلمة المرور';
        LanggKeys[langg]['accInfo'] = 'بيانات المؤسسة';
        LanggKeys[langg]['evntMemsName'] = 'المشترك';
        LanggKeys[langg]['evntMemsUsed'] = 'مرات الحضور';
        LanggKeys[langg]['evntMemsCheck'] = 'تسجيل حضور';
        LanggKeys[langg]['ClientSubs'] = '   إشتراكاتي   ';
        thPeriod = 'فترة الاشتراك';
        thBooked = 'الزيارات المحجوزة';
        btnRenew = 'تجديد';
        btnNew = 'اشتراك جديد';
        btnPay = 'دفع';
        activeInvoice = 'تنشيط الاشتراك';
        banInvoice = 'تعطيل الاشتراك';
        $('head title').text('إشتراكاتي');
        $('.exportNotif').text('تحميل ');
        $('#btnLogOut').html('<span class="glyphicon glyphicon-log-out"></span>&nbsp;&nbsp;خروج');
        $('.panel-title > a').css('text-align', 'right');
        $('#fnameAcc').attr('placeholder', 'الإسم الأول');
        $('#lnameAcc').attr('placeholder', 'الإسم الأخير');
        $('#emailAcc').attr('placeholder', 'البريد الإلكتروني');
        $('#phoneAcc').attr('placeholder', 'رقم الهاتف');
        $('#oldPass').attr('placeholder', 'كلمة المرور القديمة');
        $('#newPass').attr('placeholder', 'كلمة المرور الجديدة');
        $('#confirmPass').attr('placeholder', 'تأكيد كلمة المرور الجديدة');
        $('#companyName').attr('placeholder', 'اسم المؤسسة');
        $('#industry').attr('placeholder', 'مجال العمل');
        $('.panel-body input[type=submit]').val('حفظ التعديلات');
        $.datepicker.setDefaults($.datepicker.regional['ar']);
        $('#s').attr('placeholder', 'البحث بالاسم او الهاتف ..');
        $('th').css('text-align', 'right');
        $('.text-center button[class~=btn-success]').text('حفظ');
        $('.text-center button[class~=btn-danger]').text('الغاء');
        $('#titleLang').text('اللغة').append('<a href="#"></a>');
        $('#chsLang').text('اختيار اللغة:');
        $('#myAccWind').text('حسابي').append('<a href="#"></a>');
        $('.tabledit-toolbar button[class~=tabledit-save-button]').text('حفظ');
        $('.tabledit-toolbar button[class~=tabledit-restore-button]').text('إلغاء');
        $('.tabledit-toolbar button[class~=tabledit-confirm-button]').text('مسح');
        $('div.open:not(.oppenned)').attr('title', 'القائمة الرئيسية').tooltip('fixTitle');
        $('#addMember').attr('title', 'إضافة مشترك جديد').tooltip('fixTitle');
        $('#btnDivs').attr('title', 'تعديل الأقسام').tooltip('fixTitle');
        $('#myAccWind a').attr({ 'data-toggle': 'tooltip', 'data-placement': 'right', 'title': 'بيانات الحساب' }).tooltip('fixTitle');
        $('#titleLang a').attr({ 'data-toggle': 'tooltip', 'data-placement': 'right', 'title': 'تغيير اللغة' }).tooltip('fixTitle');
        $('#accordion').find('.panel-default:eq(0) .panel-title').attr({ 'data-toggle': 'tooltip', 'data-placement': 'right', 'title': 'الإسم والهاتف' }).tooltip('fixTitle');
        $('#accordion').find('.panel-default:eq(1) .panel-title').attr({ 'data-toggle': 'tooltip', 'data-placement': 'right', 'title': 'كلمة المرور' }).tooltip('fixTitle');
        $('#accordion').find('.panel-default:eq(2) .panel-title').attr({ 'data-toggle': 'tooltip', 'data-placement': 'right', 'title': 'اسم الشركة' }).tooltip('fixTitle');
        tooltipGoDetails = 'اضغط لعرض التفاصيل!';
        alertSuccessTitle = 'تم بنجاح';
        alertSuccessText = 'حفظ البيانات الجديدة!';
        alertSuccessTextSend = 'تم ارسال رابط التفعيل مرة أخرى بنجاح!';
        alertWarningTitle = 'ملاحظة';
        alertWarningText = 'لم يتم ادخال اي بيانات جديدة!';
        alertActiveText = 'الرجاء تفعيل جميع خصائص البرنامج من خلال الرابط في الإيميل المرسل لكم!';
        alertWarningTextMems = 'يجب اختيار تاريخ أو سيتم تحديد الغد كموعد افتراضي!';
        alertWarningTextPaid = 'لا يمكن إدخال قيمة أكبر من لمبلغ المطلوب، والذي = ';
        alertWarningTextPaidType = 'يجب ادخال ارقام فقط!';
        alertErrorTitle = 'خطأ في البيانات'
        alertErrorText = 'كلمة المرور القديمة غير صحيحة!';
        alertBtnText = 'حسنا';
        alertDeleteTitle = "هل أنت متأكد؟";
        alertDeleteText = "لن تستطيع اعادة تفعيل هذا البرنامج مرة أخرى!";
        alertDeleteUserText = "لن تستطيع اعادة تفعيل هذا المستخدم مرة أخرى! يمكنك فقط عمل حظر  له باستخدام زر التفعيل!";
        alertDeleteItemText = "لن تستطيع اعادة تفعيل هذا العنصر مرة أخرى!";
        alertDeletedItemText = "تم إزالة العنصر بنجاح.";
        alertBtnDeleteText = "نعم، قم بالحذف!";
        alertBanText = 'لن تستطيع تسجيل حضور أو تجديد هذه العضوية!';
        alertActiveText = 'سيتم تفعيل تسجيل الحضور والتجديد لهذه العضوية!';
        alertBtnActiveText = "نعم، قم بالتنشيط !";
        alertBtnBanText = "نعم، قم بالتعطيل !";
        alertBtnCancelText = 'إلغاء';
        alertDeletedTitle = "تم الحذف!";
        alertDeletedText = "تم إزالة البرنامج بنجاح.";
        alertDeletedUserText = "تم إزالة المستخدم بنجاح.";
        noMemberships = 'لايوجد اشتراك حاليا!';
        txt_Subscription = 'الاشتراك في';
        txt_EndAfter = 'ينتهي بعد';
        txt_Day = ' يوم';
        txt_Visit = ' زيارة';
        txt_InvoiceNo = 'الفاتورة رقم';
        txt_NeedToPay = 'تحتاج لدفع مبلغ مستحق:';
        txt_on = 'في';
        txt_Dated = 'بتاريخ';
        activationAgain = 'ارسال رابط التفعيل مرة أخرى';
        langDataTable = "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Arabic.json";
        exportDataTable = 'حفظ كـ ';
        PrintDataTable = 'طباعة';
        btnNotifSettingDataTable = 'ضبط الإشعارات';
        tooltipEdit = 'تعديل';
        tooltipDelete = 'حذف';
        tooltipBlock = 'اضغط للحظر';
        tooltipActivate = 'اضغط للتنشيط';
        if ($(window).width() >= 750) {
            $('#topbar1').insertAfter($('#topbar2'));
        }
    }
}

//translate validation masseges:
function convertLangValidation(langg) {
    if (langg == 'en' || langg == 'en-gb') {
        $('#frmMember').bootstrapValidator('setLocale', 'en_US');
        $('#frmMembership').bootstrapValidator('setLocale', 'en_US');
        $('#frmChngAcc').bootstrapValidator('setLocale', 'en_US');
        $('#frmChngPass').bootstrapValidator('setLocale', 'en_US');
        $('#frmChngCompany').bootstrapValidator('setLocale', 'en_US');
        $('#frmAddDiv').bootstrapValidator('setLocale', 'en_US');
        $('#dialogMemType #frmProgram').bootstrapValidator('setLocale', 'en_US');
        $('#dialogMetaData #frmAddDiv').bootstrapValidator('setLocale', 'en_US');
        $('#dialogMetaData #frmProgram').bootstrapValidator('setLocale', 'en_US');
        $('#frmStaff').bootstrapValidator('setLocale', 'en_US');
        $('#frmItem').bootstrapValidator('setLocale', 'en_US');
        $('#frmSettingNotif').bootstrapValidator('setLocale', 'en_US');
        $('#frmAccountMem').bootstrapValidator('setLocale', 'en_US');
    }
    else if (langg == 'ar-sa') {
        $('#frmMember').bootstrapValidator('setLocale', 'ar_MA');
        $('#frmMembership').bootstrapValidator('setLocale', 'ar_MA');
        $('#frmChngAcc').bootstrapValidator('setLocale', 'ar_MA');
        $('#frmChngPass').bootstrapValidator('setLocale', 'ar_MA');
        $('#frmChngCompany').bootstrapValidator('setLocale', 'ar_MA');
        $('#frmAddDiv').bootstrapValidator('setLocale', 'ar_MA');
        $('#dialogMemType #frmProgram').bootstrapValidator('setLocale', 'ar_MA');
        $('#dialogMetaData #frmAddDiv').bootstrapValidator('setLocale', 'ar_MA');
        $('#dialogMetaData #frmProgram').bootstrapValidator('setLocale', 'ar_MA');
        $('#frmStaff').bootstrapValidator('setLocale', 'ar_MA');
        $('#frmItem').bootstrapValidator('setLocale', 'ar_MA');
        $('#frmSettingNotif').bootstrapValidator('setLocale', 'ar_MA');
        $('#frmAccountMem').bootstrapValidator('setLocale', 'ar_MA');
    }
}


/* Reset switcherLang */
$(document).ready(function () {

    // Style switcherLang
    $('.switcherLang').animate({
        left: '-270px'
    });

    $(".switcherLang").on("click", "h2", function (e) {
        e.preventDefault();
        var divLang = $('.switcherLang');
        console.log(divLang.css('left'));
        if (divLang.css('left') === '-270px') {
            $('.switcherLang').animate({
                left: '0px'
            });
        } else {
            $('.switcherLang').animate({
                left: '-270px'
            });
        }

        var divSetting = $('.sliderSetting');
        console.log(divSetting.css('left'));
        if (divSetting.css('left') === '-255px') {

        } else {
            $('.sliderSetting').animate({
                left: '-255px'
            });
        }        
    })

    if ($(window).width() <= 750) {
        $('.sliderSetting').css('top', '230px');
        $('.switcherLang').css('top', '285px');
    }
});