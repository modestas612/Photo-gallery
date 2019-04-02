
var modal = document.getElementById('modal-wrapper');
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// description characters counter
function descriptionCharCountUpdate(str) {
    var lng = str.length;
    document.getElementById("descriptionCharCount").innerHTML = lng + '/255 characters';
}

// name characters counter
function nameCharCountUpdate(str) {
    var lng = str.length;
    document.getElementById("nameCharCount").innerHTML = lng + '/15 characters';
}

// scroll to top button
var scrollToTop = {
    setting: {
        startLine: 100,
        scrollTo: 0,
        scrollDuration: 1e3,
        fadeDuration: [500, 100]
    },
    controlHTML: '<i class="fas fa-angle-up"></i>',
    controlAttrs: {
        offsetX: 30,
        offsetY: 20
    },
    anchorKeyword: "#top",
    state: {
        isVisible: !1,
        shouldVisible: !1
    },
    scrollUp: function() {
        this.cssfixedsupport || this.$control.css({opacity: 0});
        var t = isNaN(this.setting.scrollTo) ? this.setting.scrollTo : parseInt(this.setting.scrollTo);
        t = "string" == typeof t && 1 == $("#" + t).length ? $("#" + t).offset().top : 0, this.$body.animate({scrollTop: t}, this.setting.scrollDuration)
    },
    keepFixed: function() {
        var t = $(window),
            o = t.scrollLeft() + t.width() - this.$control.width() - this.controlAttrs.offsetX,
            s = t.scrollTop() + t.height() - this.$control.height() - this.controlAttrs.offsetY;
        this.$control.css({
            left: o + "px",
            top: s + "px"
        })
    },
    toggleControl: function() {
        var t = $(window).scrollTop();
        this.cssfixedsupport || this.keepFixed(), this.state.shouldVisible = t >= this.setting.startLine ? !0 : !1,
        this.state.shouldVisible && !this.state.isVisible ? (this.$control.stop().animate({opacity: 1},
        this.setting.fadeDuration[0]), this.state.isVisible = !0) : 0 == this.state.shouldVisible &&
        this.state.isVisible && (this.$control.stop().animate({opacity: 0}, this.setting.fadeDuration[1]), this.state.isVisible = !1)
    },
    init: function() {$(document).ready(function(t) {
            var o = scrollToTop,
                s = document.activeElement;
            o.cssfixedsupport = !s || s && "CSS1Compat" == document.compatMode && window.XMLHttpRequest,
            o.$body = t(window.opera ? "CSS1Compat" == document.compatMode ? "html" : "body" : "html,body"),
            o.$control = t('<div id="topControl">' + o.controlHTML + "</div>").css({
                position: o.cssfixedsupport ? "fixed" : "absolute",
                bottom: o.controlAttrs.offsetY,
                right: o.controlAttrs.offsetX,
                opacity: 0,
                cursor: "pointer",
                fontSize: "50px"
            })
            .attr({title: "Scroll to Top"}).click(function() {return o.scrollUp(), !1})
            .appendTo("body"), document.activeElement && !window.XMLHttpRequest && "" != o.$control.text() && o.$control.css({width: o.$control.width()}),
            o.toggleControl(), t('a[href="' + o.anchorKeyword + '"]').click(function() {return o.scrollUp(), !1}),
            t(window).bind("scroll resize", function(t) {o.toggleControl()})
        })
    }
};
scrollToTop.init();