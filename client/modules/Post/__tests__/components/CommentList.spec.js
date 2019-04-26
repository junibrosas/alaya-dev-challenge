import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import { CommentList } from '../../components/CommentList/CommentList';

const props = {
  comments: [{
    author: 'john',
    content: 'this is a description',
    dateAdded: '2019-04-26T02:31:39.339Z',
  }, {
    author: 'wick',
    content: 'this is a description',
    dateAdded: '2019-04-26T02:31:39.339Z',
  }],
};

test('should component render properly', t => {
  const wrapper = shallow(<CommentList {...props} />);

  t.truthy(wrapper.hasClass('list'));
});

test('should component render items properly', t => {
  const wrapper = shallow(<CommentList {...props} />);

  t.is(wrapper.find('CommentItem').length, 2);
});
