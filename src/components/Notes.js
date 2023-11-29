import { ROOT_URL } from "../utils/constant";

export default function Notes(props) {
  let { notes, filters } = props;

  function deleteNote(id) {
    fetch(ROOT_URL + "/" + id + "/delete", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => {
      props.getNotes();
      alert("note deleted successfully");
    });
  }

  function getFilteredNotes() {
    let filteredNotes = notes;
    let { sortBy, month, year, week } = filters;
    if (!sortBy && !month && !year && !week) {
      return notes;
    }
    if (year) {
      filteredNotes = filteredNotes.filter(
        note => note.date.split("-")[0] === year
      );
    }
    if (month) {
      filteredNotes = filteredNotes.filter(
        note => Number(note.date.split("-")[1]) === Number(month)
      );
    }
    if (sortBy) {
      if (sortBy === "oldest") {
        filteredNotes = filteredNotes.sort(
          (note1, note2) => new Date(note1.date) - new Date(note2.date)
        );
      } else if (sortBy === "newest") {
        filteredNotes = filteredNotes.sort(
          (note1, note2) => new Date(note2.date) - new Date(note1.date)
        );
      }
    }
    if (week && week === "true") {
      var today = new Date();
      var weekBeforeDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 7
      );
      filteredNotes = filteredNotes.filter(note => {
        if (
          new Date(note.date) < today &&
          new Date(note.date) > weekBeforeDate
        ) {
          return note;
        }
      });
    }
    return filteredNotes;
  }

  return (
    <div className="notes-list flex mt-2 flex-row-gap-1 flex-justify-between">
      {getFilteredNotes().map(note => (
        <div
          key={note.id}
          className="text-light note-list-item pd-2 flex flex-col flex-justify-between flex-row-gap-1"
        >
          <h3 className="note-heading text-sm">{note.heading}</h3>
          <p className="text-xsm flex flex-row description">
            {note.description}
          </p>
          <div className="flex flex-justify-between align-center">
            <p className="text-xsm">{note.date}</p>
            <div className="flex flex-col-gap-1">
              <span
                onClick={() => props.toggleEditForm(note.id)}
                className="text-light text-xsm"
              >
                ✎
              </span>
              <span
                className="text-xsm text-light"
                onClick={() => deleteNote(note.id)}
              >
                🗑
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
