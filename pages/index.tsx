// import type { NextPage } from 'next';
import { useState } from 'react';
import { prisma } from '../lib/prisma';
import { GetServerSideProps } from 'next';
import { forceReload } from '../helpers/forceReload';

interface Notes {
  notes: {
    id: string;
    title: string;
    content: string;
  }[];
}
interface FormData {
  title: string;
  content: string;
  id: string;
}

const Home = ({ notes }: Notes) => {
  const [form, setForm] = useState<FormData>({ title: '', content: '', id: '' })

  async function create(data: FormData) {
    try {
      fetch('http://localhost:3000/api/create', {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
      })
      setTimeout(() => {
        console.log('success')
        setForm({ title: '', content: '', id: '' });
        forceReload();
      }, 200)
    } catch (e) {
      console.error(e);
    }
  }

  async function deleteNote(id: string) {
    try {
      fetch(`http://localhost:3000/api/note/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'DELETE',
      })
      setTimeout(() => {
        console.log('success')
        setForm({ title: '', content: '', id: '' });
        forceReload();
      }, 200)
    } catch (e) {
      console.error(e);
    }
  }

  async function UpdateNote(id: string, data: FormData) {
    try {
      fetch(`http://localhost:3000/api/note/${id}`, {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT',
      })
      setTimeout(() => {
        console.log('success')
        setForm({ title: '', content: '', id: '' });
        forceReload();
      }, 200)
    } catch (e) {
      console.error(e);
    }
  }


  const handleSubmit = async (data: FormData) => {
    try {
      create(data)
    } catch (e) {
      console.error(e);
    }

  }

  return (
    <div>
      <h1 className="mt-4 font-bold text-center text-2x1">Notes</h1>
      <form onSubmit={e => {
        e.preventDefault()
        handleSubmit(form)
      }}>

        <input
          placeholder="Title"
          type="text"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
        ></textarea>
        <button type="submit" >Add +</button>
      </form>
      <div>
        <ul>
          {notes.map(note => {
            return (
              <li key={note.id}>
                <h3>{note.title}</h3>
                <p>{note.content}</p>
                <button onClick={() => { UpdateNote(note.id, form) }}>Update</button>
                <button onClick={() => { deleteNote(note.id) }}>X</button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Home



export const getServerSideProps: GetServerSideProps = async () => {
  const notes = await prisma.note.findMany({
    select: {
      title: true,
      content: true,
      id: true,
    }
  });

  return {
    props: {
      notes
    }
  }
} 