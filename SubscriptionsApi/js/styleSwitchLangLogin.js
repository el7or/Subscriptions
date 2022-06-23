var txtPassValid = "Passwords Don't Match!";
var planFeesFree = 'No Fees';
var planFeesMonth = '$ 4.95 /month';
var planFeesYear = '$ 47.40 /year';
var planFeesOneTime = '$ 291 /forever';

var titleForgetConfirm;
var textForgetConfirm;
var titleForgetSuccess;
var textForgetSuccess;
var textForgetOK;
var textForgetNO;

/* english & arabic style */
$(document).ready(function () {
    // change language from select list
    $('#ddlLanguages').on('change', function () {
        var langg = $(this).val();
        $('#langgVal').val(langg);
        convertLangg(langg);
    });
    if ($('#langgVal').val() != "") {
        convertLangg($('#langgVal').val());
    }
    else {
        convertLangg('en');
    }
    // cahnge language from query strnig
    var langg = GetParameterValues('lang');
    if (langg == 1) {
        $('#ddlLanguages').val('en').change();
    }
    else if (langg == 2) {
        $('#ddlLanguages').val('ar-sa').change();
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

// Main function to translate All site:
function convertLangg(langg) {
    if (langg == 'en' || langg == 'en-gb') {
        $('*').css('direction', 'ltr');
        LanggKeys['en'] = new Array();
        LanggKeys['en']['lblLang'] = 'Language:';
        LanggKeys['en']['loginTitle'] = 'Log in';
        LanggKeys['en']['loginMail'] = 'Your email';
        LanggKeys['en']['loginPass'] = 'Your password';
        LanggKeys['en']['loginKeep'] = 'Keep me logged in';
        LanggKeys['en']['loginErr'] = 'Your email or password is incorrect!';
        LanggKeys['en']['forgetErr'] = 'Your email is incorrect!';
        LanggKeys['en']['loginErr2'] = 'Your account is locked, Please contact your Admin!';
        LanggKeys['en']['loginNotYet'] = 'Not a member yet ?';
        LanggKeys['en']['loginJoin'] = 'Join us';
        LanggKeys['en']['signTitle'] = 'Sign up';
        LanggKeys['en']['signMail'] = 'Your email';
        LanggKeys['en']['signPass'] = 'Your password';
        LanggKeys['en']['signconf'] = 'Please confirm your password ';
        LanggKeys['en']['signfName'] = 'First name';
        LanggKeys['en']['signlName'] = 'Last name';
        LanggKeys['en']['signcomp'] = 'Company name';
        LanggKeys['en']['signIndust'] = 'Industry';
        LanggKeys['en']['signcontry'] = 'Country';
        LanggKeys['en']['signCity'] = 'City';
        LanggKeys['en']['signAdres'] = 'Address';
        LanggKeys['en']['signPhon'] = 'Phone';
        LanggKeys['en']['signPlan'] = 'Plan';
        LanggKeys['en']['signPlanDesc'] = 'Plan Fees';
        LanggKeys['en']['signErr'] = 'This email have already registered! Please choose another email or goto login form!';
        LanggKeys['en']['signAlredy'] = 'Already a member ?';
        LanggKeys['en']['signGoLogin'] = 'Go and log in';

        $('#btnLogin').val('Login');
        $('#btnSignUp').val('Sign up');
        $('#lnkForget').text('Forget Password');
        $('#keepLogin, #lnkForget').css('text-align', 'left');
        $('#loginHeader').html('<span>Marché </span> Subscription Manager ');
        $('#txtUserName').attr("oninvalid", "setCustomValidity('Must enter email!')");
        $('#txtPassword').attr("oninvalid", "setCustomValidity('Must enter Password!')");

        $('#txtEmailSignup').attr("oninvalid", "setCustomValidity('Must enter valid email!')");
        $('#txtPasswordSignup').attr("oninvalid", "setCustomValidity('Must enter Password at least 6 characters!')");
        $('#txtPasswordSignup_confirm').attr("oninvalid", "setCustomValidity('Must enter Confirming Password matched with Password!')");
        $('#txtFirstName').attr("oninvalid", "setCustomValidity('Must enter First name!')");
        $('#txtLastName').attr("oninvalid", "setCustomValidity('Must enter Last name!')");
        $('#txtCompany').attr("oninvalid", "setCustomValidity('Must enter Company name!')");
        $('#ddlIndustry').attr("oninvalid", "setCustomValidity('Must enter Industry!')");
        $('#ddlCountry').attr("oninvalid", "setCustomValidity('Must enter Country!')");
        $('#txtPhone').attr("oninvalid", "setCustomValidity('Must enter Phone number!')");

        $('#mailNotice').html('&#10077; Must enter valid email address to receive activation mail &#x275E;');
        $('#txtFirstName').attr('placeholder', 'Ahmed');
        $('#txtLastName').attr('placeholder', 'Mohammed');
        $('#txtCompany').attr('placeholder', 'Sera Gym');
        $('#txtAddress').attr('placeholder', '24 fox st.');
        $('#txtPasswordSignup').attr('title', 'Must be at least 6 characters!');
        $("option[selected=selected]").text('-- Choose --');
        $("option[value=Free]").text('Free');
        $("option[value=Monthly]").text('Monthly');
        $("option[value=Yearly]").text('Yearly');
        $("option[value=On_Premises]").text('On-Premises');
        txtPassValid = "Passwords Don't Match!";
        planFeesFree = 'No Fees';
        planFeesMonth = '$ 4.95 /month';
        planFeesYear = '$ 47.40 /year';
        planFeesOneTime = '$ 291 /forever';
    }
    else if (langg == 'fr') {
        $('*').css('direction', 'ltr');
        LanggKeys['en'] = new Array();
        LanggKeys['en']['lblLang'] = 'La langue:';
        LanggKeys['en']['loginTitle'] = "S'identifier:";
        LanggKeys['en']['loginMail'] = 'Votre email';
        LanggKeys['en']['loginPass'] = 'Votre mot de passe';
        LanggKeys['en']['loginKeep'] = 'Rester connecté';
        LanggKeys['en']['loginErr'] = 'Votre e-mail ou votre mot de passe est incorrect!';
        LanggKeys['en']['forgetErr'] = 'Votre email est incorrect!';
        LanggKeys['en']['loginErr2'] = 'Votre compte est verrouillé, contactez votre administrateur!';
        LanggKeys['en']['loginNotYet'] = 'Pas encore membre ?';
        LanggKeys['en']['loginJoin'] = 'Rejoignez-nous';
        LanggKeys['en']['signTitle'] = "S'inscrire";
        LanggKeys['en']['signMail'] = 'Votre email';
        LanggKeys['en']['signPass'] = 'Votre mot de passe';
        LanggKeys['en']['signconf'] = 'Veuillez confirmer votre mot de passe ';
        LanggKeys['en']['signfName'] = 'Prénom';
        LanggKeys['en']['signlName'] = 'Nom de famille';
        LanggKeys['en']['signcomp'] = 'Nom de la compagnie';
        LanggKeys['en']['signIndust'] = 'Industrie';
        LanggKeys['en']['signcontry'] = 'Pays';
        LanggKeys['en']['signCity'] = 'Ville';
        LanggKeys['en']['signAdres'] = 'Adresse';
        LanggKeys['en']['signPhon'] = 'Téléphone';
        LanggKeys['en']['signPlan'] = 'Plan';
        LanggKeys['en']['signPlanDesc'] = 'Plan Honoraires';
        LanggKeys['en']['signErr'] = "Ce courriel s'est déjà enregistré! Veuillez choisir un autre e-mail ou goto login!";
        LanggKeys['en']['signAlredy'] = 'Déjà membre ?';
        LanggKeys['en']['signGoLogin'] = 'Allez et connectez-vous';

        $('#btnLogin').val("S'identifier");
        $('#btnSignUp').val("S'inscrire");
        $('#lnkForget').text('Mot de passe oublié');
        $('#keepLogin, #lnkForget').css('text-align', 'left');
        $('#loginHeader').html("<span>Marché </span> Gestionnaire d'abonnement ");
        $('#txtUserName').attr("oninvalid", "setCustomValidity('Vous devez entrer un email!')");
        $('#txtPassword').attr("oninvalid", "setCustomValidity('Doit entrer le mot de passe!')");

        $('#txtEmailSignup').attr("oninvalid", "setCustomValidity('Vous devez entrer un email valide!')");
        $('#txtPasswordSignup').attr("oninvalid", "setCustomValidity('Vous devez entrer le mot de passe au moins 6 caractères!')");
        $('#txtPasswordSignup_confirm').attr("oninvalid", "setCustomValidity('Vous devez entrer Confirmer le mot de passe avec le mot de passe!')");
        $('#txtFirstName').attr("oninvalid", "setCustomValidity('Vous devez entrer Prénom!')");
        $('#txtLastName').attr("oninvalid", "setCustomValidity('Vous devez entrer Nom de famille!')");
        $('#txtCompany').attr("oninvalid", "setCustomValidity('Inscrivez le nom de l'entreprise!')");
        $('#ddlIndustry').attr("oninvalid", "setCustomValidity('Doit entrer dans l'industrie!')");
        $('#ddlCountry').attr("oninvalid", "setCustomValidity('Doit entrer le pays!')");
        $('#txtPhone').attr("oninvalid", "setCustomValidity('Vous devez entrer le numéro de téléphone!')");

        $('#mailNotice').html("&#10077; Doit entrer une adresse e-mail valide pour recevoir le courrier d'activation &#x275E;");
        $('#txtFirstName').attr('placeholder', 'Frank');
        $('#txtLastName').attr('placeholder', 'John');
        $('#txtCompany').attr('placeholder', 'Sera Gym');
        $('#txtAddress').attr('placeholder', '24 fox st.');
        $('#txtPasswordSignup').attr('title', 'Doit être au moins 6 caractères!');
        $("option[selected=selected]").text('-- Choisir --');
        $("option[value=Free]").text('Gratuit');
        $("option[value=Monthly]").text('Mensuel');
        $("option[value=Yearly]").text('Annuel');
        $("option[value=On_Premises]").text('Sur place');
        txtPassValid = "Les mots de passe ne correspondent pas!";
        planFeesFree = 'Pas de frais';
        planFeesMonth = '$ 4.95 /mois';
        planFeesYear = '$ 47.40 /an';
        planFeesOneTime = '$ 291 /pour toujours';
    }
    else if (langg == 'ar-sa') {
        $('*').css('direction', 'rtl');
        LanggKeys['ar-sa'] = new Array();
        LanggKeys['ar-sa']['lblLang'] = 'اللغة:';
        LanggKeys['ar-sa']['loginTitle'] = 'تسجيل الدخول';
        LanggKeys['ar-sa']['loginMail'] = 'البريد الإلكتروني';
        LanggKeys['ar-sa']['loginPass'] = 'كلمة المرور';
        LanggKeys['ar-sa']['loginKeep'] = 'حفظ تسجيل الدخول';
        LanggKeys['ar-sa']['loginErr'] = 'خطأ في البريد الإلكتروني أو كلمة المرور!';
        LanggKeys['ar-sa']['forgetErr'] = '  البريد الإلكتروني غير صحيح!';
        LanggKeys['ar-sa']['loginErr2'] = 'حسابك قد تم ايقافه، برجاء التواصل مع المدير!';
        LanggKeys['ar-sa']['loginNotYet'] = 'لم تقم بالتسجيل معنا بعد ؟';
        LanggKeys['ar-sa']['loginJoin'] = 'الالتحاق بنا';
        LanggKeys['ar-sa']['signTitle'] = 'التسجيل';
        LanggKeys['ar-sa']['signMail'] = 'البريد الإلكتروني';
        LanggKeys['ar-sa']['signPass'] = 'كلمة المرور';
        LanggKeys['ar-sa']['signconf'] = 'تأكيد كلمة المرور';
        LanggKeys['ar-sa']['signfName'] = 'الاسم الأول';
        LanggKeys['ar-sa']['signlName'] = 'الاسم الأخير';
        LanggKeys['ar-sa']['signcomp'] = 'اسم الشركة';
        LanggKeys['ar-sa']['signIndust'] = 'مجال العمل';
        LanggKeys['ar-sa']['signcontry'] = 'الدولة';
        LanggKeys['ar-sa']['signCity'] = 'المدينة';
        LanggKeys['ar-sa']['signAdres'] = 'العنوان';
        LanggKeys['ar-sa']['signPhon'] = 'رقم الهاتف';
        LanggKeys['ar-sa']['signPlan'] = 'نوع الاشتراك';
        LanggKeys['ar-sa']['signPlanDesc'] = 'رسوم الاشتراك';
        LanggKeys['ar-sa']['signErr'] = 'هذا البريد الإلكتروني مسجل لدينا بالفعل! الرجاء اختيار بريد آخر أو قم بتسجيل الدخول!';
        LanggKeys['ar-sa']['signAlredy'] = 'هل أنت مسجل لدينا سابقا؟';
        LanggKeys['ar-sa']['signGoLogin'] = 'تسجيل الدخول';

        $('#btnLogin').val('دخول');
        $('#btnSignUp').val('تسجيل');
        $('#lnkForget').text('نسيت كلمة المرور');
        $('#keepLogin, #lnkForget').css('text-align', 'right');
        $('#loginHeader').html(' برنامج الاشتراكات <span>Marché </span>');
        $('#txtUserName').attr("oninvalid", "setCustomValidity('يجب ادخال بريد إلكتروني صحيح!')");
        $('#txtPassword').attr("oninvalid", "setCustomValidity('يجب إدخال كلمة المرور!')");
        $('#txtUserName').attr('title', 'مطلوب صيغة بريد إلكتروني صحيح!');

        $('#txtEmailSignup').attr("oninvalid", "setCustomValidity('يجب إدخال بريد الكتروني صحيح!')");
        $('#txtPasswordSignup').attr("oninvalid", "setCustomValidity('يجب إدخال كلمة المرور لا تقل عن 6 حروف!')");
        $('#txtPasswordSignup_confirm').attr("oninvalid", "setCustomValidity('يجب إدخال تأكيد كلمة المرور متماثلة مع كلمة المرور!')");
        $('#txtFirstName').attr("oninvalid", "setCustomValidity('يجب إدخال الاسم الأول!')");
        $('#txtLastName').attr("oninvalid", "setCustomValidity('يجب إدخال الاسم الأخير!')");
        $('#txtCompany').attr("oninvalid", "setCustomValidity('يجب إدخال اسم الشركة!')");
        $('#ddlIndustry').attr("oninvalid", "setCustomValidity('يجب إدخال مجال عمل الشركة!')");
        $('#ddlCountry').attr("oninvalid", "setCustomValidity('يجب إدخال اسم الدولة!')");
        $('#txtPhone').attr("oninvalid", "setCustomValidity('يجب إدخال رقم الهاتف!')");

        $('#mailNotice').html('&#x275E; يجب أن يكون البريد الإلكتروني صحيح لتلقي كود التفعيل &#10077;');
        $('#txtFirstName').attr('placeholder', 'أحمد');
        $('#txtLastName').attr('placeholder', 'محمد');
        $('#txtCompany').attr('placeholder', 'الشركة العامة للمقاولات');
        $('#txtAddress').attr('placeholder', '25 شارع الملك فهد');
        $('#txtEmailSignup').attr('title', 'مطلوب صيغة بريد الكتروني صحيح!');
        $('#txtPasswordSignup').attr('title', 'يجب ألا يقل عن 6 حروف!');
        $("option[selected=selected]").text('-- اختار --');
        $("option[value=Free]").text('مجاني');
        $("option[value=Monthly]").text('شهري');
        $("option[value=Yearly]").text('سنوي');
        $("option[value=On_Premises]").text('دائم');
        txtPassValid = "غير متطابق مع كلمة المرور!";
        planFeesFree = 'لايوجد رسوم';
        planFeesMonth = '$ 4.95 شهريا';
        planFeesYear = '$ 47.40 سنويا';
        planFeesOneTime = '$ 291';
    }
    $('*').each(function (i) {
        $(this).text(LanggKeys[langg][$(this).attr('data-langg')]);
    });
}

// translate confirm message
function convertLanggConfirm(langg) {
    if (langg == 'en' || langg == 'en-gb') {
        $('*').css('direction', 'ltr');
        titleForgetConfirm = 'Are you sure ?';
        textForgetConfirm = 'We will send access details to your email !';
        titleForgetSuccess = 'Success';
        textForgetSuccess = 'Mail has been sent and will take a few minutes, then check your inbox and spam folder!';
        textSignupConfirm = 'Mail activation has been sent and will take a few minutes, please check your inbox and spam folder!';
        textForgetOK = 'Yes, Send';
        textForgetNO = 'Cancel';
    }
    else if (langg == 'fr') {
        $('*').css('direction', 'ltr');
        titleForgetConfirm = 'Êtes-vous sûr ?';
        textForgetConfirm = "Nous vous enverrons des détails d'accès à votre courrier électronique!";
        titleForgetSuccess = 'Succès';
        textForgetSuccess = "L'envoi de courrier a été effectué avec succès!";
        textSignupConfirm = "Message d'activation par courrier électronique envoyé, vérifiez votre dossier de réception et spam.";
        textForgetOK = 'Oui, envoyer';
        textForgetNO = 'Annuler';
    }
    else if (langg == 'ar-sa') {
        $('*').css('direction', 'rtl');
        titleForgetConfirm = 'هل أنت متأكد ؟';
        textForgetConfirm = 'سيتم إرسال كلمة المرور للبريد الإلكتروني !';
        titleForgetSuccess = 'تم بنجاح';
        textForgetSuccess = 'تم ارسال رسالة إلى بريدك الإلكتروني وقد يستغرق وصولها بضع دقائق !';
        textSignupConfirm = 'تم إرسال رسالة التفعيل لبريدك الإلكتروني وقد يستغرق وصولها بضع دقائق، الرجاء تفقد صندوق البريد الوارد لديك أو مجلد الرسائل الغير مرغوب فيها !';
        textForgetOK = 'نعم، أرسل الآن';
        textForgetNO = 'إلغاء';
    }
}

//custom compare validation for passowrd and confirm password:
$(document).ready(function () {
    var password = document.getElementById("txtPasswordSignup")
        , confirm_password = document.getElementById("txtPasswordSignup_confirm");

    function validatePassword() {
        if (password.value != confirm_password.value) {
            confirm_password.setCustomValidity(txtPassValid);
        } else {
            confirm_password.setCustomValidity('');
        }
    }

    password.onchange = validatePassword;
    confirm_password.onkeyup = validatePassword;
    confirm_password.onchange = validatePassword;

    $('#txtEmailSignup').on('change', function () {
        $('#lblErrorMatch').hide();
    });
});

// props when page load:
$(document).ready(function () {
    $('#txtEmailSignup').prop('disabled', true);
    $('#txtPasswordSignup').prop('disabled', true);
    $('#txtPasswordSignup_confirm').prop('disabled', true);
    $('#txtFirstName').prop('disabled', true);
    $('#txtLastName').prop('disabled', true);
    $('#txtPhone').prop('disabled', true);
    $('#txtCompany').prop('disabled', true);
    $('#ddlIndustry').prop('disabled', true);
    $('#ddlCountry').prop('disabled', true);
    var prevURL = document.referrer;
    if (prevURL.indexOf("www.marchesuite.com") !== -1 && prevURL.indexOf("sms") == -1) {
        $('#lnkbtnToRegister').get(0).click();
    }
    var planValue = getQueryStringValue('plan');
    $('#ddlPlans').val(planValue).trigger('change');
});
function getQueryStringValue(key) {
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}  

// reset form when goto signup:
function resetSignupForm() {
    $('#txtUserName').prop('disabled', true);
    $('#txtPassword').prop('disabled', true);

    $('#txtEmailSignup').removeAttr('disabled');
    $('#txtPasswordSignup').removeAttr('disabled');
    $('#txtPasswordSignup_confirm').removeAttr('disabled');
    $('#txtFirstName').removeAttr('disabled');
    $('#txtLastName').removeAttr('disabled');
    $('#txtPhone').removeAttr('disabled');
    $('#txtCompany').removeAttr('disabled');
    $('#ddlIndustry').removeAttr('disabled');
    $('#ddlCountry').removeAttr('disabled');

    $('#lblErrorMatch').hide();
    $('#txtEmailSignup').val('');
    $('#txtPasswordSignup').val('');
    $('#txtPasswordSignup_confirm').val('');
    $('#txtFirstName').val('');
    $('#txtLastName').val('');
    $('#txtCompany').val('');
    $('#txtAddress').val('');
    $('#txtPhone').val('');
    $("#ddlIndustry").val($("#ddlIndustry option:eq(0)").val());
    $("#ddlCountry").val($("#ddlCountry option:eq(0)").val());
    $("#ddlCity").val($("#ddlCity option:eq(0)").val());
    $("body").scrollTop('0');
}

// reset form when goto login:
function resetLoginForm() {
    $('#txtUserName').removeAttr('disabled').val('');
    $('#txtPassword').removeAttr('disabled').val('');

    $('#txtEmailSignup').prop('disabled', true);
    $('#txtPasswordSignup').prop('disabled', true);
    $('#txtPasswordSignup_confirm').prop('disabled', true);
    $('#txtFirstName').prop('disabled', true);
    $('#txtLastName').prop('disabled', true);
    $('#txtPhone').prop('disabled', true);
    $('#txtCompany').prop('disabled', true);
    $('#ddlIndustry').prop('disabled', true);
    $('#ddlCountry').prop('disabled', true);

    $('#lblErrorLogin').hide();
    $('#chkLoginkeeping').attr('checked', false);
    $("body").scrollTop('0');
}

// confirming dialog if click on forget passowrd (called from server side):
function confirmForget() {
    convertLanggConfirm($('#ddlLanguages').val());
    swal({
        title: titleForgetConfirm,
        text: textForgetConfirm,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: textForgetOK,
        cancelButtonText: textForgetNO,
        closeOnConfirm: false
    },
        function (isConfirm) {
            if (isConfirm) {
                swal({
                    title: titleForgetSuccess,
                    text: textForgetSuccess,
                    type: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
            } else {
                return;
            }
        });
}

// alert dialog after sign up (called from server side):
function confirmSignup() {
    convertLanggConfirm($('#ddlLanguages').val());
    swal({
        title: titleForgetSuccess,
        text: textSignupConfirm,
        type: "success"
    },
        function () {
            window.location = 'Login.aspx';
        });
}

// when select payment plan
$(document).on('change', '#ddlPlans', function () {
    switch ($(this).val()) {
        case "free":
            $('#planDesc').val(planFeesFree);
            break;
        case "monthly":
            $('#planDesc').val(planFeesMonth);
            break;
        case "yearly":
            $('#planDesc').val(planFeesYear);
            break;
        case "on_Premises":
            $('#planDesc').val(planFeesOneTime);
            break;
        default:
            break;
    }
});
