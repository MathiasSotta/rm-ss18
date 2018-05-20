jQuery(document).ready(function ($) {

    // set select checkbox functionality on list elements
    $('ul.todo-list li :checkbox').each(function (i) {
        setCheckboxAttributes($(this), i);
    });

    function setCheckboxAttributes($checkbox, id) {
        $checkbox.attr('id', 'c' + id);
        $checkbox.next('label').attr('for', 'c' + id);
    }


    $('.clear-done-btn').on('click', clearDone);

    function clearDone() {
        $('ul.todo-list li input:checked').each(function () {
            //$(this).closest('li').remove();
            removeItem($(this).closest('li'));

            /* Alternative Schreibweise ohne Chaining */
             // var $checkedListItems = $(this).closest('li');
            // $checkedListItems.remove();
        });
    }

    function removeItem($targItem) {
        $targItem.animate({ opacity: 0.0, paddingLeft: '+=100'}, 500,
            function () {
                this.remove();
            });
    }

});
