// source /src/umd.es6
(function(root, factory) {
  var _mask,
      _ruta,
      _incl,
      _global = typeof global !== 'undefined' ? global : window;
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
}(this, function(global, mask, ruta, include, $) {
  include.client().js('../vendor/typeahead.bundle.js').css('../vendor/typeahead.css');
  ;
  var NO_SEARCH_IN_SCOPE = 'Contains search attribute, but the search function not found';
  var INVALID_ARRAY = "Invalid array. Expect:\n1) Strings\n2) {id, text}\n3) Look for properties: 'x-prop-id', 'x-prop-text'\n";
  var warn_ = console.warn.bind(console, 'A:Typeahead');
  var TypeaheadCompo = mask.Compo({
    template: "\n\t\tinput.typeahead\n\t\t\tid='~[: $a.id]'\n\t\t\ttype=text\n\t\t\tvalue='~[: $a.value]'\n\t\t\tstyle='vertical-align: middle';\n\t",
    meta: {
      attributes: {
        'x-prop-id': 'string',
        'x-prop-text': 'string',
        '?x-prop': 'string',
        '?x-search': function(val, compo, model) {
          var fn = mask.Utils.Expression.eval(val, model, null, compo);
          if (fn == null) {
            warn_(NO_SEARCH_IN_SCOPE, compo, model);
            return;
          }
          return fn;
        }
      },
      template: 'join'
    },
    slots: {domInsert: function() {
        var $__0 = this;
        this.compos.input.typeahead({
          hint: true,
          highlight: true,
          minLength: 1
        }, {
          displayKey: 'text',
          source: this.search_.bind(this)
        }).on('typeahead:selected', (function() {
          $__0.typeaheadChanged();
        })).on('keyup', (function(event) {
          if (event.which !== 13)
            return;
          $__0.typeaheadChanged();
        }));
      }},
    events: {
      'keydown': function(e) {
        if (e.which === 13) {
          e.stopPropagation();
          e.preventDefault();
        }
      },
      'change: select': function(event) {
        var el = event.currentTarget,
            opt$ = el.selectedOptions[0];
        if (opt$ == null)
          return;
        el.selectedIndex = -1;
        this.compos.input.typeahead('val', opt$.textContent);
      }
    },
    compos: {input: '$: input'},
    onRenderStart: function(model) {
      this.scope = {array: this.prepair_(model[this.xProp])};
    },
    search_: function(query, cb) {
      var $__0 = this;
      if (this.xSearch == null) {
        cb(this.filter_(query, this.scope.array));
        return;
      }
      this.xSearch(query, (function(arr) {
        cb($__0.prepair_(arr));
      }));
    },
    filter_: function(query, arr) {
      var rgx = new RegExp(query, 'i');
      return arr.filter((function(x) {
        return rgx.test(x.text);
      }));
    },
    type_: 'object',
    prepair_: function(arr) {
      var $__0 = this;
      if (arr == null)
        return [];
      if (arr.length === 0)
        return arr;
      var map = {
        string: (function(x) {
          return ({
            id: x,
            text: x
          });
        }),
        object: (function(x) {
          return ({
            id: x[$__0.xPropId],
            text: x[$__0.xPropText]
          });
        })
      };
      var item = arr[0];
      if (typeof item === 'string') {
        this.type_ = 'text';
        return arr.map(map.string);
      }
      if (item[this.xPropText] !== void 0) {
        return arr.map(map.object);
      }
      if (item.text !== void 0)
        return arr;
      warn_(INVALID_ARRAY, item);
    },
    get: function() {
      var text = this.compos.input.val(),
          arr,
          property;
      if (this.xProp) {
        arr = this.model[this.xProp];
        property = this.xPropText;
      } else {
        arr = this.scope.array;
        property = 'text';
      }
      return arr.find((function(x) {
        return text === x[property];
      }));
    },
    set: function(mix) {
      if (mix == null || this.$ == null)
        return;
      var val = typeof mix !== 'string' ? mix[this.xPropText] || mix.text : mix;
      this.compos.input.typeahead('val', val);
    },
    dispose: function() {
      this.compos.input.typeahead('destroy');
    },
    typeaheadChanged: function(text) {
      this.emitOut('typeaheadChanged', this.get());
    }
  });
  mask.registerHandler('a:typeahead', TypeaheadCompo);
}));

// end:source /src/umd.es6