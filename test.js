import axios from 'axios';
import { useEffect, useState } from 'react';

const App = () => {
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/invitations')
      .then((response) => setInvitations(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Invitations</h1>
      <ul>
        {invitations.map(invite => (
          <li key={invite.id}>{invite.name} - {invite.date}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
