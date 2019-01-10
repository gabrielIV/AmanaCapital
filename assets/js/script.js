if (
  !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  // some code..
  try {
    $("main").onepage_scroll({
      sectionContainer: ".section", // sectionContainer accepts any kind of selector in case you don't want to use section
      easing: "ease", // Easing options accepts  CSS3 easing animation such "ease", "linear", "ease-in",
      // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
      animationTime: 1000, // AnimationTime let you define how long each section takes to animate
      pagination: true, // You can either show or hide the pagination. Toggle true for show, false for hide.
      updateURL: false, // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
      beforeMove: function(index) {}, // This option accepts a callback function. The function will be called before the page moves.
      afterMove: function(index) {
        $(".current-page-number").html("0" + index);
      }, // This option accepts a callback function. The function will be called after the page moves.
      loop: false, // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
      keyboard: true, // You can activate the keyboard controls
      responsiveFallback: false, // You can fallback to normal page scroll by defining the width of the browser in which
      // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
      // the browser's width is less than 600, the fallback will kick in.
      direction: "vertical",
      beforeMove: function(index) {
        // console.log(index)
        var l = $(".section").length;
        // $(".max-page-number").html("0" + l)

        var t = TweenLite.to(".scrollbar-after", 1, {
          scaleY: index / l,
          transformOrigin: "0% 100%"
        });
      }
    });
  } catch (error) {}
}

$(".next-slide").click(function() {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    $("html, body").animate(
      { scrollTop: $(".follow-get-started").offset().top - 70 },
      1000,
      "swing"
    );
    // $(".follow-get-started").offset().top
  } else {
    $("main").moveDown();
  }
});

$(document).ready(function() {
  $(".navlink").each(function(num, val) {
    var v = $(val).html();
    $(val).append("<span class='nav-after px-3'>" + v + "</span>");
  });
  addNavBar();
  $("body").prepend('<div class="curtain"></div>');

  var l = $(".section").length;
  $(".max-page-number").html("0" + l);
});

function addNavBar() {
  $.ajax({
    url: "nav1.html",
    method: "get",
    cache: false,
    success: function(html) {
      // console.log(html)
      var nav = $(html).find("nav");
      var navMobile = $(html).find("nav-mobile");
      var panel = $(html).find(".menu-panel");
      $("body").prepend(panel);
      $("nav").html(nav);
      $("nav-mobile").replaceWith(
        "<nav class='nav-bar container px-3 nav-mobile'>" +
          $(navMobile).html() +
          "</nav>"
      );
      console.log(navMobile);
    }
  });
}

$(document).ready(function() {
  var l = $(".section").length;
  var t = TweenLite.set(".scrollbar-after", {
    scaleY: 1 / l,
    transformOrigin: "0% 100%"
  });
});

var tl = null;
var humbuger_el;

$(".hambuger").click(function() {
  if (tl == null) {
    tl = new TimelineMax();
    tl.set(".menu-panel", { yPercent: 100 })
      .from(".menu-panel", 1, {
        opacity: 0,
        percentX: 50,
        ease: Power4.easeInOut
      })
      .from(
        ".nav-links-after",
        1,
        { scaleY: 0, transformOrigin: "0% 0%", ease: Power4.easeInOut },
        "-=0.5"
      )
      .staggerFrom(".navlink", 0.5, { opacity: 0, x: 100 }, 0.1, "-=0.8")
      .from(".menu-panel .background-logo", 1, { opacity: 0 }, "-=0.4");
    tl.pause(0);
    tl.eventCallback("onComplete", function() {});
  }

  if ($(this).hasClass("active")) {
    tl.reverse(0);
    setTimeout(function() {
      $(humbuger_el).removeClass("active");
      $(".menu-panel .hambuger").removeClass("active");
    }, 500);
  } else {
    humbuger_el = this;
    setTimeout(function() {
      $(humbuger_el).addClass("active");
      $(".menu-panel .hambuger").addClass("active");
    }, 200);
    tl.restart();
  }
});

$(".navlink").each(function(num, val) {
  $(val).append('<b class="nav-after px-3">' + $(val).html() + "</b>");
});

$(".curtain").addClass("hidden");
$("main").addClass("scaled");

setTimeout(function() {
  var tl = new TimelineLite();

  tl.from(".text", 1, { drawSVG: 0 }).from("#cc", 10, { drawSVG: 0 });

  tl.timeScale(1);
}, 1000);

// $(window).scroll(function() {
//   if ($(window).scrollTop() >= 70) {
//     console.log("ok");
//     $(".nav-mobile").addClass("shadow");
//   } else {
//     $(".nav-mobile").removeClass("shadow");
//   }
// });

if (typeof team) {
  TeamData = [];
  var tls = [];
  var ct = 0;
  $(".partner-card").each(function(num, val) {
    var val = $(val).parent();
    var name = $(val)
      .find("h5")
      .text()
      .trim();

    $(val).attr("data-target", ".pn-" + ct);
    ct++;
    $(val).addClass("open-panel-right");

    if (tls.indexOf(name) < 0) {
      var img = $(val)
        .find("img")
        .attr("src");
      tls.push(name);
      var position = $(val)
        .find("span")
        .text();
      var desc = $(val)
        .find(".member-description")
        .text()
        .trim();
      TeamData.push({ img: img, name: name, position: position, desc: desc });
    }
  });
  var count = 0;
  TeamData.map(function(d) {
    $("body").append(`<div class="team-pane bg-white shadow pn-${count++}">
    <a href="#" class="position-absolute pane-clear p-3">
        <i class="fas fa-times text-dark p-c"></i>
    </a>
    <div class="w-100 d-flex justify-content-center mt-5 mb-3">
      <div class="card partner-card rounded shadow overflow-hidden my-10">
          <img src="${d.img}" class="team-profile-pic w-100 h-100" alt="">
        </div>
      </div>

        <div class="p-3">
        <div class="text-center pane-name">

          <b>${d.name}</b>
        </div>

        <div class="pane-position my-3 text-center">${d.position}</div>
        <div class="pane-description px-3">
        ${d.desc}
        </div>
      </div>
    
   
  </div>`);
  });
  var tlt;
  $(document).on("click", ".open-panel-right", function() {
    var target = $(this).attr("data-target");
    $("main").css("transition", "none");
    console.log(target);
    tlt = new TimelineMax();
    tlt
      .set(target, { opacity: 1 })
      .set(".team-curtain", { pointerEvents: "all" })
      .to(target, 1, { xPercent: -100, ease: Power4.easeInOut })
      .to(
        "main",
        1,
        {
          scale: 0.9,
          xPercent: -15,
          ease: Power1.easeInOut
        },
        "-=1"
      )
      .to(".team-curtain", 0.5, { opacity: 1 }, 0);
  });

  $(document).on("click", ".pane-clear", function() {
    tlt.reverse(0);
  });
}

$(document).on("change", "#team_category", function() {
  // alert("ok");
  var team_category = $(this).val();
  $(".team").fadeOut(500);
  setTimeout(function() {
    $("." + team_category).fadeIn(500);
  }, 700);
});

var mySwiper = new Swiper(".swiper-container", {
  speed: 1000,
  spaceBetween: 100,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  pagination: {
    el: ".swiper-pagination",
    type: "bullets"
  },
  keyboard: {
    enabled: true,
    onlyInViewport: false
  }
});
