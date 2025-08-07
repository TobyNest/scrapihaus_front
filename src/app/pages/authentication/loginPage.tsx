import { faArrowUpRightDots, faArrowUpRightFromSquare, faHouse, faMagnifyingGlass, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { faArrowsUpDownLeftRight } from '@fortawesome/free-solid-svg-icons/faArrowsUpDownLeftRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';

const SquareGrid = () => {
  const [columns, setColumns] = useState(0);
  const [rows, setRows] = useState(0);
  const [visibleSquares, setVisibleSquares] = useState(new Set());

 // Tamanho do quadrado do fundo, utilizado para personalizar o fundo
  const squareSize = 30;

  const updateGridSize = () => {
    const newColumns = Math.floor(window.innerWidth / squareSize) + 1;
    const newRows = Math.floor(window.innerHeight / squareSize) + 1;
    setColumns(newColumns);
    setRows(newRows);
  };

  useEffect(() => {
    updateGridSize();
    window.addEventListener('resize', updateGridSize);
    return () => window.removeEventListener('resize', updateGridSize);
  }, []);

  useEffect(() => {
    const total = columns * rows;

    const showInterval = setInterval(() => {
      setVisibleSquares((prev) => {
        const newSet = new Set(prev);
        const randomIndex = Math.floor(Math.random() * total);
        newSet.add(randomIndex);
        return newSet;
      });
    }, 80); // quadrados aparecendo
    const hideInterval = setInterval(() => {
      setVisibleSquares((prev) => {
        const newSet = new Set(prev);
        const randomIndex = Math.floor(Math.random() * total);
        newSet.delete(randomIndex);
        return newSet;
      });
    }, 240); // quadrados sumindo

    return () => {
      clearInterval(showInterval);
      clearInterval(hideInterval);
    };
  }, [columns, rows]);

  return (
    <div className="w-screen h-screen overflow-hidden relative">
        <div className={`absolute h-[15%] w-1/3 bg-white shadow-sombraPadrao rounded-sm px-8 py-6 top-[15%] left-1/3 z-10 flex-col font-fredoka flex items-center`}>
        
            <div className='w-full  h-max flex justify-center items-start flex-col text-cinzaEscuro'>
                    <h1 className='text-3xl'>Login</h1>
                    <p className='text-md text-gray-400 mt-2'>Faça o login para acessar todas as funcionalidades! </p>
            </div>
        </div>
        <div className={`absolute h-1/4 w-1/3 bg-white shadow-sombraPadrao rounded-sm p-8 top-[32%] left-1/3 z-10 flex-col font-fredoka flex items-center`}>
            
            <form className='w-full h-max'>
            <label htmlFor="email">
                <h1 className="text-md text-gray-500">E-MAIL:</h1>
            </label>
                <input type='email' id="email" className='w-full h-10 py-2 outline-none placeholder:text-gray-300' placeholder='email@email.com.br'></input>
            <label htmlFor="password">
             <h1 className="text-md text-gray-500 mt-4">SENHA:</h1>
            </label>
                <input type='password' className='w-full h-10 py-2 outline-none placeholder:text-gray-300' placeholder='senha'></input>
                
            </form>
        <div className='flex flex-row w-max gap-8'>
        <div
                    className="group mt-8 flex min-h-12 w-60 cursor-pointer items-center justify-center rounded-sm shadow-sombraPadrao bg-white border-cinzaBordas text-cinzaEscuro text-xl  transition-all duration-150 ease-in-out"
                  >
                    <div>Não tenho conta</div>
                    <div className="ml-2 h-6 w-0 translate-x-[20px] text-white opacity-0 transition-all duration-300 ease-in-out group-hover:w-6 group-hover:translate-x-0 group-hover:opacity-100 text-cinzEscuro">
                      <FontAwesomeIcon className='text-cinzaEscuro mb-[0.5]' icon={faUser} />
                    </div>
                  </div>
        <div
                    className="group mt-8 flex min-h-12 w-60 cursor-pointer items-center justify-center rounded-sm bg-black text-xl font-semibold text-white transition-all duration-150 ease-in-out"
                  >
                    <div>Acessar</div>
                    <div className="ml-2 h-6 w-0 translate-x-[20px] text-white opacity-0 transition-all duration-300 ease-in-out group-hover:w-6 group-hover:translate-x-0 group-hover:opacity-100">
                      <FontAwesomeIcon className='mb-[1.5px]' icon={faHouse} />
                    </div>
                  </div>

        </div>
        </div>
      <div
        className="grid blur-sm transition-all"
        style={{
          gridTemplateColumns: `repeat(${columns}, ${squareSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${squareSize}px)`,
        }}
      >
        {Array.from({ length: columns * rows }).map((_, i) => (
          <div
            key={i}
            className={`border border-white transition-all duration-1000 ease-in-out ${
              visibleSquares.has(i) ? 'bg-red-200' : 'bg-white'
            }`}
            style={{ width: squareSize, height: squareSize }}
          />
        ))}
      </div>
    </div>
  );
};

export default SquareGrid;
