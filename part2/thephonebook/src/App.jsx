import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState("");

  useEffect(() => {
    personService
      .getAll()
      .then((response) => {
        setPersons(response);
        setNotification("Data fetched successfully from server");
        setNotificationType("success");
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      })
      .catch((error) => {
        setNotification("Failed to fetch data from server");
        setNotificationType("error");
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleNewPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already in the phonebook. Replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        personService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            const updatedPersons = persons.map((person) =>
              person.id !== existingPerson.id ? person : returnedPerson
            );
            setPersons(updatedPersons);
            setNotification(`Updated ${newName} successfully`);
            setNotificationType("success");
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
          .catch((error) => {
            setNotification(`Failed to update contact ${newName}`);
            setNotificationType("error");
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: String(Math.random().toFixed(5) * 100000),
      };

      personService
        .create(newPerson)
        .then((returnedPerson) => {
          const newPersons = [...persons, returnedPerson];
          setPersons(newPersons);
          setNotification(`Added ${newName} successfully`);
          setNotificationType("success");
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch((error) => {
          setNotification(`Failed to create contact ${newName}`);
          setNotificationType("error");
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        });
    }

    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);

    if (window.confirm("Are you sure you want to delete this contact?")) {
      personService
        .erase(id)
        .then(() => {
          const newPersons = persons.filter((person) => person.id !== id);
          setPersons(newPersons);
          setNotification(`Deleted ${person.name} successfully`);
          setNotificationType("success");
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch((error) => {
          setNotification(
            `Failed to delete ${person.name} or it's already deleted`
          );
          setNotificationType("error");
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        });
    }
  };

  const filteredPersons = search
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type={notificationType} message={notification} />

      <Filter search={search} handleSearchChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleNewPerson={handleNewPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
