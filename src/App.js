import { useEffect, useState } from 'react';
import './App.css';
import { getCharacter } from './@core/api/commonapi';
import DataTable from "react-data-table-component";


function App() {
  const [character, setCharacters] = useState([])
  const [FilterData, setFilterData] = useState('');
  const [showFav, setShowFav] = useState('')
  const [order, setOrder] = useState('desc');
  const [paginationModel, setpaginationModel] = useState({
    pageSize: 15,
    page: 0,
  });

  const handleGetCharacter = async () => {
    await getCharacter({
      limit: 15,
      page: paginationModel.page + 1,
      q: FilterData,
      order_by: showFav,
      sort: order
    })
      .then((response) => {
        if (response) {
          if (response.data.length === 0) {
            alert('No Data Available')
          } else {
            console.log('Got Data')
            setCharacters(response.data)
          }
        };
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const columns = [
    {
      name: "Name",
      selector: (row) => (
        <>
          <p style={{ textAlign: 'left' }}>{row.name}</p>
          {row.nicknames.map((data) => (
            <p style={{ float: 'left' }}>{`(${data})`},</p>
          ))
          }
        </>
      )
      ,
    },
    {
      name: "Name Kenji",
      selector: (row) => row.name_kanji,
    },
    {
      name: "Favorite",
      selector: (row) => row.favorites,
    }
  ].filter((f) => f !== undefined);

  useEffect(() => {
    handleGetCharacter()
  }, [FilterData, showFav, order, paginationModel])


  return (
    <div className="App">
      <form>

        <h6>A Web page</h6>
        <div>
          <h1>Search Anime Character</h1>
          <input type="text" className="search" placeholder="Search Anime Character" onChange={(e) => setFilterData(e.target.value)} />
        </div>
        <DataTable
          columns={columns}
          data={character}
          paginationDefaultPage
          paginationPerPage={15}
          paginationServer
          pageSize={paginationModel.pageSize}
          pagination
          onChangePage={setpaginationModel}
        // paginationRowsPerPageOptions={[15, 25, 50, 75, 100, 500, 1000]}
        />
      </form>
    </div>
  );
}

export default App;
