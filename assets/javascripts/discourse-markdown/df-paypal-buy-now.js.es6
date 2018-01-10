function textPostProcess(content, state, ruler) {
	var buttons = state.md.options.discourse.dfPayPalButtons;
	buttons.forEach(function(button) {
		content = content.replace('[' + button.id + ']', '<div class="df-paypal-button ' + button.id + '"></div>');
	});
	return content;
}
//noinspection FunctionWithInconsistentReturnsJS
export function setup(helper) {
	helper.registerOptions((opts, siteSettings) => {
		var valueS = siteSettings['«PayPal_Buy_Now»_Button_Code'];
		/** @type {Object[]} */ var items;
		try {items = JSON.parse(valueS);}
		catch(ignore) {items = [];}
		opts.dfPayPalButtons = items;
	});
	helper.whiteList({custom(tag, name, value) {
		return 'div' === tag && 'class' == name && 0 === value.indexOf('df-');
	}});
	helper.registerPlugin(md => {
		const ruler = md.core.textPostProcess.ruler;
		const replacer = (content, state) => textPostProcess(content, state, ruler);
		md.core.ruler.push('df-paypal-buy-now', state =>
			md.options.discourse.helpers.textReplace(state, replacer, true)
		);
	});
}