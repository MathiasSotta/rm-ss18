//entry point on DOM ready
jQuery(document).ready(function ($) {
    var editItem;
    var uniqueItemID = $('ul.todo-list > li').length; //Checkbox ID initial setzen
    var $templateLI = ("<li>\n" +
        "            <input type=\"checkbox\"/>\n" +
        "            <label>\n" +
        "                <input type=\"text\" value=\"\" readonly/>\n" +
        "            </label>\n" +
        "            <div class=\"arrow-btn\"></div>\n" +
        "            <ul class=\"item-menu-bar\">\n" +
        "                <li class=\"edit-btn\">Editieren</li>\n" +
        "                <li class=\"duplicate-btn\">Duplizieren</li>\n" +
        "                <li class=\"remove-btn\">Löschen</li>\n" +
        "            </ul>\n" +
        "        </li>");

    var $templateUL = ("<ul class=\"menu-list todo-list\"></ul>\n");

    /*Checkbox Functionality*/

    $('ul.todo-list li :checkbox').each(function (i) {
        setCheckboxAttributes($(this), i);
        styleCheckbox($(this));
    });

    function styleCheckbox($checkbox) {
        $checkbox.addClass('styledCB');
        $checkbox.next('label').prepend('<span></span>');
    }

    /*-------------------TO-DO Item Interactivity / Event Handler-----------------------------*/
    /*Edit Arrow Button -> Open Menu Bar*/
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

    /*set Edit Mode Icon Functionality*/

    /*Remove Function*/
    $('ul.todo-list li .remove-btn').on('click', function () {
        removeItem($(this).closest('ul.todo-list > li'));
    });


    /*Edit Function*/
    $('ul.todo-list li .edit-btn').on('click', function () {
        setEditModeItem($(this).closest('ul.todo-list > li'));
    });


    /*Duplicate Function*/
    $('ul.todo-list li .duplicate-btn').on('click', function () {
        var $newItem = duplicateItem($(this).closest('ul.todo-list > li'));
        /*Item Editier Modus beenden vor Erzeugen*/
        if (editItem) {
            unEditModeItem();
        }

        fadeInItem($newItem);
    });

    /*----------------Footer Button Handler---------------*/
    $('.clear-done-btn').on('click', clearDone);
    $('.create-btn').on('click', createNewItem);
    $('.new-list-btn').on('click', onNewListClick);


    /*--------------Handler and Custom Methods----------------*/

    function setCheckboxAttributes($checkbox, id) {
        $checkbox.attr('id', 'c' + id);
        $checkbox.next('label').attr('for', 'c' + id);
    }


    function duplicateItem($item) {
        $clone = $item.clone(true); //Clone erstellen, data und events einbeziehen
        setCheckboxAttributes($clone.find('input[type="checkbox"]'), uniqueItemID++); //checkbox attribute neu setzen
                                                                                      //für korrekte checkbox-label Zugehörigkeit
        $clone.insertAfter($item); //neues Element nach Original einfügen
        toggleMenuItemBarOpen($item); //Menü des original Elements schließen
        return $clone;            //neues Element zurückgeben
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

    function setEditModeItem(_editItem) {
        editItem = _editItem;
        editItem.addClass('edit-mode');

        var tf = editItem.find('input[type="text"]');

        tf.removeAttr('readonly');
        tf.focus();

        tf.on('blur', unEditModeItem);
    }

    /*jQuery Plugin für Event 'enterPress': Handler für ENTER Taste drücken*/
    $.fn.pressEnter = function (callback) {
        return this.each(function () {  //Loop über alle Elemente der jQuery-Selektion
            $(this).on('enterPress', callback); //Callback-Funktion für unser Custom Event registrieren
            $(this).keypress(function (e) {  //keypress-Handler hinzufügen
                if (e.keyCode == 13) {   //ist gedrückte Taste ENTER ?
                    $(this).trigger("enterPress"); //Custom Event "enterPress" wird geworfen
                }
            });
        });
    };

    //add enter event via custom jQuery function to all input fields
    $('ul.todo-list li input[type="text"]').pressEnter(function (event) {
        if (editItem) {               //wird ein Listen-Item editiert?
            if (event.target == editItem.find('input[type="text"]')[0]) {   //entspricht das Event Target dem editierten Item?
                unEditModeItem();                                 //Beenden des Editiermodus
            }
        }
    });

    function unEditModeItem() {
        var tf = editItem.find('input[type="text"]');
        tf.attr('readonly', 'readonly');
        tf.off('blur', unEditModeItem);
        editItem.removeClass('edit-mode');

        if (!tf.val()) {
            editItem.remove();
        }

        editItem = null;
    }

    //bind in capture phase
    function createNewItem(event) {
        //Aufgabenteil a)

        //neues Element einfügen
        $('ul.todo-list').append($templateLI);

        //Checkbox stylen und Attribute setzen
        var $newLastItem = $('ul.todo-list > li').last();
        styleCheckbox($newLastItem.find('input[type="checkbox"]'));
        setCheckboxAttributes($newLastItem.find('input[type="checkbox"]'), uniqueItemID++);

        //Editiermodus für neues Item aktivieren
        setEditModeItem($newLastItem);

        //Event Handler hinzufügen

            /*Edit Arrow Button -> Open Menu Bar*/
            $newLastItem.find('.arrow-btn').on('click', function () {
                onArrowClick($(this).closest('li'));
            });

            /*set Edit Mode Icon Functionality*/

            /*Remove Function*/
            $newLastItem.find('.remove-btn').on('click', function () {
                removeItem($(this).closest('ul.todo-list > li'));
            });

            /*Edit Function*/
            $newLastItem.find('.edit-btn').on('click', function () {
                setEditModeItem($(this).closest('ul.todo-list > li'));
            });

            /*Duplicate Function*/
            $newLastItem.find('.duplicate-btn').on('click', function () {
                var $newItem = duplicateItem($(this).closest('ul.todo-list > li'));
                /*Item Editier Modus beenden vor Erzeugen*/
                if (editItem) {
                    unEditModeItem();
                }

                fadeInItem($newItem);
            });

            //add enter event via custom jQuery function to new input field
            $newLastItem.find('input[type="text"]').pressEnter(function (event) {
                if (editItem) {               //wird ein Listen-Item editiert?
                    if (event.target == editItem.find('input[type="text"]')[0]) {   //entspricht das Event Target dem editierten Item?
                        unEditModeItem();                                 //Beenden des Editiermodus
                    }
                }
            });

        //neues Item einblenden
        fadeInItem($newLastItem);
    }

    function onNewListClick() {
        //Aufgabenteil b)

        //alle list items löschen
        $('ul.todo-list').remove();
        $('ul.footer-list').before($templateUL);

        //Variablen-Werte zurücksetzen
        var i = 0;
        $('ul.menu-list.todo-list li :checkbox').each(function (i) {
            console.log(i);
            setCheckboxAttributes($(this), i);
            styleCheckbox($(this));
        });

        //neues, leeres List Item erstellen
        createNewItem();
    }

    function fadeInItem($item) {
        $item.hide().fadeIn(500);
    }

    function showEditMode() {
        $('ul.todo-list').toggleClass('editable');
    }

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
});