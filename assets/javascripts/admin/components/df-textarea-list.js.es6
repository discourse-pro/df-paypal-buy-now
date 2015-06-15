export default Ember.Component.extend({
	classNameBindings: [':df-textarea-list']
	/** @link http://stackoverflow.com/a/24271614/254475 */
	,layoutName: 'javascripts/admin/templates/components/df-textarea-list'
	,_collectionChanged: function() {
		this.set('values', this.get('collection').join("\n"));
	}.observes('collection.@each')
	,_setupCollection: function() {
		const values = this.get('values');
		this.set('collection', (values && values.length) ? values.split("\n") : []);
	}.on('init').observes('values')
	,actions: {
		addValue() {
			if (this.get('inputInvalid')) { return; }
			this.get('collection').addObject(this.get('newValue'));
			this.set('newValue', '');
		}
		,removeValue(value) {
			const collection = this.get('collection');
			collection.removeObject(value);
		}
	}
	,inputInvalid: Ember.computed.empty('newValue')
	,keyDown(e) {
		if (13 === e.keyCode) {
			this.send('addValue');
		}
	}
});
