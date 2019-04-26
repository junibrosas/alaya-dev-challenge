import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { CommentFormComponent } from '../../components/CommentForm/CommentForm';
import { FormattedMessage } from 'react-intl';
import { shallowWithIntl, mountWithIntl } from '../../../../util/react-intl-test-helper';

const props = {
  onSubmit: () => {},
};

const comment = {
  author: '',
  content: '',
};

test('should component renders properly', t => {
  const wrapper = shallowWithIntl(<CommentFormComponent {...props} />);

  t.is(wrapper.find('input').length, 1);
  t.is(wrapper.find('textarea').length, 1);
  t.truthy(wrapper.find('button').first().containsMatchingElement(<FormattedMessage id="commentSubmit" />));
});

test('should have correct default state', t => {
  const wrapper = shallowWithIntl(<CommentFormComponent {...props} />);

  wrapper.setState({ comment });
  wrapper.update();

  t.is(wrapper.state().comment.author, '');
  t.is(wrapper.state().comment.content, '');
});

test('should have correct state after reset', t => {
  const wrapper = shallowWithIntl(<CommentFormComponent {...props} />);
  const defaultState = wrapper.instance().getDefaultState();

  wrapper.setState({ comment: {
    author: 'john',
    content: 'hello world' },
  });
  wrapper.update();

  t.is(wrapper.state().comment.author, 'john');

  wrapper.setState(defaultState);
  wrapper.update();

  t.is(wrapper.state().comment.author, '');
});

test('should call onSubmit with proper arguments', t => {
  const spyOnSubmit = sinon.spy();
  const wrapper = mountWithIntl(<CommentFormComponent onSubmit={spyOnSubmit} />);

  wrapper.setState({ comment: {
    author: 'john',
    content: 'hello world' },
  });
  wrapper.update();

  wrapper.find('button').first().simulate('click');
  t.truthy(spyOnSubmit.calledWith({ author: 'john', content: 'hello world' }));
});

test('should not call onSubmit if requirements not met', t => {
  const spyOnSubmit = sinon.spy();
  const wrapper = mountWithIntl(<CommentFormComponent onSubmit={spyOnSubmit} />);

  wrapper.setState({ comment });
  wrapper.update();

  wrapper.find('button').first().simulate('click');
  t.falsy(spyOnSubmit.called);
});
