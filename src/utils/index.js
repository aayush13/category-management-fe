export default function create(apiUrl, categoryName,selectedCategory, updateTree,updateStatus) {
    fetch(`${apiUrl}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: categoryName,
          parent: selectedCategory,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          updateTree(!updateStatus);
        })
        .catch((err) => alert("Error", err));
}


export default function update(apiUrl, categoryName,selectedCategory, updateTree,updateStatus) {
    fetch(`${apiUrl}/update/${selectedCategory}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: categoryName,
          parent: docToUpdate.value,
        }),
      })
        .then((res) =>{
            if (!res.ok) {
                let err = new Error("HTTP status code: " + response.status)
                err.response = response
                err.status = response.status
                err.message="Invalid data/input"
                throw err
            }
            return res.json()
        } )
        .then((data) => {
          updateTree(!updateStatus);
        })
        .catch((err) => alert("Error", err.message));
}

export default function deleteCategory(apiUrl,selectedCategory, updateTree,updateStatus) {
    fetch(
        `${apiUrl}/delete/${selectedCategory.value}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          updateTree(!updateStatus);
        })
        .catch((err) => alert("Error", err));
}