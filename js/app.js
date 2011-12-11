var List = {
    populate: function(){
        var data = localStorage.getItem('sexy-todo') || '';
        $('#todo-list').html(data);
    },

    save: function(){
        localStorage.setItem('sexy-todo', $('#todo-list').html());
    },

    clear: function(){
        localStorage.removeItem('sexy-todo');
    }
};

$(function(){
    var duration = 300;

    List.populate();

    $('input').keyup(function(e){
        var $input = $(this);

        // only execute the script when hitting [return] and make sure the input isn't blank
        if(e.keyCode != 13 || $input.val() == '')
            return;

        // insert the input value in a list item (positioned exactly over the input), then empty the input
        $input.after('<li class="moving-item">'+ $input.val() +'<span class="delete">+<span></li>').val('');
        
        var $list = $('#todo-list').css('visibility', 'visible');
        var liHeight = $('.moving-item').outerHeight();
        var origPaddingTop = parseInt($list.css('padding-top'));
        var distance = $list.position().top + parseInt($list.css('margin-top')) + origPaddingTop;
        
        $list.animate({
           paddingTop: origPaddingTop + liHeight
        }, duration);

        $('.moving-item').animate({
            top: distance
        }, duration, function(){
            $listItem = $(this);

            $(this).prependTo($list).removeClass('moving-item');
            $list.css('padding-top', origPaddingTop);

            List.save();
        });
    });

    $('#todo-list').delegate('.delete', 'click', function(){
       $(this).parent('li').slideUp(function(){
           $(this).remove();
           List.save();
       });
    });

    $('#clear-list').click(function(e){
        e.preventDefault();
        List.clear();
        List.populate();
    });
});