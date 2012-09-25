var lagtime = 5000;
var max = 15;
var display = 9;
var inRotation = true;
var rotator;
/*var n = max;
var j = display;

*/
var ua = $.browser;

var n = display + 1;
var j = 1;


var sliderFunctions = { delTabRow: function(tabName, rowNumber) {
    $(tabName).deleteRow(rowNumber );
}
}

jQuery.extend(sliderFunctions, {

	removeNaddLi:function (cnter) {
	    return function () {
        if (ua.msie) {
            $('#rattle' + cnter).remove().css('display', 'none').css('opacity', 'none').prependTo('#myRattles');
        }
        else
        {
            $('#rattle' + cnter).remove().css('display', 'none').css('opacity', '1').prependTo('#myRattles');
        }
    }
	},
	
	slider:function () {
	    
    $('#rattle' + n).slideDown(1000);
    $('#rattle' + j).slideUp(1000, removeNaddLi(j));
    n++; j++;    
    if (n > max) {
        n = 1;
    }
    if (j > max) {
        j = 1;
    }    
    rotator = setTimeout('slider()', lagtime);	
	},
	
	startSliderApp:function () {
	displayRecs();
    rotator = setTimeout('slider()', lagtime);
    $(".myRattles").hover(function () {
        clearTimeout(rotator);
        inRotation = false;
    },
    function () {
        if (inRotation == false) {
            rotator = setTimeout('slider()', lagtime);
            inRotation = true;
        }
    });
	
	},
	
	displayRecs:function(){
	    for (cnt = 1; cnt <= display; cnt++) {
        $("#rattle" + cnt).css('display', 'block');
    }

	}
	
	createSlider:function (lgTime,  totalRecs,disRecs) {
    
    lagtime = lgTime;
    display = disRecs;
    max = totalRecs;
    displayRecs();
}


});
