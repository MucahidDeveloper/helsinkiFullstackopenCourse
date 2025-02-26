const Persons = ({ persons }) => (
  <div>
    {persons.map((person, index) => (
      <h3 key={person.id}>
        {person.name} {person.number}
      </h3>
    ))}
  </div>
);

export default Persons;
