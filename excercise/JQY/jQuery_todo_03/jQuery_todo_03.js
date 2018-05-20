jQuery(document).ready(function ($) {

    /*Checkbox Functionality*/

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

});
