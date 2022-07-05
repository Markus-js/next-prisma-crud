import type { NextPage } from 'next';
import { useState } from 'react';

interface FormData {
  title: string;
  content: string;
  id: string;
}

const Home: NextPage = () => {
  const [form, setForm] = useState<FormData>({ title: '', content: '', id: '' })

  async function create(data: FormData) {
    try {
      fetch('http://localhost:3000/api/create', {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }).then(() => setForm({ title: '', content: '', id: '' }));
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
      }}>

        <input
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
    </div>
  )
}

export default Home
