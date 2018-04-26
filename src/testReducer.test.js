import testReducer from './testReducer';

describe('testReducer', () => {
  it('should return previous state for unknown action type', () => {
    const stateBefore = 'initial';
    const action = {
      type: 'UNKNOWN_ACTIONS'
    };
    const stateAfter = 'initial';

    expect(testReducer(stateBefore, action)).toEqual(stateAfter);
  });
});
