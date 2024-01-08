/**
 * @typedef {import('preact').FunctionComponent<any> | import('preact').ComponentClass<any> | import('preact').FunctionalComponent<any> } ComponentDefinition
 * @typedef {{ shadow: false } | { shadow: true, mode: 'open' | 'closed'}} Options
 * @typedef {HTMLElement & { _root: ShadowRoot | HTMLElement, _vdomComponent: ComponentDefinition, _vdom: ReturnType<typeof import("preact").h> | null }} PreactCustomElement
 */
/**
 * Register a preact component as web-component.
 * @param {ComponentDefinition} Component The preact component to register
 * @param {string} [tagName] The HTML element tag-name (must contain a hyphen and be lowercase)
 * @param {string[]} [propNames] HTML element attributes to observe
 * @param {Options} [options] Additional element options
 * @example
 * ```ts
 * // use custom web-component class
 * class PreactWebComponent extends Component {
 *   static tagName = 'my-web-component';
 *   render() {
 *     return <p>Hello world!</p>
 *   }
 * }
 *
 * register(PreactComponent);
 *
 * // use a preact component
 * function PreactComponent({ prop }) {
 *   return <p>Hello {prop}!</p>
 * }
 *
 * register(PreactComponent, 'my-component');
 * register(PreactComponent, 'my-component', ['prop']);
 * register(PreactComponent, 'my-component', ['prop'], {
 *   shadow: true,
 *   mode: 'closed'
 * });
 * ```
 */
export default function register(
	Component: ComponentDefinition,
	tagName?: string,
	propNames?: string[],
	options?: Options
): void;
export type ComponentDefinition =
	| import('preact').FunctionComponent<any>
	| import('preact').ComponentClass<any>
	| import('preact').FunctionalComponent<any>;
export type Options =
	| {
			shadow: false;
	  }
	| {
			shadow: true;
			mode: 'open' | 'closed';
	  };
export type PreactCustomElement = HTMLElement & {
	_root: ShadowRoot | HTMLElement;
	_vdomComponent: ComponentDefinition;
	_vdom: ReturnType<typeof import('preact').h> | null;
};
