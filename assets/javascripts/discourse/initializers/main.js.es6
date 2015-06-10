import { decorateCooked } from 'discourse/lib/plugin-api';
let _codesA;
export default {name: 'paypal-buy-now', after: 'inject-objects', initialize: function (container) {
	if (Discourse.SiteSettings['«PayPal_Buy_Now»_Enabled']) {
		decorateCooked(container, function($post) {
			const codes = Discourse.SiteSettings['«PayPal_Buy_Now»_Button_Code'];
			_codesA = _codesA || codes.split("\n");
			if (_codesA.length) {
				$.each(_codesA, function(index, code) {
					$('.df-paypal-button-' + (index + 1)).html(code);
				});
			}
		});
	}
}};