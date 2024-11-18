/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {ClearEditorPlugin} from '@lexical/react/LexicalClearEditorPlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {useLexicalEditable} from '@lexical/react/useLexicalEditable';
import * as React from 'react';
import {useState} from 'react';
import {CAN_USE_DOM} from 'shared/canUseDOM';
import Select from 'react-select/creatable';
import { ActionMeta, MultiValue } from 'react-select';

import {useSettings} from './context/SettingsContext';
import {useSharedHistoryContext} from './context/SharedHistoryContext';
import CommentPlugin from './plugins/CommentPlugin';
import ContentEditable from './ui/ContentEditable';

const customStyles = {
  control: (base: any) => ({
    ...base,
    minHeight: '40px',
    background: 'var(--background)',
    borderColor: 'var(--border)',
    '&:hover': {
      borderColor: 'var(--border-hover)'
    }
  }),
  menu: (base: any) => ({
    ...base,
    background: 'var(--background)',
    border: '1px solid var(--border)'
  }),
  option: (base: any, state: { isFocused: boolean }) => ({
    ...base,
    backgroundColor: state.isFocused ? 'var(--accent)' : 'transparent',
    '&:active': {
      backgroundColor: 'var(--accent)'
    }
  })
};

export default function Editor(): JSX.Element {
  const {historyState} = useSharedHistoryContext();
  const {
    settings: {
      isRichText,
    },
  } = useSettings();
  const isEditable = useLexicalEditable();
  const placeholder = 'Enter transcript text...';
  const [editor] = useLexicalComposerContext();

  return (
    <div className="editor-container">
      <AutoFocusPlugin />
      <ClearEditorPlugin />
      <CommentPlugin />
      <HistoryPlugin externalHistoryState={historyState} />
      <RichTextPlugin
        contentEditable={
          <div className="editor-scroller">
            <div className="editor">
              <ContentEditable placeholder={placeholder} />
            </div>
          </div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
    </div>
  );
}
