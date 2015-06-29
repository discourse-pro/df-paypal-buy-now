// Admin-only initializer.
Discourse.initializer(
	require('discourse/plugins/df-paypal-buy-now/admin/i', null, null, true).default
);