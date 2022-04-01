import { useState, useEffect } from "react";

/** Custom hook to pull value from localStorage. 
 *  Reruns whenever key or value is changed in localStorage.
 */

function getStorageValue(key, defaultValue) {
	// getting stored value
	const saved = localStorage.getItem(key);
	const initial = JSON.parse(saved);
	return initial || defaultValue;
}

const useLocalStorage = (key, defaultValue) => {
	const [ value, setValue ] = useState(() => {
		return getStorageValue(key, defaultValue);
	});

	useEffect(
		() => {
			// storing input name
			localStorage.setItem(key, JSON.stringify(value));
		},
		[ key, value ]
	);

	return [ value, setValue ];
};

export default useLocalStorage;
