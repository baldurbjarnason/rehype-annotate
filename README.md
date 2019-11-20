# rehype-annotate

This rehype plugin matches W3C-style annotations to their targets in the parsed HTML file. It adds attributes and hooks to those locations for further behaviours and it wraps text range selections in `mark` elements.

Note: this modifies the original tree and in some cases can add class attributes. Make sure to sanitise afterwards.

The script _does not_ embed annotation-provided CSS as there don't seem to be many tools in the unified/rehype ecosystem for sanitising user-provided CSS.

## Options

- stimulus: true | false | {prefix} (adds hooks for stimulusJS and embeds annotation bodies as template elements if applicable)
- embedAnnotations: true | false (whether to embed annotations array as a script element)
- annotationClasses: true | false