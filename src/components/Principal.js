import React, { useState, useEffect  } from 'react';
import { Button, Card, Dropdown, Textarea, HR, TextInput } from 'flowbite-react';
import { FaPlus } from 'react-icons/fa6';
import '../assets/main.css'
import { isDisabled } from '@testing-library/user-event/dist/utils';
import $ from 'jquery'

function Principal() {
  const [anotacoes, setAnotacoes] = useState([]);
  //Usar userEffect ? para adicionar
  const adicionarAnotacao = () => {
    const novaAnotacao = { title: 'Nova anotação', descricao: '', New: true };
    setAnotacoes([...anotacoes, novaAnotacao]);
  };
  const excluirAnotacao = (e) => {
    const index = $(e.target).closest(".itemcard")[0].getAttribute('data-index');
    anotacoes.splice(index, 1);
    $(e.target).closest(".itemcard")[0].remove();
  };
  const atualizarDescricao = (index, novaDescricao) => {
    const novasAnotacoes = anotacoes.map((anotacao, i) =>
      i === index ? { ...anotacao, descricao: novaDescricao } : anotacao
    );
    setAnotacoes(novasAnotacoes);
  };

  const truncarDescricao = (descricao) => {
    const LIMITE_CARACTERES = 270;
    return descricao.length > LIMITE_CARACTERES
      ? `${descricao.substring(0, LIMITE_CARACTERES)}...`
      : descricao;
  };

  return (
    <main className="p-3">
      <div className="grid grid-cols-3 gap-3 justItems_center">
        {anotacoes.map((item, index) => (
          <Card className="itemcard max-w-sm" key={index} data-index={index}>
            <div className="flex justify-between px-4">
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                <TextInput id={`title_${item.tile}`} type="text" value={item.tile} placeholder="Title..." maxLength={20} disabled={!item.New} />
              </h5>
              { !item.New ??
                <Dropdown inline label="">
                  <Dropdown.Item>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Edit
                    </a>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Export Data
                    </a>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Delete
                    </a>
                  </Dropdown.Item>
                </Dropdown>
              }
            </div>
            <HR className="my-0" />
            <div className="flex flex-col items-center">
              <Textarea
                id={`comment-${index}`}
                value={!item.New ? truncarDescricao(item.descricao) : item.descricao }
                onChange={(e) => atualizarDescricao(index, e.target.value)}
                placeholder="Nova anotação..."
                rows={6}
                maxLength={280}
              />
             <span className='text-gray-900 dark:text-gray-100'>{(item.descricao.length)}/280</span>
            </div>
            <HR className="my-0" />
            <div className="flex justify-between items-center">
              <Button onClick={excluirAnotacao} color="failure">Excluir</Button>
              <Button color="success">Salvar</Button>
            </div>
          </Card>
        ))}
      </div>
      <div data-dial-init className="fixed end-6 bottom-5_5em group">
        <Button
          onClick={adicionarAnotacao}
          color="blue"
          className="btn-adicionar text-gray-900 hover:text-gray-100 bg-white rounded-full border border-gray-200 dark:border-gray-600 dark:hover:text-white shadow-sm dark:text-gray-400 hover:bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
        >
          <FaPlus className="mr-2 h-5 w-5" />
          Adicionar
        </Button>
      </div>
    </main>
  );
}

export default Principal;
