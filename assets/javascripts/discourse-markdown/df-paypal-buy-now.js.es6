function textPostProcess(content, state, ruler) {
	var buttons = state.md.options.discourse.dfPayPalButtons;
	var originalContent = content;
	buttons.forEach(function(button) {
		var from = '[' + button.id + ']';
		if (-1 !== content.indexOf(from)) {
			content = content.replace(from, '<div class="df-paypal-button ' + button.id + '"></div>');
		}
	});
	debugger;
	if (content === originalContent) {
		var token = new state.Token('text', '', 0);
		token.content = content;
		var result = [];
		result.push(content);
		return result;
	}
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
	/*helper.registerPlugin(md => {
		const ruler = md.core.textPostProcess.ruler;
		const replacer = (content, state) => textPostProcess(content, state, ruler);
		md.core.ruler.push('df-paypal-buy-now', state =>
			md.options.discourse.helpers.textReplace(state, replacer, true)
		);
	}); */
}