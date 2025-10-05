import { EditorContent, useEditor } from '@tiptap/react';

import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';
import StarterKit from '@tiptap/starter-kit';
import Document from '@tiptap/extension-document';

export function Editor() {
  const editor = useEditor({
    extensions: [
      Document.extend({
        // Aqui estamos dizendo que o nosso documento sempre precisa/deve iniciar com um cabeçalho
        content: 'heading block*', // Aqui estamos dizendo qual a estrutura que deve ter o nosso documento
      }),
      StarterKit.configure({
        document: false,
      }),
      Highlight,
      Typography,
      Placeholder.configure({
        placeholder: 'Untitled',
        emptyEditorClass:
          'before:content-[attr(data-placeholder)] before:text-gray-500 before:h-0 before:float-left before:pointer-events-none', // classes que serão adicionadas ao editor quando ele estiver vazio
      }),
    ],
    content:
      '<h1>Back-end</h1><p>Esse é o documento que explica sobre back-end.</p>',
    autofocus: 'end',
    editorProps: {
      attributes: {
        class: 'focus:outline-none prose prose-invert prose-headings:mt-0', // Essa é a classe do editor de texto
      },
    },
  });

  return <EditorContent className='w-[65ch]' editor={editor} />;
}
