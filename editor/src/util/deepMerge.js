function deepMergeArry(a,b) {
	return a.concat(b)
}

function deepMergeObject(a,b) {
	const obj  = {...a}
	for(let key in b) {
		obj[key] = key in a ? deepMerge(a[key], b[key]) : b[key]
	}
	return obj
}

export function deepMerge(a , b ){
	if(a === null || b === null) {
		return a || b 
	}

	if(typeof a !== 'object' && typeof b !== 'object') {
		return b
	}

	if(Array.isArray(a) && Array.isArray(b)) {
		return deepMergeArry(a, b)
	}
	return deepMergeObject(a, b)
}
