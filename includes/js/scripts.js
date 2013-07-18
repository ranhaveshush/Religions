var _width = 1000,
    _height = 700,
    _scrollWidth = 18;

var _prayerTimeDelta = 5;

function layout() {
    var pages = $('[id^="page-"]');
    for (var i=1; i <= pages.length; ++i) {
        $('#page-'+i).css({
            width: _width+"px",
            height: _height+"px",
            top: (_height*i)+"px",
            display: "block"
        });
    }
}

function clock() {
	var now = new Date();
	var day = now.getDay() + 1;
	var hours = now.getHours();
	var minutes = now.getMinutes();
	var seconds = now.getSeconds();

	day = (day < 10 ? '0' : '') + day;
	hours = (hours < 10 ? '0' : '') + hours;
	minutes = (minutes < 10 ? '0' : '') + minutes;
	seconds = (seconds < 10 ? '0' : '') + seconds;

	var nowStr = day + " : " + hours + " : " + minutes + " : " + seconds;

	$('#clock span:first-child').text(nowStr);

	setTimeout('clock()', 995);
}

function arrowDownAnimation() {
	$('#arrow-down').fadeToggle(2000);
	setTimeout('arrowDownAnimation()', 2000);
}

function logoAnimation() {
	var logo = $("#logo");
	logo.removeClass();
	logo.addClass("base");

    var now = new Date();
    var nowHours = now.getHours();
    var nowMinutes = now.getMinutes();

    for (var i=0; i < religions.length; ++i) {
        var religion = religions[i];
        var religionName = religion.name;
        var religionPrayers = religion.prayers;

        for (var j=0; j < religionPrayers.length; ++j) {
            var prayer = religionPrayers[j];
            var prayerStartTime = prayer.start_time;
            var time = prayerStartTime.split(":");
            var prayerHours = parseInt(time[0]);
            var prayerMinutes = parseInt(time[1]);

            if (nowHours == prayerHours && ((prayerMinutes <= nowMinutes) && (nowMinutes <= (prayerMinutes+_prayerTimeDelta)))) {
            	logo.addClass(religionName);
                break;
            }
        }
    }

    setTimeout('logoAnimation()', 60000);
}

function introLogoAnimation(curr) {
	var introLogo = $("#intro-logo");
	var introLogoClass;
	
	switch (curr) {
		case 0:
			introLogoClass = "intro-islam";
			break;
		case 1:
			introLogoClass = "intro-christianity";

			break;
		case 2:
			introLogoClass = "intro-judaism";
			break;
		case 3:
			introLogoClass = "intro-all-religions";
			break;
		case 4:
			introLogoClass = "intro-base";
			introLogo.removeClass();
			introLogo.addClass(introLogoClass);
			introLogo.fadeIn(1000, function() {
				introLogo.fadeOut(1000, function() {
                    layout();
					$('#logo').fadeIn(2000, function() {
						logoAnimation();
					});
					$('#clock').fadeIn(2000);
					arrowDownAnimation();
					$('#intro').css({display: "none"});
				});
			});
			return;
	}
	
	introLogo.removeClass();
	introLogo.addClass(introLogoClass);
	introLogo.fadeIn(1000, function() {
        introLogo.fadeOut(1000, function() {
			introLogoAnimation(++curr);
		});
	});
}

function introAnimation(width, height) {
	$('#triangle-1').animate({right: -width}, 3700);
	$('#triangle-2').animate({top: -height}, 4300);
	$('#triangle-3').animate({top: -height}, 4000);
	$('#triangle-4').animate({top: -height}, 2000);
	$('#triangle-5').animate({right: -width}, 3800);
	$('#triangle-6').animate({right: -width}, 2000);
	$('#triangle-7').animate({left: -width}, 1700);
	$('#triangle-8').animate({bottom: -height}, 3500);
	$('#triangle-9').animate({top: -height}, 3500);
	$('#triangle-10').animate({left: -width}, 2500);

	setTimeout('introLogoAnimation(0)', 3000);
}

$(document).ready(function() {
	_width = window.innerWidth - _scrollWidth;
	_height = window.innerHeight;

	$("#intro").css({
		"width": _width + 18,
		"height": _height
	});

	$("#content").css({
		"width": _width,
		"height": _height
	});

	var introLogo = $("#intro-logo");
	introLogo.css({
		"top": _height/2 - (introLogo.height()/2),
		"left": _width/2 - (introLogo.width()/2)
	});

    var logo = $("#logo");
	logo.css({
		"top": _height/2 - (logo.height()/2),
		"left": _width/2 - (logo.width()/2)
	});
	
    var arrowDown = $("#arrow-down");
    arrowDown.css({
		"left": _width/2 - arrowDown.width()/2
	});

	clock();
	introAnimation(screen.width, screen.height);

    $(window).scroll(function() {
        var scrollTop = $(this).scrollTop();
        console.log(scrollTop);

        // first page
        if (_height <= scrollTop && scrollTop < _height*2) {

        // second page
        } else if (_height*2 <= scrollTop && scrollTop < _height*3) {

        // third page
        } else if (_height*3 <= scrollTop) {

        }
    });
});