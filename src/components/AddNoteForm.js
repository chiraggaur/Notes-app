import { useState } from "react";
import { ROOT_URL } from "../utils/constant";

export default function AddNoteForm(props) {
  const [input, setInput] = useState({
    heading: "",
    description: "",
    date: ""
  });

  let { heading, description, date } = input;

  const handleChange = ({ target }) => {
    let { name, value } = target;
    setInput({ ...input, [name]: value });
  };

  function clearForm() {
    setInput({ ...input, heading: "", description: "", date: "" });
  }

  function createNotes(event) {
    event.preventDefault();
    if (!heading || !description || !date) {
      return alert("fill all fields before submitting");
    }
    fetch(ROOT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        note: {
          heading,
          description,
          date
        }
      })
    }).then(() => {
      clearForm();
      props.getNotes();
      alert("note added successfully");
    });
  }

  return (
    <form
      onSubmit={createNotes}
      className="add-note-form pd-3 flex flex-col flex-row-gap-1"
    >
      <fieldset className="flex flex-justify-between">
        <input
          onChange={handleChange}
          className="form-control input pd-1"
          type="text"
          name="heading"
          value={input.heading}
          id="heading"
          placeholder="Heading"
        />
        <input
          onChange={handleChange}
          className="form-control input pd-1"
          type="date"
          name="date"
          value={input.date}
        />
      </fieldset>
      <fieldset>
        <textarea
          onChange={handleChange}
          className="form-control textarea pd-1"
          type="text"
          name="description"
          value={input.description}
          id="description"
          placeholder="Add Description For New Note"
        />
      </fieldset>
      <fieldset className="flex flex-col-gap-1 justify-self-end">
        <button className="btn-form" type="button" onClick={clearForm}>
          CANCEL
        </button>
        <input className="btn-form bg-orange" type="submit" value="ADD" />
      </fieldset>
    </form>
  );
}
