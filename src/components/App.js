import { useState, useEffect } from "react";
import { ROOT_URL } from "../utils/constant";
import AddNoteForm from "./AddNoteForm";
import EditForm from "./EditForm";
import Notes from "./Notes";
import Filter from "./Filter";

export default function App() {
  const [data, setData] = useState([]);
  const [isEditFormVisible, setEditFormVisibility] = useState(false);
  const [editformData, setEditFormData] = useState({
    id: "",
    heading: "",
    description: ""
  });
  const [filters, setFilters] = useState({
    year: "",
    month: "",
    sortBy: "",
    week: ""
  });

  useEffect(() => {
    getNotes();
  }, []);

  function handleFilter({ target }) {
    let { name, value } = target;
    setFilters({ ...filters, [name]: value });
  }

  function clearEditForm() {
    setEditFormData({ ...editformData, id: "", heading: "", description: "" });
  }

  function clearFilters() {
    setFilters({ ...filters, week: "", month: "", sortBy: "", year: "" });
  }

  function getNotes() {
    fetch(ROOT_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(({ notes }) => setData(notes));
  }

  function toggleEditForm(id = "") {
    setEditFormVisibility(!isEditFormVisible);
    if (id) {
      let result = data.find(note => id === note.id);
      setEditFormData({
        ...editformData,
        id,
        heading: result.heading,
        description: result.description
      });
    } else {
      setEditFormData({
        ...editformData,
        id: "",
        heading: "",
        description: ""
      });
    }
  }

  function handleEditFormInput({ target }) {
    let { name, value } = target;
    setEditFormData({ ...editformData, [name]: value });
  }

  return (
    <main className="container">
      <h1 className="text-xlg text-light mb-2">Notes</h1>
      <EditForm
        clearFormData={clearEditForm}
        notes={data}
        getNotes={getNotes}
        isEditFormVisible={isEditFormVisible}
        toggleEditForm={toggleEditForm}
        handleEditFormInput={handleEditFormInput}
        data={editformData}
      />
      <AddNoteForm getNotes={getNotes} />
      {data.length ? (
        <Filter
          data={data}
          filters={filters}
          handleFilter={handleFilter}
          clearFilters={clearFilters}
        />
      ) : (
        ""
      )}
      <Notes
        notes={data}
        filters={filters}
        getNotes={getNotes}
        toggleEditForm={toggleEditForm}
      />
    </main>
  );
}
