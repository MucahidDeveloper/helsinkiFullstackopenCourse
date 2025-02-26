const Persons = ({ persons, handleDelete }) => (
  <div>
    {persons.map((person) => (
      <h3 key={person.id}>
        {person.name} {person.number}
        <button onClick={() => handleDelete(person.id)}>delete</button>
      </h3>
    ))}
  </div>
);

export default Persons;
