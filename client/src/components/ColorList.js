import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveAdd = e => {
    e.preventDefault();
    axiosWithAuth()
    .post(`/api/colors`, colorToAdd)
    .then(res => {
      console.log(res)
      axiosWithAuth()
        .get('/api/colors')
        .then(res => {
        console.log(res)
        updateColors(res.data)
        })
       .catch(err => {
       console.log('error:' + err)
       })
    })
    .catch(err => {
    console.log('error:' + err)
    })

  };


  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
    .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      console.log(res)
      axiosWithAuth()
        .get('/api/colors')
        .then(res => {
        console.log(res)
        updateColors(res.data)
        })
       .catch(err => {
       console.log('error:' + err)
       })
    })
    .catch(err => {
    console.log('error:' + err)
    })

  };

  const deleteColor = color => {
    // make a delete request to delete this color
    console.log(color)
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`, color)
      .then(res => {
        console.log(res)
        axiosWithAuth()
        .get('/api/colors')
        .then(res => {
        console.log(res)
        updateColors(res.data)
        })
       .catch(err => {
       console.log('error:' + err)
       })

      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <span onClick={() => setAdding(true)}> Add Color</span>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => {
              setEditing(false)
              }}>cancel</button>
          </div>
        </form>
      )}
       {adding && (
        <form onSubmit={saveAdd}>
          <legend>Add color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToAdd({ ...colorToAdd, color: e.target.value })
              }
              value={colorToAdd.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToAdd({
                  ...colorToAdd,
                  code: { hex: e.target.value }
                })
              }
              value={colorToAdd.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">Add</button>
            <button onClick={() => {
              setAdding(false)
              }}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
     
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;