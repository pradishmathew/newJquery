var albumscroller = { albscroll: function (typ) {  } }

jQuery.extend(albumscroller, {

    scrollprev: function () {

        var curr = $('li.myclass');

        if (curr.prev('li.myclassRemove').is("li.myclassRemove:first-child")) {
            $(".nextImage").css("display", "block");
            $(".prevImage").css("display", "none");
        }
        else {
            $(".nextImage").css("display", "block");
            $(".prevImage").css("display", "block");
        }

        curr.stop();
        curr.animate({ "left": -500 }, '0.25')
                        .queue(function () {
                            curr.prev('li.myclassRemove').removeClass("myclassRemove").addClass("myclass").css("left", 500).animate({ "left": 30 }, { duration: '0.25', queue: false });
                            curr.removeClass("myclass").addClass("myclassRemove").css("left", 30);
                        });

    },

    scrollnext: function () {
        var curr = $('li.myclass');
        if (curr.next('li.myclassRemove').is("li.myclassRemove:last-child")) {
            $(".nextImage").css("display", "none");
            $(".prevImage").css("display", "block");
        }
        else {
            $(".nextImage").css("display", "block");
            $(".prevImage").css("display", "block");
        }

        curr.stop();
        curr.animate({ "left": 500 }, '0.25')
                        .queue(function () {
                            curr.next('li.myclassRemove').removeClass("myclassRemove").addClass("myclass").css("left", -500).animate({ "left": 30 }, { duration: '0.25', queue: false });
                            curr.removeClass("myclass").addClass("myclassRemove").css("left", 30);
                        });
    },

    startup: function (id) {        
        $('.myImageScroller ul').css("display", "none");
        $(id).css("display", "inline-block");
        $(id + " li:first").removeClass("myclass").addClass("myclassRemove");
        $('li.myclass').removeClass("myclass").addClass("myclassRemove");               // remove any lists that have been displayed before
        $(id + " li:first").addClass("myclass").removeClass("myclassRemove");
        var curr = $('li.myclass');


        if (curr.is("li:last-child")) {
            $(".nextImage").css("display", "none");
            $(".prevImage").css("display", "block");
        }
        else
            if (curr.is("li:first-child")) {
                $(".nextImage").css("display", "block");
                $(".prevImage").css("display", "none");
            }
            else {
                $(".nextImage").css("display", "block");
                $(".prevImage").css("display", "block");
            }

        createDialogBox(".myImageScroller", true);
        //$(listName).css("left", 30);
    }


});