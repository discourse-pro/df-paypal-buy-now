# name: df-paypal-buy-now
# about: You can insert PayPal «Buy Now» button to your forum posts.
# version: 1.1.0
# authors: Dmitry Fedyuk
# url: https://discourse.pro/t/29
register_asset 'javascripts/dialect.js', :server_side
register_asset 'javascripts/autogrow.js'
register_asset 'stylesheets/main.scss'
require 'site_setting_extension'
SiteSettingExtension.module_eval do
	alias_method :core__types, :types
	def types
		result = @types
		if not result
			result = core__types
			result[:paypal_buttons] = result.length + 1;
		end
		return result
	end
end