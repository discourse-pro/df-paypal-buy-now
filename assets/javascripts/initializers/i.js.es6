import {decorateCooked} from 'discourse/lib/plugin-api';
export default {name: 'df-paypal-buy-now', after: 'inject-objects', initialize: function (c) {
	if (Discourse.SiteSettings['«PayPal_Buy_Now»_Enabled']) {
		decorateCooked(c, onDecorateCooked);
	}
}};
let _buttonsMap;
/**
 * 2015-08-06
 * 1) decorateCooked вызывает своих подписчиков для каждого сообщения отдельно.
 * 2) $post содержит не только сообщение, но и элементы управления.
 * Чтобы применить свои селекторы только к сообщению,
 * используйте родительский селектор .cooked, например:
 * const $tables = $('.cooked > table', $post);
 * @used-by decorateCooked
 * @link https://github.com/discourse/discourse/blob/v1.4.0.beta7/app/assets/javascripts/discourse/lib/plugin-api.js.es6#L5
 * @param {jQuery} HTMLDivElement $post
 * @returns void
 */
const onDecorateCooked = function($post) {
	if (!_buttonsMap) {
		/** @type {String} */
		const valueS = Discourse.SiteSettings['«PayPal_Buy_Now»_Button_Code'];
		/** @type {Object[]} */
		var items;
		try {
			/** @link http://caniuse.com/#feat=json */
			items = JSON.parse(valueS);
		}
		catch (ignore) {
			// Legacy support.
			/** @type {String[]} */
			const htmlA = valueS && valueS.length ? valueS.split("\n") : [];
			items = [];
			htmlA.forEach(function(html, index) {
				items.push({id: 'paypal-' + (1 + index), html: html});
			});
		}
		_buttonsMap = [];
		items.forEach(function(item) {
			_buttonsMap[item.id] = item.html;
		});
	}
	$('.df-paypal-button', $post).each(function() {
		const classesA = this.className.split(/\s+/);
		if (classesA.length) {
			const id = classesA[classesA.length - 1];
			const html = _buttonsMap[id];
			if (html) {
				$(this).html(html);
			}
		}
	});
};