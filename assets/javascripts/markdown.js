(function() {
	var init = function() {
		var valueS = Discourse.SiteSettings['«PayPal_Buy_Now»_Button_Code'];
		/** @type {Object[]} */
		var items;
		try {
			/** @link http://caniuse.com/#feat=json */
			items = JSON.parse(valueS);
		}
		catch(ignore) {
			// Legacy support.
			/** @type {String[]} */
			var htmlA = valueS && valueS.length ? valueS.split("\n") : [];
			items = [];
			htmlA.forEach(function(html, index) {
				items.push({id: 'paypal-' + (1 + index), html: html});
			});
		}
		items.forEach(function(item) {
			Discourse.Dialect.inlineReplace('[' + item.id + ']', function() {
				return ['div', {'class': 'df-paypal-button ' + item.id}];
			});
		});
		Discourse.Markdown.whiteListTag('div', 'class', /^df-.*$/ );
	};
	// 1) server (cooking mode)
	// 2) client (editing mode)
	Discourse.SiteSettings ? init() : $(init);
})();