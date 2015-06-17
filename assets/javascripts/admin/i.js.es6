import SiteSetting from 'admin/components/site-setting';
export default {name: 'paypal-buy-now-admin', after: 'inject-objects', initialize: function() {
	SiteSetting.reopen({
		partialType: function() {
			var type = this.get('setting.type');
			return 'paypal_buttons' === type ? type : this._super();
		}.property('setting.type')
	});
}};
