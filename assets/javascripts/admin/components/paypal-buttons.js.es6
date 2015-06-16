export default Ember.Component.extend({
	classNameBindings: [':paypal-buttons']
	/** @link http://stackoverflow.com/a/24271614/254475 */
	,layoutName: 'javascripts/admin/templates/components/paypal-buttons'
	,_changed: function() {
		Ember.run.once(this, '_serialize')
	}.observes('items.@each', 'items.@each.id', 'items.@each.html')
	,_serialize: function() {this.set('valueS', JSON.stringify(this.get('items')));}
	,_setup: function() {
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
				items.push({id: 'paypal-%@'.fmt(1 + index), html: html});
			});
		}
		this.set('items', items);
		this.initNewButton();
	}.on('init').observes('valueS')
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
		return 'paypal-%@'.fmt(1 + Math.max.apply(Math, existingIds));
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
	,keyDown(e) {
		if (13 === e.keyCode) {
			this.send('addItem');
		}
	}
});
