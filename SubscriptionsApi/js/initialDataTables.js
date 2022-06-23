var langDataTable = "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/English.json";
var exportDataTable = 'Save as ';
var PrintDataTable = 'Print';
var btnNotifSettingDataTable = 'Notification Settings';

//data table for notification grid:
function reloadDataTableEnding() {
    $('#endSubs').dataTable().fnDestroy();
    $('#endSubs').DataTable({
        pageLength: 5,
        pagingType: "full_numbers",
        "language": {
            "url": langDataTable
            //"url": "i18n/Arabic.json"
        },
        dom: 'Bfrtip',
        buttons: [
            {
                text: btnNotifSettingDataTable,
                className: 'btn-md',
                action: function ( e, dt, node, config ) {
                    dialogSettings();
                }
            },
            {
                extend: 'collection',
                text: exportDataTable,
                className: 'btn-md',
                buttons: [
                    {
                        extend: 'excel',
                        text: 'Excel',
                        className: 'btn-success btn-sm',
                        exportOptions: {
                            columns: [3, 4]
                        },
                        footer: true
                    },
                    {
                        extend: 'csv',
                        text: 'CSV',
                        className: 'btn-warning btn-sm',
                        exportOptions: {
                            columns: [3, 4]
                        },
                        footer: true
                    },
                    {
                        extend: 'pdf',
                        text: 'PDF',
                        className: 'btn-danger btn-sm',
                        exportOptions: {
                            columns: [3, 4]
                        },
                        footer: true
                    }
                ]
            },
            {
                extend: 'print',
                footer: true,
                text: PrintDataTable,
                //title: "My title",
                className: 'btn-md',
                exportOptions: {
                    columns: [3, 4]
                }
            }
        ],
        initComplete: function () {
            $('.buttons-collection').html(exportDataTable + ' <span class="glyphicon glyphicon-save"></span>');
            $('.buttons-print').html(PrintDataTable + ' <span class="glyphicon glyphicon-print"></span>');
        },
        searching: false,
        ordering: false
        //select: true,
        //select: 'single'
        //paging: false,
        //scrollY: 400,
        //"autoWidth": false,
        //items: 'cells',
        //info: false,
    });
    LoadSpinner.stop(firstSpinner);
    LoadSpinner.stop(setLanguageSpinner);
}

//data table for report payments:
function reloadDataTablePayment() {
    $('#tblPayment').dataTable().fnDestroy();
    $('#tblPayment').DataTable({
        pageLength: 10,
        pagingType: "full_numbers",
        "language": {
            "url": langDataTable
            //"url": "i18n/Arabic.json"
        },
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'collection',
                text: exportDataTable,
                className: 'btn-primary btn-sm',
                buttons: [
                    {
                        extend: 'excel',
                        text: 'Excel',
                        className: 'btn-success btn-xs',
                        exportOptions: {
                            columns: ':visible'
                        },
                        footer: true
                    },
                    {
                        extend: 'csv',
                        text: 'CSV',
                        className: 'btn-warning btn-xs',
                        exportOptions: {
                            columns: ':visible'
                        },
                        footer: true
                    },
                    {
                        extend: 'pdf',
                        text: 'PDF',
                        className: 'btn-danger btn-xs',
                        exportOptions: {
                            columns: ':visible'
                        },
                        footer: true
                    }
                ]
            },
            {
                extend: 'print',
                footer: true,
                text: PrintDataTable,
                //title: "My title",
                className: 'btn-info btn-sm',
                exportOptions: {
                    columns: ':visible'
                }
            }
        ],
        initComplete: function () {
            $('.buttons-collection').html(exportDataTable + ' <span class="glyphicon glyphicon-save"></span>');
            $('.buttons-print').html(PrintDataTable + ' <span class="glyphicon glyphicon-print"></span>');
        },
        searching: false,
        ordering: true,
        "order": [[2, 'asc']],
        //select: true,
        //select: 'single'
        //paging: false,
        //scrollY: 400,
        //"autoWidth": false,
        //items: 'cells',
        //info: false,
        "footerCallback": function (row, data, start, end, display) {
            var api = this.api(), data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ?
                    i : 0;
            };

            // Total over all Prices
            totalPrice = api
                .column(5)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            // Total over all Payments
            totalPay = api
                .column(6)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            // Total over all Dues
            totalDue = api
                .column(7)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);


            // Update footer
            $(api.column(5).footer()).html(
                '$' + totalPrice
                //'$' + pageTotal + ' ( $' + total + ' total)'
            );

            $(api.column(6).footer()).html(
                '$' + totalPay
            );

            $(api.column(7).footer()).html(
                '$' + totalDue
            );
        }
    });
}

