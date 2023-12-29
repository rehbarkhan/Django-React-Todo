import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchPostDetail } from './api/fetchPosts';
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios';

export default function PostEdit() {
  const { id } = useParams();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const queyClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ['postEdit', { id }],
    queryFn: () => fetchPostDetail(id)
  })
  if (isLoading) return "Loading..."
  if (error) return "Error Loading"
  function updatePost(formData) {
    toast.promise(
      axios.patch(`/rest/PostAPI/${id}/`, { title: formData.title, about: formData.about }),
      {
        loading: "Updating Post",
        success : () => {
          queyClient.invalidateQueries(['postEdit', { id }])
          return "Post Updated"
        },
        error : "Error Updating Post"
      }

    )
  }
  return (
    <div div className='container mt-5'>
      <div><Link to="/app">Back</Link> <span className='fs-3'>PostEdit</span></div>
      <form onSubmit={handleSubmit(updatePost)} className='mt-5'>
        <label htmlFor='title' className='form-label'>Title</label>
        <input type="text" id='title' {...register('title', { required: true })} defaultValue={data.data.title} className='form-control' />
        {errors.title && <p className='text-danger'>Title is required</p>}

        <label htmlFor='about' className='form-label mt-3'>About</label>
        <textarea {...register('about', { required: true })} defaultValue={data.data.about} id="about" className='form-control'></textarea>
        {errors.about && <p className='text-danger'>About is required.</p>}
        <button type="submit" className='btn btn-primary mt-3'>Update Posts</button>
      </form>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />

    </div>
  )
}
