import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../components/BuildControls/BuildControls';


configure({adapter: new Adapter()});
describe('<BurgerBuilder/>', ()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<BurgerBuilder onInitIngredients={()=>{}}/>);
        wrapper.setProps({ings: {salad: 0}});
    });
    it('shoud render one BuildControls whenever there are ingredients', ()=>{
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
})