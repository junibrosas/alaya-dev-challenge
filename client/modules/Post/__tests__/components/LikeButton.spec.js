import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { LikeButton } from '../../components/LikeButton/LikeButton';

const props = {
  likes: 0,
  onLiked: () => {},
};

test('renders text correctly when like is singular', t => {
  props.likes = 1;
  const wrapper = shallow(
    <LikeButton {...props} />
  );

  t.is(wrapper.find('button span').text(), '1 like');
});

test('renders text correctly when like is plural', t => {
  props.likes = 2;
  const wrapper = shallow(
    <LikeButton {...props} />
  );

  t.is(wrapper.find('button span').text(), '2 likes');
});

test('handle onLiked properly', t => {
  const spyOnLiked = sinon.spy();
  props.onLiked = spyOnLiked;
  const wrapper = shallow(
    <LikeButton {...props} />
  );

  wrapper.find('button').first().simulate('click');
  t.truthy(spyOnLiked.calledOnce);
});
