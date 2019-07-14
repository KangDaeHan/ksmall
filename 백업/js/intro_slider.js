$(window).load(function() {
    $.fn.toggleControl = function(q) {
        var r = q ? "slideDown" : "slideUp";
        return this.each(function() {
            $(this).closest("div.form-group, div.checkbox, div.radio").stop(true, true)[r]({
                duration: 300,
                easing: "linear"
            })
        })
    }
    ;
    $.fn.toggleOption = function(q) {
        $(this).toggle(q).prop({
            disabled: !q
        });
        if (!q && $(this).is(":selected")) {
            $(this).siblings().not($(this)).first().prop({
                selected: true
            })
        }
        return this
    }
    ;
    function d(q) {
        return (q + "").replace(/([A-Za-z])(-)([A-Za-z])/g, function(r, u, t, s) {
            return (u + s.toUpperCase())
        })
    }
    var m = {
        normal: {
            columns: 1,
            rows: 1,
            order: "right",
            shapeDepth: 10
        },
        columns: {
            columns: 6,
            rows: 1,
            order: "right",
            shapeDepth: 10
        },
        rows: {
            columns: 1,
            rows: 5,
            order: "down",
            shapeDepth: 10
        },
        grid: {
            columns: 5,
            rows: 3,
            order: "downRight",
            shapeDepth: 0
        }
    };
    var e = {
        down: "up",
        right: "left",
        downRight: "upLeft",
        spiralIn: "spiralOut",
        zigZagDown: "zigZagUp"
    };
    var b = {
        shuffle: true,
        sideButtonMargin: 40
    };
    function o(r, q) {
        $(this).data("field").html(q.value)
    }
    function i(r, q) {
        var s;
        switch (r) {
        case "columns":
            s = (-1 < $.inArray(q, ["push", "rotate"]) ? "down" : "right");
            break;
        case "rows":
            s = (-1 < $.inArray(q, ["push", "rotate"]) ? "right" : "down");
            break;
        case "grid":
            s = "down";
            break;
        default:
            s = "right"
        }
        a.direction.filter("[value='" + s + "']").parent().click()
    }
    function l() {
        f.each(function(r, q) {
            $(q).slider("value", $(q).data("defaultVal"))
        });
        p[0].reset();
        c.prop("disabled", false);
        a.type.filter("[value='normal']").trigger("change").parent().click();
        $.each(["randomDirection", "autoDepth", "cpanelOrientation", "cpanelOutside", "thumbnails", "navButtons"], function(q, r) {
            a[r].eq(0).trigger("change")
        });
        $(".nav-tabs a:first").tab("show");
        g()
    }
    function g() {
        k.bannerRotator("destroy");
        var r = a.type.filter(":checked").val()
          , q = {
            borderWidth: a.border.filter(":checked").val() || 0,
            backgroundColor: a.border.is(":checked") ? "#333" : "transparent"
        };
        $.each(a, function(t, u) {
            if (u.is("input")) {
                if (u.is("[type=checkbox]")) {
                    q[t] = u.is(":checked")
                } else {
                    if (u.is("[type=radio]")) {
                        q[t] = u.filter(":checked").val()
                    }
                }
            } else {
                if (u.is("select")) {
                    q[t] = u.val()
                }
            }
        });
        f.each(function(u, t) {
            q[$(t).attr("id")] = $(t).slider("value")
        });
        if ("text" === q.thumbnails) {
            q.thumbWidth = 115
        } else {
            if ("image" === q.thumbnails) {
                q.thumbWidth = q.thumbHeight = 44
            }
        }
        if ("image" === q.tooltip) {
            q.tooltipWidth = q.tooltipHeight = 60
        }
        if (q.autoDepth) {
            q.depth = "auto"
        }
        var s = m[r];
        if ("reverse" === q.order) {
            q.order = e[s.order]
        } else {
            if ("normal" === q.order) {
                q.order = s.order
            }
        }
        q.columns = s.columns;
        q.rows = s.rows;
        q.shapeDepth = s.shapeDepth;
        if (q.randomDirection) {
            q.direction = "random"
        }
        k.toggleClass("white", "white" === q.color).bannerRotator($.extend({}, b, q))
    }
    var k = $("#rotator")
      , p = $("form[name='preview-form']")
      , c = p.find(":input")
      , a = {}
      , j = p.find("#depth").data({
        defaultVal: 0,
        field: p.find("#depth-label")
    })
      , n = p.find("#interval").data({
        defaultVal: 100,
        field: p.find("#interval-label")
    })
      , h = p.find("#duration").data({
        defaultVal: 800,
        field: p.find("#duration-label")
    })
      , f = j.add(n).add(h);
    c.each(function(t, s) {
        var r = $(s)
          , q = d(r.attr("name"));
        if (q in a) {
            a[q] = a[q].add(r)
        } else {
            a[q] = r
        }
    });
    f.slider({
        animate: true,
        range: "min",
        slide: o,
        change: o
    });
    j.slider({
        step: 100,
        max: 3000
    });
    n.slider({
        step: 50,
        max: 1000
    });
    h.slider({
        step: 100,
        max: 3000
    });
    a.type.change(function() {
        var r = $(this).val()
          , q = "normal" === r;
        n.toggleControl(!q);
        a.alternate.prop({
            disabled: q || a.randomDirection.is(":checked")
        });
        a.order.find(">option").filter("[value='zigZagDown'], [value='spiralIn']").toggleOption("grid" === r);
        a.effect.find(">option").filter("[value='none'], [value='slide']").toggleOption(q).end().filter("[value='move'], [value='push']").toggleOption(!q).end().filter("[value='rotate']").toggleOption("grid" !== r).end().filter("[value='expand']").toggleOption("grid" === r);
        a.effect.trigger("change")
    });
    a.effect.change(function() {
        var r = $(this).val()
          , q = a.type.filter(":checked").val();
        a.direction.add(a.alternate).toggleControl(/(cover|flip|move|push|rotate|slide)/.test(r));
        a.order.toggleControl("normal" !== q && "random" !== r);
        j.add(a.autoDepth).toggleControl(/(flip|rotate|random)/.test(r));
        h.add(a.easing).toggleControl("none" !== r);
        i(q, r)
    });
    a.randomDirection.change(function() {
        var q = $(this).is(":checked");
        a.direction.prop({
            disabled: q
        }).parent().toggleClass("disabled", q);
        a.alternate.prop({
            disabled: (q || "normal" === a.type.filter(":checked").val())
        })
    });
    a.autoDepth.change(function() {
        j.slider($(this).is(":checked") ? "disable" : "enable")
    });
    a.cpanelOrientation.change(function() {
        var q = ("horizontal" === $(this).filter(":checked").val());
        a.cpanelPosition.find(">option").filter("[value='center top'], [value='center bottom']").toggleOption(q).end().filter("[value='left center'], [value='right center']").toggleOption(!q)
    });
    a.cpanelOutside.change(function() {
        a.cpanelOnHover.toggleControl(!$(this).is(":checked"))
    });
    a.thumbnails.change(function() {
        a.tooltip.toggleControl("none" !== $(this).val())
    });
    a.navButtons.change(function() {
        a.navThumbs.add(a.navButtonsOnHover).toggleControl(-1 < $.inArray($(this).val(), ["large", "outside"]))
    });
    a.thumbnails.add(a.navButtons).add(a.playButton).change(function() {
        var q = ("none" !== a.thumbnails.val() || "small" === a.navButtons.val() || a.playButton.is(":checked"));
        a.cpanelPosition.add(a.cpanelOrientation).add(a.cpanelOutside).add(a.groupButtons).toggleControl(q);
        a.cpanelOnHover.toggleControl(q && !a.cpanelOutside.is(":checked"))
    });
    a.submitButton.on("click", g);
    a.resetButton.on("click", l);
    l();
    if (typeof Modernizr !== "undefined") {
        if (!Modernizr.csstransforms3d || !Modernizr.testAllProps("transformStyle", "preserve-3d")) {
            a.effect.find(">option").filter('[value="flip"],[value="rotate"]').remove()
        }
        if (!Modernizr.cssanimations) {
            a.timer.find(">option").filter('[value="pie"]').remove()
        }
    }
});
