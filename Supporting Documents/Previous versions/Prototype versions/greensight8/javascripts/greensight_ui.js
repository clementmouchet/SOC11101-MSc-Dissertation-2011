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

// LOGIN DROPDOWN MENU BEHAVIOR
$(document).ready(function() {
    $('.login').click(function(e) {
        e.preventDefault();
        $("#logindd").fadeOut();
        $("#login_menu").toggle();
        $(".login").toggleClass("menu-open");
    });

    $("#login_menu").mouseup(function() {
        $("#logindd").fadeOut();
        return false;
    });
    $(document).mouseup(function(e) {
        if ($(e.target).parent("a.login").length == 0) {
            $(".login").removeClass("menu-open");
            $("#login_menu").fadeOut();
        }
    });
});

// SIDEBAR BEHAVIOR
$(document).ready(function() {
    $(function() {
        var offset = $("#left").offset();
        var topPadding = 15;
        $(window).scroll(function() {
            if ($(window).delay(400).scrollTop() > offset.top) {
                $("#left").stop().delay(400).animate({
                 marginTop: $(window).delay(400).scrollTop() - offset.top + topPadding
                },'slow');
				$("#top").fadeIn();
            } else {
                $("#left").stop().delay(400).animate({
                    marginTop: 0
                });
				$("#top").fadeOut();
            };
        });
    });
});

// TOP BUTTON ONLY DISPLAYED WHEN NEEDED
$(document).ready(function($) {
	$('a[href=#top]').click(function(){
		$('html, body').animate({scrollTop:0}, 'slow');
		return false;
	});
});