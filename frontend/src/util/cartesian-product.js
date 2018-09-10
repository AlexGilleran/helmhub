import reduce from 'lodash/fp/reduce';
import flatMap from 'lodash/fp/flatMap';
import map from 'lodash/fp/map';

export default (...rest) =>
	reduce((a, b) =>
		flatMap(x =>
			map(y =>
				x.concat([y])
			)(b)
		)(a)
	)([[]])(rest);