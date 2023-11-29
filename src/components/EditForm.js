import { ROOT_URL } from "../utils/constant";

export default function EditForm(props){

  let { heading, description } = props.data;

  function editNote(event){
    event.preventDefault();
    if(!heading || !description){
      return alert('fill all fields before submitting the form');
    }
    let result = props.notes.find(note => props.data.id === note.id);
    fetch(ROOT_URL + '/' + result.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        note: {
          heading,
          description
        }
      })
    }).then(() => {
      props.getNotes();
      props.clearFormData()
      props.toggleEditForm();
      alert('Note edited successfully');
    });
  }
  
  if(props.isEditFormVisible){
    return (
      <div className='edit-form-container flex align-center justify-center'>
        <form onSubmit={editNote} className="flex flex-col flex-row-gap-1 edit-form pd-2">
          <h3 className="text-md">Edit Your Note</h3> 
          <input className="form-control pd-1" onChange={props.handleEditFormInput} type="text" value={heading} id="heading" name="heading" placeholder="Enter Heading" />
          <textarea className="form-control pd-1" onChange={props.handleEditFormInput} type="text" value={description} id="description" name="description" placeholder="Enter Heading" />
          <fieldset className="flex flex-col-gap-1 justify-self-end">
            <button onClick={() => props.toggleEditForm()} className="btn-form bg-grey">CANCEL</button>
            <input type='submit' value="Edit Note" className="btn-form bg-orange" />
          </fieldset>
        </form>
      </div>
    )
  }else{
    return "";
  }
}