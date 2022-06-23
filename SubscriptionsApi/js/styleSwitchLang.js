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
                <tr><td><a id="fr" name="4" data-format="dd-mm-yy" class="layout">French</a></td><td><i>La Date: journée-mois-an</i><br/><i>eg: 31-12-2020</i></td></tr> \
		        <tr><td><a id="ar-sa" name="2" data-format="yy-mm-dd" class="layout">عربي</a></td><td><i>التاريخ: يوم-شهر-سنة</i><br/><i>eg: 2020-12-31</i></td></tr> \
		    </table> \
        </div> \
        <div class="clear"></div> \
    </div> \
	';

    $(".switcherLang").prepend(styleswitcherLangstr);

});

/* language converter */
var setLanguageSpinner;
$(document).ready(function () {
    $('.layout-switcherLang a').click(function () {
        setLanguageSpinner = LoadSpinner.start();
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
        return "";
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
        return "";
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
        convertLangCalendar(langg);
        convertLangTableButtons(langg);
        var defGetCalendarEvents = GetCalendarEvents();
        defGetCalendarEvents.then(GetAllInvoices());
    }
    else if (targ == 'dialogMem') {
        convertLangdialogMem(langg);
    }
    else if (targ == 'dialogMemType') {
        convertLangdialogMemType(langg);
    }
    else if (targ == 'dialogStaff') {
        convertLangdialogStaff(langg);
    }
    else if (targ == 'dialogDivsList') {
        convertLangdialogDivsList(langg);
    }
    else if (targ == 'dialogMetaData') {
        convertLangdialogMetaData(langg);
    }
    else if (targ == 'dialogReports') {
        convertLangdialogReport(langg);
    }
    else if (targ == 'dialogReportPayment') {
        convertLangdialogReportPayment(langg);
    }
    else if (targ == 'dialogReportMembers') {
        convertLangdialogReportMembers(langg);
    }
    else if (targ == 'dialogReportCheckins') {
        convertLangdialogReportCheckins(langg);
    }
    else if (targ == 'dialogReportProgramsSubs') {
        convertLangdialogReportProgramsSubs(langg);
    }
    else if (targ == 'dialogReportProgramsPays') {
        convertLangdialogReportProgramsPays(langg);
    }
    else if (targ == 'dialogReportTimeLineBusiness') {
        convertLangdialogReportTimeLineBusiness(langg);
    }
    else if (targ == 'dialogReportTimeLineCashFlow') {
        convertLangdialogReportTimeLineCashFlow(langg);
    }
    else if (targ == 'dialogItems') {
        convertLangdialogItems(langg);
    }
    else if (targ == 'tabInvoice') {
        convertLangBillReceipt(langg);
    }
    else if (targ == 'dialogSettings') {
        convertLangdialogSettings(langg);
    }
    else if (targ == 'dialogAccountMember') {
        convertLangdialogAccountMember(langg);
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
        LanggKeys[langg]['titleSite'] = 'Subscriptions Management System';
        LanggKeys[langg]['menu1'] = 'Programmes';
        LanggKeys[langg]['menu2'] = 'Extras';
        LanggKeys[langg]['menu3'] = 'Staff';
        LanggKeys[langg]['menu4'] = 'Reports';
        LanggKeys[langg]['menu5'] = 'Settings';
        LanggKeys[langg]['menu6'] = 'Help';
        LanggKeys[langg]['notifHead'] = 'Notifications';
        LanggKeys[langg]['searchHead'] = 'Subscribers';
        LanggKeys[langg]['calendarHead'] = 'Subscriptions';
        LanggKeys[langg]['accBasic'] = 'Account basic';
        LanggKeys[langg]['accPass'] = 'Account password';
        LanggKeys[langg]['accInfo'] = 'Company info';
        LanggKeys[langg]['evntMemsName'] = 'Name';
        LanggKeys[langg]['evntMemsUsed'] = 'Used Visits';
        LanggKeys[langg]['evntMemsAdd'] = 'Add subscription';
        LanggKeys[langg]['evntMemsCheck'] = 'Check-in';
        thPeriod = 'Period';
        thBooked = 'Booked Visits';
        btnRenew = 'Renew';
        btnNew = 'Subscribers';
        btnPay = 'Pay';
        activeInvoice = 'Re-active subscription';
        banInvoice = 'Suspend subscription';
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
        $('#calSearch').attr('placeholder', 'Programme title ..').css('direction', 'ltr');;
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
        $('#addMember').attr('title', 'Add Subscriber').tooltip('fixTitle');
        $('#btnDivs').attr('title', 'Edit Divisions').tooltip('fixTitle');
        $('#myAccWind a').attr({ 'data-toggle': 'tooltip', 'data-placement': 'right', 'title': 'Account Details' }).tooltip('fixTitle');
        $('#titleLang a').attr({ 'data-toggle': 'tooltip', 'data-placement': 'right', 'title': 'Change language' }).tooltip('fixTitle');
        $('#accordion').find('.panel-default:eq(0) .panel-title').attr({ 'data-toggle': 'tooltip', 'data-placement': 'right', 'title': 'Update Name Or Phone' }).tooltip('fixTitle');
        $('#accordion').find('.panel-default:eq(1) .panel-title').attr({ 'data-toggle': 'tooltip', 'data-placement': 'right', 'title': 'Update Password' }).tooltip('fixTitle');
        $('#accordion').find('.panel-default:eq(2) .panel-title').attr({ 'data-toggle': 'tooltip', 'data-placement': 'right', 'title': 'Update Company Name' }).tooltip('fixTitle');
        tooltipGoDetails = 'click to show details!';
        alertSuccessTitle = 'Done!';
        alertSuccessText = 'Saved New Data!';
        alertSuccessTextSend = 'Send new mail successfully!';
        alertWarningTitle = 'Warning';
        alertWarningText = 'Nothing Changed! You did not enter any value';
        alertActiveText = 'To use this feature, please go to your email inbox to activate your account!';
        alertWarningTextMems = 'Must choose a date or by default we will assign it tomorrow';
        alertWarningTextPaid = 'Can not enter a value greater than the amount due, which = ';
        alertWarningTextPaidType = 'Must enter number only!';
        alertErrorTitle = 'Wrong!'
        alertErrorText = 'Old password is incorrect!';
        alertBtnText = 'OK';
        alertDeleteTitle = "Are you sure?";
        alertDeleteText = "You will not be able to recover this programme again!";
        alertDeleteUserText = "You will not be able to recover this user again! You can just block him using Status button.";
        alertDeleteItemText = "You will not be able to recover this item again!";
        alertDeletedItemText = "The item has been deleted.";
        alertBtnDeleteText = "Yes, delete it!";
        alertBanText = 'You will not be able to (check in) or (Renewal) for this Membership!';
        alertActivateText = 'Will be Activate (check in) and (Renewal) this Membership!';
        alertBtnActiveText = "Yes, activate it!";
        alertBtnBanText = "Yes, suspend it!";
        alertBtnCancelText = 'Cancel';
        alertDeletedTitle = "Deleted!";
        alertDeletedText = "The Programme has been deleted.";
        alertDeletedUserText = "User has been deleted.";
        alertSendBugTitle = "Something Wrong !";
        alertSendBugText = "Send us about this error to fix it:";
        alertBtnBugText = "Send"
        alertSendBugDone = "Thank you, will fix it soon !";
        noMemberships = 'No current membership!';
        txt_Subscription = 'Subscription in';
        txt_program = 'The programme ';
        txt_EndAfter = 'ends after';
        txt_EndOn = 'ends in';
        txt_Day = ' Day';
        txt_Month = ' Month';
        txt_Year = ' Year';
        txt_Visit = ' Visit';
        txt_InvoiceNo = 'Invoice No.';
        txt_NeedToPay = 'need to pay balance due:';
        txt_on = 'on';
        txt_Dated = 'dated';
        txt_ActiveSubs = 'Number of active subscribers: ';
        activationAgain = 'Send activation mail again';
        langDataTable = "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/English.json";
        exportDataTable = 'Save as ';
        PrintDataTable = 'Print';
        btnNotifSettingDataTable = 'Notifications Settings';
        tooltipClone = 'Clone';
        tooltipEdit = 'Edit';
        tooltipDelete = 'Delete';
        tooltipBlock = 'Click to block';
        tooltipActivate = 'Click to Activate';
        if ($(window).width() >= 750) {
            //$('#topbar1').insertBefore($('#topbar2'));
        }
    }
    else if (langg == 'fr') {
        $('*').css('direction', 'ltr');
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['titleSite'] = 'Système de gestion des abonnements';
        LanggKeys[langg]['menu1'] = 'Programmes';
        LanggKeys[langg]['menu2'] = 'Extras';
        LanggKeys[langg]['menu3'] = 'Personnel';
        LanggKeys[langg]['menu4'] = 'Rapports';
        LanggKeys[langg]['menu5'] = 'Paramètres';
        LanggKeys[langg]['menu6'] = 'Aidez-moi';
        LanggKeys[langg]['notifHead'] = 'Notifications';
        LanggKeys[langg]['searchHead'] = 'Les abonnés';
        LanggKeys[langg]['calendarHead'] = 'Abonnements';
        LanggKeys[langg]['accBasic'] = 'Information sur le compte';
        LanggKeys[langg]['accPass'] = 'Mot de passe';
        LanggKeys[langg]['accInfo'] = "Information d'entreprise";
        LanggKeys[langg]['evntMemsName'] = 'prénom';
        LanggKeys[langg]['evntMemsUsed'] = 'Visites utilisées';
        LanggKeys[langg]['evntMemsAdd'] = 'Ajouter un abonnement';
        LanggKeys[langg]['evntMemsCheck'] = 'Enregistrement';
        thPeriod = 'Période';
        thBooked = 'Visites réservées';
        btnRenew = 'Renouveler';
        btnNew = 'Les abonnés';
        btnPay = 'Payer';
        activeInvoice = 'Abonnement réactif';
        banInvoice = "Suspendre l'abonnement";
        $('.exportNotif').text('EXPORTATION ');
        $('#btnLogOut').html('<span class="glyphicon glyphicon-log-out"></span>&nbsp;&nbsp;Connectez - Out');
        $('.panel-title > a').css('text-align', 'left');
        $('#fnameAcc').attr('placeholder', 'Prénom');
        $('#lnameAcc').attr('placeholder', 'nom de famille');
        $('#emailAcc').attr('placeholder', 'Email');
        $('#phoneAcc').attr('placeholder', 'Téléphone');
        $('#oldPass').attr('placeholder', 'Ancien mot de passe');
        $('#newPass').attr('placeholder', 'Nouveau mot de passe');
        $('#confirmPass').attr('placeholder', 'Retaper le mot de passe');
        $('#companyName').attr('placeholder', 'Nom de la compagnie');
        $('#industry').attr('placeholder', 'Industrie');
        $('.panel-body input[type=submit]').val('mettre à jour');
        $.datepicker.setDefaults($.datepicker.regional['']);
        $('#s').attr('placeholder', 'Nom ou téléphon..');
        $('#calSearch').attr('placeholder', 'Titre du programme ..').css('direction', 'ltr');;
        $('th').css('text-align', 'left');
        $('.text-center button[class~=btn-success]').text('sauvegarder');
        $('.text-center button[class~=btn-danger]').text('Fermer');
        $('#titleLang').text('Langues').append('<a href="#"></a>');
        $('#chsLang').text('Choisissez la langue:');
        $('#myAccWind').text('Mon compte').append('<a href="#"></a>');
        $('.tabledit-toolbar button[class~=tabledit-save-button]').text('sauvegarder');
        $('.tabledit-toolbar button[class~=tabledit-restore-button]').text('Restaurer');
        $('.tabledit-toolbar button[class~=tabledit-confirm-button]').text('Confirmer');
        $('div.open').attr('title', 'Menu principal').tooltip('fixTitle');
        $('#addMember').attr('title', 'Ajouter un abonné').tooltip('fixTitle');
        $('#btnDivs').attr('title', 'Modifier les divisions').tooltip('fixTitle');
        $('#myAccWind a').attr({ 'data-toggle': 'tooltip', 'data-placement': 'right', 'title': 'details du compte' }).tooltip('fixTitle');
        $('#titleLang a').attr({ 'data-toggle': 'tooltip', 'data-placement': 'right', 'title': 'Changer de langue' }).tooltip('fixTitle');
        $('#accordion').find('.panel-default:eq(0) .panel-title').attr({ 'data-toggle': 'tooltip', 'data-placement': 'right', 'title': 'Nom ou téléphone de mise à jour' }).tooltip('fixTitle');
        $('#accordion').find('.panel-default:eq(1) .panel-title').attr({ 'data-toggle': 'tooltip', 'data-placement': 'right', 'title': 'Mettre à jour le mot de passe' }).tooltip('fixTitle');
        $('#accordion').find('.panel-default:eq(2) .panel-title').attr({ 'data-toggle': 'tooltip', 'data-placement': 'right', 'title': 'Update Company prénom' }).tooltip('fixTitle');
        tooltipGoDetails = 'afficher les détails!';
        alertSuccessTitle = 'terminé!';
        alertSuccessText = 'Enregistré!';
        alertSuccessTextSend = "Message d'activation ré-envoyé!";
        alertWarningTitle = 'Attention';
        alertWarningText = "Rien n'a changé! Vous n'avez pas saisi de valeur";
        alertActiveText = 'Pour utiliser cette fonctionnalité, accédez à votre boîte de réception pour activer votre compte!';
        alertWarningTextMems = 'Doit choisir une date. (Par défaut: demain)';
        alertWarningTextPaid = "Impossible d'entrer une valeur supérieure au montant dû, qui = ";
        alertWarningTextPaidType = 'Ne doit entrer que le numéro!';
        alertErrorTitle = 'Faux!'
        alertErrorText = 'Ancien mot de passe est incorrect!';
        alertBtnText = "D'accord";
        alertDeleteTitle = "Êtes-vous sûr?";
        alertDeleteText = "Vous ne pourrez pas récupérer ce programme à nouveau!";
        alertDeleteUserText = "Vous ne pourrez pas récupérer cet utilisateur à nouveau! Vous pouvez simplement l'bloquer en utilisant le bouton État.";
        alertDeleteItemText = "Vous ne pourrez pas récupérer cet élément à nouveau!";
        alertDeletedItemText = "L'élément a été supprimé.";
        alertBtnDeleteText = "Oui, supprimez-le!";
        alertBanText = 'Vous ne pourrez pas (vérifier) ou (Renouvellement) pour cette adhésion!';
        alertActivateText = 'Seront activés (check-in) et (Renouvellement) cette adhésion!';
        alertBtnActiveText = "Oui, activez-le!";
        alertBtnBanText = "Oui, suspendez-le!";
        alertBtnCancelText = 'Annuler';
        alertDeletedTitle = "Supprimé!";
        alertDeletedText = "Le programme a été supprimé.";
        alertDeletedUserText = "L'utilisateur a été supprimé.";
        alertSendBugTitle = "Quelque chose ne va pas !";
        alertSendBugText = "Envoyez-nous sur cette erreur pour le réparer:";
        alertBtnBugText = "Envoyer"
        alertSendBugDone = "Merci, le réparerez bientôt !";
        noMemberships = 'Aucune adhésion actuelle!';
        txt_Subscription = 'Inscription dans';
        txt_program = 'Le programme ';
        txt_EndAfter = 'Se termine après';
        txt_EndOn = 'fini dans';
        txt_Day = ' journée';
        txt_Month = ' Mois';
        txt_Year = ' An';
        txt_Visit = ' Visite';
        txt_InvoiceNo = 'Numéro de facture.';
        txt_NeedToPay = 'Besoin de payer le solde dû:';
        txt_on = 'sur';
        txt_Dated = 'daté';
        txt_ActiveSubs = "Nombre d'abonnés actifs: ";
        activationAgain = "Envoyer un email d'activation à nouveau";
        langDataTable = "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json";
        exportDataTable = 'Enregistrer sous ';
        PrintDataTable = 'Impression';
        btnNotifSettingDataTable = 'Paramètres des notifications';
        tooltipClone = 'Cloner ';
        tooltipEdit = 'modifier';
        tooltipDelete = 'Effacer';
        tooltipBlock = 'Cliquez pour bloquer';
        tooltipActivate = 'Cliquez pour activer';
        marcheMSG = 'Marché Message!';
        expireMSG1 = "Votre abonnement gratuit au système expirera après: ";
        expireMSG2 = "Votre abonnement gratuit au système a expiré!";
        if ($(window).width() >= 750) {
            //$('#topbar1').insertBefore($('#topbar2'));
        }
    }
    else if (langg == 'ar-sa') {
        $('*').css('direction', 'rtl');
        $('#calAll').find('*').css('direction', 'ltr');
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['titleSite'] = 'برنامج ادارة الاشتراكات';
        LanggKeys[langg]['menu1'] = 'التحكم في أنواع الاشتراكات';
        LanggKeys[langg]['menu2'] = 'التحكم في العناصر الإضافية';
        LanggKeys[langg]['menu3'] = 'إدارة المستخدمين';
        LanggKeys[langg]['menu4'] = 'تقارير';
        LanggKeys[langg]['menu5'] = 'إعدادات';
        LanggKeys[langg]['menu6'] = 'مساعدة';
        LanggKeys[langg]['notifHead'] = '   إشعارات   ';
        LanggKeys[langg]['searchHead'] = '   المشتركين   ';
        LanggKeys[langg]['calendarHead'] = '   الإشتراكات   ';
        LanggKeys[langg]['accBasic'] = 'بيانات الحساب';
        LanggKeys[langg]['accPass'] = 'تغيير كلمة المرور';
        LanggKeys[langg]['accInfo'] = 'بيانات المؤسسة';
        LanggKeys[langg]['evntMemsName'] = 'المشترك';
        LanggKeys[langg]['evntMemsUsed'] = 'مرات الحضور';
        LanggKeys[langg]['evntMemsAdd'] = 'إضافة اشتراك';
        LanggKeys[langg]['evntMemsCheck'] = 'تسجيل حضور';
        thPeriod = 'فترة الاشتراك';
        thBooked = 'الزيارات المحجوزة';
        btnRenew = 'تجديد';
        btnNew = 'المشتركين';
        btnPay = 'دفع';
        activeInvoice = 'تنشيط الاشتراك';
        banInvoice = 'تعطيل الاشتراك';
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
        $('#calSearch').attr('placeholder', 'اسم البرنامج ..').css('direction', 'rtl');;
        $('th').css('text-align', 'right');
        $('.text-center button[class~=btn-success]').text('حفظ');
        $('.text-center button[class~=btn-danger]').text('إلغاء');
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
        $('#accordion').find('.panel-default:eq(0) .panel-title').attr({ 'data-toggle': 'tooltip', 'data-placement': 'right', 'title': 'الاسم والهاتف' }).tooltip('fixTitle');
        $('#accordion').find('.panel-default:eq(1) .panel-title').attr({ 'data-toggle': 'tooltip', 'data-placement': 'right', 'title': 'كلمة المرور' }).tooltip('fixTitle');
        $('#accordion').find('.panel-default:eq(2) .panel-title').attr({ 'data-toggle': 'tooltip', 'data-placement': 'right', 'title': 'اسم الشركة' }).tooltip('fixTitle');
        tooltipGoDetails = 'اضغط لعرض التفاصيل!';
        alertSuccessTitle = 'تم بنجاح';
        alertSuccessText = 'حفظ البيانات الجديدة!';
        alertSuccessTextSend = 'تم إرسال رابط التفعيل مرة أخرى بنجاح!';
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
        alertDeleteText = "لن تستطيع إعادة تفعيل هذا البرنامج مرة أخرى!";
        alertDeleteUserText = "لن تستطيع إعادة تفعيل هذا المستخدم مرة أخرى! يمكنك فقط عمل حظر  له باستخدام زر التفعيل!";
        alertDeleteItemText = "لن تستطيع إعادة تفعيل هذا العنصر مرة أخرى!";
        alertDeletedItemText = "تم إزالة العنصر بنجاح.";
        alertBtnDeleteText = "نعم، قم بالحذف!";
        alertBanText = 'لن تستطيع تسجيل حضور أو تجديد هذه العضوية!';
        alertActivateText = 'سيتم تفعيل تسجيل الحضور والتجديد لهذه العضوية!';
        alertBtnActiveText = "نعم، قم بالتنشيط !";
        alertBtnBanText = "نعم، قم بالتعطيل !";
        alertBtnCancelText = 'إلغاء';
        alertDeletedTitle = "تم الحذف!";
        alertDeletedText = "تم إزالة البرنامج بنجاح.";
        alertDeletedUserText = "تم إزالة المستخدم بنجاح.";
        alertSendBugTitle = "حدث خطأ غير مقصود !";
        alertSendBugText = "الرجاء ارسال تفاصيل هذا الخطأ ليتم إصلاحه في أقرب وقت:";
        alertBtnBugText = "إرسال"
        alertSendBugDone = "شكرا، سيتم مراجعة الخطأ في أقرب وقت ممكن.";
        noMemberships = 'لايوجد اشتراك حاليا!';
        txt_Subscription = 'الاشتراك في';
        txt_program = 'الاشتراكات في ';
        txt_EndAfter = 'ينتهي بعد';
        txt_EndOn = 'تنتهي في';
        txt_Day = ' يوم';
        txt_Month = ' شهر';
        txt_Year = ' سنة';
        txt_Visit = ' زيارة';
        txt_InvoiceNo = 'الفاتورة رقم';
        txt_NeedToPay = 'تحتاج لدفع مبلغ مستحق:';
        txt_on = 'في';
        txt_Dated = 'بتاريخ';
        txt_ActiveSubs = 'عدد الاشتراكات النشطة حاليا: ';
        activationAgain = 'إرسال رابط التفعيل مرة أخرى';
        langDataTable = "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Arabic.json";
        exportDataTable = 'حفظ كـ ';
        PrintDataTable = 'طباعة';
        btnNotifSettingDataTable = 'ضبط الإشعارات';
        tooltipClone = 'نسخ';
        tooltipEdit = 'تعديل';
        tooltipDelete = 'حذف';
        tooltipBlock = 'اضغط للحظر';
        tooltipActivate = 'اضغط للتنشيط';
        marcheMSG = 'رسالة هامة!';
        expireMSG1 = "اشتراكك المجاني في النظام سوف ينتهي بعد: ";
        expireMSG2 = "اشتراكك المجاني في النظام انتهى!";
        if ($(window).width() >= 750) {
            //$('#topbar1').insertAfter($('#topbar2'));
        }
    }
}

// translate calendar:
function convertLangCalendar(langg) {
    $('#calendar').fullCalendar('option', 'lang', langg);
    if (langg == 'en' || langg == 'en-gb') {
        btnClose = 'Close';
        btnToday = 'Today';
        noEventMember = 'No Subscribers !';
        eventMembers = ' Subscribers';
        btnExpand();
        $('.fc-right').attr({ 'data-toggle': 'tooltip', 'data-placement': 'top', 'title': 'Expand calendar' }).tooltip('fixTitle');
        $('.fc-prev-button').attr({ 'data-toggle': 'tooltip', 'data-placement': 'top', 'title': 'Past' }).tooltip('fixTitle');
        $('.fc-next-button').attr({ 'data-toggle': 'tooltip', 'data-placement': 'top', 'title': 'Next' }).tooltip('fixTitle');
    }
    else if (langg == 'fr') {
        btnClose = 'Fermer';
        btnToday = "Aujourd'hui";
        noEventMember = "Pas d'abonnés !";
        eventMembers = ' Les abonnés';
        btnExpand();
        $('.fc-right').attr({ 'data-toggle': 'tooltip', 'data-placement': 'top', 'title': 'maximiser le calendrier' }).tooltip('fixTitle');
        $('.fc-prev-button').attr({ 'data-toggle': 'tooltip', 'data-placement': 'top', 'title': 'Passé' }).tooltip('fixTitle');
        $('.fc-next-button').attr({ 'data-toggle': 'tooltip', 'data-placement': 'top', 'title': 'Prochain' }).tooltip('fixTitle');
    }
    else if (langg == 'ar-sa') {
        btnClose = 'إغلاق';
        btnToday = 'اليوم';
        noEventMember = 'لايوجد مشتركين !';
        eventMembers = ' مشترك';
        btnExpand();
        $('.fc-right').attr({ 'data-toggle': 'tooltip', 'data-placement': 'top', 'title': 'تفاصيل التقويم' }).tooltip('fixTitle');
        $('.fc-prev-button').attr({ 'data-toggle': 'tooltip', 'data-placement': 'top', 'title': 'السابق' }).tooltip('fixTitle');
        $('.fc-next-button').attr({ 'data-toggle': 'tooltip', 'data-placement': 'top', 'title': 'التالي' }).tooltip('fixTitle');
    }
}

//translate dialog member:
function convertLangdialogMem(langg) {
    if (langg == 'en' || langg == 'en-gb') {
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['btninv'] = '  Invoice';
        LanggKeys[langg]['memImg'] = 'Choose Photo';
        LanggKeys[langg]['memFName'] = 'First Name:';
        LanggKeys[langg]['memLName'] = 'Last Name:';
        LanggKeys[langg]['memEmail'] = 'Email:';
        LanggKeys[langg]['memPhone'] = 'Phone:';
        $('#memBirthDate').html('Birthdate:');
        LanggKeys[langg]['memSex'] = 'Gender: ';
        LanggKeys[langg]['memAdress'] = 'Address: ';
        LanggKeys[langg]['memNote'] = 'Note: ';
        LanggKeys[langg]['divs'] = 'Division: ';
        LanggKeys[langg]['nprog'] = 'Programme: ';
        $('#startDateFix').html('Start date:');
        LanggKeys[langg]['to'] = 'To ';
        LanggKeys[langg]['endop'] = 'End date: ';
        LanggKeys[langg]['perio'] = 'Period: ';
        LanggKeys[langg]['totvst1'] = 'Booked up Visits: ';
        LanggKeys[langg]['totvst2'] = 'Programme Visits: ';
        LanggKeys[langg]['totprc'] = 'Total price: ';
        LanggKeys[langg]['usevst'] = 'Used visits: ';
        LanggKeys[langg]['gdHisType'] = 'Programme';
        LanggKeys[langg]['gdHisStDate'] = 'Start Date';
        LanggKeys[langg]['gdHisEndDate'] = 'End Date';
        LanggKeys[langg]['gdHisDue'] = 'Check-in';
        LanggKeys[langg]['gdHisBookviss'] = 'Booked Visits';
        LanggKeys[langg]['gdHisviss'] = 'Used Visits';
        LanggKeys[langg]['gdHisRenew'] = 'Renewal';
        LanggKeys[langg]['nextMem'] = 'Next';
        LanggKeys[langg]['nextMemship'] = 'Next';
        LanggKeys[langg]['memberNameTop'] = 'New Member';
        LanggKeys[langg]['progch'] = '--Choose--';
        LanggKeys[langg]['divch'] = '--Filter--';
        LanggKeys[langg]['totalDues'] = 'Total Due:';

        LanggKeys[langg]['memNoteProg2'] = 'Program Description:';
        LanggKeys[langg]['progDays2'] = 'Days:';
        LanggKeys[langg]['progDaySunday2'] = 'Sunday ';
        LanggKeys[langg]['progDayMonday2'] = 'Monday ';
        LanggKeys[langg]['progDayTuesday2'] = 'Tuesday ';
        LanggKeys[langg]['progDayWednesday2'] = 'Wednesday ';
        LanggKeys[langg]['progDayThursday2'] = 'Thursday ';
        LanggKeys[langg]['progDayFriday2'] = 'Friday ';
        LanggKeys[langg]['progDaySaturday2'] = 'Saturday ';
        LanggKeys[langg]['progTimeSt2'] = 'Start time:';
        LanggKeys[langg]['progTimeEnd2'] = 'End time:';
        LanggKeys[langg]['progValidDur2'] = 'Program Validity:';
        LanggKeys[langg]['progValidDays2'] = '  Day';
        LanggKeys[langg]['progCapacity2'] = 'Capacity:';
        LanggKeys[langg]['progCapacityMems2'] = '  Members';
        $('#progDaysSubs input[value="6"], #progDaysSubs input[value="6"] + label').insertAfter($('#progDaysSubs input[value="5"] + label'));

        createMemberAcc = 'Create Account';
        editMemberAcc = 'Edit Account';
        btnBlock_Block = 'Block';
        btnBlock_Activate = 'Activate';
        titleMemSave = 'Member Details Saved!';
        textMemSave = 'Will go to Membership details ..';
        textMemSaveAccount = 'Member account created successfully !';
        titleMemshipSave = 'Done!';
        textMemshipSave = 'Added new Membership!';
        goInvoice = 'click to goto invoice!';
        lastSubsTitle = 'Last Subscription: ';
        TotalDueTitle = 'Total Due: ';
        banMemship = 'Click to suspend';
        activeMemship = 'Click to reactivate'
        itemchoose = 'Choose item ..';
        titleJoiningDate = 'Joining at: ';
        alertWarningTextItems = 'You did not add item !';
        alertWarningTextFixed = 'This member already in this Program ! Please choose another one !';
        alertWarningTextCapacity = 'Capacity is full for this program, this subscriber will be added over the defined capacity !';
        alertWarningTextDuplicate = 'This member already subscribe in this day in this Program ! Please choose another one !';
        styleCut = 'left: -2em; right:auto;';
        $('#dialog-form').dialog('option', 'title', 'Member profile');
        if ($(window).width() >= 750) {
            $('#div3Meminf').insertAfter($('#div2Meminf'));
            $('#image-preview').insertBefore($('#div2Meminf'));
            $('#div3DialogHead').insertAfter($('#div2DialogHead'));
            $('#div1DialogHead').insertBefore($('#div2DialogHead'));
            $('#div1Mems').insertBefore($('#div2Mems'));
        }
        $('#btnMale').insertBefore($('#btnFemale'));
        $('#tabsMember ul:first li:eq(0) a').text("Subscriber");
        $('#tabsMember ul:first li:eq(1) a').text('Subscribe');
        $('#tabsMember ul:first li:eq(2) a').text("Visits");
        $('#tabsMember ul:first li:eq(3) a').text("Invoice");
        $('#tabsMember ul:first li:eq(4) a').text("Subscriptions");
        $('#btnMale').html('<input type="radio" name="options" id="option1"/>Male');
        $('#btnFemale').html('<input type="radio" name="options" id="option2"/>Female');
        $('.ui-tabs .ui-tabs-nav li.ui-tabs-selected, .ui-tabs .ui-tabs-nav li.ui-state-default').css('float', 'left');
        $('.ui-tabs .ui-tabs-nav li a').css('float', 'left');
        $('#memberTotalDues').attr('title', 'Click to show all member invoices!').tooltip('fixTitle');
        convertLangTableDialogMem(langg);
    }
    else if (langg == 'fr') {
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['btninv'] = "  Facture d'achat";
        LanggKeys[langg]['memImg'] = 'Choisir une photo';
        LanggKeys[langg]['memFName'] = 'Prénom:';
        LanggKeys[langg]['memLName'] = 'Nom de famille:';
        LanggKeys[langg]['memEmail'] = 'Email:';
        LanggKeys[langg]['memPhone'] = 'Téléphone:';
        $('#memBirthDate').html('Date de naissance:');
        LanggKeys[langg]['memSex'] = 'Le genre: ';
        LanggKeys[langg]['memAdress'] = 'Adresse: ';
        LanggKeys[langg]['memNote'] = 'Remarque: ';
        LanggKeys[langg]['divs'] = 'Division: ';
        LanggKeys[langg]['nprog'] = 'Programme: ';
        $('#startDateFix').html('Date de début:');
        LanggKeys[langg]['to'] = 'À ';
        LanggKeys[langg]['endop'] = 'Date de fin: ';
        LanggKeys[langg]['perio'] = 'Période: ';
        LanggKeys[langg]['totvst1'] = 'Visites réservées: ';
        LanggKeys[langg]['totvst2'] = 'Visites du programme: ';
        LanggKeys[langg]['totprc'] = 'Prix total: ';
        LanggKeys[langg]['usevst'] = 'Visites usées: ';
        LanggKeys[langg]['gdHisType'] = 'Programme';
        LanggKeys[langg]['gdHisStDate'] = 'Date de début';
        LanggKeys[langg]['gdHisEndDate'] = 'Date de fin';
        LanggKeys[langg]['gdHisDue'] = 'Enregistrement';
        LanggKeys[langg]['gdHisBookviss'] = 'Visites réservées';
        LanggKeys[langg]['gdHisviss'] = 'Visites utilisées';
        LanggKeys[langg]['gdHisRenew'] = 'Renouvellement';
        LanggKeys[langg]['nextMem'] = 'Prochain';
        LanggKeys[langg]['nextMemship'] = 'Prochain';
        LanggKeys[langg]['memberNameTop'] = 'Nouveau membre';
        LanggKeys[langg]['progch'] = '--Choisir--';
        LanggKeys[langg]['divch'] = '--Filtre--';
        LanggKeys[langg]['totalDues'] = 'Total dû:';

        LanggKeys[langg]['memNoteProg2'] = 'Description du programme:';
        LanggKeys[langg]['progDays2'] = 'Journées:';
        LanggKeys[langg]['progDaySunday2'] = 'dimanche ';
        LanggKeys[langg]['progDayMonday2'] = 'Lundi ';
        LanggKeys[langg]['progDayTuesday2'] = 'Mardi ';
        LanggKeys[langg]['progDayWednesday2'] = 'Mercredi ';
        LanggKeys[langg]['progDayThursday2'] = 'Jeudi ';
        LanggKeys[langg]['progDayFriday2'] = 'Vendredi ';
        LanggKeys[langg]['progDaySaturday2'] = 'samedi ';
        LanggKeys[langg]['progTimeSt2'] = 'Heure de début:';
        LanggKeys[langg]['progTimeEnd2'] = 'Heure de fin:';
        LanggKeys[langg]['progValidDur2'] = 'Durée de validation:';
        LanggKeys[langg]['progValidDays2'] = '  journée';
        LanggKeys[langg]['progCapacity2'] = 'Capacité:';
        LanggKeys[langg]['progCapacityMems2'] = '  Membres';
        $('#progDaysSubs input[value="6"], #progDaysSubs input[value="6"] + label').insertAfter($('#progDaysSubs input[value="5"] + label'));

        createMemberAcc = 'Créer un compte';
        editMemberAcc = 'Modifier le compte';
        btnBlock_Block = 'Bloc';
        btnBlock_Activate = 'Activer';
        titleMemSave = 'Détails des membres sauvegardés!';
        textMemSave = "Aller aux détails de l'adhésion ..";
        textMemSaveAccount = 'Compte membre créé avec succès !';
        titleMemshipSave = 'Terminé!';
        textMemshipSave = "Ajout d'une nouvelle adhésion!";
        goInvoice = 'Cliquez pour envoyer la facture!';
        lastSubsTitle = 'Dernier abonnement: ';
        TotalDueTitle = 'Total dû: ';
        banMemship = 'Cliquez pour suspendre';
        activeMemship = 'Cliquez pour réactiver'
        itemchoose = "Choisissez l'élément ..";
        titleJoiningDate = "date d'inscription: ";
        alertWarningTextItems = "Vous n'avez pas ajouté d'article !";
        alertWarningTextFixed = 'Ce membre déjà dans ce programme! Choisissez un autre !';
        alertWarningTextCapacity = 'La capacité est pleine pour ce programme, cet abonné sera ajouté sur la capacité définie !';
        alertWarningTextDuplicate = "Ce membre s'inscrit déjà ce jour dans ce programme! Choisissez un autre !";
        styleCut = 'left: -2em; right:auto;';
        $('#dialog-form').dialog('option', 'title', 'Profil de membre');
        if ($(window).width() >= 750) {
            $('#div3Meminf').insertAfter($('#div2Meminf'));
            $('#image-preview').insertBefore($('#div2Meminf'));
            $('#div3DialogHead').insertAfter($('#div2DialogHead'));
            $('#div1DialogHead').insertBefore($('#div2DialogHead'));
            $('#div1Mems').insertBefore($('#div2Mems'));
        }
        $('#btnMale').insertBefore($('#btnFemale'));
        $('#tabsMember ul:first li:eq(0) a').text("Abonné");
        $('#tabsMember ul:first li:eq(1) a').text('Souscrire');
        $('#tabsMember ul:first li:eq(2) a').text("Facture d'achat");
        $('#tabsMember ul:first li:eq(3) a').text("Abonnements");
        $('#btnMale').html('<input type="radio" name="options" id="option1"/>Mâle');
        $('#btnFemale').html('<input type="radio" name="options" id="option2"/>Femelle');
        $('.ui-tabs .ui-tabs-nav li.ui-tabs-selected, .ui-tabs .ui-tabs-nav li.ui-state-default').css('float', 'left');
        $('.ui-tabs .ui-tabs-nav li a').css('float', 'left');
        $('#memberTotalDues').attr('title', 'Cliquez pour afficher toutes les factures des membres!').tooltip('fixTitle');
        convertLangTableDialogMem(langg);
    }
    else if (langg == 'ar-sa') {
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['btninv'] = '  فاتورة';
        LanggKeys[langg]['memImg'] = 'اختيار صورة';
        LanggKeys[langg]['memFName'] = 'الاسم الأول:';
        LanggKeys[langg]['memLName'] = 'الاسم الأخير: ';
        LanggKeys[langg]['memEmail'] = 'البريد الإلكتروني: ';
        LanggKeys[langg]['memPhone'] = 'رقم الهاتف: ';
        LanggKeys[langg]['memBirth'] = 'تاريخ الميلاد: ';
        LanggKeys[langg]['memSex'] = 'النوع: ';
        LanggKeys[langg]['memAdress'] = 'العنوان: ';
        LanggKeys[langg]['memNote'] = 'ملاحظات: ';
        LanggKeys[langg]['divs'] = 'القسم: ';
        LanggKeys[langg]['nprog'] = 'نوع الاشتراك: ';
        LanggKeys[langg]['to'] = 'إلى ';
        LanggKeys[langg]['stfix'] = 'بدء الاشتراك: ';
        LanggKeys[langg]['endop'] = 'انتهاء الاشتراك: ';
        LanggKeys[langg]['perio'] = 'الفترة: ';
        LanggKeys[langg]['totvst1'] = 'عدد الحصص المحجوزة: ';
        LanggKeys[langg]['totvst2'] = 'عدد حصص الاشتراك: ';
        LanggKeys[langg]['totprc'] = 'سعر الاشتراك: ';
        LanggKeys[langg]['usevst'] = 'الحصص المستخدمة: ';
        LanggKeys[langg]['gdHisType'] = 'نوع الاشتراك';
        LanggKeys[langg]['gdHisStDate'] = 'بداية الاشتراك';
        LanggKeys[langg]['gdHisEndDate'] = 'نهاية الاشتراك';
        LanggKeys[langg]['gdHisDue'] = 'تسجيل حضور';
        LanggKeys[langg]['gdHisBookviss'] = 'حصص محجوزة';
        LanggKeys[langg]['gdHisviss'] = 'مرات الحضور';
        LanggKeys[langg]['gdHisRenew'] = 'التجديد';
        LanggKeys[langg]['nextMem'] = 'التالي';
        LanggKeys[langg]['nextMemship'] = 'التالي';
        LanggKeys[langg]['memberNameTop'] = 'مشترك جديد';
        LanggKeys[langg]['progch'] = '-- اختار البرنامج --';
        LanggKeys[langg]['divch'] = '-- تصفية بالقسم --';
        LanggKeys[langg]['totalDues'] = 'إجمالي المستحقات:';
        LanggKeys[langg]['memNoteProg2'] = 'وصف البرنامج:';
        LanggKeys[langg]['progDays2'] = 'الأيام:';
        LanggKeys[langg]['progDaySaturday2'] = 'السبت  ';
        LanggKeys[langg]['progDaySunday2'] = 'الأحد  ';
        LanggKeys[langg]['progDayMonday2'] = 'الإثنين  ';
        LanggKeys[langg]['progDayTuesday2'] = 'الثلاثاء  ';
        LanggKeys[langg]['progDayWednesday2'] = 'الأربعاء  ';
        LanggKeys[langg]['progDayThursday2'] = 'الخميس  ';
        LanggKeys[langg]['progDayFriday2'] = 'الجمعة  ';
        LanggKeys[langg]['progTimeSt2'] = 'من الساعة:';
        LanggKeys[langg]['progTimeEnd2'] = 'حتى الساعة:';
        LanggKeys[langg]['progValidDur2'] = 'صلاحية البرنامج:';
        LanggKeys[langg]['progValidDays2'] = '  يوم';
        LanggKeys[langg]['progCapacity2'] = 'السعة:';
        LanggKeys[langg]['progCapacityMems2'] = '  مشتركين';
        $('#progDaysSubs input[value="6"], #progDaysSubs input[value="6"] + label').insertBefore($('#progDaysSubs input[value="0"]'));

        createMemberAcc = 'إنشاء حساب';
        editMemberAcc = 'تحديث الحساب';
        btnBlock_Block = 'تعطيل';
        btnBlock_Activate = 'تنشيط';
        titleMemSave = 'تم حفظ بيانات المشترك بنجاح!';
        textMemSave = 'سيتم تحويلك إلى بيانات الاشتراك ..';
        textMemSaveAccount = 'تم حفظ بيانات حساب المشترك بنجاح !';
        titleMemshipSave = 'تم بحمد الله!';
        textMemshipSave = 'تسجيل الاشتراك الجديد بنجاح!';
        goInvoice = 'اضغط لعرض تفاصيل الفاتورة!';
        lastSubsTitle = 'آخر اشتراك: ';
        TotalDueTitle = 'المبلغ المستحق: ';
        banMemship = 'اضغط لتعطيل العضوية';
        activeMemship = 'اضغط لإعادة التنشيط';
        itemchoose = 'اختار عنصر ..';
        titleJoiningDate = 'أول اشتراك: ';
        styleCut = 'left:auto; right:-2em;';
        alertWarningTextItems = 'لم تقم باختيار العنصر !';
        alertWarningTextFixed = 'هذا المشترك لديه بالفعل هذا الاشتراك ! من فضلك اختر نوعا آخر !';
        alertWarningTextDuplicate = 'هذا المشترك لديه بالفعل اشتراك بنفس التاريخ ! من فضلك اختر نوعا آخر !';
        alertWarningTextCapacity = 'السعة ممتلئة لهذا البرنامج، سيتم إضافة هذا المشترك فوق السعة التي تم تحديدها مسبقا !';
        $('#dialog-form').dialog('option', 'title', 'ملف المشترك');
        if ($(window).width() >= 750) {
            $('#div3Meminf').insertBefore($('#div2Meminf'));
            $('#image-preview').insertAfter($('#div2Meminf'));
            $('#div3DialogHead').insertBefore($('#div2DialogHead'));
            $('#div1DialogHead').insertAfter($('#div2DialogHead'));
            $('#div1Mems').insertAfter($('#div2Mems'));
        }
        $('#btnMale').insertAfter($('#btnFemale'));
        $('#tabsMember ul:first li:eq(0) a').text("بيانات المشترك");
        $('#tabsMember ul:first li:eq(1) a').text('اضافة اشتراك');
        $('#tabsMember ul:first li:eq(2) a').text("بيانات الفاتورة");
        $('#tabsMember ul:first li:eq(3) a').text("سجل الاشتراكات");
        $('#btnMale').html('<input type="radio" name="options" id="option1"/>ذكر');
        $('#btnFemale').html('<input type="radio" name="options" id="option2"/>أنثى');
        $('.ui-tabs .ui-tabs-nav li.ui-tabs-selected, .ui-tabs .ui-tabs-nav li.ui-state-default').css('float', 'right');
        $('.ui-tabs .ui-tabs-nav li a').css('float', 'right');
        $('#memberTotalDues').attr('title', 'اضغط لعرض جميع فواتير هذا المشترك!').tooltip('fixTitle');
        convertLangTableDialogMem(langg);
    }
}
function convertLangTableDialogMem(langg) {
    if (langg == 'en' || langg == 'en-gb') {
        $('td.tdRenew button').text('Renew');
        if ($(window).width() <= 600) {
            $(".tblMerg td").attr("style", "padding-left:50% !important; padding-right:8px;");
            $('#stDEL').remove();
            $('head').append('<style id="stDEL">.tblMerg td:before{right:unset !important; left:6px !important;}</style>');
            $('#memHistory td:nth-of-type(1)').attr('data-before', 'Programme:');
            $('#memHistory td:nth-of-type(2)').attr('data-before', 'Start Date:');
            $('#memHistory td:nth-of-type(3)').attr('data-before', 'End Date:');
            $('#memHistory td:nth-of-type(4)').attr('data-before', 'Booked Visits:');
            $('#memHistory td:nth-of-type(5)').attr('data-before', 'Used Visits:');
            $('#memHistory td:nth-of-type(6)').attr('data-before', 'Check-in:');
            $('#memHistory tfoot').insertAfter($('#memHistory tbody'));
            $('#memHistory tbody td').removeClass('text-center');
            $('#tabsMember-3 table.meta').css('width', '50%');
            $('#tabsMember-3 table.balance').css('width', '100%');
            $('#tabsMember-3 th').css('font-size', '75%');
        }
    }
    else if (langg == 'fr') {
        $('td.tdRenew button').text('Renouveler');
        if ($(window).width() <= 600) {
        $(".tblMerg td").attr("style", "padding-left:50% !important; padding-right:8px;");
        $('#stDEL').remove();
        $('head').append('<style id="stDEL">.tblMerg td:before{right:unset !important; left:6px !important;}</style>');
        $('#memHistory td:nth-of-type(1)').attr('data-before', 'Programme:');
        $('#memHistory td:nth-of-type(2)').attr('data-before', 'Date de début:');
        $('#memHistory td:nth-of-type(3)').attr('data-before', 'Date de fin:');
        $('#memHistory td:nth-of-type(4)').attr('data-before', 'Visites réservées:');
        $('#memHistory td:nth-of-type(5)').attr('data-before', 'Visites utilisées:');
        $('#memHistory td:nth-of-type(6)').attr('data-before', 'Enregistrement:');
        $('#memHistory tfoot').insertAfter($('#memHistory tbody'));
        $('#memHistory tbody td').removeClass('text-center');
        $('#tabsMember-3 table.meta').css('width', '50%');
        $('#tabsMember-3 table.balance').css('width', '100%');
        $('#tabsMember-3 th').css('font-size', '75%');
    }
}
    else if (langg == 'ar-sa') {
        $('td.tdRenew button').text('تجديد');
        if ($(window).width() <= 600) {
            $(".tblMerg td").attr("style", "padding-right:50%; padding-left:8px !important");
            $('#stDEL').remove();
            $('head').append('<style id="stDEL">.tblMerg td:before{left:unset !important; right:6px !important;}</style>');
            $('#memHistory td:nth-of-type(1)').attr('data-before', 'الاشتراك:');
            $('#memHistory td:nth-of-type(2)').attr('data-before', 'بدأ في:');
            $('#memHistory td:nth-of-type(3)').attr('data-before', 'ينتهي في:');
            $('#memHistory td:nth-of-type(4)').attr('data-before', 'حصص محجوزة:');
            $('#memHistory td:nth-of-type(5)').attr('data-before', 'مرات الحضور:');
            $('#memHistory td:nth-of-type(6)').attr('data-before', 'تسجيل حضور:');
            $('#memHistory tfoot').insertAfter($('#memHistory tbody'));
            $('#memHistory tbody td').removeClass('text-center');
            $('#tabsMember-3 table.meta').css('width', '50%');
            $('#tabsMember-3 table.balance').css('width', '100%');
            $('#tabsMember-3 th').css('font-size', '75%');
        }
    }
}

//translate dialog Programmes types:
function convertLangdialogMemType(langg) {
    if (langg == 'en' || langg == 'en-gb') {
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['typeProgInfo'] = 'Programme Info';
        LanggKeys[langg]['typeProgLen'] = 'Programme Length';
        LanggKeys[langg]['typeProgName'] = 'Name:';
        LanggKeys[langg]['typeProgdiv'] = 'Division:';
        LanggKeys[langg]['typeProgfee'] = 'Programme Fees:';
        LanggKeys[langg]['typeProgbais'] = 'Programme Basis:';
        LanggKeys[langg]['typeOpenProg'] = 'Open programme';
        LanggKeys[langg]['typeFixProg'] = 'Fixed Period';
        LanggKeys[langg]['type1visProg'] = 'Per Visit';
        LanggKeys[langg]['typevissProg'] = 'Multi Visits';
        LanggKeys[langg]['openProglen'] = 'Duration:';
        LanggKeys[langg]['openProg-day'] = 'Day';
        LanggKeys[langg]['openProg-month'] = 'Month';
        LanggKeys[langg]['openProg-year'] = 'Year';
        $('#startProgFix').html('Start date:');
        $('#endProgFix').html('End date:');
        LanggKeys[langg]['progFix1vis'] = 'Number of Visits:';
        LanggKeys[langg]['progFixviss'] = 'Number of Visits:';
        LanggKeys[langg]['memTypeGridProg'] = 'Type';
        LanggKeys[langg]['memTypeGridPrice'] = 'Price';
        LanggKeys[langg]['memTypeGridCount'] = 'Members';
        LanggKeys[langg]['allProgs'] = 'All programs';
        LanggKeys[langg]['byDivs'] = 'By Division';
        LanggKeys[langg]['memNoteProg'] = 'Program Description:';
        LanggKeys[langg]['progDays'] = 'Days (Optional):';
        LanggKeys[langg]['progDaySunday'] = 'S';
        LanggKeys[langg]['progDayMonday'] = 'M';
        LanggKeys[langg]['progDayTuesday'] = 'T';
        LanggKeys[langg]['progDayWednesday'] = 'W';
        LanggKeys[langg]['progDayThursday'] = 'T';
        LanggKeys[langg]['progDayFriday'] = 'F';
        LanggKeys[langg]['progDaySaturday'] = 'S';
        LanggKeys[langg]['progTimeSt'] = 'Start time:';
        LanggKeys[langg]['progTimeEnd'] = 'End time:';
        LanggKeys[langg]['progValidDur'] = 'Program Validity (Optional):';
        LanggKeys[langg]['progValidDays'] = '  Day';
        LanggKeys[langg]['progCapacity'] = 'Capacity (Optional):';
        LanggKeys[langg]['progCapacityMems'] = '  Members';
        $('#dialogMemType').dialog('option', 'title', 'Programs Management');
        $('#progDays input[value="6"]').attr('title', 'Saturday').tooltip('fixTitle');
        $('#progDays input[value="0"]').attr('title', 'Sunday').tooltip('fixTitle');
        $('#progDays input[value="1"]').attr('title', 'Monday').tooltip('fixTitle');
        $('#progDays input[value="2"]').attr('title', 'Tuesday').tooltip('fixTitle');
        $('#progDays input[value="3"]').attr('title', 'Wednesday').tooltip('fixTitle');
        $('#progDays input[value="4"]').attr('title', 'Thursday').tooltip('fixTitle');
        $('#progDays input[value="5"]').attr('title', 'Friday').tooltip('fixTitle');
        $('#progDays input[value="6"], #progDays input[value="6"] + label').insertAfter($('#progDays input[value="5"] + label'));
        $('#frmProgram').bootstrapValidator('updateMessage', 'startTime', 'regexp', 'Please enter a valid time between 00:00 and 23:59');
        $('#frmProgram').bootstrapValidator('updateMessage', 'endTime', 'regexp', 'Please enter a valid time between 00:00 and 23:59');
        tabAddProgram = 'Add Program';
        tabEditProgram = 'Edit Program';
        tooltipStop = 'Click to stop';
        tooltipRun = 'Click to rerun';
        txt_CopyOf = 'Copy of: ';
        $('#tabsMem ul:first li:eq(0) a').text("Add Program");
        $('#tabsMem ul:first li:eq(1) a').text("Existing Programs");
        $('.ui-tabs .ui-tabs-nav li.ui-tabs-selected, .ui-tabs .ui-tabs-nav li.ui-state-default').css('float', 'left');
        $('.ui-tabs .ui-tabs-nav li a').css('float', 'left');
        if ($(window).width() >= 750) {
            $('#div1memType').insertBefore($('#div2memType'));
        }
        if ($(window).width() <= 600) {
            $(".tblMerg td").attr("style", "padding-left:50% !important; padding-right:8px;");
            $(".tdActions").attr("style", "white-space: nowrap; width: 1%;padding-left: 8px !important;");
            $('#stDEL').remove();
            $('head').append('<style id="stDEL">.tblMerg td:before{right:unset !important; left:6px !important;}</style>');
            $('#membershipGrid td:nth-of-type(1)').attr('data-before', 'Type:');
            $('#membershipGrid td:nth-of-type(2)').attr('data-before', 'Price:');
            $('#membershipGrid td:nth-of-type(3)').attr('data-before', 'Members:');
        }
    }
    else if (langg == 'fr') {
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['typeProgInfo'] = 'Informations sur le programme';
        LanggKeys[langg]['typeProgLen'] = 'Longueur du programme';
        LanggKeys[langg]['typeProgName'] = 'nom:';
        LanggKeys[langg]['typeProgdiv'] = 'Division:';
        LanggKeys[langg]['typeProgfee'] = 'Frais de programme:';
        LanggKeys[langg]['typeProgbais'] = 'Base de programme:';
        LanggKeys[langg]['typeOpenProg'] = 'Programme ouvert';
        LanggKeys[langg]['typeFixProg'] = 'période fixe';
        LanggKeys[langg]['type1visProg'] = 'Par visite';
        LanggKeys[langg]['typevissProg'] = 'Multi Visites';
        LanggKeys[langg]['openProglen'] = 'Durée:';
        LanggKeys[langg]['openProg-day'] = 'journée';
        LanggKeys[langg]['openProg-month'] = 'Mois';
        LanggKeys[langg]['openProg-year'] = 'année';
        $('#startProgFix').html('Date de début:');
        $('#endProgFix').html('Date de fin:');
        LanggKeys[langg]['progFix1vis'] = 'Nombre de visites:';
        LanggKeys[langg]['progFixviss'] = 'Nombre de visites:';
        LanggKeys[langg]['memTypeGridProg'] = 'Type';
        LanggKeys[langg]['memTypeGridPrice'] = 'prix';
        LanggKeys[langg]['memTypeGridCount'] = 'Membres';
        LanggKeys[langg]['allProgs'] = 'Tous les programmes';
        LanggKeys[langg]['byDivs'] = 'Par division';
        LanggKeys[langg]['memNoteProg'] = 'Description du programme:';
        LanggKeys[langg]['progDays'] = 'Journées (Optionnel):';
        LanggKeys[langg]['progDaySunday'] = 'D';
        LanggKeys[langg]['progDayMonday'] = 'L';
        LanggKeys[langg]['progDayTuesday'] = 'M';
        LanggKeys[langg]['progDayWednesday'] = 'M';
        LanggKeys[langg]['progDayThursday'] = 'J';
        LanggKeys[langg]['progDayFriday'] = 'V';
        LanggKeys[langg]['progDaySaturday'] = 'S';
        LanggKeys[langg]['progTimeSt'] = 'Heure de début:';
        LanggKeys[langg]['progTimeEnd'] = 'Heure de fin:';
        LanggKeys[langg]['progValidDur'] = 'Validité du programme (Optionnel):';
        LanggKeys[langg]['progValidDays'] = '  journée';
        LanggKeys[langg]['progCapacity'] = 'Capacité (Optionnel):';
        LanggKeys[langg]['progCapacityMems'] = '  Membres';
        $('#dialogMemType').dialog('option', 'title', 'Gestion des programmes');
        $('#progDays input[value="6"]').attr('title', 'samedi').tooltip('fixTitle');
        $('#progDays input[value="0"]').attr('title', 'dimanche ').tooltip('fixTitle');
        $('#progDays input[value="1"]').attr('title', 'lundi ').tooltip('fixTitle');
        $('#progDays input[value="2"]').attr('title', 'mardi ').tooltip('fixTitle');
        $('#progDays input[value="3"]').attr('title', 'mercredi ').tooltip('fixTitle');
        $('#progDays input[value="4"]').attr('title', 'jeudi ').tooltip('fixTitle');
        $('#progDays input[value="5"]').attr('title', 'vendredi ').tooltip('fixTitle');
        $('#progDays input[value="6"], #progDays input[value="6"] + label').insertAfter($('#progDays input[value="5"] + label'));
        $('#frmProgram').bootstrapValidator('updateMessage', 'startTime', 'regexp', 'Entrez un moment valide entre 00:00 et 23:59');
        $('#frmProgram').bootstrapValidator('updateMessage', 'endTime', 'regexp', 'Entrez un moment valide entre 00:00 et 23:59');
        tabAddProgram = 'Ajouter un programme';
        tabEditProgram = 'Modifier le programme';
        tooltipStop = 'Cliquez pour arrêter';
        tooltipRun = 'Cliquez pour relancer';
        txt_CopyOf = 'Copie de: ';
        $('#tabsMem ul:first li:eq(0) a').text("Ajouter un programme");
        $('#tabsMem ul:first li:eq(1) a').text("Programmes existants");
        $('.ui-tabs .ui-tabs-nav li.ui-tabs-selected, .ui-tabs .ui-tabs-nav li.ui-state-default').css('float', 'left');
        $('.ui-tabs .ui-tabs-nav li a').css('float', 'left');
        if ($(window).width() >= 750) {
            $('#div1memType').insertBefore($('#div2memType'));
        }
        if ($(window).width() <= 600) {
            $(".tblMerg td").attr("style", "padding-left:50% !important; padding-right:8px;");
            $(".tdActions").attr("style", "white-space: nowrap; width: 1%;padding-left: 8px !important;");
            $('#stDEL').remove();
            $('head').append('<style id="stDEL">.tblMerg td:before{right:unset !important; left:6px !important;}</style>');
            $('#membershipGrid td:nth-of-type(1)').attr('data-before', 'Type:');
            $('#membershipGrid td:nth-of-type(2)').attr('data-before', 'Prix:');
            $('#membershipGrid td:nth-of-type(3)').attr('data-before', 'Membres:');
        }
    }
    else if (langg == 'ar-sa') {
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['typeProgInfo'] = 'بيانات البرنامج';
        LanggKeys[langg]['typeProgLen'] = 'مدة البرنامج';
        LanggKeys[langg]['typeProgName'] = 'اسم البرنامج:';
        LanggKeys[langg]['typeProgdiv'] = 'قسم:';
        LanggKeys[langg]['typeProgfee'] = 'سعر البرنامج:';
        LanggKeys[langg]['typeProgbais'] = 'نظام البرنامج:';
        LanggKeys[langg]['typeOpenProg'] = 'مدة قابلة للتجديد';
        LanggKeys[langg]['typeFixProg'] = 'مدة محددة غير قابلة للتجديد';
        LanggKeys[langg]['type1visProg'] = 'حصة واحدة';
        LanggKeys[langg]['typevissProg'] = 'عدد حصص معينة';
        LanggKeys[langg]['openProglen'] = 'المدة:';
        LanggKeys[langg]['openProg-day'] = 'يوم';
        LanggKeys[langg]['openProg-month'] = 'شهر';
        LanggKeys[langg]['openProg-year'] = 'سنة';
        $('#startProgFix').html('يبدأ في:');
        $('#endProgFix').html('ينتهي في:');
        LanggKeys[langg]['progFix1vis'] = 'عدد الزيارات:';
        LanggKeys[langg]['progFixviss'] = 'عدد الزيارات:';
        LanggKeys[langg]['memTypeGridProg'] = 'البرنامج';
        LanggKeys[langg]['memTypeGridPrice'] = 'السعر';
        LanggKeys[langg]['memTypeGridCount'] = 'المشتركين';
        LanggKeys[langg]['allProgs'] = 'جميع البرامج';
        LanggKeys[langg]['byDivs'] = 'حسب القسم';
        LanggKeys[langg]['memNoteProg'] = 'تعريف بالبرنامج:';
        LanggKeys[langg]['progDays'] = 'الأيام (إختياري):';
        LanggKeys[langg]['progDaySunday'] = 'ح';
        LanggKeys[langg]['progDayMonday'] = 'ن';
        LanggKeys[langg]['progDayTuesday'] = 'ث';
        LanggKeys[langg]['progDayWednesday'] = 'ر';
        LanggKeys[langg]['progDayThursday'] = 'خ';
        LanggKeys[langg]['progDayFriday'] = 'ج';
        LanggKeys[langg]['progDaySaturday'] = 'س';
        LanggKeys[langg]['progTimeSt'] = 'من الساعة:';
        LanggKeys[langg]['progTimeEnd'] = 'حتى الساعة:';
        LanggKeys[langg]['progValidDur'] = 'صلاحية البرنامج (إختياري):';
        LanggKeys[langg]['progValidDays'] = '  يوم';
        LanggKeys[langg]['progCapacity'] = 'السعة (إختياري):';
        LanggKeys[langg]['progCapacityMems'] = '  مشتركين';
        $('#dialogMemType').dialog('option', 'title', 'برامج الاشتراكات');
        $('#progDays input[value="6"]').attr('title', 'السبت').tooltip('fixTitle');
        $('#progDays input[value="0"]').attr('title', 'الأحد').tooltip('fixTitle');
        $('#progDays input[value="1"]').attr('title', 'الإثنين').tooltip('fixTitle');
        $('#progDays input[value="2"]').attr('title', 'الثلاثاء').tooltip('fixTitle');
        $('#progDays input[value="3"]').attr('title', 'الأربعاء').tooltip('fixTitle');
        $('#progDays input[value="4"]').attr('title', 'الخميس').tooltip('fixTitle');
        $('#progDays input[value="5"]').attr('title', 'الجمعة').tooltip('fixTitle');
        $('#progDays input[value="6"], #progDays input[value="6"] + label').insertBefore($('#progDays input[value="0"]'));
        $('#frmProgram').bootstrapValidator('updateMessage', 'startTime', 'regexp', 'الرجاء إدخال توقيت صالح بين 00:00 و 23:59');
        $('#frmProgram').bootstrapValidator('updateMessage', 'endTime', 'regexp', 'الرجاء إدخال توقيت صالح بين 00:00 و 23:59');
        tabEditProgram = 'تعديل البرنامج';
        tooltipStop = 'اضغط لوقف البرنامج';
        tooltipRun = 'اضغط لاعادة التنشيط';
        tabAddProgram = 'إضافة برنامج';
        txt_CopyOf = ' نسخة من: ';
        $('#tabsMem ul:first li:eq(0) a').text("إضافة برنامج");
        $('#tabsMem ul:first li:eq(1) a').text("البرامج الموجودة");
        $('.ui-tabs .ui-tabs-nav li.ui-tabs-selected, .ui-tabs .ui-tabs-nav li.ui-state-default').css('float', 'right');
        $('.ui-tabs .ui-tabs-nav li a').css('float', 'right');
        if ($(window).width() >= 750) {
            $('#div1memType').insertAfter($('#div2memType'));
        }
        if ($(window).width() <= 600) {
            $(".tblMerg td").attr("style", "padding-right:50%; padding-left:8px !important");
            $(".tdActions").attr("style", "white-space: nowrap; width: 1%;padding-left: 8px !important;");
            $('#stDEL').remove();
            $('head').append('<style id="stDEL">.tblMerg td:before{left:unset !important; right:6px !important;}</style>');
            $('#membershipGrid td:nth-of-type(1)').attr('data-before', 'نوع الاشتراك:');
            $('#membershipGrid td:nth-of-type(2)').attr('data-before', 'السعر:');
            $('#membershipGrid td:nth-of-type(3)').attr('data-before', 'الأعضاء:');
        }
    }
}

//translate small dialog Divisions list:
function convertLangdialogDivsList(langg) {
    if (langg == 'en' || langg == 'en-gb') {
        $('#dialogDivs').dialog('option', 'title', 'Division List');
        LanggKeys[langg]['btnNewDiv'] = 'Add';
        $('#newDiv').attr('placeholder', 'New Division');
    }
    else if (langg == 'fr') {
        $('#dialogDivs').dialog('option', 'title', 'Liste des divisions');
        LanggKeys[langg]['btnNewDiv'] = 'ajouter';
        $('#newDiv').attr('placeholder', 'Nouvelle division');
    }
    else if (langg == 'ar-sa') {
        $('#dialogDivs').dialog('option', 'title', 'قائمة الأقسام');
        LanggKeys[langg]['btnNewDiv'] = 'إضافة';
        $('#newDiv').attr('placeholder', 'قسم جديد');
    }
}

//translate dialog staff management:
function convertLangdialogStaff(langg) {
    if (langg == 'en' || langg == 'en-gb') {
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['staffDetail'] = 'User Details';
        LanggKeys[langg]['staffN'] = 'Name:';
        LanggKeys[langg]['staffUN'] = 'User Name:';
        LanggKeys[langg]['staffPass'] = 'Password:';
        LanggKeys[langg]['staffRePass'] = 'Re-enter Password:';
        LanggKeys[langg]['staffAccess'] = 'Staff Access Rights';
        LanggKeys[langg]['staffRol'] = 'Role:';
        LanggKeys[langg]['staffNo'] = 'Blocked';
        LanggKeys[langg]['staffBais'] = 'Basic';
        LanggKeys[langg]['staffAdmin'] = 'Admin';
        LanggKeys[langg]['staffDesc'] = 'Description:';
        LanggKeys[langg]['staffGridBran'] = 'Branch';
        LanggKeys[langg]['staffGridName'] = 'Name';
        LanggKeys[langg]['staffGridUN'] = 'User Name';
        LanggKeys[langg]['staffGridRole'] = 'Role';
        LanggKeys[langg]['staffGridStat'] = 'Status';
        LanggKeys[langg]['staffch'] = '--Choose--';
        LanggKeys[langg]['staffchb'] = '--Choose--';
        LanggKeys[langg]['mainBr'] = 'Main Branch';
        LanggKeys[langg]['mainBr2'] = 'Main Branch';
        LanggKeys[langg]['staffbr'] = 'Branch';
        LanggKeys[langg]['allBrun'] = 'All Branches';
        LanggKeys[langg]['byBran'] = 'By Branch';
        ownerTitle = 'Owner';
        adminTitle = 'Admin';
        basicTitle = 'Basic';
        ownerSummary = 'Allows full access.';
        adminSummary = "Allow full access but cant block or delete another Admin.";
        basicSummary = "Read only access with write access to Subscription's section.";
        tabAddStaff = 'Add User';
        tabEditStaff = 'Edit User';
        $('#dialogStaff').dialog('option', 'title', 'Staff Management');
        if ($(window).width() >= 750) {
            $('#div1staff').insertBefore($('#div2staff'));
        }
        $('#tabsStaff ul:first li:eq(0) a').text("Add User");
        $('#tabsStaff ul:first li:eq(1) a').text("All Users");
        $('.ui-tabs .ui-tabs-nav li.ui-tabs-selected, .ui-tabs .ui-tabs-nav li.ui-state-default').css('float', 'left');
        $('.ui-tabs .ui-tabs-nav li a').css('float', 'left');
        if ($(window).width() <= 600) {
            $(".tblMerg td").attr("style", "padding-left:50% !important; padding-right:8px;");
            $(".tdActions").attr("style", "white-space: nowrap; width: 1%;padding-left: 8px !important;");
            $('#stDEL').remove();
            $('head').append('<style id="stDEL">.tblMerg td:before{right:unset !important; left:6px !important;}</style>');
            $('#staffHistory td:nth-of-type(1)').attr('data-before', 'Name:');
            $('#staffHistory td:nth-of-type(2)').attr('data-before', 'User Name:');
            $('#staffHistory td:nth-of-type(3)').attr('data-before', 'Branch:');
            $('#staffHistory td:nth-of-type(4)').attr('data-before', 'Role:');
            $('#staffHistory td:nth-of-type(5)').attr('data-before', 'Status:');
        }
        $("#staffHistory select option[value='1']").text('No Access');
        $("#staffHistory select option[value='2']").text('User');
        $("#staffHistory select option[value='3']").text('Admin');
    }
    else if (langg == 'fr') {
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['staffDetail'] = "Détails de l'utilisateur";
        LanggKeys[langg]['staffN'] = 'prénom:';
        LanggKeys[langg]['staffUN'] = "Nom d'utilisateur:";
        LanggKeys[langg]['staffPass'] = 'Mot de passe:';
        LanggKeys[langg]['staffRePass'] = 'Retaper le mot de passe:';
        LanggKeys[langg]['staffAccess'] = "Droits d'accès au personnel";
        LanggKeys[langg]['staffRol'] = 'Rôle:';
        LanggKeys[langg]['staffNo'] = 'Bloqué';
        LanggKeys[langg]['staffBais'] = 'De base';
        LanggKeys[langg]['staffAdmin'] = 'Admin';
        LanggKeys[langg]['staffDesc'] = 'La description:';
        LanggKeys[langg]['staffGridBran'] = 'Branche';
        LanggKeys[langg]['staffGridName'] = 'prénom';
        LanggKeys[langg]['staffGridUN'] = "Nom d'utilisateur";
        LanggKeys[langg]['staffGridRole'] = 'Rôle';
        LanggKeys[langg]['staffGridStat'] = 'Statut';
        LanggKeys[langg]['staffch'] = '--Choisir--';
        LanggKeys[langg]['staffchb'] = '--Choisir--';
        LanggKeys[langg]['mainBr'] = 'Branche principale';
        LanggKeys[langg]['mainBr2'] = 'Branche principale';
        LanggKeys[langg]['staffbr'] = 'Branche';
        LanggKeys[langg]['allBrun'] = 'Toutes les branches';
        LanggKeys[langg]['byBran'] = 'Par Branche';
        ownerTitle = 'Propriétaire';
        adminTitle = 'Admin';
        basicTitle = 'De base';
        ownerSummary = 'Permet un accès complet.';
        adminSummary = "Permet un accès complet, mais ne peut pas bloquer ou supprimer un autre administrateur.";
        basicSummary = "Accès en lecture seule avec accès en écriture à la section de l'abonnement.";
        tabAddStaff = 'Ajouter un utilisateur';
        tabEditStaff = "Modifier l'utilisateur";
        $('#dialogStaff').dialog('option', 'title', 'Gestion du personnel');
        if ($(window).width() >= 750) {
            $('#div1staff').insertBefore($('#div2staff'));
        }
        $('#tabsStaff ul:first li:eq(0) a').text("Ajouter un utilisateur");
        $('#tabsStaff ul:first li:eq(1) a').text("Tous les utilisateurs");
        $('.ui-tabs .ui-tabs-nav li.ui-tabs-selected, .ui-tabs .ui-tabs-nav li.ui-state-default').css('float', 'left');
        $('.ui-tabs .ui-tabs-nav li a').css('float', 'left');
        if ($(window).width() <= 600) {
            $(".tblMerg td").attr("style", "padding-left:50% !important; padding-right:8px;");
            $(".tdActions").attr("style", "white-space: nowrap; width: 1%;padding-left: 8px !important;");
            $('#stDEL').remove();
            $('head').append('<style id="stDEL">.tblMerg td:before{right:unset !important; left:6px !important;}</style>');
            $('#staffHistory td:nth-of-type(1)').attr('data-before', 'prénom:');
            $('#staffHistory td:nth-of-type(2)').attr('data-before', "Nom d'utilisateur:");
            $('#staffHistory td:nth-of-type(3)').attr('data-before', 'Branche:');
            $('#staffHistory td:nth-of-type(4)').attr('data-before', 'Rôle:');
            $('#staffHistory td:nth-of-type(5)').attr('data-before', 'Statut:');
        }
        $("#staffHistory select option[value='1']").text("Pas d'accès");
        $("#staffHistory select option[value='2']").text('Utilisateur');
        $("#staffHistory select option[value='3']").text('Admin');
    }
    else if (langg == 'ar-sa') {
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['staffDetail'] = 'بيانات المستخدم';
        LanggKeys[langg]['staffN'] = 'الاسم:';
        LanggKeys[langg]['staffUN'] = 'اسم المستخدم:';
        LanggKeys[langg]['staffPass'] = 'كلمة المرور:';
        LanggKeys[langg]['staffRePass'] = 'تأكيد كلمة المرور:';
        LanggKeys[langg]['staffAccess'] = 'صلاحيات المستخدم';
        LanggKeys[langg]['staffRol'] = 'درجة الصلاحية:';
        LanggKeys[langg]['staffNo'] = 'بدون صلاحية';
        LanggKeys[langg]['staffBais'] = 'موظف';
        LanggKeys[langg]['staffAdmin'] = 'مدير';
        LanggKeys[langg]['staffDesc'] = 'التوصيف:';
        LanggKeys[langg]['staffGridBran'] = 'الفرع';
        LanggKeys[langg]['staffGridName'] = 'الاسم';
        LanggKeys[langg]['staffGridUN'] = 'اسم المستخدم';
        LanggKeys[langg]['staffGridRole'] = 'الصلاحية';
        LanggKeys[langg]['staffGridStat'] = 'التفعيل';
        LanggKeys[langg]['staffch'] = '--اختار من القائمة--';
        LanggKeys[langg]['staffchb'] = '--اختار من القائمة--';
        LanggKeys[langg]['mainBr'] = 'الفرع الرئيسي';
        LanggKeys[langg]['mainBr2'] = 'الفرع الرئيسي';
        LanggKeys[langg]['staffbr'] = 'الفرع:';
        LanggKeys[langg]['allBrun'] = 'جميع الأفرع';
        LanggKeys[langg]['byBran'] = 'تصفية حسب الفرع';
        ownerTitle = 'المالك';
        adminTitle = 'مدير';
        basicTitle = 'موظف';
        ownerSummary = 'صلاحيات الوصول لكل إعدادات النظام.';
        adminSummary = 'صلاحيات كاملة باستثناء إمكانية حظر أو حذف سائر المديرين للنظام.';
        basicSummary = 'يستطيع فقط إضافة أعضاء جدد وإضافة بيانات الاشتراكات لهم.';
        tabAddStaff = 'إضافة مستخدم';
        tabEditStaff = 'تعديل بيانات مستخدم';
        $('#dialogStaff').dialog('option', 'title', 'إدارة المستخدمين');
        if ($(window).width() >= 750) {
            $('#div1staff').insertAfter($('#div2staff'));
        }
        $('#tabsStaff ul:first li:eq(0) a').text("إضافة مستخدم");
        $('#tabsStaff ul:first li:eq(1) a').text("المستخدمين الحاليين");
        $('.ui-tabs .ui-tabs-nav li.ui-tabs-selected, .ui-tabs .ui-tabs-nav li.ui-state-default').css('float', 'right');
        $('.ui-tabs .ui-tabs-nav li a').css('float', 'right');
        if ($(window).width() <= 600) {
            $(".tblMerg td").attr("style", "padding-right:50%; padding-left:8px !important");
            $(".tdActions").attr("style", "white-space: nowrap; width: 1%;padding-left: 8px !important;");
            $('#stDEL').remove();
            $('head').append('<style id="stDEL">.tblMerg td:before{left:unset !important; right:6px !important;}</style>');
            $('#staffHistory td:nth-of-type(1)').attr('data-before', 'الاسم:');
            $('#staffHistory td:nth-of-type(2)').attr('data-before', 'اسم المستخدم:');
            $('#staffHistory td:nth-of-type(3)').attr('data-before', 'الفرع:');
            $('#staffHistory td:nth-of-type(4)').attr('data-before', 'الصلاحية:');
            $('#staffHistory td:nth-of-type(5)').attr('data-before', 'التفعيل:');
        }
        $("#staffHistory select option[value='1']").text('بدون صلاحية');
        $("#staffHistory select option[value='2']").text('موظف');
        $("#staffHistory select option[value='3']").text('مدير');
    }
}

// translate buttons in editable tables:
function convertLangTableButtons(langg) {
    if (langg == 'en' || langg == 'en-gb') {
        $('.tabledit-toolbar button[class~=tabledit-save-button]').text('Save');
        $('.tabledit-toolbar button[class~=tabledit-restore-button]').text('Restore');
        $('.tabledit-toolbar button[class~=tabledit-confirm-button]').text('Confirm');
    }
    else if (langg == 'fr') {
        $('.tabledit-toolbar button[class~=tabledit-save-button]').text('enregistrer');
        $('.tabledit-toolbar button[class~=tabledit-restore-button]').text('Restaurer');
        $('.tabledit-toolbar button[class~=tabledit-confirm-button]').text('Confirmer');
    }
    else if (langg == 'ar-sa') {
        $('.tabledit-toolbar button[class~=tabledit-save-button]').text('حفظ');
        $('.tabledit-toolbar button[class~=tabledit-restore-button]').text('إلغاء');
        $('.tabledit-toolbar button[class~=tabledit-confirm-button]').text('مسح');
    }
}

//translate dialog meta data:
function convertLangdialogMetaData(langg) {
    if (langg == 'en' || langg == 'en-gb') {
        $("#dialogMetaData [data-langg='metaLangg']").html('<mark><b><ins>1. Select language:</ins></b></mark>');
        $("#dialogMetaData [data-langg='metaLogo']").html('<mark><b><ins>2. Click on the photo to set company logo (Recommended dimensions 50 pixel * 50 pixel):</ins></b></mark>');
        $("#dialogMetaData [data-langg='metaHours']").html('<mark><b><ins>3. Define business hours in your company:</ins></b></mark>');
        $("#dialogMetaData [data-langg='metaDivs']").html('<mark><b><ins>4. Add at least one Division:</ins></b></mark>');
        $("#dialogMetaData [data-langg='metaProgram']").html('<mark><b><ins>5. Select Division to add your first Program:</ins></b></mark>');
        $("#dialogMetaData [data-langg='typeProgInfo']").text('Programme Info');
        $("#dialogMetaData [data-langg='typeProgLen']").text('Programme Length');
        $("#dialogMetaData [data-langg='typeProgName']").text('Name:');
        $("#dialogMetaData [data-langg='typeProgdiv']").text('Division:');
        $("#dialogMetaData [data-langg='typeProgfee']").text('Programme Fees:');
        $("#dialogMetaData [data-langg='typeProgbais']").text('Programme Basis:');
        $("#dialogMetaData [data-langg='typeOpenProg']").text('Open programme');
        $("#dialogMetaData [data-langg='typeFixProg']").text('Fixed programme');
        $("#dialogMetaData [data-langg='type1visProg']").text('Per Visit');
        $("#dialogMetaData [data-langg='typevissProg']").text('Multi visits');
        $("#dialogMetaData [data-langg='openProglen']").text('Length:');
        $("#dialogMetaData [data-langg='openProg-day']").text('Day');
        $("#dialogMetaData [data-langg='openProg-month']").text('Month');
        $("#dialogMetaData [data-langg='openProg-year']").text('Year');
        $("#dialogMetaData [data-langg='memNoteProg']").text('Program Description:');
        $("#dialogMetaData [data-langg='metaSaveLogo']").text('Save');
        $("#dialogMetaData [data-langg='progDays']").text('Days (Optional):');
        $("#dialogMetaData [data-langg='progDaySunday']").text('S');
        $("#dialogMetaData [data-langg='progDayMonday']").text('M');
        $("#dialogMetaData [data-langg='progDayTuesday']").text('T');
        $("#dialogMetaData [data-langg='progDayWednesday']").text('W');
        $("#dialogMetaData [data-langg='progDayThursday']").text('T');
        $("#dialogMetaData [data-langg='progDayFriday']").text('F');
        $("#dialogMetaData [data-langg='progDaySaturday']").text('S');
        $("#dialogMetaData [data-langg='progTimeSt']").text('Start time:');
        $("#dialogMetaData [data-langg='progTimeEnd']").text('End time:');
        $("#dialogMetaData [data-langg='startWork']").text('Start time:');
        $("#dialogMetaData [data-langg='endWork']").text('End time:');
        $("#dialogMetaData [data-langg='progValidDur']").text('Program Validity (Optional):');
        $("#dialogMetaData [data-langg='progValidDays']").text('  Day');
        $("#dialogMetaData [data-langg='progCapacity']").text('Capacity (Optional):');
        $("#dialogMetaData [data-langg='progCapacityMems']").text('  Members');
        $('#dialogMetaData #progDays input[value="6"]').attr('title', 'Saturday').tooltip('fixTitle');
        $('#dialogMetaData #progDays input[value="0"]').attr('title', 'Sunday').tooltip('fixTitle');
        $('#dialogMetaData #progDays input[value="1"]').attr('title', 'Monday').tooltip('fixTitle');
        $('#dialogMetaData #progDays input[value="2"]').attr('title', 'Tuesday').tooltip('fixTitle');
        $('#dialogMetaData #progDays input[value="3"]').attr('title', 'Wednesday').tooltip('fixTitle');
        $('#dialogMetaData #progDays input[value="4"]').attr('title', 'Thursday').tooltip('fixTitle');
        $('#dialogMetaData #progDays input[value="5"]').attr('title', 'Friday').tooltip('fixTitle');
        $('#dialogMetaData #progDays input[value="6"], #dialogMetaData #progDays input[value="6"] + label').insertAfter($('#dialogMetaData #progDays input[value="5"] + label'));
        $('#dialogMetaData #frmProgram').bootstrapValidator('updateMessage', 'startTime', 'regexp', 'Please enter a valid time between 00:00 and 23:59');
        $('#dialogMetaData #frmProgram').bootstrapValidator('updateMessage', 'endTime', 'regexp', 'Please enter a valid time between 00:00 and 23:59');

        $('#dialogMetaData #startProgFix').html('Start date:');
        $('#dialogMetaData #endProgFix').html('End date:');
        $("#dialogMetaData [data-langg='progFix1vis'],#dialogMetaData [data-langg='progFixviss']").text('Number of Visits:');
        $('#dialogMetaData').dialog('option', 'title', 'Basic Settings ..');
        $("#dialogMetaData [data-langg='btnNewDiv']").text('Add');
        $('#dialogMetaData #newDiv').prop('placeholder', 'New division');
        $('#dialogMetaData #image-preview2').css('float', 'left');
        if ($(window).width() >= 750) {
            $('#dialogMetaData #div2memType').insertAfter($('#dialogMetaData #div1memType'));
            $('#div2metaData').insertAfter($('#div1metaData'));
            $('#div22metaData').insertAfter($('#div11metaData'));
        }
    }
    else if (langg == 'fr') {
        $("#dialogMetaData [data-langg='metaLangg']").html('<mark><b><ins>1. Choisir la langue:</ins></b></mark>');
        $("#dialogMetaData [data-langg='metaLogo']").html("<mark><b><ins>2. Cliquez sur la photo pour définir le logo de l'entreprise, (Dimensions recommandées 50 * 50 pixel) :</ins></b></mark>");
        $("#dialogMetaData [data-langg='metaHours']").html("<mark><b><ins>3. Définir les heures d'ouverture:</ins></b></mark>");
        $("#dialogMetaData [data-langg='metaDivs']").html('<mark><b><ins>4. Ajouter au moins une division:</ins></b></mark>');
        $("#dialogMetaData [data-langg='metaProgram']").html('<mark><b><ins>5. Sélectionnez la division pour ajouter votre premier programme:</ins></b></mark>');
        $("#dialogMetaData [data-langg='typeProgInfo']").text('Informations sur le programme');
        $("#dialogMetaData [data-langg='typeProgLen']").text('Longueur du programme');
        $("#dialogMetaData [data-langg='typeProgName']").text('nom:');
        $("#dialogMetaData [data-langg='typeProgdiv']").text('Division:');
        $("#dialogMetaData [data-langg='typeProgfee']").text('Frais de programme:');
        $("#dialogMetaData [data-langg='typeProgbais']").text('Base de programme:');
        $("#dialogMetaData [data-langg='typeOpenProg']").text('Programme ouvert');
        $("#dialogMetaData [data-langg='typeFixProg']").text('période fixe');
        $("#dialogMetaData [data-langg='type1visProg']").text('Par visite');
        $("#dialogMetaData [data-langg='typevissProg']").text('Multi Visites');
        $("#dialogMetaData [data-langg='openProglen']").text('Durée:');
        $("#dialogMetaData [data-langg='openProg-day']").text('journée');
        $("#dialogMetaData [data-langg='openProg-month']").text('Mois');
        $("#dialogMetaData [data-langg='openProg-year']").text('année');
        $("#dialogMetaData [data-langg='memNoteProg']").text('Description du programme:');
        $("#dialogMetaData [data-langg='metaSaveLogo']").text('sauvegarder');
        $("#dialogMetaData [data-langg='progDays']").text('Journées (Optionnel):');
        $("#dialogMetaData [data-langg='progDaySunday']").text('D');
        $("#dialogMetaData [data-langg='progDayMonday']").text('L');
        $("#dialogMetaData [data-langg='progDayTuesday']").text('M');
        $("#dialogMetaData [data-langg='progDayWednesday']").text('M');
        $("#dialogMetaData [data-langg='progDayThursday']").text('J');
        $("#dialogMetaData [data-langg='progDayFriday']").text('V');
        $("#dialogMetaData [data-langg='progDaySaturday']").text('S');
        $("#dialogMetaData [data-langg='progTimeSt']").text('Heure de début:');
        $("#dialogMetaData [data-langg='progTimeEnd']").text('Heure de fin:');
        $("#dialogMetaData [data-langg='startWork']").text('Heure de début:');
        $("#dialogMetaData [data-langg='endWork']").text('Heure de fin:');
        $("#dialogMetaData [data-langg='progValidDur']").text('Validité du programme (Optionnel):');
        $("#dialogMetaData [data-langg='progValidDays']").text('  journée');
        $("#dialogMetaData [data-langg='progCapacity']").text('Capacité (Optionnel):');
        $("#dialogMetaData [data-langg='progCapacityMems']").text('  Membres');
        $('#dialogMetaData #progDays input[value="6"]').attr('title', 'samedi').tooltip('fixTitle');
        $('#dialogMetaData #progDays input[value="0"]').attr('title', 'dimanche ').tooltip('fixTitle');
        $('#dialogMetaData #progDays input[value="1"]').attr('title', 'lundi ').tooltip('fixTitle');
        $('#dialogMetaData #progDays input[value="2"]').attr('title', 'mardi ').tooltip('fixTitle');
        $('#dialogMetaData #progDays input[value="3"]').attr('title', 'mercredi ').tooltip('fixTitle');
        $('#dialogMetaData #progDays input[value="4"]').attr('title', 'jeudi ').tooltip('fixTitle');
        $('#dialogMetaData #progDays input[value="5"]').attr('title', 'vendredi ').tooltip('fixTitle');
        $('#dialogMetaData #progDays input[value="6"], #dialogMetaData #progDays input[value="6"] + label').insertAfter($('#dialogMetaData #progDays input[value="5"] + label'));
        $('#dialogMetaData #frmProgram').bootstrapValidator('updateMessage', 'startTime', 'regexp', 'Entrez un moment valide entre 00:00 et 23:59');
        $('#dialogMetaData #frmProgram').bootstrapValidator('updateMessage', 'endTime', 'regexp', 'Entrez un moment valide entre 00:00 et 23:59');

        $('#dialogMetaData #startProgFix').html('Date de début:');
        $('#dialogMetaData #endProgFix').html('Date de fin:');
        $("#dialogMetaData [data-langg='progFix1vis'],#dialogMetaData [data-langg='progFixviss']").text('Nombre de visites:');
        $('#dialogMetaData').dialog('option', 'title', 'Paramètres de base ..');
        $("#dialogMetaData [data-langg='btnNewDiv']").text('Ajouter');
        $('#dialogMetaData #newDiv').prop('placeholder', 'Nouvelle division');
        $('#dialogMetaData #image-preview2').css('float', 'left');
        if ($(window).width() >= 750) {
            $('#dialogMetaData #div2memType').insertAfter($('#dialogMetaData #div1memType'));
            $('#div2metaData').insertAfter($('#div1metaData'));
            $('#div22metaData').insertAfter($('#div11metaData'));
        }
    }
    else if (langg == 'ar-sa') {
        $("#dialogMetaData [data-langg='metaLangg']").html('<mark><b><ins>1. اختار لغة عرض البرنامج:</ins></b></mark>');
        $("#dialogMetaData [data-langg='metaLogo']").html('<mark><b><ins>2. انقر على الصورة لتحديد شعار الشركة (يفضل أبعاد 50 بكسل * 50 بكسل):</ins></b></mark>');
        $("#dialogMetaData [data-langg='metaHours']").html('<mark><b><ins>3. حدد ساعات العمل في الشركة:</ins></b></mark>');
        $("#dialogMetaData [data-langg='metaDivs']").html('<mark><b><ins>4. اضف أقسام العمل في شركتك (على الأقل قسم واحد):</ins></b></mark>');
        $("#dialogMetaData [data-langg='metaProgram']").html('<mark><b><ins>5. أضف أول برنامج اشتراكات لديك وحدد له القسم وسائر البيانات :</ins></b></mark>');
        $("#dialogMetaData [data-langg='typeProgInfo']").text('بيانات البرنامج');
        $("#dialogMetaData [data-langg='typeProgLen']").text('مدة البرنامج');
        $("#dialogMetaData [data-langg='typeProgName']").text('اسم البرنامج:');
        $("#dialogMetaData [data-langg='typeProgdiv']").text('قسم:');
        $("#dialogMetaData [data-langg='typeProgfee']").text('سعر الاشتراك:');
        $("#dialogMetaData [data-langg='typeProgbais']").text('نظام البرنامج:');
        $("#dialogMetaData [data-langg='typeOpenProg']").text('مدة قابلة للتجديد');
        $("#dialogMetaData [data-langg='typeFixProg']").text('مدة محددة غير قابلة للتجديد');
        $("#dialogMetaData [data-langg='type1visProg']").text('حصة واحدة');
        $("#dialogMetaData [data-langg='typevissProg']").text('عدد حصص معينة');
        $("#dialogMetaData [data-langg='openProglen']").text('المدة:');
        $("#dialogMetaData [data-langg='openProg-day']").text('يوم');
        $("#dialogMetaData [data-langg='openProg-month']").text('شهر');
        $("#dialogMetaData [data-langg='openProg-year']").text('سنة');
        $("#dialogMetaData [data-langg='memNoteProg']").text('تعريف بالبرنامج:');
        $("#dialogMetaData [data-langg='metaSaveLogo']").text('حفظ');

        $("#dialogMetaData [data-langg='progDays']").text('الأيام (اختياري):');
        $("#dialogMetaData [data-langg='progDaySunday']").text('ح');
        $("#dialogMetaData [data-langg='progDayMonday']").text('ن');
        $("#dialogMetaData [data-langg='progDayTuesday']").text('ث');
        $("#dialogMetaData [data-langg='progDayWednesday']").text('ر');
        $("#dialogMetaData [data-langg='progDayThursday']").text('خ');
        $("#dialogMetaData [data-langg='progDayFriday']").text('ج');
        $("#dialogMetaData [data-langg='progDaySaturday']").text('س');
        $("#dialogMetaData [data-langg='progTimeSt']").text('من الساعة:');
        $("#dialogMetaData [data-langg='progTimeEnd']").text('حتى الساعة:');
        $("#dialogMetaData [data-langg='startWork']").text('من الساعة:');
        $("#dialogMetaData [data-langg='endWork']").text('حتى الساعة:');
        $("#dialogMetaData [data-langg='progValidDur']").text('صلاحية البرنامج (اختياري):');
        $("#dialogMetaData [data-langg='progValidDays']").text('  يوم');
        $("#dialogMetaData [data-langg='progCapacity']").text('السعة (اختياري):');
        $("#dialogMetaData [data-langg='progCapacityMems']").text('  مشتركين');
        $('#dialogMetaData #progDays input[value="6"]').attr('title', 'السبت').tooltip('fixTitle');
        $('#dialogMetaData #progDays input[value="0"]').attr('title', 'الأحد').tooltip('fixTitle');
        $('#dialogMetaData #progDays input[value="1"]').attr('title', 'الإثنين').tooltip('fixTitle');
        $('#dialogMetaData #progDays input[value="2"]').attr('title', 'الثلاثاء').tooltip('fixTitle');
        $('#dialogMetaData #progDays input[value="3"]').attr('title', 'الأربعاء').tooltip('fixTitle');
        $('#dialogMetaData #progDays input[value="4"]').attr('title', 'الخميس').tooltip('fixTitle');
        $('#dialogMetaData #progDays input[value="5"]').attr('title', 'الجمعة').tooltip('fixTitle');
        $('#dialogMetaData #progDays input[value="6"], #dialogMetaData #progDays input[value="6"] + label').insertBefore($('#dialogMetaData #progDays input[value="0"]'));
        $('#dialogMetaData #frmProgram').bootstrapValidator('updateMessage', 'startTime', 'regexp', 'الرجاء إدخال توقيت صالح بين 00:00 و 23:59');
        $('#dialogMetaData #frmProgram').bootstrapValidator('updateMessage', 'endTime', 'regexp', 'الرجاء إدخال توقيت صالح بين 00:00 و 23:59');

        $('#dialogMetaData #startProgFix').html('يبدأ في:');
        $('#dialogMetaData #endProgFix').html('ينتهي في:');
        $("#dialogMetaData [data-langg='progFix1vis'],#dialogMetaData [data-langg='progFixviss']").text('عدد الزيارات:');
        $('#dialogMetaData').dialog('option', 'title', 'الإعدادات الأولية ..');
        $("#dialogMetaData [data-langg='btnNewDiv']").text('إضافة');
        $('#dialogMetaData #newDiv').prop('placeholder', 'قسم جديد');
        $('#dialogMetaData #image-preview2').css('float', 'right');
        if ($(window).width() >= 750) {
            $('#dialogMetaData #div1memType').insertAfter($('#dialogMetaData #div2memType'));
            $('#div1metaData').insertAfter($('#div2metaData'));
            $('#div11metaData').insertAfter($('#div22metaData'));
        }
    }
}

//translate dialog Reports menu:
function convertLangdialogReport(langg) {
    if (langg == 'en' || langg == 'en-gb') {
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['allmemtitle'] = 'Subscribers';
        LanggKeys[langg]['withmems'] = 'Enrolled subscribers: ';
        LanggKeys[langg]['withoutmems'] = 'Idle subscribers: ';
        LanggKeys[langg]['rptProgs'] = 'Subscriptions';
        LanggKeys[langg]['rptProgs2'] = 'Programs profitability';
        LanggKeys[langg]['rptProgsWith'] = 'Enrolled programs: ';
        LanggKeys[langg]['rptProgsWithout'] = 'Idle programs: ';
        LanggKeys[langg]['rptProgsMost'] = 'Most profitable program: ';
        LanggKeys[langg]['rptProgsLeast'] = 'Least profitable program: ';
        LanggKeys[langg]['rptBusiness'] = 'Business Performance';
        LanggKeys[langg]['rptCash'] = 'Cash Flow';
        LanggKeys[langg]['rptOverview'] = 'Overview of the growth rate of subscriptions over the months of the year...';
        LanggKeys[langg]['rptOverviewCash'] = 'Overview of the growth rate of incomes over the months of the year...';
        LanggKeys[langg]['paymentstat'] = 'Invoices';
        LanggKeys[langg]['paidstat'] = 'Paid: ';
        LanggKeys[langg]['unpaidstat'] = 'Due invoices: ';
        LanggKeys[langg]['visitshisrep'] = 'Check-in History';
        LanggKeys[langg]['listcheckin'] = 'List of Check-ins of all members by date time...';
        $('#dialogReports').dialog('option', 'title', 'Reports');
        if ($(window).width() >= 750) {
            $('#div3Reports').insertAfter($('#div2Reports'));
            $('#div1Reports').insertBefore($('#div2Reports'));
            $('#div4Reports').insertBefore($('#div5Reports'));
            $('#div6Reports').insertBefore($('#div7Reports'));
        }
        $('#dialogReports').css("font-size", "initial");
    }
     else if (langg == 'fr') {
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['allmemtitle'] = 'Les abonnés';
        LanggKeys[langg]['withmems'] = 'Abonnés inscrits: ';
        LanggKeys[langg]['withoutmems'] = 'Abonnés inactifs: ';
        LanggKeys[langg]['rptProgs'] = 'Abonnements';
        LanggKeys[langg]['rptProgs2'] = 'Rentabilité des programmes';
        LanggKeys[langg]['rptProgsWith'] = 'Programmes inscrits: ';
        LanggKeys[langg]['rptProgsWithout'] = 'Programmes inactifs: ';
        LanggKeys[langg]['rptProgsMost'] = 'Programme le plus rentable: ';
        LanggKeys[langg]['rptProgsLeast'] = 'Programme moins rentable: ';
        LanggKeys[langg]['rptBusiness'] = "performance de l'entreprise";
        LanggKeys[langg]['rptCash'] = 'Flux de trésorerie';
        LanggKeys[langg]['rptOverview'] = "Aperçu du taux de croissance des abonnements au cours des mois de l'année...";
        LanggKeys[langg]['rptOverviewCash'] = "Aperçu du taux de croissance des revenus au cours des mois de l'année...";
        LanggKeys[langg]['paymentstat'] = 'Factures';
        LanggKeys[langg]['paidstat'] = 'payé: ';
        LanggKeys[langg]['unpaidstat'] = 'Factures dûes: ';
        LanggKeys[langg]['visitshisrep'] = "Historique d'enregistrement";
        LanggKeys[langg]['listcheckin'] = 'Liste des check-ins de tous les membres par date...';
        $('#dialogReports').dialog('option', 'title', 'Rapports');
        if ($(window).width() >= 750) {
            $('#div3Reports').insertAfter($('#div2Reports'));
            $('#div1Reports').insertBefore($('#div2Reports'));
            $('#div4Reports').insertBefore($('#div5Reports'));
            $('#div6Reports').insertBefore($('#div7Reports'));
        }
        $('#dialogReports').css("font-size", "initial");
    }
    else if (langg == 'ar-sa') {
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['allmemtitle'] = 'المشتركين';
        LanggKeys[langg]['withmems'] = 'من له اشتراك: ';
        LanggKeys[langg]['withoutmems'] = 'بدون اشتراك: ';
        LanggKeys[langg]['rptProgs'] = 'اشتراكات البرامج';
        LanggKeys[langg]['rptProgs2'] = 'ربحية البرامج';
        LanggKeys[langg]['rptProgsWith'] = 'برامج تم الاشتراك فيها: ';
        LanggKeys[langg]['rptProgsWithout'] = 'برامج بدون أي اشتراك: ';
        LanggKeys[langg]['rptProgsMost'] = 'البرنامج الأكثر ربحية: ';
        LanggKeys[langg]['rptProgsLeast'] = 'البرنامج الأقل ربحية: ';
        LanggKeys[langg]['rptBusiness'] = 'معدلات الأداء';
        LanggKeys[langg]['rptCash'] = 'التدفق النقدي';
        LanggKeys[langg]['rptOverview'] = 'نظرة عامة على معدل نمو الاشتراكات على مدى أشهر السنة ..';
        LanggKeys[langg]['rptOverviewCash'] = 'نظرة عامة على معدل الدخل على مدى أشهر السنة ..';
        LanggKeys[langg]['paymentstat'] = 'الفواتير';
        LanggKeys[langg]['paidstat'] = 'المدفوع بالكامل: ';
        LanggKeys[langg]['unpaidstat'] = 'غير مكتمل الدفع: ';
        LanggKeys[langg]['visitshisrep'] = 'سجل الزيارات';
        LanggKeys[langg]['listcheckin'] = 'قائمة بأوقات جميع الزيارات ..';
        $('#dialogReports').dialog('option', 'title', 'التقارير');
        if ($(window).width() >= 750) {
            $('#div3Reports').insertBefore($('#div2Reports'));
            $('#div1Reports').insertAfter($('#div2Reports'));
            $('#div4Reports').insertAfter($('#div5Reports'));
            $('#div6Reports').insertAfter($('#div7Reports'));
        }
        $('#dialogReports').css("font-size", "larger");
    }
}

//translate dialog Report Members:
function convertLangdialogReportMembers(langg) {
    if (langg == 'en' || langg == 'en-gb') {
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['repMemName'] = 'Name';
        LanggKeys[langg]['repMemSubs'] = 'Subscription';
        LanggKeys[langg]['repMemPhone'] = 'Phone';
        LanggKeys[langg]['repMemJoin'] = 'Joining';
        LanggKeys[langg]['repMemRemove'] = 'Remove';
        LanggKeys[langg]['fmember'] = 'Find Member:';
        $('#dialogReportMembers').dialog('option', 'title', 'Members Report');
        $('#sss').attr('placeholder', 'Name ..');
        noFindMember = '<tr><td colspan="4"><h2>No match found!</h2></td></tr>';
        //if ($(window).width() <= 600) {
        //    $(".tblMerg td").attr("style", "padding-left:50% !important; padding-right:8px;");
        //    $(".tdActions").attr("style", "white-space: nowrap; width: 1%;padding-left: 8px !important;");
        //    $('#staffHistory td:nth-of-type(1)').attr('data-before', 'User Name:');
        //    $('#staffHistory td:nth-of-type(2)').attr('data-before', 'Password:');
        //    $('#staffHistory td:nth-of-type(3)').attr('data-before', 'Role:');
        //}
    }
    else if (langg == 'fr') {
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['repMemName'] = 'prénom';
        LanggKeys[langg]['repMemSubs'] = 'Abonnement';
        LanggKeys[langg]['repMemPhone'] = 'Téléphone';
        LanggKeys[langg]['repMemJoin'] = 'Joindre';
        LanggKeys[langg]['repMemRemove'] = 'Retirer';
        LanggKeys[langg]['fmember'] = 'Trouver un membre:';
        $('#dialogReportMembers').dialog('option', 'title', 'Rapport des membres');
        $('#sss').attr('placeholder', 'prénom ..');
        noFindMember = '<tr><td colspan="4"><h2>Pas de résultat trouvé!</h2></td></tr>';
        //if ($(window).width() <= 600) {
        //    $(".tblMerg td").attr("style", "padding-left:50% !important; padding-right:8px;");
        //    $(".tdActions").attr("style", "white-space: nowrap; width: 1%;padding-left: 8px !important;");
        //    $('#staffHistory td:nth-of-type(1)').attr('data-before', 'User Name:');
        //    $('#staffHistory td:nth-of-type(2)').attr('data-before', 'Password:');
        //    $('#staffHistory td:nth-of-type(3)').attr('data-before', 'Role:');
        //}
    }
    else if (langg == 'ar-sa') {
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['repMemName'] = 'الاسم';
        LanggKeys[langg]['repMemSubs'] = 'الاشتراك';
        LanggKeys[langg]['repMemPhone'] = 'الهاتف';
        LanggKeys[langg]['repMemJoin'] = 'الانضمام';
        LanggKeys[langg]['repMemRemove'] = 'إزالة';
        LanggKeys[langg]['fmember'] = 'بحث عن مشترك:';
        $('#dialogReportMembers').dialog('option', 'title', 'تقرير الأعضاء');
        $('#sss').attr('placeholder', 'الاسم ..');
        noFindMember = '<tr><td colspan="4"><h2>لايوجد نتائج لهذا البحث!</h2></td></tr>';
        //if ($(window).width() <= 600) {
        //    $(".tblMerg td").attr("style", "padding-right:50%; padding-left:8px !important");
        //    $(".tdActions").attr("style", "white-space: nowrap; width: 1%;padding-left: 8px !important;");
        //    $('#staffHistory td:nth-of-type(1)').attr('data-before', 'اسم المستخدم:');
        //    $('#staffHistory td:nth-of-type(2)').attr('data-before', 'كلمة المرور:');
        //    $('#staffHistory td:nth-of-type(3)').attr('data-before', 'الصلاحية:');
        //}
    }
}

//translate dialog Report invoices:
function convertLangdialogReportPayment(langg) {
    if (langg == 'en' || langg == 'en-gb') {
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['payname'] = 'Name';
        LanggKeys[langg]['paydate'] = 'Date';
        LanggKeys[langg]['payprice'] = 'Total';
        LanggKeys[langg]['paypaid'] = 'Paid';
        LanggKeys[langg]['payremain'] = 'Due';
        LanggKeys[langg]['totalDue'] = 'Totals:';
        LanggKeys[langg]['btnAllinv'] = 'All invoices';
        $('#dialogReportPayment').dialog('option', 'title', 'Invoices Report');
        $('#invByName').attr('placeholder', 'Name Or Serial..');
        $('#invFrom').attr('placeholder', 'From Date ..');
        $('#invTo').attr('placeholder', 'To Date ..');
        $('#invByProg option:eq(0)').text('All Programs');
        if ($(window).width() >= 750) {
            $('#div1ReportInvoice').insertBefore($('#div2ReportInvoice'));
            $('#div1RprtInv').insertBefore($('#div2RprtInv'));
            $('#div1RprtInvDate').insertBefore($('#div2RprtInvDate'));
        }
    }
    else if (langg == 'fr') {
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['payname'] = 'prénom';
        LanggKeys[langg]['paydate'] = 'Date';
        LanggKeys[langg]['payprice'] = 'Total';
        LanggKeys[langg]['paypaid'] = 'Payé';
        LanggKeys[langg]['payremain'] = 'Dû';
        LanggKeys[langg]['totalDue'] = 'Totaux:';
        LanggKeys[langg]['btnAllinv'] = 'Toutes les factures';
        $('#dialogReportPayment').dialog('option', 'title', 'Rapport de facturation');
        $('#invByName').attr('placeholder', 'Prénom ..');
        $('#invFrom').attr('placeholder', 'Partir de la date ..');
        $('#invTo').attr('placeholder', 'À ce jour ..');
        $('#invByProg option:eq(0)').text('Tous les programmes');
        if ($(window).width() >= 750) {
            $('#div1ReportInvoice').insertBefore($('#div2ReportInvoice'));
            $('#div1RprtInv').insertBefore($('#div2RprtInv'));
            $('#div1RprtInvDate').insertBefore($('#div2RprtInvDate'));
        }
    }
    else if (langg == 'ar-sa') {
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['payname'] = 'الاسم';
        LanggKeys[langg]['paydate'] = 'التوقيت';
        LanggKeys[langg]['payprice'] = 'الإجمالي';
        LanggKeys[langg]['paypaid'] = 'المدفوع';
        LanggKeys[langg]['payremain'] = 'المتبقي';
        LanggKeys[langg]['totalDue'] = ' الإجمالي الكلي:';
        LanggKeys[langg]['btnAllinv'] = 'جميع الفواتير';
        $('#dialogReportPayment').dialog('option', 'title', 'تقرير بالفواتير');
        $('#invByName').attr('placeholder', 'الاسم أو رقم الفاتورة..');
        $('#invFrom').attr('placeholder', 'من تاريخ ..');
        $('#invTo').attr('placeholder', 'إلى تاريخ ..');
        $('#invByProg option:eq(0)').text('جميع البرامج');
        if ($(window).width() >= 750) {
            $('#div1ReportInvoice').insertAfter($('#div2ReportInvoice'));
            $('#div1RprtInv').insertAfter($('#div2RprtInv'));
            $('#div1RprtInvDate').insertAfter($('#div2RprtInvDate'));
        }
    }
}

//translate dialog Report Checkins:
function convertLangdialogReportCheckins(langg) {
    if (langg == 'en' || langg == 'en-gb') {
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['chkfrom'] = 'From:';
        LanggKeys[langg]['chkto'] = 'To:';
        LanggKeys[langg]['chkall'] = 'All';
        LanggKeys[langg]['chkperiod'] = 'By Period';
        LanggKeys[langg]['chkmember'] = 'By Member';
        LanggKeys[langg]['chkmemberfind'] = 'Check-ins for member:';
        LanggKeys[langg]['chkdate'] = 'Date';
        LanggKeys[langg]['chktime'] = 'Time';
        LanggKeys[langg]['chkname'] = 'Name';
        LanggKeys[langg]['chkprog'] = 'Program';
        LanggKeys[langg]['chkby'] = 'By';
        $('#ss').attr('placeholder', 'Name Or Phone..');
        $('#dialogReportCheckins').dialog('option', 'title', 'Check-ins Report');
        noChekinsPeriod = '<tr><td colspan="5"><h1>No check-ins in this period!</h1></td></tr>';
        noChekinsMember = '<tr><td colspan="5"><h1>No check-ins for this member!</h1></td></tr>';
        if ($(window).width() >= 750) {
            $('#div1ReportCheck').insertBefore($('#div2ReportCheck'));
        }
        //if ($(window).width() <= 600) {
        //    $(".tblMerg td").attr("style", "padding-left:50% !important; padding-right:8px;");
        //    $(".tdActions").attr("style", "white-space: nowrap; width: 1%;padding-left: 8px !important;");
        //    $('#staffHistory td:nth-of-type(1)').attr('data-before', 'User Name:');
        //    $('#staffHistory td:nth-of-type(2)').attr('data-before', 'Password:');
        //    $('#staffHistory td:nth-of-type(3)').attr('data-before', 'Role:');
        //}
    }
    else if (langg == 'fr') {
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['chkfrom'] = 'De:';
        LanggKeys[langg]['chkto'] = 'À:';
        LanggKeys[langg]['chkall'] = 'Tout';
        LanggKeys[langg]['chkperiod'] = 'Par période';
        LanggKeys[langg]['chkmember'] = 'Par membre';
        LanggKeys[langg]['chkmemberfind'] = 'Check-ins pour le membre:';
        LanggKeys[langg]['chkdate'] = 'Date';
        LanggKeys[langg]['chktime'] = 'Temps';
        LanggKeys[langg]['chkname'] = 'Prénom';
        LanggKeys[langg]['chkprog'] = 'Programme';
        LanggKeys[langg]['chkby'] = 'Par';
        $('#ss').attr('placeholder', 'Nom ou téléphon..');
        $('#dialogReportCheckins').dialog('option', 'title', "Rapport d'enregistrement");
        noChekinsPeriod = '<tr><td colspan="5"><h1>Pas de check-in dans cette période!</h1></td></tr>';
        noChekinsMember = '<tr><td colspan="5"><h1>Pas de check-ins pour ce membre!</h1></td></tr>';
        if ($(window).width() >= 750) {
            $('#div1ReportCheck').insertBefore($('#div2ReportCheck'));
        }
        //if ($(window).width() <= 600) {
        //    $(".tblMerg td").attr("style", "padding-left:50% !important; padding-right:8px;");
        //    $(".tdActions").attr("style", "white-space: nowrap; width: 1%;padding-left: 8px !important;");
        //    $('#staffHistory td:nth-of-type(1)').attr('data-before', 'User Name:');
        //    $('#staffHistory td:nth-of-type(2)').attr('data-before', 'Password:');
        //    $('#staffHistory td:nth-of-type(3)').attr('data-before', 'Role:');
        //}
    }
    else if (langg == 'ar-sa') {
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['chkfrom'] = 'من:';
        LanggKeys[langg]['chkto'] = 'إلى:';
        LanggKeys[langg]['chkall'] = 'الكل';
        LanggKeys[langg]['chkperiod'] = 'فرز بالتاريخ';
        LanggKeys[langg]['chkmember'] = 'فرز باسم المشترك';
        LanggKeys[langg]['chkmemberfind'] = 'تسجيلات الحضور للعضو:';
        LanggKeys[langg]['chkdate'] = 'التاريخ';
        LanggKeys[langg]['chktime'] = 'الوقت';
        LanggKeys[langg]['chkname'] = 'المشترك';
        LanggKeys[langg]['chkprog'] = 'الاشتراك';
        LanggKeys[langg]['chkby'] = 'بواسطة';
        $('#ss').attr('placeholder', 'الاسم أو الهاتف..');
        $('#dialogReportCheckins').dialog('option', 'title', 'حضور المشتركين');
        noChekinsPeriod = '<tr><td colspan="5"><h1>لاتوجد تسجيلات حضور في هذه الفترة!</h1></td></tr>';
        noChekinsMember = '<tr><td colspan="5"><h1>لاتوجد تسجيلات حضور لهذا المشترك!</h1></td></tr>';
        if ($(window).width() >= 750) {
            $('#div1ReportCheck').insertAfter($('#div2ReportCheck'));
        }
        //if ($(window).width() <= 600) {
        //    $(".tblMerg td").attr("style", "padding-right:50%; padding-left:8px !important");
        //    $(".tdActions").attr("style", "white-space: nowrap; width: 1%;padding-left: 8px !important;");
        //    $('#staffHistory td:nth-of-type(1)').attr('data-before', 'اسم المستخدم:');
        //    $('#staffHistory td:nth-of-type(2)').attr('data-before', 'كلمة المرور:');
        //    $('#staffHistory td:nth-of-type(3)').attr('data-before', 'الصلاحية:');
        //}
    }
}

//translate dialog Report Programs Chart for subscriptions:
function convertLangdialogReportProgramsSubs(langg) {
    if (langg == 'en' || langg == 'en-gb') {
        $('#dialogReportPrograms').dialog('option', 'title', 'Programs subscriptions Report');
        titleChartPrograms = 'Statistical number of subscriptions per program';
        titleVerticalChartPrograms = 'Subscriptions Count';
        titleSubscriptionsChart = 'Subscriptions';
        titleSubspendedChart = 'Suspended Programs!';
        fileNameSubscriptionsChart = 'Subscriptions_Statistics';
        $('#saveChartProgs').html('Download  <span class="glyphicon glyphicon-save"></span>');
        //if ($(window).width() <= 600) {        
        //}
    }
    else if (langg == 'fr') {
        $('#dialogReportPrograms').dialog('option', 'title', "Rapport d'abonnement aux programmes");
        titleChartPrograms = "Nombre statistique d'abonnements par programme";
        titleVerticalChartPrograms = "Nombre d'abonnements";
        titleSubscriptionsChart = 'Abonnements';
        titleSubspendedChart = 'Programmes suspendus!';
        fileNameSubscriptionsChart = 'Statistique_Abonnements ';
        $('#saveChartProgs').html('Télécharger  <span class="glyphicon glyphicon-save"></span>');
        //if ($(window).width() <= 600) {        
        //}
    }
    else if (langg == 'ar-sa') {
        $('#dialogReportPrograms').dialog('option', 'title', 'تقرير اشتراكات البرامج');
        titleChartPrograms = 'إحصائية بعدد الاشتراكات في كل برنامج';
        titleVerticalChartPrograms = 'عدد الاشتراكات';
        titleSubscriptionsChart = 'اشتراكات';
        titleSubspendedChart = 'برامج مُعطلة!';
        fileNameSubscriptionsChart = 'احصائيات_الاشتراكات';
        $('#saveChartProgs').html('تنزيل  <span class="glyphicon glyphicon-save"></span>');
        //if ($(window).width() <= 600) {        
        //}
    }
}

//translate dialog Report Programs Chart for profitable:
function convertLangdialogReportProgramsPays(langg) {
    if (langg == 'en' || langg == 'en-gb') {
        $('#dialogReportPrograms').dialog('option', 'title', 'Programs profitability Report');
        titleChartPrograms = 'The income statistics of each program from the subscriptions';
        titleVerticalChartPrograms = 'Subscriptions income';
        titleSubscriptionsChart = 'Gross income';
        titleSubscriptionsChartPay = 'Actual paying';
        fileNameSubscriptionsChart = 'Subscriptions_incomes';
        $('#saveChartProgs').html('Download  <span class="glyphicon glyphicon-save"></span>');
        //if ($(window).width() <= 600) {        
        //}
    }
    else if (langg == 'fr') {
        $('#dialogReportPrograms').dialog('option', 'title', 'Rapport de rentabilité des programmes');
        titleChartPrograms = 'Les statistiques de revenus de chaque programme à partir des abonnements';
        titleVerticalChartPrograms = 'Revenu des souscriptions';
        titleSubscriptionsChart = 'Revenu brut';
        titleSubscriptionsChartPay = 'Paiement réels';
        fileNameSubscriptionsChart = "Revenus d'abonnement";
        $('#saveChartProgs').html('Télécharger  <span class="glyphicon glyphicon-save"></span>');
        //if ($(window).width() <= 600) {        
        //}
    }
    else if (langg == 'ar-sa') {
        $('#dialogReportPrograms').dialog('option', 'title', 'تقرير ربحية البرامج');
        titleChartPrograms = 'إحصائية بدخل كل برنامج من عائد الاشتراكات';
        titleVerticalChartPrograms = 'عائد الاشتراكات';
        titleSubscriptionsChart = 'إجمالي الإيرادات';
        titleSubscriptionsChartPay = 'الدفع الفعلي';
        fileNameSubscriptionsChart = 'ايرادات_الاشتراكات';
        $('#saveChartProgs').html('تنزيل  <span class="glyphicon glyphicon-save"></span>');
        //if ($(window).width() <= 600) {        
        //}
    }
}

//translate dialog Report Time line Chart for subscriptions:
function convertLangdialogReportTimeLineBusiness(langg) {
    if (langg == 'en' || langg == 'en-gb') {
        $('#dialogReportTimeLine').dialog('option', 'title', 'Business Performance');
        titleChartTimeLine = 'Statistical number of subscriptions per Month';
        titleSubscriptionsTimeLine = 'Subscriptions';
        fileNameTimeLineChart = 'TimeLine_Statistics';
        $('#saveChartTimeLine').html('Download  <span class="glyphicon glyphicon-save"></span>');        
    }
    else if (langg == 'fr') {
        $('#dialogReportTimeLine').dialog('option', 'title', "Performance de l'entreprise");
        titleChartTimeLine = "Nombre statistique d'abonnements par mois";
        titleSubscriptionsTimeLine = "d'abonnements";
        fileNameTimeLineChart = 'Statistiques_deTimeLine';
        $('#saveChartTimeLine').html('Télécharger  <span class="glyphicon glyphicon-save"></span>');        
    }
    else if (langg == 'ar-sa') {
        $('#dialogReportTimeLine').dialog('option', 'title', 'معدلات الأداء');
        titleChartTimeLine = 'إحصائية بعدد الاشتراكات في كل شهر';
        titleSubscriptionsTimeLine = 'الاشتراكات';
        fileNameTimeLineChart = 'احصائيات_سنوية';
        $('#saveChartTimeLine').html('تنزيل  <span class="glyphicon glyphicon-save"></span>');
    }
}

//translate dialog Report Time line Chart for cash-flow:
function convertLangdialogReportTimeLineCashFlow(langg) {
    if (langg == 'en' || langg == 'en-gb') {
        $('#dialogReportTimeLine').dialog('option', 'title', 'Cash Flow');
        titleChartTimeLine = 'Statistical sum of payments per Month';
        titlePaymentsTimeLine = 'Cash flow';
        fileNameTimeLineChart = 'TimeLine_Statistics';
        $('#saveChartTimeLine').html('Download  <span class="glyphicon glyphicon-save"></span>');
    }
    else if (langg == 'fr') {
        $('#dialogReportTimeLine').dialog('option', 'title', 'Flux de trésorerie');
        titleChartTimeLine = 'Somme statistique des paiements par mois';
        titlePaymentsTimeLine = 'Flux de trésorerie';
        fileNameTimeLineChart = 'Statistiques_deTimeLine';
        $('#saveChartTimeLine').html('Télécharger  <span class="glyphicon glyphicon-save"></span>');
    }
    else if (langg == 'ar-sa') {
        $('#dialogReportTimeLine').dialog('option', 'title', 'التدفق النقدي');
        titleChartTimeLine = 'إحصائية بمجموع المدفوعات في كل شهر';
        titlePaymentsTimeLine = 'تدفق المال';
        fileNameTimeLineChart = 'احصائيات_سنوية';
        $('#saveChartTimeLine').html('تنزيل  <span class="glyphicon glyphicon-save"></span>');
    }
}

//translate Div of bills:
function convertLangBillReceipt(langg) {
    if (langg == 'en' || langg == 'en-gb') {
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['billNumber'] = 'Invoice #';
        LanggKeys[langg]['billTo'] = 'INVOICE TO:';
        LanggKeys[langg]['billItem'] = 'Item';
        LanggKeys[langg]['billPrice'] = 'Price';
        LanggKeys[langg]['billQTY'] = 'Quantity';
        LanggKeys[langg]['billTotal'] = 'Total';
        LanggKeys[langg]['billSubTotal'] = 'SubTotal';
        LanggKeys[langg]['billDiscount'] = 'Discount';
        LanggKeys[langg]['billTax'] = 'Taxes';
        LanggKeys[langg]['billGrand'] = 'Grand Total';
        LanggKeys[langg]['billDateTime'] = 'Date / Time';
        LanggKeys[langg]['billAmount'] = 'Amount Due';
        LanggKeys[langg]['billPrev'] = 'Prev Payments';
        LanggKeys[langg]['billPaid'] = 'Current Paid';
        LanggKeys[langg]['billDue'] = 'Balance Due';
        LanggKeys[langg]['billNext'] = 'Next payment';
        LanggKeys[langg]['billPrint'] = 'Save & Print';
        LanggKeys[langg]['invRefund'] = 'Refund';
        PrintDataTable = 'Print';
        $('#tabsMember-3 .client').css({ 'padding-left': '6px', 'padding-right': '0', 'border-left': '6px solid #0087C3', 'border-right': '0', 'float': 'left' });
        $('#tabsMember-3 table.meta').css('float', 'right');
        $('#tabsMember-3 td').css('text-align', 'left');
        $('#tabsMember-3 table.balance td').css('text-align', 'right');
    }
    else if (langg == 'fr') {
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['billNumber'] = 'Facture #';
        LanggKeys[langg]['billTo'] = 'FACTURE À:';
        LanggKeys[langg]['billItem'] = 'Article';
        LanggKeys[langg]['billPrice'] = 'Prix';
        LanggKeys[langg]['billQTY'] = 'Quantité';
        LanggKeys[langg]['billTotal'] = 'Total';
        LanggKeys[langg]['billSubTotal'] = 'Sous Total';
        LanggKeys[langg]['billDiscount'] = 'Discount';
        LanggKeys[langg]['billTax'] = 'Taxes';
        LanggKeys[langg]['billGrand'] = 'Somme Finale';
        LanggKeys[langg]['billDateTime'] = 'Date / Heure';
        LanggKeys[langg]['billAmount'] = 'Montant dû';
        LanggKeys[langg]['billPrev'] = 'Paiements antérieurs';
        LanggKeys[langg]['billPaid'] = 'Payé actuellement';
        LanggKeys[langg]['billDue'] = 'Solde dû';
        LanggKeys[langg]['billNext'] = 'Prochain paiement';
        LanggKeys[langg]['billPrint'] = 'Enregistrer & imprimer';
        LanggKeys[langg]['invRefund'] = 'Rembourser';
        PrintDataTable = 'Impression';
        $('#tabsMember-3 .client').css({ 'padding-left': '6px', 'padding-right': '0', 'border-left': '6px solid #0087C3', 'border-right': '0', 'float': 'left' });
        $('#tabsMember-3 table.meta').css('float', 'right');
        $('#tabsMember-3 td').css('text-align', 'left');
        $('#tabsMember-3 table.balance td').css('text-align', 'right');
    }
    else if (langg == 'ar-sa') {
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['billNumber'] = 'فاتورة رقم #';
        LanggKeys[langg]['billTo'] = 'فاتورة باسم:';
        LanggKeys[langg]['billItem'] = 'الفئة';
        LanggKeys[langg]['billPrice'] = 'سعر الوحدة';
        LanggKeys[langg]['billQTY'] = 'الكمية';
        LanggKeys[langg]['billTotal'] = 'الإجمالي';
        LanggKeys[langg]['billSubTotal'] = 'المبلغ الإجمالي';
        LanggKeys[langg]['billDiscount'] = 'خصم';
        LanggKeys[langg]['billTax'] = 'ضريبة';
        LanggKeys[langg]['billGrand'] = 'المبلغ النهائي';
        LanggKeys[langg]['billDateTime'] = 'التاريخ / الوقت';
        LanggKeys[langg]['billAmount'] = 'المبلغ المطلوب';
        LanggKeys[langg]['billPrev'] = 'مدفوع سابقا';
        LanggKeys[langg]['billPaid'] = 'دفع حالي';
        LanggKeys[langg]['billDue'] = 'المبلغ المتبقي';
        LanggKeys[langg]['billNext'] = 'تاريخ دفع المتبقي';
        LanggKeys[langg]['billPrint'] = 'حفظ و طباعة';
        LanggKeys[langg]['invRefund'] = 'استرداد';
        PrintDataTable = 'طباعة';
        $('#tabsMember-3 .client').css({ 'padding-right': '6px', 'padding-left': '0', 'border-right': '6px solid #0087C3', 'border-left': '0', 'float': 'right' });
        $('#tabsMember-3 table.meta').css('float', 'left');
        $('#tabsMember-3 td').css('text-align', 'right');
        $('#tabsMember-3 table.balance td').css('text-align', 'left');
    }
}

//translate dialog EXtra Items:
function convertLangdialogItems(langg) {
    if (langg == 'en' || langg == 'en-gb') {
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['extraItemName'] = 'Name:';
        LanggKeys[langg]['extraItemPrice'] = 'Item Fees:';
        LanggKeys[langg]['extraItemNote'] = 'Item Description:';
        LanggKeys[langg]['itemsGridName'] = 'Item';
        LanggKeys[langg]['itemsGridPrice'] = 'Price';
        $('#dialogItems').dialog('option', 'title', 'Extra items');
        tabAddItem = 'Add Item';
        tabEditItem = 'Edit Items';
        $('#tabsItems ul:first li:eq(0) a').text("Add item");
        $('#tabsItems ul:first li:eq(1) a').text("Existing items");
        $('.ui-tabs .ui-tabs-nav li.ui-tabs-selected, .ui-tabs .ui-tabs-nav li.ui-state-default').css('float', 'left');
        $('.ui-tabs .ui-tabs-nav li a').css('float', 'left');
    }
    else if (langg == 'fr') {
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['extraItemName'] = 'Prénom:';
        LanggKeys[langg]['extraItemPrice'] = "Frais d'article:";
        LanggKeys[langg]['extraItemNote'] = "Description de l'objet:";
        LanggKeys[langg]['itemsGridName'] = 'Article';
        LanggKeys[langg]['itemsGridPrice'] = 'Prix';
        $('#dialogItems').dialog('option', 'title', 'Articles supplémentaires');
        tabAddItem = 'Ajouter un item';
        tabEditItem = 'Modifier les éléments';
        $('#tabsItems ul:first li:eq(0) a').text("Ajouter un item");
        $('#tabsItems ul:first li:eq(1) a').text("Articles existants");
        $('.ui-tabs .ui-tabs-nav li.ui-tabs-selected, .ui-tabs .ui-tabs-nav li.ui-state-default').css('float', 'left');
        $('.ui-tabs .ui-tabs-nav li a').css('float', 'left');
    }
    else if (langg == 'ar-sa') {
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['extraItemName'] = 'الاسم:';
        LanggKeys[langg]['extraItemPrice'] = 'سعر العنصر:';
        LanggKeys[langg]['extraItemNote'] = 'توصيف العنصر:';
        LanggKeys[langg]['itemsGridName'] = 'العنصر';
        LanggKeys[langg]['itemsGridPrice'] = 'السعر';
        $('#dialogItems').dialog('option', 'title', 'عناصر إضافية');
        tabAddItem = 'إضافة عنصر';
        tabEditItem = 'تعديل العنصر';
        $('#tabsItems ul:first li:eq(0) a').text("إضافة عنصر");
        $('#tabsItems ul:first li:eq(1) a').text("العناصر الموجودة");
        $('.ui-tabs .ui-tabs-nav li.ui-tabs-selected, .ui-tabs .ui-tabs-nav li.ui-state-default').css('float', 'right');
        $('.ui-tabs .ui-tabs-nav li a').css('float', 'right');
    }
}

//translate dialog Settings:
function convertLangdialogSettings(langg) {
    if (langg == 'en' || langg == 'en-gb') {
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['setNotif'] = 'Notifications';
        LanggKeys[langg]['setDefaults'] = 'Business Defaults';
        LanggKeys[langg]['setNotifSubs'] = 'Subscriptions Alert';
        LanggKeys[langg]['setNotifInv'] = 'Invoices Alert';
        LanggKeys[langg]['setNotifSubsDay'] = 'Subscriptions expires within the days number:';
        LanggKeys[langg]['setNotifSubsVisit'] = 'Subscriptions expires within the visits number:';
        LanggKeys[langg]['setNotifInvPay'] = 'Invoices that have a payment date within the days:';
        LanggKeys[langg]['setLogo'] = 'Company logo';
        LanggKeys[langg]['setLogoInfo'] = 'Click on the photo to set company logo:';
        LanggKeys[langg]['setLogoRec'] = 'Recommended dimensions 50 pixel * 50 pixel';
        LanggKeys[langg]['setHours'] = 'Working hours';
        LanggKeys[langg]['startWork2'] = 'Start time:';
        LanggKeys[langg]['endWork2'] = 'End time:';
        $('#frmSettingDefults').bootstrapValidator('updateMessage', 'startWork2', 'regexp', 'Please enter a valid time between 00:00 and 23:59');
        $('#frmSettingDefults').bootstrapValidator('updateMessage', 'endWork2', 'regexp', 'Please enter a valid time between 00:00 and 23:59');
        $('#dialogSettings').dialog('option', 'title', 'Settings');
        $('.resp-vtabs ul.resp-tabs-list').css('float', 'left');
        $('.resp-vtabs li.resp-tab-item').css('margin-right', '-1px').css('margin-left', '0px')
            .css('border-left', '4px solid #5AB1D0')
            .css('border-right', '1px #FFF solid');
    }
    else if (langg == 'fr') {
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['setNotif'] = 'Notifications';
        LanggKeys[langg]['setDefaults'] = 'Valeurs par défaut';
        LanggKeys[langg]['setNotifSubs'] = 'Alerte aux abonnements';
        LanggKeys[langg]['setNotifInv'] = 'Alerte de factures';
        LanggKeys[langg]['setNotifSubsDay'] = 'Les abonnements expirent dans le nombre de jours:';
        LanggKeys[langg]['setNotifSubsVisit'] = 'Les abonnements expirent dans le numéro des visites:';
        LanggKeys[langg]['setNotifInvPay'] = 'Les factures qui ont une date de paiement dans les jours:';
        LanggKeys[langg]['setLogo'] = "Logo d'entreprise";
        LanggKeys[langg]['setLogoInfo'] = "Cliquez sur la photo pour définir le logo de l'entreprise:";
        LanggKeys[langg]['setLogoRec'] = 'Dimensions recommandées 50 pixels * 50 pixels';
        LanggKeys[langg]['setHours'] = 'Heures de travail';
        LanggKeys[langg]['startWork2'] = 'Heure de début:';
        LanggKeys[langg]['endWork2'] = 'Heure de fin:';
        $('#frmSettingDefults').bootstrapValidator('updateMessage', 'startWork2', 'regexp', 'Entrez une heure valable entre 00:00 et 23:59');
        $('#frmSettingDefults').bootstrapValidator('updateMessage', 'endWork2', 'regexp', 'Entrez une heure valable entre 00:00 et 23:59');
        $('#dialogSettings').dialog('option', 'title', 'Paramètres');
        $('.resp-vtabs ul.resp-tabs-list').css('float', 'left');
        $('.resp-vtabs li.resp-tab-item').css('margin-right', '-1px').css('margin-left', '0px')
            .css('border-left', '4px solid #5AB1D0')
            .css('border-right', '1px #FFF solid');
    }
    else if (langg == 'ar-sa') {
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['setNotif'] = 'الإشعارات';
        LanggKeys[langg]['setDefaults'] = 'اعدادات الشركة';
        LanggKeys[langg]['setNotifSubs'] = 'تنبيهات الاشتراكات';
        LanggKeys[langg]['setNotifInv'] = 'تنبيهات الفواتير';
        LanggKeys[langg]['setNotifSubsDay'] = 'الاشتراكات المنتهية خلال عدد الأيام:';
        LanggKeys[langg]['setNotifSubsVisit'] = 'الاشتراكات المنتهية خلال عدد الزيارات:';
        LanggKeys[langg]['setNotifInvPay'] = 'تواريخ سداد مستحقة خلال عدد الأيام:';
        LanggKeys[langg]['setLogo'] = 'شعار الشركة';
        LanggKeys[langg]['setLogoInfo'] = 'انقر على الصورة لتغيير الشعار:';
        LanggKeys[langg]['setLogoRec'] = 'يفضل أبعاد 50 بكسل * 50 بكسل';
        LanggKeys[langg]['setHours'] = 'ساعات العمل';
        LanggKeys[langg]['startWork2'] = 'من الساعة:';
        LanggKeys[langg]['endWork2'] = 'حتى الساعة:';
        $('#frmSettingDefults').bootstrapValidator('updateMessage', 'startWork2', 'regexp', 'الرجاء إدخال توقيت صالح بين 00:00 و 23:59');
        $('#frmSettingDefults').bootstrapValidator('updateMessage', 'endWork2', 'regexp', 'الرجاء إدخال توقيت صالح بين 00:00 و 23:59');
        $('#dialogSettings').dialog('option', 'title', 'الإعدادات');
        $('.resp-vtabs ul.resp-tabs-list').css('float', 'right');
        $('.resp-vtabs li.resp-tab-item').css('margin-left', '-1px').css('margin-right', '0px')
            .css('border-right', '4px solid #5AB1D0')
            .css('border-left', '1px #FFF solid');
    }
}

//translate dialog Account for member:
function convertLangdialogAccountMember(langg) {
    if (langg == 'en' || langg == 'en-gb') {
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['accEmailMem'] = 'Email';
        LanggKeys[langg]['accPassMem'] = 'Password';
        LanggKeys[langg]['accPassConfMem'] = 'Confirm Password';
        LanggKeys[langg]['saveAccMem'] = 'Save';
        LanggKeys[langg]['closeAccMem'] = 'Close';
        $('#frmAccountMem #blockAccMem').css('float', 'right');
        //$('#dialogAccountMember').dialog('option', 'title', 'Access account');
    }
    else if (langg == 'fr') {
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['accEmailMem'] = 'Email';
        LanggKeys[langg]['accPassMem'] = 'Mot de passe';
        LanggKeys[langg]['accPassConfMem'] = 'Confirmez le mot de passe';
        LanggKeys[langg]['saveAccMem'] = 'Sauvegarder';
        LanggKeys[langg]['closeAccMem'] = 'Fermer';
        $('#frmAccountMem #blockAccMem').css('float', 'right');
        //$('#dialogAccountMember').dialog('option', 'title', 'Access account');
    }
    else if (langg == 'ar-sa') {
        LanggKeys[langg] = new Array();
        LanggKeys[langg]['accEmailMem'] = 'البريد الإلكتروني';
        LanggKeys[langg]['accPassMem'] = 'كلمة المرور';
        LanggKeys[langg]['accPassConfMem'] = 'تأكيد كلمة المرور';
        LanggKeys[langg]['saveAccMem'] = 'حفظ';
        LanggKeys[langg]['closeAccMem'] = 'إلغاء';
        $('#frmAccountMem #blockAccMem').css('float', 'Left');
        //$('#dialogAccountMember').dialog('option', 'title', 'حساب الدخول');
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
        $('#frmSettingDefults').bootstrapValidator('setLocale', 'en_US');
    }
    else if (langg == 'fr') {
        $('#frmMember').bootstrapValidator('setLocale', 'fr_FR');
        $('#frmMembership').bootstrapValidator('setLocale', 'fr_FR');
        $('#frmChngAcc').bootstrapValidator('setLocale', 'fr_FR');
        $('#frmChngPass').bootstrapValidator('setLocale', 'fr_FR');
        $('#frmChngCompany').bootstrapValidator('setLocale', 'fr_FR');
        $('#frmAddDiv').bootstrapValidator('setLocale', 'fr_FR');
        $('#dialogMemType #frmProgram').bootstrapValidator('setLocale', 'fr_FR');
        $('#dialogMetaData #frmAddDiv').bootstrapValidator('setLocale', 'fr_FR');
        $('#dialogMetaData #frmProgram').bootstrapValidator('setLocale', 'fr_FR');

        $('#frmStaff').bootstrapValidator('setLocale', 'fr_FR');
        $('#frmItem').bootstrapValidator('setLocale', 'fr_FR');
        $('#frmSettingNotif').bootstrapValidator('setLocale', 'fr_FR');
        $('#frmAccountMem').bootstrapValidator('setLocale', 'fr_FR');
        $('#frmSettingDefults').bootstrapValidator('setLocale', 'fr_FR');
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
        $('#frmSettingDefults').bootstrapValidator('setLocale', 'ar_MA');
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
    })

    if ($(window).width() <= 750) {
        $('.sliderSetting').css('top', '230px');
        $('.switcherLang').css('top', '285px');
    }
});

