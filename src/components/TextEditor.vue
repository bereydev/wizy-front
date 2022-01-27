<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'

const editor = useEditor({
    editorProps: {
        attributes: {
            class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
        },
    },
    extensions: [
        StarterKit,
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
        Highlight,
    ],
    content: `    <h2>
      Hi there,
    </h2>
    <p>
      this is a basic <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
    </p>
    <ul>
      <li>
        That’s a bullet list with one …
      </li>
      <li>
        … or two list items.
      </li>
    </ul>
    <p>
      Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
    </p>`,
})
</script>

<template>
    <div class="border border-blue-400 border-3 rounded-xl p-3">
        <div v-if="editor" class="space-y-3">
            <button
                class="editor-btn"
                @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
            >
                <h1></h1>Titre 1
            </button>
            <button
            class="editor-btn"
                @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
            >Titre 2</button>
            <button
            class="editor-btn"
                @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
            >Titre 3</button>
            <button
            class="editor-btn"
                @click="editor?.chain().focus().setParagraph().run()"
                :class="{ 'is-active': editor.isActive('paragraph') }"
            >paragraph</button>
            <button
            class="editor-btn"
                @click="editor?.chain().focus().toggleBold().run()"
                :class="{ 'is-active': editor.isActive('bold') }"
            >bold</button>
            <button
            class="editor-btn"
                @click="editor?.chain().focus().toggleItalic().run()"
                :class="{ 'is-active': editor.isActive('italic') }"
            ><em>I</em></button>
            <button
            class="editor-btn"
                @click="editor?.chain().focus().toggleStrike().run()"
                :class="{ 'is-active': editor.isActive('strike') }"
            ><strike>Barrer</strike></button>
            <button
            class="editor-btn"
                @click="editor?.chain().focus().toggleHighlight().run()"
                :class="{ 'is-active': editor.isActive('highlight') }"
            ><mdi:grease-pencil /></button>
            <button
            class="editor-btn"
                @click="editor?.chain().focus().setTextAlign('left').run()"
                :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
            ><iconoir:align-left /></button>
            <button
            class="editor-btn"
                @click="editor?.chain().focus().setTextAlign('center').run()"
                :class="{ 'border-solid border-blue-600': editor.isActive({ textAlign: 'center' }) }"
            >
                <iconoir:align-center />
            </button>
            <button
            class="editor-btn"
                @click="editor?.chain().focus().setTextAlign('right').run()"
                :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
            ><iconoir:align-right /></button>
            <button
            class="editor-btn"
                @click="editor?.chain().focus().setTextAlign('justify').run()"
                :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }"
            ><iconoir:align-justify /></button>
        </div>
        <editor-content class="h-min-50 h-max-100 overflow-auto" :editor="editor" />
        <button
            class="px-6 py-2 border border-blue-500 font-medium text-sm hover:bg-blue-600 hover:text-white text-blue-600 rounded"
        >Button</button>
    </div>
</template>