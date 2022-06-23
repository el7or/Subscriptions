/* english & arabic style */
$(document).ready(function () {
    var langg = GetParameterValues('lang');
    if (langg==1) {
        convertLangg('en');
    }
    else if(langg==2){
        convertLangg('ar-sa');
    }


    function GetParameterValues(param) {
        var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < url.length; i++) {
            var urlparam = url[i].split('=');
            if (urlparam[0] == param) {
                return urlparam[1];
            }
        }
    }
});

var LanggKeys = new Array();
function convertLangg(langg) {
    if (langg == 'en' || langg == 'en-gb') {
        $('*').css('direction', 'ltr');
        LanggKeys['en'] = new Array();
        LanggKeys['en']['thk'] = 'Activation has been successfully';
        LanggKeys['en']['now'] = 'Now you can use all system features after login:';
        LanggKeys['en']['lnk'] = 'Subscriptions System';
    }
    else if (langg == 'fr') {
        $('*').css('direction', 'ltr');
        LanggKeys['en'] = new Array();
        LanggKeys['en']['thk'] = "L'activation a été réussie";
        LanggKeys['en']['now'] = "Maintenant, vous pouvez utiliser toutes les fonctionnalités du système après la connexion:";
        LanggKeys['en']['lnk'] = "Système d'abonnements";
    }
    else if (langg == 'ar-sa') {
        $('*').css('direction', 'rtl');
        LanggKeys['ar-sa'] = new Array();
        LanggKeys['ar-sa']['thk'] = 'تم التفعيل بنجاح';
        LanggKeys['ar-sa']['now'] = 'الآن تستطيع استخدام كافة خصائص البرنامج بعد تسجيل الدخول:';
        LanggKeys['ar-sa']['lnk'] = 'برنامج الاشتراكات';
    }
    $('*').each(function (i) {
        $(this).text(LanggKeys[langg][$(this).attr('data-langg')]);
    });
}