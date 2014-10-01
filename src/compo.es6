var AceCompo = mask.Compo({
	tagName: 'div',
	attr: {
		'x-mode': 'javascript',
		'x-theme': 'monokai',
		'x-live': false,
		'style': 'position:absolute; top: 0; left:0; width: 100%; height: 100%;'
	},
	meta: {
		mode: 'client',
		attributes: {
			'?x-mode': 'string',
			'?x-theme': 'string',
			'?x-live': 'boolean'
		}
	},
	slots: {
		domInsert: 'initialize_'
	},
	onRenderStart: function(model){
		resource
			.embed('../vendor/ace.js')
			.done(this.initialize_.bind(this));
	},
	initialize_ () {
		if (this.$ == null || typeof ace === 'undefined')
			return;
		this.initialize_ = function(){};
		
		var location = resource.includes[0].resource.location;
		
		[
			'basePath',
			'modePath',
			'themePath',
			'workerPath'
		].forEach(x => ace.config.set(x, location));
		
		this.editor = ace.edit(this.$[0]);
		this.editor.setTheme('ace/theme/' + this.xTheme);
		
		var sess = this.editor.getSession();
		sess.setMode('ace/mode/' + this.xMode);
		this.editor.on('change', this.onChange_.bind(this));
	},
	get () {
		if (this.editor == null)
			return mask.jmask(this).text();
		
		return this.editor.getValue();
	},
	set (str) {
		if (this.editor == null) {
			mask.jmask(this).text(str);
			return;
		}
		this.editor.setValue(str);
	},
	
	dispose () {
		this.editor.destroy();
	},
	
	changed_: false,
	onBlur_ () {
		if (this.changed_ !== true) 
			return;
		
		this.changed_ = false;
		this.emitChange_();
		debugger;
	},
	onChange_ () {
		if (this.xLive) 
			return this.emitChange_();
		
		this.changed_ = true;
	},
	emitChange_ () {
		this.emitOut('aceEditor_Change', this.get());
	}
})