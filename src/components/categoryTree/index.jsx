import './index.css'

const CategoryTree = (props) => {
    const printTree = (categories, depth = 0) => {
        return categories.map((category) => (
          <div key={category._id} style={{marginLeft:depth *20}} className='categoryTree'>
            <p>{"-".repeat(2)} {category.name}</p>
            {category.children && category.children.length > 0 && printTree(category.children, depth + 1)}
          </div>
        ));
    };


    return (
        <div className="tree-container">
            {props.categoryData.length ? printTree(props.categoryData): <h2>No category data available</h2>}
        </div>
    ) 
}

export default CategoryTree;