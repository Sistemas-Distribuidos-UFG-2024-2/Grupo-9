import React from 'react';

const Contact = () => {
  const people = [
    { name: 'Yatherson Lucas Teodoro Souza', matricula: '201912485', email: 'yathersonlucas@discente.ufg.br' },
    { name: 'Reydner Miranda Nunes', matricula: '201907501', email: 'reydnermiranda@discente.ufg.br' },
    { name: 'Eduardo Santos Santana', matricula: '202203503', email: 'santoseduardo@discente.ufg.br' },
    { name: 'Bruno Lopes Santos', matricula: '201907448', email: 'lopes_santos@discente.ufg.br' },
    { name: 'Gabriel Silva Miranda', matricula: '201907464', email: 'email Gabriel' },
  ];

  return (
    <section id="contact" className="contact">
      <h1>Contact</h1>
      <ul>
        {people.map((person, index) => (
          <li key={index}>
            <p><strong>Nome:</strong> {person.name}</p>
            <p><strong>Matricula:</strong> {person.matricula}</p>
            <p><strong>E-mail:</strong> {person.email}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Contact;
