;(function ($, window, document, undefined) {

	'use strict';

	// Create the defaults once
	var pluginName = 'jqueryPopup',
			defaults = {
				html: '',
				css: '',
				height: '',
				width: '',
				delay: 1, // delay in milliseconds
				page: 1, // which page view do we show on
				timer: false, // auto start/stop
				timerStart: null, // date/time to start
				timerStop: null, // date/time to stop
				ltc: 'formSubmitted', // long term cookie name
				stc: 'formDismissed', // short term cookie name
				triggers: {
					'.x-submit': 'submit',
					'.x-closer': 'dismiss',
					'.ipopbk': function(e) {
						e.preventDefault();
						$('body').css({'background-color': 'red'});
						setTimeout(e.data.dismiss, 5000, e);
					},
					'.x-nothanks': 'gotoLink'
				}
			};

	function Plugin(element, options) {
		this.element = element;
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	$.extend(Plugin.prototype, {
		init: function () {
			if(this.settings.html === '' || this.settings.css === '') {
				console.log('Need a path to both html and css');
				return;
			}
			var interrupterActive = ('https:' === document.location.protocol) ? false : true;
			if(interrupterActive && !this.getShortTermCookie() && !this.getLongTermCookie()) {
				this.setStyles();
				setTimeout(function () {
					this.setHtml();
				}, this.settings.delay);
			}
		},
		setShortTermCookie: function() {
			$.cookie(this.settings.stc, 'true', { expires: 1, path: '/' });
		},
		getShortTermCookie: function() {
			return $.cookie(this.settings.stc);
		},
		setLongTermCookie: function() {
			$.cookie(this.settings.ltc, 'true', { expires: 365, path: '/' });
		},
		getLongTermCookie: function() {
			return $.cookie(this.settings.ltc);
		},
		dismiss: function(e) {
			e.preventDefault();
			e.data.setShortTermCookie();
			$('.ipopbk, .ipop').fadeOut('fast', function () {
				$('.ipopbk, .ipop').remove();
			});
		},
		submit: function(e) {
			e.preventDefault();
			if($('.ipop form:invalid').length > 0) {
				$('.ipop form input:invalid').addClass('invalid');
				$('.ipop form input:invalid').first().get(0).focus();
				console.log('invalid');
			} else {
				e.data.setLongTermCookie();
				console.log('submitting');
			}
			//$('.ipop form').get(0).submit();
		},
		gotoLink: function(e) {
			e.preventDefault();
			e.data.setShortTermCookie();
			location.href = this.href;
		},
		setStyles: function() {
			$('<link/>', {
				rel: 'stylesheet',
				type: 'text/css',
				href: this.settings.css
			}).appendTo('head');
		},
		setHtml: function() {
			var self = this;
			$.get(this.settings.html).then(function(html) {
				var bg = $('<div />', {class: 'ipopbk'}),
						pop = $('<div />', {class: 'ipop'})
								.css({'max-height': self.settings.height, 'max-width': self.settings.width})
								.append(html)
								.append($('<a />', {class: 'x-closer', html: '&#215;'}));
				$('body').append(bg).append(pop);
				$(pop).fadeIn('slow');
			}).then(function() {
				$.each(self.settings.triggers, function(k, v) {
					if(typeof v === 'function') {
						$(k).on('click', self, v);
					}
					if(typeof self[v] === 'function') {
						$(k).on('click', self, self[v]);
					}
					console.log(typeof v);
				});
			});
		}
	});

	$.fn[pluginName] = function (options) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
			}
		});
	};

})(jQuery, window, document);

/* jshint ignore:start */
!function (e) { e(jQuery) } (function (e) { function n(e) { return u.raw ? e : encodeURIComponent(e) } function o(e) { return u.raw ? e : decodeURIComponent(e) } function i(e) { return n(u.json ? JSON.stringify(e) : String(e)) } function r(e) { 0 === e.indexOf('"') && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\")); try { return e = decodeURIComponent(e.replace(c, " ")), u.json ? JSON.parse(e) : e } catch (n) { } } function t(n, o) { var i = u.raw ? n : r(n); return e.isFunction(o) ? o(i) : i } var c = /\+/g, u = e.cookie = function (r, c, a) { if (arguments.length > 1 && !e.isFunction(c)) { if (a = e.extend({}, u.defaults, a), "number" == typeof a.expires) { var s = a.expires, p = a.expires = new Date; p.setTime(+p + 864e5 * s) } return document.cookie = [n(r), "=", i(c), a.expires ? "; expires=" + a.expires.toUTCString() : "", a.path ? "; path=" + a.path : "", a.domain ? "; domain=" + a.domain : "", a.secure ? "; secure" : ""].join("") } for (var d = r ? void 0 : {}, f = document.cookie ? document.cookie.split("; ") : [], m = 0, l = f.length; l > m; m++) { var x = f[m].split("="), g = o(x.shift()), k = x.join("="); if (r && r === g) { d = t(k, c); break } r || void 0 === (k = t(k)) || (d[g] = k) } return d }; u.defaults = {}, e.removeCookie = function (n, o) { return void 0 === e.cookie(n) ? !1 : (e.cookie(n, "", e.extend({}, o, { expires: -1 })), !e.cookie(n)) } });
/* jshint ignore:end */
