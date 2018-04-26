import config from '../config';
import uniqid from 'uniqid';

const { actionTypes } = config;

export const testTypeReceived = () => ({
  type: actionTypes.testType,
  id: uniqid()
})