//data table for member history:
function reloadDataTableMemHistory() {
    $('#memHistory').dataTable().fnDestroy();
    $('#memHistory').DataTable({
        pageLength: 10,
        pagingType: "full_numbers",
        "language": {
            "url": langDataTable
            //"url": "i18n/Arabic.json"
        },
        dom: 'Bfrtip',
        buttons: [
            //{
            //    extend: 'collection',
            //    text: exportDataTable,
            //    className: 'btn-primary btn-sm',
            //    buttons: [
            //        {
            //            extend: 'excel',
            //            text: 'Excel',
            //            className: 'btn-success btn-xs',
            //            exportOptions: {
            //                columns: ':visible'
            //            }
            //        },
            //        {
            //            extend: 'csv',
            //            text: 'CSV',
            //            className: 'btn-warning btn-xs',
            //            exportOptions: {
            //                columns: ':visible'
            //            }
            //        },
            //        {
            //            extend: 'pdf',
            //            text: 'PDF',
            //            className: 'btn-danger btn-xs',
            //            exportOptions: {
            //                columns: ':visible'
            //            }
            //        }
            //    ]
            //},
            //{
            //    extend: 'print',
            //    text: PrintDataTable,
            //    //title: "My title",
            //    className: 'btn-info btn-sm',
            //    exportOptions: {
            //        columns: ':visible'
            //    }
            //}
        ],
        initComplete: function () {
            //$('.buttons-collection').html(exportDataTable + ' <span class="glyphicon glyphicon-save"></span>');
            //$('.buttons-print').html(PrintDataTable + ' <span class="glyphicon glyphicon-print"></span>');
        },
        searching: false,
        ordering: false,
        //select: true,
        //select: 'single'
        //paging: false,
        //scrollY: 400,
        //"autoWidth": false,
        //items: 'cells',
        //info: false,
        "footerCallback": function (row, data, start, end, display) {
            var api = this.api(), data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ?
                    i : 0;
            };            
        }
    });
    $("#memHistory tbody tr td:nth-last-child(3)").each(function () {
        var dueTxt = $(this).text();
        var dueNum = Number(dueTxt.replace(/[^0-9\.]+/g, ""));
        if (dueNum > 0) {
            $(this).html('<span class="redDue" data-toggle="tooltip" data-placement="top" title="' + goInvoice + '">$' + dueNum + '</span>');
        }
    });
    if ($(window).width() <= 600) {
        $('#memHistory').DataTable().page.len(5).draw();
    }
}

//data table for member calendar:
function reloadDataTableMemCalendar() {
    $('#eventMembers').dataTable().fnDestroy();
    $('#eventMembers').DataTable({
        pageLength: 10,
        pagingType: "full_numbers",
        "language": {
            "url": langDataTable
            //"url": "i18n/Arabic.json"
        },
        dom: 'Bfrtip',
        buttons: [
        ],
        initComplete: function () {
            //$('.buttons-collection').html(exportDataTable + ' <span class="glyphicon glyphicon-save"></span>');
            //$('.buttons-print').html(PrintDataTable + ' <span class="glyphicon glyphicon-print"></span>');
        },
        searching: true,
        "columnDefs": [
        { "targets": [0,1,3,4,5], "searchable": false }
        ],
        ordering: true,
        //select: true,
        //select: 'single'
        //paging: false,
        //scrollY: 400,
        //"autoWidth": false,
        //items: 'cells',
        //info: false,
        "footerCallback": function (row, data, start, end, display) {
            var api = this.api(), data;
        }
    });
}
