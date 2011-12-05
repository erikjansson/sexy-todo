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
        
        var $list = $('#todo-list').css('visibility', 'visible');

        $input
            .after('<li class="moving-item">'+ $input.val() +'</li>')
            .val('');

        $list.animate({
           paddingTop: 41 
        }, duration)
        .find('li').animate({
            position: 'relative',
            top: 31
        }, duration);

        $('.moving-item').animate({
            top: 120
        }, duration, function(){
            $listItem = $(this);

            $(this).prependTo($list).removeClass('moving-item');
            $list.css('padding-top', 10);

            List.save();
        });
    });
});