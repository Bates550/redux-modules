import { createModule, middleware } from '../../../src/index';
import { PropTypes } from 'react';
import { fromJS, List } from 'immutable';

const { shape, number, string, bool } = PropTypes;
export default createModule({
  name: 'todos',
  initialState: List(), // eslint-disable-line new-cap
  transformations: {
    create: {
      middleware: [
        middleware.propCheck({
          todo: shape({
            description: string.isRequired,
            name: string.isRequired,
          }),
        }),
      ],
      reducer: (state, { payload: { todo } }) => state.push(fromJS(todo)),
    },
    destroy: {
      middleware: [
        middleware.propCheck({
          index: number.isRequired,
          test: string.isRequired,
        }),
      ],
      reducer: (state, { payload: { index } }) => state.delete(index),
    },
    update: {
      middleware: [
        middleware.propCheck({
          index: number.isRequired,
          todo: shape({
            description: string,
            checked: bool,
          }),
        }),
      ],
      reducer: (state, { payload: { index, todo: updates } }) =>
        state.update(index, todo => todo.merge(fromJS(updates))),
    },
  },
});
