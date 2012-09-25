
var myAlbumsCreator = { albumNull: function(typ) {  } }

jQuery.extend(myAlbumsCreator, {

    deleteAlbum: function () {

        var id = $("#ctl00_ContentPlaceHolder1_albumIDHidden").val();
        if (id.length == 0) {
            notificationShow("Error Deleting Album.");
        }

        ajaxStr = "albumGallery.asmx/deleteAlbum";

        $.ajax({ "type": "POST",
            "dataType": 'json',
            "contentType": "application/json; charset=utf-8",
            "url": ajaxStr,
            "data": "{'aid': '" + id + "'}",
            "success": function (msg) {
                switch (msg.d.sError) {

                    case "0":
                    case 0:
                        pRcommonFns.movetopage("myAlbums.aspx");
                        break;
                    case "100":
                    case 100:
                        notificationShow("Error Deleting Album...");
                        break;
                    default:
                        pRcommonFns.errorFunction(msg.d, "ReturnUrl=%2fsecpages%2fmyNetwork.aspx");
                        break;
                }
            }
        });
    },

    deletePicture: function (aid, pid, isLarger) {

        if (aid.length == 0) {
            notificationShow("Error Deleting Picture.");
        }

        if (pid.length == 0) {
            notificationShow("Error Deleting Picture.");
        }

        ajaxStr = "albumGallery.asmx/deletePicture";
        $('#loaderimg' + pid).css('display', 'inline-block');
        $('#loaderimgLarger' + pid).css('display', 'inline-block');

        $.ajax({ "type": "POST",
            "dataType": 'json',
            "contentType": "application/json; charset=utf-8",
            "url": ajaxStr,
            "data": "{'aid':'" + aid + "'," +
                        "'pid':'" + pid + "'}",
            "success": function (msg) {

                switch (msg.d.sError) {
                    case "0":
                    case 0:
                        $("#albumCover" + pid).remove();

                        if (isLarger) {
                            if ($("#albumlist" + pid).is('li:first-child'))
                            { albumscroller.scrollnext(); } else
                            { albumscroller.scrollprev(); }
                            $("#albumlist" + pid).remove();
                        }
                        else
                        { $("#albumlist" + pid).remove(); }
                        break;

                    case "100":
                        $('#loaderimg' + pid).css('display', 'none');
                        $('#loaderimgLarger' + pid).css('display', 'none');
                        notificationShow("Error Deleting Album.");

                        break;

                    default:
                        $('#loaderimg' + pid).css('display', 'none');
                        $('#loaderimgLarger' + pid).css('display', 'none');
                        pRcommonFns.errorFunction(msg.d, "ReturnUrl=%2fsecpages%2fmyNetwork.aspx");
                        break;
                }
            }
        });

    },

    savePictureComment: function (aid, pid, isLarger) {


        if (isLarger) {            
            var comment = $("#ctl00_ContentPlaceHolder1_txtlarger" + pid).val();
            $('#loaderimgLarger' + pid).css('display', 'inline-block');
            $("#ctl00_ContentPlaceHolder1_txt" + pid).val(comment);
        }
        else {
            var comment = $("#ctl00_ContentPlaceHolder1_txt" + pid).val();
            $('#loaderimg' + pid).css('display', 'inline-block');
            $("#ctl00_ContentPlaceHolder1_txtlarger" + pid).val(comment);

        }
        
        ajaxStr = "albumGallery.asmx/changepicturecomment";
        $('#loaderimg' + pid).css('display', 'inline-block');

        $.ajax({ "type": "POST",
            "dataType": 'json',
            "contentType": "application/json; charset=utf-8",
            "url": ajaxStr,
            "data": "{'aid':'" + aid + "'," +
                        "'pid':'" + pid + "'," +
                        "'comment':'" + comment + "'}",
            "success": function (msg) {               
                switch (msg.d.sError) {
                    case "0":
                    case 0:
                        $('#loaderimg' + pid).css('display', 'none');
                        $('#loaderimgLarger' + pid).css('display', 'none');
                        break;

                    case "100":
                        $('#loaderimg' + pid).css('display', 'none');
                        $('#loaderimgLarger' + pid).css('display', 'none');
                        notificationShow("Error updating Album details.");

                        break;

                    default:
                        $('#loaderimg' + pid).css('display', 'none');
                        $('#loaderimgLarger' + pid).css('display', 'none');
                        pRcommonFns.errorFunction(msg.d, "ReturnUrl=%2fsecpages%2fmyNetwork.aspx");
                        break;
                }
            }
        });

    },

    saveAlbumName: function () {

        var AlbumName = $("#ctl00_ContentPlaceHolder1_albumName").val();
        var aid = $("#ctl00_ContentPlaceHolder1_albumIDHidden").val();        
        ajaxStr = "albumGallery.asmx/changeAlbumName";
        $('#albumheaderLoader').css('display', 'inline-block');

        $.ajax({ "type": "POST",
            "dataType": 'json',
            "contentType": "application/json; charset=utf-8",
            "url": ajaxStr,
            "data": "{'aid':'" + aid + "'," +
                        "'AlbumName':'" + AlbumName + "'}",
            "success": function (msg) {                
                switch (msg.d.sError) {
                    case "0":
                    case 0:
                        $('#albumheaderLoader').css('display', 'none');
                        break;

                    case "100":
                        $('#albumheaderLoader').css('display', 'none');
                        notificationShow("Error updating Album details.");
                        break;

                    default:
                        $('#albumheaderLoader').css('display', 'none');
                        pRcommonFns.errorFunction(msg.d, "ReturnUrl=%2fsecpages%2fmyNetwork.aspx");
                        break;
                }

            },
            "error": function (msg) {
                $('#albumheaderLoader').css('display', 'none');
                pRcommonFns.errorFunction(msg.status);
                // alert(msg.status + msg.statusText);
            }
        });

    },

    saveAlbumDate: function () {

        var AlbumDate = $("#ctl00_ContentPlaceHolder1_albumdate").val();
        var aid = $("#ctl00_ContentPlaceHolder1_albumIDHidden").val();
       
        ajaxStr = "albumGallery.asmx/changeAlbumDate";
        $('#albumheaderLoader').css('display', 'inline-block');

        $.ajax({ "type": "POST",
            "dataType": 'json',
            "contentType": "application/json; charset=utf-8",
            "url": ajaxStr,
            "data": "{'aid':'" + aid + "'," +
                        "'AlbumDate':'" + AlbumDate + "'}",
            "success": function (msg) {
                
                switch (msg.d.sError) {
                    case "0":
                    case 0:
                        $('#albumheaderLoader').css('display', 'none');
                        break;

                    case "100":
                        $('#albumheaderLoader').css('display', 'none');
                        notificationShow("Error updating Album details.");
                        break;

                    default:
                        $('#albumheaderLoader').css('display', 'none');
                        pRcommonFns.errorFunction(msg.d, "ReturnUrl=%2fsecpages%2fmyNetwork.aspx");
                        break;
                }

            },
            "error": function (msg) {
                $('#albumheaderLoader').css('display', 'none');
                pRcommonFns.errorFunction(msg.status);
                // alert(msg.status + msg.statusText);
            }
        });


    }
});
