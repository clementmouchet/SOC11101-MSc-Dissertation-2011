// DROPDOWN MENUS BEHAVIOR
$(document).ready(function() {
    $(function() {
        $('.dropdown').each(function() {
            $(this).parent().eq(0).hover(function() {
                $('.dropdown:eq(0)', this).fadeIn();
            },
            function() {
                $('.dropdown:eq(0)', this).fadeOut();
            });

        });
    });
});

