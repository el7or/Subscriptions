var dateFormatValidation = 'MM-DD-YYYY';

//validation of change Account details in left sliders
$(document).ready(function () {
    $('#frmChngAcc').bootstrapValidator({
        //live: 'disabled',
        container: 'tooltip',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        excluded: [':disabled'],
        fields: {
            fnameAcc: {
                validators: {
                    notEmpty: {
                        //message: 'The password is required and cannot be empty'
                    },
                    stringLength: {
                        min: 0,
                        max: 10,
                        //message: 'The username must be more than 6 and less than 30 characters long'
                    }
                }
            },
            lnameAcc: {
                validators: {
                    notEmpty: {
                        //message: 'The password is required and cannot be empty'
                    },
                    stringLength: {
                        min: 0,
                        max: 10,
                        //message: 'The username must be more than 6 and less than 30 characters long'
                    }
                }
            },
            emailAcc: {
                validators: {
                    notEmpty: {
                        //message: 'The password is required and cannot be empty'
                    },
                    emailAddress: {
                        //message: 'The input is not a valid email address'
                    }
                }
            },
            phoneAcc: {
                validators: {
                    notEmpty: {},
                    digits: {},
                    stringLength: {
                        min: 6,
                        max: 30,
                        //message: 'الرجاء ادخال عدد ارقام بين 6 و 30'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        UpdateUserAcc();
        e.preventDefault();
    });
});

//validation of change password in left sliders
$(document).ready(function () {
    $('#frmChngPass').bootstrapValidator({
        //live: 'disabled',
        container: 'tooltip',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        excluded: [':disabled'],
        fields: {
            oldPass: {
                validators: {
                    notEmpty: {
                        //message: 'The password is required and cannot be empty'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        //message: 'The username must be more than 6 and less than 30 characters long'
                    }
                }
            },
            newPass: {
                validators: {
                    notEmpty: {
                        //message: 'The password is required and cannot be empty'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        //message: 'The username must be more than 6 and less than 30 characters long'
                    },
                    different: {
                        field: 'oldPass',
                        //message: 'The password cannot be the same as old password'
                    }
                }
            },
            confirmPass: {
                validators: {
                    notEmpty: {
                        //message: 'The confirm password is required and cannot be empty'
                    },
                    identical: {
                        field: 'newPass',
                        //message: 'The password and its confirm are not the same'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        UpdatePassAcc();
        e.preventDefault();
        $('#frmChngPass').data('bootstrapValidator').resetForm(true);
    });
});

//validation of change Company details in left sliders
$(document).ready(function () {
    $('#frmChngCompany').bootstrapValidator({
        //live: 'disabled',
        container: 'tooltip',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        excluded: [':disabled'],
        fields: {
            companyName: {
                validators: {
                    notEmpty: {
                        //message: 'The password is required and cannot be empty'
                    },
                    stringLength: {
                        min: 0,
                        max: 15,
                        //message: 'The username must be more than 6 and less than 30 characters long'
                    }
                }
            },
            industry: {
                validators: {
                    stringLength: {
                        min: 0,
                        max: 20,
                        //message: 'The username must be more than 6 and less than 30 characters long'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        UpdateCompAcc();
        e.preventDefault();
    });
});

//validation for add new division in programs dialog:
$(document).ready(function () {
    $('#dialogDivs #frmAddDiv').bootstrapValidator({
        //live: 'disabled',
        container: 'tooltip',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        excluded: [':disabled'],
        fields: {
            newDiv: {
                validators: {
                    notEmpty: {
                        //message: 'The password is required and cannot be empty'
                    },
                    stringLength: {
                        min: 0,
                        max: 20,
                        //message: 'The username must be more than 6 and less than 30 characters long'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        var divisionName = $('#dialogDivs #newDiv').val();
        PostDivision(divisionName);
        e.preventDefault();
        $('#dialogDivs #frmAddDiv').data('bootstrapValidator').resetForm(true);
    });
});

//validation for add/edit program dialog:
var checkNewProgram = true;
$(document).ready(function () {
    $('#frmProgram').bootstrapValidator({
        //live: 'disabled',
        container: 'tooltip',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        excluded: [':disabled'],
        fields: {
            membershipName: {
                validators: {
                    notEmpty: {
                        //message: 'The first name is required and cannot be empty'
                    }
                }
            },
            cost: {
                validators: {
                    notEmpty: {
                        //message: 'The first name is required and cannot be empty'
                    },
                    numeric: {
                        //message: 'Please enter a valid hexadecimal number'
                    },
                    greaterThan: {
                        value: 0
                    }
                }
            },
            lenProg: {
                validators: {
                    notEmpty: {
                        //message: 'The first name is required and cannot be empty'
                    },
                    digits: {
                        //message: 'Please enter a valid hexadecimal number'
                    },
                    greaterThan: {
                        value: 1
                    }
                }
            },
            totalVisit: {
                validators: {
                    notEmpty: {
                        //message: 'The first name is required and cannot be empty'
                    },
                    digits: {
                        //message: 'Please enter a valid hexadecimal number'
                    },
                    greaterThan: {
                        value: 2
                    }
                }
            },
            startfixed: {
                validators: {
                    notEmpty: {
                        //message: 'The first name is required and cannot be empty'
                    },
                    date: {
                        format: dateFormatValidation,
                        //message: 'The birthday is not valid'
                    }
                }
            },
            endFixed: {
                validators: {
                    notEmpty: {
                        //message: 'The first name is required and cannot be empty'
                    },
                    date: {
                        format: dateFormatValidation,
                        //message: 'The birthday is not valid'
                    }
                }
            },
            startTime: {
                validators: {
                    regexp: {
                        regexp: /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                        message: 'Please enter a valid time between 00:00 and 23:59'
                    }
                }
            },
            endTime: {
                validators: {
                    regexp: {
                        regexp: /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                        message: 'Please enter a valid time between 00:00 and 23:59'
                    }
                }
            },
            progValidDays: {
                validators: {
                    digits: {
                        //message: 'Please enter a valid hexadecimal number'
                    }
                }
            },
            progCapacity: {
                validators: {
                    digits: {
                        //message: 'Please enter a valid hexadecimal number'
                    }
                }
            },
            packageCount: {
                validators: {
                    digits: {
                        //message: 'Please enter a valid hexadecimal number'
                    }
                }
            },
        }
    })
         .on('success.form.bv', function (e) {
             e.preventDefault();
             if (checkNewProgram == true) {
                 addNewProgram();
             }
             else {
                 updateProgram();
                 checkNewProgram = true;
             }
             resetProgramTab();
             $("#tabsMem").tabs("option", "active", 1);
         });
});

// validation of member info tab in member dialog:
$(document).ready(function () {
    $('#frmMember').bootstrapValidator({
        //live: 'disabled',
        container: 'tooltip',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        excluded: [':disabled'],
        fields: {
            firstName: {
                validators: {
                    notEmpty: {
                        //message: 'The first name is required and cannot be empty'
                    }
                }
            },
            name: {
                validators: {
                    notEmpty: {
                        //message: 'The last name is required and cannot be empty'
                    }
                }
            },
            email: {
                validators: {
                    emailAddress: {
                        //message: 'The input is not a valid email address'
                    }
                }
            },
            phone: {
                validators: {
                    notEmpty: {
                        //message: 'The input is not a valid email address'
                    },
                    digits: {}
                }
            },
            birthDate: {
                validators: {
                    date: {
                        format: dateFormatValidation,
                        //message: 'The birthday is not valid'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        saveMember(memID);
        //$(this).bootstrapValidator('defaultSubmit');
    });
});

// validation of add/edit membership in member dialog:
$(document).ready(function () {
    $('#frmMembership').bootstrapValidator({
        //live: 'disabled',
        container: 'tooltip',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        excluded: [':disabled'],
        fields: {
            basis2: {
                validators: {
                    notEmpty: {
                        //message: 'The first name is required and cannot be empty'
                    }
                }
            },
            startfixed2: {
                validators: {
                    notEmpty: {
                        //message: 'The last name is required and cannot be empty'
                    },
                    date: {
                        format: dateFormatValidation,
                        //message: 'The birthday is not valid'
                    }
                }
            },
            totalVisit11: {
                validators: {
                    digits: {
                        //message: 'Please enter a valid hexadecimal number'
                    },
                    greaterThan: {
                        value: 0
                    }
                }
            },
            numVisits: {
                validators: {
                    digits: {
                        //message: 'Please enter a valid hexadecimal number'
                    },
                    greaterThan: {
                        value: -1
                    }
                }
            },
            startTimeOneVisit: {
                validators: {
                    regexp: {
                        regexp: /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                        message: 'Please enter a valid time between 00:00 and 23:59'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        postMembership(memID);
    });
});

// validation for add/edit staff management dialog:
var checkNewStaff = true;
$(document).ready(function () {
    $('#frmStaff').bootstrapValidator({
        //live: 'disabled',
        container: 'tooltip',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        excluded: [':disabled'],
        fields: {
            staffName: {
                validators: {
                    notEmpty: {
                        //message: 'The first name is required and cannot be empty'
                    }
                }
            },
            userName: {
                validators: {
                    notEmpty: {
                        //message: 'The last name is required and cannot be empty'
                    },
                    emailAddress: {
                        //message: 'The input is not a valid email address'
                    }
                }
            },
            userPass: {
                validators: {
                    notEmpty: {
                        //message: 'The first name is required and cannot be empty'
                    },
                    stringLength: {
                        min: 6,
                        max: 30
                        //message: 'The full name must be less than 50 characters'
                    }
                }
            },
            userPassCon: {
                validators: {
                    notEmpty: {
                        //message: 'The first name is required and cannot be empty'
                    },
                    identical: {
                        field: 'userPass',
                        //message: 'The password and its confirm are not the same'
                    }
                }
            },
            roleStaff: {
                validators: {
                    notEmpty: {
                        //message: 'The first name is required and cannot be empty'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        if (checkNewStaff == true) {
            addNewUserStaff();
        }
        else {
            updateUserStaff();
            checkNewStaff = true;
        }
        //$(this).bootstrapValidator('defaultSubmit');
    });
});

//validation for add/edit items in extras dialog:
var checkNewItem = true;
$(document).ready(function () {
    $('#frmItem').bootstrapValidator({
        //live: 'disabled',
        container: 'tooltip',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        excluded: [':disabled'],
        fields: {
            itemName: {
                validators: {
                    notEmpty: {
                        //message: 'The first name is required and cannot be empty'
                    }
                }
            },
            itemPrice: {
                validators: {
                    notEmpty: {
                        //message: 'The first name is required and cannot be empty'
                    },
                    numeric: {
                        //message: 'Please enter a valid hexadecimal number'
                    },
                    greaterThan: {
                        value: 0
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        if (checkNewItem == true) {
            addNewItem();
        }
        else {
            updateItem();
            checkNewItem = true;
        }
        resetItemTab();
        $("#tabsItems").tabs("enable", 1).tabs("option", "active", 1);
    });
});

//validation for notifications in setting dialog:
$(document).ready(function () {
    $('#frmSettingNotif').bootstrapValidator({
        //live: 'disabled',
        container: 'tooltip',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        excluded: [':disabled'],
        fields: {
            setNotifSubsDays: {
                validators: {
                    notEmpty: {
                        //message: 'The first name is required and cannot be empty'
                    },
                    digits: {
                        //message: 'Please enter a valid hexadecimal number'
                    },
                    greaterThan: {
                        value: 1
                    }
                }
            },
            setNotifSubsVisits: {
                validators: {
                    notEmpty: {
                        //message: 'The first name is required and cannot be empty'
                    },
                    digits: {
                        //message: 'Please enter a valid hexadecimal number'
                    },
                    greaterThan: {
                        value: 1
                    }
                }
            },
            setNotifSubsDays: {
                validators: {
                    notEmpty: {
                        //message: 'The first name is required and cannot be empty'
                    },
                    digits: {
                        //message: 'Please enter a valid hexadecimal number'
                    },
                    greaterThan: {
                        value: 1
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        userAlertDays = $('#setNotifSubsDays').val();
        userAlertVisits = $('#setNotifSubsVisits').val();
        userAlertPayments = $('#setNotifPayDays').val();
        setNotification(userAlertDays, userAlertVisits, userAlertPayments);
        GetAllInvoices();
    });
});

//validation for notifications in account member dialog:
$(document).ready(function () {
    $('#frmAccountMem').bootstrapValidator({
        //live: 'disabled',
        container: 'tooltip',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        excluded: [':disabled'],
        fields: {
            accEmailMem: {
                validators: {
                    notEmpty: {
                        //message: 'The password is required and cannot be empty'
                    },
                    emailAddress: {
                        //message: 'The input is not a valid email address'
                    }
                }
            },
            accPassMem: {
                validators: {
                    notEmpty: {
                        //message: 'The password is required and cannot be empty'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        //message: 'The username must be more than 6 and less than 30 characters long'
                    }
                }
            },
            accPassConfMem: {
                validators: {
                    notEmpty: {
                        //message: 'The confirm password is required and cannot be empty'
                    },
                    identical: {
                        field: 'accPassMem',
                        //message: 'The password and its confirm are not the same'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        saveMemberAccount(memID);
    });
});

//validation for add working hours and logo in setting dialog:
$(document).ready(function () {
    $('#frmSettingDefults').bootstrapValidator({
        container: 'tooltip',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        excluded: [':disabled'],
        fields: {
            startWork2: {
                validators: {
                    regexp: {
                        regexp: /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                        message: 'Please enter a valid time between 00:00 and 23:59'
                    }
                }
            },
            endWork2: {
                validators: {
                    regexp: {
                        regexp: /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                        message: 'Please enter a valid time between 00:00 and 23:59'
                    }
                }
            }
        }
    })
        .on('success.form.bv', function (e) {
            e.preventDefault();
            // save logo
            var clearBinaryLogo;
            if ($('#image-preview3').css('background-image').indexOf('/Images/logo.png') != -1) {
                clearBinaryLogo = null;
            }
            else {
                var logoURL = $("#image-preview3").css("background-image");
                var startBinaryImg = logoURL.lastIndexOf('base64,') + 7;
                clearBinaryLogo = logoURL.slice(startBinaryImg, -2);
            }

            if ($('#image-preview3').css('background-image').indexOf('Images_Company') == -1) {
                saveLogoCompany(clearBinaryLogo);
            }
            // save hours
            saveWorkingHours($('#startWork2').val(), $('#endWork2').val());
        });
});

/*---------- meta data validations -----------*/
function metaDataValidation(dateFormatValidation) {
    //validation for add new division:
    $('#dialogMetaData #frmAddDiv').bootstrapValidator({
        //live: 'disabled',
        container: 'tooltip',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        excluded: [':disabled'],
        fields: {
            newDiv: {
                validators: {
                    notEmpty: {
                        //message: 'The password is required and cannot be empty'
                    },
                    stringLength: {
                        min: 0,
                        max: 20,
                        //message: 'The username must be more than 6 and less than 30 characters long'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        var divisionName = $('#dialogMetaData #newDiv').val();
        PostDivision(divisionName);
        e.preventDefault();
        $('#dialogMetaData #frmAddDiv').data('bootstrapValidator').resetForm(true);
        var bootstrapValidator = $('#dialogMetaData #frmProgram').data('bootstrapValidator');
        bootstrapValidator.enableFieldValidators('division', false);
    });

    //validation for add new programme:
    $('#dialogMetaData #frmProgram').bootstrapValidator({
        container: 'tooltip',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        excluded: [':disabled'],
        fields: {
            membershipName: {
                validators: {
                    notEmpty: {
                        //message: 'The first name is required and cannot be empty'
                    }
                }
            },
            division: {
                validators: {
                    notEmpty: {
                        //message: 'The first name is required and cannot be empty'
                    }
                }
            },
            cost: {
                validators: {
                    notEmpty: {
                        //message: 'The first name is required and cannot be empty'
                    },
                    numeric: {
                        //message: 'Please enter a valid hexadecimal number'
                    },
                    greaterThan: {
                        value: 0
                    }
                }
            },
            lenProg: {
                validators: {
                    notEmpty: {
                        //message: 'The first name is required and cannot be empty'
                    },
                    digits: {
                        //message: 'Please enter a valid hexadecimal number'
                    },
                    greaterThan: {
                        value: 1
                    }
                }
            },
            totalVisit: {
                validators: {
                    notEmpty: {
                        //message: 'The first name is required and cannot be empty'
                    },
                    digits: {
                        //message: 'Please enter a valid hexadecimal number'
                    },
                    greaterThan: {
                        value: 2
                    }
                }
            },
            startfixed: {
                validators: {
                    notEmpty: {
                        //message: 'The first name is required and cannot be empty'
                    },
                    date: {
                        format: dateFormatValidation,
                        //message: 'The birthday is not valid'
                    }
                }
            },
            endFixed: {
                validators: {
                    notEmpty: {
                        //message: 'The first name is required and cannot be empty'
                    },
                    date: {
                        format: dateFormatValidation,
                        //message: 'The birthday is not valid'
                    }
                }
            },
            startTime: {
                validators: {
                    regexp: {
                        regexp: /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                        message: 'Please enter a valid time between 00:00 and 23:59'
                    }
                }
            },
            endTime: {
                validators: {
                    regexp: {
                        regexp: /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                        message: 'Please enter a valid time between 00:00 and 23:59'
                    }
                }
            },
            progValidDays: {
                validators: {
                    digits: {
                        //message: 'Please enter a valid hexadecimal number'
                    }
                }
            },
            progCapacity: {
                validators: {
                    digits: {
                        //message: 'Please enter a valid hexadecimal number'
                    }
                }
            }
        }
    })
        .on('success.form.bv', function (e) {
            e.preventDefault();
            addFirstProgram();
            saveWorkingHours($('#startWork').val(), $('#endWork').val());
            $("#dialogMetaData button[class~=btn-danger]").show();
            $('#dialogMetaData #frmProgram').data('bootstrapValidator').resetForm(true);
            $('#dialogMetaData #frmAddDiv').data('bootstrapValidator').resetForm(true);
            var bootstrapValidator = $('#dialogMetaData #frmProgram').data('bootstrapValidator');
            bootstrapValidator.enableFieldValidators('division', true);
            $('#dialogMetaData #progFee').val('0.00');
            $('#dialogMetaData #nBasis').val('1');
            $('#dialogMetaData #totalVisit').val('2');
            $('#dialogMetaData #noteProg').val('');
        });


    //validation for add working hours in metadata dialog:
    $('#dialogMetaData #frmHours').bootstrapValidator({
        container: 'tooltip',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        excluded: [':disabled'],
        fields: {
            startWork: {
                validators: {
                    regexp: {
                        regexp: /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                        message: 'Please enter a valid time between 00:00 and 23:59'
                    }
                }
            },
            endWork: {
                validators: {
                    regexp: {
                        regexp: /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
                        message: 'Please enter a valid time between 00:00 and 23:59'
                    }
                }
            }
        }
    })
}


