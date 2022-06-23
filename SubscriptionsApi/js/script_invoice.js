// Shivving (IE8 is not supported, but at least it won't look as awful):

(function (document) {
    var
	head = document.head = document.getElementsByTagName('head')[0] || document.documentElement,
	elements = 'article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output picture progress section summary time video x'.split(' '),
	elementsLength = elements.length,
	elementsIndex = 0,
	element;

    while (elementsIndex < elementsLength) {
        element = document.createElement(elements[++elementsIndex]);
    }

    element.innerHTML = 'x<style>' +
		'article,aside,details,figcaption,figure,footer,header,hgroup,nav,section{display:block}' +
		'audio[controls],canvas,video{display:inline-block}' +
		'[hidden],audio{display:none}' +
		'mark{background:#FF0;color:#000}' +
	'</style>';

    return head.insertBefore(element.lastChild, head.firstChild);
})(document);

/* ========================================================================== */

// Prototyping:

(function (window, ElementPrototype, ArrayPrototype, polyfill) {
    function NodeList() { [polyfill] }
    NodeList.prototype.length = ArrayPrototype.length;

    ElementPrototype.matchesSelector = ElementPrototype.matchesSelector ||
	ElementPrototype.mozMatchesSelector ||
	ElementPrototype.msMatchesSelector ||
	ElementPrototype.oMatchesSelector ||
	ElementPrototype.webkitMatchesSelector ||
	function matchesSelector(selector) {
	    return ArrayPrototype.indexOf.call(this.parentNode.querySelectorAll(selector), this) > -1;
	};

    ElementPrototype.ancestorQuerySelectorAll = ElementPrototype.ancestorQuerySelectorAll ||
	ElementPrototype.mozAncestorQuerySelectorAll ||
	ElementPrototype.msAncestorQuerySelectorAll ||
	ElementPrototype.oAncestorQuerySelectorAll ||
	ElementPrototype.webkitAncestorQuerySelectorAll ||
	function ancestorQuerySelectorAll(selector) {
	    for (var cite = this, newNodeList = new NodeList; cite = cite.parentElement;) {
	        if (cite.matchesSelector(selector)) ArrayPrototype.push.call(newNodeList, cite);
	    }

	    return newNodeList;
	};

    ElementPrototype.ancestorQuerySelector = ElementPrototype.ancestorQuerySelector ||
	ElementPrototype.mozAncestorQuerySelector ||
	ElementPrototype.msAncestorQuerySelector ||
	ElementPrototype.oAncestorQuerySelector ||
	ElementPrototype.webkitAncestorQuerySelector ||
	function ancestorQuerySelector(selector) {
	    return this.ancestorQuerySelectorAll(selector)[0] || null;
	};
})(this, Element.prototype, Array.prototype);

// Helper Functions:
function generateTableRow() {
    var emptyColumn = document.createElement('tr');

    emptyColumn.innerHTML = '<th hidden="hidden" scope="row">ID</th><th hidden="hidden" scope="row">item</th>' +
        '<td style="background-color: white;"><a class="cut" style="' + styleCut + '">&#10060;</a><input type="text" placeholder="' + itemchoose + '" class="itemList" /><span></span></td>' +
		'<td><span data-prefix="">$</span><span>0.00</span></td>' +
        '<td><span data-qty=""></span><span contenteditable="true" class="tabable">1</span></td>' +
        '<td><span data-prefix="">$</span><span>0.00</span></td>';

    return emptyColumn;
}

function parseFloatHTML(element) {
    return parseFloat(element.innerHTML.replace(/[^\d\.\-]+/g, '')) || 0;
}

function parsePrice(number) {
    return number.toFixed(2).replace(/(\d)(?=(\d\d\d)+([^\d]|$|%))/g, '$1,');
}

function parseFloatQtyHTML(element) {
    return parseFloat(element.innerHTML.replace(/[^\d\.\-]+/g, '')) || 1;
}

function parseQuntity(number) {
    return number.toFixed().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,');
}

/* ========================================================================== */

// Update Number:

