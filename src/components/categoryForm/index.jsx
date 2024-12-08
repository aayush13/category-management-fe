import { useState } from "react";
import Select from "react-select";
import "./index.css";
import MODE from "../../constants";
import {create, update} from "../../utils";
const apiUrl = import.meta.env.VITE_API_URL;

const CategoryFrom = ({data, updateTree, updateStatus}) => {
  const [categoryName, setCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [docToUpdate, setDocToUpdate] = useState(null);
  const [mode, setMode] = useState({ value: "show" });

  const handleCategoryName = (e) => {
    setCategoryName(e.target.value);
  };

  const findElement = (id) => {
    return data.filter(x => x._id ==id)[0]
  }
  const handleCategoryChange = (selected) => {
    setSelectedCategory(selected);
    const parent = findElement(selected.parent)
    if(parent) {
        setDocToUpdate({value:parent._id, label: parent.name})
    } else {
        setDocToUpdate({value: null,label: "Parent node/ No selection",})
    }
    
    if(selected.value && mode.value=="update") {
        setCategoryName(selected.label)
    } else {
        setCategoryName("")
    }
    
  };

  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
  };

  const handleDocToUpdate =(selected) => {
    setDocToUpdate(selected)
  }

  const submitForm = (e) => {
    e.preventDefault();
    if (mode.value == "create") {
      if(selectedCategory.label.toLowerCase() != categoryName.toLowerCase()) {
        create(apiUrl, categoryName ,selectedCategory.value, updateTree, updateStatus)
      } else {
        alert("Same category name")
      } 
    }

    if (mode.value == "update") {
      update(apiUrl, categoryName ,selectedCategory.value, updateTree, updateStatus) 
    }

    if (mode.value == "delete") {
      deleteCategory(apiUrl ,selectedCategory.value, updateTree, updateStatus)
    }

    setCategoryName("");
    setSelectedCategory(null);
    setMode({ value: "show" });
  };

  const categoryOptions = data.map((category) => ({
    value: category._id,
    parent: category.parent,
    label: category.name,
  }));
  categoryOptions.unshift({
    value: null,
    label: "Parent node/ No selection",
  });

  const modeOptions = MODE.map((item) => ({
    value: item.value,
    label: item.label,
  }));

  return (
    <div className="form-container">
      <form className="category-form" onSubmit={submitForm}>
        <label id="mode" htmlFor="mode-dropdown">
          Mode
        </label>
        <Select
          id="mode-dropdown"
          options={modeOptions}
          onChange={handleModeChange}
          value={mode}
          placeholder="Choose a mode..."
        />
        <label id="category">
          Select a category/subcategory **
        </label>
        <Select
          id="category-dropdown"
          options={categoryOptions}
          onChange={handleCategoryChange}
          value={selectedCategory}
          placeholder="Choose a category..."
        />
        {mode.value != "delete" ? (
          <div className="category-name-container">
            <label id="category" htmlFor="categoryName">
              Category Name
            </label>
            <input
              id="categoryName"
              className="form-control"
              value={categoryName}
              name="categoryName"
              onChange={handleCategoryName}
            />
          </div>
        ) : null}
        {mode.value == "update" ? (
          <>
            <label id="category-update" htmlFor="category-update-dropdown">
              Select new parent
            </label>
            <Select
              id="category-update-dropdown"
              options={categoryOptions}
              onChange={handleDocToUpdate}
              value={docToUpdate}
              placeholder="Choose a category..."
            />
          </>
        ) : null}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CategoryFrom;
