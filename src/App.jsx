import { useEffect, useState } from 'react'
import './App.css'
import CategoryTree from './components/categoryTree';
import CategoryFrom from './components/categoryForm';

const apiUrl = import.meta.env.VITE_API_URL;

function App() {
  const [categories, setCategories] = useState([]);
  const [dropdownData, setDropdownData] = useState([]);
  const [updateTree, setUpdateTree] = useState(true)

  useEffect(()=> {
    fetch(`${apiUrl}/`)
    .then((res) => res.json())
    .then((data) => {
      setDropdownData([...[], ...data])
    })
    .catch((err) => {
      console.error('Fetch error:', err);
    });
  },[updateTree])
  
  useEffect(()=> {
    fetch(`${apiUrl}/tree`)
      .then((res) => res.json())
      .then((data) => {
        setCategories([...[], ...data])
      })
      .catch((err) => {
        console.error('Fetch error:', err);
      });
  },[updateTree])


  return (
    <div className='container'>
      <CategoryFrom data={dropdownData} updateTree={setUpdateTree} updateStatus={updateTree}/>
      <CategoryTree categoryData={categories}/>
    </div>
    
  )
}

export default App
