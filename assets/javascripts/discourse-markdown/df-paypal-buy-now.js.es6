import {registerOption} from 'pretty-text/pretty-text';
let myHelper;
registerOption((siteSettings, opts) => {
	// 2016-07-24
	// Название фичи должно совпадать с именем файла.
	// https://github.com/discourse/discourse/blob/a9207dafa/app/assets/javascripts/pretty-text/engines/discourse-markdown.js.es6#L66
	opts.features['df-paypal-buy-now'] = true;
	var valueS = siteSettings['«PayPal_Buy_Now»_Button_Code'];
	/** @type {Object[]} */
	var items;
	try {items = JSON.parse(valueS);}
	catch(ignore) {items = [];}
	myHelper.applyFeature('df-paypal-buy-now', {setup: function() {}});
	items.forEach(function(item) {
		myHelper.inlineReplace('[' + item.id + ']', function() {
			return ['div', {'class': 'df-paypal-button ' + item.id}];
		});
	});
	window.BetterMarkdown.Markdown.buildInlinePatterns(myHelper._dialect.inline);
});
//noinspection FunctionWithInconsistentReturnsJS
export function setup(helper) {
	myHelper = helper;
	helper.whiteList({custom(tag, name, value) {
		return 'div' === tag && 'class' == name && 0 === value.indexOf('df-');
	}});
}