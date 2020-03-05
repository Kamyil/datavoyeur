export function useObserver(valueToObserve: Object | Array<Object>, onChangeCallback) {
	const handler = {
		get(target, property, receiver) {
			try {
				return new Proxy(target[property], handler);
			} catch (err) {
				return Reflect.get(target, property, receiver);
			}
		},
		defineProperty(target, property, descriptor) {
			onChangeCallback();
			return Reflect.defineProperty(target, property, descriptor);
		},
		deleteProperty(target, property) {
			onChangeCallback();
			return Reflect.deleteProperty(target, property);
		}
	};

	return new Proxy(valueToObserve, handler);
};