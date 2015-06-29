export default Ember.Component.extend({
	classNameBindings: [':paypal-buttons']
	/**
  	 * 2015-06-29
  	 * Discourse expects the components's template at
  	 * plugins/df-paypal-buy-now/assets/javascripts/discourse/templates/components/paypal-buttons.hbs
  	 * Until I know it I used to specify template location explicitly:
  	 * @link http://stackoverflow.com/a/24271614/254475
  	 * ,layoutName: 'javascripts/admin/templates/components/paypal-buttons'
  	 * Now I save the explicit method for history only. May be it will be useful sometimes.
  	 */
	,_serialize: function() {this.set('valueS', JSON.stringify(this.get('items')));}
	,onInit: function() {
		/** @type {String} */
		const valueS = this.get('valueS');
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
		this.set('items', items);
		this.initNewButton();
		this.set('initialized', true);
	}.on('init')//.observes('valueS')
	,_changed: function() {
		if (this.get('initialized')) {
			Ember.run.once(this, '_serialize');
		}
	}.observes('items.@each', 'items.@each.id', 'items.@each.html')
	,initNewButton: function() {
		this.set('newId', this.generateNewId());
		this.set('newHtml', I18n.t('admin.site_settings.paypal_buy_now.placeholder'));
	}
	,generateNewId: function() {
		var items = this.get('items');
		var existingIds = $.map(items, function(item) {
			var matches = item.id.match(/^paypal-(\d+)/);
			return !matches || (2 > matches.length) ? 0 : parseInt(matches[1]);
		});
		/** @link http://stackoverflow.com/a/6102340/254475 */
		var max = !existingIds.length ? 0 : Math.max.apply(Math, existingIds);
		return 'paypal-' + (max + 1);
	}
	,actions: {
		addItem() {
			if (!this.get('inputInvalid')) {
				var items = this.get('items');
				var id = this.get('newId') || this.generateNewId();
				items.addObject({id: id, html: this.get('newHtml')});
				this.initNewButton();
			}
		}
		,removeItem(item) {
			const items = this.get('items');
			items.removeObject(item);
		}
	}
	,inputInvalid: Ember.computed.empty('newHtml')
});
