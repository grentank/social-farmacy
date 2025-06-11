import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import EntryItem from '../ui/EntryItem';

export default function MainPage() {
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    axios('/api/entries').then(({ data }) => setEntries(data));
  }, []);

  return (
    <>

      <main role="main">
     
        <div>
         <h1>Приколы</h1>
         <div>Феназепам</div>
         <div>Трибалон</div>
         <div>Сеалекс</div>
        </div>
      </main>
    </>
  );
}
