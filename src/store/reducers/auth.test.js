import reducer from './auth';
import * as actions from '../actions/actionTypes';
describe('auth reducer', ()=>{
    it('should return initial state', ()=>{
        expect(reducer(undefined,{})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    });

    it('should store token upon login', ()=> {
        expect(reducer(undefined,{
            type: actions.AUTH_SUCCESS,
            token: 'some-token',
            userId: 'some-user-id'
        })).toEqual({
            token: 'some-token',
            userId: 'some-user-id',
            error: null,
            loading: false,
            authRedirectPath: '/'
        })

    })


})