function updateNumber(e) {
    var
	activeElement = document.activeElement,
	value = parseFloat(activeElement.innerHTML),
	wasPrice = activeElement.innerHTML == parsePrice(parseFloatHTML(activeElement));

    if (!isNaN(value) && (e.keyCode == 38 || e.keyCode == 40 || e.wheelDeltaY)) {
        e.preventDefault();

        value += e.keyCode == 38 ? 1 : e.keyCode == 40 ? -1 : Math.round(e.wheelDelta * 0.025);
        value = Math.max(value, 0);

        activeElement.innerHTML = wasPrice ? parsePrice(value) : value;
    }

    updateInvoice();
}

/* ========================================================================== */

// Update Invoice:

function updateInvoice() {
    var total = 0;
    var cells, subcells, price, total, discount, tax, grandTotal, a, i;

    // update inventory cells
    // ======================

    for (var a = document.querySelectorAll('table.inventory tbody tr'), i = 0; a[i]; ++i) {
        // get inventory row cells
        cells = a[i].querySelectorAll('span:last-child');

        // set price as cell[1] * cell[2]
        price = parseFloatHTML(cells[1]) * parseQuntity(parseFloatQtyHTML(cells[2]));
        cells[2].innerHTML = parseQuntity(parseFloatQtyHTML(cells[2]));

        // add price to subtotal
        total += price;

        // set row subtotal
        cells[3].innerHTML = price;
    }

    // update balance cells
    // ====================

    // get balance cells
    cells = document.querySelectorAll('table.balance td:last-child span:last-child');

    // set total
    cells[0].innerHTML = total;

    // set discount & tax from percentage
    subcells = document.querySelectorAll('table.balance td:nth-last-child(2) span:last-child');
    if (subcells[0] === document.activeElement || subcells[0].innerHTML != '0.00') {
        discount = subcells[0].innerHTML;
        cells[1].innerHTML = discount * total / 100
    }
    if (cells[1] === document.activeElement) {
        subcells[0].innerHTML = '0.00'
    }

    var totalBeforeTax = total - parseFloatHTML(cells[1]);

    if (subcells[1] === document.activeElement || subcells[1].innerHTML != '0.00') {
        tax = subcells[1].innerHTML;
        cells[2].innerHTML = tax * totalBeforeTax / 100
    }
    if (cells[2] === document.activeElement) {
        subcells[1].innerHTML = '0.00'
    }


    // set Grand total
    grandTotal = totalBeforeTax + parseFloatHTML(cells[2]);
    cells[3].innerHTML = grandTotal;

    // add prev payments to recently paid
    var prevPayments = parseFloat(document.querySelector('#invcPrevPaid').innerHTML);
    var maxPaid = grandTotal - prevPayments;
    if (parseFloatHTML(cells[4]) > maxPaid) {
        swal({
            title: alertWarningTitle,
            text: alertWarningTextPaid + maxPaid,
            confirmButtonText: alertBtnText,
            type: "warning"
        });
        cells[4].innerHTML = maxPaid;
    }
    var allPayments = prevPayments + parseFloatHTML(cells[4]);

    // set balance due and amount due    
    document.querySelector('#invDue').innerHTML = document.querySelector('table.meta tr:last-child td:last-child span:last-child').innerHTML = parsePrice(grandTotal - allPayments);
    
    // update prefix formatting
    // ========================

    var prefix = '$';
    for (a = document.querySelectorAll('[data-prefix]'), i = 0; a[i]; ++i) a[i].innerHTML = prefix;

    // update percent formatting
    // ========================

    var percent = '%';
    for (a = document.querySelectorAll('[data-percent]'), i = 0; a[i]; ++i) a[i].innerHTML = percent;

    // update price & percent & quantity formatting
    // ============================================

    for (a = document.querySelectorAll('span[data-prefix] + span'), i = 0; a[i]; ++i) if (document.activeElement != a[i]) a[i].innerHTML = parsePrice(parseFloatHTML(a[i]));

    for (a = document.querySelectorAll('span[data-percent] + span'), i = 0; a[i]; ++i) if (document.activeElement != a[i]) a[i].innerHTML = parsePrice(parseFloatHTML(a[i]));

    $("#tabsMember-4 table.inventory td:has(select)").css("padding", "0");

}

