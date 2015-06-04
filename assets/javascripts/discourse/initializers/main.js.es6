import { decorateCooked } from 'discourse/lib/plugin-api';
//import loadScript from 'discourse/lib/load-script';
export default {name: 'paypal-buy-now', after: 'inject-objects', initialize: function (container) {
	if (Discourse.SiteSettings['«PayPal_Buy_Now»_Enabled']) {
		decorateCooked(container, function($post) {
			$('.df-paypal-button').html(Discourse.SiteSettings['«PayPal_Buy_Now»_Button_Code']);
		});
	}
}};