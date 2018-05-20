jQuery(document).ready(function ($) {

    /*Checkbox Functionality*/
    var editItem;
    $('ul.todo-list li :checkbox').each(function (i) {
        setCheckboxAttributes($(this), i);
    });

    function setCheckboxAttributes($checkbox, id) {
        $checkbox.attr('id', 'c' + id);
        $checkbox.next('label').attr('for', 'c' + id);
    }

    /*Clear Button*/
    $('.clear-done-btn').on('click', clearDone);

    function clearDone() {
        $('ul.todo-list li input:checked').each(function () {
            removeItem($(this).closest('li'));
        });
    }

    function removeItem($targItem) {
        $targItem.animate({opacity: 0.0, paddingLeft: '+=100'}, 500, function () {
            this.remove();
        });
    }

    /*Item Menu Bar*/
    $('ul.todo-list li .arrow-btn').on('click', function () {
        onArrowClick($(this).closest('li'));
    });

    function onArrowClick($clickItem) {
        $('ul.todo-list > li').each(function (i) {
            if ($(this).is($clickItem) || $(this).hasClass('edit-open')) {
                toggleMenuItemBarOpen($(this));
            }
        });
    }


    function toggleMenuItemBarOpen($listItem) {
        var $targ = $listItem.find('.arrow-btn');

        var startAngle = $listItem.hasClass('edit-open') ? 180 : 0;
        var targHeight = $listItem.hasClass('edit-open') ? 45 : 70;

        $listItem.animate({height: targHeight}, {duration: 300});

        $({angle: startAngle}).animate({angle: startAngle + 180}, {
            duration: 300,
            step: function (curDeg) {
                $targ.css('transform', 'rotate(' + curDeg + 'deg)');
            }
        });

        $listItem.toggleClass('edit-open');
    }

    /*Remove Function*/
    $('ul.todo-list li .remove-btn').on('click', function () {
        removeItem($(this).closest('ul.todo-list > li'));
    });

    /*Edit Function*/
    $('ul.todo-list li .edit-btn').on('click', function () {
        setEditModeItem($(this).closest('ul.todo-list > li'));
    });

    function setEditModeItem(_editItem) {
        editItem = _editItem;
        editItem.addClass('edit-mode');

        var tf = editItem.find('input[type="text"]');

        tf.removeAttr('readonly');
        tf.focus();

        tf.on('blur', unEditModeItem);
    }

 function unEditModeItem() {
        editItem.removeClass('edit-mode');
        var tf = editItem.find('input[type="text"]');
        tf.attr('readonly', 'readonly');
        tf.off('blur', unEditModeItem);

     //Listen-Element entfernen, falls das Label leer ist
     if (!tf.val()) {
         editItem.remove();
     }


        editItem = null;
    }

});
