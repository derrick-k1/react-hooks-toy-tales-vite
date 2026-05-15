import React from "react";

function ToyCard({ toy, onDeleteToy, onUpdateToy }) {
  function handleLike() {
    const updatedToy = { ...toy, likes: toy.likes + 1 };

    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: updatedToy.likes }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update toy likes");
        }
        return response.json();
      })
      .then(onUpdateToy)
      .catch((error) => {
        console.error(error);
      });
  }

  function handleDonate() {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete toy");
        }
        onDeleteToy(toy.id);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{toy.name}</h2>
      <img src={toy.image} alt={toy.name} className="toy-avatar" />
      <p>{toy.likes} Likes </p>
      <button className="like-btn" onClick={handleLike}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={handleDonate}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;
