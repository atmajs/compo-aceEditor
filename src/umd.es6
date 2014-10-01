(function(root, factory){
	var _mask,
		_ruta,
		_incl,
		_global = typeof global !== 'undefined'
			? global
			: window
			;
	
	_mask = get('mask');
	_ruta = get('ruta');
	_incl = get('include');
	
	if (_mask == null) 
		throw Error('MaskJS was not loaded');
	
	factory(_global, _mask, _ruta, _incl, _mask.Compo.config.getDOMLibrary());
	
	function get(prop) {
		return _global[prop] || (_global.atma && _global.atma[prop]);
	}
	
}(this, function(global, mask, ruta, include, $){
	
	var resource = include.instance(include.location || '/');
	
	// import ./utils.es6
	// import ./compo.es6
	
	mask.registerHandler('a:aceEditor', AceCompo);
}));
