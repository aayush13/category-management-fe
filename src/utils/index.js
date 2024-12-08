export function create(apiUrl, categoryName,selectedCategory, updateTree,updateStatus) {
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


export function update(apiUrl, categoryName,selectedCategory,docToUpdate, updateTree,updateStatus) {
    fetch(`${apiUrl}/update/${selectedCategory}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: categoryName,
          parent: docToUpdate,
        }),
      })
        .then((res) =>{
            if (!res.ok) {
                let err = new Error("HTTP status code: " + res.status + "\n" + "Invalid data/input")
                err.response = res
                err.status = res.status
                throw err
            }
            return res.json()
        } )
        .then((data) => {
          updateTree(!updateStatus);
        })
        .catch((err) => alert("Error", err.message));
}

export function deleteCategory(apiUrl,selectedCategory, updateTree,updateStatus) {
    fetch(
        `${apiUrl}/delete/${selectedCategory}`,
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