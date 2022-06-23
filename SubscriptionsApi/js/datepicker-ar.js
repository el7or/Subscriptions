jQuery(function ($) {
    $.datepicker.regional['ar'] = {
        closeText: 'إغلاق',
        prevText: '&#x3c;السابق',
        nextText: 'التالي&#x3e;',
        currentText: 'اليوم',
        monthNames: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو',
		'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
        monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        dayNames: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
        dayNamesShort: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
        dayNamesMin: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
        weekHeader: 'أسبوع',
        dateFormat: 'dd/mm/yy',
        firstDay: 6,
        isRTL: true,
        showMonthAfterYear: false,
        yearSuffix: ''
    };    
});