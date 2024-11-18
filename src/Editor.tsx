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

import {useSettings} from './context/SettingsContext';
import {useSharedHistoryContext} from './context/SharedHistoryContext';
import CommentPlugin from './plugins/CommentPlugin';
import ContentEditable from './ui/ContentEditable';

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
