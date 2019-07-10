/*!
 * text-overflow: ellipsis;
 */
(function(factory) {
    "use strict";

    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory);
    } else {
        factory(jQuery);
    }
})(function($) {
    "use strict";

    var namespace = "ellipsis",
        span = '<span style="white-space: nowrap;">',
        defaults = {
            lines: "auto",
            ellipClass: "ellip",
            responsive: false
        };

    /**
     * Ellipsis()
     * --------------------------------------------------------------------------
     * @param {Node} el
     * @param {Object} opts
     */
    function Ellipsis(el, opts) {
        var base = this,
            currLine = 0,
            lines = [],
            setStartEllipAt,
            startEllipAt,
            resizeTimer,
            currOffset,
            lineHeight,
            contHeight,
            words;

        base.$cont = $(el);
        base.opts = $.extend({}, defaults, opts);

        function create() {
            base.text = base.$cont.text();
            base.opts.ellipLineClass = base.opts.ellipClass + "-line";

            base.$el = $('<span class="' + base.opts.ellipClass + '" />');
            base.$el.text(base.text);

            base.$cont.empty().append(base.$el);

            init();
        }

        /**
         * init()
         */
        function init() {
            if (typeof base.opts.lines === "number" && base.opts.lines < 2) {
                base.$el.addClass(base.opts.ellipLineClass);
                return;
            }

            contHeight = base.$cont.height();

            if (
                base.opts.lines === "auto" &&
                base.$el.prop("scrollHeight") <= contHeight
            ) {
                return;
            }

            if (!setStartEllipAt) {
                return;
            }

            words = $.trim(base.text).split(/\s+/);

            base.$el.html(span + words.join("</span> " + span) + "</span>");

            base.$el.find("span").each(setStartEllipAt);

            if (startEllipAt != null) {
                updateText(startEllipAt);
            }
        }

        function updateText(nth) {
            words[nth] =
                '<span class="' + base.opts.ellipLineClass + '">' + words[nth];
            words.push("</span>");
            base.$el.html(words.join(" "));
        }

        if (base.opts.lines === "auto") {
            var setStartEllipByHeight = function(i, word) {
                var $word = $(word),
                    top = $word.position().top;

                lineHeight = lineHeight || $word.height();

                if (top === currOffset) {
                    lines[currLine].push($word);
                } else {
                    currOffset = top;
                    currLine += 1;
                    lines[currLine] = [$word];
                }

                if (top + lineHeight > contHeight) {
                    startEllipAt = i - lines[currLine - 1].length;
                    return false;
                }
            };

            setStartEllipAt = setStartEllipByHeight;
        }

        if (typeof base.opts.lines === "number" && base.opts.lines > 1) {
            var setStartEllipByLine = function(i, word) {
                var $word = $(word),
                    top = $word.position().top;

                if (top !== currOffset) {
                    currOffset = top;
                    currLine += 1;
                }

                if (currLine === base.opts.lines) {
                    startEllipAt = i;
                    return false;
                }
            };

            setStartEllipAt = setStartEllipByLine;
        }

        if (base.opts.responsive) {
            var resize = function() {
                lines = [];
                currLine = 0;
                currOffset = null;
                startEllipAt = null;
                base.$el.html(base.text);

                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(init, 100);
            };

            $(window).on("resize." + namespace, resize);
        }

        create();
    }

    $.fn[namespace] = function(opts) {
        return this.each(function() {
            try {
                $(this).data(namespace, new Ellipsis(this, opts));
            } catch (err) {
                if (window.console) {
                    console.error(namespace + ": " + err);
                }
            }
        });
    };
});
