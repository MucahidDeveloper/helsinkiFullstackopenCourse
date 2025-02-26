const Persons = ({ persons }) => (
  <div>
    {persons.map((person, index) => (
      <h3 key="{index}">
        {person.name} {person.number}
      </h3>
    ))}
  </div>
);

export default Persons;