/* ========================================================================== */

// On Content Load:

function onContentLoad() {
    updateInvoice();

    var
	input = document.querySelector('input'),
	image = document.querySelector('img');

    function onClick(e) {
        var element = e.target.querySelector('[contenteditable]'), row;
        element && e.target != document.documentElement && e.target != document.body && element.focus();

        if (e.target.matchesSelector('.add')) {
            if ($('table.inventory tbody').find('input').length) {
                swal({
                    title: alertWarningTitle,
                    text: alertWarningTextItems,
                    confirmButtonText: alertBtnText,
                    type: "warning"
                });
            }
            else {
                document.querySelector('table.inventory tbody').appendChild(generateTableRow());
                $('input.itemList:last').focus();
            }
        }
        else if (e.target.className == 'cut') {
            row = e.target.ancestorQuerySelector('tr');

            row.parentNode.removeChild(row);
        }

        updateInvoice();
    }

    function onEnterCancel(e) {
        e.preventDefault();

        image.classList.add('hover');
    }

    function onLeaveCancel(e) {
        e.preventDefault();

        image.classList.remove('hover');
    }

    function onFileInput(e) {
        image.classList.remove('hover');

        var
		reader = new FileReader(),
		files = e.dataTransfer ? e.dataTransfer.files : e.target.files,
		i = 0;

        reader.onload = onFileLoad;

        while (files[i]) reader.readAsDataURL(files[i++]);
    }

    function onFileLoad(e) {
        var data = e.target.result;

        image.src = data;
    }

    if (window.addEventListener) {
        document.addEventListener('click', onClick);

        document.addEventListener('mousewheel', updateNumber);
        document.addEventListener('keydown', updateNumber);

        document.addEventListener('keydown', updateInvoice);
        document.addEventListener('keyup', updateInvoice);

        input.addEventListener('focus', onEnterCancel);
        input.addEventListener('mouseover', onEnterCancel);
        input.addEventListener('dragover', onEnterCancel);
        input.addEventListener('dragenter', onEnterCancel);

        input.addEventListener('blur', onLeaveCancel);
        input.addEventListener('dragleave', onLeaveCancel);
        input.addEventListener('mouseout', onLeaveCancel);

        input.addEventListener('drop', onFileInput);
        input.addEventListener('change', onFileInput);
    }
}

window.addEventListener && document.addEventListener('DOMContentLoaded', onContentLoad);

/* ========================================================================== */

// to select all text on click on editable:
function selectAllText(id) {
    var el = document.getElementById(id);
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
};

/* ========================================================================== */

// goto next tabindex when press enter:
$('.tabable').keyup(
    function (e) {
        if (e.keyCode == 13) {
            var x = parseFloat($(this).attr('tabindex'));
            x++;
            $('[tabindex="' + x + '"]').focus();
            updateInvoice();
        }
    }
);

/* ========================================================================== */

// default next payment date:
$('#invDue').on('DOMSubtreeModified',function(){
    if (document.querySelector('#invDue').innerHTML == '0.00') {
        $('table.balance tr:last-child td:last-child, table.balance input').css('background-color', '#f5f5f5');
        $('#invNextPaid').hide().val('');
    }
    else {
        var todayDate = new Date();
        todayDate.setDate(todayDate.getDate() + 1);
        $('table.balance tr:last-child td:last-child, table.balance input').css('background-color', '#fff');
        $('#invNextPaid').show().val(fDate(todayDate));
    }
});

$('#invNextPaid').keyup(function () {
    if ($(this).val() == '') {
        swal({
            title: alertWarningTitle,
            text: alertWarningTextMems,
            confirmButtonText: alertBtnText,
            type: "warning"
        });
        var todayDate = new Date();
        todayDate.setDate(todayDate.getDate() + 1);
        $(this).val((todayDate.getFullYear()) + '-' + (todayDate.getMonth() + 1) + '-' + (todayDate.getDate()));
    }
});