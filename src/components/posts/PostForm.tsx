import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface PostFormProps {
  editMode?: boolean;
  initialData?: {
    _id: string;
    title: string;
    content: string;
    category: string;
    tags: string[];
    coverImage: string;
  };
}

interface FormData {
  title: string;
  content: string;
  category: string;
  tags: string;
  coverImage: string;
}

const categories = [
  'Technology',
  'Lifestyle',
  'Travel',
  'Food',
  'Health',
  'Other',
];

const PostForm: React.FC<PostFormProps> = ({ editMode = false, initialData }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: editMode && initialData
      ? {
          title: initialData.title,
          content: initialData.content,
          category: initialData.category,
          tags: initialData.tags.join(', '),
          coverImage: initialData.coverImage,
        }
      : undefined,
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      const formattedData = {
        ...data,
        tags: data.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      };

      let response;
      
      if (editMode && initialData) {
        response = await axios.put(
          `http://localhost:5000/api/posts/${initialData._id}`,
          formattedData,
          { withCredentials: true }
        );
      } else {
        response = await axios.post(
          'http://localhost:5000/api/posts',
          formattedData,
          { withCredentials: true }
        );
      }

      navigate(`/post/${editMode ? initialData?._id : response.data._id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          {...register('title', {
            required: 'Title is required',
            minLength: {
              value: 5,
              message: 'Title must be at least 5 characters',
            },
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your post title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cover Image URL
        </label>
        <input
          type="text"
          {...register('coverImage')}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://example.com/image.jpg"
        />
        {errors.coverImage && (
          <p className="mt-1 text-sm text-red-600">{errors.coverImage.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          {...register('category', {
            required: 'Category is required',
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tags (comma separated)
        </label>
        <input
          type="text"
          {...register('tags')}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="technology, coding, web"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <textarea
          {...register('content', {
            required: 'Content is required',
            minLength: {
              value: 50,
              message: 'Content must be at least 50 characters',
            },
          })}
          rows={10}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your blog post here..."
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md mr-2 hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
        >
          {isSubmitting
            ? editMode
              ? 'Updating...'
              : 'Publishing...'
            : editMode
            ? 'Update Post'
            : 'Publish Post'}
        </button>
      </div>
    </form>
  );
};

export default PostForm;