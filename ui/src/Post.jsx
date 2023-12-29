import React, { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchPost } from './api/fetchPosts';
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate'

export default function Post() {
  const [page, setPage] = useState(1);
  const { isPending, error, data } = useQuery({
    queryKey: ['posts', { page }],
    queryFn: () => fetchPost(page)
  });
  const queyClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  if (isPending) return 'loading ... '
  if (error) return 'Unable to fetch.'

  function createPost(formData) {

    toast.promise(
      axios.post('/rest/PostAPI/', { title: formData.title, about: formData.about }),
      {
        loading: "Creating Post",
        success: () => {
          queyClient.invalidateQueries(['posts', { page }])
          return "Post created"
        },
        error: "Error Creating Post"
      }

    )
    reset();
  }
  
  function deleteoPost(id){
    toast.promise(
      axios.delete(`/rest/PostAPI/${id}/`),
      {
        loading: "Deleting Post",
        success: () => {
          queyClient.invalidateQueries(['posts', { page }])
          return "Post deleted"
        },
        error: "Error deleting Post"
      }

    )
  }

  return (
    <div className='container mt-5'>
      <div className='fs-3 mt-5'>Post List</div>
      <div className='row'>
        <div className='col-md-8'>
          <table className='table table-hover table-striped'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Created</th>
                <th>Title</th>
                <th>About</th>
                <th>View</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                data.data.results.map((value, key) => {
                  return <tr key={key}>
                    <td>{value.id}</td>
                    <td>{value.created_on}</td>
                    <td>{value.title}</td>
                    <td>{value.about}</td>
                    <th><Link className='btn btn-link' to={`/app/${value.id}`}>view</Link></th>
                    <th><button className='btn btn-danger' onClick={()=>deleteoPost(value.id)}>Delete</button></th>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
        <div className='col-md-4'>
        <form onSubmit={handleSubmit(createPost)}>
          <label htmlFor='title' className='from-label'>Title</label>
          <input type="text" id='title' {...register('title', { required: true })} className='form-control' />
          {errors.title && <p className='text-danger'>Title is required</p>}

          <label htmlFor='about' className="form-label mt-3">About</label>
          <textarea {...register('about', { required: true })} id="about" className='form-control'></textarea>
          {errors.about && <p>About is required.</p>}
          <button type="submit" className='btn btn-dark mt-3'>Create Posts</button>
        </form>
        </div>
      </div>

      <div className='d-flex'>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        onPageChange={({ selected }) => setPage(selected + 1)}
        pageRangeDisplayed={10}
        pageCount={Math.ceil((data.data.count / 10))}
        previousLabel="previous"
        renderOnZeroPageCount={null}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        activeClassName={'active'}
      />
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />

    </div>
  )
}
