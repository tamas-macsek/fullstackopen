import { useState, useEffect } from "react";
import PhonebookService from "./services/phonebook";
import Notification from "./components/Notification";
import './App.css'

const PersonItem = ({ person, handlePersonRemove }) => {
  return (
    <li>
      {person.name} - {person.number}{" "}
      <button
        onClick={() => {
          if (
            window.confirm(
              `Are you sure want to delete ${person.name} from list?`
            )
          ) {
            handlePersonRemove(person);
          }
        }}
      >
        delete
      </button>
    </li>
  );
};
const PersonList = ({ persons, handlePersonRemove }) => {
  return (
    <ul>
      {persons.map((person) => (
        <PersonItem
          key={person.name}
          person={person}
          handlePersonRemove={handlePersonRemove}
        />
      ))}
    </ul>
  );
};
const Filter = (props) => {
  return (
    <>
      filter shown with&nbsp;
      <input
        type="text"
        onChange={props.handleFilterNameChange}
        value={props.value}
      />
    </>
  );
};
const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number:{" "}
        <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};



const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [notification, setNotification] = useState({ message: null, level: "info" });

  useEffect(() => {
    loadPhoneBook();
  }, []);

  const showNotification = (message, level, timeout = 5) => {
    setNotification({ message: message, level: level })
    setTimeout(() => { setNotification({ message: null, level: null }) }, timeout * 1000)
  }

  const resetForm = () => {
    setNewName("");
    setNewNumber("");
  }

  const loadPhoneBook = () => {
    PhonebookService.getAll().then((data) => {
      setPersons(data);
    });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value);
  };


  const handleAddNew = (event) => {
    event.preventDefault();

    const newPersonObject = {
      name: newName,
      number: newNumber,
    };

    const found = persons.find((person) => person.name === newName);

    if (undefined === found) {
      PhonebookService.add(newPersonObject).then((r) => {
        setPersons(persons.concat(r));
        showNotification(`${r.name} is added to the phonebook.`, 'success')
        resetForm();
      });
    } else {
      if (
        window.confirm(
          `${found.name} is already in phonebook. Replace the old number with a new one?`
        )
      ) {
        PhonebookService.edit(found.id, newPersonObject).then((r) => {
          loadPhoneBook();
          showNotification(`${newPersonObject.name} is changed in the phonebook.`, 'success', 5);
          resetForm()
        });
      }
    }
  };

  const handlePersonRemove = (person) => {
    PhonebookService.remove(person.id)
      .then(() => {
        loadPhoneBook();
        showNotification(`${person.name} is removed.`, 'success')
      })
      .catch(() => {
        loadPhoneBook();
        showNotification(`${person.name} is already removed.`, 'error')
      });
  };

  const filteredPersons = filterName !== "" ? persons.filter(p => p.name.toLowerCase().indexOf(filterName.toLowerCase()) > -1) : [...persons];

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} level={notification.level} />
      <Filter
        handleFilterNameChange={handleFilterNameChange}
        value={filterName}
      />

      <h3>Add new</h3>
      <PersonForm
        onSubmit={handleAddNew}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <PersonList
        persons={filteredPersons}
        handlePersonRemove={handlePersonRemove}
      />
    </div>
  );
};

export default App;
