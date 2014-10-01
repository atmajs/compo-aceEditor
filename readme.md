### [Ace](http://ace.c9.io/) Component Wrapper

[![Bower version](https://badge.fury.io/bo/compo-ace.svg)](http://badge.fury.io/bo/compo-ace)

```scss
a:aceEditor;
```
### Attributes

Attribute | Description
--- | ---
`x-mode` | Ace mode (_default_ `javascript`)
`x-theme` | Ace theme (_default_ `monokai`)
`x-live` | Define this attribute, to emit `aceEditor_Changed` signal on each `keypress`, otherwise this signal is deferred until `blur` event


### Signals
Signal | Description
--- | ---
`aceEditor_Changed` | `(sender, text)` is emitted each time text is changed


### API

- **`editor`** <a name='input'>#</a>

	Ace `Editor` instance

- **`get()`** <a name='get'>#</a>
	
	Get text
	
- **`set(value)`** <a name='set'>#</a>

	Set text

### Dependencies

- `IncludeJS`

### Examples

- [/examples](/examples)

```bash
# install atma toolkit
npm install atma
# run server
atma server

# navigate `http://localhost:5777/examples/simple.html`
```

### Test
```bash
npm test
```

:copyright: MIT - Atma.js Project