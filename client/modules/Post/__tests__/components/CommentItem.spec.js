import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import { CommentItem } from '../../components/CommentItem/CommentItem';

const props = {
  comment: {
    author: '',
    content: '',
    dateAdded: '',
  },
};

// 2019-04-26T02:31:39.339Z

test('should component render properly', (t) => {
  const wrapper = shallow(<CommentItem {...props} />);

  t.truthy(wrapper.hasClass('item'));
  t.is(wrapper.find('div').length, 2);
});

test('should component have correct author', t => {
  props.comment.author = 'John';
  const wrapper = shallow(<CommentItem {...props} />);

  t.is(wrapper.find('p > span').text(), 'John');
});

test('should component have correct content', t => {
  props.comment.content = 'This is a sample description.';
  const wrapper = shallow(<CommentItem {...props} />);

  t.is(wrapper.find('div > div').first().text(), 'This is a sample description.');
});
