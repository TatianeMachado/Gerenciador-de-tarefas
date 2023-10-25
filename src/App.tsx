import React, { useState } from "react";
import "./App.css";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  const [addTarefa, setAddTarefa] = useState<string>("");
  const [tarefasPendentes, setTarefasPendentes] = useState<string[]>([]);
  const [tarefasConcluidas, setTarefasConcluidas] = useState<string[]>([]);

  function adicionarTarefa(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (addTarefa.trim() !== "") {
      setTarefasPendentes([...tarefasPendentes, addTarefa]);
      setAddTarefa("");
    }
  }

  function concluirTarefa(index: number) {
    const tarefaConcluida = tarefasPendentes[index];
    const novasTarefasPendentes = [...tarefasPendentes];
    novasTarefasPendentes.splice(index, 1);
    setTarefasPendentes(novasTarefasPendentes);
    setTarefasConcluidas([...tarefasConcluidas, tarefaConcluida]);
  }

  function removerTarefa(index: number, lista: string[]) {
    const novasTarefas = [...lista];
    novasTarefas.splice(index, 1);
    if (lista === tarefasPendentes) {
      setTarefasPendentes(novasTarefas);
    } else {
      setTarefasConcluidas(novasTarefas);
    }
  }
  const listarTarefasPendentes = tarefasPendentes.length ? (
    tarefasPendentes.map((tarefa, index) => (
      <div key={index} className="list-item">
        <p>{tarefa}</p>
        <FontAwesomeIcon
          icon={faCheck}
          style={{ color: "green" }}
          onClick={() => concluirTarefa(index)}
          className="list-item"
        />
        <FontAwesomeIcon
          icon={faTrash}
          style={{ color: "red" }}
          onClick={() => removerTarefa(index, tarefasPendentes)}
          className="list-item"
        />
      </div>
    ))
  ) : (
    <p>Nenhuma tarefa pendente!</p>
  );

  const listarTarefasConcluidas = tarefasConcluidas.length ? (
    tarefasConcluidas.map((tarefa, index) => (
      <div key={index} className="list-item">
        <p>{tarefa}</p>
        <FontAwesomeIcon
          icon={faTrash}
          style={{ color: "red" }}
          onClick={() => removerTarefa(index, tarefasConcluidas)}
          className="icon"
        />
      </div>
    ))
  ) : (
    <p>Nenhuma tarefa concluída!</p>
  );

  return (
    <>
      <div>
        <h2 style={{ color: "red" }}>Tarefas Pendentes </h2>
        {listarTarefasPendentes}
      </div>
      <div>
        <h2 style={{ color: "green" }}>Tarefas Concluídas</h2>
        {listarTarefasConcluidas}
      </div>
      <div>
        <form onSubmit={adicionarTarefa}>
          <label>Adicione uma tarefa</label>
          <input
            type="text"
            value={addTarefa}
            onChange={(e) => setAddTarefa(e.target.value)}
          />
          <button type="submit">Adicionar Tarefa</button>
        </form>
      </div>
    </>
  );
}

export default App;
